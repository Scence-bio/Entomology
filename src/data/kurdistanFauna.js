/**
 * Kurdistan / Iraq entomofauna ledger — peer-reviewed regional literature
 * with equal Kurdish · Arabic · English academic framing.
 */

export const LEDGER_META = {
  title: {
    ku: "تۆماری فەونای مێرووی کوردستان",
    ar: "سجل فونة حشرات كردستان",
    en: "Kurdistan Entomofauna Ledger",
  },
  subtitle: {
    ku: "پوختەی ئەکادیمی لە توێژینەوەی ناوچەیی و داتابەسی جیهانی",
    ar: "خلاصة أكاديمية من الأبحاث الإقليمية وقواعد البيانات العالمية",
    en: "An academic digest of regional research and global databases",
  },
  preamble: {
    ku: "ئەم تۆمارە فەرمییە کۆدەکاتەوە ئەو بەڵگە زانستییانەی کە لەسەر فەونای مێرووی هەرێمی کوردستان و عێراق بڵاوکراونەتەوە — بەتایبەت توێژینەوەی زانکۆکانی ناوچەکە — و دەیانبەستێتەوە بە GBIF و پۆلێنی نێودەوڵەتی. مەبەست فێرکاریی باڵایە، نەک جێگرتنەوەی چکلیستی تەواوی تاکسۆنۆمی.",
    ar: "يجمع هذا السجل الرسمي الأدلة المنشورة عن فونة الحشرات في إقليم كردستان والعراق — ولا سيما أبحاث جامعات المنطقة — ويربطها بـ GBIF والتصنيف الدولي. الغرض تعليمي جامعي، لا أن يحل محل قائمة تصنيفية كاملة.",
    en: "This formal ledger compiles published evidence on the insect fauna of the Kurdistan Region and Iraq — especially work from regional universities — and links it to GBIF and international taxonomy. It is an undergraduate teaching instrument, not a substitute for a complete taxonomic catalogue.",
  },
};

