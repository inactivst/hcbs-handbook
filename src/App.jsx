import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FEDERAL, STATES, US_STATES } from '../api/_corpus.js'

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

const STARTERS = [
  'Can my group home lock the fridge?',
  'Do I have a right to visitors at any time?',
  'What is service code 510?',
  'How do I appeal a regional center decision?',
  'Can I choose my own roommate?',
]

const serif = "Georgia, 'Times New Roman', serif"

function loadConversations() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
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

function timeAgo(ms) {
  const s = Math.floor((Date.now() - ms) / 1000)
  if (s < 60) return 'Just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m} min ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h} hr ago`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d} day${d > 1 ? 's' : ''} ago`
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
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)
    update()
    return () => { vv.removeEventListener('resize', update); vv.removeEventListener('scroll', update) }
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
// dialog on desktop. Lifts above the keyboard via marginBottom:kbInset.
function Modal({ onClose, children, title, width = 480 }) {
  useEscToClose(onClose)
  const sheetRef = useRef(null)
  const innerRef = useRef(null)
  const drag = useRef({ active: false, started: false, startY: 0, cur: 0 })
  const scroller = () => innerRef.current

  const kbInset = useKeyboardInset()

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
        position: 'fixed', inset: 0, zIndex: 1000,
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
          marginBottom: kbInset, transition: 'margin-bottom 0.2s ease',
          display: 'flex', flexDirection: 'column',
          maxHeight: kbInset ? `calc(90vh - ${kbInset}px)` : '90vh',
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
        <div ref={innerRef} style={{ flex: '0 1 auto', minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', paddingLeft: 20, paddingRight: 20 }}>
          {children}
          <div style={{ height: kbInset, flexShrink: 0 }} />
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

  useGlobalFieldRecenter()

  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(conversations))
    } catch {
      /* storage full or unavailable - history just won't persist */
    }
  }, [conversations])

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
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      const withAnswer = [...next, { role: 'assistant', content: data.reply, sources: data.sources || [] }]
      setConversations((prev) => prev.map((c) => (c.id === convId ? { ...c, messages: withAnswer } : c)))
      return true
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.')
      setConversations((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, messages: base } : c)).filter((c) => c.messages.length > 0)
      )
      if (base.length === 0) setActiveId(null)
      return false
    } finally {
      setBusy(false)
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
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: C.bg, color: C.ink, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 680, margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header onSettings={() => setShowSettings(true)} onCloud={() => setShowCloud(true)} />
        {tab === 'chat' && <Chat messages={activeMessages} activeId={activeId} busy={busy} error={error} onSend={send} onNew={startNew} stateCode={stateCode || 'CA'} onStateChange={chooseState} />}
        {tab === 'history' && <History conversations={conversations} onOpen={openConversation} onDelete={deleteConversation} />}
        {tab === 'library' && <Library stateCode={stateCode || 'CA'} onStateChange={chooseState} />}
      </div>
      <Nav tab={tab} setTab={setTab} onAsk={startNew} />
      {!stateCode && <StatePrompt onChoose={chooseState} />}
      {showSettings && (
        <SettingsSheet
          onClose={() => setShowSettings(false)}
          count={conversations.length}
          onDeleteAll={deleteAllConversations}
        />
      )}
      {showCloud && <CloudSheet onClose={() => setShowCloud(false)} />}
    </div>
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

function Header({ onSettings, onCloud }) {
  return (
    <div style={{ padding: 'calc(env(safe-area-inset-top) + 14px) 16px 0', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, letterSpacing: 0.2 }}>HandBook</div>
          <div style={{ fontSize: 13, color: C.sub, marginTop: 2 }}>Your HCBS rights, in plain language</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0, paddingTop: 2 }}>
          <IconBtn label="Cloud sync" onClick={onCloud}><IcCloud size={19} /></IconBtn>
          <IconBtn label="Settings" onClick={onSettings}><IcSettings size={19} /></IconBtn>
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.sub, background: C.accentSoft, border: `1px solid ${C.line}`, borderRadius: 10, padding: '8px 12px', margin: '12px 0 0', lineHeight: 1.45 }}>
        General information, not legal advice. Your saved history stays on this device only. Please don't include names or other personal details.
      </div>
    </div>
  )
}

function Nav({ tab, setTab, onAsk }) {
  const items = [
    { key: 'chat', label: 'Ask', onClick: onAsk },
    { key: 'history', label: 'History', onClick: () => setTab('history') },
    { key: 'library', label: 'Rights', onClick: () => setTab('library') },
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
                borderRadius: 999, padding: '9px 18px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
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
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px 0', flexShrink: 0 }}>
      <span style={{ fontSize: 13, color: C.sub, flexShrink: 0 }}>Answering for</span>
      <div style={{ flex: 1, minWidth: 0, maxWidth: 240 }}>
        <Select
          value={stateCode}
          onChange={onStateChange}
          options={STATE_OPTIONS}
          ariaLabel="State"
          style={{ padding: '7px 11px', borderRadius: 999, fontSize: 14 }}
        />
      </div>
      {!stateCovered(stateCode) && (
        <span style={{ fontSize: 12, color: C.ink3, flexShrink: 0 }}>federal rules only</span>
      )}
    </div>
  )
}

