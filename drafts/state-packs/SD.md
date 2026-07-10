# South Dakota state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://dhs.sd.gov/en/division-developmental-disabilities
- https://dss.sd.gov/docs/medicaid/providers/billingmanuals/HCBS/Family_Support_360.pdf
- https://dss.sd.gov/docs/medicaid/providers/billingmanuals/HCBS/Home_and_Community_Based_Options_and_Person-Centered_Excellence.pdf
- https://dss.sd.gov/keyresources/adminhearings/fairhearing.aspx
- https://dss.sd.gov/keyresources/adminhearings/request.aspx
- https://dss.sd.gov/formsandpubs/docs/ADMIN/GuidetoAdminHearingsProc.pdf
- https://dhs.sd.gov/en/ltss/adult-protective-services
- https://atg.sd.gov/Victim/Seniors/abuse.aspx
- https://drsdlaw.org/contact/
- https://sdlegislature.gov/Statutes/27B-8

chunks:
```js
{
  id: 'sd-agency-waivers',
  title: 'South Dakota: who runs HCBS and the main waiver programs',
  citation: 'South Dakota Department of Human Services (DHS), Division of Developmental Disabilities (DDD); Department of Social Services (DSS) as the Medicaid agency; CHOICES and Family Support 360 (FS360) 1915(c) waivers',
  text: `In South Dakota, the Department of Human Services, through its Division of Developmental Disabilities, runs services for people with intellectual and developmental disabilities. The Department of Social Services is the state Medicaid agency and administers Medicaid rules and payments for the waivers DHS operates. South Dakota runs two main HCBS waivers for this group. CHOICES is the larger, more comprehensive waiver, offering services like residential supports, day services, and supported employment so you can live in the community instead of an institution. Family Support 360, often called FS360, is a self-directed waiver, meaning you or your family can manage and direct more of your own services and supports. Both are federal 1915(c) waivers. Ask your local DDD office or case management agency which waiver best fits your needs.`,
},
{
  id: 'sd-rights',
  title: 'South Dakota: your legal rights as a person with a developmental disability',
  citation: 'South Dakota Codified Laws Chapter 27B-8 (Rights of Persons with Developmental Disabilities)',
  text: `South Dakota has a law that protects your rights while you receive developmental disability services. It is SDCL Chapter 27B-8. This law says that getting services does not take away any of your other rights, benefits, or privileges, and it does not make you legally incompetent. Your rights under this chapter can only be restricted through due process, following the law and the Department of Human Services rules, and only to protect you or others from harm or to help provide you the right services and supports. If restraints are ever used, the law says they can only be used when a person is being destructive and other techniques, like positive behavior support, have already failed, and restraints must be designed to avoid injury and limit discomfort as much as possible. This law also protects the rights of parents or guardians of a minor child receiving services.`,
},
{
  id: 'sd-service-plan',
  title: 'South Dakota: your service plan (the Individualized Service Plan)',
  citation: 'South Dakota DHS Division of Developmental Disabilities case management policy; Individualized Service Plan (ISP), person-centered planning approach',
  text: `In South Dakota, your plan is called an Individualized Service Plan, or ISP. It is built around person-centered planning, using tools like Charting the LifeCourse and Person-Centered Thinking to help figure out what matters most to you and the life you want. Your case manager leads this process, working with you and the people you want involved, such as family or friends, to write the plan and then to coordinate, monitor, and follow up on it over time. Case management itself is meant to be driven by your choices, not just decided for you. By policy, your ISP is reviewed at least once a year, but your case manager should also revisit it sooner if your circumstances change in a meaningful way. Speak up to your case manager any time you want to request a change.`,
},
{
  id: 'sd-appeals',
  title: 'South Dakota: how to appeal if services are denied or cut',
  citation: 'South Dakota DSS Office of Administrative Hearings; Fair Hearing process',
  text: `If South Dakota Medicaid denies, reduces, or ends your services, you have the right to request a Fair Hearing before an Administrative Law Judge. In general, you must ask for the hearing within 30 days of the decision date, but always check the notice DSS sent you, since it states your exact deadline for your situation. To request a hearing, send a signed, written request that includes your reason for appealing, your address, and your phone number to the DSS Office of Administrative Hearings in Pierre, or call 605-773-6851 with questions about the process. The sources checked for this pack did not clearly spell out a South Dakota-specific rule about keeping your services the same while an appeal is pending, so check your notice closely for any instructions about continuing benefits during your appeal, and ask DSS directly if it is not clear.`,
},
{
  id: 'sd-complaints-pna',
  title: 'South Dakota: reporting problems and free advocacy help',
  citation: 'South Dakota Adult Protective Services 1-833-663-9673; Disability Rights South Dakota 1-800-658-4782',
  text: `If you or someone you know is being abused, neglected, or exploited, call South Dakota Adult Protective Services at 1-833-663-9673. All calls are confidential. If someone is in immediate danger, call 911 or your local police first. For free legal help understanding or defending your rights, contact Disability Rights South Dakota, the state's protection and advocacy organization, toll free at 1-800-658-4782, voice and TTY, or locally at 605-224-8294. Their main office is in Pierre, with field staff who also serve Sioux Falls and Rapid City, though it helps to call ahead for those locations. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: The DHS Division of Developmental Disabilities landing page (dhs.sd.gov/en/division-developmental-disabilities) returned a loading placeholder rather than readable content during fetch, so program-name details were pieced together from the CHOICES and FS360 billing manual PDFs and third-party waiver summaries instead of the primary division page; the team should verify directly against the live DHS site. The exact aid-paid-pending rule for South Dakota Medicaid HCBS appeals (whether and how services continue during a pending Fair Hearing) could not be confirmed from an official page in the time available, so that chunk hedges and tells the reader to check their notice and ask DSS directly.
