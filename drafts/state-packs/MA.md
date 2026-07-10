# Massachusetts state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.mass.gov/info-details/home-and-community-based-services-waivers
- https://www.mass.gov/info-details/hcbs-waivers-for-adults-with-intellectual-disabilities-information-for-individuals-families
- https://mhlac.org/wp-content/uploads/2018/10/dds_indiv_support_planning.pdf
- https://www.mass.gov/regulations/115-CMR-500-standards-to-promote-dignity-0
- https://www.mass.gov/how-to/how-to-appeal-a-masshealth-decision
- https://www.mass.gov/regulations/130-CMR-610000-masshealth-fair-hearing-rules
- https://dppcmass.gov/
- https://www.mass.gov/info-details/hotline-unit
- https://www.dlc-ma.org/phone/

chunks:
```js
{
  id: 'ma-agency-waivers',
  title: 'Massachusetts: who runs HCBS and the main waiver programs',
  citation: 'Massachusetts Department of Developmental Services (DDS), with MassHealth; Adult Supports, Community Living, and Intensive Supports 1915(c) waivers',
  text: `In Massachusetts, the Department of Developmental Services, called DDS, runs the day-to-day operation of the home and community based waivers for adults with intellectual disabilities, working together with MassHealth, which is the state Medicaid agency. There are three adult waivers to know about. The Adult Supports Waiver is for people who need at least one home or community based service a month but do not need round-the-clock care. The Community Living Waiver is for people who need more support than Adult Supports but less than the highest tier. The Intensive Supports Waiver is for people with the most significant support needs. People in these waivers can live in a family home, in adult foster care, with a live-in caregiver, or on their own. DDS is your main point of contact for figuring out which waiver fits your situation.`,
},
{
  id: 'ma-rights',
  title: 'Massachusetts: your rights as a person served by DDS',
  citation: '115 CMR 5.00, "Standards to Promote Dignity"; 115 CMR 3.09, Protection of Human Rights and Human Rights Committees',
  text: `Massachusetts has a state regulation about your rights and dignity as a person served by DDS. It is called 115 CMR 5.00, Standards to Promote Dignity, and it applies to every provider, service, and support that DDS operates, licenses, certifies, or pays for. Under this rule, you have the right to reasonable access to a telephone, the internet, email, and social media, and the right to make and receive private, confidential communications. DDS also requires providers to set up Human Rights Committees under a related rule, 115 CMR 3.09. These committees are responsible for protecting your human and civil rights, and they review and approve any use of behavior modification plans or emergency restraints. Every provider must have a Human Rights Officer whose job is to make sure staff, individuals, and families know about these rights, and copies of the full regulation must be available for you to look at.`,
},
{
  id: 'ma-service-plan',
  title: 'Massachusetts: your service plan (the Individual Service Plan)',
  citation: 'DDS Individual Support Planning process, as described by Mental Health Legal Advisors Committee guidance',
  text: `In Massachusetts, your plan is called an Individual Service Plan, or ISP. A DDS service coordinator is assigned to you and leads the planning process. Your ISP team includes you, your guardian or family if you choose, your service coordinator, and staff from the agencies that provide your services. Each person served by DDS has an annual ISP meeting where the team reviews and updates the plan for the year ahead. You do not have to wait for the annual meeting if your needs change. You or your guardian can ask your service coordinator to schedule a meeting sooner to update the plan. The ISP should reflect your own vision and goals, not just a list of services, and it should be reviewed against those goals regularly, not only once a year.`,
},
{
  id: 'ma-appeals',
  title: 'Massachusetts: how to appeal if services are denied or cut',
  citation: 'MassHealth Fair Hearing Rules, 130 CMR 610.000; Office of Medicaid Board of Hearings',
  text: `If MassHealth denies, reduces, or ends your services, you have the right to request a fair hearing. These hearings are held by the Office of Medicaid Board of Hearings, which is part of the state Medicaid agency. Because deadlines can be as short as 10 to 14 days for some notices, or up to 60 days for others, you must check the notice you received for your specific deadline, since it is printed right on the notice. If you want your current services to keep going while your appeal is decided, this is sometimes called aid pending, and you generally need to ask for it within 10 days of your notice. If you lose your appeal after receiving aid pending, you may be asked to pay back the cost of services you received during that time, so read the notice or ask for help before deciding. The Board of Hearings is supposed to issue a decision within 90 days of your hearing date.`,
},
{
  id: 'ma-complaints-pna',
  title: 'Massachusetts: reporting problems and free advocacy help',
  citation: 'Disabled Persons Protection Commission (DPPC) Hotline 1-800-426-9009; Disability Law Center 1-800-872-9992',
  text: `If you or someone you know is being abused or neglected by a caregiver, call the Disabled Persons Protection Commission hotline at 1-800-426-9009. It is open 24 hours a day, and TTY callers can use 1-888-822-0350, or Deaf and Hard of Hearing callers can use MassRelay at 711. DPPC investigates abuse and neglect of adults with disabilities between ages 18 and 59. If it is an emergency, call 911 first. For free legal help protecting your rights, contact the Disability Law Center, toll-free at 1-800-872-9992, or 617-723-8455. They are the official protection and advocacy organization for people with disabilities in Massachusetts, their intake line is open Monday, Tuesday, Thursday, and Friday from 9 a.m. to 5 p.m., and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: The mass.gov fair hearing how-to page and the 115 CMR 5.00 regulation page both returned 403 errors to direct fetch, so those details rely on search-result summaries of Mass.gov content and a Mental Health Legal Advisors Committee (mhlac.org) PDF rather than a full direct read of the primary regulation text; the team should pull the raw 130 CMR 610.000 and 115 CMR 5.00 PDFs to confirm exact wording. The appeal deadline is genuinely variable in Massachusetts (10 to 60 days depending on notice type) so the chunk hedges to "check your notice," consistent with the task instructions. The ISP chunk is based on an advocacy-org description of the DDS process rather than a DDS regulation citation, since a direct DDS regulatory citation for ISP cadence was not confirmed; team should verify against 115 CMR 6.00 if that governs ISPs.