function Chat({ messages, activeId, busy, error, onSend, onNew, stateCode, onStateChange }) {
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
                <div style={{ fontSize: 14, color: C.sub, marginBottom: 10 }}>Try asking:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {STARTERS.map((s) => (
                    <button key={s} onClick={() => submit(s)} style={{ border: `1px solid ${C.border}`, background: C.card, color: C.ink, borderRadius: 12, padding: '10px 13px', fontSize: 14, cursor: 'pointer', textAlign: 'left', boxShadow: '0 1px 2px rgba(43,42,40,0.04)' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <Bubble key={i} m={m} ref={i === messages.length - 1 ? lastMsgRef : null} />
            ))}
            <div style={{ minHeight: 26, padding: '2px 4px' }}>
              {busy && <span style={{ fontSize: 13, color: C.sub }}>Looking that up…</span>}
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
              placeholder="Ask about your rights…"
              rows={1}
              style={{ ...inputStyle, resize: 'none', borderRadius: 14, padding: '12px 14px', lineHeight: 1.4, maxHeight: 120 }}
            />
          </div>
          <button
            type="submit"
            disabled={busy || !input.trim()}
            style={{ background: busy || !input.trim() ? C.line : C.accent, color: '#fff', border: 'none', borderRadius: 14, padding: '13px 18px', fontSize: 15, fontWeight: 700, cursor: busy || !input.trim() ? 'default' : 'pointer', marginBottom: 4 }}
          >
            Ask
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

const Bubble = React.forwardRef(function Bubble({ m }, ref) {
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
        {!user && m.sources && m.sources.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 6 }}>
            {m.sources.slice(0, 3).map((s) => (
              <span key={s.id} style={{ fontSize: 11, color: C.sub, background: C.accentSoft, border: `1px solid ${C.line}`, borderRadius: 999, padding: '3px 9px' }}>
                {s.citation}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})

function History({ conversations, onOpen, onDelete }) {
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: `16px 16px ${NAV_CLEARANCE}`, WebkitOverflowScrolling: 'touch' }}>
      <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 700, margin: '4px 0 10px' }}>Saved questions</div>
      {conversations.length === 0 ? (
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: '18px 16px', fontSize: 14, color: C.sub, lineHeight: 1.55 }}>
          Your questions are saved here so you can come back to an answer later. Ask something in the Ask tab to get started.
        </div>
      ) : (
        conversations.map((conv) => {
          const firstQ = (conv.messages.find((m) => m.role === 'user') || {}).content || 'Conversation'
          const qCount = conv.messages.filter((m) => m.role === 'user').length
          return (
            // Swipe left to reveal Delete (GuestBook cards). Desktop keeps a
            // visible trash button - a mouse can't swipe.
            <SwipeableRow
              key={conv.id}
              onTap={() => onOpen(conv.id)}
              actions={[{ label: 'Delete', color: C.danger, icon: <IcTrash size={18} />, onClick: () => onDelete(conv.id) }]}
            >
              <div style={{ display: 'flex', alignItems: 'stretch', background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 2px rgba(43,42,40,0.04)' }}>
                <div style={{ flex: 1, minWidth: 0, padding: '13px 14px', textAlign: 'left', cursor: 'pointer' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{firstQ}</div>
                  <div style={{ fontSize: 12, color: C.sub, marginTop: 3 }}>{timeAgo(conv.createdAt)} · {qCount} question{qCount > 1 ? 's' : ''}</div>
                </div>
                {!IS_TOUCH && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(conv.id) }}
                    aria-label="Delete conversation"
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
          {IS_TOUCH ? 'Swipe a question left to delete it. ' : ''}Saved on this device only. The {MAX_CONVERSATIONS} most recent conversations are kept.
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
  const pack = STATES[code]
  const name = stateName(code)
  if (!pack) {
    return (
      <div style={{ background: compact ? 'transparent' : C.card, border: compact ? 'none' : `1px solid ${C.border}`, borderRadius: 14, padding: compact ? '0 0 4px' : '14px 16px', fontSize: 14, color: C.sub, lineHeight: 1.6, boxShadow: compact ? 'none' : '0 1px 2px rgba(43,42,40,0.04)' }}>
        {name}-specific rules aren't loaded yet. The federal HCBS rights below apply in {name} too, and answers for {name} use that federal baseline. For state specifics, contact {name}'s Medicaid or developmental-disabilities agency, or your local Protection and Advocacy office (find yours at ndrn.org).
      </div>
    )
  }
  return (
    <>
      <ChunkList chunks={pack.chunks} />
      {pack.serviceCodes.length > 0 && (
        <>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.sub, margin: '12px 0 8px' }}>Common service codes</div>
          <ServiceCodeList codes={pack.serviceCodes} />
        </>
      )}
    </>
  )
}

function Library({ stateCode, onStateChange }) {
  const [openState, setOpenState] = useState(null)
  const covered = stateCovered(stateCode)
  const otherStates = STATE_OPTIONS.filter((o) => o.value !== stateCode)
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: `16px 16px ${NAV_CLEARANCE}`, WebkitOverflowScrolling: 'touch' }}>
      <SectionTitle first>Your state</SectionTitle>
      <div style={{ marginBottom: 10 }}>
        <Select value={stateCode} onChange={onStateChange} options={STATE_OPTIONS} ariaLabel="Your state" />
      </div>
      <StatePack code={stateCode} />
      {covered && stateCode === 'CA' && (
        <div style={{ fontSize: 12, color: C.sub, marginTop: 10, lineHeight: 1.5 }}>
          Partial service-code list. The full crosswalk is published by the CA Department of Developmental Services at dds.ca.gov. Free advocacy help: OCRA at Disability Rights California, 1-800-390-7032.
        </div>
      )}

      <SectionTitle>Federal rights (all states)</SectionTitle>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 10 }}>
        The federal HCBS Settings Rule applies in every state and is the floor your state builds on.
      </div>
      <ChunkList chunks={FEDERAL} />

      <SectionTitle>Other states</SectionTitle>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginBottom: 10 }}>
        Tap a state to see what HandBook has for it. Every state gets the federal rights above; state-specific guides are added as the team vets them.
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
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.accent, background: C.accentSoft, borderRadius: 999, padding: '2px 8px' }}>State guide</span>
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

