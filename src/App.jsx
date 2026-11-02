import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
import "./museum.css";
import { CHAPTERS, LEARNING_PATH, searchChapters } from "./catalog";
import { ChapterNav } from "./ChapterNav";
import NotFoundPage from "./NotFound";
import { IdKey } from "./idKey/IdKey";
import { AppHeader, AppDock } from "./AppHeader";
import { AppFooter } from "./Footer";
import { InstallPrompt } from "./InstallPrompt";

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
  ch13: later("Chapter13"),
  ch14: later("Chapter14"),
};

const LANG_CONFIG = {
  ku: { label: "کوردی", dir: "rtl" },
  ar: { label: "العربية", dir: "rtl" },
  en: { label: "English", dir: "ltr" },
};

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

function Hero({ lang }) {
  const heroDesc = {
    ku: "ئەپڵیکەیشنی فێرکاریی مێرووناسی — پێناسە، ئۆردەر، کلیل و کویز",
    ar: "تطبيق تعليمي لعلم الحشرات — تعريف ورتب ومفتاح واختبار",
    en: "An entomology learning web app — definition, orders, key and quiz",
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
        <p className="ento-hero-kicker">Entomo</p>
        <h1 className="ento-hero-title-en">Atlas of Entomology</h1>
        <div className="ento-hero-title-ku">
          {lang === "ku" ? "ئەتڵەسی مێرووناسی" : lang === "ar" ? "أطلس علم الحشرات" : "The Atlas of Entomology"}
        </div>
        <p className="ento-hero-desc" style={{ direction: lang === "en" ? "ltr" : "rtl", textAlign: "center" }}>{heroDesc[lang]}</p>
        <div className="ento-hero-ctas">
          <a className="ento-hero-cta" href="#id-key">
            {lang === "ku" ? "مێروو بناسەوە" : lang === "ar" ? "عرّف الحشرة" : "Identify an insect"}
          </a>
          <a className="ento-hero-cta ento-hero-cta-ghost" href="#chapters">
            {lang === "ku" ? "بەشێک هەڵبژێرە" : lang === "ar" ? "اختر فصلاً" : "Choose a chapter"}
          </a>
        </div>
      </div>
    </section>
  );
}

function HomeScreen({ lang }) {
  const [query, setQuery] = useState("");
  const results = searchChapters(query, lang);
  const dir = lang === "en" ? "ltr" : "rtl";
  return (
    <div className="ento-home" id="chapters" dir={dir}>
      <div className="ento-path" id="path">
        <h2 className="ento-home-label">
          {lang === "ku" ? "نەخشەی فێرکاری" : lang === "ar" ? "مسار التعلم" : "Learning path"}
        </h2>
        <hr className="ento-home-rule" />
        <p className="ento-path-lead">
          {lang === "ku"
            ? "بەم ڕیزە بخوێنە: دەستپێک، ئۆردەرەکان، کار و کلیل، پاشان کویز."
            : lang === "ar"
            ? "اقرأ بهذا الترتيب: البداية، الرتب، العمل والمفتاح، ثم الاختبار."
            : "Read in this order: start, orders, field and key, then the quiz."}
        </p>
        <div className="ento-path-grid">
          {LEARNING_PATH.map((step, i) => (
            <div key={step.id} className="ento-path-card">
              <div className="ento-path-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="ento-path-title">{step.title[lang]}</div>
              <div className="ento-path-desc">{step.desc[lang]}</div>
              <div className="ento-path-links">
                {step.chapters.map((id) => {
                  const ch = CHAPTERS.find((c) => c.id === id);
                  return ch ? (
                    <a key={id} href={`#/${id}`}>{ch.num.en.replace("Chapter ", "Ch ")}</a>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <IdKey lang={lang} />

      <h2 className="ento-home-label">
        {lang === "ku" ? "بەشەکان" : lang === "ar" ? "الفصول" : "Chapters"}
      </h2>
      <hr className="ento-home-rule" />
      <label className="ento-search">
        <span className="ento-sr-only">
          {lang === "ku" ? "گەڕان لە بەشەکان" : lang === "ar" ? "بحث في الفصول" : "Search chapters"}
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={lang === "ku" ? "گەڕان: ناو، وەسف، یان ناوی زانستی…" : lang === "ar" ? "ابحث: اسم أو وصف أو اسم علمي…" : "Search title, description, or scientific name…"}
          aria-label={lang === "ku" ? "گەڕان لە بەشەکان" : lang === "ar" ? "بحث في الفصول" : "Search chapters"}
        />
      </label>
      {results.length === 0 ? (
        <p className="ento-body">{lang === "ku" ? "هیچ بەشێک نەدۆزرایەوە." : lang === "ar" ? "لم يُعثر على فصل." : "No chapters found."}</p>
      ) : (
        <div className="ento-chapters-grid">
          {results.map((ch) => (
            <a key={ch.id} className="ento-chapter-card" href={`#/${ch.id}`}>
              <div className="ento-plate-photo">
                <img src={ch.image} alt={ch.alt?.[lang] || ch.title[lang]} loading="lazy" style={{ objectPosition: ch.focus || "center" }} />
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
      )}
      <p className="ento-home-meta">Atlas of Entomology · Web App</p>
    </div>
  );
}

function pageFromHash() {
  const hash = window.location.hash;
  if (!hash.startsWith("#/")) return null;
  const id = decodeURIComponent(hash.slice(2).split(/[/?#]/)[0]);
  if (!id || id === "home") return "home";
  if (CHAPTER_PAGES[id]) return id;
  return "notfound";
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
    document.documentElement.dir = LANG_CONFIG[lang].dir;
    document.documentElement.lang = lang === "ku" ? "ckb" : lang;
    document.documentElement.dataset.app = "entomo";
  }, [lang]);

  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest && e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href");
      if (href.startsWith("#/")) {
        // "#/#chapters" → go home then scroll to section
        const rest = href.slice(2);
        if (rest.startsWith("#")) {
          e.preventDefault();
          const sectionId = decodeURIComponent(rest.slice(1));
          const go = () => {
            const target = document.getElementById(sectionId);
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
          };
          if (page !== "home") {
            window.location.hash = "#/";
            setTimeout(go, 80);
          } else {
            go();
          }
        }
        return;
      }
      const target = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [page]);

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

  const ChapterPage = CHAPTER_PAGES[page] || null;

  return (
    <div className={`ento-root ento-app ${isDark ? "ento-dark" : ""}`}>
      <AppHeader lang={lang} setLang={setLang} page={page} isDark={isDark} onThemeCycle={cycle} />

      <main className="ento-main" id="main">
        {page === "home" && (
          <>
            <Hero lang={lang} />
            <HomeScreen lang={lang} />
          </>
        )}
        {page === "notfound" && <NotFoundPage lang={lang} />}
        {ChapterPage && (
          <Suspense fallback={<div className="ento-chapter-page ento-chapter-loading" aria-busy="true" />}>
            <div className="ento-chapter-shell">
              <ChapterNav lang={lang} chapterId={page} />
              <ChapterPage lang={lang} />
            </div>
          </Suspense>
        )}
      </main>

      <AppFooter lang={lang} />
      <AppDock lang={lang} page={page} />
      <InstallPrompt lang={lang} />
    </div>
  );
}