/** Peer-reviewed / museum surveys with trilingual findings of equal depth. */
export const FAUNAL_STUDIES = [
  {
    id: "geometridae-kr-2025",
    taxon: "Geometridae",
    order: "Lepidoptera",
    year: 2025,
    venue: "Zootaxa",
    authors: "Khudhur, Hula & Hausmann",
    affiliation: {
      ku: "زانکۆی سلێمانی · کۆلێژی زانست · بەشی بایۆلۆجی (+ هاوکارانی نێودەوڵەتی)",
      ar: "جامعة السليمانية · كلية العلوم · قسم علوم الحياة (+ متعاونون دوليون)",
      en: "University of Sulaimani · College of Science · Biology (+ international collaborators)",
    },
    title: {
      ku: "تۆماری Geometridaeی کوردستانی عێراق",
      ar: "جرد Geometridae في كردستان العراق",
      en: "Inventory of geometrid moths of Iraqi Kurdistan",
    },
    finding: {
      ku: "١٣٤ جۆر لە پێنج ژێرخێزان؛ ٦٤ جۆر بۆ یەکەمجار بۆ فەونای Lepidopteraی عێراق تۆمار کراون. کۆکردنەوە بە light trap لە سلێمانی، هەولێر، کەرکووک و هەڵەبجە (٢٠٢١–٢٠٢٥). دوو تاکسۆن بۆ ئاستی جۆر بەرزکرانەوە بەپێی مۆرفۆلۆجی و بەڵگەی گەردی.",
      ar: "١٣٤ نوعاً في خمس تحت-فصائل؛ ٦٤ نوعاً تسجيلاً جديداً لفونة Lepidoptera العراق. الجمع بمصائد ضوئية في السليمانية وأربيل وكركوك وحلبجة (٢٠٢١–٢٠٢٥). رُفع وضع نوعين إلى رتبة النوع بأدلة شكلية وجزيئية.",
      en: "134 species in five subfamilies; 64 are new records for Iraq’s Lepidoptera. Light-trap surveys across Sulaymaniyah, Erbil, Kirkuk and Halabja (2021–2025). Two taxa elevated to species rank on morphological and molecular evidence.",
    },
    metrics: [
      { ku: "١٣٤ جۆر", ar: "١٣٤ نوعاً", en: "134 species" },
      { ku: "٦٤ تۆماری نوێ بۆ عێراق", ar: "٦٤ سجلاً جديداً للعراق", en: "64 new to Iraq" },
    ],
    url: "https://doi.org/10.11646/zootaxa.5875.1.1",
  },
  {
    id: "erbil-butterflies-2018",
    taxon: "Papilionoidea / Hesperioidea",
    order: "Lepidoptera",
    year: 2018,
    venue: "Turkish Journal of Agricultural Research",
    authors: "Erbil Province survey",
    affiliation: {
      ku: "پارێزگای هەولێر · باکووری عێراق",
      ar: "محافظة أربيل · شمال العراق",
      en: "Erbil Province · northern Iraq",
    },
    title: {
      ku: "فەونای پەپوولەی پارێزگای هەولێر",
      ar: "فونة فراشات محافظة أربيل",
      en: "Butterfly fauna of Erbil Province",
    },
    finding: {
      ku: "یەکەم لێکۆڵینەوەی تایبەت بە پەپوولەی هەولێر: ١٢٤٠ نمونە هەڵسەنگێنران؛ ٥٥ جۆر لە Papilionoidea و Hesperioidea. ناوی زانستیی قبوڵکراو، شوێنی کۆکردنەوە و دابەشبوونی ناوچەیی بۆ هەر جۆرێک دراوە.",
      ar: "أول دراسة مخصصة لفراشات أربيل: تقييم ١٢٤٠ عينة؛ ٥٥ نوعاً من Papilionoidea وHesperioidea. أُدرجت الأسماء العلمية المقبولة ومواقع الجمع والتوزيع لكل نوع.",
      en: "First dedicated Erbil butterfly survey: 1,240 specimens assessed; 55 species of Papilionoidea and Hesperioidea, with accepted names, localities and regional distributions.",
    },
    metrics: [
      { ku: "٥٥ جۆر", ar: "٥٥ نوعاً", en: "55 species" },
      { ku: "١٢٤٠ نمونە", ar: "١٢٤٠ عينة", en: "1,240 specimens" },
    ],
    url: "https://dergipark.org.tr/en/pub/tutad/article/369079",
  },
  {
    id: "sulaymaniyah-butterflies",
    taxon: "Papilionoidea",
    order: "Lepidoptera",
    year: 2022,
    venue: "Biodiversity Data Journal",
    authors: "Sulaymaniyah Province survey",
    affiliation: {
      ku: "پارێزگای سلێمانی · هەرێمی کوردستان",
      ar: "محافظة السليمانية · إقليم كردستان",
      en: "Sulaymaniyah Province · Kurdistan Region",
    },
    title: {
      ku: "لێکۆڵینەوەی فەونای پەپوولەی سلێمانی",
      ar: "دراسة فونية لفراشات السليمانية",
      en: "Faunistic study of butterflies of Sulaymaniyah",
    },
    finding: {
      ku: "یەکەم لێکۆڵینەوەی چڕی فەونای پەپوولەی سلێمانی (٢٠١٦–٢٠٢١): ١٠٣ جۆر لە پێنج خێزان لە ٣٤ شوێن؛ هەشت جۆر تۆماری نوێ بۆ فەونای پەپوولەی عێراق. نمونەکان لە تاقیگەی مێرووناسیی زانکۆی سلێمانی پارێزراون.",
      ar: "أول دراسة فونية مكثفة لفراشات السليمانية (٢٠١٦–٢٠٢١): ١٠٣ أنواعاً في خمس فصائل من ٣٤ موقعاً؛ ثمانية أنواع سجلات جديدة لفونة فراشات العراق. العينات محفوظة في مختبر الحشرات بجامعة السليمانية.",
      en: "First intensive Sulaymaniyah butterfly survey (2016–2021): 103 species in five families from 34 localities; eight species new to Iraq’s butterfly fauna. Specimens deposited in the University of Sulaimani entomology laboratory.",
    },
    metrics: [
      { ku: "١٠٣ جۆر", ar: "١٠٣ نوعاً", en: "103 species" },
      { ku: "٨ تۆماری نوێ بۆ عێراق", ar: "٨ سجلات جديدة للعراق", en: "8 new to Iraq" },
      { ku: "٣٤ شوێن", ar: "٣٤ موقعاً", en: "34 localities" },
    ],
    url: "https://doi.org/10.3897/BDJ.10.e82612",
  },
  {
    id: "weevils-kr-2019",
    taxon: "Curculionoidea",
    order: "Coleoptera",
    year: 2019,
    venue: "Bulletin of the Iraq Natural History Museum",
    authors: "Akrawi & Mahmoud",
    affiliation: {
      ku: "زانکۆی دهۆک · کۆلێژی کشتوکاڵ · پاراستنی ڕووەک",
      ar: "جامعة دهوك · كلية الزراعة · وقاية النبات",
      en: "University of Duhok · College of Agriculture · Plant Protection",
    },
    title: {
      ku: "ڕووپێویی قوڕقوڕەی لوولەدەم (weevils) لە کوردستان",
      ar: "مسح السوس (Curculionoidea) في كردستان",
      en: "Survey of weevils from Kurdistan Region localities",
    },
    finding: {
      ku: "یەکەم توێژینەوەی تەرکیزکراو لەسەر Curculionoideaی هەرێم: ٤١ جۆر لە ٢٨ جێنوس، ٢١ تیرە و ٣ خێزان؛ ٢٥ جۆر تۆماری نوێ بۆ فەونای عێراق. پەیوەندیی ڕووەک و شوێنی کۆکردنەوە بۆ هەر جۆرێک دراوە.",
      ar: "أول دراسة مركزة على Curculionoidea في الإقليم: ٤١ نوعاً في ٢٨ جنساً و٢١ قبيلة و٣ فصائل؛ ٢٥ نوعاً سجلاً جديداً لفونة العراق. ذُكر الارتباط النباتي ومواقع الجمع لكل نوع.",
      en: "First focused Curculionoidea study for the Region: 41 species in 28 genera, 21 tribes and 3 families; 25 species new to Iraq. Plant associations and localities are provided for each species.",
    },
    metrics: [
      { ku: "٤١ جۆر", ar: "٤١ نوعاً", en: "41 species" },
      { ku: "٢٥ تۆماری نوێ", ar: "٢٥ سجلاً جديداً", en: "25 new to Iraq" },
    ],
    url: "https://doi.org/10.26842/binhm.7.2019.15.3.0319",
  },
  {
    id: "ephemeroptera-iraq-2021",
    taxon: "Ephemeroptera",
    order: "Ephemeroptera",
    year: 2021,
    venue: "Biodiversity Data Journal",
    authors: "Updated Iraq mayfly checklist",
    affiliation: {
      ku: "ڕووپێوی کێڵگە لە کوردستانی عێراق + پێداچوونەوەی ئەدەبیات",
      ar: "مسح حقلي في كردستان العراق + مراجعة الأدبيات",
      en: "Iraqi Kurdistan field survey + literature revision",
    },
    title: {
      ku: "چکلیستی نوێکراوەی مێشوولەی ئاو (mayflies)ی عێراق",
      ar: "قائمة محدثة لذباب مايو في العراق",
      en: "Updated checklist of the mayflies of Iraq",
    },
    finding: {
      ku: "٣٧ جۆر بۆ عێراق لیست کراون؛ ٩ جۆر نوێ بۆ وڵات. گرنگی bioindicator بۆ کوالێتی ئاو (EPT) لە وانەی ئیکۆلۆجیدا ڕوون دەکرێتەوە.",
      ar: "٣٧ نوعاً للعراق؛ ٩ أنواع جديدة للبلد. تُبرز أهميتها كمؤشرات حيوية لجودة المياه (EPT) في تدريس البيئة.",
      en: "37 species listed for Iraq; nine new to the country. Their value as EPT bioindicators of freshwater quality is made explicit for ecology teaching.",
    },
    metrics: [
      { ku: "٣٧ جۆر", ar: "٣٧ نوعاً", en: "37 species" },
      { ku: "٩ تۆماری نوێ", ar: "٩ سجلات جديدة", en: "9 new to Iraq" },
    ],
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8016820/",
  },
  {
    id: "iraq-lepidoptera-cesa-2018",
    taxon: "Lepidoptera",
    order: "Lepidoptera",
    year: 2018,
    venue: "Priamus (Cesa)",
    authors: "Kemal & Koçak",
    affiliation: {
      ku: "Centre for Entomological Studies Ankara — لیستی دابەشبوونی عێراق",
      ar: "مركز الدراسات الحشرية أنقرة — قائمة توزيع العراق",
      en: "Centre for Entomological Studies Ankara — Iraq distributional list",
    },
    title: {
      ku: "لیستی هاودەنگ و دابەشبوونی Lepidopteraی عێراق",
      ar: "قائمة مترادفات وتوزيع Lepidoptera العراق",
      en: "Synonymous and distributional list of the Lepidoptera of Iraq",
    },
    finding: {
      ku: "١٢٣٦ جۆر لە ٥٠ خێزان؛ ١٥٧ جۆری پەپوولە. کۆدی شوێن و synonym و پەیوەندیی فەونای دراوسێ. چوارچێوەیەکی نیشتمانی بۆ خوێندنی Lepidoptera لە کوردستان.",
      ar: "١٢٣٦ نوعاً في ٥٠ فصيلة؛ ١٥٧ نوع فراشة. رموز المواقع والمترادفات وتقارب الفونة مع الجوار. إطار وطني لتدريس Lepidoptera في كردستان.",
      en: "1,236 species in 50 families; 157 butterfly species. Locality codes, synonyms and neighbour-fauna affinities — a national frame for teaching Lepidoptera in Kurdistan.",
    },
    metrics: [
      { ku: "١٢٣٦ جۆر", ar: "١٢٣٦ نوعاً", en: "1,236 species" },
      { ku: "١٥٧ پەپوولە", ar: "١٥٧ فراشة", en: "157 butterflies" },
    ],
    url: "https://www.academia.edu/37369239/A_synonymous_and_distributional_list_of_the_Lepidoptera_of_Iraq_based_on_the_info_systems_of_the_Cesa",
  },
];

