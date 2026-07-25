# Scope: residency-agreement / discharge-appeal content pass

Adds the one topic the corpus cannot currently answer: what a state requires to be in
a provider-owned home's residency agreement, and what happens when a provider moves
to end the placement. Written 2026-07-24 after a two-state pilot that verified the
method against primary sources.

Prerequisite already shipped: the Compare tab (`src/compareStates.js`) makes a gap
legible in one search instead of fifty. This pass fills the gap it exposes.

---

## 1. The pilot changed the question. Read this first.

The premise was "California has no appeal language in its residency agreements, what
do other states require?" That is close, but the precise version is sharper and makes
a better argument.

**California DOES have discharge protection. It is a COURT defense, not an
administrative appeal.** Verified against Disability Rights California (a P&A, already
a trusted source for this corpus):

- 30-day written notice under a year of residency, 60 days over a year, and 3 days
  only with good cause AND advance Community Care Licensing approval.
  `22 C.C.R. § 80068.5(a)-(b)`
- The admission agreement must list "the conditions under which your agreement can be
  ended". `22 C.C.R. § 80068(c)(7)`
- The remedy is judicial: "You have the right to defend your eviction in court if you
  think there was something procedurally wrong with your eviction, there was no 'good
  cause' for your eviction, or your eviction was in retaliation for something you
  did." `C.C.P. § 1170`, with possessions and locks protected during proceedings under
  `CIV § 789.3`.

**Minnesota gives an administrative appeal WITH a stay, and forces the notice itself
to say so.** Verified verbatim from the MN Revisor (official statute text),
`Minn. Stat. § 245D.10, subd. 3a`:

> "Notice of the proposed termination of service, including those situations that
> began with a temporary service suspension, must be given at least 90 days prior to
> termination of services under paragraph (b), clause (7), 60 days prior to
> termination when a license holder is providing intensive supports and services
> identified in section 245D.03, subdivision 1, paragraph (c), and 30 days prior to
> termination for all other services licensed under this chapter." (subd. 3a(e))

and the notice must contain:

> "(iii) the person's right to appeal the termination of services under section
> 256.045, subdivision 3, paragraph (a); and (iv) the person's right to seek a
> temporary order staying the termination of services according to the procedures in
> section 256.045, subdivision 4a or 6, paragraph (c)." (subd. 3a(d))

So the real comparison is **forum and burden**: California sends a person to housing
court to defend an unlawful detainer, on their own initiative, after the fact.
Minnesota gives an administrative appeal through the DHS hearing system, requires the
provider's own notice to tell the person that right exists, and lets them ask for a
stay so they are not moved while it is decided.

That is a concrete, quotable, apples-to-apples ask: *the notice must state the appeal
right, and there must be a way to stay the move.*

**Open conflict, do not resolve by guessing.** A CDSS Residential Care Facilities for
the Elderly manual appears to require the admission agreement to describe an appeal
process. RCFE is a different licensing category from the Adult Residential Facility
where most DD adults live. Anyone doing this pass must confirm whether the ARF
regulations carry an equivalent, and must not import an RCFE rule into an ARF answer.

---

## 2. What gets added

A sixth topic per state pack, matching the existing five-suffix schema so the Rights
UI, the compare scan, and the chat retrieval all pick it up with no code change:

```
{ id: '<xx>-residency',
  title: '<State>: your housing agreement and being asked to leave',
  citation: '<primary source, exact section>',
  text: '<plain language, same register as the other chunks>' }
```

Register-check: read three existing `-appeals` chunks first and match them. Plain
language, no legalese without immediate explanation, soft on anything uncertain, and
never a number we could not source.

Two mechanical follow-ups once the first chunk exists:
- `STATE_SUFFIX_MAP` and `STATE_GROUPS_ORDER` in `App.jsx` gain a `residency` bucket
  (one line each; the missing-topic honesty card already handles states without one).
- `COMPARE_TOPICS` in `compareStates.js` gains `{ id: 'residency', suffixes: ['residency'] }`
  plus its `csTopicResidency` string in en/es/tl.

**Source-document library (the part that makes it usable for advocacy).** A chunk is a
summary; an argument needs the words. Alongside each chunk, store:

```
{ state, quote: '<VERBATIM, unedited>', cite: '<exact section>',
  url: '<official source>', retrieved: '2026-07-24' }
```

Verbatim and dated is the whole point. Kyle's use case is walking into a meeting and
saying "Minnesota requires this, here is the sentence, here is the citation." A
paraphrase cannot do that job, and an undated quote rots silently.

---

## 3. Source hierarchy

