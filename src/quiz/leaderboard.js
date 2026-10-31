import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

export const leaderboardEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

const headers = () => ({
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
});

export async function fetchTop(scope) {
  const url = `${SUPABASE_URL}/rest/v1/quiz_scores?select=name,score,total&scope=eq.${encodeURIComponent(scope)}&order=score.desc,created_at.asc&limit=10`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function submitScore({ name, scope, score, total }) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/quiz_scores`, {
    method: "POST",
    headers: { ...headers(), Prefer: "return=minimal" },
    body: JSON.stringify({ name, scope, score, total }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
