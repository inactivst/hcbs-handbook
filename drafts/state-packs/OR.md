# Oregon state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.oregon.gov/odhs/idd/pages/waivers.aspx
- https://www.oregon.gov/odhs/compass/pages/isp.aspx
- https://oregon.public.law/rules/oar_411-415-0070
- https://www.oregon.gov/odhs/idd/pages/hearings.aspx
- https://droregon.org/dro-publishes-new-guide-to-appealing-developmental-disability-denials/
- https://www.oregon.gov/odhs/report-abuse/pages/default.aspx
- https://www.ndrn.org/about/ndrn-member-agencies/
- https://www.droregon.org/

chunks:
```js
{
  id: 'or-agency-waivers',
  title: 'Oregon: who runs HCBS and the main waiver programs',
  citation: 'Oregon Department of Human Services (ODHS), Office of Developmental Disabilities Services (ODDS); Adults I/DD HCBS Waiver, Behavioral Waiver, Medically Fragile and Medically Involved Waivers, plus the K Plan (Community First Choice)',
  text: `In Oregon, the Department of Human Services, through its Office of Developmental Disabilities Services, runs Medicaid home and community-based waivers for people with intellectual and developmental disabilities. Oregon has several waivers rather than just one, including an Adults' waiver, a Behavioral Waiver, and waivers for children and people who are medically fragile or medically involved. On top of these waivers, Oregon also uses something called the K Plan, which is a different kind of Medicaid program authorized under the Affordable Care Act, sometimes called the 1915(k) Community First Choice Option. The K Plan pays for home and community-based attendant services, and you can still get other Medicaid-funded and non-Medicaid-funded supports even while on the K Plan. Your local Community Developmental Disability Program, or CDDP, or a support services brokerage, is usually your local starting point for services.`,
},
{
  id: 'or-rights',
  title: 'Oregon: your rights and your Individual Support Plan process',
  citation: 'Oregon Administrative Rules 411-004-0030 (person-centered planning) and 411-415-0070 (service planning)',
  text: `Oregon's developmental disability rules require that your services be planned using a person-centered process, meaning your plan has to be built around your own life, your independence, and your ability to be included in your community, including opportunities to work in a real job alongside people without disabilities. We looked for a single standalone Oregon statute that works like a specific disability bill of rights, similar to what some other states have, and we could not confirm one from the official sources checked in this pass. Because of that, this chunk describes the person-centered planning protections that are clearly written into Oregon's administrative rules, and the team should research further, including Oregon Revised Statutes Chapter 427, before treating this as a full rights statute chunk.`,
},
{
  id: 'or-service-plan',
  title: 'Oregon: your service plan (the Individual Support Plan)',
  citation: 'Oregon ODHS Individual Support Planning (Compass); Oregon Administrative Rule 411-415-0070',
  text: `In Oregon, your main planning document is called your Individual Support Plan, or ISP. A Personal Agent, sometimes called a case manager or caseworker, works with you to build and update this plan using a person-centered approach that is supposed to reflect how you want to live your life, not just a list of services. If you are not enrolled in waiver or Community First Choice services, you may instead have something called an Annual Plan, which is a different, simpler document. Your ISP is renewed at least once a year, but it is meant to be a living document, so it can and should be updated any time your life or your needs change, not just at your yearly meeting.`,
},
{
  id: 'or-appeals',
  title: 'Oregon: how to appeal if services are denied or cut',
  citation: 'ODHS Administrative Hearings for I/DD Services; Oregon Administrative Hearing Request Form SDS 0443DD',
  text: `If Oregon denies, reduces, or ends your developmental disability services, you have the right to ask for a hearing in front of an Administrative Law Judge. You can request a hearing in writing by mailing or faxing the Administrative Hearing Request form to the Office of Developmental Disability Services, or you can make a verbal request to your local CDDP office, support service brokerage, caseworker, or an ODDS or DHS employee. In most cases you must ask for the hearing within 90 days of the date on your Notification of Planned Action. Here is an important protection: if your services are being ended and you request the hearing within 10 days of getting that notice, your services are supposed to keep going at the same level until the hearing is held and a decision is issued, and you do not need to separately ask for this continuation. Always check your actual notice for the exact deadline that applies to your situation.`,
},
{
  id: 'or-complaints-pna',
  title: 'Oregon: reporting problems and free advocacy help',
  citation: 'Oregon Abuse Reporting Hotline 1-855-503-7233 (855-503-SAFE); Disability Rights Oregon 503-243-2081 or 1-800-452-1694',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, call the Oregon abuse hotline at 1-855-503-7233, also written as 855-503-SAFE. This line covers people 18 and older with physical or developmental disabilities or a mental health condition, and it is open 24 hours a day, every day of the year. You can report anonymously, and state law protects the confidentiality of anyone who reports. If it is an emergency, call 911 first. For free legal help understanding or fighting for your rights, contact Disability Rights Oregon at 503-243-2081 or toll-free at 1-800-452-1694. They are Oregon's official protection and advocacy organization for people with disabilities, and their help is free.`,
},
```

flags: Could not confirm a standalone Oregon disability bill of rights statute comparable to Texas Chapter 592, South Carolina Chapter 26, or Alabama Chapter 9C from the official sources checked in this pass, so the rights chunk was built around the confirmed person-centered planning rules instead and flags the gap directly. Disability Rights Oregon's own website pages fetched during this research did not display a phone number (it may be rendered by JavaScript that the fetch tool could not execute), so the phone number used here was confirmed instead through the NDRN member agency directory, which the rules allow. The 90-day general appeal deadline and 10-day continuing-benefits window came from the ODHS I/DD hearings page; exact deadlines can vary by notice type, so the draft tells readers to check their actual notice.
