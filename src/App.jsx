import React, { useEffect, useRef, useState } from 'react'
import { CHUNKS, SERVICE_CODES } from '../api/_corpus.js'

// Native shells must call the API at an absolute origin; web uses relative.
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || ''

// History lives ONLY in the browser's localStorage on this device - never sent
// to a server, never shared. Keeps the privacy posture: the app stores nothing
// server-side. Capped so storage can't grow without bound (code-for-scale).
const STORE_KEY = 'handbook.conversations.v1'
const MAX_CONVERSATIONS = 50

// Professional, neutral palette (greige + teal) - distinct from the warm cream
// of the other Book apps.
const C = {
  bg: '#F4F3F1',
  card: '#FFFFFF',
  ink: '#2B2A28',
  sub: '#6E6A64',
  line: '#E5E2DC',
  accent: '#2E7D74',
  accentSoft: '#E4EEEC',
}

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

export default function App() {
  const [tab, setTab] = useState('chat')
  const [conversations, setConversations] = useState(loadConversations)
  const [activeId, setActiveId] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

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
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
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

  return (
    // Fixed full-viewport shell (Book-app recipe) - this is what keeps the page
    // itself static; only the inner scroll areas move.
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: C.bg, color: C.ink, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 680, margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header />
        {tab === 'chat' && <Chat messages={activeMessages} activeId={activeId} busy={busy} error={error} onSend={send} />}
        {tab === 'history' && <History conversations={conversations} onOpen={openConversation} onDelete={deleteConversation} />}
        {tab === 'library' && <Library />}
      </div>
      <Nav tab={tab} setTab={setTab} onAsk={startNew} />
    </div>
  )
}

function Header() {
  return (
    <div style={{ padding: 'calc(env(safe-area-inset-top) + 14px) 16px 0', flexShrink: 0 }}>
      <div style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, letterSpacing: 0.2 }}>HandBook</div>
      <div style={{ fontSize: 13, color: C.sub, marginTop: 2 }}>Your HCBS rights, in plain language</div>
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

function Chat({ messages, activeId, busy, error, onSend }) {
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)
  const lastMsgRef = useRef(null)
  const prevLenRef = useRef(0)
  const prevActiveRef = useRef(null)

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
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: '16px 16px 8px', WebkitOverflowScrolling: 'touch' }}>
        {messages.length === 0 && (
          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 14, color: C.sub, marginBottom: 10 }}>Try asking:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {STARTERS.map((s) => (
                <button key={s} onClick={() => submit(s)} style={{ border: `1px solid ${C.line}`, background: C.card, color: C.ink, borderRadius: 12, padding: '10px 13px', fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>
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
          {!busy && error && <span style={{ fontSize: 13, color: '#B4552F' }}>{error}</span>}
        </div>
      </div>
      <div style={{ padding: `8px 16px ${NAV_CLEARANCE}`, borderTop: `1px solid ${C.line}`, background: C.bg, flexShrink: 0 }}>
        <form
          onSubmit={(e) => { e.preventDefault(); submit(input) }}
          style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}
        >
          <div style={{ flex: 1 }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(input) } }}
              placeholder="Ask about your rights…"
              rows={1}
              style={{ width: '100%', resize: 'none', fontSize: 16, fontFamily: 'inherit', color: C.ink, background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, padding: '12px 14px', outline: 'none', WebkitAppearance: 'none', lineHeight: 1.4, maxHeight: 120 }}
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
            border: user ? 'none' : `1px solid ${C.line}`,
            borderRadius: 16,
            borderBottomRightRadius: user ? 5 : 16,
            borderBottomLeftRadius: user ? 16 : 5,
            padding: '11px 14px', fontSize: 15, lineHeight: 1.55, wordBreak: 'break-word',
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

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

function History({ conversations, onOpen, onDelete }) {
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: `16px 16px ${NAV_CLEARANCE}`, WebkitOverflowScrolling: 'touch' }}>
      <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 700, margin: '4px 0 10px' }}>Saved questions</div>
      {conversations.length === 0 ? (
        <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, padding: '18px 16px', fontSize: 14, color: C.sub, lineHeight: 1.55 }}>
          Your questions are saved here so you can come back to an answer later. Ask something in the Ask tab to get started.
        </div>
      ) : (
        conversations.map((conv) => {
          const firstQ = (conv.messages.find((m) => m.role === 'user') || {}).content || 'Conversation'
          const qCount = conv.messages.filter((m) => m.role === 'user').length
          return (
            <div key={conv.id} style={{ display: 'flex', alignItems: 'stretch', background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, marginBottom: 8, overflow: 'hidden' }}>
              <button
                onClick={() => onOpen(conv.id)}
                style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', padding: '13px 14px', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ fontSize: 15, fontWeight: 600, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{firstQ}</div>
                <div style={{ fontSize: 12, color: C.sub, marginTop: 3 }}>{timeAgo(conv.createdAt)} · {qCount} question{qCount > 1 ? 's' : ''}</div>
              </button>
              <button
                onClick={() => onDelete(conv.id)}
                aria-label="Delete conversation"
                style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 46, background: 'transparent', border: 'none', borderLeft: `1px solid ${C.line}`, color: C.sub, cursor: 'pointer' }}
              >
                <TrashIcon />
              </button>
            </div>
          )
        })
      )}
      {conversations.length > 0 && (
        <div style={{ fontSize: 12, color: C.sub, marginTop: 10, lineHeight: 1.5 }}>
          Saved on this device only. The {MAX_CONVERSATIONS} most recent conversations are kept.
        </div>
      )}
    </div>
  )
}

function Library() {
  const [open, setOpen] = useState(null)
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain', padding: `16px 16px ${NAV_CLEARANCE}`, WebkitOverflowScrolling: 'touch' }}>
      <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 700, margin: '4px 0 10px' }}>Your rights</div>
      {CHUNKS.map((c) => {
        const isOpen = open === c.id
        return (
          <div key={c.id} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, marginBottom: 8, overflow: 'hidden' }}>
            <button
              onClick={() => setOpen(isOpen ? null : c.id)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, background: 'transparent', border: 'none', padding: '13px 14px', cursor: 'pointer', textAlign: 'left' }}
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{c.title}</div>
                <div style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>{c.citation}</div>
              </div>
              <span style={{ color: C.sub, fontSize: 13, transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}>›</span>
            </button>
            {isOpen && (
              <div style={{ padding: '0 14px 14px', fontSize: 14, lineHeight: 1.6, color: C.ink, whiteSpace: 'pre-wrap' }}>{c.text}</div>
            )}
          </div>
        )
      })}
      <div style={{ fontFamily: serif, fontSize: 19, fontWeight: 700, margin: '20px 0 10px' }}>Common service codes</div>
      <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 14, padding: '6px 14px' }}>
        {SERVICE_CODES.map((s, i) => (
          <div key={s.code} style={{ padding: '11px 0', borderTop: i === 0 ? 'none' : `1px solid ${C.line}` }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>
              <span style={{ color: C.accent, fontVariantNumeric: 'tabular-nums' }}>{s.code}</span>  {s.name}
            </div>
            <div style={{ fontSize: 13, color: C.sub, marginTop: 3, lineHeight: 1.5 }}>{s.note}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: C.sub, marginTop: 10, lineHeight: 1.5 }}>
        Partial list. The full service code crosswalk is published by the CA Department of Developmental Services at dds.ca.gov. Free advocacy help: OCRA at Disability Rights California, 1-800-390-7032.
      </div>
    </div>
  )
}
