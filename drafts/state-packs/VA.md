# Virginia state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.dmas.virginia.gov/for-members/benefits-and-services/waivers/developmental-disability-dd-waivers/
- https://dbhds.virginia.gov/waiver-information-for-individuals-and-families/
- https://dbhds.virginia.gov/individual-support-plan-guidance/
- https://law.lis.virginia.gov/vacode/title37.2/chapter4/section37.2-400/
- https://www.dmas.virginia.gov/appeals/
- https://www.dmas.virginia.gov/media/3221/client-appeals-frequently-asked-questions-2021-05-21.pdf
- https://www.dars.virginia.gov/aps/
- https://www.dlcv.org/contact
- https://www.ndrn.org/about/ndrn-member-agencies/

chunks:
```js
{
  id: 'va-agency-waivers',
  title: 'Virginia: who runs HCBS and the main waiver programs',
  citation: 'Virginia DMAS and DBHDS; Developmental Disability (DD) Waivers: BI, FIS, CL',
  text: `In Virginia, two state agencies work together on waiver services for people with developmental disabilities. The Department of Medical Assistance Services (DMAS) is the Medicaid agency, and it administers the DD Waivers jointly with the Department of Behavioral Health and Developmental Services (DBHDS). There are three DD Waivers. Building Independence (BI) is for adults who live mostly on their own. Family and Individual Supports (FIS) is for children and adults who may live with family or independently. Community Living (CL) is for people who need support around the clock. Your local front door is your Community Services Board, called a CSB. The CSB screens you for eligibility and can put your name on the waiting list. Slots are assigned based on urgency of need, so ask your CSB about the waiting list even if you do not need services right away.`,
},
{
  id: 'va-rights',
  title: 'Virginia: your legal rights while receiving services',
  citation: "Virginia Code Sec. 37.2-400 (Rights of individuals receiving services)",
  text: `Virginia has a law that protects your rights while you receive services. It is Section 37.2-400 of the Virginia Code, and it covers anyone getting services from a program that DBHDS operates, funds, or licenses. The law says you keep all your legal rights under state and federal law. You have the right to be treated with dignity and to be free from abuse and neglect. You have the right to prompt evaluation and treatment that you are told about in a way you can understand. Services must be given under the least restrictive conditions possible, and you cannot be restrained or isolated unless it is truly necessary. You also have the right to see your own records, to keep them private, and to an impartial review if you believe your rights were violated. DBHDS runs a human rights system to look into those complaints.`,
},
{
  id: 'va-service-plan',
  title: 'Virginia: your service plan (the Individual Support Plan)',
  citation: 'DBHDS Individual Support Plan guidance; DD Waiver person-centered planning',
  text: `In Virginia, your main plan is called an Individual Support Plan, or ISP. It is a person-centered plan, which means it is built around what matters to you and the life you want. A support coordinator, sometimes called a case manager, from your Community Services Board leads the planning with you and the people you invite. The support coordinator writes most of the plan, and each service provider adds its own part, called the Plan for Supports, that explains exactly how they will help you. Your plan is not a one-time thing. Your support coordinator checks in with person-centered reviews each quarter, and the full plan is redone every year for your new plan year. If your needs or goals change, you can ask for a change to your plan at any time.`,
},
{
  id: 'va-appeals',
  title: 'Virginia: how to appeal if services are denied or cut',
  citation: 'DMAS Appeals Division client appeals (state fair hearing); DMAS Client Appeals FAQ',
  text: `If Virginia denies, reduces, or ends your Medicaid services, you can ask for a state fair hearing. The DMAS Appeals Division handles these appeals, and an impartial hearing officer who is separate from the people who made the decision will hear your case. In most cases you have 30 days from your notice to file the appeal, but always check your notice for the exact deadline and instructions. Here is an important tip about keeping your services. If you file your appeal before the date your coverage changes, or within 10 days of the date on the notice, you can ask for your services to continue while the appeal is decided. Not every case qualifies, so ask for continued coverage when you file. DMAS generally must make a final decision within 90 days. You can bring a family member, advocate, or lawyer to help you.`,
},
{
  id: 'va-complaints-pna',
  title: 'Virginia: reporting problems and free advocacy help',
  citation: 'Virginia APS hotline 1-888-832-3858; disAbility Law Center of Virginia 1-800-552-3962',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, call the Virginia Adult Protective Services hotline at 1-888-832-3858. It is toll free and open 24 hours a day, every day. APS looks into reports about adults with disabilities age 18 and older and adults age 60 and older. You can also report to your local department of social services. If it is an emergency, call 911 first. For free legal help with your rights, contact the disAbility Law Center of Virginia (dLCV) at 1-800-552-3962. dLCV is the official protection and advocacy organization for Virginia, and its services are free. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: The quarterly review cadence for the ISP came from DBHDS ISP guidance materials that describe "required quarterly reviews"; the team should confirm the exact annual plan-year renewal language in the DD Waiver regulations (12VAC30-122). The 30-day appeal deadline and 10-day continued-coverage window came from DMAS appeals pages and the 2021 Client Appeals FAQ; confirm current numbers against the notice language. DBHDS human rights complaint contact info was not verified on a fetched page, so no phone number was included for it.
