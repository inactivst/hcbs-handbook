// California DDS service codes - the COMPLETE list.
//
// Source of truth: the Department of Developmental Services' own
// "Service Code Descriptions" listing, January 2026 edition:
// https://www.dds.ca.gov/wp-content/uploads/2026/02/ServiceCodeDescriptions_January2026.pdf
// linked from https://www.dds.ca.gov/rc/rc-services/. Code numbers and official
// names are transcribed from that document; the `note` on each entry is a plain
// language sentence written for this app, not a quote from the source. Formal
// definitions come mostly from Title 17, CCR, Section 54342.
//
// This file used to hold twenty hand-picked codes, which meant a family looking
// up the number on their IPP or an invoice usually did not find it. The whole
// point of the list is that the number in front of you is in it, so the list is
// now the whole list, grouped so it can still be read.
//
// `status` marks codes that a regional center can no longer freely use:
//   'retired'   - rate reform moved this service to a new code as of 2025-01-01.
//   'exemption' - usable only where DDS has approved a specific exemption.
// A retired code still belongs here: it is exactly the code a reader finds on an
// older plan or invoice and cannot look up anywhere else.

export const SERVICE_CODE_GROUPS = [
  {
    id: 'day',
    label: 'Day programs and community life',
    codes: [
      { code: '006', name: 'Foster Grandparent Program', note: 'A companionship program that matches older volunteers with people who want the company.' },
      { code: '008', name: 'Sports Club', note: 'Exercise and fitness in a community gym, park or rec program, with instruction and support.' },
      { code: '028', name: 'Socialization Training Program', note: 'Group activities that build social skills for school-age children and teens.' },
      { code: '055', name: 'Community Integration Training Program', status: 'exemption', note: 'A day service that taught skills out in the community. Rate reform closed it; a regional center can only use it now with a DDS-approved exemption.' },
      { code: '063', name: 'Community Activities Support Services', status: 'exemption', note: 'Time-limited one-to-one or small group help to take part in community activities. Now exemption-only.' },
      { code: '072', name: 'Coordinator of Volunteers', note: 'Someone who recruits and matches volunteers so a person has company for social and community outings.' },
      { code: '084', name: 'Special Olympics', note: 'Training for and taking part in Special Olympics.' },
      { code: '091', name: 'In-Home Day Program', note: 'Day program services delivered at home for someone whose medical condition keeps them from attending a center.' },
      { code: '094', name: 'Creative Art Program', note: 'Art classes and studio time for self-expression, sometimes leading to vocational art skills.' },
      { code: '110', name: 'Supplemental Day Services Program Support', note: 'Extra staffing in a day program so a person can stay in the program they are already in.' },
      { code: '505', name: 'Activity Center', status: 'retired', note: 'The old adult day program code focused on daily living and social skills. Programs moved to 531 on January 1, 2025.' },
      { code: '510', name: 'Adult Development Center', status: 'retired', note: 'The old adult day program code focused on developmental skill building. Programs moved to 531 on January 1, 2025.' },
      { code: '515', name: 'Behavior Management Program', status: 'retired', note: 'The old day program for people who need a behavior plan. Replaced by 532 on January 1, 2025.' },
      { code: '525', name: 'Social Recreation Program', note: 'Social and recreational group activities. Regional centers have been able to fund social recreation again since July 2021.' },
      { code: '531', name: 'Day Services', note: 'The current day program code that 505 and 510 moved into, with staffing ratios from 1:2 to 1:10.' },
      { code: '532', name: 'Behavior Day Service', note: 'A day program for people whose support needs a behavior plan.' },
      { code: '533', name: 'Medical Day Service', note: 'A day program with the health support a listed medical condition calls for.' },
      { code: '850', name: 'Camping Services', note: 'Day camp or residential camp, and the travel to get there. Restored as a fundable service in July 2021.' },
      { code: '855', name: 'Adult Day Care', note: 'Licensed day care for adults, providing supervision and care during the day.' },
    ],
  },
  {
    id: 'work',
    label: 'Work and employment',
    codes: [
      { code: '950', name: 'Supported Employment Program - Group Services', note: 'One job coach supporting a small group of people doing paid work in the community.' },
      { code: '952', name: 'Supported Employment Program - Individual Services', note: 'Job development and job coaching for one person seeking or holding a regular community job.' },
      { code: '954', name: 'Work Activity Program', note: 'Paid work in a work activity center or similar setting, with support on site.' },
      { code: '956', name: 'Coordinated Career Pathways', note: 'Help moving from a work activity program or subminimum wage work into a competitive community job.' },
    ],
  },
  {
    id: 'living',
    label: 'Where you live',
    codes: [
      { code: '020', name: 'Transition/Set Up Expenses', note: 'One-time costs of setting up a home when someone moves out of an institution.' },
      { code: '022', name: 'Motel', note: 'A short-term emergency place to stay.' },
      { code: '058', name: 'Out-Of-State Residential Treatment Program', note: 'A residential treatment program outside California. Requires DDS approval.' },
      { code: '073', name: 'Parent Coordinated Supported Living Program', note: 'Supported living where the family, not an agency, arranges and directs the staff.' },
      { code: '089', name: 'Housing Access Services', note: 'Help finding, applying for and moving into housing, and keeping it once you are there.' },
      { code: '090', name: 'Crisis Intervention Facility/Bed', note: 'A temporary 24-hour residential setting during a crisis that puts health or safety at immediate risk.' },
      { code: '096', name: 'Geriatric Facility', note: 'A residential facility for older adults, with personal care and homemaking support.' },
      { code: '101', name: 'Housing Services', note: 'A vendor who provides or brokers the housing-related services named in an IPP.' },
      { code: '109', name: 'Supplemental Residential Program Support', note: 'Extra staffing in a home so a person can stay where they live instead of moving.' },
      { code: '113', name: 'Adult Residential Facility for Persons with Special Health Care Needs (ARFPSHN)', note: 'A licensed home providing 24-hour health care and intensive support in a homelike setting. Since January 1, 2025 this code is used only for ARFPSHN.' },
      { code: '114', name: 'Specialized Residential Facility (Health)', note: 'A licensed residential home for people who need 24-hour care and supervision with an added health component.' },
      { code: '163', name: 'Group Home for Children with Special Health Care Needs', note: 'A CDSS-licensed home for up to five children who need 24-hour health care and intensive support.' },
      { code: '891', name: 'Personal Support Service', note: 'A legacy supported living component for help with daily living, from services vendored before July 2000.' },
      { code: '892', name: 'Training and Habilitation Service', note: 'A legacy supported living component for training and habilitation, from services vendored before July 2000.' },
      { code: '893', name: '24-Hour Emergency Assistance', note: 'A legacy supported living component: someone reachable around the clock in an emergency.' },
      { code: '894', name: 'Supported Living Service Vendor Administration', status: 'retired', note: 'The administrative component of supported living. Rate reform folded it in as of January 1, 2025.' },
      { code: '896', name: 'Supported Living Services', note: 'Help with daily living, built around the person, so an adult can live in their own home for as long as they need it.' },
      { code: '899', name: 'Community Crisis Home Transition Component', note: 'The part of a community crisis home placement that plans and supports the move back to a regular home.' },
      { code: '900', name: 'Enhanced Behavioral Supports Home - Facility', note: 'The facility side of a certified home providing 24-hour nonmedical care with enhanced behavioral supports.' },
      { code: '901', name: 'Enhanced Behavioral Supports Home - Individual Services', note: 'The individualized services and supports side of an enhanced behavioral supports home.' },
      { code: '902', name: 'Community Crisis Home Facility Component', note: 'The facility side of a certified, licensed adult residential crisis home.' },
      { code: '903', name: 'Community Crisis Home - Individualized Services and Supports Component', note: 'The individualized services side of a community crisis home placement.' },
      { code: '904', name: 'Family Home Agency', note: 'An agency that recruits, trains and monitors family homes where an adult lives with a host family.' },
      { code: '905', name: 'Residential Facility Serving Adults, Owner Operated', note: 'A licensed adult home where the licensee lives in the home.' },
      { code: '910', name: 'Residential Facility Serving Children, Owner Operated', note: 'A licensed children’s home where the licensee lives in the home.' },
      { code: '915', name: 'Residential Facility Serving Adults, Staff Operated', note: 'A licensed adult home run by hired staff rather than a live-in licensee.' },
      { code: '920', name: 'Residential Facility Serving Children, Staff Operated', note: 'A licensed children’s home run by hired staff rather than a live-in licensee.' },
      { code: '925', name: 'Intermediate Care Facility/Developmentally Disabled (ICF/DD)', note: 'A health-licensed facility. This is an institutional setting, so HCBS Settings Rule protections work differently here.' },
      { code: '930', name: 'Intermediate Care Facility/Developmentally Disabled-Habilitative (ICF/DD-H)', note: 'A smaller health-licensed facility with a habilitation focus.' },
      { code: '935', name: 'Intermediate Care Facility/Developmentally Disabled-Nursing (ICF/DD-N)', note: 'A health-licensed facility with nursing care on site.' },
      { code: '940', name: 'Nursing Facility', note: 'A licensed nursing facility.' },
    ],
  },
  {
    id: 'home',
    label: 'Help at home, respite and family support',
    codes: [
      { code: '042', name: 'Repair Services', note: 'Heavy household work and repairs that keep a home clean, sanitary and safe.' },
      { code: '062', name: 'Personal Assistance', note: 'One-to-one help with daily activities like bathing, dressing, meals, shopping and getting around, at home or in the community.' },
      { code: '074', name: 'Out-Of-Home Respite - Acute Care Facility', note: 'Short-term respite care provided in an acute care facility.' },
      { code: '076', name: 'Coordinated Family Support (CFS) Services', note: 'A pilot program that coordinates supports for adults who live in the family home.' },
      { code: '093', name: 'Parent Coordinated Personal Assistance Service', note: 'Personal assistance where the family recruits, hires, trains and monitors the worker.' },
      { code: '108', name: 'Parenting Support Services', note: 'Skills and support for a parent with a disability raising their own child.' },
      { code: '405', name: 'Day Care - Family Member', note: 'A family member chooses and arranges the child’s day care, and the regional center pays for it.' },
      { code: '410', name: 'Diaper and Nutritional Supplements', note: 'A family member is authorized to buy diapers or nutritional supplements directly.' },
      { code: '415', name: 'Nursing Service - Family Member', note: 'A family member selects and monitors the nurse who provides nursing care.' },
      { code: '420', name: 'Respite Service - Family Member', note: 'A family member selects and arranges the respite worker rather than using an agency.' },
      { code: '627', name: 'Diaper Service', note: 'Cloth diapers supplied, picked up, laundered and delivered back to the home.' },
      { code: '851', name: 'Child Day Care', note: 'Licensed family or center-based day care for a child.' },
      { code: '854', name: 'Home Health Agency', note: 'A licensed agency providing skilled home health services at home.' },
      { code: '856', name: 'Home Health Aide', note: 'A licensed aide providing personal care and health-related help at home.' },
      { code: '858', name: 'Homemaker', note: 'Household help such as cooking and laundry.', status: 'retired' },
      { code: '860', name: 'Housekeeping Services', note: 'A housekeeper or cleaning service keeping the home clean and sanitary.' },
      { code: '862', name: 'In-Home Respite Services Agency', note: 'Temporary relief care in the family home, provided through a vendored agency.' },
      { code: '864', name: 'In-Home Respite Worker', note: 'Temporary relief care in the family home, provided by an individual worker.' },
      { code: '868', name: 'Out-of-Home Respite Services', note: 'Temporary care outside the family home, for example at a licensed facility.' },
      { code: '869', name: 'Respite Facility', note: 'A licensed residential facility that provides only out-of-home respite.' },
    ],
  },
  {
    id: 'behavior',
    label: 'Behavior support and mental health',
    codes: [
      { code: '017', name: 'Crisis Team - Evaluation and Behavior Intervention', note: 'A crisis team that comes to where the person is and works to keep them in their current home, program or school.' },
      { code: '026', name: 'Intensive Transition Services', note: 'Staff trained to support people with complex needs through a move between settings.' },
      { code: '029', name: 'START (Systemic, Therapeutic, Assessment, Resources and Treatment)', note: 'A crisis prevention and response model for people who have both a developmental disability and mental health needs.' },
      { code: '048', name: 'Client/Parent Support Behavior Intervention Training', status: 'exemption', note: 'Behavior intervention training for the person and their parents. Usable only with a DDS-approved exemption.' },
      { code: '077', name: 'Parent-Coordinated Home Based Behavior Intervention Program for Autistic Children', note: 'A home behavior program for autistic children where the family coordinates the staff.' },
      { code: '605', name: 'Adaptive Skills Training Professional & Specialist', note: 'Formerly the Adaptive Skills Trainer. Builds communication, social and related skills.' },
      { code: '612', name: 'Behavior Analyst', note: 'A certified behavior analyst who assesses behavior and designs and oversees the behavior plan, including ABA-style services.' },
      { code: '613', name: 'Associate Behavior Analyst', note: 'An associate-level behavior analyst doing the same work at a supervised level.' },
      { code: '615', name: 'Behavior Management Assistant', note: 'Carries out a behavior plan under the direct supervision of a behavior management consultant.' },
      { code: '616', name: 'Behavior Technician (Paraprofessional)', note: 'A behavior technician delivering the plan under a certified analyst’s supervision.' },
      { code: '620', name: 'Behavior Management Consultant', note: 'A behavior specialist who designs the plan and trains the people who support the person day to day.' },
      { code: '625', name: 'Counseling Services', note: 'Licensed counseling: family counselors, clinical social workers and similar professionals.' },
    ],
  },
  {
    id: 'therapy',
    label: 'Therapies',
    codes: [
      { code: '106', name: 'Specialized Recreational Therapy', note: 'Recreation used as therapy toward a goal written into the IPP.' },
      { code: '115', name: 'Specialized Therapeutic Services (ages 3 to 20)', status: 'retired', note: 'Rate reform moved this to a new code on January 1, 2025.' },
      { code: '117', name: 'Specialized Therapeutic Services', note: 'Specialized therapy for someone who needs it based on clinical opinion.' },
      { code: '691', name: 'Art Therapist', note: 'A registered art therapist using art as a means of expression and treatment.' },
      { code: '692', name: 'Dance Therapist', note: 'A registered dance therapist using movement toward physical and emotional goals.' },
      { code: '693', name: 'Music Therapist', note: 'A registered music therapist using music and activities to work toward goals.' },
      { code: '694', name: 'Recreational Therapist', note: 'A certified recreational therapist using structured recreation as treatment.' },
      { code: '772', name: 'Physical Therapy', note: 'A licensed physical therapist working on movement, strength and mobility.' },
      { code: '773', name: 'Occupational Therapy', note: 'A licensed occupational therapist working on daily-living tasks and fine motor skills.' },
    ],
  },
  {
    id: 'early',
    label: 'Early Start (birth to three)',
    codes: [
      { code: '083', name: 'Public School Early Intervention Program', note: 'Early intervention delivered directly by a public school for infants and toddlers under 3.' },
      { code: '116', name: 'Early Start Specialized Therapeutic Services', note: 'Specialized assessment or therapy for infants and toddlers from birth to 36 months.' },
      { code: '805', name: 'Infant Development Program', note: 'Early Start services for babies and toddlers, at home or in a center.' },
      { code: '810', name: 'Infant Development Specialist', note: 'An individual specialist working with a baby or toddler and their parents.' },
    ],
  },
  {
    id: 'learn',
    label: 'Learning, skills and communication',
    codes: [
      { code: '015', name: 'School for the Deaf-Blind', note: 'A comprehensive program for deaf-blind students, including evaluation, training and room and board.' },
      { code: '025', name: 'Tutor Services - Group', status: 'retired', note: 'Rate reform moved group tutoring to a new code on January 1, 2025.' },
      { code: '102', name: 'Individual or Family Training', note: 'Training for the person or their family that a goal in the IPP calls for.' },
      { code: '107', name: 'Educational Services', note: 'Educational support that the school district does not provide.' },
      { code: '112', name: 'Communication Aides', note: 'Adaptive computer technology and the training to use it, for people who are deaf, hard of hearing or have other communication needs.' },
      { code: '520', name: 'Independent Living Program', note: 'Skills training for living on your own: cooking, cleaning, shopping, menu planning and getting around.' },
      { code: '630', name: 'Driver Trainer', note: 'A licensed instructor teaching someone to drive.' },
      { code: '635', name: 'Independent Living Specialist', note: 'An individual specialist teaching the functional skills needed to live independently.' },
      { code: '642', name: 'Interpreter', note: 'A sign language interpreter fluent in English and sign.' },
      { code: '643', name: 'Translator', note: 'A translator fluent in English and another spoken language.' },
      { code: '644', name: 'American Sign Language (ASL) Training and Support', note: 'Teaching ASL to a person who is deaf or hard of hearing, and to the people around them.' },
      { code: '670', name: 'Developmental Specialist', note: 'A certified developmental specialist working on developmental goals.' },
      { code: '672', name: 'Educational Psychologist', note: 'A licensed educational psychologist providing evaluation and consultation.' },
      { code: '674', name: 'Teacher', note: 'A credentialed California teacher.' },
      { code: '676', name: 'Teacher’s Aide', note: 'An aide working under a teacher’s supervision.' },
      { code: '678', name: 'Teacher of Special Education', note: 'A teacher with a California special education credential.' },
      { code: '680', name: 'Tutor Services', note: 'One-to-one instruction at home, alongside or apart from school.' },
    ],
  },
  {
    id: 'health',
    label: 'Health care',
    codes: [
      { code: '009', name: 'Medicare Part D Premium and Medications', note: 'Part D premiums, co-payments, or medications the drug plan excludes.' },
      { code: '056', name: 'Interdisciplinary Assessment Service', note: 'A specialized assessment by a team from more than one discipline.' },
      { code: '103', name: 'Specialized Health, Treatment and Training Services', status: 'exemption', note: 'Health or dental services with no other payer. Usable only with a DDS-approved exemption.' },
      { code: '700', name: 'Acute Care Hospitals', note: 'A licensed acute care hospital providing inpatient care.' },
      { code: '702', name: 'Adult Day Health Center', note: 'A licensed adult day health center providing health services during the day.' },
      { code: '706', name: 'Audiology', note: 'A licensed audiologist testing and treating hearing.' },
      { code: '707', name: 'Speech Pathology', note: 'A licensed speech pathologist working on speech, language and swallowing.' },
      { code: '710', name: 'Day Treatment Centers', note: 'Outpatient treatment at an acute care or acute psychiatric hospital.' },
      { code: '715', name: 'Dentistry', note: 'A licensed dentist.' },
      { code: '720', name: 'Dietary Services', note: 'A registered dietitian prescribing or adjusting a person’s diet.' },
      { code: '730', name: 'Hearing and Audiology Facilities', note: 'A facility that diagnoses hearing loss and fits treatment.' },
      { code: '735', name: 'Laboratory and Radiologic Services', note: 'Licensed labs and imaging services.' },
      { code: '741', name: 'Nurse Anesthetist', note: 'A licensed and certified nurse anesthetist.' },
      { code: '742', name: 'Licensed Vocational Nurse', note: 'A licensed vocational nurse.' },
      { code: '743', name: 'Nurse’s Aide or Assistant', note: 'A certified nurse’s aide, or a registry that supplies one.' },
      { code: '744', name: 'Registered Nurse', note: 'A licensed registered nurse, or a registry that supplies one.' },
      { code: '745', name: 'Orthoptic Services', note: 'A certified orthoptic technician treating eye movement and alignment.' },
      { code: '760', name: 'Other Medical Services', note: 'Medical services and clinics that no other code on this list covers.' },
      { code: '765', name: 'Pharmaceutical Services', note: 'A licensed pharmacist preparing and dispensing medication.' },
      { code: '775', name: 'Physicians or Surgeons', note: 'A licensed physician or surgeon.' },
      { code: '780', name: 'Psychiatrist', note: 'A licensed physician board certified in psychiatry.' },
      { code: '785', name: 'Clinical Psychologist', note: 'A licensed clinical psychologist providing assessment and treatment.' },
      { code: '790', name: 'Psychiatric Technician', note: 'A licensed psychiatric technician providing services under medical direction.' },
      { code: '793', name: 'Respiratory Therapist', note: 'A certified respiratory care practitioner.' },
      { code: '800', name: 'Genetic Counselor', note: 'A California-licensed genetic counselor.' },
    ],
  },
  {
    id: 'equip',
    label: 'Equipment and changes to home or vehicle',
    codes: [
      { code: '021', name: 'Vehicle Modification and Adaptation', note: 'Lifts, controls and other changes to a vehicle for independence or safety.' },
      { code: '051', name: 'Personal Emergency Response System (PERS)', note: 'A 24-hour call system so a person can reach help in an emergency.' },
      { code: '104', name: 'Environmental Accessibility', note: 'Changes to the home, such as ramps, grab bars or widened doors, that a goal in the IPP calls for.' },
      { code: '655', name: 'Out-of-State Manufacturer or Distributor', note: 'Buying an item from outside California when it is unavailable here or cheaper there.' },
      { code: '660', name: 'Retail/Wholesale Stores', note: 'A licensed store supplying goods a plan authorizes.' },
      { code: '725', name: 'Durable Medical Equipment Dealer', note: 'A dealer that makes, fits or sells durable medical equipment.' },
      { code: '750', name: 'Orthotic and Prosthetic Services', note: 'Braces, orthotics and prosthetic limbs, made and fitted by a certified provider.' },
      { code: '755', name: 'Other Medical Equipment or Supplies', note: 'Eyeglasses, hearing aids and other medical supplies not covered by another code.' },
    ],
  },
  {
    id: 'transport',
    label: 'Getting around',
    codes: [
      { code: '057', name: 'Air Charter Service', note: 'Emergency air transport when the IPP calls for it.' },
      { code: '105', name: 'Travel Reimbursement', note: 'Travel costs such as tickets, lodging and per diem incurred to carry out an IPP.' },
      { code: '425', name: 'Transportation - Family Member', note: 'A family member arranges or provides the ride to and from authorized services.' },
      { code: '645', name: 'Mobility Training Services Agency', status: 'retired', note: 'Agency-based training in using buses and getting around. Moved to a new code on January 1, 2025.' },
      { code: '650', name: 'Mobility Training Services Specialist', status: 'retired', note: 'The individual-specialist version of mobility training. Moved to a new code on January 1, 2025.' },
      { code: '875', name: 'Transportation Company', note: 'Rides to and from day programs and other services, provided by a vendored transportation company.' },
      { code: '880', name: 'Transportation - Additional Component', note: 'Transportation vendored separately from the main service it supports.' },
      { code: '882', name: 'Transportation Assistant', note: 'Someone who rides along to assist and monitor a person during the trip.' },
      { code: '883', name: 'Transportation Broker', note: 'Plans routes and schedules without driving the vehicle.' },
      { code: '885', name: 'Transportation - Medical', note: 'Medical transportation meeting Title 22 standards.' },
      { code: '890', name: 'Transportation Auto Driver', note: 'An individual driver providing the rides an IPP authorizes.' },
      { code: '895', name: 'Transportation - Public Transit, Dial-A-Ride, Rental Car or Taxi', note: 'Bus passes, paratransit, rental cars and taxis used as authorized transportation.' },
    ],
  },
  {
    id: 'sd',
    label: 'Self-Determination and participant-directed services',
    codes: [
      { code: '099', name: 'Self-Directed Support Services', note: 'General self-directed supports after a Self-Determination Program orientation and before enrollment.' },
      { code: '455', name: 'Participant-Directed Day Care Service - Family Member', note: 'Day care chosen and arranged by a family member under a self-directed budget.' },
      { code: '456', name: 'Participant-Directed Personal Assistance', note: 'Personal assistance the participant hires and directs themselves.' },
      { code: '457', name: 'Participant-Directed Independent Living Services', note: 'Independent living skills support the participant directs themselves.' },
      { code: '458', name: 'Participant-Directed Supported Employment', note: 'Job development and coaching the participant directs, including support for self-employment.' },
      { code: '459', name: 'Participant-Directed Social Recreation, Camp and Non-Medical Therapies', note: 'Recreation, camp and non-medical therapies bought through a Financial Management Service from a non-vendored provider.' },
      { code: '460', name: 'Participant-Directed Nursing Service - Family Member', note: 'Nursing the family member selects, assigns and monitors under a self-directed budget.' },
      { code: '465', name: 'Participant-Directed Respite Service - Family Member', note: 'Respite where the family picks and directs the respite worker themselves.' },
      { code: '470', name: 'Participant-Directed Transportation - Family Member', note: 'Transportation the family arranges under a self-directed budget.' },
      { code: '475', name: 'Participant-Directed Community-Based Training Service for Adults', note: 'An adult day service, participant-directed, building skills for community employment and participation.' },
      { code: '490', name: 'Financial Management Services - Fiscal/Employer Agent (F/EA)', note: 'The fiscal agent that handles paychecks and taxes when the participant is the employer.' },
      { code: '491', name: 'Financial Management Services - Co-Employer', note: 'The co-employer version of a Financial Management Service, where the FMS shares employer duties.' },
    ],
  },
  {
    id: 'other',
    label: 'Money, legal help and other',
    codes: [
      { code: '001', name: 'Funeral Service', note: 'Funeral services.' },
      { code: '024', name: 'Purchase Reimbursement', note: 'Reimbursement for a purchase that meets a goal in the IPP.' },
      { code: '034', name: 'Money Management', note: 'Skills training in handling money and budgeting.' },
      { code: '065', name: 'SSP Restoration', note: 'Funds so someone living independently is not pushed into a more restrictive setting by an SSI/SSP cut.' },
      { code: '097', name: 'Wellness Initiative Projects', note: 'DDS-approved projects promoting health and wellbeing for Californians with developmental disabilities.' },
      { code: '100', name: 'Professional Copying, Reporting, and Technical Services', note: 'Specialized administrative services needed to carry out an IPP, such as records copying or reporting.' },
      { code: '111', name: 'Supplemental Program Support (Other)', note: 'Time-limited extra staffing beyond what regulation requires, where no other supplemental code fits.' },
      { code: '400', name: 'Nonreimbursed P&I', note: 'A regional center accounting code for nonreimbursed program and instruction costs.' },
      { code: '610', name: 'Attorney', note: 'A California attorney who advises on your rights and represents you in administrative proceedings such as a fair hearing.' },
      { code: '999', name: 'Start-Up Funding for CPP/PDF', note: 'Start-up money for Community Placement Plan and Program Development Fund projects.' },
    ],
  },
]

// Flat list, sorted by code, so the number on an invoice or IPP can be looked up
// directly. Each entry carries its group back with it.
export const SERVICE_CODES = SERVICE_CODE_GROUPS
  .flatMap((g) => g.codes.map((c) => ({ ...c, group: g.id, groupLabel: g.label })))
  .sort((a, b) => a.code.localeCompare(b.code))

// Date of the DDS listing this file was transcribed from. Shown in the UI so a
// reader knows how current the list is without having to trust it blindly.
export const SERVICE_CODES_SOURCE = {
  title: 'DDS Service Code Descriptions, January 2026',
  url: 'https://www.dds.ca.gov/wp-content/uploads/2026/02/ServiceCodeDescriptions_January2026.pdf',
  date: '2026-01-01',
}
