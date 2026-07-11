// ─── HandBook optional cloud account (email code → PIN → E2E vault) ──────────
// HandBook works fully WITHOUT an account. Signing in only ADDS a feature:
// conversation history kept indefinitely, end-to-end encrypted, across devices.
// The server only ever sees ciphertext; the vault key is wrapped by the user's
// PIN and stored in `profiles`, so a new device recovers with email code + PIN.
// See [[pin-vault-auth-port-recipe]] + [[dev-sandbox-supabase-org]].
import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from './supabase.js'
import { tr } from './i18n.js'
import {
  createVaultKey, wrapVaultKeyWithPin, unwrapVaultKeyWithPin,
  encryptStr, decryptStr, newSalt, saltToB64, saltFromB64,
  localPin, localSalt, localEmail,
} from './vault.js'

const APP_TYPE = 'hcbs-handbook'
const isUuid = (s) => typeof s === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s)

// status: 'off' (no cloud configured) | 'signed_out' | 'code_sent' | 'need_pin' | 'ready'
// pinMode (while 'need_pin'): 'setup' (first account) | 'unlock' (known device) | 'recover' (new device)
export function useCloud() {
  const [status, setStatus] = useState(supabase ? 'signed_out' : 'off')
  const [pinMode, setPinMode] = useState('setup')
  const [email, setEmail] = useState(() => localEmail.get())
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

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

  // Decide which PIN step a freshly-authenticated user needs.
  const routeAfterAuth = useCallback(async (user) => {
    let profile = null
    try {
      const { data } = await supabase
        .from('profiles').select('kdf_salt, encrypted_vault_key').eq('id', user.id).maybeSingle()
      profile = data
    } catch { /* treat as no profile */ }
    if (!profile || !profile.encrypted_vault_key) {
      setPinMode('setup')            // brand-new account
    } else if (localPin.has() && localSalt.get()) {
      setPinMode('unlock')           // known device: unwrap the local wrapped key
    } else {
      setPinMode('recover')          // new device: unwrap the cloud key with the PIN
    }
    setStatus('need_pin')
  }, [])

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
        const { error: e } = await supabase.from('profiles').upsert({
          id: user.id, kdf_salt: saltB64, encrypted_vault_key: wrapped, app_type: APP_TYPE,
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
        const vaultKey = await unwrapVaultKeyWithPin(profile.encrypted_vault_key, pin, salt)
        // Mirror the wrapped key locally so future unlocks are offline + instant.
        localPin.set(profile.encrypted_vault_key); localSalt.set(profile.kdf_salt)
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

  // Full sign-out: end the session and clear ALL local account material so a
  // different account can sign in cleanly on this device (no stale PIN wrap).
  const signOut = useCallback(async () => {
    setBusy(true)
    try { await supabase?.auth.signOut() } catch { /* ignore */ }
    keyRef.current = null; userRef.current = null
    localPin.clear(); localSalt.clear(); localEmail.clear()
    setEmail(''); setError(''); setPinMode('setup'); setStatus('signed_out')
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

  return {
    status, pinMode, email, error, busy,
    setEmail, setError,
    sendCode, verifyCode, submitPin, lock, signOut, restart,
    pushConversations, pullConversations,
    pushItems, pullItems, deleteItem,
    hasKey: () => !!keyRef.current,
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
