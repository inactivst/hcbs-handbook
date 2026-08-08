import React, { useCallback, useContext, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FEDERAL, STATES, US_STATES, SERVICE_CODE_GROUPS, SERVICE_CODES_SOURCE } from '../api/_corpus.js'
import { useCloud, mergeConversations } from './cloud.js'
import { LANG_OPTIONS, LangContext, getStoredLang, storeLang, useT, tr } from './i18n.js'
import { CENTERS, COUNTY_TO_RC, LA_CENTERS, COUNTIES, siblingCounties, CA_MAP, DDS_LOOKUP_URL } from './regionalCenters.js'
import { STATE_GUIDE, hasStateGuide } from './stateGuide.js'
import { compareStates, COMPARE_TOPICS } from './compareStates.js'
import { FEDERAL_TERMS, getStateTerms } from './glossary.js'
import { IS_NATIVE, rcAvailable, rcLoadPricing, rcCheckEntitlement, rcPurchase, rcRestore, withTimeout } from './purchases.js'

// Native shells must call the API at an absolute origin; web uses relative.
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || ''

// Legal links shown on the paywall. Both must be ABSOLUTE: inside the native
// shell a relative /privacy.html resolves against the bundled app, where the
// page isn't served. Terms of Use is Apple's standard EULA, which is what the
// App Store listing points at too (Guideline 3.1.2).
const PRIVACY_URL = 'https://rightsbook.thebook.ltd/privacy.html'
const APPLE_EULA_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'

// History lives ONLY in the browser's localStorage on this device - never sent
// to a server, never shared. Keeps the privacy posture: the app stores nothing
// server-side. Capped so storage can't grow without bound (code-for-scale).
// (Future accounts will keep history indefinitely in the cloud; local stays capped.)
const STORE_KEY = 'rightsbook.conversations.v1'
const MAX_CONVERSATIONS = 50

// The user's chosen state grounds every answer and the Rights page. Empty until
// the first-launch prompt is answered; persisted on this device like history.
const STATE_KEY = 'rightsbook.state.v1'

// One-time migration from the pre-rebrand "handbook.*" key names. Copies the old
// value forward if the new key is still empty; never deletes the old key, so it
// stays as a safe fallback.
const migrateLocalKey = (oldKey, newKey) => {
  try {
    if (localStorage.getItem(newKey) === null) {
      const old = localStorage.getItem(oldKey)
      if (old !== null) localStorage.setItem(newKey, old)
    }
  } catch { /* no-op */ }
}
migrateLocalKey('handbook.conversations.v1', STORE_KEY)
migrateLocalKey('handbook.state.v1', STATE_KEY)

// Error reports from answers go to a dedicated alias (never a personal inbox
// baked into the app). SOURCES_REVIEWED is the date of the last human pass over
// a state's content, shown ONLY for states whose facts were actually verified
// against official sources - never badge the unvetted federal-flavor states
// (that would manufacture a trust signal we can't back).
const REPORT_EMAIL = 'californiadepartmentoflove+rightsbook@gmail.com'
const SOURCES_REVIEWED = '2026-07-13'
const REVIEWED_STATES = new Set(['CA'])

// Injected by vite.config.js `define` from package.json + build time.
const APP_VERSION = __APP_VERSION__
const APP_BUILD = __APP_BUILD__
// Dates the app shows are formatted in the reader's language, never a bare ISO string.
const DATE_LOCALE = { en: 'en-US', es: 'es-ES', tl: 'fil-PH' }
const buildDate = (lang) => {
  try {
    return new Date(APP_BUILD).toLocaleDateString(DATE_LOCALE[lang] || 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' })
  } catch { return APP_BUILD }
}

const STATE_OPTIONS = Object.entries(US_STATES).map(([value, label]) => ({ value, label }))
const stateName = (code) => US_STATES[code] || code
const stateCovered = (code) => !!STATES[code]

// Professional, neutral palette (greige + teal) - distinct from the warm cream
// of the other Book apps. `border` is the refined outlined-field/card tone
// (ported from GuestBook's restyle: a REAL border instead of a near-invisible
// hairline); `line` stays for internal separators.
const C = {
  bg: '#F4F3F1',
  card: '#FFFFFF',
  surface: '#FFFFFF',
  ink: '#2B2A28',
  sub: '#6E6A64',
  // Was #8A857D, which measured 3.3:1 on the page background - a fail at the
  // 11-13px sizes it is used at, and it carries the citations and the "sources last
  // reviewed" date, the two things a reader has to be able to check. #726D66 is
  // 4.63:1 on bg and 5.13:1 on white. It sits very close to `sub` on purpose: a
  // third grey tier cannot be both lighter and legible at this size, so the
  // hierarchy is carried by size and weight instead of colour.
  ink3: '#726D66',
  line: '#E5E2DC',
  lineHard: '#D9D5CE',
  border: 'rgba(43,42,40,0.14)',
  // Was #2E7D74: 4.40:1 on bg — just under AA, and this token colours links,
  // active states and the label on every filled button. #2A736B is 5.03:1 on bg
  // and 5.58:1 for white sitting on it. Same hue, one step deeper. (The 2026-08-06
  // family sweep: ink3 here was already fixed, the accent had not been checked.)
  accent: '#2A736B',
  accentSoft: '#E4EEEC',
  danger: '#C0452C',
  dangerSoft: '#F7E4DF', // the "no" answer / blanket-rule flag tint
  mapBase: '#EDEBE7',    // unselected CA county fill
  mapLine: '#D3CFC8',    // unselected CA county stroke
  cloudOk: '#2E8B40', // brighter "sync is working" green - the portfolio-wide cloud cue (GuestBook/BlackBook)
}

// ─── Shared surface tokens ────────────────────────────────────────────────────
// The card / row / label recipes below were written out inline at ~30 call sites,
// and drifted the way duplicated style always does: eight corner radii for four
// kinds of surface, three sizes of the same uppercase section label, two chevron
// colours for the same "this opens a page" affordance. One definition each, so a
// change lands everywhere and a new screen can't invent a ninth radius.
// sm / md / lg / pill are the portfolio scale, byte-identical to the one
// GuestBook, BlueBook and PerkBook already share - so a value means the same
// thing in every Book app. `control` and `tile` are RightsBook's own two extra
// steps: this app shipped its buttons at 12 and its hub tiles at 16, and moving
// them to fit the scale would shift surfaces that are already in front of
// people for no gain a reader could see.
const R = {
  sm: 10,      // controls nested inside a card (segmented choices)
  control: 12, // buttons, inputs, icon buttons
  md: 14,      // the default: content cards and tappable list rows
  tile: 16,    // square hub tiles + feature cards
  lg: 18,      // the big full-width sorter cards (HubHero)
  pill: 999,
}
const CARD_SHADOW = '0 1px 2px rgba(43,42,40,0.04)'
// A raised surface: white, real border, one soft shadow. Callers add their own
// padding and margin - only the surface itself is shared.
const cardStyle = (radius = R.md) => ({
  background: C.card,
  border: `1px solid ${C.border}`,
  borderRadius: radius,
  boxShadow: CARD_SHADOW,
})
// A tappable card: the same surface, reset as a button.
const cardBtnStyle = (radius = R.md) => ({
  ...cardStyle(radius),
  width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit',
})
// The quiet uppercase run-in above a group. Callers set their own margin.
const sectionLabel = { fontSize: 12, fontWeight: 700, color: C.sub, textTransform: 'uppercase', letterSpacing: 0.6 }
// The label above a field. `margin` covers the gap from the field above it too,
// so a stack of labelled fields spaces itself.
const fieldLabelStyle = { fontSize: 13, fontWeight: 600, color: C.sub, display: 'block', margin: '14px 0 6px' }
// A tinted aside: the accent wash used for "worth knowing" notes inside a flow.
const noteStyle = {
  background: C.accentSoft, border: `1px solid ${C.accent}33`, borderRadius: R.md,
  padding: '13px 14px', fontSize: 13, color: C.ink, lineHeight: 1.5,
}
// One segmented choice button (yes/no/unsure, Browse/Compare, the auto-lock grid).
// `tone` is the colour it takes when chosen; unchosen is always the quiet card.
const segBtnStyle = (active, tone = C.accent, bg = C.accentSoft) => ({
  padding: '9px 6px', borderRadius: R.sm, fontSize: 13, fontWeight: 700,
  cursor: 'pointer', fontFamily: 'inherit', minHeight: 44,
  border: `1px solid ${active ? tone : C.border}`,
  background: active ? bg : C.card,
  color: active ? tone : C.sub,
})

const IS_TOUCH = typeof window !== 'undefined' && !!window.matchMedia?.('(pointer: coarse)')?.matches

// Bottom clearance so scrolled content / the composer never hides behind the
// floating glass nav pill.
const NAV_CLEARANCE = 'calc(env(safe-area-inset-bottom) + 78px)'

const STARTER_KEYS = ['starter1', 'starter2', 'starter3', 'starter4', 'starter5']

// Tallest the composer grows before it starts scrolling internally (~5 lines).
const COMPOSER_MAX = 120

// Hard ceiling on one chat request. The server already races providers and gives
// up on its own; this is the client's own floor under that, for the case where the
// function never answers at all.
const CHAT_TIMEOUT_MS = 45000

// Which translated sentence a failed chat request earns. Server failures carry a
// stable `code` (api/chat.js); everything else is inferred here. The point is that
// nothing raw ever reaches the screen: not "Failed to fetch", not an English server
// string in a Spanish UI, not "no model provider key set".
function chatErrorKey(e) {
  if (e?.name === 'TimeoutError') return 'errTimeout'
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return 'errOffline'
  switch (e?.code) {
    case 'toomany': return 'errTooMany'
    case 'busy': return 'errBusy'
    case 'noprovider': return 'errNoProvider'
    case 'failed': return 'errGeneric'
    default: break
  }
  // fetch() rejects with a TypeError for DNS, refused connections and dropped
  // links - all of which read to a person as "the internet is not working".
  if (e instanceof TypeError) return 'errOffline'
  if (e?.status === 429) return 'errBusy'
  return 'errGeneric'
}

// Off-screen but still read aloud. For status text that a sighted reader gets from
// the answer simply appearing, and a screen-reader user would otherwise never hear.
const SR_ONLY = {
  position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
  overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0,
}

const serif = "Georgia, 'Times New Roman', serif"

function loadConversations() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || '[]')
    if (!Array.isArray(parsed)) return []
    // A compare left mid-flight (app closed while loading) must not persist as
    // an eternal spinner - drop the stub so the dropdown is offered fresh.
    return parsed.map((c) => ({
      ...c,
      messages: (c.messages || []).map((m) =>
        m.compare && (m.compare.loading || (!m.compare.text && !m.compare.error))
          ? { ...m, compare: undefined }
          : m
      ),
    }))
  } catch {
    return []
  }
}

function genId() {
  try {
    return crypto.randomUUID()
  } catch {
    return `c-${Date.now()}-${Math.floor(Math.random() * 1e6)}`
  }
}

function timeAgo(ms, t) {
  const s = Math.floor((Date.now() - ms) / 1000)
  if (s < 60) return t('justNow')
  const m = Math.floor(s / 60)
  if (m < 60) return t('minAgo', { n: m })
  const h = Math.floor(m / 60)
  if (h < 24) return t('hrAgo', { n: h })
  const d = Math.floor(h / 24)
  if (d < 7) return t(d > 1 ? 'daysAgo' : 'dayAgo', { n: d })
  return new Date(ms).toLocaleDateString()
}

// ─── ICONS (inline SVG, GuestBook/Book convention: currentColor, 1.5 stroke) ──
const SvgIcon = ({ children, size = 24, style = {} }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
    style={{ display: 'block', flexShrink: 0, ...style }}
  >
    {children}
  </svg>
)
const IcChevron = ({ size = 24, style, dir = 'down' }) => (
  <SvgIcon size={size} style={{ transform: `rotate(${{ down: 0, up: 180, left: 90, right: -90 }[dir]}deg)`, transition: 'transform 0.15s', ...style }}>
    <polyline points="6 9 12 15 18 9" />
  </SvgIcon>
)
const IcX = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </SvgIcon>
)
const IcCheck = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <polyline points="20 6 9 17 4 12" />
  </SvgIcon>
)
const IcSettings = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </SvgIcon>
)
const IcCloud = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </SvgIcon>
)
// Cloud with a check inside - the portfolio-wide "sync is working" cue
// (GuestBook header + BlackBook paid-sync cloud use the same glyph).
const IcCloudCheck = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    <path d="M9 14.5l2 2 4-4.5" />
  </SvgIcon>
)
const IcTrash = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </SvgIcon>
)
const IcDoc = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </SvgIcon>
)
// ─── Vault tile icons ─────────────────────────────────────────────────────────
const IcClipboard = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3" />
    <path d="M9 12h6" /><path d="M9 16h4" />
  </SvgIcon>
)
const IcClock = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </SvgIcon>
)
const IcImage = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
  </SvgIcon>
)
const IcFileText = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="14" y2="17" />
  </SvgIcon>
)
const IcPhone = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </SvgIcon>
)
const IcShield = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </SvgIcon>
)
// Glossary button (open book).
const IcBook = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" />
    <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" />
  </SvgIcon>
)
// Saved-questions list icon for the History button.
const IcHistory = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="3.5" cy="6" r="0.9" /><circle cx="3.5" cy="12" r="0.9" /><circle cx="3.5" cy="18" r="0.9" />
  </SvgIcon>
)
// Home/program self-check tile.
const IcHome = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" />
  </SvgIcon>
)
// Request-letters tile (envelope).
const IcMail = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
  </SvgIcon>
)
// Read-aloud control (speaker with a sound wave).
const IcSpeaker = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16 8.5a4 4 0 0 1 0 7" />
  </SvgIcon>
)

