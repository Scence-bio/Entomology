import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { Mark } from "./marks";

const later = (name) => lazy(() => import("./LaterChapters").then((m) => ({ default: m[name] })));
const CHAPTER_PAGES = {
  ch1: lazy(() => import("./Chapter1")),
  ch2: lazy(() => import("./Chapter2")),
  ch3: lazy(() => import("./Chapter3")),
  ch4: lazy(() => import("./Chapter4")),
  ch5: lazy(() => import("./Chapter5")),
  ch6: later("Chapter6"),
  ch7: later("Chapter7"),
  ch8: later("Chapter8"),
  ch9: later("Chapter9"),
  ch10: later("Chapter10"),
  ch11: later("Chapter11"),
  ch12: later("Chapter12"),
};

/* ═══════════════════════════════════════════════
   LANGUAGE DATA
═══════════════════════════════════════════════ */

const LANG_CONFIG = {
  ku: { label: "کوردی", dir: "rtl", flag: "🟡" },
  ar: { label: "العربية", dir: "rtl", flag: "🟢" },
  en: { label: "English", dir: "ltr", flag: "🔵" },
};

/* ═══════════════════════════════════════════════
   STYLES
═══════════════════════════════════════════════ */
const CSS = `

:root {
  --ocean-1:#1f4d32; --ocean-2:#2c6244; --ocean-3:#244e34; --ocean-4:#3e6b4e;
  --accent:#8a4e12; --accent-bright:#c47b2b; --accent-dim:rgba(138,78,18,0.10);
  --text-primary:#1a2418; --text-secondary:#3e4a3a; --text-muted:#5e6b58;
  --bg-card:#fbf8f1; --bg-page:#f3efe4;
  --card-bg:#fbf8f1;
  --border-card:rgba(26,36,24,0.14);
  --shadow-card:0 10px 28px rgba(48,36,18,0.08);
  --radius-card:16px;
  --font-arabic:'IBM Plex Sans Arabic','Noto Kufi Arabic',Tahoma,sans-serif;
  --font-serif:'Source Serif 4',Georgia,serif;
  --font-mono:'Space Mono',monospace;
  --safe-top:env(safe-area-inset-top,0px);
  --safe-bottom:env(safe-area-inset-bottom,0px);
}
.ento-dark {
  --accent:#e0b56a; --accent-bright:#e0b56a; --accent-dim:rgba(224,181,106,0.14);
  --text-primary:#f3efe4; --text-secondary:#d5d0c4; --text-muted:#a39c8e;
  --bg-card:#1c1914; --bg-page:#12100d;
  --border-card:rgba(232,214,176,0.16);
  --shadow-card:0 12px 32px rgba(0,0,0,0.35);
  --card-bg:#1c1914;
}
.ento-dark .ento-team-card {
  background:#1c1914;
  border-color:rgba(232,214,176,0.16);
}
.ento-dark .ento-team-photo-wrap {
  background:linear-gradient(160deg, rgba(245,158,11,.18), rgba(26,92,15,.22));
}
.ento-dark .ento-team-info { background:transparent; }
.ento-dark .ento-about-box {
  background:linear-gradient(135deg, rgba(46,125,26,0.12) 0%, rgba(245,158,11,0.1) 100%);
  border-color:rgba(46,125,26,0.3);
}

.ento-root {
  font-family:var(--font-arabic);
  overflow-x:hidden;
  min-height:100vh;
  background:var(--bg-page);
  background-attachment:fixed;
  color:var(--text-primary);
  -webkit-overflow-scrolling:touch;
  scroll-behavior:smooth;
}
.ento-dark.ento-root {
  background:var(--bg-page);
}

/* ── TOPBAR ── */
.ento-topbar {
  position:fixed; top:0; left:0; right:0; z-index:200;
  display:flex; align-items:center; justify-content:space-between;
  padding:0 clamp(12px,3vw,24px); height:60px;
  background:#1a2418;
  backdrop-filter:blur(14px);
  border-bottom:1px solid rgba(0,0,0,0.15);
  transition:background .3s;
}
.ento-brand {
  display:flex; align-items:center; gap:10px;
  text-decoration:none; font-weight:800;
  font-size:clamp(.92rem,2.5vw,1.1rem); color:#fff;
}
.ento-brand svg { width:22px; height:22px; color:#e0b56a; flex-shrink:0; }
.ento-brand-text span { color:#e0b56a; }
.ento-topbar-right { display:flex; align-items:center; gap:8px; }

/* ── LANGUAGE SWITCHER ── */
.ento-lang-switcher {
  display:flex; align-items:center; gap:4px;
  background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.16);
  border-radius:100px; padding:3px 4px;
}
.ento-lang-btn {
  background:none; border:none; cursor:pointer;
  padding:5px 12px; border-radius:100px;
  font-size:.8rem; font-weight:600; color:rgba(255,255,255,.55);
  font-family:var(--font-arabic);
  transition:background .2s,color .2s;
  white-space:nowrap;
}
.ento-lang-btn.active {
  background:#c47b2b; color:#1a140c;
}
.ento-lang-btn:hover:not(.active) { color:#fff; background:rgba(255,255,255,.1); }

.ento-back-btn {
  display:inline-flex; align-items:center; gap:6px;
  background:rgba(45,116,23,.18); border:1px solid rgba(45,116,23,.35);
  color:#a8d5a2; border-radius:10px; padding:7px 14px;
  font-size:.85rem; font-family:var(--font-arabic);
  text-decoration:none; cursor:pointer;
  transition:background .2s,transform .2s;
}
.ento-back-btn:hover { background:rgba(45,116,23,.32); transform:translateX(3px); }
.ento-theme-btn {
  width:38px; height:38px; border-radius:50%;
  background:transparent;
  border:1px solid rgba(255,255,255,.28); color:#f3efe4; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition:transform .3s;
}
.ento-theme-btn svg { width:18px; height:18px; }
.ento-theme-btn:hover { transform:scale(1.1); }

/* ── HERO ── */
.ento-hero {
  position:relative; overflow:hidden;
  min-height:clamp(380px,65svh,620px);
  background:#122d09;
  display:flex; align-items:center; justify-content:center;
  text-align:center; padding-top:60px;
}
.ento-hero-canvas {
  position:absolute; inset:0; width:100%; height:100%; display:block;
}
.ento-hero-video {
  position:absolute; inset:0; width:100%; height:100%; z-index:0;
  object-fit:cover; display:block; pointer-events:none;
}
.ento-hero-overlay {
  position:absolute; inset:0; z-index:1;
  background:linear-gradient(180deg,rgba(18,16,12,.55) 0%,rgba(18,16,12,.32) 46%,rgba(18,16,12,.78) 100%);
}
.ento-hero-body {
  position:relative; z-index:2;
  display:flex; flex-direction:column; align-items:center;
  padding:clamp(28px,6vw,72px) clamp(16px,5vw,48px) clamp(56px,8vw,84px);
  max-width:920px; margin:0 auto; width:100%;
}
.ento-hero-badge {
  display:inline-flex; align-items:center; gap:8px;
  background:rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.35);
  color:#fcd34d; font-size:clamp(10px,2vw,12px); letter-spacing:2px;
  padding:5px 16px; border-radius:100px;
  margin-bottom:clamp(14px,3vw,22px);
  font-family:var(--font-mono); direction:ltr;
}
.ento-badge-dot {
  width:7px; height:7px; border-radius:50%; background:var(--accent);
  animation:entoBlink 1.6s ease-in-out infinite;
}
@keyframes entoBlink { 0%,100%{opacity:1} 50%{opacity:.2} }
.ento-hero-title-en {
  display:block; max-width:16ch; text-wrap:balance;
  font-size:clamp(2.15rem,6.4vw,4.4rem); font-weight:700;
  line-height:1.05; direction:ltr; letter-spacing:-.02em;
  margin:0 0 clamp(10px,2vw,16px);
  color:#f6f1e6;
}
.ento-hero-cta {
  display:inline-flex; align-items:center; justify-content:center;
  margin-top:6px; background:#c47b2b; color:#1a140c;
  text-decoration:none; font-weight:700;
  padding:12px 22px; border-radius:999px;
  font-family:var(--font-arabic);
}
.ento-hero-cta:hover { background:#d4923e; }
.ento-hero-title-ku {
  font-size:clamp(1.05rem,3vw,1.65rem); font-weight:700;
  color:#f3faf0; margin-bottom:clamp(10px,2vw,18px);
  text-align:center;
}
.ento-hero-desc {
  font-size:clamp(.84rem,2vw,.96rem); color:rgba(243,250,240,.9);
  line-height:1.8; max-width:36rem; margin:0 auto clamp(14px,3vw,26px);
}
.ento-hero-pills {
  display:flex; gap:8px; justify-content:center; flex-wrap:wrap;
  margin-bottom:clamp(16px,3vw,28px);
}
.ento-hero-pill {
  background:rgba(6,18,4,.55); border:1px solid rgba(255,255,255,.28);
  color:#f4faf2; font-size:clamp(11px,2vw,13px); font-weight:600;
  padding:5px 14px; border-radius:20px;
  backdrop-filter:blur(8px);
}
.ento-hero-stats { display:flex; gap:clamp(8px,2vw,20px); justify-content:center; flex-wrap:wrap; }
.ento-hero-stat {
  background:rgba(245,158,11,.1); border:1px solid rgba(245,158,11,.25);
  border-radius:12px; padding:10px 18px; text-align:center;
}
.ento-stat-n { font-size:clamp(1.2rem,3vw,1.6rem); font-weight:900; color:#fcd34d; display:block; }
.ento-stat-l { font-size:10px; color:rgba(220,245,220,.65); margin-top:2px; display:block; }
.ento-scroll-hint {
  position:absolute; bottom:16px; left:50%; transform:translateX(-50%); z-index:2;
  color:rgba(244,250,242,.88); font-size:11px;
  font-family:var(--font-mono); letter-spacing:1px;
  text-shadow:0 1px 8px rgba(0,0,0,.65);
  animation:entoFadeB 2s ease-in-out infinite;
}
@keyframes entoFadeB { 0%,100%{opacity:.72} 50%{opacity:1} }

/* ── SECTION NAV ── */
.ento-container { max-width:1100px; margin:0 auto; padding:clamp(12px,3vw,24px) clamp(12px,3vw,20px) 40px; }
.ento-section-nav {
  display:flex; gap:8px; flex-wrap:wrap; justify-content:center;
  padding:clamp(14px,3vw,22px) 0; margin-bottom:4px;
}
.ento-section-nav { gap:4px 18px; }
.ento-snav-pill {
  background:transparent; border:none; border-bottom:1px solid transparent;
  color:var(--text-secondary); border-radius:0; padding:6px 0;
  font-size:clamp(.82rem,1.8vw,.92rem); font-family:var(--font-arabic); font-weight:600;
  cursor:pointer; text-decoration:none;
  display:flex; align-items:center; gap:6px;
  transition:color .2s, border-color .2s;
}
.ento-snav-pill:hover { background:transparent; color:var(--text-primary); border-bottom-color:var(--accent); transform:none; }
.ento-snav-pill.active { background:transparent; border:none; border-bottom:1px solid var(--accent); color:var(--accent); }
.ento-dark .ento-snav-pill { color:#d5d0c4; }
.ento-dark .ento-snav-pill.active { background:transparent; border-bottom:1px solid #e0b56a; color:#e0b56a; }

/* ── CARD ── */
.ento-card {
  background:var(--bg-card); border:2px solid var(--border-card);
  box-shadow:var(--shadow-card); border-radius:var(--radius-card);
  padding:clamp(20px,4vw,40px); margin-bottom:clamp(14px,2vw,20px);
  opacity:0; transform:translateY(30px);
  transition:opacity .55s ease, transform .55s ease, border-color .3s;
  will-change:transform;
}
.ento-card.ento-visible { opacity:1; transform:translateY(0); }
.ento-card:hover { border-color:rgba(245,158,11,.4); }
.ento-card-header { display:flex; align-items:flex-start; gap:14px; margin-bottom:18px; }
.ento-card-icon, .ento-quiz-icon, .ento-team-icon, .ento-goals-icon, .ento-video-icon, .ento-intro-leaf { display:none; }
.ento-card-num { font-family:var(--font-mono); font-size:.75rem; color:var(--accent); letter-spacing:2px; margin-bottom:4px; font-weight:700; }
.ento-card-title-ku { font-size:clamp(1.1rem,3vw,1.5rem); font-weight:800; color:var(--text-primary); line-height:1.2; }
.ento-card-title-en { font-size:clamp(.82rem,2vw,.96rem); color:var(--text-muted); font-family:var(--font-arabic); direction:ltr; }

/* ── BODY ── */
.ento-body { color:var(--text-secondary); font-size:clamp(.88rem,2vw,.98rem); line-height:1.85; margin-bottom:16px; }
.ento-rtl { direction:rtl; text-align:right; }
.ento-ltr { direction:ltr; text-align:left; }

/* ── TERMS ── */
.ento-terms { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
.ento-term, .ento-gloss-term, .ento-binomial {
  font-family:var(--font-serif); font-style:italic; font-weight:500;
  letter-spacing:0; direction:ltr; unicode-bidi:isolate;
}
.ento-term {
  background:transparent; border-bottom:1px solid rgba(138,78,18,.35);
  color:var(--accent); border-radius:0; padding:2px 0;
  font-size:.95rem;
}

/* ── TIMELINE ── */
.ento-timeline { display:flex; flex-direction:column; gap:10px; margin-top:16px; }
.ento-tl-row {
  display:flex; align-items:center; gap:14px;
  background:rgba(45,116,23,.06); border:1px solid rgba(45,116,23,.12);
  border-radius:12px; padding:12px 16px;
  opacity:0; transform:translateX(20px);
  transition:opacity .45s ease, transform .45s ease;
}
.ento-tl-row.ento-visible { opacity:1; transform:translateX(0); }
.ento-tl-dot { width:10px; height:10px; border-radius:50%; background:var(--ocean-2); flex-shrink:0; }
.ento-tl-year { font-weight:800; font-size:.85rem; color:#3ea822; min-width:100px; font-family:var(--font-mono); }
.ento-tl-event { color:var(--text-secondary); font-size:.88rem; }

/* ── SCIENTISTS ── */
.ento-sci-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:12px; margin-top:16px; }
.ento-sci-card {
  background:rgba(45,116,23,.06); border:1.5px solid var(--border-card);
  border-radius:14px; padding:16px; text-align:center;
  transition:transform .25s,border-color .25s;
}
.ento-sci-card:hover { transform:translateY(-4px); border-color:rgba(245,158,11,.35); }
.ento-sci-avatar {
  width:72px; height:72px; border-radius:50%;
  background:linear-gradient(135deg,var(--ocean-1),var(--ocean-2));
  color:#fff; font-weight:900; font-size:1.1rem;
  display:flex; align-items:center; justify-content:center;
  margin:0 auto 10px;
}
.ento-sci-photo {
  width:72px; height:72px; border-radius:50%;
  object-fit:cover; object-position:top center;
  border:2px solid rgba(245,158,11,.35);
  box-shadow:0 4px 16px rgba(0,0,0,.25);
  display:block; margin:0 auto 10px;
}
.ento-sci-name { font-weight:800; font-size:.92rem; margin-bottom:4px; color:var(--text-primary); }
.ento-sci-role-ku { color:var(--text-muted); font-size:.78rem; margin-bottom:3px; }
.ento-sci-role-en { color:var(--ocean-4); font-size:.75rem; font-style:italic; direction:ltr; }

/* ── STATS ── */
.ento-stats-row { display:flex; flex-wrap:wrap; gap:10px; margin-top:16px; }
.ento-stat-box {
  display:flex; align-items:center; gap:10px;
  background:var(--accent-dim); border:1.5px solid rgba(245,158,11,.3);
  border-radius:12px; padding:10px 18px; flex:1; min-width:160px;
}
.ento-stat-ico { font-size:1.5rem; }
.ento-stat-lbl { font-weight:700; font-size:.88rem; color:var(--text-primary); }

/* ── APPS ── */
.ento-apps { display:flex; flex-direction:column; gap:8px; margin-top:16px; }
.ento-app-row {
  display:flex; align-items:center; gap:12px;
  background:rgba(45,116,23,.05); border:1px solid rgba(45,116,23,.16);
  border-radius:10px; padding:11px 14px;
  font-size:.9rem; color:var(--text-secondary);
}
.ento-app-dot { width:8px; height:8px; border-radius:50%; background:var(--ocean-2); flex-shrink:0; }

/* ── MAP ── */
.ento-map-wrap {
  margin-top:18px; border-radius:16px; overflow:hidden;
  border:1.5px solid var(--accent-dim);
  box-shadow:0 4px 24px rgba(0,0,0,.13);
}
.ento-map-img {
  width:100%; display:block;
  object-fit:cover; max-height:480px;
  transition:transform .4s ease;
}
.ento-map-wrap:hover .ento-map-img { transform:scale(1.015); }
.ento-map-caption {
  background:var(--accent-dim); padding:8px 16px;
  font-size:.78rem; color:var(--text-secondary);
  text-align:center; margin:0;
}

/* ── THREATS ── */
.ento-threats { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:12px; margin-top:16px; }
.ento-threat {
  background:rgba(239,68,68,.06); border:1.5px solid rgba(239,68,68,.2);
  border-radius:14px; padding:16px; text-align:center;
}
.ento-threat-ico { font-size:1.8rem; margin-bottom:8px; }
.ento-threat-name { font-weight:800; font-size:.9rem; margin-bottom:4px; color:var(--text-primary); }
.ento-threat-eg { color:var(--text-muted); font-size:.78rem; }

/* ── GLOSSARY ── */
.ento-gloss-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:10px; margin-top:14px; }
.ento-gloss-item {
  border:none; border-bottom:1px solid var(--border-card); border-radius:0;
  background:transparent; padding:12px 2px;
  display:flex; flex-direction:column; gap:4px;
}
.ento-gloss-term { font-size:1rem; color:var(--accent); display:block; }
.ento-gloss-ku { color:var(--text-secondary); font-size:.82rem; }

/* ── TEAM SECTION ── */
.ento-team-section {
  max-width:1100px; margin:0 auto clamp(32px,5vw,56px);
  padding:0 clamp(16px,5vw,32px);
  opacity:0; transform:translateY(28px); transition:opacity .6s ease, transform .6s ease;
}
.ento-team-section.ento-visible { opacity:1; transform:none; }
.ento-team-header {
  display:flex; align-items:center; gap:16px;
  margin-bottom:clamp(20px,3vw,32px);
  padding-bottom:16px; border-bottom:2px solid var(--accent-dim);
}
.ento-team-icon  { font-size:2rem; }
.ento-team-title {
  font-size:clamp(1.1rem,3vw,1.4rem); font-weight:900;
  color:var(--text-primary); margin:0 0 4px;
}
.ento-team-sub { font-size:.82rem; color:var(--text-muted); margin:0; }

/* ── ABOUT BOX ── */
.ento-about-box {
  margin-bottom:clamp(24px,4vw,40px);
  padding:clamp(20px,4vw,32px);
  background:linear-gradient(135deg, rgba(46,125,26,0.07) 0%, rgba(245,158,11,0.07) 100%);
  border:1.5px solid var(--border-card);
  border-radius:var(--radius-card);
  box-shadow:var(--shadow-card);
}
.ento-about-badge {
  display:inline-block;
  font-size:.75rem; font-weight:700; letter-spacing:.06em;
  color:var(--accent); background:var(--accent-dim);
  padding:4px 12px; border-radius:100px;
  margin-bottom:10px;
}
.ento-about-heading {
  font-size:clamp(1.1rem,2.8vw,1.35rem); font-weight:900;
  color:var(--text-primary); margin:0 0 12px;
}
.ento-about-text {
  font-size:clamp(.85rem,2vw,1rem); line-height:1.85;
  color:var(--text-secondary); margin:0;
}

/* ── INTRO / PREFACE SECTION ── */
.ento-intro-section {
  max-width:820px; margin:clamp(24px,4vw,48px) auto clamp(32px,5vw,56px);
  padding:0 clamp(16px,5vw,32px);
  opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s ease;
}
.ento-intro-section.ento-visible { opacity:1; transform:none; }
.ento-intro-inner {
  position:relative;
  background:var(--bg-card);
  border:1.5px solid var(--border-card);
  border-radius:24px;
  padding:clamp(24px,5vw,48px) clamp(24px,5vw,48px) clamp(20px,4vw,36px);
  box-shadow:var(--shadow-card);
  overflow:hidden;
}
.ento-intro-leaf {
  position:absolute; top:-10px; inset-inline-end:-10px;
  font-size:5rem; opacity:.07; pointer-events:none;
  transform:rotate(20deg);
}
.ento-intro-label {
  font-size:.72rem; font-weight:800; letter-spacing:.1em; text-transform:uppercase;
  color:var(--accent); margin:0 0 16px;
}
.ento-intro-quote {
  margin:0 0 20px; padding:0;
  font-size:clamp(1rem,2.6vw,1.25rem); font-weight:700;
  line-height:1.75; color:var(--ocean-2);
  border:none;
}
.ento-intro-qmark {
  font-size:1.8em; line-height:0; vertical-align:-.3em;
  color:var(--accent); opacity:.6;
}
.ento-intro-body {
  font-size:clamp(.87rem,2vw,1rem); line-height:1.9;
  color:var(--text-secondary); margin:0 0 16px;
}
.ento-intro-close {
  font-size:clamp(.87rem,2vw,1rem); line-height:1.9;
  color:var(--text-secondary); margin:0 0 24px;
  font-style:italic;
}
.ento-intro-divider {
  display:flex; align-items:center; gap:10px;
  font-size:1rem;
}
.ento-intro-line {
  flex:1; height:1px;
  background:linear-gradient(to right, transparent, var(--accent-dim), transparent);
}

/* ── GOALS SECTION ── */
.ento-goals-section {
  max-width:1100px; margin:0 auto clamp(32px,5vw,56px);
  padding:0 clamp(16px,5vw,32px);
  opacity:0; transform:translateY(28px); transition:opacity .6s ease, transform .6s ease;
}
.ento-goals-section.ento-visible { opacity:1; transform:none; }
.ento-goals-header {
  display:flex; align-items:center; gap:16px;
  margin-bottom:clamp(20px,3vw,32px);
  padding-bottom:16px; border-bottom:2px solid var(--accent-dim);
}
.ento-goals-icon  { font-size:2rem; }
.ento-goals-title {
  font-size:clamp(1.1rem,3vw,1.4rem); font-weight:900;
  color:var(--text-primary); margin:0 0 4px;
}
.ento-goals-sub { font-size:.82rem; color:var(--text-muted); margin:0; }

.ento-goals-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));
  gap:clamp(12px,2.5vw,20px);
}
.ento-goals-card {
  background:var(--bg-card);
  border:1.5px solid var(--border-card);
  border-radius:16px;
  padding:clamp(14px,2.5vw,22px);
  box-shadow:var(--shadow-card);
  display:flex; flex-direction:column; gap:8px;
  transition:transform .25s, box-shadow .25s, border-color .25s;
}
.ento-goals-card:hover {
  transform:translateY(-5px);
  box-shadow:0 12px 36px rgba(26,92,15,.16);
  border-color:var(--accent);
}
.ento-goals-card-top {
  display:flex; align-items:center; justify-content:space-between;
}
.ento-goals-num {
  font-family:var(--font-mono);
  font-size:.75rem; font-weight:700;
  color:var(--accent); background:var(--accent-dim);
  padding:3px 8px; border-radius:100px;
}
.ento-goals-emoji { font-size:1.5rem; }
.ento-goals-card-title {
  font-size:.95rem; font-weight:800;
  color:var(--text-primary); line-height:1.3;
}
.ento-goals-card-desc {
  font-size:.8rem; line-height:1.65;
  color:var(--text-secondary);
}

.ento-team-grid {
  display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:clamp(16px,3vw,28px);
}
.ento-team-card {
  background:var(--card-bg); border-radius:20px;
  border:1.5px solid var(--accent-dim);
  box-shadow:0 4px 20px rgba(0,0,0,.07);
  overflow:hidden;
  transition:transform .25s, box-shadow .25s;
  display:flex; flex-direction:column; align-items:center;
  text-align:center; padding-bottom:24px;
}
.ento-team-card:hover { transform:translateY(-6px); box-shadow:0 12px 36px rgba(0,0,0,.13); }

.ento-team-photo-wrap {
  position:relative; width:100%;
  background:linear-gradient(160deg, rgba(245,158,11,.12), rgba(26,92,15,.15));
  overflow:hidden; border-radius:16px 16px 0 0;
  height:220px;
}
.ento-team-photo {
  width:100%; height:100%;
  object-fit:cover; object-position:center 18%;
  display:block;
  transition:transform .4s ease;
}
.ento-team-card:hover .ento-team-photo { transform:scale(1.04); }
.ento-team-badge {
  position:absolute; bottom:10px; right:12px;
  width:34px; height:34px; border-radius:50%;
  background:var(--accent); font-size:1rem;
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 2px 8px rgba(0,0,0,.3);
  border:2px solid var(--card-bg);
}

.ento-team-info { padding:18px 20px 4px; display:flex; flex-direction:column; gap:5px; }
.ento-team-name {
  font-size:1.05rem; font-weight:900; color:var(--text-primary); line-height:1.3;
}
.ento-dark .ento-team-name { color:#f0fce8; }
.ento-team-name-en {
  font-size:.76rem; color:var(--text-muted); font-family:var(--font-mono);
  letter-spacing:.5px;
}
.ento-dark .ento-team-name-en { color:rgba(210,240,205,.55); }
.ento-team-role {
  display:inline-block; background:var(--accent-dim);
  color:var(--accent); font-size:.78rem; font-weight:700;
  padding:4px 14px; border-radius:99px; margin-top:4px;
}
.ento-dark .ento-team-role { background:rgba(245,158,11,.18); color:#fcd34d; }
.ento-team-uni {
  font-size:.76rem; color:var(--text-muted); margin-top:4px; line-height:1.5;
}
.ento-dark .ento-team-uni { color:rgba(210,240,205,.45); }

/* ── QUIZ SECTION ── */
.ento-quiz-section {
  max-width:820px; margin:0 auto clamp(32px,5vw,56px);
  padding:0 clamp(16px,5vw,32px);
}
.ento-quiz-header {
  display:flex; align-items:center; gap:16px;
  margin-bottom:clamp(18px,3vw,28px);
  padding-bottom:16px; border-bottom:2px solid var(--accent-dim);
}
.ento-quiz-icon { font-size:2rem; }
.ento-quiz-title {
  font-size:clamp(1.1rem,3vw,1.4rem); font-weight:900;
  color:var(--text-primary); margin:0 0 4px;
}
.ento-quiz-sub { font-size:.82rem; color:var(--text-muted); margin:0; }

/* idle */
.ento-quiz-idle { text-align:center; padding:32px 0; }
.ento-quiz-idle-desc { font-size:.9rem; color:var(--text-secondary); margin-bottom:24px; line-height:1.8; }
.ento-quiz-start-btn {
  background:linear-gradient(135deg,var(--ocean-1),var(--ocean-2));
  color:#fff; border:none; padding:14px 40px; border-radius:14px;
  font-size:1rem; font-weight:800; cursor:pointer;
  box-shadow:0 4px 18px rgba(26,74,13,.35);
  transition:transform .2s, box-shadow .2s;
  border:1.5px solid rgba(245,158,11,.3);
}
.ento-quiz-start-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(26,74,13,.5); }

/* active */
.ento-quiz-active { display:flex; flex-direction:column; gap:16px; }
.ento-quiz-progress-row {
  display:flex; justify-content:space-between; align-items:center;
  font-size:.8rem; font-weight:700; color:var(--text-muted);
}
.ento-quiz-score-live { color:var(--accent-bright); }
.ento-quiz-bar-wrap {
  height:6px; background:var(--accent-dim); border-radius:99px; overflow:hidden;
}
.ento-quiz-bar-fill {
  height:100%; background:linear-gradient(90deg,var(--ocean-2),var(--accent-bright));
  border-radius:99px; transition:width .4s ease;
}
.ento-quiz-section-badge {
  display:inline-block; background:var(--accent-dim);
  color:var(--accent); font-size:.72rem; font-weight:700;
  padding:4px 14px; border-radius:99px; letter-spacing:.5px;
}
.ento-quiz-timer-row {
  display:flex; align-items:flex-start; gap:16px;
  background:var(--card-bg); border-radius:16px;
  padding:20px; border:1.5px solid var(--accent-dim);
  box-shadow:0 2px 12px rgba(0,0,0,.06);
}
.ento-quiz-timer-ring { width:52px; height:52px; flex-shrink:0; }
.ento-quiz-q-text {
  font-size:clamp(.95rem,2.5vw,1.1rem); font-weight:800;
  color:var(--text-primary); line-height:1.6; padding-top:4px;
}
.ento-quiz-opts { display:flex; flex-direction:column; gap:10px; }
.ento-quiz-opt {
  display:flex; align-items:center; gap:14px;
  background:var(--card-bg); border:1.5px solid var(--accent-dim);
  border-radius:12px; padding:13px 18px; cursor:pointer;
  font-size:.92rem; font-weight:600; color:var(--text-primary);
  text-align:start; transition:background .2s, border-color .2s, transform .15s;
}
.ento-quiz-opt:hover:not(:disabled) {
  background:rgba(245,158,11,.09); border-color:var(--accent); transform:translateX(-3px);
}
[dir="ltr"] .ento-quiz-opt:hover:not(:disabled) { transform:translateX(3px); }
.ento-opt-letter {
  width:28px; height:28px; border-radius:50%; flex-shrink:0;
  background:var(--accent-dim); color:var(--accent);
  font-weight:900; font-size:.82rem;
  display:flex; align-items:center; justify-content:center;
}
.ento-opt-correct { background:rgba(34,197,94,.12) !important; border-color:#22c55e !important; }
.ento-opt-correct .ento-opt-letter { background:#22c55e; color:#fff; }
.ento-opt-wrong   { background:rgba(239,68,68,.1)  !important; border-color:#ef4444 !important; }
.ento-opt-wrong   .ento-opt-letter { background:#ef4444; color:#fff; }
.ento-opt-dim     { opacity:.45; }
.ento-quiz-why {
  margin:14px 0 0; padding:12px 14px;
  background:var(--accent-dim); color:var(--text-primary);
  font-size:.9rem; line-height:1.65;
}
.ento-pick-row { display:flex; flex-wrap:wrap; gap:8px; margin:4px 0 16px; }
.ento-pick {
  display:flex; flex-direction:column; align-items:flex-start; gap:2px;
  background:var(--bg-card); color:var(--text-primary);
  border:1px solid var(--border-card); border-radius:2px;
  padding:10px 12px; cursor:pointer; font-family:var(--font-arabic); font-size:.82rem;
}
.ento-pick.active { border-color:#8a4e12; }
.ento-pick:focus-visible, .ento-plate-part:focus-visible { outline:2px solid #8a4e12; outline-offset:2px; }
.ento-fact-list { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:0; }
.ento-fact-list li {
  display:flex; justify-content:space-between; gap:16px;
  padding:10px 0; border-bottom:1px solid var(--border-card);
  color:var(--text-primary); font-size:.92rem;
}
.ento-bodyplate { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin:8px 0 16px; perspective:640px; }
.ento-plate-part {
  min-height:72px; background:var(--bg-card); color:var(--text-primary);
  border:1px solid var(--border-card); border-radius:2px;
  font-family:var(--font-serif); font-style:italic; font-size:1rem; cursor:pointer;
  transform:rotateX(8deg); transition:transform .2s, border-color .2s, background .2s;
}
.ento-plate-part.active { background:#f3efe4; border-color:#8a4e12; color:#1a2418; transform:rotateX(0deg) translateY(-3px); }
.ento-record {
  width:100%; border-collapse:collapse; margin-top:14px; font-size:.86rem;
}
.ento-record th, .ento-record td {
  text-align:start; padding:8px 10px; border-bottom:1px solid var(--border-card);
  color:var(--text-primary);
}
.ento-record th { font-size:.72rem; letter-spacing:.04em; color:#8a4e12; font-weight:700; }

/* result */
.ento-quiz-result { display:flex; flex-direction:column; align-items:center; gap:8px; }
.ento-quiz-score-circle { width:130px; height:130px; margin-bottom:8px; }
.ento-quiz-grade { font-size:1.5rem; font-weight:900; color:var(--accent-bright); }
.ento-quiz-pct   { font-size:1rem; color:var(--text-muted); margin-bottom:8px; }
.ento-quiz-review { width:100%; display:flex; flex-direction:column; gap:8px; }
.ento-quiz-review-title {
  font-size:1rem; font-weight:800; color:var(--text-primary);
  margin:16px 0 8px; padding-bottom:8px;
  border-bottom:1.5px solid var(--accent-dim);
}
.ento-quiz-rev-item {
  border-radius:10px; padding:12px 16px;
  border:1px solid transparent;
}
.ento-rev-right { background:rgba(34,197,94,.06); border-color:#22c55e; }
.ento-rev-wrong  { background:rgba(239,68,68,.06);  border-color:#ef4444; }
.ento-rev-top { display:flex; align-items:flex-start; gap:10px; }
.ento-rev-num  {
  min-width:24px; height:24px; border-radius:50%; background:var(--accent-dim);
  color:var(--accent); font-size:.72rem; font-weight:900;
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.ento-rev-icon { font-weight:900; flex-shrink:0; }
.ento-rev-right .ento-rev-icon { color:#22c55e; }
.ento-rev-wrong  .ento-rev-icon { color:#ef4444; }
.ento-rev-q    { font-size:.85rem; color:var(--text-secondary); line-height:1.5; }
.ento-rev-answer {
  font-size:.82rem; color:var(--text-muted); margin-top:6px;
  padding-right:34px; padding-left:34px;
}
.ento-rev-answer strong { color:#22c55e; }

/* ── VIDEO SECTION ── */
.ento-video-section {
  max-width:1100px; margin:0 auto clamp(32px,5vw,56px);
  padding:0 clamp(16px,5vw,32px);
  opacity:0; transform:translateY(28px); transition:opacity .6s ease, transform .6s ease;
}
.ento-video-section.ento-visible { opacity:1; transform:none; }

.ento-video-header {
  display:flex; align-items:center; gap:16px;
  margin-bottom:clamp(18px,3vw,30px);
  padding-bottom:16px; border-bottom:2px solid var(--accent-dim);
}
.ento-video-icon { font-size:2rem; }
.ento-video-title {
  font-size:clamp(1.1rem,3vw,1.4rem); font-weight:900;
  color:var(--text-primary); margin:0 0 4px;
}
.ento-video-sub { font-size:.82rem; color:var(--text-muted); margin:0; }

.ento-video-grid {
  display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  gap:clamp(16px,3vw,28px);
}
.ento-video-card {
  border-radius:16px; overflow:hidden;
  border:1.5px solid var(--accent-dim);
  background:var(--card-bg);
  box-shadow:0 4px 20px rgba(0,0,0,.08);
  transition:transform .25s, box-shadow .25s;
}
.ento-video-card:hover { transform:translateY(-4px); box-shadow:0 10px 32px rgba(0,0,0,.14); }

.ento-video-embed-wrap {
  position:relative; width:100%; padding-top:56.25%; /* 16:9 */
  background:#000;
}
.ento-video-iframe {
  position:absolute; inset:0; width:100%; height:100%;
  border:none; display:block;
}
.ento-video-label {
  padding:12px 16px; font-size:.85rem; font-weight:700;
  color:var(--text-secondary); background:var(--accent-dim);
  line-height:1.5;
}

/* ── FOOTER ── */
.ento-footer {
  background:#1a2418;
  color:#fff; border-top:2px solid rgba(245,158,11,.25); margin-top:8px;
}
.ento-footer-inner {
  max-width:1100px; margin:0 auto;
  padding:clamp(28px,5vw,56px) clamp(16px,5vw,32px) 0;
  display:grid; grid-template-columns:1.3fr 1fr 1.1fr 1fr; gap:clamp(16px,3vw,36px);
}
@media(max-width:900px){
  .ento-footer-inner { grid-template-columns:1fr 1fr; gap:clamp(20px,4vw,32px); }
}
@media(max-width:600px){
  .ento-footer-inner {
    grid-template-columns:1fr 1fr;
    gap:28px 20px;
    padding-left:clamp(12px,4vw,24px);
    padding-right:clamp(12px,4vw,24px);
  }
  .ento-footer-col-title { font-size:.62rem; letter-spacing:1.5px; }
  .ento-footer-link { font-size:.78rem; }
  .ento-footer-info-item { font-size:.76rem; }
  .ento-footer-info-label { font-size:.68rem; }
  .ento-footer-tagline { font-size:.75rem; }
}
@media(max-width:400px){
  .ento-footer-inner { grid-template-columns:1fr; gap:24px; }
}

.ento-footer-col { display:flex; flex-direction:column; gap:10px; }
.ento-footer-col-title {
  font-size:.68rem; font-weight:700; letter-spacing:2px;
  color:var(--accent); text-transform:uppercase; font-family:var(--font-arabic);
  margin-bottom:4px; border-bottom:1px solid rgba(245,158,11,.2); padding-bottom:8px;
}
.ento-footer-project {
  font-size:clamp(1rem,3vw,1.3rem); font-weight:900; color:#fff; line-height:1.2; direction:ltr;
}
.ento-footer-project span { color:var(--accent); }
.ento-footer-tagline { font-size:.8rem; color:rgba(210,240,205,.68); line-height:1.75; }

.ento-footer-info-row { display:flex; flex-direction:column; gap:7px; }
.ento-footer-info-item {
  display:flex; align-items:baseline; gap:5px;
  font-size:.81rem; color:rgba(210,240,205,.78); line-height:1.5;
  direction:ltr;
}
.ento-footer-info-label {
  color:var(--accent); font-weight:700; font-family:var(--font-arabic);
  font-size:.72rem; white-space:nowrap; flex-shrink:0;
}
.ento-footer-info-sep {
  color:rgba(245,158,11,.5); font-weight:700; flex-shrink:0;
}
.ento-footer-info-value { flex:1; }

.ento-footer-links { display:flex; flex-direction:column; gap:7px; }
.ento-footer-link {
  display:flex; align-items:center; gap:7px;
  color:rgba(200,230,200,.68); font-size:.82rem; text-decoration:none;
  transition:color .2s;
}
.ento-footer-link:hover { color:#fcd34d; }
.ento-footer-link-arrow { font-size:.85rem; flex-shrink:0; opacity:.7; }
.ento-footer-link-bioguide { align-items:flex-start; }
.ento-footer-link-bioguide-inner { display:flex; flex-direction:column; gap:2px; }
.ento-footer-link-bioguide-name { font-size:.82rem; }
.ento-footer-link-bioguide-sub { font-size:.75rem; opacity:.75; }

.ento-footer-divider {
  max-width:1100px; margin:clamp(20px,4vw,36px) auto 0;
  border:none; border-top:1px solid rgba(255,255,255,.07);
}
.ento-footer-bottom {
  max-width:1100px; margin:0 auto;
  padding:clamp(12px,2vw,18px) clamp(16px,5vw,32px) clamp(18px,3vw,28px);
  display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:8px;
}
.ento-footer-copy {
  font-size:.72rem; color:rgba(200,230,200,.3); font-family:var(--font-mono);
  direction:ltr; text-align:center;
}
@media(max-width:480px){
  .ento-footer-copy { font-size:.65rem; }
}
.ento-footer-back {
  display:inline-flex; align-items:center; gap:8px;
  background:linear-gradient(135deg,var(--ocean-1),var(--ocean-2));
  color:#fff; text-decoration:none; padding:9px 22px; border-radius:10px;
  font-weight:700; font-size:.82rem;
  transition:transform .2s,box-shadow .2s;
  box-shadow:0 4px 16px rgba(26,74,13,.4);
  border:1px solid rgba(245,158,11,.2);
}
.ento-footer-back:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(26,74,13,.55); }

@media(max-width:480px){
  .ento-sci-grid { grid-template-columns:1fr 1fr; }
  .ento-gloss-grid { grid-template-columns:1fr; }
  .ento-threats { grid-template-columns:1fr 1fr; }
  .ento-lang-btn { padding:5px 8px; font-size:.72rem; }
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
}

/* ══ HOME SCREEN — specimen plates on ivory, in both themes ══ */
.ento-home {
  display:flex; flex-direction:column;
  align-items:center; justify-content:flex-start;
  padding: clamp(36px,5vw,64px) clamp(16px,5vw,48px) clamp(56px,8vw,96px);
  background:#f3efe4;
  color:#1a2418;
  text-align:center;
}
.ento-dark .ento-home { background:#f3efe4; color:#1a2418; }
.ento-home-label {
  font-size:clamp(1.35rem,3vw,1.8rem); font-weight:700;
  color:#1a2418; line-height:1.2;
  margin:0 0 clamp(22px,3vw,36px);
}
.ento-chapters-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(min(100%,280px),1fr));
  gap:clamp(16px,2.4vw,24px);
  width:100%; max-width:1080px;
}
.ento-chapter-card {
  background:#fbf8f1;
  border:1px solid rgba(26,36,24,.16);
  border-radius:2px;
  padding:0;
  cursor:pointer;
  color:#1a2418; text-decoration:none;
  text-align:start;
  display:flex; flex-direction:column; align-items:stretch;
  transition:transform .25s, box-shadow .25s;
  box-shadow:0 12px 28px rgba(48,36,18,.08);
  overflow:hidden;
}
.ento-chapter-card:hover { transform:translateY(-4px); box-shadow:0 18px 36px rgba(48,36,18,.14); }
.ento-chapter-card:active { transform:translateY(-1px); }
.ento-chapter-card:focus-visible { outline:2px solid #8a4e12; outline-offset:3px; }
.ento-plate-photo {
  aspect-ratio:4/3; overflow:hidden; background:#e6e0d2;
}
.ento-plate-photo img {
  width:100%; height:100%; object-fit:cover; display:block;
}
.ento-plate-label {
  display:flex; flex-direction:column; gap:6px; flex:1;
  padding:14px 16px 16px;
  background:#fbf8f1;
}
.ento-ch-num {
  font-family:var(--font-mono); font-size:.72rem; letter-spacing:.08em;
  color:#8a4e12; font-weight:700;
  direction:ltr; unicode-bidi:isolate; text-align:end;
}
.ento-home[dir="ltr"] .ento-ch-num { text-align:start; }
.ento-ch-icon { width:34px; height:34px; color:var(--accent); }
.ento-ch-icon svg, .ento-chapter-hero-icon svg { width:100%; height:100%; display:block; }
.ento-home .ento-ch-title {
  font-size:clamp(1.05rem,2vw,1.22rem); font-weight:800;
  color:#1a2418; line-height:1.3;
}
.ento-home .ento-binomial { color:#8a4e12; font-size:.95rem; margin:0; text-align:end; width:100%; }
.ento-home[dir="ltr"] .ento-binomial { text-align:start; }
.ento-home .ento-ch-desc {
  font-size:.84rem; color:#3e4a3a;
  line-height:1.55;
}

/* ══ CHAPTER PAGE WRAPPER ══ */
.ento-chapter-page {
  min-height:100vh; padding-top:60px;
}
.ento-chapter-hero {
  background:linear-gradient(135deg,var(--ocean-1) 0%,#0d2107 100%);
  padding:clamp(36px,6vw,64px) clamp(16px,5vw,48px);
  text-align:center; position:relative; overflow:hidden;
}
.ento-chapter-hero::after {
  content:''; position:absolute; inset:0; pointer-events:none;
  background:radial-gradient(ellipse at 50% 120%, rgba(245,158,11,.12) 0%, transparent 70%);
}
.ento-chapter-hero-num {
  font-family:var(--font-mono); font-size:.78rem; letter-spacing:3px;
  color:rgba(245,158,11,.7); margin-bottom:10px;
}
.ento-chapter-hero-icon {
  width:46px; height:46px; margin:0 auto 12px; color:#e8d7b0;
  display:flex; align-items:center; justify-content:center;
}
.ento-chapter-hero-title {
  font-size:clamp(1.5rem,5vw,2.8rem); font-weight:900; color:#fff;
  margin-bottom:8px; line-height:1.15;
}
.ento-chapter-hero .ento-binomial { color:#e8d7b0; font-size:1.15rem; margin-top:6px; }
.ento-chapter-hero-en {
  font-size:clamp(.82rem,2vw,.98rem); color:rgba(246,241,230,.78);
  font-family:var(--font-arabic);
}

/* back button in topbar context */
.ento-topbar-back {
  display:inline-flex; align-items:center; gap:6px;
  background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2);
  color:#fff; border-radius:8px; padding:6px 12px;
  font-size:.82rem; font-family:var(--font-arabic);
  cursor:pointer; transition:background .2s;
  white-space:nowrap;
}
.ento-topbar-back:hover { background:rgba(255,255,255,.18); }

@media(max-width:640px){
  .ento-topbar { padding:0 10px; gap:6px; }
  .ento-brand { font-size:.82rem; gap:6px; min-width:0; }
  .ento-topbar-back + .ento-brand .ento-brand-text { display:none; }
  .ento-lang-switcher { gap:2px; padding:2px; }
  .ento-lang-btn { padding:4px 7px; font-size:.68rem; }
  .ento-theme-btn { width:32px; height:32px; flex-shrink:0; }
  .ento-topbar-right { gap:4px; flex-shrink:0; }
  .ento-chapters-grid { grid-template-columns:1fr; }
  .ento-section-nav {
    flex-wrap:nowrap; justify-content:flex-start;
    overflow-x:auto; padding-bottom:10px;
    scrollbar-width:thin;
  }
  .ento-snav-pill { flex-shrink:0; }
}
`;

