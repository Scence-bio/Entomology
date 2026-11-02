import { Mark } from "./marks";

const LANG_CONFIG = {
  ku: { label: "کوردی" },
  ar: { label: "العربية" },
  en: { label: "English" },
};

function t(lang, ku, ar, en) {
  return lang === "ku" ? ku : lang === "ar" ? ar : en;
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
        >
          {cfg.label}
        </button>
      ))}
    </div>
  );
}

const NAV = [
  { id: "home", href: "#/", match: (page) => page === "home", ku: "سەرەکی", ar: "الرئيسية", en: "Home" },
  { id: "chapters", href: "#/#chapters", match: () => false, ku: "بەشەکان", ar: "الفصول", en: "Chapters" },
  { id: "key", href: "#/ch14", match: (page) => page === "ch14", ku: "کلیل", ar: "المفتاح", en: "Key" },
  { id: "path", href: "#/#path", match: () => false, ku: "ڕێڕەو", ar: "المسار", en: "Path" },
];

export function AppHeader({ lang, setLang, page, isDark, onThemeCycle }) {
  return (
    <header className="ento-appbar" role="banner">
      <div className="ento-appbar-inner">
        <div className="ento-appbar-start">
          {page !== "home" && (
            <a className="ento-appbar-back" href="#/" aria-label={t(lang, "گەڕانەوە بۆ سەرەکی", "العودة للرئيسية", "Back to home")}>
              <span aria-hidden="true">{lang === "en" ? "←" : "→"}</span>
              <span className="ento-appbar-back-label">{t(lang, "سەرەکی", "الرئيسية", "Home")}</span>
            </a>
          )}
          <a className="ento-brand" href="#/" aria-label="Atlas of Entomology">
            <Mark name="beetle" />
            <span className="ento-brand-text">
              Atlas of <span>Entomology</span>
            </span>
          </a>
        </div>

        <nav className="ento-appbar-nav" aria-label={t(lang, "ناڤیگەیشتنی سەرەکی", "التنقل الرئيسي", "Primary")}>
          {NAV.map((item) => {
            const active = item.match(page);
            return (
              <a
                key={item.id}
                href={item.href}
                className={`ento-appbar-link${active ? " is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {t(lang, item.ku, item.ar, item.en)}
              </a>
            );
          })}
        </nav>

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
  const items = [
    { id: "home", href: "#/", active: page === "home", ku: "سەرەکی", ar: "الرئيسية", en: "Home", mark: "beetle" },
    { id: "chapters", href: "#/#chapters", active: false, ku: "بەشەکان", ar: "الفصول", en: "Chapters", mark: "book" },
    { id: "key", href: "#/ch14", active: page === "ch14", ku: "کلیل", ar: "المفتاح", en: "Key", mark: "key" },
    { id: "quiz", href: "#/ch4", active: page === "ch4", ku: "کویز", ar: "اختبار", en: "Quiz", mark: "check" },
  ];

  return (
    <nav className="ento-dock" aria-label={t(lang, "ناڤیگەیشتنی خێرا", "تنقل سريع", "Quick navigation")}>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className={`ento-dock-item${item.active ? " is-active" : ""}`}
          aria-current={item.active ? "page" : undefined}
        >
          <Mark name={item.mark} />
          <span>{t(lang, item.ku, item.ar, item.en)}</span>
        </a>
      ))}
    </nav>
  );
}