// Compact human byte size (e.g. "2.4 MB") for the document rows.
const formatBytes = (n) => {
  if (!n || n < 1024) return `${n || 0} B`
  const kb = n / 1024
  if (kb < 1024) return `${Math.round(kb)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

// ─── FIELD STYLE (GuestBook restyle: white well + real border + inset shadow;
// the teal focus ring lives in index.html) ─────────────────────────────────────
const inputStyle = {
  // -webkit-appearance:none is load-bearing: without it iOS Safari ignores
  // width:100% on inputs and sizes them to native content, bleeding off-screen.
  width: '100%', boxSizing: 'border-box', minWidth: 0,
  WebkitAppearance: 'none', appearance: 'none',
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderRadius: 12, padding: '11px 13px',
  // 43px at the default padding - a pixel under the touch floor. Set the floor
  // here rather than at each call site so every field in the app clears it.
  minHeight: 44,
  fontSize: 16, color: C.ink, outline: 'none',
  fontFamily: 'inherit',
  boxShadow: 'inset 0 1px 2px rgba(43,42,40,0.05)',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
}

// A field the reader can look at but not change. The Vault's cleaner view locks
// its forms two different ways - `readOnly` on the text fields, `disabled` on the
// date fields, because readOnly does nothing to a date picker - and with only one
// style between them the same locked form showed some fields as white-and-live
// and others as greyed-out. One recipe, so a locked field looks locked wherever
// it is and whichever attribute did the locking.
const lockedFieldStyle = { background: C.bg, color: C.sub, boxShadow: 'none', opacity: 1, WebkitTextFillColor: C.sub }
const fieldStyle = (locked) => (locked ? { ...inputStyle, ...lockedFieldStyle } : inputStyle)

// ─── SEARCH FIELD ─────────────────────────────────────────────────────────────
// Four screens search a list (glossary, service codes, other states, compare) and
// each had grown its own bare <input>: no search keyboard, no "search" return key,
// and autocapitalise turning "respite" into "Respite" on the way in. The clear
// button matters more than it looks: inputStyle sets -webkit-appearance:none for
// an unrelated iOS sizing bug, and that also removes the native × from a
// type=search field, so without this there is no way to empty the box but
// backspace. Clearing returns focus to the field, since the reason you cleared it
// is that you want to type something else.
function SearchField({ value, onChange, placeholder, style, autoFocus = false }) {
  const t = useT()
  const ref = useRef(null)
  return (
    <div style={{ position: 'relative', ...style }}>
      <input
        ref={ref}
        type="search" inputMode="search" enterKeyHint="search"
        autoCapitalize="none" autoCorrect="off" spellCheck={false} autoComplete="off"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Escape' && value) { e.stopPropagation(); onChange('') } }}
        placeholder={placeholder} aria-label={placeholder}
        style={{ ...inputStyle, paddingRight: value ? 42 : 13 }}
      />
      {value && (
        <button
          type="button"
          onClick={() => { onChange(''); ref.current?.focus() }}
          aria-label={t('clearSearch')}
          style={{
            position: 'absolute', top: 0, right: 0, height: '100%', width: 42,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: C.ink3,
          }}
        >
          <IcX size={16} />
        </button>
      )}
    </div>
  )
}

// ─── SMALL HOOKS ──────────────────────────────────────────────────────────────
function useEscToClose(onClose, active = true) {
  useEffect(() => {
    if (!active) return
    const onKey = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, onClose])
}

// Current on-screen keyboard height (0 when closed), measured via visualViewport.
// Tracks the largest height seen as the "keyboard closed" baseline (self-correcting
// across backgrounding), clamped so a bad reading can never push UI off-screen.
function useKeyboardInset() {
  const [inset, setInset] = useState(0)
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    let maxH = vv.height
    const update = () => {
      if (vv.height > maxH) maxH = vv.height
      setInset(Math.max(0, Math.min(maxH - vv.height, maxH * 0.6)))
    }
    // Returning from background delivers NO visualViewport resize even though the
    // keyboard closed while suspended, so the inset stays stuck at keyboard height
    // (dead gap above the nav) and any scroll the OS applied to the layout viewport
    // sticks too (taps land offset - feels frozen). Re-sync on every resume path,
    // then once more after iOS finishes settling the viewport.
    let resumeTimer = null
    const resync = () => {
      if (window.scrollY || window.scrollX) window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      update()
      clearTimeout(resumeTimer)
      resumeTimer = setTimeout(update, 250)
    }
    const onVis = () => { if (document.visibilityState === 'visible') resync() }
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)
    window.addEventListener('pageshow', resync)
    window.addEventListener('focus', resync)
    document.addEventListener('visibilitychange', onVis)
    update()
    return () => {
      clearTimeout(resumeTimer)
      vv.removeEventListener('resize', update)
      vv.removeEventListener('scroll', update)
      window.removeEventListener('pageshow', resync)
      window.removeEventListener('focus', resync)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])
  return inset
}

// Global field recenter (ported from GuestBook): lift any focused field clear of
// the on-screen keyboard. ONE app-wide mechanism - individual fields must not
// add their own focus-scroll (two scrollers race and overshoot). Native
// date/time pickers are skipped (scrolling dismisses the iOS wheel).
function useGlobalFieldRecenter() {
  useEffect(() => {
    const isField = (el) =>
      !!el && (
        el.tagName === 'TEXTAREA' ||
        (el.tagName === 'INPUT' && !['checkbox', 'radio', 'button', 'submit', 'file', 'range'].includes(el.type)) ||
        el.isContentEditable
      )
    const isNativePicker = (el) =>
      el?.tagName === 'INPUT' && ['date', 'time', 'datetime-local', 'month', 'week'].includes(el.type)
    // iOS sometimes scrolls the LAYOUT viewport itself when an input is focused,
    // even though html/body are overflow:hidden - sliding the fixed shell out of
    // sync with the visual viewport. Snap it back before re-centering.
    const resetScroll = () => {
      if (window.scrollY || window.scrollX) window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
    const scrollableAncestor = (el) => {
      let n = el?.parentElement
      while (n) {
        const oy = getComputedStyle(n).overflowY
        if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight) return n
        n = n.parentElement
      }
      return null
    }
    // Measure against the VISUAL viewport (the area above the keyboard) - layout
    // viewport extends behind the keyboard so scrollIntoView thinks hidden fields
    // are visible. Glide the field to a comfortable line ~30% down the visible area.
    const recenter = (smooth = true) => {
      const el = document.activeElement
      if (isNativePicker(el)) return
      // Modal sheets track the visual viewport themselves and let the browser's
      // native focus-scroll keep the field in view; the page recenter here would
      // fight that and yank the field to the top. Skip fields inside a sheet.
      if (el?.closest?.('[data-sheet-scroll]')) return
      resetScroll()
      if (!isField(el)) return
      const vv = window.visualViewport
      const visTop = vv ? vv.offsetTop : 0
      const visHeight = vv ? vv.height : window.innerHeight
      const visibleBottom = visTop + visHeight
      const rect = el.getBoundingClientRect()
      const margin = 20
      const obscured = rect.bottom > visibleBottom - margin
      const tooHigh = rect.top < visTop + margin
      // A fully VISIBLE field stays PUT - no comfy-line glide (GuestBook 7/20: the
      // glide walked the page under your finger on every focus hop through a stack
      // of visible fields). Act only when the field is genuinely obscured or
      // clipped off the top, and move by the MINIMUM that clears it.
      if (!obscured && !tooHigh) return
      const sc = scrollableAncestor(el)
      const delta = obscured
        ? Math.min(rect.bottom - (visibleBottom - margin), Math.max(0, rect.top - (visTop + margin)))
        : rect.top - (visTop + margin)
      if (Math.abs(delta) < 8) return
      if (sc) sc.scrollBy({ top: delta, behavior: smooth ? 'smooth' : 'auto' })
      else el.scrollIntoView({ block: 'nearest', behavior: smooth ? 'smooth' : 'auto' })
    }
    // FOCUS cascade: one smooth glide after the keyboard starts settling, then
    // instant idempotent top-ups as it finishes / transitions land. RESIZE top-up:
    // the keyboard slide fires visualViewport resize continuously - debounce to ONE
    // instant recenter (a smooth scroll here stacks mid-animation and flings).
    let focusTimers = []
    const clearFocusTimers = () => { focusTimers.forEach(clearTimeout); focusTimers = [] }
    const scheduleFocus = () => {
      clearFocusTimers()
      focusTimers.push(setTimeout(() => recenter(true), 140))
      focusTimers.push(setTimeout(() => recenter(false), 430))
      focusTimers.push(setTimeout(() => recenter(false), 720))
      focusTimers.push(setTimeout(() => recenter(false), 1050))
    }
    let resizeTimer = null
    const scheduleResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => recenter(false), 130) }
    const onFocusIn = (e) => { if (isField(e.target) && !isNativePicker(e.target)) scheduleFocus() }
    document.addEventListener('focusin', onFocusIn)
    window.visualViewport?.addEventListener('resize', scheduleResize)
    return () => {
      clearFocusTimers()
      clearTimeout(resizeTimer)
      document.removeEventListener('focusin', onFocusIn)
      window.visualViewport?.removeEventListener('resize', scheduleResize)
    }
  }, [])
}

// ─── SELECT (ported from GuestBook) - custom dropdown with the chevron-in-a-disc
// affordance; portals its menu to <body> so transformed ancestors can't clip it.
// Commits on tap (never onBlur - iOS doesn't blur when a picker closes). Menu
// min-width 240 so options never wrap. Ready for the state chooser.
function Select({ value, onChange, options = [], placeholder = 'Select…', style, disabled, ariaLabel }) {
  const [open, setOpen] = useState(false)
  const btnRef = useRef(null)
  const menuRef = useRef(null)
  const optRefs = useRef([])
  const listId = useRef(`sel-${genId()}`).current
  const [rect, setRect] = useState(null)
  const opts = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o))
  const sel = opts.find((o) => o.value === value)
  // Closing hands focus back to the trigger. Without it a keyboard user who
  // presses Escape is returned to the top of the document, which on a long
  // settings sheet means losing their place entirely.
  const close = useCallback(() => { setOpen(false); btnRef.current?.focus() }, [])
  useEscToClose(close, open)
  // Arrow keys inside the menu, and Home/End to jump. The options are real
  // buttons, so Enter and Space already select without any handler here.
  const onMenuKey = (e) => {
    const els = optRefs.current.filter(Boolean)
    if (!els.length) return
    const i = els.indexOf(document.activeElement)
    const go = (n) => { e.preventDefault(); els[Math.max(0, Math.min(els.length - 1, n))]?.focus() }
    if (e.key === 'ArrowDown') go(i < 0 ? 0 : i + 1)
    else if (e.key === 'ArrowUp') go(i < 0 ? els.length - 1 : i - 1)
    else if (e.key === 'Home') go(0)
    else if (e.key === 'End') go(els.length - 1)
    else if (e.key === 'Tab') { e.preventDefault(); close() }
  }
  const measure = () => { const b = btnRef.current; if (b) setRect(b.getBoundingClientRect()) }
  // If a field is focused, dismiss the keyboard and let layout settle BEFORE
  // measuring, or the menu anchors to a stale position.
  const openMenu = () => {
    if (disabled) return
    const a = document.activeElement
    if (a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA')) {
      a.blur()
      const vv = window.visualViewport
      const baseline = window.innerHeight
      let tries = 0
      const tick = () => {
        const settled = !vv || Math.abs(vv.height - baseline) < 4
        if (settled || tries++ > 14) { measure(); setOpen(true) }
        else setTimeout(tick, 40)
      }
      setTimeout(tick, 60)
    } else {
      measure(); setOpen(true)
    }
  }
  useEffect(() => {
    if (!open) return
    measure()
    const on = () => measure()
    window.addEventListener('resize', on)
    window.addEventListener('scroll', on, true)
    window.visualViewport?.addEventListener('resize', on)
    const el = menuRef.current
    if (el) {
      el.style.opacity = '0'; el.style.transform = 'translateY(-6px)'
      requestAnimationFrame(() => { el.style.transition = 'opacity 0.14s ease, transform 0.14s ease'; el.style.opacity = '1'; el.style.transform = 'translateY(0)' })
    }
    // Land on the current choice, so the list opens where the reader already is.
    const i = Math.max(0, opts.findIndex((o) => o.value === value))
    optRefs.current[i]?.focus({ preventScroll: true })
    optRefs.current[i]?.scrollIntoView({ block: 'nearest' })
    return () => { window.removeEventListener('resize', on); window.removeEventListener('scroll', on, true); window.visualViewport?.removeEventListener('resize', on) }
  }, [open])

  let menu = null
  if (open && rect) {
    const vw = window.innerWidth, vh = window.innerHeight
    const width = Math.min(Math.max(rect.width, 240), vw - 16)
    const left = Math.max(8, Math.min(rect.left, vw - width - 8))
    const spaceBelow = vh - rect.bottom, spaceAbove = rect.top
    const openUp = spaceBelow < 240 && spaceAbove > spaceBelow
    const maxH = Math.min(360, Math.max(140, (openUp ? spaceAbove : spaceBelow) - 12))
    const vpos = openUp ? { bottom: Math.max(8, vh - rect.top + 6) } : { top: rect.bottom + 6 }
    menu = createPortal(
      <div role="presentation" onClick={close} style={{ position: 'fixed', inset: 0, zIndex: 4000 }}>
        <div
          ref={menuRef}
          id={listId} role="listbox" aria-label={ariaLabel}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={onMenuKey}
          style={{
            position: 'fixed', left, width, ...vpos, maxHeight: maxH, overflowY: 'auto', overscrollBehavior: 'contain',
            background: C.surface, borderRadius: 12, border: `1px solid ${C.line}`,
            boxShadow: '0 10px 34px rgba(43,42,40,0.22)',
          }}
        >
          {opts.map((o, i) => {
            const on = o.value === value
            return (
              <button
                key={o.value} type="button"
                ref={(el) => { optRefs.current[i] = el }}
                role="option" aria-selected={on}
                onClick={() => { onChange(o.value); close() }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
                  background: on ? C.accentSoft : 'transparent', border: 'none', cursor: 'pointer',
                  padding: '12px 14px', borderBottom: i < opts.length - 1 ? `1px solid ${C.line}` : 'none',
                  fontSize: 16, fontFamily: 'inherit',
                  color: on ? C.accent : C.ink, fontWeight: on ? 600 : 400,
                  lineHeight: 1.35,
                }}
              >
                <span style={{ width: 18, flexShrink: 0, display: 'flex' }}>{on && <IcCheck size={18} />}</span>
                <span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.label}</span>
              </button>
            )
          })}
        </div>
      </div>,
      document.body
    )
  }
  return (
    <>
      <button
        ref={btnRef}
        type="button" disabled={disabled} aria-label={ariaLabel}
        role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? listId : undefined}
        onClick={openMenu}
        onKeyDown={(e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); openMenu() } }}
        style={{
          ...inputStyle, cursor: disabled ? 'not-allowed' : 'pointer', textAlign: 'left',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          color: (sel && value !== '' && value != null) ? C.ink : C.ink3, opacity: disabled ? 0.55 : 1,
          ...style,
        }}
      >
        <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {sel ? sel.label : placeholder}
        </span>
        {/* Teal chevron in a soft disc - the "this is a dropdown" affordance shared
            by every Select so dropdowns read consistently app-wide. */}
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: C.accentSoft, flexShrink: 0 }}>
          <IcChevron dir="down" size={12} style={{ color: C.accent }} />
        </span>
      </button>
      {menu}
    </>
  )
}

// ─── MODAL (ported from GuestBook): bottom sheet on touch (grab handle +
// drag-down-to-dismiss via NATIVE non-passive listeners), centered floating
// dialog on desktop. Clears the keyboard by sizing the overlay to the visual
// viewport (touch) so the bottom-anchored sheet sits right above the keyboard.
function Modal({ onClose, children, title, width = 480 }) {
  useEscToClose(onClose)
  // Every sheet in this app was an unlabelled <div>: no dialog role, no name, and
  // nothing telling assistive tech that the page behind it is inert. One id here
  // names the sheet by its own visible title, so a screen reader announces which
  // sheet just opened instead of reading the page underneath it.
  const titleId = useRef(`sheet-${genId()}`).current
  const sheetRef = useRef(null)
  const innerRef = useRef(null)
  const drag = useRef({ active: false, started: false, startY: 0, cur: 0 })
  const scroller = () => innerRef.current

  const kbInset = useKeyboardInset()

  // Pin the overlay to the VISUAL viewport (touch only). When the keyboard opens
  // iOS shrinks the visual viewport to the area above it; sizing the fixed
  // overlay to that rect makes the bottom-anchored sheet sit right above the
  // keyboard on its own - no kbInset margin, no per-field scrolling, no fight
  // with the page's global recenter (which we also opt this sheet out of).
  const [vvRect, setVvRect] = useState(null)
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv || !IS_TOUCH) return
    const on = () => setVvRect({ top: vv.offsetTop || 0, left: vv.offsetLeft || 0, width: vv.width, height: vv.height })
    vv.addEventListener('resize', on)
    vv.addEventListener('scroll', on)
    on()
    return () => { vv.removeEventListener('resize', on); vv.removeEventListener('scroll', on) }
  }, [])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // When the keyboard closes, glide the sheet scroll back to the top - otherwise
  // drag-dismiss (which only engages at scrollTop 0) eats the first few swipes.
  const prevKb = useRef(0)
  useEffect(() => {
    const sc = scroller()
    if (prevKb.current > 0 && kbInset === 0 && sc && (sc.scrollTop || 0) > 1) {
      const ae = document.activeElement
      const stillTyping = ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA')
      if (!stillTyping) sc.scrollTo({ top: 0, behavior: 'smooth' })
    }
    prevKb.current = kbInset
  }, [kbInset])

  // Drag-down-to-dismiss. NATIVE listeners (touchmove non-passive) so
  // preventDefault actually stops iOS rubber-band - React's onTouchMove is
  // passive and the sheet tears from its content.
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  useEffect(() => {
    const el = sheetRef.current
    if (!el) return
    const onTouchStart = (e) => {
      e.stopPropagation()
      const t = e.target
      const onField = !!(t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable))
      drag.current = {
        active: false, started: true, onField,
        atTop: (scroller()?.scrollTop || 0) <= 8,
        startY: e.touches[0].clientY, startX: e.touches[0].clientX, cur: 0, startT: Date.now(),
      }
    }
    const onTouchMove = (e) => {
      e.stopPropagation()
      const d = drag.current
      if (!d.started) return
      const dy = e.touches[0].clientY - d.startY
      const dx = e.touches[0].clientX - d.startX
      if (!d.active) {
        // At-top BOTH at touchstart and now — a continuous scroll that reaches the top
        // mid-gesture can never convert into a close; lift and pull again to dismiss.
        const atTopNow = d.atTop && (scroller()?.scrollTop || 0) <= 8
        // A pull that began on a field needs a bigger, clearly-vertical move so a
        // tap-to-focus is never hijacked.
        const need = d.onField ? 26 : 16
        if (atTopNow && dy > need && Math.abs(dx) < dy) {
          d.active = true
          const ae = document.activeElement
          if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA' || ae.tagName === 'SELECT')) ae.blur()
          el.style.transition = 'none'
          el.style.willChange = 'transform'
        } else return
      }
      e.preventDefault()
      const pulled = Math.max(0, dy - 16)
      if (pulled === d.cur) return
      d.cur = pulled
      el.style.transform = `translateY(${pulled}px)`
    }
    const onTouchEnd = (e) => {
      e.stopPropagation()
      const d = drag.current
      d.started = false
      if (!d.active) return
      d.active = false
      const velocity = d.cur / Math.max(1, Date.now() - d.startT)
      if (d.cur > 140 || (d.cur > 70 && velocity > 0.55)) {
        el.style.transition = 'transform 0.22s ease-out'
        el.style.transform = 'translateY(100%)'
        setTimeout(() => onCloseRef.current?.(), 190)
      } else {
        el.style.transition = 'transform 0.24s cubic-bezier(0.22,0.61,0.36,1)'
        el.style.transform = 'translateY(0)'
        setTimeout(() => { el.style.willChange = '' }, 260)
      }
      d.cur = 0
    }
    // iOS fires touchCANCEL when it hijacks a gesture mid-flight; without this the
    // sheet's transform never resets and it sticks partway down.
    const onTouchCancel = () => {
      const d = drag.current
      d.started = false
      if (!d.active) { d.cur = 0; return }
      d.active = false; d.cur = 0
      el.style.transition = 'transform 0.2s ease-out'
      el.style.transform = 'translateY(0)'
      setTimeout(() => { el.style.willChange = '' }, 220)
    }
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('touchcancel', onTouchCancel, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchCancel)
    }
  }, [])

  // Portal to <body> so the sheet never nests inside another transformed subtree.
  return createPortal(
    <div
      role="presentation"
      onClick={onClose}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      style={{
        position: 'fixed', zIndex: 1000,
        // Touch: track the visual viewport so the sheet clears the keyboard.
        // Desktop / pre-measure: cover the whole layout viewport.
        ...(vvRect
          ? { top: vvRect.top, left: vvRect.left, width: vvRect.width, height: vvRect.height }
          : { inset: 0 }),
        // A dark semi-transparent fixed scrim ghosts on iOS - WebKit keeps the
        // painted pixels after it unmounts (the GuestBook "dim saga"; desktop
        // Chrome can't reproduce it). On touch use a fully transparent tap-catcher
        // (the sheet reads as floating via its shadow); keep the dim on desktop.
        background: IS_TOUCH ? 'transparent' : 'rgba(43,42,40,0.45)',
        // Touch: thumb-reachable bottom sheet. Desktop: centered floating dialog.
        display: 'flex', alignItems: IS_TOUCH ? 'flex-end' : 'center',
        padding: IS_TOUCH ? 0 : 24,
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- the onClick is a GUARD against the backdrop's dismiss, not an action; this panel has a real dialog role, a close control and Escape */}
      <div
        ref={sheetRef}
        role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: width, margin: '0 auto',
          background: C.surface, borderRadius: IS_TOUCH ? '20px 20px 0 0' : 20,
          paddingTop: IS_TOUCH ? 8 : 24,
          paddingBottom: 'calc(24px + env(safe-area-inset-bottom))',
          display: 'flex', flexDirection: 'column',
          // The overlay is already the visible area (above the keyboard), so a
          // simple share of it keeps the sheet on-screen without kbInset math.
          maxHeight: IS_TOUCH ? '94%' : '90vh',
          // Stronger on touch so the sheet still reads as floating without a scrim.
          boxShadow: IS_TOUCH ? '0 -14px 48px rgba(43,42,40,0.30)' : '0 -8px 40px rgba(43,42,40,0.18)',
        }}
      >
        {IS_TOUCH && <div style={{ width: 40, height: 4, borderRadius: 2, background: C.lineHard, margin: '0 auto 14px', flexShrink: 0 }} />}
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexShrink: 0, paddingLeft: 20, paddingRight: 20 }}>
            <h2 id={titleId} style={{ fontFamily: serif, fontSize: 21, fontWeight: 700, color: C.ink, margin: 0 }}>{title}</h2>
            {!IS_TOUCH && (
              <button onClick={onClose} aria-label="Close" title="Close (Esc)" style={{ background: 'none', border: 'none', color: C.ink3, cursor: 'pointer', padding: 4, display: 'flex' }}>
                <IcX size={20} />
              </button>
            )}
          </div>
        )}
        <div ref={innerRef} data-sheet-scroll style={{ flex: '0 1 auto', minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', paddingLeft: 20, paddingRight: 20 }}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

// ─── SWIPEABLE ROW (ported from GuestBook/The Book): swipe left to reveal
// actions. Vertical scroll wins (axis check); tap closes an open row first.
function SwipeableRow({ onTap, actions = [], radius = 14, marginBottom = 8, children }) {
  const [swiped, setSwiped] = useState(false)
  const swipedRef = useRef(false)
  const cardRef = useRef(null)
  const actionsRef = useRef(null)
  const tx = useRef(null)
  const ty = useRef(null)
  const dragging = useRef(false)
  const moved = useRef(false)
  const actionW = 78
  const revealW = actions.length * actionW
  const snap = 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1)'
  useEffect(() => { swipedRef.current = swiped }, [swiped])

  const setX = (x, withSnap) => {
    if (!cardRef.current) return
    cardRef.current.style.transition = withSnap ? snap : 'none'
    cardRef.current.style.transform = `translateX(${x}px)`
    // Actions stay hidden at rest - their color otherwise peeks around the card's
    // rounded corners as little arcs at the right edge.
    if (actionsRef.current) actionsRef.current.style.opacity = x < 0 ? 1 : 0
  }
  const close = () => { setSwiped(false); setX(0, true) }

  // NATIVE touch listeners (not React onTouch*): inside a Modal, the sheet's own
  // native touchmove calls stopPropagation, which would swallow React's delegated
  // handler at the root before it ever fires. A listener on the card itself runs
  // first in the bubble, so the swipe keeps working anywhere.
  useEffect(() => {
    const el = cardRef.current
    if (!el || !revealW) return
    const onStart = (e) => {
      tx.current = e.touches[0].clientX
      ty.current = e.touches[0].clientY
      dragging.current = false
      moved.current = false
    }
    const onMove = (e) => {
      if (tx.current === null) return
      const dx = e.touches[0].clientX - tx.current
      const dy = e.touches[0].clientY - ty.current
      if (!dragging.current) {
        if (Math.abs(dx) < 8) return
        if (Math.abs(dy) > Math.abs(dx)) { tx.current = null; return } // vertical scroll wins
        dragging.current = true
        moved.current = true
      }
      const base = swipedRef.current ? -revealW : 0
      setX(Math.max(-revealW - 8, Math.min(0, base + dx)), false)
    }
    const onEnd = (e) => {
      if (!dragging.current) return
      dragging.current = false
      const dx = e.changedTouches[0].clientX - (tx.current ?? e.changedTouches[0].clientX)
      const base = swipedRef.current ? -revealW : 0
      if (base + dx < -revealW / 2) { setSwiped(true); setX(-revealW, true) }
      else { setSwiped(false); setX(0, true) }
      tx.current = null
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: true })
    el.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealW])

  const handleClick = (e) => {
    if (swiped) { e.stopPropagation(); close(); return }
    if (moved.current) { moved.current = false; return }
    onTap?.()
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: radius, marginBottom }}>
      {revealW > 0 && (
        <div ref={actionsRef} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: revealW, display: 'flex', opacity: 0, transition: 'opacity 0.15s' }}>
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); close(); a.onClick() }}
              style={{
                flex: 1, border: 'none', cursor: 'pointer',
                background: a.color, color: '#fff',
                fontSize: 13, fontWeight: 600,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
              }}
            >
              {a.icon}
              {a.label}
            </button>
          ))}
        </div>
      )}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- a gesture surface: the onClick only cancels an open swipe, which cannot exist without touch. The row's real controls are its children and the revealed action beside it. */}
      <div
        ref={cardRef}
        onClick={handleClick}
        style={{ position: 'relative', zIndex: 1, touchAction: 'pan-y' }}
      >
        {children}
      </div>
    </div>
  )
}

// ─── PULL-TO-REFRESH (ported from GuestBook shell PTR): engages ONLY when the
// scroll area is at the very top AND the drag is downward; axis-locks so a
// horizontal gesture is released to native untouched. OWNS the gesture with
// native non-passive touchmove (React's synthetic touchmove is passive). Pushes
// the content DOWN and reveals a spinner in the gap above.
function usePullToRefresh(onRefresh, { disabled = false, threshold = 64 } = {}) {
  // CALLBACK ref (not useRef): the wrapper can mount after the owner renders
  // other tabs first; a useRef + once-effect would never re-attach listeners.
  const [node, setNode] = useState(null)
  const contentRef = useCallback((el) => setNode(el), [])
  const [pull, setPull] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const onRefreshRef = useRef(onRefresh); onRefreshRef.current = onRefresh
  const disabledRef = useRef(disabled); disabledRef.current = disabled
  const st = useRef({ tracking: false, startY: 0, startX: 0, decided: false, active: false, pull: 0, refreshing: false, scrollEl: null })
  const apply = (px) => { st.current.pull = px; setPull(px) }

  useEffect(() => {
    const el = node
    if (!el) return
    const RESIST = 0.5, MAX = 92
    const scrollableFrom = (n0) => {
      let n = n0
      while (n && n !== el.parentElement) {
        const oy = getComputedStyle(n).overflowY
        if ((oy === 'auto' || oy === 'scroll') && n.scrollHeight > n.clientHeight + 1) return n
        n = n.parentElement
      }
      return null
    }
    const atTop = () => { const s = st.current.scrollEl; return !s || s.scrollTop <= 0 }
    const onStart = (e) => {
      if (disabledRef.current || st.current.refreshing || e.touches.length !== 1) return
      // Never arm on a form field - a pull that starts in the composer must not
      // hijack typing/caret gestures (standing drag-vs-field rule).
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) {
        st.current.tracking = false
        return
      }
      st.current.scrollEl = scrollableFrom(e.target)
      st.current.tracking = atTop()
      st.current.startY = e.touches[0].clientY
      st.current.startX = e.touches[0].clientX
      st.current.decided = false
      st.current.active = false
    }
    const onMove = (e) => {
      const s = st.current
      if (!s.tracking || s.refreshing) return
      const dy = e.touches[0].clientY - s.startY
      const dx = e.touches[0].clientX - s.startX
      // Axis-lock: a horizontal-dominant gesture is a sideways scroll - release it
      // to native and NEVER preventDefault (or it freezes mid-swipe).
      if (!s.decided && !s.active) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          if (Math.abs(dx) > Math.abs(dy)) { s.tracking = false; return }
          s.decided = true
        } else {
          return
        }
      }
      if (dy <= 0 || !atTop()) {
        if (s.active) { s.active = false; apply(0) }
        s.startY = e.touches[0].clientY
        s.startX = e.touches[0].clientX
        s.decided = false
        s.tracking = atTop()
        return
      }
      s.active = true
      e.preventDefault()
      apply(Math.min(MAX, dy * RESIST))
    }
    const onEnd = async () => {
      const s = st.current
      const wasActive = s.active
      s.active = false; s.tracking = false
      if (!wasActive) return
      if (s.pull >= threshold && !s.refreshing) {
        s.refreshing = true; setRefreshing(true); apply(threshold)
        const started = Date.now()
        try { await onRefreshRef.current?.() } catch { /* ignore */ }
        // brief floor so the spinner reads as a real action, not a flicker
        const wait = 500 - (Date.now() - started)
        if (wait > 0) await new Promise((r) => setTimeout(r, wait))
        s.refreshing = false; setRefreshing(false); apply(0)
      } else {
        apply(0)
      }
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd, { passive: true })
    el.addEventListener('touchcancel', onEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onEnd)
    }
  }, [node, threshold])

  const offset = refreshing ? threshold : pull
  const contentStyle = {
    transform: offset ? `translateY(${offset}px)` : 'none',
    transition: st.current.active ? 'none' : 'transform 0.26s ease',
  }
  const indicator = (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: Math.max(0, offset) + 'px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', pointerEvents: 'none', zIndex: 1,
      opacity: offset > 2 ? 1 : 0,
      transition: st.current.active ? 'none' : 'height 0.26s ease, opacity 0.2s ease',
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: '50%',
        border: `2.5px solid ${C.line}`, borderTopColor: C.accent,
        animation: refreshing ? 'hb-spin 0.7s linear infinite' : 'none',
        transform: refreshing ? 'none' : `rotate(${Math.min(1, pull / threshold) * 280}deg)`,
        opacity: refreshing ? 1 : Math.min(1, pull / (threshold * 0.55)),
      }} />
    </div>
  )

  return { contentRef, contentStyle, indicator }
}

// ─── ERROR BOUNDARY ───────────────────────────────────────────────────────────
// Without this, ANY uncaught render/effect throw unmounts the whole tree: a white
// screen with no message, which on a phone reads as "the app keeps crashing" and
// gives us nothing to diagnose from. This card shows the actual error — a user's
// screenshot of it IS the bug report — and offers a manual reload. Deliberately no
// auto-reload: if the throw happens again at mount, auto-reload would just be the
// same crash loop with extra steps. Class component because React only exposes
// error boundaries through the class API. Ported from GuestBook ff8b061.
class AppErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (!this.state.error) return this.props.children
    const msg = String(this.state.error?.message || this.state.error || 'Unknown error')
    return (
      <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ ...cardStyle(R.tile), maxWidth: 420, width: '100%', padding: 20, textAlign: 'center' }}>
          <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: C.ink, marginBottom: 8 }}>Something went wrong</div>
          <div style={{ fontSize: 15, color: C.sub, lineHeight: 1.5, marginBottom: 14 }}>
            The app hit an error it couldn't recover from. Your data is safe on this device.
            A screenshot of this screen is the fastest way to get it fixed.
          </div>
          <div style={{ fontSize: 12, color: C.ink3, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 10, padding: 12, marginBottom: 14, wordBreak: 'break-word', textAlign: 'left', fontFamily: 'ui-monospace, Menlo, monospace' }}>
            {msg}
          </div>
          <button onClick={() => window.location.reload()} style={{ width: '100%', padding: '12px 16px', borderRadius: 12, cursor: 'pointer', fontSize: 16, fontWeight: 600, border: 'none', background: C.accent, color: '#fff' }}>Reload</button>
        </div>
      </div>
    )
  }
}

// ─── APP ──────────────────────────────────────────────────────────────────────
// The boundary wraps the whole app so a throw anywhere lands on the error card.
export default function App() {
  return (
    <AppErrorBoundary>
      <AppInner />
    </AppErrorBoundary>
  )
}

function AppInner() {
  const [tab, setTab] = useState('chat')
  const [conversations, setConversations] = useState(loadConversations)
  const [activeId, setActiveId] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [showCloud, setShowCloud] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showGlossary, setShowGlossary] = useState(false)
  // '' = never chosen -> first-launch prompt asks. Chosen state grounds every
  // answer (sent with each question) and drives the Rights page split.
  const [stateCode, setStateCode] = useState(() => {
    try { return localStorage.getItem(STATE_KEY) || '' } catch { return '' }
  })
  const chooseState = (code) => {
    setStateCode(code)
    try { localStorage.setItem(STATE_KEY, code) } catch { /* just won't persist */ }
  }
  // UI language; the model is also instructed to answer in it (lang sent per call).
  const [lang, setLang] = useState(getStoredLang)
  const chooseLang = (code) => { setLang(code); storeLang(code) }

  const cloud = useCloud()

  useGlobalFieldRecenter()

  // Native (App Store) entitlement. On iOS the Apple receipt via RevenueCat is
  // authoritative for IAP buyers — it counts even before the RC webhook writes the
  // Supabase profile. Additive with the web/Supabase `cloud.entitled`, so a web
  // buyer or an inactive receipt never downgrades the other. Stays false on web.
  const [nativePaid, setNativePaid] = useState(false)
  const checkNativeEntitlement = useCallback(async () => {
    if (!rcAvailable()) return
    try {
      const paid = await withTimeout(rcCheckEntitlement(cloud.userId), 5000)
      if (paid) setNativePaid(true)   // never flip a known-paid back to false on a flaky read
    } catch { /* keep the last known state */ }
  }, [cloud.userId])
  // Check on launch / when the account resolves, and again on foreground (a
  // renewal or a purchase made elsewhere should reflect when the app returns).
  useEffect(() => { checkNativeEntitlement() }, [checkNativeEntitlement])
  useEffect(() => {
    if (!IS_NATIVE) return
    const onVis = () => { if (!document.hidden) checkNativeEntitlement() }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [checkNativeEntitlement])

  // Returning from Stripe Checkout: the redirect lands with ?checkout=success a
  // beat before the webhook writes entitlement, so poll refreshEntitlement a few
  // times, land the user on the Vault, then strip the query so a reload is clean.
  const refreshEnt = cloud.refreshEntitlement
  useEffect(() => {
    let params
    try { params = new URLSearchParams(window.location.search) } catch { return }
    const outcome = params.get('checkout')
    if (!outcome) return
    if (outcome === 'success') {
      setTab('vault')
      let tries = 0
      const tick = () => {
        refreshEnt?.()
        if (++tries < 5) setTimeout(tick, 1500)
      }
      tick()
    }
    try {
      window.history.replaceState({}, '', window.location.pathname)
    } catch { /* leave the query; harmless */ }
  }, [refreshEnt])

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(conversations))
    } catch {
      /* storage full or unavailable - history just won't persist */
    }
  }, [conversations])

  // ─── Cloud history sync (only when a user is signed in + unlocked) ──────────
  // On the transition to 'ready', pull the account's encrypted history, merge it
  // with what is on this device, and seed the cloud with the union. Runs once
  // per unlock; resets when the vault locks/signs out.
  const reconciledRef = useRef(false)
  useEffect(() => {
    if (cloud.status !== 'ready') { reconciledRef.current = false; return }
    if (reconciledRef.current) return
    reconciledRef.current = true
    let alive = true
    ;(async () => {
      const cloudConvs = await cloud.pullConversations()
      if (!alive) return
      setConversations((prev) => {
        const merged = mergeConversations(prev, cloudConvs).slice(0, MAX_CONVERSATIONS)
        cloud.pushConversations(merged) // seed/refresh the account with the union
        return merged
      })
    })()
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloud.status])

  // After reconcile, push local changes up (debounced) so new questions persist
  // to the account. No-op when signed out — history then stays device-only.
  useEffect(() => {
    if (cloud.status !== 'ready' || !reconciledRef.current) return
    const t = setTimeout(() => cloud.pushConversations(conversations), 800)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations, cloud.status])

  // ─── Vault collections (cloud-only, E2E) ────────────────────────────────────
  // Loaded fresh from the account on every unlock; cleared from memory the
  // moment the vault locks. Never persisted plaintext on the device.
  const incidents = useVaultCollection(cloud, 'incident', incidentSort)
  const deadlines = useVaultCollection(cloud, 'deadline', deadlineSort)
  const vaultDocs = useVaultDocs(cloud)

  const activeMessages = (activeId ? conversations.find((c) => c.id === activeId)?.messages : null) || []

  // A chat request that never settles used to leave "Looking that up…" on screen
  // forever with no way out. Time-box it and give the abort a handle the UI can
  // pull, so waiting is always the reader's choice.
  const chatAbortRef = useRef(null)
  function cancelSend() {
    chatAbortRef.current?.abort(new DOMException('canceled', 'AbortError'))
  }

  async function send(text) {
    const q = (text || '').trim()
    if (!q || busy) return false
    setError('')
    const base = activeMessages
    const next = [...base, { role: 'user', content: q }]
    let convId = activeId
    if (!convId) {
      convId = genId()
      setActiveId(convId)
      setConversations((prev) =>
        [{ id: convId, createdAt: Date.now(), messages: next }, ...prev].slice(0, MAX_CONVERSATIONS)
      )
    } else {
      setConversations((prev) => prev.map((c) => (c.id === convId ? { ...c, messages: next } : c)))
    }
    setBusy(true)
    const ctrl = new AbortController()
    chatAbortRef.current = ctrl
    const timer = setTimeout(() => ctrl.abort(new DOMException('timeout', 'TimeoutError')), CHAT_TIMEOUT_MS)
    try {
      const r = await fetch(`${API_ORIGIN}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctrl.signal,
        body: JSON.stringify({
          state: stateCode || 'CA',
          lang,
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) throw Object.assign(new Error(data.error || 'request failed'), { code: data.code, status: r.status })
      const withAnswer = [...next, { role: 'assistant', content: data.reply, sources: data.sources || [] }]
      setConversations((prev) => prev.map((c) => (c.id === convId ? { ...c, messages: withAnswer } : c)))
      return true
    } catch (e) {
      // A cancel is the reader's own decision, not a failure - restore the composer
      // silently rather than accusing them of an error they caused on purpose.
      setError(e?.name === 'AbortError' ? '' : tr(chatErrorKey(e)))
      setConversations((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, messages: base } : c)).filter((c) => c.messages.length > 0)
      )
      if (base.length === 0) setActiveId(null)
      return false
    } finally {
      clearTimeout(timer)
      chatAbortRef.current = null
      setBusy(false)
    }
  }

  // "How would another state answer this?" - one extra grounded call, fired
  // only when the person picks a state under an answer. The result is stored
  // on the message itself so it persists with the conversation.
  async function compareAnswer(msgIndex, target) {
    const convId = activeId
    if (!convId || !target) return
    const conv = conversations.find((c) => c.id === convId)
    const msgs = conv?.messages || []
    const answer = msgs[msgIndex]
    if (!answer || answer.role !== 'assistant') return
    const question = msgs.slice(0, msgIndex).reverse().find((m) => m.role === 'user')
    if (!question) return
    const base = stateCode || 'CA'
    const patch = (compare) =>
      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? { ...c, messages: c.messages.map((m, i) => (i === msgIndex ? { ...m, compare } : m)) }
            : c
        )
      )
    patch({ state: target, loading: true })
    try {
      const r = await fetch(`${API_ORIGIN}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: base,
          compareTo: target,
          lang,
          messages: [
            { role: 'user', content: question.content },
            { role: 'assistant', content: answer.content },
            { role: 'user', content: `How would ${stateName(target)} answer this same question? What is different from ${stateName(base)}?` },
          ],
        }),
      })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(data.error || tr('errCompare'))
      patch({ state: target, text: data.reply, sources: data.sources || [] })
    } catch (e) {
      patch({ state: target, error: e.message || tr('errCompare') })
    }
  }

  function startNew() {
    setActiveId(null)
    setError('')
    setTab('chat')
  }
  function openConversation(id) {
    setActiveId(id)
    setError('')
    setTab('chat')
  }
  function deleteConversation(id) {
    setConversations((prev) => prev.filter((c) => c.id !== id))
    if (activeId === id) {
      setActiveId(null)
      setError('')
    }
  }
  function deleteAllConversations() {
    setConversations([])
    setActiveId(null)
    setError('')
  }

  return (
    // Fixed full-viewport shell (Book-app recipe) - the page itself is static;
    // only the inner scroll areas move.
    <LangContext.Provider value={lang}>
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: C.bg, color: C.ink, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 680, margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header
          onSettings={() => setShowSettings(true)}
          // Signed in: the cloud icon opens the account controls (status,
          // auto-lock, lock, sign out). Not signed in / locked: it goes to the
          // Vault tab, the single home of the sign-in flow - never a sheet
          // duplicating the same steps over the page.
          onCloud={() => { if (cloud.status === 'ready' || cloud.status === 'off') setShowCloud(true); else setTab('vault') }}
          onHistory={tab === 'chat' ? () => setShowHistory(true) : undefined}
          onGlossary={tab !== 'chat' ? () => setShowGlossary(true) : undefined}
          connected={cloud.status === 'ready'}
          showDisclaimer={tab === 'chat'}
        />
        {/* One <main> around whichever tab is showing, so "skip to content" and
            the landmark rotor both have somewhere to land. The flex sizing was on
            each page's own root before; keeping it here means the pages did not
            have to change. */}
        <main aria-label={tr('mainLandmark')} style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {tab === 'chat' && <Chat messages={activeMessages} activeId={activeId} busy={busy} error={error} onSend={send} onCancel={cancelSend} onNew={startNew} stateCode={stateCode || 'CA'} onStateChange={chooseState} onCompare={compareAnswer} />}
        {tab === 'library' && <Library stateCode={stateCode || 'CA'} onStateChange={chooseState} onSaveIncident={cloud.status === 'ready' ? incidents.save : undefined} />}
        {tab === 'vault' && (
          <VaultPage
            cloud={cloud}
            entitled={cloud.entitled || nativePaid}
            onNativePaid={() => { setNativePaid(true); cloud.refreshEntitlement?.() }}
            incidents={incidents.items}
            onSaveIncident={incidents.save}
            onDeleteIncident={incidents.remove}
            deadlines={deadlines.items}
            onSaveDeadline={deadlines.save}
            onDeleteDeadline={deadlines.remove}
            vaultDocs={vaultDocs}
            isCA={(stateCode || 'CA') === 'CA'}
          />
        )}
        </main>
      </div>
      {/* Bottom fade: content dissolves into the background before it reaches the
          floating nav, so cards never blend into the glass pill. */}
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, height: 'calc(env(safe-area-inset-bottom) + 104px)', background: `linear-gradient(to top, ${C.bg} 42%, ${C.bg}D9 66%, ${C.bg}00)`, pointerEvents: 'none', zIndex: 40 }} />
      <Nav tab={tab} onAsk={startNew} onLibrary={() => setTab('library')} onVault={() => setTab('vault')} />
      {!stateCode && <StatePrompt onChoose={chooseState} />}
      {showHistory && (
        <HistorySheet
          onClose={() => setShowHistory(false)}
          conversations={conversations}
          onOpen={(id) => { setShowHistory(false); openConversation(id) }}
          onDelete={deleteConversation}
          connected={cloud.status === 'ready'}
        />
      )}
      {showSettings && (
        <SettingsSheet
          onClose={() => setShowSettings(false)}
          count={conversations.length}
          onDeleteAll={deleteAllConversations}
          lang={lang}
          onLangChange={chooseLang}
        />
      )}
      {showCloud && <CloudSheet onClose={() => setShowCloud(false)} cloud={cloud} />}
      {showGlossary && <GlossarySheet onClose={() => setShowGlossary(false)} stateCode={stateCode || 'CA'} />}
    </div>
    </LangContext.Provider>
  )
}

function IconBtn({ label, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      style={{
        // 44x44 is the floor for a comfortable touch target, and this app is used
        // by people with motor disabilities. Max three of these ever render at once
        // (History and Glossary are mutually exclusive), so the wordmark still fits
        // beside them at 320px.
        width: 44, height: 44, borderRadius: 12,
        background: C.surface, border: `1px solid ${C.border}`,
        color: C.sub, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 1px 2px rgba(43,42,40,0.05)',
      }}
    >
      {children}
    </button>
  )
}

function Header({ onSettings, onCloud, onHistory, onGlossary, connected, showDisclaimer }) {
  const t = useT()
  return (
    <header style={{ flexShrink: 0 }}>
      {/* Slim app-chrome bar: a small wordmark + actions, closed off by a hairline
          so it reads as chrome. Each page's own serif title is the only big
          headline below it - the wordmark never competes with page titles. */}
      <div style={{ padding: 'calc(env(safe-area-inset-top) + 10px) 16px 10px', borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, letterSpacing: -0.2, lineHeight: 1, color: C.ink }}>RightsBook</div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          {onGlossary && <IconBtn label={t('glossary')} onClick={onGlossary}><IcBook size={18} /></IconBtn>}
          {onHistory && <IconBtn label={t('navHistory')} onClick={onHistory}><IcHistory size={18} /></IconBtn>}
          {/* Connected = glowing green cloud-with-check (the portfolio sync cue);
              signed out = the plain muted cloud. No dot badge - the check says it. */}
          <IconBtn label={connected ? t('accountSynced') : t('cloudSync')} onClick={onCloud}>
            {connected
              ? <IcCloudCheck size={18} style={{ color: C.cloudOk, strokeWidth: 1.8, filter: 'drop-shadow(0 0 3px rgba(46,139,64,0.85))' }} />
              : <IcCloud size={18} />}
          </IconBtn>
          <IconBtn label={t('settings')} onClick={onSettings}><IcSettings size={18} /></IconBtn>
        </div>
      </div>
      {/* The Ask page's own title + tagline, matching the serif PageTitle that
          Vault and Rights show (same 10px top / 18px left, so all three line up
          when you switch tabs). The fuller disclaimer (AI, privacy, storage)
          lives once in Settings' About section, not duplicated here. */}
      {showDisclaimer && (
        <div style={{ padding: '10px 16px 0' }}>
          <PageTitle>{t('askTitle')}</PageTitle>
          <div style={{ fontSize: 14, color: C.sub, lineHeight: 1.5, margin: '0 2px' }}>{t('tagline')}</div>
        </div>
      )}
    </header>
  )
}

// The one big headline on every page - pages own the hierarchy, the chrome
// bar above stays small. Shared so Vault / Rights / future tabs never drift.
function PageTitle({ children }) {
  // A real <h1>, not a styled div. Every title in this app used to be a div, which
  // left a screen reader with no headings and no way to jump - in an app whose
  // readers disproportionately use one. Size, weight and margin are all set
  // explicitly here, so the browser's own h1 defaults never show through and the
  // rendered result is identical to the div it replaces.
  return <h1 style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, letterSpacing: -0.3, color: C.ink, margin: '14px 2px 6px' }}>{children}</h1>
}

// Bottom nav: Ask (left) · raised Vault button (center, opens the vault sheet) ·
// Rights (right). History lives on the Ask page header, not here.
function Nav({ tab, onAsk, onLibrary, onVault }) {
  const t = useT()
  // Labels are longer in Spanish and Tagalog: "Magtanong / Vault / Karapatan" measured
  // 319.5px inside a 320px screen, so the pill sat flush against both bezels with its
  // shadow clipped. Trim the padding, let the pills shrink, and cap the bar so it can
  // never reach the edge whatever the language.
  const pill = (label, active, onClick) => (
    <button onClick={onClick} aria-current={active ? 'page' : undefined} style={{
      border: 'none', background: active ? C.accent : 'transparent', color: active ? '#fff' : C.sub,
      // Height is the 44px touch floor, not the label's own 37px. These two are the
      // free, mission-core destinations; they were the smallest targets on screen
      // while the paid Vault button next to them was 60px.
      minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      borderRadius: 999, padding: '10px 14px', fontSize: 14, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
      // Shrink + ellipsis is the last resort only. The padding above is trimmed
      // enough that the longest shipped labels stay whole down to a 320px screen.
      minWidth: 0, flexShrink: 1, overflow: 'hidden', textOverflow: 'ellipsis',
    }}>{label}</button>
  )
  return (
    <nav aria-label={t('navLandmark')} style={{ position: 'fixed', left: 0, right: 0, bottom: 'max(env(safe-area-inset-bottom), 12px)', display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 50 }}>
      <div
        style={{
          pointerEvents: 'auto',
          display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px',
          maxWidth: 'calc(100vw - 24px)',
          background: 'rgba(255,255,255,0.86)',
          backdropFilter: 'blur(18px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(18px) saturate(1.4)',
          border: '1px solid rgba(43,42,40,0.12)',
          borderRadius: 999,
          boxShadow: '0 12px 34px rgba(43,42,40,0.22), 0 2px 8px rgba(43,42,40,0.10)',
        }}
      >
        {pill(t('navAsk'), tab === 'chat', onAsk)}
        {/* Raised center Vault button (GuestBook Tools pattern). Now a real tab -
            an accent ring marks it active, matching the pills' selected state. */}
        <button onClick={onVault} aria-label={t('navVault')} aria-current={tab === 'vault' ? 'page' : undefined} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
          width: 60, height: 60, marginTop: -22, borderRadius: '50%', flexShrink: 0,
          background: C.accent, color: '#fff',
          border: tab === 'vault' ? '3px solid #fff' : '3px solid rgba(255,255,255,0.9)', cursor: 'pointer',
          boxShadow: tab === 'vault'
            ? `0 0 0 2px ${C.accent}, 0 6px 18px rgba(42,115,107,0.5)`
            : '0 6px 18px rgba(42,115,107,0.4)',
        }}>
          <IcShield size={22} />
          <span style={{ fontSize: 10, fontWeight: 700 }}>{t('navVault')}</span>
        </button>
        {pill(t('navRights'), tab === 'library', onLibrary)}
      </div>
    </nav>
  )
}

// Compact "Answering for [state]" chooser - the same Select used everywhere,
// shrunk to a pill so it reads as a setting, not a form field.
// Rendered INSIDE the chat scroll area (top of the thread), so it scrolls away
// while reading instead of stacking another pinned layer over the answer.
function StateBar({ stateCode, onStateChange }) {
  const t = useT()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 0 4px', flexShrink: 0 }}>
      <span style={{ fontSize: 13, color: C.sub, flexShrink: 0 }}>{t('answeringFor')}</span>
      <div style={{ flex: 1, minWidth: 0, maxWidth: 240 }}>
        <Select
          value={stateCode}
          onChange={onStateChange}
          options={STATE_OPTIONS}
          ariaLabel={t('state')}
          style={{ padding: '11px', borderRadius: 999, fontSize: 14, minHeight: 44 }}
        />
      </div>
      {!stateCovered(stateCode) && (
        <span style={{ fontSize: 12, color: C.ink3, flexShrink: 0 }}>{t('federalOnly')}</span>
      )}
    </div>
  )
}

function Chat({ messages, activeId, busy, error, onSend, onCancel, onNew, stateCode, onStateChange, onCompare }) {
  const t = useT()
  const [input, setInput] = useState('')
  // While READING an answer (conversation open, field idle and empty) the
  // composer shrinks to a slim pill and the Ask button hides - more room for
  // the answer, but the field stays visible and tappable (capture-first:
  // never collapse it behind an extra tap).
  const [composerFocus, setComposerFocus] = useState(false)
  const compact = messages.length > 0 && !composerFocus && !input.trim()
  const scrollRef = useRef(null)
  const lastMsgRef = useRef(null)
  const prevLenRef = useRef(0)
  const prevActiveRef = useRef(null)
  const [justAnswered, setJustAnswered] = useState(false)
  const kbInset = useKeyboardInset()

  // Grow the composer with the question. A rows={1} textarea keeps a one-line box
  // no matter how much is typed, so a long question scrolls away under its own top
  // edge - you can't read back what you wrote before sending it. Worse in Spanish
  // and Tagalog, where even the PLACEHOLDER wraps to two lines and clips.
  // Measure from a collapsed height, then cap at COMPOSER_MAX and hand the overflow
  // to the textarea's own scroll. Re-runs when `compact` swaps the padding, since
  // that changes the height the same text needs.
  const taRef = useRef(null)
  useEffect(() => {
    const el = taRef.current
    if (!el) return
    el.style.height = 'auto'
    // scrollHeight excludes the border; box-sizing is border-box, so add it back
    // or the box lands 2px short and shows a phantom scrollbar.
    const border = el.offsetHeight - el.clientHeight
    const full = el.scrollHeight + border
    el.style.height = `${Math.min(full, COMPOSER_MAX)}px`
    el.style.overflowY = full > COMPOSER_MAX ? 'auto' : 'hidden'
  }, [input, compact])

  // Pull down on the conversation to file it away and start a fresh question
  // (same gesture as GuestBook's refresh; here "refresh" = new question).
  // Disabled on the empty starter screen - nothing to reset.
  const { contentRef, contentStyle, indicator } = usePullToRefresh(onNew, { disabled: !activeId })

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const switched = activeId !== prevActiveRef.current
    const prevLen = prevLenRef.current
    prevActiveRef.current = activeId
    prevLenRef.current = messages.length
    const last = messages[messages.length - 1]

    // Announce only an answer that just ARRIVED. Opening a saved conversation also
    // ends on an assistant message, and saying "answer ready" for something written
    // last week would be a lie told to the person least able to check it.
    setJustAnswered(!switched && !!last && last.role === 'assistant' && messages.length === prevLen + 1)

    if (switched) {
      el.scrollTop = 0
    } else if (!last) {
      el.scrollTop = 0
    } else if (last.role === 'user') {
      el.scrollTop = el.scrollHeight
    } else if (last.role === 'assistant' && messages.length === prevLen + 1 && lastMsgRef.current) {
      const cTop = el.getBoundingClientRect().top
      const mTop = lastMsgRef.current.getBoundingClientRect().top
      el.scrollTop += mTop - cTop - 12
    }
  }, [messages, busy, activeId])

  async function submit(text) {
    const q = (text || '').trim()
    if (!q || busy) return
    const ok = await onSend(q)
    if (ok) setInput('')
  }

  return (
    <>
      <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {indicator}
        <div ref={contentRef} style={{ ...contentStyle, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: '12px 16px 14px 18px', WebkitOverflowScrolling: 'touch' }}>
            <StateBar stateCode={stateCode} onStateChange={onStateChange} />
            {messages.length === 0 && (
              <div style={{ marginTop: 18 }}>
                <div style={{ fontSize: 14, color: C.sub, marginBottom: 10 }}>{t('tryAsking')}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {STARTER_KEYS.map((k) => (
                    <button key={k} onClick={() => submit(t(k))} style={{ ...cardBtnStyle(R.control), width: 'auto', color: C.ink, padding: '10px 13px', minHeight: 44, display: 'inline-flex', alignItems: 'center', fontSize: 14 }}>
                      {t(k)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <Bubble
                key={i}
                m={m}
                baseState={stateCode}
                question={m.role === 'assistant' ? [...messages.slice(0, i)].reverse().find((x) => x.role === 'user')?.content : undefined}
                onCompare={m.role === 'assistant' ? (target) => onCompare(i, target) : undefined}
                ref={i === messages.length - 1 ? lastMsgRef : null}
              />
            ))}
            {/* Quick follow-ups under the latest answer: one tap to re-ask in
                plainer words or with an example. Only two chips on purpose - a
                wall of options is its own cognitive-load problem. */}
            {!busy && messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '2px 0 6px' }}>
                {['chipSimpler', 'chipExample'].map((k) => (
                  <button key={k} onClick={() => submit(t(k))} style={{ ...cardBtnStyle(R.pill), width: 'auto', boxShadow: 'none', color: C.accent, padding: '7px 12px', fontSize: 13, fontWeight: 600 }}>
                    {t(k)}
                  </button>
                ))}
              </div>
            )}
            {/* The one spoken channel for the Ask flow: "looking up", the error, and
                - invisibly - the fact that an answer landed. Without this a screen
                reader user gets total silence between sending and reading. */}
            <div role="status" aria-live="polite" aria-atomic="true" style={{ minHeight: 26, padding: '2px 4px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {busy && <span style={{ fontSize: 13, color: C.sub }}>{t('lookingUp')}</span>}
              {/* Waiting has to be escapable. The request is time-boxed at 45s, but
                  45s of a frozen screen is its own kind of broken. */}
              {busy && onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  style={{
                    background: 'none', border: 'none', padding: '4px 2px', margin: 0,
                    color: C.accent, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    textDecoration: 'underline', fontFamily: 'inherit',
                  }}
                >{t('cancel')}</button>
              )}
              {!busy && error && <span style={{ fontSize: 13, color: C.danger }}>{error}</span>}
              {!busy && !error && justAnswered && <span style={SR_ONLY}>{t('ansReady')}</span>}
            </div>
          </div>
        </div>
      </div>
      {/* Composer lifts above the on-screen keyboard (marginBottom:kbInset - the
          Modal recipe); nav clearance collapses while the keyboard is up since
          the nav is behind the keyboard anyway. */}
      <div style={{ padding: `${compact ? 6 : 8}px 16px ${kbInset ? '10px' : NAV_CLEARANCE}`, borderTop: `1px solid ${C.line}`, background: C.bg, flexShrink: 0, marginBottom: kbInset, transition: 'margin-bottom 0.2s ease, padding 0.15s ease' }}>
        <form
          onSubmit={(e) => { e.preventDefault(); submit(input) }}
          style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}
        >
          {/* Textarea wrapped in a block div: an iOS textarea as a direct flex item
              collapses to its cols width. */}
          <div style={{ flex: 1 }}>
            <textarea
              ref={taRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setComposerFocus(true)}
              onBlur={() => setComposerFocus(false)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(input) } }}
              // A placeholder is not an accessible name — it disappears the moment you
              // type. Same string, said in a way a screen reader keeps.
              aria-label={t('composerPlaceholder')}
              placeholder={t('composerPlaceholder')}
              rows={1}
              style={{ ...inputStyle, resize: 'none', borderRadius: 14, padding: compact ? '7px 14px' : '12px 14px', lineHeight: 1.4, maxHeight: COMPOSER_MAX, transition: 'padding 0.15s ease' }}
            />
          </div>
          {!compact && (
            <button
              type="submit"
              disabled={busy || !input.trim()}
              // Filled-grey-with-white-text measured 1.29:1 - the app's primary
              // action was unreadable in its resting state. An unfilled button with
              // body-grey text reads as "not yet" and still passes on the composer
              // background. The 1px border is on both states so nothing shifts.
              style={{
                background: busy || !input.trim() ? 'transparent' : C.accent,
                color: busy || !input.trim() ? C.sub : '#fff',
                border: `1px solid ${busy || !input.trim() ? C.lineHard : C.accent}`,
                borderRadius: 14, padding: '13px 18px', fontSize: 15, fontWeight: 700,
                cursor: busy || !input.trim() ? 'default' : 'pointer', marginBottom: 4,
              }}
            >
              {t('ask')}
            </button>
          )}
        </form>
      </div>
    </>
  )
}

// Safety net for stray markdown (**bold**, "- "/"* " bullets) in case the
// model doesn't follow the plain-text instruction in the system prompt.
function renderInline(text, keyPrefix) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>
      : <React.Fragment key={`${keyPrefix}-${i}`}>{part}</React.Fragment>
  )
}

function renderContent(text) {
  return text.split(/\n\s*\n/).map((block, bi) => {
    const lines = block.split('\n').filter((l) => l.trim().length > 0)
    const isList = lines.length > 0 && lines.every((l) => /^[-*]\s+/.test(l.trim()))
    if (isList) {
      return (
        <ul key={bi} style={{ margin: bi === 0 ? '0 0 0 20px' : '10px 0 0 20px', padding: 0 }}>
          {lines.map((l, li) => (
            <li key={li} style={{ marginBottom: 4 }}>{renderInline(l.trim().replace(/^[-*]\s+/, ''), `${bi}-${li}`)}</li>
          ))}
        </ul>
      )
    }
    return (
      <p key={bi} style={{ margin: bi === 0 ? 0 : '10px 0 0' }}>
        {lines.map((l, li) => (
          <React.Fragment key={li}>
            {li > 0 && <br />}
            {renderInline(l, `${bi}-${li}`)}
          </React.Fragment>
        ))}
      </p>
    )
  })
}

// ─── Structured answers ──────────────────────────────────────────────────────
// api/chat.js instructs the model to split substantive answers into sections
// behind [BOTTOM LINE] / [EXCEPTION] / [WHAT TO ASK FOR] / [DETAILS] markers.
// The plain-language sections render up front; the cited legal explanation
// collapses behind "Read the full explanation". Parsing is best-effort: any
// answer without a usable BOTTOM LINE + DETAILS pair (old saved history, a
// model that ignored the format) falls back to the classic single-block
// rendering, with stray marker lines stripped so a half-followed format never
// shows raw brackets. Markers stay English in every answer language; the
// labels shown come from i18n.
const ANSWER_MARKER = /^\[(BOTTOM LINE|EXCEPTION|WHAT TO ASK FOR|DETAILS)\]\s*$/
function parseAnswer(text) {
  if (!text || !text.includes('[BOTTOM LINE]')) return null
  const sections = { PRE: [] }
  let cur = 'PRE'
  for (const line of text.split('\n')) {
    const m = line.trim().match(ANSWER_MARKER)
    if (m) { cur = m[1]; sections[cur] = sections[cur] || []; continue }
    sections[cur].push(line)
  }
  const get = (k) => (sections[k] || []).join('\n').trim()
  const bottom = get('BOTTOM LINE')
  // Stray text before the first marker joins the details so the top stays clean.
  const details = [get('PRE'), get('DETAILS')].filter(Boolean).join('\n\n')
  if (!bottom || !details) return null
  return { bottom, exception: get('EXCEPTION'), askFor: get('WHAT TO ASK FOR'), details }
}

const stripAnswerMarkers = (text) =>
  text && text.includes('[BOTTOM LINE]')
    ? text.split('\n').filter((l) => !ANSWER_MARKER.test(l.trim())).join('\n')
    : text

function AnswerSectionLabel({ children }) {
  return <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase', color: C.accent, marginBottom: 3 }}>{children}</div>
}

function StructuredAnswer({ parsed }) {
  const t = useT()
  const [open, setOpen] = useState(false)
  return (
    <div>
      <AnswerSectionLabel>{t('ansBottomLine')}</AnswerSectionLabel>
      {renderContent(parsed.bottom)}
      {parsed.exception && (
        <div style={{ marginTop: 12 }}>
          <AnswerSectionLabel>{t('ansException')}</AnswerSectionLabel>
          {renderContent(parsed.exception)}
        </div>
      )}
      {parsed.askFor && (
        <div style={{ marginTop: 12 }}>
          <AnswerSectionLabel>{t('ansAskFor')}</AnswerSectionLabel>
          {renderContent(parsed.askFor)}
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 12, background: 'none', border: 'none', color: C.accent, cursor: 'pointer', padding: 0, fontSize: 13, fontWeight: 700, fontFamily: 'inherit' }}
      >
        <IcChevron dir={open ? 'down' : 'right'} size={14} style={{ flexShrink: 0 }} />
        {open ? t('ansHideFull') : t('ansReadFull')}
      </button>
      {open && (
        <div style={{ marginTop: 8, paddingTop: 10, borderTop: `1px solid ${C.line}` }}>
          {renderContent(parsed.details)}
        </div>
      )}
    </div>
  )
}

function SourceChips({ sources }) {
  if (!sources || sources.length === 0) return null
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
      {sources.slice(0, 3).map((s) => (
        <span key={s.id} style={{ fontSize: 11, color: C.sub, background: C.accentSoft, border: `1px solid ${C.line}`, borderRadius: 999, padding: '3px 9px' }}>
          {s.citation}
        </span>
      ))}
    </div>
  )
}

// "See another state's take" - dropdown under an answer; picking a state runs
// one comparison call and renders that state's angle in a card. Result lives
// on the message so it persists with the saved conversation.
function CompareBlock({ compare, baseState, onCompare }) {
  const t = useT()
  // Only states with a vetted state guide can actually DIFFER from your state;
  // everywhere else runs on the same federal floor, so listing them would just
  // produce 49 copies of "the federal baseline applies". The dropdown grows as
  // the team promotes state packs. (An already-saved compare still renders.)
  const options = STATE_OPTIONS.filter((o) => o.value !== baseState && stateCovered(o.value))
  return (
    <div style={{ marginTop: 8 }}>
      {options.length > 0 ? (
        <div style={{ maxWidth: 280 }}>
          <Select
            value={compare?.state || ''}
            onChange={onCompare}
            options={options}
            placeholder={t('compareSelect')}
            ariaLabel={t('compareAria')}
            style={{ padding: '7px 11px', borderRadius: 999, fontSize: 13 }}
          />
        </div>
      ) : (
        // No other state has its own vetted guide yet, so there is nothing
        // different to compare. Say so - a silently missing feature reads
        // as broken. This line is replaced by the dropdown automatically as
        // state guides are added.
        <div style={{ fontSize: 12, color: C.ink3, lineHeight: 1.5 }}>
          {t('compareEmpty')}
        </div>
      )}
      {compare && (
        <div style={{ ...cardStyle(R.control), marginTop: 6, padding: '10px 13px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, marginBottom: 4 }}>
            {stateName(compare.state)}{stateCovered(compare.state) ? '' : ` · ${t('federalOnly')}`}
          </div>
          {compare.loading ? (
            <div style={{ fontSize: 13, color: C.sub }}>{t('comparing')}</div>
          ) : compare.error ? (
            <div style={{ fontSize: 13, color: C.danger }}>{compare.error}</div>
          ) : (
            <div style={{ fontSize: 14, lineHeight: 1.55, color: C.ink, wordBreak: 'break-word' }}>
              {renderContent(stripAnswerMarkers(compare.text))}
              <SourceChips sources={compare.sources} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Speak an answer aloud with the browser's built-in text-to-speech (no network,
// no cost). On-brand for readers with low vision, low literacy, or who simply
// prefer listening. Hidden when the browser has no speech synthesis.
const SPEECH_LANG = { en: 'en-US', es: 'es-ES', tl: 'fil-PH' }
function ReadAloud({ text }) {
  const t = useT()
  const lang = useContext(LangContext)
  const [speaking, setSpeaking] = useState(false)
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null
  useEffect(() => () => { try { synth?.cancel() } catch { /* no-op */ } }, [synth])
  if (!synth || !text) return null
  const toggle = () => {
    try {
      if (speaking) { synth.cancel(); setSpeaking(false); return }
      synth.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = SPEECH_LANG[lang] || 'en-US'
      u.rate = 0.95
      u.onend = () => setSpeaking(false)
      u.onerror = () => setSpeaking(false)
      setSpeaking(true)
      synth.speak(u)
    } catch { setSpeaking(false) }
  }
  return (
    <button
      onClick={toggle}
      aria-label={speaking ? t('stopReading') : t('readAloud')}
      title={speaking ? t('stopReading') : t('readAloud')}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 6, background: 'none', border: 'none', color: C.accent, cursor: 'pointer', padding: 2, fontSize: 12, fontWeight: 600, fontFamily: 'inherit' }}
    >
      <IcSpeaker size={15} />{speaking ? t('stopReading') : t('readAloud')}
    </button>
  )
}

// "Report a possible error" - a mailto so a wrong answer is one tap from a
// human. Prefills the question + the start of the answer so reports arrive
// actionable; the person adds what looks wrong.
function ReportError({ question, answer }) {
  const t = useT()
  const body = `Question: ${question || ''}\n\nAnswer (start):\n${stripAnswerMarkers(answer || '').slice(0, 400)}\n\nWhat looks wrong:\n`
  const href = `mailto:${REPORT_EMAIL}?subject=${encodeURIComponent('RightsBook error report')}&body=${encodeURIComponent(body)}`
  return (
    <a
      href={href}
      style={{ display: 'inline-flex', alignItems: 'center', marginTop: 6, marginLeft: 16, color: C.ink3, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
    >
      {t('reportError')}
    </a>
  )
}

const Bubble = React.forwardRef(function Bubble({ m, baseState, question, onCompare }, ref) {
  const user = m.role === 'user'
  const parsed = user ? null : parseAnswer(m.content)
  return (
    <div ref={ref} style={{ display: 'flex', justifyContent: user ? 'flex-end' : 'flex-start', margin: '10px 0' }}>
      <div style={{ maxWidth: '88%' }}>
        <div
          style={{
            background: user ? C.accent : C.card,
            color: user ? '#fff' : C.ink,
            border: user ? 'none' : `1px solid ${C.border}`,
            borderRadius: 16,
            borderBottomRightRadius: user ? 5 : 16,
            borderBottomLeftRadius: user ? 16 : 5,
            padding: '11px 14px', fontSize: 15, lineHeight: 1.55, wordBreak: 'break-word',
            boxShadow: user ? 'none' : '0 1px 2px rgba(43,42,40,0.04)',
          }}
        >
          {user ? <span style={{ whiteSpace: 'pre-wrap' }}>{m.content}</span> : parsed ? <StructuredAnswer parsed={parsed} /> : renderContent(stripAnswerMarkers(m.content))}
        </div>
        {!user && <SourceChips sources={m.sources} />}
        {!user && <ReadAloud text={stripAnswerMarkers(m.content)} />}
        {!user && <ReportError question={question} answer={m.content} />}
        {!user && onCompare && <CompareBlock compare={m.compare} baseState={baseState} onCompare={onCompare} />}
      </div>
    </div>
  )
})

// History is now shown inside HistorySheet (a Modal opened from the Ask header),
// so `embedded` drops the standalone scroll wrapper + heading (the Modal owns
// both) and just renders the list.
function History({ conversations, onOpen, onDelete, embedded, connected }) {
  const t = useT()
  const Wrap = embedded ? React.Fragment : 'div'
  const wrapProps = embedded ? {} : { style: { flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: `16px 16px ${NAV_CLEARANCE}`, WebkitOverflowScrolling: 'touch' } }
  return (
    <Wrap {...wrapProps}>
      {!embedded && <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 700, margin: '4px 0 10px' }}>{t('savedQuestions')}</div>}
      {conversations.length === 0 ? (
        <div style={{ ...cardStyle(), padding: '18px 16px', fontSize: 14, color: C.sub, lineHeight: 1.55 }}>
          {t('historyEmpty')}
        </div>
      ) : (
        conversations.map((conv) => {
          const firstQ = (conv.messages.find((m) => m.role === 'user') || {}).content || t('conversation')
          const qCount = conv.messages.filter((m) => m.role === 'user').length
          return (
            // Swipe left to reveal Delete (GuestBook cards). Desktop keeps a
            // visible trash button - a mouse can't swipe.
            <SwipeableRow
              key={conv.id}
              onTap={() => onOpen(conv.id)}
              actions={[{ label: t('delete'), color: C.danger, icon: <IcTrash size={18} />, onClick: () => onDelete(conv.id) }]}
            >
              <div style={{ ...cardStyle(), display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}>
                <div style={{ flex: 1, minWidth: 0, padding: '13px 14px', textAlign: 'left', cursor: 'pointer' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{firstQ}</div>
                  <div style={{ fontSize: 12, color: C.sub, marginTop: 3 }}>{timeAgo(conv.createdAt, t)} · {qCount} {qCount > 1 ? t('questionN') : t('question1')}</div>
                </div>
                {!IS_TOUCH && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(conv.id) }}
                    aria-label={t('deleteConversation')}
                    style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 46, background: 'transparent', border: 'none', borderLeft: `1px solid ${C.line}`, color: C.sub, cursor: 'pointer' }}
                  >
                    <IcTrash size={16} />
                  </button>
                )}
              </div>
            </SwipeableRow>
          )
        })
      )}
      {conversations.length > 0 && (
        <div style={{ fontSize: 12, color: C.sub, marginTop: 10, lineHeight: 1.5 }}>
          {IS_TOUCH ? t('swipeHint') : ''}{t(connected ? 'historyFooterSynced' : 'historyFooter', { n: MAX_CONVERSATIONS })}
        </div>
      )}
    </Wrap>
  )
}

// History as a bottom sheet, opened from the Ask page header.
function HistorySheet({ onClose, conversations, onOpen, onDelete, connected }) {
  const t = useT()
  return (
    <Modal onClose={onClose} title={t('savedQuestions')}>
      <History conversations={conversations} onOpen={onOpen} onDelete={onDelete} connected={connected} embedded />
    </Modal>
  )
}

// Glossary as a bottom sheet, opened from the book icon in the header on every
// tab. State terms lead (the jargon on the person's actual paperwork), then the
// everywhere terms. One search box filters both; definitions are English like
// the corpus, chrome is translated.
function GlossarySheet({ onClose, stateCode }) {
  const t = useT()
  const [q, setQ] = useState('')
  const needle = q.trim().toLowerCase()
  const match = (e) => !needle
    || e.term.toLowerCase().includes(needle)
    || (e.full || '').toLowerCase().includes(needle)
    || e.def.toLowerCase().includes(needle)
  const stateHits = getStateTerms(stateCode).filter(match)
  const fedHits = FEDERAL_TERMS.filter(match)

  const sectionHead = (label) => (
    <div style={{ ...sectionLabel, margin: '18px 2px 8px' }}>{label}</div>
  )
  const row = (e) => (
    <div key={e.term} style={{ ...cardStyle(), padding: '12px 14px', marginBottom: 8 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>
        {e.term}
        {e.full && <span style={{ fontWeight: 400, color: C.sub }}> · {e.full}</span>}
      </div>
      <div style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.55, marginTop: 4 }}>{e.def}</div>
    </div>
  )

  return (
    <Modal onClose={onClose} title={t('glossary')}>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 12 }}>{t('glossarySub')}</div>
      <SearchField value={q} onChange={setQ} placeholder={t('glossarySearch')} />
      {stateHits.length > 0 && (
        <>
          {sectionHead(t('glossaryStateSection', { name: stateName(stateCode) }))}
          {stateHits.map(row)}
        </>
      )}
      {fedHits.length > 0 && (
        <>
          {sectionHead(t('glossaryFederalSection'))}
          {fedHits.map(row)}
        </>
      )}
      {stateHits.length === 0 && fedHits.length === 0 && (
        <div style={{ fontSize: 14, color: C.sub, lineHeight: 1.55, margin: '18px 2px' }}>{t('glossaryNoMatch')}</div>
      )}
    </Modal>
  )
}

// ─── Rights hub icons (topic tiles + group headers) ───────────────────────────
const IcStar = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <polygon points="12 2 15 8.5 22 9.3 17 14 18.3 21 12 17.5 5.7 21 7 14 2 9.3 9 8.5 12 2" />
  </SvgIcon>
)
const IcColumns = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M3 21h18" /><path d="M12 2 3 8h18z" /><path d="M5 8v10M10 8v10M14 8v10M19 8v10" />
  </SvgIcon>
)
const IcHash = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
    <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
  </SvgIcon>
)
const IcMap = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <polygon points="1 6 8 3 16 6 23 3 23 18 16 21 8 18 1 21 1 6" />
    <line x1="8" y1="3" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="21" />
  </SvgIcon>
)
// "Other states". Deliberately NOT IcMap, which already means "find the office that
// serves your area" on two other cards - the same glyph for a different idea makes
// both read as the same feature.
const IcGlobe = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <circle cx="12" cy="12" r="9" /><path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
  </SvgIcon>
)
const IcScale = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M12 3v18" /><path d="M7 21h10" /><path d="M4 7h16" />
    <path d="M12 4 5 7l3 6a3 3 0 0 1-6 0z" /><path d="M12 4l7 3-3 6a3 3 0 0 0 6 0z" />
  </SvgIcon>
)
const IcInfo = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <circle cx="12" cy="12" r="9" /><line x1="12" y1="11" x2="12" y2="16" />
    <circle cx="12" cy="7.6" r="0.7" fill="currentColor" stroke="none" />
  </SvgIcon>
)
const IcUsers = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </SvgIcon>
)
const IcHeart = ({ size = 24, style }) => (
  <SvgIcon size={size} style={style}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
  </SvgIcon>
)

// One service-code row. The number is the thing a reader arrives with - it is on
// their IPP, their invoice, the notice they were handed - so it gets its own
// fixed-width column and every name starts at the same x. A code that has been
// retired or needs an exemption still belongs on the list (an older plan is
// exactly where you meet one), but it says so on the row rather than reading as
// something you could ask for today.
const CODE_STATUS_KEY = { retired: 'rtCodesRetired', exemption: 'rtCodesExemption' }

function ServiceCodeRow({ s, first, showGroup }) {
  const t = useT()
  const statusKey = CODE_STATUS_KEY[s.status]
  return (
    <div style={{ display: 'flex', gap: 12, padding: '11px 0', borderTop: first ? 'none' : `1px solid ${C.line}` }}>
      <span style={{
        flexShrink: 0, width: 40, textAlign: 'right', fontSize: 15, fontWeight: 700, lineHeight: 1.35,
        color: C.accent, fontVariantNumeric: 'tabular-nums', letterSpacing: 0.2,
      }}>{s.code}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: C.ink, lineHeight: 1.35 }}>{s.name}</span>
        <span style={{ display: 'block', fontSize: 13, color: C.sub, marginTop: 3, lineHeight: 1.5 }}>{s.note}</span>
        {/* Footer metadata, below the sentence it qualifies. Putting the category
            between the name and the note read as a subtitle of the service and
            broke the one line a reader actually came for. */}
        {(statusKey || (showGroup && s.groupLabel)) && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
            {statusKey && (
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: 0.3, textTransform: 'uppercase',
                color: C.ink3, background: C.bg, border: `1px solid ${C.line}`,
                borderRadius: R.pill, padding: '2px 8px',
              }}>{t(statusKey)}</span>
            )}
            {showGroup && s.groupLabel && (
              <span style={{ fontSize: 11.5, color: C.ink3 }}>{s.groupLabel}</span>
            )}
          </span>
        )}
      </span>
    </div>
  )
}

function ServiceCodeList({ codes, showGroup = false }) {
  return (
    <div style={{ ...cardStyle(), padding: '6px 14px' }}>
      {codes.map((s, i) => <ServiceCodeRow key={s.code} s={s} first={i === 0} showGroup={showGroup} />)}
    </div>
  )
}

function SectionTitle({ children, first = false }) {
  return <h2 style={{ fontFamily: serif, fontSize: 19, fontWeight: 700, margin: `${first ? 4 : 22}px 0 10px` }}>{children}</h2>
}

// ─── Rights: topic grouping ───────────────────────────────────────────────────
// Federal base + each state pack render as a few plain-language topic groups
// instead of a wall of citation-titled cards. Federal chunks group by id; state
// chunks by the id suffix every pack follows (…-rights / -service-plan /
// -appeals / -agency-waivers / -complaints-pna), with California's bespoke ids
// folded into the same buckets. Citations move off the card face to a quiet
// Source line inside the opened card. Only the short title is swapped for a
// friendlier one; bodies + citations come straight from the vetted corpus.
const FED_GROUPS_DATA = [
  { icon: IcInfo, label: 'rtgBasics', items: [['hcbs-overview', 'rtfOverview']] },
  { icon: IcShield, label: 'rtgCore', items: [
    ['rights-community', 'rtfCommunity'], ['rights-choice-setting', 'rtfSetting'],
    ['rights-privacy-dignity', 'rtfPrivacy'], ['rights-autonomy', 'rtfAutonomy'],
    ['rights-choice-provider', 'rtfProvider'],
  ] },
  { icon: IcHome, label: 'rtgHome', items: [
    ['provider-owned-lease', 'rtfLease'],
    ['provider-owned-schedule-food-visitors', 'rtfSchedule'],
    ['modifications', 'rtfMods'],
  ] },
  { icon: IcFileText, label: 'rtgPlan', items: [['person-centered-planning', 'rtfPcp']] },
  { icon: IcUsers, label: 'rtgDay', items: [['day-program-rights', 'rtfDay']] },
  { icon: IcScale, label: 'rtgAppeals', items: [['fed-fair-hearing', 'rtfHearing']] },
  { icon: IcHeart, label: 'rtgKids', items: [['fed-epsdt', 'rtfEpsdt']] },
]
const STATE_SUFFIX_MAP = {
  'rights': ['rights', 'rtsRights'], 'lanterman-rights': ['rights', 'rtsRights'],
  'service-plan': ['plan', 'rtsPlan'], 'ipp': ['plan', 'rtsPlan'],
  'appeals': ['appeals', 'rtsAppeals'], 'medical-appeals': ['appeals', 'rtsMedAppeals'],
  'agency-waivers': ['programs', 'rtsPrograms'], 'hcbs-compliance': ['programs', 'rtsCompliance'],
  'complaints-pna': ['gethelp', 'rtsGetHelp'], 'complaints': ['gethelp', 'rtsGetHelp'],
}
const STATE_GROUPS_ORDER = [
  ['rights', IcShield, 'rtgRights'], ['plan', IcFileText, 'rtgPlan'],
  ['appeals', IcScale, 'rtgAppeals'], ['programs', IcColumns, 'rtgPrograms'],
  ['gethelp', IcPhone, 'rtgGetHelp'],
]
function fedGroups(t) {
  const byId = Object.fromEntries(FEDERAL.map((c) => [c.id, c]))
  return FED_GROUPS_DATA.map((g) => ({
    icon: g.icon, label: t(g.label),
    cards: g.items.filter(([id]) => byId[id]).map(([id, tk]) => ({ id, title: t(tk), text: byId[id].text, citation: byId[id].citation })),
  })).filter((g) => g.cards.length)
}
function stateGroups(code, t) {
  const pack = STATES[code]
  if (!pack) return null
  const name = stateName(code)
  const buckets = {}
  const extra = []
  pack.chunks.forEach((c) => {
    const suffix = c.id.slice(code.length + 1)
    const map = STATE_SUFFIX_MAP[suffix]
    const card = { id: c.id, title: map ? t(map[1], { name }) : c.title, text: c.text, citation: c.citation }
    if (map) (buckets[map[0]] ||= []).push(card)
    else extra.push(card)
  })
  // Eight states (AR KS MS MT NE NM WV WY) have no `-rights` chunk in the corpus.
  // Their "Your rights" section simply did not render, so the gap was invisible: the
  // reader saw four topics instead of five and had no way to tell whether their state
  // has no such law or we just never loaded it. Say which it is. Never imply the
  // state lacks protections - the federal floor applies everywhere.
  if (!buckets.rights?.length) {
    buckets.rights = [{
      id: `${code}-rights-missing`,
      title: t('rtsRightsMissing', { name }),
      text: t('rtsRightsMissingBody', { name }),
      citation: null,
    }]
  }
  const out = []
  STATE_GROUPS_ORDER.forEach(([gk, Icon, labelKey]) => {
    if (buckets[gk]?.length) out.push({ icon: Icon, label: t(labelKey), cards: buckets[gk] })
  })
  if (extra.length) out.push({ icon: IcInfo, label: t('rtgMore'), cards: extra })
  return out
}
// One open card at a time across the whole sheet. Plain title on the face; the
// legal citation is demoted to a quiet Source line inside the opened body.
function GroupedRights({ groups }) {
  const t = useT()
  const [open, setOpen] = useState(null)
  return (
    <>
      {groups.map((g) => (
        <div key={g.label} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, margin: '0 2px 9px' }}>
            <span style={{ width: 30, height: 30, borderRadius: 9, background: C.accentSoft, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><g.icon size={17} /></span>
            <span style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: C.ink }}>{g.label}</span>
          </div>
          {g.cards.map((c) => {
            const isOpen = open === c.id
            return (
              <div key={c.id} style={{ ...cardStyle(), marginBottom: 8, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpen(isOpen ? null : c.id)}
                  aria-expanded={isOpen}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, background: 'transparent', border: 'none', padding: '14px 14px', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: C.ink, lineHeight: 1.35 }}>{c.title}</span>
                  <IcChevron dir={isOpen ? 'down' : 'right'} size={16} style={{ color: C.accent, flexShrink: 0 }} />
                </button>
                {isOpen && (
                  <div style={{ padding: '0 14px 14px' }}>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: C.ink, whiteSpace: 'pre-wrap' }}>{c.text}</div>
                    {c.citation && (
                      <div style={{ fontSize: 11.5, color: C.ink3, marginTop: 12, paddingTop: 9, borderTop: `1px solid ${C.line}`, lineHeight: 1.45 }}>
                        <span style={{ color: C.sub, fontWeight: 700 }}>{t('rtSource')}</span> {c.citation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </>
  )
}
function StateBody({ code }) {
  const t = useT()
  const name = stateName(code)
  const groups = stateGroups(code, t)
  return (
    <>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 14 }}>{t('rtStateIntro', { name })}</div>
      {groups
        ? <GroupedRights groups={groups} />
        : <div style={{ ...cardStyle(), padding: '16px', fontSize: 14, color: C.ink, lineHeight: 1.6 }}>{t('statePackMissing', { name })}</div>}
    </>
  )
}
// Big full-width hub card (the state / federal "sorter").
function HubHero({ icon: Icon, title, sub, onClick }) {
  return (
    <button onClick={onClick} style={{ ...cardBtnStyle(R.lg), display: 'flex', alignItems: 'center', gap: 14, padding: '16px 15px', marginBottom: 12 }}>
      <span style={{ width: 48, height: 48, borderRadius: 14, background: C.accentSoft, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={24} /></span>
      <span style={{ minWidth: 0, flex: 1 }}>
        <span style={{ display: 'block', fontSize: 17, fontWeight: 700, color: C.ink, lineHeight: 1.2 }}>{title}</span>
        <span style={{ display: 'block', fontSize: 13, color: C.sub, marginTop: 3, lineHeight: 1.35 }}>{sub}</span>
      </span>
      <IcChevron dir="right" size={18} style={{ color: C.accent, flexShrink: 0 }} />
    </button>
  )
}
function FederalSheet({ onClose }) {
  const t = useT()
  return (
    <Modal onClose={onClose} title={t('rtFederalTitle')}>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 14 }}>{t('rtFederalIntro')}</div>
      <GroupedRights groups={fedGroups(t)} />
    </Modal>
  )
}
function StateSheet({ code, onClose }) {
  const t = useT()
  return (
    <Modal onClose={onClose} title={t('rtStateTitle', { name: stateName(code) })}>
      <StateBody code={code} />
    </Modal>
  )
}
// The service-code sheet. It carries all 183 California codes now, which is only
// useful if the one you are holding is findable in a few seconds: the search
// matches the number, the official name and the plain-language note, and an
// exact three-digit match is pinned to the top because typing "864" means you
// are looking at 864 on a piece of paper, not browsing.
function codeMatches(s, q) {
  return s.code.includes(q) || s.name.toLowerCase().includes(q) || (s.note || '').toLowerCase().includes(q)
}

function CodesSheet({ code, onClose }) {
  const t = useT()
  const pack = STATES[code]
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase()
  const isCA = code === 'CA'
  const all = pack.serviceCodes
  // California is the only pack with the grouped listing; any future state pack
  // that ships a flat array still renders, just without section headings.
  const groups = isCA ? SERVICE_CODE_GROUPS : null

  const hits = query ? all.filter((s) => codeMatches(s, query)) : null
  if (hits) {
    hits.sort((a, b) => (b.code === query) - (a.code === query) || a.code.localeCompare(b.code))
  }

  return (
    <Modal onClose={onClose} title={t('rtCodesTitle')}>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 12 }}>{t('rtCodesIntro')}</div>

      <SearchField value={q} onChange={setQ} placeholder={t('rtCodesSearchPh')} />
      <div aria-live="polite" style={{ fontSize: 12, color: C.ink3, margin: '8px 2px 12px' }}>
        {query ? t('rtCodesHits', { n: hits.length }) : t('rtCodesTotal', { n: all.length })}
      </div>

      {query
        ? (hits.length
          ? <ServiceCodeList codes={hits} showGroup />
          : (
            <div style={{ ...cardStyle(), padding: '18px 16px', fontSize: 14, color: C.sub, lineHeight: 1.55 }}>
              {t('rtCodesNone')}
            </div>
          ))
        : (groups
          ? groups.map((g, i) => (
            <div key={g.id}>
              <div style={{ ...sectionLabel, margin: `${i === 0 ? 2 : 20}px 2px 8px` }}>{g.label}</div>
              <ServiceCodeList codes={g.codes} />
            </div>
          ))
          : <ServiceCodeList codes={all} />)}

      {isCA && (
        <div style={{ fontSize: 12, color: C.sub, marginTop: 14, lineHeight: 1.5 }}>
          {t('rtCodesSource', { date: 'January 2026' })}{' '}
          <a href={SERVICE_CODES_SOURCE.url} target="_blank" rel="noreferrer" style={{ color: C.accent, fontWeight: 600 }}>dds.ca.gov</a>
          <div style={{ marginTop: 6 }}>{t('caFootnote')}</div>
        </div>
      )}
    </Modal>
  )
}
// Search every state pack at once and rank by how SPECIFIC each state's language is,
// then quote it with its citation. The deterministic sibling of the AI compare that
// lives under a chat answer: that one explains a difference between two states, this
// one finds which states have anything worth reading in the first place. Nothing is
// sent anywhere and no model is involved - the corpus is already on the device, so
// this works offline and the words on screen are the source's own.
function CompareStates({ currentCode, onOpen }) {
  const t = useT()
  const [topic, setTopic] = useState('all')
  const [q, setQ] = useState('')
  const query = q.trim()
  const idle = !query && topic === 'all'
  const res = idle ? null : compareStates(query, { topic, exclude: currentCode })

  const chip = (label, tone = 'accent') => (
    <span key={label} style={{
      fontSize: 11, fontWeight: 600, borderRadius: 999, padding: '2px 8px', whiteSpace: 'nowrap',
      color: tone === 'accent' ? C.accent : C.sub,
      background: tone === 'accent' ? C.accentSoft : C.bg,
      border: `1px solid ${C.line}`,
    }}>{label}</span>
  )
  const SIGNAL_KEY = { deadline: 'csWhyDeadline', obligation: 'csWhyObligation', statute: 'csWhyStatute', contact: 'csWhyContact' }

  return (
    <>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 12 }}>{t('csIntro')}</div>
      <Select
        value={topic}
        onChange={setTopic}
        options={COMPARE_TOPICS.map((o) => ({ value: o.id, label: t(`csTopic${o.id.charAt(0).toUpperCase()}${o.id.slice(1)}`) }))}
        ariaLabel={t('csTabCompare')}
      />
      <SearchField value={q} onChange={setQ} placeholder={t('csSearchPh')} style={{ marginTop: 10, marginBottom: 14 }} />

      {idle && <div style={{ fontSize: 14, color: C.sub, lineHeight: 1.55, margin: '18px 2px' }}>{t('csStart')}</div>}

      {res && res.matched === 0 && (
        // The honest empty state. Saying "no state addresses this" would be a claim we
        // cannot support; what we actually know is that our corpus has nothing.
        <div style={{ ...cardStyle(), padding: '16px' }}>
          <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.55 }}>{t('csNothing')}</div>
          {res.unmatchedTerms.length > 0 && (
            <div style={{ fontSize: 12.5, color: C.sub, marginTop: 8, lineHeight: 1.5 }}>
              {t('csNothingTerms', { terms: res.unmatchedTerms.join(', ') })}
            </div>
          )}
        </div>
      )}

      {res && res.matched > 0 && (
        <>
          <div style={{ fontSize: 12.5, color: C.sub, lineHeight: 1.5, margin: '0 2px 10px' }}>
            {t('csSummary', { matched: res.matched, searched: res.searched, shown: res.hits.length })}
          </div>
          {res.hits.map((h) => (
            <button
              key={h.code} onClick={() => onOpen(h.code)}
              style={{ ...cardBtnStyle(), display: 'block', padding: '13px 14px', marginBottom: 8 }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{h.name}</span>
                {/* Why this state ranked here, in checkable terms. The reader can see
                    the deadline or the citation in the quote below and judge for
                    themselves rather than trusting a score. */}
                {h.signals.map((sig) => chip(t(SIGNAL_KEY[sig])))}
              </span>
              <span style={{ display: 'block', fontSize: 13.5, color: C.ink, lineHeight: 1.6 }}>{h.excerpt}</span>
              {h.citation && (
                <span style={{ display: 'block', fontSize: 11.5, color: C.ink3, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${C.line}`, lineHeight: 1.45 }}>
                  <span style={{ color: C.sub, fontWeight: 700 }}>{t('rtSource')}</span> {h.citation}
                </span>
              )}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12.5, fontWeight: 600, color: C.accent, marginTop: 8 }}>
                {t('csReadFull', { name: h.name })}<IcChevron dir="right" size={13} />
              </span>
            </button>
          ))}
          {res.silent > 0 && (
            // The number that answers "do I still have 49 to check?". Never drop it:
            // a list of 8 with no denominator implies the other 43 were checked and
            // rejected, when in fact they simply have nothing loaded.
            <div style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.5, margin: '10px 2px 0' }}>
              {t('csSilent', { n: res.silent })}
            </div>
          )}
        </>
      )}
    </>
  )
}

