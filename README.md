# HandBook - HCBS Rights Guide

Plain-language chat guide to HCBS (Home and Community-Based Services) rights, focused on California's regional center system. Vite + React front end, one Vercel serverless function calling the Claude API, grounded in a bundled corpus of public regulations (42 CFR 441.301, Lanterman Act, CA DDS service codes).

## Privacy model
- No accounts, no database, no server-side storage or logging of messages.
- Conversations live only in the browser tab; refresh clears them.
- All knowledge content is public regulation. Users are told not to enter personal details.

## Deploy (Vercel)
1. Import the repo into Vercel (framework: Vite).
2. Add env var `ANTHROPIC_API_KEY` (Production + Preview).
3. After first deploy, smoke-test the live endpoint (api/ functions are unbundled ESM):
   `curl -X POST https://<domain>/api/chat -H 'Content-Type: application/json' -d '{"messages":[{"role":"user","content":"Can my group home lock the fridge?"}]}'`

## Structure
- `src/App.jsx` - chat UI + Rights Library (imports the same corpus as the API)
- `api/chat.js` - retrieval + Claude call (`claude-opus-4-8`), returns `{reply, sources}`
- `api/_corpus.js` - regulation chunks + verified CA DDS service code starter set

## Local dev
`npm run dev` serves the UI only. `/api/chat` needs the Vercel runtime (`npx vercel dev`) or the deployed URL via `VITE_API_ORIGIN`.
