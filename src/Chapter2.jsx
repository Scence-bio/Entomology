import { useState, useRef, useEffect } from "react";
import { QuizSection } from "./quiz/Quiz";
import PhotoHero from "./chapter/PhotoHero";
import SectionPills from "./chapter/SectionPills";
import EvidencePanel from "./chapter/EvidencePanel";
import { GBIF_IRAQ, GLOBAL } from "./data/trustedSources";

const SCIENTIST_IMGS = {};

const SECTIONS = [
  {
    id: "def",
    num: "٠١",
    numEn: "01",
    icon: "",
    titles: {
      ku: "پێناسەی وردی مێرووناسی",
      ar: "التعريف الأكاديمي لعلم الحشرات",
      en: "Advanced Definition",
    },
    body: {
      ku: `مێرووناسی (Entomology) لقێکی زانستی زیندەوەرە کە مێرووەکان (Insecta) دەخوێنێتەوە: شێوەناسی، فیزیۆلۆجی، ژینگەناسی، ڕەفتار، پۆلێن و سیستماتیک، پەرەسەندن، و کارلێکیان لەگەڵ مرۆڤ و کشتوکاڵ. وشەکە لە یۆنانیی کۆنەوە هاتووە: ἔντομον (éntomon) «بڕدراو/مێروو» و -λογία «زانست». مێروو لەناو فایلەمی Arthropoda دان و بە تاگمۆسیس جیا دەکرێنەوە: سێ تاگماتا — سەر، سنگ و سک؛ شەش قاچ (hexapod)؛ یەک جووت ئەنتێنا؛ و زۆرجار باڵ لەسەر سنگە ناوەندی و دواوە. هەناسەدان بە بۆریی هەوا و کونی هەناسە دەبێت؛ سوڕی خوێن کراوەیە؛ پێستەکە لە کایتین و پرۆتینی ڕەقکراو پێک دێت. بەپێی Stork (٢٠١٨) نزیکەی ١ ملیۆن جۆر وەسف کراوە، بەڵام خەمڵاندنی جیهانی ~${(GLOBAL.stork2018.insectsEstimated / 1e6).toFixed(1)} ملیۆن مێروو و ~${GLOBAL.stork2018.undescribedPctApprox}٪ هێشتا نەدۆزراوەتەوە — بۆیە «یەک ملیۆن» تەنها کۆتاییی وەسفە، نەک کۆتاییی سروشت.`,
      ar: `علم الحشرات يدرس Insecta: الشكل والوظيفة والبيئة والسلوك والتصنيف والتطور وعلاقتها بالإنسان والزراعة. من اليونانية ἔντομον و-λογία. ضمن Arthropoda بثلاث tagmata وست أرجل وزوج قرون. تنفس قصبي ودوران مفتوح وكيوتيكل من الكايتين. وفق Stork (٢٠١٨) وُصف نحو مليون نوع، لكن التقدير العالمي ~${(GLOBAL.stork2018.insectsEstimated / 1e6).toFixed(1)} مليون حشرة وما زال ~${GLOBAL.stork2018.undescribedPctApprox}٪ غير مكتشف.`,
      en: `Entomology studies Insecta — morphology, physiology, ecology, behaviour, taxonomy/systematics, phylogeny, and human–agricultural interactions. From Greek ἔντομον + -λογία. Insects are arthropods with three tagmata, six uniramous legs, one antennal pair, tracheal gas exchange, open hemolymph circulation and a chitin–sclerotin cuticle. Stork (2018) places ~1 million described insect species against a global estimate of ~${(GLOBAL.stork2018.insectsEstimated / 1e6).toFixed(1)} million (~${GLOBAL.stork2018.undescribedPctApprox}% still undescribed) — so “one million” is the named fraction, not the biota.`,
    },
    terms: ["Entomology","Insecta","Arthropoda","Tagmosis","Hexapoda","Tracheae","Hemolymph","Systematics"],
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
      ku: "لە Historia Animalium ـدا ئەرستۆ (سەدەی ٤ پ.ز.) مێرووی وەک ἔντομα جیا کردەوە و گۆڕانەپەڕەی تێبینی کرد. Carl Linnaeus لە Systema Naturae (١٠یەم چاپ، ١٧٥٨) ناوی دووانەی زانستی جێگیر کرد: ناوی ڕەگەز و ناوی جۆر، وەک Apis mellifera. Jan Swammerdam (سەدەی ١٧) بە توێکاریی ورد سەلماندی کە لارڤا و گەورە هەمان زیندەوەرن و کۆئەندامی ناوەکیی ئاڵۆزیان هەیە. William Kirby و William Spence لە Introduction to Entomology (١٨١٥–١٨٢٦) بناغەی مێرووناسیی مۆدێرنیان دانا. Charles Darwin و Alfred Russel Wallace تیۆری هەڵبژاردنی سروشتییان هێنا؛ دواتر پەرەسەندنی هاوبەش لە نێوان مێروو و ڕووەکی گوڵدار ڕوون کرایەوە. لە سەدەی ٢٠دا کاریۆتایپ، بارکۆدی دی ئێن ئەی (COI) و فایلۆجینۆمی پۆلێن و پەرەسەندنی مێروویان گۆڕی.",
      ar: "في Historia Animalium ميّز أرسطو (ق ٤ ق.م) الحشرات ἔντομα ولاحظ التحول. ثبّت لينيوس في Systema Naturae (ط ١٠، ١٧٥٨) التسمية الثنائية: الجنس والاسم النوعي، مثل Apis mellifera. أثبت سوامردام بالتشريح أن اليرقة والبالغ كائن واحد له أجهزة داخلية معقدة. وضع كيربي وسبنس أسس علم الحشرات الحديث (١٨١٥–١٨٢٦). جاء داروين ووالاس بالانتخاب الطبيعي؛ ثم وُضح التطور المشترك مع كاسيات البذور. في القرن ٢٠ غيّرت الـkaryotype وDNA barcoding (COI) والـphylogenomics التصنيف والتطور.",
      en: "In Historia Animalium Aristotle (4th c. BCE) separated insects as ἔντομα and noted metamorphosis. Linnaeus’s Systema Naturae (10th ed., 1758) fixed binomial nomenclature — Genus + specific epithet, e.g. Apis mellifera. Swammerdam’s micro-dissections showed larva and adult are one organism with complex organs. Kirby & Spence’s Introduction to Entomology (1815–1826) founded modern entomology as a discipline. Darwin and Wallace framed natural selection; co-evolution with angiosperms followed. In the 20th–21st centuries karyotypes, COI DNA barcoding and phylogenomics reshaped insect systematics.",
    },
    timeline: [
      { year: "سەدەی ٤ پ.ز", event: "Aristotle — ἔντομα و گۆڕانەپەڕە" },
      { year: "١٧٥٨", event: "Linnaeus — Systema Naturae ١٠ · binomial" },
      { year: "سەدەی ١٧", event: "Swammerdam — توێکاری و یەکبوونی قۆناغەکان" },
      { year: "١٨١٥–٢٦", event: "Kirby & Spence — Introduction to Entomology" },
      { year: "١٨٥٩+", event: "Darwin / Wallace — هەڵبژاردنی سروشتی" },
      { year: "٢٠٠٣+", event: "DNA barcoding (COI) · phylogenomics" },
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
      ku: "ئەم زانایانە کاریگەرییەکی گەورەیان لە گەشەی مێرووناسیدا هەبووە.",
      ar: "أسهم هؤلاء الرواد في وضع أسس علم الحشرات الحديث.",
      en: "These pioneers shaped the foundations of modern entomology.",
    },
    scientists: [
      { initials:"AR", name:"Aristotle",       roleKu:"یەکەم وەسفی جیدی مێرووەکان",     roleAr:"أول وصف جاد للحشرات",           roleEn:"First serious account of insects" },
      { initials:"CL", name:"Carl Linnaeus",   roleKu:"داهێنەری ناوی دووانەی زانستی", roleAr:"مؤسس نظام التسمية الثنائية", roleEn:"Father of Taxonomy" },
      { initials:"WK", name:"William Kirby",   roleKu:"باوکی مێرووناسی",             roleAr:"أب علم الحشرات",              roleEn:"Father of Entomology" },
      { initials:"JS", name:"Jan Swammerdam",  roleKu:"پیشەوای توێکاریی ورد",        roleAr:"رائد التشريح المجهري",         roleEn:"Pioneer of Micro-dissection" },
      { initials:"CD", name:"Charles Darwin",  roleKu:"تیۆری پەرەسەندنی هاوبەش",              roleAr:"نظرية التطور المشترك",        roleEn:"Co-evolution Theory" },
    ],
  },
  {
    id: "kurdistan",
    num: "٠٤",
    numEn: "04",
    icon: "",
    titles: {
      ku: "مێرووناسی لە کوردستان",
      ar: "علم الحشرات في كردستان",
      en: "Regional Entomology in Kurdistan",
    },
    mapImg: "/images/headers/chapter2-map.webp",
    body: {
      ku: `هەرێمی کوردستان و زنجیرەچیاکانی زاگرۆس لە ناوچەی هەمەجۆریی Irano-Anatolian دان: گۆڕانی بەرزی، کەشوهەوای نیمچە وشک و دارستانی ئاوێتە ژینگەی جیاواز بۆ پەپوولەباڵ، قوڕقوڕەباڵ، پەڕەباڵ و جڕوشک دروست دەکەن. لە وێنەی GBIF (${GBIF_IRAQ.retrieved}) بۆ عێراق: نزیکەی ${GBIF_IRAQ.insecta.occurrences.toLocaleString("en-US")} ڕوودانی Insecta و ${GBIF_IRAQ.insecta.distinctSpeciesKeys.toLocaleString("en-US")} کلیلی جۆری جیاواز هەن — بەڵام ناوچەکە هێشتا بە تەواوی نمونە نەکراوە؛ نەبوونی تۆمار واتای نەبوونی جۆر نییە. لیستی مێشوولەی ئاوی عێراق (٢٠٢١) ٣٧ جۆر تۆمار دەکات، بەشێکیان لە کوردستانی عێراق. توێژینەوە ئەکادیمییەکان جەخت لەم تەوەرانە دەکەنەوە: (١) تۆماری فەونای ناوخۆیی و جۆری تایبەت بە ناوچە؛ (٢) بەڕێوەبردنی تێکەڵاوی زیانبەخش و ئاستی زیانی ئابووری؛ (٣) پەیتاندن و Apis mellifera؛ (٤) کاتی سوڕی ژیان و گۆڕانی کەشوهەوا.`,
      ar: `تقع كردستان وجبال زاغروس ضمن نقطة التنوع Irano-Anatolian. في لقطة GBIF (${GBIF_IRAQ.retrieved}) للعراق: نحو ${GBIF_IRAQ.insecta.occurrences.toLocaleString("en-US")} سجل تواجد لـInsecta و${GBIF_IRAQ.insecta.distinctSpeciesKeys.toLocaleString("en-US")} مفتاح نوع متمايز — مع نقص واضح في العينات. قائمة ذباب مايو في العراق (٢٠٢١) تذكر ٣٧ نوعاً. محاور البحث: جرد الفونة، IPM، التلقيح، والـphenology.`,
      en: `Kurdistan and the Zagros lie in the Irano-Anatolian biodiversity hotspot. A GBIF snapshot (${GBIF_IRAQ.retrieved}) for Iraq lists ~${GBIF_IRAQ.insecta.occurrences.toLocaleString("en-US")} Insecta occurrences and ${GBIF_IRAQ.insecta.distinctSpeciesKeys.toLocaleString("en-US")} distinct species keys — still a severe undersample; missing records ≠ missing species. Iraq’s mayfly checklist (2021) lists 37 Ephemeroptera species, including Kurdistan survey material. Research axes: faunistics/endemics, IPM thresholds, Apis mellifera pollination, and climate phenology.`,
    },
    stats: [
      { icon:"", label:`GBIF IQ Insecta · ${GBIF_IRAQ.insecta.distinctSpeciesKeys} spp.` },
      { icon:"", label:"Irano-Anatolian Hotspot" },
      { icon:"", label:"Ephemeroptera IQ · 37 spp." },
      { icon:"", label:"IPM · Pollinators · Apis" },
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
      ku: "مێروو لە چەند بواری ستراتیژیدا سەرەکین. (١) نیشاندەری زیندوو: Ephemeroptera، Plecoptera و Trichoptera (EPT) لە ئاو هەستیاریان بە پیسبوون هەیە؛ گۆڕانی کۆمەڵگەی مێروو دەر دەخات کە کوالێتی ئاو یان خاک گۆڕاوە. (٢) مێرووناسیی دادوەری: Calliphoridae و Sarcophagidae لەسەر تەرم؛ گەشەی لارڤا و کۆی پلەی گەرمی بۆ خەمڵاندنی کاتی مردن. (٣) پەیتاندن: زیاتر لە ٧٥٪ی بەرهەمە کشتوکاڵییە سەرەکییەکان سوود لە ئاژەڵی پەیتاندن وەردەگرن؛ Apis، هەنگی تەنها و Syrphidae. (٤) بەڕێوەبردنی تێکەڵاوی زیانبەخش: چاودێری، ئاستی زیان، دوژمنی سروشتی، و کیمیایی وەک دوا هەنگاو. (٥) تەکنەلۆجیای زیندوو: Bombyx mori (ئاوریشم)، لاک، و مێروو وەک سەرچاوەی پرۆتین.",
      ar: "للحشرات أدوار استراتيجية: (١) مؤشرات حيوية — EPT حساسة لتلوث الماء؛ (٢) حشرات جنائية — Calliphoridae ودرجة الحرارة المتراكمة لتقدير PMI؛ (٣) التلقيح — أكثر من ٧٥٪ من المحاصيل الرئيسية تستفيد من الملقحات؛ (٤) IPM — الرصد والعتبة والأعداء الطبيعيون ثم الكيميائي؛ (٥) تقانة حيوية — الحرير واللك والحشرات كبروتين.",
      en: "Insects matter strategically: (1) bioindicators — EPT taxa track freshwater quality; (2) forensic entomology — calliphorid growth and accumulated degree-days estimate PMI; (3) pollination — over 75% of leading food crops benefit from animal pollinators (Apis, solitary bees, hoverflies); (4) IPM — monitoring, thresholds, natural enemies, chemistry last; (5) biotech and food — silk, lac, and edible insects as protein.",
    },
    apps: {
      ku: [
        "نیشاندەری EPT — کوالێتی ئاو",
        "مێرووناسیی دادوەری — کاتی مردن و کۆی پلەی گەرمی",
        "پەیتاندن — Apis · هەنگی تەنها · Syrphidae",
        "بەڕێوەبردنی تێکەڵ — ئاستی زیانی ئابووری و کۆنترۆڵی زیندەیی",
        "ئاوریشم و مێرووی خۆراکی — پرۆتین",
      ],
      ar: [
        "مؤشرات EPT — جودة المياه",
        "حشرات جنائية — PMI / ADD",
        "تلقيح — Apis والنحل الانفرادي وSyrphidae",
        "IPM — العتبة الاقتصادية والمكافحة الحيوية",
        "حرير / حشرات غذائية — بروتين",
      ],
      en: [
        "EPT bioindicators — water quality",
        "Forensic entomology — PMI / ADD",
        "Pollination — Apis, solitary bees, Syrphidae",
        "IPM — thresholds + biocontrol",
        "Sericulture / entomophagy — silk & protein",
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
      ku: "سێ تەوەری سەرەکی هەیە. (١) نەخۆشیی گەیەنەر: Anopheles spp. پلاسمۆدیۆمی مەلاریا دەگوازێتەوە؛ Aedes aegypti و Aedes albopictus دێنگ، زیکا و چیکونگونیا؛ Phlebotomus لەیشمانیا. گواستنەوە دەکرێت میکانیکی بێت یان بایۆلۆجی، واتە سوڕ لەناو جەستەی مێروودا. (٢) جۆری داگیرکەر: بێدوژمنی سروشتی، ڕکابەری و نەخۆشی دەهێنن و زنجیرەی خۆراک دەگۆڕن. (٣) ئاسایشی خۆراک: Aphididae، Noctuidae، Tephritidae و قوڕقوڕەی زیانبەخش دەتوانن زیانی ئابووریی گەورە بکەن؛ بەرگری دژ بە سم، وەک لە کەناڵی سۆدیۆم یان ئەنزیمی ئەسیتیلکۆلین، بەڕێوەبردنی تێکەڵ ناکارامە دەکات ئەگەر تەنها کیمیایی بەکار بهێنرێت.",
      ar: "ثلاثة محاور: (١) أمراض النواقل — Anopheles للملاريا، Aedes للدنج والزيكا، Phlebotomus للّيشمانيا؛ النقل آلي أو بيولوجي؛ (٢) أنواع غازية بلا أعداء طبيعيين؛ (٣) أمن غذائي — منّ وليلية وذباب الفاكهة وخنافس، مع مقاومة المبيدات التي تُضعف الاعتماد على الكيمياء وحدها.",
      en: "Three axes: (1) vector-borne disease — Anopheles and Plasmodium, Aedes and dengue/Zika/chikungunya, Phlebotomus and Leishmania; transmission may be mechanical or biological; (2) invasive species without natural enemies; (3) food security — aphids, noctuids, fruit flies and pest beetles, compounded by insecticide resistance (e.g. sodium-channel or AChE mutations) when chemistry is used alone.",
    },
    threats: [
      { icon:"", nameKu:"نەخۆشیی گەیەنەر", nameAr:"أمراض النواقل", nameEn:"Vector-borne disease", eg:"Anopheles · Aedes · Phlebotomus" },
      { icon:"", nameKu:"جۆری داگیرکەر", nameAr:"أنواع غازية", nameEn:"Invasive species", eg:"بێدوژمنی سروشتی · ڕکابەری" },
      { icon:"", nameKu:"زیانی بەرهەم و بەرگریی سم", nameAr:"خسائر ومقاومة مبيدات", nameEn:"Crop loss + resistance", eg:"Aphididae · Noctuidae · IPM" },
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
      { term:"Holometabola", ku:"گۆڕانەپەڕەی تەواو — هێلکە، لارڤا، پیت (پوپا)، گەورە", ar:"تحول كامل — بيضة، يرقة، عذراء، بالغ", en:"Complete metamorphosis — egg, larva, pupa, adult" },
      { term:"Hemimetabola", ku:"گۆڕانەپەڕەی ناتەواو — هێلکە، نەمف، گەورە (بێپیت)", ar:"تحول ناقص — بيضة، حورية، بالغ", en:"Incomplete metamorphosis — egg, nymph, adult" },
      { term:"Phylogeny", ku:"دارەی پەرەسەندن — پەیوەندیی باوباپیری هاوبەش", ar:"شجرة النشوء — أسلاف مشتركة", en:"Evolutionary tree — shared ancestry" },
      { term:"DNA barcoding", ku:"ناسنامەی گەردی — زۆرجار جینی COIی مایتۆکۆندریا", ar:"باركود DNA — غالباً جين COI", en:"Molecular ID — often mitochondrial COI" },
      { term:"Parasitoid", ku:"زیندەوەرێک کە خانەخوێ دەکوژێت پێش تەواوبوونی گەشە", ar:"طفيل يقتل عائله قبل تمام نموه", en:"An organism that kills its host before finishing development" },
      { term:"Eusociality", ku:"کۆمەڵگە — دابەشکردنی کار، نەوەی هاوپێچ، چاودێریی هاوبەشی نەوە", ar:"حياة اجتماعية — تقسيم عمل ورعاية مشتركة", en:"Castes, overlapping generations, cooperative brood care" },
      { term:"Economic threshold", ku:"ئاستی چڕیی زیانبەخش کە دەستتێوەردان تێیدا سوودەکەی زیاترە لە تێچوو", ar:"عتبة اقتصادية — التدخل أجدى من التكلفة", en:"Pest density where control costs less than expected loss" },
      { term:"Phenology", ku:"کاتی ڕووداوەکانی سوڕی ژیان لە درێژاییی ساڵدا", ar:"فينولوجيا — توقيت أحداث دورة الحياة", en:"Seasonal timing of life-cycle events" },
    ],
  },
  {
    id: "biocontrol",
    num: "٠٨",
    numEn: "08",
    icon: "",
    titles: {
      ku: "کۆنترۆڵی زیندەیی",
      ar: "المكافحة الحيوية",
      en: "Biological Control",
    },
    body: {
      ku: "کۆنترۆڵی زیندەیی بەکارهێنانی دوژمنی سروشتییە بۆ کەمکردنەوەی چڕیی زیانبەخش، نەک تەنها ماددەی دەرەکی. سێ شێوازی کلاسیک هەیە: کلاسیک، واتە هێنانی دوژمن بۆ زیانبەخشی داگیرکەر؛ زیادکراو، واتە زیادکردنی ژمارە؛ و پارێزەری، واتە پاراستنی دوژمنی ناوخۆیی. نێچیرگر: Coccinella septempunctata و Adalia bipunctata شەتەک (Aphididae) دەخۆن؛ لارڤای Chrysoperla carnea هەر شەتەک دەخوات، بە چەناگەی کونکەر-مژەر. پارازیتۆید: زۆربەی Ichneumonoidea و Chalcidoidea هێلکە لەناو میوان یان لەسەری دادەنێن؛ پارازیتۆیدی ناوەکی لەناو جەستە گەشە دەکات و میوان دەکوژێت. نەخۆشخەر: Beauveria bassiana و Bacillus thuringiensis، کە ژەهرەکەی لەسەر وەرگری ڕیخۆڵەی ناوەند کار دەکات. لە بەڕێوەبردنی تێکەڵدا کۆنترۆڵی زیندەیی لەگەڵ چاودێری، ئاستی زیانی ئابووری و کیمیایی هەڵبژێردراو تێکەڵ دەکرێت.",
      ar: "المكافحة الحيوية استخدام أعداء طبيعيين لتقليل كثافة الآفة. ثلاثة أنماط: كلاسيكية وتعزيزية وحفظ. مفترسات مثل Coccinella وChrysoperla؛ طفيليات Ichneumonoidea؛ مسببات مرض مثل Beauveria وBt. تُدمج في IPM مع الرصد والعتبة الاقتصادية.",
      en: "Biological control uses natural enemies to lower pest density. Classical, augmentative and conservation modes apply. Predators include Coccinella septempunctata and Chrysoperla carnea larvae on aphids; parasitoids (Ichneumonoidea, Chalcidoidea) develop in or on hosts; pathogens include Beauveria bassiana and Bt Cry toxins at midgut receptors. In IPM these tools join monitoring, economic thresholds and selective chemistry.",
    },
    terms: ["Biological control","Coccinellidae","Chrysopidae","Parasitoid","Bt","IPM","Economic threshold"],
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
      ku: "Formicidae (ئۆردەری Hymenoptera، کلادی Aculeata) زیاتر لە ١٧٠٠٠–٢٠٠٠٠+ جۆری وەسفکراوی هەیە و نمونەیەکی تەواوی کۆمەڵایەتیی ڕاستەقینەیە: دابەشکردنی کار (شا، کارگەر، نێر)، نەوەی هاوپێچ، و چاودێریی هاوبەشی نەوە. پەیوەندیی کۆلۆنی بە فرۆمۆن دەبێت: ڕێچکە، ئاگاداری و ماددەی شا. کارگەر بێباڵە؛ باڵ تەنها لە باڵدارەکانی زایەندا دەر دەکەوێت. لە ئیکۆسیستەمدا: هەڵگەڕانی خاک، بڵاوکردنەوەی تۆو، نێچیرگری، و چاودێریی شەتەک. مێروولەی گەڵابڕی Attini هی ناوچەی گەرمی ئەمریکان و لە فەونای کوردستان نییە؛ لێرە Messor و جۆرەکانی Formicinae و Myrmicinae باون. مێروولەناسی لقێکی تایبەتی مێرووناسییە بۆ لێکۆڵینەوەی مێروولە.",
      ar: "Formicidae من Hymenoptera Aculeata؛ أكثر من ١٧ ألف نوع ونموذج eusociality كامل مع فيرومونات. الشغالة بلا أجنحة. بيئياً: تهوية تربة ونشر بذور وافتراس. نمل Attini القاطع استوائي أمريكي؛ في كردستان يسود Messor وغيره. علم النمل يدعى Myrmecology.",
      en: "Formicidae (Hymenoptera: Aculeata) comprises 17,000–20,000+ described species and classic eusociality — castes, overlapping generations, cooperative brood care — coordinated by pheromones. Workers are apterous; winged alates appear in nuptial flights. Ecologically they bioturbate soil, disperse seeds (myrmecochory), prey on arthropods and may tend aphids. Leafcutter Attini are Neotropical, not Kurdistan’s fauna; regional genera include Messor and other Formicinae/Myrmicinae. Myrmecology is the specialist study of ants.",
    },
    terms: ["Formicidae","Eusociality","Pheromone","Myrmecochory","Alates","Myrmecology","Aculeata"],
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
      ku: "توێژینەوە جیهانییەکان دەریان خستووە کە لە زۆر ناوچەدا چڕی و هەمەجۆریی مێروو دادەبەزێت — هەندێک خەمڵاندن باس لە نزیکەی ٤٠٪ی جۆرە مەترسیدارەکان دەکەن، بەپێی گروپ و ڕێباز جیاوازە. هۆکارە سەرەکییەکان: لەناوچوونی شوێنی ژیان، کشتوکاڵی یەکجۆر، سمی فراوان، پیسبوونی ڕووناکی، گۆڕانی کەشوهەوا و جۆری داگیرکەر. پاراستن واتایەتی: گوڵی ناوخۆیی بۆ پەیتێنەر، کەمکردنەوەی سم بە بەڕێوەبردنی تێکەڵ، کریدۆری ژینگەیی، و چاودێریی درێژخایەن بە تەڵەی مالایز، تەڵەی ڕووناکی و هێڵی ڕووپێوی. بێمێروو، پەیتاندن و شیبوونەوەی ماددەی ئۆرگانی و زنجیرەی خۆراکی باڵندە و خشۆکەکان لاواز دەبن.",
      ar: "تشير دراسات عالمية إلى تراجع كثافة وتنوع الحشرات في مناطق كثيرة؛ تقديرات الخطر تقارب ٤٠٪ حسب المجموعة والمنهج. الأسباب: فقدان الموائل، الزراعة الأحادية، المبيدات واسعة الطيف، تلوث الضوء، تغير المناخ والأنواع الغازية. الحل: نباتات محلية للملقحات، IPM، ممرات بيئية ورصد طويل الأمد (مصائد مالِيز والضوء).",
      en: "Global analyses show declines in insect abundance and diversity in many regions; ~40% of species may be threatened depending on taxon and method. Drivers: habitat loss, monocultures, broad-spectrum insecticides, light pollution, climate change and invasives. Responses: native floral resources, IPM, ecological corridors and long-term monitoring (Malaise, light and transect surveys).",
    },
    apps: {
      ku: [
        "پاراستنی شوێنی ژیانی سروشتی، دارستان و گوڵی ناوخۆیی بۆ پەیتێنەر",
        "کەمکردنەوەی سمی فراوان و جێگیرکردنی بەڕێوەبردنی تێکەڵ لە کشتوکاڵدا",
        "بەرەنگاربوونەوەی گۆڕانی کەشوهەوا و پیسبوونی ڕووناکی",
        "توێژینەوە و چاودێریی درێژخایەن (تەڵەی مالایز، تەڵەی ڕووناکی، هێڵی ڕووپێوی)",
        "هۆشیارکردنەوەی کۆمەڵگە و فێرکردنی خوێندکار لەسەر ڕۆڵی مێروو",
      ],
      ar: [
        "حماية الموائل والغابات والنباتات المحلية للملقحات",
        "تقليل المبيدات واسعة الطيف واعتماد IPM في الزراعة",
        "مواجهة تغير المناخ وتلوث الضوء",
        "البحث والرصد طويل الأمد (مصائد مالِيز والضوء والمقاطع)",
        "التوعية المجتمعية وتعليم الطلاب دور الحشرات",
      ],
      en: [
        "Protect habitats, woodland and native floral resources for pollinators",
        "Reduce broad-spectrum insecticides and embed IPM in agriculture",
        "Mitigate climate change and light pollution",
        "Long-term research and monitoring (Malaise, light traps, transects)",
        "Community awareness and student education on insect roles",
      ],
    },
  },
];

