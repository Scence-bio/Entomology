import { Mark } from "./marks";

const LANG_CONFIG = {
  ku: { label: "کوردی", short: "ک" },
  ar: { label: "العربية", short: "ع" },
  en: { label: "EN", short: "EN" },
};

function t(lang, ku, ar, en) {
  return lang === "ku" ? ku : lang === "ar" ? ar : en;
}

function pageTitle(lang, page) {
  if (page === "home") return t(lang, "ئەتڵەسی مێرووناسی", "أطلس علم الحشرات", "Atlas of Entomology");
  if (page === "notfound") return t(lang, "نەدۆزرایەوە", "غير موجود", "Not found");
  if (page === "ch14") return t(lang, "کلیلی ناسینەوە", "مفتاح التعريف", "ID Key");
  if (page === "ch4") return t(lang, "کویز", "الاختبار", "Quiz");
  return t(lang, "بەش", "فصل", "Chapter");
}

function LangSwitcher({ lang, setLang }) {
  return (
    <div className="ento-lang-switcher" dir="ltr" role="group" aria-label="Language">
      {Object.entries(LANG_CONFIG).map(([code, cfg]) => (
        <button
          key={code}
          type="button"
          className={`ento-lang-btn ${lang === code ? "active" : ""}`}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          aria-label={cfg.label}
          title={cfg.label}
        >
          <span className="ento-lang-full">{cfg.label}</span>
          <span className="ento-lang-short">{cfg.short}</span>
        </button>
      ))}
    </div>
  );
}

function isChapterBrowse(page) {
  return /^ch\d+$/.test(page) && page !== "ch4" && page !== "ch14";
}

const TABS = [
  {
    id: "home",
    href: "#/",
    mark: "beetle",
    match: (page) => page === "home",
    ku: "سەرەکی",
    ar: "الرئيسية",
    en: "Home",
  },
  {
    id: "chapters",
    href: "#/#chapters",
    mark: "book",
    match: isChapterBrowse,
    ku: "بەشەکان",
    ar: "الفصول",
    en: "Chapters",
  },
  {
    id: "key",
    href: "#/ch14",
    mark: "key",
    match: (page) => page === "ch14",
    ku: "کلیل",
    ar: "المفتاح",
    en: "Key",
  },
  {
    id: "quiz",
    href: "#/ch4",
    mark: "check",
    match: (page) => page === "ch4",
    ku: "کویز",
    ar: "اختبار",
    en: "Quiz",
  },
  {
    id: "path",
    href: "#/#path",
    mark: "net",
    match: () => false,
    ku: "ڕێڕەو",
    ar: "المسار",
    en: "Path",
  },
];

export function AppHeader({ lang, setLang, page, isDark, onThemeCycle }) {
  const title = pageTitle(lang, page);
  return (
    <header className="ento-appbar" role="banner">
      <div className="ento-appbar-inner">
        <div className="ento-appbar-start">
          {page !== "home" ? (
            <a
              className="ento-appbar-back"
              href="#/"
              aria-label={t(lang, "گەڕانەوە", "رجوع", "Back")}
            >
              <span aria-hidden="true">{lang === "en" ? "‹" : "›"}</span>
            </a>
          ) : (
            <span className="ento-appbar-mark" aria-hidden="true">
              <Mark name="beetle" />
            </span>
          )}
          <div className="ento-appbar-titles">
            <p className="ento-appbar-kicker" dir="ltr">Entomo</p>
            <h1 className="ento-appbar-title">{title}</h1>
          </div>
        </div>

        <div className="ento-appbar-end">
          <LangSwitcher lang={lang} setLang={setLang} />
          <button
            type="button"
            className="ento-theme-btn"
            aria-label={t(lang, "گۆڕینی ڕووکار", "تبديل المظهر", "Toggle theme")}
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
  return (
    <nav className="ento-tabs" aria-label={t(lang, "تابەکان", "علامات التبويب", "Tabs")}>
      <div className="ento-tabs-inner">
        {TABS.map((item) => {
          const active = item.match(page);
          return (
            <a
              key={item.id}
              href={item.href}
              className={`ento-tab${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span className="ento-tab-icon">
                <Mark name={item.mark} />
              </span>
              <span className="ento-tab-label">{t(lang, item.ku, item.ar, item.en)}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
