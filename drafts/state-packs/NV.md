# Nevada state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.medicaid.gov/medicaid/section-1115-demo/demonstration-and-waiver-list/82501
- https://www.adsd.nv.gov/programs/developmental-services/
- https://adsd.nv.gov/Programs/Intellectual/ServiceCoord/ServiceCoordination/
- https://www.leg.state.nv.us/nrs/NRS-435.html
- https://dhcfp.nv.gov/resources/PI/Hearings/
- https://adsd.nv.gov/Contact/Contact_ReportAbuse/
- https://ndalc.org/contact/

chunks:
```js
{
  id: 'nv-agency-waivers',
  title: 'Nevada: who runs HCBS and the main waiver program',
  citation: 'Nevada Aging and Disability Services Division (ADSD) and Division of Health Care Financing and Policy (DHCFP); HCBS Waiver for Individuals with Intellectual Disabilities and Related Conditions, a 1915(c) waiver',
  text: `In Nevada, two state agencies share responsibility for your HCBS waiver. The Division of Health Care Financing and Policy, called DHCFP, is the state Medicaid agency. The Aging and Disability Services Division, called ADSD, runs the day-to-day developmental services program. Together they operate the Home and Community-Based Waiver for Individuals with Intellectual Disabilities and Related Conditions. This waiver helps pay for supports like service coordination, habilitation, and other community-based services, so you can live in your own home or community instead of an institution. To apply or ask questions, you can contact ADSD directly, and a Service Coordinator will be assigned to help guide you through the process.`,
},
{
  id: 'nv-rights',
  title: 'Nevada: your legal rights as a person with an intellectual or developmental disability',
  citation: 'Nevada Revised Statutes Chapter 435 (Persons with Intellectual Disabilities and Developmental Disabilities), including NRS 435.550, 435.555, 435.560, 435.565, and 435.570',
  text: `Nevada has a state law just about your rights as a person with an intellectual or developmental disability. It is Nevada Revised Statutes Chapter 435. This chapter includes specific sections on your rights, covering things like the right to habeas corpus, meaning the right to challenge being held somewhere against your will, your rights around being admitted to or discharged from a facility, your rights if you are involuntarily committed, your personal rights, and your rights around the care, treatment, and training you receive. The law is clear that nothing in this chapter takes away any of your legal rights without due process, meaning a fair legal process. If you believe your rights under this chapter were violated, you can raise this with Nevada's Protection and Advocacy organization.`,
},
{
  id: 'nv-service-plan',
  title: 'Nevada: your service plan and Service Coordinator',
  citation: 'Nevada ADSD Service Coordination program',
  text: `In Nevada, once you are found eligible for developmental services, you are assigned a Service Coordinator who works with you through a person-centered planning process. Your Service Coordinator helps develop, coordinate, and monitor your individual support plan, which lays out your specific goals and the supports you need to reach them, provided in the least restrictive setting that works for you. Your Service Coordinator also handles ongoing monitoring, assessment, and connecting you to the services in your plan. If you have questions about how often your plan gets reviewed or updated, ask your Service Coordinator directly, since Nevada's public materials describe the planning process itself but do not spell out one single review schedule that fits every situation.`,
},
{
  id: 'nv-appeals',
  title: 'Nevada: how to appeal if Medicaid services are denied or cut',
  citation: 'Nevada DHCFP Fair Hearings process',
  text: `If Nevada denies, reduces, or ends your Medicaid services, you have the right to request a Fair Hearing through DHCFP. Your request must be received by the DHCFP Hearings Office within 90 calendar days from the date on your adverse determination notice. If that 90th day falls on a weekend or holiday, your deadline moves to the next business day. If your appeal is about services you were already receiving that were reduced or ended, you can generally keep getting those services without any change while your Fair Hearing is pending. Just know that if the hearing decision goes against you, you may be asked to pay back the cost of services you kept receiving during the appeal. Always check your notice for the exact deadline and instructions for your situation.`,
},
{
  id: 'nv-complaints-pna',
  title: 'Nevada: reporting problems and free advocacy help',
  citation: 'Nevada ADSD Adult Protective Services 1-888-729-0571 (statewide), 702-486-6930 (Las Vegas/Clark County); Nevada Disability Advocacy and Law Center 1-888-349-3843 (Las Vegas), 1-800-992-5715 (Reno)',
  text: `If you or someone you know is being abused, neglected, exploited, isolated, or abandoned, you can report it to Nevada Adult Protective Services. Statewide, call 1-888-729-0571. In Las Vegas and Clark County, call 702-486-6930. Nevada's definition of a vulnerable adult includes people with a developmental disability, so this covers reports involving people with intellectual and developmental disabilities. If someone is in immediate danger, call the police, sheriff, or 911 first instead. For free legal help protecting your rights, contact the Nevada Disability Advocacy and Law Center, known as NDALC. Their Las Vegas office is at 702-257-8150 or toll-free 1-888-349-3843, and their Reno office is at 775-333-7878 or toll-free 1-800-992-5715. They are Nevada's official Protection and Advocacy organization for people with disabilities, and their help is free.`,
},
```

flags: Could not verify a specific review cadence (such as annual) for Nevada's individual support plans; ADSD's published Service Coordination materials describe the planning process but did not state a fixed review schedule in the pages fetched, so the service-plan chunk tells people to ask their Service Coordinator directly rather than stating a specific timeframe. The main DHCFP HCBS waiver program page redirected automatically to the general Nevada Medicaid provider site rather than loading directly, so the waiver description relies on the Medicaid.gov waiver factsheet listing and ADSD program pages rather than a single authoritative DHCFP program page; the team should confirm the waiver's exact current name and services against dhcfp.nv.gov directly. A direct ADSD or DHCFP general contact phone number was not confirmed in this research, so only Service Coordination and Adult Protective Services contact paths are included.
