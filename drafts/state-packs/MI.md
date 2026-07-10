# Michigan state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.michigan.gov/mdhhs/keep-mi-healthy/mentalhealth/mentalhealth/medwaivers/habilitation-supports-waiver
- https://www.michigan.gov/mdhhs/keep-mi-healthy/mentalhealth/mentalhealth/medwaivers
- https://www.michigan.gov/-/media/Project/Websites/mdhhs/Folder2/Folder31/Folder1/Folder131/Habilitation_Supports_Waiver_Amendment.pdf
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-330-1700
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-330-1712
- https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-330-1755
- https://www.michigan.gov/mdhhs/keep-mi-healthy/mentalhealth/mentalhealth/recipientrights
- https://www.michigan.gov/mdhhs/keep-mi-healthy/mentalhealth/mentalhealth/recipientrights/recipient-rights-complaint-form
- https://www.michigan.gov/mdhhs/assistance-programs/medicaid/portalhome/beneficiaries/resources/michigan-office-of-administrative-hearings-and-rules-for-michigan-department-of-health-and-human-se
- https://www.michigan.gov/-/media/Project/Websites/mdhhs/Folder3/Folder93/Folder2/Folder193/Folder1/Folder293/Appeal-and-Grievance-Resolution-Processes-Technical-Requirement.pdf
- https://www.michigan.gov/mdhhs/adult-child-serv/abuse-neglect/adult-ps
- https://www.drmich.org/
- https://www.ndrn.org/about/ndrn-member-agencies/

chunks:
```js
{
  id: 'mi-agency-waivers',
  title: 'Michigan: who runs HCBS and the main waiver programs',
  citation: 'Michigan Dept. of Health and Human Services (MDHHS), Habilitation Supports Waiver',
  text: `In Michigan, the state Medicaid agency is the Michigan Department of Health and Human Services (MDHHS). The main Medicaid waiver for people with intellectual or developmental disabilities is the Habilitation Supports Waiver (HSW). It adds extra home and community services on top of regular Medicaid for people of any age who would otherwise qualify for care in an institution. The HSW is run locally by regional groups called Prepaid Inpatient Health Plans (PIHPs), which work through your county Community Mental Health Services Program (CMHSP) and its providers. That means your local CMH office is usually your front door for services. Michigan also has the Children's Waiver Program (CWP) for kids under 18 and a waiver for children with serious emotional disturbance (SEDW). To get started, reach out to the community mental health program that serves your county.`,
},
{
  id: 'mi-rights',
  title: 'Michigan: your rights are written into state law',
  citation: 'Michigan Mental Health Code, Chapter 7, MCL 330.1700 et seq.',
  text: `Michigan has a law that spells out your rights when you receive public mental health or developmental disability services. It is Chapter 7 of the Michigan Mental Health Code, called the Rights of Recipients, starting at MCL 330.1700. The law defines and protects things like person-centered planning, limits on restraint and seclusion, and protection from criminal abuse. Every CMHSP has an Office of Recipient Rights whose whole job is to protect these rights and help you use them. MDHHS also publishes a free plain-language handbook, Your Rights When Receiving Mental Health Services in Michigan, in English, Spanish, and Arabic. You can ask for a copy anywhere you receive services.`,
},
{
  id: 'mi-service-plan',
  title: 'Michigan: your service plan (IPOS) belongs to you',
  citation: 'MCL 330.1712 (individual plan of services)',
  text: `In Michigan, your written plan is called the individual plan of services, often shortened to IPOS. State law says it must be developed in partnership with you, using a process called person-centered planning. That means the plan builds on your strengths and goals, not just what is convenient for the system. A first plan must be started within 7 days of when services begin. The plan can cover things like housing, health care, work, school, transportation, and fun, based on what you want and need. The plan must name the person in charge of making it happen. If you are not happy with your plan, you have the right to ask for a review, and the law says that request should be handled within 30 days. You can ask for a planning meeting any time things change.`,
},
{
  id: 'mi-appeals',
  title: 'Michigan: how to appeal if services are denied or cut',
  citation: 'MDHHS PIHP Appeal and Grievance Technical Requirement; Michigan Office of Administrative Hearings and Rules (MOAHR)',
  text: `If your CMHSP or PIHP denies, reduces, or ends a Medicaid service, they must send you a written notice first. You then have 60 calendar days from the date on that notice to ask them for an internal appeal. If you want your services to keep going while you appeal, ask within 10 calendar days of the notice, or before the change takes effect. If the internal appeal does not go your way, you can ask for a State Fair Hearing, which is an independent review by a judge at the Michigan Office of Administrative Hearings and Rules (MOAHR). You have up to 120 calendar days from the appeal decision letter to request that hearing, but always check the exact deadline printed on your notice. MOAHR has a free phone line for Medicaid beneficiaries at 1-800-648-3397. Appealing is your right, and asking for help with it is normal.`,
},
{
  id: 'mi-complaints-pna',
  title: 'Michigan: reporting problems and free advocacy help',
  citation: 'MCL 330.1755 (office of recipient rights); MDHHS Adult Protective Services; Disability Rights Michigan',
  text: `If you feel your rights were violated where you get services, you can file a Recipient Rights complaint. State law says every community mental health program and licensed hospital must have its own Office of Recipient Rights, and complaint forms are available wherever you receive services or on the MDHHS recipient rights website. If you or someone you know is being abused, neglected, or financially exploited, call Michigan's Adult Protective Services hotline at 855-444-3911. It is free, open 24 hours a day, and workers start looking into reports within 24 hours. For free legal-style advocacy, contact Disability Rights Michigan, the state's federally mandated protection and advocacy organization. You can reach them at 1-800-288-5923, or 517-487-1755, or through drmich.org. You never have to face a rights problem alone.`,
},
```

flags: Could not verify on the live michigan.gov HSW page that applications go through the county CMHSP (only implied by the PIHP/CMHSP delivery structure in the MDHHS waiver amendment PDF, so the chunk says "reach out to" rather than "apply at"); the 60/120/10-day deadlines come from the MDHHS PIHP Appeal and Grievance Technical Requirement contract document rather than a consumer page, so the chunk tells readers to check their notice; no fixed periodic review interval (e.g. annual) for the IPOS was verified in statute, only the 7-day initial plan and 30-day review-on-request in MCL 330.1712; medicaid.gov blocked fetch attempts, so nothing was cited from it; DRM toll-free 1-800-288-5923 is from drmich.org and 517-487-1755 from ndrn.org.
