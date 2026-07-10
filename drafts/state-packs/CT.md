# Connecticut state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.myplacect.org/services-and-supports/financial-options/dds-individual-and-family-supports-waiver/
- https://www.myplacect.org/services-and-supports/financial-options/dds-comprehensive-supports-waiver/
- https://portal.ct.gov/dds/searchable-archive/family/waiver/dds-home-and-community-based-waivers
- https://law.justia.com/codes/connecticut/2012/title-17a/chapter-319b/section-17a-238/
- https://portal.ct.gov/dds/searchable-archive/family/ip/individual-plan
- https://portal.ct.gov/DSS/The-Office-of-Legal-Counsel-Regulations-and-Administrative-Hearings/Office-of-Legal-Counsel-Regulations-and-Administrative-Hearings---OLCRAH/Requesting-A-Hearing
- https://portal.ct.gov/-/media/dds/waiver/medicaidfairhearingrightsfaqs.pdf
- https://portal.ct.gov/dds/searchable-archive/investigations/investigations/regional-abuse-and-neglect-reporting-protocol
- https://www.disrightsct.org/contact

chunks:
```js
{
  id: 'ct-agency-waivers',
  title: 'Connecticut: who runs HCBS and the main waiver programs',
  citation: 'Connecticut Department of Developmental Services (DDS), lead agency; Department of Social Services (DSS), state Medicaid agency; Comprehensive Supports, Individual and Family Supports, and Employment and Day Supports 1915(c) waivers',
  text: `In Connecticut, the Department of Developmental Services (DDS) is the lead agency that runs day-to-day waiver services for people with intellectual and developmental disabilities. The Department of Social Services (DSS) is the state Medicaid agency and oversees DDS's operation of these waivers. Connecticut has three main HCBS waivers. The Comprehensive Supports Waiver serves people who need a high level of support, often living in a licensed group home or with significant medical or behavioral needs. The Individual and Family Supports Waiver serves people who want to direct more of their own care and live more independently, often in their own home or family home. The Employment and Day Supports Waiver focuses on helping people work and take part in day activities in the community. All three waivers are meant to help you live and participate in your community instead of in an institution.`,
},
{
  id: 'ct-rights',
  title: 'Connecticut: your legal rights under DDS supervision',
  citation: 'Connecticut General Statutes Section 17a-238 (formerly Sec. 19a-469), "Rights of persons under supervision of Commissioner of Developmental Services"',
  text: `Connecticut has a state law, General Statutes Section 17a-238, that protects the rights of people placed or treated under the Commissioner of Developmental Services, in both public and private facilities. This law says you cannot be stripped of your personal, property, or civil rights except through a fair legal process. It guarantees you the right to prompt and appropriate medical and dental care. It guarantees your right to communicate freely and privately with anyone you choose, including a lawyer, and reasonable access to a phone to make and receive private calls. It also protects you from unnecessary physical restraint and covers your right to work and to see your own personal records. By law, you must be told about these rights, both out loud and in writing, when you apply for or are placed in services, and a summary of your rights must be posted where the public can see it in every facility.`,
},
{
  id: 'ct-service-plan',
  title: 'Connecticut: your service plan (the Individual Plan)',
  citation: 'Connecticut DDS, "A Guide to Individual Planning"',
  text: `In Connecticut, your plan is called the Individual Plan, sometimes shortened to IP. Your DDS case manager coordinates the planning process, and your planning team includes you, your family if you want them involved, your case manager, support staff, and any clinicians or health providers who know your needs. For most people getting ongoing DDS supports, the Individual Plan is updated at least once a year. If you receive only minimal DDS supports, your plan is updated at least every three years. No matter your review schedule, your team should also review and update your plan any time something important changes in your life, like a change in your health, housing, or family situation. You have a voice in this process, so speak up about your goals and needs.`,
},
{
  id: 'ct-appeals',
  title: 'Connecticut: how to appeal if Medicaid services are denied or cut',
  citation: 'Connecticut DSS Office of Legal Counsel, Regulations and Administrative Hearings (OLCRAH); DDS Medicaid Fair Hearing Rights FAQ',
  text: `If Connecticut denies, reduces, or ends your Medicaid services, you have the right to request a fair hearing through the Department of Social Services Office of Legal Counsel, Regulations and Administrative Hearings, known as OLCRAH. Your written request should include your name, address, phone number, client ID number, and the reason you are appealing. You can mail your request to OLCRAH at 55 Farmington Avenue, 11th Floor, Hartford, CT 06105, or call 1-800-462-0134 or 860-424-5760. Timing matters if you want your services to keep going while you wait for a decision: DSS can act on a denial as soon as 10 days after sending your notice, so to get aid paid pending, you generally need to request your hearing within that 10-day window. Always check the exact deadline printed on your own Notice of Action, since it is the most accurate source for your situation.`,
},
{
  id: 'ct-complaints-pna',
  title: 'Connecticut: reporting problems and free advocacy help',
  citation: 'DDS Abuse Investigation Division 1-844-878-8923; Disability Rights Connecticut 1-800-842-7303',
  text: `If you or someone you know with an intellectual disability is being abused or neglected, report it to the Department of Developmental Services Abuse Investigation Division at 1-844-878-8923. This centralized intake line is meant to take reports for people of all ages and every kind of allegation. If the person is 17 or younger, you can also call the Department of Children and Families Careline at 1-800-842-2288, and if the person is 60 or older, you can also call the Department of Social Services at 1-888-385-4225. If it is an emergency, call 911 first. For free legal help protecting your rights, contact Disability Rights Connecticut. Their toll-free number within Connecticut is 1-800-842-7303, and their general line is 860-297-4300. They are the official Protection and Advocacy organization for people with disabilities in Connecticut, and their help is free.`,
},
```

flags: The DSS 10-day aid-paid-pending window came from a search-summary source, not a directly fetched OLCRAH or DDS FAQ page, so the team should confirm the exact continuation-of-benefits deadline against the DDS Medicaid Fair Hearing Rights FAQ PDF before publishing. The Individual Plan review cadence (annual vs. every three years for minimal-support recipients) came from a fetched DDS family page but should be checked against the most current DDS Individual Plan guide, since these guidance documents are periodically revised. Disability Rights Connecticut's phone numbers came from two slightly different search/fetch results (one listing 860-267-4300, the fetched contact page listing 860-297-4300 as general business line); the pack uses the number from the directly fetched contact page, but the discrepancy should be double-checked before publishing.
