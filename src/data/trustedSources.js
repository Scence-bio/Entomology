/**
 * Snapshot from trusted global biodiversity / taxonomy databases.
 * Retrieved for Atlas of Entomology (Iraq / Kurdistan teaching context).
 * Counts change as GBIF grows — treat as open evidence, not a closed checklist.
 */

export const SNAPSHOT_DATE = "2026-11-03";

/** Primary databases students should learn to query. */
export const DATABASES = [
  {
    id: "gbif",
    name: "GBIF",
    full: "Global Biodiversity Information Facility",
    url: "https://www.gbif.org/",
    role: {
      ku: "تۆماری ڕوودانی جیهانی (occurrence) و ناوی زانستی",
      ar: "سجلات التواجد العالمية والأسماء العلمية",
      en: "Global occurrence records and scientific names",
    },
  },
  {
    id: "col",
    name: "Catalogue of Life",
    full: "Catalogue of Life",
    url: "https://www.catalogueoflife.org/",
    role: {
      ku: "چکلیستی تاکسۆنۆمیی یەکگرتوو",
      ar: "قائمة تصنيفية موحدة",
      en: "Unified taxonomic checklist",
    },
  },
  {
    id: "itis",
    name: "ITIS",
    full: "Integrated Taxonomic Information System",
    url: "https://www.itis.gov/",
    role: {
      ku: "ناوی قبوڵکراو و synonymی باوەڕپێکراو",
      ar: "الأسماء المقبولة والمرادفات المعتمدة",
      en: "Accepted names and trusted synonyms",
    },
  },
  {
    id: "ncbi",
    name: "NCBI Taxonomy",
    full: "NCBI Taxonomy Browser",
    url: "https://www.ncbi.nlm.nih.gov/taxonomy",
    role: {
      ku: "گرێدانی تاکسۆن بە DNA / GenBank",
      ar: "ربط التصنيف بـ DNA وGenBank",
      en: "Linking taxa to DNA / GenBank",
    },
  },
  {
    id: "bold",
    name: "BOLD",
    full: "Barcode of Life Data System",
    url: "https://www.boldsystems.org/",
    role: {
      ku: "DNA barcoding (زۆرجار COI)",
      ar: "باركود DNA (غالباً COI)",
      en: "DNA barcoding (often COI)",
    },
  },
  {
    id: "eppo",
    name: "EPPO GD",
    full: "EPPO Global Database",
    url: "https://gd.eppo.int/",
    role: {
      ku: "ئاژەڵی زیانبەخش و دابەشبوونی ناوچەیی",
      ar: "الآفات والتوزيع الإقليمي",
      en: "Pests and regional distribution",
    },
  },
  {
    id: "iucn",
    name: "IUCN Red List",
    full: "IUCN Red List of Threatened Species",
    url: "https://www.iucnredlist.org/",
    role: {
      ku: "ئاستی مەترسی و پاراستنی جۆر",
      ar: "حالة التهديد وحفظ الأنواع",
      en: "Threat status and species conservation",
    },
  },
  {
    id: "who",
    name: "WHO / PubMed",
    full: "WHO vector literature & PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/",
    role: {
      ku: "vector-borne disease و توێژینەوەی پزیشکی",
      ar: "أمراض النواقل والأبحاث الطبية",
      en: "Vector-borne disease and medical literature",
    },
  },
];

/**
 * Global richness — Stork 2018, Annu. Rev. Entomol.
 * Described-order ballpark figures commonly cited in teaching (Wikipedia / CoL aggregates vary by year).
 */
export const GLOBAL = {
  stork2018: {
    insectsEstimated: 5_500_000,
    beetlesEstimated: 1_500_000,
    terrestrialArthropodsEstimated: 7_000_000,
    insectsDescribedApprox: 1_000_000,
    undescribedPctApprox: 80,
    citation: "Stork, N. E. (2018). Annu. Rev. Entomol. 63:31–45.",
    doi: "10.1146/annurev-ento-020117-043348",
  },
  describedOrdersApprox: {
    Coleoptera: 386_500,
    Lepidoptera: 157_000,
    Hymenoptera: 117_000,
    Diptera: 155_000,
    Hemiptera: 104_000,
    Orthoptera: 24_000,
    Odonata: 6_000,
    Neuroptera: 6_000,
    note: {
      ku: "ژمارەی وەسفکراو بەپێی ساڵ و چکلیست دەگۆڕێت؛ بۆ وانە وەک مەودا بەکاربهێنە.",
      ar: "أعداد الأنواع الموصوفة تتغير حسب السنة والقائمة؛ استخدمها كنطاق تعليمي.",
      en: "Described counts shift by year and checklist; use as teaching ranges.",
    },
  },
};

