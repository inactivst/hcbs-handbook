// HandBook knowledge corpus. Underscore prefix = not exposed as an API route.
// All content is public regulation/statute. No PII lives anywhere in this app.
// Sources: 42 CFR 441.301 (HCBS Settings Final Rule), CA Lanterman Act (WIC 4500 et seq.),
// CA DDS published service code lists.

export const CHUNKS = [
  {
    id: 'hcbs-overview',
    title: 'What the HCBS Settings Rule is',
    citation: '42 CFR § 441.301(c)(4); CMS Final Rule (2014)',
    text: `The Home and Community-Based Services (HCBS) Settings Final Rule is a federal Medicaid regulation issued by CMS in 2014 (compliance required by March 17, 2023). It sets the qualities every setting must have for Medicaid to pay for HCBS there. It applies to residential settings (group homes, licensed facilities, supported living) and non-residential settings (day programs, work programs). The core idea: people receiving HCBS have the same rights of community life, privacy, and choice as people who do not receive services. Settings that isolate people from the broader community, or that have institution-like qualities, do not qualify.`,
  },
  {
    id: 'rights-community',
    title: 'Right to full access to the community',
    citation: '42 CFR § 441.301(c)(4)(i)',
    text: `The setting must be integrated in and support full access to the greater community. This includes opportunities to seek employment and work in competitive integrated settings, engage in community life, control personal resources (your own money), and receive services in the community to the same degree as people not receiving HCBS. A day program or home that keeps people on-site all day, or only takes group outings on a fixed schedule, may not meet this requirement.`,
  },
  {
    id: 'rights-choice-setting',
    title: 'Right to choose your setting',
    citation: '42 CFR § 441.301(c)(4)(ii)',
    text: `The setting must be selected by the individual from among setting options, including non-disability-specific settings (places not just for people with disabilities) and, for residential settings, an option for a private unit. Options must be identified and documented in the person-centered service plan and be based on the individual's needs and preferences, and for residential settings, resources available for room and board. You cannot simply be placed; you choose.`,
  },
  {
    id: 'rights-privacy-dignity',
    title: 'Right to privacy, dignity, and freedom from restraint',
    citation: '42 CFR § 441.301(c)(4)(iii)',
    text: `The setting must ensure an individual's rights of privacy, dignity and respect, and freedom from coercion and restraint. This covers how staff speak to you, whether your personal information and belongings are respected, whether you can have private conversations and private personal care, and prohibits punishment, seclusion, and restraint used for staff convenience.`,
  },
  {
    id: 'rights-autonomy',
    title: 'Right to independence in daily life choices',
    citation: '42 CFR § 441.301(c)(4)(iv)',
    text: `The setting must optimize, but not regiment, individual initiative, autonomy, and independence in making life choices, including but not limited to daily activities, physical environment, and with whom to interact. Examples: choosing when to wake up and go to bed, what to do during the day, how your room is arranged, and who you spend time with. Rigid house-wide schedules that everyone must follow are a red flag.`,
  },
  {
    id: 'rights-choice-provider',
    title: 'Right to choose services and providers',
    citation: '42 CFR § 441.301(c)(4)(v)',
    text: `The setting must facilitate individual choice regarding services and supports, and who provides them. You have the right to pick among available providers and to change providers, and your plan should reflect the services YOU chose, not just what a provider offers.`,
  },
  {
    id: 'provider-owned-lease',
    title: 'Provider-owned homes: lease, privacy, and your own space',
    citation: '42 CFR § 441.301(c)(4)(vi)(A)-(B)',
    text: `In a provider-owned or provider-controlled residential setting (like a group home), additional conditions apply: (A) The unit or dwelling is a specific physical place that can be owned, rented, or occupied under a legally enforceable agreement (like a lease or residency agreement), and the individual has, at a minimum, the same responsibilities and protections from eviction that tenants have under state landlord/tenant law. (B) Each individual has privacy in their sleeping or living unit: units have entrance doors lockable by the individual, with only appropriate staff having keys; individuals sharing units have a choice of roommates in that setting; individuals have the freedom to furnish and decorate their sleeping or living units within the lease or agreement.`,
  },
  {
    id: 'provider-owned-schedule-food-visitors',
    title: 'Provider-owned homes: schedule, food, visitors, accessibility',
    citation: '42 CFR § 441.301(c)(4)(vi)(C)-(E)',
    text: `In provider-owned or controlled residential settings: (C) Individuals have the freedom and support to control their own schedules and activities, and have access to food at any time. A locked refrigerator or set meal times with no alternative violates this unless properly documented as an individual modification. (D) Individuals are able to have visitors of their choosing at any time. Blanket "visiting hours" are not allowed. (E) The setting is physically accessible to the individual.`,
  },
  {
    id: 'modifications',
    title: 'When rights can be modified (and the required process)',
    citation: '42 CFR § 441.301(c)(4)(vi)(F)',
    text: `Any modification of the additional conditions (lockable doors, food access, visitors, schedule, roommate choice, decorating) must be supported by a specific assessed need and justified in the person-centered service plan. The plan must document ALL of the following: 1) a specific and individualized assessed need; 2) the positive interventions and supports used prior to any modifications; 3) less intrusive methods that were tried but did not work; 4) a clear description of the condition that is directly proportionate to the specific assessed need; 5) regular collection and review of data to measure effectiveness; 6) established time limits for periodic reviews to determine if the modification is still necessary or can be terminated; 7) informed consent of the individual; and 8) an assurance that the interventions and supports will cause no harm. A house rule applied to everyone is never a valid modification; modifications are individual, documented, and time-limited.`,
  },
  {
    id: 'person-centered-planning',
    title: 'Person-centered planning requirements',
    citation: '42 CFR § 441.301(c)(1)-(3)',
    text: `The person-centered planning process must be driven by the individual. It must: include people chosen by the individual; provide necessary information and support to ensure the individual directs the process to the maximum extent possible; be timely and occur at times and locations convenient to the individual; reflect cultural considerations and use plain language; include strategies for solving disagreement; offer choices regarding services and supports and who provides them; and be reviewed and revised upon reassessment at least every 12 months, when circumstances change, or at the individual's request. The written plan must reflect the setting chosen by the individual and their strengths, preferences, and goals.`,
  },
  {
    id: 'ca-lanterman-rights',
    title: 'California: Lanterman Act rights',
    citation: 'CA Welfare & Institutions Code §§ 4502, 4502.1',
    text: `In California, people with developmental disabilities have rights under the Lanterman Act (WIC 4500 et seq.), served through 21 regional centers. WIC 4502 guarantees, among others: the right to treatment and habilitation services in the least restrictive environment; dignity, privacy, and humane care; participation in an appropriate publicly supported education program; prompt medical care and treatment; religious freedom and practice; social interaction and participation in community activities; physical exercise and recreation; freedom from harm, including unnecessary physical restraint, isolation, excessive medication, abuse, or neglect; and freedom from hazardous procedures. WIC 4502.1 adds the right to make choices in their own lives, including where and with whom to live, their relationships, the way they spend their time, education, employment, and pursuit of personal futures.`,
  },
  {
    id: 'ca-ipp',
    title: 'California: the IPP (Individual Program Plan)',
    citation: 'CA Welfare & Institutions Code §§ 4646, 4646.5',
    text: `The IPP (Individual Program Plan) is the regional center plan that decides which services are provided. It must be developed through a person-centered process with the consumer and, where appropriate, family; be based on the person's needs and preferences; and be reviewed at least every three years (with progress reviews and updates as needed, and at the consumer's request). Services in the IPP are purchased by the regional center from vendored providers, each identified by a service code. If a service you need is not in your IPP, you can request an IPP meeting at any time to add it.`,
  },
  {
    id: 'ca-appeals',
    title: 'California: appealing a regional center decision',
    citation: 'CA Welfare & Institutions Code §§ 4710.5, 4715, 4711.5, 4712 (as amended by AB 136)',
    text: `If the regional center wants to say no to a service, cut it back, or end it, it must send you a written notice first. The notice must explain why and tell you how to appeal. You have 60 days from getting the notice to file your appeal with DDS, the Department of Developmental Services (you file with DDS, not with the regional center). Here is the most important deadline: if you appeal within 30 days, and before the change starts, your current services keep going unchanged while your appeal is decided. This is called aid paid pending, and it applies to services you already receive, not brand new requests. When you appeal, you can choose an informal meeting with the regional center, mediation with a neutral person, a fair hearing before an independent hearing officer, or all three, and you can change your mind along the way. The hearing happens within 50 days of your appeal and a final decision within 90 days. Appealing is your right, and using it cannot be held against you. Free help is available from the Office of Clients' Rights Advocacy (OCRA).`,
  },
  {
    id: 'ca-complaints',
    title: 'California: filing a rights complaint (Section 4731)',
    citation: 'CA Welfare & Institutions Code § 4731',
    text: `If you believe a regional center or a service provider violated your rights, you can file a "4731 complaint" with the regional center director, who must investigate and send a written proposed resolution within 20 working days. If unsatisfied, you may appeal to the Director of the Department of Developmental Services (DDS). This is separate from a fair hearing (which is about service decisions); 4731 is about rights violations. Free advocacy help: the Office of Clients' Rights Advocacy (OCRA) at Disability Rights California, 1-800-390-7032, serves regional center consumers at no cost. Suspected abuse or neglect should also be reported to Adult/Child Protective Services and, for licensed facilities, Community Care Licensing.`,
  },
  {
    id: 'ca-hcbs-compliance',
    title: 'California: HCBS compliance for providers',
    citation: 'CA DDS HCBS Compliance (dds.ca.gov/initiatives/hcbs)',
    text: `California requires all regional center vendored providers delivering HCBS to comply with the federal HCBS Settings Rule. Providers completed self-assessments and, where needed, remediation plans through DDS. If a setting is not meeting the rule (for example, locked food, no visitors, restricted community access without a documented individual modification), concerns can be raised with the person's service coordinator at the regional center, through a 4731 rights complaint, or via the DDS HCBS resources at dds.ca.gov/initiatives/home-and-community-based-services.`,
  },
  {
    id: 'day-program-rights',
    title: 'Rights in day programs and non-residential settings',
    citation: '42 CFR § 441.301(c)(4)(i)-(v)',
    text: `The Settings Rule applies to day programs, work activity programs, and other non-residential HCBS settings too. The five general requirements apply: community integration and access, individual choice of setting, privacy/dignity/no coercion or restraint, autonomy over activities and interactions, and choice of services and providers. The additional lease/food/visitor conditions apply only to provider-owned residential settings, but a day program still cannot regiment everyone into identical activities, isolate participants from the community, or restrict who participants interact with.`,
  },
]

// Verified against DDS-published documents: the Feb 2026 Service Code
// Crosswalk (RateReform_ServiceCode_Crosswalk_20260205.pdf) and the DDS-posted
// rate-study service code listing. Partial list - the full crosswalk lives at
// dds.ca.gov. Sorted by code so the table scans like the official lists.
export const SERVICE_CODES = [
  { code: '055', name: 'Community Integration Training Program', note: 'A day service that teaches skills out in the community instead of in a center.' },
  { code: '062', name: 'Personal Assistance', note: 'One-to-one assistance with daily activities, often in the home or community.' },
  { code: '063', name: 'Community Activities Support Services', note: 'One-on-one or small group support to take part in community activities.' },
  { code: '465', name: 'Participant-Directed Respite Services', note: 'Respite where the family picks and directs the respite worker themselves.' },
  { code: '490', name: 'Financial Management Services (F/EA)', note: 'The fiscal agent that handles paychecks and taxes for participant-directed services; 491 is the co-employer version.' },
  { code: '505', name: 'Activity Center (Adult Day Program)', note: 'Day program focused on daily living and social skills. Settings Rule community-access rights apply.' },
  { code: '510', name: 'Adult Development Center (Adult Day Program)', note: 'Day program focused on developmental skill building. Settings Rule community-access rights apply.' },
  { code: '520', name: 'Independent Living Program', note: 'Coaching to learn independent living skills like cooking, money, and getting around.' },
  { code: '525', name: 'Social Recreation Program', note: 'Fun, social group activities; regional centers can fund social recreation again since July 2021.' },
  { code: '531', name: 'Day Services', note: 'The new rate-reform day program code that programs like 505 and 510 are moving to; 532 is Behavioral Day Services and 533 is Medical Day Services.' },
  { code: '612', name: 'Behavior Analyst', note: 'A certified behavior analyst who designs and oversees behavior support plans, including ABA-style services.' },
  { code: '620', name: 'Behavior Management Consultant', note: 'A behavior specialist who consults on challenging behavior and trains the people who support the person.' },
  { code: '805', name: 'Infant Development Program', note: 'Early Start services for babies and toddlers under 3, at home or in a center.' },
  { code: '850', name: 'Camping Services', note: 'Camp and the travel to get there, restored as a fundable service in July 2021.' },
  { code: '862', name: 'In-Home Respite Services Agency', note: 'Temporary relief care in the family home, provided through a vendored agency.' },
  { code: '864', name: 'In-Home Respite Worker', note: 'Temporary relief care in the family home, provided by an individual worker.' },
  { code: '868', name: 'Out-of-Home Respite Services', note: 'Temporary care outside the family home, e.g. at a licensed facility.' },
  { code: '875', name: 'Transportation Company', note: 'Rides to and from day programs and other regional center services, provided by a vendored transportation company.' },
  { code: '896', name: 'Supported Living Services', note: 'Help with daily living so an adult can live in their own home, with support built around them.' },
  { code: '952', name: 'Supported Employment (Individual)', note: 'A job coach who helps someone get and keep a regular job in the community; 950 is the group version.' },
]

// --- State-aware layer -----------------------------------------------------
// HCBS is federal (42 CFR 441.301 applies in every state), but each state
// implements it through its own Medicaid waivers, agencies, and statutes. So
// content is a shared FEDERAL base + a per-state pack. A state is "covered"
// only when it has a pack; uncovered states get the federal baseline plus a
// referral, never invented state specifics.
// CHUNKS / SERVICE_CODES above are kept as-is for backward compatibility (the
// Rights UI still imports them); they equal the federal base + the CA pack.

const CA_CHUNK_IDS = new Set(['ca-lanterman-rights', 'ca-ipp', 'ca-appeals', 'ca-complaints', 'ca-hcbs-compliance'])

// Federal chunks apply to all states.
export const FEDERAL = CHUNKS.filter((c) => !CA_CHUNK_IDS.has(c.id))

