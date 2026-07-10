# Rhode Island state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://bhddh.ri.gov/developmental-disabilities
- https://bhddh.ri.gov/developmental-disabilities/services-adults
- https://bhddh.ri.gov/developmental-disabilities/services-adults/community-supports
- https://eohhs.ri.gov/reference-center/medicaid-state-plan-and-1115-waiver
- https://bhddh.ri.gov/sites/g/files/xkgbur411/files/documents/Individual-Service-Plan-Template_.pdf
- https://sherlockcenter.ric.edu/sites/sherlock/files/files/2024-02/ri_person_centered_thinking_guide_english.pdf
- https://eohhs.ri.gov/Consumer/ConsumerInformation/Appeals.aspx
- https://eohhs.ri.gov/reference-center/eohhs-appeals-office
- https://rules.sos.ri.gov/regulations/part/210-10-05-2
- https://bhddh.ri.gov/developmental-disabilities/reporting-abuse
- https://drri.org/contact-us/
- https://drri.org/protection-and-advocacy/
- https://law.justia.com/codes/rhode-island/title-40-1/chapter-40-1-26/

chunks:
```js
{
  id: 'ri-agency-waivers',
  title: 'Rhode Island: who runs HCBS and the main program',
  citation: 'RI Executive Office of Health and Human Services (EOHHS) and Dept. of Behavioral Healthcare, Developmental Disabilities and Hospitals (BHDDH), Division of Developmental Disabilities; Section 1115 demonstration waiver',
  text: `In Rhode Island, home and community-based services for people with developmental disabilities are overseen by two agencies working together. The Executive Office of Health and Human Services, or EOHHS, runs the state Medicaid program, and the Department of Behavioral Healthcare, Developmental Disabilities and Hospitals, or BHDDH, runs the Division of Developmental Disabilities that plans, funds, and oversees your day-to-day services. Rhode Island is unusual because its whole Medicaid long-term care system, including services for adults with developmental disabilities, runs under one big Section 1115 demonstration waiver rather than a separate 1915(c) waiver like many other states use. Services can include day programs, community supports, supported employment, shared living, homemaker services, and case management. You can get these services through one of 37 community agencies licensed by BHDDH, or you can self-direct your supports and hire your own staff through a fiscal intermediary.`,
},
{
  id: 'ri-rights',
  title: 'Rhode Island: your legal rights as a person with a developmental disability',
  citation: 'Rhode Island General Laws Title 40.1, Chapter 40.1-26 (Rights for Persons with Developmental Disabilities)',
  text: `Rhode Island has a law that spells out your rights if you have a developmental disability. It is Chapter 40.1-26 of the Rhode Island General Laws. Under this law, you have the right to be treated with dignity and respect, to have your privacy protected, and to live and take part in activities in the most integrated community setting that fits your needs. You have the right to help build your own individualized plan and to give informed consent before it is put into action, or to have an advocate help with that consent if you are not able to. The law bans harmful aversive techniques and says restraints cannot be used as punishment, for staff convenience, or in place of a real plan for you. If you believe your rights were violated, you have the right to file a complaint through your provider's grievance procedure.`,
},
{
  id: 'ri-service-plan',
  title: 'Rhode Island: your service plan (the Individual Support Plan)',
  citation: 'BHDDH Division of Developmental Disabilities, Individual Support Plan (ISP) and Person-Centered Plan (PCP) process',
  text: `In Rhode Island, your plan is usually called an Individual Support Plan, or ISP, and it is built using a person-centered planning approach, sometimes shortened to PCP. There is no single required form. Instead, your plan is supposed to be shaped around how you communicate and learn best, so it truly reflects what you want your life to look like. You and your team, which can include family, providers, and a support coordinator, decide together what goals go into your plan. You can ask to update your ISP any time you have a new goal or want to build on an existing one, not just at a scheduled meeting. Because the state does not publish one fixed statewide review calendar in the sources checked, ask your support coordinator or case manager how often your specific plan gets formally reviewed.`,
},
{
  id: 'ri-appeals',
  title: 'Rhode Island: how to appeal if services are denied or cut',
  citation: 'EOHHS Appeals Office; 210-RICR-10-05-2 (Appeals Process and Procedures for EOHHS Agencies and Programs)',
  text: `If Rhode Island Medicaid denies, reduces, or ends your services, you have the right to appeal. In general, you must file your appeal within 35 days of the date on your Benefit Decision Notice, and there is also a Level 2 State Fair Hearing option within 120 days of a written denial in some cases. Always check the specific notice you received, since it lists the exact deadline and reason for the decision that applies to your case. You can often request Aid Pending, meaning your current Medicaid coverage or services can continue while your appeal is being decided, by acting through your online account or by contacting the EOHHS Appeals Office quickly after you get the notice. You can call HealthSource RI at 1-855-840-4774 for help filing, or file online through your healthyrhode.ri.gov account.`,
},
{
  id: 'ri-complaints-pna',
  title: 'Rhode Island: reporting problems and free advocacy help',
  citation: 'BHDDH Quality Assurance abuse hotline 401-462-2629; Disability Rights Rhode Island 1-800-733-5332',
  text: `If you or someone you know with a developmental disability is being abused, neglected, or mistreated, call the BHDDH Quality Assurance hotline at 401-462-2629. This line is open 24 hours a day, every day of the year. If it is an emergency, call 911 first. For free legal help understanding or defending your rights, contact Disability Rights Rhode Island, the state's protection and advocacy organization, toll-free at 1-800-733-5332, or at 401-831-3150. Disability Rights Rhode Island is the federally designated agency that helps Rhode Islanders with disabilities with legal problems tied to their rights, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: Rhode Island runs its HCBS long-term services under one comprehensive Section 1115 demonstration waiver rather than a separate 1915(c) waiver, so it does not have a single named waiver like "HCS" or "0208" the way other states do; the team should confirm this framing is described accurately for a general audience. A specific statewide review cadence for the Individual Support Plan (annual versus other interval) could not be confirmed from an official BHDDH page in the time available, so the ri-service-plan chunk hedges and tells the reader to ask their support coordinator. The 35-day and 120-day appeal deadlines came from EOHHS and Stay Covered RI consumer pages describing the general Medicaid appeals process; the team should confirm these numbers apply specifically to DD waiver service denials versus general Medicaid eligibility denials.
