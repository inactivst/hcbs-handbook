# New Jersey state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.nj.gov/humanservices/ddd/assets/documents/services/participant-enrollment-agreement-english.pdf
- https://www.nj.gov/humanservices/notices/documents/rules-and-regulations/NJAC%2010_48%20APPEAL%20PROCEDURE.PDF
- https://www.nj.gov/humanservices/ddd/assets/documents/providers/isp-plan-review-guidance.pdf
- https://www.nj.gov/humanservices/ool/documents/OOLBulletin111225HumanRightsCommittees.docx.pdf
- https://www.nj.gov/humanservices/ddd/individuals/consumer/reportsuspectedabuse/
- https://www.nj.gov/treasury/njombudsman/emergency-adults.shtml
- https://www.ndrn.org/about/ndrn-member-agencies/

chunks:
```js
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
```

flags: Could not verify the children's move to the Children's System of Care from a fetchable official page (nj.gov DDD HTML pages returned 404 to the fetcher), so it is hedged; could not confirm whether services continue during an appeal (aid-paid-pending), so hedged with "check your notice"; note that general NJ FamilyCare managed-care members are told 60 days for fair hearings in a nj.gov notice while the DDD-specific rule (N.J.A.C. 10:48-6.2) says 20 days, so the human vetting team should reconcile which applies per notice type; the popular name "Developmentally Disabled Rights Act" was not found on an official source, so the chunk uses the state's own phrasing "Rights of the Developmentally Disabled" (N.J.S.A. 30:6D-1 et seq., verified in a NJ DHS Office of Licensing bulletin and N.J.A.C. 10:48, which cites N.J.S.A. 30:6D-10 through 12 for service plans).
