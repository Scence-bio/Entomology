/**
 * Chapter5.jsx — Lepidoptera · پەپوولەکان · الفراشات
 *
 * فایلی جیاوازی چاپتەری پێنجەم بۆ پرۆژەی Atlas of Entomology
 *
 * چۆنیەتی بەکارهێنان:
 *   1. ئەم فایلە لە هاوبەشی App.js دابنێ
 *   2. لە App.js import بکەی:
 *        import Chapter5 from "./Chapter5";
 *   3. لە ناو CHAPTERS array ئەم تۆکمەیە زیاد بکەی:
 *        {
 *          id: "ch5",
 *          num: { ku: "چاپتەری پێنجەم", en: "Chapter 5", ar: "الفصل الخامس" },
 *          icon: "🦋",
 *          title: { ku: "پەپوولەکان — Lepidoptera", en: "Butterflies — Lepidoptera", ar: "الفراشات — حرشفيات الأجنحة" },
 *          desc: { ku: "ناسنامە، بایۆلۆجی و جۆرە کوردستانییەکان", en: "Identity, biology & Kurdistan species", ar: "الهوية والبيولوجيا وأنواع كردستان" },
 *        },
 *   4. لە ناو JSX return ئەم خەتەیەش زیاد بکەی:
 *        {page === "ch5" && <Chapter5 lang={lang} />}
 */

import { useState, useRef, useEffect } from "react";
import { Mark } from "./marks";

/* ═══════════════════════════════════════════════
   LANG CONFIG (mirror from App.js)
═══════════════════════════════════════════════ */
const LANG_CONFIG = {
  ku: { dir: "rtl" },
  ar: { dir: "rtl" },
  en: { dir: "ltr" },
};

/* ═══════════════════════════════════════════════
   HOOK — Intersection Observer
═══════════════════════════════════════════════ */
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
   TRILINGUAL SECTIONS DATA
