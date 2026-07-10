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
    citation: 'CA Welfare & Institutions Code § 4710 et seq.',
    text: `If a regional center proposes to deny, reduce, or end a service, it must give written notice explaining the decision and your appeal rights. You have the right to appeal and receive a fair hearing. Generally, appealing quickly matters: filing within the timeframe on your notice (historically 30 days to keep existing services in place during the appeal, known as "aid paid pending," and a longer window to appeal at all - recent law extended appeal deadlines, so check the dates printed on your notice). You can also request mediation or an informal meeting first without giving up the hearing. Free help is available from the Office of Clients' Rights Advocacy (OCRA).`,
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

// Verified starter set from CA DDS / regional center published lists.
// Partial list - full crosswalk lives at dds.ca.gov (Service Code Crosswalk).
export const SERVICE_CODES = [
  { code: '062', name: 'Personal Assistance', note: 'One-to-one assistance with daily activities, often in the home or community.' },
  { code: '505', name: 'Activity Center (Adult Day Program)', note: 'Day program focused on daily living and social skills. Settings Rule community-access rights apply.' },
  { code: '510', name: 'Adult Development Center (Adult Day Program)', note: 'Day program focused on developmental skill building. Settings Rule community-access rights apply.' },
  { code: '862', name: 'In-Home Respite Services Agency', note: 'Temporary relief care in the family home, provided through a vendored agency.' },
  { code: '864', name: 'In-Home Respite Worker', note: 'Temporary relief care in the family home, provided by an individual worker.' },
  { code: '868', name: 'Out-of-Home Respite Services', note: 'Temporary care outside the family home, e.g. at a licensed facility.' },
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
