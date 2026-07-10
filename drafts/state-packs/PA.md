# Pennsylvania state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.pa.gov/agencies/dhs/resources/medicaid/waivers/consolidated-waiver
- https://www.pa.gov/agencies/dhs/resources/medicaid/waivers/community-living-waiver
- https://www.pa.gov/agencies/dhs/resources/intellectual-disabilities-autism/pfds-waiver
- https://www.pa.gov/content/dam/copapwp-pagov/en/dhs/documents/docs/publications/documents/forms-and-pubs-odp/00-20-02%20ISP%20Bulletin.pdf
- https://www.pa.gov/services/dhs/hearings-and-appeals-dhs
- https://www.disabilityrightspa.org/wp-content/uploads/2018/03/MAMedicaidWaiversAppealsComplaintsGrievancesMAR2018.pdf
- https://www.pa.gov/services/dhs/report-abuse-of-an-adult-with-a-disability
- https://www.pacodeandbulletin.gov/Display/pacode?file=/secure/pacode/data/055/chapter6100/chap6100toc.html
- https://www.ndrn.org/about/ndrn-member-agencies/

chunks:
```js
{
  id: 'pa-agency-waivers',
  title: 'Pennsylvania: who runs HCBS and the main waiver programs',
  citation: 'PA Department of Human Services, Office of Developmental Programs (ODP); Consolidated, Community Living, and P/FDS waivers',
  text: `In Pennsylvania, the Office of Developmental Programs, called ODP, runs the Medicaid waivers for people with intellectual disabilities and autism. ODP is part of the state Department of Human Services. There are three main waivers. The Consolidated Waiver has no yearly dollar cap and can pay for residential services like living in a group home. The Community Living Waiver and the Person/Family Directed Support Waiver, called P/FDS, have yearly spending caps and support people living with family or in their own homes. To apply, you register with your county's ODP office, often called the county MH/IDD program or Administrative Entity. There are waiting lists for these waivers, so register early even if you do not need services right away.`,
},
{
  id: 'pa-rights',
  title: 'Pennsylvania: your rights in ODP services',
  citation: '55 Pa. Code secs. 6100.181-6100.184 (individual rights in ODP HCBS)',
  text: `Pennsylvania spells out your rights in its rules for developmental disability services, in Chapter 6100 of Title 55 of the Pennsylvania Code. These rules say your provider must help you understand your rights and give you what you need to make your own choices. You may not be punished or retaliated against for exercising your rights. You have rights to privacy, to make choices about your daily life, and, if you live in a residential program, extra rights about your home, your belongings, and visitors. Your rights can only be limited by a court order, not by a provider's preference. If a provider violates these rules, you can complain to the provider, to ODP, or get outside help. Pennsylvania also has an older law, the Mental Health and Intellectual Disability Act of 1966, that sets up the service system.`,
},
{
  id: 'pa-service-plan',
  title: 'Pennsylvania: your service plan (the Individual Support Plan)',
  citation: 'ODP Bulletin 00-20-02 (Individual Support Plan); Consolidated, Community Living, and P/FDS waivers',
  text: `In Pennsylvania, your service plan is called an Individual Support Plan, or ISP. Your supports coordinator leads the planning process with you and your team, which can include family, friends, and providers you choose. The ISP describes your goals, the supports you need, and which waiver services will pay for them. It is built through person-centered planning, which means your preferences come first. Your ISP is reviewed and updated at least once a year at your annual review meeting, and your supports coordinator should also update it whenever your needs change. Before services can start or change, the plan is approved by your county Administrative Entity. Read your ISP carefully and speak up if something is missing, because services usually cannot be paid for unless they are in the plan.`,
},
{
  id: 'pa-appeals',
  title: 'Pennsylvania: how to appeal if services are denied or cut',
  citation: 'DHS Bureau of Hearings and Appeals fair hearing process',
  text: `If Pennsylvania denies, reduces, or ends your waiver services, you have the right to a fair hearing before the Department of Human Services Bureau of Hearings and Appeals. Your written notice tells you how to appeal and your deadline, which is generally 30 days from the date on the notice, but always check your notice. Here is the most important tip: if you are already receiving waiver services and you file your appeal within 10 days of the notice, your services keep going unchanged until the hearing decision is made. At the hearing, a judge listens to you and the agency, and you can bring a family member, advocate, or lawyer. If you lose, you can ask for reconsideration within 15 days or appeal to Commonwealth Court within 30 days of the decision.`,
},
{
  id: 'pa-complaints-pna',
  title: 'Pennsylvania: reporting problems and free advocacy help',
  citation: 'PA Adult Protective Services hotline 1-800-490-8505; Disability Rights Pennsylvania 1-800-692-7443',
  text: `If you or someone you know is being abused, neglected, exploited, or abandoned, call Pennsylvania's statewide protective services hotline at 1-800-490-8505. It is open 24 hours a day, every day. Adult Protective Services helps adults with disabilities ages 18 to 59, and the same number reaches Older Adult Protective Services for people 60 and older. You can report no matter where the person lives, whether at home, in a group home, or in a facility, and you can stay anonymous. If someone is in immediate danger, call 911 first. For free legal and advocacy help, contact Disability Rights Pennsylvania at 1-800-692-7443. They are the state's official protection and advocacy organization and can help with service denials, rights violations, and abuse concerns at no cost.`,
},
```

flags: Pennsylvania's rights protections for DD services live mainly in regulations (55 Pa. Code Ch. 6100), not a standalone bill-of-rights statute; the chunk says so and mentions the MH/ID Act of 1966 only as system-establishing law. The 30-day appeal deadline was confirmed via a Pennsylvania Health Law Project summary plus pa.gov hearings pages; the 10-day continuation rule for waiver services came from a Disability Rights PA publication (the P&A itself). Team should re-verify both against the current DHS notice language.
