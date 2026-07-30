# California — residency agreement and involuntary discharge

State: California (CA)
Written: 2026-07-30
Source: transcribed from the two-state pilot recorded in `../residency-research-scope.md`
(verified 2026-07-24), not re-researched. Anything below marked **unresolved** was
unresolved at pilot time and still is.

California is the baseline every comparison in this pass runs against, because it is the
corpus's home state and because its answer to question 4 is the interesting one: the
protection exists, but the forum is a court, not an agency.

---

## 1. Is a written residency/admission agreement required?

Yes, for Adult Residential Facilities. The admission agreement must list "the conditions
under which your agreement can be ended." `22 C.C.R. § 80068(c)(7)`.

Note carefully what this does **not** say. It requires the conditions for ending the
agreement to be stated. It does **not** require the agreement to describe an appeal
process. The pilot specifically caught a secondary source asserting the stronger version;
the primary source says the weaker one.

## 2. Does landlord/tenant law apply, or is there a carve-out?

Landlord/tenant law applies — this is the crux of California's approach. The remedy for a
wrongful discharge is a judicial one: defending an unlawful detainer action in court under
`C.C.P. § 1170`, with possessions and locks protected during proceedings under
`CIV § 789.3`.

## 3. Notice periods, and the short-notice exception

Governed by `22 C.C.R. § 80068.5(a)-(b)`:

- **30 days** written notice where the resident has lived there under a year
- **60 days** where the resident has lived there over a year
- **3 days** only with good cause **AND** advance approval from Community Care Licensing

The 3-day route requiring prior CCL approval is the part worth quoting: the short-notice
exception is gated on a regulator, not on the provider's own judgment.

## 4. Is the appeal administrative or judicial?

**Judicial.** This is California's defining feature in this comparison. There is no
administrative fair hearing for the discharge itself. Per Disability Rights California:
"You have the right to defend your eviction in court if you think there was something
procedurally wrong with your eviction, there was no 'good cause' for your eviction, or
your eviction was in retaliation for something you did."

The burden of initiating sits with the resident, in court, after the fact.

## 5. Must the notice itself state the appeal right?

**No requirement found.** `22 C.C.R. § 80068(c)(7)` requires the *agreement* to state the
conditions under which it can be ended; nothing located in the pilot requires the
*discharge notice* to tell the person they may contest it or how.

This is the sharpest contrast with Minnesota, which requires exactly that.

## 6. Is there a stay / services-continue mechanism?

**No administrative stay found.** What exists is the practical effect of the judicial
process itself: an unlawful detainer must be litigated, and `CIV § 789.3` protects
possessions and locks during proceedings. That is not the same thing as an order staying
the move pending a decision, and it should not be described as if it were.

## 7. Source library

```
{ state: 'CA',
  quote: 'the conditions under which your agreement can be ended',
  cite: '22 C.C.R. § 80068(c)(7)',
  url: '<pending — see verification notes>',
  retrieved: '2026-07-24' }

{ state: 'CA',
  quote: "You have the right to defend your eviction in court if you think there was something procedurally wrong with your eviction, there was no 'good cause' for your eviction, or your eviction was in retaliation for something you did.",
  cite: 'Disability Rights California (P&A publication), citing C.C.P. § 1170',
  url: '<pending — see verification notes>',
  retrieved: '2026-07-24' }
```

## Verification notes

- All findings above are **as recorded in the pilot**, which verified them against
  Disability Rights California, a P&A publication and a tier-4 source already trusted by
  this corpus. The regulation text at `22 C.C.R. § 80068`, `§ 80068.5`, `C.C.P. § 1170`
  and `CIV § 789.3` was cited by that source rather than fetched section-by-section from
  the California Code of Regulations directly.
- **Before publication this file needs a tier-1 pass**: fetch `22 C.C.R. § 80068` and
  `§ 80068.5` from the official CCR host, confirm the subsection lettering, and record
  exact URLs and a current retrieval date. The pilot's substance is expected to hold; the
  citations need to be quotable.
- **UNRESOLVED, do not guess.** A CDSS manual for Residential Care Facilities for the
  Elderly appears to require the admission agreement to describe an appeal process. RCFE
  is a **different licensing category** from the Adult Residential Facility where most
  adults with developmental disabilities live. Whether the ARF regulations carry an
  equivalent is unconfirmed. Do not import the RCFE rule into an ARF answer. If the ARF
  rule turns out to exist, answer 5 changes materially and this file must be rewritten.
- Category covered here: **Adult Residential Facility (ARF)**. Not covered: RCFE,
  ICF/DD, or supported/independent living, each of which may differ.
