// Shared Stripe + Supabase-admin helpers for the payment endpoints.
// SDK-free on purpose: Vercel api/ functions are unbundled ESM (see
// [[vercel-api-unbundled-esm]]), so we talk to Stripe over its plain REST API
// with fetch and verify webhooks with node:crypto — no `stripe` dep, same
// approach the chat endpoint uses for the OpenAI-compatible providers.
// Explicit .js extension on any relative import for the same unbundled reason.
import crypto from 'node:crypto'
import { createClient } from '@supabase/supabase-js'

export const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || ''
export const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''
export const PRICE_MONTHLY = process.env.STRIPE_PRICE_MONTHLY || ''
export const PRICE_ANNUAL = process.env.STRIPE_PRICE_ANNUAL || ''
// Where Stripe sends the user back after checkout / portal. Falls back to the
// request origin so previews and prod both work without another env var.
export const APP_URL = process.env.APP_URL || ''

export const stripeConfigured = () => !!STRIPE_SECRET

// A service-role Supabase client: bypasses RLS so the webhook can write the
// entitlement columns the client is forbidden from touching. Never ships to the
// browser (server env only). Returns null if the server isn't configured, so
// callers degrade to a clear 500 instead of throwing.
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return null
  return createClient(url, serviceKey, { auth: { persistSession: false } })
}

// Minimal Stripe REST call. Stripe expects application/x-www-form-urlencoded with
// PHP-style bracket keys for nested params; `form()` below builds that shape.
export async function stripe(path, { method = 'POST', body } = {}) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body ? form(body) : undefined,
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = json?.error?.message || `Stripe ${res.status}`
    throw Object.assign(new Error(msg), { status: res.status, stripe: json?.error })
  }
  return json
}

// Flatten a nested object into Stripe's bracketed form encoding, e.g.
//   { line_items: [{ price: 'x', quantity: 1 }] }
//   -> line_items[0][price]=x&line_items[0][quantity]=1
function form(obj, prefix = '', out = new URLSearchParams()) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue
    const key = prefix ? `${prefix}[${k}]` : k
    if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (item !== null && typeof item === 'object') form(item, `${key}[${i}]`, out)
        else out.append(`${key}[${i}]`, String(item))
      })
    } else if (typeof v === 'object') {
      form(v, key, out)
    } else {
      out.append(key, String(v))
    }
  }
  return out.toString()
}

// Verify a Stripe webhook signature against the raw request body. Stripe signs
// `${timestamp}.${rawBody}` with HMAC-SHA256 keyed by the webhook secret and
// sends it as `t=…,v1=…` in the Stripe-Signature header. Timing-safe compare;
// rejects signatures older than the tolerance to blunt replay. Returns the
// parsed event on success, throws otherwise.
export function verifyWebhook(rawBody, sigHeader, toleranceSec = 300) {
  if (!WEBHOOK_SECRET) throw new Error('webhook secret not set')
  const parts = Object.fromEntries(
    String(sigHeader || '').split(',').map((p) => p.split('=').map((s) => s.trim())),
  )
  const t = parts.t
  const v1 = parts.v1
  if (!t || !v1) throw new Error('malformed signature header')
  const expected = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(`${t}.${rawBody}`, 'utf8')
    .digest('hex')
  const a = Buffer.from(expected, 'hex')
  const b = Buffer.from(v1, 'hex')
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) throw new Error('signature mismatch')
  if (Math.abs(Date.now() / 1000 - Number(t)) > toleranceSec) throw new Error('timestamp outside tolerance')
  return JSON.parse(rawBody)
}

// Read the raw request body (needed for webhook signature verification, since a
// parsed body can't be re-serialized byte-for-byte). Endpoints that use this
// must set `export const config = { api: { bodyParser: false } }`.
export function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => chunks.push(c))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

// Map a Stripe price id to our plan name. Anything unrecognized is treated as a
// paid recurring plan of unknown cadence ('monthly' is the safe default for the
// expiry math since it's the shortest window).
export function planForPrice(priceId) {
  if (priceId && priceId === PRICE_ANNUAL) return 'annual'
  if (priceId && priceId === PRICE_MONTHLY) return 'monthly'
  return 'monthly'
}
