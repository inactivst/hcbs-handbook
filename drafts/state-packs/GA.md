# Georgia state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://medicaid.georgia.gov/programs/all-programs/waiver-programs
- https://georgia.gov/apply-new-option-waiver-program-now-and-comprehensive-support-waiver-program-comp
- https://dbhdd.georgia.gov/be-dbhdd/be-compassionate/support-coordination
- https://dbhdd.georgia.gov/document/document/synopsis-patients-rights-11321pdf/download
- https://pamms.dhs.ga.gov/dfcs/medicaid/appendix-b-hearings/
- https://dbhdd.georgia.gov/how-do-i-contact-constituent-services
- https://aging.georgia.gov/report-elder-abuse-neglect-or-exploitation/adult-protective-services-aps
- https://www.ndrn.org/about/ndrn-member-agencies/
- https://thegao.org/

chunks:
```js
{
  id: 'ga-agency-waivers',
  title: 'Georgia: who runs HCBS and the main waiver programs',
  citation: 'Georgia DCH Medicaid Waiver Programs; NOW and COMP waivers operated by DBHDD',
  text: `In Georgia, the Department of Community Health (DCH) runs the state's Medicaid program. DCH partners with the Department of Behavioral Health and Developmental Disabilities (DBHDD) to run the two main waivers for people with intellectual or developmental disabilities. A waiver is a Medicaid program that pays for help at home and in the community instead of in an institution. The New Options Waiver (NOW) is for people who live on their own or with family. The Comprehensive Supports Waiver (COMP) is for people who need more help, including residential care. DBHDD handles the day-to-day work through six regional field offices around the state. You can apply online through the Individual IDD Connects portal, in person at a DBHDD regional office, or by mail. Online applications are processed the fastest.`,
},
{
  id: 'ga-rights',
  title: 'Georgia: your rights are protected by state law',
  citation: 'O.C.G.A. Title 37, Chapters 3, 4, and 7; DBHDD Rules Chapter 82-5 (Rights of Individuals)',
  text: `Georgia law protects the rights of people with developmental disabilities who receive services. These protections come from Title 37 of the Official Code of Georgia, and Chapter 4 is the part about developmental disabilities. DBHDD has written rules, based on this law, that spell out your rights when you get treatment or services. These include rights about how you are treated, your treatment environment, your personal affairs, and who can see your records. The rules also say you must be told about your rights and what you can do if they are violated. If you feel your rights were not respected, you can complain to DBHDD or ask the Georgia Advocacy Office for free help.`,
},
{
  id: 'ga-service-plan',
  title: 'Georgia: your Individual Service Plan (ISP)',
  citation: 'DBHDD Support Coordination; Georgia.gov NOW/COMP application page',
  text: `If you get NOW or COMP waiver services, you have a plan called the Individual Service Plan, or ISP. The plan is built around your own strengths, needs, and goals, so it should sound like you, not like a form. A support coordinator helps you put the plan together. This is a person whose job is to help you get your services and make sure they are working. Support coordinators in Georgia serve no more than 40 people, and they visit you at least quarterly, or monthly if you need more support. Your services must be reviewed and renewed every year. If your needs change before then, you can ask your support coordinator to update the plan at any time. It is your plan, so speak up about what you want in it.`,
},
{
  id: 'ga-appeals',
  title: 'Georgia: how to appeal if services are denied or cut',
  citation: 'Georgia Medicaid Fair Hearings (DCH/DFCS policy, Appendix B); Office of State Administrative Hearings',
  text: `If Georgia Medicaid denies, reduces, or stops your services, you have the right to appeal. This is called a fair hearing, and a judge from the Office of State Administrative Hearings listens to your side. State policy says you must ask for a hearing within 30 days of the notice you disagree with, but read your own notice carefully because it will list your exact deadline. Here is an important tip: if you ask within 10 days of the notice date, you can request that your services keep going while you wait for the hearing. Be aware that if you lose the appeal, the state may ask you to pay back services you received during that time. You should get a written decision within 90 days of your request. You never have to face a hearing alone; a friend, family member, or advocate can help you.`,
},
{
  id: 'ga-complaints-pna',
  title: 'Georgia: reporting problems and free advocacy help',
  citation: 'DBHDD Constituent Services; Georgia Adult Protective Services; Georgia Advocacy Office (Georgia P&A per NDRN)',
  text: `If something is wrong with your services, you have places to turn. For complaints about DBHDD services or providers, contact DBHDD Constituent Services at 404-657-5964 or file online through their Constituent Services portal. If an adult with a disability is being abused, neglected, or exploited, call Georgia Adult Protective Services at 1-866-552-4464 and press 3, or file a report online any time. If someone is in immediate danger, call 911 first. You can also get free help from the Georgia Advocacy Office, which is Georgia's protection and advocacy organization. Its job is to protect the legal, civil, and human rights of people with disabilities. Call them at 404-885-1234 or toll free at 800-537-2329. You do not need proof to report a problem, and asking for help is always okay.`,
},
```

flags: The 30-day fair hearing deadline and 10-day continuation rule come from the DFCS Medicaid eligibility manual (pamms.dhs.ga.gov Appendix B), not a waiver-specific DCH page, so the appeals chunk tells users to check their own notice; the DBHDD rights rules verified (Chapter 82-5) technically cover DBHDD-operated hospitals and ICFs, so the rights chunk cites Title 37 broadly and hedges rather than quoting a community-services bill of rights section; NDRN still lists Georgia Advocacy Office as Georgia's P&A (no designation change found on ndrn.org or thegao.org); ISP annual review verified on georgia.gov ("must be reviewed and renewed each year") rather than a DBHDD policy document.
