# Delaware state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://dhss.delaware.gov/dmma/homeandc/
- https://dhss.delaware.gov/wp-content/uploads/sites/9/dmma/pdf/ddds_amended_lifespan_waiver.pdf
- https://dhss.delaware.gov/ddds/comserv/
- https://stateofthestates.ku.edu/delaware-ddds-lifespan-waiver-0009r0800
- https://dhss.delaware.gov/wp-content/uploads/sites/5/2025/08/GlossaryOfTerms20250220.pdf
- https://www.dhss.delaware.gov/wp-content/uploads/sites/5/ddds/pdf/DDDS_Lifespan_HCBS_Waiver_Provider_Specific.pdf
- https://dhss.delaware.gov/dmma/fairhearings/
- https://www.law.cornell.edu/regulations/delaware/16-Del-Admin-Code-SS-2101-5.0
- https://dhss.delaware.gov/dsaapd/aps/
- https://dhss.delaware.gov/dsaapd/faq_reportabuse/
- https://www.declasi.org/disabilities-law-program/
- https://www.declasi.org/contact-us/
- https://delcode.delaware.gov/title16/c055/sc01/index.html

chunks:
```js
{
  id: 'de-agency-waivers',
  title: 'Delaware: who runs HCBS and the main waiver program',
  citation: 'Delaware Health and Social Services (DHSS), Division of Developmental Disabilities Services (DDDS), with Division of Medicaid and Medical Assistance (DMMA); DDDS Lifespan Waiver, a 1915(c) waiver',
  text: `In Delaware, the Division of Developmental Disabilities Services, called DDDS, runs services for people with intellectual and developmental disabilities, autism spectrum disorder, brain injury, or Prader-Willi Syndrome. DDDS and the Division of Medicaid and Medical Assistance, called DMMA, are both part of the Department of Health and Social Services and work together to run the program. The main waiver is called the DDDS Lifespan Waiver, a federal 1915(c) waiver, and it is currently the only 1915(c) waiver Delaware runs. It pays for supports that help you live in your own home or a community setting instead of an institution. One thing that sets Delaware apart from many states is that it does not currently have a waiting list for this waiver, so eligible individuals can generally enroll without a long wait.`,
},
{
  id: 'de-rights',
  title: 'Delaware: your legal rights as a person with a developmental disability',
  citation: 'Delaware Code Title 16, Chapter 55 (Persons Diagnosed with Intellectual Disabilities and Other Specific Developmental Disabilities)',
  text: `Delaware has a law that lists your basic rights if you are diagnosed with an intellectual disability or another specific developmental disability. It is Chapter 55 of Title 16 of the Delaware Code. This law says you have the same basic rights as any other citizen. You have the right to proper medical care and to the education, training, and habilitation that helps you grow your abilities as fully as possible, no matter how significant your disability is. You have the right to work toward a job, economic security, and a decent standard of living. You have the right to live with your family or other care providers, take part in community life, and enjoy leisure activities. You have the right to be protected from exploitation, abuse, and degrading treatment. If you need a guardian to protect your wellbeing, the law says the people who directly provide your services cannot also serve as your guardian.`,
},
{
  id: 'de-service-plan',
  title: 'Delaware: your service plan (the Person-Centered Plan)',
  citation: 'DDDS Lifespan HCBS Waiver Provider Policy Manual; Person-Centered Plan requirements',
  text: `In Delaware, your plan under the DDDS Lifespan Waiver is called a Person-Centered Plan, sometimes also referred to as your Life Span Plan. It is built around what matters most to you and the life you want to lead, using plain language and input from people you choose to include, like family or friends. The plan lists the services and supports you need, who provides them, and how you can ask for updates. Your DDDS support coordinator works with you to build and update this plan. By policy, your plan must be reviewed at least once a year, though it can be reviewed more often if you need a change or ask for one. Monitoring and follow-up happen between reviews to make sure the plan is actually being carried out and is still meeting your needs.`,
},
{
  id: 'de-appeals',
  title: 'Delaware: how to appeal if services are denied or cut',
  citation: 'DMMA State Fair Hearing process; 16 Del. Admin. Code Section 2101-5.0',
  text: `If Delaware Medicaid denies, reduces, or ends your services, you have the right to ask for a State Fair Hearing. In general, you have 90 days from the date on your Appeal Notice of Resolution to ask for a hearing. If your services are being reduced, suspended, or ended and you want them to continue while you wait for a decision, you generally need to ask for the hearing within 10 days of the notice and before the date the change would take effect, so act quickly and always check your specific notice for its exact deadline. You can reach the DMMA Fair Hearing Officer at 1-302-255-9500, or toll free at 1-800-372-2022. A Hearing Officer is supposed to issue a decision within 30 days of your hearing, and the whole process should be resolved within 90 days of when you filed.`,
},
{
  id: 'de-complaints-pna',
  title: 'Delaware: reporting problems and free advocacy help',
  citation: 'Delaware Adult Protective Services 1-888-277-4302; Disability Rights Delaware (CLASI) 1-800-292-7980',
  text: `If you or someone you know is being abused, neglected, or exploited, call Delaware Adult Protective Services at 1-888-277-4302. You can also report anonymously, and reports are kept confidential. If it is an emergency, call 911 first. For free legal help with your rights, contact Disability Rights Delaware, a program of Community Legal Aid Society, Inc., also called CLASI, toll free at 1-800-292-7980, or reach their New Castle County office directly at 302-575-0690. Disability Rights Delaware is the state's federally designated protection and advocacy organization, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: The DDDS Lifespan Waiver page itself returned mostly PDF and search-snippet content rather than a single clean program page, so waiver details were pieced together from the waiver application PDF, the State of the States (KU) summary, and the provider policy manual rather than one authoritative DHSS landing page; the team should verify against the live dhss.delaware.gov/dmma/homeandc/ page. The claim that Delaware currently has no waiver waiting list should be reconfirmed close to publication since waiver capacity can change. CLASI's contact page lists several county-specific phone numbers (New Castle, Kent, Sussex) plus a toll-free number; the chunk uses the toll-free and New Castle numbers, so confirm which number the team wants to lead with.