function OtherStatesSheet({ currentCode, onClose }) {
  const t = useT()
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(null)
  const [mode, setMode] = useState('browse')
  if (sel) {
    return (
      <Modal onClose={onClose} title={t('rtStateTitle', { name: stateName(sel) })}>
        <button onClick={() => setSel(null)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: C.accent, cursor: 'pointer', padding: '2px 2px 12px', fontSize: 14, fontWeight: 600, fontFamily: 'inherit' }}>
          <IcChevron dir="left" size={15} />{t('rtAllStates')}
        </button>
        <StateBody code={sel} />
      </Modal>
    )
  }
  const others = STATE_OPTIONS.filter((o) => o.value !== currentCode)
  const needle = q.trim().toLowerCase()
  const list = needle ? others.filter((o) => o.label.toLowerCase().includes(needle)) : others
  const tab = (id, label) => {
    const on = mode === id
    return (
      <button
        key={id} onClick={() => setMode(id)} aria-pressed={on}
        style={{ ...segBtnStyle(on), flex: 1, fontSize: 14 }}
      >{label}</button>
    )
  }
  return (
    <Modal onClose={onClose} title={t('rtOthersTitle')}>
      {/* Browse = "show me Ohio". Compare = "which states say anything useful about
          this?". Both live here because both start from the same thought, and the
          compare results hand off into the same per-state guide. */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {tab('browse', t('csTabBrowse'))}
        {tab('compare', t('csTabCompare'))}
      </div>
      {mode === 'compare' ? <CompareStates currentCode={currentCode} onOpen={setSel} /> : (
      <>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 12 }}>{t('rtOthersIntro')}</div>
      <SearchField value={q} onChange={setQ} placeholder={t('rtSearchStates')} style={{ marginBottom: 12 }} />
      {list.map((o) => (
        <button key={o.value} onClick={() => setSel(o.value)} style={{ ...cardBtnStyle(), display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '13px 14px', marginBottom: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{o.label}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {stateCovered(o.value) && <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, background: C.accentSoft, borderRadius: 999, padding: '2px 8px' }}>{t('stateGuide')}</span>}
            <IcChevron dir="right" size={16} style={{ color: C.accent }} />
          </span>
        </button>
      ))}
      </>
      )}
    </Modal>
  )
}

