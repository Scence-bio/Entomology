import { useRef } from "react";
import { VERSION } from "../catalog";

const t = (lang, ku, ar, en) => (lang === "ku" ? ku : lang === "ar" ? ar : en);

function digits(lang, value) {
  const s = String(value);
  return lang === "en" ? s : s.replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
}

export function QuizCertificate({ lang, score, total, pct, scope }) {
  const ref = useRef(null);
  const when = new Date().toLocaleDateString(lang === "en" ? "en-GB" : lang === "ar" ? "ar" : "ckb-IQ");

  const printCert = () => {
    const node = ref.current;
    if (!node) return;
    document.body.classList.add("ento-cert-print");
    window.print();
    const done = () => document.body.classList.remove("ento-cert-print");
    window.addEventListener("afterprint", done, { once: true });
    setTimeout(done, 1000);
  };

  return (
    <div className="ento-cert-wrap">
      <div ref={ref} className="ento-cert" dir={lang === "en" ? "ltr" : "rtl"}>
        <p className="ento-cert-eyebrow">Atlas of Entomology · v{VERSION}</p>
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
      <button type="button" className="ento-quiz-share-btn" onClick={printCert}>
        {t(lang, "چاپکردنی شەهادە", "طباعة الشهادة", "Print certificate")}
      </button>
    </div>
  );
}
