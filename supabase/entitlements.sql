-- RightsBook entitlements ─────────────────────────────────────────────────────
-- Adds subscription state to the existing per-user `profiles` row. Unlike vault
-- data (E2E encrypted, server sees only ciphertext), entitlement MUST be plaintext:
-- the Stripe/RevenueCat webhook writes it server-side, and the client reads it to
-- gate the Vault WITHOUT needing the vault key. It carries no PHI — just a plan
-- name and an expiry — so plaintext is correct here.
--
-- Run this once in the RightsBook Supabase project (SQL editor). Idempotent.

alter table public.profiles
  add column if not exists plan               text        not null default 'free',
  add column if not exists entitled_until     timestamptz,
  add column if not exists stripe_customer_id text;

-- `plan`: 'free' | 'monthly' | 'annual' | 'lifetime'. Source of truth for what
--   the user bought; the client shows/hides the Vault on `isEntitled` (below).
-- `entitled_until`: when a recurring plan lapses (subscription current_period_end).
--   NULL for 'free' (never entitled) and 'lifetime' (entitled forever).
-- `stripe_customer_id`: links the row to Stripe so the billing-portal + renewal
--   webhooks can find the user by customer id, not just by checkout metadata.

create index if not exists profiles_stripe_customer_id_idx
  on public.profiles (stripe_customer_id);

-- Entitlement predicate the app relies on: lifetime, or a dated plan not yet
-- expired. Kept in SQL too so any server code can agree with the client.
create or replace function public.is_entitled(p public.profiles)
returns boolean language sql immutable as $$
  select p.plan = 'lifetime'
      or (p.plan in ('monthly', 'annual') and p.entitled_until is not null and p.entitled_until > now());
$$;

-- RLS: users may READ their own profile (they already can if profiles has the
-- standard "own row" select policy). Users must NOT be able to WRITE these three
-- columns from the client — only the webhook (service-role key, bypasses RLS)
-- sets them. If your existing update policy lets users update their own row,
-- narrow it so it cannot touch plan/entitled_until/stripe_customer_id. Example:
--
--   -- inspect current policies first:
--   --   select * from pg_policies where tablename = 'profiles';
--   --
--   -- if an "update own profile" policy exists and covers all columns, replace
--   -- it with a column-scoped one (Postgres RLS can't restrict columns directly,
--   -- so enforce via a trigger that rejects client-side changes to these cols):
--
create or replace function public.guard_entitlement_columns()
returns trigger language plpgsql as $$
begin
  -- service_role (the webhook) is allowed to change entitlement; anyone else is
  -- silently held to the old values, so a malicious client can't self-upgrade.
  if current_setting('request.jwt.claims', true)::jsonb ->> 'role' is distinct from 'service_role' then
    new.plan               := old.plan;
    new.entitled_until     := old.entitled_until;
    new.stripe_customer_id := old.stripe_customer_id;
  end if;
  return new;
end;
$$;

drop trigger if exists guard_entitlement on public.profiles;
create trigger guard_entitlement
  before update on public.profiles
  for each row execute function public.guard_entitlement_columns();
