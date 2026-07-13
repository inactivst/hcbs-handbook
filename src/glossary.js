// Plain-language glossary of the acronyms and jargon people hit in HCBS
// notices, plans, and regulations. Opened from the book icon in the header.
//
// Two layers, mirroring the corpus: FEDERAL_TERMS apply in every state;
// STATE_TERMS adds the state's own vocabulary (agencies, waiver names, local
// entry points). Non-CA state entries stick to the agency/entry-point facts
// already verified for stateGuide.js - definitions stay general and never
// assert deadlines or numbers (the person's own notice + the Rights tab are
// the source of truth for those). Content is English, like the corpus; the
// sheet chrome around it is translated.
//
// Entry shape: { term, full?, def } - term is the word people see ("IPP"),
// full spells it out, def is 1-2 plain sentences.

export const FEDERAL_TERMS = [
  { term: 'ADLs', full: 'Activities of Daily Living', def: 'Everyday self-care tasks like bathing, dressing, eating, and moving around. Assessments count how much help you need with these to decide service hours.' },
  { term: 'Aid paid pending', def: 'Keeping your services running unchanged while your appeal is decided. You usually must appeal quickly after a cut-off notice to get it, so act fast and check your notice.' },
  { term: 'APS', full: 'Adult Protective Services', def: 'The agency that investigates abuse, neglect, or exploitation of adults with disabilities and older adults.' },
  { term: 'Appeal', def: 'Formally asking the state to review and overturn a decision that denied, reduced, or ended your services. Your written notice explains how and by when.' },
  { term: 'Case manager', full: 'also: service coordinator, care manager, support coordinator', def: 'The person assigned to help you plan services, connect to providers, and navigate the system. Different states use different titles for this role.' },
  { term: 'CMS', full: 'Centers for Medicare & Medicaid Services', def: 'The federal agency that runs Medicaid and Medicare and sets the rules states must follow for HCBS programs.' },
  { term: 'Day program', def: 'A service providing structured activities, skill-building, or community time during the day, outside your home.' },
  { term: 'DSP', full: 'Direct Support Professional', def: 'The staff who work with you day to day - in your home, group home, day program, or the community.' },
  { term: 'EVV', full: 'Electronic Visit Verification', def: 'A federally required system where in-home care workers electronically log when visits start and end.' },
  { term: 'Fair hearing', def: 'Your right to have a neutral judge review a Medicaid decision you disagree with. It is free, and you can bring a representative or advocate.' },
  { term: 'Grievance', full: 'also: complaint', def: 'A formal way to say a provider or program treated you badly or gave poor care, separate from appealing a coverage decision.' },
  { term: 'Group home', def: 'A licensed home where a small number of people with disabilities live together with staff support.' },
  { term: 'Guardianship', full: 'also: conservatorship', def: 'A court arrangement giving someone legal authority to make decisions for another person. It limits that person’s own legal rights, and less-restrictive options like supported decision-making may exist.' },
  { term: 'HCBS', full: 'Home and Community-Based Services', def: 'Medicaid services that help you live in your own home or community instead of an institution - personal care, supported living, day services, respite, and more.' },
  { term: 'HCBS Settings Rule', def: 'A federal rule that says places where you get HCBS must feel like real community homes - with privacy, visitors, food access, and your own schedule - not like institutions.' },
  { term: 'HIPAA', full: 'Health Insurance Portability and Accountability Act', def: 'The federal privacy law protecting your health information. Providers need your permission to share it in most cases.' },
  { term: 'IADLs', full: 'Instrumental Activities of Daily Living', def: 'The everyday tasks beyond self-care: cooking, cleaning, shopping, managing money and medications.' },
  { term: 'ICF', full: 'Intermediate Care Facility', def: 'A licensed institutional facility with 24-hour staffing. HCBS waivers exist as the community alternative to this level of care.' },
  { term: 'I/DD', full: 'Intellectual and/or Developmental Disability', def: 'The umbrella term most state service systems use for who their developmental-disability programs serve.' },
  { term: 'LTSS', full: 'Long-Term Services and Supports', def: 'The broad category covering ongoing help with daily life - both HCBS and institutional care.' },
  { term: 'Managed care', full: 'also: MCO, managed care organization', def: 'A private health plan the state pays to run your Medicaid benefits. If a plan denies something, you appeal through the plan first, then can still get a state fair hearing.' },
  { term: 'Medicaid', def: 'The public health program for people with low income or disabilities, run by each state under federal rules. It funds almost all HCBS.' },
  { term: 'Medicaid waiver', full: 'also: 1915(c) waiver', def: 'A state program letting Medicaid pay for home and community services for people who would otherwise qualify for institutional care. Most states run several, often with wait lists.' },
  { term: 'Notice of Action', full: 'also: NOA, notice', def: 'The official letter saying your services are being approved, denied, reduced, or ended. It must explain why and how to appeal - keep it, the dates on it control your deadlines.' },
  { term: 'Ombudsman', def: 'An independent official who takes complaints about care facilities or programs and works to resolve them.' },
  { term: 'P&A', full: 'Protection & Advocacy agency', def: 'Every state has a federally mandated independent legal-advocacy agency for people with disabilities. Free help. Find yours at ndrn.org.' },
  { term: 'Person-centered plan', full: 'also: service plan, ISP', def: 'The written plan of your goals and services. Federal rules require it to be built around what YOU want, with you leading the meeting as much as possible.' },
  { term: 'Prior authorization', def: 'Approval a plan or agency requires before it will pay for a service. A denial here is appealable like any other.' },
  { term: 'Respite', def: 'Short-term care that gives your usual family caregiver a break.' },
  { term: 'SSI', full: 'Supplemental Security Income', def: 'A monthly federal cash benefit for people with disabilities or older adults with low income. In most states, getting SSI also qualifies you for Medicaid.' },
  { term: 'Supported living', full: 'also: supported/independent living services', def: 'Services that support you to live in your own home - not a facility - with help matched to what you need.' },
]

