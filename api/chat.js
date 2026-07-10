// HandBook chat endpoint. Privacy model: no accounts, no storage, no logging of
// message content. Each request carries the (client-held) conversation and is
// answered from the public HCBS corpus - nothing is persisted server-side.
// Explicit .js extension on the relative import: Vercel api/ functions are
// unbundled ESM and extensionless relative imports crash at runtime.
//
// Models: two providers with automatic failover. The primary answers; if it
// errors or is rate-limited (429), we fall over to the next provider so a
// throttled free tier no longer shows users "busy". Order and models are
// env-configurable (see below). Grok is only in the chain when XAI_API_KEY is
// set, so the app still runs on Gemini alone until that key is added.
//   GEMINI_API_KEY   - Google AI Studio key (free tier by default)
//   XAI_API_KEY      - xAI key for Grok (paid); enables the fallback
//   PROVIDER_ORDER   - comma list, default "gemini,grok" (flip to prefer Grok)
//   GEMINI_MODEL     - default "gemini-flash-latest"
//   XAI_MODEL        - default "grok-4.3"
import { GoogleGenAI } from '@google/genai'
import { CHUNKS, SERVICE_CODES } from './_corpus.js'

const MAX_TURNS = 16
const MAX_MSG_CHARS = 2000
const MAX_OUTPUT_TOKENS = 1024

// Gemini alias, not a pinned version - Google hot-swaps this to the current
// flash model with a 2-week deprecation notice, so it won't 404 when a dated
// version (e.g. gemini-2.5-flash) is retired.
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest'
// xAI model id (literal, dot notation). grok-4.3 is xAI's current general
// chat model; override via XAI_MODEL if they retire it.
const GROK_MODEL = process.env.XAI_MODEL || 'grok-4.3'
const XAI_URL = 'https://api.x.ai/v1/chat/completions'
const GROK_TIMEOUT_MS = 20000

const STATIC_SYSTEM = `You are HandBook, a plain-language guide to Home and Community-Based Services (HCBS) rights, with a focus on California's regional center system (Lanterman Act).

Audience: people receiving services, their families, and direct support staff. Many readers use screen readers or read at a basic level. Write warmly and simply. Short paragraphs. Avoid legal jargon unless you immediately explain it.

Rules:
- You cover California only. HandBook answers about California's regional center / Lanterman Act system and the federal HCBS rules that apply in California. If someone asks about another state's program, say you only cover California and point them to their own state's Medicaid or developmental services agency.
- Ground every answer in the reference excerpts provided below. Cite the source in parentheses, e.g. (42 CFR 441.301(c)(4)(vi)(C)) or (WIC 4731), when you state a right or requirement.
- If the excerpts do not cover the question, say so honestly and point the person to their regional center service coordinator, OCRA (1-800-390-7032), or dds.ca.gov. Never invent regulations, code numbers, deadlines, or phone numbers.
- You provide general information about rights, not legal advice. When someone describes a specific dispute, explain the relevant right and the concrete next steps (talk to the service coordinator, request an IPP meeting, file a 4731 complaint, appeal/fair hearing, call OCRA), and remind them these are options, not legal advice.
- If someone describes possible abuse, neglect, or immediate danger, tell them to contact Adult/Child Protective Services or 911 first, then the advocacy channels.
- Do not ask for or encourage sharing of names, addresses, birthdates, or other identifying details. If a message includes them, do not repeat them back; answer the general question.
- Keep answers focused: usually 1-3 short paragraphs, or a short list of steps. Offer to go deeper rather than writing an essay.
- Write in plain text only, not markdown. Never use asterisks for bold/italics or markdown headers. For a list of steps, put each step on its own line starting with a dash and a space ("- like this"), nothing else.`

function tokenize(s) {
  return (s.toLowerCase().match(/[a-z0-9]{3,}/g) || [])
}

const STOP = new Set(['the', 'and', 'for', 'that', 'this', 'with', 'are', 'you', 'can', 'what', 'they', 'have', 'about', 'does', 'how', 'their', 'them', 'she', 'his', 'her', 'was', 'not', 'but', 'get', 'has', 'who', 'when', 'where', 'why', 'your', 'from', 'like'])

function retrieve(query) {
  const terms = tokenize(query).filter((t) => !STOP.has(t))
  const scored = CHUNKS.map((c) => {
    const hay = tokenize(c.title + ' ' + c.text)
    const haySet = new Set(hay)
    let score = 0
    for (const t of terms) {
      if (haySet.has(t)) score += 1
      if (tokenize(c.title).includes(t)) score += 2
    }
    return { c, score }
  })
  scored.sort((a, b) => b.score - a.score)
  const top = scored.filter((s) => s.score > 0).slice(0, 6).map((s) => s.c)
  // Always keep at least the overview + complaint paths available as grounding.
  if (top.length < 3) {
    for (const id of ['hcbs-overview', 'ca-complaints', 'ca-appeals']) {
      const c = CHUNKS.find((x) => x.id === id)
      if (!top.includes(c)) top.push(c)
    }
  }
  const codes = [...new Set(query.match(/\b\d{3}\b/g) || [])]
    .map((n) => SERVICE_CODES.find((s) => s.code === n))
    .filter(Boolean)
  return { chunks: top, codes }
}

