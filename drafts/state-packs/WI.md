# Wisconsin state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.dhs.wisconsin.gov/iris/index.htm
- https://www.dhs.wisconsin.gov/publications/p01008.pdf
- https://www.dhs.wisconsin.gov/publications/p0/p00708.pdf
- https://www.dhs.wisconsin.gov/familycare/fullpartner.htm
- https://www.dhs.wisconsin.gov/familycare/mcos/index.htm
- https://law.justia.com/codes/wisconsin/chapter-51/section-51-61/
- https://docs.legis.wisconsin.gov/statutes/statutes/51/61/1/j
- https://www.emhandbooks.wisconsin.gov/meh-ebd/policy_files/23/23.2.htm
- https://www.familyvoiceswi.org/wp-content/uploads/2019/06/Advocates-Guide-to-a-Fair-Hearing.pdf
- https://www.dhs.wisconsin.gov/aps/report.htm
- https://www.dhs.wisconsin.gov/aps/aar-agencies.htm
- https://gwaar.org/elder-abuse-hotline
- https://disabilityrightswi.org/contact-us/

chunks:
```js
{
  id: 'wi-agency-waivers',
  title: 'Wisconsin: who runs HCBS and the main programs',
  citation: 'Wisconsin Department of Health Services (DHS); IRIS (Include, Respect, I Self-Direct) and Family Care, both Medicaid HCBS long-term care programs',
  text: `In Wisconsin, the Department of Health Services runs the state's Medicaid long-term care programs, and people with intellectual and developmental disabilities usually use one of two of them. IRIS, which stands for Include, Respect, I Self-Direct, lets you manage your own budget and hire your own workers with help from an IRIS Consultant Agency. Family Care is a managed care program where a care team, including a nurse and a care manager, arranges services for you. Unlike some states, Wisconsin does not run a separate waiver just for people with intellectual and developmental disabilities. Instead, IRIS and Family Care serve people with developmental disabilities, physical disabilities, and older adults together under the same programs. Your local Aging and Disability Resource Center, called an ADRC, is usually where you start to apply.`,
},
{
  id: 'wi-rights',
  title: "Wisconsin: your rights as a patient receiving DD services",
  citation: 'Wisconsin Statutes Section 51.61 ("Patients rights")',
  text: `Wisconsin has a law that protects the rights of people receiving services for developmental disabilities, mental illness, or drug and alcohol treatment. It is Section 51.61 of the Wisconsin Statutes, often called the patients rights law. Under this law, the state must set up procedures to protect your rights and a grievance process so you can complain if those rights are not honored. You have the right to give informed, written consent before you receive treatment, unless a court has found you unable to consent. If a facility ever needs to use restraint or isolation, the law says it can only be used in an emergency to prevent you from harming yourself or others, and your dignity and safety must be protected. If you think your rights under this law were violated, you can use the grievance procedure through your provider or county, or contact Disability Rights Wisconsin.`,
},
{
  id: 'wi-service-plan',
  title: 'Wisconsin: your service plan (IRIS support and service plan, or Family Care member-centered plan)',
  citation: 'Wisconsin DHS IRIS Policy Manual; Family Care and Family Care Partnership program materials',
  text: `Your service plan in Wisconsin depends on which program you are in. If you are in IRIS, your plan is called a support and service plan, and you build it together with your IRIS consultant, based on your own long-term goals and how you want to reach them. Your IRIS consultant agency reviews the plan to make sure it meets program standards. If you are in Family Care, your plan is called a member-centered plan, and it is created with your interdisciplinary team, which includes a nurse and a care manager, within 60 days of when you enroll. In both programs, your care team or consultant checks in with you regularly, and the plan is meant to be updated whenever your needs or goals change, not just on a fixed yearly schedule. Ask your consultant or care manager about the exact review timeline that applies to you.`,
},
{
  id: 'wi-appeals',
  title: 'Wisconsin: how to appeal if services are denied or cut',
  citation: 'Wisconsin Department of Administration, Division of Hearings and Appeals (DHA); Medicaid Eligibility Handbook Section 23.2',
  text: `If Wisconsin denies, reduces, or ends your Medicaid or long-term care services, you can ask for a state fair hearing through the Division of Hearings and Appeals. Sources reviewed for this pack gave slightly different appeal windows, generally somewhere between 45 and 60 days from the date of the decision, so always check the exact deadline printed on your notice rather than relying on a single number. If you want your current services to keep going while you wait for a decision, you generally need to ask for that within 10 days of getting the notice, or before the change takes effect, whichever is sooner. You can send your written hearing request to the Division of Hearings and Appeals in Madison. A Family Voices of Wisconsin guide and your managed care organization can help you prepare for the hearing.`,
},
{
  id: 'wi-complaints-pna',
  title: 'Wisconsin: reporting problems and free advocacy help',
  citation: 'Wisconsin Elder Abuse Hotline 1-833-586-0107; county Adult Protective Services (ADRC); Disability Rights Wisconsin 1-800-928-8778',
  text: `If you or someone you know age 60 or older is being abused or neglected, you can call the statewide Wisconsin Elder Abuse Hotline at 1-833-586-0107. For adults under 60 who are at risk, Wisconsin handles reports at the county level, so contact your county's Adult Protective Services unit, often based at your local Aging and Disability Resource Center. If it is an emergency, call 911 first. For free legal help with your rights, contact Disability Rights Wisconsin at 1-800-928-8778. They are the official protection and advocacy organization for people with disabilities in Wisconsin, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: Wisconsin's Medicaid fair hearing deadline could not be pinned to one single confirmed number; different official-adjacent sources referenced both a 45-day and a 60-day window, so the wi-appeals chunk hedges and tells the reader to check their notice rather than stating one figure as fact. The county-level abuse and neglect reporting number for adults under 60 was not resolved to one statewide phone number (Wisconsin routes this through individual county APS/ADRC offices), so no single number is given for that case, only guidance to contact the local ADRC. The dhs.wisconsin.gov/aps/report.htm page returned a 403 to automated fetch, so the elder abuse hotline number was confirmed through multiple secondary sources (gwaar.org, reportelderabusewi.org) that themselves cite the DHS page rather than a direct read of the DHS page text.
