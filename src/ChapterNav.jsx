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
      <ol className="ento-breadcrumb">
        <li><a href="#/">{t(lang, "سەرەکی", "الرئيسية", "Home")}</a></li>
        <li aria-current="page">{chapter.title[lang]}</li>
      </ol>
      <div className="ento-chapter-nav-actions">
        <button type="button" className="ento-nav-btn" onClick={() => window.print()}>
          {t(lang, "چاپ / PDF", "طباعة / PDF", "Print / PDF")}
        </button>
        <div className="ento-chapter-siblings">
          {prev ? (
            <a className="ento-nav-btn" href={`#/${prev.id}`}>
              {lang === "en" ? `← ${prev.title.en}` : `← ${prev.title[lang]}`}
            </a>
          ) : <span />}
          {next ? (
            <a className="ento-nav-btn" href={`#/${next.id}`}>
              {lang === "en" ? `${next.title.en} →` : `${next.title[lang]} →`}
            </a>
          ) : <span />}
        </div>
      </div>
    </nav>
  );
}
