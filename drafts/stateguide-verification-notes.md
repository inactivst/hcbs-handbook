# STATE_GUIDE verification notes - July 2026 pass

Per-state confidence notes from the official-source verification pass that built
the 45 new STATE_GUIDE entries (src/stateGuide.js, commit 93b0474). Each entry
records which facts were confirmed by directly fetching an official page vs.
corroborated through search-indexed snippets of official pages (used when a state
site blocks automated fetching). TX/FL/NY/PA/IL were verified in the July 12 pass
and re-emitted unchanged; CA keeps its bespoke regional-center finder.

## Prioritize a human click-through (state site blocked automated fetch)

AZ (des.az.gov), AR (humanservices.arkansas.gov), NH (dhhs.nh.gov), OH
(dodd.ohio.gov), ND (hhs.nd.gov), SD (dhs/dss.sd.gov), KS (kdads/kancare.ks.gov),
WI (dhs.wisconsin.gov), MN (mn.gov). For these, phone numbers rest on convergent
search grounding of the official pages plus directly-fetched secondary official
sources - eyeball the live page before treating the number as vetted.

## Per-state notes

### AK
Appeal deadline UPGRADED from draft hedge to confirmed 30 days (exact quote, AK DPA manual 117-1.D, includes Medicaid). Continued-benefits = file before effective date (117-2), not 'within 10 days' as draft guessed. IDD-specific routing vs SDS-internal unconfirmed, so appeals contact described generically. APS+SDS share central lines (confirmed AK structure). APS 24/7 unconfirmed.

### AL
15-day DD-level appeal deadline + Call Center 1-800-361-4491 confirmed via direct fetch (exact quotes) from mh.alabama.gov. 15-day = first-level DMH DD appeal (a further Medicaid Agency fair hearing may be a 2nd step, its deadline unverified so not stated). Abuse hotline 24/7 unconfirmed, hours omitted. findUrl = provider directory (filter county + Developmental Disabilities).

### AR
humanservices.arkansas.gov JS-rendered (nav-shell to WebFetch, 403 to curl). Facts via convergent search grounding (2+ queries each): 30-day appeal deadline, DDS Intake 501-683-5687 (NEW — draft had no intake phone), Adult Maltreatment Hotline 24/7 (newly confirmed). No direct-dial for Office of Appeals + Hearings found, so url used. Human spot-check advised on the intake number.

### AZ
des.az.gov (DDD appeal/contact/APS pages) blocks all fetches (Cloudflare, confirmed via WebFetch + curl). 60-day DDD appeal + OAR phones (602-771-8163 / 1-844-770-9500 opt 3) match draft, cross-confirmed via 2 search-grounded queries quoting live page (address, mail-drop, email) but not raw fetch — human spot-check advised. APS hours contradictory across sources, omitted. AHCCCS-domain facts all direct-fetched.

### CO
Agency/entry/phones re-verified via direct fetch (hcpf + cdhs.colorado.gov: 403 plain, 200 w/ browser UA via curl). Correction: Disability Law Colorado rebranded to 'Disability Justice' (disabilityjustice.co); P&A designation + phones unchanged (1-800-288-1376). Mistreatment hotline 1-844-264-5437 corroborated across county sites. 60-day deadline via healthfirstcolorado.com/appeals (NEW — draft had none). OAC clerks 303-866-5626 confirmed.

### CT
Fair-hearing deadline (60 days) confirmed via direct verbatim fetch of official OLCRAH 'Requesting a Hearing' page (60 days for all programs except SNAP). Abuse Division 24/7 availability unconfirmed, so omitted. DRCT toll-free 1-800-842-7303.

### DC
High confidence. All four contacts and both fair-hearing deadlines confirmed via direct fetches of official dhcf.dc.gov, dds.dc.gov, dacl.dc.gov, uls-dc.org.

