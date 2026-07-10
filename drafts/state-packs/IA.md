# Iowa state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://hhs.iowa.gov/medicaid/services-care/home-and-community-based-services/waiver-programs
- https://hhs.iowa.gov/medicaid/services-care/home-and-community-based-services
- https://www.legis.iowa.gov/docs/code/135C.pdf
- https://hhs.iowa.gov/media/6635/download
- https://hhs.iowa.gov/appeals/how-appeal
- https://hhs.iowa.gov/appeals
- https://hhs.iowa.gov/contacts/child-or-dependent-adult-abuse-reporting
- https://hhs.iowa.gov/family-community/adult-protective-services
- https://disabilityrightsiowa.org/how-we-help/contact-us/

chunks:
```js
{
  id: 'ia-agency-waivers',
  title: 'Iowa: who runs HCBS and the main waiver program',
  citation: 'Iowa Department of Health and Human Services (HHS); HCBS Intellectual Disability (ID) Waiver, a 1915(c) waiver',
  text: `In Iowa, the Department of Health and Human Services, called Iowa HHS, runs the Medicaid waiver program for people with intellectual disabilities. The main program is the Home and Community-Based Services Intellectual Disability Waiver, usually called the ID Waiver. It pays for services like supported community living, day habilitation, supported employment, home and vehicle changes, nursing, and consumer-directed attendant care, so you can live in your own home or community instead of an institution. Iowa runs several other HCBS waivers too, for things like brain injury or health and disability needs, so if the ID Waiver is not the right fit, ask HHS about other waiver options. You can reach Iowa HHS at 800-972-2017, or reach Iowa Medicaid Member Services at 1-800-338-8366 for questions about applying.`,
},
{
  id: 'ia-rights',
  title: 'Iowa: your rights if you live in a licensed care facility',
  citation: 'Iowa Code Chapter 135C (Health Care Facilities); federal resident rights under 42 C.F.R. 483.10, 483.12, 483.13, and 483.15',
  text: `Iowa has a law, Iowa Code Chapter 135C, that protects the rights of people living in licensed health care facilities, and it requires facilities to follow the federal resident's rights rules found in 42 C.F.R. sections 483.10, 483.12, 483.13, and 483.15. These rules cover things like your right to be treated with dignity, your right to be free from abuse and unnecessary restraint, and your right to take part in decisions about your own care. Iowa Code Chapter 135C also names the state's Protection and Advocacy agency as the organization responsible for helping make sure these rights are followed. Keep in mind this law is written for people living in licensed facilities, like nursing or intermediate care facilities. If you get ID Waiver services in your own home rather than a facility, check your service plan and provider agreement for the specific rights and protections that apply to your situation.`,
},
{
  id: 'ia-service-plan',
  title: 'Iowa: your service plan (the Individual Service Plan)',
  citation: 'Iowa HCBS Intellectual Disability Waiver manual; Individual Service Plan (ISP) developed with the Interdisciplinary Team (IDT)',
  text: `In Iowa, your plan under the ID Waiver is called the Individual Service Plan, or ISP. It is built through a person-centered planning process with your Interdisciplinary Team, sometimes called the IDT, which includes you and the people who support you. Your case manager, or your Community-Based Case Manager if you are in a managed care plan, signs off on the plan and helps make sure it gets followed. Your ISP is reviewed and updated at least once a year, and your team also meets to update it any time there is a significant change in your life or your needs. When ID Waiver services start, Iowa requires you to have ongoing Medicaid case management, so your case manager should be your main point of contact for questions or changes to your plan.`,
},
{
  id: 'ia-appeals',
  title: 'Iowa: how to appeal if Medicaid services are denied or cut',
  citation: 'Iowa HHS Appeals process; HHS Appeals Bureau 1-888-723-9637',
  text: `If Iowa denies, reduces, or ends your Medicaid services, you have the right to file an appeal with Iowa HHS. You generally have 90 days from the date on your written notice to appeal. If you file later than 30 days but still within 90 days, you will need to explain why your appeal is late. An important protection applies if your appeal is about services you were already getting that got reduced or ended: you can usually keep receiving those services while your State Fair Hearing is pending. Just be aware that if the hearing decides the state's action was correct, you may have to pay back the value of services you received during the appeal. You can file your appeal by mail to HHS Appeals, 321 E 12th Street, Des Moines, IA 50319, by fax to 515-564-4044, by email to appeals@hhs.iowa.gov, or by calling the HHS Appeals Bureau at 1-888-723-9637. Always check your notice for your exact deadline.`,
},
{
  id: 'ia-complaints-pna',
  title: 'Iowa: reporting problems and free advocacy help',
  citation: 'Iowa HHS Child and Dependent Adult Abuse Hotline 1-800-362-2178; Disability Rights Iowa 1-800-779-2502',
  text: `If you or someone you know, of any age, is being abused, neglected, or exploited, call the Iowa HHS abuse hotline at 1-800-362-2178. It is answered 24 hours a day, seven days a week, and covers both child abuse and dependent adult abuse reports, including for people with developmental, intellectual, or cognitive disabilities. If someone is in immediate danger, call 911 first. For free legal help protecting your rights, contact Disability Rights Iowa at 1-800-779-2502, or their local Des Moines number at 515-278-2502. They are Iowa's official Protection and Advocacy organization for people with disabilities, and their help is free.`,
},
```

flags: Could not find a dedicated intellectual/developmental disability bill-of-rights statute for Iowa comparable to Texas Chapter 592; the rights chunk instead cites Iowa Code Chapter 135C, which is verified but applies specifically to people living in licensed health care facilities, not necessarily to everyone receiving ID Waiver services at home, and this limitation is flagged in the chunk text itself. The appeal deadline guidance blends language from a general Iowa HHS appeals notice (mentioning both SNAP and Medicaid) with ID-Waiver-specific continuation-of-services language; the team should confirm the 90-day (or 30-day late-appeal) window applies the same way to ID Waiver service reductions specifically, not just general Medicaid eligibility actions. HHS main phone number (800-972-2017) came from a fetched contact block but was not independently cross-checked against a dedicated HHS contact page.