// The California "regional center" equivalent for the other big states: the local
// entry-point agency (LIDDA, APD office, OPWDD Front Door, county MH/ID office,
// ISC agency...), how to start there, and who runs it. Every fact is verified in
// stateGuide.js against an official source. Content is English (like the corpus);
// the chrome is translated. CA keeps its bespoke county->center finder (RcSheet).
function WhereToStartSheet({ code, onClose }) {
  const t = useT()
  const g = STATE_GUIDE[code]
  if (!g) return null
  const linkBtn = (kind) => ({ ...cloudBtn(kind), textDecoration: 'none', textAlign: 'center', display: 'block' })
  const secTitle = { ...sectionLabel, margin: '20px 2px 8px' }
  return (
    <Modal onClose={onClose} title={t('rtTileStart')}>
      <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 14 }}>{g.entry.what}</div>
      <a href={g.entry.findUrl} target="_blank" rel="noreferrer" style={linkBtn('primary')}>{t('wtsFindBtn')}</a>

      <div style={secTitle}>{t('wtsHowStart')}</div>
      <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 10 }}>{g.start.text}</div>
      <a href={g.start.url} target="_blank" rel="noreferrer" style={linkBtn('secondary')}>{t('wtsVisit')}</a>

      <div style={secTitle}>{t('wtsWhoRuns')}</div>
      <div style={{ ...cardStyle(), padding: '13px 14px' }}>
        <a href={g.agency.url} target="_blank" rel="noreferrer" style={{ fontSize: 15, fontWeight: 600, color: C.accent, textDecoration: 'none' }}>{g.agency.name}</a>
        <div style={{ fontSize: 13, color: C.sub, marginTop: 6, lineHeight: 1.5 }}><span style={{ fontWeight: 700, color: C.ink }}>{t('wtsPrograms')}:</span> {g.waivers}</div>
      </div>

      <div style={{ fontSize: 12, color: C.sub, marginTop: 16, lineHeight: 1.5 }}>{t('wtsHelpHint')}</div>
    </Modal>
  )
}

