# Florida state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://apd.myflorida.com/ibudget/
- https://apd.myflorida.com/providersupports/wsc.htm
- https://www.flsenate.gov/Laws/Statutes/2024/393.13
- https://ahca.myflorida.com/medicaid/florida-medicaid-complaints/medicaid-fair-hearings
- https://apd.myflorida.com/zero-tolerance/reporting/
- https://www.myflfamilies.com/services/abuse/abuse-hotline
- https://www.ndrn.org/about/ndrn-member-agencies/

chunks:
```js
{
  id: 'fl-agency-waivers',
  title: 'Florida: who runs HCBS and the iBudget waiver',
  citation: 'Agency for Persons with Disabilities (APD); iBudget Florida waiver; AHCA (state Medicaid agency)',
  text: `In Florida, the Agency for Persons with Disabilities, called APD, runs the main Medicaid waiver for people with developmental disabilities. The waiver is called iBudget Florida. With iBudget, you get a set yearly budget amount, and you and your support coordinator decide together how to spend it on the services you need, like personal supports, respite, or job coaching. The Agency for Health Care Administration (AHCA) is Florida's overall Medicaid agency and works with APD on the waiver. Florida has a long waiting list for iBudget, so it is important to apply with APD early and stay in touch about your place on the list. Everyone enrolled in iBudget gets a support coordinator to help them find and manage services.`,
},
{
  id: 'fl-rights',
  title: 'Florida: the Bill of Rights for people with developmental disabilities',
  citation: 'Fla. Stat. sec. 393.13 (Bill of Rights of Persons with Developmental Disabilities)',
  text: `Florida has a law called the Bill of Rights of Persons with Developmental Disabilities. It is Section 393.13 of the Florida Statutes. The law says its goal is to protect your dignity, liberty, and civil rights. It gives you the right to be free from abuse, neglect, and exploitation, including sexual abuse. You have the right to services in the least restrictive setting, which means with as much freedom as possible. You also have rights to education and training, to be part of your community, to practice your religion, to exercise and recreation, and to vote. These rights belong to all Floridians with developmental disabilities, whether or not they get services from APD. If someone violates these rights, you can complain and get help.`,
},
{
  id: 'fl-service-plan',
  title: 'Florida: your support plan and support coordinator',
  citation: 'APD iBudget program; Waiver Support Coordination (APD)',
  text: `In Florida, your service plan is called a support plan. It is a person-centered plan, which means it is built around your goals, your strengths, and what you need to live the life you want. You choose a waiver support coordinator, often called a WSC, and that person helps you write the plan, find services, and make sure providers are doing their job. Your support coordinator should also speak up for you and check in on how things are going. Planning is ongoing, and your support plan is updated regularly, usually every year, and any time your needs change in a big way. If your support coordinator is not helping you the way you need, you have the right to pick a different one.`,
},
{
  id: 'fl-appeals',
  title: 'Florida: how to appeal if services are denied or cut',
  citation: 'Fla. Admin. Code R. 59G-1.100 (Medicaid Fair Hearings); DCF Office of Appeal Hearings (iBudget)',
  text: `If Florida denies, reduces, or ends your Medicaid services, you can ask for a fair hearing. For iBudget waiver decisions, the hearing is held by the Department of Children and Families Office of Appeal Hearings. For decisions made by a Medicaid health plan, you usually finish the plan's appeal first, and then you can ask AHCA for a fair hearing. Your denial notice tells you exactly how to ask and what your deadline is, so read it carefully and check your notice for the date. Here is the most important tip: if you are already getting a service and want it to keep going during your appeal, ask for the hearing within 10 days of the notice, or before the date the change starts. You can also call the Medicaid Helpline at 1-877-254-1055 for help asking for a hearing.`,
},
{
  id: 'fl-complaints-pna',
  title: 'Florida: reporting problems and free advocacy help',
  citation: 'Florida Abuse Hotline 1-800-962-2873 (1-800-96-ABUSE); Disability Rights Florida 1-800-342-0823',
  text: `If you or someone you know is being abused, neglected, or exploited, call the Florida Abuse Hotline at 1-800-962-2873. That is 1-800-96-ABUSE, and it is open 24 hours a day, every day. In Florida, reporting suspected abuse of a person with a developmental disability is not just the right thing to do, it is the law. If someone is in immediate danger, call 911 first. APD has a Zero Tolerance policy, which means no amount of abuse or neglect is ever acceptable. For free legal and advocacy help, contact Disability Rights Florida at 1-800-342-0823. They are the official protection and advocacy organization for Floridians with disabilities. Their services are free, and they can help with things like service denials, rights violations, and abuse cases.`,
},
```

flags: The exact frequency of support plan updates ("usually every year") is standard APD practice but a specific rule citation stating the annual requirement was not verified; text is hedged with "updated regularly, usually every year". The overall fair hearing request deadline (as opposed to the 10-day continuation window, which is verified) is left as "check your notice".
