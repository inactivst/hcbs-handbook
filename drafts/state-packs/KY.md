# Kentucky state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.chfs.ky.gov/agencies/dms/dca/Pages/mpw.aspx
- https://www.chfs.ky.gov/agencies/dail/Pages/default.aspx
- https://apps.legislature.ky.gov/law/kar/titles/907/001/835/
- https://codes.findlaw.com/ky/title-xvii-economic-security-and-public-welfare/ky-rev-st-sect-202a-202/
- https://apps.legislature.ky.gov/law/kar/titles/907/001/560/
- https://www.chfs.ky.gov/agencies/dms/dpqo/Documents/MCOAppealProcess.pdf
- https://www.chfs.ky.gov/agencies/dcbs/dpp/apb/Pages/default.aspx
- https://kypa.net/contact-us/
- https://kypa.net/

chunks:
```js
{
  id: 'ky-agency-waivers',
  title: 'Kentucky: who runs HCBS and the main waiver programs',
  citation: 'Kentucky Cabinet for Health and Family Services, Department for Medicaid Services (DMS) and Department for Behavioral Health, Development and Intellectual Disabilities (DBHDID); Michelle P. Waiver (907 KAR 1:835) and Supports for Community Living Waiver',
  text: `In Kentucky, Medicaid home and community-based waivers for people with intellectual and developmental disabilities are jointly run by two agencies inside the Cabinet for Health and Family Services. The Department for Medicaid Services, or DMS, and the Department for Behavioral Health, Development and Intellectual Disabilities, or DBHDID, work together to operate the Michelle P. Waiver, which helps people with intellectual or developmental disabilities live in their own home or with family instead of in an institution. Kentucky also has the Supports for Community Living Waiver for people with intellectual disabilities who want to live in their own home, a family home, or an agency-supported home in the community. You apply through kynect, in person at an Aging and Disability Resource Center, or through a Community Mental Health Center. Kentucky has a waiting list for the Michelle P. Waiver, and your spot is based on the date your completed application was received, so apply as early as you can.`,
},
{
  id: 'ky-rights',
  title: 'Kentucky: your legal rights as a person with an intellectual disability',
  citation: 'Kentucky Revised Statutes Chapter 202A (mental health) applied to intellectual disability via KRS Chapter 210 and 202A cross-references',
  text: `Kentucky law extends the patient rights protections written for people with mental illness to people with an intellectual disability as well. Under KRS Chapter 202A, you have the right to refuse treatment, and you cannot be forcibly treated unless a court has reviewed and ordered it. If a facility wants to transfer you, you and your guardian or family member must be told about the proposed transfer ahead of time and given the chance to challenge it as part of your individual treatment plan. We were not able to confirm a single, separate bill of rights statute written specifically and only for people with intellectual disabilities the way some other states have, so this chunk describes the protections that were confirmed from Kentucky's mental health and intellectual disability statutes together, and the team should verify whether a more specific rights law exists before this pack goes live.`,
},
{
  id: 'ky-service-plan',
  title: 'Kentucky: your service plan (the Person-Centered Service Plan)',
  citation: '907 KAR 1:835, Michelle P. Waiver services and reimbursement',
  text: `In Kentucky, your main planning document under the Michelle P. Waiver is called the Person-Centered Service Plan. Your case manager builds this plan with you and is required to check in with you in person at least once a month, whether at your home, an adult day health center, or an adult day training provider's location, to make sure your services match what is written in your plan. Your case manager also tracks your progress toward the goals in your plan over time. Your plan and eligibility are formally reviewed and recertified at least once a year, and this recertification requires at least one face-to-face meeting between you, your case manager, and a family member or legal representative if you have one. You can ask for a review sooner if your needs change.`,
},
{
  id: 'ky-appeals',
  title: 'Kentucky: how to appeal if services are denied or cut',
  citation: 'Kentucky Department for Medicaid Services, Division of Program Quality and Outcomes, MCO Appeal Process; state fair hearing process',
  text: `If Kentucky denies, reduces, or ends your Medicaid or waiver services, you can ask for a state fair hearing through the Department for Medicaid Services. Deadlines vary depending on the type of denial, so always check your written notice first for your exact deadline, since it can be as short as 10 days or as long as 120 days depending on the situation. Here is an important protection: you may be able to keep receiving a service while your appeal is pending. If your benefits are continued this way, they generally keep going until 10 calendar days after your appeal decision letter is mailed, unless you separately ask to continue benefits within 10 days of that letter. If the hearing is decided in your favor, any services that were paused are supposed to be approved and restarted quickly, generally within about 72 hours of the decision. Because these rules can be technical, consider asking a case manager or legal aid organization for help filing.`,
},
{
  id: 'ky-complaints-pna',
  title: 'Kentucky: reporting problems and free advocacy help',
  citation: 'Kentucky Child and Adult Abuse Hotline 1-877-597-2331 (877-KYSAFE1) or 1-800-752-6200; Kentucky Protection & Advocacy 1-800-372-2988',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, call the Kentucky Child and Adult Abuse Hotline at 1-877-597-2331, also known as 877-KYSAFE1, or 1-800-752-6200. Both numbers are toll-free and run by the Cabinet for Health and Family Services. If it is an emergency, call 911 first. You can also report non-emergency concerns online through the state's Child/Adult Protective Services Reporting System, and you can report anonymously. For free legal help understanding or fighting for your rights, contact Kentucky Protection & Advocacy at 1-800-372-2988 or 502-564-2967. They work to inform, educate, and empower Kentuckians with disabilities, though the team should confirm their exact federal Protection and Advocacy designation status directly through ndrn.org before this pack goes live, since Kentucky's P&A operates differently from some other states.`,
},
```

flags: Could not confirm a standalone intellectual-disability-specific bill of rights statute for Kentucky separate from the mental health statutes (KRS 202A/202B/210); the rights chunk is built only from what was verified and flags this gap explicitly. Kentucky Protection & Advocacy's own website did not explicitly state its federal P&A designation in the pages fetched during this research pass, so this should be confirmed via ndrn.org before the pack goes live; note Kentucky's P&A is structured as a state government agency rather than an independent nonprofit, unlike Texas, South Carolina, Alabama, and Louisiana's P&As. The general Medicaid appeal deadlines (10 to 120 days) were the clearest figures found; the team should confirm the exact deadline that applies specifically to Michelle P. Waiver or Supports for Community Living Waiver denials.
