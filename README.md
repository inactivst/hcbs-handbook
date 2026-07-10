# HandBook - HCBS Rights Guide

Plain-language chat guide to HCBS (Home and Community-Based Services) rights, focused on California's regional center system. Vite + React front end, one Vercel serverless function grounded in a bundled corpus of public regulations (42 CFR 441.301, Lanterman Act, CA DDS service codes).

**Models:** two providers with automatic failover. The primary answers each request; if it errors or is rate-limited (HTTP 429), the endpoint falls over to the next provider, so a throttled free tier no longer surfaces "HandBook is busy" to users. Grok only joins the chain when `XAI_API_KEY` is set, so the app keeps running on Gemini alone until that key is added.

- `PROVIDER_ORDER` (default `gemini,grok`) sets primary/fallback. Gemini is primary by default because its free tier is free; Grok (paid) picks up the overflow. Flip to `grok,gemini` to prefer Grok.
- `GEMINI_MODEL` default `gemini-flash-latest`; `XAI_MODEL` default `grok-4.3`.

The app was originally built and tested on `claude-opus-4-8` / `claude-haiku-4-5` via the Anthropic API; Claude can be dropped into the same provider map in `api/chat.js` (re-add `@anthropic-ai/sdk` and add a `callClaude` alongside `callGemini` / `callGrok`).

## Privacy model
- No accounts, no database, no server-side storage or logging of messages.
- Conversations live only in the browser tab; refresh clears them.
- All knowledge content is public regulation. Users are told not to enter personal details.

## Deploy (Vercel)
1. Import the repo into Vercel (framework: Vite).
2. Add env vars to Production + Preview:
   - `GEMINI_API_KEY` (required; get one free at aistudio.google.com/apikey)
   - `XAI_API_KEY` (optional; from console.x.ai) enables the Grok fallback that clears the "busy" rate-limit wall
   - `PROVIDER_ORDER`, `GEMINI_MODEL`, `XAI_MODEL` (all optional; see Models above)
3. After first deploy, smoke-test the live endpoint (api/ functions are unbundled ESM). The JSON includes `provider` so you can see which model answered:
   `curl -X POST https://<domain>/api/chat -H 'Content-Type: application/json' -d '{"messages":[{"role":"user","content":"Can my group home lock the fridge?"}]}'`

## Structure
- `src/App.jsx` - chat UI + Rights Library (imports the same corpus as the API)
- `api/chat.js` - retrieval + multi-provider call (Gemini/Grok failover), returns `{reply, provider, sources}`
- `api/_corpus.js` - regulation chunks + verified CA DDS service code starter set

## Local dev
`npm run dev` serves the UI only. `/api/chat` needs the Vercel runtime (`npx vercel dev`) or the deployed URL via `VITE_API_ORIGIN`.
