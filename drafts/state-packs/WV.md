# West Virginia state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://iddwprogram.wv.gov/
- https://wvaso.acentra.com/wv-aso-intellectual-developmental-disabilities/
- https://dhhr.wv.gov/bms/BMSPUB/Documents/IDDWaiver%20Brochure-jh.pdf
- https://legalaidwv.org/legal-information/dhhr-fair-hearings-what-you-need-to-know-about-the-process/
- https://dhhr.wv.gov/bcf/Services/Pages/Adult-Protective-Services.aspx
- https://bss.wv.gov/page/centralized-intake-abuse-and-neglect
- https://www.drofwv.org/contact-us

chunks:
```js
{
  id: 'wv-agency-waivers',
  title: 'West Virginia: who runs HCBS and the main waiver program',
  citation: 'West Virginia Department of Human Services (DoHS), Bureau for Medical Services (BMS); Intellectual and/or Developmental Disabilities Waiver (IDDW)',
  text: `In West Virginia, the Bureau for Medical Services (BMS), part of the Department of Human Services, runs the Medicaid waiver for people with intellectual and developmental disabilities. It is called the Intellectual and/or Developmental Disabilities Waiver, or IDDW, and it used to be known as the MR/DD Waiver. This is a 1915(c) waiver, which means it pays for supports like case management, day habilitation, respite for family caregivers, and supported employment so you can live in your own home or in the community instead of a facility. A contractor called Acentra Health, sometimes referred to as the WV ASO, helps manage utilization review and eligibility for the program. You apply for the IDDW through BMS, and your medical and financial eligibility are reviewed every year.`,
},
{
  id: 'wv-service-plan',
  title: 'West Virginia: your service plan (the Individualized Program Plan)',
  citation: 'WV IDDW Program; case management and person-centered planning requirements (iddwprogram.wv.gov, WV ASO Acentra Health)',
  text: `In West Virginia, your plan under the IDDW is built around person-centered planning, and the document is often called an Individualized Program Plan, or IPP. You are assigned a Case Manager who works for a provider agency you choose. Your Case Manager leads an interdisciplinary team that includes you and the people who support you, and they help write and update your plan based on what you want your life to look like. Case Managers generally update individualized treatment plans at least twice a year, and a separate Annual Functional Assessment is done once a year to help set your service budget and check that you still qualify for the waiver. Your Case Manager also does monthly home visits to check in with you. Ask your Case Manager for the exact review dates that apply to you, since the schedule can vary by service.`,
},
{
  id: 'wv-appeals',
  title: 'West Virginia: how to appeal if services are denied or cut',
  citation: 'WV Department of Human Services Fair Hearing process (Legal Aid of West Virginia guidance)',
  text: `If West Virginia denies, reduces, or ends your Medicaid services, you have the right to ask for a Fair Hearing. You generally have up to 90 days from the date you get the notice to request one. Here is an important detail: if you want your services to keep going while you wait for the hearing, you usually need to respond to the Adverse Action notice within 13 days, so act quickly and always check the exact deadline printed on your own notice. Some situations, like a cut caused by a change in your income or assets, may not qualify for continued benefits during the appeal, so read your notice carefully or ask for help. You can contact Legal Aid of West Virginia at 1-866-255-4370 for free help understanding your notice and filing an appeal.`,
},
{
  id: 'wv-complaints-pna',
  title: 'West Virginia: reporting problems and free advocacy help',
  citation: 'WV Centralized Intake for Abuse and Neglect 1-800-352-6513; Disability Rights of West Virginia 1-800-950-5250',
  text: `If you or someone you know is being abused, neglected, or exploited, you can report it to West Virginia's Centralized Intake by calling 1-800-352-6513. This one number is used for reports involving both children and vulnerable adults, and it operates 24 hours a day, every day. If it is an emergency, call 911 first. For free legal help protecting your rights, contact Disability Rights of West Virginia, the state's official protection and advocacy organization, at 1-800-950-5250, or their office line at 304-346-0847. Their services are confidential and free, and you will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: Could not verify from an official state source that West Virginia has a standalone disability bill-of-rights statute comparable to Texas Chapter 592 or Idaho Code 66-412, so no id-rights chunk was written; if the team finds one in WV Code, add it. The exact IPP review cadence description blends two different official-adjacent sources (case manager semi-annual plan updates and an annual functional assessment) since no single page stated one unified cadence; team should confirm against the current IDD Waiver Member Handbook PDF. The Fair Hearing details came from a Legal Aid of West Virginia summary page rather than a DHHR/DoHS page directly, since DHHR fair-hearing pages found in search were policy manual PDFs for other programs (WIC, family assistance); team should verify the 90-day and 13-day windows apply specifically to IDDW waiver service denials, not just general Medicaid eligibility actions.
