import fs from "fs";
import path from "path";

const root = "/Users/macbookshop/Desktop/Projects/Developments/Entomology-Web/src";
const priority = new Set([
  "App.jsx",
  "catalog.js",
  "data/kurdistanFauna.js",
  "KurdistanLedger.jsx",
  "Chapter1.jsx",
  "Chapter2.jsx",
  "Chapter3.jsx",
  "Chapter5.jsx",
  "data/trustedSources.js",
  "chapter/EvidencePanel.jsx",
  "Footer.jsx",
]);

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(js|jsx)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const stemRe = /(سەرەکی|دەرەکی|فەرمی|زانستی|ئەکادیمی|ئەلیکترۆنی|کوردی|هەولێری|ناوخۆیی|قبوڵکراو)ە/g;
const derRe = /دەر(دەچ|دەکەو|دەخ|چو|کەوت)/g;
const pekRe = /پێک(دێت|دە|هات(?!ە))/g;
const eVerb = /(?:^|[\s«(])ئە(?:خۆم|خوات|کات|کەن|چێت|بێت|نووس|گرێت|دات|زانێت|بینێت)/g;
const gal = /لە گەڵ|لە ژێر|بە بێ|بێ باڵ|بێ کار/g;
const initR = /(?:^|[\s«(،:])ر(?:است|وون|ێک|ۆژ|ەنگ|ێگا|ەفتار|ابرد|ێکخستن|ێنمایی|ەسەن|ەگەز)/g;

console.log("=== ORTHO ALL SRC ===");
for (const f of walk(root)) {
  const rel = path.relative(root, f);
  const src = fs.readFileSync(f, "utf8");
  const notes = [];
  for (const [name, re] of [
    ["STEM_E", stemRe],
    ["DER", derRe],
    ["PEK", pekRe],
    ["EVERB", eVerb],
    ["SPLIT", gal],
    ["INITR", initR],
    ["KAF", /\u0643/g],
  ]) {
    // kaf only interesting inside ku-ish; still report file
    const ms = src.match(re);
    if (ms) notes.push(`${name}:${[...new Set(ms)].join(",")}`);
  }
  if (notes.length) console.log(rel, notes.join(" | "));
}

console.log("\n=== ENGLISH INSIDE KU (priority) ===");
const enWord = /\b[A-Za-z][A-Za-z-]{3,}\b/g;
const keep = new Set([
  "GBIF","DNA","COI","DOI","EPPO","IUCN","NCBI","BOLD","ITIS","WHO","PubMed","Insecta",
  "Lepidoptera","Coleoptera","Hymenoptera","Diptera","Hemiptera","Orthoptera","Odonata",
  "Neuroptera","Ephemeroptera","Papilionoidea","Hesperioidea","Curculionoidea","Geometridae",
  "Ichneumonidae","Andrena","Malaise","NHMUK","IPM","EPT","GenBank","Palearctic",
]);
for (const rel of priority) {
  const src = fs.readFileSync(path.join(root, rel), "utf8");
  const re = /ku:\s*(["'`])([\s\S]*?)\1/g;
  let m;
  const words = new Map();
  while ((m = re.exec(src))) {
    const text = m[2];
    let w;
    const wr = /\b[A-Za-z][A-Za-z0-9-]{2,}\b/g;
    while ((w = wr.exec(text))) {
      if (keep.has(w[0])) continue;
      if (/^[A-Z]/.test(w[0]) && w[0].length > 2) continue; // scientific names-ish
      words.set(w[0], (words.get(w[0]) || 0) + 1);
    }
  }
  const top = [...words.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40);
  console.log("\n#", rel);
  console.log(top.map(([w, n]) => `${w}(${n})`).join(", "));
}
