# Minnesota — residency agreement and involuntary discharge

State: Minnesota (MN)
Written: 2026-07-30
Source: transcribed from the two-state pilot recorded in `../residency-research-scope.md`.
The statute text below was verified **verbatim from the Minnesota Revisor** (official
statute host, tier 1) on 2026-07-24.

Minnesota is the strong example this whole pass exists to find. It answers yes to the two
questions most states are expected to answer no to: the notice must state the appeal
right, and a stay can be requested.

Important scope note: `245D` regulates **termination of SERVICES**, not eviction from a
tenancy. That distinction is the point, not a technicality — see the comparison below.

---

## 1. Is a written residency/admission agreement required?

Not established by the pilot. `Minn. Stat. § 245D.10` governs the service termination
process rather than the housing agreement itself. **Needs a tier-1 pass** before
publication — likely in the 245D service-agreement provisions or the housing-with-services
statutes, which were not searched.

## 2. Does landlord/tenant law apply, or is there a carve-out?

**Could not confirm from the pilot.** Not researched. This matters for Minnesota
specifically, because if 245D protects the service while tenancy law separately governs
the housing, a person could be protected on one axis and exposed on the other.

## 3. Notice periods

From `Minn. Stat. § 245D.10, subd. 3a(e)`, verbatim:

> "Notice of the proposed termination of service, including those situations that began
> with a temporary service suspension, must be given at least 90 days prior to termination
> of services under paragraph (b), clause (7), 60 days prior to termination when a license
> holder is providing intensive supports and services identified in section 245D.03,
> subdivision 1, paragraph (c), and 30 days prior to termination for all other services
> licensed under this chapter."

So: **90 / 60 / 30 days**, tiered by service type rather than by length of residence
(which is how California tiers it).

## 4. Is the appeal administrative or judicial?

**Administrative.** An appeal of the service termination runs through the Department of
Human Services hearing system under `Minn. Stat. § 256.045, subd. 3(a)`.

## 5. Must the notice itself state the appeal right?

**Yes — and this is the strongest single finding in the pass so far.**
`Minn. Stat. § 245D.10, subd. 3a(d)`, verbatim, requires the notice to contain:

> "(iii) the person's right to appeal the termination of services under section 256.045,
> subdivision 3, paragraph (a); and (iv) the person's right to seek a temporary order
> staying the termination of services according to the procedures in section 256.045,
> subdivision 4a or 6, paragraph (c)."

The provider's own termination notice has to tell the person the right exists. A right
nobody is told about is not usable by the people this app serves.

## 6. Is there a stay / services-continue mechanism?

**Yes.** Clause (iv) above: the right to seek a temporary order staying the termination,
under `Minn. Stat. § 256.045, subd. 4a` or `subd. 6(c)`. The person can ask not to be
moved while the appeal is decided.

## 7. Source library

```
{ state: 'MN',
  quote: 'Notice of the proposed termination of service, including those situations that began with a temporary service suspension, must be given at least 90 days prior to termination of services under paragraph (b), clause (7), 60 days prior to termination when a license holder is providing intensive supports and services identified in section 245D.03, subdivision 1, paragraph (c), and 30 days prior to termination for all other services licensed under this chapter.',
  cite: 'Minn. Stat. § 245D.10, subd. 3a(e)',
  url: 'revisor.mn.gov',
  retrieved: '2026-07-24' }

{ state: 'MN',
  quote: "(iii) the person's right to appeal the termination of services under section 256.045, subdivision 3, paragraph (a); and (iv) the person's right to seek a temporary order staying the termination of services according to the procedures in section 256.045, subdivision 4a or 6, paragraph (c).",
  cite: 'Minn. Stat. § 245D.10, subd. 3a(d)',
  url: 'revisor.mn.gov',
  retrieved: '2026-07-24' }
```

## Verification notes

- Questions 3, 4, 5 and 6: **direct-fetch, tier 1**, verbatim from revisor.mn.gov.
- Questions 1 and 2: **not researched in the pilot.** Recorded as gaps rather than
  answered. Both need a pass before this state is published.
- The source library entries need the full deep-link URL, not just the host, and a
  current retrieval date at publication.
- Category covered: services licensed under **chapter 245D**. Whether the same protections
  reach ICF/DD or other settings was not checked.

---

## The comparison this pass is built to make

California and Minnesota both protect a person against being moved out. They are not the
same protection, and the difference is **forum and burden**:

| | California | Minnesota |
|---|---|---|
| Action regulated | Eviction (tenancy) | Termination of services |
| Forum | Housing court | DHS administrative hearing |
| Who must act first | The resident, after the fact | The resident, but on notice |
| Notice must state the right? | No requirement found | **Yes**, expressly |
| Stay available? | No administrative stay | **Yes**, on request |

That table is the quotable ask: *the notice must state the appeal right, and there must be
a way to stay the move.* Both halves are in one Minnesota subdivision, which makes it a
clean model to point at.
