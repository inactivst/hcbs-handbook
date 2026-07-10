# HandBook - HCBS Rights Guide

Plain-language chat guide to HCBS (Home and Community-Based Services) rights, focused on California's regional center system. Vite + React front end, one Vercel serverless function grounded in a bundled corpus of public regulations (42 CFR 441.301, Lanterman Act, CA DDS service codes).

**Models:** multiple providers with automatic failover. The primary answers each request; if it errors or is rate-limited (HTTP 429), the endpoint falls over to the next provider, so a throttled free tier no longer surfaces "HandBook is busy". Each provider only joins the chain when its key is set.

- **Groq** (`GROQ_API_KEY`) is the recommended **free** primary: the inference company Groq (with a Q), NOT xAI's Grok. Free tier, no credit card, ~1,000 req/day on `llama-3.3-70b-versatile` (set `GROQ_MODEL=llama-3.1-8b-instant` for 14,400/day). Key at console.groq.com.
- **Cerebras** (`CEREBRAS_API_KEY`) is the **free** deep fallback: no card, 1M tokens/day but only 5 req/min - it backstops volume, never leads. `CEREBRAS_MODEL` default `gpt-oss-120b`. Key at cloud.cerebras.ai.
- **Gemini** (`GEMINI_API_KEY`) is a weak free fallback: for a new project `gemini-flash-latest` resolves to `gemini-3.5-flash` at only 20 req/day, and `gemini-2.5-flash` 404s ("not available to new users"). Do not rely on it.
- **Grok** (`XAI_API_KEY`, `XAI_MODEL` default `grok-4.3`) is xAI's paid model; needs credits on the xAI team.
- `PROVIDER_ORDER` (default `groq,cerebras,gemini,grok`) sets the failover order.
- Not used, deliberately: OpenAI (no real free API tier - the free path requires sharing prompts for training), GitHub Models/Copilot (prototyping-only and retiring 2026-07-30), Mistral free tier (trains on API data by default), OpenRouter free models (50 req/day and provider-dependent data policies).

The app was originally built and tested on `claude-opus-4-8` / `claude-haiku-4-5` via the Anthropic API; Claude can be dropped into the same provider map in `api/chat.js` (re-add `@anthropic-ai/sdk` and add a `callClaude` alongside the others).

## Privacy model
- No accounts, no database, no server-side storage or logging of messages.
- Conversations live only in the browser tab; refresh clears them.
- All knowledge content is public regulation. Users are told not to enter personal details.

## Deploy (Vercel)
1. Import the repo into Vercel (framework: Vite).
2. Add env vars to Production + Preview (at least one provider key):
   - `GROQ_API_KEY` (recommended; free, no card, from console.groq.com) - the free primary
   - `GEMINI_API_KEY` (free at aistudio.google.com/apikey, but tiny free tier for new projects)
   - `XAI_API_KEY` (optional; paid, from console.x.ai)
   - `PROVIDER_ORDER`, `GROQ_MODEL`, `GEMINI_MODEL`, `XAI_MODEL` (all optional; see Models above)
3. After first deploy, smoke-test the live endpoint (api/ functions are unbundled ESM). The JSON includes `provider` so you can see which model answered:
   `curl -X POST https://<domain>/api/chat -H 'Content-Type: application/json' -d '{"messages":[{"role":"user","content":"Can my group home lock the fridge?"}]}'`

## Structure
- `src/App.jsx` - chat UI + Rights Library (imports the same corpus as the API)
- `api/chat.js` - retrieval + multi-provider call (Gemini/Grok failover), returns `{reply, provider, sources}`
- `api/_corpus.js` - regulation chunks + verified CA DDS service code starter set

## Local dev
`npm run dev` serves the UI only. `/api/chat` needs the Vercel runtime (`npx vercel dev`) or the deployed URL via `VITE_API_ORIGIN`.
