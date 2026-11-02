import { useState, useRef, useEffect } from "react";
import { Mark } from "./marks";
import { QuizSection } from "./quiz/Quiz";

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

function useInView(ref, { threshold = 0.07, rootMargin = "0px 0px -20px 0px" } = {}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold, rootMargin });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold, rootMargin]);
  return visible;
}

/* ═══════════════════════════════════════════════
   VIDEO SECTION
═══════════════════════════════════════════════ */
function VideoSection({ lang }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <section
      ref={ref}
      id="videos"
      className={`ento-video-section ${visible ? "ento-visible" : ""}`}
      dir={lang === "en" ? "ltr" : "rtl"}
    >
      <div className="ento-video-header">
        <span className="ento-video-icon">🎬</span>
        <div>
          <h2 className="ento-video-title">
            {lang === "ku" ? "ڤیدیۆ" : lang === "ar" ? "فيديو" : "Video"}
          </h2>
          <p className="ento-video-sub">
            {lang === "ku"
              ? "بۆ زانیاری زیاتر ڤیدیۆکانی خوارەوە سەیر بکە"
              : lang === "ar"
              ? "لمزيد من المعلومات شاهد الفيديوهات أدناه"
              : "For more information watch the videos below"}
          </p>
        </div>
      </div>
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

const SECTIONS = [
  {
    id: "quiz",
    icon: "🧠",
    titles: { ku: "کویز", ar: "الاختبار", en: "Quiz" }
  },
  {
    id: "videos",
    icon: "🎥",
    titles: { ku: "ڤیدیۆ", ar: "الفيديوهات", en: "Videos" }
  }
];

export default function Chapter4({ lang }) {
  return (
    <div className="ento-chapter-page">
      <div className="ento-chapter-hero">
        <div className="ento-chapter-hero-num">{lang === "ku" ? "چاپتەری چواردەهەم" : lang === "ar" ? "الفصل الرابع عشر" : "Chapter 14"}</div>
        <span className="ento-chapter-hero-icon"><Mark name="card" /></span>
        <h1 className="ento-chapter-hero-title">
          {lang === "ku" ? "کویز" : lang === "ar" ? "اختبار" : "Quiz"}
        </h1>
        <div className="ento-chapter-hero-en">Quiz · کویز · اختبار</div>
      </div>
      <QuizSection lang={lang} />
      <VideoSection lang={lang} />
    </div>
  );
}

