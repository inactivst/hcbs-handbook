# Texas state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.hhs.texas.gov/providers/long-term-care-providers/home-community-based-services-hcs
- https://www.hhs.texas.gov/handbooks/local-intellectual-developmental-disability-authority-handbook/7000-hcs-txhml-interest-lists
- https://statutes.capitol.texas.gov/Docs/HS/htm/HS.592.htm
- https://www.hhs.texas.gov/laws-regulations/handbooks/lidda/section-3000-person-directed-plan-pdp
- https://www.hhs.texas.gov/handbooks/community-care-services-eligibility-handbook/2900-appeals-fair-hearings
- https://www.hhs.texas.gov/services/your-rights/fair-fraud-hearings/fair-fraud-hearings-frequently-asked-questions
- https://www.dfps.texas.gov/contact_us/report_abuse.asp
- https://www.hhs.texas.gov/handbooks/provider-investigations-handbook/2000-reporting-abuse-neglect-exploitation
- https://www.ndrn.org/about/ndrn-member-agencies/

chunks:
```js
{
  id: 'tx-agency-waivers',
  title: 'Texas: who runs HCBS and the main waiver programs',
  citation: 'Texas Health and Human Services Commission (HHSC); HCS and TxHmL 1915(c) waivers',
  text: `In Texas, the Health and Human Services Commission (HHSC) runs the Medicaid waiver programs for people with intellectual and developmental disabilities. The two main waivers are Home and Community-based Services (HCS) and Texas Home Living (TxHmL). These programs pay for supports that help you live in your own home, with family, or in a small group home instead of an institution. Your local front door is your Local Intellectual and Developmental Disability Authority, called a LIDDA. There are 39 LIDDAs across Texas, and each one signs people up for services in its area. Because there are waiting lists, ask your LIDDA to put your name on the interest list as soon as possible, even if you do not need services yet. Texas also has other waivers, like CLASS and Deaf Blind with Multiple Disabilities, that HHSC runs too.`,
},
{
  id: 'tx-rights',
  title: 'Texas: your legal rights as a person with an intellectual disability',
  citation: 'Texas Health and Safety Code Chapter 592 (Rights of Persons with an Intellectual Disability)',
  text: `Texas has a law just about your rights. It is Chapter 592 of the Texas Health and Safety Code, and it includes a Basic Bill of Rights. The law says you have the right to not be mistreated, neglected, or abused by anyone who provides your services. You have the right to not be given medicine you do not need. You cannot be turned down for a job or housing just because you have an intellectual disability. The law also gives you the right to a prompt, fair evaluation that fits your language and culture, and the right to a hearing if you disagree with the results. If you believe your rights were violated, you or someone acting for you can file a complaint with the state. This law applies to people receiving intellectual disability services in Texas.`,
},
{
  id: 'tx-service-plan',
  title: 'Texas: your service plan (the Person-Directed Plan)',
  citation: 'HHSC LIDDA Handbook, Section 3000 (Person-Directed Plan); Form 3608 Individual Plan of Care',
  text: `In Texas, your main plan is called a Person-Directed Plan, or PDP. It describes what matters to you, what you want your life to look like, and what supports you need to get there. A service coordinator from your LIDDA leads the planning meeting with you and the people you choose, like family or friends. The PDP then guides a second document called the Individual Plan of Care (IPC), which lists the exact services and how much of each you will get. Your plan is not set in stone. It is reviewed and fully updated at least once a year when your IPC is renewed, and you can ask for changes any time your needs change. You are the center of this process, so speak up about what you want.`,
},
{
  id: 'tx-appeals',
  title: 'Texas: how to appeal if services are denied or cut',
  citation: 'HHSC state fair hearing process; Community Care Services Eligibility Handbook Sec. 2900',
  text: `If Texas denies, reduces, or ends your Medicaid services, you have the right to a state fair hearing. A hearings officer at HHSC will listen to both sides and make a decision. In general, you have 90 days from the date on your notice to ask for a hearing, and 120 days if the decision came from a managed care health plan. Always check the notice you received, because it lists your exact deadline and how to ask. Here is an important tip: if you ask for the hearing before the date your services are set to change, your services usually stay the same while you wait for the decision. The hearing can happen by phone, and you can bring a helper, family member, or lawyer. If you miss the deadline, ask anyway, because the hearings officer can accept a late request for a good reason.`,
},
{
  id: 'tx-complaints-pna',
  title: 'Texas: reporting problems and free advocacy help',
  citation: 'DFPS Abuse Hotline 1-800-252-5400; HHSC Complaint and Incident Intake 1-800-458-9858; Disability Rights Texas 1-800-252-9108',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, call the Texas Abuse Hotline at 1-800-252-5400. It is run by the Department of Family and Protective Services and is open 24 hours a day, every day. If the problem happened in a nursing facility, assisted living facility, or day program, you can also report it to Texas HHS at 1-800-458-9858. If it is an emergency, call 911 first. For free legal help with your rights, contact Disability Rights Texas at 1-800-252-9108. They are the official protection and advocacy organization for Texans with disabilities, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: HCS program page returned 403 to automated fetch, so HCS/LIDDA details came from HHSC handbook pages and HHSC search results rather than the main program page. The 90/120 day appeal windows were confirmed via hhs.texas.gov handbook content but the team should confirm current numbers on the notice language. STAR+PLUS was not included as an IDD waiver since HCS/TxHmL are the IDD-specific programs.
