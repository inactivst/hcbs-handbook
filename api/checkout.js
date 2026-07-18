// Create a Stripe Checkout Session for a signed-in RightsBook user who is buying
// the Vault subscription. The client POSTs { userId, email, plan }, we return a
// hosted Checkout URL to redirect to. Dormant until STRIPE_SECRET_KEY +
// STRIPE_PRICE_* are set — with no keys it returns 503 and the paywall stays in
// its "coming soon" state, mirroring how the app runs on whatever keys exist.
import { stripe, stripeConfigured, PRICE_MONTHLY, PRICE_ANNUAL, APP_URL } from './_stripe.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!stripeConfigured()) return res.status(503).json({ error: 'Payments are not configured yet.' })

  const { userId, email, plan } = req.body || {}
  if (!userId) return res.status(400).json({ error: 'userId required' })

  const price = plan === 'annual' ? PRICE_ANNUAL : PRICE_MONTHLY
  if (!price) return res.status(503).json({ error: 'Price is not configured yet.' })

  // Prefer an explicit APP_URL; otherwise reflect the caller's origin so the
  // same code works on prod, previews, and localhost without another env var.
  const origin = APP_URL || req.headers.origin || `https://${req.headers.host}`

  try {
    const session = await stripe('checkout/sessions', {
      body: {
        mode: 'subscription',
        line_items: [{ price, quantity: 1 }],
        // client_reference_id + metadata both carry the Supabase user id so the
        // webhook can attribute the purchase no matter which event arrives first.
        client_reference_id: userId,
        customer_email: email || undefined,
        metadata: { supabase_user_id: userId },
        subscription_data: { metadata: { supabase_user_id: userId } },
        allow_promotion_codes: true,
        success_url: `${origin}/?checkout=success`,
        cancel_url: `${origin}/?checkout=cancelled`,
      },
    })
    return res.status(200).json({ url: session.url })
  } catch (e) {
    return res.status(e.status || 500).json({ error: e.message || 'Could not start checkout.' })
  }
}