═══════════════════════════════════════════════ */
const LEPIDO_SECTIONS = [
  {
    id: "lepido-def",
    num: "٠١",
    numEn: "01",
    icon: "🦋",
    titles: {
      ku: "پێناسەی Lepidoptera",
      ar: "تعريف حرشفيات الأجنحة",
      en: "Defining Lepidoptera",
    },
    body: {
      ku: "Lepidoptera یەکێکە لە گەورەترین ئۆردەرەکانی مێرووە، و پەپوولە و فراشەی لەخۆگرتووە. ناوەکە لە دوو وشەی یۆنانیی کۆن هاتووە: lepís واتە قاو، و pterón واتە باڵ. نیشانەی سەرەکییان ئەوەیە کە قاوێکی ورد باڵەکانیان دادەپۆشێت و ڕەنگەکەیان دروست دەکات.",
      ar: "حرشفيات الأجنحة (Lepidoptera) من أكبر رتب الحشرات، وتشمل الفراشات والعثة. يأتي اسمها من اليونانية: λεπίς (lepís — قشرة) وπτερόν (pterón — جناح). تتميز بوجود حراشف (Scales) دقيقة تغطي أجنحتها وتمنحها ألوانها المبهرة.",
      en: "Lepidoptera is one of the largest insect orders, encompassing butterflies and moths. The name derives from Greek λεπίς (lepís — scale) and πτερόν (pterón — wing). Their defining feature is the presence of overlapping scales on their wings that produce their remarkable colours.",
    },
    terms: ["Lepidoptera", "Scales", "Imago", "Larva", "Proboscis", "Antenna"],
  },
  {
    id: "lepido-metamorphosis",
    num: "٠٢",
    numEn: "02",
    icon: "🔄",
    titles: {
      ku: "گۆڕانەپەڕەی تەواو — Holometabolism",
      ar: "التحول الكامل — Holometabolism",
      en: "Complete Metamorphosis — Holometabolism",
    },
    body: {
      ku: "پەپوولە گۆڕانەپەڕەیەکی تەواوی هەیە. چوار قۆناغە: هێلکە، کۆڵۆک، پیت و پەپوولەی گەورە. کۆڵۆکەکە دەخوات و گەورە دەبێت، پیتەکە لە ناوەوە دەگۆڕێت، و پەپوولەی گەورە جووت دەبێت و نەوە دەهێنێت.",
      ar: "تمر الفراشات بالتحول الكامل (Holometabolism)، ويشمل أربع مراحل: البيضة (Egg)، اليرقة (Larva/Caterpillar)، الشرنقة (Pupa/Chrysalis)، والحشرة الكاملة (Imago/Adult). لكل مرحلة وظيفتها — اليرقة للتغذية والنمو، والشرنقة للتحول الداخلي، والبالغة للتزاوج وإنتاج الأجيال.",
      en: "Butterflies undergo complete metamorphosis (Holometabolism), comprising four distinct stages: Egg, Larva (Caterpillar), Pupa (Chrysalis), and adult Imago. Each stage has a dedicated function — the larva feeds and grows, the pupa undergoes internal reorganisation, and the adult reproduces.",
    },
    metamorphStages: [
      { icon: "🥚", ku: "هێلکە (Egg)", ar: "البيضة", en: "Egg", detail: "3–14 days" },
      { icon: "🐛", ku: "کۆڵۆک (Larva)", ar: "اليرقة", en: "Caterpillar", detail: "14–28 days" },
      { icon: "🫘", ku: "پیت (Pupa)", ar: "الشرنقة", en: "Chrysalis", detail: "7–21 days" },
      { icon: "🦋", ku: "پەپوولە (Imago)", ar: "الحشرة الكاملة", en: "Adult", detail: "2 weeks – 1 year" },
    ],
    terms: ["Holometabolism", "Chrysalis", "Instar", "Ecdysone", "Pheromone"],
  },
  {
    id: "lepido-classification",
    num: "٠٣",
    numEn: "03",
    icon: "📋",
    titles: {
      ku: "پۆلێنکردنی زانستی",
      ar: "التصنيف العلمي",
      en: "Scientific Classification",
    },
    body: {
      ku: "Lepidoptera لە زیاتر لە ١٨٠٠٠٠ جۆر پێک دێت، کە دابەشبووە بۆ چەندین Superfamily گرنگ. جیاوازیی بنەڕەتی نێوان پەپوولە و فراشە لە کاتی چالاکی، شێوەی ئەنتێنا، و شێوازی وەستانی باڵیاندایە.",
      ar: "يضم نظام Lepidoptera أكثر من 180,000 نوع تُصنَّف ضمن عائلات عليا (Superfamilies). الفرق الجوهري بين الفراشات والعثة يكمن في توقيت نشاطها وشكل قرونها الاستشعارية وطريقة طي أجنحتها.",
      en: "Lepidoptera encompasses over 180,000 species across many Superfamilies. The fundamental distinction between butterflies and moths lies in their activity timing, antenna morphology, and resting wing posture.",
    },
    classification: [
      { family: "Nymphalidae",  emoji: "🌿", ku: "گەورەترین خێزانی پەپوولە — Vanessa, Morpho, Monarch", ar: "أكبر عائلات الفراشات — تشمل الحاكمة والمورفو والملكة", en: "Largest butterfly family — Vanessa, Morpho, Monarch" },
      { family: "Papilionidae", emoji: "🌸", ku: "پەپوولەی دووکڵ — ڕەنگاڵەیان زۆرە", ar: "فراشات السنونو — من أجمل فراشات العالم", en: "Swallowtail butterflies — among the most beautiful species" },
      { family: "Lycaenidae",   emoji: "💙", ku: "پەپوولەی بچووک — زۆرێکیان شینی ئاسمانیی جوانن", ar: "الفراشات الصغيرة — كثير منها زرقاء ساطعة", en: "Small butterflies — many with brilliant blue colouring" },
      { family: "Pieridae",     emoji: "🤍", ku: "پەپوولەی سپی و زەرد — Colias و Pieris", ar: "الفراشات البيضاء والصفراء — Colias وPieris", en: "White and yellow butterflies — Colias & Pieris" },
      { family: "Saturniidae",  emoji: "🌙", ku: "گەورەترین فراشەکانن. Atlas Moth فراوانترین باڵی هەیە", ar: "أكبر العث في العالم — حشرة الأطلس لها أكبر الأجنحة", en: "World's largest moths — Atlas Moth has the widest wingspan" },
    ],
    terms: ["Nymphalidae", "Papilionidae", "Lycaenidae", "Pieridae", "Saturniidae"],
  },
  {
    id: "lepido-biology",
    num: "٠٤",
    numEn: "04",
    icon: "🔬",
    titles: {
      ku: "بایۆلۆجی و سازوکار",
      ar: "البيولوجيا والآليات",
      en: "Biology & Mechanisms",
    },
    body: {
      ku: "ڕووپۆشی باڵی پەپوولە لە قاو پێک هاتووە، و قاوەکان لە کایتین دروست بوون. ڕەنگی درەوشاوە، وەک ئەوەی لە Blue Morpho دا دەبینرێت، لە شکاندنەوەی ڕووناکی دروست دەبێت، نەک لە بۆیە. Proboscis وەک لوولەیەکی سووک شیلەی گوڵ دەمژێت. ئەنتێنا ڕۆڵی سەرەکی هەیە لە دۆزینەوەی هاوسەر و خۆراکدا.",
      ar: "تتكوّن أجنحة الفراشات من حراشف كيتينية تعكس الضوء بأنماط فريدة. اللون البنيوي (Structural Colour) — كما في فراشة المورفو الزرقاء — ناتجٌ عن انكسار الضوء لا الصبغة. الخرطوم (Proboscis) أداة شرب أنبوبية ملتفة. تؤدي القرون الاستشعارية دوراً محورياً في البحث عن الأزواج ومصادر الرحيق.",
      en: "Butterfly wings are composed of chitin scales that interact with light in unique ways. Structural Colour — as seen in the Blue Morpho — results from light diffraction rather than pigment. The Proboscis is a coiled tubular drinking apparatus. Antennae are pivotal in locating mates and nectar sources.",
    },
    terms: ["Structural Colour", "Proboscis", "Compound Eye", "Chitin", "Pheromone", "Mimicry"],
  },
  {
    id: "lepido-kurdistan",
    num: "٠٥",
    numEn: "05",
    icon: "🌿",
    titles: {
      ku: "پەپوولەی کوردستان",
      ar: "فراشات كردستان",
      en: "Kurdistan's Butterflies",
    },
    body: {
      ku: "کوردستان ناوچەیەکی دەوڵەمەندە بە جۆراوجۆریی زیندەوەر. کوێستان، دەشت و چەمەکانی شوێنی گونجاون بۆ پەپوولەی ناوخۆیی و کۆچبەر. لە توێژینەوەی ئەم دواییانەدا زیاتر لە ٢٠٠ جۆری Lepidoptera لە ناوچەکەدا تۆمار کراوە، لەوانە Papilio machaon، Colias croceus و Vanessa atalanta.",
      ar: "تُعدّ كردستان من مناطق التنوع البيولوجي الساخنة. وفّرت جبالها وسهولها وأنهارها موائل حيوية لعشرات أنواع الفراشات المتوطنة والمهاجرة. وثّقت الدراسات الحديثة أكثر من 200 نوع من حرشفيات الأجنحة في المنطقة، منها: أبو الدُّمَّلَيْن (Papilio machaon)، والأصفر المغيوم (Colias croceus)، والأميرال الأحمر (Vanessa atalanta).",
      en: "Kurdistan qualifies as a biodiversity hotspot. Its mountains, plains and rivers provide critical habitats for dozens of native and migratory Lepidoptera. Recent surveys have documented over 200 species in the region, including Papilio machaon (Old World Swallowtail), Colias croceus (Clouded Yellow), and Vanessa atalanta (Red Admiral).",
    },
    kurdistanSpecies: [
      { name: "Papilio machaon", family: "Papilionidae", ku: "Old World Swallowtail", habitat: { ku: "چیا و دەشت", ar: "جبال وسهول", en: "Mountains and plains" } },
      { name: "Vanessa atalanta", family: "Nymphalidae", ku: "Red Admiral", habitat: { ku: "باخ و دارستان", ar: "حدائق وغابات", en: "Gardens and woodland" } },
      { name: "Colias croceus", family: "Pieridae", ku: "Clouded Yellow", habitat: { ku: "دەشتی کراوە", ar: "سهول مفتوحة", en: "Open grassland" } },
      { name: "Polyommatus icarus", family: "Lycaenidae", ku: "Common Blue", habitat: { ku: "مێرگ و باخچە", ar: "مروج وحدائق", en: "Meadows and gardens" } },
      { name: "Aglais io", family: "Nymphalidae", ku: "European Peacock", habitat: { ku: "دارستان و دەشت", ar: "غابات وسهول", en: "Woodland and fields" } },
    ],
    terms: ["Endemism", "Habitat Corridor", "Seasonal Migration", "Nectaring Plant"],
  },
  {
    id: "lepido-conservation",
    num: "٠٦",
    numEn: "06",
    icon: "🌱",
    titles: {
      ku: "پارێزگاری و مەترسییەکان",
      ar: "الحفاظ والمخاطر",
      en: "Conservation & Threats",
    },
    body: {
      ku: "نزیکەی ١٠٪ی جۆرەکانی Lepidoptera لەژێر مەترسیدان. هۆکارەکان ئەمانەن: وێرانبوونی ژینگەی سروشتی، بەکارهێنانی ئافەتکوژ، گەرمبوونی جیهان، و بڵاوبوونەوەی ڕووەکی نامۆ. گرنگترین ڕێگەی پاراستن ئەوەیە پردێکی ژینگەیی لە نێوان ناوچە پارێزراوەکاندا بمێنێتەوە.",
      ar: "نحو 10% من أنواع Lepidoptera مهددة. تشمل الأسباب الرئيسية: تدمير الموائل، والمبيدات الحشرية، والتغير المناخي، وانتشار النباتات الغازية. يُعدّ الحفاظ على الممرات البيئية (Corridors) الرابطة بين المناطق المحمية من أهم أساليب حماية الفراشات.",
      ar2: "",
      en: "About 10% of Lepidoptera species face extinction risk. Main drivers are habitat loss, pesticide use, climate change, and invasive plant species. Maintaining habitat corridors connecting protected areas is the single most effective conservation tool for butterflies.",
    },
    threats: [
      { icon: "🏗️", nameKu: "وێرانبوونی ژینگە", nameAr: "تدمير الموائل", nameEn: "Habitat Loss", eg: "Deforestation, urbanisation" },
      { icon: "☠️", nameKu: "ئافەتکوژ",         nameAr: "المبيدات الحشرية",  nameEn: "Pesticides",    eg: "Neonicotinoids, herbicides" },
      { icon: "🌡️", nameKu: "گەرمبوونی زەوی",    nameAr: "تغير المناخ",       nameEn: "Climate Change", eg: "Phenological mismatch" },
      { icon: "🌿", nameKu: "ڕووەکە تازەواردەکان", nameAr: "النباتات الغازية",  nameEn: "Invasive Plants", eg: "Displacing host plants" },
    ],
  },
  {
    id: "lepido-mimicry",
    num: "٠٧",
    numEn: "07",
    icon: "🎭",
    titles: {
      ku: "تەقلیدکاری — Mimicry",
      ar: "المحاكاة — Mimicry",
      en: "Mimicry in Lepidoptera",
    },
    body: {
      ku: "Lepidoptera یەکێکە لە ڕوونترین نموونەکانی لاساییکردنەوە لە سروشتدا. دوو جۆری سەرەکی هەیە. یەکەم، Müllerian: چەند جۆرێکی ژەهراوی یەک ڕەنگ بەکاردەهێنن، بۆ ئەوەی نیشانەکە بەهێزتر بێت. دووەم، Batesian: جۆرێکی بێ زیان شێوەی جۆرێکی ژەهراوی وەردەگرێت، بۆ ئەوەی نێچیرخۆر لێی دوور بکەوێتەوە.",
      ar: "تمثّل حرشفيات الأجنحة النموذج الأمثل على ظاهرة المحاكاة في الطبيعة. ثمة نوعان رئيسيان: ١) المحاكاة المولرية (Müllerian) — تشترك فيها أنواع سامة عدة بتصميم تحذيري واحد لتعزيز التأثير. ٢) المحاكاة البيتسية (Batesian) — تحاكي فيها أنواع غير سامة أنواعاً سامة لتجنّب الافتراس.",
      en: "Lepidoptera are textbook examples of mimicry in nature. Two key types exist: ① Müllerian mimicry — multiple toxic species share warning colouration to reinforce the signal. ② Batesian mimicry — a harmless species mimics a toxic one to deceive predators.",
    },
    terms: ["Müllerian Mimicry", "Batesian Mimicry", "Aposematism", "Cryptic Colouration", "Eyespot"],
  },
  {
    id: "lepido-glossary",
    num: "٠٨",
    numEn: "08",
    icon: "📖",
    titles: {
      ku: "فەرهەنگی زاراوەکان",
      ar: "المسرد العلمي",
      en: "Scientific Glossary",
    },
    body: { ku: "", ar: "", en: "" },
    glossary: [
      { term: "Lepidoptera",      ku: "ئۆردەری پەپوولە و فراشەکان",       ar: "رتبة حرشفيات الأجنحة",       en: "Order of butterflies and moths" },
      { term: "Imago",            ku: "پەپوولەی گەورەی باڵدار",             ar: "الحشرة البالغة",              en: "Winged adult stage" },
      { term: "Chrysalis",        ku: "پیت — قۆناغی گۆڕان",            ar: "الشرنقة — مرحلة التحول",      en: "Pupal stage in butterflies" },
      { term: "Proboscis",        ku: "خرتومی لوولکراو بۆ مژینی شیلەی گوڵ", ar: "الخرطوم — أداة الشرب",        en: "Coiled tube for drinking nectar" },
      { term: "Scales",           ku: "قاوەکانی باڵ، کە ڕووناکی دەشکێننەوە", ar: "حراشف الأجنحة",              en: "Wing scales creating colour" },
      { term: "Instar",           ku: "قۆناغی نێوان دوو تێڵان",       ar: "الطور اليرقي بين انسلاخين",   en: "Larval stage between moults" },
      { term: "Nectaring",        ku: "مژینی شیلەی گوڵ",  ar: "امتصاص الرحيق",              en: "Feeding on flower nectar" },
      { term: "Puddling",         ku: "مژینی ئاو و کانزا لە خاکی تەڕ",   ar: "التبلل — شرب الأملاح من التربة الرطبة", en: "Mineral-drinking from wet soil" },
      { term: "Diapause",         ku: "وەستانی گەشە لە زستاندا", ar: "السكون — توقف النمو في الشتاء", en: "Dormancy during winter" },
      { term: "Host Plant",       ku: "ڕووەکی خانەخوێ — ئەوەی کۆڵۆکەکە لێی دەخوات", ar: "النبات العائل للحشرة",        en: "Plant the larva feeds on" },
    ],
  },
];

