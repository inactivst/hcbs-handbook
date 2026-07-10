# Missouri state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://dmh.mo.gov/dev-disabilities/programs/waiver
- https://dmh.mo.gov/dev-disabilities/programs/waiver/medicaid-hcb
- https://dmh.mo.gov/dev-disabilities/manuals/support-coordination
- https://dmh.mo.gov/sites/dmh/files/media/pdf/2019/08/ispguide-july2014.pdf
- https://revisor.mo.gov/main/OneSection.aspx?section=630.140
- https://law.justia.com/codes/missouri/title-xl/chapter-630/
- https://dss.mo.gov/dls/hearings/state-benefit-hearings.htm
- https://dss.mo.gov/fsd/iman/legal/hearings-manual.html
- https://moapss.health.mo.gov/
- https://dss.mo.gov/hotlines.htm
- https://www.moadvocacy.org/contact-us
- https://www.moadvocacy.org/

chunks:
```js
{
  id: 'mo-agency-waivers',
  title: 'Missouri: who runs HCBS and the main waiver programs',
  citation: 'Missouri Department of Mental Health, Division of Developmental Disabilities (Division of DD); Comprehensive Waiver, Missouri Children with Developmental Disabilities Waiver (MOCDD), Community Support Waiver, Partnership for Hope',
  text: `In Missouri, the Division of Developmental Disabilities, which is part of the Department of Mental Health, runs the Medicaid home and community-based waivers for people with intellectual and developmental disabilities. There are four main waivers: the Comprehensive Waiver, the Missouri Children with Developmental Disabilities Waiver (also called MOCDD or the Sarah Jian Lopez Waiver), the Community Support Waiver, and Partnership for Hope. These waivers pay for supports so you can live at home or in your community instead of in an institution. Your local front door is your Regional Office, and a support coordinator there helps you apply and stay connected to services. Because some waivers have limited slots, ask your Regional Office how to get on a list as soon as you think you might need services.`,
},
{
  id: 'mo-rights',
  title: 'Missouri: rights of people receiving DD services',
  citation: "Missouri Revised Statutes Chapter 630 (Department of Mental Health), Patients' Rights sections including Section 630.140",
  text: `Missouri law protects people who receive services from the Department of Mental Health, including people with developmental disabilities. Chapter 630 of the Missouri Revised Statutes has a section on patient rights and also makes your treatment records confidential except in specific situations spelled out in the law. The chapter includes rules the state must follow to keep facilities and day programs safe, humane, and adequate, and it sets out reporting duties when someone is abused, neglected, or mistreated. If you think your rights under this law were violated, you can raise it with your provider, your Regional Office, or the Department of Mental Health directly. Because the exact list of enumerated patient rights sits in state regulations tied to this chapter rather than in one single easy-to-quote sentence, ask your Regional Office for the specific rights notice that applies to your services.`,
},
{
  id: 'mo-service-plan',
  title: 'Missouri: your service plan (the Individual Support Plan)',
  citation: 'Missouri DMH Division of DD, Individual Support Plan Guidelines and Support Coordination Manual',
  text: `In Missouri, your main plan is called an Individual Support Plan, or ISP. It lays out your goals, the supports you need, and the services that will help you reach them. A support coordinator, who may work for the Division of DD or a contracted case management agency, leads this planning with you and the people you want involved, like family or friends. Your ISP is reviewed and renewed at least once a year, and the planning meeting for your new year's plan usually happens 60 to 90 days before your current plan expires so there is no gap. You and your support coordinator can also meet to update the plan any time your needs or goals change during the year.`,
},
{
  id: 'mo-appeals',
  title: 'Missouri: how to appeal if services are denied or cut',
  citation: 'Missouri Department of Social Services, Division of Legal Services state benefit hearings; DSS Family Support Division Hearings Manual',
  text: `If Missouri denies, reduces, or ends your Medicaid or HCBS services, you have the right to a state hearing through the Department of Social Services, Division of Legal Services. In general, a request for a hearing must reach the Family Support Division within 90 days of the date on the notice, and if the notice comes from an MO HealthNet managed care health plan about a service reduction or suspension, you have 120 days from the plan's written decision. Always check the notice you received first, because it lists your exact deadline and appeal instructions. Missouri's published materials for this research did not confirm whether services automatically continue while your hearing is pending, so ask the hearing office or your notice directly whether you qualify for aid-paid-pending if you appeal before your services change. You can call the Division of Legal Services or MO HealthNet at the number on your notice for help.`,
},
{
  id: 'mo-complaints-pna',
  title: 'Missouri: reporting problems and free advocacy help',
  citation: 'Missouri Adult Abuse and Neglect Hotline 1-800-392-0210; Missouri Child Abuse and Neglect Hotline 1-800-392-3738; Missouri Protection and Advocacy Services 1-800-392-8667 (TDD 1-800-735-2966)',
  text: `If you or someone you know is being abused or neglected, call the Missouri Adult Abuse and Neglect Hotline at 1-800-392-0210. For reports involving a child, call the Missouri Child Abuse and Neglect Hotline at 1-800-392-3738, which is open 24 hours a day. If it is an emergency, call 911 first. For free legal help protecting your rights, contact Missouri Protection and Advocacy Services at 1-800-392-8667, or 1-800-735-2966 for TDD users. Mo P&A is the official protection and advocacy organization designated for Missouri, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
```

flags: Could not verify from an official source whether Missouri's Medicaid appeal process includes an explicit aid-paid-pending window (services continuing unchanged while a hearing is pending) if you appeal before the effective date; the mo-appeals chunk hedges this and tells the reader to check their notice. The exact enumerated list of "patient rights" under RSMo Chapter 630 was not found as a single clean citable clause in the pages fetched (only section headers and related provisions like the confidentiality section 630.140 were confirmed), so the mo-rights chunk stays general and points the reader to the specific rights notice from their Regional Office rather than quoting rights verbatim. The Division of DD program page did not clearly state which of the four waivers has intake versus a closed enrollment/interest list; team should confirm current wait-list status per waiver before publishing.
