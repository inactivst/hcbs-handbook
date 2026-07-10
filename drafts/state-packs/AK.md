# Alaska state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://health.alaska.gov/en/services/hcbs-waivers/
- https://health.alaska.gov/en/senior-and-disabilities-services/developmental-disabilities/
- https://health.alaska.gov/media/xadj2xfl/4-3-idd_eligibility-enrollment.pdf
- https://alaskalawhelp.org/resource/fair-hearings
- https://health.alaska.gov/media/obljx4in/uni-08fairhearingrightsnotice.pdf
- https://health.alaska.gov/en/services/aps-report-harm/
- https://www.dlcak.org/contact
- https://law.justia.com/codes/alaska/title-47/chapter-80/article-1/section-47-80-010/

chunks:
```js
{
  id: 'ak-agency-waivers',
  title: 'Alaska: who runs HCBS and the main waiver programs',
  citation: 'Alaska Department of Health, Division of Senior and Disabilities Services (SDS); IDD Waiver, Individualized Supports Waiver (ISW), Alaskans with Physical and Developmental Disabilities (APDD) Waiver',
  text: `In Alaska, the Department of Health runs Medicaid waiver services through the Division of Senior and Disabilities Services, known as SDS. For people with intellectual and developmental disabilities, the main program is the IDD Waiver. SDS also runs the Individualized Supports Waiver, called ISW, and the Alaskans with Physical and Developmental Disabilities Waiver, called APDD, for adults 21 and older who need nursing-level care. These waivers pay for things like respite care, help around the house, residential support, and environmental changes to your home, so you can stay in your community instead of an institution. Alaska has more people wanting services than the state can fund right away, so there is a waitlist. Each year, the state draws a limited number of people from the waitlist to apply for the IDD Waiver. You can call an Aging and Disability Resource Center at 1-877-625-2372 to start the process or ask questions about where you stand on a waitlist.`,
},
{
  id: 'ak-rights',
  title: 'Alaska: your legal rights as a person with a disability',
  citation: 'Alaska Statute 47.80.010 (Rights of persons with disabilities); AS 47.80.020 (Protection and advocacy of rights)',
  text: `Alaska has a state law that protects you if you have a disability. It is AS 47.80.010, and it says you have the same legal rights as everyone else under the U.S. Constitution and Alaska law. You cannot be shut out of a program or service that gets public money just because you have a disability. The law also recognizes that some people may need help using their rights in a meaningful way, and if any right is ever modified for someone, the law requires legal safeguards against abuse of that process. A related section, AS 47.80.020, sets up protection and advocacy of these rights in Alaska. If you feel your rights under this law were not respected, you can ask for help from the state or from Alaska's protection and advocacy organization.`,
},
{
  id: 'ak-service-plan',
  title: 'Alaska: your service plan (the Plan of Care)',
  citation: 'Alaska SDS Policy and Procedure Manual, Section 4 (IDD Waivers)',
  text: `In Alaska, your services are laid out in a document called a Plan of Care. When you are chosen for a waiver, you pick a Care Coordinator, who is a case manager that helps you figure out what supports you need and who will provide them. The Care Coordinator writes the Plan of Care with you, centered on what you want your life to look like, and then sends it to SDS for approval before any services can be paid for. SDS checks in every year to make sure you still qualify for the program, and your Care Coordinator prepares a new Plan of Care as part of that yearly renewal. Your Care Coordinator is supposed to start the renewal paperwork early, well before your current approval period runs out, so your services do not get interrupted. You can also ask your Care Coordinator to update your plan any time your needs or goals change during the year.`,
},
{
  id: 'ak-appeals',
  title: 'Alaska: how to appeal if services are denied or cut',
  citation: 'Alaska fair hearing process; Office of Administrative Hearings (OAH)',
  text: `If Alaska denies, reduces, or stops your Medicaid services, you have the right to ask for a fair hearing. In general, you must request the hearing within 30 days of the date on your decision notice. Your hearing is heard by a judge at the state Office of Administrative Hearings, known as OAH. Here is an important detail: if you are already getting services and you ask for a hearing before the date your services are set to change, usually within 10 days of the notice, your services can keep going at the same level while you wait for a decision. This is sometimes called aid paid pending. Always check the actual notice you received, since it lists your exact deadline and the address or online system to use to file. If you are not sure, ask your Care Coordinator or call SDS for help figuring out the process.`,
},
{
  id: 'ak-complaints-pna',
  title: 'Alaska: reporting problems and free advocacy help',
  citation: 'Alaska Adult Protective Services (APS) 1-800-478-9996; Disability Law Center of Alaska 1-800-478-1234',
  text: `If you or someone you know is being abused, neglected, or exploited, call Alaska Adult Protective Services at 1-800-478-9996. This is the state hotline, and staff there can also direct you to Centralized Reporting for other kinds of harm. If it is an emergency, call 911 or local law enforcement first, then make the report to APS. For free legal help protecting your rights, contact the Disability Law Center of Alaska at 1-800-478-1234. This is Alaska's official protection and advocacy organization for people with disabilities, and their services are free. You will not get in trouble for reporting a problem or for asking for help.`,
},
```

flags: The law.justia.com mirror of AS 47.80.010 returned 403 to direct fetch, so the exact statute text was confirmed through search-engine grounding of that page plus the akleg.gov statute index rather than a direct successful fetch; the team should verify current wording on akleg.gov before relying on quoted language. The fair hearing process description blends a general Alaska public-assistance fair hearing resource with an HCBS-specific notice PDF, since a dedicated IDD-waiver-only appeals page was not found; team should confirm whether IDD Waiver denials route through the same DPA/OAH fair hearing process as other Medicaid benefits. Review cadence for the Plan of Care is described as annual based on SDS Policy and Procedure Manual Section 4.
