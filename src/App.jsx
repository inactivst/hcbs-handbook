import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FEDERAL, STATES, US_STATES } from '../api/_corpus.js'
import { useCloud, mergeConversations } from './cloud.js'
import { LANG_OPTIONS, LangContext, getStoredLang, storeLang, useT, tr } from './i18n.js'

// Native shells must call the API at an absolute origin; web uses relative.
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || ''

// History lives ONLY in the browser's localStorage on this device - never sent
// to a server, never shared. Keeps the privacy posture: the app stores nothing
// server-side. Capped so storage can't grow without bound (code-for-scale).
// (Future accounts will keep history indefinitely in the cloud; local stays capped.)
const STORE_KEY = 'handbook.conversations.v1'
const MAX_CONVERSATIONS = 50

// The user's chosen state grounds every answer and the Rights page. Empty until
// the first-launch prompt is answered; persisted on this device like history.
const STATE_KEY = 'handbook.state.v1'

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
  ink3: '#8A857D',
  line: '#E5E2DC',
  lineHard: '#D9D5CE',
  border: 'rgba(43,42,40,0.14)',
  accent: '#2E7D74',
  accentSoft: '#E4EEEC',
  danger: '#C0452C',
}

const IS_TOUCH = typeof window !== 'undefined' && !!window.matchMedia?.('(pointer: coarse)')?.matches

// Bottom clearance so scrolled content / the composer never hides behind the
// floating glass nav pill.
const NAV_CLEARANCE = 'calc(env(safe-area-inset-bottom) + 78px)'

