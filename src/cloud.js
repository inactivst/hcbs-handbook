// ─── RightsBook optional cloud account (email code → PIN → E2E vault) ───────
// RightsBook works fully WITHOUT an account. Signing in only ADDS a feature:
// conversation history kept indefinitely, end-to-end encrypted, across devices.
// The server only ever sees ciphertext; the vault key is wrapped by the user's
// PIN and stored in `profiles`, so a new device recovers with email code + PIN.
// See [[pin-vault-auth-port-recipe]] + [[dev-sandbox-supabase-org]].
import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from './supabase.js'
import { tr } from './i18n.js'
import {
  createVaultKey, wrapVaultKeyWithPin, unwrapVaultKeyWithPin,
  encryptStr, decryptStr, encryptBytes, decryptBytes, newSalt, saltToB64, saltFromB64,
  localPin, localSalt, localEmail,
} from './vault.js'

const APP_TYPE = 'rightsbook'
const isUuid = (s) => typeof s === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s)

// Auto-lock: how long the vault stays unlocked in the background before asking
// for the PIN again. Seconds; '-1' = never, '0' = immediately on hide.
// (Matches the Book/GuestBook lock-delay model.) Default: never (no surprise
// lock-outs for users who may find repeated PIN entry hard).
const LOCK_DELAY_KEY = 'rightsbook-lock-delay'
const HIDE_TS_KEY = 'rightsbook-hide-ts' // sessionStorage: when the app was last hidden

// One-time migration from the pre-rebrand "handbook-*" key names. Copies the old
// value forward if the new key is still empty; never deletes the old key.
try {
  if (localStorage.getItem(LOCK_DELAY_KEY) === null) {
    const old = localStorage.getItem('handbook-lock-delay')
    if (old !== null) localStorage.setItem(LOCK_DELAY_KEY, old)
  }
} catch { /* no-op */ }
try {
  if (sessionStorage.getItem(HIDE_TS_KEY) === null) {
    const old = sessionStorage.getItem('handbook-hide-ts')
    if (old !== null) sessionStorage.setItem(HIDE_TS_KEY, old)
  }
} catch { /* no-op */ }

// The wrapped vault key is a { iv, data } object, but the profiles.encrypted_vault_key
// column is TEXT, so it round-trips through the DB as a JSON string. Normalize on
// read so the new-device recover path (which reads from the DB) unwraps the same
// object shape the local unlock path uses. Accepts an object or a JSON string.
const parseWrapped = (v) => {
  if (v && typeof v === 'object') return v
  try { return JSON.parse(v) } catch { return null }
}

