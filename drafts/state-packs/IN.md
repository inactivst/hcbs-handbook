# Indiana state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.in.gov/medicaid/members/home-and-community-based-services/community-integration-and-habilitation-waiver/
- https://www.in.gov/fssa/ddars/files/CIHW-BDS-Fact-Sheets-2024.pdf
- https://www.in.gov/fssa/ddars/files/PCISP-Guidelines-v3.6-FINAL.pdf
- https://law.justia.com/codes/indiana/title-12/article-27/
- https://www.in.gov/medicaid/members/member-resources/member-appeals/
- https://www.in.gov/oalp/resources-for-fssa-appeals/
- https://www.in.gov/fssa/ddars/bba/adult-protective-services/
- https://www.in.gov/idr/contact-idr/

chunks:
```js
{
  id: 'in-agency-waivers',
  title: 'Indiana: who runs HCBS and the main waiver programs',
  citation: 'Indiana Family and Social Services Administration (FSSA), Bureau of Developmental Disabilities Services (BDDS); Community Integration and Habilitation (CIH) waiver and Family Supports Waiver, both 1915(c) waivers',
  text: `In Indiana, the Bureau of Developmental Disabilities Services, called BDDS, runs the Medicaid waiver programs for people with intellectual and developmental disabilities. BDDS is part of the Indiana Family and Social Services Administration, or FSSA. The main waivers are the Community Integration and Habilitation waiver, known as CIH, and the Family Supports Waiver. The CIH waiver offers the fullest range of services and is meant for people who need more support, including people moving out of state-operated facilities or other institutions into the community. The Family Supports Waiver offers a smaller set of services for people who need less intensive support. To apply, you start at your local BDDS District Office. Indiana has eight BDDS District Offices around the state. To qualify, you generally need a diagnosis of an intellectual disability, developmental disability, or related condition that started before age 22 and is expected to last indefinitely.`,
},
{
  id: 'in-rights',
  title: 'Indiana: your legal rights as a person receiving services',
  citation: 'Indiana Code Article 12-27, "Rights of Individuals Being Treated for Mental Illness or Developmental Disabilities"',
  text: `Indiana has a law that protects your rights if you are receiving treatment or services related to a developmental disability. It is Indiana Code Article 12-27. It says you have the right to humane care and to be protected from harm. You have the right to practice your own religion. You keep your constitutional, statutory, and civil rights, except for any that a court has specifically limited. You have the right to take part in planning your own written treatment or habilitation plan, and to be told about the treatment being proposed, what happens if you get it or do not get it, and what other options exist. If you are an adult voluntary patient and have not been found legally incompetent, you generally have the right to refuse a treatment or habilitation program. This law applies to people being treated or served for mental illness or developmental disabilities in Indiana.`,
},
{
  id: 'in-service-plan',
  title: 'Indiana: your service plan (the Individualized Support Plan)',
  citation: 'FSSA/BDDS Person-Centered Individualized Support Plan (PCISP) Guidelines',
  text: `In Indiana, your plan is called an Individualized Support Plan, or ISP, and it is built using a person-centered planning process. It lays out the supports and strategies meant to help you reach your own long-term and short-term goals. Your case manager is your ongoing main point of contact and works with you and your support team to identify, choose, and coordinate paid services along with natural supports from family, friends, and your community. Your ISP is updated at least once a year, but it should also be updated any time something important changes in your life or your condition. You do not have to wait for your annual review if your circumstances change. Reach out to your case manager to ask for an update sooner.`,
},
{
  id: 'in-appeals',
  title: 'Indiana: how to appeal if services are denied or cut',
  citation: 'Indiana FSSA Office of Administrative Law Proceedings (OALP); Indiana Medicaid member appeals process',
  text: `If Indiana denies, reduces, or ends your Medicaid or waiver services, you can file an appeal. If you are enrolled in a managed care plan like Healthy Indiana Plan, Hoosier Healthwise, or Hoosier Care Connect, you first work through that health plan's own appeal process. For other Indiana Health Coverage Programs, including many waiver decisions, you can send a written appeal letter to the FSSA Office of Administrative Law Proceedings at 402 W. Washington St., Room E034, Indianapolis, IN 46204, by fax to 317-232-4412, or by email to fssa.appeals@oalp.in.gov. Include your name, the reason for your appeal, and the dates of the action you are appealing. Check your notice for your specific appeal deadline, since Indiana Medicaid deadlines can range from about 33 to 60 days depending on the type of action. If you want your current services to keep going while you wait for a decision, you generally must request that continuation within 10 days of your notice, or before the date your services would change, whichever is later, but always confirm this on your own notice since the rules depend on the type of service.`,
},
{
  id: 'in-complaints-pna',
  title: 'Indiana: reporting problems and free advocacy help',
  citation: 'Indiana Adult Protective Services hotline 1-800-992-6978; Indiana Disability Rights 1-800-622-4845',
  text: `If you or someone you know is being abused, neglected, or exploited, call Indiana Adult Protective Services at 1-800-992-6978. This hotline is available 24 hours a day, seven days a week, and you can also file a report online at inaps.in.gov. Indiana requires everyone to report suspected abuse, neglect, or exploitation of an endangered adult, so you will not get in trouble for reporting. If it is an emergency, call 911 first. For free legal help protecting your rights, contact Indiana Disability Rights at 1-800-622-4845, or locally at 317-722-5555. They are the official protection and advocacy organization for people with disabilities in Indiana, and their help is free.`,
},
```

flags: The Indiana Medicaid appeals page (in.gov/medicaid/members/member-resources/member-appeals) did not list specific deadlines or continued-benefits rules when fetched directly, so the 33 to 60 day range and the 10-day continued-benefits window came from search-summarized secondary sources (indyinhomecare.com and ckfindiana.org informational pages, not a raw FSSA regulation), and the chunk hedges by telling readers to check their own notice; the team should confirm exact numbers against 405 IAC or the FSSA policy manual directly. Adult Protective Services in Indiana recently moved to a new private contractor (Public Consulting Group Indiana) as of July 2025, so the hotline and process may be in transition; the team should confirm the number is still current. IC 12-27 covers people "being treated for mental illness or developmental disabilities" broadly rather than being HCBS-waiver-specific, so the team should check whether a narrower BDDS-specific rights regulation (460 IAC) exists and would be a better citation.