const STARTER_KEYS = ['starter1', 'starter2', 'starter3', 'starter4', 'starter5']

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
  fontSize: 16, color: C.ink, outline: 'none',
  fontFamily: 'inherit',
  boxShadow: 'inset 0 1px 2px rgba(43,42,40,0.05)',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
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
      const comfyTop = visTop + Math.min(visHeight * 0.30, 200)
      const obscured = rect.bottom > visibleBottom - margin
      const tooLow = rect.top > visTop + visHeight * 0.55
      const tooHigh = rect.top < visTop + margin
      if (!obscured && !tooLow && !tooHigh) return
      const sc = scrollableAncestor(el)
      // Never aim above the field's own scroll container top (otherwise the delta
      // overshoots and flings the field off the top).
      const targetTop = sc ? Math.max(comfyTop, sc.getBoundingClientRect().top + margin) : comfyTop
      const delta = rect.top - targetTop
      if (Math.abs(delta) < 8) return
      if (sc) sc.scrollBy({ top: delta, behavior: smooth ? 'smooth' : 'auto' })
      else el.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'auto' })
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
  const [rect, setRect] = useState(null)
  const opts = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o))
  const sel = opts.find((o) => o.value === value)
  const close = useCallback(() => setOpen(false), [])
  useEscToClose(close, open)
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
      <div onClick={close} style={{ position: 'fixed', inset: 0, zIndex: 4000 }}>
        <div
          ref={menuRef}
          onClick={(e) => e.stopPropagation()}
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
        onClick={openMenu}
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
        const atTopNow = (scroller()?.scrollTop || 0) <= 8
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
        background: 'rgba(43,42,40,0.45)',
        // Touch: thumb-reachable bottom sheet. Desktop: centered floating dialog.
        display: 'flex', alignItems: IS_TOUCH ? 'flex-end' : 'center',
        padding: IS_TOUCH ? 0 : 24,
      }}
    >
      <div
        ref={sheetRef}
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
          boxShadow: '0 -8px 40px rgba(43,42,40,0.18)',
        }}
      >
        {IS_TOUCH && <div style={{ width: 40, height: 4, borderRadius: 2, background: C.lineHard, margin: '0 auto 14px', flexShrink: 0 }} />}
        {title && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, flexShrink: 0, paddingLeft: 20, paddingRight: 20 }}>
            <span style={{ fontFamily: serif, fontSize: 21, fontWeight: 700, color: C.ink }}>{title}</span>
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
  const cardRef = useRef(null)
  const actionsRef = useRef(null)
  const tx = useRef(null)
  const ty = useRef(null)
  const dragging = useRef(false)
  const moved = useRef(false)
  const actionW = 78
  const revealW = actions.length * actionW
  const snap = 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1)'

  const setX = (x, withSnap) => {
    if (!cardRef.current) return
    cardRef.current.style.transition = withSnap ? snap : 'none'
    cardRef.current.style.transform = `translateX(${x}px)`
    // Actions stay hidden at rest - their color otherwise peeks around the card's
    // rounded corners as little arcs at the right edge.
    if (actionsRef.current) actionsRef.current.style.opacity = x < 0 ? 1 : 0
  }
  const close = () => { setSwiped(false); setX(0, true) }

  const onTouchStart = (e) => {
    tx.current = e.touches[0].clientX
    ty.current = e.touches[0].clientY
    dragging.current = false
    moved.current = false
  }
  const onTouchMove = (e) => {
    if (tx.current === null || !revealW) return
    const dx = e.touches[0].clientX - tx.current
    const dy = e.touches[0].clientY - ty.current
    if (!dragging.current) {
      if (Math.abs(dx) < 8) return
      if (Math.abs(dy) > Math.abs(dx)) { tx.current = null; return } // vertical scroll wins
      dragging.current = true
      moved.current = true
    }
    const base = swiped ? -revealW : 0
    const clamped = Math.max(-revealW - 8, Math.min(0, base + dx))
    setX(clamped, false)
  }
  const onTouchEnd = (e) => {
    if (!dragging.current) return
    dragging.current = false
    const dx = e.changedTouches[0].clientX - (tx.current ?? e.changedTouches[0].clientX)
    const base = swiped ? -revealW : 0
    if (base + dx < -revealW / 2) { setSwiped(true); setX(-revealW, true) }
    else { setSwiped(false); setX(0, true) }
    tx.current = null
  }

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
      <div
        ref={cardRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
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

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState('chat')
  const [conversations, setConversations] = useState(loadConversations)
  const [activeId, setActiveId] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [showCloud, setShowCloud] = useState(false)
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
    try {
      const r = await fetch(`${API_ORIGIN}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: stateCode || 'CA',
          lang,
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(data.error || tr('errGeneric'))
      const withAnswer = [...next, { role: 'assistant', content: data.reply, sources: data.sources || [] }]
      setConversations((prev) => prev.map((c) => (c.id === convId ? { ...c, messages: withAnswer } : c)))
      return true
    } catch (e) {
      setError(e.message || tr('errGeneric'))
      setConversations((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, messages: base } : c)).filter((c) => c.messages.length > 0)
      )
      if (base.length === 0) setActiveId(null)
      return false
    } finally {
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
        <Header onSettings={() => setShowSettings(true)} onCloud={() => setShowCloud(true)} connected={cloud.status === 'ready'} />
        {tab === 'chat' && <Chat messages={activeMessages} activeId={activeId} busy={busy} error={error} onSend={send} onNew={startNew} stateCode={stateCode || 'CA'} onStateChange={chooseState} onCompare={compareAnswer} />}
        {tab === 'history' && <History conversations={conversations} onOpen={openConversation} onDelete={deleteConversation} />}
        {tab === 'library' && <Library stateCode={stateCode || 'CA'} onStateChange={chooseState} />}
        {tab === 'vault' && (
          <VaultPage
            cloud={cloud}
            incidents={incidents.items}
            onSaveIncident={incidents.save}
            onDeleteIncident={incidents.remove}
            deadlines={deadlines.items}
            onSaveDeadline={deadlines.save}
            onDeleteDeadline={deadlines.remove}
            vaultDocs={vaultDocs}
            onOpenAccount={() => setShowCloud(true)}
            isCA={(stateCode || 'CA') === 'CA'}
          />
        )}
      </div>
      <Nav tab={tab} setTab={setTab} onAsk={startNew} />
      {!stateCode && <StatePrompt onChoose={chooseState} />}
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
        width: 38, height: 38, borderRadius: 12,
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

function Header({ onSettings, onCloud, connected }) {
  const t = useT()
  return (
    <div style={{ padding: 'calc(env(safe-area-inset-top) + 14px) 16px 0', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, letterSpacing: 0.2 }}>HandBook</div>
          <div style={{ fontSize: 13, color: C.sub, marginTop: 2 }}>{t('tagline')}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0, paddingTop: 2 }}>
          <IconBtn label={connected ? t('accountSynced') : t('cloudSync')} onClick={onCloud}>
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <IcCloud size={19} style={connected ? { color: C.accent } : undefined} />
              {connected && (
                <span style={{ position: 'absolute', right: -3, top: -2, width: 7, height: 7, borderRadius: '50%', background: C.accent, border: `1.5px solid ${C.surface}` }} />
              )}
            </span>
          </IconBtn>
          <IconBtn label={t('settings')} onClick={onSettings}><IcSettings size={19} /></IconBtn>
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.sub, background: C.accentSoft, border: `1px solid ${C.line}`, borderRadius: 10, padding: '8px 12px', margin: '12px 0 0', lineHeight: 1.45 }}>
        {t('disclaimer')}
      </div>
    </div>
  )
}

function Nav({ tab, setTab, onAsk }) {
  const t = useT()
  const items = [
    { key: 'chat', label: t('navAsk'), onClick: onAsk },
    { key: 'history', label: t('navHistory'), onClick: () => setTab('history') },
    { key: 'library', label: t('navRights'), onClick: () => setTab('library') },
    { key: 'vault', label: t('navVault'), onClick: () => setTab('vault') },
  ]
  return (
    <div style={{ position: 'fixed', left: 0, right: 0, bottom: 'max(env(safe-area-inset-bottom), 12px)', display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 50 }}>
      <div
        style={{
          pointerEvents: 'auto',
          display: 'flex', gap: 4, padding: 5,
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(14px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.3)',
          border: '1px solid rgba(43,42,40,0.08)',
          borderRadius: 999,
          boxShadow: '0 8px 28px rgba(43,42,40,0.16)',
        }}
      >
        {items.map((it) => {
          const active = tab === it.key
          return (
            <button
              key={it.key}
              onClick={it.onClick}
              style={{
                border: 'none',
                background: active ? C.accent : 'transparent',
                color: active ? '#fff' : C.sub,
                borderRadius: 999, padding: '9px 14px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {it.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Compact "Answering for [state]" chooser - the same Select used everywhere,
// shrunk to a pill so it reads as a setting, not a form field.
function StateBar({ stateCode, onStateChange }) {
  const t = useT()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px 0', flexShrink: 0 }}>
      <span style={{ fontSize: 13, color: C.sub, flexShrink: 0 }}>{t('answeringFor')}</span>
      <div style={{ flex: 1, minWidth: 0, maxWidth: 240 }}>
        <Select
          value={stateCode}
          onChange={onStateChange}
          options={STATE_OPTIONS}
          ariaLabel={t('state')}
          style={{ padding: '7px 11px', borderRadius: 999, fontSize: 14 }}
        />
      </div>
      {!stateCovered(stateCode) && (
        <span style={{ fontSize: 12, color: C.ink3, flexShrink: 0 }}>{t('federalOnly')}</span>
      )}
    </div>
  )
}

function Chat({ messages, activeId, busy, error, onSend, onNew, stateCode, onStateChange, onCompare }) {
  const t = useT()
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)
  const lastMsgRef = useRef(null)
  const prevLenRef = useRef(0)
  const prevActiveRef = useRef(null)
  const kbInset = useKeyboardInset()

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
      <StateBar stateCode={stateCode} onStateChange={onStateChange} />
      <div style={{ position: 'relative', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {indicator}
        <div ref={contentRef} style={{ ...contentStyle, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: '16px 16px 8px', WebkitOverflowScrolling: 'touch' }}>
            {messages.length === 0 && (
              <div style={{ marginTop: 18 }}>
                <div style={{ fontSize: 14, color: C.sub, marginBottom: 10 }}>{t('tryAsking')}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {STARTER_KEYS.map((k) => (
                    <button key={k} onClick={() => submit(t(k))} style={{ border: `1px solid ${C.border}`, background: C.card, color: C.ink, borderRadius: 12, padding: '10px 13px', fontSize: 14, cursor: 'pointer', textAlign: 'left', boxShadow: '0 1px 2px rgba(43,42,40,0.04)' }}>
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
                onCompare={m.role === 'assistant' ? (target) => onCompare(i, target) : undefined}
                ref={i === messages.length - 1 ? lastMsgRef : null}
              />
            ))}
            <div style={{ minHeight: 26, padding: '2px 4px' }}>
              {busy && <span style={{ fontSize: 13, color: C.sub }}>{t('lookingUp')}</span>}
              {!busy && error && <span style={{ fontSize: 13, color: C.danger }}>{error}</span>}
            </div>
          </div>
        </div>
      </div>
      {/* Composer lifts above the on-screen keyboard (marginBottom:kbInset - the
          Modal recipe); nav clearance collapses while the keyboard is up since
          the nav is behind the keyboard anyway. */}
      <div style={{ padding: `8px 16px ${kbInset ? '10px' : NAV_CLEARANCE}`, borderTop: `1px solid ${C.line}`, background: C.bg, flexShrink: 0, marginBottom: kbInset, transition: 'margin-bottom 0.2s ease' }}>
        <form
          onSubmit={(e) => { e.preventDefault(); submit(input) }}
          style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}
        >
          {/* Textarea wrapped in a block div: an iOS textarea as a direct flex item
              collapses to its cols width. */}
          <div style={{ flex: 1 }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(input) } }}
              placeholder={t('composerPlaceholder')}
              rows={1}
              style={{ ...inputStyle, resize: 'none', borderRadius: 14, padding: '12px 14px', lineHeight: 1.4, maxHeight: 120 }}
            />
          </div>
          <button
            type="submit"
            disabled={busy || !input.trim()}
            style={{ background: busy || !input.trim() ? C.line : C.accent, color: '#fff', border: 'none', borderRadius: 14, padding: '13px 18px', fontSize: 15, fontWeight: 700, cursor: busy || !input.trim() ? 'default' : 'pointer', marginBottom: 4 }}
          >
            {t('ask')}
          </button>
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
        <div style={{ marginTop: 6, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '10px 13px', boxShadow: '0 1px 2px rgba(43,42,40,0.04)' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, marginBottom: 4 }}>
            {stateName(compare.state)}{stateCovered(compare.state) ? '' : ` · ${t('federalOnly')}`}
          </div>
          {compare.loading ? (
            <div style={{ fontSize: 13, color: C.sub }}>{t('comparing')}</div>
          ) : compare.error ? (
            <div style={{ fontSize: 13, color: C.danger }}>{compare.error}</div>
          ) : (
            <div style={{ fontSize: 14, lineHeight: 1.55, color: C.ink, wordBreak: 'break-word' }}>
              {renderContent(compare.text)}
              <SourceChips sources={compare.sources} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const Bubble = React.forwardRef(function Bubble({ m, baseState, onCompare }, ref) {
  const user = m.role === 'user'
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
          {user ? <span style={{ whiteSpace: 'pre-wrap' }}>{m.content}</span> : renderContent(m.content)}
        </div>
        {!user && <SourceChips sources={m.sources} />}
        {!user && onCompare && <CompareBlock compare={m.compare} baseState={baseState} onCompare={onCompare} />}
      </div>
    </div>
  )
})

function History({ conversations, onOpen, onDelete }) {
  const t = useT()
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: `16px 16px ${NAV_CLEARANCE}`, WebkitOverflowScrolling: 'touch' }}>
      <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 700, margin: '4px 0 10px' }}>{t('savedQuestions')}</div>
      {conversations.length === 0 ? (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 16px', fontSize: 14, color: C.sub, lineHeight: 1.55 }}>
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
              <div style={{ display: 'flex', alignItems: 'stretch', background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 2px rgba(43,42,40,0.04)' }}>
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
          {IS_TOUCH ? t('swipeHint') : ''}{t('historyFooter', { n: MAX_CONVERSATIONS })}
        </div>
      )}
    </div>
  )
}

// Disclosure card list shared by every Rights section (federal, your state,
// inside another state's row). One open at a time per list.
function ChunkList({ chunks }) {
  const [open, setOpen] = useState(null)
  return chunks.map((c) => {
    const isOpen = open === c.id
    return (
      <div key={c.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 8, overflow: 'hidden', boxShadow: '0 1px 2px rgba(43,42,40,0.04)' }}>
        <button
          onClick={() => setOpen(isOpen ? null : c.id)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, background: 'transparent', border: 'none', padding: '13px 14px', cursor: 'pointer', textAlign: 'left' }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{c.title}</div>
            <div style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>{c.citation}</div>
          </div>
          {/* Disclosure convention: right → down (never a plain text glyph). */}
          <IcChevron dir={isOpen ? 'down' : 'right'} size={16} style={{ color: C.accent, flexShrink: 0 }} />
        </button>
        {isOpen && (
          <div style={{ padding: '0 14px 14px', fontSize: 14, lineHeight: 1.6, color: C.ink, whiteSpace: 'pre-wrap' }}>{c.text}</div>
        )}
      </div>
    )
  })
}

function ServiceCodeList({ codes }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '6px 14px', boxShadow: '0 1px 2px rgba(43,42,40,0.04)' }}>
      {codes.map((s, i) => (
        <div key={s.code} style={{ padding: '11px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.line}` }}>
          <div style={{ fontSize: 15, fontWeight: 600 }}>
            <span style={{ color: C.accent, fontVariantNumeric: 'tabular-nums' }}>{s.code}</span>  {s.name}
          </div>
          <div style={{ fontSize: 13, color: C.sub, marginTop: 3, lineHeight: 1.5 }}>{s.note}</div>
        </div>
      ))}
    </div>
  )
}

