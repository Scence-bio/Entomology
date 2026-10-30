import { useState, useRef, useEffect } from "react";
import { Mark } from "./marks";



function ChapterHeroMedia({ lang, numKu, numAr, numEn, icon, titleKu, titleAr, titleEn, sub, video, image }) {
  return (
    <div
      className="ento-chapter-hero"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "420px",
        padding: 0,
        background: "#0d2107",
      }}
    >
      {video && (
        <video
          key={video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            opacity: 1,
            display: "block",
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {!video && image && (
        <img
          src={image}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            display: "block",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "rgba(0,0,0,.42)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "420px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "clamp(36px,6vw,64px) clamp(16px,5vw,48px)",
        }}
      >
        <div className="ento-chapter-hero-num">{lang === "ku" ? numKu : lang === "ar" ? numAr : numEn}</div>
        <span className="ento-chapter-hero-icon"><Mark name={icon} /></span>
        <div className="ento-chapter-hero-title">
          {lang === "ku" ? titleKu : lang === "ar" ? titleAr : titleEn}
        </div>
        <div className="ento-chapter-hero-en">{sub}</div>
      </div>
    </div>
  );
}

const LANG_CONFIG = {
  ku: { dir: "rtl" },
  ar: { dir: "rtl" },
  en: { dir: "ltr" },
};

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

const ARTHROPODA_SECTIONS = [
  {
    id: "arth-respiratory",
    num: "٠١",
    numEn: "01",
    icon: "🫁",
    image: "/images/arthropoda/image1.png",
    titles: {
      ku: "سیستەمی هەناسەدان",
      ar: "الجهاز التنفسي",
      en: "Respiratory System",
    },
    body: {
      ku: "جومگەپێیەکان سیستەمێکی هەناسەدانی زۆر کارایان هەیە. مێرووەکان لە ڕێگەی کونی وردی سەر جەستەیان (Spiracles) و تۆڕێکی ئاڵۆز لە بۆریی هەوایی (Tracheae) ئۆکسجین ڕاستەوخۆ دەگەیەننە ناو خانەکان.",
      en: "Arthropods have a highly efficient respiratory system. Insects use tiny openings called Spiracles and a complex network of Tracheae to deliver oxygen directly to their tissues.",
      ar: "تمتلك مفصليات الأرجل جهازًا تنفسيًا فعالًا للغاية. تستخدم الحشرات فتحات صغيرة تسمى الثغور التنفسية وشبكة معقدة من القصبات الهوائية لإيصال الأكسجين مباشرة إلى الأنسجة.",
    },
    terms: ["Respiratory System", "Spiracles", "Tracheae", "Oxygen"],
  },
  {
    id: "arth-exoskeleton",
    num: "٠٢",
    numEn: "02",
    icon: "🛡️",
    image: "/images/arthropoda/image4.png",
    titles: {
      ku: "پەیەکەری دەرەکی",
      ar: "الهيكل الخارجي",
      en: "Exoskeleton",
    },
    body: {
      ku: "جەستەیان داپۆشراوە بە زریپۆشێکی ڕەق لە ماددەی کایتین (Chitin) دروست بووە، کە وەک قەڵغانێک دەیانپارێزێت. بۆ گەشەکردن، ئەم زیندەوەرانە پڕۆسەی تێڵاکردن (Molting) ئەنجام دەدەن.",
      en: "Their bodies are covered by a hard Exoskeleton made of Chitin, which acts as a protective shield. To grow, these organisms undergo a process called Molting (Ecdysis).",
      ar: "أجسامها مغطاة بـ هيكل خارجي صلب مكون من مادة الكايتين، والذي يعمل كدرع واقٍ. وللنمو، تمر هذه الكائنات بعملية تسمى الانسلاخ.",
    },
    terms: ["Exoskeleton", "Chitin", "Molting", "Ecdysis"],
  },
  {
    id: "arth-circulatory",
    num: "٠٣",
    numEn: "03",
    icon: "💧",
    image: "/images/arthropoda/image2.png",
    titles: {
      ku: "سوڕی خوێنی کراوە",
      ar: "جهاز الدوران المفتوح",
      en: "Open Circulatory System",
    },
    body: {
      ku: "ئەمان خاوەنی سوڕی خوێنی کراوەن، کە تێیدا شلەیەک بە ناوی هیمۆلیمف (Hemolymph) ئەندامە ناوخۆییەکان نوقم دەکات و ماددە خۆراکییەکان دەگوازێتەوە.",
      en: "They possess an open circulatory system, where a fluid called Hemolymph bathes the internal organs and transports nutrients.",
      ar: "تمتلك جهاز دوران مفتوحًا، حيث يقوم سائل يسمى اللمف الدموي بغمر الأعضاء الداخلية ونقل المواد الغذائية.",
    },
    terms: ["Open Circulatory System", "Hemolymph", "Internal Organs", "Nutrients"],
  },
  {
    id: "arth-compound-eyes",
    num: "٠٤",
    numEn: "04",
    icon: "👁️",
    image: "/images/arthropoda/image3.png",
    titles: {
      ku: "چاوە ئاڵۆزەکان",
      ar: "العيون المركبة",
      en: "Compound Eyes",
    },
    body: {
      ku: "زۆربەی جومگەپێیەکان خاوەنی چاوی ئاڵۆزن کە لە هەزاران یەکەی بینینی بچووک پێکدێن، ئەمەش مەودایەکی فراوانی بینینیان پێ دەبەخشێت بۆ ناسینەوەی خێراترین جووڵە.",
      en: "Most arthropods have Compound Eyes consisting of thousands of tiny visual units, providing them with a wide field of view to detect the fastest movements.",
      ar: "تمتلك معظم مفصليات الأرجل عيونًا مركبة تتكون من آلاف الوحدات البصرية الصغيرة، مما يمنحها مجال رؤية واسعًا للكشف عن أسرع الحركات.",
    },
    terms: ["Compound Eyes", "Ommatidia", "Visual Units", "Movement Detection"],
  },
  {
    id: "arth-glossary",
    num: "٠٥",
    numEn: "05",
    icon: "📖",
    titles: {
      ku: "فەرهەنگی زاراوەکان",
      ar: "قاموس المصطلحات",
      en: "Terms of Glossary",
    },
    body: { ku: "", ar: "", en: "" },
    glossary: [
      { term: "Chitin", ku: "ماددەیەکی پۆڵیسەکەریدی بەهێز و نەرمە، پێکهاتەی سەرەکیی ئێسکەپەیکەری دەرەکیی جومگەپێیەکان دروست دەکات.", en: "A tough, protective polysaccharide that forms the main component of the arthropod exoskeleton.", ar: "مادة سكرية متعددة قوية ومرنة، تشكل المكون الأساسي للهيكل الخارجي لمفصليات الأرجل." },
      { term: "Ecdysis (Molting)", ku: "پڕۆسەی فڕێدانی پەیەکەری دەرەکیی کۆن و گۆڕینی بە دانەیەکی نوێ بۆ ئەوەی زیندەوەرەکە بتوانێت گەشە بکات.", en: "The process of shedding the old exoskeleton and replacing it with a new one to allow for growth.", ar: "عملية التخلص من الهيكل الخارجي القديم واستبداله بآخر جديد للسماح للكائن الحي بالنمو." },
      { term: "Hemolymph", ku: "ئەو شلەیەیە کە لە ناو سوڕی خوێنی کراوەی جومگەپێیەکاندا دەگەڕێت و هاوتای خوێن و لیمفە لە بڕبڕەدارەکاندا.", en: "The fluid that circulates in the open circulatory system of arthropods, equivalent to blood and lymph.", ar: "السائل الذي يدور في جهاز الدوران المفتوح لمفصليات الأرجل، ويعادل الدم واللمف في الفقاريات." },
      { term: "Spiracles", ku: "کونی وردن لەسەر دیواری جەستەی مێرووەکان کە ڕێگە بە هەوا دەدەن بچێتە ناو سیستەمی بۆرییە هەواییەکان.", en: "Small openings on the body wall of insects that allow air to enter the tracheal system.", ar: "فتحات صغيرة على جدار جسم الحشرات تسمح بدخول الهواء إلى جهاز القصبات الهوائية." },
      { term: "Ommatidia", ku: "یەکە بچووکەکانی پێکهاتەی چاوی ئاڵۆز، کە هەر یەکێکیان وەک هاوێنەیەکی سەربەخۆ کار دەکات.", en: "The individual optical units that make up a compound eye.", ar: "الوحدات البصرية الفردية التي تشكل العين المركبة." },
      { term: "Jointed Appendages", ku: "ئەو قاچ و ئەنتێنا و بەشانەی کە لە جەستەی جومگەپێیەکان دەبنەوە و خاوەنی جومگەن بۆ جووڵە.", en: "Structures such as legs and antennae that extend from the body and have joints for flexibility.", ar: "الهياكل مثل الأرجل وقرون الاستشعار التي تمتد من الجسم ولها مفاصل للحركة." },
      { term: "Exoskeleton", ku: "بەرگێکی ڕەق و پارێزەر کە لە دەرەوەی جەستەی جومگەپێیەکانە و پشتگیرییان دەکات.", en: "A hard, protective outer layer that supports and protects the body of an arthropod.", ar: "طبقة خارجية صلبة واقية تدعم وتحمي جسم مفصليات الأرجل." },
    ],
  },
];

function ArthropodaCard({ section, delay = 0, lang }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <article
      ref={ref}
      id={section.id}
      className={`ento-card ${visible ? "ento-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms`, direction: lang === "en" ? "ltr" : "rtl" }}
    >
      <div className="ento-card-header">
        <div className="ento-card-icon">{section.icon}</div>
        <div>
          <div className="ento-card-num">{section.num} · {section.numEn}</div>
          <div className="ento-card-title-ku">{section.titles[lang]}</div>
          {lang !== "en" && <div className="ento-card-title-en">{section.titles.en}</div>}
        </div>
      </div>

      {section.image && (
        <div style={{ margin: "16px 0", borderRadius: 18, overflow: "hidden", border: "1.5px solid var(--border-card)", background: "var(--accent-dim)" }}>
          <img
            src={section.image}
            alt={section.titles.en}
            loading="lazy"
            style={{ width: "100%", maxHeight: 460, objectFit: "contain", display: "block" }}
          />
        </div>
      )}

      {section.body[lang] && (
        <p className={`ento-body ${lang === "en" ? "ento-ltr" : "ento-rtl"}`}>{section.body[lang]}</p>
      )}

      {section.terms && (
        <div className="ento-terms">
          {section.terms.map(t => <span key={t} className="ento-term">{t}</span>)}
        </div>
      )}

      {section.glossary && (
        <div className="ento-gloss-grid">
          {section.glossary.map(g => (
            <div key={g.term} className="ento-gloss-item">
              <span className="ento-gloss-term">{g.term}</span>
              <span className="ento-gloss-ku">{g[lang]}</span>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function AppFooter({ lang }) {
  return (
    <footer className="ento-footer">
        <div className="ento-footer-inner" dir={lang === "en" ? "ltr" : "rtl"}>
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
          <div className="ento-footer-col">
            <div className="ento-footer-col-title">
              {lang === "ku" ? "چاپتەر" : lang === "ar" ? "الفصل" : "Chapter"}
            </div>
            <div className="ento-footer-link">{lang === "ku" ? "فایلەمی جومگەپێیەکان" : lang === "ar" ? "شعبة مفصليات الأرجل" : "Phylum Arthropoda"}</div>
            <div className="ento-footer-link">Phylum Arthropoda</div>
          </div>
          <div className="ento-footer-col">
            <div className="ento-footer-col-title">
              {lang === "ku" ? "سیستەم" : lang === "ar" ? "النظام" : "System"}
            </div>
            <div className="ento-footer-link">Respiratory System</div>
            <div className="ento-footer-link">Exoskeleton</div>
            <div className="ento-footer-link">Compound Eyes</div>
          </div>
        </div>
    </footer>
  );
}

export default function Chapter3({ lang }) {
  return (
    <div className="ento-chapter-page">
      <ChapterHeroMedia
        lang={lang}
        numKu="چاپتەری سێیەم"
        numAr="الفصل الثالث"
        numEn="Chapter 3"
        icon="legs"
        titleKu="پۆلی جومگە پێیەکان Phylum Arthropods"
        titleAr="شعبة مفصليات الأرجل"
        titleEn="Phylum Arthropods"
        sub="Phylum Arthropoda · جومگەپێیەکان · مفصليات الأرجل"
        video="/videos/arthropoda.mp4"
      />
      <div className="ento-container">
        {ARTHROPODA_SECTIONS.map((s, i) => (
          <ArthropodaCard key={s.id} section={s} delay={i * 50} lang={lang} />
        ))}
      </div>
      <AppFooter lang={lang} />
    </div>
  );
}
