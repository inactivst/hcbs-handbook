// RevenueCat webhook: mirrors App Store (iOS) purchases into the SAME entitlement
// columns on `profiles` that the Stripe webhook writes, so web + native share one
// source of truth and a native buyer's plan is visible on the web app too.
// The native client also reads the Apple receipt directly (rcCheckEntitlement) for
// instant unlock, so this webhook is the durable server write, not the fast path.
//
// Auth: RevenueCat signs webhooks with an Authorization header you set in its
// dashboard. Set REVENUECAT_WEBHOOK_AUTH to that exact value; we reject anything
// that doesn't match (constant-time). Dormant (401/503) until it + Supabase creds
// are set. Configure the app_user_id = Supabase user id (the client does logIn()).
import crypto from 'node:crypto'
import { supabaseAdmin } from './_stripe.js'

const AUTH = process.env.REVENUECAT_WEBHOOK_AUTH || ''

// Map a RevenueCat product identifier to our plan name (ids from IOS_SETUP.md).
function planForProduct(productId) {
  const id = String(productId || '')
  if (/annual|year/i.test(id)) return 'annual'
  if (/month/i.test(id)) return 'monthly'
  return 'monthly'
}

const safeEqual = (a, b) => {
  const x = Buffer.from(String(a)); const y = Buffer.from(String(b))
  return x.length === y.length && crypto.timingSafeEqual(x, y)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!AUTH) return res.status(503).json({ error: 'RevenueCat webhook not configured.' })
  if (!safeEqual(req.headers.authorization || '', AUTH)) return res.status(401).json({ error: 'Unauthorized' })

  const admin = supabaseAdmin()
  if (!admin) return res.status(500).json({ error: 'Server missing Supabase service credentials.' })

  const event = req.body?.event || req.body
  const uid = event?.app_user_id
  if (!uid) return res.status(200).json({ received: true }) // anonymous / pre-login events: nothing to attribute

  // RevenueCat event types: INITIAL_PURCHASE, RENEWAL, PRODUCT_CHANGE, UNCANCELLATION
  // keep entitlement active; CANCELLATION/EXPIRATION/BILLING_ISSUE end it. We trust
  // expiration_at_ms as the entitlement window and recompute on every event.
  const type = event?.type
  const active = ['INITIAL_PURCHASE', 'RENEWAL', 'PRODUCT_CHANGE', 'UNCANCELLATION', 'NON_RENEWING_PURCHASE', 'SUBSCRIPTION_EXTENDED'].includes(type)
  const expiresMs = Number(event?.expiration_at_ms || 0)
  // If an expiry is present and already past, treat as lapsed regardless of type.
  const stillValid = active && (!expiresMs || expiresMs > Date.now())

  try {
    await admin.from('profiles').update({
      plan: stillValid ? planForProduct(event?.product_id) : 'free',
      entitled_until: stillValid && expiresMs ? new Date(expiresMs).toISOString() : null,
    }).eq('id', uid)
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Webhook handling failed.' })
  }

  return res.status(200).json({ received: true })
}
