# Utah state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://dspd.utah.gov/medicaid-waivers/
- https://medicaid.utah.gov/ltc-2/
- https://law.justia.com/codes/utah/2022/title-62a/chapter-5/
- https://law.justia.com/codes/utah/2022/title-62a/chapter-5b/
- https://dspdmanuals.hs.utah.gov/Support_Coordination/Support_Coordination_Overview.htm
- https://utahparentcenter.org/wp-content/uploads/2020/06/PCSP-Manual-06.01.2020.pdf
- https://medicaid.utah.gov/hearings/
- https://medicaid.utah.gov/Documents/pdfs/Forms/HearingRequest2023.pdf
- https://daas.utah.gov/adult-protective-services/
- https://disabilitylawcenter.org/

chunks:
```js
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
```

flags: Could not directly load the full text of Utah Code Chapter 5b (law.justia.com returned a 403 to automated fetch), so the rights chunk relies on search-result summaries of its section titles rather than the complete statutory language; the team should pull the full text from le.utah.gov before publishing. Adult Protective Services in Utah covers adults 18 to 64 with qualifying impairments and adults 65 and older, so younger children with disabilities in DSPD services may need a different reporting channel (such as Utah's Division of Child and Family Services); this pack did not verify a separate child-abuse hotline. Utah Code Chapter 5b appears to be a general disability rights and anti-discrimination statute rather than one specific to DSPD waiver participants, so it is framed that way rather than as a "bill of rights" tied only to HCBS services.