const LANG_CONFIG = {
  ku: { label: "کوردی", dir: "rtl" },
  ar: { label: "عربی", dir: "rtl" },
  en: { label: "English", dir: "ltr" },
};

const CH2_NAV = [
  { id: "intro", ku: "پێشەکی", ar: "المقدمة", en: "Preface" },
  { id: "def", ku: "پێناسە", ar: "التعريف", en: "Definition" },
  { id: "history", ku: "مێژوو", ar: "التاريخ", en: "History" },
  { id: "scientists", ku: "زانایان", ar: "العلماء", en: "Scientists" },
  { id: "kurdistan", ku: "کوردستان", ar: "كردستان", en: "Kurdistan" },
  { id: "evidence", ku: "داتابەس", ar: "القواعد", en: "Databases" },
  { id: "importance", ku: "گرنگی", ar: "الأهمية", en: "Importance" },
  { id: "challenges", ku: "ئاڵۆزییەکان", ar: "التحديات", en: "Challenges" },
  { id: "glossary", ku: "فەرهەنگ", ar: "المسرد", en: "Glossary" },
  { id: "biocontrol", ku: "کۆنترۆڵ", ar: "المكافحة", en: "Biocontrol" },
  { id: "ants", ku: "مێروولە", ar: "النمل", en: "Ants" },
  { id: "conservation", ku: "پارێزگاری", ar: "الحفاظ", en: "Conservation" },
  { id: "quiz", ku: "کویز", ar: "اختبار", en: "Quiz" },
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

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = ["intro", ...SECTIONS.map(s => s.id), "evidence", "quiz"];
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
              ? "کوردستان — ناوچە ژینگەییەکان، هەمەجۆریی Irano-Anatolian و شوێنی ژیانی مێروو"
              : lang === "ar"
              ? "كردستان — المناطق البيئية ونقطة Irano-Anatolian وموائل الحشرات"
              : "Kurdistan — ecological zones, Irano-Anatolian hotspot and insect habitats"}
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