Work down this list and stop at the highest tier that answers the question:

1. **The state's own statute or regulation text** on its official site (revisor,
   legislature, or the state's admin-code host). This is tier one because it is the
   thing you quote.
2. **The licensing agency's regulation manual or provider handbook** (the CDSS-style
   PDFs). Good for the operative rule when the statute delegates.
3. **The CMS Statewide Transition Plan.** Every state had to describe how its settings
   meet `42 CFR 441.301(c)(4)(vi)(A)` (legally enforceable agreement, eviction
   protections comparable to landlord/tenant law, appeal process). This is the single
   best *finding aid* when tiers 1 and 2 are hard to search, because the state had to
   name its own authority. Cite what it points AT, not the plan.
4. **The state's P&A publication.** Reliable and already trusted by this corpus, and
   usually the clearest plain-language framing. Still trace to the underlying cite.

Not acceptable as the sole basis: a law-firm blog, an advocacy explainer without a
citation, an AI summary, or another state's rule assumed to generalize.

**Verification bar, same as the 50-state pass:** every number, section, agency name
and deadline traced to tier 1-4 and recorded in
`drafts/stateguide-verification-notes.md` style, marking direct-fetch versus
search-corroborated, and listing any site that blocked automated fetch so a human can
click through.

---

## 4. Per-state work unit

For each jurisdiction, answer exactly these, or record "could not confirm":

1. Is a written residency/admission agreement required for provider-owned DD housing?
   Which regulation?
2. Does state landlord/tenant law apply to these settings, or is there a carve-out?
   (This is the hinge of `(vi)(A)`.)
3. Notice period(s) before an involuntary discharge, and any short-notice exception
   plus who must approve it.
4. **Is there an appeal, and is it administrative or judicial?** The comparison point.
5. **Must the notice itself state the appeal right?** The strongest single ask, and
   the thing Minnesota does that most states likely do not.
6. Is there a stay / "services continue pending appeal" mechanism?
7. Verbatim quote + exact cite + URL + retrieval date for the library.

Expect a real answer to 1-3 almost everywhere and a genuine absence on 5-6 in most
states. **Absence is a finding, not a failure.** The compare UI already displays how
many states have nothing, and the missing-topic card already states a gap honestly, so
a truthful "no such requirement found" is publishable output.

---

## 5. Effort, and the recommendation

Done to the verification bar above, this is roughly 20-40 minutes per jurisdiction:
17 to 34 hours for all 51. The prior 50-state pass absorbed that with nine parallel
research agents.

**Recommendation: do not do all 51 first.** Do a prioritized ~12 and ship.

The value here is "show me who handles this well so I can point at it", not census
coverage. Twelve well-sourced states with real quotes answer the question completely;
the other 39 mostly add "no specific requirement found", which the compare UI already
communicates as a count without anyone researching it.

Suggested first twelve, chosen for a likely-strong provider-licensing statute, an
existing DD rights statute in the corpus, or population reach:
MN (done), OR, WA, OH, NY, MA, WI, PA, IL, TX, FL, NJ.
Plus CA, which is not research so much as writing up what the pilot already verified,
and which is the baseline every comparison runs against.

Ship those, watch which questions people actually ask through the compare tab, and let
that decide whether states 13-51 are worth the hours.

**Blocking question for Kyle:** whether to authorize parallel research agents. At one
state at a time this is several long sessions; fanned out it is roughly one. That is
his call, not an assumption to make on his behalf.

---

## 6. Traps found in the pilot

- **Facility category is not a detail.** ARF vs RCFE vs ICF/DD vs supported living can
  each carry different discharge rules in the same state. Always record which category
  the rule governs, and never let a search result from one category answer for another.
- **"Appeal" is ambiguous and the ambiguity is the story.** Court defense against an
  unlawful detainer, administrative fair hearing, and an internal provider grievance
  are three different things with different burdens. Say which one every time.
- **Service termination is not always the same as eviction.** Minnesota regulates
  ending the SERVICE (245D); California's is a tenancy action. A state can protect one
  and not the other, and a person can lose a home either way. Check both.
- **Search summaries drift from the source.** In this pilot a summary asserted the
  admission agreement must contain an appeal process; the primary source said it must
  contain the conditions under which the agreement can be ended. Those are not the
  same sentence. Fetch the source.

---

## 7. Where the pilot output goes

The MN and CA findings above are verified and ready to become the first two entries.
They are deliberately parked here rather than written into `api/_corpus.js`, because
adding a sixth topic to two states out of fifty-one would light up the missing-topic
card on forty-nine of them. Land the first batch together.
