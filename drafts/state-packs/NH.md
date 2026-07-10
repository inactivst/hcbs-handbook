# New Hampshire state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.dhhs.nh.gov/programs-services/disability-care/developmental-services/home-and-community-based-services-waivers
- https://www.dhhs.nh.gov/programs-services/disability-care/developmental-services/nh-developmental-disabilities-waiver-and
- https://gc.nh.gov/rules/state_agencies/he-m500.html
- https://law.justia.com/codes/new-hampshire/2021/title-xii/title-171-a/section-171-a-29/
- https://gc.nh.gov/rsa/html/XII/171-A/171-A-mrg.htm
- https://drcnh.org/medicaid-fair-hearing-rights/
- https://www.dhhs.nh.gov/doing-business-dhhs/legal-services/administrative-appeals
- https://www.dhhs.nh.gov/report-concern/adult-abuse
- https://www.dhhs.nh.gov/adult-protection-reporting-line
- https://drcnh.org/contact-us/

chunks:
```js
{
  id: 'nh-agency-waivers',
  title: 'New Hampshire: who runs HCBS and the main waiver program',
  citation: 'NH Department of Health and Human Services (DHHS), Bureau of Developmental Services (BDS); NH Developmental Disabilities (DD) Waiver, run through regional Area Agencies',
  text: `In New Hampshire, the Department of Health and Human Services, through its Bureau of Developmental Services, runs the Medicaid waiver for people with intellectual and developmental disabilities. It is called the NH Developmental Disabilities Waiver, a 1915(c) Medicaid waiver, and it pays for supports like residential services, day services, and supported employment so you can live in your own home or community instead of an institution. New Hampshire also runs a separate Acquired Brain Disorder Waiver and an In-Home Support waiver for children with developmental disabilities. You do not sign up directly with the state. Instead, your local Area Agency, a regional nonprofit designated by DHHS, is your front door for applying, getting a service coordinator, and starting services.`,
},
{
  id: 'nh-rights',
  title: 'New Hampshire: your legal rights as a person with a developmental disability',
  citation: 'New Hampshire RSA 171-A, Section 171-A:29 (Rights Guaranteed)',
  text: `New Hampshire has a law, RSA 171-A, that guarantees rights to people with developmental disabilities, and Section 171-A:29 lists them out. No one can call you legally incompetent to manage your own affairs, sign contracts, hold a license, vote, marry, or make a will just because you have a developmental disability or receive services. Your right to individual dignity must be respected at all times. If you live in a residential service, you have the right to send and receive mail with free postage, have visitors at reasonable times, wear your own clothes, keep and use your own belongings and money, and make private phone calls. Each Area Agency also has a Human Rights Committee, mostly made up of people who are not state employees, that oversees these protections. If any of your rights are restricted, you can appeal that restriction to the DHHS Commissioner.`,
},
{
  id: 'nh-service-plan',
  title: 'New Hampshire: your service plan (the Individual Service Plan)',
  citation: 'NH Admin Rules He-M 500 (Developmental Services); person-centered service planning requirements',
  text: `In New Hampshire, your plan is built through what the state calls person-centered service planning, and the result is written into a Service Agreement. You choose a service coordinator, who can work for your Area Agency or an outside agency, and that person organizes and documents the planning process with you and the people you choose to include. The plan is based on your own goals, needs, and preferences, not a one-size-fits-all template. Before your annual planning meeting, your service coordinator is required to update any evaluations or assessments you need, no less than 45 days ahead of time, and check in on things like your progress toward goals and your interest in employment. This means your Service Agreement is fully reviewed and renewed at least once a year, though you can ask for changes any time your needs change.`,
},
{
  id: 'nh-appeals',
  title: 'New Hampshire: how to appeal if services are denied or cut',
  citation: 'NH DHHS Administrative Appeals Unit fair hearing process',
  text: `If New Hampshire denies, reduces, or ends your Medicaid or home and community based services, you have the right to a fair hearing. You generally have 30 days from the date of the action to request one, and the hearing is handled by the DHHS Administrative Appeals Unit in front of an impartial hearing officer who was not involved in the original decision. If you ask for a hearing before the change takes effect, DHHS generally cannot reduce or stop your services until a decision is made, though if you lose the appeal you may have to pay back the cost of services you kept receiving. If DHHS did not give you the required 10 days advance notice, you can still get your services reinstated if you request a hearing within 10 days of the notice. The whole process is supposed to be finished within 90 days of your request. You can reach the Administrative Appeals Unit at 603-271-4292, or toll free at 1-800-852-3345 extension 14292.`,
},
{
  id: 'nh-complaints-pna',
  title: 'New Hampshire: reporting problems and free advocacy help',
  citation: 'NH DHHS Bureau of Adult and Aging Care Services (Adult Protection) 603-271-7014 or 1-800-949-0470; Disability Rights Center - NH 1-800-834-1721',
  text: `If you or someone you know, age 18 or older, is being abused, neglected, exploited, or unable to care for themselves, you can report it to New Hampshire's Bureau of Adult and Aging Care Services. Call 603-271-7014, or toll free within New Hampshire at 1-800-949-0470, Monday through Friday from 8am to 4:30pm. Outside those hours, on weekends, or on holidays, call your local police department or county sheriff instead. You do not need proof to make a report, and reports are confidential and can be anonymous. If it is an emergency, call 911 first. For free legal help protecting your rights, contact the Disability Rights Center - NH, the state's official protection and advocacy organization, at 1-800-834-1721, or their Concord office at 603-228-0432.`,
},
```

flags: The main DHHS HCBS waivers page and the adult-abuse reporting page both returned 403 to automated fetch, so waiver and hotline details were cross-checked through DHHS-hosted PDFs, admin rules, and search-result excerpts of those same official pages rather than a direct render; team should re-verify the reporting hours and hotline numbers directly on dhhs.nh.gov before publishing. The service plan review cadence (45 days pre-meeting prep, annual renewal) came from He-M 500 administrative rule search excerpts rather than a fully fetched rule text, so exact rule citation numbers should be confirmed.
