# RightsBook payments — setup

The Vault subscription. Rights chat stays free; this gates the Vault only.
Pricing: **$2.99/mo** and **$19.99/yr**.

The code is already in the repo and **dormant** — it does nothing until the keys
below are set, exactly like the LLM providers. No keys = the paywall shows a
"coming soon" state and nothing charges.

## What Claude built (already committed)
- `supabase/entitlements.sql` — adds `plan`, `entitled_until`, `stripe_customer_id`
  to `profiles`, plus a trigger so only the webhook (service role) can write them.
- `api/checkout.js` — starts a Stripe Checkout session for a signed-in user.
- `api/stripe-webhook.js` — the only writer of entitlement; runs on every
  purchase/renewal/cancel.
- `api/portal.js` — Stripe billing portal (manage card / cancel).
- `api/_stripe.js` — shared helpers (SDK-free; fetch + node:crypto).

## What you do (one-time)

### 1. Supabase
Run `supabase/entitlements.sql` in the RightsBook project's SQL editor.
Then confirm no client-writable update policy on `profiles` covers the new
columns — the trigger already blocks it, but check with:
`select * from pg_policies where tablename = 'profiles';`

### 2. Stripe (dashboard.stripe.com)
1. Create one **Product** "RightsBook Vault" with two recurring **Prices**:
   - $2.99 / month  → copy its `price_…` id
   - $19.99 / year  → copy its `price_…` id
   (Stripe's fee is a flat ~2.9% + 30¢, no application needed. Apple's 15%
   Small Business Program is a separate thing you apply for later, for iOS only.)
2. Developers → **API keys**: copy the **Secret key** (`sk_live_…` or `sk_test_…`).
3. Developers → **Webhooks** → add endpoint:
   - URL: `https://<your-domain>/api/stripe-webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`,
     `customer.subscription.deleted`, `invoice.paid`
   - Copy the **Signing secret** (`whsec_…`).

### 3. Vercel env vars (Project → Settings → Environment Variables)
| Name | Value |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_…` (or `sk_test_…` while testing) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` |
| `STRIPE_PRICE_MONTHLY` | the $2.99/mo `price_…` id |
| `STRIPE_PRICE_ANNUAL` | the $19.99/yr `price_…` id |
| `SUPABASE_URL` | the RightsBook Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → **service_role** key (server-only, never in the client) |
| `APP_URL` | `https://<your-domain>` (optional; falls back to request origin) |

Redeploy after adding them. Test with Stripe **test mode** keys + a test card
(`4242 4242 4242 4242`) before going live.

## iOS (later)
Apple requires In-App Purchase for the same subscription. When we build the
Capacitor shell we'll add RevenueCat and point its webhook at the **same**
`profiles` entitlement columns, so the app's gating logic doesn't change — it
just reads `plan` / `entitled_until` regardless of where the purchase happened.
