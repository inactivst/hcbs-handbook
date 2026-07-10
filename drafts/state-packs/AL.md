# Alabama state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://mh.alabama.gov/community-waiver-program/
- https://medicaid.alabama.gov/content/6.0_LTC_Waivers/6.1_HCBS_Waivers/6.1.5_ID_Waiver.aspx
- https://mh.alabama.gov/division-of-developmental-disabilities/systems-management/
- https://law.justia.com/codes/alabama/title-38/chapter-9c/section-38-9c-4/
- https://mh.alabama.gov/rights-for-individuals-receiving-developmental-disability-services/
- https://mh.alabama.gov/division-of-developmental-disabilities/support-coordination/
- https://mh.alabama.gov/person-centered-planning/
- https://mh.alabama.gov/waiver-appeals/
- https://dhr.alabama.gov/adult-protective-services/
- https://sites.ua.edu/adap/

chunks:
```js
{
  id: 'al-agency-waivers',
  title: 'Alabama: who runs HCBS and the main waiver programs',
  citation: 'Alabama Department of Mental Health, Division of Developmental Disabilities; Intellectual Disabilities (ID) Waiver, Living at Home (LAH) Waiver, and Community Waiver Program (1915(c) and 1115 authority)',
  text: `In Alabama, Medicaid home and community-based waivers for people with intellectual disabilities are run by the Alabama Department of Mental Health, through its Division of Developmental Disabilities. There are a few different waivers. The Intellectual Disabilities (ID) Waiver and the Living at Home (LAH) Waiver are the traditional programs, run under standard federal 1915(c) waiver rules. Alabama also has a newer program called the Community Waiver Program, or CWP, which uses a combination of 1915(c) and a special federal 1115 demonstration approval, and which is currently only available in eleven counties: Baldwin, Elmore, Houston, Jefferson, Limestone, Madison, Mobile, Montgomery, Morgan, Tuscaloosa, and Walker. Local agencies called 310 Boards help coordinate services in each area. A Support Coordinator is your main contact for applying and managing services under any of these waivers.`,
},
{
  id: 'al-rights',
  title: 'Alabama: your legal rights as a person with a developmental disability',
  citation: 'Code of Alabama, Title 38, Chapter 9C, "Bill of Rights for Persons with Developmental Disabilities and Traumatic Brain Injury"',
  text: `Alabama has a law called the Bill of Rights for Persons with Developmental Disabilities and Traumatic Brain Injury. It is Chapter 9C of Title 38 in the Code of Alabama. This law says you have the right to vote and take part in political life like anyone else. It protects your privacy with your mail, phone calls, and visitors. It says you can only be given medication that a doctor has properly prescribed. It protects your right to be free from abuse, exploitation, or neglect, and your right to make decisions about your own life. It also says you must be told how to reach advocates or rights protection services if you need help. If someone violates these rights, you can enforce them in court or through an administrative proceeding. This law applies to people receiving developmental disability services in Alabama.`,
},
{
  id: 'al-service-plan',
  title: 'Alabama: your service plan (the Person-Centered Plan)',
  citation: 'Alabama Department of Mental Health, Division of Developmental Disabilities, Support Coordination and Person-Centered Planning',
  text: `In Alabama, your main planning document is called your Person-Centered Plan, or PCP. Your Support Coordinator works with you to build this plan around your own goals and vision for your life, not just around a list of available services. The planning process is supposed to start with a comprehensive needs assessment that looks at your whole life, and Support Coordinators are trained specifically in person-centered assessment and planning methods. The plan then guides which waiver services you are approved for and how much of each you receive. Ask your Support Coordinator how often your plan gets formally reviewed and updated, since the exact schedule can depend on which waiver you are enrolled in, and always ask for changes any time your needs change during the year.`,
},
{
  id: 'al-appeals',
  title: 'Alabama: how to appeal if services are denied or cut',
  citation: 'Alabama Department of Mental Health, Division of Developmental Disabilities, Office of Waiver Appeals; appeal to Alabama Medicaid Agency Fair Hearing',
  text: `If Alabama denies, reduces, or ends your IDD waiver services, you can appeal. The first step is to send a written appeal to the Division of Developmental Disabilities Associate Commissioner. Based on the Department of Mental Health's own appeals page, this written appeal must be received within 15 calendar days of the effective date on your denial notice, which is a shorter window than in many other states, so act quickly. The Division reviews your appeal and issues a written decision. If you still disagree after that, you can request a Fair Hearing with the Alabama Medicaid Agency, the state Medicaid agency. Always check your actual notice for the exact deadline, since it should list the current timeline and instructions. Whether your services keep going unchanged while your appeal is pending was not something we could confirm from an official source, so ask directly when you file your appeal.`,
},
{
  id: 'al-complaints-pna',
  title: 'Alabama: reporting problems and free advocacy help',
  citation: 'Alabama Department of Human Resources Adult Abuse Hotline 1-800-458-7214; Alabama Disabilities Advocacy Program 1-800-826-1675',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, call the Alabama Adult Abuse Hotline at 1-800-458-7214. It is run by the Alabama Department of Human Resources and is meant for anyone 18 or older who cannot fully protect their own interests. You can also report to your local county DHR office or to law enforcement, and you can report anonymously. If it is an emergency, call 911 first. For free legal help understanding or fighting for your rights, contact the Alabama Disabilities Advocacy Program at 1-800-826-1675. They are the official protection and advocacy organization for people with disabilities in Alabama, based at the University of Alabama in Tuscaloosa, and their help is free.`,
},
```

flags: The exact review cadence for Alabama's Person-Centered Plan (for example, annual versus twice a year) was not confirmed word for word from an official page, so the draft leaves this open and tells readers to ask their Support Coordinator. Aid-paid-pending during a waiver appeal was not mentioned on the Department of Mental Health's own appeals page, so this is hedged rather than stated as fact. The Community Waiver Program's mixed 1915(c) and 1115 authority is unusual and worth double-checking against the current CMS approval documents before this pack goes live, since waiver structures can change.