// --- Providers -------------------------------------------------------------
// Each returns the reply text, or throws an Error carrying `.status` so the
// failover loop can tell a rate-limit (429) apart from a hard error. An empty
// reply is treated as a soft failure (502) so we fail over rather than hand the
// user a blank answer.

async function callGemini({ systemInstruction, messages }) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    config: {
      systemInstruction,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      // Flash defaults to spending part of maxOutputTokens on hidden reasoning
      // before writing the visible reply, which was truncating answers. This
      // isn't a reasoning task, so turn it off.
      thinkingConfig: { thinkingBudget: 0 },
    },
  })
  const reply = (response.text || '').trim()
  if (!reply) {
    const e = new Error('empty gemini reply')
    e.status = 502
    throw e
  }
  return reply
}

async function callGrok({ systemInstruction, messages }) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), GROK_TIMEOUT_MS)
  try {
    const r = await fetch(XAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROK_MODEL,
        messages: [
          { role: 'system', content: systemInstruction },
          ...messages.map((m) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
          })),
        ],
        max_tokens: MAX_OUTPUT_TOKENS,
        temperature: 0.3,
        stream: false,
      }),
      signal: controller.signal,
    })
    if (!r.ok) {
      let detail = ''
      try { detail = (await r.text()).slice(0, 300) } catch { /* ignore */ }
      const e = new Error(`xAI ${r.status} ${detail}`)
      e.status = r.status
      throw e
    }
    const data = await r.json()
    const reply = (data?.choices?.[0]?.message?.content || '').trim()
    if (!reply) {
      const e = new Error('empty grok reply')
      e.status = 502
      throw e
    }
    return reply
  } finally {
    clearTimeout(timer)
  }
}

const PROVIDERS = {
  gemini: { call: callGemini, available: () => !!process.env.GEMINI_API_KEY },
  grok: { call: callGrok, available: () => !!process.env.XAI_API_KEY },
}

function providerOrder() {
  const raw = (process.env.PROVIDER_ORDER || 'gemini,grok')
    .split(',')
    .map((s) => s.trim().toLowerCase())
  return raw.filter((name) => PROVIDERS[name] && PROVIDERS[name].available())
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const order = providerOrder()
  if (order.length === 0) {
    res.status(500).json({ error: 'Server is not configured yet (no model provider key set).' })
    return
  }

  let messages = Array.isArray(req.body?.messages) ? req.body.messages : null
  if (!messages || messages.length === 0) {
    res.status(400).json({ error: 'messages array required' })
    return
  }
  messages = messages
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MSG_CHARS) }))
  if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
    res.status(400).json({ error: 'last message must be from the user' })
    return
  }

  const lastUser = messages[messages.length - 1].content
  const prevUser = [...messages].reverse().find((m, i) => i > 0 && m.role === 'user')
  const { chunks, codes } = retrieve(lastUser + ' ' + (prevUser ? prevUser.content : ''))

  const excerpts = chunks
    .map((c) => `### ${c.title}\nSource: ${c.citation}\n${c.text}`)
    .join('\n\n')
  const codeBlock = codes.length
    ? '\n\nService codes mentioned by the user (from the CA DDS published list):\n' +
      codes.map((c) => `- ${c.code}: ${c.name}. ${c.note}`).join('\n')
    : ''
  const systemInstruction = `${STATIC_SYSTEM}\n\nReference excerpts for this question:\n\n${excerpts}${codeBlock}`

  const sources = chunks.map((c) => ({ id: c.id, title: c.title, citation: c.citation }))

  // Try each configured provider in order; fall over on any error.
  const errors = []
  for (const name of order) {
    try {
      const reply = await PROVIDERS[name].call({ systemInstruction, messages })
      res.status(200).json({ reply, provider: name, sources })
      return
    } catch (err) {
      const status = err?.status ?? err?.response?.status
      console.error(`HandBook ${name} error:`, err?.message || err, status)
      errors.push({ name, status })
      // continue to the next provider
    }
  }

  // Every provider failed. Only call it "busy" when they were all rate-limited;
  // otherwise it's a real error, not a throttle.
  const allRateLimited = errors.length > 0 && errors.every((e) => e.status === 429)
  res.status(allRateLimited ? 429 : 500).json({
    error: allRateLimited
      ? 'HandBook is busy right now. Please try again in a moment.'
      : 'Something went wrong answering that. Please try again.',
  })
}
