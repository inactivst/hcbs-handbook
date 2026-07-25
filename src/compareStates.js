// ─── COMPARE STATES ───────────────────────────────────────────────────────────
// "California has no appeal language in its residency agreements. What do other
// states say?" Before this, answering that meant opening 50 state guides one at a
// time, and most of them would have had nothing to say.
//
// This scans every state pack at once and ranks by DISTINCTIVENESS, not by
// similarity: a state earns its place by saying something SPECIFIC - a deadline, a
// binding obligation, a named statute - not by using the same words as the query.
// Rank purely by keyword overlap and the top of the list fills with the blandest
// restatements of the federal floor, which is the opposite of useful.
//
// Deterministic and offline: no model, no network, no cost. That matters for the
// use case, which is advocacy - you need the state's ACTUAL words and a citation you
// can check, not a paraphrase that might be invented. The AI compare under a chat
// answer is still there for "explain the difference"; this is for "show me who
// actually has language, and quote it".
import { STATES, US_STATES } from '../api/_corpus.js'

// Topic -> the chunk-id suffixes that carry it. Mirrors STATE_SUFFIX_MAP in App.jsx,
// including California's bespoke ids (lanterman-rights / ipp / …), so CA is
// comparable alongside everyone else instead of being a special case.
export const COMPARE_TOPICS = [
  { id: 'all', suffixes: null },
  { id: 'appeals', suffixes: ['appeals', 'medical-appeals'] },
  { id: 'rights', suffixes: ['rights', 'lanterman-rights'] },
  { id: 'plan', suffixes: ['service-plan', 'ipp'] },
  { id: 'programs', suffixes: ['agency-waivers', 'hcbs-compliance'] },
  { id: 'gethelp', suffixes: ['complaints-pna', 'complaints'] },
]

const STOP = new Set(['the', 'and', 'for', 'that', 'this', 'with', 'are', 'you', 'can', 'what', 'they',
  'have', 'about', 'does', 'how', 'their', 'them', 'she', 'his', 'her', 'was', 'not', 'but', 'get',
  'has', 'who', 'when', 'where', 'why', 'your', 'from', 'like', 'any', 'all', 'its', 'may'])

const tokenize = (s) => (String(s || '').toLowerCase().match(/[a-z0-9]{3,}/g) || [])
const terms = (q) => [...new Set(tokenize(q).filter((t) => !STOP.has(t)))]

// ─── The distinctiveness signals ─────────────────────────────────────────────
// Each is something a reader can VERIFY in the quoted text. They double as the
// "why this state" chips in the UI, so the ranking explains itself rather than
// asking anyone to trust a score.
const SIGNALS = [
  // "within 15 calendar days", "90 days" - the single most comparable fact between
  // states, and the thing most likely to differ.
  { id: 'deadline', weight: 4, test: (s) => /\b\d+\s+(calendar\s+|business\s+|working\s+)?days?\b/i.test(s) },
  // Binding language. "must be", "shall provide", "is entitled to" - a real
  // requirement rather than a description of what usually happens.
  { id: 'obligation', weight: 3, test: (s) => /\b(must|shall|is required|are required|is entitled|has the right|may not|cannot)\b/i.test(s) },
  // A citable authority in the prose itself (the chunk always carries a citation
  // field, so that alone would be a constant and tell us nothing).
  { id: 'statute', weight: 3, test: (s) => /(§|\bsection\b|\bchapter\b|\btitle\s+\d|\bact\b|\bcode\b|\bstatute\b|\b\d+\s*CFR\b)/i.test(s) },
  // A door you can actually walk through today.
  { id: 'contact', weight: 2, test: (s) => /(\b1-\d{3}-\d{3}-\d{4}\b|\b\d{3}-\d{3}-\d{4}\b|https?:\/\/|\.gov\b|\.org\b)/i.test(s) },
]

const signalsIn = (text) => SIGNALS.filter((s) => s.test(text))

