import { Mark } from "./marks";
import { chapterById } from "./catalog";

const LANG_CONFIG = {
  ku: { label: "کوردی", short: "کورد", code: "ckb" },
  ar: { label: "العربية", short: "عرب", code: "ar" },
  en: { label: "English", short: "EN", code: "en" },
};

export function t(lang, pack) {
  if (typeof pack === "string") return pack;
  return pack[lang] || pack.en;
}

function pageTitle(lang, page) {
  if (page === "home") {
    return t(lang, {
      ku: "ئەتڵەسی مێرووناسی",
      ar: "أطلس علم الحشرات",
      en: "Atlas of Entomology",
    });
  }
  if (page === "notfound") return t(lang, { ku: "نەدۆزرایەوە", ar: "غير موجود", en: "Not found" });
  if (page === "ledger") {
    return t(lang, {
      ku: "تۆماری فەونا",
      ar: "سجل الفونة",
      en: "Faunal ledger",
    });
  }
  const chapter = chapterById(page);
  if (chapter) return chapter.title[lang] || chapter.title.en;
  return "Entomo";
}

function isChapterBrowse(page) {
  return /^ch\d+$/.test(page) && page !== "ch4" && page !== "ch14";
}

export const NAV_ITEMS = [
  {
    id: "home",
    href: "#/",
    mark: "beetle",
    match: (page) => page === "home",
    label: { ku: "سەرەکی", ar: "الرئيسية", en: "Home" },
  },
  {
    id: "chapters",
    href: "#/#chapters",
    mark: "book",
    match: isChapterBrowse,
    label: { ku: "بەشەکان", ar: "فصول", en: "Chapters" },
  },
  {
    id: "ledger",
    href: "#/ledger",
    mark: "pin",
    match: (page) => page === "ledger",
    label: { ku: "فەونا", ar: "فونة", en: "Fauna" },
  },
  {
    id: "key",
    href: "#/ch14",
    mark: "key",
    match: (page) => page === "ch14",
    label: { ku: "کلیل", ar: "مفتاح", en: "Key" },
  },
  {
    id: "quiz",
    href: "#/ch4",
    mark: "check",
    match: (page) => page === "ch4",
    label: { ku: "کویز", ar: "اختبار", en: "Quiz" },
  },
];

function LangSwitcher({ lang, setLang }) {
  return (
    <div
      className="ento-lang-switcher"
      dir="ltr"
      role="group"
      aria-label={t(lang, { ku: "زمان", ar: "اللغة", en: "Language" })}
    >
      {Object.entries(LANG_CONFIG).map(([code, cfg]) => (
        <button
          key={code}
          type="button"
          className={`ento-lang-btn ${lang === code ? "active" : ""}`}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-label={cfg.label}
          title={cfg.label}
          lang={cfg.code}
        >
          <span className="ento-lang-short">{cfg.short}</span>
          <span className="ento-lang-full">{cfg.label}</span>
        </button>
      ))}
    </div>
  );
}

export function AppHeader({ lang, setLang, page, isDark, onThemeCycle }) {
  const title = pageTitle(lang, page);
  const dir = lang === "en" ? "ltr" : "rtl";
  const htmlLang = lang === "ku" ? "ckb" : lang;

  return (
    <header className="ento-appbar" role="banner">
      <div className="ento-appbar-inner" dir={dir}>
        <div className="ento-appbar-start">
          {page !== "home" ? (
            <a
              className="ento-appbar-back"
              href="#/"
              aria-label={t(lang, { ku: "گەڕانەوە", ar: "رجوع", en: "Back" })}
            >
              <span className="ento-appbar-chevron" aria-hidden="true" />
            </a>
          ) : (
            <a className="ento-appbar-mark" href="#/" aria-label="Entomo">
              <Mark name="beetle" />
            </a>
          )}
          <div className="ento-appbar-titles">
            <p className="ento-appbar-kicker" dir="ltr">
              University of Raparin · Entomo
            </p>
            <h1 className="ento-appbar-title" lang={htmlLang}>
              {title}
            </h1>
          </div>
        </div>

        <nav
          className="ento-desk-nav"
          aria-label={t(lang, { ku: "ناڤیگەیشتنی سەرەکی", ar: "التنقل الرئيسي", en: "Primary" })}
        >
          {NAV_ITEMS.map((item) => {
            const active = item.match(page);
            return (
              <a
                key={item.id}
                href={item.href}
                className={`ento-desk-nav-link${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {t(lang, item.label)}
              </a>
            );
          })}
        </nav>

        <div className="ento-appbar-end" dir="ltr">
          <LangSwitcher lang={lang} setLang={setLang} />
          <button
            type="button"
            className="ento-theme-btn"
            aria-label={t(lang, { ku: "گۆڕینی ڕووکار", ar: "تبديل المظهر", en: "Toggle theme" })}
            onClick={onThemeCycle}
          >
            <Mark name={isDark ? "moon" : "sun"} />
          </button>
        </div>
      </div>
    </header>
  );
}

export function AppDock({ lang, page }) {
  const htmlLang = lang === "ku" ? "ckb" : lang;
  return (
    <nav
      className="ento-tabs"
      lang={htmlLang}
      aria-label={t(lang, { ku: "تابەکان", ar: "علامات التبويب", en: "Tabs" })}
    >
      <div className="ento-tabs-inner" dir={lang === "en" ? "ltr" : "rtl"}>
        {NAV_ITEMS.map((item) => {
          const active = item.match(page);
          const label = t(lang, item.label);
          return (
            <a
              key={item.id}
              href={item.href}
              className={`ento-tab${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
              aria-label={label}
              title={label}
            >
              <span className="ento-tab-icon" aria-hidden="true">
                <Mark name={item.mark} />
              </span>
              <span className="ento-tab-label">{label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
