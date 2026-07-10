// HandBook chat endpoint. Privacy model: no accounts, no storage, no logging of
// message content. Each request carries the (client-held) conversation and is
// answered from the public HCBS corpus - nothing is persisted server-side.
// Explicit .js extension on the relative import: Vercel api/ functions are
// unbundled ESM and extensionless relative imports crash at runtime.
//
// Models: multiple providers with automatic failover. The primary answers; if
// it errors or is rate-limited (429), we fall over to the next provider so a
// throttled free tier no longer shows users "busy". A provider only joins the
// chain when its key is set, so the app runs on whatever keys exist.
//   GROQ_API_KEY     - Groq (the inference company, NOT xAI's Grok) - FREE tier,
//                      no card, ~1,000 req/day on llama-3.3-70b. The free path.
//   CEREBRAS_API_KEY - Cerebras - FREE tier, no card, 1M tokens/day (only 5
//                      req/min, so it's the deep fallback, not the primary).
//   GEMINI_API_KEY   - Google AI Studio key. Free tier for this project is tiny
//                      (gemini-flash-latest resolves to gemini-3.5-flash = 20/day;
//                      gemini-2.5-flash 404s for new projects). Weak fallback.
//   XAI_API_KEY      - xAI's Grok (paid, needs credits on the xAI team).
//   PROVIDER_ORDER   - comma list, default "groq,cerebras,gemini,grok".
//   GROQ_MODEL / CEREBRAS_MODEL / GEMINI_MODEL / XAI_MODEL - model overrides.
// NOTE the Groq (GROQ_API_KEY, free) vs Grok (XAI_API_KEY, paid) name collision.
import { GoogleGenAI } from '@google/genai'
import { getStateContent } from './_corpus.js'
import { PLAYBOOK, matchPlaybook } from './_playbook.js'

const MAX_TURNS = 16
const MAX_MSG_CHARS = 2000
const MAX_OUTPUT_TOKENS = 1024

// Groq (free) - OpenAI-compatible. llama-3.3-70b-versatile: ~1,000 req/day,
// 30 req/min on the free tier. Override GROQ_MODEL to llama-3.1-8b-instant for
// 14,400/day if you need more volume and can accept a smaller model.
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
// Cerebras (free) - OpenAI-compatible. Free tier: 1M tokens/DAY but only 5
// req/MIN, so it backstops volume, never leads. gpt-oss-120b is the strongest
// free-tier model there (docs.cerebras.ai lists gpt-oss-120b / zai-glm-4.7 /
// gemma-4-31b); override via CEREBRAS_MODEL when they rotate.
const CEREBRAS_MODEL = process.env.CEREBRAS_MODEL || 'gpt-oss-120b'
const CEREBRAS_URL = 'https://api.cerebras.ai/v1/chat/completions'
// Gemini: gemini-flash-latest resolves to gemini-3.5-flash (20/day free for a
// new project). gemini-2.5-flash 404s ("not available to new users"), verified
// live, so do NOT pin it. Weak but free fallback.
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-flash-latest'
// xAI Grok (paid). grok-4.3 is xAI's current general model; override XAI_MODEL.
const GROK_MODEL = process.env.XAI_MODEL || 'grok-4.3'
const XAI_URL = 'https://api.x.ai/v1/chat/completions'
const OPENAI_COMPAT_TIMEOUT_MS = 20000

