# Nebraska state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://dhhs.ne.gov/Pages/DD-Regulations-and-Waivers.aspx
- https://dhhs.ne.gov/DD%20Documents/Info%20Sheet%20for%20HCBS%20Waivers.pdf
- https://dhhs.ne.gov/DD%20Documents/Medicaid%20HCBS%20DD%20Waivers%20Quick%20Guide.pdf
- https://dhhs.ne.gov/Pages/DD-Service-Array.aspx
- https://dhhs.ne.gov/Pages/DD-Notice-of-Decision.aspx
- https://www.law.cornell.edu/regulations/nebraska/482-Neb-Admin-Code-ch-7-SS-004
- https://dhhs.ne.gov/Pages/Adult-Protective-Services.aspx
- https://www.disabilityrightsnebraska.org/about_us/contact_us.html
- https://www.ndrn.org/resource/disability-rights-nebraska-receives-2025-advocacy-award/

chunks:
```js
{
  id: 'ne-agency-waivers',
  title: 'Nebraska: who runs HCBS and the main waiver programs',
  citation: 'Nebraska Department of Health and Human Services (DHHS), Division of Developmental Disabilities (DDD); Comprehensive DD, Family Support, and DD Adult Day 1915(c) waivers',
  text: `In Nebraska, the Department of Health and Human Services, through its Division of Developmental Disabilities, runs Medicaid waiver services for people with intellectual and developmental disabilities. There are three main waivers. The Comprehensive Developmental Disabilities Waiver serves people of all ages who need the level of care provided in an intermediate care facility. The Family Support Waiver serves people under 21 who live with their family. The Developmental Disabilities Adult Day Waiver focuses on daytime community activities and job skills for adults 21 and older. As of August 2025, Nebraska eliminated its waiting list for these DD waivers, so if you were told in the past that you had to wait, it is worth checking again with DHHS to see if you can now enroll. A Service Coordinator, sometimes through a local agency, helps you apply and access services.`,
},
{
  id: 'ne-service-plan',
  title: 'Nebraska: your person-centered plan',
  citation: 'Nebraska DHHS Division of Developmental Disabilities, person-centered planning and Service Coordinator process',
  text: `In Nebraska, your DD waiver services are organized in a person-centered plan, sometimes called an Individual Program Plan, Individual Family Support Plan, or Annual Supports Plan depending on your situation. A Service Coordinator works with you, your family, and your providers to build this plan around your own goals, not just around available services. Your Service Coordinator is required to meet with you at least every six months to talk about how the plan is going, and checks in on how it is being carried out on a monthly basis. Your level of care is also reassessed once a year to confirm you still qualify for waiver services. If your needs change before your next scheduled review, you can ask your Service Coordinator to update your plan sooner.`,
},
{
  id: 'ne-appeals',
  title: 'Nebraska: how to appeal if Medicaid services are denied or cut',
  citation: 'Nebraska DHHS Hearing Office, fair hearing and appeal process; 482 Neb. Admin. Code ch. 7, section 004',
  text: `If Nebraska denies, reduces, or ends your Medicaid or DD waiver services, you have the right to ask for a fair hearing. In general, you have 90 days from the date on your notice of decision to request a hearing, or 120 days if the decision came from a managed care health plan. You can appeal with a simple letter to the DHHS Hearing Office, and a hearing officer will review your case before the division director makes the final decision. If you are already receiving a service and the notice says it will be cut or stopped, ask for your appeal quickly, since keeping that service unchanged while you wait usually requires you to file within about 10 calendar days of the notice. Always read your own notice carefully, since it lists your exact deadlines and how to respond.`,
},
{
  id: 'ne-complaints-pna',
  title: 'Nebraska: reporting abuse and free advocacy help',
  citation: 'Nebraska Adult Abuse Hotline 1-800-652-1999; Disability Rights Nebraska 1-800-422-6691',
  text: `If you or someone you know is being abused, neglected, or exploited, call the Nebraska Abuse Hotline at 1-800-652-1999. It is run by the Department of Health and Human Services and is staffed 24 hours a day, every day, for both adult and child reports. If someone is in immediate danger, call 911 first. For free legal help protecting your rights, contact Disability Rights Nebraska at 1-800-422-6691, or 402-413-2016 locally. They are the official protection and advocacy organization for people with disabilities in Nebraska and their help is free. You will not get in trouble for reporting a problem or for asking for help.`,
},
```

flags: Could not confirm from an official Nebraska source a dedicated state disability bill-of-rights statute for DD waiver recipients comparable to Texas Chapter 592, so no rights chunk was written. The 10-day continued-benefits (aid-paid-pending) figure came from search-summarized secondary sources describing 482 Neb. Admin. Code and managed-care appeal pages rather than a direct fetch of the primary regulation text, so the team should verify exact day counts against the official DHHS Hearing Office materials before publishing. Two phone numbers appeared for Disability Rights Nebraska across sources (a Scottsbluff-area 308 number and a Lincoln-area 402 number plus the shared 800 toll-free line); the draft uses the toll-free 1-800-422-6691 and the 402-413-2016 local number pulled directly from the organization's own contact page, since that page was successfully fetched.
