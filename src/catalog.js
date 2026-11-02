/** Shared chapter catalog — home, nav, search, sitemap. */

export const SITE_URL = "https://www.entomo.online";

export const CHAPTERS = [
  {
    id: "ch1",
    num: { ku: "چاپتەری یەکەم", en: "Chapter 1", ar: "الفصل الأول" },
    icon: "pin",
    image: "/images/plates/ch1-raparin.jpg",
    alt: {
      ku: "کەمپەسی زانکۆی ڕاپەڕین",
      ar: "حرم جامعة رابرين",
      en: "University of Raparin campus",
    },
    title: {
      ku: "پێشەکی و دامەزراوە",
      en: "Preface and institution",
      ar: "المقدمة والمؤسسة",
    },
    desc: {
      ku: "چوارچێوەی ئەکادیمی، ئامانج و زانکۆ",
      en: "Academic frame, outcomes and university",
      ar: "الإطار الأكاديمي والمخرجات والجامعة",
    },
    path: "start",
  },
  {
    id: "ch2",
    num: { ku: "چاپتەری دووەم", en: "Chapter 2", ar: "الفصل الثاني" },
    icon: "beetle",
    image: "/images/plates/ch2-drawer.jpg",
    alt: {
      ku: "کاشێفی قوڕقوڕەی مۆزەخانە",
      ar: "درج خنافس في متحف",
      en: "Museum beetle drawer",
    },
    title: {
      ku: "دەستپێکی ئێنتۆمۆلۆجی",
      en: "Introduction to Entomology",
      ar: "مقدمة علم الحشرات",
    },
    desc: {
      ku: "پێناسە، مێژوو و گرنگیی مێرووناسی",
      en: "Definition, history & importance of entomology",
      ar: "التعريف والتاريخ وأهمية علم الحشرات",
    },
    path: "start",
  },
  {
    id: "ch3",
    num: { ku: "چاپتەری سێیەم", en: "Chapter 3", ar: "الفصل الثالث" },
    icon: "legs",
    image: "/images/plates/ch3-dragonfly.jpg",
    alt: {
      ku: "مێرووی ئاوی Libellula quadrimaculata",
      ar: "رعاش Libellula quadrimaculata",
      en: "Four-spotted chaser dragonfly",
    },
    latin: "Arthropoda",
    title: {
      ku: "فایلەمی جومگەپێیەکان",
      en: "Phylum Arthropoda",
      ar: "شعبة مفصليات الأرجل",
    },
    desc: {
      ku: "سیستەمی هەناسەدان، پەیەکەری دەرەکی، چاوی ئاڵۆز و فەرهەنگ",
      en: "Respiratory system, exoskeleton, compound eyes & glossary",
      ar: "الجهاز التنفسي والهيكل الخارجي والعيون المركبة والمصطلحات",
    },
    path: "start",
  },
  {
    id: "ch5",
    num: { ku: "چاپتەری چوارەم", en: "Chapter 4", ar: "الفصل الرابع" },
    icon: "butterfly",
    image: "/images/plates/ch5-machaon.jpg",
    alt: {
      ku: "پەپوولەی Papilio machaon",
      ar: "فراشة Papilio machaon",
      en: "Swallowtail butterfly Papilio machaon",
    },
    latin: "Lepidoptera",
    title: {
      ku: "پەپوولەکان",
      en: "Butterflies",
      ar: "الفراشات",
    },
    desc: {
      ku: "ناسنامە، بایۆلۆجی و جۆرە کوردستانییەکان",
      en: "Identity, biology & Kurdistan species",
      ar: "الهوية والبيولوجيا وأنواع كردستان",
    },
    path: "orders",
  },
  {
    id: "ch6",
    num: { ku: "چاپتەری پێنجەم", en: "Chapter 5", ar: "الفصل الخامس" },
    icon: "bee",
    image: "/images/plates/ch6-bee.jpg",
    alt: {
      ku: "هەنگی هەنگوین لە فڕیندا",
      ar: "نحلة عسل طائرة",
      en: "Honey bee in flight",
    },
    latin: "Hymenoptera",
    title: {
      ku: "مێروولە، هەنگ و زەنبوور",
      en: "Ants, bees and wasps",
      ar: "النمل والنحل والزنابير",
    },
    desc: {
      ku: "سێ خێزان و جۆرە باوەکانی ناوچەکە",
      en: "Three families and common species of the region",
      ar: "ثلاث فصائل وأنواع شائعة في المنطقة",
    },
    path: "orders",
  },
  {
    id: "ch7",
    num: { ku: "چاپتەری شەشەم", en: "Chapter 6", ar: "الفصل السادس" },
    icon: "beetle",
    image: "/images/plates/ch7-ladybird.jpg",
    focus: "center 42%",
    alt: {
      ku: "خاڵخاڵۆکەی حەوت خاڵ",
      ar: "دعسوقة ذات سبع نقاط",
      en: "Seven-spot ladybird",
    },
    latin: "Coleoptera",
    title: {
      ku: "قوڕقوڕەکان",
      en: "Beetles",
      ar: "الخنافس",
    },
    desc: {
      ku: "قاوغی باڵ، خاڵخاڵۆکە و جۆرەکانی ناوچەکە",
      en: "Elytra, ladybirds and regional species",
      ar: "الأغماد والدعسوقة وأنواع المنطقة",
    },
    path: "orders",
  },
  {
    id: "ch8",
    num: { ku: "چاپتەری حەوتەم", en: "Chapter 7", ar: "الفصل السابع" },
    icon: "fly",
    image: "/images/plates/ch8-mosquito.jpg",
    alt: {
      ku: "مێشوولەی Anopheles",
      ar: "بعوضة Anopheles",
      en: "Anopheles mosquito",
    },
    latin: "Diptera",
    title: {
      ku: "مێش و مێشوولە",
      en: "Flies and mosquitoes",
      ar: "الذباب والبعوض",
    },
    desc: {
      ku: "یەک جووت باڵ، مەلاریا و مێشی گوڵ",
      en: "One pair of wings, malaria and hoverflies",
      ar: "زوج أجنحة والملاريا وذباب الأزهار",
    },
    path: "orders",
  },
  {
    id: "ch10",
    num: { ku: "چاپتەری هەشتەم", en: "Chapter 8", ar: "الفصل الثامن" },
    icon: "bug",
    image: "/images/plates/ch10-bug.jpg",
    alt: {
      ku: "سنەی سەوزی Nezara viridula",
      ar: "بق أخضر Nezara viridula",
      en: "Green shield bug Nezara viridula",
    },
    latin: "Hemiptera",
    title: {
      ku: "شەتەک و سنە",
      en: "Aphids and true bugs",
      ar: "المن والبق",
    },
    desc: {
      ku: "دەمی کونکەر، و ئەو مێرووەی خاڵخاڵۆکە دەیخوات",
      en: "A piercing beak, and the insect a ladybird eats",
      ar: "فم ثاقب، والحشرة التي تأكلها الدعسوقة",
    },
    path: "orders",
  },
  {
    id: "ch11",
    num: { ku: "چاپتەری نۆیەم", en: "Chapter 9", ar: "الفصل التاسع" },
    icon: "dragon",
    image: "/images/plates/ch11-dragon.jpg",
    alt: {
      ku: "مێینەی مێرووی ئاوی Crocothemis erythraea",
      ar: "أنثى رعاش Crocothemis erythraea",
      en: "Female scarlet darter dragonfly",
    },
    latin: "Orthoptera · Odonata",
    title: {
      ku: "جڕوشک و مێرووی ئاو",
      en: "Grasshoppers and dragonflies",
      ar: "الجنادب والرعاشات",
    },
    desc: {
      ku: "بازدان، چاوی گەورە، و بچووکێک لە ناو ئاو",
      en: "A jump, a large eye, and a nymph in the water",
      ar: "قفزة وعين كبيرة وحورية في الماء",
    },
    path: "orders",
  },
  {
    id: "ch13",
    num: { ku: "چاپتەری دەیەم", en: "Chapter 10", ar: "الفصل العاشر" },
    icon: "lace",
    image: "/images/plates/ch13-lacewing.jpg",
    alt: {
      ku: "تۆڕباڵی سەوز Chrysoperla carnea",
      ar: "أسد المن الأخضر Chrysoperla carnea",
      en: "Green lacewing Chrysoperla carnea",
    },
    latin: "Neuroptera",
    title: {
      ku: "تۆڕباڵ",
      en: "Lacewings",
      ar: "أسد المن والشبكيات",
    },
    desc: {
      ku: "باڵی تۆڕاوی، و کۆڵۆکێک کە شەتەک دەخوات",
      en: "Netted wings, and a larva that eats aphids",
      ar: "أجنحة شبكية ويرقة تأكل المن",
    },
    path: "orders",
  },
  {
    id: "ch9",
    num: { ku: "چاپتەری یازدەهەم", en: "Chapter 11", ar: "الفصل الحادي عشر" },
    icon: "net",
    image: "/images/plates/ch9-net.jpg",
    focus: "center 62%",
    alt: {
      ku: "تۆڕی کۆکردنەوەی مێروو",
      ar: "شبكة جمع حشرات",
      en: "Insect collecting net",
    },
    title: {
      ku: "کێڵگە و لەیبڵ",
      en: "Field and label",
      ar: "الحقل والبطاقة",
    },
    desc: {
      ku: "کۆکردنەوە، شوێنی دەرزە و لەیبڵی نموونە",
      en: "Collecting, where to pin, and the specimen label",
      ar: "الجمع وموضع الدبوس وبطاقة العينة",
    },
    path: "practice",
  },
  {
    id: "ch12",
    num: { ku: "چاپتەری دوازدەهەم", en: "Chapter 12", ar: "الفصل الثاني عشر" },
    icon: "butterfly",
    image: "/images/plates/ch12-chrysalis.jpg",
    focus: "center 42%",
    alt: {
      ku: "پیتی سەوزی پەپوولەی Monarch",
      ar: "شرنقة خضراء لفراشة الملكة",
      en: "Monarch butterfly chrysalis",
    },
    title: {
      ku: "دوو گۆڕانەپەڕە",
      en: "Two metamorphoses",
      ar: "تحولان",
    },
    desc: {
      ku: "پیت هەیە، یان نییە",
      en: "A pupa, or none",
      ar: "شرنقة أو لا شرنقة",
    },
    path: "practice",
  },
  {
    id: "ch14",
    num: { ku: "چاپتەری سێزدەهەم", en: "Chapter 13", ar: "الفصل الثالث عشر" },
    icon: "key",
    image: "/images/plates/ch14-key.jpg",
    alt: {
      ku: "کۆکراوەی مێرووی دەرزکراو",
      ar: "مجموعة حشرات مثبتة",
      en: "Pinned insect collection",
    },
    title: {
      ku: "کلیلی ناسینەوە",
      en: "Identification key",
      ar: "مفتاح التعريف",
    },
    desc: {
      ku: "پرسیار بە پرسیار ئۆردەرەکە بدۆزەوە",
      en: "Find the order, one question at a time",
      ar: "اعثر على الرتبة سؤالاً بسؤال",
    },
    path: "practice",
  },
  {
    id: "ch4",
    num: { ku: "چاپتەری چواردەهەم", en: "Chapter 14", ar: "الفصل الرابع عشر" },
    icon: "card",
    image: "/images/plates/ch4-study.jpg",
    alt: {
      ku: "مێرووناس لەسەر کاشێف کار دەکات",
      ar: "عالم حشرات يعمل على درج عينات",
      en: "Entomologist studying a specimen drawer",
    },
    title: {
      ku: "کویز",
      en: "Quiz",
      ar: "اختبار",
    },
    desc: {
      ku: "تاقیکردنەوەی زانیاریت بە پرسیار و ڤیدیۆ",
      en: "Test your knowledge with questions & videos",
      ar: "اختبر معلوماتك بالأسئلة والفيديوهات",
    },
    path: "quiz",
  },
];

