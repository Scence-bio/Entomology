import { chapterById, neighbors } from "./catalog";

function t(lang, ku, ar, en) {
  return lang === "ku" ? ku : lang === "ar" ? ar : en;
}

export function ChapterNav({ lang, chapterId }) {
  const chapter = chapterById(chapterId);
  const { prev, next } = neighbors(chapterId);
  if (!chapter) return null;
  const dir = lang === "en" ? "ltr" : "rtl";

  return (
    <nav className="ento-chapter-nav" dir={dir} aria-label={t(lang, "ڕێنیشاندەری چاپتەر", "تنقل الفصل", "Chapter navigation")}>
      <div className="ento-chapter-nav-top">
        <ol className="ento-breadcrumb">
          <li><a href="#/">{t(lang, "سەرەکی", "الرئيسية", "Home")}</a></li>
          <li aria-current="page">{chapter.num[lang]}</li>
        </ol>
        <button type="button" className="ento-nav-btn ento-nav-btn-print" onClick={() => window.print()}>
          {t(lang, "چاپ", "طباعة", "Print")}
        </button>
      </div>
      <div className="ento-chapter-siblings">
        {prev ? (
          <a className="ento-nav-btn" href={`#/${prev.id}`}>
            <span className="ento-nav-dir" aria-hidden="true">‹</span>
            <span className="ento-nav-sibling-title">{prev.title[lang]}</span>
          </a>
        ) : <span />}
        {next ? (
          <a className="ento-nav-btn" href={`#/${next.id}`}>
            <span className="ento-nav-sibling-title">{next.title[lang]}</span>
            <span className="ento-nav-dir" aria-hidden="true">›</span>
          </a>
        ) : <span />}
      </div>
    </nav>
  );
}
