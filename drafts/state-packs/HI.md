# Hawaii state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://health.hawaii.gov/ddd/participants-families/waiver/
- https://health.hawaii.gov/ddd/participants-families/informal-review-administrative-hearing/
- https://health.hawaii.gov/ddd/about/statute-rules/
- https://law.justia.com/codes/hawaii/title-19/chapter-333f/
- https://humanservices.hawaii.gov/ssd/home/adult-services/
- https://apsreport.hawaii.gov/
- https://hawaiidisabilityrights.org/

chunks:
```js
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
```

flags: The full enumerated text of HRS 333F-8 could not be directly fetched (capitol.hawaii.gov and justia.com both returned 403 to automated requests), so the rights chunk is limited to what was confirmed through search-result excerpts about Chapter 333F's least-restrictive-environment and community-services principles, and it explicitly tells the reader to confirm the full list with DDD or Hawaii Disability Rights Center. The DDD appeal page did not state whether aid-paid-pending applies to waiver service reductions, so the appeals chunk hedges and tells the reader to check their notice. The exact review cadence for the individual service plan could not be confirmed from an official DDD page, so no specific frequency is stated in the agency/waivers chunk beyond noting a case manager leads person-centered planning.
