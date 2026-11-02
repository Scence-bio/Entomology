import { useState, useRef, useEffect, Fragment } from "react";
import { Mark } from "./marks";
import { QuizSection } from "./quiz/Quiz";



function ChapterHeroMedia({ lang, numKu, numAr, numEn, icon, titleKu, titleAr, titleEn, sub, video, image }) {
  return (
    <div
      className="ento-chapter-hero"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "420px",
        padding: 0,
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

      <div className="ento-chapter-hero-scrim" />

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
        <h1 className="ento-chapter-hero-title">
          {lang === "ku" ? titleKu : lang === "ar" ? titleAr : titleEn}
        </h1>
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
      ku: "لە Insectaـدا گازی ئۆکسجین بە شێوەی سەرەکی لە ڕێگەی سیستەمی تراکیایی دەگاتە خانەکان، نەک لە ڕێگەی خوێن وەک لە بڕبڕەدارەکان. spiracle ـەکان کونە کۆنترۆڵکراوەکانن لەسەر pleura؛ هەوا دەچێتە trachea و دواتر tracheoles کە ڕاستەوخۆ دەگەنە میتۆکۆندریا. جووڵەی سک و باڵ دەتوانێت ventilation چالاک بکات. لە لارڤای ئاوی و هەندێک گروپدا gill یان plastron دەردەکەوێت. Arachnida زۆرجار book lung یان trachea تێکەڵ بەکاردەهێنن؛ Crustacea زیاتر gillی ئاوی.",
      en: "In Insecta, O₂ reaches tissues mainly via the tracheal system, not via blood as in vertebrates. Valved spiracles on the pleura open into tracheae and fine tracheoles that terminate at mitochondria. Abdominal pumping and flight can drive active ventilation. Aquatic larvae may use gills or plastrons. Arachnids often mix book lungs and tracheae; crustaceans primarily use gills.",
      ar: "في الحشرات يصل الأكسجين عبر القصبات لا عبر الدم. الثغور التنفسية تفتح على قصبات وقصيبات تصل إلى الميتوكندريا. قد تنشط التهوية بحركة البطن. للعناكب رئات كتابية أو قصبات؛ وللقشريات خياشيم.",
    },
    terms: ["Spiracles", "Tracheae", "Tracheoles", "Ventilation", "Book lung", "Plastron"],
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
      ku: "پەیەکەری دەرەکی (exoskeleton / cuticle) لە epicuticle (مۆم و lipids بۆ کەمکردنەوەی لەدەستدانی ئاو)، exocuticle و endocuticle پێک دێت؛ ماددەی سەرەکی α-chitin (پۆڵی N-acetylglucosamine) لەگەڵ sclerotin (پڕۆتینی ڕەقکراو). سوود: پاراستن، خاڵی پەیوەندیی ماسولکە، و سنووردانان بۆ وشکبوون. سنوور: گەشە تەنها بە ecdysis — فڕێدانی cuticleی کۆن لەژێر کۆنترۆڵی ecdysone و juvenile hormone. دوای molting، cuticleی نوێ نەرمە تا sclerotization تەواو ببێت.",
      en: "The arthropod cuticle has an epicuticle (waterproofing lipids), exo- and endocuticle; α-chitin plus sclerotized proteins form the hard shell. It protects, anchors muscles and limits desiccation, but growth requires ecdysis under ecdysone and juvenile-hormone control. Soft new cuticle hardens by sclerotization after the molt.",
      ar: "الهيكل الخارجي طبقات: فوقية شمعية ثم خارجية وداخلية من الكايتين والبروتين المتصلب. يحمي ويثبت العضلات، والنمو يتم بالانسلاخ تحت سيطرة الإكديسون وهرمون الحداثة.",
    },
    terms: ["Cuticle", "Chitin", "Sclerotization", "Ecdysis", "Ecdysone", "Juvenile hormone"],
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
      ku: "سوڕی خوێن کراوەیە (open circulatory system): hemolymph لە دڵی دۆرساڵ (دڕکێکی لولەیی لەسەر پشت) بە ڕێگەی ostia دەکشێنرێت و دەپەڕێتە ناو hemocoel، کە ئەندامەکان دەور دەدات. hemolymph خۆراک، هۆرمۆن و خانەی بەرگری (hemocytes) دەگوازێتەوە؛ لە زۆربەی مێروودا O₂ـی سەرەکی ناگوازێتەوە چونکە trachea ئەو کارە دەکات (جگە لە هەندێک گروپی خاوەن hemocyanin یان hemoglobinی تایبەت). فشار نزمترە لە سوڕی داخراوی بڕبڕەداران.",
      en: "Circulation is open: a dorsal vessel pumps hemolymph through ostia into the hemocoel bathing the organs. Hemolymph carries nutrients, hormones and hemocytes; in most insects it is not the main O₂ carrier — tracheae are. Pressure is lower than in closed vertebrate systems. Some arthropods use hemocyanin or specialized hemoglobins.",
      ar: "الدوران مفتوح: وعاء ظهري يدفع اللمف الدموي إلى التجويف الحشوي. ينقل الغذاء والهرمونات والخلايا الدفاعية، بينما القصبات تنقل معظم الأكسجين في الحشرات.",
    },
    terms: ["Hemolymph", "Dorsal vessel", "Ostia", "Hemocoel", "Hemocytes", "Hemocyanin"],
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
      ku: "چاوی ئاڵۆز (compound eye) لە هەزاران ommatidium پێک دێت؛ هەر یەکێک کۆرنیا، کڕیستاڵ و rhabdomی فۆتۆریسێپتۆری خۆی هەیە. دوو جۆری سەرەکی: apposition (ڕووناکی ڕۆژ، وەک هەنگ) و superposition (کەمڕووناکی، وەک زۆر پەپوولەی شەو). سوود: مەودای بینینی فراوان و هەستیاریی بەرز بۆ جووڵە (flicker fusion). سنوور: ڕوونیی وردەکاری کەمترە لە چاوی تاکی بڕبڕەداران. زۆر مێروو ocelliی سادەشیان هەیە بۆ تێگەیشتنی ڕووناکی و ئاسۆ. لە Odonataـدا چاوەکان زۆر گەورەن و نێچیر لە هەوادا دەگرن.",
      en: "Compound eyes mosaic vision from thousands of ommatidia (cornea, cone, rhabdom). Apposition eyes suit bright light; superposition eyes suit dim light (many moths). Strengths: panoramic view and high temporal resolution; spatial acuity is coarser than vertebrate camera eyes. Simple ocelli add horizon/light sensing. Dragonflies have enormous compound eyes for aerial prey capture.",
      ar: "العين المركبة آلاف الوحدات (ommatidia). نوعا التجاور والتراكب حسب الإضاءة. مجال واسع وحساسية حركة عالية. للرعاشات عيون ضخمة لصيد الهواء.",
    },
    terms: ["Ommatidia", "Apposition eye", "Superposition eye", "Rhabdom", "Ocelli", "Flicker fusion"],
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
    body: {
      ku: "زاراوەی بنەڕەتیی پەیەکەر، هەناسە، سوڕ و بینین — بۆ خوێندنەوەی وردی مۆرفۆلۆجی و فیزیۆلۆجی.",
      ar: "مصطلحات الهيكل والتنفس والدوران والبصر.",
      en: "Core terms for cuticle, gas exchange, circulation and vision.",
    },
      glossary: [
      { term: "Chitin", ku: "α-chitin: پۆڵیسەکەریدی N-acetylglucosamine؛ ستوونی cuticle لەگەڵ sclerotin.", en: "α-chitin (N-acetylglucosamine polymer) plus sclerotin proteins build the cuticle.", ar: "كايتين α مع بروتينات متصلبة يشكّل الكيوتيكل." },
      { term: "Ecdysis (Molting)", ku: "فڕێدانی cuticleی کۆن لەژێر ecdysone؛ JH ڕێگە بە metamorphic molt دەدات کاتێک دادەبەزێت.", en: "Shedding the old cuticle under ecdysone; falling JH permits metamorphic molts.", ar: "انسلاخ تحت الإكديسون؛ انخفاض هرمون الحداثة يسمح بتحول المنسلخ." },
      { term: "Hemolymph", ku: "شلەی hemocoel: خۆراک، هۆرمۆن، hemocytes؛ O₂ زۆرجار لە ڕێگەی trachea نەک hemolymph.", en: "Hemocoel fluid carrying nutrients, hormones and hemocytes; O₂ usually via tracheae.", ar: "سائل الجوف الحشوي؛ الأكسجين غالباً عبر القصبات لا اللمف." },
      { term: "Spiracles", ku: "کونە valvular لەسەر pleura → trachea → tracheoles بۆ میتۆکۆندریا.", en: "Valved pleural openings into tracheae and tracheoles at the mitochondria.", ar: "ثغور صدرية/بطنية تقود إلى القصبات والقصيبات." },
      { term: "Ommatidia", ku: "یەکەی بیناییی compound eye؛ apposition یان superposition optics.", en: "Optical units of the compound eye (apposition or superposition).", ar: "وحدات العين المركبة — تقابل أو تراكب." },
      { term: "Jointed Appendages", ku: "لقی segmented (قاچ، ئەنتێنا، palps) — ناوی Arthropoda «قاچی جومگەدار».", en: "Segmented limbs (legs, antennae, palps) — the defining arthropod trait.", ar: "زوائد مفصلية: أرجل وقرون وملامس." },
      { term: "Exoskeleton", ku: "cuticleی دەرەکی: پاراستن، lever بۆ ماسولکە، و سنووری وشکبوون؛ گەشە تەنها بە molt.", en: "External cuticle: armour, muscle levers and waterproofing; growth only via molt.", ar: "هيكل خارجي واقي؛ النمو بالانسلاخ فقط." },
    ],
  },
];

