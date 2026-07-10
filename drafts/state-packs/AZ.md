# Arizona state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.azahcccs.gov/Members/GetCovered/Categories/DD-ALTCS.html
- https://www.azahcccs.gov/Resources/Federal/waiver.html
- https://des.az.gov/sites/default/files/DDD-Operations-Manual-Chapter-2000-Support-Coordination.pdf
- https://www.azleg.gov/ars/36/00551-01.htm
- https://des.az.gov/services/disabilities/developmental-disabilities/-individuals-and-families/request-an-appeal-on-an-adverse-benefit-determination
- https://des.az.gov/services/basic-needs/adult-protective-services/report-adult-abuse
- https://disabilityrightsaz.org/about/contact-us/

chunks:
```js
{
  id: 'az-agency-waivers',
  title: 'Arizona: who runs HCBS and the main program (this is NOT a standard 1915(c) waiver)',
  citation: 'Arizona Health Care Cost Containment System (AHCCCS); Division of Developmental Disabilities (DDD), Arizona Department of Economic Security (DES); Arizona Long Term Care System (ALTCS) under a Section 1115 demonstration waiver',
  text: `Arizona does things a little differently than most states. Instead of a typical Medicaid waiver, Arizona runs its whole Medicaid program, including long-term services for people with disabilities, under one big federal agreement called a Section 1115 demonstration waiver. AHCCCS is the state agency in charge of Medicaid overall. If you have a developmental disability and need long-term care, you apply through the Arizona Long Term Care System, known as ALTCS. If you are found eligible, you are usually connected to the Division of Developmental Disabilities, called DDD, which is part of the Arizona Department of Economic Security, or DES. DDD and AHCCCS work together, with DDD coordinating your day-to-day services and supports and AHCCCS overseeing the Medicaid rules. Because Arizona is not using a standard 1915(c) waiver, some of the appeal and planning steps look different from what you might read about other states.`,
},
{
  id: 'az-rights',
  title: 'Arizona: your legal rights as a person with a developmental disability',
  citation: 'Arizona Revised Statutes Section 36-551.01, "Persons with developmental disabilities; rights guaranteed"',
  text: `Arizona has a state law that protects your rights, found in Arizona Revised Statutes Section 36-551.01. It says you cannot be denied the rights, benefits, and privileges guaranteed to everyone else under the United States Constitution and Arizona law just because you have a developmental disability. You have the right to be protected from exploitation and abuse. If the state provides your residential care, you have the right to live in the least restrictive setting available for you. You have the right to be free from mistreatment, neglect, and abuse by the people and agencies that provide your services. You also have the right to be free from unnecessary or excessive medication. Your medicine cannot be used as punishment, to make things easier for staff, or in place of your actual service plan. If you or your parent or guardian believes your rights were violated, the law gives you the right to petition the superior court for help.`,
},
{
  id: 'az-service-plan',
  title: 'Arizona: your service plan (the Individual Support Plan)',
  citation: 'DES/DDD Operations Manual, Chapter 2000, Support Coordination',
  text: `In Arizona, your plan is called an Individual Support Plan, or ISP. It lists your needs, your goals, and the services that will help you reach them. A DDD Support Coordinator, which works like a case manager, is assigned to you and works with you to build the ISP. Your annual planning meeting sets your plan for the coming year, and DDD holds review meetings before that date if anything needs to change sooner. Your Support Coordinator is responsible for writing, reviewing, and checking in on your ISP on a regular schedule set by DDD rules, and a supervisor also reviews the plan to make sure your needs are being met. If your needs change during the year, you can ask your Support Coordinator for a review meeting instead of waiting for the annual one.`,
},
{
  id: 'az-appeals',
  title: 'Arizona: how to appeal if services are denied or cut',
  citation: 'Arizona DES/DDD, "Request an Appeal on a Notice of Adverse Benefit Determination"; AHCCCS state fair hearing process',
  text: `If DDD or AHCCCS sends you a Notice of Adverse Benefit Determination denying, reducing, or ending your services, you have 60 calendar days from the date of that notice to file an appeal. You send your appeal to the DDD Office of Administrative Review, and their phone number is 602-771-8163 or 1-844-770-9500, option 3. DDD reviews the appeal first and is supposed to issue a decision within 30 calendar days. For some kinds of services, like physical health, behavioral health, or nursing facility care, DDD hands the appeal to your DDD health plan instead. If you disagree with that first decision, AHCCCS handles the final state fair hearing. Here is the important part about keeping your services during the wait: if your appeal is about a service being reduced or ended, you can ask for it to continue, but you must file your appeal before the change takes effect or within 10 calendar days of the notice, whichever is later. If you lose the appeal, you might have to pay back the cost of services you kept getting, so always read your notice carefully or ask for help understanding it.`,
},
{
  id: 'az-complaints-pna',
  title: 'Arizona: reporting problems and free advocacy help',
  citation: 'Arizona Adult Protective Services hotline 1-877-767-2385 (1-877-SOS-ADULT); Disability Rights Arizona 1-800-927-2260 (Phoenix) or 1-800-922-1447 (Tucson)',
  text: `If you or someone you know is being abused, neglected, or exploited, call Arizona Adult Protective Services at 1-877-767-2385, also written as 1-877-SOS-ADULT. Phone reporting is answered Monday through Friday from 7 a.m. to 7 p.m., and weekends and state holidays from 10 a.m. to 6 p.m., but you can also file a report online any time. If it is a life-threatening emergency, call 911 first. For free legal help protecting your rights, contact Disability Rights Arizona, also called the Arizona Center for Disability Law. Their Phoenix office is 602-274-6287 or toll-free 1-800-927-2260, and their Tucson office is 520-327-9547 or toll-free 1-800-922-1447. They are Arizona's federally designated protection and advocacy organization, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: Arizona's structure genuinely differs from a standard 1915(c) waiver model, as flagged in the task; the az-agency-waivers chunk describes the 1115/ALTCS/DDD relationship as found in official sources, but the team should double check whether "waiver" terminology should even be used for members, since AHCCCS itself frames this as a demonstration, not a waiver in the 1915(c) sense. The DDD appeal phone numbers and the 30-day DDD-level decision timeframe came from a search-tool summary of the DES appeal page rather than a raw page fetch, so the team should verify those digits directly against the live page or a current denial notice. The APS hotline hours and phone number should be spot-checked since Arizona has multiple related lines (APS, AHCCCS grievances, DES general).
