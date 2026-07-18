# RightsBook iOS (App Store) + In-App Purchase — setup

The web app already sells the Vault via Stripe. On iOS, Apple requires In-App
Purchase, handled through **RevenueCat**. The code is ported from BlackBook's
device-verified integration and is **dormant** until you set the RevenueCat key —
without it, `rcAvailable()` is false and the native app shows the paywall with no
buy path (it never charges).

App identity (baked in, change in one place each if needed):
- Bundle id: `com.thebook.rightsbook` (`capacitor.config.json`)
- Entitlement: `vault`
- Product ids: `rightsbook_vault_monthly`, `rightsbook_vault_annual`
- Prices: $2.99/mo, $19.99/yr (annual-forward) — **quoted from the store**, never
  hardcoded on native (`src/purchases.js` → `rcLoadPricing`).

## What Claude built (committed)
- `ios/` — the Capacitor Xcode project (`npx cap add ios`, SPM plugins).
- `src/purchases.js` — RevenueCat wrapper (configure/pricing/purchase/restore),
  with the device-proven traps kept (non-await configure, no proxy await, SK1).
- `src/main.jsx` — native StatusBar / edge-to-edge init.
- `src/App.jsx` — the paywall's native branch + Restore + entitlement reconcile.
- `api/revenuecat-webhook.js` — mirrors iOS purchases into the same `profiles`
  entitlement columns Stripe writes, so web sees native purchases too.
- `npm run ios` = `build:ios` (sets VITE_PAYMENT_PLATFORM=ios) + `cap sync ios`.

## What you do (one-time)

### 1. App Store Connect
1. Create the app (bundle `com.thebook.rightsbook`).
2. In-App Purchases → create **two auto-renewable subscriptions in ONE group**:
   `rightsbook_vault_monthly` ($2.99/mo) and `rightsbook_vault_annual` ($19.99/yr).
3. (Optional) add a free-trial introductory offer to the annual product — the
   paywall will quote it only to Apple-IDs Apple says are eligible.
4. Apply for the **Small Business Program** (15% instead of 30%).

### 2. RevenueCat (app.revenuecat.com)
1. New project → add the iOS app (bundle `com.thebook.rightsbook`, App Store
   shared secret from ASC).
2. Import both products. Create an **entitlement `vault`** and attach both.
3. Put both in the default **"current" Offering** as the `monthly` / `annual`
   packages.
4. Project → API keys → copy the **public Apple SDK key** (`appl_…`).
5. Integrations → **Webhooks** → add `https://<domain>/api/revenuecat-webhook`,
   set an Authorization header value, and copy it.

### 3. Local `.env` (native build runs on your Mac, NOT Vercel)
```
VITE_REVENUECAT_IOS_KEY=appl_xxxxxxxxxxxxxxxx
# optional overrides if you rename products:
# VITE_REVENUECAT_PRODUCT_MONTHLY=rightsbook_vault_monthly
# VITE_REVENUECAT_PRODUCT_ANNUAL=rightsbook_vault_annual
# VITE_API_ORIGIN=https://<your-web-domain>   # only if native ever calls /api/*
```

### 4. Vercel env (for the RevenueCat webhook — server side)
- `REVENUECAT_WEBHOOK_AUTH` = the exact Authorization value from step 2.5
- (reuses the Stripe pass's `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`)

### 5. Build + run
```
npm run ios
npx cap open ios      # opens Xcode
```
In Xcode: set your Signing team + the bundle id, set the Display Name, run on a
real device (IAP won't work in the simulator). Test a purchase with a **sandbox
Apple ID**.

## ⚠️ Before archiving — the DCE guard
An empty RevenueCat key at build time can tree-shake the IAP path out of the
bundle ([[revenuecat-key-build-dce]]). After `npm run ios`, confirm the key made
it in:
```
grep -rl "appl_" ios/App/App/public/assets/*.js
```
No match = you built without `VITE_REVENUECAT_IOS_KEY` set. Fix the `.env` and
rebuild before archiving.

## Cross-platform entitlement (how it reconciles)
- Web buyer: Stripe webhook → `profiles.plan`. Client reads it → Vault unlocks.
- iOS buyer: Apple receipt via RevenueCat unlocks instantly on-device
  (`rcCheckEntitlement`), and the RC webhook writes the same `profiles.plan` so
  the web app sees it too. `entitled = cloud.entitled || nativePaid` — either path
  unlocks, neither downgrades the other.
