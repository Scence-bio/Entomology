import { SHEET_CSV_URL } from "./config";

const LANGS = ["ku", "ar", "en"];
const LETTERS = ["a", "b", "c", "d"];
const CACHE_KEY = "quizSheetCache";

// RFC 4180 CSV: quoted fields may hold commas, quotes ("") and new lines.
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field); rows.push(row); row = []; field = "";
    } else field += ch;
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function correctIndex(value) {
  const v = value.trim().toUpperCase();
  if (/^[A-D]$/.test(v)) return v.charCodeAt(0) - 65;
  if (/^[1-4]$/.test(v)) return Number(v) - 1;
  return -1;
}

// One sheet row becomes one question in the same shape as questions.js.
// A language left empty falls back to English, then Kurdish.
export function rowsToQuestions(rows) {
  const [head, ...body] = rows;
  if (!head) return [];
  const col = Object.fromEntries(head.map((name, i) => [name.trim().toLowerCase(), i]));
  const get = (row, name) => (col[name] === undefined ? "" : (row[col[name]] || "").trim());
  const pack = (row, base) => {
    const out = {};
    for (const lang of LANGS) out[lang] = get(row, `${base}_${lang}`);
    for (const lang of LANGS) out[lang] = out[lang] || out.en || out.ku;
    return out;
  };
  const questions = [];
  body.forEach((row, n) => {
    const q = pack(row, "question");
    const correct = correctIndex(get(row, "correct"));
    if (!q.ku && !q.en) return;
    const opts = {};
    for (const lang of LANGS) {
      opts[lang] = LETTERS.map((l) => get(row, `${l}_${lang}`) || get(row, `${l}_en`) || get(row, `${l}_ku`)).filter(Boolean);
    }
    if (opts.ku.length < 2 || correct < 0 || correct >= opts.ku.length) return;
    questions.push({
      id: `sheet-${n + 1}`,
      chapter: get(row, "chapter").toLowerCase(),
      section: pack(row, "section"),
      q,
      opts,
      correct,
      why: pack(row, "why"),
      image: get(row, "image") || undefined,
    });
  });
  return questions;
}

export function cachedSheetQuestions() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    return cached && cached.url === SHEET_CSV_URL && Array.isArray(cached.questions) ? cached.questions : null;
  } catch {
    return null;
  }
}

let pending = null;

export function loadSheetQuestions() {
  if (!SHEET_CSV_URL) return Promise.resolve(null);
  if (!pending) {
    pending = fetch(SHEET_CSV_URL, { cache: "no-store" })
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((text) => {
        const questions = rowsToQuestions(parseCsv(text));
        if (!questions.length) return null;
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ url: SHEET_CSV_URL, questions })); } catch {}
        return questions;
      })
      .catch(() => null);
  }
  return pending;
}
