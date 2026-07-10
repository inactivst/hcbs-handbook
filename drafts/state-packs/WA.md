# Washington state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.dshs.wa.gov/dda/home-and-community-based-waivers
- https://www.dshs.wa.gov/dda/pcp
- https://app.leg.wa.gov/wac/default.aspx?cite=388-823-1095
- https://www.hca.wa.gov/about-hca/file-appeal-apple-health-medicaid
- https://www.hca.wa.gov/free-or-low-cost-health-care/i-help-others-apply-and-access-apple-health/continued-coverage-pending-appeal
- https://www.hca.wa.gov/assets/free-or-low-cost/12-506.pdf
- https://www.dshs.wa.gov/report-abuse-and-neglect
- https://disabilityrightswa.org/contact-us/

chunks:
```js
{
  id: 'wa-agency-waivers',
  title: 'Washington: who runs HCBS and the main waiver programs',
  citation: 'Washington State Department of Social and Health Services (DSHS), Developmental Disabilities Administration (DDA); five 1915(c) HCBS waivers',
  text: `In Washington, the Developmental Disabilities Administration (DDA), which is part of the Department of Social and Health Services (DSHS), runs the Medicaid home and community based services for people with intellectual and developmental disabilities. DDA offers five different waivers: Basic Plus, Core, Community Protection, Individual and Family Services, and Children's Intensive In-Home Behavioral Supports. Each waiver has its own eligibility rules and menu of services, so which one fits you depends on your needs and your age. These waivers pay for supports that help you live in your own home or in the community instead of an institution. Becoming a DDA client is only the first step. After you are found eligible, you still need to request specific services, since being enrolled does not automatically start services. If you have questions about which waiver fits you, DDA headquarters can be reached at 360-725-3413.`,
},
{
  id: 'wa-rights',
  title: 'Washington: your rights as a DDA client',
  citation: 'Washington Administrative Code (WAC) 388-823-1095, "What are my rights as a DDA client?"',
  text: `Washington state has a rule that spells out your rights as a person receiving DDA services. It is WAC 388-823-1095. It says you have the right to be free from abuse, punishment, and being locked away against your will. You cannot be treated unfairly because of your race, religion, sex, age, disability, gender identity, or who you love. You get to choose your own food within your plan, have visitors, control your own schedule, and make your own healthcare decisions when you are able to. You have the right to manage your own money or pick someone you trust to help. You can practice your religion, vote, and take part in your community. You have the right to review your own service plan, file a complaint without getting punished for it, and contact your state representative, your doctor, the developmental disabilities ombuds, or a protection and advocacy organization at any time without a provider stopping you. If a provider wants to end your services, they generally must give you 30 days notice, or 72 hours in an emergency.`,
},
{
  id: 'wa-service-plan',
  title: 'Washington: your service plan (Person-Centered Service Plan)',
  citation: 'DSHS DDA Person-Centered Planning; WAC 388-823-1095 (planning participation rights)',
  text: `In Washington, your plan is called a Person-Centered Service Plan. It lays out the type of services you need, how much of each service you get, and who you want to provide them. Your DDA case manager leads this planning process with you, and you can invite anyone you choose, like family, friends, or an advocate, to join the meeting. Before the plan is written, your case manager does an annual assessment, usually in your home or another place you pick, which takes about three hours and covers different areas of your life and support needs. Your plan is reviewed and updated at least once a year during this annual assessment. You do not have to wait for the yearly review if things change. You can ask your case manager for a Plan Amendment any time your needs or goals change.`,
},
{
  id: 'wa-appeals',
  title: 'Washington: how to appeal if services are denied or cut',
  citation: 'Washington Health Care Authority, "File an appeal: Apple Health (Medicaid)" and continued coverage guidance; Office of Administrative Hearings',
  text: `If Washington's Health Care Authority (HCA) denies, reduces, or ends your Medicaid services, you can ask for an administrative hearing. These hearings are held by the Office of Administrative Hearings, a separate state agency, and you can reach them at 1-800-583-8271. In general, you have 90 days from the date on your written notice to request a hearing. There is a shorter, more important deadline if you want your services to keep going while you wait for a decision. To keep getting your current services during the appeal, sometimes called continued benefits, you usually must ask within 10 days of the notice, or before the date the change takes effect, whichever is later. Always check your notice for the exact dates, since they are listed there. Keep in mind that if you ask for continued benefits and later lose the appeal, you could be asked to pay back the cost of services you received during that time, so read your notice about this risk carefully or ask for help understanding it.`,
},
{
  id: 'wa-complaints-pna',
  title: 'Washington: reporting problems and free advocacy help',
  citation: 'DSHS statewide abuse hotline 1-866-363-4276 (1-866-END-HARM); Disability Rights Washington 1-800-562-2702',
  text: `If you or someone you know is being abused, neglected, or exploited, call the Washington DSHS abuse hotline at 1-866-363-4276. People can also remember this as 1-866-END-HARM. The line is answered 24 hours a day, seven days a week, and TTY callers can use 1-800-624-6186. If it is an emergency, call 911 first. For free legal help protecting your rights, contact Disability Rights Washington at 1-800-562-2702, or 206-324-1521. They are the official protection and advocacy organization for people with disabilities in Washington, their phone lines are open weekdays from 9 a.m. to noon and 1 p.m. to 4 p.m., and their help is free. You will not get in trouble for reporting a problem or for asking for help.`,
},
```

flags: No single Washington statute reads as a plain "bill of rights" the way Texas Chapter 592 does. The closest official, specific source is WAC 388-823-1095, an administrative rule rather than a statute, so it was used instead; the team should confirm whether RCW 71A.26.030 (referenced by DDA Policy 5.06 as authority for client rights notification) should also be cited. The HCA appeal deadline (90 days) and continued-benefits deadline (10 days) were confirmed from a WSHCA PDF (12-506.pdf) and search-summarized page content, not a fully rendered fetch of the main appeal page, since that page returned only navigation content to the fetch tool; the team should verify current numbers on an actual notice. Direct DDA phone (360-725-3413) came from search snippets rather than a direct page fetch and should be spot-checked.
