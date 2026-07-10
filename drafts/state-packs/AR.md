# Arkansas state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://humanservices.arkansas.gov/divisions-shared-services/developmental-disabilities-services/ces-waiver/
- https://humanservices.arkansas.gov/wp-content/uploads/CES-Waiver-Detailed-Fact-Sheet.pdf
- https://humanservices.arkansas.gov/divisions-shared-services/developmental-disabilities-services/frequently-asked-questions/
- https://humanservices.arkansas.gov/contact-us/file-an-appeal/
- https://humanservices.arkansas.gov/hotlines/
- https://humanservices.arkansas.gov/divisions-shared-services/aging-adult-behavioral-health-services/adult-protective-services/adult-maltreatment/
- https://www.justice.gov/file/1008326/dl
- https://www.disabilityrightsar.org/
- https://www.medicaid.gov/medicaid/section-1115-demo/demonstration-and-waiver-list/Waiver-Descript-Factsheet/AR

chunks:
```js
{
  id: 'ar-agency-waivers',
  title: 'Arkansas: who runs HCBS and the main waiver program',
  citation: 'Arkansas Department of Human Services (DHS), Division of Developmental Disabilities Services (DDS); Community and Employment Supports (CES) 1915(c) waiver',
  text: `In Arkansas, the Department of Human Services (DHS) runs Medicaid services for people with intellectual and developmental disabilities through its Division of Developmental Disabilities Services, called DDS. The main waiver for adults and children with IDD is the Community and Employment Supports waiver, known as CES. It pays for supports like supported living, respite, and job coaching so you can live in your own home or community instead of an institution. To start, you or your family contact DDS Intake and Referral to ask about services and get on the list, since CES has a waiting list in most cases. Arkansas also runs ARChoices, but that waiver is for older adults and adults with physical disabilities, not specifically for intellectual or developmental disabilities. If you already live in an ICF/IID (an intermediate care facility), DDS can also help you move to CES services in the community.`,
},
{
  id: 'ar-service-plan',
  title: 'Arkansas: your service plan under the CES waiver',
  citation: 'Arkansas DHS DDS, CES Waiver program materials',
  text: `In Arkansas, your CES waiver services are guided by a person-centered service plan. This plan lists the services you will get, how much of each, and who will provide them, based on your needs and goals. Your plan is built with your team, which includes you, your family or people you choose, and DDS staff, and it should reflect what matters most to you, not just what a provider wants to offer. Your plan is reviewed at least once a year to make sure it still fits your life and needs. If your situation changes, for example if you need more help or move to a new home, you can ask your team to update the plan sooner. Keep a copy of your plan so you know exactly what services you are approved to receive.`,
},
{
  id: 'ar-appeals',
  title: 'Arkansas: how to appeal if Medicaid services are denied or cut',
  citation: 'Arkansas DHS Office of Appeals and Hearings, File an Appeal page',
  text: `If Arkansas DHS denies, reduces, or stops your Medicaid or DDS services, you have the right to ask for a hearing with the DHS Office of Appeals and Hearings. You can appeal by filling out the back of the notice you received or by writing a letter, and you can send it by mail or email. Always check your notice closely, since it will list your exact deadline to appeal and where to send your request. Arkansas Medicaid appeal requests generally must reach the Office of Appeals and Hearings within a set number of days from the date on the notice, so do not wait to respond. It is not fully clear from public DHS pages whether your services automatically continue unchanged while your appeal is pending, so check your notice for aid-paid-pending language or ask DHS directly when you file. You can have a family member, friend, or lawyer help you at the hearing.`,
},
{
  id: 'ar-complaints-pna',
  title: 'Arkansas: reporting abuse and free advocacy help',
  citation: 'Arkansas DHS Adult Maltreatment Hotline 1-800-482-8049; Disability Rights Arkansas 1-800-482-1174',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, call the Arkansas Adult Maltreatment Hotline at 1-800-482-8049. It is run by the Department of Human Services and is open 24 hours a day, every day, and you do not have to give your name. If someone is in immediate danger, call 911 first. For free legal help protecting your rights, contact Disability Rights Arkansas at 1-800-482-1174 (or 501-296-1775 locally). They are the official protection and advocacy organization for people with disabilities in Arkansas, and their help is free. You will not get in trouble for reporting a problem or for asking for help.`,
},
```

flags: Could not confirm from an official Arkansas source whether a dedicated state disability bill-of-rights statute exists for IDD service recipients (similar to Texas Health and Safety Code Chapter 592), so no rights chunk was written; the team should check with Arkansas DHS or Disability Rights Arkansas directly. The exact Medicaid fair-hearing appeal deadline (days from notice) and whether aid-paid-pending applies could not be confirmed from a directly fetched official page (WebFetch could not render full page text for humanservices.arkansas.gov/contact-us/file-an-appeal/); a 30-day window appeared in search-engine summaries citing that page but was not independently verified word for word, so the draft hedges and tells users to check their notice. ARChoices was excluded as not IDD-specific.
