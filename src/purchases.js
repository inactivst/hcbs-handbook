// ─── REVENUECAT (App Store in-app purchase for the Vault subscription) ────────
// Ported from BlackBook's device-verified integration (App Store review builds
// 3-6 were rejected until these exact traps were fixed; do NOT "simplify" them).
// On a native iOS build the Vault is bought through Apple IAP via RevenueCat —
// Apple forbids external payment (Stripe) for digital goods. On web this module
// is inert: rcAvailable() is false, so every function no-ops and the app uses the
// Stripe path in App.jsx.
//
//   Turn it on: set VITE_REVENUECAT_IOS_KEY (RevenueCat dashboard → Project → API
//   keys → the PUBLIC Apple SDK key "appl_…") in the LOCAL .env (the native build
//   runs on Kyle's Mac, NOT Vercel, so this key is local, never in Vercel).
//   The "vault" ENTITLEMENT attached to the products in RevenueCat is the source
//   of truth — any active plan unlocks the Vault. Full setup in IOS_SETUP.md.
import { Purchases } from '@revenuecat/purchases-capacitor'

// Platform comes from the Capacitor RUNTIME, never a build flag, so an archive
// can't silently fall back to the web path just because it was built with a plain
// `vite build`. VITE_PAYMENT_PLATFORM still works as an override (build:ios sets it).
const RUNTIME_PLATFORM = (typeof window !== 'undefined' && window.Capacitor?.getPlatform?.()) || 'web'
const PAYMENT_PLATFORM = import.meta.env.VITE_PAYMENT_PLATFORM || RUNTIME_PLATFORM
export const IS_IOS = PAYMENT_PLATFORM === 'ios'
export const IS_NATIVE = !!(typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.())

const RC_IOS_KEY     = import.meta.env.VITE_REVENUECAT_IOS_KEY || ''       // appl_… public SDK key
const RC_ENTITLEMENT = import.meta.env.VITE_REVENUECAT_ENTITLEMENT || 'vault'
// Product ids — must match the App Store Connect product ids AND be attached to
// the "vault" entitlement in RevenueCat. Fallbacks if package-by-type lookup fails.
const RC_PRODUCT_MONTHLY = import.meta.env.VITE_REVENUECAT_PRODUCT_MONTHLY || 'rightsbook_vault_monthly'
const RC_PRODUCT_ANNUAL  = import.meta.env.VITE_REVENUECAT_PRODUCT_ANNUAL  || 'rightsbook_vault_annual'

// ⚠️ STATICALLY imported (top of file), held in a module ref — NEVER lazy import().
// A dynamic-import chunk never resolves inside the native WKWebView, so the await
// hangs forever and takes the whole purchase flow with it (device-proven).
const _rcPurchases = Purchases
let _rcConfigured = null      // single-flight: a purchase can't race a half-configured SDK
let _rcConfiguredFor = null   // app_user_id we configured with

// IAP usable here? Native shell + the iOS key present.
export const rcAvailable = () => IS_NATIVE && IS_IOS && !!RC_IOS_KEY

// Configure once per signed-in user. Idempotent.
// ⚠️ Returns a BOOLEAN, NEVER the plugin proxy: Capacitor's registerPlugin proxy
// answers EVERY property — including `then` — with a native-method invoker, making
// it a thenable. Resolving an async fn with it makes `await` call a phantom native
// "then" that never answers → hangs forever. Callers read _rcPurchases directly.
export async function rcConfigure(appUserId) {
  if (!rcAvailable()) return false
  if (!_rcConfigured) {
    // ⚠️ DO NOT await configure(): the plugin declares it CAPPluginReturnNone on
    // iOS, so the native side never resolves its JS promise — awaiting it hangs the
    // purchase flow forever on-device (the "Processing…" freeze that got builds
    // rejected). Fire and forget; the SDK queues the calls we DO await.
    // storeKitVersion STOREKIT_1: SK2's app-transaction path can hang on
    // TestFlight/review devices (RevenueCat/purchases-ios#4838); SK1 doesn't.
    _rcPurchases.configure({
      apiKey: RC_IOS_KEY,
      appUserID: appUserId || undefined,
      storeKitVersion: 'STOREKIT_1',
    })
    _rcConfigured = true
    _rcConfiguredFor = appUserId || null
  }
  if (appUserId && appUserId !== _rcConfiguredFor) {
    await _rcPurchases.logIn({ appUserID: appUserId })  // owner signed in after launch
    _rcConfiguredFor = appUserId
  }
  return true
}