/**
 * Formal trilingual scientific lexicon — equal depth in each language.
 * Latin terms stay Latin; definitions are fully written in ku / ar / en.
 */
export const ACADEMIC_LEXICON = [
  {
    term: "Entomology",
    ku: "مێرووناسی — زانستی لێکۆڵینەوەی پۆلی Insecta لە ڕووی مۆرفۆلۆجی، فیزیۆلۆجی، ئیکۆلۆجی، ڕەفتار، پۆلێن و کارلێک لەگەڵ مرۆڤ.",
    ar: "علم الحشرات — دراسة طائفة Insecta من حيث الشكل والوظيفة والبيئة والسلوك والتصنيف وعلاقتها بالإنسان.",
    en: "The scientific study of Insecta across morphology, physiology, ecology, behaviour, systematics and human interactions.",
  },
  {
    term: "Tagmosis",
    ku: "تاگمۆسیس — یەکگرتنی سێگمێنتەکان بۆ تاگماتای کارکردن (سەر، سنگ، سک) کە پلانەکەی جەستەی مێروو دیاری دەکات.",
    ar: "التجمّع القطعي — اندماج القطع في أقسام وظيفية (رأس وصدر وبطن) تحدد خطة جسم الحشرة.",
    en: "Fusion of segments into functional tagmata (head, thorax, abdomen) that define the insect body plan.",
  },
  {
    term: "Holometabola",
    ku: "هۆلۆمێتابۆلا — گۆڕانەپەڕەی تەواو: هێلکە ← لارڤا ← پیت (پوپا) ← گەورە؛ لارڤا لە گەورە ناچێت.",
    ar: "ذوات التحول الكامل — بيضة ثم يرقة ثم عذراء ثم بالغ؛ واليرقة لا تشبه البالغ.",
    en: "Complete metamorphosis: egg → larva → pupa → adult, with a larva unlike the imago.",
  },
  {
    term: "Hemimetabola",
    ku: "هێمیمێتابۆلا — گۆڕانەپەڕەی ناتەواو: هێلکە ← نەمف ← گەورە؛ نەمف زۆرجار لە گەورە دەچێت و باڵی دەرەکیی هەیە.",
    ar: "ذوات التحول الناقص — بيضة ثم حورية ثم بالغ؛ والحورية غالباً تشبه البالغ بأجنحة خارجية نامية.",
    en: "Incomplete metamorphosis: egg → nymph → adult; the nymph is usually adult-like with external wing pads.",
  },
  {
    term: "DNA barcoding",
    ku: "دی ئێن ئەی بارکۆدینگ — ناسینەوەی جۆر بە زنجیرەی کورت (زۆرجار COIی مایتۆکۆندریا) و بەراورد لەگەڵ BOLD / GenBank.",
    ar: "باركود الحمض النووي — تعريف النوع بمقطع قصير (غالباً COI الميتوكوندري) ومقارنته في BOLD أو GenBank.",
    en: "Species identification via a short sequence (often mitochondrial COI) matched in BOLD or GenBank.",
  },
  {
    term: "IPM",
    ku: "بەڕێوەبردنی تێکەڵاوی زیانبەخش — چاودێری، ئاستی زیانی ئابووری، biocontrol و کیمیایی وەک دوا هەنگاو.",
    ar: "الإدارة المتكاملة للآفات — الرصد والعتبة الاقتصادية والمكافحة الحيوية ثم الكيمياء كآخر خيار.",
    en: "Integrated Pest Management — monitoring, economic thresholds, biocontrol, with chemistry as a last resort.",
  },
  {
    term: "Bioindicator",
    ku: "باიოئیندیکەیتەر — زیندەوەرێک کە گۆڕانی ژینگە (وەک کوالێتی ئاو لە EPT) دەردەخات.",
    ar: "مؤشر حيوي — كائن يكشف تغير البيئة (مثل جودة المياه عبر مجموعة EPT).",
    en: "An organism whose presence or assemblage signals environmental condition (e.g. EPT and water quality).",
  },
  {
    term: "Eusociality",
    ku: "ئیوسۆسیالیتی — کۆمەڵگەی مێروو بە دابەشکردنی کار، نەوەی هاوپێچ و چاودێریی هاوبەشی brood (وەک Formicidae و Apidae).",
    ar: "الاجتماعية الحقيقية — مجتمع حشري بتقسيم عمل وأجيال متداخلة ورعاية مشتركة للنسل (مثل النمل والنحل).",
    en: "True sociality with castes, overlapping generations and cooperative brood care (e.g. Formicidae, Apidae).",
  },
  {
    term: "Irano-Anatolian hotspot",
    ku: "هۆتسپۆتی ئیرانی–ئاناتۆلی — ناوچەی هەمەجۆریی زیندەوەری جیهانی کە زاگرۆس و کوردستان لەخۆ دەگرێت؛ بەرزی و نیمچە وشک فەونای مێروو دەڕێکخەن.",
    ar: "نقطة التنوع الإيرانية–الأناضولية — منطقة تنوع عالمية تشمل زاغروس وكردستان؛ الارتفاع والمناخ شبه الجاف ينظمان فونة الحشرات.",
    en: "A global biodiversity hotspot spanning the Zagros–Kurdistan arc; elevation and semi-arid climate structure insect assemblages.",
  },
  {
    term: "Voucher specimen",
    ku: "نمونەی ڤاوچەر — نمونەی مۆزەخانەیی لەگەڵ لەیبڵی شوێن، بەروار و کۆکەر؛ بنەمای پشتڕاستکردنەوەی زانستی.",
    ar: "عينة مرجعية — عينة متحفية مع بطاقة الموقع والتاريخ والجامع؛ أساس التحقق العلمي.",
    en: "A museum specimen with locality, date and collector label — the basis of scientific verification.",
  },
];

