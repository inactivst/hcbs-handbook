# Louisiana state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://ldh.la.gov/office-for-citizens-with-developmental-disabilities/supports-waiver
- https://ldh.la.gov/office-for-citizens-with-developmental-disabilities/new-opportunities-waiver
- https://ldh.la.gov/disabilities
- https://law.justia.com/codes/louisiana/revised-statutes/title-28/rs-28-452-1/
- https://ldh.la.gov/office-for-citizens-with-developmental-disabilities/support-coordination
- https://ldh.la.gov/assets/docs/OCDD/waiver/NOW/Guidelines_Support_Planning.pdf
- https://ldh.la.gov/medicaid/how-to-appeal-medicaid
- https://ldh.la.gov/office-of-aging-and-adult-services/adult-protective-services
- https://disabilityrightsla.org/contact-us/

chunks:
```js
{
  id: 'la-agency-waivers',
  title: 'Louisiana: who runs HCBS and the main waiver programs',
  citation: "Louisiana Department of Health (LDH), Office for Citizens with Developmental Disabilities (OCDD); New Opportunities Waiver, Supports Waiver, Children's Choice Waiver, Residential Options Waiver",
  text: `In Louisiana, Medicaid home and community-based waivers for people with developmental disabilities are run by the Office for Citizens with Developmental Disabilities, called OCDD, which is part of the Louisiana Department of Health. There are four main waivers. The New Opportunities Waiver, or NOW, offers the widest range of supports and is meant for people with more intensive needs. The Supports Waiver serves adults 18 and older whose needs can be met without 24-hour support. The Children's Choice Waiver serves children, and the Residential Options Waiver focuses on housing supports. To qualify for most of these waivers you must meet Louisiana's legal definition of a developmental disability and meet a level of care similar to what an intermediate care facility for people with intellectual disabilities would provide. You can contact OCDD directly at 225-342-0095, and a Support Coordinator will be your main point of contact once you are approved.`,
},
{
  id: 'la-rights',
  title: 'Louisiana: your legal rights as a person with a developmental disability',
  citation: 'Louisiana Revised Statutes Title 28, Chapter 28:451 and following ("Developmental Disability Law")',
  text: `Louisiana has a law that protects the rights of people with developmental disabilities. It is found in Title 28 of the Louisiana Revised Statutes, starting around Section 451, and it is called the Developmental Disability Law. This law says the state's whole system of services must value you as a person and protect your basic rights and privileges as a citizen. It is built on the idea that having a disability is a normal part of being human, and that it does not take away your right to make choices and have control over your own life. The law gives you the right to a timely, expeditious evaluation if you are thought to have a developmental disability, and the right to receive services that fit your personal needs and choices in the most integrated setting that works for you. It supports your right to live, work, and enjoy leisure activities in your community as you choose.`,
},
{
  id: 'la-service-plan',
  title: 'Louisiana: your service plan (the Plan of Care)',
  citation: 'Louisiana Department of Health, OCDD Guidelines for Support Planning; OCDD Support Coordination',
  text: `In Louisiana, your main planning document under an OCDD waiver is usually called your Plan of Care, sometimes built from an underlying support plan. Your Support Coordinator, who works for a support coordination agency, helps you gain access to the waiver services and other medical, social, and educational supports you need, and helps put together your plan. The planning process is meant to center on your needs, preferences, and goals. Ask your Support Coordinator directly how often your Plan of Care is formally reviewed and updated each year, since we could not confirm one single review cadence that applies to every OCDD waiver from the sources checked, and you can always ask for a review sooner if your needs change.`,
},
{
  id: 'la-appeals',
  title: 'Louisiana: how to appeal if services are denied or cut',
  citation: 'Louisiana Department of Health, How to Appeal Medicaid; Division of Administrative Law state fair hearings',
  text: `If Louisiana denies, reduces, or ends your Medicaid or waiver services, you have the right to appeal. Appeals are heard by the Division of Administrative Law as a state fair hearing. You can appeal online, in writing to the Division of Administrative Law's Health and Hospitals Section, or by calling 225-342-5800 or 225-342-0443. Your denial notice will tell you the exact date by which you must file, so always check that notice first. Here is an important protection: if you file your appeal within 10 days of the date on your denial notice, your current services generally continue unchanged while your appeal is being decided. You should get a final decision within about 30 days of filing, unless more time is agreed to. You can have a family member, lawyer, or advocacy group like Disability Rights Louisiana help represent you during the appeal.`,
},
{
  id: 'la-complaints-pna',
  title: 'Louisiana: reporting problems and free advocacy help',
  citation: 'Louisiana Adult Protective Services 1-800-898-4910 (ages 18-59); Elderly Protective Services 1-833-577-6532 (ages 60+); Disability Rights Louisiana 1-800-960-7705',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, call Louisiana Adult Protective Services at 1-800-898-4910. This line is toll-free, open 24 hours a day, seven days a week, and covers adults ages 18 to 59 with qualifying disabilities. If the person is 60 or older, call Elderly Protective Services instead at 1-833-577-6532. If it is an emergency, call 911 first. Reports of physical or sexual abuse must be made by phone rather than the online form. For free legal help understanding or fighting for your rights, contact Disability Rights Louisiana at 1-800-960-7705. They are Louisiana's protection and advocacy organization for people with disabilities, and their help is free.`,
},
```

flags: The Plan of Care review cadence (how often it must be formally updated) was not confirmed as a single clear number from an official source in this pass, so the draft hedges and tells readers to ask their Support Coordinator. Disability Rights Louisiana's own contact page did not explicitly use the phrase "federally designated Protection and Advocacy agency," though this status is widely reported and consistent with Louisiana having one P&A per the federal system; the team should verify directly via ndrn.org before this pack goes live. The 10-day aid-paid-pending window came from the LDH "How to Appeal Medicaid" page and should be checked against the specific notice language for OCDD waiver denials versus general Medicaid denials, since the two processes may not be identical.