// Per-state packs. Add a state by giving it a name + its own chunks/serviceCodes.
export const STATES = {
  CA: {
    name: 'California',
    chunks: CHUNKS.filter((c) => CA_CHUNK_IDS.has(c.id)),
    serviceCodes: SERVICE_CODES,
  },
  AL: { name: "Alabama", chunks: [
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
  ], serviceCodes: [] },
  AR: { name: "Arkansas", chunks: [
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
  ], serviceCodes: [] },
  AZ: { name: "Arizona", chunks: [
{
  id: 'az-agency-waivers',
  title: 'Arizona: who runs HCBS and the main program (this is NOT a standard 1915(c) waiver)',
  citation: 'Arizona Health Care Cost Containment System (AHCCCS); Division of Developmental Disabilities (DDD), Arizona Department of Economic Security (DES); Arizona Long Term Care System (ALTCS) under a Section 1115 demonstration waiver',
  text: `Arizona does things a little differently than most states. Instead of a typical Medicaid waiver, Arizona runs its whole Medicaid program, including long-term services for people with disabilities, under one big federal agreement called a Section 1115 demonstration waiver. AHCCCS is the state agency in charge of Medicaid overall. If you have a developmental disability and need long-term care, you apply through the Arizona Long Term Care System, known as ALTCS. If you are found eligible, you are usually connected to the Division of Developmental Disabilities, called DDD, which is part of the Arizona Department of Economic Security, or DES. DDD and AHCCCS work together, with DDD coordinating your day-to-day services and supports and AHCCCS overseeing the Medicaid rules. Because Arizona is not using a standard 1915(c) waiver, some of the appeal and planning steps look different from what you might read about other states.`,
},
{
  id: 'az-rights',
  title: 'Arizona: your legal rights as a person with a developmental disability',
  citation: 'Arizona Revised Statutes Section 36-551.01, "Persons with developmental disabilities; rights guaranteed"',
  text: `Arizona has a state law that protects your rights, found in Arizona Revised Statutes Section 36-551.01. It says you cannot be denied the rights, benefits, and privileges guaranteed to everyone else under the United States Constitution and Arizona law just because you have a developmental disability. You have the right to be protected from exploitation and abuse. If the state provides your residential care, you have the right to live in the least restrictive setting available for you. You have the right to be free from mistreatment, neglect, and abuse by the people and agencies that provide your services. You also have the right to be free from unnecessary or excessive medication. Your medicine cannot be used as punishment, to make things easier for staff, or in place of your actual service plan. If you or your parent or guardian believes your rights were violated, the law gives you the right to petition the superior court for help.`,
},
{
  id: 'az-service-plan',
  title: 'Arizona: your service plan (the Individual Support Plan)',
  citation: 'DES/DDD Operations Manual, Chapter 2000, Support Coordination',
  text: `In Arizona, your plan is called an Individual Support Plan, or ISP. It lists your needs, your goals, and the services that will help you reach them. A DDD Support Coordinator, which works like a case manager, is assigned to you and works with you to build the ISP. Your annual planning meeting sets your plan for the coming year, and DDD holds review meetings before that date if anything needs to change sooner. Your Support Coordinator is responsible for writing, reviewing, and checking in on your ISP on a regular schedule set by DDD rules, and a supervisor also reviews the plan to make sure your needs are being met. If your needs change during the year, you can ask your Support Coordinator for a review meeting instead of waiting for the annual one.`,
},
{
  id: 'az-appeals',
  title: 'Arizona: how to appeal if services are denied or cut',
  citation: 'Arizona DES/DDD, "Request an Appeal on a Notice of Adverse Benefit Determination"; AHCCCS state fair hearing process',
  text: `If DDD or AHCCCS sends you a Notice of Adverse Benefit Determination denying, reducing, or ending your services, you have 60 calendar days from the date of that notice to file an appeal. You send your appeal to the DDD Office of Administrative Review, and their phone number is 602-771-8163 or 1-844-770-9500, option 3. DDD reviews the appeal first and is supposed to issue a decision within 30 calendar days. For some kinds of services, like physical health, behavioral health, or nursing facility care, DDD hands the appeal to your DDD health plan instead. If you disagree with that first decision, AHCCCS handles the final state fair hearing. Here is the important part about keeping your services during the wait: if your appeal is about a service being reduced or ended, you can ask for it to continue, but you must file your appeal before the change takes effect or within 10 calendar days of the notice, whichever is later. If you lose the appeal, you might have to pay back the cost of services you kept getting, so always read your notice carefully or ask for help understanding it.`,
},
{
  id: 'az-complaints-pna',
  title: 'Arizona: reporting problems and free advocacy help',
  citation: 'Arizona Adult Protective Services hotline 1-877-767-2385 (1-877-SOS-ADULT); Disability Rights Arizona 1-800-927-2260 (Phoenix) or 1-800-922-1447 (Tucson)',
  text: `If you or someone you know is being abused, neglected, or exploited, call Arizona Adult Protective Services at 1-877-767-2385, also written as 1-877-SOS-ADULT. Phone reporting is answered Monday through Friday from 7 a.m. to 7 p.m., and weekends and state holidays from 10 a.m. to 6 p.m., but you can also file a report online any time. If it is a life-threatening emergency, call 911 first. For free legal help protecting your rights, contact Disability Rights Arizona, also called the Arizona Center for Disability Law. Their Phoenix office is 602-274-6287 or toll-free 1-800-927-2260, and their Tucson office is 520-327-9547 or toll-free 1-800-922-1447. They are Arizona's federally designated protection and advocacy organization, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
  ], serviceCodes: [] },
  CT: { name: "Connecticut", chunks: [
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
  ], serviceCodes: [] },
  DC: { name: "District of Columbia", chunks: [
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
  ], serviceCodes: [] },
  DE: { name: "Delaware", chunks: [
{
  id: 'de-agency-waivers',
  title: 'Delaware: who runs HCBS and the main waiver program',
  citation: 'Delaware Health and Social Services (DHSS), Division of Developmental Disabilities Services (DDDS), with Division of Medicaid and Medical Assistance (DMMA); DDDS Lifespan Waiver, a 1915(c) waiver',
  text: `In Delaware, the Division of Developmental Disabilities Services, called DDDS, runs services for people with intellectual and developmental disabilities, autism spectrum disorder, brain injury, or Prader-Willi Syndrome. DDDS and the Division of Medicaid and Medical Assistance, called DMMA, are both part of the Department of Health and Social Services and work together to run the program. The main waiver is called the DDDS Lifespan Waiver, a federal 1915(c) waiver, and it is currently the only 1915(c) waiver Delaware runs. It pays for supports that help you live in your own home or a community setting instead of an institution. One thing that sets Delaware apart from many states is that it does not currently have a waiting list for this waiver, so eligible individuals can generally enroll without a long wait.`,
},
{
  id: 'de-rights',
  title: 'Delaware: your legal rights as a person with a developmental disability',
  citation: 'Delaware Code Title 16, Chapter 55 (Persons Diagnosed with Intellectual Disabilities and Other Specific Developmental Disabilities)',
  text: `Delaware has a law that lists your basic rights if you are diagnosed with an intellectual disability or another specific developmental disability. It is Chapter 55 of Title 16 of the Delaware Code. This law says you have the same basic rights as any other citizen. You have the right to proper medical care and to the education, training, and habilitation that helps you grow your abilities as fully as possible, no matter how significant your disability is. You have the right to work toward a job, economic security, and a decent standard of living. You have the right to live with your family or other care providers, take part in community life, and enjoy leisure activities. You have the right to be protected from exploitation, abuse, and degrading treatment. If you need a guardian to protect your wellbeing, the law says the people who directly provide your services cannot also serve as your guardian.`,
},
{
  id: 'de-service-plan',
  title: 'Delaware: your service plan (the Person-Centered Plan)',
  citation: 'DDDS Lifespan HCBS Waiver Provider Policy Manual; Person-Centered Plan requirements',
  text: `In Delaware, your plan under the DDDS Lifespan Waiver is called a Person-Centered Plan, sometimes also referred to as your Life Span Plan. It is built around what matters most to you and the life you want to lead, using plain language and input from people you choose to include, like family or friends. The plan lists the services and supports you need, who provides them, and how you can ask for updates. Your DDDS support coordinator works with you to build and update this plan. By policy, your plan must be reviewed at least once a year, though it can be reviewed more often if you need a change or ask for one. Monitoring and follow-up happen between reviews to make sure the plan is actually being carried out and is still meeting your needs.`,
},
{
  id: 'de-appeals',
  title: 'Delaware: how to appeal if services are denied or cut',
  citation: 'DMMA State Fair Hearing process; 16 Del. Admin. Code Section 2101-5.0',
  text: `If Delaware Medicaid denies, reduces, or ends your services, you have the right to ask for a State Fair Hearing. In general, you have 90 days from the date on your Appeal Notice of Resolution to ask for a hearing. If your services are being reduced, suspended, or ended and you want them to continue while you wait for a decision, you generally need to ask for the hearing within 10 days of the notice and before the date the change would take effect, so act quickly and always check your specific notice for its exact deadline. You can reach the DMMA Fair Hearing Officer at 1-302-255-9500, or toll free at 1-800-372-2022. A Hearing Officer is supposed to issue a decision within 30 days of your hearing, and the whole process should be resolved within 90 days of when you filed.`,
},
{
  id: 'de-complaints-pna',
  title: 'Delaware: reporting problems and free advocacy help',
  citation: 'Delaware Adult Protective Services 1-888-277-4302; Disability Rights Delaware (CLASI) 1-800-292-7980',
  text: `If you or someone you know is being abused, neglected, or exploited, call Delaware Adult Protective Services at 1-888-277-4302. You can also report anonymously, and reports are kept confidential. If it is an emergency, call 911 first. For free legal help with your rights, contact Disability Rights Delaware, a program of Community Legal Aid Society, Inc., also called CLASI, toll free at 1-800-292-7980, or reach their New Castle County office directly at 302-575-0690. Disability Rights Delaware is the state's federally designated protection and advocacy organization, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
  ], serviceCodes: [] },
  FL: { name: "Florida", chunks: [
{
  id: 'fl-agency-waivers',
  title: 'Florida: who runs HCBS and the iBudget waiver',
  citation: 'Agency for Persons with Disabilities (APD); iBudget Florida waiver; AHCA (state Medicaid agency)',
  text: `In Florida, the Agency for Persons with Disabilities, called APD, runs the main Medicaid waiver for people with developmental disabilities. The waiver is called iBudget Florida. With iBudget, you get a set yearly budget amount, and you and your support coordinator decide together how to spend it on the services you need, like personal supports, respite, or job coaching. The Agency for Health Care Administration (AHCA) is Florida's overall Medicaid agency and works with APD on the waiver. Florida has a long waiting list for iBudget, so it is important to apply with APD early and stay in touch about your place on the list. Everyone enrolled in iBudget gets a support coordinator to help them find and manage services.`,
},
{
  id: 'fl-rights',
  title: 'Florida: the Bill of Rights for people with developmental disabilities',
  citation: 'Fla. Stat. sec. 393.13 (Bill of Rights of Persons with Developmental Disabilities)',
  text: `Florida has a law called the Bill of Rights of Persons with Developmental Disabilities. It is Section 393.13 of the Florida Statutes. The law says its goal is to protect your dignity, liberty, and civil rights. It gives you the right to be free from abuse, neglect, and exploitation, including sexual abuse. You have the right to services in the least restrictive setting, which means with as much freedom as possible. You also have rights to education and training, to be part of your community, to practice your religion, to exercise and recreation, and to vote. These rights belong to all Floridians with developmental disabilities, whether or not they get services from APD. If someone violates these rights, you can complain and get help.`,
},
{
  id: 'fl-service-plan',
  title: 'Florida: your support plan and support coordinator',
  citation: 'APD iBudget program; Waiver Support Coordination (APD)',
  text: `In Florida, your service plan is called a support plan. It is a person-centered plan, which means it is built around your goals, your strengths, and what you need to live the life you want. You choose a waiver support coordinator, often called a WSC, and that person helps you write the plan, find services, and make sure providers are doing their job. Your support coordinator should also speak up for you and check in on how things are going. Planning is ongoing, and your support plan is updated regularly, usually every year, and any time your needs change in a big way. If your support coordinator is not helping you the way you need, you have the right to pick a different one.`,
},
{
  id: 'fl-appeals',
  title: 'Florida: how to appeal if services are denied or cut',
  citation: 'Fla. Admin. Code R. 59G-1.100 (Medicaid Fair Hearings); DCF Office of Appeal Hearings (iBudget)',
  text: `If Florida denies, reduces, or ends your Medicaid services, you can ask for a fair hearing. For iBudget waiver decisions, the hearing is held by the Department of Children and Families Office of Appeal Hearings. For decisions made by a Medicaid health plan, you usually finish the plan's appeal first, and then you can ask AHCA for a fair hearing. Your denial notice tells you exactly how to ask and what your deadline is, so read it carefully and check your notice for the date. Here is the most important tip: if you are already getting a service and want it to keep going during your appeal, ask for the hearing within 10 days of the notice, or before the date the change starts. You can also call the Medicaid Helpline at 1-877-254-1055 for help asking for a hearing.`,
},
{
  id: 'fl-complaints-pna',
  title: 'Florida: reporting problems and free advocacy help',
  citation: 'Florida Abuse Hotline 1-800-962-2873 (1-800-96-ABUSE); Disability Rights Florida 1-800-342-0823',
  text: `If you or someone you know is being abused, neglected, or exploited, call the Florida Abuse Hotline at 1-800-962-2873. That is 1-800-96-ABUSE, and it is open 24 hours a day, every day. In Florida, reporting suspected abuse of a person with a developmental disability is not just the right thing to do, it is the law. If someone is in immediate danger, call 911 first. APD has a Zero Tolerance policy, which means no amount of abuse or neglect is ever acceptable. For free legal and advocacy help, contact Disability Rights Florida at 1-800-342-0823. They are the official protection and advocacy organization for Floridians with disabilities. Their services are free, and they can help with things like service denials, rights violations, and abuse cases.`,
},
  ], serviceCodes: [] },
  GA: { name: "Georgia", chunks: [
{
  id: 'ga-agency-waivers',
  title: 'Georgia: who runs HCBS and the main waiver programs',
  citation: 'Georgia DCH Medicaid Waiver Programs; NOW and COMP waivers operated by DBHDD',
  text: `In Georgia, the Department of Community Health (DCH) runs the state's Medicaid program. DCH partners with the Department of Behavioral Health and Developmental Disabilities (DBHDD) to run the two main waivers for people with intellectual or developmental disabilities. A waiver is a Medicaid program that pays for help at home and in the community instead of in an institution. The New Options Waiver (NOW) is for people who live on their own or with family. The Comprehensive Supports Waiver (COMP) is for people who need more help, including residential care. DBHDD handles the day-to-day work through six regional field offices around the state. You can apply online through the Individual IDD Connects portal, in person at a DBHDD regional office, or by mail. Online applications are processed the fastest.`,
},
{
  id: 'ga-rights',
  title: 'Georgia: your rights are protected by state law',
  citation: 'O.C.G.A. Title 37, Chapters 3, 4, and 7; DBHDD Rules Chapter 82-5 (Rights of Individuals)',
  text: `Georgia law protects the rights of people with developmental disabilities who receive services. These protections come from Title 37 of the Official Code of Georgia, and Chapter 4 is the part about developmental disabilities. DBHDD has written rules, based on this law, that spell out your rights when you get treatment or services. These include rights about how you are treated, your treatment environment, your personal affairs, and who can see your records. The rules also say you must be told about your rights and what you can do if they are violated. If you feel your rights were not respected, you can complain to DBHDD or ask the Georgia Advocacy Office for free help.`,
},
{
  id: 'ga-service-plan',
  title: 'Georgia: your Individual Service Plan (ISP)',
  citation: 'DBHDD Support Coordination; Georgia.gov NOW/COMP application page',
  text: `If you get NOW or COMP waiver services, you have a plan called the Individual Service Plan, or ISP. The plan is built around your own strengths, needs, and goals, so it should sound like you, not like a form. A support coordinator helps you put the plan together. This is a person whose job is to help you get your services and make sure they are working. Support coordinators in Georgia serve no more than 40 people, and they visit you at least quarterly, or monthly if you need more support. Your services must be reviewed and renewed every year. If your needs change before then, you can ask your support coordinator to update the plan at any time. It is your plan, so speak up about what you want in it.`,
},
{
  id: 'ga-appeals',
  title: 'Georgia: how to appeal if services are denied or cut',
  citation: 'Georgia Medicaid Fair Hearings (DCH/DFCS policy, Appendix B); Office of State Administrative Hearings',
  text: `If Georgia Medicaid denies, reduces, or stops your services, you have the right to appeal. This is called a fair hearing, and a judge from the Office of State Administrative Hearings listens to your side. State policy says you must ask for a hearing within 30 days of the notice you disagree with, but read your own notice carefully because it will list your exact deadline. Here is an important tip: if you ask within 10 days of the notice date, you can request that your services keep going while you wait for the hearing. Be aware that if you lose the appeal, the state may ask you to pay back services you received during that time. You should get a written decision within 90 days of your request. You never have to face a hearing alone; a friend, family member, or advocate can help you.`,
},
{
  id: 'ga-complaints-pna',
  title: 'Georgia: reporting problems and free advocacy help',
  citation: 'DBHDD Constituent Services; Georgia Adult Protective Services; Georgia Advocacy Office (Georgia P&A per NDRN)',
  text: `If something is wrong with your services, you have places to turn. For complaints about DBHDD services or providers, contact DBHDD Constituent Services at 404-657-5964 or file online through their Constituent Services portal. If an adult with a disability is being abused, neglected, or exploited, call Georgia Adult Protective Services at 1-866-552-4464 and press 3, or file a report online any time. If someone is in immediate danger, call 911 first. You can also get free help from the Georgia Advocacy Office, which is Georgia's protection and advocacy organization. Its job is to protect the legal, civil, and human rights of people with disabilities. Call them at 404-885-1234 or toll free at 800-537-2329. You do not need proof to report a problem, and asking for help is always okay.`,
},
  ], serviceCodes: [] },
  IA: { name: "Iowa", chunks: [
{
  id: 'ia-agency-waivers',
  title: 'Iowa: who runs HCBS and the main waiver program',
  citation: 'Iowa Department of Health and Human Services (HHS); HCBS Intellectual Disability (ID) Waiver, a 1915(c) waiver',
  text: `In Iowa, the Department of Health and Human Services, called Iowa HHS, runs the Medicaid waiver program for people with intellectual disabilities. The main program is the Home and Community-Based Services Intellectual Disability Waiver, usually called the ID Waiver. It pays for services like supported community living, day habilitation, supported employment, home and vehicle changes, nursing, and consumer-directed attendant care, so you can live in your own home or community instead of an institution. Iowa runs several other HCBS waivers too, for things like brain injury or health and disability needs, so if the ID Waiver is not the right fit, ask HHS about other waiver options. You can reach Iowa HHS at 800-972-2017, or reach Iowa Medicaid Member Services at 1-800-338-8366 for questions about applying.`,
},
{
  id: 'ia-rights',
  title: 'Iowa: your rights if you live in a licensed care facility',
  citation: 'Iowa Code Chapter 135C (Health Care Facilities); federal resident rights under 42 C.F.R. 483.10, 483.12, 483.13, and 483.15',
  text: `Iowa has a law, Iowa Code Chapter 135C, that protects the rights of people living in licensed health care facilities, and it requires facilities to follow the federal resident's rights rules found in 42 C.F.R. sections 483.10, 483.12, 483.13, and 483.15. These rules cover things like your right to be treated with dignity, your right to be free from abuse and unnecessary restraint, and your right to take part in decisions about your own care. Iowa Code Chapter 135C also names the state's Protection and Advocacy agency as the organization responsible for helping make sure these rights are followed. Keep in mind this law is written for people living in licensed facilities, like nursing or intermediate care facilities. If you get ID Waiver services in your own home rather than a facility, check your service plan and provider agreement for the specific rights and protections that apply to your situation.`,
},
{
  id: 'ia-service-plan',
  title: 'Iowa: your service plan (the Individual Service Plan)',
  citation: 'Iowa HCBS Intellectual Disability Waiver manual; Individual Service Plan (ISP) developed with the Interdisciplinary Team (IDT)',
  text: `In Iowa, your plan under the ID Waiver is called the Individual Service Plan, or ISP. It is built through a person-centered planning process with your Interdisciplinary Team, sometimes called the IDT, which includes you and the people who support you. Your case manager, or your Community-Based Case Manager if you are in a managed care plan, signs off on the plan and helps make sure it gets followed. Your ISP is reviewed and updated at least once a year, and your team also meets to update it any time there is a significant change in your life or your needs. When ID Waiver services start, Iowa requires you to have ongoing Medicaid case management, so your case manager should be your main point of contact for questions or changes to your plan.`,
},
{
  id: 'ia-appeals',
  title: 'Iowa: how to appeal if Medicaid services are denied or cut',
  citation: 'Iowa HHS Appeals process; HHS Appeals Bureau 1-888-723-9637',
  text: `If Iowa denies, reduces, or ends your Medicaid services, you have the right to file an appeal with Iowa HHS. You generally have 90 days from the date on your written notice to appeal. If you file later than 30 days but still within 90 days, you will need to explain why your appeal is late. An important protection applies if your appeal is about services you were already getting that got reduced or ended: you can usually keep receiving those services while your State Fair Hearing is pending. Just be aware that if the hearing decides the state's action was correct, you may have to pay back the value of services you received during the appeal. You can file your appeal by mail to HHS Appeals, 321 E 12th Street, Des Moines, IA 50319, by fax to 515-564-4044, by email to appeals@hhs.iowa.gov, or by calling the HHS Appeals Bureau at 1-888-723-9637. Always check your notice for your exact deadline.`,
},
{
  id: 'ia-complaints-pna',
  title: 'Iowa: reporting problems and free advocacy help',
  citation: 'Iowa HHS Child and Dependent Adult Abuse Hotline 1-800-362-2178; Disability Rights Iowa 1-800-779-2502',
  text: `If you or someone you know, of any age, is being abused, neglected, or exploited, call the Iowa HHS abuse hotline at 1-800-362-2178. It is answered 24 hours a day, seven days a week, and covers both child abuse and dependent adult abuse reports, including for people with developmental, intellectual, or cognitive disabilities. If someone is in immediate danger, call 911 first. For free legal help protecting your rights, contact Disability Rights Iowa at 1-800-779-2502, or their local Des Moines number at 515-278-2502. They are Iowa's official Protection and Advocacy organization for people with disabilities, and their help is free.`,
},
  ], serviceCodes: [] },
  ID: { name: "Idaho", chunks: [
{
  id: 'id-agency-waivers',
  title: 'Idaho: who runs HCBS and the main waiver programs',
  citation: 'Idaho Department of Health and Welfare (IDHW), Division of Medicaid; Adult Developmental Disabilities Waiver',
  text: `In Idaho, the Department of Health and Welfare (IDHW) runs the Medicaid home and community based waiver programs. If you are an adult age 18 or older with autism, a developmental disability, or an intellectual disability and you need the level of care usually given in an intermediate care facility, the waiver you will likely use is the Adult Developmental Disabilities Waiver. It pays for supports like residential habilitation, supported employment, respite for family caregivers, adult day health, behavior consultation, and skilled nursing, so you can live in your own home or in the community instead of an institution. Idaho also runs a separate Aged and Disabled Waiver mainly for seniors and people with physical disabilities. You apply for the Adult Developmental Disabilities Waiver through IDHW, and the department also offers a self-direction option that lets you manage your own care and hire your own caregivers.`,
},
{
  id: 'id-rights',
  title: 'Idaho: your legal rights as a person with a developmental disability',
  citation: 'Idaho Code Section 66-412 (Rights of Developmentally Disabled Persons)',
  text: `Idaho has a law, Idaho Code Section 66-412, that spells out your rights if you are a person with a developmental disability, especially if you live in a facility. You have the right to be free from mental and physical abuse, including abuse caused by carelessness or neglect. You have the right to live in the setting that restricts your personal freedom the least while still giving you the care you need. You can send and receive mail, make phone calls, and have visitors at reasonable times. You can wear your own clothes, keep personal belongings, and manage a reasonable amount of your own money. You keep your civil rights, including the right to vote and to make contracts, unless a court has said otherwise. Isolation and mechanical restraints are not allowed unless they are truly necessary to keep you or others safe. Facilities are required to post these rights and explain them to you.`,
},
{
  id: 'id-service-plan',
  title: 'Idaho: your service plan (the Plan of Service)',
  citation: 'IDHW Developmental Disabilities Program; Adult Developmental Disabilities Waiver plan development process',
  text: `In Idaho, your plan is usually called a Plan of Service. A plan developer, also called a service coordinator, meets with you and the people who support you to lead a person-centered planning meeting. In that meeting, you choose your own goals, the services you want, and who will provide them. The plan developer then writes it all down in your Plan of Service. Idaho's rules require providers of services like residential habilitation, supported employment, and behavior consultation to submit status reviews showing how you are doing on your goals, and these happen on a regular schedule set by the state. Check with your plan developer or IDHW for the exact review schedule that applies to your specific services, since this can vary by service type.`,
},
{
  id: 'id-appeals',
  title: 'Idaho: how to appeal if services are denied or cut',
  citation: 'IDHW Appeals and Fair Hearings process; Office of Administrative Hearings',
  text: `If Idaho denies, reduces, or ends your Medicaid services, you have the right to appeal. You generally have 28 days from the date on your notice to file an appeal about Medicaid services, though it can be different for other kinds of Medicaid decisions, so always check your specific notice for your deadline. Your appeal is heard by the Office of Administrative Hearings, an independent hearing officer who works like a judge and is separate from the caseworker who made the decision. If you already receive the service and want it to continue while you wait, you generally need to ask within 10 days of your notice, or before the date your services are set to end, whichever is later. Keep in mind that if you lose the appeal, you may have to pay back any benefits you kept receiving during that time. You can call the Idaho Department of Health and Welfare at 1-877-456-1233 for help with the appeals process.`,
},
{
  id: 'id-complaints-pna',
  title: 'Idaho: reporting problems and free advocacy help',
  citation: 'Idaho Commission on Aging Adult Protective Services 208-334-3833 or 1-877-471-2777; DisAbility Rights Idaho 1-866-262-3462',
  text: `If you or someone you know, age 18 or older, is being abused, neglected, or taken advantage of, you can report it to Idaho Adult Protective Services, run through the Idaho Commission on Aging and your local Area Agency on Aging. Call 208-334-3833 or the toll-free line at 1-877-471-2777. If it is a life-threatening emergency, call 911 first. For free legal help protecting your rights, contact DisAbility Rights Idaho, the official protection and advocacy organization for people with disabilities in Idaho, at their toll-free number 1-866-262-3462. Their local Pocatello office can also be reached at 208-336-5353. Reporting a problem or asking for help is free, and your identity as a reporter is kept confidential.`,
},
  ], serviceCodes: [] },
  IL: { name: "Illinois", chunks: [
{
  id: 'il-agency-waivers',
  title: 'Illinois: who runs HCBS and the main waiver programs',
  citation: 'IDHS Division of Developmental Disabilities; Adults with Developmental Disabilities 1915(c) waiver; HFS (state Medicaid agency)',
  text: `In Illinois, the Department of Human Services Division of Developmental Disabilities, often called the DDD, runs the Medicaid waivers for people with developmental disabilities. The main program for adults is the Adults with Developmental Disabilities Waiver, and there are also waivers for children. The Department of Healthcare and Family Services (HFS) is the state's overall Medicaid agency. Your local front door is an Independent Service Coordination agency, called an ISC. The ISC helps you apply, checks eligibility, and stays with you as your independent advocate. Illinois selects most people for waiver services from a statewide waiting list called PUNS, which stands for Prioritization for Urgency of Need for Services. Sign up for PUNS through your ISC as early as you can, because selection can take years.`,
},
{
  id: 'il-rights',
  title: 'Illinois: your legal rights as a recipient of DD services',
  citation: '405 ILCS 5, Chapter II (Rights of Recipients of Mental Health and Developmental Disabilities Services)',
  text: `Illinois has a law that protects your rights when you receive developmental disability services. It is Chapter II of the Mental Health and Developmental Disabilities Code, found at 405 ILCS 5. The law says you keep all your rights, benefits, and privileges just like anyone else. Getting services does not mean you lose any legal rights, and no one can treat you as legally unable to decide things unless a court says so. You cannot be denied services because of your age, sex, race, religion, ethnic background, marital status, or disability. When you start services, you and your guardian, if you have one, must be told about your rights, out loud and in writing. Programs must also post your rights where everyone can see them, along with contact information for advocacy organizations that can help.`,
},
{
  id: 'il-service-plan',
  title: 'Illinois: your service plan (the Personal Plan)',
  citation: 'IDHS Person-Centered Planning Policy and Guidelines for DD Waiver Services',
  text: `In Illinois, your service plan is called a Personal Plan. It is one complete picture of the life you want, built around your strengths, preferences, needs, and dreams. Your Independent Service Coordination agency, the ISC, writes the Personal Plan with you, and you can include your guardian, family, and providers in the process. The ISC is independent, which means it does not work for your service providers, so it can be a fair advocate for you. Providers then use your Personal Plan to write their own implementation strategies describing exactly how they will support you. The plan is reviewed and updated at least once a year, and you can ask your ISC to update it any time your life or needs change. Your ISC also visits during the year to check that services match your plan.`,
},
{
  id: 'il-appeals',
  title: 'Illinois: how to appeal if services are denied or cut',
  citation: 'IDHS DDD appeals process; HFS administrative hearing',
  text: `If Illinois denies your DD waiver services, or ends, suspends, or reduces them, you can appeal. Illinois uses two steps. First, you can ask the Division of Developmental Disabilities for an informal review. Tell your ISC agency you want to appeal within 10 working days of getting the decision notice, and the ISC will help you put your appeal packet together. The DDD then reviews your case and sends you a written decision. Second, if you disagree with that decision, you can request an administrative hearing with the Department of Healthcare and Family Services within 10 days. Your written notice should say whether your services will continue during the appeal, so check your notice carefully and ask your ISC if it is not clear. You can have a family member, advocate, or lawyer help you at every step.`,
},
{
  id: 'il-complaints-pna',
  title: 'Illinois: reporting problems and free advocacy help',
  citation: 'IDHS Office of Inspector General hotline 1-800-368-1463; Equip for Equality 1-800-537-2632',
  text: `If you or someone you know is being abused, neglected, or exploited in a program that serves people with developmental disabilities, call the Illinois Department of Human Services Office of Inspector General hotline at 1-800-368-1463. It is open 24 hours a day, and the people who answer are trained investigators. The OIG investigates abuse and neglect in programs that DHS operates, licenses, certifies, or funds. If someone is in immediate danger, call 911 first. You can also file a grievance directly with the Division of Developmental Disabilities about how services are being handled. For free legal and advocacy help, contact Equip for Equality at 1-800-537-2632. They are Illinois' official protection and advocacy organization, and their services are free.`,
},
  ], serviceCodes: [] },
  IN: { name: "Indiana", chunks: [
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
  ], serviceCodes: [] },
  KS: { name: "Kansas", chunks: [
{
  id: 'ks-agency-waivers',
  title: 'Kansas: who runs HCBS and the main waiver programs',
  citation: 'Kansas Department for Aging and Disability Services (KDADS); I/DD 1915(c) waiver, coordinated through KanCare managed care',
  text: `Kansas is different from many states because it runs almost all of its Medicaid, including waiver services, through managed care plans called KanCare. The Kansas Department for Aging and Disability Services, or KDADS, sets policy for the Intellectual/Developmentally Disabled waiver, known as the I/DD waiver, but your day-to-day services are coordinated through your KanCare managed care organization along with your local Community Developmental Disability Organization, called a CDDO. The CDDO in your area determines your eligibility and connects you to service providers and a case manager. Kansas has a long-known waitlist for the I/DD waiver, historically several years long. In 2026, Kansas rolled out a new Community Support Waiver for people who do not need round-the-clock support, meant to open up access sooner for some applicants, so ask your CDDO whether this newer waiver fits your situation.`,
},
{
  id: 'ks-service-plan',
  title: 'Kansas: your Person-Centered Support Plan',
  citation: 'KDADS I/DD Waiver policy; targeted case management and Person-Centered Support Plan (PCSP) requirements',
  text: `In Kansas, your services are guided by a document called the Person-Centered Support Plan, often shortened to PCSP. Everyone who gets I/DD waiver services is required to have one. Your targeted case manager, who you get to choose from providers connected to your CDDO, works with you and your team to build this plan around your goals and needs. The PCSP lists the services and supports you will receive and how much of each. It is reviewed and updated at least once a year, and you can also ask for a review any time your needs change, not just at the yearly checkpoint. Because you choose your own case manager, if you are not happy with how your plan is being handled, you have the right to ask your CDDO about switching to a different case management provider.`,
},
{
  id: 'ks-appeals',
  title: 'Kansas: how to appeal if KanCare services are denied or cut',
  citation: 'KanCare Appeals and Fair Hearings process (kancare.ks.gov)',
  text: `If your KanCare managed care plan denies, reduces, or ends your HCBS services, you can file an appeal with your managed care organization, called an MCO. If you ask for the appeal within 63 calendar days of the notice, your current services generally keep going unchanged while the MCO reviews your case, and the MCO must decide within 30 calendar days. If you disagree with the MCO's appeal decision, you can then ask for a state fair hearing, generally within 123 calendar days of that decision, and your services can keep going during the state fair hearing too if you ask in time. These are Kansas-specific timelines that are longer than in many other states, but always check the exact dates on your notice, since they can vary by situation. If the hearing officer later rules in your favor, the MCO must pay for the services you kept receiving while you waited.`,
},
{
  id: 'ks-complaints-pna',
  title: 'Kansas: reporting abuse and free advocacy help',
  citation: 'Kansas Protection Report Center 1-800-922-5330; Disability Rights Center of Kansas 1-877-776-1541',
  text: `If you or someone you know is being abused, neglected, or exploited, call the Kansas Protection Report Center at 1-800-922-5330. It is run by the Kansas Department for Children and Families and is staffed 24 hours a day, every day, for both adult and child reports. If someone is in immediate danger, call 911 or local law enforcement first. For free legal help protecting your rights, contact the Disability Rights Center of Kansas at 1-877-776-1541, or 785-273-9661 locally. They are the official protection and advocacy organization for people with disabilities in Kansas, and their help is free. You will not get in trouble for reporting a problem or for asking for help.`,
},
  ], serviceCodes: [] },
  KY: { name: "Kentucky", chunks: [
{
  id: 'ky-agency-waivers',
  title: 'Kentucky: who runs HCBS and the main waiver programs',
  citation: 'Kentucky Cabinet for Health and Family Services, Department for Medicaid Services (DMS) and Department for Behavioral Health, Development and Intellectual Disabilities (DBHDID); Michelle P. Waiver (907 KAR 1:835) and Supports for Community Living Waiver',
  text: `In Kentucky, Medicaid home and community-based waivers for people with intellectual and developmental disabilities are jointly run by two agencies inside the Cabinet for Health and Family Services. The Department for Medicaid Services, or DMS, and the Department for Behavioral Health, Development and Intellectual Disabilities, or DBHDID, work together to operate the Michelle P. Waiver, which helps people with intellectual or developmental disabilities live in their own home or with family instead of in an institution. Kentucky also has the Supports for Community Living Waiver for people with intellectual disabilities who want to live in their own home, a family home, or an agency-supported home in the community. You apply through kynect, in person at an Aging and Disability Resource Center, or through a Community Mental Health Center. Kentucky has a waiting list for the Michelle P. Waiver, and your spot is based on the date your completed application was received, so apply as early as you can.`,
},
{
  id: 'ky-rights',
  title: 'Kentucky: your legal rights as a person with an intellectual disability',
  citation: 'Kentucky Revised Statutes Chapter 202A (mental health) applied to intellectual disability via KRS Chapter 210 and 202A cross-references',
  text: `Kentucky law extends the patient rights protections written for people with mental illness to people with an intellectual disability as well. Under KRS Chapter 202A, you have the right to refuse treatment, and you cannot be forcibly treated unless a court has reviewed and ordered it. If a facility wants to transfer you, you and your guardian or family member must be told about the proposed transfer ahead of time and given the chance to challenge it as part of your individual treatment plan. We were not able to confirm a single, separate bill of rights statute written specifically and only for people with intellectual disabilities the way some other states have, so this chunk describes the protections that were confirmed from Kentucky's mental health and intellectual disability statutes together, and the team should verify whether a more specific rights law exists before this pack goes live.`,
},
{
  id: 'ky-service-plan',
  title: 'Kentucky: your service plan (the Person-Centered Service Plan)',
  citation: '907 KAR 1:835, Michelle P. Waiver services and reimbursement',
  text: `In Kentucky, your main planning document under the Michelle P. Waiver is called the Person-Centered Service Plan. Your case manager builds this plan with you and is required to check in with you in person at least once a month, whether at your home, an adult day health center, or an adult day training provider's location, to make sure your services match what is written in your plan. Your case manager also tracks your progress toward the goals in your plan over time. Your plan and eligibility are formally reviewed and recertified at least once a year, and this recertification requires at least one face-to-face meeting between you, your case manager, and a family member or legal representative if you have one. You can ask for a review sooner if your needs change.`,
},
{
  id: 'ky-appeals',
  title: 'Kentucky: how to appeal if services are denied or cut',
  citation: 'Kentucky Department for Medicaid Services, Division of Program Quality and Outcomes, MCO Appeal Process; state fair hearing process',
  text: `If Kentucky denies, reduces, or ends your Medicaid or waiver services, you can ask for a state fair hearing through the Department for Medicaid Services. Deadlines vary depending on the type of denial, so always check your written notice first for your exact deadline, since it can be as short as 10 days or as long as 120 days depending on the situation. Here is an important protection: you may be able to keep receiving a service while your appeal is pending. If your benefits are continued this way, they generally keep going until 10 calendar days after your appeal decision letter is mailed, unless you separately ask to continue benefits within 10 days of that letter. If the hearing is decided in your favor, any services that were paused are supposed to be approved and restarted quickly, generally within about 72 hours of the decision. Because these rules can be technical, consider asking a case manager or legal aid organization for help filing.`,
},
{
  id: 'ky-complaints-pna',
  title: 'Kentucky: reporting problems and free advocacy help',
  citation: 'Kentucky Child and Adult Abuse Hotline 1-877-597-2331 (877-KYSAFE1) or 1-800-752-6200; Kentucky Protection & Advocacy 1-800-372-2988',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, call the Kentucky Child and Adult Abuse Hotline at 1-877-597-2331, also known as 877-KYSAFE1, or 1-800-752-6200. Both numbers are toll-free and run by the Cabinet for Health and Family Services. If it is an emergency, call 911 first. You can also report non-emergency concerns online through the state's Child/Adult Protective Services Reporting System, and you can report anonymously. For free legal help understanding or fighting for your rights, contact Kentucky Protection & Advocacy at 1-800-372-2988 or 502-564-2967. They work to inform, educate, and empower Kentuckians with disabilities, though the team should confirm their exact federal Protection and Advocacy designation status directly through ndrn.org before this pack goes live, since Kentucky's P&A operates differently from some other states.`,
},
  ], serviceCodes: [] },
  LA: { name: "Louisiana", chunks: [
{
  id: 'la-agency-waivers',
  title: 'Louisiana: who runs HCBS and the main waiver programs',
  citation: "Louisiana Department of Health (LDH), Office for Citizens with Developmental Disabilities (OCDD); New Opportunities Waiver, Supports Waiver, Children's Choice Waiver, Residential Options Waiver",
  text: `In Louisiana, Medicaid home and community-based waivers for people with developmental disabilities are run by the Office for Citizens with Developmental Disabilities, called OCDD, which is part of the Louisiana Department of Health. There are four main waivers. The New Opportunities Waiver, or NOW, offers the widest range of supports and is meant for people with more intensive needs. The Supports Waiver serves adults 18 and older whose needs can be met without 24-hour support. The Children's Choice Waiver serves children, and the Residential Options Waiver focuses on housing supports. To qualify for most of these waivers you must meet Louisiana's legal definition of a developmental disability and meet a level of care similar to what an intermediate care facility for people with intellectual disabilities would provide. You can contact OCDD directly at 225-342-0095, and a Support Coordinator will be your main point of contact once you are approved.`,
},
{
  id: 'la-rights',
  title: 'Louisiana: your legal rights as a person with a developmental disability',
  citation: 'Louisiana Revised Statutes Title 28, Chapter 28:451 and following ("Developmental Disability Law")',
  text: `Louisiana has a law that protects the rights of people with developmental disabilities. It is found in Title 28 of the Louisiana Revised Statutes, starting around Section 451, and it is called the Developmental Disability Law. This law says the state's whole system of services must value you as a person and protect your basic rights and privileges as a citizen. It is built on the idea that having a disability is a normal part of being human, and that it does not take away your right to make choices and have control over your own life. The law gives you the right to a timely, expeditious evaluation if you are thought to have a developmental disability, and the right to receive services that fit your personal needs and choices in the most integrated setting that works for you. It supports your right to live, work, and enjoy leisure activities in your community as you choose.`,
},
{
  id: 'la-service-plan',
  title: 'Louisiana: your service plan (the Plan of Care)',
  citation: 'Louisiana Department of Health, OCDD Guidelines for Support Planning; OCDD Support Coordination',
  text: `In Louisiana, your main planning document under an OCDD waiver is usually called your Plan of Care, sometimes built from an underlying support plan. Your Support Coordinator, who works for a support coordination agency, helps you gain access to the waiver services and other medical, social, and educational supports you need, and helps put together your plan. The planning process is meant to center on your needs, preferences, and goals. Ask your Support Coordinator directly how often your Plan of Care is formally reviewed and updated each year, since we could not confirm one single review cadence that applies to every OCDD waiver from the sources checked, and you can always ask for a review sooner if your needs change.`,
},
{
  id: 'la-appeals',
  title: 'Louisiana: how to appeal if services are denied or cut',
  citation: 'Louisiana Department of Health, How to Appeal Medicaid; Division of Administrative Law state fair hearings',
  text: `If Louisiana denies, reduces, or ends your Medicaid or waiver services, you have the right to appeal. Appeals are heard by the Division of Administrative Law as a state fair hearing. You can appeal online, in writing to the Division of Administrative Law's Health and Hospitals Section, or by calling 225-342-5800 or 225-342-0443. Your denial notice will tell you the exact date by which you must file, so always check that notice first. Here is an important protection: if you file your appeal within 10 days of the date on your denial notice, your current services generally continue unchanged while your appeal is being decided. You should get a final decision within about 30 days of filing, unless more time is agreed to. You can have a family member, lawyer, or advocacy group like Disability Rights Louisiana help represent you during the appeal.`,
},
{
  id: 'la-complaints-pna',
  title: 'Louisiana: reporting problems and free advocacy help',
  citation: 'Louisiana Adult Protective Services 1-800-898-4910 (ages 18-59); Elderly Protective Services 1-833-577-6532 (ages 60+); Disability Rights Louisiana 1-800-960-7705',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, call Louisiana Adult Protective Services at 1-800-898-4910. This line is toll-free, open 24 hours a day, seven days a week, and covers adults ages 18 to 59 with qualifying disabilities. If the person is 60 or older, call Elderly Protective Services instead at 1-833-577-6532. If it is an emergency, call 911 first. Reports of physical or sexual abuse must be made by phone rather than the online form. For free legal help understanding or fighting for your rights, contact Disability Rights Louisiana at 1-800-960-7705. They are Louisiana's protection and advocacy organization for people with disabilities, and their help is free.`,
},
  ], serviceCodes: [] },
  MA: { name: "Massachusetts", chunks: [
{
  id: 'ma-agency-waivers',
  title: 'Massachusetts: who runs HCBS and the main waiver programs',
  citation: 'Massachusetts Department of Developmental Services (DDS), with MassHealth; Adult Supports, Community Living, and Intensive Supports 1915(c) waivers',
  text: `In Massachusetts, the Department of Developmental Services, called DDS, runs the day-to-day operation of the home and community based waivers for adults with intellectual disabilities, working together with MassHealth, which is the state Medicaid agency. There are three adult waivers to know about. The Adult Supports Waiver is for people who need at least one home or community based service a month but do not need round-the-clock care. The Community Living Waiver is for people who need more support than Adult Supports but less than the highest tier. The Intensive Supports Waiver is for people with the most significant support needs. People in these waivers can live in a family home, in adult foster care, with a live-in caregiver, or on their own. DDS is your main point of contact for figuring out which waiver fits your situation.`,
},
{
  id: 'ma-rights',
  title: 'Massachusetts: your rights as a person served by DDS',
  citation: '115 CMR 5.00, "Standards to Promote Dignity"; 115 CMR 3.09, Protection of Human Rights and Human Rights Committees',
  text: `Massachusetts has a state regulation about your rights and dignity as a person served by DDS. It is called 115 CMR 5.00, Standards to Promote Dignity, and it applies to every provider, service, and support that DDS operates, licenses, certifies, or pays for. Under this rule, you have the right to reasonable access to a telephone, the internet, email, and social media, and the right to make and receive private, confidential communications. DDS also requires providers to set up Human Rights Committees under a related rule, 115 CMR 3.09. These committees are responsible for protecting your human and civil rights, and they review and approve any use of behavior modification plans or emergency restraints. Every provider must have a Human Rights Officer whose job is to make sure staff, individuals, and families know about these rights, and copies of the full regulation must be available for you to look at.`,
},
{
  id: 'ma-service-plan',
  title: 'Massachusetts: your service plan (the Individual Service Plan)',
  citation: 'DDS Individual Support Planning process, as described by Mental Health Legal Advisors Committee guidance',
  text: `In Massachusetts, your plan is called an Individual Service Plan, or ISP. A DDS service coordinator is assigned to you and leads the planning process. Your ISP team includes you, your guardian or family if you choose, your service coordinator, and staff from the agencies that provide your services. Each person served by DDS has an annual ISP meeting where the team reviews and updates the plan for the year ahead. You do not have to wait for the annual meeting if your needs change. You or your guardian can ask your service coordinator to schedule a meeting sooner to update the plan. The ISP should reflect your own vision and goals, not just a list of services, and it should be reviewed against those goals regularly, not only once a year.`,
},
{
  id: 'ma-appeals',
  title: 'Massachusetts: how to appeal if services are denied or cut',
  citation: 'MassHealth Fair Hearing Rules, 130 CMR 610.000; Office of Medicaid Board of Hearings',
  text: `If MassHealth denies, reduces, or ends your services, you have the right to request a fair hearing. These hearings are held by the Office of Medicaid Board of Hearings, which is part of the state Medicaid agency. Because deadlines can be as short as 10 to 14 days for some notices, or up to 60 days for others, you must check the notice you received for your specific deadline, since it is printed right on the notice. If you want your current services to keep going while your appeal is decided, this is sometimes called aid pending, and you generally need to ask for it within 10 days of your notice. If you lose your appeal after receiving aid pending, you may be asked to pay back the cost of services you received during that time, so read the notice or ask for help before deciding. The Board of Hearings is supposed to issue a decision within 90 days of your hearing date.`,
},
{
  id: 'ma-complaints-pna',
  title: 'Massachusetts: reporting problems and free advocacy help',
  citation: 'Disabled Persons Protection Commission (DPPC) Hotline 1-800-426-9009; Disability Law Center 1-800-872-9992',
  text: `If you or someone you know is being abused or neglected by a caregiver, call the Disabled Persons Protection Commission hotline at 1-800-426-9009. It is open 24 hours a day, and TTY callers can use 1-888-822-0350, or Deaf and Hard of Hearing callers can use MassRelay at 711. DPPC investigates abuse and neglect of adults with disabilities between ages 18 and 59. If it is an emergency, call 911 first. For free legal help protecting your rights, contact the Disability Law Center, toll-free at 1-800-872-9992, or 617-723-8455. They are the official protection and advocacy organization for people with disabilities in Massachusetts, their intake line is open Monday, Tuesday, Thursday, and Friday from 9 a.m. to 5 p.m., and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
  ], serviceCodes: [] },
  MI: { name: "Michigan", chunks: [
{
  id: 'mi-agency-waivers',
  title: 'Michigan: who runs HCBS and the main waiver programs',
  citation: 'Michigan Dept. of Health and Human Services (MDHHS), Habilitation Supports Waiver',
  text: `In Michigan, the state Medicaid agency is the Michigan Department of Health and Human Services (MDHHS). The main Medicaid waiver for people with intellectual or developmental disabilities is the Habilitation Supports Waiver (HSW). It adds extra home and community services on top of regular Medicaid for people of any age who would otherwise qualify for care in an institution. The HSW is run locally by regional groups called Prepaid Inpatient Health Plans (PIHPs), which work through your county Community Mental Health Services Program (CMHSP) and its providers. That means your local CMH office is usually your front door for services. Michigan also has the Children's Waiver Program (CWP) for kids under 18 and a waiver for children with serious emotional disturbance (SEDW). To get started, reach out to the community mental health program that serves your county.`,
},
{
  id: 'mi-rights',
  title: 'Michigan: your rights are written into state law',
  citation: 'Michigan Mental Health Code, Chapter 7, MCL 330.1700 et seq.',
  text: `Michigan has a law that spells out your rights when you receive public mental health or developmental disability services. It is Chapter 7 of the Michigan Mental Health Code, called the Rights of Recipients, starting at MCL 330.1700. The law defines and protects things like person-centered planning, limits on restraint and seclusion, and protection from criminal abuse. Every CMHSP has an Office of Recipient Rights whose whole job is to protect these rights and help you use them. MDHHS also publishes a free plain-language handbook, Your Rights When Receiving Mental Health Services in Michigan, in English, Spanish, and Arabic. You can ask for a copy anywhere you receive services.`,
},
{
  id: 'mi-service-plan',
  title: 'Michigan: your service plan (IPOS) belongs to you',
  citation: 'MCL 330.1712 (individual plan of services)',
  text: `In Michigan, your written plan is called the individual plan of services, often shortened to IPOS. State law says it must be developed in partnership with you, using a process called person-centered planning. That means the plan builds on your strengths and goals, not just what is convenient for the system. A first plan must be started within 7 days of when services begin. The plan can cover things like housing, health care, work, school, transportation, and fun, based on what you want and need. The plan must name the person in charge of making it happen. If you are not happy with your plan, you have the right to ask for a review, and the law says that request should be handled within 30 days. You can ask for a planning meeting any time things change.`,
},
{
  id: 'mi-appeals',
  title: 'Michigan: how to appeal if services are denied or cut',
  citation: 'MDHHS PIHP Appeal and Grievance Technical Requirement; Michigan Office of Administrative Hearings and Rules (MOAHR)',
  text: `If your CMHSP or PIHP denies, reduces, or ends a Medicaid service, they must send you a written notice first. You then have 60 calendar days from the date on that notice to ask them for an internal appeal. If you want your services to keep going while you appeal, ask within 10 calendar days of the notice, or before the change takes effect. If the internal appeal does not go your way, you can ask for a State Fair Hearing, which is an independent review by a judge at the Michigan Office of Administrative Hearings and Rules (MOAHR). You have up to 120 calendar days from the appeal decision letter to request that hearing, but always check the exact deadline printed on your notice. MOAHR has a free phone line for Medicaid beneficiaries at 1-800-648-3397. Appealing is your right, and asking for help with it is normal.`,
},
{
  id: 'mi-complaints-pna',
  title: 'Michigan: reporting problems and free advocacy help',
  citation: 'MCL 330.1755 (office of recipient rights); MDHHS Adult Protective Services; Disability Rights Michigan',
  text: `If you feel your rights were violated where you get services, you can file a Recipient Rights complaint. State law says every community mental health program and licensed hospital must have its own Office of Recipient Rights, and complaint forms are available wherever you receive services or on the MDHHS recipient rights website. If you or someone you know is being abused, neglected, or financially exploited, call Michigan's Adult Protective Services hotline at 855-444-3911. It is free, open 24 hours a day, and workers start looking into reports within 24 hours. For free legal-style advocacy, contact Disability Rights Michigan, the state's federally mandated protection and advocacy organization. You can reach them at 1-800-288-5923, or 517-487-1755, or through drmich.org. You never have to face a rights problem alone.`,
},
  ], serviceCodes: [] },
  MO: { name: "Missouri", chunks: [
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
  ], serviceCodes: [] },
  MS: { name: "Mississippi", chunks: [
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
  ], serviceCodes: [] },
  MT: { name: "Montana", chunks: [
{
  id: 'mt-agency-waivers',
  title: 'Montana: who runs HCBS and the main waiver program',
  citation: 'Montana Department of Public Health and Human Services (DPHHS), Developmental Disabilities Program (DDP); 0208 Comprehensive Waiver, a 1915(c) waiver',
  text: `In Montana, the Department of Public Health and Human Services, or DPHHS, runs Medicaid waiver services for people with intellectual and developmental disabilities through its Developmental Disabilities Program, called the DDP. Montana currently runs one HCBS waiver for this group, called the 0208 Comprehensive Waiver. It is a federal 1915(c) waiver, and it pays for supports like residential help, day services, and other help so you can live in your own home or community instead of an institution. To qualify, you generally need a documented intellectual disability, cerebral palsy, epilepsy, autism, or a similar neurological condition that started before age 18 and is expected to last indefinitely. Because there are limited waiver slots and funding, Montana keeps a waiting list, so ask your regional DDP office to get your name on it as soon as you think you may need services. DDP has regional offices in Glasgow, Great Falls, Billings, Helena, and Missoula, plus smaller satellite offices.`,
},
{
  id: 'mt-service-plan',
  title: 'Montana: your service plan (the Personal Support Plan)',
  citation: 'DPHHS Developmental Disabilities Program, Personal Support Plan (PSP) Manual and Procedure Manual',
  text: `In Montana, your main plan is called the Personal Support Plan, or PSP. It is a person-centered plan that describes your goals and the services and supports your team agrees you need to live a good life in your community. Anyone getting Targeted Case Management or 0208 Comprehensive Waiver services must have an active PSP. Your Targeted Case Manager, sometimes called a TCM, schedules and leads your planning meeting along with you, your legal representative if you have one, your providers, and anyone else you choose to include. The PSP is reviewed and updated at least once a year at your annual PSP meeting, and your team also holds a Mid-Year Review Meeting partway through the year to check how things are going. If your team agrees to changes to your PSP, those changes are supposed to be put into action within 21 days of the meeting.`,
},
{
  id: 'mt-appeals',
  title: 'Montana: how to appeal if services are denied or cut',
  citation: 'DPHHS Office of Administrative Hearings; Combined Medicaid Manual 1505-1 (Fair Hearings, Administrative Reviews, and Appeals)',
  text: `If Montana Medicaid denies, reduces, or ends your services, you have the right to ask for an Administrative Hearing, sometimes called a fair hearing. In general, your written request must be received within 90 days from the date on the notice DPHHS mailed you. The notice you receive should include an Administrative Hearing request form and instructions for how to send it in. If you want your services to keep going the same way while your appeal is decided, you usually need to ask for the hearing quickly, often before the date your services are set to change, so check your notice closely for the exact deadline for keeping your services in place. You can have someone help you at the hearing, such as a family member, friend, or lawyer. If you are not sure about a deadline or what counts as timely, always check the specific notice you received, since it has your case's exact dates.`,
},
{
  id: 'mt-complaints-pna',
  title: 'Montana: reporting problems and free advocacy help',
  citation: 'Montana Adult Protective Services 1-844-277-9300; Disability Rights Montana 1-800-245-4743',
  text: `If you or someone you know is being abused, neglected, or exploited, call Montana Adult Protective Services at 1-844-277-9300. This line is answered Monday through Friday, 8 a.m. to 5 p.m., except holidays, and you can also file a report online. If it is an emergency or someone is in immediate danger, call 911 first. For free help understanding or defending your rights, contact Disability Rights Montana, the state's protection and advocacy organization, at 1-800-245-4743 toll-free, or 406-449-2344. Disability Rights Montana is part of the federally funded protection and advocacy system and helps Montanans with disabilities with legal problems related to their rights. You will not get in trouble for reporting a problem or asking for help.`,
},
  ], serviceCodes: [] },
  NC: { name: "North Carolina", chunks: [
{
  id: 'nc-agency-waivers',
  title: 'North Carolina: who runs HCBS and the main waiver programs',
  citation: 'NC Medicaid (NCDHHS), NC Innovations Waiver, medicaid.ncdhhs.gov',
  text: `In North Carolina, Medicaid is run by NC Medicaid, part of the NC Department of Health and Human Services (NCDHHS). The main home and community-based waiver for people with intellectual or developmental disabilities is called the NC Innovations Waiver. It pays for things like help with daily living, changes to your home or vehicle, assistive technology, job supports, and support for caregivers. Day to day, the waiver is managed by regional health plans called Tailored Plans, run by LME/MCOs: Alliance Health, Partners Health Management, Trillium Health Resources, and Vaya Health. If you are on the waiver, you get a care manager who helps you find services and answers your questions. There is a waiting list for the waiver, called the Registry of Unmet Needs, so it is smart to sign up as early as you can. To find your LME/MCO, call 1-855-262-1946. For free help with Medicaid problems, the NC Medicaid Ombudsman is at 1-877-201-3750.`,
},
{
  id: 'nc-rights',
  title: 'North Carolina: your rights under state law',
  citation: "N.C. Gen. Stat. Chapter 122C, Article 3 (Clients' Rights), ncleg.gov",
  text: `North Carolina law spells out your rights when you get services for a developmental disability, mental health, or substance use. The law is Chapter 122C, Article 3 of the North Carolina General Statutes, often called the Clients' Rights law. It says the state must protect your basic human rights, including dignity, privacy, humane care, and freedom from abuse, neglect, and exploitation (Section 122C-51). Your personal information must be kept private (Section 122C-52). You have the right to an individual written treatment plan and to say no to treatment in most cases (Section 122C-57). If you live in a 24-hour facility, you also have rights to visitors, phone calls, mail, your own belongings, and time outdoors. Staff who see abuse are required by law to report it.`,
},
{
  id: 'nc-service-plan',
  title: 'North Carolina: your Individual Support Plan (ISP)',
  citation: 'NC Innovations Waiver, Individual Support Plan (ISP), medicaid.ncdhhs.gov',
  text: `On the NC Innovations Waiver, your plan is called an Individual Support Plan, or ISP. It is a written plan that lists the services you get, who provides them, and the goals that matter to you. You build it with your care manager and your planning team, and you and your family should have a real voice in it. Your care manager also completes a reassessment every year, so your plan is reviewed and updated at least once a year. If your life changes before then, like a new health need or a move, you can ask your care manager to update the plan sooner. Keep a copy of your ISP so you can check that the services you were promised are the services you get.`,
},
{
  id: 'nc-appeals',
  title: 'North Carolina: appealing a service denial or cut',
  citation: 'NC Office of Administrative Hearings, Medicaid recipient appeals, oah.nc.gov; Disability Rights NC appeals guide',
  text: `If your health plan denies, reduces, or stops a Medicaid service, it must send you a written notice. You have the right to appeal. First, you appeal to your Tailored Plan or LME/MCO. Your notice tells you exactly how and by when, so read it right away and check the deadline on your notice. If the plan still says no, it sends you a Notice of Resolution, and you then have 120 days from that notice to ask for a State Fair Hearing at the NC Office of Administrative Hearings (phone 984-236-1850). You may also be offered free mediation, which is a chance to talk it out before a hearing. You can ask for your services to keep going while you appeal, but only if you act fast. Disability Rights NC says filing within 10 days of the notice keeps services from stopping, so appeal quickly and check your notice for the exact rule. You do not need a lawyer to appeal, and many people represent themselves.`,
},
{
  id: 'nc-complaints-pna',
  title: 'North Carolina: reporting problems and free advocacy help',
  citation: 'NCDHHS Adult Protective Services; DHSR Complaint Intake Unit; Disability Rights North Carolina',
  text: `If you think someone with a disability is being abused, neglected, or exploited, call Adult Protective Services at your county Department of Social Services. Every county has one, and they must look into reports and act to keep people safe. If the problem is with a licensed facility or agency, like a group home, adult care home, or home care agency, you can also call the state's facility complaint line at the Division of Health Service Regulation: 1-800-624-3004 (in NC) or 919-855-4500. Your name is kept private from the facility, and inspections are unannounced. If it is an emergency, call 911 first. For free legal help with your rights, contact Disability Rights North Carolina, the state's protection and advocacy organization. Call them toll free at 1-877-235-4210, or 919-856-2195. Their help is free, and they exist to stand up for people with disabilities.`,
},
  ], serviceCodes: [] },
  ND: { name: "North Dakota", chunks: [
{
  id: 'nd-agency-waivers',
  title: 'North Dakota: who runs HCBS and the main waiver program',
  citation: 'ND Health and Human Services (HHS), Developmental Disabilities Division; Traditional IID/DD 1915(c) HCBS Waiver',
  text: `In North Dakota, the Department of Health and Human Services runs Medicaid waiver services for people with intellectual and developmental disabilities. The main program is called the Traditional Individuals with Intellectual Disabilities and Developmental Disabilities Home and Community-Based Services Waiver, often shortened to the IID/DD waiver. It pays for supports that help you live in your own home or in the community instead of an institution. HHS also runs a separate Medicaid 1915(i) state plan option for some community-based services. Your local contact is usually a Developmental Disabilities regional office, and a state staff member called a Program Manager works with you directly. Ask your regional office how to apply and whether a waiting list applies to you.`,
},
{
  id: 'nd-rights',
  title: 'North Dakota: your legal rights as a person with a developmental disability',
  citation: 'North Dakota Century Code Chapter 25-01.2 (Developmental Disability)',
  text: `North Dakota has a state law just about your rights if you have a developmental disability. It is Chapter 25-01.2 of the North Dakota Century Code. The law says you have the right to appropriate treatment and habilitation in the least restrictive setting that fits your needs. You have the right to communicate with others without unfair interference or censorship. The law also limits when seclusion or physical restraint can be used on you, and bans practices like psychosurgery, sterilization, and shock treatment as punishment. Any agency that serves you must tell you about these rights. If your rights under this law are violated, you can take civil action in court, and if you win, the court can order the other side to pay your attorney fees.`,
},
{
  id: 'nd-service-plan',
  title: 'North Dakota: your service plan',
  citation: 'ND HHS Case Management policy 525-05-30-05; person-centered planning practice',
  text: `In North Dakota, your services are guided by a person-centered plan, sometimes called your service plan or plan of care. A case manager, often a state staff member called a Program Manager, works with you to build this plan around your goals, needs, and preferences. The plan lists which waiver services you get, how often, and who provides them. It also lists other supports in your life, like family help, that are not paid for by the waiver. Your plan is reviewed and updated at least once a year, and sooner if your needs or circumstances change. Speak up during planning meetings about what matters most to you and your life.`,
},
{
  id: 'nd-appeals',
  title: 'North Dakota: how to appeal if services are denied or cut',
  citation: 'ND HHS Client Rights and Appeals; Appeals Supervisor, Legal Division, HHS; Form SFN 162',
  text: `If North Dakota HHS denies, reduces, or ends your Medicaid or waiver services, you have the right to ask for a hearing. Appeals are handled by the Appeals Supervisor in the HHS Legal Division. You typically ask for a hearing by filling out Form SFN 162, Request for Hearing, and sending it in by mail or email. Always check the notice you received for your exact deadline to appeal, since we could not confirm one single deadline that applies in every case. The notice should also tell you whether your services can keep going unchanged while your appeal is pending, sometimes called aid paid pending, so read it carefully or call HHS to ask. You can reach the Legal Division Appeals Supervisor at 701-328-2311 or toll-free 800-472-2622.`,
},
{
  id: 'nd-complaints-pna',
  title: 'North Dakota: reporting problems and free advocacy help',
  citation: 'ND Vulnerable Adult Protective Services Central Intake 1-855-462-5465 option 2; North Dakota Protection and Advocacy Project (Disability Rights ND) 701-328-2950',
  text: `If you or someone you know is being abused, neglected, or financially exploited, and it is not an emergency, call Vulnerable Adult Protective Services at 1-855-462-5465 and press option 2. You can leave a message if staff are not available, and someone will call you back. If someone is in immediate danger, call 911 or local law enforcement first. For free legal help with your disability rights, contact the North Dakota Protection and Advocacy Project, also known as Disability Rights North Dakota, at 701-328-2950 or toll-free at 1-800-472-2670. They are the official protection and advocacy organization for people with disabilities in North Dakota, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
  ], serviceCodes: [] },
  NE: { name: "Nebraska", chunks: [
{
  id: 'ne-agency-waivers',
  title: 'Nebraska: who runs HCBS and the main waiver programs',
  citation: 'Nebraska Department of Health and Human Services (DHHS), Division of Developmental Disabilities (DDD); Comprehensive DD, Family Support, and DD Adult Day 1915(c) waivers',
  text: `In Nebraska, the Department of Health and Human Services, through its Division of Developmental Disabilities, runs Medicaid waiver services for people with intellectual and developmental disabilities. There are three main waivers. The Comprehensive Developmental Disabilities Waiver serves people of all ages who need the level of care provided in an intermediate care facility. The Family Support Waiver serves people under 21 who live with their family. The Developmental Disabilities Adult Day Waiver focuses on daytime community activities and job skills for adults 21 and older. As of August 2025, Nebraska eliminated its waiting list for these DD waivers, so if you were told in the past that you had to wait, it is worth checking again with DHHS to see if you can now enroll. A Service Coordinator, sometimes through a local agency, helps you apply and access services.`,
},
{
  id: 'ne-service-plan',
  title: 'Nebraska: your person-centered plan',
  citation: 'Nebraska DHHS Division of Developmental Disabilities, person-centered planning and Service Coordinator process',
  text: `In Nebraska, your DD waiver services are organized in a person-centered plan, sometimes called an Individual Program Plan, Individual Family Support Plan, or Annual Supports Plan depending on your situation. A Service Coordinator works with you, your family, and your providers to build this plan around your own goals, not just around available services. Your Service Coordinator is required to meet with you at least every six months to talk about how the plan is going, and checks in on how it is being carried out on a monthly basis. Your level of care is also reassessed once a year to confirm you still qualify for waiver services. If your needs change before your next scheduled review, you can ask your Service Coordinator to update your plan sooner.`,
},
{
  id: 'ne-appeals',
  title: 'Nebraska: how to appeal if Medicaid services are denied or cut',
  citation: 'Nebraska DHHS Hearing Office, fair hearing and appeal process; 482 Neb. Admin. Code ch. 7, section 004',
  text: `If Nebraska denies, reduces, or ends your Medicaid or DD waiver services, you have the right to ask for a fair hearing. In general, you have 90 days from the date on your notice of decision to request a hearing, or 120 days if the decision came from a managed care health plan. You can appeal with a simple letter to the DHHS Hearing Office, and a hearing officer will review your case before the division director makes the final decision. If you are already receiving a service and the notice says it will be cut or stopped, ask for your appeal quickly, since keeping that service unchanged while you wait usually requires you to file within about 10 calendar days of the notice. Always read your own notice carefully, since it lists your exact deadlines and how to respond.`,
},
{
  id: 'ne-complaints-pna',
  title: 'Nebraska: reporting abuse and free advocacy help',
  citation: 'Nebraska Adult Abuse Hotline 1-800-652-1999; Disability Rights Nebraska 1-800-422-6691',
  text: `If you or someone you know is being abused, neglected, or exploited, call the Nebraska Abuse Hotline at 1-800-652-1999. It is run by the Department of Health and Human Services and is staffed 24 hours a day, every day, for both adult and child reports. If someone is in immediate danger, call 911 first. For free legal help protecting your rights, contact Disability Rights Nebraska at 1-800-422-6691, or 402-413-2016 locally. They are the official protection and advocacy organization for people with disabilities in Nebraska and their help is free. You will not get in trouble for reporting a problem or for asking for help.`,
},
  ], serviceCodes: [] },
  NH: { name: "New Hampshire", chunks: [
{
  id: 'nh-agency-waivers',
  title: 'New Hampshire: who runs HCBS and the main waiver program',
  citation: 'NH Department of Health and Human Services (DHHS), Bureau of Developmental Services (BDS); NH Developmental Disabilities (DD) Waiver, run through regional Area Agencies',
  text: `In New Hampshire, the Department of Health and Human Services, through its Bureau of Developmental Services, runs the Medicaid waiver for people with intellectual and developmental disabilities. It is called the NH Developmental Disabilities Waiver, a 1915(c) Medicaid waiver, and it pays for supports like residential services, day services, and supported employment so you can live in your own home or community instead of an institution. New Hampshire also runs a separate Acquired Brain Disorder Waiver and an In-Home Support waiver for children with developmental disabilities. You do not sign up directly with the state. Instead, your local Area Agency, a regional nonprofit designated by DHHS, is your front door for applying, getting a service coordinator, and starting services.`,
},
{
  id: 'nh-rights',
  title: 'New Hampshire: your legal rights as a person with a developmental disability',
  citation: 'New Hampshire RSA 171-A, Section 171-A:29 (Rights Guaranteed)',
  text: `New Hampshire has a law, RSA 171-A, that guarantees rights to people with developmental disabilities, and Section 171-A:29 lists them out. No one can call you legally incompetent to manage your own affairs, sign contracts, hold a license, vote, marry, or make a will just because you have a developmental disability or receive services. Your right to individual dignity must be respected at all times. If you live in a residential service, you have the right to send and receive mail with free postage, have visitors at reasonable times, wear your own clothes, keep and use your own belongings and money, and make private phone calls. Each Area Agency also has a Human Rights Committee, mostly made up of people who are not state employees, that oversees these protections. If any of your rights are restricted, you can appeal that restriction to the DHHS Commissioner.`,
},
{
  id: 'nh-service-plan',
  title: 'New Hampshire: your service plan (the Individual Service Plan)',
  citation: 'NH Admin Rules He-M 500 (Developmental Services); person-centered service planning requirements',
  text: `In New Hampshire, your plan is built through what the state calls person-centered service planning, and the result is written into a Service Agreement. You choose a service coordinator, who can work for your Area Agency or an outside agency, and that person organizes and documents the planning process with you and the people you choose to include. The plan is based on your own goals, needs, and preferences, not a one-size-fits-all template. Before your annual planning meeting, your service coordinator is required to update any evaluations or assessments you need, no less than 45 days ahead of time, and check in on things like your progress toward goals and your interest in employment. This means your Service Agreement is fully reviewed and renewed at least once a year, though you can ask for changes any time your needs change.`,
},
{
  id: 'nh-appeals',
  title: 'New Hampshire: how to appeal if services are denied or cut',
  citation: 'NH DHHS Administrative Appeals Unit fair hearing process',
  text: `If New Hampshire denies, reduces, or ends your Medicaid or home and community based services, you have the right to a fair hearing. You generally have 30 days from the date of the action to request one, and the hearing is handled by the DHHS Administrative Appeals Unit in front of an impartial hearing officer who was not involved in the original decision. If you ask for a hearing before the change takes effect, DHHS generally cannot reduce or stop your services until a decision is made, though if you lose the appeal you may have to pay back the cost of services you kept receiving. If DHHS did not give you the required 10 days advance notice, you can still get your services reinstated if you request a hearing within 10 days of the notice. The whole process is supposed to be finished within 90 days of your request. You can reach the Administrative Appeals Unit at 603-271-4292, or toll free at 1-800-852-3345 extension 14292.`,
},
{
  id: 'nh-complaints-pna',
  title: 'New Hampshire: reporting problems and free advocacy help',
  citation: 'NH DHHS Bureau of Adult and Aging Care Services (Adult Protection) 603-271-7014 or 1-800-949-0470; Disability Rights Center - NH 1-800-834-1721',
  text: `If you or someone you know, age 18 or older, is being abused, neglected, exploited, or unable to care for themselves, you can report it to New Hampshire's Bureau of Adult and Aging Care Services. Call 603-271-7014, or toll free within New Hampshire at 1-800-949-0470, Monday through Friday from 8am to 4:30pm. Outside those hours, on weekends, or on holidays, call your local police department or county sheriff instead. You do not need proof to make a report, and reports are confidential and can be anonymous. If it is an emergency, call 911 first. For free legal help protecting your rights, contact the Disability Rights Center - NH, the state's official protection and advocacy organization, at 1-800-834-1721, or their Concord office at 603-228-0432.`,
},
  ], serviceCodes: [] },
  NJ: { name: "New Jersey", chunks: [
{
  id: 'nj-agency-waivers',
  title: 'New Jersey: who runs HCBS and the main waiver programs',
  citation: 'NJ Division of Developmental Disabilities (DDD), NJ FamilyCare 1115 Comprehensive Demonstration (Supports Program and Community Care Program)',
  text: `In New Jersey, home and community based services for adults with intellectual and developmental disabilities are run by the Division of Developmental Disabilities, called DDD for short. DDD is part of the state Department of Human Services. DDD runs two main programs: the Supports Program and the Community Care Program. Both operate under New Jersey's big Medicaid demonstration, called the NJ FamilyCare 1115 Comprehensive Demonstration, which is approved by the federal government. To stay enrolled, you need to keep your Medicaid (NJ FamilyCare) eligibility. Services are matched to your assessed needs and written into your Individualized Service Plan, and you can pick any willing provider who meets the state's qualifications. Children's services in New Jersey are generally handled by a separate children's system, so contact DDD to confirm where a child's services belong.`,
},
{
  id: 'nj-rights',
  title: 'New Jersey: your legal rights as a person with a developmental disability',
  citation: 'N.J.S.A. 30:6D-1 et seq. (Rights of the Developmentally Disabled)',
  text: `New Jersey has a state law just for the rights of people with developmental disabilities. It is called the Rights of the Developmentally Disabled law, found at N.J.S.A. 30:6D-1 and the sections that follow. The state's own guidance quotes it simply: people with developmental disabilities are entitled to exercise the same human and civil rights enjoyed by other citizens. Those rights cannot be limited or taken away unless your disability truly limits how you can use them. Staff who serve you are expected to help protect these rights, not restrict them. This law also requires that your services follow a written, individualized plan. If you live in a licensed group home or program, a Human Rights Committee must review any restriction placed on you.`,
},
{
  id: 'nj-service-plan',
  title: 'New Jersey: your Individualized Service Plan (ISP)',
  citation: 'NJ DDD ISP Plan Reviews Guidance (Feb 2026); DDD Participant Enrollment Agreement',
  text: `In New Jersey, your plan is called the Individualized Service Plan, or ISP. There is also a Person-Centered Planning Tool, a companion document that captures who you are and what matters to you. A support coordinator from a Support Coordination Agency works with you to build the plan. Your planning team should gather what you want and need, plus input from people who know you well, like family, friends, and providers. The plan is supposed to focus on you, respect your rights, and encourage independence. DDD calls the ISP a living document: it should be reviewed regularly and updated whenever your life changes, not just at the required annual review. Your support coordinator also keeps in touch through monthly, quarterly, and annual contacts and visits to make sure services are working.`,
},
{
  id: 'nj-appeals',
  title: 'New Jersey: how to appeal if services are denied or cut',
  citation: 'N.J.A.C. 10:48-6.2 (DDD appeals and fair hearings); N.J.A.C. 10:48-1.6',
  text: `If DDD denies, reduces, suspends, or ends a Medicaid waiver service, you have the right to a fair hearing. You must ask in writing within 20 days from the date on the notice, so act quickly and check the notice you received for exact instructions. Send your written appeal to the Administrative Practice Office, Division of Developmental Disabilities, P.O. Box 726, Trenton, NJ 08625-0726. Your request is forwarded to the state Medicaid agency (the Division of Medical Assistance and Health Services), and an independent judge at the Office of Administrative Law hears your case. DDD may also offer an informal dispute resolution meeting first, but you do not have to accept it to get your hearing. New Jersey's rules do not clearly promise that services automatically continue while you appeal, so ask about keeping services in place when you file and read your notice carefully. You can bring a lawyer or advocate with you.`,
},
{
  id: 'nj-complaints-pna',
  title: 'New Jersey: reporting problems and free advocacy help',
  citation: 'NJ DDD abuse hotline (nj.gov Report Suspected Abuse); Disability Rights New Jersey (the state Protection and Advocacy system)',
  text: `If you believe a person with an intellectual or developmental disability is being abused, neglected, or exploited in New Jersey, call the state hotline at 1-800-832-9173 and press 1. It is answered 24 hours a day, 7 days a week. If someone is in immediate danger, call 911 first. For vulnerable adults living in the community, you can also contact your county Adult Protective Services office. For free legal help with rights problems, contact Disability Rights New Jersey, the state's official protection and advocacy organization. You can reach them at 800-922-7233 (toll free) or 609-292-9742. They advocate for people with disabilities and can help when your rights are violated or your services are unfairly cut.`,
},
  ], serviceCodes: [] },
  NM: { name: "New Mexico", chunks: [
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
  ], serviceCodes: [] },
  NV: { name: "Nevada", chunks: [
{
  id: 'nv-agency-waivers',
  title: 'Nevada: who runs HCBS and the main waiver program',
  citation: 'Nevada Aging and Disability Services Division (ADSD) and Division of Health Care Financing and Policy (DHCFP); HCBS Waiver for Individuals with Intellectual Disabilities and Related Conditions, a 1915(c) waiver',
  text: `In Nevada, two state agencies share responsibility for your HCBS waiver. The Division of Health Care Financing and Policy, called DHCFP, is the state Medicaid agency. The Aging and Disability Services Division, called ADSD, runs the day-to-day developmental services program. Together they operate the Home and Community-Based Waiver for Individuals with Intellectual Disabilities and Related Conditions. This waiver helps pay for supports like service coordination, habilitation, and other community-based services, so you can live in your own home or community instead of an institution. To apply or ask questions, you can contact ADSD directly, and a Service Coordinator will be assigned to help guide you through the process.`,
},
{
  id: 'nv-rights',
  title: 'Nevada: your legal rights as a person with an intellectual or developmental disability',
  citation: 'Nevada Revised Statutes Chapter 435 (Persons with Intellectual Disabilities and Developmental Disabilities), including NRS 435.550, 435.555, 435.560, 435.565, and 435.570',
  text: `Nevada has a state law just about your rights as a person with an intellectual or developmental disability. It is Nevada Revised Statutes Chapter 435. This chapter includes specific sections on your rights, covering things like the right to habeas corpus, meaning the right to challenge being held somewhere against your will, your rights around being admitted to or discharged from a facility, your rights if you are involuntarily committed, your personal rights, and your rights around the care, treatment, and training you receive. The law is clear that nothing in this chapter takes away any of your legal rights without due process, meaning a fair legal process. If you believe your rights under this chapter were violated, you can raise this with Nevada's Protection and Advocacy organization.`,
},
{
  id: 'nv-service-plan',
  title: 'Nevada: your service plan and Service Coordinator',
  citation: 'Nevada ADSD Service Coordination program',
  text: `In Nevada, once you are found eligible for developmental services, you are assigned a Service Coordinator who works with you through a person-centered planning process. Your Service Coordinator helps develop, coordinate, and monitor your individual support plan, which lays out your specific goals and the supports you need to reach them, provided in the least restrictive setting that works for you. Your Service Coordinator also handles ongoing monitoring, assessment, and connecting you to the services in your plan. If you have questions about how often your plan gets reviewed or updated, ask your Service Coordinator directly, since Nevada's public materials describe the planning process itself but do not spell out one single review schedule that fits every situation.`,
},
{
  id: 'nv-appeals',
  title: 'Nevada: how to appeal if Medicaid services are denied or cut',
  citation: 'Nevada DHCFP Fair Hearings process',
  text: `If Nevada denies, reduces, or ends your Medicaid services, you have the right to request a Fair Hearing through DHCFP. Your request must be received by the DHCFP Hearings Office within 90 calendar days from the date on your adverse determination notice. If that 90th day falls on a weekend or holiday, your deadline moves to the next business day. If your appeal is about services you were already receiving that were reduced or ended, you can generally keep getting those services without any change while your Fair Hearing is pending. Just know that if the hearing decision goes against you, you may be asked to pay back the cost of services you kept receiving during the appeal. Always check your notice for the exact deadline and instructions for your situation.`,
},
{
  id: 'nv-complaints-pna',
  title: 'Nevada: reporting problems and free advocacy help',
  citation: 'Nevada ADSD Adult Protective Services 1-888-729-0571 (statewide), 702-486-6930 (Las Vegas/Clark County); Nevada Disability Advocacy and Law Center 1-888-349-3843 (Las Vegas), 1-800-992-5715 (Reno)',
  text: `If you or someone you know is being abused, neglected, exploited, isolated, or abandoned, you can report it to Nevada Adult Protective Services. Statewide, call 1-888-729-0571. In Las Vegas and Clark County, call 702-486-6930. Nevada's definition of a vulnerable adult includes people with a developmental disability, so this covers reports involving people with intellectual and developmental disabilities. If someone is in immediate danger, call the police, sheriff, or 911 first instead. For free legal help protecting your rights, contact the Nevada Disability Advocacy and Law Center, known as NDALC. Their Las Vegas office is at 702-257-8150 or toll-free 1-888-349-3843, and their Reno office is at 775-333-7878 or toll-free 1-800-992-5715. They are Nevada's official Protection and Advocacy organization for people with disabilities, and their help is free.`,
},
  ], serviceCodes: [] },
  NY: { name: "New York", chunks: [
{
  id: 'ny-agency-waivers',
  title: 'New York: who runs HCBS and the OPWDD waiver',
  citation: 'NYS Office for People With Developmental Disabilities (OPWDD); OPWDD Comprehensive HCBS 1915(c) Waiver',
  text: `In New York, the Office for People With Developmental Disabilities, called OPWDD, runs services for people with developmental disabilities. The main program is the OPWDD Comprehensive Home and Community Based Services Waiver, often just called the HCBS Waiver. It pays for supports like community habilitation, respite, supported employment, and housing supports so you can live in the community. To get started, you go through OPWDD's Front Door process, which checks your eligibility and connects you to services. Most people in the waiver also enroll with a Care Coordination Organization, called a CCO, which gives you a care manager. The New York State Department of Health is the state's Medicaid agency and oversees the waiver together with OPWDD.`,
},
{
  id: 'ny-rights',
  title: 'New York: your legal rights when receiving services',
  citation: 'NY Mental Hygiene Law Article 33 (Rights of Patients), sec. 33.02; 14 NYCRR 633.4',
  text: `New York law protects your rights when you receive services. Article 33 of the Mental Hygiene Law spells out the basic civil rights of people receiving services for mental disabilities, including developmental disabilities. Section 33.02 says you must be told about your rights, including the right to be free from abuse and mistreatment. A state regulation, 14 NYCRR 633.4, lists your rights in OPWDD programs in more detail. It says you have the right to a written, individualized plan of services, the right to privacy and to see your own records, and the right to raise complaints and concerns without punishment. You can take a grievance to the head of your program, to the OPWDD Commissioner, or to the Justice Center. Keeping services can never depend on staying quiet about problems.`,
},
{
  id: 'ny-service-plan',
  title: 'New York: your service plan (the Life Plan)',
  citation: 'OPWDD CCO care management requirements; Life Plan reviewed twice per 12 months',
  text: `In New York, your service plan is called a Life Plan. Your care manager at your Care Coordination Organization (CCO) writes it with you, using person-centered planning. That means the plan starts with your goals and choices, not just what programs exist. The Life Plan covers your developmental disability services and also your health and behavioral health needs, all in one document. Your care manager must meet with you face to face and review the Life Plan with you at least twice every 12 months, and update it when your life or needs change. You can invite family, friends, or anyone you trust to your planning meetings. If something in your plan is not working, tell your care manager and ask for a review. You do not have to wait for the next scheduled meeting.`,
},
{
  id: 'ny-appeals',
  title: 'New York: how to appeal if services are denied or cut',
  citation: 'NYS fair hearing process, Office of Temporary and Disability Assistance (OTDA)',
  text: `If New York denies, reduces, or ends your Medicaid services, you can ask for a fair hearing. Fair hearings are run by the state Office of Temporary and Disability Assistance, called OTDA, and an administrative law judge decides your case. Your notice will tell you your deadline, which is usually 60 days from the date on the notice, but check your notice because some programs allow more time. Here is the key tip: if you ask for the hearing before the date your services are set to change, you can get aid continuing, which means your services stay the same until the judge decides. Ask for aid continuing when you request the hearing. You can request a hearing online, by phone, by fax, or by mail, and you can bring an advocate, family member, or lawyer with you.`,
},
{
  id: 'ny-complaints-pna',
  title: 'New York: reporting problems and free advocacy help',
  citation: 'NYS Justice Center hotline 1-855-373-2122; Disability Rights New York 1-800-993-8982',
  text: `New York has a special state agency just for protecting people with disabilities: the Justice Center for the Protection of People with Special Needs. If you see or suspect abuse or neglect of a person receiving services in a state-certified program, call the Justice Center hotline at 1-855-373-2122. It is open 24 hours a day, every day. If someone is in immediate danger, call 911 first. You can also raise complaints inside your program or with OPWDD without fear of punishment. For free legal and advocacy help, contact Disability Rights New York at 1-800-993-8982. They are the state's official protection and advocacy organization, and they can help with service denials, rights violations, and abuse cases at no cost to you.`,
},
  ], serviceCodes: [] },
  OH: { name: "Ohio", chunks: [
{
  id: 'oh-agency-waivers',
  title: 'Ohio: who runs HCBS and the main waiver programs',
  citation: 'Ohio DODD; Ohio Admin. Code 5123-9-06 and 5123-9-40',
  text: `In Ohio, the Department of Developmental Disabilities (DODD) runs the Medicaid home and community-based waivers for people with developmental disabilities. A waiver is a Medicaid program that pays for support in your own home or community instead of in a facility. Ohio has three main DODD waivers: the Individual Options waiver, the Level One waiver, and the SELF waiver (Self-Empowered Life Funding), which lets you direct more of your own services and budget. Your local county board of developmental disabilities is your front door. The county board does the assessments, helps build your service plan, and handles waiver paperwork, while DODD sets the statewide rules. If you want services or have questions, start with your county board.`,
},
{
  id: 'oh-rights',
  title: 'Ohio: your bill of rights',
  citation: 'Ohio Rev. Code 5123.62',
  text: `Ohio has a bill of rights just for people with developmental disabilities, written into state law at Ohio Revised Code section 5123.62. It says you have the right to be treated with courtesy and respect at all times, and to be recognized as your own person. You have the right to a safe and healthy place to live, timely medical and dental care, and freedom from abuse and unnecessary restraints. You have the right to practice your religion or not, manage your own money as much as you are able, own your things, and make your own life decisions. You can communicate with whoever you want and pick someone you trust to speak up for you. And the law protects your right to complain and ask for changes without anyone punishing you or getting in your way.`,
},
{
  id: 'oh-service-plan',
  title: 'Ohio: your individual service plan (ISP)',
  citation: 'Ohio Admin. Code 5123-4-02',
  text: `In Ohio, your plan is called an individual service plan, or ISP. It is a written description of the services and supports you will get and the life you want. A service and support administrator (often called an SSA) from your county board develops the plan with you, using person-centered planning. Person-centered means you lead the process: the plan is built around your strengths, your preferences, and what matters to you, along with what keeps you healthy and safe. You choose who else joins your planning team. The plan must be reviewed and updated at least once every 12 months, and sooner if your needs change, you pick a new provider, or you ask for changes. If you ask for a change, your SSA is expected to respond within 30 days.`,
},
{
  id: 'oh-appeals',
  title: 'Ohio: how to appeal if services are denied or cut',
  citation: 'Ohio Rev. Code 5101.35; Ohio Admin. Code 5101:6-3-02 and 5101:6-4-01',
  text: `If Ohio Medicaid denies, reduces, or stops your services, you have the right to a state hearing. That is a chance to tell your side to a hearing officer from the Ohio Department of Job and Family Services, which handles these hearings for Medicaid. You have 90 days to ask for a hearing, counted from the day after your notice is mailed. But here is the important part: if you ask within the 15-day notice period, before the change takes effect, your services usually keep going at the same level until the hearing is decided. So act fast if you want to keep your services. Your notice explains exactly how to ask and lists your deadlines, so read it carefully and keep it. If anything is unclear, check the notice you received or call the number on it.`,
},
{
  id: 'oh-complaints-pna',
  title: 'Ohio: reporting problems and free advocacy help',
  citation: 'Ohio DODD abuse and neglect reporting; Disability Rights Ohio',
  text: `If you or someone you know is being abused, neglected, or stolen from, and there is immediate danger, call 911 first. Otherwise, in Ohio you can report to your county board of developmental disabilities, which must look into serious problems (these reports are called major unusual incidents, or MUIs). You can also call the DODD abuse and neglect hotline at 1-800-617-6733 (option 1) or file a report through DODD's online complaint form. You will not get in trouble for reporting; the law protects your right to complain without payback. For free legal help with your rights, contact Disability Rights Ohio, the state's protection and advocacy organization. Their intake line is 1-800-282-9181 or 614-466-7264, weekdays 9 to 12 and 1 to 4. They help people with disabilities across Ohio at no cost.`,
},
  ], serviceCodes: [] },
  OK: { name: "Oklahoma", chunks: [
{
  id: 'ok-agency-waivers',
  title: 'Oklahoma: who runs HCBS and the main waiver programs',
  citation: 'Oklahoma Human Services, Developmental Disabilities Services (DDS), under the Oklahoma Health Care Authority (OHCA); HCBS waivers for intellectual disabilities',
  text: `In Oklahoma, Developmental Disabilities Services (DDS), part of Oklahoma Human Services, runs day-to-day waiver services for people with intellectual disabilities, and the Oklahoma Health Care Authority (OHCA) is the state Medicaid agency that oversees the waivers. The main waiver is called the Community Waiver, and it covers residential, employment, and habilitation supports for people age 3 and up. Oklahoma also has the In-Home Supports Waiver for Adults, the In-Home Supports Waiver for Children, and the Homeward Bound Waiver. These waivers help you get support while living in your own home or a small community setting instead of an institution. Because Oklahoma has waiting lists for some waivers, it helps to apply and get on the DDS waiting list as early as possible. You can reach DDS at 405-521-3571, or toll free at 866-521-3571, for questions about applying.`,
},
{
  id: 'ok-rights',
  title: 'Oklahoma: your rights as a person receiving DDS services',
  citation: 'Oklahoma Administrative Code 340:100-3-1.2 (Rights)',
  text: `Oklahoma has a rule that lists your rights as a person receiving Developmental Disabilities Services. It is Oklahoma Administrative Code section 340:100-3-1.2. Under this rule, you have the right to take part in decisions about where you live, including your home setting, your furnishings, and who you live with. You have the right to be told about and to agree in writing before any money is taken from your personal funds. You have the right to receive positive, respectful approaches in every service you get. You also have the right to due process, meaning a fair process, if you disagree with a decision about your services. If you are a minor or have a legal guardian, your guardian or parent may exercise these rights for you. Your case manager must tell you and your guardian about these rights and write them into your Individual Plan.`,
},
{
  id: 'ok-service-plan',
  title: 'Oklahoma: your service plan and personal support team',
  citation: 'Oklahoma Human Services DDS policy, OAC 340:100, Subchapter 5 (The Personal Support Team)',
  text: `In Oklahoma, your plan is built by a group called your Personal Support Team, and it is written up as your Individual Plan. Your team includes you, your legal guardian or advocate if you have one, and your DDS case manager. Before each meeting, your case manager talks with you and your guardian or advocate about your vision for your life and how things are going. The plan is reviewed at least once a year at your annual Team meeting, using a form called the Annual Review. Between meetings, everyone helping with a part of your plan sends a quarterly update to your case manager so your team can see how things are going. Your case manager is responsible for making sure the plan is put into action and that it still fits your needs.`,
},
{
  id: 'ok-appeals',
  title: 'Oklahoma: how to appeal if Medicaid services are denied or cut',
  citation: 'Oklahoma Administrative Code 317:2-3-5.1 (Continuation of benefits pending appeal); OHCA state fair hearing process',
  text: `If Oklahoma denies, reduces, or ends your Medicaid services, you have the right to ask for a state fair hearing through the Oklahoma Health Care Authority. You generally have 120 days from the date on your notice to request the hearing. If you want your services to keep going while you wait for a decision, timing matters a lot: under state rules, you usually need to ask for the hearing and for continued benefits within 10 days of the notice, or by the date your services are set to change, whichever is later. Because these deadlines are strict and can change, always check the exact dates printed on your denial notice and call the number listed on it right away if you want to keep your services during the appeal. Hearings can be held by phone, video, or in person, and you can bring a family member, advocate, or lawyer to help you.`,
},
{
  id: 'ok-complaints-pna',
  title: 'Oklahoma: reporting problems and free advocacy help',
  citation: 'Oklahoma Abuse and Neglect Hotline 1-800-522-3511; Disability Rights Oklahoma 1-800-880-7755',
  text: `If you or someone you know is being abused, neglected, or exploited, call the Oklahoma Abuse and Neglect Hotline at 1-800-522-3511. It is answered 24 hours a day, every day, and you can also report online. You can make a report anonymously, and you will not get in trouble for reporting in good faith. If it is an emergency, call 911 first. For free legal help protecting your rights, contact Disability Rights Oklahoma at 1-800-880-7755 (voice and TDD). They have offices in Oklahoma City and Tulsa and are the official Protection and Advocacy organization for people with disabilities in Oklahoma. Their help is free.`,
},
  ], serviceCodes: [] },
  OR: { name: "Oregon", chunks: [
{
  id: 'or-agency-waivers',
  title: 'Oregon: who runs HCBS and the main waiver programs',
  citation: 'Oregon Department of Human Services (ODHS), Office of Developmental Disabilities Services (ODDS); Adults I/DD HCBS Waiver, Behavioral Waiver, Medically Fragile and Medically Involved Waivers, plus the K Plan (Community First Choice)',
  text: `In Oregon, the Department of Human Services, through its Office of Developmental Disabilities Services, runs Medicaid home and community-based waivers for people with intellectual and developmental disabilities. Oregon has several waivers rather than just one, including an Adults' waiver, a Behavioral Waiver, and waivers for children and people who are medically fragile or medically involved. On top of these waivers, Oregon also uses something called the K Plan, which is a different kind of Medicaid program authorized under the Affordable Care Act, sometimes called the 1915(k) Community First Choice Option. The K Plan pays for home and community-based attendant services, and you can still get other Medicaid-funded and non-Medicaid-funded supports even while on the K Plan. Your local Community Developmental Disability Program, or CDDP, or a support services brokerage, is usually your local starting point for services.`,
},
{
  id: 'or-rights',
  title: 'Oregon: your rights and your Individual Support Plan process',
  citation: 'Oregon Administrative Rules 411-004-0030 (person-centered planning) and 411-415-0070 (service planning)',
  text: `Oregon's developmental disability rules require that your services be planned using a person-centered process, meaning your plan has to be built around your own life, your independence, and your ability to be included in your community, including opportunities to work in a real job alongside people without disabilities. We looked for a single standalone Oregon statute that works like a specific disability bill of rights, similar to what some other states have, and we could not confirm one from the official sources checked in this pass. Because of that, this chunk describes the person-centered planning protections that are clearly written into Oregon's administrative rules, and the team should research further, including Oregon Revised Statutes Chapter 427, before treating this as a full rights statute chunk.`,
},
{
  id: 'or-service-plan',
  title: 'Oregon: your service plan (the Individual Support Plan)',
  citation: 'Oregon ODHS Individual Support Planning (Compass); Oregon Administrative Rule 411-415-0070',
  text: `In Oregon, your main planning document is called your Individual Support Plan, or ISP. A Personal Agent, sometimes called a case manager or caseworker, works with you to build and update this plan using a person-centered approach that is supposed to reflect how you want to live your life, not just a list of services. If you are not enrolled in waiver or Community First Choice services, you may instead have something called an Annual Plan, which is a different, simpler document. Your ISP is renewed at least once a year, but it is meant to be a living document, so it can and should be updated any time your life or your needs change, not just at your yearly meeting.`,
},
{
  id: 'or-appeals',
  title: 'Oregon: how to appeal if services are denied or cut',
  citation: 'ODHS Administrative Hearings for I/DD Services; Oregon Administrative Hearing Request Form SDS 0443DD',
  text: `If Oregon denies, reduces, or ends your developmental disability services, you have the right to ask for a hearing in front of an Administrative Law Judge. You can request a hearing in writing by mailing or faxing the Administrative Hearing Request form to the Office of Developmental Disability Services, or you can make a verbal request to your local CDDP office, support service brokerage, caseworker, or an ODDS or DHS employee. In most cases you must ask for the hearing within 90 days of the date on your Notification of Planned Action. Here is an important protection: if your services are being ended and you request the hearing within 10 days of getting that notice, your services are supposed to keep going at the same level until the hearing is held and a decision is issued, and you do not need to separately ask for this continuation. Always check your actual notice for the exact deadline that applies to your situation.`,
},
{
  id: 'or-complaints-pna',
  title: 'Oregon: reporting problems and free advocacy help',
  citation: 'Oregon Abuse Reporting Hotline 1-855-503-7233 (855-503-SAFE); Disability Rights Oregon 503-243-2081 or 1-800-452-1694',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, call the Oregon abuse hotline at 1-855-503-7233, also written as 855-503-SAFE. This line covers people 18 and older with physical or developmental disabilities or a mental health condition, and it is open 24 hours a day, every day of the year. You can report anonymously, and state law protects the confidentiality of anyone who reports. If it is an emergency, call 911 first. For free legal help understanding or fighting for your rights, contact Disability Rights Oregon at 503-243-2081 or toll-free at 1-800-452-1694. They are Oregon's official protection and advocacy organization for people with disabilities, and their help is free.`,
},
  ], serviceCodes: [] },
  PA: { name: "Pennsylvania", chunks: [
{
  id: 'pa-agency-waivers',
  title: 'Pennsylvania: who runs HCBS and the main waiver programs',
  citation: 'PA Department of Human Services, Office of Developmental Programs (ODP); Consolidated, Community Living, and P/FDS waivers',
  text: `In Pennsylvania, the Office of Developmental Programs, called ODP, runs the Medicaid waivers for people with intellectual disabilities and autism. ODP is part of the state Department of Human Services. There are three main waivers. The Consolidated Waiver has no yearly dollar cap and can pay for residential services like living in a group home. The Community Living Waiver and the Person/Family Directed Support Waiver, called P/FDS, have yearly spending caps and support people living with family or in their own homes. To apply, you register with your county's ODP office, often called the county MH/IDD program or Administrative Entity. There are waiting lists for these waivers, so register early even if you do not need services right away.`,
},
{
  id: 'pa-rights',
  title: 'Pennsylvania: your rights in ODP services',
  citation: '55 Pa. Code secs. 6100.181-6100.184 (individual rights in ODP HCBS)',
  text: `Pennsylvania spells out your rights in its rules for developmental disability services, in Chapter 6100 of Title 55 of the Pennsylvania Code. These rules say your provider must help you understand your rights and give you what you need to make your own choices. You may not be punished or retaliated against for exercising your rights. You have rights to privacy, to make choices about your daily life, and, if you live in a residential program, extra rights about your home, your belongings, and visitors. Your rights can only be limited by a court order, not by a provider's preference. If a provider violates these rules, you can complain to the provider, to ODP, or get outside help. Pennsylvania also has an older law, the Mental Health and Intellectual Disability Act of 1966, that sets up the service system.`,
},
{
  id: 'pa-service-plan',
  title: 'Pennsylvania: your service plan (the Individual Support Plan)',
  citation: 'ODP Bulletin 00-20-02 (Individual Support Plan); Consolidated, Community Living, and P/FDS waivers',
  text: `In Pennsylvania, your service plan is called an Individual Support Plan, or ISP. Your supports coordinator leads the planning process with you and your team, which can include family, friends, and providers you choose. The ISP describes your goals, the supports you need, and which waiver services will pay for them. It is built through person-centered planning, which means your preferences come first. Your ISP is reviewed and updated at least once a year at your annual review meeting, and your supports coordinator should also update it whenever your needs change. Before services can start or change, the plan is approved by your county Administrative Entity. Read your ISP carefully and speak up if something is missing, because services usually cannot be paid for unless they are in the plan.`,
},
{
  id: 'pa-appeals',
  title: 'Pennsylvania: how to appeal if services are denied or cut',
  citation: 'DHS Bureau of Hearings and Appeals fair hearing process',
  text: `If Pennsylvania denies, reduces, or ends your waiver services, you have the right to a fair hearing before the Department of Human Services Bureau of Hearings and Appeals. Your written notice tells you how to appeal and your deadline, which is generally 30 days from the date on the notice, but always check your notice. Here is the most important tip: if you are already receiving waiver services and you file your appeal within 10 days of the notice, your services keep going unchanged until the hearing decision is made. At the hearing, a judge listens to you and the agency, and you can bring a family member, advocate, or lawyer. If you lose, you can ask for reconsideration within 15 days or appeal to Commonwealth Court within 30 days of the decision.`,
},
{
  id: 'pa-complaints-pna',
  title: 'Pennsylvania: reporting problems and free advocacy help',
  citation: 'PA Adult Protective Services hotline 1-800-490-8505; Disability Rights Pennsylvania 1-800-692-7443',
  text: `If you or someone you know is being abused, neglected, exploited, or abandoned, call Pennsylvania's statewide protective services hotline at 1-800-490-8505. It is open 24 hours a day, every day. Adult Protective Services helps adults with disabilities ages 18 to 59, and the same number reaches Older Adult Protective Services for people 60 and older. You can report no matter where the person lives, whether at home, in a group home, or in a facility, and you can stay anonymous. If someone is in immediate danger, call 911 first. For free legal and advocacy help, contact Disability Rights Pennsylvania at 1-800-692-7443. They are the state's official protection and advocacy organization and can help with service denials, rights violations, and abuse concerns at no cost.`,
},
  ], serviceCodes: [] },
  RI: { name: "Rhode Island", chunks: [
{
  id: 'ri-agency-waivers',
  title: 'Rhode Island: who runs HCBS and the main program',
  citation: 'RI Executive Office of Health and Human Services (EOHHS) and Dept. of Behavioral Healthcare, Developmental Disabilities and Hospitals (BHDDH), Division of Developmental Disabilities; Section 1115 demonstration waiver',
  text: `In Rhode Island, home and community-based services for people with developmental disabilities are overseen by two agencies working together. The Executive Office of Health and Human Services, or EOHHS, runs the state Medicaid program, and the Department of Behavioral Healthcare, Developmental Disabilities and Hospitals, or BHDDH, runs the Division of Developmental Disabilities that plans, funds, and oversees your day-to-day services. Rhode Island is unusual because its whole Medicaid long-term care system, including services for adults with developmental disabilities, runs under one big Section 1115 demonstration waiver rather than a separate 1915(c) waiver like many other states use. Services can include day programs, community supports, supported employment, shared living, homemaker services, and case management. You can get these services through one of 37 community agencies licensed by BHDDH, or you can self-direct your supports and hire your own staff through a fiscal intermediary.`,
},
{
  id: 'ri-rights',
  title: 'Rhode Island: your legal rights as a person with a developmental disability',
  citation: 'Rhode Island General Laws Title 40.1, Chapter 40.1-26 (Rights for Persons with Developmental Disabilities)',
  text: `Rhode Island has a law that spells out your rights if you have a developmental disability. It is Chapter 40.1-26 of the Rhode Island General Laws. Under this law, you have the right to be treated with dignity and respect, to have your privacy protected, and to live and take part in activities in the most integrated community setting that fits your needs. You have the right to help build your own individualized plan and to give informed consent before it is put into action, or to have an advocate help with that consent if you are not able to. The law bans harmful aversive techniques and says restraints cannot be used as punishment, for staff convenience, or in place of a real plan for you. If you believe your rights were violated, you have the right to file a complaint through your provider's grievance procedure.`,
},
{
  id: 'ri-service-plan',
  title: 'Rhode Island: your service plan (the Individual Support Plan)',
  citation: 'BHDDH Division of Developmental Disabilities, Individual Support Plan (ISP) and Person-Centered Plan (PCP) process',
  text: `In Rhode Island, your plan is usually called an Individual Support Plan, or ISP, and it is built using a person-centered planning approach, sometimes shortened to PCP. There is no single required form. Instead, your plan is supposed to be shaped around how you communicate and learn best, so it truly reflects what you want your life to look like. You and your team, which can include family, providers, and a support coordinator, decide together what goals go into your plan. You can ask to update your ISP any time you have a new goal or want to build on an existing one, not just at a scheduled meeting. Because the state does not publish one fixed statewide review calendar in the sources checked, ask your support coordinator or case manager how often your specific plan gets formally reviewed.`,
},
{
  id: 'ri-appeals',
  title: 'Rhode Island: how to appeal if services are denied or cut',
  citation: 'EOHHS Appeals Office; 210-RICR-10-05-2 (Appeals Process and Procedures for EOHHS Agencies and Programs)',
  text: `If Rhode Island Medicaid denies, reduces, or ends your services, you have the right to appeal. In general, you must file your appeal within 35 days of the date on your Benefit Decision Notice, and there is also a Level 2 State Fair Hearing option within 120 days of a written denial in some cases. Always check the specific notice you received, since it lists the exact deadline and reason for the decision that applies to your case. You can often request Aid Pending, meaning your current Medicaid coverage or services can continue while your appeal is being decided, by acting through your online account or by contacting the EOHHS Appeals Office quickly after you get the notice. You can call HealthSource RI at 1-855-840-4774 for help filing, or file online through your healthyrhode.ri.gov account.`,
},
{
  id: 'ri-complaints-pna',
  title: 'Rhode Island: reporting problems and free advocacy help',
  citation: 'BHDDH Quality Assurance abuse hotline 401-462-2629; Disability Rights Rhode Island 1-800-733-5332',
  text: `If you or someone you know with a developmental disability is being abused, neglected, or mistreated, call the BHDDH Quality Assurance hotline at 401-462-2629. This line is open 24 hours a day, every day of the year. If it is an emergency, call 911 first. For free legal help understanding or defending your rights, contact Disability Rights Rhode Island, the state's protection and advocacy organization, toll-free at 1-800-733-5332, or at 401-831-3150. Disability Rights Rhode Island is the federally designated agency that helps Rhode Islanders with disabilities with legal problems tied to their rights, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
  ], serviceCodes: [] },
  SC: { name: "South Carolina", chunks: [
{
  id: 'sc-agency-waivers',
  title: 'South Carolina: who runs HCBS and the main waiver programs',
  citation: 'SC Department of Behavioral Health and Developmental Disabilities, Office of Intellectual and Developmental Disabilities (formerly DDSN); three 1915(c) HCBS waivers',
  text: `In South Carolina, home and community-based waivers for people with intellectual and related disabilities are run by the Office of Intellectual and Developmental Disabilities, known as OIDD. As of April 2025, OIDD became part of a new state agency called the Department of Behavioral Health and Developmental Disabilities, and you may still see the older name, DDSN, on some forms and websites. OIDD runs three Medicaid waivers on behalf of the SC Department of Health and Human Services, the state Medicaid agency. These are the Intellectual Disability and Related Disabilities waiver, called ID/RD, the Community Supports waiver, and the Head and Spinal Cord Injury waiver, called HASCI. The Community Supports waiver has a lower yearly spending cap than the ID/RD waiver, so which one fits you depends on how much support you need. A case manager, sometimes called a service coordinator, is your main point of contact for signing up and using these waivers.`,
},
{
  id: 'sc-rights',
  title: 'South Carolina: your legal rights as a person with an intellectual disability',
  citation: 'South Carolina Code of Laws, Title 44, Chapter 26 (Rights of Clients with Intellectual Disability)',
  text: `South Carolina has a law that lists your rights if you receive services because of an intellectual disability or a related disability. It is Title 44, Chapter 26 of the South Carolina Code of Laws. This law says you keep your rights as a citizen, the same as anyone else, including the right to vote and other legal rights. It protects your right to an appropriate education if you are school age, no matter how significant your disability is. It says the state disability employment services must help you look for work. It also gives you a right to appeal decisions made about your services or treatment. If someone deliberately denies you a right under this law, they can be fined or even face jail time. This chapter applies specifically to people the state has determined have an intellectual disability or a related disability and who receive services through the state system.`,
},
{
  id: 'sc-service-plan',
  title: 'South Carolina: your service plan (the Annual Support Plan)',
  citation: 'SC OIDD (formerly DDSN) Guidelines for Case Management Annual Planning',
  text: `In South Carolina, your main planning document is usually called the Annual Support Plan, sometimes shown as the Individual Support Plan or ISP on older paperwork. Your case manager leads this planning process with you, using an approach called person-centered thinking, which means the plan is supposed to be built around what you want your life to look like, not just what services exist. The plan lists your goals, the supports you need, and which waiver services will help you reach them. It is reviewed at least once a year at your annual planning meeting, and it can also be updated any time your needs or circumstances change during the year. Ask your case manager to walk you through your plan and make sure it reflects your actual goals, not just a standard checklist.`,
},
{
  id: 'sc-appeals',
  title: 'South Carolina: how to appeal if services are denied or cut',
  citation: 'DDSN Directive 535-11-DD, Appeal and Reconsideration of Decisions (revised 2025); SCDHHS Office of Appeals and Hearings',
  text: `If South Carolina denies, reduces, or ends your waiver services, you have two steps you can take. First, you can ask OIDD (formerly DDSN) for a reconsideration of the decision. This request must be in writing within 30 calendar days of when you got the written notice. Second, if you are still not satisfied, or if you want to skip straight to it, you can file an appeal with the SC Department of Health and Health Services, the state Medicaid agency, which holds a fair hearing before a hearing officer. This appeal must also generally be filed within 30 calendar days of the notice. Always check your actual notice for the exact deadline and instructions, since timelines can vary depending on the type of decision. Ask about whether your services can continue unchanged while your appeal is pending, since this is not automatic in every case.`,
},
{
  id: 'sc-complaints-pna',
  title: 'South Carolina: reporting problems and free advocacy help',
  citation: 'SLED Vulnerable Adult Investigations Unit 1-866-200-6066 (DDSN/OIDD residential settings); SC DSS Adult Protective Services 1-888-227-3487 (community settings); Disability Rights South Carolina 1-866-275-7273',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, where you call depends on where the person lives. If the person lives in an OIDD-operated or contracted residential setting, like a group home, report it to the SLED Vulnerable Adult Investigations Unit at 1-866-200-6066. If the person lives in the community, such as their own home or a family home, report it to the Department of Social Services Adult Protective Services at 1-888-227-3487, also written as 1-888-CARE4US. If it is an emergency, call 911 first. For free legal help understanding or fighting for your rights, contact Disability Rights South Carolina at 1-866-275-7273. They are the official protection and advocacy organization for people with disabilities in South Carolina, and their help is free.`,
},
  ], serviceCodes: [] },
  SD: { name: "South Dakota", chunks: [
{
  id: 'sd-agency-waivers',
  title: 'South Dakota: who runs HCBS and the main waiver programs',
  citation: 'South Dakota Department of Human Services (DHS), Division of Developmental Disabilities (DDD); Department of Social Services (DSS) as the Medicaid agency; CHOICES and Family Support 360 (FS360) 1915(c) waivers',
  text: `In South Dakota, the Department of Human Services, through its Division of Developmental Disabilities, runs services for people with intellectual and developmental disabilities. The Department of Social Services is the state Medicaid agency and administers Medicaid rules and payments for the waivers DHS operates. South Dakota runs two main HCBS waivers for this group. CHOICES is the larger, more comprehensive waiver, offering services like residential supports, day services, and supported employment so you can live in the community instead of an institution. Family Support 360, often called FS360, is a self-directed waiver, meaning you or your family can manage and direct more of your own services and supports. Both are federal 1915(c) waivers. Ask your local DDD office or case management agency which waiver best fits your needs.`,
},
{
  id: 'sd-rights',
  title: 'South Dakota: your legal rights as a person with a developmental disability',
  citation: 'South Dakota Codified Laws Chapter 27B-8 (Rights of Persons with Developmental Disabilities)',
  text: `South Dakota has a law that protects your rights while you receive developmental disability services. It is SDCL Chapter 27B-8. This law says that getting services does not take away any of your other rights, benefits, or privileges, and it does not make you legally incompetent. Your rights under this chapter can only be restricted through due process, following the law and the Department of Human Services rules, and only to protect you or others from harm or to help provide you the right services and supports. If restraints are ever used, the law says they can only be used when a person is being destructive and other techniques, like positive behavior support, have already failed, and restraints must be designed to avoid injury and limit discomfort as much as possible. This law also protects the rights of parents or guardians of a minor child receiving services.`,
},
{
  id: 'sd-service-plan',
  title: 'South Dakota: your service plan (the Individualized Service Plan)',
  citation: 'South Dakota DHS Division of Developmental Disabilities case management policy; Individualized Service Plan (ISP), person-centered planning approach',
  text: `In South Dakota, your plan is called an Individualized Service Plan, or ISP. It is built around person-centered planning, using tools like Charting the LifeCourse and Person-Centered Thinking to help figure out what matters most to you and the life you want. Your case manager leads this process, working with you and the people you want involved, such as family or friends, to write the plan and then to coordinate, monitor, and follow up on it over time. Case management itself is meant to be driven by your choices, not just decided for you. By policy, your ISP is reviewed at least once a year, but your case manager should also revisit it sooner if your circumstances change in a meaningful way. Speak up to your case manager any time you want to request a change.`,
},
{
  id: 'sd-appeals',
  title: 'South Dakota: how to appeal if services are denied or cut',
  citation: 'South Dakota DSS Office of Administrative Hearings; Fair Hearing process',
  text: `If South Dakota Medicaid denies, reduces, or ends your services, you have the right to request a Fair Hearing before an Administrative Law Judge. In general, you must ask for the hearing within 30 days of the decision date, but always check the notice DSS sent you, since it states your exact deadline for your situation. To request a hearing, send a signed, written request that includes your reason for appealing, your address, and your phone number to the DSS Office of Administrative Hearings in Pierre, or call 605-773-6851 with questions about the process. The sources checked for this pack did not clearly spell out a South Dakota-specific rule about keeping your services the same while an appeal is pending, so check your notice closely for any instructions about continuing benefits during your appeal, and ask DSS directly if it is not clear.`,
},
{
  id: 'sd-complaints-pna',
  title: 'South Dakota: reporting problems and free advocacy help',
  citation: 'South Dakota Adult Protective Services 1-833-663-9673; Disability Rights South Dakota 1-800-658-4782',
  text: `If you or someone you know is being abused, neglected, or exploited, call South Dakota Adult Protective Services at 1-833-663-9673. All calls are confidential. If someone is in immediate danger, call 911 or your local police first. For free legal help understanding or defending your rights, contact Disability Rights South Dakota, the state's protection and advocacy organization, toll free at 1-800-658-4782, voice and TTY, or locally at 605-224-8294. Their main office is in Pierre, with field staff who also serve Sioux Falls and Rapid City, though it helps to call ahead for those locations. You will not get in trouble for reporting a problem or asking for help.`,
},
  ], serviceCodes: [] },
  TN: { name: "Tennessee", chunks: [
{
  id: 'tn-agency-waivers',
  title: 'Tennessee: who runs HCBS and the main program (this is NOT a standard 1915(c) waiver)',
  citation: 'TennCare (Tennessee\'s Medicaid agency), with the Department of Intellectual and Developmental Disabilities (DIDD); Employment and Community First (ECF) CHOICES, an 1115 demonstration program',
  text: `Tennessee does things differently than most states when it comes to services for people with intellectual and developmental disabilities. Instead of a typical Medicaid waiver, the main program is called Employment and Community First CHOICES, or ECF CHOICES, and it runs under TennCare, which is Tennessee's Medicaid agency, using authority from a broader Section 1115 demonstration rather than a standard 1915(c) waiver. TennCare works with managed care organizations to coordinate ECF CHOICES services, and the Department of Intellectual and Developmental Disabilities, called DIDD, works alongside TennCare on program design and support. In 2016, Tennessee closed new enrollment in its older DIDD waivers and moved new referrals into ECF CHOICES instead. This program is meant to help people become employed and live as independently as possible in their community, with services like personal support at home, job coaching, and independent living skills training. Because Tennessee's model is not a typical waiver, some rules and processes differ from what you might expect if you compare it to states that use standard 1915(c) waivers.`,
},
{
  id: 'tn-rights',
  title: 'Tennessee: your legal rights as a person receiving services',
  citation: 'Tennessee Code Annotated Title 33, Chapter 3, Part 1, "General Rights of All Service Recipients," including Section 33-3-101',
  text: `Tennessee has a state law that protects the rights of people receiving mental health or developmental disability services. It is found in Tennessee Code Annotated Title 33, Chapter 3, Part 1, and the main section is 33-3-101. This law says that a person with a developmental disability has the same rights as everyone else, except where the law itself limits those rights. You cannot be deprived of your liberty just because you have or are believed to have a developmental disability, except in the specific ways the law allows. You have the right to receive services and supports that meet community standards, as long as the facilities, equipment, and staff needed are available. The agency providing your services also has to keep records about the services and supports you receive, and those records must be kept for at least ten years after your services end. This law applies broadly to people receiving mental health, substance abuse, and developmental disability services in Tennessee.`,
},
{
  id: 'tn-service-plan',
  title: 'Tennessee: your service plan (the Person-Centered Support Plan)',
  citation: 'Tennessee Department of Disability and Aging, Person-Centered Practice; DIDD Person-Centered Support Plan (PCSP) process',
  text: `In Tennessee, your plan is called a Person-Centered Support Plan, or PCSP. A Support Coordinator, sometimes through an agency called an Independent Support Coordinator, works with you to build this plan around your own goals and needs. Every PCSP has to be reviewed by state staff before it takes effect, to make sure it actually addresses your needs and supports the services you are asking for. Your plan must be updated at least once a year. If you use certain devices or technology to help you live independently, there is also a yearly review of how well those tools are working for you. If your needs change before your annual review comes up, ask your Support Coordinator about updating your plan sooner rather than waiting.`,
},
{
  id: 'tn-appeals',
  title: 'Tennessee: how to appeal if services are denied or cut',
  citation: 'TennCare, "How to file a medical appeal"; Tennessee Comp. R. & Regs. 1200-13-14-.11, Appeal of Adverse Benefit Determinations',
  text: `If TennCare or ECF CHOICES denies, reduces, or ends your services, you can file a medical appeal. You generally have 60 days from when you learn about the problem to file. You can appeal by phone at 1-800-878-3192, online through your TennCareConnect.TN.gov account, or by mailing in a form. TennCare usually decides an appeal within 90 days of when you file it, but if you have an emergency and your health plan agrees it is urgent, you can get an expedited appeal decided in about a week. Here is the important part about keeping your services during the wait. To have your benefits continue while your appeal is decided, you generally need to file your appeal within 20 days of the date on your notice, or before your coverage end date if that is later. Always check your own notice for the exact deadline, since Tennessee's timelines can vary depending on the type of notice you received.`,
},
{
  id: 'tn-complaints-pna',
  title: 'Tennessee: reporting problems and free advocacy help',
  citation: 'Tennessee Adult Protective Services Hotline 1-888-277-8366 (1-888-APS-TENN); Disability Rights Tennessee 1-800-342-1660',
  text: `If you or someone you know is being abused, neglected, or financially exploited, call Tennessee Adult Protective Services at 1-888-277-8366, also written as 1-888-APS-TENN. The hotline is answered 24 hours a day, seven days a week, and TTY callers can use 1-800-270-1349. You can also file a report online at reportadultabuse.dhs.tn.gov, and reports can be made anonymously. If it is an emergency, call 911 first. For free legal help protecting your rights, contact Disability Rights Tennessee at 1-800-342-1660. They are the official protection and advocacy organization for people with disabilities across all counties in Tennessee, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
  ], serviceCodes: [] },
  TX: { name: "Texas", chunks: [
{
  id: 'tx-agency-waivers',
  title: 'Texas: who runs HCBS and the main waiver programs',
  citation: 'Texas Health and Human Services Commission (HHSC); HCS and TxHmL 1915(c) waivers',
  text: `In Texas, the Health and Human Services Commission (HHSC) runs the Medicaid waiver programs for people with intellectual and developmental disabilities. The two main waivers are Home and Community-based Services (HCS) and Texas Home Living (TxHmL). These programs pay for supports that help you live in your own home, with family, or in a small group home instead of an institution. Your local front door is your Local Intellectual and Developmental Disability Authority, called a LIDDA. There are 39 LIDDAs across Texas, and each one signs people up for services in its area. Because there are waiting lists, ask your LIDDA to put your name on the interest list as soon as possible, even if you do not need services yet. Texas also has other waivers, like CLASS and Deaf Blind with Multiple Disabilities, that HHSC runs too.`,
},
{
  id: 'tx-rights',
  title: 'Texas: your legal rights as a person with an intellectual disability',
  citation: 'Texas Health and Safety Code Chapter 592 (Rights of Persons with an Intellectual Disability)',
  text: `Texas has a law just about your rights. It is Chapter 592 of the Texas Health and Safety Code, and it includes a Basic Bill of Rights. The law says you have the right to not be mistreated, neglected, or abused by anyone who provides your services. You have the right to not be given medicine you do not need. You cannot be turned down for a job or housing just because you have an intellectual disability. The law also gives you the right to a prompt, fair evaluation that fits your language and culture, and the right to a hearing if you disagree with the results. If you believe your rights were violated, you or someone acting for you can file a complaint with the state. This law applies to people receiving intellectual disability services in Texas.`,
},
{
  id: 'tx-service-plan',
  title: 'Texas: your service plan (the Person-Directed Plan)',
  citation: 'HHSC LIDDA Handbook, Section 3000 (Person-Directed Plan); Form 3608 Individual Plan of Care',
  text: `In Texas, your main plan is called a Person-Directed Plan, or PDP. It describes what matters to you, what you want your life to look like, and what supports you need to get there. A service coordinator from your LIDDA leads the planning meeting with you and the people you choose, like family or friends. The PDP then guides a second document called the Individual Plan of Care (IPC), which lists the exact services and how much of each you will get. Your plan is not set in stone. It is reviewed and fully updated at least once a year when your IPC is renewed, and you can ask for changes any time your needs change. You are the center of this process, so speak up about what you want.`,
},
{
  id: 'tx-appeals',
  title: 'Texas: how to appeal if services are denied or cut',
  citation: 'HHSC state fair hearing process; Community Care Services Eligibility Handbook Sec. 2900',
  text: `If Texas denies, reduces, or ends your Medicaid services, you have the right to a state fair hearing. A hearings officer at HHSC will listen to both sides and make a decision. In general, you have 90 days from the date on your notice to ask for a hearing, and 120 days if the decision came from a managed care health plan. Always check the notice you received, because it lists your exact deadline and how to ask. Here is an important tip: if you ask for the hearing before the date your services are set to change, your services usually stay the same while you wait for the decision. The hearing can happen by phone, and you can bring a helper, family member, or lawyer. If you miss the deadline, ask anyway, because the hearings officer can accept a late request for a good reason.`,
},
{
  id: 'tx-complaints-pna',
  title: 'Texas: reporting problems and free advocacy help',
  citation: 'DFPS Abuse Hotline 1-800-252-5400; HHSC Complaint and Incident Intake 1-800-458-9858; Disability Rights Texas 1-800-252-9108',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, call the Texas Abuse Hotline at 1-800-252-5400. It is run by the Department of Family and Protective Services and is open 24 hours a day, every day. If the problem happened in a nursing facility, assisted living facility, or day program, you can also report it to Texas HHS at 1-800-458-9858. If it is an emergency, call 911 first. For free legal help with your rights, contact Disability Rights Texas at 1-800-252-9108. They are the official protection and advocacy organization for Texans with disabilities, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
  ], serviceCodes: [] },
  VA: { name: "Virginia", chunks: [
{
  id: 'va-agency-waivers',
  title: 'Virginia: who runs HCBS and the main waiver programs',
  citation: 'Virginia DMAS and DBHDS; Developmental Disability (DD) Waivers: BI, FIS, CL',
  text: `In Virginia, two state agencies work together on waiver services for people with developmental disabilities. The Department of Medical Assistance Services (DMAS) is the Medicaid agency, and it administers the DD Waivers jointly with the Department of Behavioral Health and Developmental Services (DBHDS). There are three DD Waivers. Building Independence (BI) is for adults who live mostly on their own. Family and Individual Supports (FIS) is for children and adults who may live with family or independently. Community Living (CL) is for people who need support around the clock. Your local front door is your Community Services Board, called a CSB. The CSB screens you for eligibility and can put your name on the waiting list. Slots are assigned based on urgency of need, so ask your CSB about the waiting list even if you do not need services right away.`,
},
{
  id: 'va-rights',
  title: 'Virginia: your legal rights while receiving services',
  citation: "Virginia Code Sec. 37.2-400 (Rights of individuals receiving services)",
  text: `Virginia has a law that protects your rights while you receive services. It is Section 37.2-400 of the Virginia Code, and it covers anyone getting services from a program that DBHDS operates, funds, or licenses. The law says you keep all your legal rights under state and federal law. You have the right to be treated with dignity and to be free from abuse and neglect. You have the right to prompt evaluation and treatment that you are told about in a way you can understand. Services must be given under the least restrictive conditions possible, and you cannot be restrained or isolated unless it is truly necessary. You also have the right to see your own records, to keep them private, and to an impartial review if you believe your rights were violated. DBHDS runs a human rights system to look into those complaints.`,
},
{
  id: 'va-service-plan',
  title: 'Virginia: your service plan (the Individual Support Plan)',
  citation: 'DBHDS Individual Support Plan guidance; DD Waiver person-centered planning',
  text: `In Virginia, your main plan is called an Individual Support Plan, or ISP. It is a person-centered plan, which means it is built around what matters to you and the life you want. A support coordinator, sometimes called a case manager, from your Community Services Board leads the planning with you and the people you invite. The support coordinator writes most of the plan, and each service provider adds its own part, called the Plan for Supports, that explains exactly how they will help you. Your plan is not a one-time thing. Your support coordinator checks in with person-centered reviews each quarter, and the full plan is redone every year for your new plan year. If your needs or goals change, you can ask for a change to your plan at any time.`,
},
{
  id: 'va-appeals',
  title: 'Virginia: how to appeal if services are denied or cut',
  citation: 'DMAS Appeals Division client appeals (state fair hearing); DMAS Client Appeals FAQ',
  text: `If Virginia denies, reduces, or ends your Medicaid services, you can ask for a state fair hearing. The DMAS Appeals Division handles these appeals, and an impartial hearing officer who is separate from the people who made the decision will hear your case. In most cases you have 30 days from your notice to file the appeal, but always check your notice for the exact deadline and instructions. Here is an important tip about keeping your services. If you file your appeal before the date your coverage changes, or within 10 days of the date on the notice, you can ask for your services to continue while the appeal is decided. Not every case qualifies, so ask for continued coverage when you file. DMAS generally must make a final decision within 90 days. You can bring a family member, advocate, or lawyer to help you.`,
},
{
  id: 'va-complaints-pna',
  title: 'Virginia: reporting problems and free advocacy help',
  citation: 'Virginia APS hotline 1-888-832-3858; disAbility Law Center of Virginia 1-800-552-3962',
  text: `If you or someone you know is being abused, neglected, or taken advantage of, call the Virginia Adult Protective Services hotline at 1-888-832-3858. It is toll free and open 24 hours a day, every day. APS looks into reports about adults with disabilities age 18 and older and adults age 60 and older. You can also report to your local department of social services. If it is an emergency, call 911 first. For free legal help with your rights, contact the disAbility Law Center of Virginia (dLCV) at 1-800-552-3962. dLCV is the official protection and advocacy organization for Virginia, and its services are free. You will not get in trouble for reporting a problem or asking for help.`,
},
  ], serviceCodes: [] },
  WA: { name: "Washington", chunks: [
{
  id: 'wa-agency-waivers',
  title: 'Washington: who runs HCBS and the main waiver programs',
  citation: 'Washington State Department of Social and Health Services (DSHS), Developmental Disabilities Administration (DDA); five 1915(c) HCBS waivers',
  text: `In Washington, the Developmental Disabilities Administration (DDA), which is part of the Department of Social and Health Services (DSHS), runs the Medicaid home and community based services for people with intellectual and developmental disabilities. DDA offers five different waivers: Basic Plus, Core, Community Protection, Individual and Family Services, and Children's Intensive In-Home Behavioral Supports. Each waiver has its own eligibility rules and menu of services, so which one fits you depends on your needs and your age. These waivers pay for supports that help you live in your own home or in the community instead of an institution. Becoming a DDA client is only the first step. After you are found eligible, you still need to request specific services, since being enrolled does not automatically start services. If you have questions about which waiver fits you, DDA headquarters can be reached at 360-725-3413.`,
},
{
  id: 'wa-rights',
  title: 'Washington: your rights as a DDA client',
  citation: 'Washington Administrative Code (WAC) 388-823-1095, "What are my rights as a DDA client?"',
  text: `Washington state has a rule that spells out your rights as a person receiving DDA services. It is WAC 388-823-1095. It says you have the right to be free from abuse, punishment, and being locked away against your will. You cannot be treated unfairly because of your race, religion, sex, age, disability, gender identity, or who you love. You get to choose your own food within your plan, have visitors, control your own schedule, and make your own healthcare decisions when you are able to. You have the right to manage your own money or pick someone you trust to help. You can practice your religion, vote, and take part in your community. You have the right to review your own service plan, file a complaint without getting punished for it, and contact your state representative, your doctor, the developmental disabilities ombuds, or a protection and advocacy organization at any time without a provider stopping you. If a provider wants to end your services, they generally must give you 30 days notice, or 72 hours in an emergency.`,
},
{
  id: 'wa-service-plan',
  title: 'Washington: your service plan (Person-Centered Service Plan)',
  citation: 'DSHS DDA Person-Centered Planning; WAC 388-823-1095 (planning participation rights)',
  text: `In Washington, your plan is called a Person-Centered Service Plan. It lays out the type of services you need, how much of each service you get, and who you want to provide them. Your DDA case manager leads this planning process with you, and you can invite anyone you choose, like family, friends, or an advocate, to join the meeting. Before the plan is written, your case manager does an annual assessment, usually in your home or another place you pick, which takes about three hours and covers different areas of your life and support needs. Your plan is reviewed and updated at least once a year during this annual assessment. You do not have to wait for the yearly review if things change. You can ask your case manager for a Plan Amendment any time your needs or goals change.`,
},
{
  id: 'wa-appeals',
  title: 'Washington: how to appeal if services are denied or cut',
  citation: 'Washington Health Care Authority, "File an appeal: Apple Health (Medicaid)" and continued coverage guidance; Office of Administrative Hearings',
  text: `If Washington's Health Care Authority (HCA) denies, reduces, or ends your Medicaid services, you can ask for an administrative hearing. These hearings are held by the Office of Administrative Hearings, a separate state agency, and you can reach them at 1-800-583-8271. In general, you have 90 days from the date on your written notice to request a hearing. There is a shorter, more important deadline if you want your services to keep going while you wait for a decision. To keep getting your current services during the appeal, sometimes called continued benefits, you usually must ask within 10 days of the notice, or before the date the change takes effect, whichever is later. Always check your notice for the exact dates, since they are listed there. Keep in mind that if you ask for continued benefits and later lose the appeal, you could be asked to pay back the cost of services you received during that time, so read your notice about this risk carefully or ask for help understanding it.`,
},
{
  id: 'wa-complaints-pna',
  title: 'Washington: reporting problems and free advocacy help',
  citation: 'DSHS statewide abuse hotline 1-866-363-4276 (1-866-END-HARM); Disability Rights Washington 1-800-562-2702',
  text: `If you or someone you know is being abused, neglected, or exploited, call the Washington DSHS abuse hotline at 1-866-363-4276. People can also remember this as 1-866-END-HARM. The line is answered 24 hours a day, seven days a week, and TTY callers can use 1-800-624-6186. If it is an emergency, call 911 first. For free legal help protecting your rights, contact Disability Rights Washington at 1-800-562-2702, or 206-324-1521. They are the official protection and advocacy organization for people with disabilities in Washington, their phone lines are open weekdays from 9 a.m. to noon and 1 p.m. to 4 p.m., and their help is free. You will not get in trouble for reporting a problem or for asking for help.`,
},
  ], serviceCodes: [] },
  WV: { name: "West Virginia", chunks: [
{
  id: 'wv-agency-waivers',
  title: 'West Virginia: who runs HCBS and the main waiver program',
  citation: 'West Virginia Department of Human Services (DoHS), Bureau for Medical Services (BMS); Intellectual and/or Developmental Disabilities Waiver (IDDW)',
  text: `In West Virginia, the Bureau for Medical Services (BMS), part of the Department of Human Services, runs the Medicaid waiver for people with intellectual and developmental disabilities. It is called the Intellectual and/or Developmental Disabilities Waiver, or IDDW, and it used to be known as the MR/DD Waiver. This is a 1915(c) waiver, which means it pays for supports like case management, day habilitation, respite for family caregivers, and supported employment so you can live in your own home or in the community instead of a facility. A contractor called Acentra Health, sometimes referred to as the WV ASO, helps manage utilization review and eligibility for the program. You apply for the IDDW through BMS, and your medical and financial eligibility are reviewed every year.`,
},
{
  id: 'wv-service-plan',
  title: 'West Virginia: your service plan (the Individualized Program Plan)',
  citation: 'WV IDDW Program; case management and person-centered planning requirements (iddwprogram.wv.gov, WV ASO Acentra Health)',
  text: `In West Virginia, your plan under the IDDW is built around person-centered planning, and the document is often called an Individualized Program Plan, or IPP. You are assigned a Case Manager who works for a provider agency you choose. Your Case Manager leads an interdisciplinary team that includes you and the people who support you, and they help write and update your plan based on what you want your life to look like. Case Managers generally update individualized treatment plans at least twice a year, and a separate Annual Functional Assessment is done once a year to help set your service budget and check that you still qualify for the waiver. Your Case Manager also does monthly home visits to check in with you. Ask your Case Manager for the exact review dates that apply to you, since the schedule can vary by service.`,
},
{
  id: 'wv-appeals',
  title: 'West Virginia: how to appeal if services are denied or cut',
  citation: 'WV Department of Human Services Fair Hearing process (Legal Aid of West Virginia guidance)',
  text: `If West Virginia denies, reduces, or ends your Medicaid services, you have the right to ask for a Fair Hearing. You generally have up to 90 days from the date you get the notice to request one. Here is an important detail: if you want your services to keep going while you wait for the hearing, you usually need to respond to the Adverse Action notice within 13 days, so act quickly and always check the exact deadline printed on your own notice. Some situations, like a cut caused by a change in your income or assets, may not qualify for continued benefits during the appeal, so read your notice carefully or ask for help. You can contact Legal Aid of West Virginia at 1-866-255-4370 for free help understanding your notice and filing an appeal.`,
},
{
  id: 'wv-complaints-pna',
  title: 'West Virginia: reporting problems and free advocacy help',
  citation: 'WV Centralized Intake for Abuse and Neglect 1-800-352-6513; Disability Rights of West Virginia 1-800-950-5250',
  text: `If you or someone you know is being abused, neglected, or exploited, you can report it to West Virginia's Centralized Intake by calling 1-800-352-6513. This one number is used for reports involving both children and vulnerable adults, and it operates 24 hours a day, every day. If it is an emergency, call 911 first. For free legal help protecting your rights, contact Disability Rights of West Virginia, the state's official protection and advocacy organization, at 1-800-950-5250, or their office line at 304-346-0847. Their services are confidential and free, and you will not get in trouble for reporting a problem or asking for help.`,
},
  ], serviceCodes: [] },
  WY: { name: "Wyoming", chunks: [
{
  id: 'wy-agency-waivers',
  title: 'Wyoming: who runs HCBS and the main waiver programs',
  citation: 'Wyoming Department of Health, Healthcare Financing Division, HCBS Section; Comprehensive Waiver and Supports Waiver',
  text: `In Wyoming, the Department of Health runs Medicaid waiver services through its Healthcare Financing Division, in a part of the agency called the HCBS Section. For people with intellectual or developmental disabilities, or an acquired brain injury, there are two main waivers. The Comprehensive Waiver covers a fuller range of services but requires you to meet additional emergency-level criteria to get in. The Supports Waiver offers a smaller, limited budget for services and generally has an easier path to enrollment. Both waivers are meant to help you live in your home or community instead of a facility. You apply and manage your services with help from a Case Manager, who works with you throughout the process.`,
},
{
  id: 'wy-service-plan',
  title: 'Wyoming: your service plan (the Individualized Plan of Care)',
  citation: 'Wyoming Department of Health HCBS Section, Planning Workbook for Individualized Plans of Care',
  text: `In Wyoming, your services are laid out in an Individualized Plan of Care. You work with a Case Manager, who you choose, to figure out which services fit your life and goals. The state gives Case Managers a Planning Workbook to guide this conversation and make sure your plan covers your needs in a person-centered way. Once the plan is put together, it goes to the state for review and approval before services can start. Because your circumstances can change, you can ask your Case Manager to revisit your plan, and the state expects plans to be checked and renewed on a regular cycle to keep your services current. If you are ever unsure what is in your plan or why, your Case Manager is the first person to ask.`,
},
{
  id: 'wy-appeals',
  title: 'Wyoming: how to appeal if services are denied or cut',
  citation: 'Wyoming Statute 42-4-108; Wyoming Office of Administrative Hearings (OAH)',
  text: `If Wyoming denies, reduces, or ends your Medicaid or HCBS services, state law gives you the right to an administrative hearing. Wyoming Statute 42-4-108 requires the Department to offer a hearing to anyone who is denied medical assistance. In general, you have 30 days from the date on your notice to ask for a hearing, but always check the actual notice you received, since it lists your specific deadline and how to file. Hearings are conducted by the Wyoming Office of Administrative Hearings, an independent agency separate from the Department of Health. This draft could not confirm the exact rule for keeping your services in place while you wait for a decision, so if you are already receiving a service that is being reduced or stopped, ask right away, in writing, whether your services will continue during the appeal, and check your notice for that answer too.`,
},
{
  id: 'wy-complaints-pna',
  title: 'Wyoming: reporting problems and free advocacy help',
  citation: 'Wyoming Department of Family Services (DFS) 1-800-457-3659; Protection and Advocacy System, Inc. 1-800-624-7648',
  text: `If you or someone you know is being abused, neglected, or exploited, contact the Wyoming Department of Family Services. Their main toll-free number is 1-800-457-3659, or you can contact your local DFS office directly. If someone is in immediate danger, call 911 first. For free legal help protecting your rights around intellectual or developmental disability services, contact the Protection and Advocacy System, Inc. at 1-800-624-7648, which is their toll-free line for the Intellectual and Developmental Disabilities program. They are Wyoming's official protection and advocacy organization for people with disabilities, and their help is free. You will not get in trouble for reporting a problem or for asking them for help.`,
},
  ], serviceCodes: [] },
  AK: { name: "Alaska", chunks: [
{
  id: 'ak-agency-waivers',
  title: 'Alaska: who runs HCBS and the main waiver programs',
  citation: 'Alaska Department of Health, Division of Senior and Disabilities Services (SDS); IDD Waiver, Individualized Supports Waiver (ISW), Alaskans with Physical and Developmental Disabilities (APDD) Waiver',
  text: `In Alaska, the Department of Health runs Medicaid waiver services through the Division of Senior and Disabilities Services, known as SDS. For people with intellectual and developmental disabilities, the main program is the IDD Waiver. SDS also runs the Individualized Supports Waiver, called ISW, and the Alaskans with Physical and Developmental Disabilities Waiver, called APDD, for adults 21 and older who need nursing-level care. These waivers pay for things like respite care, help around the house, residential support, and environmental changes to your home, so you can stay in your community instead of an institution. Alaska has more people wanting services than the state can fund right away, so there is a waitlist. Each year, the state draws a limited number of people from the waitlist to apply for the IDD Waiver. You can call an Aging and Disability Resource Center at 1-877-625-2372 to start the process or ask questions about where you stand on a waitlist.`,
},
{
  id: 'ak-rights',
  title: 'Alaska: your legal rights as a person with a disability',
  citation: 'Alaska Statute 47.80.010 (Rights of persons with disabilities); AS 47.80.020 (Protection and advocacy of rights)',
  text: `Alaska has a state law that protects you if you have a disability. It is AS 47.80.010, and it says you have the same legal rights as everyone else under the U.S. Constitution and Alaska law. You cannot be shut out of a program or service that gets public money just because you have a disability. The law also recognizes that some people may need help using their rights in a meaningful way, and if any right is ever modified for someone, the law requires legal safeguards against abuse of that process. A related section, AS 47.80.020, sets up protection and advocacy of these rights in Alaska. If you feel your rights under this law were not respected, you can ask for help from the state or from Alaska's protection and advocacy organization.`,
},
{
  id: 'ak-service-plan',
  title: 'Alaska: your service plan (the Plan of Care)',
  citation: 'Alaska SDS Policy and Procedure Manual, Section 4 (IDD Waivers)',
  text: `In Alaska, your services are laid out in a document called a Plan of Care. When you are chosen for a waiver, you pick a Care Coordinator, who is a case manager that helps you figure out what supports you need and who will provide them. The Care Coordinator writes the Plan of Care with you, centered on what you want your life to look like, and then sends it to SDS for approval before any services can be paid for. SDS checks in every year to make sure you still qualify for the program, and your Care Coordinator prepares a new Plan of Care as part of that yearly renewal. Your Care Coordinator is supposed to start the renewal paperwork early, well before your current approval period runs out, so your services do not get interrupted. You can also ask your Care Coordinator to update your plan any time your needs or goals change during the year.`,
},
{
  id: 'ak-appeals',
  title: 'Alaska: how to appeal if services are denied or cut',
  citation: 'Alaska fair hearing process; Office of Administrative Hearings (OAH)',
  text: `If Alaska denies, reduces, or stops your Medicaid services, you have the right to ask for a fair hearing. In general, you must request the hearing within 30 days of the date on your decision notice. Your hearing is heard by a judge at the state Office of Administrative Hearings, known as OAH. Here is an important detail: if you are already getting services and you ask for a hearing before the date your services are set to change, usually within 10 days of the notice, your services can keep going at the same level while you wait for a decision. This is sometimes called aid paid pending. Always check the actual notice you received, since it lists your exact deadline and the address or online system to use to file. If you are not sure, ask your Care Coordinator or call SDS for help figuring out the process.`,
},
{
  id: 'ak-complaints-pna',
  title: 'Alaska: reporting problems and free advocacy help',
  citation: 'Alaska Adult Protective Services (APS) 1-800-478-9996; Disability Law Center of Alaska 1-800-478-1234',
  text: `If you or someone you know is being abused, neglected, or exploited, call Alaska Adult Protective Services at 1-800-478-9996. This is the state hotline, and staff there can also direct you to Centralized Reporting for other kinds of harm. If it is an emergency, call 911 or local law enforcement first, then make the report to APS. For free legal help protecting your rights, contact the Disability Law Center of Alaska at 1-800-478-1234. This is Alaska's official protection and advocacy organization for people with disabilities, and their services are free. You will not get in trouble for reporting a problem or for asking for help.`,
},
  ], serviceCodes: [] },
  CO: { name: "Colorado", chunks: [
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
  ], serviceCodes: [] },
  HI: { name: "Hawaii", chunks: [
{
  id: 'hi-agency-waivers',
  title: 'Hawaii: who runs HCBS and the main waiver program',
  citation: 'Hawaii Department of Health, Developmental Disabilities Division (DOH/DDD) and Department of Human Services, Med-QUEST Division (DHS/MQD); I/DD Waiver (1915c)',
  text: `In Hawaii, two state agencies share the job of running Medicaid home and community based services for people with intellectual and developmental disabilities. The Department of Human Services Med-QUEST Division is the state Medicaid agency, and the Department of Health Developmental Disabilities Division, called DDD, actually operates the waiver day to day under an agreement between the two departments. The program is called the I/DD Waiver, a 1915(c) Medicaid waiver, and it pays for supports like day habilitation, respite for family caregivers, and supported employment so you can live at home or in the community instead of in an institution. To qualify, you must be eligible for DDD services, eligible for Medicaid, and meet a level of care requirement. A case manager helps you access these waiver services once you are approved.`,
},
{
  id: 'hi-rights',
  title: 'Hawaii: your legal rights as a person with a developmental or intellectual disability',
  citation: 'Hawaii Revised Statutes Chapter 333F, Section 333F-8 (Rights of persons with developmental or intellectual disabilities)',
  text: `Hawaii has a law, HRS Section 333F-8, that addresses your rights as a person with a developmental or intellectual disability. The broader chapter it belongs to, HRS Chapter 333F, says that services should be provided in the least restrictive, individually appropriate environment, meaning the setting that departs the least from normal life while still meeting your needs. The chapter's overall goal is for the state to build enough community services and housing choices so you can live and be treated with dignity in your own community rather than being placed in an institution unless that is truly necessary. Because the full text of Section 333F-8 was not directly accessible during this review, ask your DDD case manager or Hawaii Disability Rights Center for the complete, current list of specific rights this section guarantees.`,
},
{
  id: 'hi-appeals',
  title: 'Hawaii: how to appeal if services are denied or cut',
  citation: 'Hawaii DDD Informal Review and Administrative Hearing process; DHS Administrative Appeals Office',
  text: `If Hawaii denies, reduces, or ends your DDD waiver services, you have two options. You can ask DDD for an informal review, and you generally need to do that within 15 working days of the date on your notice. You can also ask for a formal Administrative Hearing through the Department of Human Services, and for Medicaid waiver participants that request generally needs to be made within 90 days of the date on your written notice. You do not have to try the informal review first if you would rather go straight to the formal hearing. Check your notice carefully, because it will have your exact deadlines and it should also say whether your services can keep going while you wait, which is called aid paid pending. Appeals for the formal hearing go to the DHS Administrative Appeals Office.`,
},
{
  id: 'hi-complaints-pna',
  title: 'Hawaii: reporting problems and free advocacy help',
  citation: 'Hawaii Adult Protective and Community Services Branch (regional lines, Oahu 808-832-5115); Hawaii Disability Rights Center 1-800-882-1057',
  text: `If you or someone you know is being abused, neglected, or financially exploited, you can report it to Hawaii's Adult Protective Services. The reporting line depends on your island: Oahu is 808-832-5115, Kauai is 808-241-3337, Maui, Molokai, and Lanai is 808-243-5151, East Hawaii is 808-933-8820, and West Hawaii is 808-327-6280. You can also file online at apsreport.hawaii.gov. You may report anonymously, and Hawaii law protects reporters from liability. If it is an emergency, call 911 first. For free legal help protecting your rights, contact the Hawaii Disability Rights Center, the state's official protection and advocacy organization, at 1-800-882-1057, or their Oahu line at 808-949-2922.`,
},
  ], serviceCodes: [] },
  UT: { name: "Utah", chunks: [
{
  id: 'ut-agency-waivers',
  title: 'Utah: who runs HCBS and the main waiver programs',
  citation: 'Utah Division of Services for People with Disabilities (DSPD), part of the Department of Health and Human Services (DHHS); Community Supports, Community Transitions, and Limited Supports 1915(c) waivers',
  text: `In Utah, the Division of Services for People with Disabilities, called DSPD, runs the Medicaid waiver programs for people with intellectual and developmental disabilities. DSPD is part of the Utah Department of Health and Human Services. The main waiver is the Community Supports Waiver, which helps people with intellectual or developmental disabilities stay in their own home or another community setting. The Community Transitions Waiver helps people move out of an institution and back into the community. The Limited Supports Waiver serves people with an acquired brain injury, intellectual disability, or a related condition who need a lower level of support, and it is often used by people who are still on the waiting list for other DSPD waivers. To apply, you generally start with DSPD, since it manages eligibility and enrollment for these programs.`,
},
{
  id: 'ut-rights',
  title: 'Utah: your legal rights as a person with a disability',
  citation: 'Utah Code Title 62A, Chapter 5, Section 103 (Division responsibility and authority); Utah Code Title 62A, Chapter 5b (Rights and Privileges of an Individual with a Disability)',
  text: `Utah law protects your rights in a couple of important ways. Utah Code 62A-5-103 says that DSPD must provide services and supports in the least restrictive and most enabling setting possible, and it must give you reasonable personal choice in picking services that support your independence and your place in community life. It also requires due process, meaning a fair legal process, before your constitutional rights can be limited, including before you are admitted to certain intermediate care facilities. Separately, Utah Code Chapter 5b, called Rights and Privileges of an Individual with a Disability, protects you from discrimination in areas like housing, and covers your right to be accompanied by a service or support animal. Together these laws are meant to protect your independence, your choices, and your place in your community.`,
},
{
  id: 'ut-service-plan',
  title: 'Utah: your service plan (the Person-Centered Support Plan)',
  citation: 'Utah DSPD Support Coordination Manual; Person-Centered Support Plan (PCSP)',
  text: `In Utah, your plan is called the Person-Centered Support Plan, or PCSP. A Support Coordinator works with you to build the plan, and it describes the supports and services you will get for the next 12 months, along with your personal preferences and the goals you want to reach. Because Medicaid requires an annual review, your PCSP is usually finished about one month before your current budget year ends, so your services can continue smoothly into the next year. You get to choose your own Support Coordinator, and you can ask to change coordinators if the relationship is not working for you. Speak up during planning about what matters most to you, since the PCSP is supposed to reflect your goals and choices, not just a standard list of services.`,
},
{
  id: 'ut-appeals',
  title: 'Utah: how to appeal if Medicaid services are denied or cut',
  citation: 'Utah DHHS Office of Administrative Hearings; Utah Medicaid Fair Hearing Request Form',
  text: `If Utah denies, reduces, or ends your Medicaid services, you can ask for a state fair hearing through the Department of Health and Human Services Office of Administrative Hearings. The deadline depends on what kind of decision you are appealing. In general, you have 30 days from the date of a denial notice from the Medicaid agency itself, 90 days if you are appealing a Medicaid or CHIP eligibility decision, or 120 days if you are appealing a managed care health plan's decision. If you want your services to keep going while your appeal is pending, request your hearing before the date your services are set to change, since that is what usually keeps your benefits in place during the wait. Because these deadlines depend on exactly what was decided, always check the notice you received for your specific deadline and instructions.`,
},
{
  id: 'ut-complaints-pna',
  title: 'Utah: reporting problems and free advocacy help',
  citation: 'Utah Adult Protective Services 1-800-371-7897; Disability Law Center 1-800-662-9080',
  text: `If you or someone you know is being abused, neglected, or exploited, you can report it to Utah Adult Protective Services at 1-800-371-7897, by phone Monday through Friday, 8 a.m. to 5 p.m., or you can report online any time, day or night. Utah law says any person who believes a vulnerable adult is being abused, neglected, or exploited must report it right away, and you are protected from liability when you report in good faith. If it is an emergency, call 911 first. For free legal help protecting your rights, contact the Disability Law Center at 1-800-662-9080. They are Utah's official Protection and Advocacy organization for people with disabilities, and their help is free.`,
},
  ], serviceCodes: [] },
  VT: { name: "Vermont", chunks: [
{
  id: 'vt-agency-waivers',
  title: 'Vermont: who runs HCBS and the main waiver program',
  citation: 'Vermont Department of Disabilities, Aging and Independent Living (DAIL), Developmental Disabilities Services Division (DDSD); Developmental Disabilities (DD) Home and Community-Based Services Waiver under Vermont Global Commitment to Health',
  text: `In Vermont, the Department of Disabilities, Aging and Independent Living, known as DAIL, oversees services for people with developmental disabilities. Inside DAIL, the Developmental Disabilities Services Division, called DDSD, runs the day-to-day programs. Vermont pays for home and community-based services through the Developmental Disabilities Home and Community-Based Services Waiver, which operates under the state's larger Global Commitment to Health Medicaid waiver rather than a standalone federal 1915(c) waiver like most states use. These services can include residential supports, employment help, and behavioral supports, and they are designed so you can live in your own home or community instead of an institution. Local Designated Agencies deliver most services on the ground under contract with DDSD. If you are not sure where to start, DDSD or your local Designated Agency can walk you through eligibility and how to apply.`,
},
{
  id: 'vt-rights',
  title: 'Vermont: your rights under the Developmental Disabilities Act',
  citation: '18 V.S.A. chapter 204A (Developmental Disabilities Act), section 8724 (Principles of service)',
  text: `Vermont has a state law called the Developmental Disabilities Act, found in Title 18, chapter 204A of Vermont law. Section 8724 lays out the principles every program funded under this law must follow. It says you have the opportunity to live in a safe environment with respect and dignity, to live with your family or in a home of your own choosing, to attend neighborhood schools, to work, to take part in community activities, and to get the same kind of community support and services that other Vermonters can access. These principles guide how DDSD and its Designated Agencies are supposed to design and deliver your services. If a service does not feel like it lines up with these principles, you can raise that concern with your case manager or with DDSD.`,
},
{
  id: 'vt-service-plan',
  title: 'Vermont: your service plan (the Individual Support Agreement)',
  citation: 'Vermont DDSD person-centered planning process; Individual Support Agreement (ISA)',
  text: `In Vermont, your plan is usually called an Individual Support Agreement, or ISA. It is a written agreement between you, your guardian if you have one, and the provider or providers giving you services, and it spells out the supports you will get. A case manager at your Designated Agency leads a person-centered planning process with you to build this plan around your goals and needs, then the plan goes to the state for approval. Vermont also uses an individualized budget tied to your plan, and the state reconciles what services were actually delivered against what was authorized. Your case manager is responsible for monitoring your services over time and helping with the redetermination process, which generally happens on an annual cycle. You can ask your case manager to revisit your plan any time your needs change.`,
},
{
  id: 'vt-appeals',
  title: 'Vermont: how to appeal if services are denied or cut',
  citation: 'Vermont Human Services Board fair hearing process; Department of Vermont Health Access (DVHA)',
  text: `If Vermont denies, reduces, or ends your Medicaid or HCBS services, you can ask for a state fair hearing before the Human Services Board, which is independent of the agency that made the decision. Heads up: different official sources describe different appeal windows, some citing 90 days and others 120 days from the date of the notice, so the deadline may depend on which program or notice type applies to you. Check your specific notice for the exact number of days rather than assuming either figure. If you are already getting a service and you ask for a hearing before the date the change is set to take effect, you generally have the right to keep getting that service at the same level while your appeal is pending. You can also get free help with a Medicaid appeal from the Vermont Office of the Health Care Advocate. Do not wait to ask for help if a notice is confusing, since acting before the effective date matters for keeping your services in place during the appeal.`,
},
{
  id: 'vt-complaints-pna',
  title: 'Vermont: reporting problems and free advocacy help',
  citation: 'Vermont Adult Protective Services 1-800-564-1612; Disability Rights Vermont 1-800-834-7890',
  text: `If you or someone you know is being abused, neglected, or exploited, call Vermont Adult Protective Services at 1-800-564-1612. This hotline is run by the state's Division of Licensing and Protection. If someone is in immediate danger, call 911 first. For free legal help protecting your rights, contact Disability Rights Vermont at 1-800-834-7890. They are Vermont's official protection and advocacy organization for people with disabilities, and their services are free. You will not get in trouble for reporting a problem or for asking them for help.`,
},
  ], serviceCodes: [] },
  WI: { name: "Wisconsin", chunks: [
{
  id: 'wi-agency-waivers',
  title: 'Wisconsin: who runs HCBS and the main programs',
  citation: 'Wisconsin Department of Health Services (DHS); IRIS (Include, Respect, I Self-Direct) and Family Care, both Medicaid HCBS long-term care programs',
  text: `In Wisconsin, the Department of Health Services runs the state's Medicaid long-term care programs, and people with intellectual and developmental disabilities usually use one of two of them. IRIS, which stands for Include, Respect, I Self-Direct, lets you manage your own budget and hire your own workers with help from an IRIS Consultant Agency. Family Care is a managed care program where a care team, including a nurse and a care manager, arranges services for you. Unlike some states, Wisconsin does not run a separate waiver just for people with intellectual and developmental disabilities. Instead, IRIS and Family Care serve people with developmental disabilities, physical disabilities, and older adults together under the same programs. Your local Aging and Disability Resource Center, called an ADRC, is usually where you start to apply.`,
},
{
  id: 'wi-rights',
  title: "Wisconsin: your rights as a patient receiving DD services",
  citation: 'Wisconsin Statutes Section 51.61 ("Patients rights")',
  text: `Wisconsin has a law that protects the rights of people receiving services for developmental disabilities, mental illness, or drug and alcohol treatment. It is Section 51.61 of the Wisconsin Statutes, often called the patients rights law. Under this law, the state must set up procedures to protect your rights and a grievance process so you can complain if those rights are not honored. You have the right to give informed, written consent before you receive treatment, unless a court has found you unable to consent. If a facility ever needs to use restraint or isolation, the law says it can only be used in an emergency to prevent you from harming yourself or others, and your dignity and safety must be protected. If you think your rights under this law were violated, you can use the grievance procedure through your provider or county, or contact Disability Rights Wisconsin.`,
},
{
  id: 'wi-service-plan',
  title: 'Wisconsin: your service plan (IRIS support and service plan, or Family Care member-centered plan)',
  citation: 'Wisconsin DHS IRIS Policy Manual; Family Care and Family Care Partnership program materials',
  text: `Your service plan in Wisconsin depends on which program you are in. If you are in IRIS, your plan is called a support and service plan, and you build it together with your IRIS consultant, based on your own long-term goals and how you want to reach them. Your IRIS consultant agency reviews the plan to make sure it meets program standards. If you are in Family Care, your plan is called a member-centered plan, and it is created with your interdisciplinary team, which includes a nurse and a care manager, within 60 days of when you enroll. In both programs, your care team or consultant checks in with you regularly, and the plan is meant to be updated whenever your needs or goals change, not just on a fixed yearly schedule. Ask your consultant or care manager about the exact review timeline that applies to you.`,
},
{
  id: 'wi-appeals',
  title: 'Wisconsin: how to appeal if services are denied or cut',
  citation: 'Wisconsin Department of Administration, Division of Hearings and Appeals (DHA); Medicaid Eligibility Handbook Section 23.2',
  text: `If Wisconsin denies, reduces, or ends your Medicaid or long-term care services, you can ask for a state fair hearing through the Division of Hearings and Appeals. Sources reviewed for this pack gave slightly different appeal windows, generally somewhere between 45 and 60 days from the date of the decision, so always check the exact deadline printed on your notice rather than relying on a single number. If you want your current services to keep going while you wait for a decision, you generally need to ask for that within 10 days of getting the notice, or before the change takes effect, whichever is sooner. You can send your written hearing request to the Division of Hearings and Appeals in Madison. A Family Voices of Wisconsin guide and your managed care organization can help you prepare for the hearing.`,
},
{
  id: 'wi-complaints-pna',
  title: 'Wisconsin: reporting problems and free advocacy help',
  citation: 'Wisconsin Elder Abuse Hotline 1-833-586-0107; county Adult Protective Services (ADRC); Disability Rights Wisconsin 1-800-928-8778',
  text: `If you or someone you know age 60 or older is being abused or neglected, you can call the statewide Wisconsin Elder Abuse Hotline at 1-833-586-0107. For adults under 60 who are at risk, Wisconsin handles reports at the county level, so contact your county's Adult Protective Services unit, often based at your local Aging and Disability Resource Center. If it is an emergency, call 911 first. For free legal help with your rights, contact Disability Rights Wisconsin at 1-800-928-8778. They are the official protection and advocacy organization for people with disabilities in Wisconsin, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
  ], serviceCodes: [] },
  MD: { name: "Maryland", chunks: [
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
  ], serviceCodes: [] },
  MN: { name: "Minnesota", chunks: [
{
  id: 'mn-agency-waivers',
  title: 'Minnesota: who runs HCBS and the main waiver programs',
  citation: 'Minnesota Department of Human Services (DHS); Developmental Disabilities (DD) waiver and Community Access for Disability Inclusion (CADI) waiver, both 1915(c) HCBS waivers',
  text: `In Minnesota, the Department of Human Services, often called DHS, runs the Medicaid home and community-based waivers for people with disabilities. Minnesota has four main waivers: Developmental Disabilities (DD), Community Access for Disability Inclusion (CADI), Brain Injury (BI), and Community Alternative Care (CAC). People with intellectual and developmental disabilities most often use the DD waiver or the CADI waiver, and these pay for services so you can live in your own home, a family home, or a small community setting instead of an institution. You apply through your county or Tribal agency, and a case manager there is your main point of contact. Ask your county agency which waiver fits your situation, since eligibility rules differ between them.`,
},
{
  id: 'mn-rights',
  title: "Minnesota: your rights when receiving care in a licensed facility or program",
  citation: 'Minnesota Statutes Section 144.651 ("Health Care Bill of Rights")',
  text: `Minnesota law protects people who receive care in health care facilities and licensed residential programs, including many settings that serve people with developmental disabilities. This is Minnesota Statutes Section 144.651, sometimes called the Patients and Residents Bill of Rights. Under this law, no facility can make you give up these rights just to be admitted. You have the right to talk and write privately with people you choose, get your mail unopened, and use a phone for private calls. If you are able to manage your own money, you have the right to do so, or to get at least a quarterly accounting if someone else manages it for you. This research did not confirm a separate, DD-specific bill of rights statute beyond Section 144.651, so if your services happen outside a licensed facility, ask your case manager what specific rights protections apply to your exact program.`,
},
{
  id: 'mn-service-plan',
  title: 'Minnesota: your service plan (the MnCHOICES Support Plan)',
  citation: 'Minnesota DHS MnCHOICES Support Plan process',
  text: `In Minnesota, your main plan is now called the MnCHOICES Support Plan. It replaced an older set of documents called the Community Support Plan and the Coordinated Service and Support Plan, which DHS retired around October 2024 as part of an update to its MnCHOICES computer system. Your county or Tribal case manager builds this plan with you, based on an assessment of your needs and your own goals, and it lists the services and supports you will get. If you are on the DD, CADI, BI, or CAC waiver, your case manager must have at least two face-to-face visits with you every 12 months, and your annual assessment can count as one of those visits. Because this system changed recently, ask your case manager to confirm the current name and paperwork for your specific plan.`,
},
{
  id: 'mn-appeals',
  title: 'Minnesota: how to appeal if services are denied or cut',
  citation: 'Minnesota DHS State Appeals Office; Minnesota Statutes Section 256.045',
  text: `If Minnesota denies, reduces, or ends your Medicaid or HCBS services, you have the right to appeal to the DHS State Appeals Office for a hearing. In general, you must file your appeal within 30 days of the notice, though DHS can accept it up to 90 days later if you show good cause for the delay. If your notice gave you at least 10 days advance warning and you file your appeal by the date the change was set to take effect, your services usually continue automatically while your appeal is decided. Always check the notice you received, since it lists your exact deadline and appeal instructions. The Arc Minnesota and Minnesota Disability Law Center have published guides that can help you prepare.`,
},
{
  id: 'mn-complaints-pna',
  title: 'Minnesota: reporting problems and free advocacy help',
  citation: 'Minnesota Adult Abuse Reporting Center (MAARC) 1-844-880-1574; Minnesota Disability Law Center 1-800-292-4150',
  text: `If you or someone you know is being abused or neglected, call the Minnesota Adult Abuse Reporting Center, known as MAARC, at 1-844-880-1574. It is open 24 hours a day, every day, and your identity as the reporter stays confidential. If it is an emergency, call 911 first for police, fire, or ambulance help. For free legal help with your rights, contact the Minnesota Disability Law Center at 1-800-292-4150. They are part of Mid-Minnesota Legal Aid and are the official protection and advocacy organization for people with disabilities in Minnesota, and their help is free. You will not get in trouble for reporting a problem or asking for help.`,
},
  ], serviceCodes: [] },
  ME: { name: "Maine", chunks: [
{
  id: 'me-agency-waivers',
  title: 'Maine: who runs HCBS and the main waiver programs',
  citation: 'Maine Department of Health and Human Services (DHHS), Office of Aging and Disability Services (OADS); MaineCare Sections 21 and 29 waivers',
  text: `In Maine, the Department of Health and Human Services runs Medicaid waiver services for people with intellectual disabilities or autism through its Office of Aging and Disability Services, called OADS. The two main waivers are known by their MaineCare Benefits Manual section numbers. Section 21 is the fuller waiver, called Home and Community Benefits for Members with Intellectual Disabilities or Autism Spectrum Disorder, and it pays for supports like home support, community support, work support, and career planning. Section 29 is a more limited community support waiver. Both help you live in your own home or community instead of an institution. A Case Manager helps you understand what services are available, apply for MaineCare and the waiver, and connect you to supports. You can reach OADS about waiver services by emailing HCBS.Waiver@maine.gov.`,
},
{
  id: 'me-rights',
  title: 'Maine: your legal rights as a person with an intellectual disability or autism',
  citation: 'Maine Revised Statutes Title 34-B, Section 5605 (Rights and basic protections of a person with an intellectual disability, autism or an acquired brain injury)',
  text: `Maine has a law, Title 34-B Section 5605, that lists your rights if you have an intellectual disability, autism, or an acquired brain injury. You have the right to dignity, privacy, and humane treatment, and to practice your religion freely. You cannot be punished with corporal punishment, seclusion, or language meant to humiliate or degrade you, and you are protected from unnecessary physical restraints. You have the right to send and receive sealed mail without anyone reading or holding it, to have visitors during reasonable hours, and to use the phone or internet to stay connected. You have the right to prompt medical and dental care, nutritious food, and to give informed consent before any experimental treatment. You keep the right to vote, to keep your own clothes and belongings, and to be fairly paid if you work. This law was significantly updated effective April 1, 2026, so ask OADS or Disability Rights Maine for the most current version.`,
},
{
  id: 'me-service-plan',
  title: 'Maine: your service plan (the Person-Centered Service Plan)',
  citation: 'MaineCare Benefits Manual Section 21 Personal Plan requirements (Code of Maine Rules 144-101 II 21.04); OADS person-centered planning standards',
  text: `In Maine, your plan under the Section 21 or Section 29 waiver is called a Person-Centered Service Plan. Your Case Manager works with you and the people you choose to build a plan based on your own goals, needs, and preferences, not a generic template. Your plan must be reviewed, revised, and updated at least once a year, based on the date your plan took effect. It can also be updated any time you or your guardian asks, or when something important changes, like your physical, social, behavioral, medical, or communication needs, or when you have made real progress toward a goal. This means you always have a say in adjusting your plan, not just once a year.`,
},
{
  id: 'me-appeals',
  title: 'Maine: how to appeal if services are denied or cut',
  citation: 'MaineCare Division of Administrative Hearings fair hearing process',
  text: `If Maine denies, reduces, or ends your MaineCare services, you have the right to a fair hearing through the DHHS Division of Administrative Hearings. In general, you need to appeal within 30 days of a denial, and if your services are being reduced or ended, you can ask for a hearing within 60 days of the date on your letter. Here is the important part: if you ask for the hearing within 10 to 15 days of the date on your letter, your current services can keep going while you wait for a decision, so act as quickly as you can and check your notice for the exact number of days you have. If you win your appeal, you should get back any benefits you missed. You can call 1-855-797-4357 to ask about starting an appeal, or contact your local DHHS office.`,
},
{
  id: 'me-complaints-pna',
  title: 'Maine: reporting problems and free advocacy help',
  citation: 'Maine Adult Protective Services 24-hour hotline 1-800-624-8404; Disability Rights Maine 1-800-452-1948',
  text: `If you or someone you know, age 18 or older, is being abused, neglected, or exploited, you can report it to Maine Adult Protective Services by calling 1-800-624-8404. This line is toll-free and open 24 hours a day, and you can call anonymously. If it is a life-threatening emergency, call 911 first. For free legal help protecting your rights, contact Disability Rights Maine, the state's official protection and advocacy organization, at 1-800-452-1948, which is also a TTY line, or their Augusta office at 207-626-2774. Reporting a problem or asking for help does not cost anything, and you will not get in trouble for speaking up.`,
},
  ], serviceCodes: [] },
}

// All US states + DC, for the state chooser. `covered` is derived from STATES.
export const US_STATES = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia',
  FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
  IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana',
  ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan',
  MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana',
  NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota',
  OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
  RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee',
  TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
}

// Resolve the content to ground an answer in for a given state code. Covered
// states get federal + their pack; uncovered states get the federal baseline
// only (the caller tells the model to refer out for state specifics).
export function getStateContent(code) {
  const key = String(code || '').toUpperCase()
  const st = STATES[key]
  return {
    code: key,
    name: (st && st.name) || US_STATES[key] || key,
    covered: !!st,
    chunks: st ? [...FEDERAL, ...st.chunks] : [...FEDERAL],
    serviceCodes: st ? st.serviceCodes : [],
  }
}