const INTRO = {
  ku: {
    title: "پێشەکیی چاپتەر",
    lead: "ئەم چاپتەرە بنەمای زانستی مێرووناسی دەخاتە ڕوو: پێناسە، مێژوو، ناوچە، گرنگی، ئاڵۆزی و پاراستن.",
    p1: "مێروو (Insecta) زیاتر لە هەموو پۆلەکانی تری ئاژەڵ پێکەوە جۆری وەسفکراویان هەیە — نزیکەی یەک ملیۆن. لەژێر بەرد، لە نێوان گەڵا، لە خاک و ئاو و هەوادا، سیستەمی ژینگەیی بەبێ دەنگ ڕادەگرن: پەیتاندن، شیبوونەوە، نێچیرگری، و گواستنەوەی نەخۆشی.",
    p2: "لێرەدا مێرووناسی وەک زانستێکی ئەکادیمی دەخوێنرێتەوە: لە پێناسەی تاگمۆسیس و شەشقاچییەوە تا Linnaeus و بارکۆدی دی ئێن ئەی؛ لە فەونای کوردستان و ناوچەی هەمەجۆریی Irano-Anatolianـەوە تا بەڕێوەبردنی تێکەڵ، کۆنترۆڵی زیندەیی و پاراستنی شوێنی ژیان. ئامانج ئەوەیە خوێندکار بتوانێت مێروو وەک پەیتێنەر، زیانبەخش، گەیەنەری نەخۆشی یان نیشاندەری زیندوو جیا بکاتەوە.",
    p3: "دوای ئەم چاپتەرە، چاپتەری سێیەم (Arthropoda) پێکهاتەی جەستە قووڵتر دەکات؛ ئینجا ئۆردەرەکان (Lepidoptera، Hymenoptera، Coleoptera و هی دیکە) نموونەی ناوچەیی دەهێنن.",
  },
  ar: {
    title: "مقدمة الفصل",
    lead: "يعرض هذا الفصل أسس علم الحشرات: التعريف والتاريخ والمنطقة والأهمية والتحديات والحفظ.",
    p1: "الحشرات Insecta أكثر الطوائف الحيوانية أنواعاً موصوفة — نحو مليون نوع. تحت الحجارة وبين الأوراق وفي التربة والماء والهواء تحافظ بصمت على النظم البيئية: التلقيح والتحلل والافتراس ونقل الأمراض.",
    p2: "يُدرَس علم الحشرات هنا أكاديمياً: من tagmosis وhexapody إلى لينيوس وDNA barcoding؛ ومن فونة كردستان ونقطة Irano-Anatolian إلى IPM والمكافحة الحيوية وحفظ الموائل. الهدف أن يميّز الطالب الملقّح والآفة والناقل والمؤشر الحيوي.",
    p3: "بعد هذا الفصل يعمّق الفصل الثالث (Arthropoda) تركيب الجسم؛ ثم تأتي الرتب بأمثلة إقليمية.",
  },
  en: {
    title: "Chapter preface",
    lead: "This chapter lays the scientific foundations of entomology: definition, history, region, importance, challenges and conservation.",
    p1: "Insects (Insecta) hold more described species than all other animal classes combined — roughly one million. Under stones, among leaves, in soil, water and air they quietly sustain ecosystems through pollination, decomposition, predation and disease transmission.",
    p2: "Here entomology is taught as an academic science: from tagmosis and hexapody to Linnaeus and DNA barcoding; from Kurdistan’s fauna and the Irano-Anatolian hotspot to IPM, biocontrol and habitat protection. The aim is that a learner can separate pollinator, pest, vector and bioindicator.",
    p3: "Chapter 3 (Arthropoda) then deepens body plan; later order chapters bring regional examples.",
  },
};

