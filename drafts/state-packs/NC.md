# North Carolina state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://medicaid.ncdhhs.gov/beneficiaries/nc-innovations-waiver
- https://www.ncleg.gov/EnactedLegislation/Statutes/HTML/ByArticle/Chapter_122C/Article_3.html
- https://www.oah.nc.gov/hearings-division/medicaid-recipient-appeals/filing-contested-medicaid-recipient-appeal
- https://disabilityrightsnc.org/resources/how-to-appeal-denial-of-medicaid/
- https://www.ncdhhs.gov/divisions/aging/adult-protective-services
- https://www.ncdhhs.gov/contact/hotlines
- https://disabilityrightsnc.org/

chunks:
```js
{
  id: 'nc-agency-waivers',
  title: 'North Carolina: who runs HCBS and the main waiver programs',
  citation: 'NC Medicaid (NCDHHS), NC Innovations Waiver, medicaid.ncdhhs.gov',
  text: `In North Carolina, Medicaid is run by NC Medicaid, part of the NC Department of Health and Human Services (NCDHHS). The main home and community-based waiver for people with intellectual or developmental disabilities is called the NC Innovations Waiver. It pays for things like help with daily living, changes to your home or vehicle, assistive technology, job supports, and support for caregivers. Day to day, the waiver is managed by regional health plans called Tailored Plans, run by LME/MCOs: Alliance Health, Partners Health Management, Trillium Health Resources, and Vaya Health. If you are on the waiver, you get a care manager who helps you find services and answers your questions. There is a waiting list for the waiver, called the Registry of Unmet Needs, so it is smart to sign up as early as you can. To find your LME/MCO, call 1-855-262-1946. For free help with Medicaid problems, the NC Medicaid Ombudsman is at 1-877-201-3750.`,
},
{
  id: 'nc-rights',
  title: 'North Carolina: your rights under state law',
  citation: "N.C. Gen. Stat. Chapter 122C, Article 3 (Clients' Rights), ncleg.gov",
  text: `North Carolina law spells out your rights when you get services for a developmental disability, mental health, or substance use. The law is Chapter 122C, Article 3 of the North Carolina General Statutes, often called the Clients' Rights law. It says the state must protect your basic human rights, including dignity, privacy, humane care, and freedom from abuse, neglect, and exploitation (Section 122C-51). Your personal information must be kept private (Section 122C-52). You have the right to an individual written treatment plan and to say no to treatment in most cases (Section 122C-57). If you live in a 24-hour facility, you also have rights to visitors, phone calls, mail, your own belongings, and time outdoors. Staff who see abuse are required by law to report it.`,
},
{
  id: 'nc-service-plan',
  title: 'North Carolina: your Individual Support Plan (ISP)',
  citation: 'NC Innovations Waiver, Individual Support Plan (ISP), medicaid.ncdhhs.gov',
  text: `On the NC Innovations Waiver, your plan is called an Individual Support Plan, or ISP. It is a written plan that lists the services you get, who provides them, and the goals that matter to you. You build it with your care manager and your planning team, and you and your family should have a real voice in it. Your care manager also completes a reassessment every year, so your plan is reviewed and updated at least once a year. If your life changes before then, like a new health need or a move, you can ask your care manager to update the plan sooner. Keep a copy of your ISP so you can check that the services you were promised are the services you get.`,
},
{
  id: 'nc-appeals',
  title: 'North Carolina: appealing a service denial or cut',
  citation: 'NC Office of Administrative Hearings, Medicaid recipient appeals, oah.nc.gov; Disability Rights NC appeals guide',
  text: `If your health plan denies, reduces, or stops a Medicaid service, it must send you a written notice. You have the right to appeal. First, you appeal to your Tailored Plan or LME/MCO. Your notice tells you exactly how and by when, so read it right away and check the deadline on your notice. If the plan still says no, it sends you a Notice of Resolution, and you then have 120 days from that notice to ask for a State Fair Hearing at the NC Office of Administrative Hearings (phone 984-236-1850). You may also be offered free mediation, which is a chance to talk it out before a hearing. You can ask for your services to keep going while you appeal, but only if you act fast. Disability Rights NC says filing within 10 days of the notice keeps services from stopping, so appeal quickly and check your notice for the exact rule. You do not need a lawyer to appeal, and many people represent themselves.`,
},
{
  id: 'nc-complaints-pna',
  title: 'North Carolina: reporting problems and free advocacy help',
  citation: 'NCDHHS Adult Protective Services; DHSR Complaint Intake Unit; Disability Rights North Carolina',
  text: `If you think someone with a disability is being abused, neglected, or exploited, call Adult Protective Services at your county Department of Social Services. Every county has one, and they must look into reports and act to keep people safe. If the problem is with a licensed facility or agency, like a group home, adult care home, or home care agency, you can also call the state's facility complaint line at the Division of Health Service Regulation: 1-800-624-3004 (in NC) or 919-855-4500. Your name is kept private from the facility, and inspections are unannounced. If it is an emergency, call 911 first. For free legal help with your rights, contact Disability Rights North Carolina, the state's protection and advocacy organization. Call them toll free at 1-877-235-4210, or 919-856-2195. Their help is free, and they exist to stand up for people with disabilities.`,
},
```

flags: Could not verify from an official page the exact number of days to file the first-level appeal with the Tailored Plan (hedged as "check your notice"); the 10-day continuation-of-services rule is from Disability Rights NC's fair hearing guide (also hedged); the info.ncdhhs.gov DHSR complaint page returned 403 so the complaint line was verified on ncdhhs.gov/contact/hotlines instead; ISP development details (team composition) verified only at summary level from the NC Innovations Waiver page.

NOTE for promotion: the `nc-rights` citation contains an apostrophe inside "Clients' Rights" - when moving into _corpus.js keep it inside single-quoted JS by escaping or switch that citation to double quotes.
