# Minnesota state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://mn.gov/dhs/people-we-serve/people-with-disabilities/services/home-community/programs-and-services/cadi-waiver.jsp
- https://mn.gov/dhs/people-we-serve/people-with-disabilities/services/home-community/programs-and-services/hcbs-waivers.jsp
- https://mn.gov/dhs/people-we-serve/people-with-disabilities/services/home-community/programs-and-services/mnchoices.jsp
- https://www.dhs.state.mn.us/main/idcplg?IdcService=GET_DYNAMIC_CONVERSION&RevisionSelectionMethod=LatestReleased&dDocName=dhs16_176045
- https://www.revisor.mn.gov/statutes/cite/144.651
- https://mn.gov/dhs/people-we-serve/people-with-disabilities/services/home-community/programs-and-services/appeals.jsp
- https://hcopub.dhs.state.mn.us/epm/1_3_1_1.htm
- https://www.lawhelpmn.org/self-help-library/fact-sheet/benefits-appeals-dhs
- https://mn.gov/dhs/report-abuse/
- https://www.lawhelpmn.org/self-help-library/legal-resource/minnesota-adult-abuse-reporting-center-maarc
- https://mylegalaid.org/disability-law-center/

chunks:
```js
{
  id: 'mn-agency-waivers',
  title: 'Minnesota: who runs HCBS and the main waiver programs',
  citation: 'Minnesota Department of Human Services (DHS); Developmental Disabilities (DD) waiver and Community Access for Disability Inclusion (CADI) waiver, both 1915(c) HCBS waivers',
  text: `In Minnesota, the Department of Human Services, often called DHS, runs the Medicaid home and community-based waivers for people with disabilities. Minnesota has four main waivers: Developmental Disabilities (DD), Community Access for Disability Inclusion (CADI), Brain Injury (BI), and Community Alternative Care (CAC). People with intellectual and developmental disabilities most often use the DD waiver or the CADI waiver, and these pay for services so you can live in your own home, a family home, or a small community setting instead of an institution. You apply through your county or Tribal agency, and a case manager there is your main point of contact. Ask your county agency which waiver fits your situation, since eligibility rules differ between them.`,
},
{
  id: 'mn-rights',
  title: "Minnesota: your rights when receiving care in a licensed facility or program",
  citation: 'Minnesota Statutes Section 144.651 ("Health Care Bill of Rights")',
  text: `Minnesota law protects people who receive care in health care facilities and licensed residential programs, including many settings that serve people with developmental disabilities. This is Minnesota Statutes Section 144.651, sometimes called the Patients and Residents Bill of Rights. Under this law, no facility can make you give up these rights just to be admitted. You have the right to talk and write privately with people you choose, get your mail unopened, and use a phone for private calls. If you are able to manage your own money, you have the right to do so, or to get at least a quarterly accounting if someone else manages it for you. This research did not confirm a separate, DD-specific bill of rights statute beyond Section 144.651, so if your services happen outside a licensed facility, ask your case manager what specific rights protections apply to your exact program.`,
},
{
  id: 'mn-service-plan',
  title: 'Minnesota: your service plan (the MnCHOICES Support Plan)',
  citation: 'Minnesota DHS MnCHOICES Support Plan process',
  text: `In Minnesota, your main plan is now called the MnCHOICES Support Plan. It replaced an older set of documents called the Community Support Plan and the Coordinated Service and Support Plan, which DHS retired around October 2024 as part of an update to its MnCHOICES computer system. Your county or Tribal case manager builds this plan with you, based on an assessment of your needs and your own goals, and it lists the services and supports you will get. If you are on the DD, CADI, BI, or CAC waiver, your case manager must have at least two face-to-face visits with you every 12 months, and your annual assessment can count as one of those visits. Because this system changed recently, ask your case manager to confirm the current name and paperwork for your specific plan.`,
},
{
  id: 'mn-appeals',
  title: 'Minnesota: how to appeal if services are denied or cut',
  citation: 'Minnesota DHS State Appeals Office; Minnesota Statutes Section 256.045',
  text: `If Minnesota denies, reduces, or ends your Medicaid or HCBS services, you have the right to appeal to the DHS State Appeals Office for a hearing. In general, you must file your appeal within 30 days of the notice, though DHS can accept it up to 90 days later if you show good cause for the delay. If your notice gave you at least 10 days advance warning and you file your appeal by the date the change was set to take effect, your services usually continue automatically while your appeal is decided. Always check the notice you received, since it lists your exact deadline and appeal instructions. The Arc Minnesota and Minnesota Disability Law Center have published guides that can help you prepare.`,
},
{
  id: 'mn-complaints-pna',
  title: 'Minnesota: reporting problems and free advocacy help',
  citation: 'Minnesota Adult Abuse Reporting Center (MAARC) 1-844-880-1574; Minnesota Disability Law Center 1-800-292-4150',
  text: `If you or someone you know is being abused or neglected, call the Minnesota Adult Abuse Reporting Center, known as MAARC, at 1-844-880-1574. It is open 24 hours a day, every day, and your identity as the reporter stays confidential. If it is an emergency, call 911 first for police, fire, or ambulance help. For free legal help with your rights, contact the Minnesota Disability Law Center at 1-800-292-4150. They are part of Mid-Minnesota Legal Aid and are the official protection and advocacy organization for people with disabilities in Minnesota, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: Minnesota's plan documentation changed systems around October 2024 (CSP/CSSP retired, replaced by the MnCHOICES Support Plan); the mn-service-plan chunk reflects this but the team should confirm with DHS that "MnCHOICES Support Plan" is still the current name at publish time since this is a recent, actively-updated system. Could not verify a developmental-disability-specific bill of rights statute separate from the general Section 144.651 health care facility rights law, so the mn-rights chunk is scoped to licensed facilities/programs and hedges that community-based waiver settings may have different protections the team should confirm. Aid-paid-pending in mn-appeals is described as conditional on 10-day advance notice and timely filing, based on the Minnesota Health Care Programs Managed Care Manual language found in search results rather than a direct fetch of the DHS appeals page; team should verify against the current notice template.
