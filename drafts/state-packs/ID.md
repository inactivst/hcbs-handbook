# Idaho state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://healthandwelfare.idaho.gov/services-programs/medicaid-health/home-and-community-based-services
- https://healthandwelfare.idaho.gov/services-programs/medicaid-health/services-adults-developmental-disabilities
- https://healthandwelfare.idaho.gov/services-programs/medicaid-health/apply-adult-developmental-disabilities-programs
- https://www.medicaid.gov/medicaid/section-1115-demo/demonstration-and-waiver-list/81466
- https://healthandwelfare.idaho.gov/appeals-and-fair-hearings
- https://legislature.idaho.gov/statutesrules/idstat/title66/t66ch4/sect66-412/
- https://aging.idaho.gov/adult-protective-services/
- https://www.disabilityrightsidaho.org/contact-us/

chunks:
```js
{
  id: 'id-agency-waivers',
  title: 'Idaho: who runs HCBS and the main waiver programs',
  citation: 'Idaho Department of Health and Welfare (IDHW), Division of Medicaid; Adult Developmental Disabilities Waiver',
  text: `In Idaho, the Department of Health and Welfare (IDHW) runs the Medicaid home and community based waiver programs. If you are an adult age 18 or older with autism, a developmental disability, or an intellectual disability and you need the level of care usually given in an intermediate care facility, the waiver you will likely use is the Adult Developmental Disabilities Waiver. It pays for supports like residential habilitation, supported employment, respite for family caregivers, adult day health, behavior consultation, and skilled nursing, so you can live in your own home or in the community instead of an institution. Idaho also runs a separate Aged and Disabled Waiver mainly for seniors and people with physical disabilities. You apply for the Adult Developmental Disabilities Waiver through IDHW, and the department also offers a self-direction option that lets you manage your own care and hire your own caregivers.`,
},
{
  id: 'id-rights',
  title: 'Idaho: your legal rights as a person with a developmental disability',
  citation: 'Idaho Code Section 66-412 (Rights of Developmentally Disabled Persons)',
  text: `Idaho has a law, Idaho Code Section 66-412, that spells out your rights if you are a person with a developmental disability, especially if you live in a facility. You have the right to be free from mental and physical abuse, including abuse caused by carelessness or neglect. You have the right to live in the setting that restricts your personal freedom the least while still giving you the care you need. You can send and receive mail, make phone calls, and have visitors at reasonable times. You can wear your own clothes, keep personal belongings, and manage a reasonable amount of your own money. You keep your civil rights, including the right to vote and to make contracts, unless a court has said otherwise. Isolation and mechanical restraints are not allowed unless they are truly necessary to keep you or others safe. Facilities are required to post these rights and explain them to you.`,
},
{
  id: 'id-service-plan',
  title: 'Idaho: your service plan (the Plan of Service)',
  citation: 'IDHW Developmental Disabilities Program; Adult Developmental Disabilities Waiver plan development process',
  text: `In Idaho, your plan is usually called a Plan of Service. A plan developer, also called a service coordinator, meets with you and the people who support you to lead a person-centered planning meeting. In that meeting, you choose your own goals, the services you want, and who will provide them. The plan developer then writes it all down in your Plan of Service. Idaho's rules require providers of services like residential habilitation, supported employment, and behavior consultation to submit status reviews showing how you are doing on your goals, and these happen on a regular schedule set by the state. Check with your plan developer or IDHW for the exact review schedule that applies to your specific services, since this can vary by service type.`,
},
{
  id: 'id-appeals',
  title: 'Idaho: how to appeal if services are denied or cut',
  citation: 'IDHW Appeals and Fair Hearings process; Office of Administrative Hearings',
  text: `If Idaho denies, reduces, or ends your Medicaid services, you have the right to appeal. You generally have 28 days from the date on your notice to file an appeal about Medicaid services, though it can be different for other kinds of Medicaid decisions, so always check your specific notice for your deadline. Your appeal is heard by the Office of Administrative Hearings, an independent hearing officer who works like a judge and is separate from the caseworker who made the decision. If you already receive the service and want it to continue while you wait, you generally need to ask within 10 days of your notice, or before the date your services are set to end, whichever is later. Keep in mind that if you lose the appeal, you may have to pay back any benefits you kept receiving during that time. You can call the Idaho Department of Health and Welfare at 1-877-456-1233 for help with the appeals process.`,
},
{
  id: 'id-complaints-pna',
  title: 'Idaho: reporting problems and free advocacy help',
  citation: 'Idaho Commission on Aging Adult Protective Services 208-334-3833 or 1-877-471-2777; DisAbility Rights Idaho 1-866-262-3462',
  text: `If you or someone you know, age 18 or older, is being abused, neglected, or taken advantage of, you can report it to Idaho Adult Protective Services, run through the Idaho Commission on Aging and your local Area Agency on Aging. Call 208-334-3833 or the toll-free line at 1-877-471-2777. If it is a life-threatening emergency, call 911 first. For free legal help protecting your rights, contact DisAbility Rights Idaho, the official protection and advocacy organization for people with disabilities in Idaho, at their toll-free number 1-866-262-3462. Their local Pocatello office can also be reached at 208-336-5353. Reporting a problem or asking for help is free, and your identity as a reporter is kept confidential.`,
},
```

flags: The exact review cadence for the Plan of Service (annual vs semi-annual) could not be confirmed from a single official page; the DHW page referenced semi-annual and annual status reviews for specific provider service types but did not state a single blanket cadence for the overall Plan of Service, so the chunk hedges and tells the reader to check with their plan developer. The Adult Developmental Disabilities Waiver main IDHW landing page returned a 403 to automated fetch, so waiver details were cross-checked against the DD program and application pages plus the medicaid.gov waiver factsheet listing instead. The 28-day service appeal deadline and 10-day aid-paid-pending window came from search-result excerpts of the IDHW Appeals and Fair Hearings page; team should verify against the current notice template before publishing.