const STATIC_SYSTEM = `You are HandBook, a plain-language guide to Home and Community-Based Services (HCBS) rights for people in the United States. You answer for one U.S. state at a time; the current state and the rules that apply there are given below.

Audience: people receiving services, their families, and direct support staff. Many readers use screen readers or read at a basic level. Write warmly and simply. Short paragraphs. Avoid legal jargon unless you immediately explain it.

Rules:
- Answer for the current state named below, using the federal HCBS rules and that state's excerpts. If the person asks about a different state, tell them to switch the state selector to that state so you can answer accurately, instead of guessing.
- Some questions include Program guidance: short answers written and vetted by the HandBook team that capture local nuance. When a Program guidance entry addresses the question, lead with it and treat it as trusted and correct. Still cite the underlying law where relevant. When no Program guidance is provided, answer from the reference excerpts as usual.
- Ground every answer in the reference excerpts provided below. Cite the source in parentheses, e.g. (42 CFR 441.301(c)(4)(vi)(C)) or (WIC 4731), when you state a right or requirement.
- If the excerpts do not cover the question, say so honestly and point the person to their state's Medicaid or developmental-disabilities agency, their local Protection and Advocacy office, and any contact listed in the excerpts. Never invent regulations, code numbers, deadlines, agencies, or phone numbers.
- You provide general information about rights, not legal advice. When someone describes a specific dispute, explain the relevant right and the concrete next steps (talk to the service coordinator or case manager, request a service-plan meeting, file a rights complaint, appeal or request a fair hearing, contact Protection and Advocacy), and remind them these are options, not legal advice.
- If someone describes possible abuse, neglect, or immediate danger, tell them to contact Adult/Child Protective Services or 911 first, then the advocacy channels.
- Do not ask for or encourage sharing of names, addresses, birthdates, or other identifying details. If a message includes them, do not repeat them back; answer the general question.
- Keep answers focused: usually 1-3 short paragraphs, or a short list of steps. Offer to go deeper rather than writing an essay.
- Write in plain text only, not markdown. Never use asterisks for bold/italics or markdown headers. For a list of steps, put each step on its own line starting with a dash and a space ("- like this"), nothing else.`

function tokenize(s) {
  return (s.toLowerCase().match(/[a-z0-9]{3,}/g) || [])
}

const STOP = new Set(['the', 'and', 'for', 'that', 'this', 'with', 'are', 'you', 'can', 'what', 'they', 'have', 'about', 'does', 'how', 'their', 'them', 'she', 'his', 'her', 'was', 'not', 'but', 'get', 'has', 'who', 'when', 'where', 'why', 'your', 'from', 'like'])

function retrieve(query, chunks, serviceCodes) {
  const terms = tokenize(query).filter((t) => !STOP.has(t))
  const scored = chunks.map((c) => {
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
  // Always keep a few chunks as grounding even when the match is weak.
  if (top.length < 3) {
    for (const c of chunks) {
      if (!top.includes(c)) top.push(c)
      if (top.length >= 3) break
    }
  }
  const codes = [...new Set(query.match(/\b\d{3}\b/g) || [])]
    .map((n) => serviceCodes.find((s) => s.code === n))
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

// Groq and xAI Grok both speak the OpenAI chat-completions format, so one
// helper serves both. Returns reply text; throws with .status on failure.
async function callOpenAICompatible({ label, url, apiKey, model, systemInstruction, messages }) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), OPENAI_COMPAT_TIMEOUT_MS)
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
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
      const e = new Error(`${label} ${r.status} ${detail}`)
      e.status = r.status
      throw e
    }
    const data = await r.json()
    const reply = (data?.choices?.[0]?.message?.content || '').trim()
    if (!reply) {
      const e = new Error(`empty ${label} reply`)
      e.status = 502
      throw e
    }
    return reply
  } finally {
    clearTimeout(timer)
  }
}

// Groq (free inference) and xAI Grok (paid) - same wire format, different hosts.
function callGroq({ systemInstruction, messages }) {
  return callOpenAICompatible({
    label: 'Groq', url: GROQ_URL, apiKey: process.env.GROQ_API_KEY,
    model: GROQ_MODEL, systemInstruction, messages,
  })
}

function callGrok({ systemInstruction, messages }) {
  return callOpenAICompatible({
    label: 'xAI', url: XAI_URL, apiKey: process.env.XAI_API_KEY,
    model: GROK_MODEL, systemInstruction, messages,
  })
}

function callCerebras({ systemInstruction, messages }) {
  return callOpenAICompatible({
    label: 'Cerebras', url: CEREBRAS_URL, apiKey: process.env.CEREBRAS_API_KEY,
    model: CEREBRAS_MODEL, systemInstruction, messages,
  })
}

const PROVIDERS = {
  groq: { call: callGroq, available: () => !!process.env.GROQ_API_KEY },
  cerebras: { call: callCerebras, available: () => !!process.env.CEREBRAS_API_KEY },
  gemini: { call: callGemini, available: () => !!process.env.GEMINI_API_KEY },
  grok: { call: callGrok, available: () => !!process.env.XAI_API_KEY },
}

