// Guards the cross-state compare ranking. Runs before every build.
//
// The rule worth protecting is the FIRST assertion. An early version of
// compareStates() scored a chunk on any single term overlap, so asking about
// "residency agreement eviction appeal lease" returned eight states' fair-hearing
// text - because the word "appeal" matched - and read exactly like an answer. For
// someone building an advocacy case, a confident wrong answer is worse than an empty
// one. If that assertion ever fails, the coverage threshold has been weakened; fix
// the threshold rather than the test.
//
// Run: node scripts/check-compare.mjs
import { compareStates } from '../src/compareStates.js'

let failed = 0
const check = (label, ok, detail = '') => {
  if (!ok) { failed++; console.error(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}`) }
  else console.log(`  ok    ${label}`)
}

console.log('compare-states ranking:')

// 1. A question the corpus genuinely cannot answer must return nothing, and say which
//    words drew a blank.
const gap = compareStates('residency agreement eviction appeal lease', { topic: 'all', exclude: 'CA' })
check('an unanswerable question returns no hits', gap.matched === 0, `got ${gap.matched}`)
check('...and names the terms that found nothing',
  ['residency', 'eviction', 'lease'].every((t) => gap.unmatchedTerms.includes(t)),
  gap.unmatchedTerms.join(','))
check('...and counts every state as silent', gap.silent === gap.searched)

// 2. Real questions still work, and lead with verifiable specifics.
const deadline = compareStates('appeal deadline', { topic: 'appeals', exclude: 'CA' })
check('a real question finds states', deadline.matched > 10, `got ${deadline.matched}`)
check('the top hit quotes an actual deadline',
  /\d+\s+(calendar |business |working )?days?/i.test(deadline.hits[0]?.excerpt || ''))
check('the state you asked from is excluded', !deadline.hits.some((h) => h.code === 'CA'))
check('every hit carries a citation', deadline.hits.every((h) => !!h.citation))

// 3. Counts must describe the whole result set, not the shown slice - otherwise the
//    UI implies the unshown states were checked and rejected.
check('matched counts all states, not the page', deadline.matched >= deadline.hits.length)
check('silent + matched accounts for every state', deadline.matched + deadline.silent === deadline.searched)

// 4. Topic browse with no query ranks by specificity alone.
const browse = compareStates('', { topic: 'appeals', exclude: 'CA' })
check('empty query still ranks by specificity', browse.hits[0]?.signals.length > 0)

// 5. Order must be stable, or the list reshuffles between openings and cannot be
//    compared against notes taken a minute earlier.
const again = compareStates('appeal deadline', { topic: 'appeals', exclude: 'CA' })
check('results are stable across runs',
  JSON.stringify(again.hits.map((h) => h.code)) === JSON.stringify(deadline.hits.map((h) => h.code)))

if (failed) {
  console.error(`\ncompare-states: ${failed} check(s) failed`)
  process.exit(1)
}
console.log('compare-states: all checks passed\n')
