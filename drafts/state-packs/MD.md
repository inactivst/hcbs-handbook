# Maryland state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://health.maryland.gov/dda/Pages/Medicaid_Waiver_Programs.aspx
- https://health.maryland.gov/dda/Pages/October-2025-Waiver-Changes-and-You-.aspx
- https://health.maryland.gov/dda/pages/person-centered_planning.aspx
- https://health.maryland.gov/dda/Documents/PCP%20Development%20and%20Auth%20Manual%20Final%203.18.24.pdf
- https://health.maryland.gov/mmcp/Pages/medicaid-appeal.aspx
- https://disabilityrightsmd.org/wp-content/uploads/2018/10/How-to-Request-and-Prepare-for-a-Medicaid-Service-Appeal-Oct-2018.pdf
- https://dhs.maryland.gov/office-of-adult-services/adult-protective-services-aps/
- https://law.justia.com/codes/maryland/health-general/title-7/subtitle-10/
- https://law.justia.com/codes/maryland/2021/health-general/title-7/subtitle-10/section-7-1001/
- https://disabilityrightsmd.org/
- https://disabilityrightsmd.org/contact/

chunks:
```js
{
  id: 'md-agency-waivers',
  title: 'Maryland: who runs HCBS and the main waiver program',
  citation: 'Maryland Department of Health, Developmental Disabilities Administration (DDA); Community Pathways Waiver (1915(c) HCBS waiver)',
  text: `In Maryland, the Developmental Disabilities Administration, called the DDA, runs the Medicaid home and community-based waiver for people with intellectual and developmental disabilities. As of October 2025, Maryland combined its older waivers, the Family Supports Waiver, the Community Supports Waiver, and the original Community Pathways Waiver, into one program now simply called Community Pathways. This waiver pays for supports that help you live in your own home or community instead of in an institution. Your day-to-day contact is a Coordinator of Community Services, often shortened to CCS, who helps you apply and stay connected to services. Because this consolidation was recent, ask your CCS or the DDA directly about how your specific services were affected by the change.`,
},
{
  id: 'md-rights',
  title: 'Maryland: your legal rights as a person with a developmental disability',
  citation: 'Maryland Health-General Article, Title 7 ("Developmental Disabilities Law"), Subtitle 10 ("Rights of Individuals"), including Section 7-1002',
  text: `Maryland has a law that protects the rights of people with developmental disabilities who get services through licensed programs. It is Subtitle 10 of Title 7 of the Health-General Article, called "Rights of Individuals." Under this law, you have the right to be free from physical restraints except for very limited, minimal restraints that are written down and authorized. You also have the right to be told about the most integrated service settings available, meaning you should be offered options that let you live and receive services in your community rather than in a more restrictive setting. If you believe your rights under this law have been violated, you can raise it with your provider, your DDA regional office, or Disability Rights Maryland.`,
},
{
  id: 'md-service-plan',
  title: 'Maryland: your service plan (the Person-Centered Plan)',
  citation: 'Maryland DDA Person-Centered Planning (PCP) Development and Authorization Manual',
  text: `In Maryland, your main plan is called a Person-Centered Plan, or PCP. It is a written plan that you direct, built together with your team, which includes your Coordinator of Community Services and anyone else you choose to involve, like family, friends, or a provider. The PCP describes your goals and the services you need to reach them, and it must be reviewed and resubmitted to the DDA every year to keep or request services. Pre-planning for your annual PCP should start within 90 days of your plan's anniversary date, and DDA expects the whole process, from your team meeting to the final signed plan, to wrap up within about 15 business days. You can also ask your team to revisit your plan sooner if your needs change during the year.`,
},
{
  id: 'md-appeals',
  title: 'Maryland: how to appeal if services are denied or cut',
  citation: 'Maryland Department of Health Medicaid fair hearing process; Office of Administrative Hearings',
  text: `If Maryland denies, reduces, or ends your Medicaid or HCBS services, you have the right to a fair hearing through the state Office of Administrative Hearings. In general, you have 90 days from the date on your notice to request a hearing. Here is an important detail: if you want your current services to keep going while you wait for a decision, you usually need to ask for the hearing within 10 calendar days of the date on your notice, the postmark, or the effective date of the change, whichever is later. If you get your care through a Medicaid managed care plan, you typically have to complete that plan's own internal appeal first, usually within 60 days, before you can ask for a state fair hearing. Always check the notice you received, because it lists your exact deadlines. Disability Rights Maryland has published guides on preparing for a Medicaid appeal and can help.`,
},
{
  id: 'md-complaints-pna',
  title: 'Maryland: reporting problems and free advocacy help',
  citation: 'Maryland Adult Protective Services 1-800-91Prevent (1-800-917-7383); Disability Rights Maryland 410-727-6352 or 1-800-233-7201',
  text: `If you or someone you know is being abused or neglected, you can report it to Maryland Adult Protective Services by calling 1-800-91Prevent, which is 1-800-917-7383, or by contacting your local Department of Social Services office. If it is an emergency, call 911 first. For free legal help with your rights, contact Disability Rights Maryland at 410-727-6352, or toll free at 1-800-233-7201. TTY users can call 410-235-5387. Disability Rights Maryland is the official protection and advocacy organization for Marylanders with disabilities, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: Maryland consolidated three DDA waivers into one Community Pathways waiver in October 2025; this pack reflects that recent change but the team should double check whether any transition details (e.g. legacy waiver names still appearing on notices) need to be added. The exact full text of Health-General Title 7, Subtitle 10 could not be extracted from the PDF fetched (it returned as unreadable binary), so the md-rights chunk relies on secondary summaries of Section 7-1002 confirmed via search rather than a direct read of the statute text; team should verify the precise rights list against the official statute before publishing. Could not verify a Maryland-specific DDA rights-complaint intake number separate from Disability Rights Maryland; only the general APS abuse hotline was confirmed.
