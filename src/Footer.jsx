export function AppFooter({ lang, sections }) {
  return (
    <footer className="ento-footer">
        <div className="ento-footer-inner" dir={lang === "en" ? "ltr" : "rtl"}>

          {/* Col 1 — Project */}
          <div className="ento-footer-col">
            <div className="ento-footer-col-title">
              {lang === "ku" ? "پرۆژە" : lang === "ar" ? "المشروع" : "Project"}
            </div>
            <div className="ento-footer-project">Atlas of <span>Entomology</span></div>
            <div className="ento-footer-tagline">
              {lang === "ku"
                ? "سەرچاوەی زانستی و ئەکادیمی بۆ خوێندنی مێرووناسی"
                : lang === "ar"
                ? "مرجع علمي وأكاديمي لدراسة علم الحشرات"
                : "A scientific & academic reference for Entomology"}
            </div>
          </div>

          {/* Quick Links */}
          <div className="ento-footer-col">
            <div className="ento-footer-col-title">
              {lang === "ku" ? "لینکە خێراکان" : lang === "ar" ? "روابط سريعة" : "Quick Links"}
            </div>
            <div className="ento-footer-links">
              {[
                { href: "https://gov.krd/mohe/",                             ku: "وەزارەتی خوێندنی باڵا و توێژینەوەی زانستی",    ar: "وزارة التعليم العالي والبحث العلمي",        en: "Ministry of Higher Ed. & Scientific Research" },
                { href: "https://uor.edu.krd/en/",                           ku: "زانکۆی ڕاپەڕین",           ar: "جامعة رابرين",                en: "University of Raparin" },
                { href: "https://sci.uor.edu.krd/en/",                       ku: "کۆلێژی زانست",             ar: "كلية العلوم",                 en: "College of Science" },
                { href: "https://sci.uor.edu.krd/en/departments/biology/",   ku: "بەشی بایۆلۆجی",            ar: "قسم علوم بايولوجي",              en: "Biology Department" },
                { href: "https://scence-bio.github.io/Biology/",             ku: "BioGuide",         ar: "BioGuide",             en: "BioGuide" },
              ].map(link => (
                <a
                  key={link.href}
                  className="ento-footer-link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="ento-footer-link-arrow">{lang === "en" ? "→" : "←"}</span>
                  <span>{lang === "ku" ? link.ku : lang === "ar" ? link.ar : link.en}</span>
                </a>
              ))}
              {/* e-Library — two-line entry */}
              <a className="ento-footer-link ento-footer-link-bioguide" href="https://scence-bio.github.io/library/" target="_blank" rel="noopener noreferrer">
                <span className="ento-footer-link-arrow">{lang === "en" ? "→" : "←"}</span>
                <span className="ento-footer-link-bioguide-inner">
                  <span className="ento-footer-link-bioguide-name">
                    {lang === "ku" ? "کتێبخانەی ئەلیکترۆنی کۆلێژی زانست"
                     : lang === "ar" ? "المكتبة الإلكترونية لكلية العلوم"
                     : "e-Library of College of Science"}
                  </span>
                </span>
              </a>
            </div>
          </div>

          {sections && (
          <div className="ento-footer-col">
            <div className="ento-footer-col-title">
              {lang === "ku" ? "بەشەکان" : lang === "ar" ? "الأقسام" : "Sections"}
            </div>
            <div className="ento-footer-links">
              {sections.map(s => (
                <a key={s.id} className="ento-footer-link" href={`#${s.id}`}>
                  <span className="ento-footer-link-arrow">{lang === "en" ? "→" : "←"}</span>
                  <span>{s.titles[lang]} {s.icon}</span>
                </a>
              ))}
            </div>
          </div>
          )}

        </div>

        <hr className="ento-footer-divider" />

        <div className="ento-footer-bottom" style={{ direction: "ltr" }}>
          <span className="ento-footer-copy">© 2025–2026 Atlas of Entomology · Academic Reference</span>
        </div>
      </footer>
  );
}
