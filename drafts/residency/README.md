# Residency agreement and involuntary discharge — 13-state findings

Completed 2026-07-30. Eleven states researched in parallel against the method in
`../residency-research-scope.md`; California and Minnesota transcribed from the earlier
two-state pilot. One file per state, each answering the same seven questions with verbatim
quotes, exact citations, source URLs and retrieval dates.

**Nothing here has been written into `api/_corpus.js` yet.** Per the scope doc, the sixth
`-residency` topic lands as one batch or it lights up the missing-topic card on the other
38 states. Read "Before publishing" at the bottom first.

---

## The headline: the scope doc's question was too small

The pass was designed around "who requires the notice to state the appeal right, the way
Minnesota does." That question has an answer (six states, below), but it turned out to be
the wrong frame, for two reasons.

**First, Minnesota is the floor of the strong group, not the ceiling.** Three states do
more. Massachusetts makes the *Department* file the case and carries the burden of proof.
Ohio shifts the burden to the operator and requires the appeal right be explained orally
"in a manner the individual understands," with Disability Rights Ohio's phone number on
the notice. Oregon puts the eviction process and appeal rights inside the residency
agreement itself and lets the hearing be requested orally.

**Second, "is there an appeal" has more than two answers.** Five distinct architectures
turned up, and scoring them on one axis would misrepresent at least three of them:

| Architecture | States | What it means |
|---|---|---|
| Administrative hearing | MN, OH, OR, NY, IL, MA, WI (CBRF only), NJ | An agency forum decides |
| Judicial defense | CA, TX (housing side) | You defend an eviction in court, on your own initiative |
| Counsel instead of a forum | WA | Free lawyer named on the notice; no hearing right against the provider |
| Continuity without recourse | PA | Provider must keep serving until a replacement exists; the decision is never reviewed |
| Neither | FL | No administrative appeal, and no tenancy route either |

Washington deserves care. `WAC 388-76-10617(2)` requires the notice to say that "legal
counsel at public expense is available to represent the resident's interests in the
transfer or discharge process." For a frightened person that may be worth more than a
hearing right they must exercise alone — but it is conditional on legislative
appropriation, and it is not a forum. Present it as its own category, never as a failure.

---

## Question 5 — must the notice itself state the appeal right?

The strongest single ask, and the answer is better than the pilot predicted.

**Yes:** MN, OH, OR, IL, MA, WI (CBRF only)
**Partly:** NY (waiver service reductions only), TX (services notice only, never housing)
**No:** CA, PA, WA (states a counsel right instead), FL, NJ

Ohio is the model to point at, because it does not stop at putting words on paper:

> "(iv) The individual's right to appeal the transfer or termination of services and the
> process to do so; and (v) The telephone number and address of disability rights Ohio."
> — `OAC 5123-3-05(C)(3)(a)`

plus a duty to "Explain the transfer or termination of services and appeal rights to the
individual in a manner the individual understands."

Pennsylvania is the cleanest negative, because its rule is exhaustive. `55 Pa. Code
§ 6100.304(c)` lists all seven things a discharge notice must contain, and none of the
seven is a right to contest anything. You can quote the complete list and let it argue
for itself.

## Question 6 — is there a stay?

**Automatic, no motion required:** NY, IL, OH, WI (CBRF), MA, NJ
**On request:** MN, OR, WA (against the agency only), TX (services only)
**None:** CA, PA (continuity duty instead), FL

Two are worth quoting. New York requires the Commissioner's own approval to move anyone
mid-review (`14 NYCRR § 633.12(a)(8)(i)(e)(3)`). Massachusetts is flatter still:

> "During the pendency of the adjudicatory proceeding, the proposed transfer shall not
> occur." — `115 CMR 6.63(4)(b)`

New Jersey's is the oddity: `N.J.A.C. 10:44A-4.2(b)1` continues services until an
alternate placement exists, with **no appeal needed to trigger it**.

## Notice periods

45 days PA · 45 days MA (transfer) · 30 days CA (under a year) / 60 (over a year) ·
90/60/30 MN by service type · 30 OH · 30 OR · 30 WA (tenancy) / 60 (DDA services) ·
30 WI · 30 (code) vs 60 (policy) IL — unresolved · 60-day cure TX · 30 FL ·
60/30 NJ but only in a manual that covers one of its two programs · **NY: none at all**

