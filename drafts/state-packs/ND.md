# North Dakota state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.hhs.nd.gov/dd
- https://www.hhs.nd.gov/healthcare/medicaid/medicaid-waivers
- https://www.hhs.nd.gov/individuals-disabilities
- https://www.nd.gov/dhs/policymanuals/52505/Content/525_05_30_05.htm
- https://ndlegis.gov/cencode/t25c01-2.pdf
- https://www.hhs.nd.gov/about-us/client-rights-and-appeals
- https://www.hhs.nd.gov/sites/default/files/documents/Adult%20and%20Aging/mandatory-reporting-fact-sheet.pdf
- https://www.hhs.nd.gov/adults-and-aging/reporting
- https://www.ndpanda.org/get-help/contact-us

chunks:
```js
{
  id: 'nd-agency-waivers',
  title: 'North Dakota: who runs HCBS and the main waiver program',
  citation: 'ND Health and Human Services (HHS), Developmental Disabilities Division; Traditional IID/DD 1915(c) HCBS Waiver',
  text: `In North Dakota, the Department of Health and Human Services runs Medicaid waiver services for people with intellectual and developmental disabilities. The main program is called the Traditional Individuals with Intellectual Disabilities and Developmental Disabilities Home and Community-Based Services Waiver, often shortened to the IID/DD waiver. It pays for supports that help you live in your own home or in the community instead of an institution. HHS also runs a separate Medicaid 1915(i) state plan option for some community-based services. Your local contact is usually a Developmental Disabilities regional office, and a state staff member called a Program Manager works with you directly. Ask your regional office how to apply and whether a waiting list applies to you.`,
},
{
  id: 'nd-rights',
  title: 'North Dakota: your legal rights as a person with a developmental disability',
  citation: 'North Dakota Century Code Chapter 25-01.2 (Developmental Disability)',
  text: `North Dakota has a state law just about your rights if you have a developmental disability. It is Chapter 25-01.2 of the North Dakota Century Code. The law says you have the right to appropriate treatment and habilitation in the least restrictive setting that fits your needs. You have the right to communicate with others without unfair interference or censorship. The law also limits when seclusion or physical restraint can be used on you, and bans practices like psychosurgery, sterilization, and shock treatment as punishment. Any agency that serves you must tell you about these rights. If your rights under this law are violated, you can take civil action in court, and if you win, the court can order the other side to pay your attorney fees.`,
},
{
  id: 'nd-service-plan',
  title: 'North Dakota: your service plan',
  citation: 'ND HHS Case Management policy 525-05-30-05; person-centered planning practice',
  text: `In North Dakota, your services are guided by a person-centered plan, sometimes called your service plan or plan of care. A case manager, often a state staff member called a Program Manager, works with you to build this plan around your goals, needs, and preferences. The plan lists which waiver services you get, how often, and who provides them. It also lists other supports in your life, like family help, that are not paid for by the waiver. Your plan is reviewed and updated at least once a year, and sooner if your needs or circumstances change. Speak up during planning meetings about what matters most to you and your life.`,
},
{
  id: 'nd-appeals',
  title: 'North Dakota: how to appeal if services are denied or cut',
  citation: 'ND HHS Client Rights and Appeals; Appeals Supervisor, Legal Division, HHS; Form SFN 162',
  text: `If North Dakota HHS denies, reduces, or ends your Medicaid or waiver services, you have the right to ask for a hearing. Appeals are handled by the Appeals Supervisor in the HHS Legal Division. You typically ask for a hearing by filling out Form SFN 162, Request for Hearing, and sending it in by mail or email. Always check the notice you received for your exact deadline to appeal, since we could not confirm one single deadline that applies in every case. The notice should also tell you whether your services can keep going unchanged while your appeal is pending, sometimes called aid paid pending, so read it carefully or call HHS to ask. You can reach the Legal Division Appeals Supervisor at 701-328-2311 or toll-free 800-472-2622.`,
},
{
  id: 'nd-complaints-pna',
  title: 'North Dakota: reporting problems and free advocacy help',
  citation: 'ND Vulnerable Adult Protective Services Central Intake 1-855-462-5465 option 2; North Dakota Protection and Advocacy Project (Disability Rights ND) 701-328-2950',
  text: `If you or someone you know is being abused, neglected, or financially exploited, and it is not an emergency, call Vulnerable Adult Protective Services at 1-855-462-5465 and press option 2. You can leave a message if staff are not available, and someone will call you back. If someone is in immediate danger, call 911 or local law enforcement first. For free legal help with your disability rights, contact the North Dakota Protection and Advocacy Project, also known as Disability Rights North Dakota, at 701-328-2950 or toll-free at 1-800-472-2670. They are the official protection and advocacy organization for people with disabilities in North Dakota, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: Could not confirm a single, specific appeal deadline (days) or a clearly stated aid-paid-pending rule for HCBS/Medicaid recipient appeals directly from an ND HHS page during this research pass, since the Client Rights and Appeals page content did not surface deadline text and a 30-day figure found in search results appeared tied to provider appeals rather than recipient appeals, so nd-appeals hedges to "check your notice" per instructions. Case management/service plan review cadence (at least annually) came from ND HHS HCBS Case Management policy manual language reflected in a search summary, not a direct full-page fetch, so the team should re-verify against the live policy manual page before promoting. The 1915(i) state plan reference in nd-agency-waivers is included only as a passing mention and was not independently verified beyond a page-title hit; confirm before treating it as a waiver pathway for readers.