/** GBIF occurrence snapshot for country=IQ (Iraq). */
export const GBIF_IRAQ = {
  retrieved: SNAPSHOT_DATE,
  api: "https://api.gbif.org/v1/",
  portal: "https://www.gbif.org/occurrence/search?country=IQ&taxon_key=216",
  insecta: {
    taxonKey: 216,
    occurrences: 12_019,
    distinctSpeciesKeys: 1_738,
  },
  orders: {
    Lepidoptera: { taxonKey: 797, occurrences: 3_479, distinctSpeciesKeys: 400 },
    Coleoptera: { taxonKey: 1470, occurrences: 1_397, distinctSpeciesKeys: 267 },
    Hymenoptera: { taxonKey: 1457, occurrences: 1_038, distinctSpeciesKeys: 262 },
    Diptera: { taxonKey: 811, occurrences: 1_387, distinctSpeciesKeys: 173 },
    Hemiptera: { taxonKey: 809, occurrences: 2_124, distinctSpeciesKeys: 380 },
    Orthoptera: { taxonKey: 1458, occurrences: 199, distinctSpeciesKeys: 49 },
    Odonata: { taxonKey: 789, occurrences: 1_018, distinctSpeciesKeys: 54 },
    Neuroptera: { taxonKey: 1501, occurrences: 70, distinctSpeciesKeys: 24 },
  },
  caveat: {
    ku: "GBIF تەنها ئەو تۆمارانە پیشان دەدات کە بڵاوکراونەتەوە؛ فەونای کوردستان زۆر undersampledـە. نەبوونی تۆمار ≠ نەبوونی جۆر.",
    ar: "GBIF يعكس فقط السجلات المنشورة؛ فونة كردستان ناقصة العينة. غياب السجل لا يعني غياب النوع.",
    en: "GBIF shows published records only; Kurdistan’s fauna is undersampled. Absence of records ≠ absence of the species.",
  },
};