// The Rights hub: a calm landing of a few big choices (the vault pattern), not
// one long scroll. The state / federal "sorter" leads; each card opens a focused
// sheet of plain-language, grouped guides. The public self-check stays featured.
const reviewedDate = (lang) => {
  try {
    return new Date(SOURCES_REVIEWED + 'T12:00:00').toLocaleDateString(
      DATE_LOCALE[lang] || 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    )
  } catch { return SOURCES_REVIEWED }
}

function Library({ stateCode, onStateChange, onSaveIncident }) {
  const t = useT()
  const lang = useContext(LangContext)
  const [view, setView] = useState(null) // null | 'state' | 'federal' | 'codes' | 'others' | 'rc' | 'start' | 'help'
  const [showCheck, setShowCheck] = useState(false)
  const [showRmc, setShowRmc] = useState(false)
  const name = stateName(stateCode)
  const covered = stateCovered(stateCode)
  const pack = STATES[stateCode]
  const hasCodes = !!(pack && pack.serviceCodes && pack.serviceCodes.length)
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: `10px 16px ${NAV_CLEARANCE}`, WebkitOverflowScrolling: 'touch' }}>
      <PageTitle>{t('rtHubTitle')}</PageTitle>
      <div style={{ fontSize: 14, color: C.sub, lineHeight: 1.55, margin: '0 2px 16px' }}>{t('rtHubSub')}</div>

      {/* Featured public tool: the home/program self-check (no account needed). */}
      <button
        onClick={() => setShowCheck(true)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, background: C.accentSoft, border: `1px solid ${C.accent}33`, borderRadius: 16, padding: 14, marginBottom: 18, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
      >
        <span style={{ width: 42, height: 42, borderRadius: 12, background: C.card, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcHome size={22} /></span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: C.ink }}>{t('homeCheck')}</span>
          <span style={{ display: 'block', fontSize: 13, color: C.sub, marginTop: 2, lineHeight: 1.4 }}>{t('hcRightsSub')}</span>
        </span>
        <IcChevron dir="right" size={18} style={{ color: C.accent, flexShrink: 0 }} />
      </button>

      {/* Sibling tool: check ONE specific restriction against the 8 required
          safeguards. Calm card treatment so the pair doesn't shout. */}
      <button
        onClick={() => setShowRmc(true)}
        style={{ ...cardBtnStyle(R.tile), display: 'flex', alignItems: 'center', gap: 12, padding: 14, margin: '-8px 0 18px' }}
      >
        <span style={{ width: 42, height: 42, borderRadius: 12, background: C.accentSoft, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcShield size={22} /></span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontSize: 16, fontWeight: 700, color: C.ink }}>{t('rmcCard')}</span>
          <span style={{ display: 'block', fontSize: 13, color: C.sub, marginTop: 2, lineHeight: 1.4 }}>{t('rmcCardSub')}</span>
        </span>
        <IcChevron dir="right" size={18} style={{ color: C.accent, flexShrink: 0 }} />
      </button>

      <div style={{ ...sectionLabel, margin: '0 2px 8px' }}>{t('rtWhereLive')}</div>
      <div style={{ marginBottom: 18 }}>
        <Select value={stateCode} onChange={onStateChange} options={STATE_OPTIONS} ariaLabel={t('yourState')} />
      </div>

      <HubHero icon={IcStar} title={t('rtYourStateCard', { name })} sub={covered ? t('rtYourStateSub') : t('rtYourStateSubBase')} onClick={() => setView('state')} />
      <HubHero icon={IcColumns} title={t('rtFederalCard')} sub={t('rtFederalSub2')} onClick={() => setView('federal')} />

      {/* Rights-hub tools. Help & contacts lives here alongside the state's
          regional-center / service-code cards (public reference info, same as
          the rest of this tab); the Vault stays purely login-gated records.
          Every state has at least the help tile, so the grid always renders. */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 6 }}>
        {hasCodes && <VaultTile icon={<IcHash size={22} />} label={t('rtTileCodes')} sub={t('rtTileCodesSub', { n: pack.serviceCodes.length })} onClick={() => setView('codes')} />}
        {/* Regional centers are a California (Lanterman Act) construct - CA only. */}
        {stateCode === 'CA' && (
          <VaultTile icon={<IcMap size={22} />} label={t('rtTileRc')} sub={t('rtTileRcSub')} onClick={() => setView('rc')} />
        )}
        {/* The regional-center equivalent for other big states (LIDDA, APD, OPWDD...). */}
        {hasStateGuide(stateCode) && (
          <VaultTile icon={<IcMap size={22} />} label={t('rtTileStart')} sub={t('rtTileStartSub')} onClick={() => setView('start')} />
        )}
        <VaultTile icon={<IcPhone size={22} />} label={t('rtTileHelp')} sub={t('rtTileHelpSub')} onClick={() => setView('help')} />
      </div>

      {/* Other states is a full-width row, but a QUIETER one than the two HubHeroes
          above: looking up a state you don't live in is a side errand, and at equal
          weight it competed with "your state" and "federal" for the same attention. */}
      <button
        onClick={() => setView('others')}
        style={{ ...cardBtnStyle(), display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', marginTop: 12 }}
      >
        <span style={{ width: 34, height: 34, borderRadius: 10, background: C.accentSoft, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcGlobe size={18} /></span>
        <span style={{ minWidth: 0, flex: 1 }}>
          <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: C.ink, lineHeight: 1.2 }}>{t('rtTileOthers')}</span>
          <span style={{ display: 'block', fontSize: 12.5, color: C.sub, marginTop: 2, lineHeight: 1.35 }}>{t('rtTileOthersSub')}</span>
        </span>
        <IcChevron dir="right" size={16} style={{ color: C.ink3, flexShrink: 0 }} />
      </button>

      {/* Freshness line for verified states only (see REVIEWED_STATES). The extra
          bottom margin lifts it clear of the nav's fade gradient: the page's bottom
          padding left it sitting in the fade's soft band, washing out a line that is
          a trust signal - it should read crisply or not be there at all. */}
      {REVIEWED_STATES.has(stateCode) && (
        <div style={{ fontSize: 12, color: C.ink3, margin: '16px 2px 34px', textAlign: 'center', lineHeight: 1.5 }}>
          {t('srcReviewed', { name, date: reviewedDate(lang) })}
        </div>
      )}

      {showCheck && <HomeCheckSheet onClose={() => setShowCheck(false)} onSaveIncident={onSaveIncident} />}
      {showRmc && <RmcSheet onClose={() => setShowRmc(false)} onSaveIncident={onSaveIncident} />}
      {view === 'state' && <StateSheet code={stateCode} onClose={() => setView(null)} />}
      {view === 'federal' && <FederalSheet onClose={() => setView(null)} />}
      {view === 'codes' && <CodesSheet code={stateCode} onClose={() => setView(null)} />}
      {view === 'others' && <OtherStatesSheet currentCode={stateCode} onClose={() => setView(null)} />}
      {view === 'rc' && <RcSheet onClose={() => setView(null)} />}
      {view === 'start' && <WhereToStartSheet code={stateCode} onClose={() => setView(null)} />}
      {view === 'help' && (
        <Modal onClose={() => setView(null)} title={t('helpContacts')}>
          <ContactsCard stateCode={stateCode} />
        </Modal>
      )}
    </div>
  )
}

// California regional center finder (CA only). Pick your county; the map
// highlights your center's whole service area (calm - one region, not 21 colors)
// and the card shows its contacts. Los Angeles County splits into 7 centers by
// area, so it falls back to listing them + the DDS ZIP finder rather than guess.
// The official DDS lookup is always linked as the current source of truth.
function RegionalCenters() {
  const t = useT()
  const [county, setCounty] = useState('')
  const rcId = county ? COUNTY_TO_RC[county] : null
  const isLA = rcId === 'la'
  const center = rcId && rcId !== 'la' ? CENTERS[rcId] : null
  const highlight = new Set(county ? siblingCounties(county) : [])
  const countyOptions = COUNTIES.map((c) => ({ value: c, label: c }))
  const phoneHref = (p) => `tel:+1${p.replace(/\D/g, '')}`
  const linkStyle = { color: C.accent, fontWeight: 600, textDecoration: 'none' }
  const centerCard = { ...cardStyle(R.tile), padding: '15px 16px' }

  return (
    <>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 12 }}>{t('rcIntro')}</div>

      <div style={{ ...cardStyle(R.tile), padding: 12, marginBottom: 14 }}>
        <svg viewBox={CA_MAP.viewBox} role="img" aria-label={t('rcMapAria')} style={{ width: '100%', height: 'auto', maxHeight: '44vh', display: 'block' }}>
          {COUNTIES.map((n) => {
            const on = highlight.has(n)
            const sel = n === county
            return (
              <path key={n} d={CA_MAP.paths[n]}
                fill={on ? (sel ? C.accent : C.accentSoft) : C.mapBase}
                stroke={on ? C.accent : C.mapLine} strokeWidth={sel ? 1.4 : 0.6} strokeLinejoin="round" />
            )
          })}
        </svg>
      </div>

      <label style={{ ...fieldLabelStyle, marginTop: 0 }}>{t('rcYourCounty')}</label>
      <Select value={county} onChange={setCounty} options={countyOptions} placeholder={t('rcCountyPh')} ariaLabel={t('rcYourCounty')} />

      <div style={{ marginTop: 14 }}>
        {!county && <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, padding: '0 2px' }}>{t('rcPickPrompt')}</div>}

        {center && (
          <div style={centerCard}>
            <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.ink, lineHeight: 1.3 }}>{center.name}</div>
            <a href={phoneHref(center.phone)} style={{ ...linkStyle, display: 'inline-block', fontSize: 16, marginTop: 8 }}>{center.phone}</a>
            <div style={{ marginTop: 6 }}>
              <a href={center.website} target="_blank" rel="noreferrer" style={{ ...linkStyle, fontSize: 14 }}>{center.website.replace(/^https?:\/\//, '')}</a>
            </div>
            <div style={{ fontSize: 12.5, color: C.sub, marginTop: 10, lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700, color: C.ink }}>{t('rcServes')}</span> {siblingCounties(county).join(', ')}
            </div>
          </div>
        )}

        {isLA && (
          <div style={centerCard}>
            <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.55, marginBottom: 12 }}>{t('rcLaIntro')}</div>
            {LA_CENTERS.map((c, i) => (
              <div key={c.name} style={{ padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.line}` }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{c.name}</div>
                <div style={{ fontSize: 12.5, color: C.sub, marginTop: 2, lineHeight: 1.45 }}>{c.areas}</div>
                <a href={phoneHref(c.phone)} style={{ ...linkStyle, fontSize: 14, display: 'inline-block', marginTop: 3 }}>{c.phone}</a>
              </div>
            ))}
            <a href={DDS_LOOKUP_URL} target="_blank" rel="noreferrer" style={{ ...linkStyle, fontSize: 14, display: 'inline-block', marginTop: 12 }}>{t('rcLaFind')} →</a>
          </div>
        )}
      </div>

      <div style={{ fontSize: 12, color: C.sub, marginTop: 16, lineHeight: 1.55 }}>
        {t('rcOfficialNote')}{' '}
        <a href={DDS_LOOKUP_URL} target="_blank" rel="noreferrer" style={linkStyle}>{t('rcOfficialLink')}</a>
      </div>
    </>
  )
}

function RcSheet({ onClose }) {
  const t = useT()
  return (
    <Modal onClose={onClose} title={t('rcTitle')}>
      <RegionalCenters />
    </Modal>
  )
}

// ─── VAULT (account-gated, E2E-encrypted records; incident log first) ──────────
// Incidents are CLOUD-ONLY: in memory while unlocked, encrypted rows at rest.
// Nothing plaintext ever touches localStorage - this is the vault's whole point.
const incidentSort = (list) =>
  [...list].sort((a, b) => (b.at || '').localeCompare(a.at || '') || (b.createdAt || 0) - (a.createdAt || 0))

const todayISO = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Appeal-deadline math. Tracks mirror the CA dual appeal system the corpus
// teaches (regional center 60d / Medi-Cal via CDSS 90d); custom covers
// anything else. All date work in local time, whole days.
const deadlineDays = (rec) => (rec.track === 'rc' ? 60 : rec.track === 'medical' ? 90 : Math.max(1, Number(rec.days) || 60))
const addDaysISO = (iso, n) => {
  const [y, m, d] = (iso || todayISO()).split('-').map(Number)
  const dt = new Date(y, m - 1, d + n)
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`
}
const isoToLocale = (iso) => {
  const [y, m, d] = (iso || todayISO()).split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString()
}
const daysUntil = (iso) => {
  const [y, m, d] = (iso || todayISO()).split('-').map(Number)
  const now = new Date()
  const t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((new Date(y, m - 1, d) - t0) / 86400000)
}
const deadlineSort = (list) =>
  [...list].sort((a, b) => addDaysISO(a.notice, deadlineDays(a)).localeCompare(addDaysISO(b.notice, deadlineDays(b))))

// One state+sync pattern for every vault collection: pull on unlock, clear on
// lock, debounce-push edits, explicit cloud delete (upserts never remove).
function useVaultCollection(cloud, kind, sortFn) {
  const [items, setItems] = useState([])
  const loadedRef = useRef(false)
  useEffect(() => {
    if (cloud.status !== 'ready') { loadedRef.current = false; setItems([]); return }
    let alive = true
    ;(async () => {
      const list = await cloud.pullItems(kind)
      if (!alive) return
      setItems(sortFn(list))
      loadedRef.current = true
    })()
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloud.status])
  useEffect(() => {
    if (cloud.status !== 'ready' || !loadedRef.current) return
    const t = setTimeout(() => cloud.pushItems(kind, items), 800)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, cloud.status])
  const save = useCallback((rec) => {
    setItems((prev) => sortFn(
      rec.id ? prev.map((i) => (i.id === rec.id ? { ...i, ...rec } : i))
             : [{ ...rec, id: genId(), createdAt: Date.now() }, ...prev]
    ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    cloud.deleteItem(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { items, save, remove }
}

// Public help lines (CA focus; NDRN covers everywhere else). Numbers verified
// against the fact-checked corpus + official .gov/.org sources - treat edits as
// content edits, and NEVER add a number that hasn't been source-verified.
// Ordered roughly advocacy -> agencies/finders -> appeals -> oversight/safety.
// A contact may carry a phone AND a url (both render); DDS is the developmental-
// services agency behind HCBS, the CDSS line is only the Medi-Cal/IHSS track.
// Verified this session (2026-07-13): DRC intake 1-800-776-5746
// (disabilityrightsca.org/get-help), SCDD toll-free 1-833-818-9886
// (scdd.ca.gov/contactus), Medi-Cal Managed Care Ombudsman 1-888-452-8609
// (dhcs.ca.gov), LTC Ombudsman CRISISline 1-800-231-4024 (aging.ca.gov).
const CA_CONTACTS = [
  { name: 'OCRA', descKey: 'cOcra', phone: '1-800-390-7032' },
  { name: 'Disability Rights California', descKey: 'cDrc', phone: '1-800-776-5746', url: 'disabilityrightsca.org' },
  { name: 'CA Dept of Developmental Services', descKey: 'cDds', phone: '1-833-421-0061', url: 'dds.ca.gov' },
  { name: 'Regional centers', descKey: 'cRc', url: 'dds.ca.gov/rc' },
  { name: 'State Council on Developmental Disabilities', descKey: 'cScdd', phone: '1-833-818-9886', url: 'scdd.ca.gov' },
  { name: 'CDSS State Hearings', descKey: 'cCdss', phone: '1-800-743-8525' },
  { name: 'Medi-Cal Managed Care Ombudsman', descKey: 'cMcop', phone: '1-888-452-8609' },
  { name: 'Long-Term Care Ombudsman', descKey: 'cLtco', phone: '1-800-231-4024' },
  { name: 'Adult Protective Services', descKey: 'cAps', phone: '1-833-401-0832' },
]
// Correct in every state - the honest fallback where we don't have that
// state's agencies structured (HCBS is state-run; we never invent numbers).
const UNIVERSAL_CONTACTS = [
  { name: 'NDRN', descKey: 'cNdrn', url: 'ndrn.org' },
]
// Build a tel: link. Short codes like 2-1-1 (Texas fair hearings) must dial as-is,
// never as +1211; only full 10/11-digit numbers get the +1 country code.
const telHref = (phone) => {
  const d = phone.replace(/\D/g, '')
  return d.length <= 4 ? `tel:${d}` : `tel:+1${d.replace(/^1/, '')}`
}

// Escape user-entered incident text before it goes into the packet HTML so a
// stray "<" can never break (or inject into) the printable document.
const escapeHtml = (s) => String(s || '').replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

// Shared print-doc chrome for every page the app opens in a new tab: the
// complaint packet, the two self-check summaries and the request letters. These
// render as a Blob in a tab where no app CSS is available, so the rules are
// written out longhand - but ONCE. It used to be pasted twice, and the two
// copies had already drifted apart on the grey they used for citations.
const PRINT_CSS = `
  :root { -webkit-text-size-adjust: 100%; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #f4f3f1; color: #2b2a28; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  .page { max-width: 720px; margin: 0 auto; padding: 28px 22px 60px; }
  .bar { position: sticky; top: 0; background: #f4f3f1; padding: 12px 0; }
  .print-btn { width: 100%; border: none; background: #2e7d74; color: #fff; font-size: 16px; font-weight: 700; padding: 14px; border-radius: 12px; cursor: pointer; }
  h1 { font-family: Georgia, 'Times New Roman', serif; font-size: 24px; margin: 6px 0 2px; }
  h2 { font-family: Georgia, 'Times New Roman', serif; font-size: 17px; margin: 22px 0 10px; }
  .setting { font-size: 13px; color: #6e6a64; margin-bottom: 12px; }
  .intro { font-size: 14px; line-height: 1.6; margin: 0 0 18px; }
  .inc { border: 1px solid #d9d5ce; border-radius: 10px; padding: 11px 13px; margin-bottom: 10px; background: #fff; }
  .inc-what { font-size: 15px; font-weight: 700; line-height: 1.5; }
  .inc-meta { font-size: 13px; color: #4a4843; margin-top: 5px; line-height: 1.5; }
  .inc-meta .lbl { font-weight: 700; color: #2e7d74; }
  .cite-sm { font-size: 11px; color: #726d66; margin-top: 5px; }
  .date { font-size: 14px; color: #4a4843; margin-bottom: 18px; }
  .rline { font-size: 14px; line-height: 1.5; margin-bottom: 14px; white-space: pre-wrap; }
  .salute { font-size: 14px; margin: 14px 0 10px; }
  p { font-size: 14px; line-height: 1.65; margin: 0 0 12px; }
  .sig { font-size: 14px; font-weight: 700; margin-top: 4px; }
  .foot { font-size: 11px; color: #726d66; margin-top: 26px; border-top: 1px solid #d9d5ce; padding-top: 10px; }
  @media print { body { background: #fff; } .bar { display: none; } .page { max-width: none; padding: 0; } .inc { break-inside: avoid; } }
`

// The packet is the one doc with fill-in-by-hand fields, and its incident cards
// lead with the DATE rather than the description - so it appends its own rules
// after the shared base instead of restating it.
const PACKET_CSS = `${PRINT_CSS}
  .cite { font-size: 13px; color: #6e6a64; margin-bottom: 16px; }
  .field { display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px; font-size: 14px; }
  .flabel { color: #6e6a64; white-space: nowrap; }
  .blank { flex: 1; border-bottom: 1px solid #b3aea6; min-height: 18px; }
  .inc-date { font-size: 12px; font-weight: 700; color: #2e7d74; }
  .inc-what { font-size: 14px; font-weight: 400; line-height: 1.5; margin-top: 3px; white-space: pre-wrap; }
  .inc-meta { font-size: 12px; color: #6e6a64; margin-top: 4px; }
  .file { font-size: 14px; line-height: 1.6; }
`

// Build a self-contained, print-ready HTML document from the incident log. The
// packet is the whole point of keeping incidents: a dated, formatted complaint
// the person can save as a PDF and file. CA gets the WIC 4731 framing; other
// states get a generic concerns record (never guess another state's process).
function buildPacketHtml(incidents, t, isCA) {
  const title = t(isCA ? 'packetDocTitle' : 'packetDocTitleGeneric')
  const intro = t(isCA ? 'packetIntroCA' : 'packetIntroGeneric')
  const fileBody = t(isCA ? 'packetFileCA' : 'packetFileGeneric')
  const blank = '<span class="blank"></span>'
  const field = (label) => `<div class="field"><span class="flabel">${escapeHtml(label)}:</span>${blank}</div>`
  const rows = incidents.map((inc) => {
    const meta = [inc.where && `${escapeHtml(t('incWhere'))}: ${escapeHtml(inc.where)}`,
      inc.who && `${escapeHtml(t('incWho'))}: ${escapeHtml(inc.who)}`].filter(Boolean).join(' · ')
    return `<div class="inc">
      <div class="inc-date">${escapeHtml(inc.at || '')}</div>
      <div class="inc-what">${escapeHtml(inc.what || '')}</div>
      ${meta ? `<div class="inc-meta">${meta}</div>` : ''}
    </div>`
  }).join('')
  return `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${PACKET_CSS}</style></head>
<body><div class="page">
  <div class="bar"><button class="print-btn" onclick="window.print()">${escapeHtml(t('packetPrint'))}</button></div>
  <h1>${escapeHtml(title)}</h1>
  ${isCA ? `<div class="cite">${escapeHtml(t('packetCitation'))}</div>` : ''}
  ${field(t('packetFieldName'))}
  ${isCA ? field(t('packetFieldId')) : ''}
  ${field(t('packetFieldRC'))}
  ${field(t('packetFieldPhone'))}
  ${field(t('packetFieldDate'))}
  <p class="intro">${escapeHtml(intro)}</p>
  <h2>${escapeHtml(t('packetWhatHappened'))}</h2>
  ${rows}
  <h2>${escapeHtml(t('packetHowToFile'))}</h2>
  <p class="file">${escapeHtml(fileBody)}</p>
  <div class="foot">${escapeHtml(t('packetFooter'))}</div>
</div></body></html>`
}

// Open the packet in a new tab via a Blob URL (no network - the PHI never
// leaves the device). The tab has its own "Save as PDF" button; on iOS that
// routes through the share sheet. Blob URLs open cleanly even from a
// standalone PWA, where document.write into a blank window is flaky.
function openPacket(incidents, t, isCA) {
  const html = buildPacketHtml(incidents, t, isCA)
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }))
  const win = window.open(url, '_blank')
  if (!win) { URL.revokeObjectURL(url); return false }
  setTimeout(() => URL.revokeObjectURL(url), 60000)
  return true
}

const openHtmlDoc = (html) => {
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }))
  const win = window.open(url, '_blank')
  if (!win) { URL.revokeObjectURL(url); return false }
  setTimeout(() => URL.revokeObjectURL(url), 60000)
  return true
}

// ─── HOME / PROGRAM SELF-CHECK (federal HCBS Settings Rule, 42 CFR 441.301(c)(4)) ─
// A plain-language check of everyday rights. `res: true` items are the extra
// protections that apply in a provider-owned or provider-controlled home; they
// are hidden when the person lives in their own or family home. Question / right
// / ask-for text lives in i18n (hc_<id>_q / _r / _a) so it translates.
const HOMECHECK_ITEMS = [
  { id: 'community', cite: '42 CFR 441.301(c)(4)(i)', res: false },
  { id: 'choice', cite: '42 CFR 441.301(c)(4)(ii)', res: false },
  { id: 'privacy', cite: '42 CFR 441.301(c)(4)(iii)', res: false },
  { id: 'schedule', cite: '42 CFR 441.301(c)(4)(iv)', res: false },
  { id: 'money', cite: '42 CFR 441.301(c)(4)(i)', res: false },
  { id: 'food', cite: '42 CFR 441.301(c)(4)(vi)(C)', res: true },
  { id: 'visitors', cite: '42 CFR 441.301(c)(4)(vi)(D)', res: true },
  { id: 'lock', cite: '42 CFR 441.301(c)(4)(vi)(B)', res: true },
  { id: 'roommate', cite: '42 CFR 441.301(c)(4)(vi)(B)', res: true },
  { id: 'decorate', cite: '42 CFR 441.301(c)(4)(vi)(B)', res: true },
  { id: 'modified', cite: '42 CFR 441.301(c)(4)(vi)', res: false },
]

// ─── RESTRICTION CHECKER ──────────────────────────────────────────────────────
// The 8 safeguards a rights modification must document, straight from the
// person-centered-plan requirements the modification rule points to. One cite
// per element - each chip names the exact subsection, not the parent reg.
// Output language is deliberately soft ("not identified"), never "illegal".
const RMC_ITEMS = [
  { id: 'need', cite: '42 CFR 441.301(c)(2)(xiii)(A)' },
  { id: 'positive', cite: '42 CFR 441.301(c)(2)(xiii)(B)' },
  { id: 'lighter', cite: '42 CFR 441.301(c)(2)(xiii)(C)' },
  { id: 'written', cite: '42 CFR 441.301(c)(2)(xiii)(D)' },
  { id: 'data', cite: '42 CFR 441.301(c)(2)(xiii)(E)' },
  { id: 'review', cite: '42 CFR 441.301(c)(2)(xiii)(F)' },
  { id: 'consent', cite: '42 CFR 441.301(c)(2)(xiii)(G)' },
  { id: 'harm', cite: '42 CFR 441.301(c)(2)(xiii)(H)' },
]
const RMC_WHAT = ['food', 'visitors', 'lock', 'roommate', 'decorate', 'schedule', 'money', 'privacy', 'other']

function buildRmcHtml(missing, blanket, whatLabel, t) {
  const rows = missing.map((f) => `<div class="inc">
    <div class="inc-what">${escapeHtml(t(`rm_${f.id}_q`))}</div>
    <div class="inc-meta"><span class="lbl">${escapeHtml(t('hcAskFor'))}:</span> ${escapeHtml(t(`rm_${f.id}_a`))}</div>
    <div class="cite-sm">${escapeHtml(f.cite)}</div>
  </div>`).join('')
  const blanketBlock = blanket
    ? `<p class="intro">${escapeHtml(t('rmcBlanket'))} <span class="cite-sm">42 CFR 441.301(c)(4)(vi)(F)</span></p>`
    : ''
  return `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(t('rmcSummaryTitle'))}</title>
<style>${PRINT_CSS}</style></head>
<body><div class="page">
  <div class="bar"><button class="print-btn" onclick="window.print()">${escapeHtml(t('packetPrint'))}</button></div>
  <h1>${escapeHtml(t('rmcSummaryTitle'))}</h1>
  <div class="setting">${escapeHtml(t('rmcWhat'))} ${escapeHtml(whatLabel)}</div>
  ${blanketBlock}
  ${missing.length ? `<p class="intro">${escapeHtml(t('rmcResultsIntro', { n: missing.length }))}</p>${rows}` : ''}
  <h2>${escapeHtml(t('hcNextTitle'))}</h2>
  <p>${escapeHtml(t('rmcNext'))}</p>
  <div class="foot">${escapeHtml(t('packetFooter'))}</div>
</div></body></html>`
}
const openRmc = (missing, blanket, whatLabel, t) => openHtmlDoc(buildRmcHtml(missing, blanket, whatLabel, t))

function buildHomeCheckHtml(flagged, setting, t) {
  const rows = flagged.map((f) => `<div class="inc">
    <div class="inc-what">${escapeHtml(t(`hc_${f.id}_q`))}</div>
    <div class="inc-meta"><span class="lbl">${escapeHtml(t('hcYourRight'))}:</span> ${escapeHtml(t(`hc_${f.id}_r`))}</div>
    <div class="inc-meta"><span class="lbl">${escapeHtml(t('hcAskFor'))}:</span> ${escapeHtml(t(`hc_${f.id}_a`))}</div>
    <div class="cite-sm">${escapeHtml(f.cite)}</div>
  </div>`).join('')
  return `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(t('hcSummaryTitle'))}</title>
<style>${PRINT_CSS}</style></head>
<body><div class="page">
  <div class="bar"><button class="print-btn" onclick="window.print()">${escapeHtml(t('packetPrint'))}</button></div>
  <h1>${escapeHtml(t('hcSummaryTitle'))}</h1>
  <div class="setting">${escapeHtml(t(setting === 'provider' ? 'hcSettingLabelProvider' : 'hcSettingLabelHome'))}</div>
  <p class="intro">${escapeHtml(t('hcSummaryIntro'))}</p>
  <h2>${escapeHtml(t('hcAreasToReview'))}</h2>
  ${rows}
  <h2>${escapeHtml(t('hcNextTitle'))}</h2>
  <p>${escapeHtml(t('hcNext'))}</p>
  <div class="foot">${escapeHtml(t('packetFooter'))}</div>
</div></body></html>`
}
const openHomeCheck = (flagged, setting, t) => openHtmlDoc(buildHomeCheckHtml(flagged, setting, t))

// ─── REQUEST LETTERS ──────────────────────────────────────────────────────────
// Ready-to-print letters for common, low-stakes requests (lighter cousins of the
// complaint packet). Title + body live in i18n (lt_<id>_title / lt_<id>_body);
// the body holds paragraphs separated by a blank line.
const LETTER_TEMPLATES = [{ id: 'ipp' }, { id: 'records' }, { id: 'noa' }, { id: 'review' }, { id: 'interpreter' }]

function buildLetterHtml(tplId, fields, t) {
  const title = t(`lt_${tplId}_title`)
  const bodyParas = t(`lt_${tplId}_body`).split('\n\n').map((p) => `<p>${escapeHtml(p)}</p>`).join('')
  const detail = fields.details ? `<p>${escapeHtml(fields.details)}</p>` : ''
  const name = escapeHtml(fields.name || t('ltNamePlaceholder'))
  const recipient = escapeHtml(fields.recipient || t('ltRecipientPlaceholder'))
  const dateStr = escapeHtml(isoToLocale(todayISO()))
  return `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${PRINT_CSS}</style></head>
<body><div class="page">
  <div class="bar"><button class="print-btn" onclick="window.print()">${escapeHtml(t('packetPrint'))}</button></div>
  <div class="date">${dateStr}</div>
  <div class="rline">${recipient}</div>
  <p class="salute">${escapeHtml(t('ltSalutation'))}</p>
  ${bodyParas}
  ${detail}
  <p class="salute">${escapeHtml(t('ltClosing'))}</p>
  <div class="sig">${name}</div>
  <div class="foot">${escapeHtml(t('packetFooter'))}</div>
</div></body></html>`
}
const openLetter = (tplId, fields, t) => openHtmlDoc(buildLetterHtml(tplId, fields, t))

// ─── VAULT DOCUMENTS & PHOTOS (E2E; file bytes in the private storage bucket) ──
const MAX_DOC_BYTES = 25 * 1024 * 1024 // matches the bucket's file_size_limit

// Types we're willing to hand to a blob URL, which renders on the app's OWN origin.
// The file picker asks for images + PDF, but `accept` is a hint a determined user can
// step around, and text/html or an SVG would then execute script beside the vault.
// Everything else falls back to octet-stream, which downloads rather than renders.
const VIEWABLE_MIME = new Set([
  'application/pdf',
  'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif',
])
const safeDocMime = (mime) => (VIEWABLE_MIME.has(String(mime || '').toLowerCase()) ? mime : 'application/octet-stream')
const docSort = (list) => [...list].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))

