# Montana state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://dphhs.mt.gov/BHDD/DisabilityServices/developmentaldisabilities/MedicaidDDP0208WaiverServices
- https://dphhs.mt.gov/BHDD/DisabilityServices/developmentaldisabilities/
- https://dphhs.mt.gov/assets/BHDD/DDP/Qualified%20Provider%20Process/DraftProviderManual072624.pdf
- https://dphhs.mt.gov/assets/BHDD/DDP/PoliciesandProcedures/PSPManual032224.pdf
- https://montana-sit.assurecare.com/McHelp/Content/DDP_CM_PSP_Review_and_Revision.htm
- https://dphhs.mt.gov/administrativehearings/faq
- https://dphhs.mt.gov/assets/hcsd/mamanual/CMA1505-1July012016.pdf
- http://dphhs.mt.gov/sltc/aps/
- https://disabilityrightsmt.org/contact-us/
- https://leg.mt.gov/bills/mca/title_0530/chapter_0200/parts_index.html
- https://leg.mt.gov/bills/mca/title_0530/chapter_0200/part_0010/section_0410/0530-0200-0010-0410.html
- https://leg.mt.gov/bills/mca/title_0530/chapter_0200/part_0010/section_0480/0530-0200-0010-0480.html

chunks:
```js
{
  id: 'mt-agency-waivers',
  title: 'Montana: who runs HCBS and the main waiver program',
  citation: 'Montana Department of Public Health and Human Services (DPHHS), Developmental Disabilities Program (DDP); 0208 Comprehensive Waiver, a 1915(c) waiver',
  text: `In Montana, the Department of Public Health and Human Services, or DPHHS, runs Medicaid waiver services for people with intellectual and developmental disabilities through its Developmental Disabilities Program, called the DDP. Montana currently runs one HCBS waiver for this group, called the 0208 Comprehensive Waiver. It is a federal 1915(c) waiver, and it pays for supports like residential help, day services, and other help so you can live in your own home or community instead of an institution. To qualify, you generally need a documented intellectual disability, cerebral palsy, epilepsy, autism, or a similar neurological condition that started before age 18 and is expected to last indefinitely. Because there are limited waiver slots and funding, Montana keeps a waiting list, so ask your regional DDP office to get your name on it as soon as you think you may need services. DDP has regional offices in Glasgow, Great Falls, Billings, Helena, and Missoula, plus smaller satellite offices.`,
},
{
  id: 'mt-service-plan',
  title: 'Montana: your service plan (the Personal Support Plan)',
  citation: 'DPHHS Developmental Disabilities Program, Personal Support Plan (PSP) Manual and Procedure Manual',
  text: `In Montana, your main plan is called the Personal Support Plan, or PSP. It is a person-centered plan that describes your goals and the services and supports your team agrees you need to live a good life in your community. Anyone getting Targeted Case Management or 0208 Comprehensive Waiver services must have an active PSP. Your Targeted Case Manager, sometimes called a TCM, schedules and leads your planning meeting along with you, your legal representative if you have one, your providers, and anyone else you choose to include. The PSP is reviewed and updated at least once a year at your annual PSP meeting, and your team also holds a Mid-Year Review Meeting partway through the year to check how things are going. If your team agrees to changes to your PSP, those changes are supposed to be put into action within 21 days of the meeting.`,
},
{
  id: 'mt-appeals',
  title: 'Montana: how to appeal if services are denied or cut',
  citation: 'DPHHS Office of Administrative Hearings; Combined Medicaid Manual 1505-1 (Fair Hearings, Administrative Reviews, and Appeals)',
  text: `If Montana Medicaid denies, reduces, or ends your services, you have the right to ask for an Administrative Hearing, sometimes called a fair hearing. In general, your written request must be received within 90 days from the date on the notice DPHHS mailed you. The notice you receive should include an Administrative Hearing request form and instructions for how to send it in. If you want your services to keep going the same way while your appeal is decided, you usually need to ask for the hearing quickly, often before the date your services are set to change, so check your notice closely for the exact deadline for keeping your services in place. You can have someone help you at the hearing, such as a family member, friend, or lawyer. If you are not sure about a deadline or what counts as timely, always check the specific notice you received, since it has your case's exact dates.`,
},
{
  id: 'mt-complaints-pna',
  title: 'Montana: reporting problems and free advocacy help',
  citation: 'Montana Adult Protective Services 1-844-277-9300; Disability Rights Montana 1-800-245-4743',
  text: `If you or someone you know is being abused, neglected, or exploited, call Montana Adult Protective Services at 1-844-277-9300. This line is answered Monday through Friday, 8 a.m. to 5 p.m., except holidays, and you can also file a report online. If it is an emergency or someone is in immediate danger, call 911 first. For free help understanding or defending your rights, contact Disability Rights Montana, the state's protection and advocacy organization, at 1-800-245-4743 toll-free, or 406-449-2344. Disability Rights Montana is part of the federally funded protection and advocacy system and helps Montanans with disabilities with legal problems related to their rights. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: Montana Code Annotated Title 53, Chapter 20 (Developmental Disabilities) does contain rights-adjacent sections, such as 53-20-141 (Denial of legal rights) and 53-20-148 (Right to habilitation), but these sit in Part 1 ("Treatment"), which is framed around residential facility commitment rather than a general bill of rights for people receiving HCBS waiver or community-based services. Because it did not clearly generalize the way Texas Health and Safety Code Chapter 592 does, no mt-rights chunk was included; the team should have a Montana-licensed reviewer confirm whether a broader rights statute applies to DDP waiver recipients specifically. The DDPServicesOverview.pdf did not render as readable text during fetch, so PSP review-cadence details rely on the PSP Manual, Procedure Manual, and the AssureCare help-portal page instead. The exact aid-paid-pending deadline (how many days before the change date you must file to keep services running) could not be confirmed from a single authoritative page; the chunk hedges to "check your notice."
