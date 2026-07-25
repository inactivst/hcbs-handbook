-- RightsBook core schema: accounts, the E2E vault, and its file storage.
-- ─────────────────────────────────────────────────────────────────────────────
-- READ THIS FIRST. Until 2026-07-24 this file did not exist: the entire security
-- model of the app lived only in whatever had been typed into the SQL editor once,
-- with no way to review it, reproduce it, or notice it drifting. This file was
-- written by DUMPING THE LIVE PROJECT (`qjprlexyxurwogeboqln`, org
-- fbulupcanhkcllbwlmzn) through the Management API on 2026-07-24 - it is a record
-- of what is actually deployed, not a guess at it. Entitlement columns and their
-- guard trigger live separately in `entitlements.sql`; run this file first.
--
-- Everything here is idempotent, so re-running it against the live project is safe.
--
-- THE SECURITY MODEL IN ONE PARAGRAPH: a vault row's `ciphertext` is AES-GCM
-- encrypted on the device with a key the server never sees; the key itself is
-- wrapped by a PBKDF2 key derived from the user's PIN and parked in
-- `profiles.encrypted_vault_key` so a new device can recover it with email code +
-- PIN. So RLS is not what protects the CONTENTS - the encryption is. RLS protects
-- the metadata and stops one account touching another's rows at all. Both matter.

-- ─── profiles: one row per auth user ─────────────────────────────────────────
-- `kdf_salt` + `encrypted_vault_key` are the PIN-wrapped vault key. They are NOT
-- secrets the server can use: without the PIN the wrapped key is inert. They are
-- still the single most attack-worthy pair of columns in the database, because a
-- 4-digit PIN is only 10,000 candidates against PBKDF2-100k. Anyone who ever gets
-- a bulk read of this table can grind them offline. That is the known, accepted
-- risk recorded in the audit; a 6-digit PIN is the 100x mitigation if it is ever
-- worth forcing a reset over.
create table if not exists public.profiles (
  id                  uuid primary key references auth.users (id) on delete cascade,
  kdf_salt            text,
  encrypted_vault_key text,
  app_type            text        not null default 'hcbs-handbook',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ─── vault_items: every encrypted record, one row each ───────────────────────
-- `kind` separates the collections ('history' | 'incident' | 'deadline' | 'doc').
-- `ciphertext` is the whole record as an encrypted JSON envelope - the server can
-- see how many records you have, of what kind, and when you touched them, and
-- nothing else. The client upserts by the record's own UUID, so a repeated push is
-- idempotent; deletes must be explicit (an upsert never removes a row).
create table if not exists public.vault_items (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid        not null references auth.users (id) on delete cascade,
  kind       text        not null,
  ciphertext text        not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Serves the only read pattern the client has: "this user's rows of this kind,
-- newest first".
create index if not exists vault_items_user_kind_idx
  on public.vault_items (user_id, kind, updated_at desc);

-- ─── updated_at maintenance ──────────────────────────────────────────────────
-- `search_path = ''` is deliberate: an empty search path means a hostile object in
-- a schema earlier on the path cannot shadow anything this function calls.
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path to '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists vault_items_set_updated_at on public.vault_items;
create trigger vault_items_set_updated_at
  before update on public.vault_items
  for each row execute function public.set_updated_at();

-- ─── RLS: every table, every command, owner only ─────────────────────────────
-- Policies key off auth.uid(), never auth.jwt() ->> 'email' (which silently
-- resolves to nothing in RLS on these projects and matches zero rows).
alter table public.profiles    enable row level security;
alter table public.vault_items enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles
  for insert with check (auth.uid() = id);

-- Note this is deliberately NOT the last word on profile updates: the client can
-- update its own row, so the entitlement columns are additionally frozen by the
-- guard trigger in entitlements.sql. Postgres RLS cannot scope a policy to
-- particular columns, which is why that trigger exists.
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists vault_items_select_own on public.vault_items;
create policy vault_items_select_own on public.vault_items
  for select using (auth.uid() = user_id);

drop policy if exists vault_items_insert_own on public.vault_items;
create policy vault_items_insert_own on public.vault_items
  for insert with check (auth.uid() = user_id);

drop policy if exists vault_items_update_own on public.vault_items;
create policy vault_items_update_own on public.vault_items
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- The client deletes by id alone (`.delete().eq('id', id)`), with no user_id
-- filter - this policy is the ONLY thing stopping one account deleting another's
-- row. Do not drop it.
drop policy if exists vault_items_delete_own on public.vault_items;
create policy vault_items_delete_own on public.vault_items
  for delete using (auth.uid() = user_id);

-- ─── Storage: the `vault` bucket (encrypted documents and photos) ────────────
-- Private bucket, 25 MB per file, matching MAX_DOC_BYTES in the client. Objects
-- are stored as `{user_id}/{uuid}` (plus `{uuid}.t` for the 400px thumbnail), and
-- the bytes are already AES-GCM ciphertext before they are uploaded.
insert into storage.buckets (id, name, public, file_size_limit)
values ('vault', 'vault', false, 26214400)
on conflict (id) do update
  set public = false, file_size_limit = 26214400;

-- Each policy pins the FIRST PATH SEGMENT to the caller's uid, which is what keeps
-- one account inside its own folder.
drop policy if exists "vault own select" on storage.objects;
create policy "vault own select" on storage.objects
  for select using (bucket_id = 'vault' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "vault own insert" on storage.objects;
create policy "vault own insert" on storage.objects
  for insert with check (bucket_id = 'vault' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "vault own update" on storage.objects;
create policy "vault own update" on storage.objects
  for update using (bucket_id = 'vault' and (storage.foldername(name))[1] = auth.uid()::text)
           with check (bucket_id = 'vault' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "vault own delete" on storage.objects;
create policy "vault own delete" on storage.objects
  for delete using (bucket_id = 'vault' and (storage.foldername(name))[1] = auth.uid()::text);

-- ─── Known gap ───────────────────────────────────────────────────────────────
-- Deleting a vault_items row does NOT remove the matching object from the bucket.
-- The client sweeps both on its delete paths, but an upload interrupted before its
-- row is written, or a delete that happens offline, leaves bytes nobody can see or
-- reach. There is no reconcile job. If storage ever looks larger than the row
-- count justifies, list the bucket and drop objects with no matching id.
