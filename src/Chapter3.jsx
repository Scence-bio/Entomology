import { useState, useRef, useEffect, Fragment } from "react";
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
    image: "/images/arthropoda/image1.webp",
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
    image: "/images/arthropoda/image4.webp",
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
    image: "/images/arthropoda/image2.webp",
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
    image: "/images/arthropoda/image3.webp",
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
    num: "٠٧",
    numEn: "07",
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

function ClassExplorer({ lang }) {
  const groups = [
    {
      id: "insecta", name: "Insecta",
      title: { ku: "مێرووەکان", ar: "الحشرات", en: "Insects" },
      rows: {
        ku: [["قاچ", "٦"], ["ئەنتێنا", "١ جووت"], ["جەستە", "٣ بەش: سەر، سنگ، سک"], ["نموونە", "مێروولە، پەپوولە، مێش"]],
        ar: [["الأرجل", "٦"], ["قرون الاستشعار", "زوج واحد"], ["الجسم", "٣ أقسام: رأس وصدر وبطن"], ["أمثلة", "نمل، فراشات، ذباب"]],
        en: [["Legs", "6"], ["Antennae", "1 pair"], ["Body", "3 regions: head, thorax, abdomen"], ["Examples", "ants, butterflies, flies"]],
      },
    },
    {
      id: "arachnida", name: "Arachnida",
      title: { ku: "جاڵجاڵۆکەییەکان", ar: "العنكبيات", en: "Arachnids" },
      rows: {
        ku: [["قاچ", "٨"], ["ئەنتێنا", "نییە"], ["جەستە", "٢ بەش"], ["نموونە", "جاڵجاڵۆکە، دووپشک"]],
        ar: [["الأرجل", "٨"], ["قرون الاستشعار", "لا توجد"], ["الجسم", "قسمان"], ["أمثلة", "عناكب، عقارب"]],
        en: [["Legs", "8"], ["Antennae", "none"], ["Body", "2 regions"], ["Examples", "spiders, scorpions"]],
      },
    },
    {
      id: "crustacea", name: "Crustacea",
      title: { ku: "قڕژاڵییەکان", ar: "القشريات", en: "Crustaceans" },
      rows: {
        ku: [["قاچ", "زۆرجار چەند جووت"], ["ئەنتێنا", "٢ جووت"], ["جەستە", "سەرسنگ و سک"], ["نموونە", "قڕژاڵ، میگۆ"]],
        ar: [["الأرجل", "غالباً عدة أزواج"], ["قرون الاستشعار", "زوجان"], ["الجسم", "رأسصدري وبطن"], ["أمثلة", "سرطانات، روبيان"]],
        en: [["Legs", "often several pairs"], ["Antennae", "2 pairs"], ["Body", "cephalothorax and abdomen"], ["Examples", "crabs, shrimp"]],
      },
    },
    {
      id: "myriapoda", name: "Myriapoda",
      title: { ku: "هەزارپێ و سەپێ", ar: "ذوات الألف رجل", en: "Myriapods" },
      rows: {
        ku: [["قاچ", "زۆر، بەپێی بەشەکان"], ["ئەنتێنا", "١ جووت"], ["جەستە", "سەر و تەنێکی درێژ"], ["نموونە", "هەزارپێ و سەپێ"]],
        ar: [["الأرجل", "كثيرة، حسب القطع"], ["قرون الاستشعار", "زوج واحد"], ["الجسم", "رأس وجذع طويل"], ["أمثلة", "ألفية الأرجل ومئوية الأرجل"]],
        en: [["Legs", "many, one or two pairs per segment"], ["Antennae", "1 pair"], ["Body", "head and a long trunk"], ["Examples", "millipedes and centipedes"]],
      },
    },
  ];
  const [id, setId] = useState(groups[0].id);
  const group = groups.find(g => g.id === id);
  const rows = group.rows[lang] || group.rows.en;
  return (
    <article className="ento-card ento-visible" id="arth-classes" style={{ direction: lang === "en" ? "ltr" : "rtl" }}>
      <div className="ento-card-header">
        <div>
          <div className="ento-card-num">٠٥ · 05</div>
          <div className="ento-card-title-ku">{lang === "ku" ? "پۆلەکان" : lang === "ar" ? "المجموعات" : "The groups"}</div>
          {lang !== "en" && <div className="ento-card-title-en">Interactive classification</div>}
        </div>
      </div>
      <p className="ento-body">
        {lang === "ku"
          ? "چوار گروپی سەرەکی جومگەپێیەکان. گروپێک هەڵبژێرە تا قاچ و ئەنتێنا و جەستەکەی ببینیت."
          : lang === "ar"
          ? "أربع مجموعات رئيسية من مفصليات الأرجل. اختر مجموعة لترى أرجلها وقرون استشعارها وجسمها."
          : "Four main arthropod groups. Choose one to see its legs, antennae, and body."}
      </p>
      <div className="ento-pick-row">
        {groups.map(g => (
          <button key={g.id} type="button" className={`ento-pick ${g.id === id ? "active" : ""}`} onClick={() => setId(g.id)}>
            <span className="ento-binomial">{g.name}</span>
            <span>{g.title[lang]}</span>
          </button>
        ))}
      </div>
      <ul className="ento-fact-list">
        {rows.map(([k, v]) => (
          <li key={k}><span>{k}</span><strong>{v}</strong></li>
        ))}
      </ul>
    </article>
  );
}