// ─── SHEETS ───────────────────────────────────────────────────────────────────
function SheetSection({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.sub, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  )
}

function SettingsSheet({ onClose, count, onDeleteAll }) {
  // Two-tap destructive confirm ON the same button (label swap, no layout
  // reflow); auto-resets after a beat.
  const [confirming, setConfirming] = useState(false)
  useEffect(() => {
    if (!confirming) return
    const t = setTimeout(() => setConfirming(false), 3500)
    return () => clearTimeout(t)
  }, [confirming])

  return (
    <Modal onClose={onClose} title="Settings">
      <SheetSection title="Saved questions">
        <div style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12, padding: '12px 14px', fontSize: 14, color: C.ink, marginBottom: 8 }}>
          {count === 0 ? 'No saved questions on this device.' : `${count} conversation${count > 1 ? 's' : ''} saved on this device.`}
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
          {confirming ? 'Tap again to delete everything' : 'Delete all saved questions'}
        </button>
      </SheetSection>
      <SheetSection title="About">
        <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6 }}>
          HandBook explains Home and Community-Based Services (HCBS) rights in plain language, grounded in the
          federal Settings Rule and California's Lanterman Act. It offers general information, not legal advice.
          <br /><br />
          Questions you ask are answered by an AI model and are not stored on any HandBook server. Saved history
          lives only on this device. Please don't include names or other personal details.
          <br /><br />
          Free advocacy help: OCRA at Disability Rights California, 1-800-390-7032 · dds.ca.gov
        </div>
      </SheetSection>
    </Modal>
  )
}

// First-launch: ask which state grounds the answers. One-time - dismissing
// without picking keeps the California default (and persists it, so the prompt
// never nags); the choice is always changeable from the Ask and Rights pages.
function StatePrompt({ onChoose }) {
  const [picked, setPicked] = useState('')
  return (
    <Modal onClose={() => onChoose('CA')} title="Where do you live?">
      <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 14 }}>
        HCBS rights start with the same federal rules everywhere, but each state runs its own program.
        Pick your state so answers fit where you live. You can change it anytime.
      </div>
      <Select
        value={picked}
        onChange={setPicked}
        options={STATE_OPTIONS}
        placeholder="Choose your state…"
        ariaLabel="Your state"
      />
      <button
        onClick={() => onChoose(picked || 'CA')}
        style={{
          width: '100%', marginTop: 12, border: 'none', borderRadius: 12,
          background: C.accent, color: '#fff',
          padding: '13px 14px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
        }}
      >
        {picked ? 'Continue' : 'Skip - use California'}
      </button>
    </Modal>
  )
}

function CloudSheet({ onClose }) {
  return (
    <Modal onClose={onClose} title="Cloud sync">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ display: 'inline-flex', width: 8, height: 8, borderRadius: '50%', background: C.lineHard }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: C.sub }}>Not connected</span>
      </div>
      <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.6, marginBottom: 4 }}>
        HandBook works fully on this device without an account - nothing you do here requires one.
      </div>
      <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6 }}>
        Optional accounts are coming soon. Signing in will add extras like keeping your saved questions
        indefinitely across devices - and everything will stay private to you.
      </div>
    </Modal>
  )
}
