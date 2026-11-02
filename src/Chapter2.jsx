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
      ku: "ئێنتۆمۆلۆجی (Entomology) لقێکی زانستی زیندەوەرە کە مێرووەکان (Insecta) دەخوێنێتەوە: مۆرفۆلۆجی، فیزیۆلۆجی، ژینگەناسی (Ecology)، ڕەفتار، پۆلێنکردن (Taxonomy و Systematics)، پەرەسەندن (Phylogeny)، و کارلێکیان لەگەڵ مرۆڤ و کشتوکاڵ. وشەکە لە یۆنانیی کۆنەوە هاتووە: ἔντομον (éntomon) «بڕدراو/مێروو» و -λογία «زانست». مێروو لەناو فایلەمی Arthropoda ـدان و بە tagmosis جیا دەکرێنەوە: سێ تاگماتا — سەر (cephalon)، سنگ (thorax) و سک (abdomen)؛ شەش قاچی یەکجۆر (hexapod)؛ یەک جووت ئەنتێنا؛ و زۆرجار باڵ لەسەر مزۆ- و مێتاتۆراکس. سیستەمی هەناسەدانیان تراکیاییە (tracheae + spiracles)، سوڕی خوێنیان کراوەیە (hemolymph)، و پەیەکەری دەرەکییان لە کایتین و پرۆتین پێک هاتووە. نزیکەی یەک ملیۆن جۆری وەسفکراو تۆمار کراوە — زیاتر لە هەموو پۆلەکانی تر پێکەوە.",
      ar: "علم الحشرات (Entomology) فرع من علم الأحياء يدرس طائفة الحشرات Insecta: الشكل والوظيفة والبيئة والسلوك والتصنيف (Taxonomy وSystematics) والتطور (Phylogeny) وعلاقتها بالإنسان والزراعة. الكلمة من اليونانية: ἔντομον و-λογία. الحشرات ضمن شعبة مفصليات الأرجل، وتتميز بـ tagmosis إلى ثلاثة أقسام: رأس وصدر وبطن، وست أرجل، وزوج واحد من قرون الاستشعار، وأجنحة غالباً على الصدر الأوسط والخلفي. تنفسها قصبي (tracheae وspiracles)، ودورانها مفتوح (hemolymph)، وهيكلها الخارجي من الكايتين والبروتين. وُصف نحو مليون نوع — أكثر من بقية الطوائف مجتمعة.",
      en: "Entomology is the biological science of the class Insecta: morphology, physiology, ecology, behaviour, taxonomy and systematics, phylogeny, and interactions with humans and agriculture. The name is from Ancient Greek ἔντομον (éntomon) and -λογία. Insects sit in phylum Arthropoda and are defined by tagmosis into three tagmata — head, thorax and abdomen — six uniramous legs, one pair of antennae, and usually wings on the meso- and metathorax. Gas exchange is tracheal (tracheae and spiracles), circulation is open (hemolymph), and the cuticle is chitin–protein. Roughly one million described species are known — more than all other animal classes combined.",
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
      ku: "لە Historia Animalium ـدا ئەرستۆ (سەدەی ٤ پ.ز.) مێرووی وەک ἔντομα جیا کردەوە و گۆڕانەپەڕەی تێبینی کرد. Carl Linnaeus لە Systema Naturae (١٠یەم چاپ، ١٧٥٨) ناوی دووانەی زانستی (binomial nomenclature) جێگیر کرد: Genus + specific epithet، وەک Apis mellifera. Jan Swammerdam (سەدەی ١٧) بە توێکاریی ورد سەلماندی کە لارڤا و گەورە هەمان زیندەوەرن و کۆئەندامی ناوەکی ئاڵۆزیان هەیە. William Kirby و William Spence لە Introduction to Entomology (١٨١٥–١٨٢٦) بناغەی ئێنتۆمۆلۆجیی مۆدێرنیان دانا. Charles Darwin و Alfred Russel Wallace تیۆری هەڵبژاردنی سروشتییان هێنا؛ دواتر co-evolution لە نێوان مێروو و Angiosperms ڕوون کرایەوە. لە سەدەی ٢٠دا karyotype، DNA barcoding (COI) و phylogenomics پۆلێنکردن و پەرەسەندنی مێروویان گۆڕی.",
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
      ku: "هەرێمی کوردستان و زنجیرەچیاکانی زاگرۆس لە ناوچەی Irano-Anatolian biodiversity hotspot ـدان: گۆڕانی بەرزی، نیمچە وشک و دارستانی ئاوێتە، ژینگەی جیاواز بۆ Lepidoptera، Coleoptera، Hymenoptera و Orthoptera دروست دەکات. توێژینەوە ئەکادیمییەکان (وەک لە زانکۆی ڕاپەڕین و دامەزراوەکانی ناوچەکە) جەخت لە: (١) تۆماری فەونای ناوخۆیی و جۆری endemic؛ (٢) مێرووی زیانبەخشی کشتوکاڵی و IPM — تێکەڵکردنی کۆنترۆڵی بایۆلۆجی، کلتووری و کیمیایی بەپێی ئاستی زیان (economic threshold)؛ (٣) پەیتاندن و تەندروستیی هەنگ (Apis mellifera)؛ (٤) کاریگەریی گۆڕانی کەشوهەوا لەسەر phenologyی مێروو. زانینی ئۆردەر و خێزان یارمەتی دەدات بۆ جیاکردنەوەی pollinator لە pest و vector.",
      ar: "تقع كردستان وجبال زاغروس ضمن نقطة التنوع Irano-Anatolian: ارتفاعات ومناخ شبه جاف وغابات مختلطة تهيئ موائل لـ Lepidoptera وColeoptera وHymenoptera وOrthoptera. تركز الأبحاث على: (١) جرد الفونة والأنواع المتوطنة؛ (٢) الآفات وIPM عند العتبة الاقتصادية؛ (٣) التلقيح وصحة نحل العسل؛ (٤) أثر تغير المناخ على الـphenology. معرفة الرتب والفصائل تميز الملقّح عن الآفة والناقل.",
      en: "The Kurdistan Region and the Zagros lie in the Irano-Anatolian biodiversity hotspot: elevation gradients, semi-arid climate and mixed woodland create habitats for Lepidoptera, Coleoptera, Hymenoptera and Orthoptera. Academic work focuses on (1) local faunistics and endemics; (2) crop pests and IPM keyed to economic thresholds; (3) pollination and Apis mellifera health; (4) climate effects on insect phenology. Knowing orders and families separates pollinators from pests and disease vectors.",
    },
    stats: [
      { icon:"", label:"Irano-Anatolian Hotspot" },
      { icon:"", label:"Endemic / Faunistics" },
      { icon:"", label:"IPM · Economic threshold" },
      { icon:"", label:"Pollinators · Apis" },
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
      ku: "مێروو لە چەند بواری ستراتیژیدا سەرەکین. (١) Bioindicators: Ephemeroptera، Plecoptera و Trichoptera (EPT) لە ئاو هەستیاریان بە پیسبوون هەیە؛ گۆڕانی کۆمەڵگەی مێروو دەری دەخات کە کوالێتی ئاو یان خاک گۆڕاوە. (٢) Forensic entomology: Calliphoridae و Sarcophagidae لەسەر تەرم؛ گەشەی لارڤا و ADD (accumulated degree days) بۆ خەمڵاندنی PMI. (٣) پەیتاندن: زیاتر لە ٧٥٪ی بەرهەمە کشتوکاڵییە سەرەکییەکان سوود لە ئاژەڵی پەیتاندن وەردەگرن؛ Apis و solitary bees و Syrphidae. (٤) IPM: چاودێری، ئاستی زیان، دوژمنی سروشتی، و کیمیایی وەک دوا هەنگاو. (٥) بیۆتەکنەلۆجی: Bombyx mori (ائبریشم)، Lac، و مێروو وەک سەرچاوەی پرۆتین (entomophagy).",
      ar: "للحشرات أدوار استراتيجية: (١) مؤشرات حيوية — EPT حساسة لتلوث الماء؛ (٢) حشرات جنائية — Calliphoridae ودرجة الحرارة المتراكمة لتقدير PMI؛ (٣) التلقيح — أكثر من ٧٥٪ من المحاصيل الرئيسية تستفيد من الملقحات؛ (٤) IPM — الرصد والعتبة والأعداء الطبيعيون ثم الكيميائي؛ (٥) تقانة حيوية — الحرير واللك والحشرات كبروتين.",
      en: "Insects matter strategically: (1) bioindicators — EPT taxa track freshwater quality; (2) forensic entomology — calliphorid growth and accumulated degree-days estimate PMI; (3) pollination — over 75% of leading food crops benefit from animal pollinators (Apis, solitary bees, hoverflies); (4) IPM — monitoring, thresholds, natural enemies, chemistry last; (5) biotech and food — silk, lac, and edible insects as protein.",
    },
    apps: {
      ku: [
        "EPT bioindicators — کوالێتی ئاو",
        "Forensic Entomology — PMI / ADD",
        "Pollination — Apis · solitary bees · Syrphidae",
        "IPM — economic threshold + biocontrol",
        "Sericulture / entomophagy — پرۆتین و ائبریشم",
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
      ku: "سێ تەوەری سەرەکی هەیە. (١) نەخۆشیی vector-borne: Anopheles spp. پلاسمۆدیۆمی مەلاریا دەگوازێتەوە؛ Aedes aegypti / Albopictus دەنگێ و زیکا و چیکونگونیا؛ Phlebotomus لەیشمانیا. گواستنەوە دەکرێت mechanical بێت یان biological (سوڕ لەناو جەستەی مێروودا). (٢) جۆری invasive: بێ دوژمنی سروشتی، ڕکابەری و نەخۆشی دەهێنن و زنجیرەی خۆراک دەگۆڕن. (٣) ئاسایشی خۆراک: Aphididae، Noctuidae، Tephritidae و Coleopteraی زیانبەخش دەتوانن زیانی ئابووریی گەورە بکەن؛ بەرگریی دژەکیمیایی (insecticide resistance) — وەک لە voltage-gated sodium channels یان acetylcholinesterase — IPM ناکارامە دەکات ئەگەر تەنها کیمیایی بەکار بهێنرێت.",
      ar: "ثلاثة محاور: (١) أمراض النواقل — Anopheles للملاريا، Aedes للدنج والزيكا، Phlebotomus للّيشمانيا؛ النقل آلي أو بيولوجي؛ (٢) أنواع غازية بلا أعداء طبيعيين؛ (٣) أمن غذائي — منّ وليلية وذباب الفاكهة وخنافس، مع مقاومة المبيدات التي تُضعف الاعتماد على الكيمياء وحدها.",
      en: "Three axes: (1) vector-borne disease — Anopheles and Plasmodium, Aedes and dengue/Zika/chikungunya, Phlebotomus and Leishmania; transmission may be mechanical or biological; (2) invasive species without natural enemies; (3) food security — aphids, noctuids, fruit flies and pest beetles, compounded by insecticide resistance (e.g. sodium-channel or AChE mutations) when chemistry is used alone.",
    },
    threats: [
      { icon:"", nameKu:"Vector-borne disease", nameAr:"أمراض النواقل", nameEn:"Vector-borne disease", eg:"Anopheles · Aedes · Phlebotomus" },
      { icon:"", nameKu:"Invasive species", nameAr:"أنواع غازية", nameEn:"Invasive species", eg:"بێ دوژمنی سروشتی · ڕکابەری" },
      { icon:"", nameKu:"Crop loss + resistance", nameAr:"خسائر ومقاومة مبيدات", nameEn:"Crop loss + resistance", eg:"Aphididae · Noctuidae · IPM" },
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
      { term:"Hemimetabola", ku:"گۆڕانەپەڕەی ناتەواو — هێلکە، نەمف، گەورە (بێ پیت)", ar:"تحول ناقص — بيضة، حورية، بالغ", en:"Incomplete metamorphosis — egg, nymph, adult" },
      { term:"Phylogeny", ku:"دارەی پەرەسەندن — پەیوەندیی باوباپیری هاوبەش", ar:"شجرة النشوء — أسلاف مشتركة", en:"Evolutionary tree — shared ancestry" },
      { term:"DNA barcoding", ku:"ناسنامەی گەردی — زۆرجار ژنێ COIی مایتۆکۆندریا", ar:"باركود DNA — غالباً جين COI", en:"Molecular ID — often mitochondrial COI" },
      { term:"Parasitoid", ku:"زیندەوەرێک کە خانەخوێ دەکوژێت پێش تەواوبوونی گەشە", ar:"طفيل يقتل عائله قبل تمام نموه", en:"An organism that kills its host before finishing development" },
      { term:"Eusociality", ku:"کۆمەڵگە — دابەشکردنی کار، نەوەی هاوپێچ، چاودێریی هاوبەشی نەوە", ar:"حياة اجتماعية — تقسيم عمل ورعاية مشتركة", en:"Castes, overlapping generations, cooperative brood care" },
      { term:"Economic threshold", ku:"ئاستی زیان کە دەستتێوەردان تێیدا سوودەکەی زیاترە لە تێچوو", ar:"عتبة اقتصادية — التدخل أجدى من التكلفة", en:"Pest density where control costs less than expected loss" },
      { term:"Phenology", ku:"کاتی ڕووداوەکانی سوڕی ژیان لە ساڵدا", ar:"فينولوجيا — توقيت أحداث دورة الحياة", en:"Seasonal timing of life-cycle events" },
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
      ku: "کۆنترۆڵی بایۆلۆجی (biological control) بەکارهێنانی دوژمنی سروشتییە بۆ کەمکردنەوەی چڕیی pest، نەک تەنها xenobiotic. سێ مۆدێلی کلاسیک: classical (هێنانی دوژمن بۆ invasive pest)، augmentative (زیادکردنی ژمارە)، و conservation (پاراستنی دوژمنی ناوخۆیی). Predator: Coccinella septempunctata و Adalia bipunctata شەتەک (Aphididae) دەخۆن؛ لارڤای Chrysoperla carnea هەر شەتەک دەخوات (mandiblesی کونکەر-مژەر). Parasitoid: زۆربەی Ichneumonoidea و Chalcidoidea هێلکە لەناو/لەسەر خانەخوێ دادەنێن؛ endoparasitoid لەناو جەستە گەشە دەکات و خانەخوێ دەکوژێت. Pathogen: Beauveria bassiana و Bacillus thuringiensis (Bt toxins لەسەر midgut receptors). لە IPMـدا biocontrol لەگەڵ monitoring و economic threshold و selective chemistry تێکەڵ دەکرێت.",
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
      ku: "Formicidae (ئۆردەر Hymenoptera، کلاد Aculeata) زیاتر لە ١٧٠٠٠–٢٠٠٠٠+ جۆری وەسفکراوی هەیە و نمونەی eusocialityی تەواوە: دابەشکردنی کار (queen / workers / males)، نەوەی هاوپێچ، و چاودێریی هاوبەشی brood. پەیوەندیی کۆلۆنی بە pheromone دەبێت (trail، alarm، queen substance). کارگەر بێباڵە (apterous)؛ باڵ تەنها لە alatesی زایەندا دەردەکەوێت. لە ئیکۆسیستەمدا: bioturbationی خاک، myrmecochory (بڵاوکردنەوەی تۆو)، predation و tendingی شەتەک (trophobiosis). Attiniی گەڵابڕ (fungus-farming) هی Neotropicsـە و لە فەونای کوردستان نییە؛ لێرە Messor (harvester ants) و جۆرەکانی Formicinae / Myrmicinae باون. Myrmecology لقێکی تایبەتی ئێنتۆمۆلۆجییە بۆ لێکۆڵینەوەی مێروولە.",
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
      ku: "توێژینەوە جیهانییەکان (وەک لە «insect apocalypse» و meta-analysesی biomass) دەریان خستووە کە لە زۆر ناوچەدا چڕی و هەمەجۆریی مێروو دادەبەزێت — هەندێک خەمڵاندن باس لە نزیکەی ٤٠٪ی جۆرە مەترسیدارەکان دەکەن، بەپێی گروپ و میتۆد جیاوازە. هۆکارە سەرەکییەکان: لەناوچوونی habitat، monoculture، insecticideی فراوان، light pollution، گۆڕانی کەشوهەوا و invasive species. پاراستن واتایەتی: پارکی گوڵی ناوخۆیی بۆ pollinators، کەمکردنەوەی سم بە IPM، کریدۆری ژینگەیی، و monitoringی درێژخایەن (transect، Malaise، light traps). بێ مێروو: پەیتاندن، تەرخانکردنی ماددەی ئۆرگانی، و زنجیرەی خۆراکی باڵندە و هێلکەدەرەکان لاواز دەبن.",
      ar: "تشير دراسات عالمية إلى تراجع كثافة وتنوع الحشرات في مناطق كثيرة؛ تقديرات الخطر تقارب ٤٠٪ حسب المجموعة والمنهج. الأسباب: فقدان الموائل، الزراعة الأحادية، المبيدات واسعة الطيف، تلوث الضوء، تغير المناخ والأنواع الغازية. الحل: نباتات محلية للملقحات، IPM، ممرات بيئية ورصد طويل الأمد (مصائد مالِيز والضوء).",
      en: "Global analyses show declines in insect abundance and diversity in many regions; ~40% of species may be threatened depending on taxon and method. Drivers: habitat loss, monocultures, broad-spectrum insecticides, light pollution, climate change and invasives. Responses: native floral resources, IPM, ecological corridors and long-term monitoring (Malaise, light and transect surveys).",
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