function BodyPlate({ lang }) {
  const parts = [
    {
      id: "head",
      title: { ku: "سەر", ar: "الرأس", en: "Head" },
      body: {
        ku: "چاوی ئاڵۆز (Ommatidia)، ئەنتێنا، و پارچەکانی دەم لێرەن.",
        ar: "هنا العين المركبة (Ommatidia) وقرون الاستشعار وأجزاء الفم.",
        en: "Compound eyes (ommatidia), antennae, and mouthparts sit here.",
      },
    },
    {
      id: "thorax",
      title: { ku: "سنگ", ar: "الصدر", en: "Thorax" },
      body: {
        ku: "سێ جووت قاچ و، لە زۆربەی مێرووەکاندا، باڵەکان لە سنگەوە دەردەچن.",
        ar: "تخرج من الصدر ثلاثة أزواج من الأرجل، وعند معظم الحشرات الأجنحة أيضاً.",
        en: "Three pairs of legs, and in most insects the wings, attach to the thorax.",
      },
    },
    {
      id: "abdomen",
      title: { ku: "سک", ar: "البطن", en: "Abdomen" },
      body: {
        ku: "کونەکانی هەناسە (Spiracles) لەسەر سک دان. هەرس و زاووزێش لێرەن.",
        ar: "الثغور التنفسية على البطن. الهضم والتكاثر هنا.",
        en: "Spiracles open on the abdomen. Digestion and reproduction are here.",
      },
    },
  ];
  const [id, setId] = useState("head");
  const part = parts.find(p => p.id === id);
  return (
    <article className="ento-card ento-visible" id="arth-body" style={{ direction: lang === "en" ? "ltr" : "rtl" }}>
      <div className="ento-card-header">
        <div>
          <div className="ento-card-num">٠٦ · 06</div>
          <div className="ento-card-title-ku">{lang === "ku" ? "نەخشەی جەستە" : lang === "ar" ? "مخطط الجسم" : "Body plate"}</div>
          {lang !== "en" && <div className="ento-card-title-en">Head, thorax, abdomen</div>}
        </div>
      </div>
      <p className="ento-body">
        {lang === "ku"
          ? "بەشێکی جەستە هەڵبژێرە. ئەم نەخشەیە هەر ئەو سێ بەشەیە کە پێی دەوترێت Tagmatization."
          : lang === "ar"
          ? "اختر جزءاً. هذه الأقسام الثلاثة هي ما يُسمى تقسيم الجسم."
          : "Choose a region. These three parts are what tagmatization means."}
      </p>
      <div className="ento-bodyplate" dir="ltr">
        {parts.map(p => (
          <button key={p.id} type="button" className={`ento-plate-part ${p.id === id ? "active" : ""}`} onClick={() => setId(p.id)}>
            {p.title.en}
          </button>
        ))}
      </div>
      <p className="ento-body" style={{ marginBottom: 0 }}><strong>{part.title[lang]}. </strong>{part.body[lang]}</p>
    </article>
  );
}

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
          <Fragment key={s.id}>
            {s.id === "arth-glossary" && (
              <>
                <ClassExplorer lang={lang} />
                <BodyPlate lang={lang} />
              </>
            )}
            <ArthropodaCard section={s} delay={i * 50} lang={lang} />
          </Fragment>
        ))}
      </div>
      <AppFooter lang={lang} />
    </div>
  );
}