/* ═══════════════════════════════════════════════
   BUTTERFLY SPECIMEN DATA  (24 specimens)
   Images reference same paths as ButterflyCollection.jsx
═══════════════════════════════════════════════ */
const SPECIMENS = [
  { id: 1,  img: "/images/butterflies/tiger-longwing-1.jpg", name: "Tiger Longwing",                sci: "Heliconius hecale",       family: "Nymphalidae",  type: "butterfly", region: "Central & S. America",  color: "#e8850a" },
  { id: 2,  img: "/images/butterflies/painted-lady.jpg", name: "Painted Lady",                  sci: "Vanessa cardui",          family: "Nymphalidae",  type: "butterfly", region: "Worldwide",              color: "#d4620f" },
  { id: 3,  img: "/images/butterflies/common-blue-1.jpg", name: "Common Blue",                   sci: "Polyommatus icarus",      family: "Lycaenidae",   type: "butterfly", region: "Europe & Asia",          color: "#3b82f6" },
  { id: 4,  img: "/images/butterflies/red-admiral-1.jpg", name: "Red Admiral",                   sci: "Vanessa atalanta",        family: "Nymphalidae",  type: "butterfly", region: "Europe, Asia, N.America", color: "#dc2626" },
  { id: 5,  img: "/images/butterflies/blue-morpho.jpg", name: "Blue Morpho",                   sci: "Morpho menelaus",         family: "Nymphalidae",  type: "butterfly", region: "Central & S. America",  color: "#2563eb" },
  { id: 6,  img: "/images/butterflies/old-world-swallowtail-1.jpg", name: "Old World Swallowtail",         sci: "Papilio machaon",         family: "Papilionidae", type: "butterfly", region: "Europe, Asia, N.America", color: "#ca8a04" },
  { id: 7,  img: "/images/butterflies/tiger-longwing-2.jpg", name: "Tiger Longwing (habitat)",      sci: "Heliconius hecale",       family: "Nymphalidae",  type: "butterfly", region: "Central & S. America",  color: "#b45309" },
  { id: 8,  img: "/images/butterflies/european-peacock-1.jpg", name: "European Peacock",              sci: "Aglais io",               family: "Nymphalidae",  type: "butterfly", region: "Europe & Asia",          color: "#b91c1c" },
  { id: 9,  img: "/images/butterflies/glasswing-1.jpg", name: "Glasswing",                    sci: "Greta oto",               family: "Nymphalidae",  type: "butterfly", region: "Central America",        color: "#64748b" },
  { id: 10, img: "/images/butterflies/clouded-yellow.jpg", name: "Clouded Yellow",                sci: "Colias croceus",          family: "Pieridae",     type: "butterfly", region: "Europe, Africa, W.Asia", color: "#d97706" },
  { id: 11, img: "/images/butterflies/monarch-1.jpg", name: "Monarch",                       sci: "Danaus plexippus",        family: "Nymphalidae",  type: "butterfly", region: "Americas",               color: "#ea580c" },
  { id: 12, img: "/images/butterflies/american-lady.jpg", name: "American Lady",                 sci: "Vanessa virginiensis",    family: "Nymphalidae",  type: "butterfly", region: "N. & S. America",        color: "#c2410c" },
  { id: 13, img: "/images/butterflies/old-world-swallowtail-2.jpg", name: "Old World Swallowtail (pinned)", sci: "Papilio machaon",        family: "Papilionidae", type: "butterfly", region: "Europe, Asia, N.America", color: "#a16207" },
  { id: 14, img: "/images/butterflies/european-peacock-2.jpg", name: "European Peacock (nectaring)",  sci: "Aglais io",               family: "Nymphalidae",  type: "butterfly", region: "Europe & Asia",          color: "#9f1239" },
  { id: 15, img: "/images/butterflies/common-blue-2.jpg", name: "Common Blue (illustration)",    sci: "Polyommatus icarus",      family: "Lycaenidae",   type: "butterfly", region: "Europe & Asia",          color: "#1d4ed8" },
  { id: 16, img: "/images/butterflies/giant-owl-1.jpg", name: "Giant Owl Butterfly",           sci: "Caligo eurilochus",       family: "Nymphalidae",  type: "butterfly", region: "Central & S. America",  color: "#7c3aed" },
  { id: 17, img: "/images/butterflies/monarch-2.jpg", name: "Monarch (art)",                 sci: "Danaus plexippus",        family: "Nymphalidae",  type: "butterfly", region: "Americas",               color: "#f59e0b" },
  { id: 18, img: "/images/butterflies/atlas-moth-1.jpg", name: "Atlas Moth",                   sci: "Attacus atlas",           family: "Saturniidae",  type: "moth",      region: "South & SE Asia",        color: "#92400e" },
  { id: 19, img: "/images/butterflies/atlas-moth-2.jpg", name: "Atlas Moth (live)",             sci: "Attacus atlas",           family: "Saturniidae",  type: "moth",      region: "South & SE Asia",        color: "#78350f" },
  { id: 20, img: "/images/butterflies/red-admiral-2.jpg", name: "Red Admiral (thistle)",         sci: "Vanessa atalanta",        family: "Nymphalidae",  type: "butterfly", region: "Europe, Asia, N.America", color: "#ef4444" },
  { id: 21, img: "/images/butterflies/giant-owl-2.jpg",name: "Giant Owl Butterfly (underside)",sci: "Caligo eurilochus",      family: "Nymphalidae",  type: "butterfly", region: "Central & S. America",  color: "#6d28d9" },
  { id: 22, img: "/images/butterflies/glasswing-2.jpg", name: "Glasswing (pinned)",            sci: "Greta oto",               family: "Nymphalidae",  type: "butterfly", region: "Central America",        color: "#475569" },
  { id: 23, img: "/images/butterflies/mottled-emigrant.jpg", name: "Mottled Emigrant",              sci: "Catopsilia pyranthe",     family: "Pieridae",     type: "butterfly", region: "Asia, Australia",        color: "#eab308" },
  { id: 24, img: "/images/butterflies/blue-morpho-art.jpg", name: "Blue Morpho (art)",             sci: "Morpho menelaus",         family: "Nymphalidae",  type: "butterfly", region: "Central & S. America",  color: "#3b82f6" },
];

