# Wyoming state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://health.wyo.gov/healthcarefin/hcbs/
- https://health.wyo.gov/healthcarefin/hcbs/becomeaprovider/dd-cert/
- https://www.medicaid.gov/medicaid/section-1115-demo/demonstration-and-waiver-list/Waiver-Descript-Factsheet/WY
- https://www.law.cornell.edu/regulations/wyoming/agency-048/subagency-0062/chapter-2/048-2-Wyo-Code-R-SSSS-2-4
- https://dfs.wyo.gov/i-need-to-report/abuse-neglect-exploitation/
- https://dfs.wyo.gov/services/elderly-and-disabled/adult-protection-services/
- https://www.wypanda.com/
- https://www.wypanda.com/programs-and-services

chunks:
```js
{
  id: 'wy-agency-waivers',
  title: 'Wyoming: who runs HCBS and the main waiver programs',
  citation: 'Wyoming Department of Health, Healthcare Financing Division, HCBS Section; Comprehensive Waiver and Supports Waiver',
  text: `In Wyoming, the Department of Health runs Medicaid waiver services through its Healthcare Financing Division, in a part of the agency called the HCBS Section. For people with intellectual or developmental disabilities, or an acquired brain injury, there are two main waivers. The Comprehensive Waiver covers a fuller range of services but requires you to meet additional emergency-level criteria to get in. The Supports Waiver offers a smaller, limited budget for services and generally has an easier path to enrollment. Both waivers are meant to help you live in your home or community instead of a facility. You apply and manage your services with help from a Case Manager, who works with you throughout the process.`,
},
{
  id: 'wy-service-plan',
  title: 'Wyoming: your service plan (the Individualized Plan of Care)',
  citation: 'Wyoming Department of Health HCBS Section, Planning Workbook for Individualized Plans of Care',
  text: `In Wyoming, your services are laid out in an Individualized Plan of Care. You work with a Case Manager, who you choose, to figure out which services fit your life and goals. The state gives Case Managers a Planning Workbook to guide this conversation and make sure your plan covers your needs in a person-centered way. Once the plan is put together, it goes to the state for review and approval before services can start. Because your circumstances can change, you can ask your Case Manager to revisit your plan, and the state expects plans to be checked and renewed on a regular cycle to keep your services current. If you are ever unsure what is in your plan or why, your Case Manager is the first person to ask.`,
},
{
  id: 'wy-appeals',
  title: 'Wyoming: how to appeal if services are denied or cut',
  citation: 'Wyoming Statute 42-4-108; Wyoming Office of Administrative Hearings (OAH)',
  text: `If Wyoming denies, reduces, or ends your Medicaid or HCBS services, state law gives you the right to an administrative hearing. Wyoming Statute 42-4-108 requires the Department to offer a hearing to anyone who is denied medical assistance. In general, you have 30 days from the date on your notice to ask for a hearing, but always check the actual notice you received, since it lists your specific deadline and how to file. Hearings are conducted by the Wyoming Office of Administrative Hearings, an independent agency separate from the Department of Health. This draft could not confirm the exact rule for keeping your services in place while you wait for a decision, so if you are already receiving a service that is being reduced or stopped, ask right away, in writing, whether your services will continue during the appeal, and check your notice for that answer too.`,
},
{
  id: 'wy-complaints-pna',
  title: 'Wyoming: reporting problems and free advocacy help',
  citation: 'Wyoming Department of Family Services (DFS) 1-800-457-3659; Protection and Advocacy System, Inc. 1-800-624-7648',
  text: `If you or someone you know is being abused, neglected, or exploited, contact the Wyoming Department of Family Services. Their main toll-free number is 1-800-457-3659, or you can contact your local DFS office directly. If someone is in immediate danger, call 911 first. For free legal help protecting your rights around intellectual or developmental disability services, contact the Protection and Advocacy System, Inc. at 1-800-624-7648, which is their toll-free line for the Intellectual and Developmental Disabilities program. They are Wyoming's official protection and advocacy organization for people with disabilities, and their help is free. You will not get in trouble for reporting a problem or for asking them for help.`,
},
```

flags: No Wyoming-specific disability rights or bill-of-rights statute could be verified for people receiving I/DD HCBS services (searches turned up W.S. 25-10-120, but that section covers patient rights during mental illness hospitalization commitments, not HCBS waiver recipients generally), so no rights chunk was written; this pack ships with 4 chunks instead of 5. The aid-paid-pending rule during a Wyoming Medicaid fair hearing could not be verified from an official source, so that part of the appeals chunk hedges to checking the notice. The DFS abuse phone number used is the department's general toll-free line from its official reporting page; a dedicated adult-protective-services-only hotline number was referenced in secondary sources but not confirmed on an official DFS page during this research pass.
