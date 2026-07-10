# Ohio state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://codes.ohio.gov/ohio-revised-code/section-5123.62
- https://codes.ohio.gov/ohio-administrative-code/rule-5123-4-02
- https://codes.ohio.gov/ohio-administrative-code/rule-5123-9-06
- https://codes.ohio.gov/ohio-administrative-code/rule-5123-9-40
- https://codes.ohio.gov/ohio-administrative-code/rule-5101:6-3-02
- https://codes.ohio.gov/ohio-administrative-code/rule-5101:6-4-01
- https://codes.ohio.gov/ohio-revised-code/section-5101.35
- https://ocf.prodapps.dodd.ohio.gov/
- https://www.disabilityrightsohio.org/contact

chunks:
```js
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
```

flags: DODD's own website pages (dodd.ohio.gov) returned 404 to the fetcher, so waiver names/administration and the hotline were verified instead via Ohio Admin. Code rules 5123-9-06 and 5123-9-40 and DODD's own online complaint form app (ocf.prodapps.dodd.ohio.gov, which shows the 1-800-617-6733 hotline); the "respond within 30 days to requested changes" detail comes from a summarized fetch of OAC 5123-4-02 and is stated softly.
