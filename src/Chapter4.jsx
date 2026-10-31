import { useState, useRef, useEffect, useCallback } from "react";
import { Mark } from "./marks";

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

const QUIZ = [
  {
    id: 1,
    section: { ku: "بەشی یەکەم: پێناسە و مێژوو", ar: "القسم الأول: التعريف والتاريخ", en: "Section 1: Definition & History" },
    q: { ku: "وشەی Entomology لە بنەڕەتدا لە چ زمانێکەوە هاتووە؟", ar: "كلمة Entomology مشتقة أصلاً من أي لغة؟", en: "The word Entomology originally comes from which language?" },
    opts: { ku: ["لاتینی", "یۆنانی کۆن", "فەرەنسی", "ئەڵمانی"], ar: ["اللاتينية", "اليونانية القديمة", "الفرنسية", "الألمانية"], en: ["Latin", "Ancient Greek", "French", "German"] },
    correct: 1,
    why: { ku: "لە entomon (مێروو) و logia (زانست)ەوەیە، هەردووکیان یۆنانی کۆنن.", ar: "من entomon (حشرة) وlogia (علم)، وكلاهما يوناني قديم.", en: "It comes from entomon (insect) and logia (study), both Ancient Greek." },
  },
  {
    id: 2,
    section: { ku: "بەشی یەکەم: پێناسە و مێژوو", ar: "القسم الأول: التعريف والتاريخ", en: "Section 1: Definition & History" },
    q: { ku: "کام زانا بە داهێنەری ناوی دووانەی زانستی دادەنرێت؟", ar: "من يُعد واضع التسمية الثنائية؟", en: "Who set down binomial nomenclature?" },
    opts: { ku: ["Jan Swammerdam", "Charles Darwin", "Carl Linnaeus", "William Kirby"], ar: ["يان سوامردام", "تشارلز داروين", "كارل لينيوس", "وليام كيربي"], en: ["Jan Swammerdam", "Charles Darwin", "Carl Linnaeus", "William Kirby"] },
    correct: 2,
    why: { ku: "لە ١٧٥٨دا Linnaeus ناوی دووانەی جۆرەکانی داڕشت.", ar: "في ١٧٥٨ وضع لينيوس الاسم الثنائي للأنواع.", en: "In 1758 Linnaeus set down the two-part name of a species." },
  },
  {
    id: 3,
    section: { ku: "بەشی یەکەم: پێناسە و مێژوو", ar: "القسم الأول: التعريف والتاريخ", en: "Section 1: Definition & History" },
    q: { ku: "یەکەم وەسفی جیدیی کۆن بۆ مێرووەکان وەک گروپێکی جیا هی کێیە؟", ar: "من قدّم أول وصف قديم جاد للحشرات كمجموعة مستقلة؟", en: "Who first gave a serious ancient account of insects as their own group?" },
    opts: { ku: ["ئەرستۆ", "ئەفلاتون", "سوقرات", "فیساگۆرس"], ar: ["أرسطو", "أفلاطون", "سقراط", "فيثاغورس"], en: ["Aristotle", "Plato", "Socrates", "Pythagoras"] },
    correct: 0,
    why: { ku: "ئەرستۆ لە سەدەی چوارەمی پێش زایین مێرووەکانی وەک گروپێکی جیا وەسف کرد.", ar: "وصف أرسطو الحشرات كمجموعة مستقلة في القرن الرابع قبل الميلاد.", en: "Aristotle described insects as a group of their own in the fourth century BCE." },
  },
  {
    id: 4,
    section: { ku: "بەشی دووەم: پێکهاتەی جەستە", ar: "القسم الثاني: تركيب الجسم", en: "Section 2: Body plan" },
    q: { ku: "جەستەی مێروو لە چەند بەشی سەرەکی پێکدێت؟", ar: "كم قسماً رئيسياً في جسم الحشرة؟", en: "How many main regions does an insect body have?" },
    opts: { ku: ["٢ بەش", "٣ بەش", "٤ بەش", "٥ بەش"], ar: ["قسمان", "٣ أقسام", "٤ أقسام", "٥ أقسام"], en: ["2", "3", "4", "5"] },
    correct: 1,
    why: { ku: "سەر، سنگ و سک. ئەم دابەشبوونە پێی دەوترێت Tagmatization.", ar: "رأس وصدر وبطن. يسمى هذا التقسيم Tagmatization.", en: "Head, thorax, and abdomen. That division is called tagmatization." },
  },
  {
    id: 5,
    section: { ku: "بەشی دووەم: پێکهاتەی جەستە", ar: "القسم الثاني: تركيب الجسم", en: "Section 2: Body plan" },
    q: { ku: "پەیەکەری دەرەکی مێروو لە چ ماددەیەکە؟", ar: "من أي مادة الهيكل الخارجي للحشرة؟", en: "What is the insect exoskeleton made of?" },
    opts: { ku: ["کالیسیۆم", "کایتین (Chitin)", "سیلۆلۆز", "کەرەتین"], ar: ["كالسيوم", "كايتين (Chitin)", "سليلوز", "كيراتين"], en: ["Calcium", "Chitin", "Cellulose", "Keratin"] },
    correct: 1,
    why: { ku: "قاوغەکە لە کایتینە، و بۆ گەشەکردن دەتێڵێنرێت.", ar: "الدرع من الكايتين، وينسلخ الكائن لينمو.", en: "The shell is chitin, and the animal molts in order to grow." },
  },
  {
    id: 6,
    section: { ku: "بەشی دووەم: پێکهاتەی جەستە", ar: "القسم الثاني: تركيب الجسم", en: "Section 2: Body plan" },
    q: { ku: "مێروو چەند قاچی هەیە؟", ar: "كم رجلًا للحشرة؟", en: "How many legs does an insect have?" },
    opts: { ku: ["٤", "٦", "٨", "١٠"], ar: ["٤", "٦", "٨", "١٠"], en: ["4", "6", "8", "10"] },
    correct: 1,
    why: { ku: "شەش قاچ، واتە سێ جووت، لە سنگەوە دەردەچن.", ar: "ست أرجل، أي ثلاثة أزواج، تخرج من الصدر.", en: "Six legs, three pairs, attach to the thorax." },
  },
  {
    id: 7,
    section: { ku: "بەشی دووەم: پێکهاتەی جەستە", ar: "القسم الثاني: تركيب الجسم", en: "Section 2: Body plan" },
    q: { ku: "هەناسەی مێروو لە ڕێگەی چ سیستەمێکە؟", ar: "بأي جهاز تتنفس الحشرة؟", en: "How does an insect breathe?" },
    opts: { ku: ["سییە", "بۆری هەوایی (Tracheae)", "هەناسەی پێست وەک ڕێگەی سەرەکی", "خوەین"], ar: ["رئتان", "قصبات هوائية (Tracheae)", "تنفس جلدي كطريق رئيسي", "خياشيم"], en: ["Lungs", "Tracheae", "Skin as the main route", "Gills"] },
    correct: 1,
    why: { ku: "هەوا لە کونی Spiracles دێتە ناو بۆرییەکانی Tracheae و ڕاستەوخۆ دەگاتە خانەکان.", ar: "يدخل الهواء من الثغور إلى القصبات ويصل مباشرة إلى الخلايا.", en: "Air enters through spiracles into tracheae and reaches the tissues directly." },
  },
  {
    id: 8,
    section: { ku: "بەشی سێیەم: پۆلەکانی جومگەپێ", ar: "القسم الثالث: مجموعات المفصليات", en: "Section 3: Arthropod groups" },
    q: { ku: "کام گروپ ٨ قاچ و هیچ ئەنتێنایەکی نییە؟", ar: "أي مجموعة لها ٨ أرجل ولا قرون استشعار؟", en: "Which group has 8 legs and no antennae?" },
    opts: { ku: ["Insecta", "Crustacea", "Arachnida", "Myriapoda"], ar: ["الحشرات", "القشريات", "العنكبيات", "ذوات الأرجل الكثيرة"], en: ["Insecta", "Crustacea", "Arachnida", "Myriapoda"] },
    correct: 2,
    why: { ku: "جاڵجاڵۆکە و دووپشک Arachnida ن: هەشت قاچ، بەبێ ئەنتێنا.", ar: "العناكب والعقارب من العنكبيات: ثماني أرجل وبلا قرون استشعار.", en: "Spiders and scorpions are arachnids: eight legs and no antennae." },
  },
  {
    id: 9,
    section: { ku: "بەشی سێیەم: پۆلەکانی جومگەپێ", ar: "القسم الثالث: مجموعات المفصليات", en: "Section 3: Arthropod groups" },
    q: { ku: "Myriapoda چی لە خۆ دەگرێت؟", ar: "ماذا تضم Myriapoda؟", en: "What does Myriapoda include?" },
    opts: { ku: ["جاڵجاڵۆکە", "قوڕقوڕە", "هەزارپێ و سەپێ", "پەپوولە"], ar: ["العناكب", "الخنافس", "ألفية الأرجل ومئوية الأرجل", "الفراشات"], en: ["Spiders", "Beetles", "Millipedes and centipedes", "Butterflies"] },
    correct: 2,
    why: { ku: "هەزارپێ و سەپێ سەر و تەنێکی درێژیان هەیە و قاچی زۆریان لەسەرە.", ar: "لألفية الأرجل ومئوية الأرجل رأس وجذع طويل وأرجل كثيرة.", en: "Millipedes and centipedes have a head, a long trunk, and many legs." },
  },
  {
    id: 10,
    section: { ku: "بەشی سێیەم: پۆلەکانی جومگەپێ", ar: "القسم الثالث: مجموعات المفصليات", en: "Section 3: Arthropod groups" },
    q: { ku: "کام گروپ دوو جووت ئەنتێنای هەیە؟", ar: "أي مجموعة لها زوجان من قرون الاستشعار؟", en: "Which group has two pairs of antennae?" },
    opts: { ku: ["مێرووەکان", "جاڵجاڵۆکەییەکان", "Crustacea", "هەزارپێ"], ar: ["الحشرات", "العنكبيات", "القشريات (Crustacea)", "ألفية الأرجل"], en: ["Insects", "Arachnids", "Crustacea", "Millipedes"] },
    correct: 2,
    why: { ku: "قڕژاڵ و میگۆ دوو جووت ئەنتێنایان هەیە. مێروو یەک جووتە.", ar: "للسرطانات والروبيان زوجان من القرون. للحشرة زوج واحد.", en: "Crabs and shrimp have two pairs of antennae. An insect has one pair." },
  },
  {
    id: 11,
    section: { ku: "بەشی چوارەم: سوود و کۆنترۆڵ", ar: "القسم الرابع: النفع والمكافحة", en: "Section 4: Uses and control" },
    q: { ku: "بەکارهێنانی مێروو بۆ خەمڵاندنی کاتی مردن پێی دەوترێت:", ar: "يُسمى استخدام الحشرات لتقدير وقت الوفاة:", en: "Using insects to estimate time of death is called:" },
    opts: { ku: ["ئێنتۆمۆلۆجی کشتوکاڵی", "ئێنتۆمۆلۆجی دادوەری", "ئێنتۆمۆلۆجی پزیشکی", "ئێنتۆمۆلۆجی ئیکۆلۆجی"], ar: ["علم الحشرات الزراعي", "علم الحشرات الجنائي", "علم الحشرات الطبي", "علم الحشرات البيئي"], en: ["Agricultural entomology", "Forensic entomology", "Medical entomology", "Ecological entomology"] },
    correct: 1,
    why: { ku: "Forensic entomology سوڕی ژیانی مێروو بەکاردەهێنێت بۆ PMI.", ar: "علم الحشرات الجنائي يستخدم دورة حياة الحشرة لتقدير الفترة بعد الوفاة.", en: "Forensic entomology uses the insect life cycle to estimate the post-mortem interval." },
  },
  {
    id: 12,
    section: { ku: "بەشی چوارەم: سوود و کۆنترۆڵ", ar: "القسم الرابع: النفع والمكافحة", en: "Section 4: Uses and control" },
    q: { ku: "Bio-indicator مەبەست لێی چییە؟", ar: "ماذا يعني Bio-indicator؟", en: "What is a bio-indicator?" },
    opts: { ku: ["مێرووی زیانبەخشی کشتوکاڵ", "مێروو وەک پێوەری تەندروستی ژینگە", "مێرووی گۆشتخۆر", "گواستنەوەی نەخۆشی"], ar: ["آفة زراعية", "حشرة كمقياس لصحة البيئة", "حشرة لاحمة", "ناقل مرض"], en: ["A crop pest", "An insect used to read the health of a habitat", "A predatory insect", "A disease carrier"] },
    correct: 1,
    why: { ku: "ئامادەبوون یان نەبوونی هەندێک مێروو دەڵێت ژینگەکە چۆنە.", ar: "وجود بعض الحشرات أو غيابها يخبر عن حال الموطن.", en: "Which insects are present, or missing, tells you the state of the habitat." },
  },
  {
    id: 13,
    section: { ku: "بەشی چوارەم: سوود و کۆنترۆڵ", ar: "القسم الرابع: النفع والمكافحة", en: "Section 4: Uses and control" },
    q: { ku: "گواستنەوەی هەڵاڵە لە نێوان گوڵەکاندا پێی دەوترێت:", ar: "يُسمى نقل حبوب اللقاح بين الأزهار:", en: "Moving pollen between flowers is called:" },
    opts: { ku: ["شیبوونەوە", "گۆڕانەپەڕە", "پەیتاندن", "هەناسە"], ar: ["تحلل", "تحول", "تلقيح", "تنفس"], en: ["Decomposition", "Metamorphosis", "Pollination", "Respiration"] },
    correct: 2,
    why: { ku: "پەیتاندن گواستنەوەی هەڵاڵەیە. زۆرێک لە مێرووەکان ئەم کارە دەکەن.", ar: "التلقيح هو نقل حبوب اللقاح، وتقوم به كثير من الحشرات.", en: "Pollination is the transfer of pollen, and many insects do it." },
  },
  {
    id: 14,
    section: { ku: "بەشی چوارەم: سوود و کۆنترۆڵ", ar: "القسم الرابع: النفع والمكافحة", en: "Section 4: Uses and control" },
    q: { ku: "کامەیان نمونەی کۆنترۆڵی بایۆلۆجییە؟", ar: "أي مما يلي مثال على المكافحة الحيوية؟", en: "Which of these is biological control?" },
    opts: { ku: ["ڕشاندنی پێستیساید بە تەنها", "خاڵخاڵۆکە کە شەتەک دەخوات", "سوتاندنی کێڵگە", "هێنانی ڕووەکێکی نامۆ"], ar: ["رش المبيد وحده", "دعسوقة تأكل المن", "حرق الحقل", "إدخال نبات غريب"], en: ["Spraying pesticide alone", "A ladybird eating aphids", "Burning a field", "Bringing in a foreign plant"] },
    correct: 1,
    why: { ku: "خاڵخاڵۆکە (Coccinellidae) زیندەوەرێکی سوودبەخشە کە شەتەک دەخوات.", ar: "الدعسوقة كائن نافع يأكل المن.", en: "A ladybird is a living helper that eats aphids." },
  },
  {
    id: 15,
    section: { ku: "بەشی پێنجەم: مێروولە و کوردستان", ar: "القسم الخامس: النمل وكردستان", en: "Section 5: Ants and Kurdistan" },
    q: { ku: "مێروولە سەر بە کام ئۆردەرە؟", ar: "إلى أي رتبة ينتمي النمل؟", en: "Ants belong to which order?" },
    opts: { ku: ["Coleoptera", "Lepidoptera", "Hymenoptera", "Diptera"], ar: ["غمديات الأجنحة", "حرشفيات الأجنحة", "غشائيات الأجنحة", "ثنائيات الأجنحة"], en: ["Coleoptera", "Lepidoptera", "Hymenoptera", "Diptera"] },
    correct: 2,
    why: { ku: "مێروولە لە خێزانی Formicidae و ئۆردەری Hymenoptera ـە.", ar: "النمل من فصيلة Formicidae ورتبة Hymenoptera.", en: "Ants are in the family Formicidae, order Hymenoptera." },
  },
  {
    id: 16,
    section: { ku: "بەشی پێنجەم: مێروولە و کوردستان", ar: "القسم الخامس: النمل وكردستان", en: "Section 5: Ants and Kurdistan" },
    q: { ku: "کۆمەڵگەی مێروولە لە کێ پێکدێت؟", ar: "ممَّ تتكون مستعمرة النمل؟", en: "An ant colony is made of:" },
    opts: { ku: ["تەنها کارگەر", "مالکە، کارگەر و نێر", "تەنها نێر", "دوو جۆر لارڤا"], ar: ["عمال فقط", "ملكة وعمال وذكور", "ذكور فقط", "نوعان من اليرقات"], en: ["Workers only", "A queen, workers, and males", "Males only", "Two kinds of larvae"] },
    correct: 1,
    why: { ku: "ئەم ڕێکخستنە پێی دەوترێت Eusociality.", ar: "يسمى هذا التنظيم Eusociality.", en: "That arrangement is called eusociality." },
  },
  {
    id: 17,
    section: { ku: "بەشی پێنجەم: مێروولە و کوردستان", ar: "القسم الخامس: النمل وكردستان", en: "Section 5: Ants and Kurdistan" },
    q: { ku: "مێروولەی گەڵابڕ (Leafcutter) هی کوێیە؟", ar: "أين يعيش نمل قاطع الأوراق؟", en: "Where do leafcutter ants live?" },
    opts: { ku: ["کوردستان", "ئەمریکای گەرم", "ئەوروپای باکوور", "بیابانی عەرەب"], ar: ["كردستان", "أمريكا المدارية", "شمال أوروبا", "الصحراء العربية"], en: ["Kurdistan", "Tropical America", "Northern Europe", "The Arabian desert"] },
    correct: 1,
    why: { ku: "قارچک دەچێنن، بەڵام گروپێکی ئەمریکای گەرمەن و جۆری کوردستان نین.", ar: "يزرعون الفطر، لكنهم مجموعة أمريكية مدارية وليسوا من نمل كردستان.", en: "They farm fungus, but they are a tropical American group, not Kurdistan ants." },
  },
  {
    id: 18,
    section: { ku: "بەشی شەشەم: پەپوولەکان", ar: "القسم السادس: الفراشات", en: "Section 6: Butterflies" },
    q: { ku: "ناوی Lepidoptera لە چییەوە هاتووە؟", ar: "من أين جاء اسم Lepidoptera؟", en: "What does the name Lepidoptera refer to?" },
    opts: { ku: ["شەش قاچ", "قاو و باڵ", "دوو باڵ", "بێ باڵ"], ar: ["ست أرجل", "حرشفة وجناح", "جناحان", "بلا أجنحة"], en: ["Six legs", "Scale and wing", "Two wings", "No wings"] },
    correct: 1,
    why: { ku: "lepís قاوە و pterón باڵە. قاوەکان ڕووپۆشی باڵن.", ar: "lepís حرشفة وpterón جناح. الحراشف تغطي الجناح.", en: "Lepís is a scale and pterón is a wing. Scales cover the wing." },
  },
  {
    id: 19,
    section: { ku: "بەشی شەشەم: پەپوولەکان", ar: "القسم السادس: الفراشات", en: "Section 6: Butterflies" },
    q: { ku: "گۆڕانەپەڕەی تەواوی پەپوولە چەند قۆناغە؟", ar: "كم مرحلة في التحول الكامل للفراشة؟", en: "How many stages are in a butterfly’s complete metamorphosis?" },
    opts: { ku: ["٢", "٣", "٤", "٥"], ar: ["٢", "٣", "٤", "٥"], en: ["2", "3", "4", "5"] },
    correct: 2,
    why: { ku: "هێلکە، کۆڵۆک، پیت و پەپوولەی گەورە.", ar: "بيضة ويرقة وشرنقة وحشرة بالغة.", en: "Egg, caterpillar, chrysalis, and adult." },
  },
  {
    id: 20,
    section: { ku: "بەشی شەشەم: پەپوولەکان", ar: "القسم السادس: الفراشات", en: "Section 6: Butterflies" },
    q: { ku: "کام جۆر لە تۆماری پەپوولەی کوردستاندا هاتووە؟", ar: "أي نوع ورد في سجل فراشات كردستان؟", en: "Which species is named in the Kurdistan butterfly record?" },
    opts: { ku: ["Morpho menelaus", "Attacus atlas", "Papilio machaon", "Danaus plexippus"], ar: ["Morpho menelaus", "Attacus atlas", "Papilio machaon", "Danaus plexippus"], en: ["Morpho menelaus", "Attacus atlas", "Papilio machaon", "Danaus plexippus"] },
    correct: 2,
    why: { ku: "Papilio machaon لە لیستی ناوچەکەدایە. Morpho و Atlas Moth و Monarch نمونەی جیهانین.", ar: "Papilio machaon في قائمة المنطقة. مورفو وعثة الأطلس والملكة نماذج عالمية.", en: "Papilio machaon is on the regional list. Morpho, the atlas moth, and the monarch are world examples." },
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

const TIMER_SEC = 30;

function QuizSection({ lang }) {
  const isRtl = lang !== "en";
  const [phase, setPhase]       = useState("idle");   // idle | active | result
  const [idx, setIdx]           = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers]   = useState([]);        // array of chosen index | null
  const [timer, setTimer]       = useState(TIMER_SEC);
  const timerRef                = useRef(null);
  const sectionRef              = useRef(null);

  const q = QUIZ[idx];

  const advance = useCallback((chosen) => {
    clearInterval(timerRef.current);
    const next = [...answers, chosen];
    setAnswers(next);
    setSelected(chosen);
    setTimeout(() => {
      if (idx + 1 < QUIZ.length) {
        setIdx(i => i + 1);
        setSelected(null);
        setTimer(TIMER_SEC);
      } else {
        setPhase("result");
      }
    }, 2400);
  }, [idx, answers]);

  useEffect(() => {
    if (phase !== "active") return;
    setTimer(TIMER_SEC);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { advance(null); return TIMER_SEC; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, idx, advance]);

  const start = () => {
    setIdx(0); setSelected(null); setAnswers([]);
    setTimer(TIMER_SEC); setPhase("active");
    setTimeout(() => sectionRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 100);
  };
  const restart = () => { setPhase("idle"); };

  const score = answers.filter((a, i) => a === QUIZ[i].correct).length;
  const pct   = Math.round((score / QUIZ.length) * 100);
  const grade = pct >= 90 ? { ku:"زۆر باش 🏆", ar:"ممتاز 🏆", en:"Excellent 🏆" }
              : pct >= 70 ? { ku:"باش 👏",       ar:"جيد 👏",   en:"Good 👏" }
              : pct >= 50 ? { ku:"مامناوەند 📚", ar:"متوسط 📚", en:"Average 📚" }
              :             { ku:"دووبارە هەوڵ بدە 💪", ar:"حاول مرة أخرى 💪", en:"Try Again 💪" };

  const timerPct = (timer / TIMER_SEC) * 100;
  const timerColor = timer > 15 ? "#22c55e" : timer > 7 ? "#f59e0b" : "#ef4444";

  return (
    <section ref={sectionRef} id="quiz" className="ento-quiz-section" dir={isRtl ? "rtl" : "ltr"}>
      <div className="ento-quiz-header">
        <span className="ento-quiz-icon">🧠</span>
        <div>
          <h2 className="ento-quiz-title">
            {lang === "ku" ? "تاقیکردنەوەی زانیاری" : lang === "ar" ? "اختبر معلوماتك" : "Test Your Knowledge"}
          </h2>
          <p className="ento-quiz-sub">
            {lang === "ku" ? `${QUIZ.length} پرسیار · هەر پرسیارێک ${TIMER_SEC} چرکە`
             : lang === "ar" ? `${QUIZ.length} سؤال · ${TIMER_SEC} ثانية لكل سؤال`
             : `${QUIZ.length} questions · ${TIMER_SEC} seconds per question`}
          </p>
        </div>
      </div>

      {/* ── IDLE ── */}
      {phase === "idle" && (
        <div className="ento-quiz-idle">
          <p className="ento-quiz-idle-desc">
            {lang === "ku"
              ? "تاقیکردنەوەکە ٦ بەش و ٢٠ پرسیاری تێدایە. هەر وەڵامی ڕاست ١ نمرە."
              : lang === "ar"
              ? "يحتوي الاختبار على ٦ أقسام و٢٠ سؤالاً. كل إجابة صحيحة = نقطة واحدة."
              : "The quiz has 6 sections and 20 questions. Each correct answer = 1 point."}
          </p>
          <button className="ento-quiz-start-btn" onClick={start}>
            {lang === "ku" ? "▶ دەستپێکردن" : lang === "ar" ? "▶ ابدأ الاختبار" : "▶ Start Quiz"}
          </button>
        </div>
      )}

      {/* ── ACTIVE ── */}
      {phase === "active" && (
        <div className="ento-quiz-active">
          {/* progress bar */}
          <div className="ento-quiz-progress-row">
            <span className="ento-quiz-prog-label">
              {lang === "ku" ? `پرسیار ${idx + 1} / ${QUIZ.length}` : lang === "ar" ? `السؤال ${idx + 1} / ${QUIZ.length}` : `Question ${idx + 1} / ${QUIZ.length}`}
            </span>
            <span className="ento-quiz-score-live">
              {lang === "ku" ? `نمرە: ${answers.filter((a,i)=>a===QUIZ[i].correct).length}` : lang === "ar" ? `النقاط: ${answers.filter((a,i)=>a===QUIZ[i].correct).length}` : `Score: ${answers.filter((a,i)=>a===QUIZ[i].correct).length}`}
            </span>
          </div>
          <div className="ento-quiz-bar-wrap">
            <div className="ento-quiz-bar-fill" style={{ width:`${((idx)/QUIZ.length)*100}%` }} />
          </div>

          {/* section badge */}
          <div className="ento-quiz-section-badge">{q.section[lang]}</div>

          {/* timer */}
          <div className="ento-quiz-timer-row">
            <div className="ento-quiz-timer-ring">
              <svg viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="4"/>
                <circle cx="22" cy="22" r="18" fill="none" stroke={timerColor} strokeWidth="4"
                  strokeDasharray={`${2*Math.PI*18}`}
                  strokeDashoffset={`${2*Math.PI*18*(1-timerPct/100)}`}
                  strokeLinecap="round"
                  style={{ transition:"stroke-dashoffset 1s linear, stroke .4s" }}
                  transform="rotate(-90 22 22)"
                />
                <text x="22" y="27" textAnchor="middle" fontSize="11" fill={timerColor} fontWeight="700">{timer}</text>
              </svg>
            </div>
            <div className="ento-quiz-q-text">{q.q[lang]}</div>
          </div>

          {/* options */}
          <div className="ento-quiz-opts">
            {q.opts[lang].map((opt, i) => {
              let cls = "ento-quiz-opt";
              if (selected !== null) {
                if (i === q.correct)  cls += " ento-opt-correct";
                else if (i === selected) cls += " ento-opt-wrong";
                else cls += " ento-opt-dim";
              }
              return (
                <button key={i} className={cls}
                  disabled={selected !== null}
                  onClick={() => advance(i)}>
                  <span className="ento-opt-letter">{(lang === "en" ? ["A","B","C","D"] : ["أ","ب","ج","د"])[i]}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
          {selected !== null && <p className="ento-quiz-why">{q.why[lang]}</p>}
        </div>
      )}

      {/* ── RESULT ── */}
      {phase === "result" && (
        <div className="ento-quiz-result">
          <div className="ento-quiz-score-circle">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(245,158,11,.15)" strokeWidth="10"/>
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--accent-bright)" strokeWidth="10"
                strokeDasharray={`${2*Math.PI*52}`}
                strokeDashoffset={`${2*Math.PI*52*(1-pct/100)}`}
                strokeLinecap="round" transform="rotate(-90 60 60)"
                style={{ transition:"stroke-dashoffset 1.2s ease" }}
              />
              <text x="60" y="52" textAnchor="middle" fontSize="26" fill="var(--accent-bright)" fontWeight="900">{score}</text>
              <text x="60" y="70" textAnchor="middle" fontSize="13" fill="rgba(255,255,255,.5)">/ {QUIZ.length}</text>
            </svg>
          </div>
          <div className="ento-quiz-grade">{grade[lang]}</div>
          <div className="ento-quiz-pct">{pct}%</div>

          {/* answers review */}
          <div className="ento-quiz-review">
            <h3 className="ento-quiz-review-title">
              {lang === "ku" ? "پشکنینی وەڵامەکان" : lang === "ar" ? "مراجعة الإجابات" : "Answer Review"}
            </h3>
            {QUIZ.map((qq, i) => {
              const isRight = answers[i] === qq.correct;
              return (
                <div key={qq.id} className={`ento-quiz-rev-item ${isRight ? "ento-rev-right" : "ento-rev-wrong"}`}>
                  <div className="ento-rev-top">
                    <span className="ento-rev-num">{qq.id}</span>
                    <span className="ento-rev-icon">{isRight ? "✓" : "✗"}</span>
                    <span className="ento-rev-q">{qq.q[lang]}</span>
                  </div>
                  {!isRight && (
                    <div className="ento-rev-answer">
                      {lang === "ku" ? "وەڵامی ڕاست: " : lang === "ar" ? "الإجابة الصحيحة: " : "Correct answer: "}
                      <strong>{qq.opts[lang][qq.correct]}</strong>
                    </div>
                  )}
                  <div className="ento-rev-answer">{qq.why[lang]}</div>
                </div>
              );
            })}
          </div>

          <button className="ento-quiz-start-btn" onClick={restart} style={{ marginTop:24 }}>
            {lang === "ku" ? "↺ دووبارە هەوڵدان" : lang === "ar" ? "↺ إعادة الاختبار" : "↺ Retry Quiz"}
          </button>
        </div>
      )}
    </section>
  );
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

function AppFooter({ lang }) {
  return (
    <footer className="ento-footer">
        <div className="ento-footer-inner" dir={lang === "en" ? "ltr" : "rtl"}>

          {/* Col 1 — Project */}
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

          {/* Col 2 — Academic Info */}
          <div className="ento-footer-col" dir={lang === "en" ? "ltr" : "rtl"} style={{ textAlign: lang === "en" ? "left" : "right" }}>
            <div className="ento-footer-col-title">
              {lang === "ku" ? "زانیاری ئەکادیمی" : lang === "ar" ? "المعلومات الأكاديمية" : "Academic Info"}
            </div>
            <div className="ento-footer-info-row">
              {[
                {
                  labelKu: "بەش", labelAr: "القسم", labelEn: "Department",
                  value: lang === "ku" ? "بایۆلۆجی" : lang === "ar" ? "علوم بايولوجي" : "Biology",
                },
                {
                  labelKu: "زانکۆ", labelAr: "الجامعة", labelEn: "University",
                  value: lang === "ku" ? "زانکۆی ڕاپەڕین" : lang === "ar" ? "جامعة رابرين" : "Raparin University",
                },
                {
                  labelKu: "بابەت", labelAr: "المادة", labelEn: "Course",
                  value: lang === "ku" ? "ئێنتۆمۆلۆجی" : lang === "ar" ? "علم الحشرات" : "Entomology",
                },
                {
                  labelKu: "ساڵ", labelAr: "السنة", labelEn: "Year",
                  value: "2025 – 2026",
                },
                {
                  labelKu: "زمان", labelAr: "اللغة", labelEn: "Language",
                  value: "کوردی · عربی · English",
                },
              ].map(item => (
                <div key={item.labelEn} className="ento-footer-info-item" dir={lang === "en" ? "ltr" : "rtl"} style={{ justifyContent: "space-between", width: "100%" }}>
                  {lang === "en" ? (
                    <>
                      <span className="ento-footer-info-label">{item.labelEn}</span>
                      <span className="ento-footer-info-sep">:</span>
                      <span className="ento-footer-info-value">{item.value}</span>
                    </>
                  ) : (
                    <>
                      <span className="ento-footer-info-value">{item.value}</span>
                      <span style={{ display: "flex", gap: "4px" }}>
                        <span className="ento-footer-info-sep">:</span>
                        <span className="ento-footer-info-label">{lang === "ku" ? item.labelKu : item.labelAr}</span>
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Col 3 — Quick Links */}
          <div className="ento-footer-col">
            <div className="ento-footer-col-title">
              {lang === "ku" ? "لینکە خێراکان" : lang === "ar" ? "روابط سريعة" : "Quick Links"}
            </div>
            <div className="ento-footer-links">
              {[
                { href: "https://gov.krd/mohe/",                             ku: "وەزارەتی خوێندنی باڵا و توێژینەوەی زانستی",    ar: "وزارة التعليم العالي والبحث العلمي",        en: "Ministry of Higher Ed. & Scientific Research" },
                { href: "https://uor.edu.krd/en/",                           ku: "زانکۆی ڕاپەڕین",           ar: "جامعة رابرين",                en: "University of Raparin" },
                { href: "https://sci.uor.edu.krd/en/",                       ku: "کۆلێژی زانست",             ar: "كلية العلوم",                 en: "College of Science" },
                { href: "https://sci.uor.edu.krd/en/departments/biology/",   ku: "بەشی بایۆلۆجی",            ar: "قسم علوم بايولوجي",              en: "Biology Department" },
                { href: "https://scence-bio.github.io/Biology/",             ku: "BioGuide",         ar: "BioGuide",             en: "BioGuide" },
              ].map(link => (
                <a key={link.href} className="ento-footer-link" href={link.href} target="_blank" rel="noopener noreferrer">
                  <span className="ento-footer-link-arrow">{lang === "en" ? "→" : "←"}</span>
                  <span>{lang === "ku" ? link.ku : lang === "ar" ? link.ar : link.en}</span>
                </a>
              ))}
              {/* BioGuide — two-line entry */}
              <a className="ento-footer-link ento-footer-link-bioguide" href="https://scence-bio.github.io/library/" target="_blank" rel="noopener noreferrer">
                <span className="ento-footer-link-arrow">{lang === "en" ? "→" : "←"}</span>
                <span className="ento-footer-link-bioguide-inner">
                  <span className="ento-footer-link-bioguide-name">
                    {lang === "ku" ? "کتێبخانەی ئەلیکترۆنی کۆلێژی زانست"
                     : lang === "ar" ? "المكتبة الإلكترونية لكلية العلوم"
                     : "e-Library of College of Science"}
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* Col 4 — Sections */}
          <div className="ento-footer-col">
            <div className="ento-footer-col-title">
              {lang === "ku" ? "بەشەکان" : lang === "ar" ? "الأقسام" : "Sections"}
            </div>
            <div className="ento-footer-links">
              {SECTIONS.map(s => (
                <a key={s.id} className="ento-footer-link" href={`#${s.id}`}>
                  <span className="ento-footer-link-arrow">{lang === "en" ? "→" : "←"}</span>
                  <span>{s.titles[lang]} {s.icon}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        <hr className="ento-footer-divider" />

        <div className="ento-footer-bottom" style={{ direction: "ltr" }}>
          <span className="ento-footer-copy">© 2025 Atlas of Entomology · Academic Reference · All rights reserved</span>
        </div>
      </footer>
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
        <div className="ento-chapter-hero-num">{lang === "ku" ? "چاپتەری چوارەم" : lang === "ar" ? "الفصل الرابع" : "Chapter 4"}</div>
        <span className="ento-chapter-hero-icon"><Mark name="card" /></span>
        <div className="ento-chapter-hero-title">
          {lang === "ku" ? "کویز" : lang === "ar" ? "اختبار" : "Quiz"}
        </div>
        <div className="ento-chapter-hero-en">Quiz · کویز · اختبار</div>
      </div>
      <QuizSection lang={lang} />
      <VideoSection lang={lang} />
      <AppFooter lang={lang} />
    </div>
  );
}