New York has no minimum advance-notice period anywhere in regulation. Well searched, not
provably exhaustive — the likeliest hiding place is an image-only scan with no text layer.

---

## Four findings that change how this should be written

**1. A single per-state verdict would be a lie in at least three states.** Wisconsin
protects CBRF residents to Minnesota's standard and gives adult family home residents no
appeal, no notice-content rule and no stay — and AFHs are where most Wisconsin adults with
developmental disabilities live. Ohio's protections stop at licensed residential
facilities; shared living gets a contract clause and nothing else. Texas splits by *which
lever the provider pulls*: the services notice must state the hearing right, the housing
notice need not. Whatever ships must carry the category with the answer.

**2. Losing your home and losing your services are different legal events, and states
protect them unevenly.** Massachusetts has the best transfer protection found and
expressly excludes moves caused by contract termination, procurement, lease termination or
foreclosure from any of it. Texas is judicial on housing and administrative on services.
Washington's counsel-on-the-notice rule lives in the assisted-living rules, not the DDA
provider rules. A person can be fully protected against one route out of their home and
entirely exposed to the other.

**3. Official state documents get their own law wrong, repeatedly.** Wisconsin's CMS
transition plan presents a "quotation" of `DHS 83.29` whose words are not in that section.
Illinois's own template cites the stay to a rule containing no stay procedure — and its
wording is near-verbatim Minnesota's `§ 245D.10`. A New Jersey circular still operative
from 2005 cites five subsections that no longer exist. Massachusetts guidance miscites its
own definition section. Pennsylvania and Florida each have a section labeled with appeal
language that belongs to a *different party* — the provider or the licensee, not the
resident. Every one of these would have produced a wrong answer from a search summary.
Trap #4 is not an edge case; it is the normal condition of this material.

**4. States are copying each other's text.** Illinois's stay language is near-verbatim
Minnesota's. That means "who does this well" is partly a question of who copied whom, and
it makes the advocacy ask easier: this is not a theoretical drafting problem, it is
language that already travels between states.

---

## Before publishing

Per-file verification notes carry the detail. The items that need a human, in priority
order:

1. **Texas** — every official Texas primary site was unfetchable (SOS viewer is an SPA
   rejecting non-browser clients, statutes site is an Angular shell, agency site 403s).
   All quotes are from the Cornell LII mirror. Legitimate, but this is the least directly
   sourced state in the set. Click list is in `tx.md`.
2. **California** — the pilot's citations came via Disability Rights California rather
   than direct from the CCR. Needs a tier-1 pass on `22 C.C.R. § 80068` and `§ 80068.5`.
3. **California, unresolved** — whether the ARF regulations carry the RCFE-style
   requirement that the admission agreement describe an appeal process. If they do,
   California's answer to question 5 changes and `ca.md` must be rewritten. Do not guess.
4. **Massachusetts** — four key sources 403'd and were read from the Internet Archive.
   Confirm currency against the live URLs listed in `ma.md`.
5. **Pennsylvania** — medicaid.gov's settings-rule compliance document 403s and is the
   document most likely to settle the landlord/tenant question.
6. **New York** — `633.12` text came from Cornell LII, not the official NYCRR host.
   Separately, the OPWDD "Community Placement Procedures" book is an image-only scan and
   is the likeliest home of any notice timeline.
7. **New Jersey** — the sample residency agreement page 404s and is the key missing
   document. The Medicaid 10-day aid-continuing figure is marked **do-not-publish**.
8. **Minnesota** — the pilot never answered questions 1 and 2. Recorded as gaps.
9. **Illinois** — 30-day code floor versus 60-day policy is an unresolved tier-1/tier-2
   conflict. Do not collapse it into one number.

## Then the mechanical work

Once the content is verified, the scope doc's one-line changes: a `residency` bucket in
`STATE_SUFFIX_MAP` and `STATE_GROUPS_ORDER` in `App.jsx`, a `{ id: 'residency', suffixes:
['residency'] }` entry in `COMPARE_TOPICS` in `compareStates.js`, and a `csTopicResidency`
string in en/es/tl.

38 states will have no `-residency` chunk. The missing-topic card already states that
honestly, and the compare tab already reports silent states as a count — so shipping 13 is
honest, not partial.
