# Colorado state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://hcpf.colorado.gov/hcbs-idd-manual
- https://hcpf.colorado.gov/developmental-disabilities-waiver-dd
- https://hcpf.colorado.gov/supported-living-services-waiver-sls
- https://hcpf.colorado.gov/IDD-Services-enrollments-waitlists
- https://hcpf.colorado.gov/new-assessment-and-person-centered-support-plan
- https://hcpf.colorado.gov/my-hcbs-case-management
- https://law.justia.com/codes/colorado/2018/title-27/mental-health/article-10.5/part-1/section-27-10.5-110.5/
- https://law.justia.com/codes/colorado/title-25-5/colorado-medical-assistance-act/article-6/part-17/section-25-5-6-1705/
- https://oac.colorado.gov/public-benefits
- https://www.coloradolegalservices.org/public-benefits/medicaid-appeals/
- https://cdhs.colorado.gov/report-mistreatment-or-self-neglect-of-an-at-risk-adult
- https://cdhs.colorado.gov/aps
- https://disabilitylawco.org/contact/
- https://disabilitylawco.org/about-us

chunks:
```js
{
  id: 'co-agency-waivers',
  title: 'Colorado: who runs HCBS and the main waiver programs',
  citation: 'Colorado Department of Health Care Policy and Financing (HCPF); HCBS-DD (Developmental Disabilities) and Supported Living Services (SLS) waivers',
  text: `In Colorado, the Department of Health Care Policy and Financing, often called HCPF, runs the Medicaid home and community-based waivers for people with intellectual and developmental disabilities. The main waiver for people who need supports around the clock is the HCBS-DD waiver, and the Supported Living Services waiver, or SLS, serves people who need less intensive support. A Case Management Agency, sometimes still called a Community-Centered Board in your area, is your local front door for applying and staying connected. The HCBS-DD waiver has a waiting list, split into two lists called As Soon As Available and Safety Net, so ask your Case Management Agency to help you get on a list as early as possible if you think you may need this waiver.`,
},
{
  id: 'co-rights',
  title: 'Colorado: your legal rights as a person with an intellectual or developmental disability',
  citation: 'Colorado Revised Statutes Section 27-10.5-110.5, which points to rights listed in Sections 25.5-10-223 through 25.5-10-230',
  text: `Colorado has a law that protects the rights of people receiving services because of an intellectual or developmental disability. Section 27-10.5-110.5 of the Colorado Revised Statutes says that everyone receiving these services has the rights spelled out in a related part of the law, Sections 25.5-10-223 through 25.5-10-230. Because this pack was drafted by reading summaries and cross-references rather than the full text of every one of those sections, the team should pull the exact list of rights from 25.5-10-223 through 230 before this chunk is published, so the specific rights can be named for readers. If you believe your rights have been violated, you can raise it with your case manager, your provider, or Disability Law Colorado.`,
},
{
  id: 'co-service-plan',
  title: 'Colorado: your service plan (the Person-Centered Support Plan)',
  citation: 'Colorado Revised Statutes Section 25.5-6-1705; HCPF Person-Centered Support Plan (PCSP) and Colorado Single Assessment',
  text: `In Colorado, your main plan is called a Person-Centered Support Plan, or PCSP. It is developed and managed by your Case Management Agency, based on your needs and your personal goals, and it describes the services that help you avoid living in an institution and get support in the setting you choose. Your PCSP is built using information from the Colorado Single Assessment, which looks at your support needs, and a Support Level Algorithm that is run again at your annual reassessment. Your plan must be reviewed at least once a year and updated whenever it is needed, not just on the yearly schedule. Speak up to your case manager any time your needs or goals change so your plan can be updated sooner.`,
},
{
  id: 'co-appeals',
  title: 'Colorado: how to appeal if services are denied or cut',
  citation: 'Colorado Office of Administrative Courts (OAC), Public Benefits hearings; Health First Colorado (Medicaid) appeals process',
  text: `If Colorado denies, reduces, or ends your Medicaid or HCBS services, you can ask for a hearing with the Office of Administrative Courts. You can file your request by mail, email, fax, hand delivery, online filing, or by calling the OAC at 303-866-5626. Hearings are usually scheduled about 4 to 8 weeks after your request is received, and you can ask for a faster, expedited hearing if waiting would put your health or safety at risk. Always check the notice you received for your exact appeal deadline. On keeping your services the same while you wait, Colorado's process is not automatic: you generally need to contact the agency that made the decision, tell them you are appealing, and ask them to continue your benefits, and if they refuse, you can ask an administrative law judge to order your services to continue. Colorado Legal Services can help you with this process for free.`,
},
{
  id: 'co-complaints-pna',
  title: 'Colorado: reporting problems and free advocacy help',
  citation: 'Colorado at-risk adult mistreatment hotline 1-844-264-5437; Disability Law Colorado 303-722-0300 or 1-800-288-1376',
  text: `If you or someone you know is being abused, neglected, or exploited, call Colorado's at-risk adult mistreatment hotline at 1-844-264-5437. It is available 24 hours a day, every day, and your call will be confidential and routed to the county where the person lives. If it is an emergency, call 911 first. For free legal help with your rights, contact Disability Law Colorado at 303-722-0300, or toll free at 1-800-288-1376, both voice and TTY. Disability Law Colorado is the official protection and advocacy organization for Coloradans with disabilities, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: The co-rights chunk could not be fully verified against the underlying text of Colorado Revised Statutes Sections 25.5-10-223 through 25.5-10-230 (the pages that would contain the actual list of named rights returned a 403 to automated fetch), so it only confirms that the cross-reference exists in 27-10.5-110.5 and flags that the team must pull the specific enumerated rights before publishing. Colorado's aid-paid-pending process for HCBS/waiver-specific denials (as opposed to general public benefits) was not separately confirmed; the co-appeals chunk describes the general Health First Colorado process and hedges that continuing benefits is not automatic. Disability Law Colorado's site header showed the name "Disability Justice" in places and "Disability Law Colorado" in others; both were used on the org's own site so the chunk uses the more common "Disability Law Colorado" name, but the team should confirm the org's current preferred name before publishing.