// Split into sentences without losing the trailing punctuation, so a quoted excerpt
// reads like the source rather than a fragment.
const sentences = (text) => String(text || '')
  .split(/(?<=[.!?])\s+(?=[A-Z(])/)
  .map((s) => s.trim())
  .filter(Boolean)

// The passage a person should actually read: the run of sentences carrying the most
// query terms, widened by one sentence for context and capped so a card stays
// scannable. With no query, lead with the sentences carrying the hard specifics.
function bestExcerpt(text, qTerms, maxChars = 420) {
  const sents = sentences(text)
  if (!sents.length) return String(text || '').slice(0, maxChars)
  const scoreOf = (s) => {
    const toks = new Set(tokenize(s))
    const hits = qTerms.length ? qTerms.filter((t) => toks.has(t)).length : 0
    // No query: rank by how much verifiable specificity the sentence carries.
    return qTerms.length ? hits : signalsIn(s).reduce((n, sig) => n + sig.weight, 0)
  }
  let bestI = 0, best = -1
  sents.forEach((s, i) => { const sc = scoreOf(s); if (sc > best) { best = sc; bestI = i } })
  const out = [sents[bestI]]
  // Widen forward first (the sentence after usually completes the thought), then back.
  let j = bestI + 1
  while (j < sents.length && out.join(' ').length + sents[j].length + 1 <= maxChars) out.push(sents[j++])
  let k = bestI - 1
  while (k >= 0 && out.join(' ').length + sents[k].length + 1 <= maxChars) out.unshift(sents[k--])
  const joined = out.join(' ')
  return joined.length > maxChars ? `${joined.slice(0, maxChars - 1).trimEnd()}…` : joined
}

const suffixOf = (chunkId, code) => chunkId.slice(code.length + 1)

/**
 * Scan every state pack for a topic and/or query.
 *
 * Returns { hits, searched, silent, topicId }:
 *   hits    - ranked [{ code, name, title, citation, excerpt, signals[], score }]
 *   searched- how many states were looked at
 *   silent  - how many had NOTHING specific. This number is the whole point: it is
 *             the honest form of "don't make me check the other 49", and it must be
 *             shown, not quietly dropped.
 */
export function compareStates(query, { topic = 'all', exclude = null, limit = 8 } = {}) {
  const qTerms = terms(query)
  const spec = COMPARE_TOPICS.find((t) => t.id === topic) || COMPARE_TOPICS[0]
  const codes = Object.keys(STATES).filter((c) => c !== exclude)
  const hits = []
  const seenTerms = new Set()

  // How many DISTINCT query terms a chunk must carry to count as a real answer.
  // Without this, asking about "residency agreement eviction appeal lease" returned
  // eight states' fair-hearing text - because the single word "appeal" matched -
  // and read as though those states addressed residency agreements. They do not.
  // A confident-looking wrong answer is the worst possible output for someone
  // building a case, so a long query has to land on at least half its ideas.
  const needed = qTerms.length >= 3 ? Math.ceil(qTerms.length / 2) : 1

  for (const code of codes) {
    const pack = STATES[code]
    const inTopic = (pack.chunks || []).filter((c) =>
      !spec.suffixes || spec.suffixes.includes(suffixOf(c.id, code)))
    if (!inTopic.length) continue

    let bestChunk = null, bestScore = -1, bestExc = '', bestSigs = []
    for (const chunk of inTopic) {
      const titleToks = new Set(tokenize(chunk.title))
      const textToks = new Set(tokenize(chunk.text))
      // A query term in the TITLE is worth more: it means the whole card is about
      // this, not that the word happened to appear somewhere in the prose.
      let relevance = 0
      let covered = 0
      for (const t of qTerms) {
        const inTitle = titleToks.has(t), inText = textToks.has(t)
        if (inTitle) relevance += 3
        if (inText) relevance += 1
        if (inTitle || inText) { covered += 1; seenTerms.add(t) }
      }
      // Too few of the asked-about ideas are here: a coincidence, not an answer.
      if (qTerms.length && covered < needed) continue
      const excerpt = bestExcerpt(chunk.text, qTerms)
      const sigs = signalsIn(excerpt)
      const distinct = sigs.reduce((n, s) => n + s.weight, 0)
      const score = relevance * 2 + distinct
      if (score > bestScore) {
        bestScore = score; bestChunk = chunk; bestExc = excerpt; bestSigs = sigs
      }
    }

    // No signals AND no query overlap = generic prose. Counted as silent rather than
    // padding the list with a state that adds nothing to the comparison.
    if (!bestChunk || bestScore <= 0) continue
    hits.push({
      code,
      name: pack.name || US_STATES[code] || code,
      title: bestChunk.title,
      citation: bestChunk.citation,
      excerpt: bestExc,
      signals: bestSigs.map((s) => s.id),
      score: bestScore,
    })
  }

  // Ties broken alphabetically so the order is stable between runs - a list that
  // reshuffles on every open is impossible to compare against your own notes.
  hits.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
  return {
    hits: hits.slice(0, limit),
    // `matched` is the FULL count, not the shown slice - so the UI can say "12 states
    // have something, showing the top 8" instead of implying 8 is all there is.
    matched: hits.length,
    searched: codes.length,
    silent: codes.length - hits.length,
    // Query words that appear in NO state pack at all. This is what lets the UI name
    // the gap out loud ("nothing on: residency, eviction, lease") rather than leaving
    // someone to guess whether they phrased it wrong or the content is missing.
    unmatchedTerms: qTerms.filter((t) => !seenTerms.has(t)),
    topicId: spec.id,
  }
}
