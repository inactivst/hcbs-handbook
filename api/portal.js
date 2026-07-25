// Open a Stripe billing-portal session so a subscriber can update their card,
// change plan, or cancel — Apple requires an equivalent manage/cancel path on
// iOS, and this is the web one.
//
// SECURITY: the caller proves who they are with their Supabase access token, and
// the Stripe customer id is then read from THEIR OWN profile row. It is never taken
// from the request body. The earlier version accepted `{ customerId }` from the
// client and opened a portal for it, so anyone who learned or guessed a customer id
// could read that person's invoices and billing details and cancel their plan. The
// endpoint is dormant while Stripe is unconfigured, but it is publicly reachable and
// would have gone live the moment keys were set.
import { stripe, stripeConfigured, supabaseAdmin, APP_URL } from './_stripe.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!stripeConfigured()) return res.status(503).json({ error: 'Payments are not configured yet.' })

  const authz = req.headers.authorization || ''
  const token = authz.startsWith('Bearer ') ? authz.slice(7) : ''
  if (!token) return res.status(401).json({ error: 'Sign in first.' })

  const admin = supabaseAdmin()
  if (!admin) return res.status(500).json({ error: 'Server missing Supabase service credentials.' })

  const { data: authData, error: authError } = await admin.auth.getUser(token)
  const user = authData?.user
  if (authError || !user) return res.status(401).json({ error: 'Your session expired. Please sign in again.' })

  const { data: profile } = await admin
    .from('profiles').select('stripe_customer_id').eq('id', user.id).maybeSingle()
  const customerId = profile?.stripe_customer_id
  if (!customerId) return res.status(400).json({ error: 'No billing account found for this login.' })

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
