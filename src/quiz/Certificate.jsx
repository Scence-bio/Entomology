const t = (lang, ku, ar, en) => (lang === "ku" ? ku : lang === "ar" ? ar : en);

function digits(lang, value) {
  const s = String(value);
  return lang === "en" ? s : s.replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
}

export function QuizCertificate({ lang, score, total, pct, scope }) {
  const when = new Date().toLocaleDateString(lang === "en" ? "en-GB" : lang === "ar" ? "ar" : "ckb-IQ");

  return (
    <div className="ento-cert-wrap">
      <div className="ento-cert" dir={lang === "en" ? "ltr" : "rtl"}>
        <p className="ento-cert-eyebrow">Atlas of Entomology</p>
        <h3 className="ento-cert-title">
          {t(lang, "شەهادەی کویز", "شهادة الاختبار", "Quiz certificate")}
        </h3>
        <p className="ento-cert-score">
          {digits(lang, score)} / {digits(lang, total)} · {digits(lang, pct)}%
        </p>
        <p className="ento-cert-meta">
          {t(lang, "بەروار: ", "التاريخ: ", "Date: ")}{when}
          {" · "}
          {scope === "all" ? t(lang, "کویزی گشتی", "اختبار عام", "Full quiz") : scope}
        </p>
        <p className="ento-cert-note">
          {t(
            lang,
            "ئەمە شەهادەیەکی فێرکاریی ناوخۆییە لە www.entomo.online، نەک بڕوانامەی فەرمیی زانکۆ.",
            "هذه شهادة تعليمية داخلية من www.entomo.online، وليست شهادة جامعية رسمية.",
            "A local teaching certificate from www.entomo.online, not an official university diploma."
          )}
        </p>
      </div>
    </div>
  );
}
