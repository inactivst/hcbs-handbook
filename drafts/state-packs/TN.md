# Tennessee state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.tn.gov/disability-and-aging/disability-aging-programs/ecf-choices.html
- https://www.medicaid.gov/Medicaid-CHIP-Program-Information/By-Topics/Waivers/1115/downloads/tn/TennCare-II/tn-tenncare-ii-amend-27-07072015.pdf
- https://law.justia.com/codes/tennessee/title-33/chapter-3/part-1/section-33-3-101/
- https://www.tn.gov/disability-and-aging/about-us/divisions/person-centered-practice/person-centered-practice.html
- https://www.tn.gov/tenncare/members-applicants/how-to-file-a-medical-appeal.html
- https://www.tn.gov/tenncare/members-applicants/how-to-file-an-eligibility-appeal.html
- https://reportadultabuse.dhs.tn.gov/
- https://www.tn.gov/humanservices/adults/adult-protective-services.html
- https://www.disabilityrightstn.org/get-help/

chunks:
```js
{
  id: 'tn-agency-waivers',
  title: 'Tennessee: who runs HCBS and the main program (this is NOT a standard 1915(c) waiver)',
  citation: 'TennCare (Tennessee\'s Medicaid agency), with the Department of Intellectual and Developmental Disabilities (DIDD); Employment and Community First (ECF) CHOICES, an 1115 demonstration program',
  text: `Tennessee does things differently than most states when it comes to services for people with intellectual and developmental disabilities. Instead of a typical Medicaid waiver, the main program is called Employment and Community First CHOICES, or ECF CHOICES, and it runs under TennCare, which is Tennessee's Medicaid agency, using authority from a broader Section 1115 demonstration rather than a standard 1915(c) waiver. TennCare works with managed care organizations to coordinate ECF CHOICES services, and the Department of Intellectual and Developmental Disabilities, called DIDD, works alongside TennCare on program design and support. In 2016, Tennessee closed new enrollment in its older DIDD waivers and moved new referrals into ECF CHOICES instead. This program is meant to help people become employed and live as independently as possible in their community, with services like personal support at home, job coaching, and independent living skills training. Because Tennessee's model is not a typical waiver, some rules and processes differ from what you might expect if you compare it to states that use standard 1915(c) waivers.`,
},
{
  id: 'tn-rights',
  title: 'Tennessee: your legal rights as a person receiving services',
  citation: 'Tennessee Code Annotated Title 33, Chapter 3, Part 1, "General Rights of All Service Recipients," including Section 33-3-101',
  text: `Tennessee has a state law that protects the rights of people receiving mental health or developmental disability services. It is found in Tennessee Code Annotated Title 33, Chapter 3, Part 1, and the main section is 33-3-101. This law says that a person with a developmental disability has the same rights as everyone else, except where the law itself limits those rights. You cannot be deprived of your liberty just because you have or are believed to have a developmental disability, except in the specific ways the law allows. You have the right to receive services and supports that meet community standards, as long as the facilities, equipment, and staff needed are available. The agency providing your services also has to keep records about the services and supports you receive, and those records must be kept for at least ten years after your services end. This law applies broadly to people receiving mental health, substance abuse, and developmental disability services in Tennessee.`,
},
{
  id: 'tn-service-plan',
  title: 'Tennessee: your service plan (the Person-Centered Support Plan)',
  citation: 'Tennessee Department of Disability and Aging, Person-Centered Practice; DIDD Person-Centered Support Plan (PCSP) process',
  text: `In Tennessee, your plan is called a Person-Centered Support Plan, or PCSP. A Support Coordinator, sometimes through an agency called an Independent Support Coordinator, works with you to build this plan around your own goals and needs. Every PCSP has to be reviewed by state staff before it takes effect, to make sure it actually addresses your needs and supports the services you are asking for. Your plan must be updated at least once a year. If you use certain devices or technology to help you live independently, there is also a yearly review of how well those tools are working for you. If your needs change before your annual review comes up, ask your Support Coordinator about updating your plan sooner rather than waiting.`,
},
{
  id: 'tn-appeals',
  title: 'Tennessee: how to appeal if services are denied or cut',
  citation: 'TennCare, "How to file a medical appeal"; Tennessee Comp. R. & Regs. 1200-13-14-.11, Appeal of Adverse Benefit Determinations',
  text: `If TennCare or ECF CHOICES denies, reduces, or ends your services, you can file a medical appeal. You generally have 60 days from when you learn about the problem to file. You can appeal by phone at 1-800-878-3192, online through your TennCareConnect.TN.gov account, or by mailing in a form. TennCare usually decides an appeal within 90 days of when you file it, but if you have an emergency and your health plan agrees it is urgent, you can get an expedited appeal decided in about a week. Here is the important part about keeping your services during the wait. To have your benefits continue while your appeal is decided, you generally need to file your appeal within 20 days of the date on your notice, or before your coverage end date if that is later. Always check your own notice for the exact deadline, since Tennessee's timelines can vary depending on the type of notice you received.`,
},
{
  id: 'tn-complaints-pna',
  title: 'Tennessee: reporting problems and free advocacy help',
  citation: 'Tennessee Adult Protective Services Hotline 1-888-277-8366 (1-888-APS-TENN); Disability Rights Tennessee 1-800-342-1660',
  text: `If you or someone you know is being abused, neglected, or financially exploited, call Tennessee Adult Protective Services at 1-888-277-8366, also written as 1-888-APS-TENN. The hotline is answered 24 hours a day, seven days a week, and TTY callers can use 1-800-270-1349. You can also file a report online at reportadultabuse.dhs.tn.gov, and reports can be made anonymously. If it is an emergency, call 911 first. For free legal help protecting your rights, contact Disability Rights Tennessee at 1-800-342-1660. They are the official protection and advocacy organization for people with disabilities across all counties in Tennessee, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: As instructed, Tennessee's ECF CHOICES/1115 structure is genuinely different from a standard 1915(c) waiver, and the agency-waivers chunk reflects that rather than assuming a standard model; the team should double check whether DIDD's older 1915(c) waivers (which closed to new enrollment in 2016) still need a mention for anyone still on legacy waivers. The appeal chunk blends TennCare's general medical-appeal deadline (60 days to appeal, 90 days for a decision) with a continuation-of-benefits deadline (20 days) that came from search-summarized regulation content, not a direct fetch of tn.gov (the medical-appeal and eligibility-appeal pages both failed to load directly), so the team should verify these numbers against a live TennCare notice or the Tenn. Comp. R. & Regs. 1200-13-14-.11 text directly. The rights statute (TCA 33-3-101) is a general "equal rights" provision for all service recipients under Title 33, not a developmental-disability-specific bill of rights, so the team may want to check whether DIDD has its own narrower rights regulation.
