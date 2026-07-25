// Best-effort abuse brake for the public endpoints. Underscore prefix = not exposed
// as an API route (same as _corpus.js).
//
// /api/chat takes no auth on purpose: the whole product promise is that a resident
// can ask about their rights without making an account. That also means anyone can
// point a script at it and burn the free-tier quota - or real money, since
// PROVIDER_ORDER can end in the paid xAI provider.
//
// HONEST LIMITS: serverless instances don't share memory, so the counter is
// per-warm-instance and resets on a cold start. That is enough to stop a single
// naive loop, and NOT enough to stop a distributed or patient attacker. If abuse
// ever shows up for real, move this to Vercel KV / Upstash so the window is shared,
// and keep the same call shape.
const HITS = new Map() // key -> number[] (request timestamps inside the window)
const MAX_KEYS = 5000  // bound the map so a spray of spoofed IPs can't grow it forever

// The caller's IP as Vercel reports it. x-forwarded-for is a comma list with the
// client first; everything after it is proxy hops we don't want to key on.
export function clientIp(req) {
  const fwd = req.headers['x-forwarded-for']
  const first = Array.isArray(fwd) ? fwd[0] : String(fwd || '').split(',')[0]
  return (first || req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown').trim()
}

// Sliding window. Returns { ok, retryAfter } - retryAfter is whole seconds until the
// oldest hit in the window ages out, for the Retry-After header.
export function rateLimit(key, { limit = 20, windowMs = 5 * 60 * 1000 } = {}) {
  const now = Date.now()
  const cutoff = now - windowMs

  // Opportunistic sweep: drop keys whose whole window has aged out. Cheap because
  // it only runs when the map is already at its ceiling.
  if (HITS.size > MAX_KEYS) {
    for (const [k, times] of HITS) {
      if (!times.length || times[times.length - 1] < cutoff) HITS.delete(k)
    }
    // Still over after the sweep: every key is live, so start fresh rather than
    // grow without bound. Worst case a burst of legitimate callers gets a reprieve.
    if (HITS.size > MAX_KEYS) HITS.clear()
  }

  const times = (HITS.get(key) || []).filter((t) => t > cutoff)
  if (times.length >= limit) {
    HITS.set(key, times)
    return { ok: false, retryAfter: Math.max(1, Math.ceil((times[0] + windowMs - now) / 1000)) }
  }
  times.push(now)
  HITS.set(key, times)
  return { ok: true, retryAfter: 0 }
}
