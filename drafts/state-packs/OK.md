# Oklahoma state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://oklahoma.gov/okdhs/services/dds/homecbws.html
- https://oklahoma.gov/ohca/individuals/programs/ltcs/developmental-disabilities-service-division-ddsd-home-and-community-based-services-waiver1.html
- https://oklahoma.gov/okdhs/services/dds.html
- https://www.law.cornell.edu/regulations/oklahoma/OAC-340-100-3-1.2
- https://oklahoma.gov/okdhs/library/policy/current/oac-340/chapter-100/subchapter-5/parts-5/the-personal-support-team-team.html
- https://oklahoma.gov/ohca/policies-and-rules/xpolicy/grievance-procedures-and-process/subchapter-three-member-grievances-and-appeals-provider-complaints-and-state-fair-hearings-in-soonerselect/continuation-of-benefits-pending-appeal-and-state-fair-hearing.html
- https://oklahoma.gov/okdhs/contact-us/dhshotlines.html
- https://oklahoma.gov/okdhs/services/reportabuse.html
- https://okdlc.org/contact-us/

chunks:
```js
{
  id: 'ok-agency-waivers',
  title: 'Oklahoma: who runs HCBS and the main waiver programs',
  citation: 'Oklahoma Human Services, Developmental Disabilities Services (DDS), under the Oklahoma Health Care Authority (OHCA); HCBS waivers for intellectual disabilities',
  text: `In Oklahoma, Developmental Disabilities Services (DDS), part of Oklahoma Human Services, runs day-to-day waiver services for people with intellectual disabilities, and the Oklahoma Health Care Authority (OHCA) is the state Medicaid agency that oversees the waivers. The main waiver is called the Community Waiver, and it covers residential, employment, and habilitation supports for people age 3 and up. Oklahoma also has the In-Home Supports Waiver for Adults, the In-Home Supports Waiver for Children, and the Homeward Bound Waiver. These waivers help you get support while living in your own home or a small community setting instead of an institution. Because Oklahoma has waiting lists for some waivers, it helps to apply and get on the DDS waiting list as early as possible. You can reach DDS at 405-521-3571, or toll free at 866-521-3571, for questions about applying.`,
},
{
  id: 'ok-rights',
  title: 'Oklahoma: your rights as a person receiving DDS services',
  citation: 'Oklahoma Administrative Code 340:100-3-1.2 (Rights)',
  text: `Oklahoma has a rule that lists your rights as a person receiving Developmental Disabilities Services. It is Oklahoma Administrative Code section 340:100-3-1.2. Under this rule, you have the right to take part in decisions about where you live, including your home setting, your furnishings, and who you live with. You have the right to be told about and to agree in writing before any money is taken from your personal funds. You have the right to receive positive, respectful approaches in every service you get. You also have the right to due process, meaning a fair process, if you disagree with a decision about your services. If you are a minor or have a legal guardian, your guardian or parent may exercise these rights for you. Your case manager must tell you and your guardian about these rights and write them into your Individual Plan.`,
},
{
  id: 'ok-service-plan',
  title: 'Oklahoma: your service plan and personal support team',
  citation: 'Oklahoma Human Services DDS policy, OAC 340:100, Subchapter 5 (The Personal Support Team)',
  text: `In Oklahoma, your plan is built by a group called your Personal Support Team, and it is written up as your Individual Plan. Your team includes you, your legal guardian or advocate if you have one, and your DDS case manager. Before each meeting, your case manager talks with you and your guardian or advocate about your vision for your life and how things are going. The plan is reviewed at least once a year at your annual Team meeting, using a form called the Annual Review. Between meetings, everyone helping with a part of your plan sends a quarterly update to your case manager so your team can see how things are going. Your case manager is responsible for making sure the plan is put into action and that it still fits your needs.`,
},
{
  id: 'ok-appeals',
  title: 'Oklahoma: how to appeal if Medicaid services are denied or cut',
  citation: 'Oklahoma Administrative Code 317:2-3-5.1 (Continuation of benefits pending appeal); OHCA state fair hearing process',
  text: `If Oklahoma denies, reduces, or ends your Medicaid services, you have the right to ask for a state fair hearing through the Oklahoma Health Care Authority. You generally have 120 days from the date on your notice to request the hearing. If you want your services to keep going while you wait for a decision, timing matters a lot: under state rules, you usually need to ask for the hearing and for continued benefits within 10 days of the notice, or by the date your services are set to change, whichever is later. Because these deadlines are strict and can change, always check the exact dates printed on your denial notice and call the number listed on it right away if you want to keep your services during the appeal. Hearings can be held by phone, video, or in person, and you can bring a family member, advocate, or lawyer to help you.`,
},
{
  id: 'ok-complaints-pna',
  title: 'Oklahoma: reporting problems and free advocacy help',
  citation: 'Oklahoma Abuse and Neglect Hotline 1-800-522-3511; Disability Rights Oklahoma 1-800-880-7755',
  text: `If you or someone you know is being abused, neglected, or exploited, call the Oklahoma Abuse and Neglect Hotline at 1-800-522-3511. It is answered 24 hours a day, every day, and you can also report online. You can make a report anonymously, and you will not get in trouble for reporting in good faith. If it is an emergency, call 911 first. For free legal help protecting your rights, contact Disability Rights Oklahoma at 1-800-880-7755 (voice and TDD). They have offices in Oklahoma City and Tulsa and are the official Protection and Advocacy organization for people with disabilities in Oklahoma. Their help is free.`,
},
```

flags: Could not verify a single standalone "Bill of Rights" statute for Oklahomans with intellectual disabilities comparable to Texas Chapter 592; the rights chunk instead cites the DDS administrative rule OAC 340:100-3-1.2, which is verified but narrower in scope (agency service rights, not a broad civil-rights statute). The appeal deadline and aid-paid-pending rules came from two different OHCA sources (one search summary citing 120 days for hearing requests generally, another citing OAC 317:2-3-5.1 with a 10-day/30-day continuation window) that were not fully reconciled against each other; the draft tells people to rely on their notice for exact dates. DDSD phone number was from a search-engine AI summary, not a directly fetched page, so it should be re-verified against the DDS homepage before publishing.
