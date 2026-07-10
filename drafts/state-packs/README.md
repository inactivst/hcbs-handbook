# State pack drafts - team vetting queue

These are AI-drafted state content packs for HandBook's multi-state feature.
**Nothing in this folder is live.** The app only answers with state specifics
for states listed in `api/_corpus.js` `STATES` (currently CA only); everyone
else gets the federal baseline plus a referral.

## How to vet a state
1. Open the state's .md file. Read the `flags:` line first - it lists exactly
   what the drafter could not verify from an official source.
2. Check every phone number, deadline, and statute citation against the listed
   sources (all official/state or P&A pages).
3. Fix or trim anything questionable. When a fact can't be confirmed, keep the
   hedged wording ("check your notice") rather than a specific claim.

## How to promote a vetted state
1. Copy the objects in the `chunks:` code block into `api/_corpus.js`, inside
   the `STATES` map:
   ```js
   TX: { name: 'Texas', chunks: [ ...the chunk objects... ], serviceCodes: [] },
   ```
2. Watch for apostrophes inside single-quoted citation strings (see NC's note).
3. Commit and push. The state instantly flips to "covered": its pack grounds
   answers, and the Rights page shows a "State guide" badge for it.

Drafted 2026-07-10 from official sources: TX, FL, NY, PA, IL, OH, GA, NC, MI, NJ.
Remaining 40 states + DC: same process, batches on request.