// Shrink an image to a ~400px WebP thumbnail (media pipeline: the grid pulls
// thumbnails, not full files). EXIF orientation is honored so phone photos are
// upright. Returns an ArrayBuffer, or null if the file isn't a decodable image.
async function makeThumbnail(file, max = 400) {
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' })
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height))
    const w = Math.max(1, Math.round(bmp.width * scale))
    const h = Math.max(1, Math.round(bmp.height * scale))
    const canvas = document.createElement('canvas')
    canvas.width = w; canvas.height = h
    canvas.getContext('2d').drawImage(bmp, 0, 0, w, h)
    bmp.close?.()
    const blob = await new Promise((res) => canvas.toBlob(res, 'image/webp', 0.8))
    return blob ? await blob.arrayBuffer() : null
  } catch { return null }
}

// Metadata lives in vault_items (kind='doc', encrypted); the file + thumbnail
// bytes live in the storage bucket (encrypted). Loaded on unlock, cleared on
// lock. add() needs the id before upload, so it can't use useVaultCollection.
function useVaultDocs(cloud) {
  const [docs, setDocs] = useState([])
  const [busy, setBusy] = useState(false)
  const loadedRef = useRef(false)
  useEffect(() => {
    if (cloud.status !== 'ready') { loadedRef.current = false; setDocs([]); return }
    let alive = true
    ;(async () => {
      const list = await cloud.pullItems('doc')
      if (!alive) return
      setDocs(docSort(list)); loadedRef.current = true
    })()
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cloud.status])
  useEffect(() => {
    if (cloud.status !== 'ready' || !loadedRef.current) return
    const t = setTimeout(() => cloud.pushItems('doc', docs), 800)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docs, cloud.status])

  const add = useCallback(async (file) => {
    if (!file) return { error: 'read' }
    if (file.size > MAX_DOC_BYTES) return { error: 'big' }
    setBusy(true)
    try {
      const buf = await file.arrayBuffer()
      const id = genId()
      const isImage = /^image\//.test(file.type || '')
      if (!(await cloud.uploadBytes(id, buf))) return { error: 'upload' }
      let hasThumb = false
      if (isImage) {
        const thumb = await makeThumbnail(file)
        if (thumb) hasThumb = await cloud.uploadBytes(`${id}.t`, thumb)
      }
      const rec = { id, name: file.name || '', mime: file.type || '', size: file.size, at: todayISO(), isImage, hasThumb, createdAt: Date.now() }
      setDocs((prev) => docSort([rec, ...prev]))
      // Write this row NOW rather than waiting on the 800ms debounce below. The
      // bytes are already in the bucket; if the app closed inside that window the
      // file became an orphan - paid-for storage with no row pointing at it and no
      // way to ever see or delete it. Delta push makes the debounced write that
      // follows a no-op, so this costs nothing extra.
      cloud.pushItems('doc', [rec])
      return { ok: true, id, isImage }
    } catch { return { error: 'read' } }
    finally { setBusy(false) }
  }, [cloud])

  const remove = useCallback((doc) => {
    setDocs((prev) => prev.filter((d) => d.id !== doc.id))
    cloud.deleteItem(doc.id)
    cloud.removeBytes(doc.hasThumb ? [doc.id, `${doc.id}.t`] : [doc.id])
  }, [cloud])

  return { docs, busy, add, remove }
}

// One lazy thumbnail: decrypts its 400px thumb only once scrolled near view
// (IntersectionObserver) and revokes the blob URL on unmount so a long gallery
// never piles up object URLs. `fill` makes it flex a square grid cell; otherwise
// it's a fixed `size` box (incident photo strip).
function DocThumb({ doc, cloud, size = 46, radius = 8, fill = false }) {
  const [url, setUrl] = useState(null)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { setInView(true); io.disconnect() }
    }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [inView])
  useEffect(() => {
    if (!inView || !doc.isImage || !doc.hasThumb) return
    let alive = true, objUrl
    ;(async () => {
      const bytes = await cloud.downloadBytes(`${doc.id}.t`)
      if (!alive || !bytes) return
      objUrl = URL.createObjectURL(new Blob([bytes], { type: 'image/webp' }))
      setUrl(objUrl)
    })()
    return () => { alive = false; if (objUrl) URL.revokeObjectURL(objUrl) }
  }, [inView, doc, cloud])
  const box = fill
    ? { width: '100%', aspectRatio: '1 / 1', borderRadius: radius, background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', color: C.ink3 }
    : { width: size, height: size, flexShrink: 0, borderRadius: radius, background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', color: C.ink3 }
  if (doc.isImage && url) return <div ref={ref} style={box}><img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
  return <div ref={ref} style={box}><IcDoc size={fill ? 30 : 20} /></div>
}

// Full-screen photo viewer (like the Book gallery). Decrypts the FULL image on
// demand, swipes/steps between photos, and (when onDelete is given) can delete
// the photo in place. Portals to <body> above everything.
function Lightbox({ photos, index = 0, cloud, onClose, onDelete }) {
  const t = useT()
  const [i, setI] = useState(index)
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const touch = useRef({ x: 0, y: 0 })
  useEscToClose(onClose)
  // Clamp / close when the list shrinks out from under us (after a delete).
  useEffect(() => {
    if (photos.length === 0) { onClose(); return }
    if (i > photos.length - 1) setI(photos.length - 1)
  }, [photos.length]) // eslint-disable-line react-hooks/exhaustive-deps
  const doc = photos[Math.min(i, photos.length - 1)]
  useEffect(() => {
    if (!doc) return
    let alive = true, obj
    setLoading(true); setUrl(null)
    ;(async () => {
      const bytes = await cloud.downloadBytes(doc.id)
      if (!alive) return
      if (bytes) { obj = URL.createObjectURL(new Blob([bytes], { type: doc.mime || 'image/*' })); setUrl(obj) }
      setLoading(false)
    })()
    return () => { alive = false; if (obj) URL.revokeObjectURL(obj) }
  }, [doc, cloud])
  const go = (d) => { if (photos.length > 1) setI((p) => (p + d + photos.length) % photos.length) }
  const navBtn = (dir) => (
    <button onClick={(e) => { e.stopPropagation(); go(dir === 'prev' ? -1 : 1) }} aria-label={t(dir === 'prev' ? 'lbPrev' : 'lbNext')}
      style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [dir === 'prev' ? 'left' : 'right']: 8, width: 44, height: 44, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.16)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <IcChevron dir={dir === 'prev' ? 'left' : 'right'} size={24} style={{ color: '#fff' }} />
    </button>
  )
  return createPortal(
    <div
      role="presentation"
      onClick={onClose}
      onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touch.current.x
        const dy = e.changedTouches[0].clientY - touch.current.y
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
      }}
      style={{ position: 'fixed', inset: 0, zIndex: 1200, background: 'rgba(20,19,18,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <button onClick={onClose} aria-label={t('close')} style={{ position: 'absolute', top: 'calc(env(safe-area-inset-top) + 10px)', right: 12, width: 40, height: 40, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.16)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
        <IcX size={22} />
      </button>
      {loading && <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{t('lbLoading')}</div>}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events -- stopPropagation only, so tapping the picture does not dismiss the viewer behind it */}
      {url && <img src={url} alt={doc?.name || ''} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />}
      {photos.length > 1 && navBtn('prev')}
      {photos.length > 1 && navBtn('next')}
      <div style={{ position: 'absolute', bottom: 'calc(env(safe-area-inset-bottom) + 14px)', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        {photos.length > 1 && <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 600 }}>{i + 1} / {photos.length}</div>}
        {onDelete && doc && (
          <button onClick={(e) => { e.stopPropagation(); onDelete(doc) }} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(192,69,44,0.92)', color: '#fff', border: 'none', borderRadius: 999, padding: '9px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            <IcTrash size={16} /> {t('delete')}
          </button>
        )}
      </div>
    </div>,
    document.body
  )
}

// Documents & photos - a photo-gallery grid (like the Book). Images are
// thumbnails that open a full-screen Lightbox; PDFs open in a new tab. Incident
// photos land here too (they share this store), so it's one place for everything.
function DocsSection({ cloud, docs, busy, onAdd, onRemove, embedded, readOnly }) {
  const t = useT()
  const [error, setError] = useState('')
  const [lightbox, setLightbox] = useState(null) // index into `images`
  const inputRef = useRef(null)
  const images = docs.filter((d) => d.isImage)
  const files = docs.filter((d) => !d.isImage)

  const onPick = async (e) => {
    setError('')
    const picked = Array.from(e.target.files || [])
    e.target.value = '' // allow re-picking the same file
    for (const f of picked) {
      const r = await onAdd(f)
      if (r?.error) { setError(t(r.error === 'big' ? 'docTooBig' : 'docUploadFailed')); break }
    }
  }
  const openDoc = async (doc) => {
    setError('')
    const bytes = await cloud.downloadBytes(doc.id)
    if (!bytes) { setError(t('docOpenFailed')); return }
    // Serve the blob under a type we chose, not the one the file claimed. A blob URL
    // opens on THIS origin, so an HTML file slipped past the picker's accept filter
    // would run script next to the vault. Anything not on the list downloads instead.
    const url = URL.createObjectURL(new Blob([bytes], { type: safeDocMime(doc.mime) }))
    if (!window.open(url, '_blank')) { URL.revokeObjectURL(url); setError(t('docOpenFailed')); return }
    setTimeout(() => URL.revokeObjectURL(url), 60000)
  }

  return (
    <>
      {!embedded && <SectionTitle>{t('docsTitle')}</SectionTitle>}
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 12 }}>{t('docsSub')}</div>
      <input ref={inputRef} type="file" accept="image/*,application/pdf" multiple onChange={onPick} style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
      {!readOnly && (
        <button disabled={busy} onClick={() => inputRef.current?.click()} style={{ ...cloudBtn('primary'), marginBottom: 8, opacity: busy ? 0.6 : 1 }}>
          {busy ? t('docUploading') : t('addDoc')}
        </button>
      )}
      <CloudNote error={error} />
      {docs.length === 0 ? (
        <div style={{ ...cardStyle(), padding: '18px 16px', fontSize: 14, color: C.sub, lineHeight: 1.55, marginTop: 6 }}>
          {t('docsEmpty')}
        </div>
      ) : (
        <>
          {images.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 6 }}>
              {images.map((doc, idx) => (
                <button key={doc.id} onClick={() => setLightbox(idx)} aria-label={doc.name || t('photo')}
                  style={{ padding: 0, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', background: C.card }}>
                  <DocThumb doc={doc} cloud={cloud} fill radius={11} />
                </button>
              ))}
            </div>
          )}
          {files.map((doc) => (
            <div key={doc.id} style={{ ...cardStyle(), display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', marginTop: 8 }}>
              <button onClick={() => openDoc(doc)} style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                <DocThumb doc={doc} cloud={cloud} />
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name || t('docFile')}</span>
                  <span style={{ display: 'block', fontSize: 12, color: C.sub, marginTop: 2 }}>{doc.at} · {formatBytes(doc.size)}</span>
                </span>
              </button>
              {!readOnly && (
                <button onClick={() => onRemove(doc)} aria-label={t('delete')}
                  style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, background: 'transparent', border: 'none', color: C.sub, cursor: 'pointer' }}>
                  <IcTrash size={16} />
                </button>
              )}
            </div>
          ))}
        </>
      )}
      {lightbox !== null && (
        <Lightbox photos={images} index={lightbox} cloud={cloud} onClose={() => setLightbox(null)} onDelete={readOnly ? undefined : (doc) => onRemove(doc)} />
      )}
    </>
  )
}

