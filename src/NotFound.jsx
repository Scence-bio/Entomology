import { AppFooter } from "./Footer";

export default function NotFoundPage({ lang }) {
  const dir = lang === "en" ? "ltr" : "rtl";
  return (
    <div className="ento-chapter-page">
      <div className="ento-container ento-notfound" dir={dir}>
        <p className="ento-notfound-code">404</p>
        <h1 className="ento-notfound-title">
          {lang === "ku" ? "ئەم بەستەرە نەدۆزرایەوە" : lang === "ar" ? "هذا الرابط غير موجود" : "This link was not found"}
        </h1>
        <p className="ento-body">
          {lang === "ku"
            ? "بەشەکە یان پەڕەکە لە ئەتڵەسەکەدا نییە. بگەڕێوە بۆ سەرەکی یان چاپتەرێک هەڵبژێرە."
            : lang === "ar"
            ? "الفصل أو الصفحة غير موجودة في الأطلس. عد إلى الرئيسية أو اختر فصلاً."
            : "That chapter or page is not in the atlas. Return home or choose a chapter."}
        </p>
        <div className="ento-pick-row">
          <a className="ento-nav-btn ento-nav-btn-accent" href="#/">
            {lang === "ku" ? "سەرەکی" : lang === "ar" ? "الرئيسية" : "Home"}
          </a>
          <a className="ento-nav-btn" href="#/ch14">
            {lang === "ku" ? "کلیلی ناسینەوە" : lang === "ar" ? "مفتاح التعريف" : "Identification key"}
          </a>
        </div>
      </div>
      <AppFooter lang={lang} />
    </div>
  );
}
