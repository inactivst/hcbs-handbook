// Stripe webhook: the ONLY writer of the entitlement columns on `profiles`.
// Stripe calls this on purchase and every renewal/cancellation; we verify the
// signature, then set plan + entitled_until + stripe_customer_id via the
// service-role client (bypassing RLS, which forbids the browser from touching
// these columns). Idempotent: every event recomputes state from the current
// subscription, so replays and out-of-order delivery converge to the truth.
//
// bodyParser MUST be off — signature verification needs the exact raw bytes.
import {
  stripe, stripeConfigured, verifyWebhook, readRawBody,
  supabaseAdmin, planForPrice,
} from './_stripe.js'

export const config = { api: { bodyParser: false } }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  if (!stripeConfigured()) return res.status(503).json({ error: 'Payments not configured.' })

  const admin = supabaseAdmin()
  if (!admin) return res.status(500).json({ error: 'Server missing Supabase service credentials.' })

  let event
  try {
    const raw = await readRawBody(req)
    event = verifyWebhook(raw, req.headers['stripe-signature'])
  } catch (e) {
    // A bad signature is a hard reject — never trust an unverified event.
    return res.status(400).json({ error: `Webhook signature failed: ${e.message}` })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object
        const userId = s.client_reference_id || s.metadata?.supabase_user_id
        // Subscription checkouts always attach a subscription id; fetch it to
        // read the real period end + price rather than trusting the session.
        if (s.subscription) {
          const sub = await stripe(`subscriptions/${s.subscription}`, { method: 'GET' })
          await applySubscription(admin, sub, { userId, customerId: s.customer })
        }
        break
      }
      // Fires on renewal, plan change, cancel-at-period-end, and cancellation.
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        await applySubscription(admin, event.data.object, {})
        break
      }
      // Renewal payment succeeded — refresh the expiry from the subscription.
      case 'invoice.paid': {
        const inv = event.data.object
        if (inv.subscription) {
          const sub = await stripe(`subscriptions/${inv.subscription}`, { method: 'GET' })
          await applySubscription(admin, sub, { customerId: inv.customer })
        }
        break
      }
      default:
        break // ignore everything else
    }
  } catch (e) {
    // Return 500 so Stripe retries; the handler is idempotent so a retry is safe.
    return res.status(500).json({ error: e.message || 'Webhook handling failed.' })
  }

  return res.status(200).json({ received: true })
}

// Write entitlement for the user behind a subscription. Resolves the user by
// (in order) explicit userId, the subscription's metadata, or the stripe
// customer id already on a profile row. Active/trialing → the bought plan with
// entitled_until = current period end; anything else → back to 'free'.
async function applySubscription(admin, sub, { userId, customerId }) {
  const uid = userId
    || sub.metadata?.supabase_user_id
    || (await userIdForCustomer(admin, customerId || sub.customer))
  if (!uid) return // can't attribute — nothing safe to write

  const active = sub.status === 'active' || sub.status === 'trialing'
  const priceId = sub.items?.data?.[0]?.price?.id
  const plan = active ? planForPrice(priceId) : 'free'
  const entitledUntil = active && sub.current_period_end
    ? new Date(sub.current_period_end * 1000).toISOString()
    : null

  await admin.from('profiles').update({
    plan,
    entitled_until: entitledUntil,
    stripe_customer_id: (customerId || sub.customer) ?? undefined,
  }).eq('id', uid)
}

async function userIdForCustomer(admin, customerId) {
  if (!customerId) return null
  const { data } = await admin
    .from('profiles').select('id').eq('stripe_customer_id', customerId).maybeSingle()
  return data?.id || null
}