export const STATE_TERMS = {
  CA: [
    { term: 'Regional center', full: 'RC', def: 'One of 21 private nonprofits under contract with the state that coordinate services for Californians with developmental disabilities. Your regional center is your entry point and service coordinator.' },
    { term: 'Lanterman Act', def: 'The California law giving people with developmental disabilities an entitlement to services and supports. The rights in this app’s California guide largely come from it.' },
    { term: 'DDS', full: 'California Department of Developmental Services', def: 'The state agency that oversees regional centers and the developmental-disability service system.' },
    { term: 'CDSS', full: 'California Department of Social Services', def: 'The state agency behind programs like IHSS, and the home of the State Hearings Division where Medi-Cal service appeals are heard.' },
    { term: 'Medi-Cal', def: 'California’s Medicaid program.' },
    { term: 'IHSS', full: 'In-Home Supportive Services', def: 'The Medi-Cal program that pays for in-home personal care hours, often provided by a caregiver you choose.' },
    { term: 'IPP', full: 'Individual Program Plan', def: 'Your person-centered plan at the regional center - the written agreement listing your goals and the services the regional center will provide or fund.' },
    { term: 'UCI', full: 'Unique Client Identifier', def: 'Your regional center case number. It is on your letters; include it when you file appeals or complaints.' },
    { term: 'OCRA', full: 'Office of Clients’ Rights Advocacy', def: 'Free legal advocates for regional center clients, run by Disability Rights California. Every regional center has an assigned OCRA advocate.' },
    { term: 'DRC', full: 'Disability Rights California', def: 'California’s Protection & Advocacy agency - free legal help on disability rights, beyond just regional center issues.' },
    { term: 'POS', full: 'Purchase of Service', def: 'Money a regional center spends to buy you services from vendors. A "POS denial" means the regional center refused to fund something - that decision is appealable.' },
    { term: 'Vendor', def: 'A provider approved by a regional center to deliver services - agencies, day programs, supported-living providers, and more.' },
    { term: 'SDP', full: 'Self-Determination Program', def: 'An alternative where you get an individual budget and choose your own services and providers instead of standard regional center vendors.' },
    { term: 'FMS', full: 'Financial Management Service', def: 'In the Self-Determination Program, the entity that handles the money - paying your providers out of your budget.' },
    { term: 'WIC', full: 'Welfare and Institutions Code', def: 'The California code where the Lanterman Act lives. Citations like "WIC 4731" point to sections of it.' },
    { term: '4731 complaint', def: 'A complaint under WIC section 4731 that a regional center or provider violated your rights - filed with the regional center director. The Vault’s complaint packet builds one.' },
    { term: 'Service code', def: 'The number regional centers use for each service type in their billing system (like 510 for supported living). The Rights tab has the California list.' },
  ],
  TX: [
    { term: 'LIDDA', full: 'Local Intellectual and Developmental Disability Authority', def: 'Your local entry point for I/DD services in Texas - handles intake, eligibility, the waiver interest lists, and service coordination.' },
    { term: 'HHSC', full: 'Texas Health and Human Services Commission', def: 'The state agency that runs Medicaid and I/DD services in Texas, including fair hearings.' },
    { term: 'HCS', full: 'Home and Community-based Services (waiver)', def: 'Texas’ main I/DD waiver, funding residential and in-home supports. Enrollment comes through the interest list.' },
    { term: 'TxHmL', full: 'Texas Home Living', def: 'A smaller Texas I/DD waiver for people living in their family home or their own home.' },
    { term: 'Interest list', full: 'also: CSIL', def: 'Texas’ wait list for waiver services. Your request date holds your place in line, so get on it as early as possible.' },
    { term: 'DFPS', full: 'Texas Department of Family and Protective Services', def: 'Runs the statewide abuse hotline and investigates abuse, neglect, and exploitation.' },
    { term: 'DRTx', full: 'Disability Rights Texas', def: 'Texas’ Protection & Advocacy agency - free legal help and advocacy for people with disabilities.' },
  ],
  FL: [
    { term: 'APD', full: 'Agency for Persons with Disabilities', def: 'The Florida agency serving people with developmental disabilities. Its regional offices are your entry point for eligibility and the waiver.' },
    { term: 'iBudget', def: 'Florida’s developmental-disability Medicaid waiver, which gives each person an individual budget for services.' },
    { term: 'WSC', full: 'Waiver Support Coordinator', def: 'Your case manager on the iBudget waiver - helps build your plan and connect to providers.' },
    { term: 'AHCA', full: 'Agency for Health Care Administration', def: 'The Florida agency that runs the Medicaid program itself.' },
    { term: 'DRF', full: 'Disability Rights Florida', def: 'Florida’s Protection & Advocacy agency - free legal help and advocacy for people with disabilities.' },
  ],
  NY: [
    { term: 'OPWDD', full: 'Office for People With Developmental Disabilities', def: 'The New York state agency for developmental-disability services.' },
    { term: 'Front Door', def: 'OPWDD’s intake process - how you get found eligible and connected to services in New York.' },
    { term: 'DDRO', full: 'Developmental Disabilities Regional Office', def: 'OPWDD’s regional offices, where the Front Door process runs for your area.' },
    { term: 'CCO', full: 'Care Coordination Organization', def: 'The organization that employs your Care Manager and coordinates your Life Plan and services under OPWDD.' },
    { term: 'Care Manager', def: 'Your service coordinator in New York, employed by a CCO.' },
    { term: 'Justice Center', def: 'The New York agency that investigates abuse and neglect of people receiving services in state-certified programs.' },
    { term: 'DRNY', full: 'Disability Rights New York', def: 'New York’s Protection & Advocacy agency - free legal help and advocacy for people with disabilities.' },
  ],
  PA: [
    { term: 'ODP', full: 'Office of Developmental Programs', def: 'The Pennsylvania state office that runs I/DD waivers and services.' },
    { term: 'County MH/ID office', full: 'also: Administrative Entity (AE)', def: 'Your county’s mental health / intellectual disability office - the local entry point for eligibility, registration, and waiver requests in Pennsylvania.' },
    { term: 'Supports Coordinator', def: 'Your case manager in Pennsylvania - helps write your plan (ISP) and arranges services.' },
    { term: 'DRP', full: 'Disability Rights Pennsylvania', def: 'Pennsylvania’s Protection & Advocacy agency - free legal help and advocacy for people with disabilities.' },
  ],
  IL: [
    { term: 'DDD', full: 'Division of Developmental Disabilities (IL DHS)', def: 'The Illinois Department of Human Services division that runs developmental-disability services.' },
    { term: 'ISC', full: 'Independent Service Coordination agency', def: 'Your local entry point in Illinois - ISC agencies handle intake, eligibility, PUNS, and service coordination.' },
    { term: 'PUNS', full: 'Prioritization for Urgency of Need for Services', def: 'Illinois’ waiting-list database. You enroll through your ISC agency, and selections for funding are drawn from it - keep your information updated.' },
    { term: 'EFE', full: 'Equip for Equality', def: 'Illinois’ Protection & Advocacy agency - free legal help and advocacy for people with disabilities.' },
  ],
}

export const hasStateTerms = (code) => !!STATE_TERMS[code]
export const getStateTerms = (code) => STATE_TERMS[code] || []
