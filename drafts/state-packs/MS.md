# Mississippi state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://medicaid.ms.gov/programs/intellectual-disabilitiesdevelopmental-disabilities-waiver/
- https://www.dmh.ms.gov/service-options/idd-services/
- https://medicaid.ms.gov/wp-content/uploads/2016/02/Fact-Sheet_Intellectual-Disabilities-and-Developmental-Disabilities-Waiver.pdf
- https://medicaid.ms.gov/wp-content/uploads/2020/07/Title-23-Part-300-Appeals-eff.-08.01.20-2.pdf
- https://medicaid.ms.gov/medicaid-coverage/after-you-apply/eligibility-hearings/
- https://www.mdhs.ms.gov/aging/adult-protective-services/
- http://www.drms.ms/contact
- http://www.drms.ms/

chunks:
```js
{
  id: 'ms-agency-waivers',
  title: 'Mississippi: who runs HCBS and the main waiver program',
  citation: 'Mississippi Division of Medicaid, administered in partnership with the Mississippi Department of Mental Health, Bureau of Intellectual and Developmental Disabilities; ID/DD 1915(c) waiver',
  text: `In Mississippi, the Division of Medicaid oversees the Medicaid program, but day-to-day operation of intellectual and developmental disability services runs through the Mississippi Department of Mental Health, in its Bureau of Intellectual and Developmental Disabilities. The main waiver is called the Intellectual Disabilities/Developmental Disabilities Waiver, or ID/DD Waiver. It pays for community support, respite care, day services, supported employment, and therapies so you can live in your own home or community instead of an institution. To be eligible, you must need the same level of care as someone in an intermediate care facility for people with intellectual disabilities, called an ICF/IID. There is no age limit for this waiver. Your local Department of Mental Health regional center is usually your starting point for support coordination and applying for services.`,
},
{
  id: 'ms-service-plan',
  title: 'Mississippi: your individual service plan',
  citation: 'Mississippi Department of Mental Health, ID/DD Waiver support coordination process',
  text: `Once you are approved for the ID/DD Waiver in Mississippi, a support coordinator works with you to build your service plan. This plan lists the specific services you will receive, like home supports or day services, and how much of each you are approved to get. You and your family or chosen supporters should be part of building this plan, so it reflects what you actually want your life to look like. Official Department of Mental Health pages did not spell out an exact review schedule in the pages checked for this draft, so ask your support coordinator how often your plan gets reviewed, and request an update any time your needs change. Keep your own copy of the plan so you can check that the services you receive match what was approved.`,
},
{
  id: 'ms-appeals',
  title: 'Mississippi: how to appeal if Medicaid services are denied or cut',
  citation: 'Mississippi Division of Medicaid, Title 23 Medicaid Administrative Code Part 300 (Appeals)',
  text: `If Mississippi Medicaid denies, reduces, suspends, or ends your services, you have the right to ask for a fair hearing. You generally must request the hearing in writing within 30 days of the date on your notice. If you are already receiving a service, like home health care, and the notice says it will be cut off, ask for your hearing quickly, since Mississippi rules point to a much shorter window, as short as 10 days from the notice date, for your services to keep going unchanged while your appeal is decided. Because these timelines are short and technical, always read your notice the day it arrives and follow its exact instructions for how and where to file. You can request a hearing through the Division of Medicaid contact form online or by contacting your regional Medicaid office by phone or mail.`,
},
{
  id: 'ms-complaints-pna',
  title: 'Mississippi: reporting abuse and free advocacy help',
  citation: 'Mississippi Department of Human Services Vulnerable Person Abuse Hotline 844-437-6282; Disability Rights Mississippi 1-800-772-4057',
  text: `If you or someone you know is being abused, neglected, or exploited, call the Mississippi Vulnerable Person Abuse Hotline at 844-437-6282. It is run by the Mississippi Department of Human Services and takes reports on adults whose disability or condition makes it hard for them to protect themselves. If someone is in immediate danger, call 911 first. For free legal help protecting your rights, contact Disability Rights Mississippi at 1-800-772-4057, or 601-968-0600 locally. They are the official protection and advocacy organization for people with disabilities in Mississippi and their help is free. You will not get in trouble for reporting a problem or for asking for help.`,
},
```

flags: Could not confirm from an official Mississippi source a dedicated state disability bill-of-rights statute for IDD service recipients, so no rights chunk was written. The exact review cadence for the ID/DD Waiver individual service plan was not stated on the Department of Mental Health pages fetched, so the draft tells users to ask their support coordinator rather than guessing a schedule. The 10-day aid-paid-pending figure came from search-summarized secondary sources referencing the Title 23 Part 300 Appeals code rather than a direct line-by-line read of the PDF, so the team should verify the exact day counts against the official Title 23 Part 300 Appeals document before publishing. drms.ms direct fetch failed with an SSL error, so its phone numbers were corroborated instead through multiple independent search result snippets quoting the same site content.
