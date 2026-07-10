// TEAM PLAYBOOK - vetted, plain-language answers your team writes by hand.
// Underscore prefix = not exposed as an API route (same as _corpus.js).
//
// These rank ABOVE the raw regulations: when an entry matches a question,
// HandBook leads with it. This is where your team captures the local nuance
// the statutes don't spell out (how a particular regional center actually
// handles something, a practical next step, a common misunderstanding).
// Everything here is treated as trusted, so keep it accurate.
//
// To add an answer, add an object to the PLAYBOOK array below:
//   {
//     id:   'unique-kebab-id',            // any unique string
//     q:    'Short description of the situation this answers',
//     tags: ['keywords','that','trigger','this'],   // lowercase; what a user might type
//     a:    `Your team's plain-language answer. Cite law in parentheses when
//            you can, e.g. (WIC 4731). Plain text only, no markdown.`,
//   }
//
// An empty array changes nothing - the app answers from regulations alone
// until you add entries. Each push to main auto-deploys, so new answers go
// live within a minute or two.

export const PLAYBOOK = [
  // ---- Example template (commented out). Copy it, uncomment, and edit: ----
  // {
  //   id: 'locked-fridge-local-nuance',
  //   q: 'Locked refrigerator in a licensed group home',
  //   tags: ['fridge', 'refrigerator', 'food', 'locked', 'kitchen', 'snacks'],
  //   a: `A blanket locked refrigerator is not allowed. Access to food at any
  //       time is a right in provider-owned homes (42 CFR 441.301(c)(4)(vi)(C)).
  //       The only exception is an individual, documented modification in the
  //       person-centered plan - never a house rule. First step: ask your
  //       service coordinator to review it at an IPP meeting; if it is not
  //       properly documented, you can file a 4731 rights complaint.`,
  // },
]

// Lightweight, self-contained matcher (kept here so this file has no external
// deps - Vercel api/ functions are unbundled ESM). Pure and testable.
const STOP = new Set(['the', 'and', 'for', 'that', 'this', 'with', 'are', 'you', 'can', 'what', 'they', 'have', 'about', 'does', 'how', 'their', 'them', 'she', 'his', 'her', 'was', 'not', 'but', 'get', 'has', 'who', 'when', 'where', 'why', 'your', 'from', 'like'])

function tokens(s) {
  return (String(s).toLowerCase().match(/[a-z0-9]{3,}/g) || []).filter((t) => !STOP.has(t))
}

// Score each entry against the query by keyword overlap: a tag hit is worth
// more than a word in the q text. Returns the best `limit` entries that clear
// a minimum score, so weak/coincidental matches don't inject team guidance.
export function matchPlaybook(query, entries = PLAYBOOK, limit = 2) {
  const terms = new Set(tokens(query))
  if (terms.size === 0) return []
  const scored = entries.map((e) => {
    const tagSet = new Set((e.tags || []).flatMap((t) => tokens(t)))
    const qSet = new Set(tokens(e.q || ''))
    let score = 0
    for (const t of terms) {
      if (tagSet.has(t)) score += 3
      if (qSet.has(t)) score += 1
    }
    return { e, score }
  })
  return scored
    .filter((s) => s.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.e)
}
