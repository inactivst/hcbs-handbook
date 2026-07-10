# South Carolina state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://ddsn.sc.gov/services/medicaid-home-and-community-based-waiver-services
- https://ddsn.sc.gov/ddsn-divisions/intellectual-disability-and-related-disabilities/medicaid-hcbs-waiver-programs
- https://www.scstatehouse.gov/code/t44c026.php
- https://ddsn.sc.gov/sites/ddsn/files/PublicDocuments/Case%20Management%20Related%20Memos/m.EDs,%20CEOs,%20CM%20Providers%20-%20Guidelines%20for%20Case%20Management%20Annual%20Planning%20-%20Packet%20(102819).pdf
- https://ddsn.sc.gov/sites/ddsn/files/PublicDocuments/Current%20Directives/535-11-DD%20-%20Appeal%20and%20Reconsideration%20of%20Decisions%20-%20REVISED%20-%20SIGNED%20(022025).pdf
- https://www.scdhhs.gov/appeals/file-appeal
- https://ddsn.sc.gov/reporting-abuse-neglect-or-exploitation
- https://dss.sc.gov/adult-protection/adult-protective-services/how-to-report-abuse-neglect/
- https://www.disabilityrightssc.org/

chunks:
```js
{
  id: 'sc-agency-waivers',
  title: 'South Carolina: who runs HCBS and the main waiver programs',
  citation: 'SC Department of Behavioral Health and Developmental Disabilities, Office of Intellectual and Developmental Disabilities (formerly DDSN); three 1915(c) HCBS waivers',
  text: `In South Carolina, home and community-based waivers for people with intellectual and related disabilities are run by the Office of Intellectual and Developmental Disabilities, known as OIDD. As of April 2025, OIDD became part of a new state agency called the Department of Behavioral Health and Developmental Disabilities, and you may still see the older name, DDSN, on some forms and websites. OIDD runs three Medicaid waivers on behalf of the SC Department of Health and Human Services, the state Medicaid agency. These are the Intellectual Disability and Related Disabilities waiver, called ID/RD, the Community Supports waiver, and the Head and Spinal Cord Injury waiver, called HASCI. The Community Supports waiver has a lower yearly spending cap than the ID/RD waiver, so which one fits you depends on how much support you need. A case manager, sometimes called a service coordinator, is your main point of contact for signing up and using these waivers.`,
},
{
  id: 'sc-rights',
  title: 'South Carolina: your legal rights as a person with an intellectual disability',
  citation: 'South Carolina Code of Laws, Title 44, Chapter 26 (Rights of Clients with Intellectual Disability)',
  text: `South Carolina has a law that lists your rights if you receive services because of an intellectual disability or a related disability. It is Title 44, Chapter 26 of the South Carolina Code of Laws. This law says you keep your rights as a citizen, the same as anyone else, including the right to vote and other legal rights. It protects your right to an appropriate education if you are school age, no matter how significant your disability is. It says the state disability employment services must help you look for work. It also gives you a right to appeal decisions made about your services or treatment. If someone deliberately denies you a right under this law, they can be fined or even face jail time. This chapter applies specifically to people the state has determined have an intellectual disability or a related disability and who receive services through the state system.`,
},
{
  id: 'sc-service-plan',
  title: 'South Carolina: your service plan (the Annual Support Plan)',
  citation: 'SC OIDD (formerly DDSN) Guidelines for Case Management Annual Planning',
  text: `In South Carolina, your main planning document is usually called the Annual Support Plan, sometimes shown as the Individual Support Plan or ISP on older paperwork. Your case manager leads this planning process with you, using an approach called person-centered thinking, which means the plan is supposed to be built around what you want your life to look like, not just what services exist. The plan lists your goals, the supports you need, and which waiver services will help you reach them. It is reviewed at least once a year at your annual planning meeting, and it can also be updated any time your needs or circumstances change during the year. Ask your case manager to walk you through your plan and make sure it reflects your actual goals, not just a standard checklist.`,
},
{
  id: 'sc-appeals',
  title: 'South Carolina: how to appeal if services are denied or cut',
  citation: 'DDSN Directive 535-11-DD, Appeal and Reconsideration of Decisions (revised 2025); SCDHHS Office of Appeals and Hearings',
  text: `If South Carolina denies, reduces, or ends your waiver services, you have two steps you can take. First, you can ask OIDD (formerly DDSN) for a reconsideration of the decision. This request must be in writing within 30 calendar days of when you got the written notice. Second, if you are still not satisfied, or if you want to skip straight to it, you can file an appeal with the SC Department of Health and Health Services, the state Medicaid agency, which holds a fair hearing before a hearing officer. This appeal must also generally be filed within 30 calendar days of the notice. Always check your actual notice for the exact deadline and instructions, since timelines can vary depending on the type of decision. Ask about whether your services can continue unchanged while your appeal is pending, since this is not automatic in every case.`,
},
{
  id: 'sc-complaints-pna',
  title: 'South Carolina: reporting problems and free advocacy help',
  citation: 'SLED Vulnerable Adult Investigations Unit 1-866-200-6066 (DDSN/OIDD residential settings); SC DSS Adult Protective Services 1-888-227-3487 (community settings); Disability Rights South Carolina 1-866-275-7273',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, where you call depends on where the person lives. If the person lives in an OIDD-operated or contracted residential setting, like a group home, report it to the SLED Vulnerable Adult Investigations Unit at 1-866-200-6066. If the person lives in the community, such as their own home or a family home, report it to the Department of Social Services Adult Protective Services at 1-888-227-3487, also written as 1-888-CARE4US. If it is an emergency, call 911 first. For free legal help understanding or fighting for your rights, contact Disability Rights South Carolina at 1-866-275-7273. They are the official protection and advocacy organization for people with disabilities in South Carolina, and their help is free.`,
},
```

flags: The exact current appeal deadline for a first-level SCDHHS fair hearing request (separate from the 30-day DDSN reconsideration step) was not confirmed word-for-word on the SCDHHS appeals page during this research pass, so the draft tells readers to check their notice. Whether aid-paid-pending (services continuing during appeal) is automatic was not confirmed from an official source, so this was hedged rather than stated as fact. Agency name is mid-transition (DDSN to OIDD/BHDD) as of the April 2025 reorganization, so both names may still appear on official materials and forms.