function SectionTitle({ children, first = false }) {
  return <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 700, margin: `${first ? 4 : 22}px 0 10px` }}>{children}</div>
}

// What a state's pack contains, rendered both for "your state" and inside an
// expanded row under "Other states".
function StatePack({ code, compact = false }) {
  const t = useT()
  const pack = STATES[code]
  const name = stateName(code)
  if (!pack) {
    return (
      <div style={{ background: compact ? 'transparent' : C.card, border: compact ? 'none' : `1px solid ${C.border}`, borderRadius: 14, padding: compact ? '0 0 4px' : '14px 16px', fontSize: 14, color: C.sub, lineHeight: 1.6, boxShadow: compact ? 'none' : '0 1px 2px rgba(43,42,40,0.04)' }}>
        {t('statePackMissing', { name })}
      </div>
    )
  }
  return (
    <>
      <ChunkList chunks={pack.chunks} />
      {pack.serviceCodes.length > 0 && (
        <>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.sub, margin: '12px 0 8px' }}>{t('commonServiceCodes')}</div>
          <ServiceCodeList codes={pack.serviceCodes} />
        </>
      )}
    </>
  )
}

function Library({ stateCode, onStateChange }) {
  const t = useT()
  const [openState, setOpenState] = useState(null)
  const covered = stateCovered(stateCode)
  const otherStates = STATE_OPTIONS.filter((o) => o.value !== stateCode)
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: `16px 16px ${NAV_CLEARANCE}`, WebkitOverflowScrolling: 'touch' }}>
      <SectionTitle first>{t('yourState')}</SectionTitle>
      <div style={{ marginBottom: 10 }}>
        <Select value={stateCode} onChange={onStateChange} options={STATE_OPTIONS} ariaLabel={t('yourState')} />
      </div>
      <StatePack code={stateCode} />
      {covered && stateCode === 'CA' && (
        <div style={{ fontSize: 12, color: C.sub, marginTop: 10, lineHeight: 1.5 }}>
          {t('caFootnote')}
        </div>
      )}

      <SectionTitle>{t('federalRights')}</SectionTitle>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 10 }}>
        {t('federalSub')}
      </div>
      <ChunkList chunks={FEDERAL} />

      <SectionTitle>{t('otherStates')}</SectionTitle>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 10 }}>
        {t('otherStatesSub')}
      </div>
      {otherStates.map((o) => {
        const isOpen = openState === o.value
        const has = stateCovered(o.value)
        return (
          <div key={o.value} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, marginBottom: 8, overflow: 'hidden', boxShadow: '0 1px 2px rgba(43,42,40,0.04)' }}>
            <button
              onClick={() => setOpenState(isOpen ? null : o.value)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, background: 'transparent', border: 'none', padding: '13px 14px', cursor: 'pointer', textAlign: 'left' }}
            >
              <div style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{o.label}</span>
                {has && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, background: C.accentSoft, borderRadius: 999, padding: '2px 8px' }}>{t('stateGuide')}</span>
                )}
              </div>
              <IcChevron dir={isOpen ? 'down' : 'right'} size={16} style={{ color: C.accent, flexShrink: 0 }} />
            </button>
            {isOpen && (
              <div style={{ padding: '0 14px 14px' }}>
                <StatePack code={o.value} compact />
              </div>
            )}
          </div>
        )
      })}
    </div>
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
// against the fact-checked corpus + cdss.ca.gov - treat edits as content edits.
// CA-specific help lines (numbers verified vs the corpus + dds.ca.gov). DDS is
// the developmental-services agency behind HCBS; the CDSS line is only for the
// Medi-Cal/IHSS track - both are listed so neither dominates.
const CA_CONTACTS = [
  { name: 'OCRA', descKey: 'cOcra', phone: '1-800-390-7032' },
  { name: 'CA Dept of Developmental Services', descKey: 'cDds', phone: '1-833-421-0061' },
  { name: 'CDSS State Hearings', descKey: 'cCdss', phone: '1-800-743-8525' },
  { name: 'Adult Protective Services', descKey: 'cAps', phone: '1-833-401-0832' },
  { name: 'Regional centers', descKey: 'cRc', url: 'dds.ca.gov/rc' },
]
// Correct in every state - the honest fallback where we don't have that
// state's agencies structured (HCBS is state-run; we never invent numbers).
const UNIVERSAL_CONTACTS = [
  { name: 'NDRN', descKey: 'cNdrn', url: 'ndrn.org' },
]

