import { useState, useRef, useEffect } from "react";
import { Mark } from "./marks";
import { AppFooter } from "./Footer";
import { QuizSection } from "./quiz/Quiz";

const SCIENTIST_IMGS = {};

const SECTIONS = [
  {
    id: "def",
    num: "٠١",
    numEn: "01",
    icon: "",
    titles: {
      ku: "پێناسەی وردی ئێنتۆمۆلۆجی",
      ar: "التعريف الأكاديمي لعلم الحشرات",
      en: "Advanced Definition",
    },
    body: {
      ku: "ئێنتۆمۆلۆجی زانستی مێرووەکانە: پێکهاتەی جەستەیان، ژینگەیان، ڕەفتاریان، پۆلێنکردنیان، و سوود و زیانەکەیان. وشەکە لە یۆنانیی کۆنەوە هاتووە: entomon واتە مێروو، و logia واتە زانست. Phylogeny و Taxonomy بەشێکن لەم زانستە. مێروو بە جەستەیەکی سێ بەش (سەر، سنگ، سک)، شەش قاچ و یەک جووت ئەنتێنا لە زۆربەی جومگەپێیەکانی تر جیا دەکرێتەوە.",
      ar: "علم الحشرات هو دراسة الحشرات: تركيب أجسامها وبيئتها وسلوكها وتصنيفها وما تنفع به وما تضر. الكلمة من اليونانية القديمة: entomon (حشرة) وlogia (علم). علم التطور والتصنيف جزء من هذا العلم، لا كله. تُعرف الحشرات بجسم من ثلاثة أقسام (رأس وصدر وبطن) وست أرجل وزوج واحد من قرون الاستشعار.",
      en: "Entomology is the science of insects: their body plan, ecology, behaviour, classification, and the ways they help or harm. The word comes from Ancient Greek — entomon (insect) and logia (study). Phylogeny and taxonomy are part of that science. Insects are told apart from most other arthropods by three body regions (head, thorax, abdomen), six legs, and one pair of antennae.",
    },
    terms: ["Entomology","Morphology","Ecology","Taxonomy","Tagmatization"],
  },
  {
    id: "history",
    num: "٠٢",
    numEn: "02",
    icon: "",
    titles: {
      ku: "مێژووی قووڵی زانستەکە",
      ar: "التاريخ العلمي العميق",
      en: "In-depth Scientific History",
    },
    body: {
      ku: "ئەرستۆ لە سەدەی چوارەمی پێش زایین مێرووی وەک گروپێکی جیا وەسف کرد. ئەمە یەکەمین هەوڵی جددی بوو لە سەردەمی کۆندا بۆ پۆلێنکردنیان. لە ساڵی ١٧٥٨دا Carl Linnaeus ناوی دووانەی زانستی داڕشت، و تا ئێستاش ناوی جۆرەکان بەو شێوەیە دەنووسرێت. لە سەدەی حەڤدەدا Jan Swammerdam بە توێکاریی ورد سەلماندی کە مێروو کۆئەندامێکی ناوەکی ئاڵۆزی هەیە. لە سەدەی نۆزدەدا تیۆرییەکانی Charles Darwin ڕێگەیان خستە بەردەم تێگەیشتن لە پەرەسەندنی هاوبەش لە نێوان مێروو و ڕووەکی گوڵدار.",
      ar: "وصف أرسطو في القرن الرابع قبل الميلاد الحشرات كمجموعة مستقلة، وهو أول جهد قديم جاد لتصنيفها. وفي ١٧٥٨ وضع كارل لينيوس نظام التسمية الثنائية الذي ما زلنا نسمي به الأنواع. وفي القرن السابع عشر أثبت يان سوامردام بالتشريح المجهري أن للحشرات أجهزة داخلية معقدة. وفي القرن التاسع عشر فتحت نظريات داروين باب فهم التطور المشترك بين الحشرات والنباتات المزهرة.",
      en: "In the fourth century BCE Aristotle described insects as a group of their own — the first serious ancient attempt to classify them. In 1758 Carl Linnaeus set down binomial nomenclature, the two-part name still used for species. In the seventeenth century Jan Swammerdam used micro-dissection to show that insects have complex internal organs. In the nineteenth century Darwin’s work opened the way to understanding co-evolution between insects and flowering plants.",
    },
    timeline: [
      { year: "سەدەی ٤ پ.ز", event: "Aristotle — مێرووەکان وەک گروپێکی جیا" },
      { year: "١٧٥٨", event: "Carl Linnaeus — Binomial Nomenclature" },
      { year: "سەدەی ١٧", event: "Jan Swammerdam — Micro-dissection" },
      { year: "١٨٢٣", event: "William Kirby — باوکی ئێنتۆمۆلۆجی" },
      { year: "سەدەی ١٩", event: "Charles Darwin — Co-evolution" },
    ],
  },
  {
    id: "scientists",
    num: "٠٣",
    numEn: "03",
    icon: "",
    titles: {
      ku: "زانا کاریگەرەکان",
      ar: "العلماء المؤثرون",
      en: "Influential Scientists",
    },
    body: {
      ku: "ئەم زانایانە کاریگەرییەکی گەورەیان لە گەشەی ئێنتۆمۆلۆجیدا هەبووە.",
      ar: "أسهم هؤلاء الرواد في وضع أسس علم الحشرات الحديث.",
      en: "These pioneers shaped the foundations of modern entomology.",
    },
    scientists: [
      { initials:"AR", name:"Aristotle",       roleKu:"یەکەم وەسفی جیدی مێرووەکان",     roleAr:"أول وصف جاد للحشرات",           roleEn:"First serious account of insects" },
      { initials:"CL", name:"Carl Linnaeus",   roleKu:"داهێنەری Binomial Nomenclature", roleAr:"مؤسس نظام التسمية الثنائية", roleEn:"Father of Taxonomy" },
      { initials:"WK", name:"William Kirby",   roleKu:"باوکی ئێنتۆمۆلۆجی",             roleAr:"أب علم الحشرات",              roleEn:"Father of Entomology" },
      { initials:"JS", name:"Jan Swammerdam",  roleKu:"پیشەوای Micro-dissection",        roleAr:"رائد التشريح المجهري",         roleEn:"Pioneer of Micro-dissection" },
      { initials:"CD", name:"Charles Darwin",  roleKu:"تیۆری Co-evolution",              roleAr:"نظرية التطور المشترك",        roleEn:"Co-evolution Theory" },
    ],
  },
  {
    id: "kurdistan",
    num: "٠٤",
    numEn: "04",
    icon: "",
    titles: {
      ku: "ئێنتۆمۆلۆجی لە کوردستان",
      ar: "علم الحشرات في كردستان",
      en: "Regional Entomology in Kurdistan",
    },
    mapImg: "/images/headers/chapter2-map.webp",
    body: {
      ku: "کوردستان بە ناوچەیەکی دەوڵەمەند دادەنرێت لە جۆراوجۆریی زیندەوەردا. توێژینەوە ئەکادیمییەکان جەخت لە پاراستنی جۆرە ناوخۆییەکان و کۆنترۆڵکردنی مێرووی زیانبەخش دەکەنەوە، بە ڕێگەی کۆنترۆڵی تێکەڵ.",
      ar: "تُعتبر كردستان منطقة ذات تنوع بيولوجي ساخن (Hotspot). تركز الأبحاث الأكاديمية على حماية الأنواع المتوطنة (Endemic Species) ومكافحة الآفات الزراعية باستخدام تقنيات الإدارة المتكاملة للآفات (IPM).",
      en: "Kurdistan is recognized as a Biodiversity Hotspot. Academic research focuses on the preservation of Endemic Species and controlling agricultural pests using Integrated Pest Management (IPM) techniques.",
    },
    stats: [
      { icon:"", label:"Biodiversity Hotspot" },
      { icon:"", label:"Endemic Species" },
      { icon:"", label:"IPM Research" },
    ],
  },
  {
    id: "importance",
    num: "٠٥",
    numEn: "05",
    icon: "",
    titles: {
      ku: "سوودە ستراتیژییەکان",
      ar: "الأهمية الاستراتيجية",
      en: "Strategic Importance",
    },
    body: {
      ku: "مێروو وەک پێوەر بۆ هەڵسەنگاندنی پاکیی ژینگە بەکاردێت. لە ئێنتۆمۆلۆجیی دادوەریدا، سوڕی ژیانی مێروو بەکاردێت بۆ دیاریکردنی کاتی مردن.",
      ar: "تعمل الحشرات كمؤشرات حيوية (Bio-indicators) لتقييم صحة البيئة. وفي علم الحشرات الجنائي، تُستخدم دورات حياة الحشرات لتقدير الفترة الزمنية ما بعد الوفاة (PMI).",
      en: "Insects serve as vital Bio-indicators for assessing environmental health. In Forensic Entomology, insect life cycles are used to estimate the Post-Mortem Interval (PMI) in criminal investigations.",
    },
    apps: {
      ku: [
        "Bio-indicators — پێوەری ژینگەیی",
        "Forensic Entomology — PMI دیاریکردن",
        "Pollination — پەیتاندنی ڕووەکان",
        "IPM — کۆنترۆڵی مێرووە زیانبەخشەکان",
      ],
      ar: [
        "Bio-indicators — المؤشرات الحيوية البيئية",
        "Forensic Entomology — تحديد وقت الوفاة PMI",
        "Pollination — تلقيح النباتات",
        "IPM — مكافحة الآفات المتكاملة",
      ],
      en: [
        "Bio-indicators — Environmental Assessment",
        "Forensic Entomology — PMI Estimation",
        "Pollination — Plant Fertilization",
        "IPM — Integrated Pest Management",
      ],
    },
  },
  {
    id: "challenges",
    num: "٠٦",
    numEn: "06",
    titles: {
      ku: "ئاڵۆزییە ئابووری و تەندروستییەکان",
      ar: "التحديات الاقتصادية والطبية",
      en: "Economic & Medical Challenges",
    },
    body: {
      ku: "مەترسییەکان ئەمانەن: نەخۆشییەک کە مێروو دەیگوازێتەوە، وەک مەلاریا و زیکا، و جۆری نامۆ کە هاوسەنگیی سروشت تێک دەدات و ئاسایشی خۆراک دەخاتە مەترسییەوە.",
      ar: "تشمل التحديات الرئيسية الأمراض المنقولة بالنواقل مثل الملاريا، بالإضافة إلى تأثير الأنواع الغازية (Invasive Species) التي تخل بالتوازن البيئي وتهدد الأمن الغذائي.",
      en: "Major challenges include Vector-borne Diseases like Malaria and Zika, alongside the impact of Invasive Species that disrupt local ecosystems and threaten food security.",
    },
    threats: [
      { icon:"", nameKu:"Vector-borne Diseases", nameAr:"الأمراض المنقولة بالنواقل", nameEn:"Vector-borne Diseases", eg:"Malaria, Zika, Dengue" },
      { icon:"", nameKu:"Invasive Species",       nameAr:"الأنواع الغازية",           nameEn:"Invasive Species",       eg:"Ecosystem disruption" },
      { icon:"", nameKu:"Food Security",           nameAr:"الأمن الغذائي",             nameEn:"Food Security",           eg:"Agricultural pests" },
    ],
  },
  {
    id: "glossary",
    num: "٠٧",
    numEn: "07",
    icon: "",
    titles: {
      ku: "فەرهەنگی زاراوەکان",
      ar: "المسرد العلمي",
      en: "Scientific Glossary",
    },
    body: {
      ku: "زاراوەی پێکهاتەی جەستە، وەک کایتین و هیمۆلیمف و پەیەکەری دەرەکی، لە چاپتەری سێیەمدا ڕوون کراونەتەوە. لێرە زاراوەی خودی زانستەکە ڕوون دەکرێتەوە.",
      ar: "مصطلحات تركيب الجسم — مثل الكايتين واللمف الدموي والهيكل الخارجي — مشروحة في الفصل الثالث. هنا مصطلحات العلم نفسه.",
      en: "Body-plan terms — Chitin, Hemolymph, Exoskeleton — are explained in Chapter 3. These entries name the science itself.",
    },
    glossary: [
      { term:"Metamorphosis",       ku:"گۆڕانەپەڕە — گۆڕانی قۆناغەکان",           ar:"التحول — تغيير المراحل",            en:"Metamorphosis — transformation through stages" },
      { term:"Phylogeny",           ku:"ڕەچەڵەکناسی — مێژووی پەرەسەندن",          ar:"علم التطور — تاريخ النشوء",         en:"Phylogeny — evolutionary history" },
      { term:"Pollination",         ku:"پەیتاندن — گواستنەوەی هەڵاڵە",            ar:"التلقيح — نقل حبوب اللقاح",        en:"Pollination — transfer of pollen" },
      { term:"Forensic Entomology", ku:"ئێنتۆمۆلۆجی دادوەری — خەمڵاندنی کاتی مردن", ar:"علم الحشرات الجنائي — تقدير وقت الوفاة", en:"Forensic Entomology — estimating time of death" },
      { term:"Biological control",  ku:"کۆنترۆڵی بایۆلۆجی — بەکارهێنانی مێرووی سوودبەخش دژی مێرووی زیانبەخش", ar:"المكافحة الحيوية — استخدام حشرة نافعة ضد حشرة ضارة", en:"Biological control — using a helpful insect against a pest" },
      { term:"Eusociality",         ku: "کۆمەڵگەی ڕێکخراو — دایک، کارگەر و نێر", ar:"الحياة الاجتماعية — ملكة وعمال وذكور", en:"Eusociality — a colony of queen, workers, and males" },
    ],
  },
  {
    id: "biocontrol",
    num: "٠٨",
    numEn: "08",
    icon: "",
    titles: {
      ku: "کۆنترۆڵی بایۆلۆجی",
      ar: "المكافحة الحيوية",
      en: "Biological Control",
    },
    body: {
      ku: "کۆنترۆڵی بایۆلۆجی ئەوەیە زیندەوەرێکی سوودبەخش بەکاربهێنرێت بۆ کەمکردنەوەی مێرووی زیانبەخش، نەک تەنها پێستیساید بڕژێنرێت. نمونەیەکی ڕوون خاڵخاڵۆکەیە، کە شەتەک دەخوات؛ کۆڵۆکی تۆڕباڵە، کە هەر شەتەک دەخوات؛ و مێرووی پارازیتۆیدە، کە هێلکە لە ناو کۆڵۆکی زیانبەخشدا دادەنێت. لە کشتوکاڵدا ئەم ڕێگەیە بەشێکە لە کۆنترۆڵی تێکەڵ.",
      ar: "المكافحة الحيوية هي استخدام كائن نافع لتقليل آفة، بدل الاعتماد على المبيد وحده. مثال واضح: الدعسوقة (Coccinellidae) التي تأكل المن، ويرقة أسد المن (Chrysopidae) التي تأكل المن أيضاً، والزنبار الطفيلي الذي يضع بيضه داخل يرقة الآفة. في الزراعة هذا جزء من المكافحة المتكاملة (IPM).",
      en: "Biological control uses a living helper to reduce a pest, instead of relying on pesticide alone. A clear case is the ladybird (Coccinellidae), which eats aphids; the lacewing larva (Chrysopidae), which also eats aphids; and the parasitoid wasp, which lays its egg inside a pest larva. On a farm this is one part of integrated pest management (IPM).",
    },
    terms: ["Biological control","Coccinellidae","Chrysopidae","Parasitoid","IPM"],
  },
  {
    id: "ants",
    num: "٠٩",
    numEn: "09",
    icon: "",
    titles: {
      ku: "مێروولە — Formicidae",
      ar: "النمل — Formicidae",
      en: "Ants — Formicidae",
    },
    body: {
      ku: "مێروولە نمونەیەکی ڕوونی مێرووی کۆمەڵایەتییە. سەر بە خێزانی Formicidae و ئۆردەری Hymenoptera ـە، و زیاتر لە ٢٠٠٠٠ جۆری هەیە. کۆمەڵگەکەی لە دایک، کارگەر و نێر پێک دێت. ڕۆڵی بریتییە لە ئاواکردنی خاک، بڵاوکردنەوەی تۆو و کەمکردنەوەی مێرووی تر. مێروولە گەڵابڕەکان قارچک دەچێنن، بەڵام ئەو گروپە هی ئەمریکای گەرمە و لە کوردستان نییە.",
      ar: "النمل مثال واضح على حشرة اجتماعية. ينتمي إلى فصيلة Formicidae ورتبة Hymenoptera، ويضم أكثر من ٢٠٠٠٠ نوع. تتكون المستعمرة من ملكة وعمال وذكور. دوره تهوية التربة ونشر البذور وكبح حشرات أخرى. نمل قاطع الأوراق يزرع الفطر، وهو مجموعة أمريكية مدارية وليس من نمل كردستان.",
      en: "Ants are a clear example of a social insect. They belong to the family Formicidae, in the order Hymenoptera, with over 20,000 species. The colony — eusociality — is made of a queen, workers, and males. They aerate soil, move seeds, and hold other insects in check. Leafcutter ants farm fungus, but that group is tropical American, not a Kurdistan ant.",
    },

    terms: ["Formicidae","Eusociality","Pheromones","Myrmecology","Superorganism"],
  },
  {
    id: "conservation",
    num: "١٠",
    numEn: "10",
    icon: "",
    titles: {
      ku: "پارێزگاری لە مێرووەکان",
      ar: "الحفاظ على الحشرات",
      en: "Insect Conservation",
    },
    body: {
      ku: "لە سەرانسەری جیهاندا نزیکەی ٤٠٪ی جۆرەکانی مێروو لەژێر مەترسیدان. هۆکارەکان ئەمانەن: وێرانبوونی ژینگەی سروشتی، بەکارهێنانی پێستیساید، گەرمبوونی زەوی و بڵاوبوونەوەی جۆری نامۆ. پاراستنی مێروو گرنگە، چونکە پەیتاندن، ئاسایشی خۆراک و گەڕانەوەی خۆراک بۆ ناو خاک لەسەر ئەوان وەستاوە.",
      ar: "يواجه نحو ٤٠٪ من أنواع الحشرات حول العالم خطر الانقراض. الأسباب: تدمير الموائل الطبيعية، استخدام المبيدات، التغير المناخي، والأنواع الغازية. الحفاظ على الحشرات أمر حيوي لأنها ركيزة النظم البيئية: التلقيح، الأمن الغذائي، وتدوير المواد العضوية.",
      en: "Nearly 40% of insect species worldwide face extinction risk. Causes include habitat destruction, pesticide use, climate change, and Invasive Species. Conservation is critical as insects underpin ecosystems: pollination, food security, and nutrient cycling.",
    },
    apps: {
      ku: [
        "🌿 پاراستنی ژینگەی سروشتی و جەنگەکان",
        "🚫 کەمکردنەوەی بەکارهێنانی پێستیسایدەکان",
        "🌡️ بەرەنگاربوونەوەی گەرمبوونی زەوی",
        "🔬 توێژینەوەی زانستی بۆ پاراستنی جۆرەکان",
        "📚 هۆشیارکردنەوەی کۆمەڵگە",
      ],
      ar: [
        "🌿 حماية الموائل الطبيعية والغابات",
        "🚫 تقليل استخدام المبيدات الحشرية",
        "🌡️ مواجهة تغير المناخ",
        "🔬 البحث العلمي لحماية الأنواع",
        "📚 التوعية المجتمعية",
      ],
      en: [
        "🌿 Natural habitat and forest preservation",
        "🚫 Reduction of pesticide use",
        "🌡️ Climate change mitigation",
        "🔬 Scientific research for species protection",
        "📚 Community awareness and education",
      ],
    },
  },
];