function IntroSection({ lang }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const dir = LANG_CONFIG[lang]?.dir || "rtl";
  const pack = INTRO[lang] || INTRO.ku;
  return (
    <section
      ref={ref}
      id="intro"
      className={`ento-ch1-block ${visible ? "ento-visible" : ""}`}
      dir={dir}
      style={{ maxWidth: 880, margin: "0 auto", padding: "clamp(8px,2vw,16px) clamp(14px,4vw,28px) 0" }}
    >
      <header className="ento-ch1-head">
        <h2 className="ento-ch1-title">{pack.title}</h2>
        <p className="ento-ch1-lead">{pack.lead}</p>
      </header>
      <div className="ento-ch1-prose">
        <p>{pack.p1}</p>
        <p>{pack.p2}</p>
        <p>{pack.p3}</p>
      </div>
    </section>
  );
}

export default function Chapter2({ lang }) {
  const active = useActiveSection();
  return (
    <div className="ento-chapter-page ento-ch1">
      <PhotoHero
        lang={lang}
        image="/images/plates/ch2-drawer.jpg"
        imageAlt={{
          ku: "کاشێفی قوڕقوڕەی مۆزەخانە",
          ar: "درج خنافس في متحف",
          en: "Museum beetle drawer",
        }}
        focus="center 40%"
        num={{ ku: "چاپتەری دووەم", ar: "الفصل الثاني", en: "Chapter 2" }}
        icon="beetle"
        title={{
          ku: "دەستپێکی ئێنتۆمۆلۆجی",
          ar: "مقدمة علم الحشرات",
          en: "Introduction to Entomology",
        }}
        subtitle={{
          ku: "پێناسە · مێژوو · ناوچە · پاراستن",
          ar: "التعريف · التاريخ · المنطقة · الحفظ",
          en: "Definition · history · region · conservation",
        }}
      />
      <SectionPills lang={lang} items={CH2_NAV} active={active} />
      <IntroSection lang={lang} />
      <div className="ento-container">
        {SECTIONS.map((s, i) => (
          <SectionCard key={s.id} section={s} delay={i * 50} lang={lang} />
        ))}
      </div>
      <EvidencePanel lang={lang} />
      <p className="ento-ch1-lead" style={{ maxWidth: 880, margin: "0 auto 28px", padding: "0 clamp(14px,4vw,28px)" }} dir={lang === "en" ? "ltr" : "rtl"}>
        {lang === "ku"
          ? "بۆ قووڵایی ناوچەیی: "
          : lang === "ar"
          ? "للعمق الإقليمي: "
          : "For regional depth: "}
        <a href="#/ledger" style={{ color: "var(--accent)", fontWeight: 600 }}>
          {lang === "ku"
            ? "تۆماری فەونای مێرووی کوردستان"
            : lang === "ar"
            ? "سجل فونة حشرات كردستان"
            : "Kurdistan Entomofauna Ledger"}
        </a>
      </p>
      <QuizSection lang={lang} chapter="ch2" />
    </div>
  );
}

