function t(lang, ku, ar, en) {
  return lang === "ku" ? ku : lang === "ar" ? ar : en;
}

const INSTITUTION = [
  {
    href: "https://gov.krd/mohe/",
    ku: "وەزارەتی خوێندنی باڵا و توێژینەوەی زانستی",
    ar: "وزارة التعليم العالي والبحث العلمي",
    en: "Ministry of Higher Education",
  },
  {
    href: "https://uor.edu.krd/en/",
    ku: "زانکۆی ڕاپەڕین",
    ar: "جامعة رابرين",
    en: "University of Raparin",
  },
  {
    href: "https://sci.uor.edu.krd/en/",
    ku: "کۆلێژی زانست",
    ar: "كلية العلوم",
    en: "College of Science",
  },
  {
    href: "https://sci.uor.edu.krd/en/departments/biology/",
    ku: "بەشی بایۆلۆجی",
    ar: "قسم علوم الحياة",
    en: "Biology Department",
  },
];

const APP_LINKS = [
  { href: "#/", ku: "سەرەکی", ar: "الرئيسية", en: "Home" },
  { href: "#/#path", ku: "نەخشەی فێرکاری", ar: "مسار التعلم", en: "Learning path" },
  { href: "#/#chapters", ku: "بەشەکان", ar: "الفصول", en: "Chapters" },
  { href: "#/ch14", ku: "کلیلی ناسینەوە", ar: "مفتاح التعريف", en: "Identification key" },
  { href: "#/ch4", ku: "کویز و بڕوانامە", ar: "الاختبار والشهادة", en: "Quiz & certificate" },
];

const RESOURCES = [
  {
    href: "https://scence-bio.github.io/Biology/",
    ku: "BioGuide",
    ar: "BioGuide",
    en: "BioGuide",
  },
  {
    href: "https://scence-bio.github.io/library/",
    ku: "کتێبخانەی ئەلیکترۆنیی کۆلێژی زانست",
    ar: "المكتبة الإلكترونية لكلية العلوم",
    en: "College of Science e-Library",
  },
];

export function AppFooter({ lang }) {
  const dir = lang === "en" ? "ltr" : "rtl";
  const arrow = lang === "en" ? "→" : "←";

  return (
    <footer className="ento-footer" role="contentinfo">
      <div className="ento-footer-inner" dir={dir}>
        <div className="ento-footer-col ento-footer-brand-col">
          <div className="ento-footer-col-title">{t(lang, "پرۆژە", "المشروع", "Project")}</div>
          <div className="ento-footer-project" dir="ltr">
            Atlas of <span>Entomology</span>
          </div>
          <p className="ento-footer-tagline">
            {t(
              lang,
              "ئەپڵیکەیشنی فێرکاریی مێرووناسی — کوردی، عەرەبی و ئینگلیزی. زانکۆی ڕاپەڕین.",
              "تطبيق تعليمي لعلم الحشرات — كردية وعربية وإنجليزية. جامعة رابرين.",
              "Educational entomology web app — Kurdish, Arabic & English. University of Raparin."
            )}
          </p>
          <div className="ento-footer-badges" dir="ltr">
            <span className="ento-footer-badge">PWA</span>
            <span className="ento-footer-badge">Offline-ready</span>
            <span className="ento-footer-badge">ckb · ar · en</span>
          </div>
        </div>

        <div className="ento-footer-col">
          <div className="ento-footer-col-title">{t(lang, "لە ئەپەکەدا", "في التطبيق", "In the app")}</div>
          <div className="ento-footer-links">
            {APP_LINKS.map((link) => (
              <a key={link.href} className="ento-footer-link" href={link.href}>
                <span className="ento-footer-link-arrow" aria-hidden="true">{arrow}</span>
                <span>{t(lang, link.ku, link.ar, link.en)}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="ento-footer-col">
          <div className="ento-footer-col-title">{t(lang, "دامەزراوە", "المؤسسة", "Institution")}</div>
          <div className="ento-footer-links">
            {INSTITUTION.map((link) => (
              <a
                key={link.href}
                className="ento-footer-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ento-footer-link-arrow" aria-hidden="true">{arrow}</span>
                <span>{t(lang, link.ku, link.ar, link.en)}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="ento-footer-col">
          <div className="ento-footer-col-title">{t(lang, "سەرچاوە", "موارد", "Resources")}</div>
          <div className="ento-footer-links">
            {RESOURCES.map((link) => (
              <a
                key={link.href}
                className="ento-footer-link"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ento-footer-link-arrow" aria-hidden="true">{arrow}</span>
                <span>{t(lang, link.ku, link.ar, link.en)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <hr className="ento-footer-divider" />

      <div className="ento-footer-bottom" dir="ltr">
        <span className="ento-footer-copy">
          © 2025–2026 Atlas of Entomology · University of Raparin · Web App
        </span>
      </div>
    </footer>
  );
}
