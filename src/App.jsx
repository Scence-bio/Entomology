import { useState, useEffect, useRef, useCallback, lazy, Suspense, startTransition } from "react";
import "./museum.css";
import { CHAPTERS, LEARNING_PATH, searchChapters } from "./catalog";
import { ChapterNav } from "./ChapterNav";
import NotFoundPage from "./NotFound";
import { IdKey } from "./idKey/IdKey";
import { AppHeader, AppDock } from "./AppHeader";
import { AppFooter } from "./Footer";
import { InstallPrompt } from "./InstallPrompt";

const later = (name) => lazy(() => import("./LaterChapters").then((m) => ({ default: m[name] })));
const KurdistanLedger = lazy(() => import("./KurdistanLedger"));
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
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [isDark]);
  const cycle = () => {
    const cyc = ["auto", "dark", "light"];
    const next = cyc[(cyc.indexOf(mode) + 1) % cyc.length];
    try { localStorage.setItem("themeMode", next); } catch {}
    setMode(next);
  };
  return { mode, isDark, cycle };
}

function navigateWithTransition(update) {
  if (typeof document !== "undefined" && typeof document.startViewTransition === "function") {
    document.startViewTransition(() => {
      startTransition(update);
    });
    return;
  }
  startTransition(update);
}

function Hero({ lang }) {
  const videoRef = useRef(null);
  const [allowVideo] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !allowVideo) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (el.dataset.src && !el.getAttribute("src")) {
            el.src = el.dataset.src;
            el.load();
          }
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "80px", threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [allowVideo]);

  const heroDesc = {
    ku: "ئەتڵەسێکی ئەکادیمیی سێ زمانە بۆ مێرووناسی — بنەماکان، ئۆردەرەکان، تۆماری فەونای کوردستان، کلیلی ناسینەوە و کویز. زانکۆی ڕاپەڕین · کۆلێژی زانست.",
    ar: "أطلس أكاديمي ثلاثي اللغة لعلم الحشرات — أسس ورتب وسجل فونة كردستان ومفتاح واختبار. جامعة رابرين · كلية العلوم.",
    en: "A trilingual academic atlas of entomology — foundations, orders, Kurdistan faunal ledger, identification key and quiz. University of Raparin · College of Science.",
  };

  return (
    <section className="ento-hero">
      {allowVideo && (
        <video
          ref={videoRef}
          className="ento-hero-video"
          data-src="/FILE_2026-05-03_16_09_49.mp4"
          poster="/images/plates/ch2-drawer.jpg"
          muted
          loop
          playsInline
          preload="none"
        />
      )}
      <div className="ento-hero-overlay" />
      <div className="ento-hero-body" style={{ direction: lang === "en" ? "ltr" : "rtl" }}>
        <p className="ento-hero-kicker">
          {lang === "ku"
            ? "زانکۆی ڕاپەڕین · کۆلێژی زانست · بەشی بایۆلۆجی"
            : lang === "ar"
            ? "جامعة رابرين · كلية العلوم · قسم علوم الحياة"
            : "University of Raparin · College of Science · Biology"}
        </p>
        <h1 className="ento-hero-title-brand">
          {lang === "ku" ? "ئەتڵەسی مێرووناسی" : lang === "ar" ? "أطلس علم الحشرات" : "Atlas of Entomology"}
        </h1>
        <p className="ento-hero-title-tri" dir="ltr">
          <span>ئەتڵەسی مێرووناسی</span>
          <span aria-hidden="true"> · </span>
          <span>أطلس علم الحشرات</span>
          <span aria-hidden="true"> · </span>
          <span>Atlas of Entomology</span>
        </p>
        <p className="ento-hero-desc" style={{ direction: lang === "en" ? "ltr" : "rtl", textAlign: "center" }}>
          {heroDesc[lang]}
        </p>
        <div className="ento-hero-ctas">
          <a className="ento-hero-cta" href="#/ledger">
            {lang === "ku" ? "تۆماری فەونای کوردستان" : lang === "ar" ? "سجل فونة كردستان" : "Kurdistan faunal ledger"}
          </a>
          <a className="ento-hero-cta ento-hero-cta-ghost" href="#id-key">
            {lang === "ku" ? "مێروو بناسەوە" : lang === "ar" ? "عرّف الحشرة" : "Identify an insect"}
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
      <aside className="ento-prospectus" id="prospectus">
        <p className="ento-prospectus-kicker" dir="ltr">Acta · Atlas of Entomology</p>
        <h2 className="ento-prospectus-title">
          {lang === "ku"
            ? "نامیلکەی ئەکادیمی"
            : lang === "ar"
            ? "نشرة أكاديمية"
            : "Academic prospectus"}
        </h2>
        <p className="ento-prospectus-body">
          {lang === "ku"
            ? "ئەم ئەتڵەسە سەرچاوەیەکی فێرکاریی فەرمیی سێ زمانەیە: هەر دەقێک بە کوردی، عەرەبی و ئینگلیزی بە هەمان قووڵایی دەنووسرێتەوە؛ ناوی زانستیی لاتینی وەک خۆی دەمێنێتەوە؛ و تۆماری فەونای کوردستان توێژینەوەی زانکۆکانی ناوچەکە بە GBIF دەبەستێتەوە."
            : lang === "ar"
            ? "هذا الأطلس مصدر تعليمي رسمي ثلاثي اللغة: كل نص يُكتب بالكردية والعربية والإنجليزية بنفس العمق؛ وتبقى الأسماء العلمية اللاتينية؛ ويُربط سجل فونة كردستان بأبحاث جامعات المنطقة وGBIF."
            : "This atlas is a formal trilingual teaching resource: every passage is authored in Kurdish, Arabic and English at equal depth; Latin binomials are retained; and the Kurdistan faunal ledger binds regional university research to GBIF."}
        </p>
        <div className="ento-prospectus-actions">
          <a className="ento-hero-cta" href="#/ledger">
            {lang === "ku" ? "بڕۆ بۆ تۆماری فەونا" : lang === "ar" ? "إلى سجل الفونة" : "Open the faunal ledger"}
          </a>
          <a className="ento-hero-cta ento-hero-cta-ghost" href="#path">
            {lang === "ku" ? "نەخشەی فێرکاری" : lang === "ar" ? "مسار التعلم" : "Learning path"}
          </a>
        </div>
      </aside>

      <div className="ento-path" id="path">
        <h2 className="ento-home-label">
          {lang === "ku" ? "نەخشەی فێرکاری" : lang === "ar" ? "مسار التعلم" : "Learning path"}
        </h2>
        <hr className="ento-home-rule" />
        <p className="ento-path-lead">
          {lang === "ku"
            ? "بەم ڕیزە بخوێنەوە: دەستپێک، ئۆردەرەکان، تۆماری فەونای کوردستان، کاری کێڵگە و کلیل، پاشان کویز. هەر هەنگاوێک بە هەر سێ زمانە."
            : lang === "ar"
            ? "اقرأ بهذا الترتيب: البداية، الرتب، سجل الفونة، العمل والمفتاح، ثم الاختبار. كل خطوة باللغات الثلاث."
            : "Read in this order: start, orders, faunal ledger, field and key, then the quiz. Every step is trilingual."}
        </p>
        <div className="ento-path-grid">
          {LEARNING_PATH.map((step, i) => (
            <div key={step.id} className="ento-path-card">
              <div className="ento-path-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="ento-path-title">{step.title[lang]}</div>
              <div className="ento-path-desc">{step.desc[lang]}</div>
              <div className="ento-path-links">
                {step.href ? (
                  <a href={step.href}>{step.hrefLabel?.[lang] || step.title[lang]}</a>
                ) : null}
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
          enterKeyHint="search"
          autoComplete="off"
        />
      </label>
      {results.length === 0 ? (
        <p className="ento-body">{lang === "ku" ? "هیچ بەشێک نەدۆزرایەوە." : lang === "ar" ? "لم يُعثر على فصل." : "No chapters found."}</p>
      ) : (
        <div className="ento-chapters-grid">
          {results.map((ch) => (
            <a key={ch.id} className="ento-chapter-card" href={`#/${ch.id}`}>
              <div className="ento-plate-photo">
                <img
                  src={ch.image}
                  alt={ch.alt?.[lang] || ch.title[lang]}
                  loading="lazy"
                  decoding="async"
                  width="640"
                  height="400"
                  style={{ objectPosition: ch.focus || "center" }}
                />
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
      <p className="ento-home-meta">Atlas of Entomology · Academic Web App · University of Raparin</p>
    </div>
  );
}

function pageFromHash() {
  const hash = window.location.hash;
  if (!hash.startsWith("#/")) return null;
  const id = decodeURIComponent(hash.slice(2).split(/[/?#]/)[0]);
  if (!id || id === "home") return "home";
  if (id === "ledger") return "ledger";
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
            setTimeout(go, 120);
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
      if (!next) return;
      navigateWithTransition(() => {
        setPage((prev) => (next === prev ? prev : next));
      });
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (skipFirstScroll.current) {
      skipFirstScroll.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  const ChapterPage = CHAPTER_PAGES[page] || null;

  return (
    <div className={`ento-root ento-app ${isDark ? "ento-dark" : ""}`}>
      <a className="ento-skip" href="#main">
        {lang === "ku" ? "بڕۆ بۆ ناوەڕۆک" : lang === "ar" ? "انتقل إلى المحتوى" : "Skip to content"}
      </a>
      <AppHeader lang={lang} setLang={setLang} page={page} isDark={isDark} onThemeCycle={cycle} />

      <main className="ento-main" id="main" data-page={page}>
        {page === "home" && (
          <>
            <Hero lang={lang} />
            <HomeScreen lang={lang} />
          </>
        )}
        {page === "notfound" && <NotFoundPage lang={lang} />}
        {page === "ledger" && (
          <Suspense fallback={<div className="ento-chapter-page ento-chapter-loading" aria-busy="true" />}>
            <div className="ento-chapter-shell">
              <nav className="ento-chapter-nav" dir={lang === "en" ? "ltr" : "rtl"} aria-label={lang === "ku" ? "گەڕانەوە" : lang === "ar" ? "رجوع" : "Back"}>
                <div className="ento-chapter-nav-top">
                  <ol className="ento-breadcrumb">
                    <li><a href="#/">{lang === "ku" ? "سەرەکی" : lang === "ar" ? "الرئيسية" : "Home"}</a></li>
                    <li aria-current="page">{lang === "ku" ? "فەونای کوردستان" : lang === "ar" ? "سجل الفونة" : "Faunal ledger"}</li>
                  </ol>
                </div>
              </nav>
              <KurdistanLedger lang={lang} />
            </div>
          </Suspense>
        )}
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