export const LEDGER_OUTCOMES = [
  {
    id: "01",
    title: {
      ku: "خوێندنەوەی ئەدەبیاتی ناوچەیی",
      ar: "قراءة الأدبيات الإقليمية",
      en: "Read regional literature",
    },
    body: {
      ku: "جیاکردنەوەی توێژینەوەی زانکۆکانی کوردستان/عێراق لە لیستی جیهانی، و خوێندنەوەی ژمارەی جۆر و تۆماری نوێ.",
      ar: "تمييز أبحاث جامعات كردستان/العراق عن القوائم العالمية، وقراءة أعداد الأنواع والسجلات الجديدة.",
      en: "Distinguish Kurdistan/Iraq university surveys from global lists, and read species counts and new records critically.",
    },
  },
  {
    id: "02",
    title: {
      ku: "گرێدانی GBIF و کێڵگە",
      ar: "ربط GBIF والحقل",
      en: "Link GBIF to the field",
    },
    body: {
      ku: "تێگەیشتن کە کەمیی occurrence لە GBIF واتای نەبوونی جۆر نییە؛ پێویستی بە voucher و توێژینەوەی ناوخۆیی هەیە.",
      ar: "فهم أن قلة سجلات GBIF لا تعني غياب النوع؛ والحاجة إلى عينة مرجعية وبحث محلي.",
      en: "Understand that sparse GBIF occurrences do not equal absence; vouchers and local surveys remain essential.",
    },
  },
  {
    id: "03",
    title: {
      ku: "زاراوەی سێ زمانە",
      ar: "مصطلح ثلاثي اللغة",
      en: "Trilingual terminology",
    },
    body: {
      ku: "بەکارهێنانی زاراوەی لاتینی لەگەڵ پێناسەی تەواو بە کوردی، عەرەبی و ئینگلیزی بەبێ کەمکردنەوەی هیچ زمانێک.",
      ar: "استخدام المصطلح اللاتيني مع تعريف كامل بالكردية والعربية والإنجليزية دون اختصار أي لغة.",
      en: "Use Latin terms with full definitions in Kurdish, Arabic and English — without abbreviating any language.",
    },
  },
];