// Escape user-entered incident text before it goes into the packet HTML so a
// stray "<" can never break (or inject into) the printable document.
const escapeHtml = (s) => String(s || '').replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

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
<style>
  :root { -webkit-text-size-adjust: 100%; }
  * { box-sizing: border-box; }
  body { margin: 0; background: #f4f3f1; color: #2b2a28; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
  .page { max-width: 720px; margin: 0 auto; padding: 28px 22px 60px; }
  .bar { position: sticky; top: 0; background: #f4f3f1; padding: 12px 0; }
  .print-btn { width: 100%; border: none; background: #2e7d74; color: #fff; font-size: 16px; font-weight: 700; padding: 14px; border-radius: 12px; cursor: pointer; }
  h1 { font-family: Georgia, 'Times New Roman', serif; font-size: 24px; margin: 6px 0 2px; }
  .cite { font-size: 13px; color: #6e6a64; margin-bottom: 16px; }
  .intro { font-size: 14px; line-height: 1.6; margin: 0 0 18px; }
  h2 { font-family: Georgia, 'Times New Roman', serif; font-size: 17px; margin: 22px 0 10px; }
  .field { display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px; font-size: 14px; }
  .flabel { color: #6e6a64; white-space: nowrap; }
  .blank { flex: 1; border-bottom: 1px solid #b3aea6; min-height: 18px; }
  .inc { border: 1px solid #d9d5ce; border-radius: 10px; padding: 11px 13px; margin-bottom: 10px; background: #fff; }
  .inc-date { font-size: 12px; font-weight: 700; color: #2e7d74; }
  .inc-what { font-size: 14px; line-height: 1.5; margin-top: 3px; white-space: pre-wrap; }
  .inc-meta { font-size: 12px; color: #6e6a64; margin-top: 4px; }
  .file { font-size: 14px; line-height: 1.6; }
  .foot { font-size: 11px; color: #8a857d; margin-top: 26px; border-top: 1px solid #d9d5ce; padding-top: 10px; }
  @media print {
    body { background: #fff; }
    .bar { display: none; }
    .page { max-width: none; padding: 0; }
    .inc { break-inside: avoid; }
  }
</style></head>
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

// ─── VAULT DOCUMENTS & PHOTOS (E2E; file bytes in the private storage bucket) ──
const MAX_DOC_BYTES = 25 * 1024 * 1024 // matches the bucket's file_size_limit
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
      return { ok: true }
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

// One grid/list thumbnail: lazy-loads + decrypts its thumb only once scrolled
// near view (IntersectionObserver), and revokes the blob URL on unmount so a
// long vault never piles up object URLs.
function DocThumb({ doc, cloud }) {
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
  const box = { width: 46, height: 46, flexShrink: 0, borderRadius: 8, background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', color: C.ink3 }
  if (doc.isImage && url) return <div ref={ref} style={box}><img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
  return <div ref={ref} style={box}><IcDoc size={20} /></div>
}

function DocsSection({ cloud, docs, busy, onAdd, onRemove }) {
  const t = useT()
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const onPick = async (e) => {
    setError('')
    const files = Array.from(e.target.files || [])
    e.target.value = '' // allow re-picking the same file
    for (const f of files) {
      const r = await onAdd(f)
      if (r?.error) { setError(t(r.error === 'big' ? 'docTooBig' : 'docUploadFailed')); break }
    }
  }
  const openDoc = async (doc) => {
    setError('')
    const bytes = await cloud.downloadBytes(doc.id)
    if (!bytes) { setError(t('docOpenFailed')); return }
    const url = URL.createObjectURL(new Blob([bytes], { type: doc.mime || 'application/octet-stream' }))
    if (!window.open(url, '_blank')) { URL.revokeObjectURL(url); setError(t('docOpenFailed')); return }
    setTimeout(() => URL.revokeObjectURL(url), 60000)
  }

  return (
    <>
      <SectionTitle>{t('docsTitle')}</SectionTitle>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 12 }}>{t('docsSub')}</div>
      <input ref={inputRef} type="file" accept="image/*,application/pdf" multiple onChange={onPick} style={{ display: 'none' }} />
      <button disabled={busy} onClick={() => inputRef.current?.click()} style={{ ...cloudBtn('primary'), marginBottom: 8, opacity: busy ? 0.6 : 1 }}>
        {busy ? t('docUploading') : t('addDoc')}
      </button>
      <CloudNote error={error} />
      {docs.length === 0 ? (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 16px', fontSize: 14, color: C.sub, lineHeight: 1.55, marginTop: 6 }}>
          {t('docsEmpty')}
        </div>
      ) : (
        docs.map((doc) => (
          <SwipeableRow
            key={doc.id}
            onTap={() => openDoc(doc)}
            actions={[{ label: t('delete'), color: C.danger, icon: <IcTrash size={18} />, onClick: () => onRemove(doc) }]}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 2px rgba(43,42,40,0.04)', padding: '10px 12px' }}>
              <DocThumb doc={doc} cloud={cloud} />
              <div style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name || t('docFile')}</div>
                <div style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>{doc.at} · {formatBytes(doc.size)}</div>
              </div>
              {!IS_TOUCH && (
                <button
                  onClick={(e) => { e.stopPropagation(); onRemove(doc) }}
                  aria-label={t('delete')}
                  style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, background: 'transparent', border: 'none', color: C.sub, cursor: 'pointer' }}
                >
                  <IcTrash size={16} />
                </button>
              )}
            </div>
          </SwipeableRow>
        ))
      )}
    </>
  )
}

function IncidentSheet({ initial, onSave, onClose }) {
  const t = useT()
  const [at, setAt] = useState(initial?.at || todayISO())
  const [what, setWhat] = useState(initial?.what || '')
  const [where, setWhere] = useState(initial?.where || '')
  const [who, setWho] = useState(initial?.who || '')
  const [error, setError] = useState('')
  const fieldLabel = { fontSize: 13, fontWeight: 600, color: C.sub, display: 'block', margin: '12px 0 6px' }
  return (
    <Modal onClose={onClose} title={t(initial ? 'editIncident' : 'addIncident')}>
      <label style={{ ...fieldLabel, marginTop: 0 }}>{t('incWhen')}</label>
      <input type="date" value={at} onChange={(e) => setAt(e.target.value)} style={{ ...inputStyle, fontSize: 16 }} />
      <label style={fieldLabel}>{t('incWhat')}</label>
      <div>
        {/* Textarea wrapped in a block div (iOS flex-item collapse). */}
        <textarea
          value={what} onChange={(e) => setWhat(e.target.value)} rows={4}
          placeholder={t('incWhatPh')}
          style={{ ...inputStyle, fontSize: 16, resize: 'none', lineHeight: 1.5 }}
        />
      </div>
      <label style={fieldLabel}>{t('incWhere')}</label>
      <input type="text" value={where} onChange={(e) => setWhere(e.target.value)} placeholder={t('incWherePh')} style={{ ...inputStyle, fontSize: 16 }} />
      <label style={fieldLabel}>{t('incWho')}</label>
      <input type="text" value={who} onChange={(e) => setWho(e.target.value)} placeholder={t('incWhoPh')} style={{ ...inputStyle, fontSize: 16 }} />
      <CloudNote error={error} />
      <button
        onClick={() => {
          if (!what.trim()) { setError(t('incNeedWhat')); return }
          onSave({ ...(initial || {}), at: at || todayISO(), what: what.trim(), where: where.trim(), who: who.trim() })
          onClose()
        }}
        style={{ ...cloudBtn('primary'), marginTop: 10 }}
      >
        {t('save')}
      </button>
      <button onClick={onClose} style={{ ...cloudBtn('secondary'), marginTop: 8 }}>{t('cancel')}</button>
    </Modal>
  )
}

function DeadlineSheet({ initial, onSave, onClose, isCA }) {
  const t = useT()
  const [notice, setNotice] = useState(initial?.notice || todayISO())
  // The 60/90-day tracks are California law - only offer them in CA. Everywhere
  // else the deadline varies by state, so we only take a custom day count from
  // the person's own notice rather than assert a number we can't verify.
  const [track, setTrack] = useState(initial?.track || (isCA ? 'rc' : 'custom'))
  const [label, setLabel] = useState(initial?.label || '')
  const [days, setDays] = useState(initial?.days ? String(initial.days) : (isCA ? '60' : '30'))
  const [error, setError] = useState('')
  const fieldLabel = { fontSize: 13, fontWeight: 600, color: C.sub, display: 'block', margin: '12px 0 6px' }
  const trackOptions = [
    { value: 'rc', label: t('trackRC') },
    { value: 'medical', label: t('trackMedical') },
    { value: 'custom', label: t('trackCustom') },
  ]
  const showDays = !isCA || track === 'custom'
  return (
    <Modal onClose={onClose} title={t(initial ? 'editDeadline' : 'addDeadline')}>
      {isCA && (
        <>
          <label style={{ ...fieldLabel, marginTop: 0 }}>{t('dlTrack')}</label>
          <Select value={track} onChange={setTrack} options={trackOptions} ariaLabel={t('dlTrack')} />
        </>
      )}
      <label style={isCA ? fieldLabel : { ...fieldLabel, marginTop: 0 }}>{t('dlNotice')}</label>
      <input type="date" value={notice} onChange={(e) => setNotice(e.target.value)} style={{ ...inputStyle, fontSize: 16 }} />
      <label style={fieldLabel}>{t('dlLabel')}</label>
      <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder={t('dlLabelPh')} style={{ ...inputStyle, fontSize: 16 }} />
      {showDays && (
        <>
          <label style={fieldLabel}>{t('dlDays')}</label>
          <input
            type="text" inputMode="numeric" value={days} maxLength={3}
            onChange={(e) => setDays(e.target.value.replace(/\D/g, ''))}
            style={{ ...inputStyle, fontSize: 16 }}
          />
        </>
      )}
      <CloudNote error={error} />
      <button
        onClick={() => {
          if (!notice) { setError(t('dlNeedNotice')); return }
          const effTrack = isCA ? track : 'custom'
          onSave({
            ...(initial || {}),
            notice, track: effTrack, label: label.trim(),
            days: effTrack === 'custom' ? Math.max(1, Number(days) || 30) : undefined,
          })
          onClose()
        }}
        style={{ ...cloudBtn('primary'), marginTop: 10 }}
      >
        {t('save')}
      </button>
      <button onClick={onClose} style={{ ...cloudBtn('secondary'), marginTop: 8 }}>{t('cancel')}</button>
    </Modal>
  )
}

function ContactsCard({ isCA }) {
  const t = useT()
  // CA gets its verified agency lines; every other state gets only what is true
  // everywhere (the NDRN P&A finder) plus a pointer to its own Rights tab, so we
  // never show a Californian a Texas number or invent one we haven't verified.
  const list = isCA ? [...CA_CONTACTS, ...UNIVERSAL_CONTACTS] : UNIVERSAL_CONTACTS
  return (
    <>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 10 }}>
        {isCA ? t('contactsSub') : t('contactsNote')}
      </div>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '6px 14px', boxShadow: '0 1px 2px rgba(43,42,40,0.04)' }}>
        {list.map((c, i) => (
          <div key={c.name} style={{ padding: '11px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.line}` }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{c.name}</div>
            <div style={{ fontSize: 13, color: C.sub, marginTop: 2, lineHeight: 1.5 }}>{t(c.descKey)}</div>
            {c.phone ? (
              <a href={`tel:+1${c.phone.replace(/\D/g, '').replace(/^1/, '')}`} style={{ fontSize: 14, fontWeight: 600, color: C.accent, textDecoration: 'none', marginTop: 3, display: 'inline-block' }}>
                {c.phone}
              </a>
            ) : (
              <a href={`https://${c.url}`} target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 600, color: C.accent, textDecoration: 'none', marginTop: 3, display: 'inline-block' }}>
                {c.url}
              </a>
            )}
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
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 16,
      boxShadow: '0 1px 2px rgba(43,42,40,0.04)', cursor: 'pointer',
      padding: '15px 14px', textAlign: 'left', display: 'flex', flexDirection: 'column',
      minHeight: 118, fontFamily: 'inherit',
    }}>
      <span style={{ width: 42, height: 42, borderRadius: 12, background: C.accentSoft, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</span>
      <span style={{ marginTop: 'auto', paddingTop: 10 }}>
        <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: C.ink, lineHeight: 1.2 }}>{label}</span>
        <span style={{ display: 'block', fontSize: 12, color: C.sub, marginTop: 3 }}>{sub}</span>
      </span>
    </button>
  )
}

// Labeled back control for a vault drill-in (clear text, not a bare chevron -
// intuitive for every user).
function VaultBack({ onBack }) {
  const t = useT()
  return (
    <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: 'none', border: 'none', color: C.accent, fontSize: 15, fontWeight: 600, cursor: 'pointer', padding: '2px 2px 2px 0', marginBottom: 6, fontFamily: 'inherit' }}>
      <IcChevron dir="left" size={18} /> {t('navVault')}
    </button>
  )
}

function VaultPage({ cloud, incidents, onSaveIncident, onDeleteIncident, deadlines, onSaveDeadline, onDeleteDeadline, vaultDocs, onOpenAccount, isCA }) {
  const t = useT()
  const [view, setView] = useState('hub') // hub | incidents | deadlines | documents | packet | contacts
  const [editing, setEditing] = useState(null) // null | 'new' | incident
  const [editingDl, setEditingDl] = useState(null) // null | 'new' | deadline
  const [packetError, setPacketError] = useState('')
  const ready = cloud.status === 'ready'

  const makePacket = () => {
    setPacketError('')
    if (!openPacket(incidents, t, isCA)) setPacketError(t('packetOpenFailed'))
  }

  const scroll = { flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: `16px 16px ${NAV_CLEARANCE}`, WebkitOverflowScrolling: 'touch' }
  const emptyCard = (text) => (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 16px', fontSize: 14, color: C.sub, lineHeight: 1.55 }}>{text}</div>
  )
  const countText = (n) => (n > 0 ? t('countSaved', { n }) : t('tileEmpty'))

  const incidentRow = (inc) => (
    <SwipeableRow
      key={inc.id}
      onTap={() => setEditing(inc)}
      actions={[{ label: t('delete'), color: C.danger, icon: <IcTrash size={18} />, onClick: () => onDeleteIncident(inc.id) }]}
    >
      <div style={{ display: 'flex', alignItems: 'stretch', background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 2px rgba(43,42,40,0.04)' }}>
        <div style={{ flex: 1, minWidth: 0, padding: '13px 14px', cursor: 'pointer' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inc.what}</div>
          <div style={{ fontSize: 12, color: C.sub, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {inc.at}{inc.where ? ` · ${inc.where}` : ''}{inc.who ? ` · ${inc.who}` : ''}
          </div>
        </div>
        {!IS_TOUCH && (
          <button
            onClick={(e) => { e.stopPropagation(); onDeleteIncident(inc.id) }}
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
        actions={[{ label: t('delete'), color: C.danger, icon: <IcTrash size={18} />, onClick: () => onDeleteDeadline(rec.id) }]}
      >
        <div style={{ display: 'flex', alignItems: 'stretch', background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 2px rgba(43,42,40,0.04)' }}>
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
          {!IS_TOUCH && (
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

  // Signed out: sign-in prompt + the public help lines (crisis help never needs
  // an account).
  if (!ready) {
    return (
      <div style={scroll}>
        <SectionTitle first>{t('navVault')}</SectionTitle>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '18px 16px', boxShadow: '0 1px 2px rgba(43,42,40,0.04)', marginBottom: 22 }}>
          <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 14 }}>{t('vaultSignedOut')}</div>
          <button onClick={onOpenAccount} style={cloudBtn('primary')}>{t('vaultOpenAccount')}</button>
        </div>
        <SectionTitle>{t('helpContacts')}</SectionTitle>
        <ContactsCard isCA={isCA} />
      </div>
    )
  }

  const sheets = (
    <>
      {editing && (
        <IncidentSheet initial={editing === 'new' ? null : editing} onSave={onSaveIncident} onClose={() => setEditing(null)} />
      )}
      {editingDl && (
        <DeadlineSheet initial={editingDl === 'new' ? null : editingDl} onSave={onSaveDeadline} onClose={() => setEditingDl(null)} isCA={isCA} />
      )}
    </>
  )

  // ── Hub: a grid of tiles, one per tool. Visual, minimal words. ──────────────
  if (view === 'hub') {
    return (
      <div style={scroll}>
        <SectionTitle first>{t('navVault')}</SectionTitle>
        <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.5, marginBottom: 14 }}>{t('vaultHubSub')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <VaultTile icon={<IcClipboard size={22} />} label={t('incidentLog')} sub={countText(incidents.length)} onClick={() => setView('incidents')} />
          <VaultTile icon={<IcClock size={22} />} label={t('appealDeadlines')} sub={countText(deadlines.length)} onClick={() => setView('deadlines')} />
          <VaultTile icon={<IcImage size={22} />} label={t('docsTitle')} sub={countText(vaultDocs.docs.length)} onClick={() => setView('documents')} />
          <VaultTile icon={<IcFileText size={22} />} label={t('packet')} sub={t('tilePacketSub')} onClick={() => setView('packet')} />
          <VaultTile icon={<IcPhone size={22} />} label={t('helpContacts')} sub={t('tileContactsSub')} onClick={() => setView('contacts')} />
        </div>
        <div style={{ fontSize: 12, color: C.sub, marginTop: 16, lineHeight: 1.5 }}>{t('vaultPrivacy')}</div>
      </div>
    )
  }

  // ── Drill-in views ─────────────────────────────────────────────────────────
  if (view === 'incidents') {
    return (
      <div style={scroll}>
        <VaultBack onBack={() => setView('hub')} />
        <SectionTitle>{t('incidentLog')}</SectionTitle>
        <button onClick={() => setEditing('new')} style={{ ...cloudBtn('primary'), marginBottom: 14 }}>{t('addIncident')}</button>
        {incidents.length === 0 ? emptyCard(t('vaultEmptyList')) : incidents.map(incidentRow)}
        {sheets}
      </div>
    )
  }

  if (view === 'deadlines') {
    return (
      <div style={scroll}>
        <VaultBack onBack={() => setView('hub')} />
        <SectionTitle>{t('appealDeadlines')}</SectionTitle>
        <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 12 }}>{t('deadlineSub')}</div>
        <button onClick={() => setEditingDl('new')} style={{ ...cloudBtn('primary'), marginBottom: 14 }}>{t('addDeadline')}</button>
        {deadlines.length === 0 ? emptyCard(t('vaultEmptyDl')) : deadlines.map(deadlineRow)}
        {sheets}
      </div>
    )
  }

  if (view === 'documents') {
    return (
      <div style={scroll}>
        <VaultBack onBack={() => setView('hub')} />
        <DocsSection cloud={cloud} docs={vaultDocs.docs} busy={vaultDocs.busy} onAdd={vaultDocs.add} onRemove={vaultDocs.remove} />
      </div>
    )
  }

  if (view === 'packet') {
    return (
      <div style={scroll}>
        <VaultBack onBack={() => setView('hub')} />
        <SectionTitle>{t('packet')}</SectionTitle>
        <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 12 }}>{t('packetSub')}</div>
        {incidents.length === 0 ? emptyCard(t('packetNeedIncident')) : (
          <>
            <button onClick={makePacket} style={cloudBtn('primary')}>{t('createPacket')}</button>
            <CloudNote error={packetError} />
          </>
        )}
      </div>
    )
  }

  // contacts
  return (
    <div style={scroll}>
      <VaultBack onBack={() => setView('hub')} />
      <SectionTitle>{t('helpContacts')}</SectionTitle>
      <ContactsCard isCA={isCA} />
    </div>
  )
}

// ─── SHEETS ───────────────────────────────────────────────────────────────────
function SheetSection({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.sub, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>{title}</div>
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
          <br /><br />
          {t('aboutBody3')}
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
  fontFamily: 'inherit',
  ...(kind === 'primary'
    ? { background: C.accent, color: '#fff' }
    : { background: C.surface, color: C.ink, border: `1px solid ${C.border}` }),
})

// A fixed-height status/error line so text appearing never reflows the sheet
// (feedback-popup-text-no-reflow).
function CloudNote({ error }) {
  return (
    <div style={{ minHeight: 18, margin: '10px 2px 0', fontSize: 13, lineHeight: 1.35, color: C.danger, opacity: error ? 1 : 0, transition: 'opacity 0.15s' }}>
      {error || ' '}
    </div>
  )
}

function CloudSheet({ onClose, cloud }) {
  const t = useT()
  const { status, pinMode, email, error, busy } = cloud
  const [emailInput, setEmailInput] = useState(email || '')
  const [code, setCode] = useState('')
  const [pin, setPin] = useState('')

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

  const pinCopy = {
    setup: { title: t('pinSetupTitle'), sub: t('pinSetupSub'), cta: t('pinSetupCta') },
    unlock: { title: t('pinUnlockTitle'), sub: t('pinUnlockSub'), cta: t('pinUnlockCta') },
    recover: { title: t('pinUnlockTitle'), sub: t('pinRecoverSub'), cta: t('pinRecoverCta') },
  }[pinMode] || {}

  return (
    <Modal onClose={onClose} title={t('account')}>
      {status === 'signed_out' && (
        <div>
          <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 4 }}>
            {t('signInBody')}
          </div>
          <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6, marginBottom: 16 }}>
            {t('signInSub')}
          </div>
          <label style={{ fontSize: 13, fontWeight: 600, color: C.sub, display: 'block', marginBottom: 6 }}>{t('email')}</label>
          <input
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
      )}

      {status === 'code_sent' && (
        <div>
          <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 16 }}>
            {withEmail('codeSentBody')}
          </div>
          <label style={{ fontSize: 13, fontWeight: 600, color: C.sub, display: 'block', marginBottom: 6 }}>{t('code')}</label>
          <input
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
      )}

      {status === 'need_pin' && (
        <div>
          <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{pinCopy.title}</div>
          <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6, marginBottom: 16 }}>{pinCopy.sub}</div>
          <input
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
            {busy ? t('working') : pinCopy.cta}
          </button>
          <button onClick={() => cloud.signOut()} style={{ ...cloudBtn('secondary'), marginTop: 8 }}>
            {t('signOut')}
          </button>
        </div>
      )}

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
                <button key={o.value} onClick={() => cloud.setLockDelay(o.value)} style={{
                  padding: '10px 6px', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  border: `1.5px solid ${active ? C.accent : C.border}`,
                  background: active ? C.accentSoft : C.surface,
                  color: active ? C.accent : C.sub,
                }}>{t(o.labelKey)}</button>
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