const LANG_CONFIG = {
  ku: { label: "کوردی", dir: "rtl", flag: "🟡" },
  ar: { label: "عربی",  dir: "rtl", flag: "🟢" },
  en: { label: "English", dir: "ltr", flag: "🔵" },
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

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = ["intro", ...SECTIONS.map(s => s.id), "quiz"];
    const h = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom > 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return active;
}

/* ═══════════════════════════════════════════════
   THREE.JS HERO CANVAS
═══════════════════════════════════════════════ */
function SectionNav({ active, lang }) {
  const allNavItems = [
    { id: "intro",        ku: "ناسنامە",     ar: "مقدمة",      en: "Intro" },
    { id: "def",          ku: "پێناسە",      ar: "التعريف",    en: "Definition" },
    { id: "history",      ku: "مێژوو",       ar: "التاريخ",    en: "History" },
    { id: "scientists",   ku: "زانایان",     ar: "العلماء",    en: "Scientists" },
    { id: "kurdistan",    ku: "کوردستان",    ar: "كردستان",    en: "Kurdistan" },
    { id: "importance",   ku: "گرنگی",       ar: "الأهمية",    en: "Importance" },
    { id: "challenges",   ku: "ئاڵۆزییەکان", ar: "التحديات",   en: "Challenges" },
    { id: "glossary",     ku: "فەرهەنگ",     ar: "المسرد",     en: "Glossary" },
    { id: "biocontrol",   ku: "کۆنترۆڵ",     ar: "المكافحة",   en: "Control" },
    { id: "ants",         ku: "مێروولە",     ar: "النمل",      en: "Ants" },
    { id: "conservation", ku: "پارێزگاری",   ar: "الحفاظ",     en: "Conservation" },
    { id: "quiz",         ku: "کویز",        ar: "اختبار",     en: "Quiz" },
  ];
  return (
    <nav className="ento-section-nav" aria-label="Section navigation" style={{ direction: lang === "en" ? "ltr" : "rtl" }}>
      {allNavItems.map(item => (
        <a
          key={item.id}
          className={`ento-snav-pill ${active === item.id ? "active" : ""}`}
          href={`#${item.id}`}
        >
          {item[lang]}
        </a>
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   SECTION CARD
═══════════════════════════════════════════════ */
function SectionCard({ section, delay = 0, lang }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const dir = LANG_CONFIG[lang].dir;
  const bodyText = section.body[lang];
  const title = section.titles[lang];

  return (
    <article
      ref={ref}
      id={section.id}
      className={`ento-card ${visible ? "ento-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms`, direction: dir }}
    >
      <div className="ento-card-header">
        {section.icon ? <div className="ento-card-icon" aria-hidden="true">{section.icon}</div> : null}
        <div>
          <div className="ento-card-num">{section.num} · {section.numEn}</div>
          <div className="ento-card-title-ku">{title}</div>
          {lang !== "en" && <div className="ento-card-title-en">{section.titles.en}</div>}
        </div>
      </div>

      {bodyText && (
        <p className={`ento-body ${lang === "en" ? "ento-ltr" : "ento-rtl"}`}>{bodyText}</p>
      )}

      {section.terms && (
        <div className="ento-terms">
          {section.terms.map(t => <span key={t} className="ento-term">{t}</span>)}
        </div>
      )}

      {section.timeline && (
        <div className="ento-timeline">
          {section.timeline.map((item, i) => (
            <TimelineRow key={i} item={item} delay={i * 90} />
          ))}
        </div>
      )}

      {section.scientists && (
        <div className="ento-sci-grid">
          {section.scientists.map(s => (
            <div key={s.name} className="ento-sci-card">
              {SCIENTIST_IMGS[s.initials]
                ? <img src={SCIENTIST_IMGS[s.initials]} alt={s.name} className="ento-sci-avatar ento-sci-photo" />
                : <div className="ento-sci-avatar">{s.initials}</div>
              }
              <div className="ento-sci-name">{s.name}</div>
              <div className="ento-sci-role-ku">
                {lang === "ku" ? s.roleKu : lang === "ar" ? s.roleAr : s.roleEn}
              </div>
              {lang !== "en" && <div className="ento-sci-role-en">{s.roleEn}</div>}
            </div>
          ))}
        </div>
      )}

      {section.mapImg && (
        <div className="ento-map-wrap">
          <img
            src={section.mapImg}
            alt="Kurdistan Ecological Zones & Ant Habitats"
            className="ento-map-img"
            loading="lazy"
          />
          <p className="ento-map-caption">
            {lang === "ku"
              ? "🗺️ کوردستان — ناوچەی ئیکۆلۆجی و جێگای مێرووەکان"
              : lang === "ar"
              ? "🗺️ كردستان — المناطق البيئية وموائل النمل"
              : "🗺️ Kurdistan — Ecological Zones & Ant Habitats"}
          </p>
        </div>
      )}

      {section.stats && (
        <div className="ento-stats-row">
          {section.stats.map(s => (
            <div key={s.label} className="ento-stat-box">
              <span className="ento-stat-ico">{s.icon}</span>
              <span className="ento-stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {section.apps && (
        <div className="ento-apps">
          {section.apps[lang].map(a => (
            <div key={a} className={`ento-app-row ${lang === "en" ? "ento-ltr" : "ento-rtl"}`}>
              <div className="ento-app-dot" />
              {a}
            </div>
          ))}
        </div>
      )}

      {section.threats && (
        <div className="ento-threats">
          {section.threats.map(t => (
            <div key={t.nameEn} className="ento-threat">
              <div className="ento-threat-ico">{t.icon}</div>
              <div className="ento-threat-name">
                {lang === "ku" ? t.nameKu : lang === "ar" ? t.nameAr : t.nameEn}
              </div>
              <div className="ento-threat-eg">{t.eg}</div>
            </div>
          ))}
        </div>
      )}

      {section.glossary && (
        <div className="ento-gloss-grid">
          {section.glossary.map(g => (
            <div key={g.term} className="ento-gloss-item">
              <span className="ento-gloss-term">{g.term}</span>
              <span className="ento-gloss-ku">
                {lang === "ku" ? g.ku : lang === "ar" ? g.ar : g.en}
              </span>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function TimelineRow({ item, delay }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={`ento-tl-row ${visible ? "ento-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="ento-tl-dot" />
      <span className="ento-tl-year">{item.year}</span>
      <span className="ento-tl-event">{item.event}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TEAM SECTION
═══════════════════════════════════════════════ */
const INTRO = {
  ku: {
    quote: "لە هەر شوێنێکی ئەم هەسارەیەدا بیت، لە ژێر هەر بەردێک و لە نێوان هەر گەڵایەکدا، جیهانێکی ئاڵۆز و سەرسوڕهێنەر هەیە کە زۆرجار بە چاوی ئاسایی نابینرێت.",
    body:  "مێرووەکان ئەو ئەندازیارە بچووکانەن کە ملیۆنان ساڵە نەخشەی ژیان لەسەر زەوی دەکێشن و بەبێ دەنگ هاوسەنگیی سروشت ڕادەگرن. لێرە، لە «ئەتڵەسی ئێنتۆمۆلۆجی»، ئێمە ڕێبەری تۆین بۆ چوونە ناو ئەم جیهانە. زانست لێرەدا لە وشەیەکی وشکەوە دەبێتە ئەزموونێکی بینراو، لە قووڵایی پۆلێنکردنی ئەکادیمییەوە تا جوانیی وردەکاریی جەستەی مێروو.",
    close: "باوەڕمان وایە ناسینی ئەم بوونەوەرانە تەنها فێربوونی بایۆلۆجی نییە، بەڵکو تێگەیشتنە لە زمانێکی نهێنی، کە سروشت پێی دەدوێت. بەخێر بێیت بۆ ناو دڵی ژیان، بۆ ئەو شوێنەی زانست و جوانی تێیدا یەک دەگرن.",
  },
  ar: {
    quote: "أينما كنتَ في هذا الكون، تحت كلّ حجر وبين كلّ شجرة، ثمّة عالَم بالغ التعقيد والروعة، كثيرًا ما يخفى عن العين المجرّدة.",
    body:  "الحشرات هي تلك المهندسات الصغيرات اللواتي يرسمن خريطة الحياة على وجه الأرض منذ ملايين السنين، وتحافظن بصمت على توازن الطبيعة. هنا في «أطلس علم الحشرات» نكون دليلك إلى هذا العالم. هنا يتحوّل العلم من كلمة جافّة إلى تجربة بصرية حيّة؛ من أعماق التصنيفات الأكاديمية وصولًا إلى جمال التفاصيل الدقيقة في أجساد الحشرات.",
    close: "نؤمن بأن معرفة هذه الكائنات ليست مجرّد تعلّم للأحياء، بل هي فهم للغة السرّية التي تتحدّث بها الطبيعة. أهلًا بك في قلب الحياة، أهلًا بك حيث يلتقي العلم بالجمال.",
  },
  en: {
    quote: "Wherever you are in this vast universe — beneath every stone and between every blade of grass — there exists a complex and astonishing world that is often invisible to the naked eye.",
    body:  "Insects are those tiny engineers who have been mapping life on Earth for millions of years, silently sustaining nature's balance. Here at the Atlas of Entomology, we become your guide into this world. Science transforms from a dry word into a vivid visual experience — from the depths of academic classification all the way to the exquisite detail of the insect body.",
    close: "We believe that knowing these creatures is not merely learning biology, but understanding the secret language in which nature speaks. Welcome to the heart of life — welcome to where science and beauty meet.",
  },
};

function IntroSection({ lang }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const isRtl = lang !== "en";
  const t = INTRO[lang] || INTRO.ku;
  return (
    <section
      ref={ref}
      id="intro"
      className={`ento-intro-section ${visible ? "ento-visible" : ""}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="ento-intro-inner">
        {/* decorative leaf */}
        <div className="ento-intro-leaf" aria-hidden="true"></div>

        <p className="ento-intro-label">
          {lang === "ku" ? "پێشەکی"
           : lang === "ar" ? "المقدمة"
           : "Preface"}
        </p>

        <blockquote className="ento-intro-quote">
          <span className="ento-intro-qmark">"</span>
          {t.quote}
          <span className="ento-intro-qmark">"</span>
        </blockquote>

        <p className="ento-intro-body">{t.body}</p>

        <p className="ento-intro-close">{t.close}</p>

        <div className="ento-intro-divider">
          <span>🐛</span>
          <span className="ento-intro-line" />
          <span>🌿</span>
          <span className="ento-intro-line" />
          <span>🐝</span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   STRATEGIC GOALS SECTION
═══════════════════════════════════════════════ */
export default function Chapter2({ lang }) {
  const active = useActiveSection();
  return (
    <div className="ento-chapter-page">
      <div className="ento-chapter-hero">
        <div className="ento-chapter-hero-num">{lang === "ku" ? "چاپتەری دووەم" : lang === "ar" ? "الفصل الثاني" : "Chapter 2"}</div>
        <span className="ento-chapter-hero-icon"><Mark name="beetle" /></span>
        <h1 className="ento-chapter-hero-title">
          {lang === "ku" ? "دەستپێکی ئێنتۆمۆلۆجی" : lang === "ar" ? "مقدمة علم الحشرات" : "Introduction to Entomology"}
        </h1>
        <div className="ento-chapter-hero-en">Introduction to Entomology · ئێنتۆمۆلۆجی</div>
      </div>
      <IntroSection lang={lang} />
      <div className="ento-container" style={{ paddingBottom: 0 }}>
        <SectionNav active={active} lang={lang} />
      </div>
      <div className="ento-container">
        {SECTIONS.map((s, i) => (
          <SectionCard key={s.id} section={s} delay={i * 50} lang={lang} />
        ))}
      </div>
      <QuizSection lang={lang} chapter="ch2" />
      <AppFooter lang={lang} sections={SECTIONS} />
    </div>
  );
}

