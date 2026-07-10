# Maine state pack - DRAFT, not live
Status: AI-drafted 2026-07-10, awaiting team vetting. Promote into `api/_corpus.js` STATES only after review.

sources:
- https://www.maine.gov/dhhs/oads/get-support/adults-intellectual-disability-and-autism/waiver-services
- https://www.maine.gov/dhhs/oads/providers/adults-with-intellectual-disability-and-autism/forms-protocols
- https://regulations.justia.com/states/maine/10/144/chapter-101/chapter-ii/section-144-101-ii-21/subsection-144-101-ii-21-04/
- https://legislature.maine.gov/statutes/34-B/title34-Bsec5605.html
- https://www.maine.gov/dhhs/about-us/administrative-hearings/faq
- http://www.maine.gov/dhhs/hearings/hearings.htm
- https://www.maine.gov/dhhs/oads/get-support/aps/report-abuse-neglect-exploitation
- https://drme.org/get-in-touch/

chunks:
```js
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
```

flags: Title 34-B Section 5605 was described by search results as having undergone significant amendments effective April 1, 2026, splitting provisions for children and adults with distinct behavioral support frameworks, so the rights chunk hedges by telling the reader to confirm the current version with OADS or Disability Rights Maine rather than treating the summarized rights list as exhaustive or final. The appeal deadline figures (30 days for denials, 60 days for reductions/terminations, and a 10-to-15 day window for continued services) came from a secondary summary source (mainecahc.org) rather than a directly fetched DHHS hearings page, since the official maine.gov hearings pages did not return clean text on fetch; team should verify these numbers against the current DHHS Administrative Hearings FAQ before publishing.
