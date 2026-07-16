// Per-state "where to start" + "get help" packs. California has a bespoke
// county->regional-center finder (see regionalCenters.js); every other state has
// its own entry-point system for I/DD HCBS. This is that equivalent, surfaced as
// a "Where to start" sheet + a richer "Get help" contacts card.
//
// Scope: all 50 states + DC except California (which keeps its bespoke finder).
// Every fact here was verified against an official state / Protection & Advocacy
// source in July 2026. Content is English, like the corpus chunks; the UI chrome
// around it is translated. When a state has no pack, the app falls back to the
// federal baseline + the national P&A finder (never invented specifics).
//
// A contact renders as name + desc + a tap-to-call number (or a link). Appeal
// windows are stated softly ("usually within N days") because the exact deadline
// can differ for managed-care denials; the person's own notice is the source of
// truth, and the federal fair-hearing guide covers the general right. Where a
// state's deadline is genuinely notice-dependent or sources conflict, the card
// says "check the deadline on your notice" instead of asserting a number.

export const STATE_GUIDE = {
  AL: {
    entry: {
      name: 'Local 310 Board / Support Coordination Agency',
      what: 'Alabama\'s community mental health centers, known as 310 Boards, are the local points of entry for developmental disability services, working under guidance from the Department of Mental Health\'s Office of Support Coordination. Your local support coordination agency handles intake, helps confirm your eligibility, and assigns you a Support Coordinator who helps you apply for and manage waiver services.',
      findUrl: 'https://mh.alabama.gov/providers-search/',
    },
    start: {
      text: 'Call the Division of Developmental Disabilities Call Center at 1-800-361-4491 to start the process. A specialist submits your initial application to your local support coordination agency within about two business days, and a Support Coordinator will contact you within about five business days to gather the paperwork needed to decide if you qualify, including a psychological evaluation. Once your application is complete, your name is placed on Alabama\'s waiting list for waiver services.',
      url: 'https://mh.alabama.gov/waiver-application-process/',
    },
    agency: { name: 'Alabama Department of Mental Health, Division of Developmental Disabilities', url: 'https://mh.alabama.gov/division-of-developmental-disabilities/' },
    waivers: 'Intellectual Disabilities (ID) Waiver, Living at Home (LAH) Waiver, and Community Waiver Program (CWP)',
    contacts: [
      { name: 'Alabama Disabilities Advocacy Program (ADAP)', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-826-1675' },
      { name: 'Alabama Adult Abuse Hotline', desc: 'Report abuse, neglect, or exploitation of an adult. Run by the Alabama Department of Human Resources; calls are confidential.', phone: '1-800-458-7214' },
      { name: 'DMH Division of Developmental Disabilities appeals', desc: 'Appeal a denial, reduction, or end of your IDD waiver services. In Alabama your written appeal usually must be received within 15 days of the effective date on your notice.', phone: '334-242-0409' },
      { name: 'DD Division Call Center', desc: 'Start an application for IDD waiver services or ask about your place on the waiting list.', phone: '1-800-361-4491' },
    ],
  },

  AK: {
    entry: {
      name: 'Developmental Disabilities Resource Connection (DDRC)',
      what: 'Your local DDRC office is Alaska\'s local point of entry for developmental disability services. DDRC staff help you complete the Developmental Disability Determination application and Medicaid paperwork, explain your care options, and connect you with the state Division of Senior and Disabilities Services (SDS), which runs the waivers. DDRC offices are organized by region across the state.',
      findUrl: 'https://health.alaska.gov/en/services/developmental-disabilities-resource-connection/',
    },
    start: {
      text: 'Complete a Developmental Disability Determination Application to see if you qualify. A DDRC representative near you can help with the paperwork, or call the Division of Senior and Disabilities Services at 907-269-3666 (toll-free 1-800-478-9996) with questions. If you are found eligible, your name is added to Alaska\'s DD Registry, also called the waitlist, and the state selects a limited number of people from the waitlist each year to apply for the IDD Waiver.',
      url: 'https://health.alaska.gov/en/services/developmental-disability-determination/',
    },
    agency: { name: 'Alaska Department of Health, Division of Senior and Disabilities Services (SDS)', url: 'https://health.alaska.gov/en/senior-and-disabilities-services/developmental-disabilities/' },
    waivers: 'IDD Waiver, Individualized Supports Waiver (ISW), and Alaskans with Physical and Developmental Disabilities (APDD) Waiver',
    contacts: [
      { name: 'Disability Law Center of Alaska', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-478-1234' },
      { name: 'Alaska Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of a vulnerable adult. Run by the Division of Senior and Disabilities Services; reports are confidential.', phone: '1-800-478-9996' },
      { name: 'Alaska Office of Administrative Hearings', desc: 'Request a fair hearing to appeal a denial, reduction, or end of services. In Alaska you usually have 30 days from the date on your notice, and services can often continue unchanged if you ask before the change takes effect.', phone: '907-269-8170' },
      { name: 'Division of Senior and Disabilities Services (SDS)', desc: 'Ask questions about applying for IDD waiver services or your place on the waitlist.', phone: '907-269-3666' },
    ],
  },

  AZ: {
    entry: {
      name: 'ALTCS office (Arizona Long Term Care System)',
      what: 'Arizona does not use local county offices the way many states do. Instead, you apply for long-term care through the Arizona Long Term Care System (ALTCS), run by AHCCCS, Arizona\'s Medicaid agency. If a developmental disability is part of your situation, ALTCS refers your case to the Division of Developmental Disabilities (DDD), part of the Department of Economic Security, which decides your DDD eligibility and, once you qualify, assigns you a Support Coordinator.',
      findUrl: 'https://www.azahcccs.gov/members/ALTCSlocations.html',
    },
    start: {
      text: 'Register an ALTCS application online through Health-e-Arizona Plus, or call 1-888-621-6880 to apply for ALTCS. Give your ALTCS worker your medical records and signed forms, and give your DDD worker a birth certificate, medical insurance card, and proof of Arizona residency. The two agencies work together, and your ALTCS application cannot be completed until DDD decides whether you qualify for their program.',
      url: 'https://www.azahcccs.gov/Members/GetCovered/apply.html',
    },
    agency: { name: 'Arizona Health Care Cost Containment System (AHCCCS) and Division of Developmental Disabilities (DDD)', url: 'https://www.azahcccs.gov/Members/GetCovered/Categories/DD-ALTCS.html' },
    waivers: 'Arizona Long Term Care System (ALTCS) for DDD members, under Arizona\'s Section 1115 Medicaid demonstration (not a standard 1915(c) waiver)',
    contacts: [
      { name: 'Disability Rights Arizona', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-927-2260' },
      { name: 'Arizona Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of an adult. Run by the Department of Economic Security.', phone: '1-877-767-2385' },
      { name: 'DDD Office of Administrative Review', desc: 'Appeal a Notice of Adverse Benefit Determination that denies, reduces, or ends your DDD services (choose option 3). In Arizona you usually have 60 days from the date of the notice.', phone: '1-844-770-9500' },
      { name: 'DDD general information line', desc: 'Ask questions about DDD eligibility or services.', phone: '1-844-770-9500' },
    ],
  },

  AR: {
    entry: {
      name: 'DDS Intake and Referral',
      what: 'Arkansas runs I/DD services through the Division of Developmental Disabilities Services (DDS) at the Department of Human Services. Rather than separate local offices, you start with DDS Intake and Referral, the statewide front door for the Community and Employment Supports (CES) waiver. Once you are enrolled, a support coordination provider in your area helps manage your services.',
      findUrl: 'https://humanservices.arkansas.gov/divisions-shared-services/developmental-disabilities-services/contact-dds/',
    },
    start: {
      text: 'Call DDS Intake and Referral at 501-683-5687 to ask about services and get on the CES waiver waiting list, since the waiver has a waitlist in most cases. A clinical review team looks at your medical records to decide whether you meet the waiver\'s level-of-care requirements, and eligible applicants move into waiver slots in the order they were added to the waiting list.',
      url: 'https://humanservices.arkansas.gov/divisions-shared-services/developmental-disabilities-services/ces-waiver/',
    },
    agency: { name: 'Arkansas Department of Human Services (DHS), Division of Developmental Disabilities Services (DDS)', url: 'https://humanservices.arkansas.gov/divisions-shared-services/developmental-disabilities-services/' },
    waivers: 'Community and Employment Supports (CES) waiver',
    contacts: [
      { name: 'Disability Rights Arkansas', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-482-1174' },
      { name: 'Arkansas Adult Maltreatment Hotline', desc: 'Report abuse, neglect, or exploitation of an adult. Run by the Department of Human Services, open 24 hours a day; you do not have to give your name.', phone: '1-800-482-8049' },
      { name: 'DHS Office of Appeals and Hearings', desc: 'Request a hearing to appeal a denial, reduction, or end of your Medicaid or DDS services. In Arkansas you usually have 30 days from the date on your notice.', url: 'humanservices.arkansas.gov/contact-us/file-an-appeal/' },
      { name: 'DDS Intake and Referral', desc: 'Start an application for CES waiver services or ask about your place on the waiting list.', phone: '501-683-5687' },
    ],
  },

  CO: {
    entry: {
      name: 'Case Management Agency (CMA)',
      what: 'Your Case Management Agency, sometimes still called a Community-Centered Board (CCB), is Colorado\'s local point of entry for I/DD Medicaid waivers. Since a July 2024 statewide redesign, one CMA covers your area no matter your age, disability, or which waiver you need. Your CMA completes your Developmental Disability Determination, opens a waiting-list record if one is needed, and provides case management once you are enrolled.',
      findUrl: 'https://hcpf.colorado.gov/case-management-agency-directory',
    },
    start: {
      text: 'Contact the Case Management Agency (CMA) that covers your county to start a Developmental Disability Determination and, if needed, join the HCBS-DD waiver waiting list. That waiver has two lists, called As Soon As Available and Safety Net, so ask your CMA which applies to you and join as early as you can. For general questions, you can also call the Health First Colorado Member Contact Center at 1-800-221-3943.',
      url: 'https://hcpf.colorado.gov/IDD-Services-enrollments-waitlists',
    },
    agency: { name: 'Colorado Department of Health Care Policy and Financing (HCPF)', url: 'https://hcpf.colorado.gov/hcbs-idd-manual' },
    waivers: 'Home and Community-Based Services for people with Developmental Disabilities (HCBS-DD) and Supported Living Services (SLS)',
    contacts: [
      { name: 'Disability Justice (formerly Disability Law Colorado)', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-288-1376' },
      { name: 'Colorado at-risk adult mistreatment hotline', desc: 'Report abuse, neglect, or exploitation of an at-risk adult. Calls are confidential and routed to the county where the person lives, 24 hours a day.', phone: '1-844-264-5437' },
      { name: 'Office of Administrative Courts, public benefits hearings', desc: 'Ask for a state fair hearing to appeal a denial, reduction, or end of your Health First Colorado (Medicaid) benefits. In Colorado you usually have 60 days from the date on your Notice of Action.', phone: '303-866-5626' },
      { name: 'Health First Colorado Member Contact Center', desc: 'Ask questions about your Health First Colorado (Medicaid) benefits or HCBS waiver services.', phone: '1-800-221-3943' },
    ],
  },

  CT: {
    entry: {
      name: 'DDS Regional Office (North, South, or West Region)',
      what: 'Connecticut splits intellectual and developmental disability services into three DDS regions: North, South, and West. Your regional DDS office is your local point of entry. It handles your eligibility application, decides if you qualify for DDS services, and later coordinates your waiver services and supports once you are enrolled. Each region also runs an Individual and Family Support Help Line for families who do not yet have a case manager.',
      findUrl: 'https://portal.ct.gov/dds/about/dds-regions',
    },
    start: {
      text: 'Call the statewide DDS Help Line at 1-866-737-0330 (or 860-418-6000), or contact your regional office directly, to start the eligibility process. You will need documentation showing your intellectual disability (or autism, if diagnosed after age three) began before age 18. Once DDS finds you eligible, your regional office works with you to apply for the Comprehensive Supports, Individual and Family Supports, or Employment and Day Supports waiver, whichever fits your needs.',
      url: 'https://portal.ct.gov/dds/knowledge-base/articles/how-to-apply-for-services',
    },
    agency: { name: 'Connecticut Department of Developmental Services (DDS)', url: 'https://portal.ct.gov/dds' },
    waivers: 'Comprehensive Supports Waiver, Individual and Family Supports (IFS) Waiver, and Employment and Day Supports Waiver',
    contacts: [
      { name: 'Disability Rights Connecticut', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-842-7303' },
      { name: 'DDS Abuse Investigation Division', desc: 'Report abuse or neglect of a person with an intellectual disability. Call 911 first if it is an emergency.', phone: '1-844-878-8923' },
      { name: 'DSS Office of Legal Counsel, Regulations and Administrative Hearings (OLCRAH)', desc: 'Request a Medicaid fair hearing to appeal a denial. In Connecticut you usually have 60 days from the date on your notice.', phone: '1-800-462-0134' },
      { name: 'DDS Help Line', desc: 'Get started with DDS eligibility, ask about your region, or find help without a case manager.', phone: '1-866-737-0330' },
    ],
  },

  DE: {
    entry: {
      name: 'DDDS Office of Applicant Services',
      what: 'Delaware runs I/DD services through a single statewide agency rather than county or regional offices. The Division of Developmental Disabilities Services (DDDS) Office of Applicant Services is your point of entry. It determines your eligibility for DDDS services and, once you qualify, assigns you a Support Coordinator, Community Navigator, or Family Resource Coordinator who helps you apply for the Lifespan Waiver.',
      findUrl: 'https://dhss.delaware.gov/ddds/contact/',
    },
    start: {
      text: 'Apply online (a link is on the DDDS Applicant Services page) or submit a paper application, available in English or Spanish, to DDDS Applicant Services. Call 302-744-9700 or 1-866-552-5758 (option 2) with questions. DDDS acknowledges your application within about 7 days and aims to decide eligibility within 30 days. If you are found eligible, your assigned case manager then helps you apply separately for HCBS Lifespan Waiver services.',
      url: 'https://dhss.delaware.gov/ddds/homepage/applicant-services/',
    },
    agency: { name: 'Delaware Division of Developmental Disabilities Services (DDDS)', url: 'https://dhss.delaware.gov/ddds/' },
    waivers: 'DDDS Lifespan Waiver',
    contacts: [
      { name: 'Disability Rights Delaware (CLASI)', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-292-7980' },
      { name: 'Delaware Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of an adult with a disability. You may report anonymously.', phone: '1-888-277-4302' },
      { name: 'Delaware Division of Medicaid and Medical Assistance (DMMA)', desc: 'Request a Medicaid fair hearing to appeal a denial. In Delaware you usually have 90 days from the date on your notice.', phone: '1-800-372-2022' },
      { name: 'DDDS Office of Applicant Services', desc: 'Ask about DDDS eligibility and the application process (choose option 2).', phone: '1-866-552-5758' },
    ],
  },

  DC: {
    entry: {
      name: 'Developmental Disabilities Administration (DDA) Intake',
      what: 'DC is a single city, so instead of separate local offices, one citywide team is your point of entry. The Developmental Disabilities Administration (DDA), part of the Department on Disability Services, runs an Intake and Eligibility Determination Unit that reviews your application and decides if you qualify for services. Once you are found eligible, DDA pairs you with a Service Coordinator who helps you enroll in a waiver and builds your Individual Support Plan.',
      findUrl: 'https://dds.dc.gov/page/eligibility-and-intake-process',
    },
    start: {
      text: 'Call the DDS/DDA Intake Unit at 202-730-1700 to schedule an appointment, or walk in at 250 E Street SW (Monday through Friday, 8:15 am to 4:45 pm). You will complete a person-centered \'Front Door Tool\' questionnaire and provide proof of DC residency, ID, and records showing your intellectual or developmental disability began before age 22. Once approved, your Service Coordinator helps you enroll in the IDD Waiver or the newer Individual and Family Support (IFS) Waiver, whichever fits your situation.',
      url: 'https://dds.dc.gov/service/how-apply-services',
    },
    agency: { name: 'DC Department on Disability Services (DDS)', url: 'https://dds.dc.gov/' },
    waivers: 'IDD Waiver and Individual and Family Support (IFS) Waiver',
    contacts: [
      { name: 'Disability Rights DC at University Legal Services', desc: 'Free legal help and advocacy for people with disabilities (DC\'s Protection & Advocacy agency).', phone: '202-547-0198' },
      { name: 'DC Adult Protective Services Hotline', desc: 'Report abuse, neglect, or exploitation. Run by the Department of Aging and Community Living, open 24 hours a day.', phone: '202-541-3950' },
      { name: 'DC Office of Administrative Hearings', desc: 'Request a Medicaid fair hearing to appeal a denial. In DC you usually have 90 days from the postmark on your notice.', phone: '202-442-9094' },
      { name: 'DDS/DDA Intake Unit', desc: 'Start the eligibility and intake process for DC developmental disability services.', phone: '202-730-1700' },
    ],
  },

  FL: {
    entry: {
      name: 'APD regional office + Waiver Support Coordinator',
      what: 'In Florida the Agency for Persons with Disabilities (APD) is the entry point. You apply through the APD regional office serving your county; APD decides eligibility and places you on the waitlist by priority. Once you are enrolled on the iBudget waiver, you choose a Waiver Support Coordinator (WSC) who plans and coordinates your services, much like a California regional center.',
      findUrl: 'https://apd.myflorida.com/region/',
    },
    start: {
      text: 'Apply for APD services online or through your local APD regional office, and send in your diagnosis documents. If you are found eligible you are placed in pre-enrollment (the waitlist) by priority category. The statewide APD line is 1-866-273-2273 (1-866-APD-CARES).',
      url: 'https://apd.myflorida.com/services/apply.htm',
    },
    agency: { name: 'Agency for Persons with Disabilities (APD)', url: 'https://apd.myflorida.com/' },
    waivers: 'iBudget Florida (the state I/DD HCBS waiver, run by APD under the AHCA Medicaid agency)',
    contacts: [
      { name: 'Disability Rights Florida', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-342-0823' },
      { name: 'Florida Abuse Hotline', desc: 'Report abuse, neglect, or exploitation. Run by DCF, open 24 hours a day.', phone: '1-800-962-2873' },
      { name: 'DCF Office of Appeal Hearings', desc: 'Request a Medicaid fair hearing to appeal a denial. In Florida you usually have 90 days from the date on your notice.', phone: '1-850-488-1429' },
      { name: 'APD (1-866-APD-CARES)', desc: 'Apply for services, ask about eligibility, or find your regional office.', phone: '1-866-273-2273' },
    ],
  },

  GA: {
    entry: {
      name: 'DBHDD Regional Field Office',
      what: 'Georgia\'s Department of Behavioral Health and Developmental Disabilities (DBHDD) runs six regional field offices that serve as your local point of contact for I/DD services. Your regional office takes applications for the NOW and COMP waivers, screens for eligibility, and connects you with a support coordinator once you are enrolled.',
      findUrl: 'https://dbhdd.georgia.gov/find-location/regional-field-office',
    },
    start: {
      text: 'Apply online through the Georgia Collaborative ASO\'s IDD Connects portal, in person at your regional DBHDD field office, or by mail, whichever is easiest for you. Online applications are processed fastest, and you can expect a screening assessment to be scheduled within about 14 business days. You can also call DBHDD at 404-657-2252 with questions. Once you are found eligible, you are placed on the NOW or COMP waiver interest list based on your needs.',
      url: 'https://georgia.gov/apply-new-option-waiver-program-now-and-comprehensive-support-waiver-program-comp',
    },
    agency: { name: 'Georgia Department of Behavioral Health and Developmental Disabilities (DBHDD)', url: 'https://dbhdd.georgia.gov/' },
    waivers: 'New Options Waiver (NOW) and Comprehensive Supports Waiver (COMP)',
    contacts: [
      { name: 'Georgia Advocacy Office', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-537-2329' },
      { name: 'Georgia Adult Protective Services', desc: 'Call and press 3 to report abuse, neglect, or exploitation of an adult with a disability.', phone: '1-866-552-4464' },
      { name: 'Georgia Office of State Administrative Hearings', desc: 'Request a Medicaid fair hearing to appeal a denial. In Georgia you usually have 30 days from the date on your notice.', phone: '1-877-809-0007' },
      { name: 'DBHDD Main Line', desc: 'General information line for Georgia\'s behavioral health and developmental disability services.', phone: '404-657-2252' },
    ],
  },

  HI: {
    entry: {
      name: 'DDD District/Branch Office',
      what: 'Hawaii\'s Developmental Disabilities Division (DDD) operates district and branch offices across the islands, including Oahu, Kauai, Maui, Lanai, Molokai, and East and West Hawaii Island. Your district office handles intake and eligibility determination for DDD services, and once you qualify, assigns you a case manager who helps you apply for the Medicaid I/DD Waiver.',
      findUrl: 'https://health.hawaii.gov/ddd/about/contact/',
    },
    start: {
      text: 'Call your island\'s DDD district office to start intake: Oahu is 808-733-1689, or neighbor island callers can try the toll-free line at 1-833-333-5133 (find your exact island\'s number on the DDD contact page). Being found eligible for DDD services does not automatically enroll you in the Medicaid I/DD Waiver. Once you qualify for DDD, your case manager helps you apply for the waiver as a second step, which also requires Medicaid eligibility through Med-QUEST.',
      url: 'https://health.hawaii.gov/ddd/participants-families/apply/',
    },
    agency: { name: 'Hawaii Department of Health, Developmental Disabilities Division (DDD)', url: 'https://health.hawaii.gov/ddd/' },
    waivers: 'Medicaid I/DD Waiver',
    contacts: [
      { name: 'Hawaii Disability Rights Center', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-882-1057' },
      { name: 'Hawaii Adult Protective Services', desc: 'Report abuse, neglect, or financial exploitation of a vulnerable adult. The phone number depends on your island; this is the Oahu line, or you can report online.', phone: '808-832-5115', url: 'apsreport.hawaii.gov' },
      { name: 'Hawaii DDD Informal Review / DHS Administrative Hearing', desc: 'Ask for an informal DDD review or a formal Medicaid fair hearing to appeal a denial. For Medicaid waiver participants, you usually have 90 days from the date on your notice for the formal hearing (or 15 working days for an informal DDD review).', url: 'health.hawaii.gov/ddd/participants-families/informal-review-administrative-hearing/' },
      { name: 'DDD Administrative Office', desc: 'General information line for Hawaii\'s Developmental Disabilities Division.', phone: '808-586-5840' },
    ],
  },

  ID: {
    entry: {
      name: 'IDHW Regional Office (Developmental Disabilities Program)',
      what: 'Idaho Health and Welfare handles developmental disability intake through 7 regional offices that cover the state by county. You submit your DD application to the office serving your county, and an independent assessment provider then contacts you to schedule your eligibility assessment. Once you are enrolled, a plan developer (service coordinator) helps you build your Plan of Service.',
      findUrl: 'https://healthandwelfare.idaho.gov/offices',
    },
    start: {
      text: 'First apply for Medicaid for Home and Community Based Services. Then choose a DD service option (DD Waiver: Self-Directed Community Supports, DD Waiver: Traditional, or State Plan Services) and submit your DD application to the regional office serving your county - for example, 208-334-0940 covers the Boise/Southwest region. Idaho\'s 211 CareLine, 1-800-926-2588, can also help connect you to the right office. An independent assessment provider will then contact you to schedule your eligibility assessment.',
      url: 'https://healthandwelfare.idaho.gov/services-programs/medicaid-health/apply-adult-developmental-disabilities-programs',
    },
    agency: { name: 'Idaho Department of Health and Welfare (IDHW)', url: 'https://healthandwelfare.idaho.gov/services-programs/medicaid-health/services-adults-developmental-disabilities' },
    waivers: 'Developmental Disabilities (DD) Waiver (Traditional or Self-Directed Community Supports options)',
    contacts: [
      { name: 'DisAbility Rights Idaho', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-866-262-3462' },
      { name: 'Idaho Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of an adult. Run by the Idaho Commission on Aging.', phone: '1-877-471-2777' },
      { name: 'Idaho Appeals and Fair Hearings', desc: 'Ask for a fair hearing to appeal a denial. In Idaho you usually have 28 days from the date on your notice.', phone: '1-877-456-1233' },
      { name: 'Idaho DD Regional Offices', desc: 'Find the developmental disabilities office phone number for your region to ask questions or start an application.', url: 'healthandwelfare.idaho.gov/services-programs/medicaid-health/apply-adult-developmental-disabilities-programs' },
    ],
  },

  IL: {
    entry: {
      name: 'Independent Service Coordination (ISC) agency',
      what: 'In Illinois your local Independent Service Coordination (ISC) agency is the entry point. The ISC does your PUNS registration (the state waiting-list database), screens eligibility (the PAS process), and links you to services. There is an ISC agency assigned to every part of the state.',
      findUrl: 'https://www.dhs.state.il.us/page.aspx?item=68911',
    },
    start: {
      text: 'Contact your local ISC agency and ask to be added to PUNS (Prioritization of Urgency of Need for Services), the state waiting-list database. You meet with a screener to complete the PUNS form. To find your ISC agency, call the Division of Developmental Disabilities helpline at 1-888-337-5267 (1-888-DD-PLANS).',
      url: 'https://www.dhs.state.il.us/page.aspx?item=41131',
    },
    agency: { name: 'IDHS Division of Developmental Disabilities (DDD)', url: 'https://www.dhs.state.il.us/page.aspx?item=32253' },
    waivers: 'Adults with Developmental Disabilities Waiver (plus children\'s waivers), run by IDHS with HFS as the Medicaid agency',
    contacts: [
      { name: 'Equip for Equality', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-537-2632' },
      { name: 'IDHS OIG hotline', desc: 'Report abuse or neglect in a program that serves people with disabilities. Open 24 hours a day.', phone: '1-800-368-1463' },
      { name: 'Medicaid fair hearings', desc: 'Ask for a Medicaid fair hearing to appeal a denial. In Illinois you usually have 60 days from the date on your notice.', phone: '1-800-435-0774' },
      { name: 'DD helpline (1-888-DD-PLANS)', desc: 'Find your local ISC agency or get started with PUNS.', phone: '1-888-337-5267' },
    ],
  },

  IN: {
    entry: {
      name: 'Bureau of Disabilities Services (BDS) District Office',
      what: 'Your BDS District Office is the local point of entry for developmental disability services in Indiana. Eight district offices cover the state. A district office handles intake, helps determine your eligibility, and connects you to the Family Supports Waiver or Community Integration and Habilitation (CIH) waiver, along with ongoing case management.',
      findUrl: 'https://www.in.gov/fssa/ddars/bds/bureau-of-disabilities-services',
    },
    start: {
      text: 'Apply online through the BDS Gateway at bddsgateway.fssa.in.gov, or complete State Form 55068 and return it to your local BDS District Office by fax, mail, or in person. You can also call the Bureau of Disabilities Services at 1-800-545-7763 with questions. You must also separately apply for Medicaid.',
      url: 'https://www.in.gov/fssa/ddars/bds/medicaid-hcbs-waivers/',
    },
    agency: { name: 'Indiana FSSA, Division of Disability, Aging and Rehabilitative Services (DDARS), Bureau of Disabilities Services (BDS)', url: 'https://www.in.gov/fssa/ddars/bds/' },
    waivers: 'Community Integration and Habilitation (CIH) Waiver and Family Supports Waiver (FSW)',
    contacts: [
      { name: 'Indiana Disability Rights', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-622-4845' },
      { name: 'Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of an adult, open 24 hours a day.', phone: '1-800-992-6978' },
      { name: 'FSSA Office of Administrative Law Proceedings', desc: 'Ask for an appeal to challenge a denial, reduction, or termination of services. Check the deadline printed on your notice.', phone: '1-866-259-3573' },
      { name: 'Bureau of Disabilities Services (BDS)', desc: 'Ask questions about developmental disability waiver services and eligibility.', phone: '1-800-545-7763' },
    ],
  },

  IA: {
    entry: {
      name: 'Iowa HHS Service Area Office',
      what: 'Your local Iowa HHS office takes your application for Medicaid and the HCBS Intellectual Disability (ID) Waiver, in person or by phone. Once you are approved for the ID Waiver, you are assigned an ongoing case manager - either through Iowa HHS Targeted Case Management or through your Medicaid managed care plan - who coordinates your services and checks in with you regularly.',
      findUrl: 'https://hhs.iowa.gov/hhs-office-locations',
    },
    start: {
      text: 'Apply for Medicaid and the HCBS Intellectual Disability Waiver online through the Iowa HHS Services Portal, in person at a local HHS office, by mail, or by calling 1-855-889-7985. For help or questions, call Iowa Medicaid Member Services at 1-800-338-8366. You will need to be found financially eligible for Medicaid and meet the level-of-care requirement for the waiver.',
      url: 'https://hhs.iowa.gov/medicaid/apply-medicaid',
    },
    agency: { name: 'Iowa Department of Health and Human Services (HHS)', url: 'https://hhs.iowa.gov/medicaid/services-care/home-and-community-based-services/waiver-programs' },
    waivers: 'HCBS Intellectual Disability (ID) Waiver',
    contacts: [
      { name: 'Disability Rights Iowa', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-779-2502' },
      { name: 'Dependent Adult Abuse Hotline', desc: 'Report abuse, neglect, or financial exploitation of a dependent adult. Run by Iowa HHS, available 24 hours a day.', phone: '1-800-362-2178' },
      { name: 'Iowa HHS Appeals', desc: 'Ask for a State Fair Hearing to appeal a denial. In Iowa you usually have 90 days from the date on your notice.', phone: '1-888-723-9637' },
      { name: 'Iowa Medicaid Member Services', desc: 'Ask questions about Medicaid or HCBS waiver eligibility and applications.', phone: '1-800-338-8366' },
    ],
  },

  KS: {
    entry: {
      name: 'Community Developmental Disability Organization (CDDO)',
      what: 'Your CDDO is the single local point of entry into the developmental disability service system in Kansas. Kansas has 27 CDDOs covering the state by county. A CDDO determines your eligibility for I/DD services, helps you choose from available community service providers, and refers you to other supports you may need.',
      findUrl: 'https://www.kdads.ks.gov/services-programs/long-term-services-supports/home-and-community-based-services-hcbs/waiver-programs/intellectual-developmentally-disabled-i-dd/',
    },
    start: {
      text: 'Contact your local CDDO to apply for the Intellectual/Developmental Disability (I/DD) Waiver. Your CDDO checks whether you meet the eligibility requirements (financial eligibility for Medicaid, plus a qualifying intellectual or developmental disability) and helps you get on the waiver waiting list, which has historically run several years long. A new Community Support Waiver (CSW), for people who do not need round-the-clock support, was approved by the federal government in 2026 and is set to start October 1, 2026 - ask your CDDO whether it fits your situation. For general questions, call KDADS at 1-800-432-3535.',
      url: 'https://www.kdads.ks.gov/services-programs/long-term-services-supports/home-and-community-based-services-hcbs/waiver-programs/intellectual-developmentally-disabled-i-dd/',
    },
    agency: { name: 'Kansas Department for Aging and Disability Services (KDADS)', url: 'https://www.kdads.ks.gov/' },
    waivers: 'Intellectual/Developmental Disability (I/DD) Waiver, coordinated through KanCare managed care; Community Support Waiver (CSW) starting October 1, 2026',
    contacts: [
      { name: 'Disability Rights Center of Kansas', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-877-776-1541' },
      { name: 'Kansas Protection Report Center', desc: 'Report abuse, neglect, or exploitation. Run by the Department for Children and Families, staffed 24 hours a day.', phone: '1-800-922-5330' },
      { name: 'Kansas Office of Administrative Hearings', desc: 'Ask for a state fair hearing to appeal a KanCare denial, after your managed care plan\'s own appeal. In Kansas you usually have 123 days from the date of your plan\'s appeal decision.', phone: '785-296-2433' },
      { name: 'KDADS', desc: 'Ask questions about I/DD waiver services and eligibility in Kansas.', phone: '1-800-432-3535' },
    ],
  },

  KY: {
    entry: {
      name: 'Aging and Disability Resource Center (ADRC) or Community Mental Health Center (CMHC)',
      what: 'You can start in person at your regional Aging and Disability Resource Center or at a Community Mental Health Center. Either one can help you apply for the Michelle P. Waiver or Supports for Community Living (SCL) Waiver and will refer you for the psychological and adaptive-behavior evaluation Kentucky requires to determine intellectual disability eligibility.',
      findUrl: 'https://www.chfs.ky.gov/agencies/dail/Pages/adrc.aspx',
    },
    start: {
      text: 'First get determined financially eligible for Medicaid through kynect.ky.gov or by calling the Department for Community Based Services at 1-855-306-8959. Then apply for the Michelle P. Waiver or SCL Waiver online at kynect.ky.gov or in person at your Aging and Disability Resource Center (1-877-925-0037) or Community Mental Health Center. For program questions, call the Department for Behavioral Health, Development and Intellectual Disabilities at 502-564-7700. Kentucky has a waiting list for the Michelle P. Waiver, and your place in line is based on your application date, so apply as early as you can.',
      url: 'https://www.chfs.ky.gov/agencies/dms/dca/Pages/mpw.aspx',
    },
    agency: { name: 'Kentucky Cabinet for Health and Family Services - Department for Medicaid Services (DMS) and Department for Behavioral Health, Development and Intellectual Disabilities (DBHDID)', url: 'https://dbhdid.ky.gov/' },
    waivers: 'Michelle P. Waiver (MPW) and Supports for Community Living (SCL) Waiver',
    contacts: [
      { name: 'Kentucky Protection & Advocacy', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-372-2988' },
      { name: 'Kentucky Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of an adult.', phone: '1-877-597-2331' },
      { name: 'Kentucky Medicaid fair hearings', desc: 'Ask for a fair hearing to appeal a denial. Check the deadline printed on your notice.', phone: '1-800-635-2570' },
      { name: 'DBHDID Developmental & Intellectual Disabilities', desc: 'Ask questions about the Michelle P. Waiver, SCL Waiver, and eligibility.', phone: '502-564-7700' },
    ],
  },

  LA: {
    entry: {
      name: 'Local Governing Entity (LGE)',
      what: 'Your Local Governing Entity, or LGE, is the local point of entry into developmental disability services in Louisiana. Ten LGEs, also called human services districts or authorities, cover the state by parish. Your LGE handles your application and eligibility determination, and if you qualify, places your name on the Request for Services Registry, the waiting list Louisiana uses to offer waiver openings as they become available. Once you are enrolled in a waiver, you choose a private Support Coordination agency to help manage your services day to day.',
      findUrl: 'https://ldh.la.gov/page/local-governing-entities',
    },
    start: {
      text: 'Contact the Local Governing Entity (LGE) that covers your parish and ask to apply for developmental disability services. They will schedule an eligibility determination and, if you qualify, add your name to the Request for Services Registry, the waiting list Louisiana uses for waiver openings. Your place in line depends on your assessed urgency of need, not only on how long you have waited. If you are not sure which LGE covers your area, call the state office, OIDD (formerly OCDD), at 225-342-0095, or toll-free at 1-866-783-5553.',
      url: 'https://ldh.la.gov/office-for-citizens-with-developmental-disabilities/information-for-individuals-and-families',
    },
    agency: { name: 'Louisiana Department of Health (LDH), Office of Intellectual and Developmental Disability Supports (OIDD, formerly OCDD)', url: 'https://ldh.la.gov/office-for-citizens-with-developmental-disabilities' },
    waivers: 'New Opportunities Waiver (NOW), Supports Waiver, Children\'s Choice Waiver (CCW), and Residential Options Waiver (ROW)',
    contacts: [
      { name: 'Disability Rights Louisiana', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-960-7705' },
      { name: 'Louisiana Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of an adult age 18 to 59, open 24 hours a day. If the person is 60 or older, call Elderly Protective Services instead at 1-833-577-6532.', phone: '1-800-898-4910' },
      { name: 'Louisiana Medicaid Fair Hearings', desc: 'Request a Medicaid fair hearing to appeal a denial. In Louisiana you usually have 30 days from the date on your notice.', phone: '225-342-5800' },
      { name: 'OIDD (formerly OCDD)', desc: 'The state office for developmental disability services. Call if you are not sure which Local Governing Entity covers your area, or have general questions about waivers.', phone: '1-866-783-5553' },
    ],
  },

  ME: {
    entry: {
      name: 'Case Management Agency (Developmental Services)',
      what: 'Ongoing local support for adults with intellectual disability or autism in Maine comes from a Case Management agency. Maine has many approved case management agencies across its counties, and OADS keeps an official directory so you can find ones near you. You are connected to a Case Management agency after OADS Developmental Services decides you are eligible. Your case manager then helps build your Person-Centered Plan, connects you to services, and helps you access a waiver like Section 21 or Section 29.',
      findUrl: 'https://www.maine.gov/dhhs/oads/providers/provider-directory/case-management',
    },
    start: {
      text: 'Start by contacting OADS Developmental Services intake. Call the OADS main line at 1-800-262-2232 (or 207-287-9200) and ask about applying for Adult Developmental Services, or email DSIntake.OADS@maine.gov. If you are not already on MaineCare, you will also need to apply for that. You will fill out an intake application and provide an evaluation showing your intellectual disability or autism diagnosis. If you are found eligible, OADS will connect you with a Case Management agency to help you access the Section 21 or Section 29 waiver.',
      url: 'https://www.maine.gov/dhhs/oads/get-support/adults-intellectual-disability-and-autism/intake-and-eligibility',
    },
    agency: { name: 'Maine Department of Health and Human Services (DHHS), Office of Aging and Disability Services (OADS)', url: 'https://www.maine.gov/dhhs/oads/get-support/adults-intellectual-disability-and-autism/waiver-services' },
    waivers: 'Section 21 (Home and Community Benefits for Members with Intellectual Disabilities or Autism Spectrum Disorder) and Section 29 (Support Services for Adults with Intellectual Disabilities or Autism Spectrum Disorder)',
    contacts: [
      { name: 'Disability Rights Maine', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-452-1948' },
      { name: 'Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of an adult. Run by Maine DHHS, open 24 hours a day.', phone: '1-800-624-8404' },
      { name: 'MaineCare Member Services (fair hearings)', desc: 'Request a Medicaid fair hearing to appeal a denial, reduction, or termination of services. In Maine you usually have 60 days from the date on your notice.', phone: '1-800-977-6740' },
      { name: 'OADS (Office of Aging and Disability Services)', desc: 'Call with questions about applying for Developmental Services or the Section 21 / Section 29 waiver.', phone: '1-800-262-2232' },
    ],
  },

  MD: {
    entry: {
      name: 'DDA Regional Office',
      what: 'Your DDA Regional Office is the local point of entry for intellectual and developmental disability services in Maryland. DDA divides the state into four regions, Central, Eastern Shore, Southern, and Western Maryland, each with its own regional office. Your regional office\'s Eligibility Team reviews your application, decides whether you qualify for DDA services, and assigns you a Coordinator of Community Services (CCS), a caseworker who helps you enroll in and stay connected to the Community Pathways waiver.',
      findUrl: 'https://health.maryland.gov/dda/Pages/Regional%20Offices.aspx',
    },
    start: {
      text: 'Contact the DDA regional office that covers your county and ask for the DDA Application for Eligibility, or download it from DDA\'s website in English, Spanish, or Arabic. If you are not sure which office to call, DDA\'s main office can direct you at 410-767-5600, or toll-free at 1-844-253-8694. A DDA representative will contact you to schedule an interview, and once you are found eligible you will work with a Coordinator of Community Services (CCS) to enroll in the Community Pathways waiver.',
      url: 'https://health.maryland.gov/dda/Pages/eligibility.aspx',
    },
    agency: { name: 'Maryland Department of Health, Developmental Disabilities Administration (DDA)', url: 'https://health.maryland.gov/dda/Pages/home.aspx' },
    waivers: 'Community Pathways Waiver (CPW)',
    contacts: [
      { name: 'Disability Rights Maryland', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-233-7201' },
      { name: 'Maryland Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of an adult with a disability. Run by the Maryland Department of Human Services, or contact your local Department of Social Services.', phone: '1-800-917-7383' },
      { name: 'Maryland Medicaid Fair Hearings (Office of Administrative Hearings)', desc: 'Request a Medicaid fair hearing to appeal a denial. In Maryland you usually have 90 days from the date on your notice.', phone: '410-229-4100', url: 'health.maryland.gov/mmcp/Pages/medicaid-appeal.aspx' },
      { name: 'Maryland DDA (Developmental Disabilities Administration)', desc: 'General information about DDA services and the Community Pathways waiver. Call if you are not sure where to start.', phone: '1-844-253-8694' },
    ],
  },

  MA: {
    entry: {
      name: 'DDS Area Office',
      what: 'Your DDS Area Office is the local point of entry for intellectual and developmental disability services in Massachusetts. DDS operates Area Offices across the state, in addition to its Central Office in Boston. Your Area Office provides information and referral, service coordination, service planning, and complaint resolution, and connects you to the Regional Eligibility Team that decides whether you qualify for DDS services. It is usually the first place to call if you are not sure where to start.',
      findUrl: 'https://www.mass.gov/orgs/department-of-developmental-services/locations',
    },
    start: {
      text: 'Contact your local DDS Area Office and ask to apply for DDS eligibility. You can file the application starting at age 17 and a half, though DDS adult services begin at age 22. Once DDS receives your complete application, a member of the Regional Eligibility Team will contact you to schedule a face-to-face meeting. If you are not sure which office serves you, DDS Central Office can help at 617-727-5608.',
      url: 'https://www.mass.gov/dds-eligibility-services',
    },
    agency: { name: 'Massachusetts Department of Developmental Services (DDS)', url: 'https://www.mass.gov/orgs/department-of-developmental-services' },
    waivers: 'Adult Supports Waiver, Community Living Waiver, and Intensive Supports Waiver',
    contacts: [
      { name: 'Disability Law Center', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-872-9992' },
      { name: 'Disabled Persons Protection Commission (DPPC)', desc: 'Report abuse, neglect, or exploitation of an adult with a disability by a caregiver. Open 24 hours a day.', phone: '1-800-426-9009' },
      { name: 'MassHealth Board of Hearings', desc: 'Request a Medicaid fair hearing to appeal a denial. In Massachusetts you usually have 60 days from the date on your notice.', phone: '1-800-655-0338', url: 'www.mass.gov/how-to/how-to-appeal-a-masshealth-decision' },
      { name: 'DDS (Department of Developmental Services)', desc: 'General information about DDS services and finding your local Area Office.', phone: '617-727-5608' },
    ],
  },

  MI: {
    entry: {
      name: 'Community Mental Health Services Program (CMHSP)',
      what: 'Your county Community Mental Health Services Program (CMHSP) is the local point of entry for intellectual and developmental disability services in Michigan. The state describes CMHSPs as the single point of entry into the public mental health system, and together they cover all 83 Michigan counties (some CMHSPs serve more than one county). Your CMHSP handles intake, connects you to the Habilitation Supports Waiver (HSW) or other HCBS waivers, and coordinates services through your local Prepaid Inpatient Health Plan (PIHP) network once you are enrolled.',
      findUrl: 'https://www.michigan.gov/mdhhs/keep-mi-healthy/mentalhealth/mentalhealth/cmhsp/local-mental-health-services',
    },
    start: {
      text: 'Contact your county Community Mental Health Services Program (CMHSP) and ask about the Habilitation Supports Waiver (HSW). CMHSPs are the single point of entry into the public mental health system in Michigan, and each county is covered by one. Use the state CMHSP directory to find the phone number for your local program, since there is no single statewide HSW intake line. If you are not sure who to call, MDHHS Medicaid behavioral health customer service at 1-844-275-6324 can help point you in the right direction.',
      url: 'https://www.michigan.gov/mdhhs/keep-mi-healthy/mentalhealth/mentalhealth/medwaivers/habilitation-supports-waiver',
    },
    agency: { name: 'Michigan Department of Health and Human Services (MDHHS)', url: 'https://www.michigan.gov/mdhhs/keep-mi-healthy/mentalhealth' },
    waivers: 'Habilitation Supports Waiver (HSW), plus the Children\'s Waiver Program (CWP) and Serious Emotional Disturbance Waiver (SEDW) for children',
    contacts: [
      { name: 'Disability Rights Michigan', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-288-5923' },
      { name: 'Michigan Adult Protective Services (APS)', desc: 'Report abuse, neglect, or exploitation of a vulnerable adult. Run by MDHHS, open 24 hours a day.', phone: '1-855-444-3911' },
      { name: 'Michigan Office of Administrative Hearings and Rules (MOAHR)', desc: 'Request a Medicaid fair hearing to appeal a denial. In Michigan you usually need to finish an internal appeal with your CMHSP or PIHP first, then check the deadline printed on your notice.', phone: '1-800-648-3397', url: 'www.michigan.gov/mdhhs/assistance-programs/medicaid/hearings' },
      { name: 'MDHHS Behavioral Health and Developmental Disability Customer Services', desc: 'General information line for Michigan Medicaid mental health and developmental disability services, run by MDHHS.', phone: '1-844-275-6324' },
    ],
  },

  MN: {
    entry: {
      name: 'County or Tribal Lead Agency',
      what: 'In Minnesota, your county or Tribal social services agency, called your lead agency, is the local point of entry for home and community-based disability services. Lead agency staff complete your MnCHOICES assessment, decide your eligibility for waiver programs, and assign a case manager who helps coordinate your services once you are enrolled. If you are not sure which office to contact, Disability Hub MN is a free statewide help line that can point you to the right county or Tribal agency.',
      findUrl: 'https://mn.gov/dhs/about-us/contact-us/county-and-tribal-nation-offices/',
    },
    start: {
      text: 'Contact your county or Tribal social services agency (your lead agency) and ask for a MnCHOICES assessment for home and community-based waiver services; this assessment decides your eligibility for the Developmental Disabilities (DD) or Community Access for Disability Inclusion (CADI) waiver. If you are not sure how to reach your county or Tribal agency, call Disability Hub MN, a free statewide help line, at 1-866-333-2466.',
      url: 'https://mn.gov/dhs/people-we-serve/people-with-disabilities/services/home-community/programs-and-services/hcbs-waivers.jsp',
    },
    agency: { name: 'Minnesota Department of Human Services (DHS)', url: 'https://mn.gov/dhs/people-we-serve/people-with-disabilities/index.jsp' },
    waivers: 'Developmental Disabilities (DD) waiver and Community Access for Disability Inclusion (CADI) waiver',
    contacts: [
      { name: 'Minnesota Disability Law Center', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-292-4150' },
      { name: 'Minnesota Adult Abuse Reporting Center (MAARC)', desc: 'Report suspected abuse, neglect, or financial exploitation of a vulnerable adult. Your identity as the reporter stays confidential.', phone: '1-844-880-1574' },
      { name: 'DHS Appeals Division', desc: 'Ask for a Medicaid fair hearing to appeal a denial. In Minnesota you usually have 30 days from the date on your notice, or up to 90 days if you can show good cause for the delay.', phone: '1-800-657-3510' },
      { name: 'Disability Hub MN', desc: 'Free statewide help line for finding your county or Tribal lead agency and navigating disability services.', phone: '1-866-333-2466' },
    ],
  },

  MS: {
    entry: {
      name: 'ID/DD Regional Center',
      what: 'Mississippi\'s five ID/DD Regional Centers, run by the Department of Mental Health, are the local starting point for intellectual and developmental disability services. You contact the regional center serving your area to arrange an evaluation, and if you qualify, you are assigned a support coordinator who helps you access the ID/DD Waiver, the Community Support Program, and other services near home.',
      findUrl: 'https://www.dmh.ms.gov/whoweare/idd-programs/',
    },
    start: {
      text: 'Call the Mississippi Department of Mental Health Helpline at 1-877-210-8513, open 24 hours a day, and ask to be connected with the ID/DD Regional Center that serves your area, or contact that regional center directly to schedule an evaluation. If you are found eligible, you get a support coordinator and your name is placed on the waiver planning list; you must also separately qualify for Medicaid before you can be enrolled from that list.',
      url: 'https://www.dmh.ms.gov/service-options/idd-services/',
    },
    agency: { name: 'Mississippi Department of Mental Health (DMH), Bureau of Intellectual and Developmental Disabilities', url: 'https://www.dmh.ms.gov/service-options/idd-services/' },
    waivers: 'Intellectual Disabilities/Developmental Disabilities (ID/DD) Waiver',
    contacts: [
      { name: 'Disability Rights Mississippi', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-772-4057' },
      { name: 'Mississippi Vulnerable Person Abuse Hotline', desc: 'Report abuse, neglect, or exploitation of a vulnerable adult. Run by the Mississippi Department of Human Services.', phone: '1-844-437-6282' },
      { name: 'Division of Medicaid, Office of Eligibility', desc: 'Ask for a Medicaid fair hearing to appeal a denial. In Mississippi you usually have 30 days from the date on your notice.', phone: '1-800-421-2408' },
      { name: 'DMH Helpline', desc: 'Information and referral for mental health and IDD services statewide, open 24 hours a day.', phone: '1-877-210-8513' },
    ],
  },

  MO: {
    entry: {
      name: 'DD Regional Office',
      what: 'Missouri\'s Department of Mental Health, Division of Developmental Disabilities, divides the state into Regional Offices that serve as your local point of entry. Your Regional Office handles intake and eligibility determination and assigns you a support coordinator, who helps you apply for a waiver and stays your point of contact once you are enrolled.',
      findUrl: 'https://dmh.mo.gov/dev-disabilities/regional-offices',
    },
    start: {
      text: 'Look up the Regional Office that covers your county using the county lookup on the Division of Developmental Disabilities website, then contact that office to begin an eligibility determination. A support coordinator will help you apply for the Comprehensive Waiver, Community Support Waiver, or another program that fits your needs; because some waivers have limited openings, ask about getting on a list as soon as you think you might need services. You can also call the Department of Mental Health\'s main line at 1-800-364-9687 and ask to be connected with Developmental Disabilities.',
      url: 'https://dmh.mo.gov/dev-disabilities/programs/waiver',
    },
    agency: { name: 'Missouri Department of Mental Health (DMH), Division of Developmental Disabilities', url: 'https://dmh.mo.gov/dev-disabilities' },
    waivers: 'Comprehensive Waiver, Community Support Waiver, Missouri Children with Developmental Disabilities Waiver (MOCDD), and Partnership for Hope',
    contacts: [
      { name: 'Missouri Protection and Advocacy Services (Mo P&A)', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-392-8667' },
      { name: 'Missouri Adult Abuse and Neglect Hotline', desc: 'Report abuse, neglect, or financial exploitation of an adult with a disability. Answered 7 a.m. to 8 p.m. every day of the year; you can also file a report online any time.', phone: '1-800-392-0210' },
      { name: 'Family Support Division hearings', desc: 'Ask for a state hearing to appeal a denial. In Missouri you usually have 90 days from the date on your notice, or 120 days if the notice came from your MO HealthNet managed care health plan.', phone: '1-855-373-4636' },
      { name: 'DMH Division of Developmental Disabilities', desc: 'General information line; ask to be connected with your Regional Office.', phone: '1-800-364-9687' },
    ],
  },

  MT: {
    entry: {
      name: 'Developmental Disabilities Program (DDP) Regional Office',
      what: 'Montana\'s Developmental Disabilities Program, part of the Department of Public Health and Human Services, works through regional offices in Glasgow, Great Falls, Billings, Helena, and Missoula, plus smaller satellite offices, that serve as your local point of entry. Your regional office completes your eligibility determination and, once you are approved, connects you with a targeted case manager who builds your Personal Support Plan and coordinates your services.',
      findUrl: 'https://dphhs.mt.gov/BHDD/DisabilityServices/developmentaldisabilities/DevelopmentalDisabilitiesRegionalOffices',
    },
    start: {
      text: 'Contact your nearest Developmental Disabilities Program regional office to start an eligibility determination for the 0208 Comprehensive Waiver; you will need to complete an Eligibility Determination Checklist and gather supporting documents such as a diagnosis. Montana keeps a waiting list for this waiver because of limited funding, so ask to be added as soon as you think you may need services. If you are not sure which regional office to contact, call the Developmental Disabilities Program central office in Helena at 406-444-1714.',
      url: 'https://dphhs.mt.gov/BHDD/DisabilityServices/developmentaldisabilities/MedicaidDDP0208WaiverServices',
    },
    agency: { name: 'Montana Department of Public Health and Human Services (DPHHS)', url: 'https://dphhs.mt.gov/BHDD/DisabilityServices/developmentaldisabilities/' },
    waivers: '0208 Comprehensive Waiver',
    contacts: [
      { name: 'Disability Rights Montana', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-245-4743' },
      { name: 'Montana Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of an older adult or adult with a disability. Answered Monday through Friday, 8 a.m. to 5 p.m., except holidays; you can also report online any time.', phone: '1-844-277-9300' },
      { name: 'DPHHS Office of Administrative Hearings', desc: 'Ask for an administrative (fair) hearing to appeal a denial. In Montana you usually have 90 days from the date on your notice.', phone: '406-444-2470' },
      { name: 'Developmental Disabilities Program (DPHHS)', desc: 'Central office for the DD waiver program; can direct you to your regional office.', phone: '406-444-1714' },
    ],
  },

  NE: {
    entry: {
      name: 'DHHS Service Coordination',
      what: 'In Nebraska, a Service Coordinator is your local point of entry into I/DD services. Service Coordinators work out of DHHS local offices, or through the Early Development Network for children under three, and help you apply, complete your eligibility determination, and build your person-centered plan once you are enrolled.',
      findUrl: 'https://dhhs.ne.gov/Pages/DD-Contact-Us.aspx',
    },
    start: {
      text: 'Call the Division of Developmental Disabilities toll-free at 1-877-667-6266 to ask questions or request an application, then apply for Medicaid and DD waiver services through your local DHHS office or online through ACCESSNebraska. As of August 2025 Nebraska eliminated its DD waiver waiting list, so it is worth applying even if you were told in the past that you would have to wait.',
      url: 'https://dhhs.ne.gov/Pages/DD-Regulations-and-Waivers.aspx',
    },
    agency: { name: 'Nebraska Department of Health and Human Services (DHHS), Division of Developmental Disabilities', url: 'https://dhhs.ne.gov/Pages/DD-Regulations-and-Waivers.aspx' },
    waivers: 'Comprehensive Developmental Disabilities (CDD) Waiver, Family Support Waiver (FSW), and Developmental Disabilities Adult Day (DDAD) Waiver',
    contacts: [
      { name: 'Disability Rights Nebraska', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-422-6691' },
      { name: 'Nebraska Abuse and Neglect Hotline', desc: 'Report abuse, neglect, or exploitation of an adult or child. Run by DHHS, open 24 hours a day.', phone: '1-800-652-1999' },
      { name: 'DHHS Hearing Office', desc: 'Ask for a fair hearing to appeal a denial. In Nebraska you usually have 90 days from the date on your notice, or 120 days if the decision came from a managed care health plan.', phone: '402-471-7237' },
      { name: 'Division of Developmental Disabilities', desc: 'Ask questions or request a DD waiver application.', phone: '1-877-667-6266' },
    ],
  },

  NV: {
    entry: {
      name: 'ADSD Regional Center (Developmental Services)',
      what: 'Nevada\'s Aging and Disability Services Division (ADSD) delivers intellectual and developmental disability services through three regional centers: Desert Regional Center for the Las Vegas area, Sierra Regional Center for the Reno area, and Rural Regional Center for the rest of the state. Your regional center is the local point of entry for I/DD services. It handles your application and eligibility determination, and once you are enrolled, it assigns you a Service Coordinator who helps build your individual service plan and connects you to waiver services.',
      findUrl: 'https://adsd.nv.gov/contact/contact_devservices/',
    },
    start: {
      text: 'Contact the ADSD regional center that covers your area and ask to apply for Developmental Services: Desert Regional Center (Las Vegas area) at 702-486-7850, Sierra Regional Center (Reno area) at 775-688-1930, or Rural Regional Center (the rest of the state) at 775-687-5162. Staff will help you complete an application and determine your eligibility for the Waiver for Individuals with Intellectual Disabilities and Related Conditions.',
      url: 'https://adsd.nv.gov/programs/developmental-services/',
    },
    agency: { name: 'Nevada Aging and Disability Services Division (ADSD)', url: 'https://adsd.nv.gov/' },
    waivers: 'Waiver for Individuals with Intellectual Disabilities and Related Conditions',
    contacts: [
      { name: 'Nevada Disability Advocacy & Law Center (NDALC)', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency). In northern Nevada, call 1-800-992-5715.', phone: '1-888-349-3843' },
      { name: 'Nevada Adult Protective Services', desc: 'Report abuse, neglect, exploitation, isolation, or abandonment of a vulnerable adult age 18 or older. In Clark County (Las Vegas), call 702-486-6930.', phone: '1-888-729-0571' },
      { name: 'Nevada Medicaid Fair Hearings (DHCFP Hearings Unit)', desc: 'Request a Medicaid fair hearing to appeal a denial. In Nevada you usually have 90 days from the date on your notice.', phone: '775-684-3604' },
      { name: 'ADSD Developmental Services', desc: 'General information line for Nevada\'s Aging and Disability Services Division, which runs I/DD services statewide.', phone: '775-687-4210' },
    ],
  },

  NH: {
    entry: {
      name: 'Area Agency',
      what: 'New Hampshire delivers developmental disability services through 10 regional, nonprofit Area Agencies designated by the Department of Health and Human Services (DHHS) Bureau of Developmental Services (BDS). Your Area Agency is your local front door: it handles intake and eligibility for the NH Developmental Disabilities Waiver, assigns you a service coordinator, and delivers or arranges services like day programs, residential supports, and supported employment in your area.',
      findUrl: 'https://www.dhhs.nh.gov/programs-services/disability-care/area-agencies',
    },
    start: {
      text: 'Contact the Area Agency that covers your region and ask to apply for developmental disability services. If you are not sure which Area Agency covers your town, call the Bureau of Developmental Services at 603-271-5034, or toll-free at 1-800-852-3345 extension 5034, and ask to be directed to the right one. Your Area Agency handles intake, eligibility determination, and enrollment in the NH Developmental Disabilities Waiver.',
      url: 'https://www.dhhs.nh.gov/programs-services/disability-care/developmental-services',
    },
    agency: { name: 'NH Department of Health and Human Services (DHHS), Bureau of Developmental Services', url: 'https://www.dhhs.nh.gov/bureau-developmental-services' },
    waivers: 'NH Developmental Disabilities (DD) Waiver',
    contacts: [
      { name: 'Disability Rights Center - NH', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-834-1721' },
      { name: 'NH Bureau of Adult and Aging Care Services (Adult Protection)', desc: 'Report abuse, neglect, self-neglect, or exploitation of an adult. Staffed weekdays 8am-4:30pm; call 911 or your local police outside those hours.', phone: '1-800-949-0470' },
      { name: 'NH DHHS Administrative Appeals Unit', desc: 'Request a fair hearing to appeal a denial. In New Hampshire you usually have 30 days from the date of the notice.', phone: '603-271-4292' },
      { name: 'NH Bureau of Developmental Services', desc: 'General information line for New Hampshire\'s Bureau of Developmental Services; can direct you to your local Area Agency.', phone: '603-271-5034' },
    ],
  },

  NJ: {
    entry: {
      name: 'DDD Community Services Office',
      what: 'New Jersey\'s Division of Developmental Disabilities (DDD) serves adults age 21 and older through Community Services Offices assigned by county. Your Community Services Office is the local point of entry: an Intake Worker there helps you complete the Application for Determination of Eligibility and decides if you qualify. Once you are enrolled, DDD connects you with a Support Coordination agency to build your Individualized Service Plan (ISP) and choose your providers.',
      findUrl: 'https://www.nj.gov/humanservices/ddd/about/community-services/',
    },
    start: {
      text: 'Complete DDD\'s Application for Determination of Eligibility and submit it with supporting documentation to the Community Services Office for your county, in person, by mail, or by emailing DDD.NJApply@dhs.nj.gov. You can apply as early as age 18, though services do not start until age 21. If you have questions before applying, call DDD at 1-800-832-9173, or email the Intake Helpdesk at DDD.BeforeYouApply@dhs.nj.gov; it can take up to 60 days after DDD receives your complete application to hear back about eligibility.',
      url: 'https://www.nj.gov/humanservices/ddd/individuals/apply-for-services/',
    },
    agency: { name: 'NJ Division of Developmental Disabilities (DDD)', url: 'https://www.nj.gov/humanservices/ddd/' },
    waivers: 'Supports Program and Community Care Program',
    contacts: [
      { name: 'Disability Rights New Jersey', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-922-7233' },
      { name: 'DDD Abuse & Neglect Hotline', desc: 'Report abuse, neglect, or exploitation of a person with an intellectual or developmental disability, then press 1. Open 24 hours a day, 7 days a week.', phone: '1-800-832-9173' },
      { name: 'DDD Administrative Practice Office (fair hearing appeals)', desc: 'Ask about appealing a DDD service denial, reduction, or termination. In New Jersey you usually have 20 days from the date on your notice to send a written appeal to the address listed on that notice.', phone: '609-633-1482' },
      { name: 'NJ Division of Developmental Disabilities (DDD)', desc: 'Toll-free general information line for New Jersey\'s I/DD services and DDD intake.', phone: '1-800-832-9173' },
    ],
  },

  NM: {
    entry: {
      name: 'DDSD Regional Office',
      what: 'New Mexico\'s Developmental Disabilities Supports Division (DDSD), part of the Health Care Authority (HCA), delivers services through 5 regional offices covering the Metro, Northeast, Northwest, Southeast, and Southwest areas of the state. Your regional office is the local point of entry for I/DD services: it handles your Pre-Service Intake application and eligibility determination. Once you are enrolled in the DD Waiver, you get a case manager to help build your Individual Service Plan.',
      findUrl: 'https://www.hca.nm.gov/regional-offices/',
    },
    start: {
      text: 'Call the DDSD Pre-Service Intake Bureau at 505-350-0034 (or 505-470-5825) to start a DD Waiver application, or contact the DDSD regional office nearest you. You will fill out an application packet and provide records such as school evaluations, IEPs, or medical diagnosis records. Once you are found eligible, your name is placed on the DD Waiver waiting list (the Central Registry) by registration date; you can check your status by calling 505-630-9555 or 575-997-7980.',
      url: 'https://www.hca.nm.gov/eligibility-determination/',
    },
    agency: { name: 'New Mexico Health Care Authority (HCA), Developmental Disabilities Supports Division (DDSD)', url: 'https://www.hca.nm.gov/developmental-disabilities-supports-division/' },
    waivers: 'Developmental Disabilities (DD) Waiver (also Mi Via and Medically Fragile waivers)',
    contacts: [
      { name: 'Disability Rights New Mexico', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-432-4682' },
      { name: 'New Mexico Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of an adult.', phone: '1-866-654-3219' },
      { name: 'HCA Office of Fair Hearings', desc: 'Request a Medicaid fair hearing to appeal a denial. In New Mexico you usually have 90 days from the date on your notice.', phone: '1-800-283-4465' },
      { name: 'DDSD Pre-Service Intake Bureau', desc: 'Statewide intake line to start a DD Waiver application or ask about New Mexico\'s I/DD services.', phone: '505-350-0034' },
    ],
  },

  NY: {
    entry: {
      name: 'OPWDD "Front Door" + Care Coordination Organization',
      what: 'New York\'s entry point is the OPWDD "Front Door," run through five regional offices. The Front Door gives you eligibility information, decides OPWDD eligibility, and begins person-centered planning. It then connects you to a Care Coordination Organization (CCO), whose Care Manager helps you enroll, write your Life Plan, and coordinate your services. The CCO is the closest ongoing equivalent to a California regional center.',
      findUrl: 'https://opwdd.ny.gov/cco-coverage-chart',
    },
    start: {
      text: 'Start at the Front Door: call the OPWDD Information Line at 1-866-946-9733 and give your county, and you will be connected to your regional office. They provide eligibility information, determine OPWDD eligibility, and refer you to a Care Coordination Organization for a Care Manager.',
      url: 'https://opwdd.ny.gov/get-started/front-door',
    },
    agency: { name: 'NYS Office for People With Developmental Disabilities (OPWDD)', url: 'https://opwdd.ny.gov/' },
    waivers: 'OPWDD Comprehensive Home and Community-Based Services (HCBS) Waiver',
    contacts: [
      { name: 'Disability Rights New York', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-993-8982' },
      { name: 'Justice Center hotline', desc: 'Report abuse or neglect of someone in a state-certified program. Open 24 hours a day.', phone: '1-855-373-2122' },
      { name: 'Medicaid fair hearings (OTDA)', desc: 'Request a Medicaid fair hearing to appeal a denial. In New York you usually have 60 days from the date on your notice; ask before the change takes effect to keep your services during the appeal.', phone: '1-800-342-3334' },
      { name: 'OPWDD Information Line', desc: 'Reach the Front Door to get started or find your regional office.', phone: '1-866-946-9733' },
    ],
  },

  NC: {
    entry: {
      name: 'Tailored Plan (LME/MCO)',
      what: 'North Carolina\'s HCBS waiver for I/DD is managed day-to-day by regional health plans called Tailored Plans, also known as LME/MCOs: Alliance Health, Partners Health Management, Trillium Health Resources, and Vaya Health. There is one Tailored Plan for each county, and it is your local point of entry for I/DD waiver services. Contact your Tailored Plan to apply for the NC Innovations Waiver, and once you are enrolled, it assigns you a care manager to help build your Individual Support Plan.',
      findUrl: 'https://www.ncdhhs.gov/providers/lme-mco-directory',
    },
    start: {
      text: 'Find the Tailored Plan that covers your county using the LME/MCO directory, or call the Division of Mental Health, Developmental Disabilities and Substance Use Services at 1-855-262-1946, and ask to apply for the NC Innovations Waiver, also called the \'Registry of Unmet Needs\' application. Apply as soon as you have a diagnosis, since the waiting list can be long. You should get a letter within a few weeks confirming you have been added to the list or explaining why not.',
      url: 'https://medicaid.ncdhhs.gov/beneficiaries/nc-innovations-waiver/how-apply-nc-innovations-waiver',
    },
    agency: { name: 'NC Medicaid (NC Department of Health and Human Services)', url: 'https://medicaid.ncdhhs.gov/beneficiaries/nc-innovations-waiver' },
    waivers: 'NC Innovations Waiver',
    contacts: [
      { name: 'Disability Rights North Carolina', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-877-235-4210' },
      { name: 'Adult Protective Services (your county Department of Social Services)', desc: 'Report abuse, neglect, or exploitation of a disabled adult. North Carolina handles reports through your local county DSS rather than one statewide hotline; use the directory to find your county\'s number.', url: 'www.ncdhhs.gov/divisions/social-services/local-dss-directory' },
      { name: 'NC Office of Administrative Hearings', desc: 'Ask for a Medicaid state fair hearing to appeal a service denial or cut, after your Tailored Plan sends you a Notice of Resolution. In North Carolina you usually have 120 days from the date on that notice.', phone: '984-236-1850' },
      { name: 'NC Division of Mental Health, Developmental Disabilities and Substance Use Services', desc: 'State customer service line for questions about the NC Innovations Waiver and help finding your Tailored Plan.', phone: '1-855-262-1946' },
    ],
  },

  ND: {
    entry: {
      name: 'Developmental Disabilities Regional Office',
      what: 'North Dakota\'s regional Developmental Disabilities offices are your local point of entry for I/DD services. Each region determines eligibility, helps you access waiver services, and assigns a Program Manager to work with you directly. Find and contact the region that covers your county to start the process or ask questions about your waiver.',
      findUrl: 'https://www.hhs.nd.gov/dd/offices',
    },
    start: {
      text: 'Contact your regional Developmental Disabilities office, or call the ND HHS Developmental Disabilities Division at 701-328-8930 (toll-free 1-800-755-8529) to ask about the Traditional IID/DD waiver. A Program Manager helps determine your eligibility and, if a waiting list applies, adds your name to it.',
      url: 'https://www.hhs.nd.gov/dd',
    },
    agency: { name: 'North Dakota Health and Human Services (HHS), Developmental Disabilities Division', url: 'https://www.hhs.nd.gov/dd' },
    waivers: 'Traditional Individuals with Intellectual Disabilities/Developmental Disabilities (IID/DD) Home and Community-Based Services Waiver',
    contacts: [
      { name: 'North Dakota Protection & Advocacy Project (Disability Rights ND)', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-472-2670' },
      { name: 'Vulnerable Adult Protective Services', desc: 'Report abuse, neglect, or financial exploitation of a vulnerable adult (press option 2). You can leave a message and someone will call back. Call 911 first if someone is in immediate danger.', phone: '1-855-462-5465' },
      { name: 'HHS Legal Division fair hearings', desc: 'Request a Medicaid fair hearing to appeal a denial. In North Dakota you usually have 30 days from the date on your notice.', phone: '1-800-472-2622' },
      { name: 'ND HHS Developmental Disabilities Division', desc: 'Ask questions or start the process for I/DD waiver services.', phone: '1-800-755-8529' },
    ],
  },

  OH: {
    entry: {
      name: 'County Board of Developmental Disabilities',
      what: 'Your county board of developmental disabilities is the local point of entry for I/DD services in Ohio. Every county is covered (some rural counties share a joint board). The county board handles intake and eligibility, assesses you for the waiver waiting list, and assigns a Service and Support Administrator (SSA) to coordinate your services once you are enrolled.',
      findUrl: 'https://dodd.ohio.gov/county-boards',
    },
    start: {
      text: 'Contact your county board of developmental disabilities and ask for an intake appointment. The board assesses your eligibility and, once approved, connects you with a Service and Support Administrator (SSA) who helps you request Individual Options, Level One, or SELF waiver services. If you are not sure which county board serves you, call DODD\'s information line at 1-800-617-6733.',
      url: 'https://dodd.ohio.gov/county-boards/assessments/Eligibility+for+County+Board+Services',
    },
    agency: { name: 'Ohio Department of Developmental Disabilities (DODD)', url: 'https://dodd.ohio.gov' },
    waivers: 'Individual Options (IO), Level One, and Self-Empowered Life Funding (SELF) waivers',
    contacts: [
      { name: 'Disability Rights Ohio', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-282-9181' },
      { name: 'DODD Abuse and Neglect Reporting', desc: 'Report abuse or neglect of a person with a developmental disability, weekdays (choose option 1). Call 911 first if someone is in immediate danger.', phone: '1-800-617-6733' },
      { name: 'Ohio Medicaid Consumer Hotline (state hearings)', desc: 'Request a state hearing to appeal a denial (choose option 1). In Ohio you usually have 90 days from the date your notice was mailed, but asking within 15 days keeps your services unchanged until the hearing decision.', phone: '1-866-635-3748' },
      { name: 'DODD (Ohio Department of Developmental Disabilities)', desc: 'General information line; can help you find your county board.', phone: '1-800-617-6733' },
    ],
  },

  OK: {
    entry: {
      name: 'Developmental Disabilities Services (DDS)',
      what: 'Developmental Disabilities Services (DDS), part of Oklahoma Human Services, is organized into three area offices (Oklahoma City, Tulsa, and Pauls Valley) that cover the state. DDS decides eligibility, manages the waiver waiting list, and assigns you a case manager once you are enrolled. Applications and waiting-list updates are handled by the state\'s intake contractor, Liberty of Oklahoma.',
      findUrl: 'https://oklahoma.gov/okdhs/services/dds/pscontact.html',
    },
    start: {
      text: 'Call DDS Intake at 405-500-1866 (or email DDSintake@libertyhealth.com) to request an application for developmental disabilities services. Applications are handled in order by request date, so apply as early as possible. DDS Intake can also tell you where you stand on the waiting list.',
      url: 'https://oklahoma.gov/okdhs/services/dds/areacontactinfo.html',
    },
    agency: { name: 'Oklahoma Human Services (OKDHS), Developmental Disabilities Services (DDS)', url: 'https://oklahoma.gov/okdhs/services/dds.html' },
    waivers: 'Community Waiver, and In-Home Supports Waivers for Adults and for Children',
    contacts: [
      { name: 'Disability Rights Oklahoma', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-880-7755' },
      { name: 'Oklahoma Abuse and Neglect Hotline', desc: 'Report abuse, neglect, or exploitation. Open 24 hours a day.', phone: '1-800-522-3511' },
      { name: 'OKDHS Fair Hearing (Appeals Unit)', desc: 'Request a hearing to appeal a DDS decision. Check the deadline printed on your notice.', phone: '405-522-5050' },
      { name: 'DDS Intake (Liberty of Oklahoma)', desc: 'Request a DDS application or check your place on the waiting list.', phone: '405-500-1866' },
    ],
  },

  OR: {
    entry: {
      name: 'Community Developmental Disability Program (CDDP)',
      what: 'Your local Community Developmental Disability Program (CDDP) is the entry point for I/DD services in Oregon. Every county has one, sometimes shared with a neighboring county. Your CDDP determines eligibility, helps with your application, and assigns a service coordinator, sometimes called a Personal Agent, to build your Individual Support Plan once you are enrolled.',
      findUrl: 'https://www.oregon.gov/odhs/idd/pages/cddp.aspx',
    },
    start: {
      text: 'Contact your local Community Developmental Disability Program (CDDP) to request the standard application, available in English, Spanish, Russian, and Vietnamese. If you are not sure which CDDP covers your county, call ODDS at 1-800-282-8096 (voice/TTY) and they can point you to your local office.',
      url: 'https://www.oregon.gov/odhs/idd/pages/eligibility.aspx',
    },
    agency: { name: 'Oregon Department of Human Services (ODHS), Office of Developmental Disabilities Services (ODDS)', url: 'https://www.oregon.gov/odhs/idd/pages/default.aspx' },
    waivers: 'Adults I/DD HCBS Waiver, Behavioral Waiver, Children\'s HCBS Waiver, Medically Fragile and Medically Involved Waivers, plus the K Plan (Community First Choice)',
    contacts: [
      { name: 'Disability Rights Oregon', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-452-1694' },
      { name: 'Oregon Abuse Hotline', desc: 'Report abuse or neglect of an adult with a disability. Open 24 hours a day, every day of the year.', phone: '1-855-503-7233' },
      { name: 'ODDS Hearings', desc: 'Request a hearing to appeal a denial. In Oregon you usually have 90 days from the date on your notice, and services can continue unchanged if you ask within 10 business days of a termination notice.', phone: '1-800-282-8096', url: 'www.oregon.gov/odhs/idd/pages/hearings.aspx' },
      { name: 'ODDS (Office of Developmental Disabilities Services)', desc: 'General information line; can help you find your local CDDP.', phone: '1-800-282-8096' },
    ],
  },

  PA: {
    entry: {
      name: 'County MH/ID office + Supports Coordinator',
      what: 'In Pennsylvania your county Mental Health / Intellectual Disabilities (MH/ID) office is the local entry point and administrative entity. It handles registration and eligibility for intellectual disability and autism services. Once you are eligible, a Supports Coordinator (from a Supports Coordination Organization you choose) helps you apply for the waiver, write your plan, and coordinate services.',
      findUrl: 'https://www.pa.gov/agencies/dhs/contact/county-mh-id-offices',
    },
    start: {
      text: 'Contact your county MH/ID office and make an appointment to register for services. Bring records that help show eligibility (medical, psychological, and school records). If you are found eligible, you are assigned a Supports Coordinator who can start the waiver application. The state ODP line is 1-888-565-9435.',
      url: 'https://www.pa.gov/services/dhs/apply-for-intellectual-disabilities-services',
    },
    agency: { name: 'Office of Developmental Programs (ODP), PA Dept. of Human Services', url: 'https://www.pa.gov/agencies/dhs/departments-offices/odp-info' },
    waivers: 'Consolidated, Community Living, and Person/Family Directed Support (P/FDS) waivers',
    contacts: [
      { name: 'Disability Rights Pennsylvania', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-692-7443' },
      { name: 'Adult Protective Services', desc: 'Report abuse, neglect, exploitation, or abandonment of an adult with a disability. Open 24 hours a day.', phone: '1-800-490-8505' },
      { name: 'DHS Bureau of Hearings and Appeals', desc: 'Request a Medical Assistance (Medicaid) fair hearing to appeal a denial. In Pennsylvania you usually have 30 days from the date on your notice, so act quickly.', phone: '1-717-783-3950' },
      { name: 'ODP customer line', desc: 'Ask about applying, eligibility, or finding your county office.', phone: '1-888-565-9435' },
    ],
  },

  RI: {
    entry: {
      name: 'Division of Developmental Disabilities (DDD)',
      what: 'Rhode Island does not use county-based offices. Instead, the Division of Developmental Disabilities (DDD), part of BHDDH, is a single statewide office that decides eligibility for adult DD services. Once you are approved, you choose one of dozens of community provider agencies licensed by BHDDH, or self-direct your own supports through a fiscal intermediary, to actually deliver your services.',
      findUrl: 'https://bhddh.ri.gov/developmental-disabilities/contact-us',
    },
    start: {
      text: 'Complete a BHDDH application for developmental disability services, available online or by mail in English, Spanish, and Portuguese, and submit it with supporting documents like proof of your diagnosis and your Social Security card. Call the Division of Developmental Disabilities Eligibility Unit at 401-462-3421 with questions. The Division reviews completed applications and issues a decision within 30 days.',
      url: 'https://bhddh.ri.gov/developmental-disabilities/eligibility-and-application',
    },
    agency: { name: 'RI Executive Office of Health and Human Services (EOHHS) and Dept. of Behavioral Healthcare, Developmental Disabilities and Hospitals (BHDDH), Division of Developmental Disabilities', url: 'https://bhddh.ri.gov/developmental-disabilities' },
    waivers: 'No separate I/DD waiver; DD services are covered under Rhode Island\'s comprehensive Section 1115 Medicaid demonstration waiver',
    contacts: [
      { name: 'Disability Rights Rhode Island', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-733-5332' },
      { name: 'BHDDH Quality Assurance Hotline', desc: 'Report abuse or a serious incident involving a person with a developmental disability. Open 24 hours a day, 7 days a week.', phone: '401-462-2629' },
      { name: 'EOHHS Appeals', desc: 'Appeal a Medicaid decision. In Rhode Island you usually have 35 days from the date on your Benefit Decision Notice.', phone: '1-855-840-4774' },
      { name: 'Division of Developmental Disabilities (DDD)', desc: 'Ask questions or start the eligibility process for DD services.', phone: '401-462-3421' },
    ],
  },

  SC: {
    entry: {
      name: 'OIDD Case Management',
      what: 'Once South Carolina\'s Office of Intellectual and Developmental Disabilities (OIDD, formerly DDSN) finds you eligible, a case manager becomes your ongoing local point of contact. Case managers work for provider agencies under contract with OIDD, and OIDD also runs five regional clinical offices around the state (Coastal, Midlands, Pee Dee, Saleeby, and Whitten). Your case manager helps you access waiver services, builds your Annual Support Plan with you, and follows up over time. You can search OIDD\'s provider directory by county and service to see case management options in your area.',
      findUrl: 'https://ddsn.sc.gov/services/find-service-provider',
    },
    start: {
      text: 'Call BHDD-OIDD at 1-800-289-7012 (Monday through Friday, 8:30 a.m. to 5 p.m.) to apply for intellectual disability, related disability, autism, or head and spinal cord injury services. Plan for about a 15-minute call: you will be asked about your residency and disability, then you will choose three Intake Service Providers from a list read to you over the phone. Your chosen Intake Provider then helps you finish the eligibility process at no cost to you. For a child under age 3, apply through BabyNet\'s Central Referral Team at 1-866-512-8881 instead.',
      url: 'https://ddsn.sc.gov/services/applying-services',
    },
    agency: { name: 'South Carolina Department of Behavioral Health and Developmental Disabilities (BHDD)', url: 'https://bhdd.sc.gov/' },
    waivers: 'Intellectual Disability and Related Disabilities (ID/RD), Community Supports, and Head and Spinal Cord Injury (HASCI) waivers',
    contacts: [
      { name: 'Disability Rights South Carolina', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-866-275-7273' },
      { name: 'SC Adult Protective Services (DSS)', desc: 'Report abuse, neglect, or exploitation of an adult living in the community. Open 24 hours a day. If the person lives in a BHDD-OIDD residential setting, like a group home, call the SLED Vulnerable Adult Investigations Unit at 1-866-200-6066 instead.', phone: '1-888-227-3487' },
      { name: 'SCDHHS Office of Appeals and Hearings', desc: 'Request a Medicaid fair hearing to appeal a denial. In South Carolina you usually have 30 days from the date on your notice.', phone: '1-800-763-9087' },
      { name: 'BHDD-OIDD Apply for Services Line', desc: 'Apply for intellectual disability, related disability, autism, or head and spinal cord injury services, or ask a question about eligibility.', phone: '1-800-289-7012' },
    ],
  },

  SD: {
    entry: {
      name: 'Division of Developmental Disabilities (DDD)',
      what: 'South Dakota\'s Division of Developmental Disabilities (DDD), part of the Department of Human Services, is the single point of contact for developmental disability services statewide. There is no separate local office to search for by county. Instead, you reach DDD through the Dakota at Home hotline, South Dakota\'s aging and disability resource center. Once you are found eligible, DDD funds and oversees a Case Management Provider and Community Support Provider in your area who coordinate your day-to-day services, such as the CHOICES or Family Support 360 waiver.',
      findUrl: 'https://dhs.sd.gov/en/division-developmental-disabilities',
    },
    start: {
      text: 'Call the Dakota at Home hotline at 1-833-663-9673 and press option 2 to reach DDD, or complete DDD\'s application by mail or online. A DDD team member helps you determine whether you qualify for developmental disability services and, if so, which waiver fits you best: the more comprehensive CHOICES waiver, or the self-directed Family Support 360 (FS360) waiver, which lets you or your family manage more of your own supports.',
      url: 'https://dhs.sd.gov/en/ltss/dakota-at-home',
    },
    agency: { name: 'South Dakota Department of Human Services (DHS), Division of Developmental Disabilities', url: 'https://dhs.sd.gov/en/division-developmental-disabilities' },
    waivers: 'CHOICES and Family Support 360 (FS360)',
    contacts: [
      { name: 'Disability Rights South Dakota', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-658-4782' },
      { name: 'South Dakota Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of an adult. Calls go through the Dakota at Home hotline and are confidential.', phone: '1-833-663-9673' },
      { name: 'DSS Office of Administrative Hearings', desc: 'Request a fair hearing to appeal a denial. In South Dakota you usually have 30 days from the date on your notice.', phone: '605-773-6851' },
      { name: 'South Dakota Division of Developmental Disabilities (DDD)', desc: 'Ask about eligibility, the CHOICES or Family Support 360 waiver, or your place on the waiting list.', phone: '605-773-5990' },
    ],
  },

  TN: {
    entry: {
      name: 'DDA Regional Intake Office',
      what: 'Tennessee\'s Department of Disability and Aging (DDA) runs three DDA Regional Intake Offices covering West, Middle, and East Tennessee. DDA was created in July 2024 when the former Department of Intellectual and Developmental Disabilities (DIDD) merged with the Tennessee Commission on Aging and Disability, so you may still see \'DIDD\' on older materials. Your regional intake office helps you apply for I/DD programs, runs the eligibility assessment, enrolls you once you are approved, and checks in with you periodically while you wait for services.',
      findUrl: 'https://www.tn.gov/disability-and-aging/disability-aging-programs/intake-for-dda-programs.html',
    },
    start: {
      text: 'Submit a self-referral online, or get help completing one by phone. If you already have TennCare (Medicaid) through BlueCare, UnitedHealthcare, or Wellpoint (Amerigroup), call the number on the back of your insurance card for help applying to Employment and Community First (ECF) CHOICES. If you do not have TennCare yet, call your region\'s DDA Regional Intake Office instead: West Tennessee 1-866-372-5709, Middle Tennessee 1-800-654-4839, or East Tennessee 1-888-531-9876. Funding is limited each year, so not everyone who applies can enroll or start services right away.',
      url: 'https://www.tn.gov/disability-and-aging/disability-aging-programs/ecf-choices.html',
    },
    agency: { name: 'Tennessee Department of Disability and Aging (DDA, formerly DIDD)', url: 'https://www.tn.gov/disability-and-aging.html' },
    waivers: 'Employment and Community First (ECF) CHOICES, a Section 1115 Medicaid demonstration program rather than a standard 1915(c) waiver',
    contacts: [
      { name: 'Disability Rights Tennessee', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-342-1660' },
      { name: 'Tennessee Adult Protective Services Hotline', desc: 'Report abuse, neglect, or financial exploitation of an adult. Also called 1-888-APS-TENN. Reports can be made anonymously. Open 24 hours a day.', phone: '1-888-277-8366' },
      { name: 'TennCare Member Medical Appeals', desc: 'File a TennCare medical appeal to fight a denial, reduction, or end of services. In Tennessee you usually have 60 days to appeal, but file within 20 days of the date on your notice if you want your services to continue unchanged while you wait.', phone: '1-800-878-3192' },
      { name: 'Department of Disability and Aging (DDA)', desc: 'General information line for the state agency that runs I/DD programs and ECF CHOICES.', phone: '1-800-535-9725' },
    ],
  },

  TX: {
    entry: {
      name: 'Local IDD Authority (LIDDA)',
      what: 'Your LIDDA is the local point of entry for intellectual and developmental disability services in Texas. About 39 of them cover the state by county. A LIDDA handles intake and eligibility, adds you to the HCS or Texas Home Living (TxHmL) interest list, and provides service coordination once you are enrolled.',
      findUrl: 'https://resources.hhs.texas.gov/directories/lidda',
    },
    start: {
      text: 'Contact your local LIDDA and ask to be added to the HCS and/or Texas Home Living (TxHmL) interest list. Your "request date" sets your place in line, so join as early as you can. Eligibility is decided when your name reaches the top and you are offered enrollment. The statewide interest-list (CSIL) hotline, 1-877-438-5658, can also take requests.',
      url: 'https://www.hhs.texas.gov/handbooks/local-intellectual-developmental-disability-authority-handbook/7000-hcs-txhml-interest-lists',
    },
    agency: { name: 'Texas Health and Human Services Commission (HHSC)', url: 'https://www.hhs.texas.gov/providers/long-term-care-providers/local-idd-authority-lidda' },
    waivers: 'Home and Community-based Services (HCS) and Texas Home Living (TxHmL)',
    contacts: [
      { name: 'Disability Rights Texas', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-252-9108' },
      { name: 'Texas Abuse Hotline', desc: 'Report abuse, neglect, or exploitation. Run by DFPS, open 24 hours a day.', phone: '1-800-252-5400' },
      { name: 'HHSC fair hearings', desc: 'Ask for a Medicaid fair hearing to appeal a denial. In Texas you usually have 90 days from the date on your notice.', phone: '2-1-1' },
      { name: 'Interest list (CSIL) hotline', desc: 'Get on, or check your place on, the HCS / TxHmL interest list.', phone: '1-877-438-5658' },
    ],
  },

  UT: {
    entry: {
      name: 'Division of Services for People with Disabilities (DSPD)',
      what: 'Utah\'s Division of Services for People with Disabilities (DSPD), part of the Department of Health and Human Services, runs intake, eligibility, and waiver services for the whole state through a single statewide process. There is no separate local office to look up by county. DSPD intake workers determine whether you are eligible, and once you are, a needs assessment scores your urgency and places you on the waiting list for the waiver that fits you. After you are enrolled, you get your own Support Coordinator to help you use your services.',
      findUrl: 'https://dspd.utah.gov/contact-dspd/',
    },
    start: {
      text: 'Call 1-844-ASK-DSPD (1-844-275-3773) and choose the option to apply for services, or apply online, to reach an intake worker. You have 90 days to complete the intake process, which includes gathering records like psychological evaluations, school records, and medical summaries. DSPD then mails you a Notice of Agency Action and Hearing Rights Form telling you whether you are eligible; if you are, the needs assessment that follows places you on the waiting list.',
      url: 'https://dspd.utah.gov/intake-process/',
    },
    agency: { name: 'Utah Division of Services for People with Disabilities (DSPD), Department of Health and Human Services', url: 'https://dspd.utah.gov/' },
    waivers: 'Community Supports, Community Transitions, and Limited Supports waivers',
    contacts: [
      { name: 'Disability Law Center', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-662-9080' },
      { name: 'Utah Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of an adult. Phone lines are staffed Monday through Friday, 8 a.m. to 5 p.m.; you can also report online any time, day or night.', phone: '1-800-371-7897' },
      { name: 'Office of Administrative Hearings', desc: 'Request a Medicaid fair hearing to appeal a denial. Deadlines vary by decision type in Utah: often 30 days for a standard denial, 90 days for an eligibility decision, or 120 days for a managed care plan decision, so check the date on your notice.', phone: '801-538-6576' },
      { name: 'DSPD Apply for Services / Intake Line', desc: 'Apply for DSPD services, or ask a question about eligibility, waivers, or the waiting list.', phone: '1-844-275-3773' },
    ],
  },

  VT: {
    entry: {
      name: 'Designated Agency (DA)',
      what: 'Vermont is divided into regions, each served by one Designated Agency (DA) under contract with the Department of Disabilities, Aging and Independent Living (DAIL). Your DA delivers direct services in your area, such as crisis response, employment support, and residential services. Vermont recently separated case management from this role: since October 2025, day-to-day case management for Developmental Disabilities Services is handled statewide by one of two Case Management Organizations, Benchmark Human Services or the Columbus Organization, rather than by your DA directly. Your DA can still help you understand how the two connect.',
      findUrl: 'https://ddsd.vermont.gov/designated-agencies-listed-countyregion',
    },
    start: {
      text: 'Contact the PCG Intake and Eligibility Team at 1-833-426-5668 (Monday through Friday, 8 a.m. to 4:30 p.m.) or VTDDSDIntake@pcgus.com to start a Developmental Disabilities Services application. As of August 2025, this centralized team, not your local Designated Agency, handles new applications: they hold a virtual intake meeting, collect your documentation, and recommend an eligibility decision to DAIL. If you are found eligible, you then choose, or are assigned, a Case Management Organization to help coordinate your ongoing services.',
      url: 'https://ddsd.vermont.gov/apply-dd-services',
    },
    agency: { name: 'Vermont Department of Disabilities, Aging and Independent Living (DAIL), Developmental Disabilities Services Division (DDSD)', url: 'https://ddsd.vermont.gov/' },
    waivers: 'Developmental Disabilities (DD) Home and Community-Based Services Waiver, operated under Vermont\'s Global Commitment to Health Section 1115 Medicaid waiver',
    contacts: [
      { name: 'Disability Rights Vermont', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-834-7890' },
      { name: 'Vermont Adult Protective Services', desc: 'Report abuse, neglect, or exploitation of a vulnerable adult. If you call after hours or on a weekend, expect a callback, usually by the next business day.', phone: '1-800-564-1612' },
      { name: 'Vermont Human Services Board', desc: 'Request a fair hearing to appeal a denial, reduction, or end of services. Check the deadline printed on your notice: Vermont\'s timelines differ depending on the type of decision and what stage of appeal you are in.', phone: '802-828-2536' },
      { name: 'DAIL Developmental Disabilities Services', desc: 'General information line for Vermont Developmental Disabilities Services and the Designated Agency system.', phone: '802-241-0304' },
    ],
  },

  VA: {
    entry: {
      name: 'Community Services Board (CSB)',
      what: 'Your local Community Services Board (or Behavioral Health Authority) is the front door to intellectual and developmental disability services in Virginia. There are 39 CSBs covering the state. Your CSB screens you for eligibility, helps you get on the DD Waiver waiting list, and provides a support coordinator (case manager) once you are enrolled.',
      findUrl: 'https://dbhds.virginia.gov/community-services-boards-csbs/',
    },
    start: {
      text: 'Contact your local Community Services Board (CSB) and ask for an intake appointment for DD Waiver services. A support coordinator will screen you using the Virginia ID/DD Eligibility Survey (VIDES) to confirm your eligibility, then add your name to the statewide waiting list. If you are not sure which CSB serves you, call the My Life My Community help line at 1-844-603-9248.',
      url: 'https://dbhds.virginia.gov/waiver-information-for-individuals-and-families/',
    },
    agency: { name: 'Virginia Department of Behavioral Health and Developmental Services (DBHDS)', url: 'https://dbhds.virginia.gov/' },
    waivers: 'Developmental Disability (DD) Waivers: Building Independence (BI), Family and Individual Supports (FIS), and Community Living (CL)',
    contacts: [
      { name: 'disAbility Law Center of Virginia (dLCV)', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-552-3962' },
      { name: 'Virginia Adult Protective Services Hotline', desc: 'Report abuse, neglect, or exploitation of an adult 60 or older, or an incapacitated adult 18 or older. Open 24 hours a day.', phone: '1-888-832-3858' },
      { name: 'DMAS Appeals Division', desc: 'Request a Medicaid fair hearing to appeal a denial. In Virginia you usually have 30 days from the date on your notice.', phone: '804-371-8488' },
      { name: 'My Life My Community', desc: 'Get help finding your local CSB and understanding DD Waiver services. Run by DBHDS.', phone: '1-844-603-9248' },
    ],
  },

  WA: {
    entry: {
      name: 'Developmental Disabilities Administration (DDA) office',
      what: 'DDA, part of the Department of Social and Health Services (DSHS), is the local point of entry for intellectual and developmental disability services in Washington. Regional and field DDA offices handle intake and eligibility. Once you are enrolled, a case manager helps you request the specific waiver services you need.',
      findUrl: 'https://www.dshs.wa.gov/dda/find-ddcs-office',
    },
    start: {
      text: 'Request a DDA enrollment packet online, at your local DDA office, or by phone, then return the completed forms and any supporting documentation to your regional intake office. DDA will let you know if you are eligible within 30 days of receiving everything it needs. Being enrolled is only the first step; once found eligible, contact your regional DDA office to request specific services. DDA headquarters can be reached at 360-407-1500.',
      url: 'https://www.dshs.wa.gov/node/5756',
    },
    agency: { name: 'Washington State Department of Social and Health Services (DSHS), Developmental Disabilities Administration (DDA)', url: 'https://www.dshs.wa.gov/dda' },
    waivers: 'Basic Plus, Core, Community Protection, Individual and Family Services (IFS), and Children\'s Intensive In-Home Behavioral Supports (CIIBS) waivers',
    contacts: [
      { name: 'Disability Rights Washington', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-562-2702' },
      { name: 'DSHS Abuse and Neglect Hotline', desc: 'Report abuse, neglect, or exploitation of a vulnerable adult. Open 24 hours a day.', phone: '1-866-363-4276' },
      { name: 'Office of Administrative Hearings', desc: 'Request a hearing to appeal a denial of Apple Health (Medicaid) benefits. In Washington you usually have 90 days from the date on your notice.', phone: '1-800-583-8271' },
      { name: 'DDA Headquarters', desc: 'General questions about DDA eligibility and services.', phone: '360-407-1500' },
    ],
  },

  WV: {
    entry: {
      name: 'WV ASO (Acentra Health)',
      what: 'West Virginia does not use local district offices for developmental disability intake. Acentra Health, the state\'s contracted Utilization Management contractor known as the WV ASO, processes your Intellectual and/or Developmental Disabilities Waiver (IDDW) application, schedules your psychological evaluation, and determines your medical eligibility. Once you are approved, you choose a local Case Management agency to coordinate your services going forward.',
      findUrl: 'https://iddwprogram.wv.gov/',
    },
    start: {
      text: 'Complete the IDDW application form and send it to Acentra Health by mail, fax, or email. You will then choose a psychologist from an approved list for your evaluation and must return your choice within 14 days. Contact your local West Virginia Department of Human Services office to confirm financial eligibility. If you have not heard back from Acentra Health within 5 business days, call their toll-free line at 1-866-385-8920.',
      url: 'https://iddwprogram.wv.gov/policy-and-forms',
    },
    agency: { name: 'West Virginia Department of Human Services (DoHS), Bureau for Medical Services (BMS)', url: 'https://bms.wv.gov/' },
    waivers: 'Intellectual and/or Developmental Disabilities Waiver (IDDW)',
    contacts: [
      { name: 'Disability Rights of West Virginia', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-950-5250' },
      { name: 'WV Centralized Intake for Abuse and Neglect', desc: 'Report abuse, neglect, or exploitation of a child or vulnerable adult. Open 24 hours a day.', phone: '1-800-352-6513' },
      { name: 'WV Board of Review', desc: 'Request a Fair Hearing to appeal a denial. In West Virginia you usually have 90 days from the date on your notice.', phone: '304-352-0805' },
      { name: 'IDDW Program (Acentra Health)', desc: 'Questions about your IDDW application or waiver services.', phone: '1-866-385-8920' },
    ],
  },

  WI: {
    entry: {
      name: 'Aging and Disability Resource Center (ADRC)',
      what: 'Your local ADRC is the front door for long-term care services in Wisconsin, including IRIS and Family Care. An ADRC specialist explains your options and helps you complete the Wisconsin Long-Term Care Functional Screen, which checks your level of need and starts your application. Wisconsin does not run a separate waiver just for intellectual and developmental disabilities; IRIS and Family Care serve people with I/DD, physical disabilities, and older adults together.',
      findUrl: 'https://www.dhs.wisconsin.gov/adrc/contacts.htm',
    },
    start: {
      text: 'Contact your local ADRC and ask about IRIS or Family Care. An ADRC specialist completes the Long-Term Care Functional Screen with you to check your level of need, then helps you enroll: in IRIS you choose an IRIS Consultant Agency to help you self-direct your budget, and in Family Care you work with a care team that includes a nurse and a care manager. Call 1-844-947-2372 (844-WIS-ADRC) to find the ADRC that serves your county.',
      url: 'https://www.dhs.wisconsin.gov/iris/enroll.htm',
    },
    agency: { name: 'Wisconsin Department of Health Services (DHS)', url: 'https://www.dhs.wisconsin.gov/iris/index.htm' },
    waivers: 'IRIS (Include, Respect, I Self-Direct) and Family Care',
    contacts: [
      { name: 'Disability Rights Wisconsin', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-928-8778' },
      { name: 'Wisconsin Elder Abuse Hotline', desc: 'Report abuse, neglect, self-neglect, or financial exploitation of someone age 60 or older. For adults under 60, contact your county Adult Protective Services through your local ADRC.', phone: '1-833-586-0107' },
      { name: 'Division of Hearings and Appeals', desc: 'Request a state fair hearing to appeal a denial. In Wisconsin the deadline depends on your program (IRIS or Family Care) and is usually 45 to 60 days, so check the date on your notice.', phone: '608-266-7709' },
      { name: 'ADRC statewide help line', desc: 'Find the Aging and Disability Resource Center that serves your county.', phone: '1-844-947-2372' },
    ],
  },

  WY: {
    entry: {
      name: 'HCBS Case Manager',
      what: 'Wyoming does not have local offices for I/DD services. Instead you choose a certified Case Manager who becomes your main point of contact for Comprehensive or Supports Waiver services. Your Case Manager helps you complete the eligibility paperwork, including a psychological evaluation and an ICAP assessment, and then helps you build your Individualized Plan of Care.',
      findUrl: 'https://health.wyo.gov/healthcarefin/hcbs/participants/',
    },
    start: {
      text: 'Contact the Wyoming Department of Health HCBS Section to start the Supports or Comprehensive Waiver application and choose a Case Manager through the online provider search. Once you select a Case Manager, they have 30 days to complete your eligibility paperwork, including a psychological evaluation and an ICAP score, and the Division reviews it within another 30 days. You must also be eligible for Medicaid. Call the HCBS Section at 1-800-510-0280 (or 307-777-7531) with questions.',
      url: 'https://health.wyo.gov/healthcarefin/hcbs/',
    },
    agency: { name: 'Wyoming Department of Health, Healthcare Financing Division, HCBS Section', url: 'https://health.wyo.gov/healthcarefin/hcbs/' },
    waivers: 'Comprehensive Waiver and Supports Waiver',
    contacts: [
      { name: 'Protection and Advocacy System, Inc. (WYPANDA)', desc: 'Free legal help and advocacy for people with disabilities (your state Protection & Advocacy agency).', phone: '1-800-624-7648' },
      { name: 'Wyoming Department of Family Services', desc: 'Report abuse, neglect, or exploitation of a vulnerable adult. An on-call caseworker is available 24 hours a day.', phone: '1-800-457-3659' },
      { name: 'Wyoming Office of Administrative Hearings', desc: 'Request an administrative hearing to appeal a denial. In Wyoming you usually have 30 days from the date on your notice.', phone: '307-777-6660' },
      { name: 'HCBS Section, Wyoming Department of Health', desc: 'Questions about the Comprehensive or Supports Waiver and how to select a Case Manager.', phone: '1-800-510-0280' },
    ],
  },
}

export const hasStateGuide = (code) => !!STATE_GUIDE[code]