function providerOrder() {
  const raw = (process.env.PROVIDER_ORDER || 'groq,cerebras,gemini,grok')
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

  // Ground in the selected state's content (federal base + that state's pack).
  // Defaults to CA when the client sends no state, so old clients are unchanged.
  const content = getStateContent(typeof req.body?.state === 'string' ? req.body.state : 'CA')
  // Compare mode: the person already has an answer for `state` and wants to see
  // how `compareTo` handles the same question. One extra grounded call, only
  // when the user asks (keeps free-tier volume sane).
  const compareContent = typeof req.body?.compareTo === 'string' && req.body.compareTo
    ? getStateContent(req.body.compareTo)
    : null

  const lastUser = messages[messages.length - 1].content
  const prevUser = [...messages].reverse().find((m, i) => i > 0 && m.role === 'user')
  const query = lastUser + ' ' + (prevUser ? prevUser.content : '')
  const { chunks, codes } = retrieve(query, content.chunks, content.serviceCodes)

  // In compare mode also retrieve from the target state's pack, and label every
  // excerpt with its state so the model can't cross the streams.
  const compareChunks = compareContent
    ? retrieve(query, compareContent.chunks, compareContent.serviceCodes).chunks
    : []
  const renderChunk = (c, label) => `### ${label ? `[${label}] ` : ''}${c.title}\nSource: ${c.citation}\n${c.text}`
  const excerpts = compareContent
    ? [
        ...chunks.map((c) => renderChunk(c, content.name)),
        ...compareChunks.map((c) => renderChunk(c, compareContent.name)),
      ].join('\n\n')
    : chunks.map((c) => renderChunk(c)).join('\n\n')
  const codeBlock = codes.length
    ? `\n\nService codes mentioned by the user (from the ${content.name} published list):\n` +
      codes.map((c) => `- ${c.code}: ${c.name}. ${c.note}`).join('\n')
    : ''

  // Tell the model which state it is answering for, and whether we have that
  // state's specifics or only the federal baseline (never guess state details).
  let stateFraming = content.covered
    ? `Current state: ${content.name}. Answer for ${content.name}, using the federal HCBS rules and the ${content.name} excerpts below.`
    : `Current state: ${content.name}. HandBook does NOT yet have ${content.name}-specific content loaded. Answer only from the federal HCBS baseline below, say plainly that the ${content.name} specifics are not loaded yet, and tell the person to confirm with ${content.name}'s Medicaid or developmental-disabilities agency and their local Protection and Advocacy office. Do not state ${content.name} statutes, agency names, deadlines, or phone numbers.`
  if (compareContent) {
    stateFraming = compareContent.covered
      ? `The person already received the ${content.name} answer shown in the conversation. Now explain how ${compareContent.name} would answer the SAME question, using only the [${compareContent.name}] excerpts and the federal rules. Lead with what is actually different in ${compareContent.name} (agencies, plan names, deadlines, processes); then briefly note what stays the same because the federal floor applies everywhere. Do not repeat the whole ${content.name} answer. Keep it to 1-2 short paragraphs.`
      : `The person already received the ${content.name} answer shown in the conversation and wants to know how ${compareContent.name} compares. HandBook does NOT yet have ${compareContent.name}-specific content loaded. Say that plainly, explain that the federal HCBS baseline (the same floor as ${content.name}) applies in ${compareContent.name} too, and refer them to ${compareContent.name}'s Medicaid or developmental-disabilities agency and their local Protection and Advocacy office. Do not state ${compareContent.name} statutes, agency names, deadlines, or phone numbers. Keep it to one short paragraph.`
  }

  // Team playbook: vetted answers that outrank the raw regs when they match.
  const guidance = matchPlaybook(lastUser + ' ' + (prevUser ? prevUser.content : ''), PLAYBOOK)
  const guidanceBlock = guidance.length
    ? 'Program guidance (written and vetted by the HandBook team - lead with this when it answers the question):\n\n' +
      guidance.map((g) => `- ${g.a}`).join('\n\n') + '\n\n'
    : ''

  const systemInstruction = `${STATIC_SYSTEM}\n\n${stateFraming}\n\n${guidanceBlock}Reference excerpts for this question:\n\n${excerpts}${codeBlock}`

  // Compare replies cite the TARGET state's grounding (the base answer's chips
  // already sit on the original bubble).
  const sources = (compareContent ? compareChunks : chunks)
    .map((c) => ({ id: c.id, title: c.title, citation: c.citation }))

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