function ClassExplorer({ lang }) {
  const groups = [
    {
      id: "insecta", name: "Insecta",
      title: { ku: "مێرووەکان", ar: "الحشرات", en: "Insects" },
      rows: {
        ku: [["قاچ", "٦ (hexapod، uniramous)"], ["ئەنتێنا", "١ جووت"], ["جەستە", "٣ tagmata: cephalon / thorax / abdomen"], ["نموونە", "Formicidae، Papilio، Musca"]],
        ar: [["الأرجل", "٦ (hexapod)"], ["قرون الاستشعار", "زوج واحد"], ["الجسم", "٣ tagmata"], ["أمثلة", "Formicidae، Papilio، Musca"]],
        en: [["Legs", "6 (hexapod, uniramous)"], ["Antennae", "1 pair"], ["Body", "3 tagmata: head / thorax / abdomen"], ["Examples", "Formicidae, Papilio, Musca"]],
      },
    },
    {
      id: "arachnida", name: "Arachnida",
      title: { ku: "جاڵجاڵۆکەییەکان", ar: "العنكبيات", en: "Arachnids" },
      rows: {
        ku: [["قاچ", "٨ (٤ جووت)"], ["ئەنتێنا", "نییە؛ pedipalps + chelicerae"], ["جەستە", "prosoma + opisthosoma"], ["نموونە", "Araneae، Scorpiones"]],
        ar: [["الأرجل", "٨"], ["قرون الاستشعار", "لا؛ ملامس وكلاّبات"], ["الجسم", "prosoma وopisthosoma"], ["أمثلة", "Araneae، Scorpiones"]],
        en: [["Legs", "8 (4 pairs)"], ["Antennae", "none; pedipalps + chelicerae"], ["Body", "prosoma + opisthosoma"], ["Examples", "Araneae, Scorpiones"]],
      },
    },
    {
      id: "crustacea", name: "Crustacea",
      title: { ku: "قڕژاڵییەکان", ar: "القشريات", en: "Crustaceans" },
      rows: {
        ku: [["قاچ", "زۆرجار biramous، چەند جووت"], ["ئەنتێنا", "٢ جووت (antennules + antennae)"], ["جەستە", "زۆرجار cephalothorax + abdomen"], ["نموونە", "Decapoda، Isopoda"]],
        ar: [["الأرجل", "غالباً biramous"], ["قرون الاستشعار", "زوجان"], ["الجسم", "رأسصدري وبطن"], ["أمثلة", "Decapoda، Isopoda"]],
        en: [["Legs", "often biramous, several pairs"], ["Antennae", "2 pairs"], ["Body", "often cephalothorax + abdomen"], ["Examples", "Decapoda, Isopoda"]],
      },
    },
    {
      id: "myriapoda", name: "Myriapoda",
      title: { ku: "هەزارپێ و سەپێ", ar: "ذوات الألف رجل", en: "Myriapods" },
      rows: {
        ku: [["قاچ", "زۆر / سێگمێنت (Diplopoda ٢ جووت؛ Chilopoda ١)"], ["ئەنتێنا", "١ جووت"], ["جەستە", "سەر + trunkی فرەسێگمێنت"], ["نموونە", "Diplopoda، Chilopoda"]],
        ar: [["الأرجل", "كثيرة (زوجان/قطعة في الدبلوبودا)"], ["قرون الاستشعار", "زوج واحد"], ["الجسم", "رأس وجذع متعدد القطع"], ["أمثلة", "Diplopoda، Chilopoda"]],
        en: [["Legs", "many (2 pairs/segment in Diplopoda; 1 in Chilopoda)"], ["Antennae", "1 pair"], ["Body", "head + multi-segment trunk"], ["Examples", "Diplopoda, Chilopoda"]],
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
          ? "چوار کلادی سەرەکیی Arthropoda (لێرە وەک پۆلی فێرکاری): Insecta، Arachnida، Crustacea، Myriapoda. گروپێک هەڵبژێرە — جیاوازییەکان لەسەر appendages و tagmosis وەستاون."
          : lang === "ar"
          ? "أربع مجموعات تعليمية من مفصليات الأرجل. الفرق في الزوائد وتقسيم الجسم."
          : "Four teaching-grade arthropod groups. Contrasts rest on appendages and tagmosis."}
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
        ku: "cephalon: compound eyes (ommatidia)، ocelli، ١ جووت antenna، و mouthparts (labrum، mandibles، maxillae، labium) — gnathal / sensory tagma.",
        ar: "الرأس: عيون مركبة وocelli وزوج قرون وأجزاء فم (labrum وmandibles وmaxillae وlabium).",
        en: "Cephalon: compound eyes, ocelli, one antennal pair, and mouthparts — the sensory/gnathal tagma.",
      },
    },
    {
      id: "thorax",
      title: { ku: "سنگ", ar: "الصدر", en: "Thorax" },
      body: {
        ku: "thorax = pro + meso + meta؛ ٣ جووت قاچی locomotor؛ باڵ لەسەر meso- و metathorax (Pterygota). tagmaی جووڵە و فڕین.",
        ar: "الصدر: صدر أمامي وأوسط وخلفي؛ ثلاث أزواج أرجل؛ الأجنحة على الأوسط والخلفي في ذوات الأجنحة.",
        en: "Thorax = pro-, meso-, metathorax; three locomotor leg pairs; wings on meso- and metathorax in Pterygota.",
      },
    },
    {
      id: "abdomen",
      title: { ku: "سک", ar: "البطن", en: "Abdomen" },
      body: {
        ku: "abdomen: spiracles، midgut/hindgut، Malpighian tubules، gonads و genitalia / ovipositor یان sting (لە Aculeata). tagmaی visceral.",
        ar: "البطن: ثغور وقناة هضم وأنابيب ملبيغي ومناسل وأعضاء تكاثر أو إبرة لسع.",
        en: "Abdomen: spiracles, gut, Malpighian tubules, gonads and genitalia/ovipositor or sting (Aculeata).",
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
        <div className="ento-map-wrap" style={{ margin: "16px 0" }}>
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
        image="/images/plates/ch3-dragonfly.jpg"
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
      <QuizSection lang={lang} chapter="ch3" />
    </div>
  );
}
