# New York state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://opwdd.ny.gov/regulations-guidance/individual-eligibility-and-enrollment-opwdd-hcbs-1915c-waiver-and-requests-0
- https://opwdd.ny.gov/providers/care-management
- https://opwdd.ny.gov/person-centered-planning
- https://www.nysenate.gov/legislation/laws/MHY/33.02
- https://www.law.cornell.edu/regulations/new-york/14-NYCRR-633.4
- https://otda.ny.gov/hearings/faq.asp
- https://otda.ny.gov/hearings/request/
- https://www.justicecenter.ny.gov/report-abuse-or-neglect
- https://www.ndrn.org/about/ndrn-member-agencies/

chunks:
```js
{
  id: 'ny-agency-waivers',
  title: 'New York: who runs HCBS and the OPWDD waiver',
  citation: 'NYS Office for People With Developmental Disabilities (OPWDD); OPWDD Comprehensive HCBS 1915(c) Waiver',
  text: `In New York, the Office for People With Developmental Disabilities, called OPWDD, runs services for people with developmental disabilities. The main program is the OPWDD Comprehensive Home and Community Based Services Waiver, often just called the HCBS Waiver. It pays for supports like community habilitation, respite, supported employment, and housing supports so you can live in the community. To get started, you go through OPWDD's Front Door process, which checks your eligibility and connects you to services. Most people in the waiver also enroll with a Care Coordination Organization, called a CCO, which gives you a care manager. The New York State Department of Health is the state's Medicaid agency and oversees the waiver together with OPWDD.`,
},
{
  id: 'ny-rights',
  title: 'New York: your legal rights when receiving services',
  citation: 'NY Mental Hygiene Law Article 33 (Rights of Patients), sec. 33.02; 14 NYCRR 633.4',
  text: `New York law protects your rights when you receive services. Article 33 of the Mental Hygiene Law spells out the basic civil rights of people receiving services for mental disabilities, including developmental disabilities. Section 33.02 says you must be told about your rights, including the right to be free from abuse and mistreatment. A state regulation, 14 NYCRR 633.4, lists your rights in OPWDD programs in more detail. It says you have the right to a written, individualized plan of services, the right to privacy and to see your own records, and the right to raise complaints and concerns without punishment. You can take a grievance to the head of your program, to the OPWDD Commissioner, or to the Justice Center. Keeping services can never depend on staying quiet about problems.`,
},
{
  id: 'ny-service-plan',
  title: 'New York: your service plan (the Life Plan)',
  citation: 'OPWDD CCO care management requirements; Life Plan reviewed twice per 12 months',
  text: `In New York, your service plan is called a Life Plan. Your care manager at your Care Coordination Organization (CCO) writes it with you, using person-centered planning. That means the plan starts with your goals and choices, not just what programs exist. The Life Plan covers your developmental disability services and also your health and behavioral health needs, all in one document. Your care manager must meet with you face to face and review the Life Plan with you at least twice every 12 months, and update it when your life or needs change. You can invite family, friends, or anyone you trust to your planning meetings. If something in your plan is not working, tell your care manager and ask for a review. You do not have to wait for the next scheduled meeting.`,
},
{
  id: 'ny-appeals',
  title: 'New York: how to appeal if services are denied or cut',
  citation: 'NYS fair hearing process, Office of Temporary and Disability Assistance (OTDA)',
  text: `If New York denies, reduces, or ends your Medicaid services, you can ask for a fair hearing. Fair hearings are run by the state Office of Temporary and Disability Assistance, called OTDA, and an administrative law judge decides your case. Your notice will tell you your deadline, which is usually 60 days from the date on the notice, but check your notice because some programs allow more time. Here is the key tip: if you ask for the hearing before the date your services are set to change, you can get aid continuing, which means your services stay the same until the judge decides. Ask for aid continuing when you request the hearing. You can request a hearing online, by phone, by fax, or by mail, and you can bring an advocate, family member, or lawyer with you.`,
},
{
  id: 'ny-complaints-pna',
  title: 'New York: reporting problems and free advocacy help',
  citation: 'NYS Justice Center hotline 1-855-373-2122; Disability Rights New York 1-800-993-8982',
  text: `New York has a special state agency just for protecting people with disabilities: the Justice Center for the Protection of People with Special Needs. If you see or suspect abuse or neglect of a person receiving services in a state-certified program, call the Justice Center hotline at 1-855-373-2122. It is open 24 hours a day, every day. If someone is in immediate danger, call 911 first. You can also raise complaints inside your program or with OPWDD without fear of punishment. For free legal and advocacy help, contact Disability Rights New York at 1-800-993-8982. They are the state's official protection and advocacy organization, and they can help with service denials, rights violations, and abuse cases at no cost to you.`,
},
```

flags: The "twice per 12 months" Life Plan review requirement was confirmed from OPWDD CCO oversight/policy manual language found via search of opwdd.ny.gov, but the team should confirm the current ADM/policy citation. The 60-day fair hearing deadline is stated on OTDA's own FAQ but notices can say 60 or 90 days, so the text says "check your notice".
