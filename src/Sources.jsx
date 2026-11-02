import { useState } from "react";
import { AppFooter } from "./Footer";
import { CHAPTERS, IMAGE_CREDITS, VERSION, chapterById } from "./catalog";

function t(lang, ku, ar, en) {
  return lang === "ku" ? ku : lang === "ar" ? ar : en;
}

function FieldReport({ lang }) {
  const [form, setForm] = useState({
    name: "",
    place: "",
    date: "",
    habitat: "",
    notes: "",
  });

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const body = [
      "Atlas of Entomology — field record (teaching)",
      `Name: ${form.name}`,
      `Place: ${form.place}`,
      `Date: ${form.date}`,
      `Habitat: ${form.habitat}`,
      `Notes: ${form.notes}`,
      "",
      "This is a teaching draft, not a verified museum record.",
    ].join("\n");
    const subject = encodeURIComponent("Entomo field record");
    window.location.href = `mailto:?subject=${subject}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="ento-field-form" onSubmit={submit}>
      <label>
        <span>{t(lang, "ناوی زانستی یان باو", "الاسم العلمي أو الشائع", "Scientific or common name")}</span>
        <input value={form.name} onChange={set("name")} required maxLength={120} />
      </label>
      <label>
        <span>{t(lang, "شوێن", "المكان", "Place")}</span>
        <input value={form.place} onChange={set("place")} required maxLength={120} />
      </label>
      <label>
        <span>{t(lang, "بەروار", "التاريخ", "Date")}</span>
        <input type="date" value={form.date} onChange={set("date")} required />
      </label>
      <label>
        <span>{t(lang, "ژینگە", "الموطن", "Habitat")}</span>
        <input value={form.habitat} onChange={set("habitat")} maxLength={120} />
      </label>
      <label>
        <span>{t(lang, "تێبینی", "ملاحظة", "Notes")}</span>
        <textarea value={form.notes} onChange={set("notes")} rows={3} maxLength={500} />
      </label>
      <p className="ento-body" style={{ marginTop: 0 }}>
        {t(
          lang,
          "ئەم فۆڕمە ڕەشنووسێکی فێرکاری دروست دەکات و ئیمەیڵی کڕیار دەکاتەوە. تۆماری مۆزەخانە نییە.",
          "هذا النموذج يعد مسودة تعليمية ويفتح بريدك. ليس سجلاً متحفياً.",
          "This form builds a teaching draft and opens your mail app. It is not a museum record."
        )}
      </p>
      <button type="submit" className="ento-nav-btn ento-nav-btn-accent">
        {t(lang, "ناردنی ڕەشنووس", "إرسال المسودة", "Send draft")}
      </button>
    </form>
  );
}

export default function SourcesPage({ lang }) {
  const dir = lang === "en" ? "ltr" : "rtl";
  return (
    <div className="ento-chapter-page">
      <div className="ento-chapter-hero" style={{ minHeight: 220, background: "#1a2418" }}>
        <div style={{ position: "relative", zIndex: 2, minHeight: 220, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "48px 20px" }}>
          <div className="ento-chapter-hero-num">{t(lang, `وەشانی ${VERSION}`, `الإصدار ${VERSION}`, `Version ${VERSION}`)}</div>
          <h1 className="ento-chapter-hero-title">{t(lang, "سەرچاوە و مۆڵەت", "المصادر والتراخيص", "Sources and licenses")}</h1>
        </div>
      </div>
      <div className="ento-container" dir={dir}>
        <article className="ento-card ento-visible" id="credits">
          <div className="ento-card-header">
            <div>
              <div className="ento-card-num">٠١ · 01</div>
              <div className="ento-card-title-ku">{t(lang, "وێنەکانی پلیت", "صور اللوحات", "Plate photographs")}</div>
            </div>
          </div>
          <p className="ento-body">
            {t(
              lang,
              "وێنەکان لە Wikimedia Commons و سەرچاوەی کراوەوەن. لەسەر کارتەکانی سەرەکی ناوی وێنەگر نیشان نادرێت؛ لێرە تۆمار کراون.",
              "الصور من ويكيميديا كومنز ومصادر مفتوحة. لا تظهر أسماء المصورين على بطاقات الصفحة الرئيسية؛ تُسجَّل هنا.",
              "Photographs come from Wikimedia Commons and open sources. Photographer names are not shown on the home cards; they are recorded here."
            )}
          </p>
          <table className="ento-record">
            <thead>
              <tr>
                <th>{t(lang, "چاپتەر", "الفصل", "Chapter")}</th>
                <th>{t(lang, "سەرچاوە", "المصدر", "Credit")}</th>
                <th>{t(lang, "مۆڵەت", "الترخيص", "License")}</th>
              </tr>
            </thead>
            <tbody>
              {IMAGE_CREDITS.map((row) => {
                const ch = chapterById(row.chapter);
                return (
                  <tr key={row.chapter}>
                    <td>
                      <a href={`#/${row.chapter}`}>{ch ? ch.num.en : row.chapter}</a>
                      <div className="ento-ch-desc" style={{ marginTop: 4 }}>{ch ? ch.title[lang] : ""}</div>
                    </td>
                    <td>{row.credit} · {row.via}</td>
                    <td>{row.license}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </article>

        <article className="ento-card ento-visible" id="orthography">
          <div className="ento-card-header">
            <div>
              <div className="ento-card-num">٠٢ · 02</div>
              <div className="ento-card-title-ku">{t(lang, "ڕێنووسی کوردی", "إملاء الكردية", "Kurdish orthography")}</div>
            </div>
          </div>
          <p className="ento-body" style={{ marginBottom: 0 }}>
            {t(
              lang,
              "دەقی کوردی بەپێی پوختەی ڕێنووسی لیژنەی ڕێنووس و خاڵبەندیی وەزارەتی پەروەردە (٢٠٢٦) نووسراوە.",
              "النص الكردي وفق خلاصة إملاء لجنة الإملاء والترقيم في وزارة التربية (٢٠٢٦).",
              "Kurdish text follows the 2026 Ministry of Education orthography summary."
            )}
            {" "}
            <a href="https://diyako.yageyziman.com/wp-content/uploads/2026/06/Puxtey_Renus_Wezareti_Perwerde.pdf" target="_blank" rel="noopener noreferrer">PDF</a>
          </p>
        </article>

        <article className="ento-card ento-visible" id="field-report">
          <div className="ento-card-header">
            <div>
              <div className="ento-card-num">٠٣ · 03</div>
              <div className="ento-card-title-ku">{t(lang, "ڕەشنووسی تۆماری کێڵگە", "مسودة سجل حقلي", "Field record draft")}</div>
            </div>
          </div>
          <FieldReport lang={lang} />
        </article>

        <article className="ento-card ento-visible" id="chapters-list">
          <div className="ento-card-header">
            <div>
              <div className="ento-card-num">٠٤ · 04</div>
              <div className="ento-card-title-ku">{t(lang, "هەموو چاپتەرەکان", "كل الفصول", "All chapters")}</div>
            </div>
          </div>
          <ul className="ento-fact-list">
            {CHAPTERS.map((ch) => (
              <li key={ch.id}>
                <span>{ch.num.en}</span>
                <strong><a href={`#/${ch.id}`}>{ch.title[lang]}</a></strong>
              </li>
            ))}
          </ul>
        </article>
      </div>
      <AppFooter lang={lang} />
    </div>
  );
}