// status: 'off' (no cloud configured) | 'signed_out' | 'code_sent' | 'need_pin' | 'ready'
// pinMode (while 'need_pin'): 'setup' (first account) | 'unlock' (known device) | 'recover' (new device)
export function useCloud() {
  const [status, setStatus] = useState(supabase ? 'signed_out' : 'off')
  const [pinMode, setPinMode] = useState('setup')
  const [email, setEmail] = useState(() => localEmail.get())
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // Entitlement (the paid Vault subscription). PLAINTEXT, unlike vault data: the
  // payment webhook writes these columns server-side and we read them here to
  // gate the Vault UI — no vault key involved. They carry no PHI (just a plan
  // name + expiry), so reading them before/without PIN unlock is fine.
  const [plan, setPlan] = useState('free')            // 'free'|'monthly'|'annual'|'lifetime'
  const [entitledUntil, setEntitledUntil] = useState(null)
  const [stripeCustomerId, setStripeCustomerId] = useState(null)

  // The live vault key never leaves memory. A ref so async sync helpers always
  // read the current key without being re-created on every render.
  const keyRef = useRef(null)
  const userRef = useRef(null)

  // On mount, pick up an existing Supabase session (the user may already be
  // signed in from a previous visit) and route to the right PIN step.
  useEffect(() => {
    if (!supabase) return
    let alive = true
    ;(async () => {
      const { data } = await supabase.auth.getSession()
      const user = data?.session?.user
      if (!alive || !user) return
      userRef.current = user
      setEmail(user.email || localEmail.get())
      await routeAfterAuth(user)
    })()
    // The sign-in email carries a LINK (Supabase locks the code template behind
    // custom SMTP). The link may complete auth in this tab (detectSessionInUrl)
    // or another tab of the same browser; either way this listener moves an
    // awaiting-code sheet forward to the PIN step.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user
      if (event === 'SIGNED_IN' && user && !userRef.current) {
        userRef.current = user
        setEmail(user.email || localEmail.get())
        routeAfterAuth(user)
      }
    })
    return () => { alive = false; sub?.subscription?.unsubscribe() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Copy the entitlement fields off a fetched profile row into state. Safe to
  // call with null (a brand-new account has no row yet) — stays 'free'.
  const applyEntitlement = useCallback((profile) => {
    setPlan(profile?.plan || 'free')
    setEntitledUntil(profile?.entitled_until || null)
    setStripeCustomerId(profile?.stripe_customer_id || null)
  }, [])

  // Decide which PIN step a freshly-authenticated user needs.
  const routeAfterAuth = useCallback(async (user) => {
    let profile = null
    try {
      const { data } = await supabase
        .from('profiles')
        .select('kdf_salt, encrypted_vault_key, plan, entitled_until, stripe_customer_id')
        .eq('id', user.id).maybeSingle()
      profile = data
    } catch { /* treat as no profile */ }
    applyEntitlement(profile)
    if (!profile || !profile.encrypted_vault_key) {
      setPinMode('setup')            // brand-new account
    } else if (localPin.has() && localSalt.get()) {
      setPinMode('unlock')           // known device: unwrap the local wrapped key
    } else {
      setPinMode('recover')          // new device: unwrap the cloud key with the PIN
    }
    setStatus('need_pin')
  }, [applyEntitlement])

  // Re-read entitlement for the signed-in user. Called after returning from
  // Stripe checkout (the webhook may land a moment after the redirect, so the
  // caller polls this a few times) and whenever we want the freshest plan.
  const refreshEntitlement = useCallback(async () => {
    const user = userRef.current
    if (!user || !supabase) return
    try {
      const { data } = await supabase
        .from('profiles').select('plan, entitled_until, stripe_customer_id')
        .eq('id', user.id).maybeSingle()
      applyEntitlement(data)
    } catch { /* keep the last known entitlement */ }
  }, [applyEntitlement])

  const sendCode = useCallback(async (rawEmail) => {
    const addr = (rawEmail || '').trim().toLowerCase()
    if (!addr) { setError(tr('errEnterEmail')); return }
    setBusy(true); setError('')
    try {
      const { error: e } = await supabase.auth.signInWithOtp({
        email: addr, options: { shouldCreateUser: true },
      })
      if (e) throw e
      localEmail.set(addr); setEmail(addr)
      setStatus('code_sent')
    } catch (e) {
      setError(e?.message || tr('errSendCode'))
    } finally { setBusy(false) }
  }, [])

  const verifyCode = useCallback(async (code) => {
    const token = (code || '').trim()
    if (!token) { setError(tr('errEnterCode')); return }
    setBusy(true); setError('')
    try {
      const { data, error: e } = await supabase.auth.verifyOtp({
        email, token, type: 'email',
      })
      if (e) throw e
      const user = data?.user
      userRef.current = user
      await routeAfterAuth(user)
    } catch (e) {
      setError(e?.message || tr('errBadCode'))
    } finally { setBusy(false) }
  }, [email, routeAfterAuth])

  // One entry point for all three PIN steps; branches on pinMode.
  const submitPin = useCallback(async (pin) => {
    const user = userRef.current
    if (!user || !pin) return
    setBusy(true); setError('')
    try {
      if (pinMode === 'setup') {
        const vaultKey = await createVaultKey()
        const salt = newSalt()
        const wrapped = await wrapVaultKeyWithPin(vaultKey, pin, salt)
        const saltB64 = saltToB64(salt)
        // Store as an explicit JSON string (the column is TEXT) so it always
        // reads back in a known shape, never relying on driver coercion.
        const { error: e } = await supabase.from('profiles').upsert({
          id: user.id, kdf_salt: saltB64, encrypted_vault_key: JSON.stringify(wrapped), app_type: APP_TYPE,
        })
        if (e) throw e
        localPin.set(wrapped); localSalt.set(saltB64)
        keyRef.current = vaultKey
        setStatus('ready')
      } else if (pinMode === 'unlock') {
        const wrapped = localPin.get()
        const saltB64 = localSalt.get()
        const vaultKey = await unwrapVaultKeyWithPin(wrapped, pin, saltFromB64(saltB64))
        keyRef.current = vaultKey
        setStatus('ready')
      } else { // recover: new device pulls the cloud-wrapped key
        const { data: profile, error: e } = await supabase
          .from('profiles').select('kdf_salt, encrypted_vault_key').eq('id', user.id).maybeSingle()
        if (e) throw e
        if (!profile?.encrypted_vault_key) { setPinMode('setup'); setError(tr('errPinFinish')); return }
        const salt = saltFromB64(profile.kdf_salt)
        const wrapped = parseWrapped(profile.encrypted_vault_key)
        const vaultKey = await unwrapVaultKeyWithPin(wrapped, pin, salt)
        // Mirror the wrapped key locally (as the object, matching setup) so future
        // unlocks on this device are offline + instant.
        localPin.set(wrapped); localSalt.set(profile.kdf_salt)
        keyRef.current = vaultKey
        setStatus('ready')
      }
    } catch (e) {
      // A failed unwrap is almost always a wrong PIN — report it as that, and
      // never clobber the stored wrapped key on failure.
      setError(pinMode === 'setup'
        ? (e?.message || tr('errPinSetup'))
        : tr('errPinWrong'))
    } finally { setBusy(false) }
  }, [pinMode])

  // Lock without signing out: drop the key, keep the session + local wrapped key
  // so the next unlock is a quick PIN entry.
  const lock = useCallback(() => {
    keyRef.current = null
    setPinMode(localPin.has() ? 'unlock' : 'setup')
    setStatus(userRef.current ? 'need_pin' : 'signed_out')
  }, [])

  // Auto-lock delay setting (persisted). '-1' never | '0' immediately | seconds.
  const [lockDelay, setLockDelayState] = useState(() => {
    try { return localStorage.getItem(LOCK_DELAY_KEY) ?? '-1' } catch { return '-1' }
  })
  const setLockDelay = useCallback((v) => {
    setLockDelayState(v)
    try { localStorage.setItem(LOCK_DELAY_KEY, v) } catch { /* just won't persist */ }
  }, [])

  // Enforce the delay on app hide/show. Only relevant while unlocked (a key is
  // in memory). Immediately-on-hide for '0'; on return past the grace period for
  // a positive delay; never for '-1'.
  useEffect(() => {
    const onVis = () => {
      if (!keyRef.current) return
      const delay = Number(localStorage.getItem(LOCK_DELAY_KEY) ?? '-1')
      if (document.hidden) {
        try { sessionStorage.setItem(HIDE_TS_KEY, String(Date.now())) } catch { /* ignore */ }
        if (delay === 0) lock()
      } else if (delay > 0) {
        const hid = Number(sessionStorage.getItem(HIDE_TS_KEY) || 0)
        if (hid && Date.now() - hid > delay * 1000) lock()
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [lock])

  // Full sign-out: end the session and clear ALL local account material so a
  // different account can sign in cleanly on this device (no stale PIN wrap).
  const signOut = useCallback(async () => {
    setBusy(true)
    try { await supabase?.auth.signOut() } catch { /* ignore */ }
    keyRef.current = null; userRef.current = null
    localPin.clear(); localSalt.clear(); localEmail.clear()
    setEmail(''); setError(''); setPinMode('setup'); setStatus('signed_out')
    setPlan('free'); setEntitledUntil(null); setStripeCustomerId(null)
    setBusy(false)
  }, [])

  const restart = useCallback(() => { setError(''); setStatus('signed_out'); setPinMode('setup') }, [])

  // ─── Vault item sync (E2E) ──────────────────────────────────────────────────
  // Every vault record (conversation history, incident log entries, …) is one
  // encrypted row in vault_items, keyed by the record's own UUID so upserts are
  // idempotent per device and `kind` separates the collections.
  const pushItems = useCallback(async (kind, list) => {
    const key = keyRef.current, user = userRef.current
    if (!key || !user || !supabase || !Array.isArray(list)) return
    const rows = []
    for (const item of list) {
      if (!isUuid(item?.id)) continue // fallback non-uuid ids stay device-local
      rows.push({
        id: item.id, user_id: user.id, kind,
        ciphertext: JSON.stringify(await encryptStr(JSON.stringify(item), key)),
      })
    }
    if (!rows.length) return
    try { await supabase.from('vault_items').upsert(rows) } catch { /* offline: retries next change */ }
  }, [])

  const pullItems = useCallback(async (kind) => {
    const key = keyRef.current, user = userRef.current
    if (!key || !user || !supabase) return []
    let data = null
    try {
      const res = await supabase
        .from('vault_items').select('id, ciphertext').eq('user_id', user.id).eq('kind', kind)
      data = res.data
    } catch { return [] }
    const out = []
    for (const row of data || []) {
      try {
        const plain = await decryptStr(JSON.parse(row.ciphertext), key)
        if (!plain) continue
        const item = JSON.parse(plain)
        if (item && item.id) out.push(item)
      } catch { /* skip an unreadable row */ }
    }
    return out
  }, [])

  // Hard-delete one vault row (RLS restricts to the owner's rows). Upsert-based
  // sync never removes rows, so deletes must be explicit or they resurrect.
  const deleteItem = useCallback(async (id) => {
    const user = userRef.current
    if (!user || !supabase || !isUuid(id)) return
    try { await supabase.from('vault_items').delete().eq('id', id) } catch { /* offline: row lingers but stays deleted locally */ }
  }, [])

  const pushConversations = useCallback((list) => pushItems('history', list), [pushItems])
  const pullConversations = useCallback(() => pullItems('history'), [pullItems])

  // ─── Vault file storage (E2E) ───────────────────────────────────────────────
  // File bytes are encrypted client-side, then uploaded to the private `vault`
  // bucket under {uid}/{name}. The server stores only ciphertext; RLS keeps each
  // user inside their own folder. `name` is the file's UUID (full) or UUID.t
  // (thumbnail). Returns true/false so callers can surface upload failures.
  const uploadBytes = useCallback(async (name, arrayBuffer) => {
    const key = keyRef.current, user = userRef.current
    if (!key || !user || !supabase) return false
    try {
      const enc = await encryptBytes(arrayBuffer, key)
      const { error: e } = await supabase.storage.from('vault')
        .upload(`${user.id}/${name}`, new Blob([enc], { type: 'application/octet-stream' }), { upsert: true })
      return !e
    } catch { return false }
  }, [])

  const downloadBytes = useCallback(async (name) => {
    const key = keyRef.current, user = userRef.current
    if (!key || !user || !supabase) return null
    try {
      const { data, error: e } = await supabase.storage.from('vault').download(`${user.id}/${name}`)
      if (e || !data) return null
      return await decryptBytes(await data.arrayBuffer(), key)
    } catch { return null }
  }, [])

  const removeBytes = useCallback(async (names) => {
    const user = userRef.current
    if (!user || !supabase || !names?.length) return
    try { await supabase.storage.from('vault').remove(names.map((n) => `${user.id}/${n}`)) } catch { /* leaves orphan object; row already gone */ }
  }, [])

  // The gate the Vault UI reads: lifetime, or a dated plan not yet expired.
  // Mirrors public.is_entitled() in the SQL so client + server agree.
  const entitled = plan === 'lifetime'
    || ((plan === 'monthly' || plan === 'annual') && !!entitledUntil && new Date(entitledUntil).getTime() > Date.now())

  return {
    status, pinMode, email, error, busy,
    setEmail, setError,
    sendCode, verifyCode, submitPin, lock, signOut, restart,
    lockDelay, setLockDelay,
    pushConversations, pullConversations,
    pushItems, pullItems, deleteItem,
    uploadBytes, downloadBytes, removeBytes,
    hasKey: () => !!keyRef.current,
    plan, entitled, entitledUntil, stripeCustomerId, refreshEntitlement,
    userId: userRef.current?.id || null,
  }
}

// Merge cloud + local conversation lists: union by id, and for a shared id keep
// whichever has more messages (a superset is the newer edit). Newest first.
export function mergeConversations(local, cloud) {
  const byId = new Map()
  for (const c of [...(local || []), ...(cloud || [])]) {
    if (!c?.id) continue
    const prev = byId.get(c.id)
    if (!prev || (c.messages?.length || 0) >= (prev.messages?.length || 0)) byId.set(c.id, c)
  }
  return [...byId.values()].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
}
