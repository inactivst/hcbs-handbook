// Per-state "where to start" + "get help" packs. California has a bespoke
// county->regional-center finder (see regionalCenters.js); every other state has
// its own entry-point system for I/DD HCBS. This is that equivalent, surfaced as
// a "Where to start" sheet + a richer "Get help" contacts card.
//
// Scope: the 5 largest states after California (TX, FL, NY, PA, IL). Every fact
// here was verified against an official state source in July 2026 (the source
// URL sits on each field). Content is English, like the corpus chunks; the UI
// chrome around it is translated. When a state has no pack, the app falls back
// to the federal baseline + the national P&A finder (never invented specifics).
//
// A contact renders as name + desc + a tap-to-call number (or a link). Appeal
// windows are stated softly ("usually within N days") because the exact deadline
// can differ for managed-care denials; the person's own notice is the source of
// truth, and the federal fair-hearing guide covers the general right.

export const STATE_GUIDE = {
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
}

export const hasStateGuide = (code) => !!STATE_GUIDE[code]
