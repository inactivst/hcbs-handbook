# District of Columbia pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://dds.dc.gov/ifs-waiver
- https://dds.dc.gov/page/service-coordination
- https://dds.dc.gov/publication/annual-individual-support-plan-procedure
- https://code.dccouncil.gov/us/dc/council/code/titles/7/chapters/13/
- https://code.dccouncil.gov/us/dc/council/code/sections/7-1305.01
- https://code.dccouncil.gov/us/dc/council/code/sections/7-1305.03
- https://dhcf.dc.gov/page/fair-hearing
- https://dacl.dc.gov/service/adult-protective-services-0
- https://www.uls-dc.org/programs/disability-rights-dc

chunks:
```js
{
  id: 'dc-agency-waivers',
  title: 'DC: who runs HCBS and the main waiver programs',
  citation: 'DC Department on Disability Services (DDS) and DC Department of Health Care Finance (DHCF); IDD Waiver and Individual and Family Support (IFS) Waiver',
  text: `In the District of Columbia, two agencies work together to run Medicaid home and community-based services for people with intellectual and developmental disabilities. The Department on Disability Services, called DDS, manages day-to-day services, while the Department of Health Care Finance, called DHCF, oversees the Medicaid funding. Together they run the IDD Waiver, which supports people who need more intensive or residential services, and the newer Individual and Family Support Waiver, called the IFS Waiver, for residents who live independently, with family, or with friends and need support but not residential care. Both waivers help you stay in your home and community instead of an institution. Because the IFS Waiver is newer and has its own waitlist rules, ask your DDS service coordinator which waiver fits your situation and where you stand on any waitlist.`,
},
{
  id: 'dc-rights',
  title: 'DC: your rights under the Citizens with Intellectual Disabilities Act',
  citation: 'DC Official Code section 7-1301.01 et seq. (Citizens with Intellectual Disabilities Constitutional Rights and Dignity Act of 1978), including section 7-1305.01 and section 7-1305.03',
  text: `DC has a law protecting you if you have an intellectual or developmental disability. It is called the Citizens with Intellectual Disabilities Constitutional Rights and Dignity Act, found at DC Official Code section 7-1301.01 and following sections. The law says you have all the same civil and legal rights as any other DC resident, and you have the right to habilitation and care that fits your needs, no matter your age or how significant your disability is, regardless of your ability to pay. Section 7-1305.01 says your services should be designed to help you grow your abilities and move toward independent living. Section 7-1305.03 gives you the right to the least restrictive setting available that still meets your needs, which means services should never be more restrictive than necessary. If you feel these rights are not being honored, you can raise it with DDS or contact DC's protection and advocacy organization.`,
},
{
  id: 'dc-service-plan',
  title: 'DC: your service plan (the Individual Support Plan)',
  citation: 'DC DDS Service Coordination policy; Annual Individual Support Plan (ISP) Procedure',
  text: `In DC, your plan is called an Individual Support Plan, or ISP. A Service Coordinator at DDS leads the planning process with you, using person-centered thinking tools so the plan reflects what you want your life to look like, not just what services exist. The ISP lists the specific supports and amount of each service you will receive. Your Service Coordinator also checks in regularly to make sure the services in your ISP are actually being delivered and are meeting your needs, and steps in to solve problems if something is not working. DDS requires your ISP to be fully redone every year, which is why DC calls the process the Annual Individual Support Plan Procedure. You can ask your Service Coordinator to update your plan any time your needs or goals change during the year.`,
},
{
  id: 'dc-appeals',
  title: 'DC: how to appeal if services are denied or cut',
  citation: 'DC Department of Health Care Finance fair hearing process; DC Office of Administrative Hearings (OAH), 202-442-9094',
  text: `If DC Medicaid denies, reduces, suspends, or stops your home and community-based services, you have the right to a fair hearing. You can request the hearing no more than 90 days from the postmark date on the letter that told you about the decision. The hearing is held by the DC Office of Administrative Hearings, which you can reach at 202-442-9094 to ask for a hearing, either by phone or in writing. Here is an important detail: to keep getting your current services while your appeal is pending, sometimes called aid paid pending, you generally need to request the fair hearing before the 30-day notice period on your letter runs out. Waiting past that 30-day window can mean your services stop even though your appeal is still open, so always check the exact dates on your notice and act quickly if you want your services to continue.`,
},
{
  id: 'dc-complaints-pna',
  title: 'DC: reporting problems and free advocacy help',
  citation: 'DC Adult Protective Services Hotline 202-541-3950; Disability Rights DC at University Legal Services 202-547-0198',
  text: `If you or someone you know is being abused, neglected, or exploited, call the DC Adult Protective Services Hotline at 202-541-3950. It is run by the DC Department of Aging and Community Living and is available 24 hours a day, every day of the week. You can also email dacl@dc.gov for a non-emergency report, and hearing-impaired callers can use DC Relay Service at 711. If someone is in immediate danger, call 911 first. For free legal help protecting your rights, contact Disability Rights DC at University Legal Services at 202-547-0198. They are the District's official protection and advocacy organization for people with disabilities, and their help is free. You will not get in trouble for reporting a problem or for asking them for help.`,
},
```

flags: The IFS Waiver fact sheet page mentions an "Individual Support Plan year" and a $75,000 aggregate spending cap without full detail, so the ISP chunk description is built primarily from the separate DDS Service Coordination and Annual ISP Procedure pages rather than the IFS-specific document; team should confirm the IFS Waiver spending cap and any IFS-specific ISP variations before shipping. The 30-day aid-paid-pending window for DC fair hearings was found through search-engine grounding of a DHCF fair-hearing notice rather than a direct fetch of dhcf.dc.gov/page/fair-hearing, so the team should verify current wording live.
