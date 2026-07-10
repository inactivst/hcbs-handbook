import React, { useEffect, useRef, useState } from 'react'
import { CHUNKS, SERVICE_CODES } from '../api/_corpus.js'

// Native shells must call the API at an absolute origin; web uses relative.
const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || ''

const C = {
  bg: '#FAF6EE',
  card: '#FFFDF8',
  ink: '#2E2A24',
  sub: '#6F6659',
  line: '#E7DFD0',
  accent: '#8B5E3C',
  accentSoft: '#F1E7DA',
  green: '#4C7A5C',
}

const STARTERS = [
  'Can my group home lock the fridge?',
  'Do I have a right to visitors at any time?',
  'What is service code 510?',
  'How do I appeal a regional center decision?',
  'Can I choose my own roommate?',
]

const serif = "Georgia, 'Times New Roman', serif"

export default function App() {
  const [tab, setTab] = useState('chat')
  return (
    <div style={{ minHeight: '100dvh', background: C.bg, color: C.ink, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', maxWidth: 680, margin: '0 auto', display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, height: '100dvh' }}>
        <Header tab={tab} setTab={setTab} />
        {tab === 'chat' ? <Chat /> : <Library />}
      </div>
    </div>
  )
}

function Header({ tab, setTab }) {
  return (
    <div style={{ padding: 'calc(env(safe-area-inset-top) + 14px) 16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, letterSpacing: 0.2 }}>HandBook</div>
          <div style={{ fontSize: 13, color: C.sub, marginTop: 2 }}>Your HCBS rights, in plain language</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[['chat', 'Ask'], ['library', 'Rights Library']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                border: `1px solid ${tab === key ? C.accent : C.line}`,
                background: tab === key ? C.accentSoft : 'transparent',
                color: tab === key ? C.accent : C.sub,
                borderRadius: 999, padding: '7px 13px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.sub, background: C.accentSoft, border: `1px solid ${C.line}`, borderRadius: 10, padding: '8px 12px', margin: '12px 0 0', lineHeight: 1.45 }}>
        General information, not legal advice. Nothing you type here is saved. Please don't include names or other personal details.
      </div>
    </div>
  )
}

function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef(null)
  const lastMsgRef = useRef(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const last = messages[messages.length - 1]
    // When an answer arrives, bring the START of the answer to the top so the
    // reader scrolls down through it naturally. For the reader's own message
    // (or the "looking that up" state), keep the newest content at the bottom.
    if (last && last.role === 'assistant' && lastMsgRef.current) {
      const cTop = el.getBoundingClientRect().top
      const mTop = lastMsgRef.current.getBoundingClientRect().top
      el.scrollTop += mTop - cTop - 12
    } else {
      el.scrollTop = el.scrollHeight
    }
  }, [messages, busy])

  async function send(text) {
    const q = (text || '').trim()
    if (!q || busy) return
    setError('')
    setInput('')
    const next = [...messages, { role: 'user', content: q }]
    setMessages(next)
    setBusy(true)
    try {
      const r = await fetch(`${API_ORIGIN}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      })
      const data = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setMessages((m) => [...m, { role: 'assistant', content: data.reply, sources: data.sources || [] }])
    } catch (e) {
      setError(e.message || 'Something went wrong. Please try again.')
      setMessages((m) => m.slice(0, -1))
      setInput(q)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '16px 16px 8px', WebkitOverflowScrolling: 'touch' }}>
        {messages.length === 0 && (
          <div style={{ marginTop: 18 }}>
            <div style={{ fontSize: 14, color: C.sub, marginBottom: 10 }}>Try asking:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {STARTERS.map((s) => (
                <button key={s} onClick={() => send(s)} style={{ border: `1px solid ${C.line}`, background: C.card, color: C.ink, borderRadius: 12, padding: '10px 13px', fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>
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
          {!busy && error && <span style={{ fontSize: 13, color: '#A0522D' }}>{error}</span>}
        </div>
      </div>
      <div style={{ padding: '8px 16px calc(env(safe-area-inset-bottom) + 14px)', borderTop: `1px solid ${C.line}`, background: C.bg }}>
        <form
          onSubmit={(e) => { e.preventDefault(); send(input) }}
          style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}
        >
          <div style={{ flex: 1 }}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
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

function Library() {
  const [open, setOpen] = useState(null)
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '16px 16px calc(env(safe-area-inset-bottom) + 24px)', WebkitOverflowScrolling: 'touch' }}>
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