const FAMILIES_LIST = ["All", ...Array.from(new Set(SPECIMENS.map(s => s.family))).sort()];

const FAMILY_COLORS = {
  Nymphalidae:  { bg: "rgba(59,130,246,.12)",  text: "#60a5fa",  border: "rgba(59,130,246,.3)"  },
  Papilionidae: { bg: "rgba(250,204,21,.12)",  text: "#fbbf24",  border: "rgba(250,204,21,.3)"  },
  Lycaenidae:   { bg: "rgba(52,211,153,.12)",  text: "#34d399",  border: "rgba(52,211,153,.3)"  },
  Pieridae:     { bg: "rgba(251,191,36,.12)",  text: "#f59e0b",  border: "rgba(251,191,36,.3)"  },
  Saturniidae:  { bg: "rgba(167,139,250,.12)", text: "#a78bfa",  border: "rgba(167,139,250,.3)" },
};

/* ═══════════════════════════════════════════════
   SECTION CARD COMPONENT
═══════════════════════════════════════════════ */
function LepidoCard({ section, delay = 0, lang }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const dir = LANG_CONFIG[lang].dir;

  return (
    <article
      ref={ref}
      id={section.id}
      className={`ento-card ${visible ? "ento-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms`, direction: dir }}
    >
      <div className="ento-card-header">
        <div className="ento-card-icon">{section.icon}</div>
        <div>
          <div className="ento-card-num">{section.num} · {section.numEn}</div>
          <div className="ento-card-title-ku">{section.titles[lang]}</div>
          {lang !== "en" && <div className="ento-card-title-en">{section.titles.en}</div>}
        </div>
      </div>

      {section.body[lang] && (
        <p className={`ento-body ${lang === "en" ? "ento-ltr" : "ento-rtl"}`}>
          {section.body[lang]}
        </p>
      )}

      {/* Metamorphosis stages */}
      {section.metamorphStages && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          {section.metamorphStages.map((st, i) => (
            <div key={i} style={{
              flex: "1 1 120px", background: "var(--accent-dim)",
              border: "1.5px solid rgba(245,158,11,.25)", borderRadius: 14,
              padding: "14px 12px", textAlign: "center",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: 6 }}>{st.icon}</div>
              <div style={{ fontWeight: 800, fontSize: ".85rem", color: "var(--text-primary)", marginBottom: 4 }}>
                {lang === "ku" ? st.ku : lang === "ar" ? st.ar : st.en}
              </div>
              <div style={{ fontSize: ".72rem", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                {st.detail}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Classification table */}
      {section.classification && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
          {section.classification.map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              background: "rgba(45,116,23,.06)", border: "1px solid rgba(45,116,23,.12)",
              borderRadius: 12, padding: "12px 14px",
            }}>
              <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{c.emoji}</span>
              <div>
                <div className="ento-binomial" style={{ fontSize: "1rem", color: "var(--accent)", marginBottom: 3 }}>{c.family}</div>
                <div style={{ fontSize: ".84rem", color: "var(--text-secondary)" }}>
                  {lang === "ku" ? c.ku : lang === "ar" ? c.ar : c.en}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Kurdistan species */}
      {section.kurdistanSpecies && (
        <>
          <table className="ento-record">
            <thead>
              <tr>
                <th>{lang === "ku" ? "ناوی زانستی" : lang === "ar" ? "الاسم العلمي" : "Scientific name"}</th>
                <th>{lang === "ku" ? "خێزان" : lang === "ar" ? "الفصيلة" : "Family"}</th>
                <th>{lang === "ku" ? "ناوی باو" : lang === "ar" ? "الاسم الشائع" : "Common name"}</th>
                <th>{lang === "ku" ? "شوێن" : lang === "ar" ? "الموطن" : "Habitat"}</th>
              </tr>
            </thead>
            <tbody>
              {section.kurdistanSpecies.map(sp => (
                <tr key={sp.name}>
                  <td className="ento-binomial">{sp.name}</td>
                  <td className="ento-binomial">{sp.family}</td>
                  <td>{sp.ku}</td>
                  <td>{sp.habitat[lang]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="ento-body" style={{ marginTop: 12 }}>
            {lang === "ku"
              ? "ئەم پێنج جۆرە لە تۆماری ناوچەکەدان. گالەریی خوارەوە نموونەی جیهانیشی تێدایە. فلتەری «کوردستان» تەنها ئەم جۆرانە پیشان دەدات."
              : lang === "ar"
              ? "هذه الأنواع الخمسة من سجل المنطقة. معرض الأسفل يضم نماذج من العالم أيضاً؛ مرشح «كردستان» يعرض هذه الأنواع فقط."
              : "These five are the regional record. The gallery below also holds world examples; the Kurdistan filter shows only these species."}
          </p>
        </>
      )}

      {/* Threats */}
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

      {/* Terms */}
      {section.terms && (
        <div className="ento-terms">
          {section.terms.map(t => <span key={t} className="ento-term">{t}</span>)}
        </div>
      )}

      {/* Glossary */}
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

/* ═══════════════════════════════════════════════
   BUTTERFLY GALLERY COMPONENT
═══════════════════════════════════════════════ */
const KURDISTAN_SCI = new Set([
  "Papilio machaon",
  "Vanessa atalanta",
  "Colias croceus",
  "Polyommatus icarus",
  "Aglais io",
]);

function ButterflyGallery({ lang }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const [familyFilter, setFamilyFilter] = useState("All");
  const [typeFilter, setTypeFilter]     = useState("All");
  const [placeFilter, setPlaceFilter]   = useState("All");
  const [search, setSearch]             = useState("");
  const [selected, setSelected]         = useState(null);

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const filtered = SPECIMENS.filter(s => {
    const fam  = familyFilter === "All" || s.family === familyFilter;
    const type = typeFilter === "All" || s.type === typeFilter;
    const place = placeFilter === "All"
      || (placeFilter === "kurdistan" && KURDISTAN_SCI.has(s.sci))
      || (placeFilter === "world" && !KURDISTAN_SCI.has(s.sci));
    const srch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.sci.toLowerCase().includes(search.toLowerCase());
    return fam && type && place && srch;
  });

  const labelGallery = { ku: "گالەریی پەپوولەکان", ar: "معرض الفراشات", en: "Butterfly Gallery" };
  const labelSub     = { ku: "تۆماری جیهان، لەگەڵ جۆرەکانی کوردستان", ar: "سجل عالمي، مع أنواع كردستان", en: "A world catalog, with the Kurdistan species marked" };
  const labelSearch  = { ku: "گەڕان...", ar: "بحث...", en: "Search..." };
  const labelAll     = { ku: "هەموو", ar: "الكل", en: "All" };
  const labelFamily  = { ku: "خێزان:", ar: "العائلة:", en: "Family:" };
  const labelType    = { ku: "جۆر:", ar: "النوع:", en: "Type:" };
  const labelPlace   = { ku: "شوێن:", ar: "المكان:", en: "Place:" };
  const labelLocal   = { ku: "کوردستان", ar: "كردستان", en: "Kurdistan" };
  const labelWorld   = { ku: "جیهان", ar: "العالم", en: "World" };
  const labelBfly    = { ku: "پەپوولە", ar: "فراشة", en: "butterfly" };
  const labelMoth    = { ku: "فراشە", ar: "عثة", en: "moth" };

  const fam = selected ? (FAMILY_COLORS[selected.family] || FAMILY_COLORS.Nymphalidae) : null;

  return (
    <section
      ref={ref}
      id="lepido-gallery"
      style={{ maxWidth: 1100, margin: "0 auto clamp(32px,5vw,56px)", padding: "0 clamp(16px,5vw,32px)", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)", transition: "opacity .6s ease, transform .6s ease" }}
      dir={lang === "en" ? "ltr" : "rtl"}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "clamp(18px,3vw,28px)", paddingBottom: 16, borderBottom: "2px solid var(--accent-dim)" }}>
        <span className="ento-ch-icon" style={{ color: "var(--accent)" }}><Mark name="butterfly" /></span>
        <div>
          <h2 style={{ fontSize: "clamp(1.1rem,3vw,1.4rem)", fontWeight: 900, color: "var(--text-primary)", margin: "0 0 4px" }}>
            {labelGallery[lang]}
          </h2>
          <p style={{ fontSize: ".82rem", color: "var(--text-muted)", margin: 0 }}>{labelSub[lang]}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20, alignItems: "center" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={labelSearch[lang]}
          style={{
            background: "var(--card-bg)", border: "1.5px solid var(--border-card)",
            borderRadius: 10, padding: "8px 14px", color: "var(--text-primary)",
            fontSize: ".85rem", fontFamily: "var(--font-arabic)", outline: "none",
            width: 200,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: ".78rem", color: "var(--text-muted)" }}>{labelFamily[lang]}</span>
          <select value={familyFilter} onChange={e => setFamilyFilter(e.target.value)}
            style={{ background: "var(--card-bg)", border: "1.5px solid var(--border-card)", borderRadius: 8, padding: "7px 10px", color: "var(--text-primary)", fontSize: ".82rem", cursor: "pointer" }}>
            <option value="All">{labelAll[lang]}</option>
            {FAMILIES_LIST.filter(f => f !== "All").map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: ".78rem", color: "var(--text-muted)" }}>{labelType[lang]}</span>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            style={{ background: "var(--card-bg)", border: "1.5px solid var(--border-card)", borderRadius: 8, padding: "7px 10px", color: "var(--text-primary)", fontSize: ".82rem", cursor: "pointer" }}>
            <option value="All">{labelAll[lang]}</option>
            <option value="butterfly">{labelBfly[lang]}</option>
            <option value="moth">{labelMoth[lang]}</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: ".78rem", color: "var(--text-muted)" }}>{labelPlace[lang]}</span>
          <select value={placeFilter} onChange={e => setPlaceFilter(e.target.value)}
            style={{ background: "var(--card-bg)", border: "1.5px solid var(--border-card)", borderRadius: 8, padding: "7px 10px", color: "var(--text-primary)", fontSize: ".82rem", cursor: "pointer" }}>
            <option value="All">{labelAll[lang]}</option>
            <option value="kurdistan">{labelLocal[lang]}</option>
            <option value="world">{labelWorld[lang]}</option>
          </select>
        </div>
        {filtered.length !== SPECIMENS.length && (
          <span style={{ color: "var(--accent)", fontSize: ".78rem", fontFamily: "var(--font-mono)", marginInlineStart: "auto" }}>
            {filtered.length} shown
          </span>
        )}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 14 }}>
        {filtered.map(s => <SpecCard key={s.id} s={s} lang={lang} local={KURDISTAN_SCI.has(s.sci)} onClick={() => setSelected(s)} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)", fontSize: ".9rem" }}>
          {lang === "ku" ? "هیچ نموونەیەک نەدۆزرایەوە" : lang === "ar" ? "لا توجد نماذج مطابقة" : "No specimens match your filters."}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.8)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: "var(--card-bg)", border: "2px solid var(--border-card)", borderRadius: 20, maxWidth: 540, width: "100%", maxHeight: "90vh", overflow: "auto", position: "relative", boxShadow: "0 16px 60px rgba(0,0,0,.4)" }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{ position: "absolute", top: 14, insetInlineEnd: 14, background: "rgba(0,0,0,.45)", border: "none", borderRadius: "50%", width: 32, height: 32, color: "#fff", cursor: "pointer", fontSize: 15, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
            >✕</button>

            {/* Image */}
            <div style={{ width: "100%", height: 240, background: selected.color + "22", borderRadius: "18px 18px 0 0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={selected.img}
                alt={selected.name}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={e => { e.target.style.display = "none"; }}
              />
            </div>

            <div style={{ padding: "1.4rem 1.8rem 1.8rem" }}>
              {/* Badges */}
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ background: fam.bg, color: fam.text, border: `1px solid ${fam.border}`, borderRadius: 20, padding: "3px 12px", fontSize: ".75rem", fontFamily: "var(--font-mono)" }}>
                  {selected.family}
                </span>
                <span style={{
                  background: selected.type === "moth" ? "rgba(167,139,250,.12)" : "rgba(52,211,153,.12)",
                  color: selected.type === "moth" ? "#a78bfa" : "#34d399",
                  border: selected.type === "moth" ? "1px solid rgba(167,139,250,.3)" : "1px solid rgba(52,211,153,.3)",
                  borderRadius: 20, padding: "3px 12px", fontSize: ".75rem", fontFamily: "var(--font-mono)",
                }}>
                  {selected.type}
                </span>
              </div>

              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "0 0 4px", color: "var(--text-primary)" }}>{selected.name}</h2>
              <p className="ento-binomial" style={{ fontSize: "1rem", color: "var(--accent)", margin: "0 0 1.2rem" }}>{selected.sci}</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <InfoBox label="Region" value={selected.region} />
                <InfoBox label="Family" value={selected.family} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function InfoBox({ label, value }) {
  return (
    <div style={{ background: "var(--accent-dim)", borderRadius: 10, padding: "10px 12px" }}>
      <p style={{ fontSize: ".68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".1em", margin: "0 0 4px", fontFamily: "var(--font-mono)" }}>{label}</p>
      <p style={{ fontSize: ".85rem", color: "var(--text-secondary)", margin: 0 }}>{value}</p>
    </div>
  );
}

function SpecCard({ s, onClick, lang, local }) {
  const [hover, setHover] = useState(false);
  const fam = FAMILY_COLORS[s.family] || FAMILY_COLORS.Nymphalidae;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--card-bg)", border: `1.5px solid ${hover ? "var(--accent)" : "var(--border-card)"}`,
        borderRadius: 14, overflow: "hidden", cursor: "pointer",
        transition: "border-color .2s, transform .2s",
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? "0 8px 28px rgba(0,0,0,.15)" : "none",
      }}
    >
      {/* Image or colour fallback */}
      <div style={{ width: "100%", height: 150, background: s.color + "22", overflow: "hidden", position: "relative" }}>
        <img
          src={s.img}
          alt={s.name}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .35s", transform: hover ? "scale(1.06)" : "scale(1)" }}
          onError={e => {
            e.target.style.display = "none";
            e.target.parentElement.style.display = "flex";
            e.target.parentElement.style.alignItems = "center";
            e.target.parentElement.style.justifyContent = "center";
            e.target.parentElement.style.fontSize = "3.5rem";
            e.target.parentElement.textContent = "🦋";
          }}
        />
        {local && (
          <span style={{ position: "absolute", top: 8, left: 8, background: "#1a2418", color: "#f3efe4", borderRadius: 2, padding: "2px 8px", fontSize: ".68rem" }}>
            {lang === "ku" ? "کوردستان" : lang === "ar" ? "كردستان" : "Kurdistan"}
          </span>
        )}
        {s.type === "moth" && (
          <span style={{ position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,.55)", color: "#a78bfa", borderRadius: 10, padding: "2px 8px", fontSize: ".7rem", fontFamily: "var(--font-mono)", backdropFilter: "blur(4px)" }}>moth</span>
        )}
      </div>
      <div style={{ padding: "10px 12px" }}>
        <p style={{ fontSize: ".88rem", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 2px" }}>{s.name}</p>
        <p className="ento-binomial" style={{ fontSize: ".9rem", color: "var(--accent)", margin: "0 0 8px" }}>{s.sci}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          <span className="ento-binomial" style={{ background: fam.bg, color: fam.text, borderRadius: 8, padding: "2px 8px", fontSize: ".85rem" }}>{s.family}</span>
          <span style={{ background: "rgba(46,125,26,.12)", color: "var(--text-secondary)", borderRadius: 8, padding: "2px 8px", fontSize: ".7rem", fontFamily: "var(--font-mono)" }}>{s.region.split(",")[0]}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CHAPTER 5 — MAIN EXPORT
═══════════════════════════════════════════════ */
export default function Chapter5({ lang }) {
  return (
    <div className="ento-chapter-page">
      {/* Hero */}
      
      <div className="ento-chapter-hero" style={{position:"relative",overflow:"hidden"}}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position:"absolute",
            inset:0,
            width:"100%",
            height:"100%",
            objectFit:"cover",
            zIndex:0,
            opacity:.45
          }}
        >
          <source src="/videos/chapter5.mp4" type="video/mp4" />
        </video>

        <div style={{position:"relative",zIndex:2}}>
    
        <div className="ento-chapter-hero-num">
          {lang === "ku" ? "چاپتەری پێنجەم" : lang === "ar" ? "الفصل الخامس" : "Chapter 5"}
        </div>
        <span className="ento-chapter-hero-icon"><Mark name="butterfly" /></span>
        <div className="ento-chapter-hero-title">
          {lang === "ku" ? "پەپوولەکان" : lang === "ar" ? "الفراشات" : "Butterflies"}
          <div className="ento-binomial">Lepidoptera</div>
        </div>
        <div className="ento-chapter-hero-en">
          Lepidoptera · پەپوولەکان · حرشفيات الأجنحة
        </div>
      </div>
      </div>

      {/* Sections */}
      <div className="ento-container">
        {LEPIDO_SECTIONS.map((s, i) => (
          <LepidoCard key={s.id} section={s} delay={i * 50} lang={lang} />
        ))}
      </div>

      {/* Interactive gallery */}
      <ButterflyGallery lang={lang} />

      {/* Footer via App.js AppFooter — caller passes it, so we just end here.
          If Chapter5 is standalone, uncomment the block below and import AppFooter,
          or simply duplicate the footer markup. For now we close cleanly. */}
    </div>
  );
}