export const LEARNING_PATH = [
  {
    id: "start",
    title: { ku: "دەستپێک", ar: "البداية", en: "Start" },
    desc: { ku: "پرۆژە، پێناسە و جومگەپێ", ar: "المشروع والتعريف ومفصليات الأرجل", en: "Project, definition, arthropods" },
    chapters: ["ch1", "ch2", "ch3"],
  },
  {
    id: "orders",
    title: { ku: "ئۆردەرەکان", ar: "الرتب", en: "Orders" },
    desc: { ku: "پەپوولە تا تۆڕباڵ", ar: "من الفراشات إلى أسد المن", en: "From butterflies to lacewings" },
    chapters: ["ch5", "ch6", "ch7", "ch8", "ch10", "ch11", "ch13"],
  },
  {
    id: "practice",
    title: { ku: "کار و کلیل", ar: "العمل والمفتاح", en: "Field and key" },
    desc: { ku: "کێڵگە، گۆڕانەپەڕە و ناسینەوە", ar: "الحقل والتحول والتعريف", en: "Field, metamorphosis, identification" },
    chapters: ["ch9", "ch12", "ch14"],
  },
  {
    id: "quiz",
    title: { ku: "کویز", ar: "الاختبار", en: "Quiz" },
    desc: { ku: "تاقیکردنەوەی گشتی", ar: "اختبار عام", en: "Full knowledge check" },
    chapters: ["ch4"],
  },
];

export function chapterById(id) {
  return CHAPTERS.find((ch) => ch.id === id) || null;
}

export function chapterIndex(id) {
  return CHAPTERS.findIndex((ch) => ch.id === id);
}

export function neighbors(id) {
  const i = chapterIndex(id);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? CHAPTERS[i - 1] : null,
    next: i < CHAPTERS.length - 1 ? CHAPTERS[i + 1] : null,
  };
}

export function searchChapters(query, lang = "ku") {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return CHAPTERS;
  return CHAPTERS.filter((ch) => {
    const hay = [
      ch.id,
      ch.num.en,
      ch.num.ku,
      ch.num.ar,
      ch.title.ku,
      ch.title.ar,
      ch.title.en,
      ch.desc.ku,
      ch.desc.ar,
      ch.desc.en,
      ch.latin || "",
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
