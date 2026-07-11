// ─── HandBook end-to-end vault crypto ───────────────────────────────────────
// AES-GCM vault-key pattern, copied VERBATIM from the Book/GuestBook suite.
// NEVER change the iterations, algorithm, or key size: the wrapped vault key is
// stored in the cloud, and a new device recovers it with email code + PIN only.
// Any parameter drift means a previously-wrapped key can no longer be unwrapped
// and the user is locked out of their own data. See [[pin-vault-auth-port-recipe]].

// btoa() on a large Uint8Array via String.fromCharCode(...bytes) overflows the
// call stack; 32KB chunks stay under the argument-count limit at any size.
export const u8ToB64 = (u8) => {
  let s = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < u8.length; i += CHUNK) {
    s += String.fromCharCode.apply(null, u8.subarray(i, i + CHUNK));
  }
  return btoa(s);
};

const b64ToU8 = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

// A fresh random salt for a new account. Stored (non-secret) in the profile so
// any device can re-derive the PIN wrapping key.
export const newSalt = () => crypto.getRandomValues(new Uint8Array(16));
export const saltToB64 = (salt) => u8ToB64(salt);
export const saltFromB64 = (b64) => b64ToU8(b64);

const deriveWrappingKey = async (pin, salt) => {
  const km = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(pin), { name: "PBKDF2" }, false, ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    km,
    { name: "AES-GCM", length: 256 },
    false,
    ["wrapKey", "unwrapKey"]
  );
};

export const createVaultKey = () =>
  crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);

export const wrapVaultKey = async (vaultKey, wrappingKey) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const wrapped = await crypto.subtle.wrapKey("raw", vaultKey, wrappingKey, { name: "AES-GCM", iv });
  return { iv: u8ToB64(iv), data: u8ToB64(new Uint8Array(wrapped)) };
};

export const unwrapVaultKey = async (wrapped, wrappingKey) => {
  const iv = b64ToU8(wrapped.iv);
  const data = b64ToU8(wrapped.data);
  return crypto.subtle.unwrapKey(
    "raw", data, wrappingKey,
    { name: "AES-GCM", iv },
    { name: "AES-GCM", length: 256 },
    true, ["encrypt", "decrypt"]
  );
};

// String → { __enc, iv, ct } envelope. Passes plaintext through untouched when
// there is no key or it is already encrypted, so callers can encrypt idempotently.
export const encryptStr = async (str, key) => {
  if (!str || !key) return str;
  if (str?.__enc) return str;
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(str));
  return { __enc: true, iv: u8ToB64(iv), ct: u8ToB64(new Uint8Array(ct)) };
};

// Inverse of encryptStr. Returns the value untouched when it is not an envelope,
// and null on a decrypt failure (wrong key / tampered ciphertext) — callers must
// treat null as "could not read" and never clobber good data with it.
export const decryptStr = async (val, key) => {
  if (!val?.__enc) return val;
  if (!key) return null;
  try {
    const iv = b64ToU8(val.iv);
    const ct = b64ToU8(val.ct);
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
    return new TextDecoder().decode(pt);
  } catch { return null; }
};

// Binary file encryption (photos, documents) under the same vault key. Layout:
// [12-byte IV][AES-GCM ciphertext]. Returns a Uint8Array the caller wraps in a
// Blob to upload - the server only ever stores this ciphertext, never the file.
export const encryptBytes = async (arrayBuffer, key) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, arrayBuffer);
  const out = new Uint8Array(12 + ct.byteLength);
  out.set(iv, 0);
  out.set(new Uint8Array(ct), 12);
  return out;
};

// Inverse of encryptBytes. Throws on a bad key / tampered ciphertext - callers
// must catch and treat it as "could not read".
export const decryptBytes = async (bytes, key) => {
  const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  const iv = u8.subarray(0, 12);
  const ct = u8.subarray(12);
  return crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
};

// Derive the PIN wrapping key + wrap/unwrap the vault key. Thin wrappers so the
// PIN string and salt never leak past this module.
export const wrapVaultKeyWithPin = async (vaultKey, pin, salt) =>
  wrapVaultKey(vaultKey, await deriveWrappingKey(pin, salt));

export const unwrapVaultKeyWithPin = async (wrapped, pin, salt) =>
  unwrapVaultKey(wrapped, await deriveWrappingKey(pin, salt));

// ─── Namespaced local storage (handbook-*) — never collide with other apps ───
const PIN_KEY = "handbook-pin";        // wrapped vault key JSON (device-local)
const SALT_KEY = "handbook-enc-salt";  // b64 salt mirror for local unlock
const EMAIL_KEY = "handbook-cloud-email";

export const localPin = {
  get: () => { try { return JSON.parse(localStorage.getItem(PIN_KEY)); } catch { return null; } },
  set: (wrapped) => { try { localStorage.setItem(PIN_KEY, JSON.stringify(wrapped)); } catch { /* no-op */ } },
  clear: () => { try { localStorage.removeItem(PIN_KEY); } catch { /* no-op */ } },
  has: () => { try { return !!localStorage.getItem(PIN_KEY); } catch { return false; } },
};
export const localSalt = {
  get: () => { try { return localStorage.getItem(SALT_KEY) || null; } catch { return null; } },
  set: (b64) => { try { localStorage.setItem(SALT_KEY, b64); } catch { /* no-op */ } },
  clear: () => { try { localStorage.removeItem(SALT_KEY); } catch { /* no-op */ } },
};
export const localEmail = {
  get: () => { try { return localStorage.getItem(EMAIL_KEY) || ""; } catch { return ""; } },
  set: (e) => { try { localStorage.setItem(EMAIL_KEY, e); } catch { /* no-op */ } },
  clear: () => { try { localStorage.removeItem(EMAIL_KEY); } catch { /* no-op */ } },
};
