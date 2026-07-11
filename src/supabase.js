import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only initialize if REAL credentials are present — app works fully offline without them.
// Placeholder values (the defaults committed to .env) count as "not configured" so the
// client stays null and the UI shows the offline/coming-soon state instead of erroring.
const configured =
  !!url && !!key && !url.includes("placeholder") && key !== "placeholder";

export const supabase = configured ? createClient(url, key) : null;
