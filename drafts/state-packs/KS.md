# Kansas state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.kdads.ks.gov/services-programs/long-term-services-supports/home-and-community-based-services-hcbs/waiver-programs/intellectual-developmentally-disabled-i-dd/
- https://www.kdads.ks.gov/services-programs/long-term-services-supports/community-support-waiver
- https://www.kancare.ks.gov/members/help-resources/appeals-fair-hearings
- https://www.kancare.ks.gov/members/help-resources/appeals-fair-hearings/state-fair-hearings
- https://www.drckansas.org/resource-center/hcbs/kancare-grievances-and-appeals
- https://www.dcf.ks.gov/services/PPS/Pages/ReportAdultAbuseNeglect.aspx
- https://www.drckansas.org/about/contact-drc
- https://www.drckansas.org/

chunks:
```js
{
  id: 'ks-agency-waivers',
  title: 'Kansas: who runs HCBS and the main waiver programs',
  citation: 'Kansas Department for Aging and Disability Services (KDADS); I/DD 1915(c) waiver, coordinated through KanCare managed care',
  text: `Kansas is different from many states because it runs almost all of its Medicaid, including waiver services, through managed care plans called KanCare. The Kansas Department for Aging and Disability Services, or KDADS, sets policy for the Intellectual/Developmentally Disabled waiver, known as the I/DD waiver, but your day-to-day services are coordinated through your KanCare managed care organization along with your local Community Developmental Disability Organization, called a CDDO. The CDDO in your area determines your eligibility and connects you to service providers and a case manager. Kansas has a long-known waitlist for the I/DD waiver, historically several years long. In 2026, Kansas rolled out a new Community Support Waiver for people who do not need round-the-clock support, meant to open up access sooner for some applicants, so ask your CDDO whether this newer waiver fits your situation.`,
},
{
  id: 'ks-service-plan',
  title: 'Kansas: your Person-Centered Support Plan',
  citation: 'KDADS I/DD Waiver policy; targeted case management and Person-Centered Support Plan (PCSP) requirements',
  text: `In Kansas, your services are guided by a document called the Person-Centered Support Plan, often shortened to PCSP. Everyone who gets I/DD waiver services is required to have one. Your targeted case manager, who you get to choose from providers connected to your CDDO, works with you and your team to build this plan around your goals and needs. The PCSP lists the services and supports you will receive and how much of each. It is reviewed and updated at least once a year, and you can also ask for a review any time your needs change, not just at the yearly checkpoint. Because you choose your own case manager, if you are not happy with how your plan is being handled, you have the right to ask your CDDO about switching to a different case management provider.`,
},
{
  id: 'ks-appeals',
  title: 'Kansas: how to appeal if KanCare services are denied or cut',
  citation: 'KanCare Appeals and Fair Hearings process (kancare.ks.gov)',
  text: `If your KanCare managed care plan denies, reduces, or ends your HCBS services, you can file an appeal with your managed care organization, called an MCO. If you ask for the appeal within 63 calendar days of the notice, your current services generally keep going unchanged while the MCO reviews your case, and the MCO must decide within 30 calendar days. If you disagree with the MCO's appeal decision, you can then ask for a state fair hearing, generally within 123 calendar days of that decision, and your services can keep going during the state fair hearing too if you ask in time. These are Kansas-specific timelines that are longer than in many other states, but always check the exact dates on your notice, since they can vary by situation. If the hearing officer later rules in your favor, the MCO must pay for the services you kept receiving while you waited.`,
},
{
  id: 'ks-complaints-pna',
  title: 'Kansas: reporting abuse and free advocacy help',
  citation: 'Kansas Protection Report Center 1-800-922-5330; Disability Rights Center of Kansas 1-877-776-1541',
  text: `If you or someone you know is being abused, neglected, or exploited, call the Kansas Protection Report Center at 1-800-922-5330. It is run by the Kansas Department for Children and Families and is staffed 24 hours a day, every day, for both adult and child reports. If someone is in immediate danger, call 911 or local law enforcement first. For free legal help protecting your rights, contact the Disability Rights Center of Kansas at 1-877-776-1541, or 785-273-9661 locally. They are the official protection and advocacy organization for people with disabilities in Kansas, and their help is free. You will not get in trouble for reporting a problem or for asking for help.`,
},
```

flags: Could not confirm from an official Kansas source a dedicated state disability bill-of-rights statute for I/DD service recipients comparable to Texas Chapter 592, so no rights chunk was written; CDDO-level "Your Rights" pages exist (for example Johnson County and Butler County CDDO sites) but those are local provider pages, not a verified statewide statute, so they were not cited. The KDADS I/DD waiver main page returned a 403 to automated fetch, so waiver and CDDO details rely on search-engine summaries of that page plus related KDADS and CDDO pages rather than a direct full-text fetch; the team should verify current KDADS wording before publishing. Appeal timelines (63 days for MCO appeal, 30 days for MCO decision, 123 days for state fair hearing) came from search-summarized secondary sources describing the kancare.ks.gov appeals pages and should be checked against the official KanCare appeals pages directly.