// Is the "vault" entitlement active in this CustomerInfo?
const rcHasVault = (info) => !!info?.entitlements?.active?.[RC_ENTITLEMENT]

// Intro-offer length in days (RevenueCat reports unit + count, never a day total).
const INTRO_UNIT_DAYS = { DAY: 1, WEEK: 7, MONTH: 30, YEAR: 365 }
const introOfferDays = (intro) =>
  intro ? (INTRO_UNIT_DAYS[intro.periodUnit] || 0) * (intro.periodNumberOfUnits || 0) : 0

// Bound an async call so a hung native SDK can't stall the caller (a try/catch
// can't rescue a hang — nothing throws; a timeout does).
export const withTimeout = (promise, ms) =>
  Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))])

// Read what the store will ACTUALLY charge THIS buyer, for the paywall to quote.
// null when IAP is unavailable or the offering can't be read — the caller must
// then quote NO price rather than guess (a guess is wrong in most storefronts and
// lies about per-Apple-ID trial eligibility). See [[paywall-quote-the-store]].
export async function rcLoadPricing(appUserId) {
  const P = (await rcConfigure(appUserId)) ? _rcPurchases : null
  if (!P) return null
  const { current } = await P.getOfferings()
  const pkgFor = (type, id) =>
    current?.[type] || current?.availablePackages?.find((p) => p.product?.identifier === id)
  const monthly = pkgFor('monthly', RC_PRODUCT_MONTHLY)?.product || null
  const annual  = pkgFor('annual',  RC_PRODUCT_ANNUAL )?.product || null
  if (!monthly && !annual) return null

  // Trial copy is gated on THIS Apple ID's eligibility, not on the offer existing:
  // Apple grants the intro once per subscription group ever, so a returning
  // subscriber is charged full price immediately. UNKNOWN counts as ineligible.
  const intro = annual?.introPrice || null
  let trialDays = 0
  if (annual && introOfferDays(intro) > 0) {
    try {
      const res = await P.checkTrialOrIntroductoryPriceEligibility({ productIdentifiers: [annual.identifier] })
      if (res?.[annual.identifier]?.status === 2 /* ELIGIBLE */) trialDays = introOfferDays(intro)
    } catch { trialDays = 0 }
  }

  // Savings off the real numbers, so the badge can't drift from the prices.
  const savingsPct = monthly?.price > 0 && annual?.price > 0
    ? Math.round((1 - annual.price / (monthly.price * 12)) * 100)
    : 0

  return {
    monthly: monthly ? { priceString: monthly.priceString } : null,
    annual:  annual  ? { priceString: annual.priceString, savingsPct, trialDays } : null,
  }
}

// Read the entitlement without buying — resolves the paid tier on native launch.
// null = N/A (web / not configured).
export async function rcCheckEntitlement(appUserId) {
  const P = (await rcConfigure(appUserId)) ? _rcPurchases : null
  if (!P) return null
  const { customerInfo } = await P.getCustomerInfo()
  return rcHasVault(customerInfo)
}

// Buy the chosen plan. Resolves true if "vault" is active afterward. Throws on
// real errors (caller swallows user-cancel). `plan` is "monthly" | "annual".
export async function rcPurchase(plan, appUserId) {
  const P = (await rcConfigure(appUserId)) ? _rcPurchases : null
  if (!P) throw new Error('In-app purchase isn’t available on this build.')
  const wantId = plan === 'annual' ? RC_PRODUCT_ANNUAL : RC_PRODUCT_MONTHLY
  const { current } = await P.getOfferings()
  const pkg = (plan === 'annual' ? current?.annual : current?.monthly)
    || current?.availablePackages?.find((p) => p.product?.identifier === wantId)
  if (!pkg) throw new Error('That plan isn’t available right now. Please try again.')
  const { customerInfo } = await P.purchasePackage({ aPackage: pkg })
  return rcHasVault(customerInfo)
}

// Restore prior purchases (App Store requirement — e.g. signing in on a new phone).
export async function rcRestore(appUserId) {
  const P = (await rcConfigure(appUserId)) ? _rcPurchases : null
  if (!P) return false
  const { customerInfo } = await P.restorePurchases()
  return rcHasVault(customerInfo)
}