// Incident form (add/edit), nested inside the Incident-log sheet (like the Rights
// OtherStatesSheet). HISTORY / WATCH: an earlier nested-Modal version could not
// focus the lower fields on iOS, which is why this once lived in-page. The Modal
// has since been pinned to the visual viewport (see Modal's vvRect), so the sheet
// sits above the keyboard on its own - device-test the lower fields (Where/Who)
// after any change here. Photos are stored through the shared docs store, so they
// also appear in the Documents gallery.
function IncidentForm({ initial, onSave, onCancel, vaultDocs, cloud, readOnly }) {
  const uid = useId()
  const t = useT()
  const [at, setAt] = useState(initial?.at || todayISO())
  const [what, setWhat] = useState(initial?.what || '')
  const [where, setWhere] = useState(initial?.where || '')
  const [who, setWho] = useState(initial?.who || '')
  const [photoIds, setPhotoIds] = useState(initial?.photoIds || [])
  const [error, setError] = useState('')
  const [lb, setLb] = useState(null)
  const photoInput = useRef(null)
  const fieldLabel = fieldLabelStyle
  const photoDocs = photoIds.map((id) => vaultDocs.docs.find((d) => d.id === id)).filter(Boolean)

  const onPickPhoto = async (e) => {
    setError('')
    const picked = Array.from(e.target.files || [])
    e.target.value = ''
    for (const f of picked) {
      const r = await vaultDocs.add(f)
      if (r?.error) { setError(t(r.error === 'big' ? 'docTooBig' : 'docUploadFailed')); break }
      if (r?.id) setPhotoIds((prev) => [...prev, r.id])
    }
  }
  // Removing a photo deletes it outright (it is this incident's photo). Cancel
  // won't undo a photo delete - it only abandons the text edits.
  const removePhoto = (doc) => {
    setPhotoIds((prev) => prev.filter((id) => id !== doc.id))
    vaultDocs.remove(doc)
  }

  return (
    <>
      <label htmlFor={`${uid}-when`} style={{ ...fieldLabel, marginTop: 0 }}>{t('incWhen')}</label>
      <input id={`${uid}-when`} type="date" value={at} onChange={(e) => setAt(e.target.value)} disabled={readOnly} max={todayISO()} style={fieldStyle(readOnly)} />
      <label htmlFor={`${uid}-what`} style={fieldLabel}>{t('incWhat')}</label>
      <div>
        {/* Textarea wrapped in a block div (iOS flex-item collapse). */}
        <textarea
          id={`${uid}-what`}
          value={what} onChange={(e) => setWhat(e.target.value)} rows={4} readOnly={readOnly}
          placeholder={t('incWhatPh')} autoCapitalize="sentences"
          style={{ ...fieldStyle(readOnly), resize: 'none', lineHeight: 1.5 }}
        />
      </div>
      <label htmlFor={`${uid}-where`} style={fieldLabel}>{t('incWhere')}</label>
      <input id={`${uid}-where`} type="text" value={where} onChange={(e) => setWhere(e.target.value)} readOnly={readOnly} placeholder={t('incWherePh')} autoCapitalize="sentences" style={fieldStyle(readOnly)} />
      <label htmlFor={`${uid}-who`} style={fieldLabel}>{t('incWho')}</label>
      <input id={`${uid}-who`} type="text" value={who} onChange={(e) => setWho(e.target.value)} readOnly={readOnly} placeholder={t('incWhoPh')} autoCapitalize="words" style={fieldStyle(readOnly)} />

      <label style={fieldLabel}>{t('incPhotos')}</label>
      <input ref={photoInput} type="file" accept="image/*" multiple onChange={onPickPhoto} style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" />
      {photoDocs.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {photoDocs.map((doc, idx) => (
            <div key={doc.id} style={{ position: 'relative' }}>
              <button onClick={() => setLb(idx)} aria-label={t('photo')} style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer', display: 'block' }}>
                <DocThumb doc={doc} cloud={cloud} size={66} radius={12} />
              </button>
              {!readOnly && (
                <button onClick={() => removePhoto(doc)} aria-label={t('delete')}
                  style={{ position: 'absolute', top: -7, right: -7, width: 24, height: 24, borderRadius: '50%', border: '2px solid #fff', background: C.danger, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(43,42,40,0.3)' }}>
                  <IcX size={13} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      {!readOnly && (
        <button disabled={vaultDocs.busy} onClick={() => photoInput.current?.click()} style={{ ...cloudBtn('secondary'), opacity: vaultDocs.busy ? 0.6 : 1 }}>
          {vaultDocs.busy ? t('docUploading') : t('addPhoto')}
        </button>
      )}

      <CloudNote error={error} />
      {!readOnly && (
        <button
          onClick={() => {
            if (!what.trim()) { setError(t('incNeedWhat')); return }
            onSave({ ...(initial || {}), at: at || todayISO(), what: what.trim(), where: where.trim(), who: who.trim(), photoIds })
            onCancel()
          }}
          style={{ ...cloudBtn('primary'), marginTop: 10 }}
        >
          {t('save')}
        </button>
      )}
      <button onClick={onCancel} style={{ ...cloudBtn('secondary'), marginTop: 8 }}>{t(readOnly ? 'close' : 'cancel')}</button>
      {lb !== null && <Lightbox photos={photoDocs} index={lb} cloud={cloud} onClose={() => setLb(null)} />}
    </>
  )
}

// Denial-notice / deadline form (add/edit), nested inside the Deadlines sheet.
// Same iOS keyboard caveat as IncidentForm - device-test fields above the fold.
function DeadlineForm({ initial, onSave, onCancel, isCA, readOnly }) {
  const uid = useId()
  const t = useT()
  const [notice, setNotice] = useState(initial?.notice || todayISO())
  // The 60/90-day tracks are California law - only offer them in CA. Everywhere
  // else the deadline varies by state, so we only take a custom day count from
  // the person's own notice rather than assert a number we can't verify.
  const [track, setTrack] = useState(initial?.track || (isCA ? 'rc' : 'custom'))
  const [label, setLabel] = useState(initial?.label || '')
  const [days, setDays] = useState(initial?.days ? String(initial.days) : (isCA ? '60' : '30'))
  const [error, setError] = useState('')
  const fieldLabel = fieldLabelStyle
  const trackOptions = [
    { value: 'rc', label: t('trackRC') },
    { value: 'medical', label: t('trackMedical') },
    { value: 'custom', label: t('trackCustom') },
  ]
  const showDays = !isCA || track === 'custom'
  return (
    <>
      {isCA && (
        <>
          <label style={{ ...fieldLabel, marginTop: 0 }}>{t('dlTrack')}</label>
          <Select value={track} onChange={setTrack} options={trackOptions} ariaLabel={t('dlTrack')} />
        </>
      )}
      <label htmlFor={`${uid}-notice`} style={isCA ? fieldLabel : { ...fieldLabel, marginTop: 0 }}>{t('dlNotice')}</label>
      <input id={`${uid}-notice`} type="date" value={notice} onChange={(e) => setNotice(e.target.value)} disabled={readOnly} style={fieldStyle(readOnly)} />
      <label htmlFor={`${uid}-label`} style={fieldLabel}>{t('dlLabel')}</label>
      <input id={`${uid}-label`} type="text" value={label} onChange={(e) => setLabel(e.target.value)} readOnly={readOnly} placeholder={t('dlLabelPh')} autoCapitalize="sentences" style={fieldStyle(readOnly)} />
      {showDays && (
        <>
          <label htmlFor={`${uid}-days`} style={fieldLabel}>{t('dlDays')}</label>
          <input
            id={`${uid}-days`}
            type="text" inputMode="numeric" enterKeyHint="done" value={days} maxLength={3} readOnly={readOnly}
            onChange={(e) => setDays(e.target.value.replace(/\D/g, ''))}
            style={fieldStyle(readOnly)}
          />
        </>
      )}
      <CloudNote error={error} />
      {!readOnly && (
        <button
          onClick={() => {
            if (!notice) { setError(t('dlNeedNotice')); return }
            const effTrack = isCA ? track : 'custom'
            onSave({
              ...(initial || {}),
              notice, track: effTrack, label: label.trim(),
              days: effTrack === 'custom' ? Math.max(1, Number(days) || 30) : undefined,
            })
            onCancel()
          }}
          style={{ ...cloudBtn('primary'), marginTop: 10 }}
        >
          {t('save')}
        </button>
      )}
      <button onClick={onCancel} style={{ ...cloudBtn('secondary'), marginTop: 8 }}>{t(readOnly ? 'close' : 'cancel')}</button>
    </>
  )
}

// Guided self-check of everyday HCBS rights. Purely local (nothing saved unless
// the person chooses to): answer the questions, then see which rights may need a
// closer look, with a printable summary and a one-tap "save to incident log".
// "Check a restriction": walk a specific limit (locked fridge, no visitors...)
// through the 8 documentation safeguards the federal rule requires. Mirrors
// HomeCheckSheet's flow; deterministic - no AI involved.
function RmcSheet({ onClose, onSaveIncident }) {
  const t = useT()
  const [what, setWhat] = useState('food')
  const [setting, setSetting] = useState('provider')
  const [scope, setScope] = useState('unsure')
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [saved, setSaved] = useState(false)
  const [err, setErr] = useState('')
  const missing = RMC_ITEMS.filter((it) => answers[it.id] === 'no' || answers[it.id] === 'unsure')
  const answered = RMC_ITEMS.some((it) => answers[it.id])
  const blanket = scope === 'all'
  const whatLabel = t(`rmcW_${what}`)

  const choiceRow = (id) => (
    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
      {['yes', 'no', 'unsure'].map((v) => {
        const active = answers[id] === v
        const col = v === 'yes' ? C.accent : v === 'no' ? C.danger : C.sub
        const bg = v === 'yes' ? C.accentSoft : v === 'no' ? C.dangerSoft : C.bg
        return (
          <button
            key={v} onClick={() => setAnswers((a) => ({ ...a, [id]: v }))} aria-pressed={active}
            style={{ ...segBtnStyle(active, col, bg), flex: 1 }}
          >
            {t(v === 'yes' ? 'hcYes' : v === 'no' ? 'hcNo' : 'hcUnsure')}
          </button>
        )
      })}
    </div>
  )

  const saveToLog = () => {
    setErr('')
    const lines = [
      ...(blanket ? ['- ' + t('rmcBlanket')] : []),
      ...missing.map((f) => '- ' + t(`rm_${f.id}_q`)),
    ]
    onSaveIncident({ at: todayISO(), what: t('rmcIncidentIntro', { what: whatLabel }) + '\n\n' + lines.join('\n'), where: '', who: '' })
    setSaved(true)
  }
  const openSummary = () => { setErr(''); if (!openRmc(missing, blanket, whatLabel, t)) setErr(t('packetOpenFailed')) }
  const fieldLabel = fieldLabelStyle
  const resultCard = (bg, border) => ({ background: bg, border: `1px solid ${border}`, borderRadius: 14, padding: '13px 14px', marginBottom: 10, boxShadow: '0 1px 2px rgba(43,42,40,0.04)' })

  if (showResults) {
    return (
      <Modal onClose={onClose} title={t('rmcCard')}>
        {blanket && (
          <div style={{ ...resultCard(C.dangerSoft, `${C.danger}55`) }}>
            <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.5 }}>{t('rmcBlanket')}</div>
            <div style={{ fontSize: 11, color: C.ink3, marginTop: 6 }}>42 CFR 441.301(c)(4)(vi)(F)</div>
          </div>
        )}
        {missing.length === 0 ? (
          !blanket && <div style={resultCard(C.card, C.border)}><div style={{ fontSize: 14, color: C.ink, lineHeight: 1.55 }}>{t('rmcResultsAllGood')}</div></div>
        ) : (
          <>
            <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.55, margin: '4px 0 14px' }}>{t('rmcResultsIntro', { n: missing.length })}</div>
            {missing.map((f) => (
              <div key={f.id} style={resultCard(C.card, C.border)}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.ink, lineHeight: 1.4 }}>{t(`rm_${f.id}_q`)}</div>
                <div style={{ fontSize: 13, color: C.sub, marginTop: 7, lineHeight: 1.5 }}><span style={{ fontWeight: 700, color: C.accent }}>{t('hcAskFor')}:</span> {t(`rm_${f.id}_a`)}</div>
                <div style={{ fontSize: 11, color: C.ink3, marginTop: 6 }}>{f.cite}</div>
              </div>
            ))}
          </>
        )}
        {(blanket || missing.length > 0) && (
          <>
            <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, margin: '14px 0' }}>{t('rmcNext')}</div>
            <button onClick={openSummary} style={cloudBtn('primary')}>{t('hcOpenSummary')}</button>
            {onSaveIncident && (
              <button onClick={saveToLog} disabled={saved} style={{ ...cloudBtn('secondary'), marginTop: 8, opacity: saved ? 0.6 : 1 }}>{saved ? t('hcSaved') : t('hcSaveIncident')}</button>
            )}
            <CloudNote error={err} />
          </>
        )}
        <button onClick={() => { setShowResults(false); setSaved(false) }} style={{ ...cloudBtn('secondary'), marginTop: 8 }}>{t('hcBack')}</button>
      </Modal>
    )
  }

  return (
    <Modal onClose={onClose} title={t('rmcCard')}>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 4 }}>{t('rmcIntro')}</div>
      <label style={fieldLabel}>{t('rmcWhat')}</label>
      <Select value={what} onChange={setWhat} options={RMC_WHAT.map((w) => ({ value: w, label: t(`rmcW_${w}`) }))} ariaLabel={t('rmcWhat')} />
      <label style={fieldLabel}>{t('hcSetting')}</label>
      <Select
        value={setting} onChange={setSetting} ariaLabel={t('hcSetting')}
        options={[{ value: 'provider', label: t('hcSettingProvider') }, { value: 'home', label: t('hcSettingHome') }]}
      />
      {setting === 'home' && (
        <div style={{ ...noteStyle, marginTop: 10 }}>
          {t('rmcHomeNote')}
        </div>
      )}
      <label style={fieldLabel}>{t('rmcScope')}</label>
      <Select
        value={scope} onChange={setScope} ariaLabel={t('rmcScope')}
        options={[{ value: 'all', label: t('rmcScopeAll') }, { value: 'me', label: t('rmcScopeMe') }, { value: 'unsure', label: t('rmcScopeUnsure') }]}
      />
      <div style={{ ...sectionLabel, margin: '18px 2px 10px' }}>{t('rmcQuestionsTitle')}</div>
      {RMC_ITEMS.map((it) => (
        <div key={it.id} style={{ ...cardStyle(), padding: '13px 14px', marginBottom: 10 }}>
          <div style={{ fontSize: 15, color: C.ink, lineHeight: 1.4 }}>{t(`rm_${it.id}_q`)}</div>
          {choiceRow(it.id)}
        </div>
      ))}
      <button onClick={() => setShowResults(true)} disabled={!answered} style={{ ...cloudBtn('primary'), marginTop: 4, opacity: answered ? 1 : 0.5 }}>{t('hcSeeResults')}</button>
    </Modal>
  )
}

function HomeCheckSheet({ onClose, onSaveIncident }) {
  const t = useT()
  const [setting, setSetting] = useState('provider')
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [saved, setSaved] = useState(false)
  const [err, setErr] = useState('')
  const items = HOMECHECK_ITEMS.filter((it) => !it.res || setting === 'provider')
  const flagged = items.filter((it) => answers[it.id] === 'no' || answers[it.id] === 'unsure')
  const answered = items.some((it) => answers[it.id])
  const settingOptions = [
    { value: 'provider', label: t('hcSettingProvider') },
    { value: 'home', label: t('hcSettingHome') },
  ]

  const choiceRow = (id) => (
    <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
      {['yes', 'no', 'unsure'].map((v) => {
        const active = answers[id] === v
        const col = v === 'yes' ? C.accent : v === 'no' ? C.danger : C.sub
        const bg = v === 'yes' ? C.accentSoft : v === 'no' ? C.dangerSoft : C.bg
        return (
          <button
            key={v} onClick={() => setAnswers((a) => ({ ...a, [id]: v }))} aria-pressed={active}
            style={{ ...segBtnStyle(active, col, bg), flex: 1 }}
          >
            {t(v === 'yes' ? 'hcYes' : v === 'no' ? 'hcNo' : 'hcUnsure')}
          </button>
        )
      })}
    </div>
  )

  const saveToLog = () => {
    setErr('')
    const body = t('hcIncidentIntro') + '\n\n' + flagged.map((f) => '- ' + t(`hc_${f.id}_q`)).join('\n')
    onSaveIncident({ at: todayISO(), what: body, where: '', who: '' })
    setSaved(true)
  }
  const openSummary = () => { setErr(''); if (!openHomeCheck(flagged, setting, t)) setErr(t('packetOpenFailed')) }

  if (showResults) {
    return (
      <Modal onClose={onClose} title={t('homeCheck')}>
        {flagged.length === 0 ? (
          <div style={{ ...cardStyle(), padding: '18px 16px', fontSize: 14, color: C.ink, lineHeight: 1.55 }}>{t('hcResultsNone')}</div>
        ) : (
          <>
            <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.55, marginBottom: 14 }}>{t('hcResultsIntro', { n: flagged.length })}</div>
            {flagged.map((f) => (
              <div key={f.id} style={{ ...cardStyle(), padding: '13px 14px', marginBottom: 10 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.ink, lineHeight: 1.4 }}>{t(`hc_${f.id}_q`)}</div>
                <div style={{ fontSize: 13, color: C.sub, marginTop: 7, lineHeight: 1.5 }}><span style={{ fontWeight: 700, color: C.accent }}>{t('hcYourRight')}:</span> {t(`hc_${f.id}_r`)}</div>
                <div style={{ fontSize: 13, color: C.sub, marginTop: 5, lineHeight: 1.5 }}><span style={{ fontWeight: 700, color: C.accent }}>{t('hcAskFor')}:</span> {t(`hc_${f.id}_a`)}</div>
                <div style={{ fontSize: 11, color: C.ink3, marginTop: 6 }}>{f.cite}</div>
              </div>
            ))}
            <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, margin: '14px 0' }}>{t('hcNext')}</div>
            <button onClick={openSummary} style={cloudBtn('primary')}>{t('hcOpenSummary')}</button>
            {onSaveIncident && (
              <button onClick={saveToLog} disabled={saved} style={{ ...cloudBtn('secondary'), marginTop: 8, opacity: saved ? 0.6 : 1 }}>{saved ? t('hcSaved') : t('hcSaveIncident')}</button>
            )}
            <CloudNote error={err} />
          </>
        )}
        <button onClick={() => { setShowResults(false); setSaved(false) }} style={{ ...cloudBtn('secondary'), marginTop: 8 }}>{t('hcBack')}</button>
      </Modal>
    )
  }

  return (
    <Modal onClose={onClose} title={t('homeCheck')}>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 14 }}>{t('hcIntro')}</div>
      <label style={{ ...fieldLabelStyle, marginTop: 0 }}>{t('hcSetting')}</label>
      <Select value={setting} onChange={setSetting} options={settingOptions} ariaLabel={t('hcSetting')} />
      <div style={{ marginTop: 16 }}>
        {items.map((it) => (
          <div key={it.id} style={{ ...cardStyle(), padding: '13px 14px', marginBottom: 10 }}>
            <div style={{ fontSize: 15, color: C.ink, lineHeight: 1.4 }}>{t(`hc_${it.id}_q`)}</div>
            {choiceRow(it.id)}
          </div>
        ))}
      </div>
      <button onClick={() => setShowResults(true)} disabled={!answered} style={{ ...cloudBtn('primary'), marginTop: 4, opacity: answered ? 1 : 0.5 }}>{t('hcSeeResults')}</button>
    </Modal>
  )
}

// Pick a common request, add a couple of details, and open a ready-to-print
// letter. Stateless: it just builds a printable page (no vault storage needed).
// Request-letter builder, rendered inside the Letters sheet. Its own "Back"
// steps form -> template list; the sheet is dismissed by swipe-down / tap-away.
function LettersView() {
  const t = useT()
  const uid = useId()
  const [picked, setPicked] = useState(null)
  const [name, setName] = useState('')
  const [recipient, setRecipient] = useState('')
  const [details, setDetails] = useState('')
  const [err, setErr] = useState('')
  const fieldLabel = fieldLabelStyle

  if (!picked) {
    return (
      <>
        <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 14 }}>{t('ltIntro')}</div>
        {LETTER_TEMPLATES.map((tpl) => (
          <button
            key={tpl.id} onClick={() => setPicked(tpl.id)}
            style={{ ...cardBtnStyle(), display: 'flex', alignItems: 'center', gap: 12, padding: 14, marginBottom: 10 }}
          >
            <span style={{ flex: 1, minWidth: 0, fontSize: 15, fontWeight: 600, color: C.ink, lineHeight: 1.35 }}>{t(`lt_${tpl.id}_title`)}</span>
            <IcChevron dir="right" size={18} style={{ color: C.accent, flexShrink: 0 }} />
          </button>
        ))}
      </>
    )
  }

  const make = () => {
    setErr('')
    if (!openLetter(picked, { name: name.trim(), recipient: recipient.trim(), details: details.trim() }, t)) setErr(t('packetOpenFailed'))
  }
  return (
    <>
      <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{t(`lt_${picked}_title`)}</div>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 4 }}>{t(`lt_${picked}_body`).split('\n\n')[0]}</div>
      <label htmlFor={`${uid}-name`} style={fieldLabel}>{t('ltName')}</label>
      <input id={`${uid}-name`} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('ltNamePlaceholder')} autoComplete="name" autoCapitalize="words" style={inputStyle} />
      <label htmlFor={`${uid}-recipient`} style={fieldLabel}>{t('ltRecipient')}</label>
      <input id={`${uid}-recipient`} type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder={t('ltRecipientPlaceholder')} autoComplete="organization" autoCapitalize="words" style={inputStyle} />
      <label htmlFor={`${uid}-details`} style={fieldLabel}>{t('ltDetails')}</label>
      <div>
        <textarea id={`${uid}-details`} value={details} onChange={(e) => setDetails(e.target.value)} rows={3} placeholder={t('ltDetailsPh')} autoCapitalize="sentences" style={{ ...inputStyle, resize: 'none', lineHeight: 1.5 }} />
      </div>
      <button onClick={make} style={{ ...cloudBtn('primary'), marginTop: 12 }}>{t('ltOpen')}</button>
      <CloudNote error={err} />
      <button onClick={() => setPicked(null)} style={{ ...cloudBtn('secondary'), marginTop: 8 }}>{t('ltBack')}</button>
    </>
  )
}

