# Vermont state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://ddsd.vermont.gov/
- https://ddsd.vermont.gov/services-providers/services
- https://dail.vermont.gov/divisions/ddsd
- https://legislature.vermont.gov/statutes/fullchapter/18/204A
- https://law.justia.com/codes/vermont/title-18/chapter-204a/section-8724/
- https://dvha.vermont.gov/members/appeals-and-fair-hearings
- https://dlp.vermont.gov/aps
- https://dlp.vermont.gov/aps/make-aps-report
- https://disabilityrightsvt.org/
- https://disabilityrightsvt.org/contact/

chunks:
```js
{
  id: 'vt-agency-waivers',
  title: 'Vermont: who runs HCBS and the main waiver program',
  citation: 'Vermont Department of Disabilities, Aging and Independent Living (DAIL), Developmental Disabilities Services Division (DDSD); Developmental Disabilities (DD) Home and Community-Based Services Waiver under Vermont Global Commitment to Health',
  text: `In Vermont, the Department of Disabilities, Aging and Independent Living, known as DAIL, oversees services for people with developmental disabilities. Inside DAIL, the Developmental Disabilities Services Division, called DDSD, runs the day-to-day programs. Vermont pays for home and community-based services through the Developmental Disabilities Home and Community-Based Services Waiver, which operates under the state's larger Global Commitment to Health Medicaid waiver rather than a standalone federal 1915(c) waiver like most states use. These services can include residential supports, employment help, and behavioral supports, and they are designed so you can live in your own home or community instead of an institution. Local Designated Agencies deliver most services on the ground under contract with DDSD. If you are not sure where to start, DDSD or your local Designated Agency can walk you through eligibility and how to apply.`,
},
{
  id: 'vt-rights',
  title: 'Vermont: your rights under the Developmental Disabilities Act',
  citation: '18 V.S.A. chapter 204A (Developmental Disabilities Act), section 8724 (Principles of service)',
  text: `Vermont has a state law called the Developmental Disabilities Act, found in Title 18, chapter 204A of Vermont law. Section 8724 lays out the principles every program funded under this law must follow. It says you have the opportunity to live in a safe environment with respect and dignity, to live with your family or in a home of your own choosing, to attend neighborhood schools, to work, to take part in community activities, and to get the same kind of community support and services that other Vermonters can access. These principles guide how DDSD and its Designated Agencies are supposed to design and deliver your services. If a service does not feel like it lines up with these principles, you can raise that concern with your case manager or with DDSD.`,
},
{
  id: 'vt-service-plan',
  title: 'Vermont: your service plan (the Individual Support Agreement)',
  citation: 'Vermont DDSD person-centered planning process; Individual Support Agreement (ISA)',
  text: `In Vermont, your plan is usually called an Individual Support Agreement, or ISA. It is a written agreement between you, your guardian if you have one, and the provider or providers giving you services, and it spells out the supports you will get. A case manager at your Designated Agency leads a person-centered planning process with you to build this plan around your goals and needs, then the plan goes to the state for approval. Vermont also uses an individualized budget tied to your plan, and the state reconciles what services were actually delivered against what was authorized. Your case manager is responsible for monitoring your services over time and helping with the redetermination process, which generally happens on an annual cycle. You can ask your case manager to revisit your plan any time your needs change.`,
},
{
  id: 'vt-appeals',
  title: 'Vermont: how to appeal if services are denied or cut',
  citation: 'Vermont Human Services Board fair hearing process; Department of Vermont Health Access (DVHA)',
  text: `If Vermont denies, reduces, or ends your Medicaid or HCBS services, you can ask for a state fair hearing before the Human Services Board, which is independent of the agency that made the decision. Deadlines can vary by the type of notice you received, so check your notice carefully for the exact number of days you have to appeal. If you are already getting a service and you ask for a hearing before the date the change is set to take effect, you generally have the right to keep getting that service at the same level while your appeal is pending. You can also get free help with a Medicaid appeal from the Vermont Office of the Health Care Advocate. Do not wait to ask for help if a notice is confusing, since acting before the effective date matters for keeping your services in place during the appeal.`,
},
{
  id: 'vt-complaints-pna',
  title: 'Vermont: reporting problems and free advocacy help',
  citation: 'Vermont Adult Protective Services 1-800-564-1612; Disability Rights Vermont 1-800-834-7890',
  text: `If you or someone you know is being abused, neglected, or exploited, call Vermont Adult Protective Services at 1-800-564-1612. This hotline is run by the state's Division of Licensing and Protection. If someone is in immediate danger, call 911 first. For free legal help protecting your rights, contact Disability Rights Vermont at 1-800-834-7890. They are Vermont's official protection and advocacy organization for people with disabilities, and their services are free. You will not get in trouble for reporting a problem or for asking them for help.`,
},
```

flags: DDSD and DVHA program pages returned 403 to automated fetch, so waiver, ISA, and appeals details were confirmed through search-engine grounding of those official pages and related legislature.vermont.gov and law.justia.com pages rather than a direct successful fetch of every page; the team should re-verify current wording live before shipping. Appeal deadlines are described as varying by notice type (search results showed both 90-day and 120-day figures depending on program) so the chunk hedges to "check your notice" for the exact number.
