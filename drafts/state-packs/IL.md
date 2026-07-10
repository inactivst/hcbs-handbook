# Illinois state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.dhs.state.il.us/page.aspx?item=45915
- https://www.dhs.state.il.us/page.aspx?item=100040
- https://www.dhs.state.il.us/page.aspx?item=126273
- https://www.ilga.gov/legislation/ilcs/ilcs3.asp?ActID=1496
- https://www.dhs.state.il.us/page.aspx?item=29428
- https://www.dhs.state.il.us/page.aspx?item=29410
- https://www.ndrn.org/about/ndrn-member-agencies/

chunks:
```js
{
  id: 'il-agency-waivers',
  title: 'Illinois: who runs HCBS and the main waiver programs',
  citation: 'IDHS Division of Developmental Disabilities; Adults with Developmental Disabilities 1915(c) waiver; HFS (state Medicaid agency)',
  text: `In Illinois, the Department of Human Services Division of Developmental Disabilities, often called the DDD, runs the Medicaid waivers for people with developmental disabilities. The main program for adults is the Adults with Developmental Disabilities Waiver, and there are also waivers for children. The Department of Healthcare and Family Services (HFS) is the state's overall Medicaid agency. Your local front door is an Independent Service Coordination agency, called an ISC. The ISC helps you apply, checks eligibility, and stays with you as your independent advocate. Illinois selects most people for waiver services from a statewide waiting list called PUNS, which stands for Prioritization for Urgency of Need for Services. Sign up for PUNS through your ISC as early as you can, because selection can take years.`,
},
{
  id: 'il-rights',
  title: 'Illinois: your legal rights as a recipient of DD services',
  citation: '405 ILCS 5, Chapter II (Rights of Recipients of Mental Health and Developmental Disabilities Services)',
  text: `Illinois has a law that protects your rights when you receive developmental disability services. It is Chapter II of the Mental Health and Developmental Disabilities Code, found at 405 ILCS 5. The law says you keep all your rights, benefits, and privileges just like anyone else. Getting services does not mean you lose any legal rights, and no one can treat you as legally unable to decide things unless a court says so. You cannot be denied services because of your age, sex, race, religion, ethnic background, marital status, or disability. When you start services, you and your guardian, if you have one, must be told about your rights, out loud and in writing. Programs must also post your rights where everyone can see them, along with contact information for advocacy organizations that can help.`,
},
{
  id: 'il-service-plan',
  title: 'Illinois: your service plan (the Personal Plan)',
  citation: 'IDHS Person-Centered Planning Policy and Guidelines for DD Waiver Services',
  text: `In Illinois, your service plan is called a Personal Plan. It is one complete picture of the life you want, built around your strengths, preferences, needs, and dreams. Your Independent Service Coordination agency, the ISC, writes the Personal Plan with you, and you can include your guardian, family, and providers in the process. The ISC is independent, which means it does not work for your service providers, so it can be a fair advocate for you. Providers then use your Personal Plan to write their own implementation strategies describing exactly how they will support you. The plan is reviewed and updated at least once a year, and you can ask your ISC to update it any time your life or needs change. Your ISC also visits during the year to check that services match your plan.`,
},
{
  id: 'il-appeals',
  title: 'Illinois: how to appeal if services are denied or cut',
  citation: 'IDHS DDD appeals process; HFS administrative hearing',
  text: `If Illinois denies your DD waiver services, or ends, suspends, or reduces them, you can appeal. Illinois uses two steps. First, you can ask the Division of Developmental Disabilities for an informal review. Tell your ISC agency you want to appeal within 10 working days of getting the decision notice, and the ISC will help you put your appeal packet together. The DDD then reviews your case and sends you a written decision. Second, if you disagree with that decision, you can request an administrative hearing with the Department of Healthcare and Family Services within 10 days. Your written notice should say whether your services will continue during the appeal, so check your notice carefully and ask your ISC if it is not clear. You can have a family member, advocate, or lawyer help you at every step.`,
},
{
  id: 'il-complaints-pna',
  title: 'Illinois: reporting problems and free advocacy help',
  citation: 'IDHS Office of Inspector General hotline 1-800-368-1463; Equip for Equality 1-800-537-2632',
  text: `If you or someone you know is being abused, neglected, or exploited in a program that serves people with developmental disabilities, call the Illinois Department of Human Services Office of Inspector General hotline at 1-800-368-1463. It is open 24 hours a day, and the people who answer are trained investigators. The OIG investigates abuse and neglect in programs that DHS operates, licenses, certifies, or funds. If someone is in immediate danger, call 911 first. You can also file a grievance directly with the Division of Developmental Disabilities about how services are being handled. For free legal and advocacy help, contact Equip for Equality at 1-800-537-2632. They are Illinois' official protection and advocacy organization, and their services are free.`,
},
```

flags: The Illinois DDD appeals page confirms the 10-working-day and 10-day windows for the two-step process, but it does not state a default rule on service continuation during appeal, so the text says "check your notice". For abuse at home by family (rather than in a funded program), Illinois routes reports to Adult Protective Services (1-866-800-1409) instead of OIG; consider whether to add that number after the team verifies it, since it was not verified from an official page this pass. The Personal Plan annual review frequency comes from the IDHS person-centered planning policy page found via search; confirm the exact policy citation.
