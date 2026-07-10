// HandBook chat endpoint. Privacy model: no accounts, no storage, no logging of
// message content. Each request carries the (client-held) conversation and is
// answered from the public HCBS corpus - nothing is persisted server-side.
// Explicit .js extension on the relative import: Vercel api/ functions are
// unbundled ESM and extensionless relative imports crash at runtime.
// Model: Gemini free tier (internal team demo, not for public/user-facing use -
// see README for the tradeoffs vs. the Claude version this was built on).
import { GoogleGenAI } from '@google/genai'
import { CHUNKS, SERVICE_CODES } from './_corpus.js'

const MODEL = 'gemini-2.5-flash'
const MAX_TURNS = 16
const MAX_MSG_CHARS = 2000

const STATIC_SYSTEM = `You are HandBook, a plain-language guide to Home and Community-Based Services (HCBS) rights, with a focus on California's regional center system (Lanterman Act).

Audience: people receiving services, their families, and direct support staff. Many readers use screen readers or read at a basic level. Write warmly and simply. Short paragraphs. Avoid legal jargon unless you immediately explain it.

Rules:
- Ground every answer in the reference excerpts provided below. Cite the source in parentheses, e.g. (42 CFR 441.301(c)(4)(vi)(C)) or (WIC 4731), when you state a right or requirement.
- If the excerpts do not cover the question, say so honestly and point the person to their regional center service coordinator, OCRA (1-800-390-7032), or dds.ca.gov. Never invent regulations, code numbers, deadlines, or phone numbers.
- You provide general information about rights, not legal advice. When someone describes a specific dispute, explain the relevant right and the concrete next steps (talk to the service coordinator, request an IPP meeting, file a 4731 complaint, appeal/fair hearing, call OCRA), and remind them these are options, not legal advice.
- If someone describes possible abuse, neglect, or immediate danger, tell them to contact Adult/Child Protective Services or 911 first, then the advocacy channels.
- Do not ask for or encourage sharing of names, addresses, birthdates, or other identifying details. If a message includes them, do not repeat them back; answer the general question.
- Keep answers focused: usually 1-3 short paragraphs, or a short list of steps. Offer to go deeper rather than writing an essay.`

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({ error: 'Server is not configured yet (missing GEMINI_API_KEY).' })
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

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      })),
      config: {
        systemInstruction: `${STATIC_SYSTEM}\n\nReference excerpts for this question:\n\n${excerpts}${codeBlock}`,
        maxOutputTokens: 1024,
      },
    })
    const reply = response.text || ''
    res.status(200).json({
      reply,
      sources: chunks.map((c) => ({ id: c.id, title: c.title, citation: c.citation })),
    })
  } catch (err) {
    const status = err?.status ?? err?.response?.status
    res.status(status === 429 ? 429 : 500).json({
      error:
        status === 429
          ? 'HandBook is busy right now. Please try again in a moment.'
          : 'Something went wrong answering that. Please try again.',
    })
  }
}
