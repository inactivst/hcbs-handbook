// Open a Stripe billing-portal session so a subscriber can update their card,
// change plan, or cancel — Apple requires an equivalent manage/cancel path on
// iOS, and this is the web one. The client POSTs { customerId } (the profile's
// stripe_customer_id) and we return the portal URL to redirect to.
import { stripe, stripeConfigured, APP_URL } from './_stripe.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!stripeConfigured()) return res.status(503).json({ error: 'Payments are not configured yet.' })

  const { customerId } = req.body || {}
  if (!customerId) return res.status(400).json({ error: 'customerId required' })

  const origin = APP_URL || req.headers.origin || `https://${req.headers.host}`
  try {
    const session = await stripe('billing_portal/sessions', {
      body: { customer: customerId, return_url: `${origin}/` },
    })
    return res.status(200).json({ url: session.url })
  } catch (e) {
    return res.status(e.status || 500).json({ error: e.message || 'Could not open billing portal.' })
  }
}
