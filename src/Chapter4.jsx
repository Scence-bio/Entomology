import { useState, useRef, useEffect } from "react";
import { QuizSection } from "./quiz/Quiz";
import PhotoHero from "./chapter/PhotoHero";
import SectionPills from "./chapter/SectionPills";

const VIDEOS = [
  {
    id: "QL906_79HJM",
    title: {
      ku: "ئێنتۆمۆلۆجی — ناسنامەی مێرووەکان",
      ar: "علم الحشرات — التعرف على الحشرات",
      en: "Entomology — Insect Identification",
    },
  },
  {
    id: "vpJDYwRtuNI",
    title: {
      ku: "ئێنتۆمۆلۆجی — ژیان و گەشەی مێرووەکان",
      ar: "علم الحشرات — حياة الحشرات وتطورها",
      en: "Entomology — Insect Life & Development",
    },
  },
];

const CH4_NAV = [
  { id: "quiz", ku: "کویز", ar: "الاختبار", en: "Quiz" },
  { id: "videos", ku: "ڤیدیۆ", ar: "الفيديو", en: "Videos" },
];

function useInView(ref, { threshold = 0.07, rootMargin = "0px 0px -20px 0px" } = {}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return undefined;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold, rootMargin });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold, rootMargin]);
  return visible;
}

function VideoSection({ lang }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const dir = lang === "en" ? "ltr" : "rtl";
  return (
    <section
      ref={ref}
      id="videos"
      className={`ento-ch1-block ${visible ? "ento-visible" : ""}`}
      dir={dir}
      style={{ maxWidth: 960, margin: "0 auto", padding: "clamp(8px,2vw,16px) clamp(14px,4vw,28px) clamp(36px,6vw,64px)" }}
    >
      <header className="ento-ch1-head">
        <h2 className="ento-ch1-title">
          {lang === "ku" ? "ڤیدیۆی فێرکاری" : lang === "ar" ? "فيديو تعليمي" : "Instructional videos"}
        </h2>
        <p className="ento-ch1-lead">
          {lang === "ku"
            ? "دوو ڤیدیۆی سەربەخۆ بۆ قووڵکردنەوەی ناسنامە و گەشەی مێروو؛ دوای کویز سەیریان بکە."
            : lang === "ar"
            ? "مقطعا فيديو مستقلان لتعميق التعرف على الحشرات ونموها؛ شاهدهما بعد الاختبار."
            : "Two independent videos deepen identification and insect development; watch them after the quiz."}
        </p>
      </header>
      <div className="ento-video-grid">
        {VIDEOS.map((v) => (
          <div key={v.id} className="ento-video-card">
            <div className="ento-video-embed-wrap">
              <iframe
                className="ento-video-iframe"
                src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`}
                title={v.title[lang]}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="ento-video-label">{v.title[lang]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Chapter4({ lang }) {
  return (
    <div className="ento-chapter-page ento-ch1">
      <PhotoHero
        lang={lang}
        image="/images/plates/ch4-study.jpg"
        imageAlt={{
          ku: "مێرووناس لەسەر کاشێف کار دەکات",
          ar: "عالم حشرات يعمل على درج عينات",
          en: "Entomologist studying a specimen drawer",
        }}
        num={{ ku: "چاپتەری چواردەهەم", ar: "الفصل الرابع عشر", en: "Chapter 14" }}
        icon="card"
        title={{ ku: "کویز", ar: "اختبار", en: "Quiz" }}
        subtitle={{
          ku: "تاقیکردنەوە · ڤیدیۆی فێرکاری · شەهادە",
          ar: "اختبار · فيديو تعليمي · شهادة",
          en: "Assessment · videos · certificate",
        }}
      />
      <SectionPills lang={lang} items={CH4_NAV} />
      <QuizSection lang={lang} />
      <VideoSection lang={lang} />
    </div>
  );
}