function useTheme() {
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem("themeMode") || "auto"; } catch { return "auto"; }
  });
  const [systemDark, setSystemDark] = useState(() => window.matchMedia("(prefers-color-scheme:dark)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme:dark)");
    const h = () => setSystemDark(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  const isDark = mode === "dark" || (mode === "auto" && systemDark);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);
  const cycle = () => {
    const cyc = ["auto", "dark", "light"];
    const next = cyc[(cyc.indexOf(mode) + 1) % cyc.length];
    try { localStorage.setItem("themeMode", next); } catch {}
    setMode(next);
  };
  return { mode, isDark, cycle };
}

/* ═══════════════════════════════════════════════
   LANGUAGE SWITCHER COMPONENT
═══════════════════════════════════════════════ */
function LangSwitcher({ lang, setLang }) {
  return (
    <div className="ento-lang-switcher" dir="ltr">
      {Object.entries(LANG_CONFIG).map(([code, cfg]) => (
        <button
          key={code}
          className={`ento-lang-btn ${lang === code ? "active" : ""}`}
          onClick={() => setLang(code)}
          aria-label={`Switch to ${cfg.label}`}
        >
          {cfg.label}
        </button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════ */
function Hero({ lang }) {
  const heroDesc = {
    ku: "پلاتفۆرمێکی زانستییە بۆ ڕوونکردنەوەی مێروو، بە شێوازێکی ئەکادیمی و ئاسان",
    ar: "دراسة العلاقات التطورية والتصنيف — علم أكاديمي متخصص في الحشرات",
    en: "Phylogeny & Taxonomy Analysis — The academic science of insects explained clearly",
  };
  return (
    <section className="ento-hero">
      <video
        className="ento-hero-video"
        src="/FILE_2026-05-03_16_09_49.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="ento-hero-overlay" />
      <div className="ento-hero-body" style={{ direction: lang === "en" ? "ltr" : "rtl" }}>
        <h1 className="ento-hero-title-en">Atlas of Entomology</h1>
        <div className="ento-hero-title-ku">
          {lang === "ku" ? "ئەتڵەسی مێرووناسی" : lang === "ar" ? "أطلس علم الحشرات" : "The Atlas of Entomology"}
        </div>
        <p className="ento-hero-desc" style={{ direction: lang === "en" ? "ltr" : "rtl", textAlign: "center" }}>{heroDesc[lang]}</p>
        <a className="ento-hero-cta" href="#chapters">
          {lang === "ku" ? "بەشێک هەڵبژێرە" : lang === "ar" ? "اختر فصلاً" : "Choose a chapter"}
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   APP
═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════
   CHAPTER DEFINITIONS
═══════════════════════════════════════════════ */
const CHAPTERS = [
  {
    id: "ch1",
    num: { ku: "چاپتەری یەکەم", en: "Chapter 1", ar: "الفصل الأول" },
    icon: "pin",
    image: "/images/plates/ch1-raparin.jpg",
    title: { ku: "زانیاری زیادە", en: "Additional Information", ar: "معلومات إضافية" },
    desc: { ku: "دەربارەی پرۆژە، تیم و زانکۆ", en: "About the project, team & university", ar: "عن المشروع والفريق والجامعة" },
  },
  {
    id: "ch2",
    num: { ku: "چاپتەری دووەم", en: "Chapter 2", ar: "الفصل الثاني" },
    icon: "beetle",
    image: "/images/plates/ch2-drawer.jpg",
    title: { ku: "دەستپێکی ئێنتۆمۆلۆجی", en: "Introduction to Entomology", ar: "مقدمة علم الحشرات" },
    desc: { ku: "پێناسە، مێژوو و گرنگیی مێرووناسی", en: "Definition, history & importance of entomology", ar: "التعريف والتاريخ وأهمية علم الحشرات" },
  },
  {
    id: "ch3",
    num: { ku: "چاپتەری سێیەم", en: "Chapter 3", ar: "الفصل الثالث" },
    icon: "legs",
    image: "/images/plates/ch3-dragonfly.jpg",
    latin: "Arthropoda",
    title: { ku: "فایلەمی جومگەپێیەکان", en: "Phylum Arthropoda", ar: "شعبة مفصليات الأرجل" },
    desc: { ku: "سیستەمی هەناسەدان، پەیەکەری دەرەکی، چاوی ئاڵۆز و فەرهەنگ", en: "Respiratory system, exoskeleton, compound eyes & glossary", ar: "الجهاز التنفسي والهيكل الخارجي والعيون المركبة والمصطلحات" },
  },
  {
    id: "ch4",
    num: { ku: "چاپتەری چوارەم", en: "Chapter 4", ar: "الفصل الرابع" },
    icon: "card",
    image: "/images/plates/ch4-study.jpg",
    title: { ku: "کویز", en: "Quiz", ar: "اختبار" },
    desc: { ku: "تاقیکردنەوەی زانیاریت بە پرسیار و ڤیدیۆ", en: "Test your knowledge with questions & videos", ar: "اختبر معلوماتك بالأسئلة والفيديوهات" },
  },
  {
    id: "ch5",
    num: { ku: "چاپتەری پێنجەم", en: "Chapter 5", ar: "الفصل الخامس" },
    icon: "butterfly",
    image: "/images/plates/ch5-machaon.jpg",
    latin: "Lepidoptera",
    title: { ku: "پەپوولەکان", en: "Butterflies", ar: "الفراشات" },
    desc: { ku: "ناسنامە، بایۆلۆجی و جۆرە کوردستانییەکان", en: "Identity, biology & Kurdistan species", ar: "الهوية والبيولوجيا وأنواع كردستان" },
  },
  {
    id: "ch6",
    num: { ku: "چاپتەری شەشەم", en: "Chapter 6", ar: "الفصل السادس" },
    icon: "bee",
    image: "/images/plates/ch6-bee.jpg",
    latin: "Hymenoptera",
    title: { ku: "مێروولە، هەنگ و زەنبوور", en: "Ants, bees and wasps", ar: "النمل والنحل والزنابير" },
    desc: { ku: "سێ خێزان و جۆرە باوەکانی ناوچەکە", en: "Three families and common species of the region", ar: "ثلاث فصائل وأنواع شائعة في المنطقة" },
  },
  {
    id: "ch7",
    num: { ku: "چاپتەری حەوتەم", en: "Chapter 7", ar: "الفصل السابع" },
    icon: "beetle",
    image: "/images/plates/ch7-ladybird.jpg",
    focus: "center 42%",
    latin: "Coleoptera",
    title: { ku: "قوڕقوڕەکان", en: "Beetles", ar: "الخنافس" },
    desc: { ku: "قاوغی باڵ، خاڵخاڵۆکە و جۆرەکانی ناوچەکە", en: "Elytra, ladybirds and regional species", ar: "الأغماد والدعسوقة وأنواع المنطقة" },
  },
  {
    id: "ch8",
    num: { ku: "چاپتەری هەشتەم", en: "Chapter 8", ar: "الفصل الثامن" },
    icon: "fly",
    image: "/images/plates/ch8-mosquito.jpg",
    latin: "Diptera",
    title: { ku: "مێش و مێشوولە", en: "Flies and mosquitoes", ar: "الذباب والبعوض" },
    desc: { ku: "یەک جووت باڵ، مەلاریا و مێشی گوڵ", en: "One pair of wings, malaria and hoverflies", ar: "زوج أجنحة والملاريا وذباب الأزهار" },
  },
  {
    id: "ch9",
    num: { ku: "چاپتەری نۆیەم", en: "Chapter 9", ar: "الفصل التاسع" },
    icon: "net",
    image: "/images/plates/ch9-net.jpg",
    focus: "center 62%",
    title: { ku: "کێڵگە و لەیبڵ", en: "Field and label", ar: "الحقل والبطاقة" },
    desc: { ku: "کۆکردنەوە، شوێنی دەرزە و لەیبڵی نموونە", en: "Collecting, where to pin, and the specimen label", ar: "الجمع وموضع الدبوس وبطاقة العينة" },
  },
  {
    id: "ch10",
    num: { ku: "چاپتەری دەیەم", en: "Chapter 10", ar: "الفصل العاشر" },
    icon: "bug",
    image: "/images/plates/ch10-bug.jpg",
    latin: "Hemiptera",
    title: { ku: "شەتەک و سنە", en: "Aphids and true bugs", ar: "المن والبق" },
    desc: { ku: "دەمی کونکەر، و ئەو مێرووەی خاڵخاڵۆکە دەیخوات", en: "A piercing beak, and the insect a ladybird eats", ar: "فم ثاقب، والحشرة التي تأكلها الدعسوقة" },
  },
  {
    id: "ch11",
    num: { ku: "چاپتەری یازدەهەم", en: "Chapter 11", ar: "الفصل الحادي عشر" },
    icon: "dragon",
    image: "/images/plates/ch11-dragon.jpg",
    latin: "Orthoptera · Odonata",
    title: { ku: "جڕوشک و مێرووی ئاو", en: "Grasshoppers and dragonflies", ar: "الجنادب والرعاشات" },
    desc: { ku: "بازدان، چاوی گەورە، و بچووکێک لە ناو ئاو", en: "A jump, a large eye, and a nymph in the water", ar: "قفزة وعين كبيرة وحورية في الماء" },
  },
  {
    id: "ch12",
    num: { ku: "چاپتەری دوازدەهەم", en: "Chapter 12", ar: "الفصل الثاني عشر" },
    icon: "butterfly",
    image: "/images/plates/ch12-chrysalis.jpg",
    focus: "center 42%",
    title: { ku: "دوو گۆڕانەپەڕە", en: "Two metamorphoses", ar: "تحولان" },
    desc: { ku: "پیت هەیە، یان نییە", en: "A pupa, or none", ar: "شرنقة أو لا شرنقة" },
  },
];

/* ── Home Screen ── */
function HomeScreen({ lang }) {
  return (
    <div className="ento-home" id="chapters" dir={lang === "en" ? "ltr" : "rtl"}>
      <h2 className="ento-home-label">
        {lang === "ku" ? "بەشەکان" : lang === "ar" ? "الفصول" : "Chapters"}
      </h2>
      <div className="ento-chapters-grid">
        {CHAPTERS.map((ch) => (
          <a key={ch.id} className="ento-chapter-card" href={`#/${ch.id}`}>
            <div className="ento-plate-photo">
              <img src={ch.image} alt="" loading="lazy" style={{ objectPosition: ch.focus || "center" }} />
            </div>
            <div className="ento-plate-label">
              <div className="ento-ch-num">{ch.num.en}</div>
              <div className="ento-ch-title">{ch.title[lang]}</div>
              {ch.latin && <div className="ento-binomial">{ch.latin}</div>}
              <div className="ento-ch-desc">{ch.desc[lang]}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════ */
function pageFromHash() {
  const hash = window.location.hash;
  if (!hash.startsWith("#/")) return null;
  const id = decodeURIComponent(hash.slice(2).split(/[/?#]/)[0]);
  if (!id || id === "home") return "home";
  return CHAPTER_PAGES[id] ? id : "home";
}

function savedLang() {
  try {
    const value = localStorage.getItem("lang");
    return LANG_CONFIG[value] ? value : "ku";
  } catch {
    return "ku";
  }
}

export default function EntomologyPage() {
  const { isDark, cycle } = useTheme();
  const [lang, setLangState] = useState(savedLang);
  const [page, setPage] = useState(() => pageFromHash() || "home");
  const skipFirstScroll = useRef(true);

  const setLang = useCallback((value) => {
    setLangState(value);
    try { localStorage.setItem("lang", value); } catch {}
  }, []);

  useEffect(() => {
    const id = "ento-styles";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = CSS;
  }, []);

  useEffect(() => {
    document.documentElement.dir = LANG_CONFIG[lang].dir;
    document.documentElement.lang = lang === "ku" ? "ckb" : lang;
  }, [lang]);

  // Links like "#team" scroll inside the chapter; letting them change the
  // hash would drop "#/ch1" and a reload would land on the home page.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest && e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href");
      if (href.startsWith("#/")) return;
      const target = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const sync = () => {
      const next = pageFromHash();
      if (next) setPage(next);
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (skipFirstScroll.current) {
      skipFirstScroll.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const ChapterPage = page === "home" ? null : CHAPTER_PAGES[page];

  return (
    <div className={`ento-root ${isDark ? "ento-dark" : ""}`}>
      <header className="ento-topbar" style={{ direction: "ltr" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {page !== "home" && (
            <a className="ento-topbar-back" href="#/">
              {lang === "en" ? "← Home" : lang === "ar" ? "← الرئيسية" : "← سەرەکی"}
            </a>
          )}
          <a className="ento-brand" href="#/" aria-label="Atlas of Entomology"><Mark name="beetle" /> <span className="ento-brand-text">Atlas of <span>Entomology</span></span></a>
        </div>
        <div className="ento-topbar-right">
          <LangSwitcher lang={lang} setLang={setLang} />
          <button className="ento-theme-btn" aria-label="Toggle Theme" onClick={cycle}><Mark name={isDark ? "moon" : "sun"} /></button>
        </div>
      </header>

      {page === "home" && (
        <>
          <Hero lang={lang} />
          <HomeScreen lang={lang} />
        </>
      )}
      {ChapterPage && (
        <Suspense fallback={<div className="ento-chapter-page" />}>
          <ChapterPage lang={lang} />
        </Suspense>
      )}
    </div>
  );
}