/** Focal taxa used across the atlas — matched on GBIF. */
export const SPECIES = {
  "Papilio machaon": {
    authorship: "Linnaeus, 1758",
    gbifKey: 8225376,
    iqOccurrences: 12,
    order: "Lepidoptera",
    family: "Papilionidae",
    note: {
      ku: "swallowtailی Palearctic؛ EPPO PAPIMA؛ لە عێراق تۆماری GBIF هەیە.",
      ar: "أبو ذيل بالياركتي؛ رمز EPPO PAPIMA؛ له سجلات GBIF في العراق.",
      en: "Palearctic swallowtail; EPPO PAPIMA; GBIF records exist for Iraq.",
    },
  },
  "Vanessa cardui": {
    authorship: "Linnaeus, 1758",
    gbifKey: 4299368,
    iqOccurrences: 55,
    order: "Lepidoptera",
    family: "Nymphalidae",
    note: {
      ku: "یەکێک لە بەرزترین تۆمارەکانی Lepidoptera لە GBIFـی عێراق.",
      ar: "من أعلى سجلات الفراشات في GBIF العراق.",
      en: "Among the best-documented butterflies in Iraq GBIF data.",
    },
  },
  "Pieris brassicae": {
    authorship: "Linnaeus, 1758",
    gbifKey: 1920506,
    iqOccurrences: 20,
    order: "Lepidoptera",
    family: "Pieridae",
  },
  "Coccinella septempunctata": {
    authorship: "Linnaeus, 1758",
    gbifKey: 4990191,
    iqOccurrences: 40,
    order: "Coleoptera",
    family: "Coccinellidae",
    note: {
      ku: "predatorی شەتەک؛ Palearctic و لە biocontrolدا باو.",
      ar: "مفترس للمن؛ بالياركتي وشائع في المكافحة الحيوية.",
      en: "Aphid predator; Palearctic and common in biocontrol.",
    },
  },
  "Apis mellifera": {
    authorship: "Linnaeus, 1758",
    gbifKey: 1341976,
    iqOccurrences: 145,
    order: "Hymenoptera",
    family: "Apidae",
    note: {
      ku: "زۆرترین تۆماری Hymenoptera لەم لیستەدا لە GBIFـی عێراق.",
      ar: "أعلى سجلات النحل في هذه القائمة ضمن GBIF العراق.",
      en: "Highest Hymenoptera count in this atlas list for Iraq GBIF.",
    },
  },
  "Anopheles superpictus": {
    authorship: "Grassi, 1899",
    gbifKey: 1650284,
    iqOccurrences: 0,
    order: "Diptera",
    family: "Culicidae",
    note: {
      ku: "لە ئەدەبیاتی پزیشکی (Sulaymaniyah / باکووری عێراق) vectorی مەلاریا بووە؛ کەمیی GBIF ≠ کەمیی مێژوو.",
      ar: "في الأدبيات الطبية شمال العراق ناقل ملاريا تاريخي؛ قلة GBIF لا تنفي التاريخ.",
      en: "Historical malaria vector in N. Iraq literature (e.g. Sulaymaniyah); sparse GBIF ≠ no history.",
    },
    literature: [
      "Abul-Hab, J. — seasonal occurrence & resting habits, N. Iraq (1950s–60s).",
      "WHO–Iraq malaria eradication pilot, Silêmanî (1950s).",
    ],
  },
  "Musca domestica": {
    authorship: "Linnaeus, 1758",
    gbifKey: 1524843,
    iqOccurrences: 24,
    order: "Diptera",
    family: "Muscidae",
  },
  "Eristalis tenax": {
    authorship: "Linnaeus, 1758",
    gbifKey: 1541217,
    iqOccurrences: null,
    order: "Diptera",
    family: "Syrphidae",
  },
  "Nezara viridula": {
    authorship: "Linnaeus, 1758",
    gbifKey: 2078852,
    iqOccurrences: 2,
    order: "Hemiptera",
    family: "Pentatomidae",
  },
  "Crocothemis erythraea": {
    authorship: "Brullé, 1832",
    gbifKey: 1427721,
    iqOccurrences: 26,
    order: "Odonata",
    family: "Libellulidae",
  },
  "Chrysoperla carnea": {
    authorship: "Stephens, 1836",
    gbifKey: 2105360,
    iqOccurrences: 2,
    order: "Neuroptera",
    family: "Chrysopidae",
    note: {
      ku: "لارڤا aphidophagous؛ لە augmentative biocontrolدا بەکاردێت.",
      ar: "يرقتها تفترس المن؛ تُستخدم في المكافحة الحيوية التعزيزية.",
      en: "Aphidophagous larva; used in augmentative biocontrol.",
    },
  },
};

/** Regional literature anchors (not GBIF). */
export const REGIONAL_LITERATURE = [
  {
    id: "ephemeroptera-iraq-2021",
    title: "Updated check-list of the mayflies (Insecta: Ephemeroptera) of Iraq",
    year: 2021,
    venue: "Biodiversity Data Journal",
    finding: {
      ku: "٣٧ جۆری Ephemeroptera لە عێراق؛ بەشێک لە کوردستانی عێراق کۆکراونەتەوە.",
      ar: "٣٧ نوعاً من ذباب مايو في العراق؛ جزء من المسح في كردستان العراق.",
      en: "37 mayfly species listed for Iraq; survey includes Iraqi Kurdistan.",
    },
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8016820/",
  },
  {
    id: "irano-anatolian",
    title: "Irano-Anatolian biodiversity hotspot",
    year: null,
    venue: "Conservation International / CEPF framework",
    finding: {
      ku: "زاگرۆس و کوردستان لەنێو hotspotـدان؛ بەرزی و نیمچە وشک → هەمەجۆریی مێروو.",
      ar: "زاغروس وكردستان ضمن نقطة التنوع؛ ارتفاعات ومناخ شبه جاف → تنوع حشري.",
      en: "Zagros–Kurdistan sits in this hotspot; elevation and semi-arid climate structure insect diversity.",
    },
    url: "https://www.cepf.net/our-work/biodiversity-hotspots/irano-anatolian",
  },
];

export function speciesRecord(name) {
  return SPECIES[name] || null;
}

export function gbifSpeciesUrl(key) {
  return `https://www.gbif.org/species/${key}`;
}

export function gbifIraqOrderUrl(taxonKey) {
  return `https://www.gbif.org/occurrence/search?country=IQ&taxon_key=${taxonKey}`;
}
