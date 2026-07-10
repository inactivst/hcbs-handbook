# New Mexico state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.hca.nm.gov/developmental-disabilities-waiver/
- https://www.hca.nm.gov/home-and-community-based-medicaid-waiver-programs/
- https://www.hca.nm.gov/eligibility-determination/
- https://www.hca.nm.gov/office-of-fair-hearings-faqs/
- https://www.law.cornell.edu/regulations/new-mexico/8-314-5-20-NMAC
- https://www.aging.nm.gov/adult-protective-services/
- https://drnm.org/get-help/
- https://drnm.org/

chunks:
```js
{
  id: 'nm-agency-waivers',
  title: 'New Mexico: who runs HCBS and the main waiver programs',
  citation: 'New Mexico Health Care Authority (HCA), Developmental Disabilities Supports Division (DDSD); Developmental Disabilities (DD) Waiver, 1915(c)',
  text: `In New Mexico, the Health Care Authority runs the Medicaid program, and inside it, the Developmental Disabilities Supports Division, called DDSD, oversees waiver services for people with intellectual and developmental disabilities. The main waiver most people mean is the Developmental Disabilities Waiver, sometimes called the traditional DD Waiver. It pays for supports like living supports, community integrated employment, respite, and therapies so you can live in your own home or community instead of an institution. To qualify, you generally need a diagnosed developmental disability that started before age 18, with major limits in daily life that began before age 22. New Mexico also offers Mi Via, a self-directed waiver where you have more control over hiring your own workers, and a Medically Fragile Waiver for people with significant medical needs. Because the Health Care Authority took over Medicaid duties from the former Human Services Department, some older documents online may still say HSD, so do not be surprised by both names.`,
},
{
  id: 'nm-service-plan',
  title: 'New Mexico: your Individual Service Plan',
  citation: 'New Mexico HCA DDSD, DD Waiver Individual Service Plan (ISP) process',
  text: `In New Mexico, your DD Waiver services are organized in a document called the Individual Service Plan, or ISP. A case manager or consultant works with you and the people you choose, like family or friends, to build this plan around your goals and needs. The ISP describes the services and supports you will get and is meant to reflect what matters most to you, not just what is easiest for a provider to offer. Case managers also do regular check-ins, including required monthly visits for some services, to make sure your plan is being followed. Official DDSD pages did not give one single clear number of days for a full annual ISP review in the pages checked for this draft, so ask your case manager when your next full review is scheduled, and request an update any time your needs change.`,
},
{
  id: 'nm-appeals',
  title: 'New Mexico: how to appeal if Medicaid services are denied or cut',
  citation: 'New Mexico HCA Office of Fair Hearings; 8.314.5.20 NMAC (Right to a Hearing)',
  text: `If New Mexico Medicaid denies, reduces, or ends your services, you have the right to ask for a fair hearing through the Health Care Authority Office of Fair Hearings. In general, most appeals must be requested within 90 days from the date of the notice, but always check your own notice, since some situations use different deadlines. If you are already receiving a service and it is being cut or stopped, you usually must ask to keep that service going, called continued benefits, within a shorter window, commonly 10 calendar days from the date on the notice. Keep in mind that if you continue services during your appeal and then lose the appeal, you may have to pay back the cost of those continued services, so weigh that before deciding. A decision is generally issued within 60 to 90 days of your appeal request, depending on the type of case.`,
},
{
  id: 'nm-complaints-pna',
  title: 'New Mexico: reporting abuse and free advocacy help',
  citation: 'New Mexico Adult Protective Services 1-866-654-3219; Disability Rights New Mexico 1-800-432-4682',
  text: `If you or someone you know is being abused, neglected, or exploited, call New Mexico Adult Protective Services at 1-866-654-3219. It is run by the Aging and Long-Term Services Department and takes reports on adults 18 and older who cannot protect themselves. If someone is in immediate danger, call 911 first. For free legal help protecting your rights, contact Disability Rights New Mexico at 1-800-432-4682, or 505-256-3100 locally. They are the official protection and advocacy organization for people with disabilities in New Mexico, and their help is free. New Mexico law also says any person who reasonably suspects an incapacitated adult is being abused, neglected, or exploited should report it right away, and you will not get in trouble for reporting or asking for help.`,
},
```

flags: Could not confirm from an official New Mexico source a dedicated state disability bill-of-rights statute for DD Waiver recipients comparable to Texas Chapter 592, so no rights chunk was written. The exact full-annual review cadence for the Individual Service Plan (ISP) was not stated plainly on the DDSD pages fetched, beyond references to monthly visit requirements in numbered memos, so the draft tells users to ask their case manager rather than guessing a schedule. Appeal deadline figures (90 days general, 10 days for continued benefits, 60 to 90 day decision window) were drawn from a mix of a Cornell Law regulation citation and Health Care Authority Office of Fair Hearings FAQ search summaries; the team should verify the exact current NMAC citations and day counts directly against 8.314.5.20 NMAC and the HCA Office of Fair Hearings FAQ page before publishing.
