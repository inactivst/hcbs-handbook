# RightsBook — HCBS Rights Chat

## What it is
Answers questions about Home and Community-Based Services (HCBS) rights for people with
developmental disabilities and their families. Chat over a curated corpus, with state-by-state
comparison. Web is live; iOS 1.0 was submitted with three in-app purchases.

- **Live:** https://rightsbook.thebook.ltd
- **Repo:** https://github.com/inactivst/hcbs-handbook
- **Bundle ID:** `com.thebook.rightsbook`

## Tech stack
- React + Vite, inline styles
- Capacitor iOS shell in `ios/`
- Supabase for accounts/entitlements
- Payments: Stripe on web, RevenueCat on iOS
- Serverless API in `api/`

## Source map
| File | Role |
|---|---|
| `src/App.jsx` | Main component |
| `src/cloud.js` | Supabase sync |
| `src/compareStates.js` | State-by-state rights comparison |
| `src/regionalCenters.js` | CA regional center directory |
| `src/glossary.js` | Term definitions |
| `src/i18n.js` | Translations |
| `src/purchases.js` | RevenueCat / entitlement gating |

| API route | Role |
|---|---|
| `api/chat.js` | Main chat endpoint |
| `api/_corpus.js`, `api/_playbook.js` | Retrieval corpus + system playbook |
| `api/_ratelimit.js` | Abuse throttle |
| `api/checkout.js`, `api/portal.js`, `api/stripe-webhook.js` | Stripe |
| `api/revenuecat-webhook.js` | iOS entitlements |

## Commands
```bash
npm run dev            # launch.json name: rightsbook
npm run build
npm run build:ios      # build + cap sync
npm run check:compare  # validate state comparison data
npm run lint
```

## Gotchas
- **Never pin a model id or a `-latest` alias** in the chat route. Provider ids rot;
  discover or walk the list, and surface upstream errors instead of swallowing them.
- **Time-box every AI request** — AbortController plus a visible Cancel. Whitelist the fields
  sent upstream; never POST decorated app state.
- RevenueCat: never `await` `configure()` or the `registerPlugin` proxy — it hangs TestFlight builds.
- An empty RevenueCat key gets tree-shaken out of the build. Grep the bundle for `appl_` before shipping.
- Paywall copy must read price and trial from the RevenueCat offering, never hardcode them.
- Removing a binary in App Store Connect **returns** the IAPs to a pending state.

## Known issues
Open items from the 2026-07-24 audit: a page remount wipes sign-in state, the composer never
grows with input, a RevenueCat lifetime-purchase bug, and a 292KB bundle worth trimming.

## Docs in-repo
`IOS_SETUP.md`, `PAYMENTS_SETUP.md`, `README.md`.