### DE
Fair-hearing deadline (90 days) via Cornell LII mirror of 16 Del. Admin. Code 2101-5.0. Fair-hearing phone is DMMA main line (no dedicated fair-hearing extension found). APS number search-corroborated (direct fetch 404'd though content live).

### GA
Fair-hearing deadline (30 days; 10-day aid-paid-pending) via direct fetch of official DFCS Appendix B. Requests normally filed through county DFCS; OSAH phone offered as best statewide contact.

### HI
Formal hearing deadline (90 days) and informal review (15 working days) via direct fetch of official DDD page (no phone listed, so url used). APS island-by-island; Oahu line + statewide online URL both listed.

### IA
Entry point genuinely split (HHS TCM vs MCO case management); used local HHS office as intake, explained honestly. All phones + 90-day deadline + 10-day continued-benefits directly fetched from official hhs.iowa.gov.

### ID
DD intake is genuinely regional (7 offices, no single statewide DD phone); used office locator + apply-page regional table + 211 CareLine (honestly described as general). medicaid.gov factsheet 403'd; waiver title from search title text. APS 24/7 not confirmed, no claim made. 28-day deadline + 10-day continued-benefits directly fetched.

### IN
Corrected stale draft agency name: BDDS -> Bureau of Disabilities Services (BDS) under DDARS. Corrected OALP address. Appeal deadline hedged to 'check your notice' because Indiana's own official appeals pages decline to state one universal deadline. APS 24/7 corroborated by multiple secondary gov sources.

### KS
kdads.ks.gov + kancare.ks.gov 403 every fetch (README flag confirmed); those facts via search quoting live official text, cross-checked against DRC Kansas + oah.ks.gov (direct, confirmed 785-296-2433 + 123-day) + Kansas Register (CSW effective date). Team should eyeball live KDADS pages before publishing. CSW takes effect Oct 1 2026, phrased as not-yet-available.

### KY
P&A designation confirmed via direct fetch of kypa.net. Appeal deadline hedged to 'check your notice': 907 KAR 1:563 gives 30 days (non-MCO) but MCO track cites up to 120 days; could not pin which applies to MPW/SCL denials. APS 24/7 not stated on official page, no claim made.

### LA
High, all facts direct-fetched (double-verified). NEW: Louisiana renamed OCDD to Office of Intellectual and Developmental Disability Supports (OIDD) under Act 702; most URLs still say OCDD, both names given. findUrl changed to LGE locator (the actual local entry point). 30-day deadline confirmed on Division of Administrative Law page; phone = LDH's phone-appeal line. Fair hearings had two LDH numbers (225-342-5800 / 225-342-0443), normalized to one.

### MA
High, upgraded. mass.gov blocked WebFetch + curl site-wide; a real-browser pass loaded the actual pages and found a clean 60-day fair-hearing deadline ('within 60 calendar days from the date you received the notice') + Board of Hearings phone 800-655-0338 + DDS Central 617-727-5608. Area Office count not asserted (locator shows mixed results). DLC + DPPC fetched directly.

### MD
High, all direct-fetched (double-verified incl. DDA HQ, OAH, DRM numbers). Local entry = DDA Regional Office (not CCS, assigned post-eligibility). Oct 2025 consolidation into one Community Pathways waiver confirmed on live pages. APS 24h not stated on official page, not claimed. Fair-hearing page has no submit-phone (online/mail/fax); 410-229-4100 = OAH general line + official url. DRM/DDA had direct+tollfree pairs, normalized to toll-free.

### ME
High, every phone + URL direct-fetched (mostly twice). Resolves draft's biggest flag: fair-hearing deadline is 60 days to request + 10 days for continued services, confirmed on maine.gov/dhhs/oms/member-resources + cross-checked vs reg (10-144 ch.101 12.08). Two-step entry (OADS intake -> Case Management agency) both confirmed. APS-anonymous claim dropped (unconfirmed).

### MI
High, direct-fetched (curl w/ browser UA to work around michigan.gov block; APS + MOAHR re-confirmed in raw page text). No statewide HSW/CMHSP intake phone exists, so start.text points to the CMHSP directory + customer-service fallback. MOAHR deadline HEDGED: internal CMHSP/PIHP appeal (60d) + state fair hearing (120d from that decision) are two different notices; folding either into one card risked misleading. findUrl swapped from a PDF to the local-services locator page.

### MN
mn.gov behind PerimeterX bot-wall; corroborated via search snippets of exact official URLs + direct fetch of lawhelpmn.org/mylegalaid.org. DHS Appeals 800-657-3510 across official notice PDFs. MAARC 24/7 claim dropped (unconfirmed).

### MO
Abuse hotline explicitly NOT 24h (7am-8pm, 365 days; 24/7 online only) via health.mo.gov/dss.mo.gov. 90-day hearing deadline + 10-day continued-benefits directly confirmed via FSD Hearings Manual. 120-day managed-care variant search-corroborated. Fair-hearing phone is FSD general info line.

### MS
drms.ms SSL error; DRMS phone corroborated via askjan.org + NDRN listing. Abuse hotline 24h unconfirmed (dropped). DMH Helpline 24/7 directly confirmed. Fair-hearing 30 days directly confirmed via medicaid.ms.gov eligibility-hearings.

### MT
APS phone+hours directly confirmed. 90-day fair-hearing deadline + OAH phone 406-444-2470 from search snippets of official dphhs.mt.gov + MLSA (primary PDF unreadable binary). DRM phones directly confirmed. 406-444-1714 doubles as central + Helena regional office.

### NC
High confidence. All contacts, LME/MCO locator, 120-day OAH deadline confirmed via direct fetch of official ncdhhs.gov/medicaid.ncdhhs.gov/oah.nc.gov. APS goes through county DSS (official page confirms no statewide hotline) so url used. First-level Tailored Plan appeal deadline unconfirmed, not stated; only confirmed 120-day OAH step included.

### ND
30-day deadline corroborated by 2 ND policy-manual sections (448-01-30-10 + 510-05-25-30). hhs.nd.gov JS-rendered, blocked direct fetch; confirmed via search-index — recommend human click-through. VAPS staffed weekdays 8-5 CT + voicemail (not 24h). P&A + DD Division phones independently confirmed.

### NE
DDD toll-free 1-877-667-6266 + 90-day deadline directly fetched (DD-Notice-of-Decision.aspx). Hearing Office phone 402-471-7237 search-corroborated (page listed only email). Abuse hotline 24/7 corroborated. 120-day managed-care mirrors draft, not independently re-verified.

### NH
PARTIAL - dhhs.nh.gov 403 every fetch (README flag). Area Agency finder URL + BDS phone via search-index of official domain + 2 independent third-party PDFs. 30-day deadline + Appeals Unit phone confirmed via direct fetch of DRC-NH (quotes DHHS). Team should manually check the 2 dhhs.nh.gov URLs before publishing. Multi-number contacts normalized to single dialable number.

### NJ
Entry point (county Community Services Offices) confirmed via direct fetch of official locator + apply pages. DDD-specific 20-day fair-hearing deadline (N.J.A.C. 10:48) confirmed as correct vs the 60-day general FamilyCare figure. Abuse hotline 24/7 via search-index (page 404'd on direct fetch). Abuse + general share the 1-800-832-9173 line (press 1 for hotline).

### NM
High confidence. Every phone, 90-day deadline, and both locator URLs confirmed via direct fetch of official hca.nm.gov + aging.nm.gov. APS 24h not stated on official page, omitted. Mi Via/Medically Fragile names carried from draft (low-stakes, not re-verified).

### NV
All contacts + 90-day deadline confirmed. dhcfp.nv.gov redirects to nevadamedicaid.nv.gov; Hearings Unit 775-684-3604 confirmed on official medicaid.nv.gov. NDALC + APS have regional numbers (primary in phone, regional alt in desc). APS 24h claim dropped (unconfirmed on ADSD page).

### OH
dodd.ohio.gov 404'd to fetcher (bot-block; pages live via search) — county-board locator, waiver names, eligibility page via search-index, recommend human click-through. Abuse hotline + business-hours (not 24h) confirmed via DODD complaint form app. 90-day/15-day rule via ohiomh.com (Ohio Medicaid consumer site).

### OK
Corrected intake phone: DDS now uses Liberty of Oklahoma 405-500-1866 (confirmed live), not draft's stale 405-521-3571. Appeal deadline HEDGED: genuine conflict — Title 340 rules say 30 days (FFS/DDS), OHCA SoonerSelect says 120 days (managed care); which governs unclear, so 'check your notice'. Dropped Homeward Bound Waiver (closed lawsuit class). Abuse hotline 24h confirmed.

### OR
All core facts fetched directly from oregon.gov (CDDP locator, application, hearings rule, abuse hotline hours, waiver list). No dedicated ODDS Hearings phone (fax/email/verbal only), so general ODDS number + hearings URL listed. 90-day/10-business-day corroborated by official page + search summary.

### RI
All core facts fetched directly. 35-day = 30 days from contested action + 5 days rule defines as post-mailing (210-RICR-10-05-2, fetched). Separate 120-day Level 2 is managed-care only, not used. '37 agencies' softened to 'dozens'. RI layered appeals — worth final human check.

### SC
High. Confirmed via direct fetch of ddsn.sc.gov + bhdd.sc.gov: apply phone, OIDD structure (5 regional clinical offices + contracted case managers, now inside BHDD after April 2025 DDSN reorg), abuse split (SLED VAIU residential vs DSS APS community, APS 24h), DRSC phone, SCDHHS 30-day deadline (+10-day continued-benefits).

### SD
Medium-high. dhs.sd.gov + dss.sd.gov JS-rendered (Loading placeholder to fetcher); facts via search grounding + direct fetch of dakotaathome.sd.gov + drsdlaw.org (SD P&A). Dakota at Home 1-833-663-9673 (opt 2 = DDD) + DDD line 605-773-5990 confirmed. 30-day deadline search-corroborated, matches draft.

### TN
High. Mostly direct fetch of tn.gov. Correction: DIDD merged into new cabinet-level Dept of Disability and Aging (DDA) eff July 1 2024 (draft said DIDD). New: 3 named Regional Intake Offices w/ distinct phones. 60-day appeal + 1-800-878-3192 direct-fetched; 20-day continued-benefits via Cornell LII mirror of TennCare reg 1200-13-14-.11.

### UT
High on process + phones. DSPD process, phones (1-844-275-3773, 801-538-6576 OAH, 1-800-371-7897 APS), and deadlines (30/90/120 by decision type) via direct fetch of dspd.utah.gov + medicaid.utah.gov. DLC phone via search grounding (direct fetch timed out). APS staffed weekdays, online 24/7.

### VA
All core facts fetched + confirmed from official VA pages. DMAS Appeals phone is division general line (no toll-free client hotline found). My Life My Community (DBHDS-partnered) listed as best CSB-finder help line.

### VT
Two process changes found this session: (1) since Aug 11 2025 new DD applications go through centralized PCG Intake team 1-833-426-5668 (direct fetch of PCG official VT page), not the local DA; (2) since Oct 1 2025 case management split to 2 statewide CMOs (Benchmark, Columbus). ddsd/dvha/humanservices.vermont.gov all 403'd (README flag). Appeal deadline HEDGED per instructions (90 general vs 120 for internal-appeal stage; likely not a true contradiction but unconfirmed via primary source).

### WA
Core facts confirmed from official dshs.wa.gov, oah.wa.gov, hca.wa.gov. 90-day deadline + 10-day continued-coverage via indexed snippet of official HCA page (renders nav-only to fetcher). Replaced draft's unverified DDA phone (360-725-3413) with 360-407-1500, confirmed on two official DSHS pages.

### WI
dhs.wisconsin.gov 403 on every fetch (same as draft); facts via indexed snippets of official pages cross-checked vs GWAAR + doa.wi.gov (direct). 45-vs-60-day is REAL not a gap: 45 days IRIS/general fair hearing (confirmed via DHA EM Handbook), 60 days Family Care MCO-level appeal (DHS 10.55). Hedge is accurate.

### WV
Core facts confirmed from official WV pages. 90-day deadline confirmed vs official DHHR policy-manual PDF + Legal Aid WV summary. WV Board of Review moved under Office of Inspector General after 2023-24 DHHR reorg; confirmed via oig.wv.gov. Agency updated to current DoHS/BMS structure.

### WY
Core facts confirmed from official WY pages incl. full read of WY Medicaid Rule Chapter 46 (30-day hearing window, consistent with W.S. 42-4-108). Aid-paid-pending unverified, left out. findUrl points to stable .gov hub (case-manager search tool wyoimprov.com mid-migration to WYSERVES).