function ContactsCard({ stateCode }) {
  const t = useT()
  const code = stateCode || 'CA'
  const guide = STATE_GUIDE[code]
  // CA has its own verified agency lines; the other big states get their pack
  // from stateGuide.js (also verified against official sources); every remaining
  // state gets only what is true everywhere (the NDRN P&A finder) plus a pointer
  // to its Rights tab, so we never show someone another state's number or invent
  // one we haven't verified.
  const list = code === 'CA'
    ? [...CA_CONTACTS, ...UNIVERSAL_CONTACTS]
    : guide
      ? [...guide.contacts, ...UNIVERSAL_CONTACTS]
      : UNIVERSAL_CONTACTS
  // Covered states (CA + guide states) jump straight into their verified list -
  // the "Help & contacts" title already says what this is. Uncovered states get
  // the note that points them at the Rights tab for their own agencies.
  const linkStyle = { fontSize: 14, fontWeight: 600, color: C.accent, textDecoration: 'none' }
  return (
    <>
      {!(code === 'CA' || guide) && (
        <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 10 }}>{t('contactsNote')}</div>
      )}
      <div style={{ ...cardStyle(), padding: '6px 14px' }}>
        {list.map((c, i) => (
          <div key={c.name} style={{ padding: '11px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.line}` }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{c.name}</div>
            <div style={{ fontSize: 13, color: C.sub, marginTop: 2, lineHeight: 1.5 }}>{c.descKey ? t(c.descKey) : c.desc}</div>
            {/* A contact may have a phone and/or a website; show each it has. */}
            <div style={{ marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
              {c.phone && <a href={telHref(c.phone)} style={linkStyle}>{c.phone}</a>}
              {c.url && <a href={`https://${c.url}`} target="_blank" rel="noreferrer" style={linkStyle}>{c.url}</a>}
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: C.sub, marginTop: 8, lineHeight: 1.5 }}>{t('cEmergency')}</div>
    </>
  )
}

// One home-screen tile: big icon in a soft disc, short label, one-line status.
// Visual + minimal words - the vault reads as an app, not a wall of text.
function VaultTile({ icon, label, sub, onClick }) {
  return (
    <button onClick={onClick} style={{
      ...cardBtnStyle(R.tile),
      padding: '15px 14px', display: 'flex', flexDirection: 'column',
      minHeight: 118,
    }}>
      <span style={{ width: 42, height: 42, borderRadius: 12, background: C.accentSoft, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
      <span style={{ marginTop: 'auto', paddingTop: 10 }}>
        <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: C.ink, lineHeight: 1.2 }}>{label}</span>
        <span style={{ display: 'block', fontSize: 12, color: C.sub, marginTop: 3 }}>{sub}</span>
      </span>
    </button>
  )
}

// The Vault subscription paywall. Shown once a user is signed in + unlocked but
// has no active plan. The rights chat + Rights hub stay free; this gates only the
// personal-records Vault. TWO purchase paths from ONE UI:
//   • Web  → Stripe Checkout (/api/checkout). Prices are the fixed US Stripe
//            prices, safe to show as literals (payAnnualCta/payMonthlyCta).
//   • iOS  → Apple IAP via RevenueCat (rcPurchase). Apple forbids external payment
//            for digital goods. Prices are QUOTED FROM THE STORE (rcLoadPricing),
//            never hardcoded — a literal is wrong in most storefronts and lies
//            about per-Apple-ID trial eligibility ([[paywall-quote-the-store]]).
// The native branch is inert on web (IS_NATIVE false), so the web path is unchanged.
const payLegalLink = { fontSize: 12, fontWeight: 600, color: C.sub, textDecoration: 'underline' }

function Paywall({ cloud, onNativePaid }) {
  const t = useT()
  const nativeIap = IS_NATIVE && rcAvailable()
  const [busy, setBusy] = useState('')       // '' | 'monthly' | 'annual' | 'lifetime' | 'restore'
  const [err, setErr] = useState('')
  // Native only: the store's real prices/trial. null until loaded or if unreadable
  // (then we quote no number, per quote-the-store).
  const [pricing, setPricing] = useState(null)

  useEffect(() => {
    if (!nativeIap) return
    let alive = true
    ;(async () => {
      try { const p = await withTimeout(rcLoadPricing(cloud.userId), 8000); if (alive) setPricing(p) }
      catch { /* leave null → generic labels, never a guessed price */ }
    })()
    return () => { alive = false }
  }, [nativeIap, cloud.userId])

  // Web: hand off to Stripe. Native: buy via RevenueCat with a 45s watchdog (a
  // dismissed StoreKit sheet can hang purchasePackage; the UI must always recover,
  // and a genuinely-completed purchase is picked up by the receipt check anyway).
  const start = async (plan) => {
    setBusy(plan); setErr('')
    if (nativeIap) {
      try {
        const timeout = new Promise((_, rej) => setTimeout(() => rej(Object.assign(new Error('timeout'), { _timeout: true })), 45000))
        if (await Promise.race([rcPurchase(plan, cloud.userId), timeout])) onNativePaid?.()
      } catch (e) {
        if (!(e?._timeout || e?.userCancelled || /cancel/i.test(e?.message || ''))) setErr(e?.message || t('payError'))
      } finally { setBusy('') }
      return
    }
    try {
      // The server reads the buyer's identity from this token, not from the body -
      // so there is no userId/email to send, and none to forge.
      const token = await cloud.getAccessToken()
      if (!token) { setErr(t('payError')); setBusy(''); return }
      const res = await fetch(`${API_ORIGIN}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.status === 503) { setErr(t('payComingSoon')); setBusy(''); return }
      if (!res.ok || !data.url) throw new Error(data.error || '')
      window.location.href = data.url            // hand off to Stripe Checkout
    } catch (e) {
      setErr(e.message || t('payError')); setBusy('')
    }
  }

  // App Store requirement: a way to restore a prior purchase on a new device.
  const restore = async () => {
    setBusy('restore'); setErr('')
    try {
      if (await rcRestore(cloud.userId)) onNativePaid?.()
      else setErr(t('payRestoreNone'))
    } catch (e) { setErr(e?.message || t('payError')) } finally { setBusy('') }
  }

  const feature = (text) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 9 }}>
      <span style={{ color: C.accent, flexShrink: 0, marginTop: 1 }}><IcCheck size={17} /></span>
      <span style={{ fontSize: 14, color: C.ink, lineHeight: 1.45 }}>{text}</span>
    </div>
  )

  // CTA labels + savings chip differ by path. Native quotes the store (or a
  // no-number fallback while pricing loads); web uses the fixed-price literals.
  const annualLabel = nativeIap
    ? (pricing?.annual ? t('payAnnualPriced', { price: pricing.annual.priceString }) : t('payAnnualGeneric'))
    : t('payAnnualCta')
  const monthlyLabel = nativeIap
    ? (pricing?.monthly ? t('payMonthlyPriced', { price: pricing.monthly.priceString }) : t('payMonthlyGeneric'))
    : t('payMonthlyCta')
  const savingsText = nativeIap
    ? (pricing?.annual?.savingsPct > 0 ? t('paySavePct', { pct: pricing.annual.savingsPct }) : '')
    : t('paySaveChip')
  const trialDays = nativeIap ? (pricing?.annual?.trialDays || 0) : 0
  // One-time lifetime unlock — native only (web one-time waits for Google Play +
  // web billing). Quiet "or pay once" option under the subscription buttons.
  const lifetimeLabel = pricing?.lifetime
    ? t('payLifetimePriced', { price: pricing.lifetime.priceString })
    : t('payLifetimeGeneric')
  // Only lead with lifetime when the store actually offers it. Optimistic while
  // pricing is still loading (the offering is configured with all three, so this
  // is the normal case and avoids a visible reshuffle); if the store comes back
  // WITHOUT a lifetime package, fall back to annual-first rather than leaving a
  // dead primary button — pkgFor('lifetime') would return null and the purchase
  // could never start.
  const leadLifetime = nativeIap && (pricing === null || !!pricing.lifetime)

  return (
    <div>
      <div style={{ fontSize: 14, color: C.sub, lineHeight: 1.55, margin: '0 2px 16px' }}>{t('paySub')}</div>

      <div style={{ ...cardStyle(R.tile), padding: '18px 16px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 40, height: 40, borderRadius: 11, background: C.accentSoft, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><IcShield size={20} /></span>
          <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 700, color: C.ink, lineHeight: 1.15 }}>{t('payTitle')}</div>
        </div>
        {feature(t('payFeatIncidents'))}
        {feature(t('payFeatDeadlines'))}
        {feature(t('payFeatLetters'))}
        {feature(t('payFeatDocs'))}
        {feature(t('payFeatPacket'))}
        {feature(t('payFeatSync'))}
      </div>

      {/* Order is deliberate and it is not the usual one. Where a one-time unlock
          exists it leads, because it is BOTH the cheapest option and the only one
          with no recurring charge, and HCBS eligibility runs through Medicaid — a
          forgotten monthly charge lands on someone living on roughly SSI. It also
          happens to be the rational pick already: lifetime undercuts a year by 4x,
          so burying it never laddered anyone up, it only overcharged whoever did
          not scroll. Subscriptions stay, demoted, under their own heading.
          Web has no one-time product yet, so web keeps annual-first. */}
      {leadLifetime && (
        <>
          <button disabled={!!busy} onClick={() => start('lifetime')} style={{ ...cloudBtn('primary'), opacity: busy && busy !== 'lifetime' ? 0.6 : 1 }}>
            {busy === 'lifetime' ? t('payStarting') : lifetimeLabel}
          </button>
          <div style={{ fontSize: 12, color: C.sub, fontWeight: 600, textAlign: 'center', margin: '8px 2px 0' }}>{t('payLifetimeNote')}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px 2px 12px' }}>
            <span style={{ flex: 1, height: 1, background: C.line }} />
            <span style={{ fontSize: 12, color: C.sub }}>{t('paySubsHeading')}</span>
            <span style={{ flex: 1, height: 1, background: C.line }} />
          </div>
        </>
      )}

      <button disabled={!!busy} onClick={() => start('annual')} style={{ ...cloudBtn(leadLifetime ? 'secondary' : 'primary'), opacity: busy && busy !== 'annual' ? 0.6 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        {busy === 'annual' ? t('payStarting') : annualLabel}
        {busy !== 'annual' && savingsText && (
          <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, background: leadLifetime ? C.accentSoft : '#fff', borderRadius: 999, padding: '2px 8px' }}>{savingsText}</span>
        )}
      </button>
      <button disabled={!!busy} onClick={() => start('monthly')} style={{ ...cloudBtn('secondary'), marginTop: 10, opacity: busy && busy !== 'monthly' ? 0.6 : 1 }}>
        {busy === 'monthly' ? t('payStarting') : monthlyLabel}
      </button>

      {trialDays > 0 && (
        <div style={{ fontSize: 12, color: C.accent, fontWeight: 600, textAlign: 'center', margin: '10px 2px 0' }}>{t('payTrialLine', { days: trialDays })}</div>
      )}

      <CloudNote error={err} />

      {/* App Store requires a Restore control on native. */}
      {nativeIap && (
        <button disabled={!!busy} onClick={restore} style={{ ...cloudBtn('secondary'), marginTop: 10, color: C.accent }}>
          {busy === 'restore' ? t('payRestoring') : t('payRestore')}
        </button>
      )}

      {/* Fine print + legal links. Guideline 3.1.2 wants the renewal terms and a
          functional Terms of Use link on the subscription screen itself, and the
          native charge is an Apple IAP — never Stripe — so the copy branches. */}
      <div style={{ fontSize: 12, color: C.ink3, lineHeight: 1.5, margin: '14px 2px 0', textAlign: 'center' }}>
        {nativeIap ? t('payFinePrintNative') : t('payFinePrint')}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 8 }}>
        <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" style={payLegalLink}>{t('payPrivacy')}</a>
        {/* A separator drawn in the hairline token: C.line is a 10%-alpha border
            colour, so the dot between the two legal links was effectively invisible
            and they ran together. It is decoration, so it says so. */}
        <span aria-hidden style={{ fontSize: 12, color: C.ink3 }}>·</span>
        <a href={APPLE_EULA_URL} target="_blank" rel="noopener noreferrer" style={payLegalLink}>{t('payTerms')}</a>
      </div>

      <button onClick={() => cloud.signOut()} style={{ ...cloudBtn('secondary'), marginTop: 16, color: C.sub }}>
        {t('signOut')}
      </button>
    </div>
  )
}

// ⚠️ MODULE SCOPE, NOT inside VaultPage. A component declared during render gets a
// NEW identity every render, so React unmounts and rebuilds its whole subtree: the
// scroll position resets and any field inside loses its text AND its focus. That bit
// hard here, because `kbInset` changes the moment the keyboard opens, so typing an
// email / code / PIN re-rendered VaultPage and wiped the field mid-keystroke. Keep
// these two out here and pass what they need as props.
function VaultScrollPage({ kbInset, children }) {
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: `10px 16px ${NAV_CLEARANCE}`, WebkitOverflowScrolling: 'touch', marginBottom: kbInset, transition: 'margin-bottom 0.2s ease' }}>
      {children}
    </div>
  )
}
// In-sheet back link (form -> list), mirroring the Rights OtherStatesSheet. The
// sheet itself is dismissed by swipe-down / tap-away; this only steps back a level.
function SheetBack({ label, onBack }) {
  return (
    <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', color: C.accent, cursor: 'pointer', padding: '2px 2px 12px', fontSize: 14, fontWeight: 600, fontFamily: 'inherit' }}>
      <IcChevron dir="left" size={15} /> {label}
    </button>
  )
}

// The Vault is now its own PAGE/tab (like Rights), not a stack of sheets. A hub
// of tiles; tapping one drills into that tool IN-PAGE with a labeled back
// control. Add/edit forms are in-page too - so their fields ride the app-wide
// keyboard recenter and nothing re-portals (no focus loss, no close "blink").
function VaultPage({ cloud, entitled, onNativePaid, incidents, onSaveIncident, onDeleteIncident, deadlines, onSaveDeadline, onDeleteDeadline, vaultDocs, isCA }) {
  const t = useT()
  const [view, setView] = useState('hub') // hub | incidents | deadlines | letters | documents | packet
  const [editing, setEditing] = useState(null) // null | 'new' | incident
  const [editingDl, setEditingDl] = useState(null) // null | 'new' | deadline
  const [packetError, setPacketError] = useState('')
  const [showPaywall, setShowPaywall] = useState(false) // read-only user tapped Resubscribe
  const kbInset = useKeyboardInset() // room so a low field (sign-in email, PIN) can rise above the keyboard
  const ready = cloud.status === 'ready'
  // LAPSE-READ-SAFE: a signed-in user whose plan lapsed keeps VIEW + EXPORT access
  // to records they already saved — we never lock someone out of their own evidence.
  // Only NEW writes (add/edit/delete) and sync gate. A brand-new user with no data
  // sees the full paywall instead (nothing to protect yet).
  const hasVaultData = incidents.length > 0 || deadlines.length > 0 || vaultDocs.docs.length > 0
  const readOnly = ready && !entitled

  const makePacket = () => {
    setPacketError('')
    if (!openPacket(incidents, t, isCA)) setPacketError(t('packetOpenFailed'))
  }
  // Deleting an incident also deletes its photos (they live in the shared docs
  // store); vaultDocs.remove clears the bytes, the row, and the gallery.
  const deleteIncident = (inc) => {
    ;(inc.photoIds || []).forEach((pid) => {
      const d = vaultDocs.docs.find((x) => x.id === pid)
      if (d) vaultDocs.remove(d)
    })
    onDeleteIncident(inc.id)
  }

  // Close whatever drill-in sheet is open and land back on the hub.
  const closeSheet = () => { setView('hub'); setEditing(null); setEditingDl(null); setPacketError('') }
  const emptyCard = (text) => (
    <div style={{ ...cardStyle(), padding: '18px 16px', fontSize: 14, color: C.sub, lineHeight: 1.55 }}>{text}</div>
  )
  const countText = (n) => (n > 0 ? t('countSaved', { n }) : t('tileEmpty'))

  const incidentRow = (inc) => (
    <SwipeableRow
      key={inc.id}
      onTap={() => setEditing(inc)}
      actions={readOnly ? [] : [{ label: t('delete'), color: C.danger, icon: <IcTrash size={18} />, onClick: () => deleteIncident(inc) }]}
    >
      <div style={{ ...cardStyle(), display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}>
        <div style={{ flex: 1, minWidth: 0, padding: '13px 14px', cursor: 'pointer' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inc.what}</div>
          <div style={{ fontSize: 12, color: C.sub, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {inc.at}{inc.where ? ` · ${inc.where}` : ''}{inc.who ? ` · ${inc.who}` : ''}
          </div>
          {inc.photoIds?.length > 0 && (
            <div aria-label={t('photoCount', { n: inc.photoIds.length })} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: C.accent, marginTop: 4 }}>
              <IcImage size={13} /> {inc.photoIds.length}
            </div>
          )}
        </div>
        {!IS_TOUCH && !readOnly && (
          <button
            onClick={(e) => { e.stopPropagation(); deleteIncident(inc) }}
            aria-label={t('delete')}
            style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 46, background: 'transparent', border: 'none', borderLeft: `1px solid ${C.line}`, color: C.sub, cursor: 'pointer' }}
          >
            <IcTrash size={16} />
          </button>
        )}
      </div>
    </SwipeableRow>
  )

  const deadlineRow = (rec) => {
    const due = addDaysISO(rec.notice, deadlineDays(rec))
    const left = daysUntil(due)
    const chip = left < 0 ? t('dlPassed') : left === 0 ? t('dlToday') : left === 1 ? t('dlDayLeft') : t('dlDaysLeft', { n: left })
    const urgent = left <= 14
    const aidBy = rec.track === 'rc' ? addDaysISO(rec.notice, 30) : null
    const title = rec.label || (rec.track === 'rc' ? t('trackRC') : rec.track === 'medical' ? t('trackMedical') : t('editDeadline'))
    return (
      <SwipeableRow
        key={rec.id}
        onTap={() => setEditingDl(rec)}
        actions={readOnly ? [] : [{ label: t('delete'), color: C.danger, icon: <IcTrash size={18} />, onClick: () => onDeleteDeadline(rec.id) }]}
      >
        <div style={{ ...cardStyle(), display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}>
          <div style={{ flex: 1, minWidth: 0, padding: '13px 14px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
              <span style={{ flex: 1, minWidth: 0, fontSize: 15, fontWeight: 600, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
              <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: urgent ? '#fff' : C.accent, background: urgent ? C.danger : C.accentSoft, borderRadius: 999, padding: '2px 8px' }}>{chip}</span>
            </div>
            <div style={{ fontSize: 12, color: C.sub, marginTop: 3 }}>{t('dlDeadline', { date: isoToLocale(due) })}</div>
            {aidBy && daysUntil(aidBy) >= 0 && (
              <div style={{ fontSize: 12, color: C.sub, marginTop: 2, lineHeight: 1.45 }}>{t('dlAidPending', { date: isoToLocale(aidBy) })}</div>
            )}
          </div>
          {!IS_TOUCH && !readOnly && (
            <button
              onClick={(e) => { e.stopPropagation(); onDeleteDeadline(rec.id) }}
              aria-label={t('delete')}
              style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 46, background: 'transparent', border: 'none', borderLeft: `1px solid ${C.line}`, color: C.sub, cursor: 'pointer' }}
            >
              <IcTrash size={16} />
            </button>
          )}
        </div>
      </SwipeableRow>
    )
  }

  // Signed out or locked: the ENTIRE sign-in flow lives right here on the page
  // (email -> code -> PIN via AuthFlow), one card, no account sheet - so there's
  // never a menu popping over a page that shows the same step. A brand-new user
  // additionally gets the pitch blurb above the email field; a returning user
  // lands straight on the PIN. Public help lives on the Rights tab.
  if (!ready) {
    return (
      <VaultScrollPage kbInset={kbInset}>
        <PageTitle>{t('navVault')}</PageTitle>
        <div style={{ fontSize: 14, color: C.sub, lineHeight: 1.55, margin: '0 2px 16px' }}>{t('vaultHubSub')}</div>
        <div style={{ ...cardStyle(R.tile), padding: '16px 14px', margin: '0 0 18px' }}>
          {cloud.status === 'signed_out' && (
            <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 16 }}>{t('vaultSignedOut')}</div>
          )}
          <AuthFlow cloud={cloud} />
        </div>
      </VaultScrollPage>
    )
  }

  // Signed in + unlocked, no active subscription, AND nothing saved yet: full
  // paywall (the Vault tools are the paid tier). A lapsed user WITH saved records
  // instead falls through to the read-only hub below, so their evidence stays
  // viewable/exportable. `entitled` is web (Stripe/Supabase) OR native (RC).
  if (!entitled && !hasVaultData) {
    return (
      <VaultScrollPage kbInset={kbInset}>
        <PageTitle>{t('navVault')}</PageTitle>
        <Paywall cloud={cloud} onNativePaid={onNativePaid} />
      </VaultScrollPage>
    )
  }

  // The hub is always the page underneath; each tile opens a swipe-to-close sheet
  // over it (matching the Rights hub), not an in-page back-button view. The sheets
  // are siblings of the page scroller (not children) so they keep the stable top-level Modal
  // type and never remount when the hub re-renders (e.g. a photo upload lands).
  return (
    <>
      <VaultScrollPage kbInset={kbInset}>
        <PageTitle>{t('navVault')}</PageTitle>
        <div style={{ fontSize: 14, color: C.sub, lineHeight: 1.55, margin: '0 2px 16px' }}>{readOnly ? t('vaultLapsedSub') : t('vaultHubSub')}</div>
        {/* Lapsed: records stay viewable/exportable; a calm banner offers to resume. */}
        {readOnly && (
          <div style={{ ...noteStyle, margin: '0 0 14px' }}>
            <div style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.5, marginBottom: 10 }}>{t('vaultLapsedBanner')}</div>
            <button onClick={() => setShowPaywall(true)} style={{ ...cloudBtn('primary'), padding: '10px 14px', fontSize: 14 }}>{t('vaultResubscribe')}</button>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <VaultTile icon={<IcClipboard size={22} />} label={t('incidentLog')} sub={countText(incidents.length)} onClick={() => setView('incidents')} />
          <VaultTile icon={<IcClock size={22} />} label={t('appealDeadlines')} sub={countText(deadlines.length)} onClick={() => setView('deadlines')} />
          {/* Letters CREATE new documents, so hide the tile while read-only. */}
          {!readOnly && <VaultTile icon={<IcMail size={22} />} label={t('letters')} sub={t('ltTileSub')} onClick={() => setView('letters')} />}
          <VaultTile icon={<IcImage size={22} />} label={t('docsTitle')} sub={countText(vaultDocs.docs.length)} onClick={() => setView('documents')} />
          <VaultTile icon={<IcFileText size={22} />} label={t('packet')} sub={t('tilePacketSub')} onClick={() => setView('packet')} />
        </div>
      </VaultScrollPage>

      {/* Read-only user chose Resubscribe → the paywall over the hub. */}
      {showPaywall && (
        <Modal onClose={() => setShowPaywall(false)} title={t('payTitle')}>
          <Paywall cloud={cloud} onNativePaid={() => { setShowPaywall(false); onNativePaid?.() }} />
        </Modal>
      )}

      {view === 'incidents' && (
        <Modal onClose={closeSheet} title={editing ? t(editing === 'new' ? 'addIncident' : 'editIncident') : t('incidentLog')}>
          {editing ? (
            <>
              <SheetBack label={t('incidentLog')} onBack={() => setEditing(null)} />
              <IncidentForm initial={editing === 'new' ? null : editing} onSave={onSaveIncident} onCancel={() => setEditing(null)} vaultDocs={vaultDocs} cloud={cloud} readOnly={readOnly} />
            </>
          ) : (
            <>
              {!readOnly && <button onClick={() => setEditing('new')} style={{ ...cloudBtn('primary'), marginBottom: 14 }}>{t('addIncident')}</button>}
              {incidents.length === 0 ? emptyCard(t('vaultEmptyList')) : incidents.map(incidentRow)}
            </>
          )}
        </Modal>
      )}

      {view === 'deadlines' && (
        <Modal onClose={closeSheet} title={editingDl ? t(editingDl === 'new' ? 'addDeadline' : 'editDeadline') : t('appealDeadlines')}>
          {editingDl ? (
            <>
              <SheetBack label={t('appealDeadlines')} onBack={() => setEditingDl(null)} />
              <DeadlineForm initial={editingDl === 'new' ? null : editingDl} onSave={onSaveDeadline} onCancel={() => setEditingDl(null)} isCA={isCA} readOnly={readOnly} />
            </>
          ) : (
            <>
              <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 12 }}>{t('deadlineSub')}</div>
              {!readOnly && <button onClick={() => setEditingDl('new')} style={{ ...cloudBtn('primary'), marginBottom: 14 }}>{t('addDeadline')}</button>}
              {deadlines.length === 0 ? emptyCard(t('vaultEmptyDl')) : deadlines.map(deadlineRow)}
            </>
          )}
        </Modal>
      )}

      {view === 'documents' && (
        <Modal onClose={closeSheet} title={t('docsTitle')}>
          <DocsSection cloud={cloud} docs={vaultDocs.docs} busy={vaultDocs.busy} onAdd={vaultDocs.add} onRemove={vaultDocs.remove} embedded readOnly={readOnly} />
        </Modal>
      )}

      {view === 'packet' && (
        <Modal onClose={closeSheet} title={t('packet')}>
          <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 12 }}>{t('packetSub')}</div>
          {incidents.length === 0 ? emptyCard(t('packetNeedIncident')) : (
            <>
              <button onClick={makePacket} style={cloudBtn('primary')}>{t('createPacket')}</button>
              <CloudNote error={packetError} />
            </>
          )}
        </Modal>
      )}

      {view === 'letters' && (
        <Modal onClose={closeSheet} title={t('letters')}>
          <LettersView />
        </Modal>
      )}
    </>
  )
}

// ─── SHEETS ───────────────────────────────────────────────────────────────────
function SheetSection({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ ...sectionLabel, marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  )
}

function SettingsSheet({ onClose, count, onDeleteAll, lang, onLangChange }) {
  const t = useT()
  // Two-tap destructive confirm ON the same button (label swap, no layout
  // reflow); auto-resets after a beat.
  const [confirming, setConfirming] = useState(false)
  useEffect(() => {
    if (!confirming) return
    const tm = setTimeout(() => setConfirming(false), 3500)
    return () => clearTimeout(tm)
  }, [confirming])

  return (
    <Modal onClose={onClose} title={t('settings')}>
      <SheetSection title={t('language')}>
        <Select value={lang} onChange={onLangChange} options={LANG_OPTIONS} ariaLabel={t('language')} />
      </SheetSection>
      <SheetSection title={t('savedQuestions')}>
        <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12, padding: '12px 14px', fontSize: 14, color: C.ink, marginBottom: 8 }}>
          {count === 0 ? t('noSaved') : t(count > 1 ? 'savedCountN' : 'savedCount1', { n: count })}
        </div>
        <button
          disabled={count === 0}
          onClick={() => {
            if (!confirming) { setConfirming(true); return }
            onDeleteAll()
            setConfirming(false)
            onClose()
          }}
          style={{
            width: '100%', border: `1px solid ${confirming ? C.danger : C.border}`,
            background: confirming ? C.danger : C.surface,
            color: count === 0 ? C.ink3 : confirming ? '#fff' : C.danger,
            borderRadius: 12, padding: '12px 14px', fontSize: 15, fontWeight: 600,
            cursor: count === 0 ? 'default' : 'pointer', transition: 'background 0.15s ease, color 0.15s ease',
          }}
        >
          {confirming ? t('tapAgainDelete') : t('deleteAll')}
        </button>
      </SheetSection>
      <SheetSection title={t('about')}>
        <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6 }}>
          {t('aboutBody1')}
          <br /><br />
          {t('aboutBody2')}
        </div>
        {/* Which code is actually running. A service worker on the web and a synced
            bundle on native can both serve yesterday's build, so "did my update
            land?" needs an answer you can read rather than infer. */}
        <div style={{ fontSize: 11.5, color: C.ink3, marginTop: 12, lineHeight: 1.5 }}>
          {t('versionLine', { v: APP_VERSION, d: buildDate(lang) })}
        </div>
      </SheetSection>
    </Modal>
  )
}

// First-launch: ask which state grounds the answers. One-time - dismissing
// without picking keeps the California default (and persists it, so the prompt
// never nags); the choice is always changeable from the Ask and Rights pages.
function StatePrompt({ onChoose }) {
  const t = useT()
  const [picked, setPicked] = useState('')
  return (
    <Modal onClose={() => onChoose('CA')} title={t('whereLive')}>
      <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 14 }}>
        {t('whereLiveBody')}
      </div>
      <Select
        value={picked}
        onChange={setPicked}
        options={STATE_OPTIONS}
        placeholder={t('chooseState')}
        ariaLabel={t('yourState')}
      />
      <button
        onClick={() => onChoose(picked || 'CA')}
        style={{
          width: '100%', marginTop: 12, border: 'none', borderRadius: 12,
          background: C.accent, color: '#fff',
          padding: '13px 14px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
        }}
      >
        {picked ? t('continue') : t('skipUseCA')}
      </button>
    </Modal>
  )
}

// Auto-lock delay choices (seconds; -1 never, 0 immediately). Values match the
// cloud.js lock-delay model.
const LOCK_OPTIONS = [
  { value: '0', labelKey: 'lockImmediately' },
  { value: '60', labelKey: 'lock1m' },
  { value: '300', labelKey: 'lock5m' },
  { value: '900', labelKey: 'lock15m' },
  { value: '3600', labelKey: 'lock1h' },
  { value: '-1', labelKey: 'lockNever' },
]

// Primary/secondary buttons for the account flow (match the app's field tokens).
const cloudBtn = (kind = 'primary') => ({
  width: '100%', boxSizing: 'border-box', border: 'none', cursor: 'pointer',
  borderRadius: 12, padding: '13px 16px', fontSize: 15, fontWeight: 700,
  // 43.5px on its own padding; half a pixel under the touch floor is still under.
  minHeight: 44,
  fontFamily: 'inherit',
  ...(kind === 'primary'
    ? { background: C.accent, color: '#fff' }
    : { background: C.surface, color: C.ink, border: `1px solid ${C.border}` }),
})

// A fixed-height status/error line so text appearing never reflows the sheet
// (feedback-popup-text-no-reflow).
function CloudNote({ error }) {
  return (
    <div role="alert" aria-live="assertive" aria-atomic="true" style={{ minHeight: 18, margin: '10px 2px 0', fontSize: 13, lineHeight: 1.35, color: C.danger, opacity: error ? 1 : 0, transition: 'opacity 0.15s' }}>
      {error || ' '}
    </div>
  )
}

// Shared 4-digit PIN entry: the field + submit + sign-out, wired to the cloud
// hook. The caller supplies the heading; the CTA follows pinMode
// (unlock/recover/setup).
function PinEntry({ cloud }) {
  const t = useT()
  const { pinMode, error, busy } = cloud
  const [pin, setPin] = useState('')
  const cta = { setup: t('pinSetupCta'), unlock: t('pinUnlockCta'), recover: t('pinRecoverCta') }[pinMode] || t('pinUnlockCta')
  return (
    <>
      <input
        aria-label={cta}
        type="password" inputMode="numeric" autoComplete="off" placeholder="••••" maxLength={4}
        value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
        onKeyDown={(e) => { if (e.key === 'Enter' && pin.length === 4) cloud.submitPin(pin) }}
        style={{ ...inputStyle, fontSize: 22, letterSpacing: 10, textAlign: 'center' }}
      />
      <CloudNote error={error} />
      <button
        disabled={busy || pin.length !== 4}
        onClick={() => cloud.submitPin(pin)}
        style={{ ...cloudBtn('primary'), marginTop: 12, opacity: (busy || pin.length !== 4) ? 0.6 : 1 }}
      >
        {busy ? t('working') : cta}
      </button>
      <button onClick={() => cloud.signOut()} style={{ ...cloudBtn('secondary'), marginTop: 8 }}>
        {t('signOut')}
      </button>
    </>
  )
}

// The whole sign-in flow as ONE inline block: email -> code -> PIN, driven by
// cloud.status. Its home is the Vault page (rendered in the page, never a
// sheet), so the flow can't stack a menu over a page showing the same step.
// The account sheet only uses it as a rare fallback (e.g. auto-lock fires
// while the sheet is open).
function AuthFlow({ cloud, intro }) {
  const t = useT()
  const { status, pinMode, email, error, busy } = cloud
  const [emailInput, setEmailInput] = useState(email || '')
  const [code, setCode] = useState('')

  // Shared devices: signing out clears the account email, but this component
  // stays mounted on the Vault page - so also blank the field, never leaving
  // the previous person's address prefilled for the next one.
  useEffect(() => { if (!email) setEmailInput('') }, [email])

  // Render a translated string containing {email} with the address bolded.
  const withEmail = (key) => {
    const [before, after] = t(key).split('{email}')
    return (<>{before}<strong>{email}</strong>{after}</>)
  }

  if (status === 'signed_out') {
    return (
      <div>
        {intro && (
          <>
            <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 4 }}>{t('signInBody')}</div>
            <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6, marginBottom: 16 }}>{t('signInSub')}</div>
          </>
        )}
        <label htmlFor="cloud-email" style={{ ...fieldLabelStyle, marginTop: 0 }}>{t('email')}</label>
        <input
          id="cloud-email"
          type="email" inputMode="email" autoComplete="email" placeholder="you@example.com"
          value={emailInput} onChange={(e) => setEmailInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') cloud.sendCode(emailInput) }}
          style={{ ...inputStyle, fontSize: 16 }}
        />
        <CloudNote error={error} />
        <button disabled={busy} onClick={() => cloud.sendCode(emailInput)} style={{ ...cloudBtn('primary'), marginTop: 12, opacity: busy ? 0.6 : 1 }}>
          {busy ? t('sending') : t('emailMeCode')}
        </button>
      </div>
    )
  }

  if (status === 'code_sent') {
    return (
      <div>
        <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 16 }}>
          {withEmail('codeSentBody')}
        </div>
        <label htmlFor="cloud-code" style={{ ...fieldLabelStyle, marginTop: 0 }}>{t('code')}</label>
        <input
          id="cloud-code"
          type="text" inputMode="numeric" autoComplete="one-time-code" placeholder="12345678" maxLength={10}
          value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          onKeyDown={(e) => { if (e.key === 'Enter') cloud.verifyCode(code) }}
          style={{ ...inputStyle, fontSize: 16, letterSpacing: 4, textAlign: 'center' }}
        />
        <CloudNote error={error} />
        <button disabled={busy} onClick={() => cloud.verifyCode(code)} style={{ ...cloudBtn('primary'), marginTop: 12, opacity: busy ? 0.6 : 1 }}>
          {busy ? t('verifying') : t('verify')}
        </button>
        <button onClick={() => cloud.restart()} style={{ ...cloudBtn('secondary'), marginTop: 8 }}>
          {t('useDifferentEmail')}
        </button>
      </div>
    )
  }

  if (status === 'need_pin') {
    const pinCopy = {
      setup: { title: t('pinSetupTitle'), sub: t('pinSetupSub') },
      unlock: { title: t('pinUnlockTitle'), sub: t('pinUnlockSub') },
      recover: { title: t('pinUnlockTitle'), sub: t('pinRecoverSub') },
    }[pinMode] || {}
    return (
      <div>
        <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{pinCopy.title}</div>
        <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6, marginBottom: 16 }}>{pinCopy.sub}</div>
        <PinEntry cloud={cloud} />
      </div>
    )
  }

  return null
}

// The account sheet is for a SIGNED-IN account: sync status, auto-lock, lock,
// sign out. Signing in / unlocking happens inline on the Vault page (the
// header cloud icon routes there while not ready), so this sheet never layers
// the sign-in flow over a page showing the same thing. AuthFlow below is only
// a fallback for mid-sheet status changes (e.g. auto-lock while open).
function CloudSheet({ onClose, cloud }) {
  const t = useT()
  const { status, email } = cloud

  // When a fallback unlock in this sheet reaches 'ready', drop straight back to
  // the app instead of leaving the sheet open. Fires only on the transition
  // INTO 'ready', so opening it while signed in shows the controls normally.
  const prevStatusRef = useRef(status)
  useEffect(() => {
    if (status === 'ready' && prevStatusRef.current !== 'ready') onClose()
    prevStatusRef.current = status
  }, [status, onClose])

  // Render a translated string containing {email} with the address bolded.
  const withEmail = (key) => {
    const [before, after] = t(key).split('{email}')
    return (<>{before}<strong>{email}</strong>{after}</>)
  }

  // Configuration missing (no Supabase env) - keep the honest coming-soon copy.
  if (status === 'off') {
    return (
      <Modal onClose={onClose} title={t('account')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ display: 'inline-flex', width: 8, height: 8, borderRadius: '50%', background: C.lineHard }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: C.sub }}>{t('notConnected')}</span>
        </div>
        <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 4 }}>
          {t('offBody1')}
        </div>
        <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6 }}>
          {t('offBody2')}
        </div>
      </Modal>
    )
  }

  return (
    <Modal onClose={onClose} title={t('account')}>
      {status !== 'ready' && <AuthFlow cloud={cloud} intro />}

      {status === 'ready' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ display: 'inline-flex', width: 8, height: 8, borderRadius: '50%', background: C.accent }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: C.accent }}>{t('synced')}</span>
          </div>
          <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 4 }}>
            {withEmail('readyBody')}
          </div>
          <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6, marginBottom: 16 }}>
            {t('readySub')}
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 2 }}>{t('autoLock')}</div>
          <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.5, marginBottom: 8 }}>{t('autoLockSub')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 16 }}>
            {LOCK_OPTIONS.map((o) => {
              const active = cloud.lockDelay === o.value
              return (
                <button key={o.value} onClick={() => cloud.setLockDelay(o.value)} style={segBtnStyle(active)}>{t(o.labelKey)}</button>
              )
            })}
          </div>

          <button onClick={() => { cloud.lock(); onClose() }} style={cloudBtn('secondary')}>{t('lock')}</button>
          <button onClick={() => cloud.signOut()} style={{ ...cloudBtn('secondary'), marginTop: 8, color: C.danger }}>{t('signOut')}</button>
        </div>
      )}
    </Modal>
  )
}
