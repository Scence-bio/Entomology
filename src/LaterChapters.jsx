import { useState } from "react";
import { Mark } from "./marks";
import { QuizSection } from "./quiz/Quiz";
import { IdKey } from "./idKey/IdKey";

function text(lang, pack) {
  return pack[lang] || pack.en;
}

function Hero({ lang, chapter }) {
  return (
    <div className="ento-chapter-hero" style={{ position: "relative", overflow: "hidden", minHeight: 420, padding: 0 }}>
      <img
        src={chapter.image}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: chapter.focus || "center" }}
      />
      <div className="ento-chapter-hero-scrim" />
      <div style={{ position: "relative", zIndex: 2, minHeight: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "clamp(36px,6vw,64px) 20px" }}>
        <div className="ento-chapter-hero-num">{text(lang, chapter.num)}</div>
        <span className="ento-chapter-hero-icon"><Mark name={chapter.icon} /></span>
        <h1 className="ento-chapter-hero-title">{text(lang, chapter.title)}</h1>
        {chapter.latin && <div className="ento-binomial">{chapter.latin}</div>}
      </div>
    </div>
  );
}

function FamilyPicker({ lang, families }) {
  const [id, setId] = useState(families[0].id);
  const family = families.find((item) => item.id === id);
  const rows = family.rows[lang] || family.rows.en;
  return (
    <>
      <div className="ento-pick-row">
        {families.map((item) => (
          <button key={item.id} type="button" className={`ento-pick ${item.id === id ? "active" : ""}`} aria-pressed={item.id === id} onClick={() => setId(item.id)}>
            <span className="ento-binomial">{item.name}</span>
            <span>{text(lang, item.title)}</span>
          </button>
        ))}
      </div>
      <ul className="ento-fact-list">
        {rows.map(([label, value]) => (
          <li key={label}><span>{label}</span><strong>{value}</strong></li>
        ))}
      </ul>
    </>
  );
}

function SpeciesTable({ lang, species }) {
  const heads = {
    ku: ["ناوی زانستی", "خێزان", "ناوی باو", "شوێن"],
    ar: ["الاسم العلمي", "الفصيلة", "الاسم الشائع", "الموطن"],
    en: ["Scientific name", "Family", "Common name", "Where"],
  }[lang] || ["Scientific name", "Family", "Common name", "Where"];
  return (
    <table className="ento-record">
      <thead>
        <tr>{heads.map((head) => <th key={head}>{head}</th>)}</tr>
      </thead>
      <tbody>
        {species.map((row) => (
          <tr key={row.name}>
            <td className="ento-binomial">{row.name}</td>
            <td className="ento-binomial">{row.family}</td>
            <td>{text(lang, row.common)}</td>
            <td>{text(lang, row.where)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TaxonChapter({ lang, chapter, quiz }) {
  const dir = lang === "en" ? "ltr" : "rtl";
  return (
    <div className="ento-chapter-page">
      <Hero lang={lang} chapter={chapter} />
      <div className="ento-container" dir={dir}>
        {chapter.blocks.map((block) => (
          <article key={block.id} id={block.id} className="ento-card ento-visible" style={{ direction: dir }}>
            <div className="ento-card-header">
              <div>
                <div className="ento-card-num">{block.num}</div>
                <div className="ento-card-title-ku">{text(lang, block.title)}</div>
              </div>
            </div>
            <p className="ento-body">{text(lang, block.body)}</p>
            {block.families && <FamilyPicker lang={lang} families={block.families} />}
            {block.species && <SpeciesTable lang={lang} species={block.species} />}
          </article>
        ))}
      </div>
      <QuizSection lang={lang} chapter={quiz} />
    </div>
  );
}

const HYMENOPTERA = {
  image: "/images/plates/ch6-bee.jpg",
  icon: "bee",
  latin: "Hymenoptera",
  num: { ku: "چاپتەری پێنجەم", ar: "الفصل الخامس", en: "Chapter 5" },
  title: { ku: "مێروولە، هەنگ و زەنبوور", ar: "النمل والنحل والزنابير", en: "Ants, bees and wasps" },
  blocks: [
    {
      id: "hym-def",
      num: "٠١ · 01",
      title: { ku: "پێناسە", ar: "التعريف", en: "What they are" },
      body: {
        ku: "Hymenoptera یەکێک لە گەورەترین ئۆردەرەکانە (Symphyta + Apocrita). ناوی hymen «پەردە» + pteron «باڵ»: دوو جووت باڵی membranous؛ لە Apocritaـدا hamuli باڵی پێش و دواوە دەبەستێتەوە بۆ یەک ڕووی فڕین. propodeum و petiole کەمەری باریک (wasp-waist) دروست دەکەن. گۆڕانەپەڕە holometabolousـە. Aculeata (هەنگ، زەنبوور، مێروولە) ovipositorیان بووە بە نیشتر؛ Parasitica زۆربەیان parasitoidن. haplodiploidy: نێر لە هێلکەی unfertilized (haploid)، مێ لە fertilized (diploid) — بنەمای تیۆری kin selection بۆ eusociality. ئیکۆلۆجی: pollination، predation، parasitism و bioturbation.",
        ar: "Hymenoptera من أكبر الرتب (Symphyta وApocrita). جناحان غشائيان مع hamuli في Apocrita وخصر petiole. تحول كامل. Aculeata ذات حمة؛ كثير من Parasitica طفيليات. haplodiploidy يفسر جزئياً eusociality. أدوار: تلقيح وافتراس وتطفل وتهوية تربة.",
        en: "Hymenoptera is among the largest orders (Symphyta + Apocrita). The name means membrane-wing: two membranous pairs; Apocrita couple them with hamuli. A petiole creates the narrow waist. Development is holometabolous. Aculeata have a sting derived from the ovipositor; many Parasitica are parasitoids. Haplodiploidy (haploid males, diploid females) underpins kin-selection models of eusociality. Roles: pollination, predation, parasitism and soil bioturbation.",
      },
    },
    {
      id: "hym-families",
      num: "٠٢ · 02",
      title: { ku: "سێ خێزان", ar: "ثلاث فصائل", en: "Three families" },
      body: {
        ku: "سێ خێزانی Apocrita: eusocial Formicidae، pollinatorی Apidae، و parasitoidی Ichneumonidae — هەمان ئۆردەر، nicheی جیاواز.",
        ar: "ثلاث فصائل: نمل اجتماعي ونحل ملقّح وزنابير طفيلية.",
        en: "Three Apocrita families: eusocial ants, pollinating bees and parasitoid wasps — one order, divergent niches.",
      },
      families: [
        {
          id: "formicidae",
          name: "Formicidae",
          title: { ku: "مێروولە", ar: "النمل", en: "Ants" },
          rows: {
            ku: [["باڵ", "کارگەر apterous؛ alate تەنها بۆ nest founding"], ["کۆمەڵگە", "eusocial: queen / workers / males؛ caste polymorphism"], ["کار", "bioturbation، granivory (Messor)، predation/tending"]],
            ar: [["الأجنحة", "الشغالة بلا جناح"], ["المستعمرة", "eusocial: ملكة وشغالة وذكور"], ["العمل", "تهوية تربة وبذور وافتراس"]],
            en: [["Wings", "workers apterous; alates for dispersal"], ["Colony", "eusocial castes: queen, workers, males"], ["Work", "bioturbation, granivory, predation"]],
          },
        },
        {
          id: "apidae",
          name: "Apidae",
          title: { ku: "هەنگ", ar: "النحل", en: "Bees" },
          rows: {
            ku: [["موو", "plumose hairs + corbicula/scopa بۆ pollen"], ["خۆراک", "nectar + pollen (گەورە و لارڤا)"], ["نموونە", "Apis mellifera، Bombus، Xylocopa"]],
            ar: [["الشعر", "شعيرات متفرعة وسلة لقاح"], ["الغذاء", "رحيق وحبوب لقاح"], ["أمثلة", "Apis وBombus وXylocopa"]],
            en: [["Hair", "plumose hairs; corbicula/scopa for pollen"], ["Food", "nectar and pollen"], ["Examples", "Apis mellifera, Bombus, Xylocopa"]],
          },
        },
        {
          id: "ichneumonidae",
          name: "Ichneumonidae",
          title: { ku: "زەنبووری پارازیتۆید", ar: "الزنابير الطفيلية", en: "Parasitoid wasps" },
          rows: {
            ku: [["ئامراز", "ovipositorی درێژ (endo/ecto-parasitoid)"], ["کار", "هێلکە لە/لەسەر host larva → host دەکوژرێت"], ["بەکارهێنان", "classical & augmentative biocontrol"]],
            ar: [["الأداة", "حامل بيض طويل"], ["العمل", "طفيل يقتل العائل"], ["الاستعمال", "مكافحة حيوية"]],
            en: [["Tool", "elongate ovipositor"], ["Work", "egg in/on host larva; host usually dies"], ["Use", "classical and augmentative biocontrol"]],
          },
        },
      ],
    },
    {
      id: "hym-species",
      num: "٠٣ · 03",
      title: { ku: "جۆرە باوەکانی ناوچەکە", ar: "أنواع شائعة في المنطقة", en: "Common species of the region" },
      body: {
        ku: "ئەمانە جۆری باوی کوردستان و دەوروبەرین، نەک ئەنجامی سەرژمێرێک. مێروولەی گەڵابڕ لێرە نییە.",
        ar: "هذه أنواع شائعة في كردستان وما حولها، لا حصيلة تعداد. نمل قاطع الأوراق ليس منها.",
        en: "These are common species of Kurdistan and the country around it, not a counted survey. Leafcutter ants are not among them.",
      },
      species: [
        { name: "Apis mellifera", family: "Apidae", common: { ku: "هەنگی هەنگوین", ar: "نحل العسل", en: "Honey bee" }, where: { ku: "باخ و هەنگەڵان", ar: "بساتين وخلايا", en: "Orchards and hives" } },
        { name: "Vespa orientalis", family: "Vespidae", common: { ku: "زەنبووری ڕۆژهەڵاتی", ar: "الدبور الشرقي", en: "Oriental hornet" }, where: { ku: "شار و باخ", ar: "مدن وبساتين", en: "Towns and orchards" } },
        { name: "Messor spp.", family: "Formicidae", common: { ku: "مێروولەی دانەکۆکەرەوە", ar: "النمل الحاصد", en: "Harvester ant" }, where: { ku: "کێڵگە و خاکی وشک", ar: "حقول وأرض جافة", en: "Fields and dry ground" } },
      ],
    },
  ],
};

const COLEOPTERA = {
  image: "/images/plates/ch7-ladybird.jpg",
  icon: "beetle",
  latin: "Coleoptera",
  focus: "center 42%",
  num: { ku: "چاپتەری شەشەم", ar: "الفصل السادس", en: "Chapter 6" },
  title: { ku: "قوڕقوڕەکان", ar: "الخنافس", en: "Beetles" },
  blocks: [
    {
      id: "col-def",
      num: "٠١ · 01",
      title: { ku: "پێناسە", ar: "التعريف", en: "What they are" },
      body: {
        ku: "Coleoptera گەورەترین ئۆردەری Insectaـیە (~٤٠٠٠٠٠ جۆری وەسفکراو). coleos «قاوغ» + pteron «باڵ»: forewing بووە بە elytraی sclerotized کە لە mesothoraxـەوە دێن و لەسەر خطی mid-dorsal (suture) یەک دەگرن؛ hindwingی membranous بۆ فڕین دەپارێزرێت. pronotum گەورەیە؛ گۆڕانەپەڕە holometabolousـە (لارڤای campodeiform یان scarabaeiform). خێزانەکان: Coccinellidae (پێشەنگی biocontrolی شەتەک)، Carabidae (زەوی)، Scarabaeidae، Curculionidae (زیانبەخشی کشتوکاڵی). elytra ڕێگە دەدات بژیون لە ژینگەی وشک و ژێر قەڵبەدا.",
        ar: "Coleoptera أكبر رتبة (~٤٠٠ ألف نوع). الأغماد elytra تحمي جناح الطيران. تحول كامل. Coccinellidae للمكافحة الحيوية؛ Curculionidae آفات مهمة.",
        en: "Coleoptera is the largest insect order (~400,000 described species). Forewings are sclerotized elytra meeting at a mid-dorsal suture and shielding membranous hindwings. Development is holometabolous (campodeiform or scarabaeiform larvae). Key families: Coccinellidae (aphid biocontrol), Carabidae, Scarabaeidae, Curculionidae (major crop pests). Elytra enable life in dry and cryptic habitats.",
      },
    },
    {
      id: "col-families",
      num: "٠٢ · 02",
      title: { ku: "سێ خێزان", ar: "ثلاث فصائل", en: "Three families" },
      body: {
        ku: "قاوغەکە هەمان شتە. شێوە و خۆراکەکە جیاوازە.",
        ar: "الغمد واحد. الشكل والطعام يختلفان.",
        en: "The hard cover is the shared mark. Shape and food are not.",
      },
      families: [
        {
          id: "coccinellidae",
          name: "Coccinellidae",
          title: { ku: "خاڵخاڵۆکە", ar: "الدعسوقيات", en: "Ladybirds" },
          rows: {
            ku: [["شێوە", "hemispherical؛ aposematic spots"], ["خۆراک", "لارڤا و گەورە زۆرجار aphidophagous"], ["کار", "predator لە IPM / biocontrol"]],
            ar: [["الشكل", "نصف كروي ومنقّط"], ["الطعام", "المن غالباً"], ["العمل", "مفترس في المكافحة الحيوية"]],
            en: [["Shape", "hemispherical; often aposematic"], ["Food", "larvae and adults often aphidophagous"], ["Work", "key predators in IPM"]],
          },
        },
        {
          id: "carabidae",
          name: "Carabidae",
          title: { ku: "قوڕقوڕەی زەوی", ar: "الخنافس الأرضية", en: "Ground beetles" },
          rows: {
            ku: [["قاچ", "cursorial؛ زۆرجار nocturnal cursorial predators"], ["خۆراک", "زۆربە predatory (generalist)"], ["نموونە", "Calosoma sycophanta → Lepidoptera larvae"]],
            ar: [["الأرجل", "عدّاءة"], ["الطعام", "مفترسات عامة غالباً"], ["مثال", "Calosoma على يرقات الفراش"]],
            en: [["Legs", "cursorial runners"], ["Food", "mostly generalist predators"], ["Example", "Calosoma on lepidopteran larvae"]],
          },
        },
        {
          id: "scarabaeidae",
          name: "Scarabaeidae",
          title: { ku: "قوڕقوڕەی قاوغ", ar: "الجعليات", en: "Scarabs" },
          rows: {
            ku: [["ئەنتێنا", "lamellate club"], ["خۆراک", "dung / roots / floral resources (guild جیاواز)"], ["نموونە", "Cetonia aurata — floricolous"]],
            ar: [["القرون", "صولجان صفائحي"], ["الطعام", "روث أو جذور أو أزهار"], ["مثال", "Cetonia على الأزهار"]],
            en: [["Antennae", "lamellate club"], ["Food", "dung, roots or flowers by guild"], ["Example", "Cetonia aurata on flowers"]],
          },
        },
      ],
    },
    {
      id: "col-species",
      num: "٠٣ · 03",
      title: { ku: "جۆرە باوەکانی ناوچەکە", ar: "أنواع شائعة في المنطقة", en: "Common species of the region" },
      body: {
        ku: "هەر سێکیان لە ناوچەی کوردستان و وڵاتانی دراوسێدا دەبینرێن.",
        ar: "الثلاثة تُرى في كردستان والبلاد المجاورة.",
        en: "All three are seen in Kurdistan and the countries beside it.",
      },
      species: [
        { name: "Coccinella septempunctata", family: "Coccinellidae", common: { ku: "خاڵخاڵۆکەی حەوت خاڵ", ar: "دعسوقة السبع نقط", en: "Seven-spot ladybird" }, where: { ku: "کێڵگە و باخچە", ar: "حقول وحدائق", en: "Fields and gardens" } },
        { name: "Calosoma sycophanta", family: "Carabidae", common: { ku: "قوڕقوڕەی ڕاوکەری کرم", ar: "خنفساء صائدة اليساريع", en: "Forest caterpillar hunter" }, where: { ku: "دارستان", ar: "غابات", en: "Woodland" } },
        { name: "Cetonia aurata", family: "Scarabaeidae", common: { ku: "قوڕقوڕەی گوڵ", ar: "خنفساء الورد", en: "Rose chafer" }, where: { ku: "گوڵ و باخ", ar: "أزهار وبساتين", en: "Flowers and gardens" } },
      ],
    },
  ],
};

const DIPTERA = {
  image: "/images/plates/ch8-mosquito.jpg",
  icon: "fly",
  latin: "Diptera",
  num: { ku: "چاپتەری حەوتەم", ar: "الفصل السابع", en: "Chapter 7" },
  title: { ku: "مێش و مێشوولە", ar: "الذباب والبعوض", en: "Flies and mosquitoes" },
  blocks: [
    {
      id: "dip-def",
      num: "٠١ · 01",
      title: { ku: "پێناسە", ar: "التعريف", en: "What they are" },
      body: {
        ku: "Diptera («دوو-باڵ») تەنها یەک جووت باڵی فڕینی کارکردن هەیە لەسەر mesothorax؛ metathoracic wings بوونەتە halteres — هەستەوەری gyroscopic بۆ هاوسەنگی فڕین. گۆڕانەپەڕە holometabolousـە؛ لارڤا زۆرجار apodousـە (maggot). دەم جۆراوجۆرە: piercing-sucking (Culicidaeی مێینە)، sponging (Musca)، یان sucking لەسەر nectar (Syrphidae). Nematocera (مێشوولە و هاوشێوە) و Brachycera (مێشی ماڵ و گوڵ) دوو کلادی گەورەن. Culicidae: Anopheles → Plasmodium؛ Aedes → dengue/Zika؛ Culex → هەندێک arbovirus. forensic و pollination و veterinary entomology زۆر پشتی پێ دەبەستن.",
        ar: "Diptera زوج طيران واحد وhalteres للتوازن. تحول كامل ويرقة غالباً بلا أرجل. أنوفثيلة تنقل الملاريا وأيدس الضنك والزيكا. أقسام Nematocera وBrachycera.",
        en: "Diptera (‘two wings’) retain one functional flight pair; hindwings are gyroscopic halteres. Holometabolous; larvae often apodous maggots. Mouthparts range from piercing-sucking (female Culicidae) to sponging (Musca) or nectar-feeding (Syrphidae). Major clades: Nematocera and Brachycera. Medically: Anopheles–Plasmodium, Aedes–dengue/Zika. Critical for forensic, veterinary and pollination science.",
      },
    },
    {
      id: "dip-families",
      num: "٠٢ · 02",
      title: { ku: "سێ خێزان", ar: "ثلاث فصائل", en: "Three families" },
      body: {
        ku: "مەلاریا و زیکا هی یەک مێشوولە نین. Anopheles مەلاریا دەگوازێتەوە. Aedes دەتوانێت دێنگ و زیکا بگوازێتەوە.",
        ar: "الملاريا وزيكا ليستا بعوضة واحدة. Anopheles ينقل الملاريا. Aedes يمكن أن ينقل الضنك وزيكا.",
        en: "Malaria and Zika are not the same mosquito. Anopheles carries malaria. Aedes can carry dengue and Zika.",
      },
      families: [
        {
          id: "culicidae",
          name: "Culicidae",
          title: { ku: "مێشوولە", ar: "البعوض", en: "Mosquitoes" },
          rows: {
            ku: [["دەم", "proboscisی piercing-sucking؛ نێر nectar"], ["مێینە", "anautogeny: خوێن بۆ yolk"], ["نەخۆشی", "Anopheles–Plasmodium؛ Aedes–dengue/Zika"]],
            ar: [["الفم", "خرطوم ثاقب ماص"], ["الأنثى", "دم لتشكيل البيض"], ["المرض", "Anopheles ملاريا؛ Aedes دنج/زيكا"]],
            en: [["Mouth", "piercing-sucking; males often nectar"], ["Female", "blood meal for egg yolk (anautogeny)"], ["Disease", "Anopheles–Plasmodium; Aedes–dengue/Zika"]],
          },
        },
        {
          id: "muscidae",
          name: "Muscidae",
          title: { ku: "مێشی ماڵەوە", ar: "الذباب المنزلي", en: "House flies" },
          rows: {
            ku: [["دەم", "sponging labellum (pseudotracheae)"], ["گەز", "M. domestica non-biting؛ Stomoxys دەگەزێت"], ["زیان", "mechanical vectorی pathogens لەسەر tarsi/labellum"]],
            ar: [["الفم", "إسفنجي"], ["اللسع", "المنزلية لا تلسع"], ["الضرر", "ناقل آلي للجراثيم"]],
            en: [["Mouth", "sponging labellum"], ["Bite", "M. domestica non-biting; stable flies bite"], ["Harm", "mechanical pathogen vector on tarsi/mouth"]],
          },
        },
        {
          id: "syrphidae",
          name: "Syrphidae",
          title: { ku: "مێشی گوڵ", ar: "ذباب الأزهار", en: "Hoverflies" },
          rows: {
            ku: [["شێوە", "Batesian mimicryی Apidae/Vespidae؛ ١ جووت باڵ + halteres"], ["گەورە", "pollinatorی کارا"], ["لارڤا", "زۆر aphidophagous (IPM)"]],
            ar: [["الشكل", "تشبه النحل وبزوج واحد"], ["البالغ", "ملقّح"], ["اليرقة", "كثيرها يفترس المن"]],
            en: [["Look", "bee/wasp mimic; one wing pair + halteres"], ["Adult", "active pollinator"], ["Larva", "many aphidophagous (IPM)"]],
          },
        },
      ],
    },
    {
      id: "dip-species",
      num: "٠٣ · 03",
      title: { ku: "جۆرە باوەکانی ناوچەکە", ar: "أنواع شائعة في المنطقة", en: "Common species of the region" },
      body: {
        ku: "Anopheles superpictus لە گوازەرەوەکانی مەلاریای ئەم ناوچەیە بووە. وێنەی سەرەوە مێشوولەیەکی Anopheles ـە، بۆ نیشاندانی شێوەکە.",
        ar: "Anopheles superpictus من نواقل الملاريا في هذه المنطقة. الصورة أعلاه بعوضة Anopheles لبيان الشكل.",
        en: "Anopheles superpictus has been a malaria vector in this region. The picture above is an Anopheles mosquito, to show the shape.",
      },
      species: [
        { name: "Anopheles superpictus", family: "Culicidae", common: { ku: "مێشوولەی مەلاریا", ar: "بعوض الملاريا", en: "A malaria mosquito" }, where: { ku: "ئاو و دۆڵ", ar: "ماء ووديان", en: "Water and valleys" } },
        { name: "Musca domestica", family: "Muscidae", common: { ku: "مێشی ماڵەوە", ar: "الذبابة المنزلية", en: "House fly" }, where: { ku: "ماڵ و بازاڕ", ar: "بيوت وأسواق", en: "Houses and markets" } },
        { name: "Eristalis tenax", family: "Syrphidae", common: { ku: "مێشی گوڵ", ar: "ذبابة الأزهار", en: "Drone fly" }, where: { ku: "گوڵ و ئاو", ar: "زهر وماء", en: "Flowers and water" } },
      ],
    },
  ],
};

function FieldChapter({ lang, quiz }) {
  const pins = [
    { id: "lep", name: "Lepidoptera", where: { ku: "لە ناوەڕاستی سنگ", ar: "في وسط الصدر", en: "Through the middle of the thorax" } },
    { id: "col", name: "Coleoptera", where: { ku: "لە ئیلیترۆنی ڕاست، نزیک شانە", ar: "في الغمد الأيمن، قرب الكتف", en: "Through the right elytron, near the shoulder" } },
    { id: "hym", name: "Hymenoptera", where: { ku: "لە سنگ، کەمێک بۆ لای ڕاست", ar: "في الصدر، مائلاً قليلاً إلى اليمين", en: "Through the thorax, a little to the right" } },
    { id: "dip", name: "Diptera", where: { ku: "لە سنگ", ar: "في الصدر", en: "Through the thorax" } },
  ];
  const [pin, setPin] = useState(pins[0].id);
  const chosen = pins.find((item) => item.id === pin);
  const dir = lang === "en" ? "ltr" : "rtl";
  return (
    <div className="ento-chapter-page">
      <Hero lang={lang} chapter={{
        image: "/images/plates/ch9-net.jpg",
        focus: "center 62%",
        icon: "net",
        num: { ku: "چاپتەری یازدەهەم", ar: "الفصل الحادي عشر", en: "Chapter 11" },
        title: { ku: "کێڵگە و لەیبڵ", ar: "الحقل والبطاقة", en: "Field and label" },
      }} />
      <div className="ento-container" dir={dir}>
        <article className="ento-card ento-visible" id="field-collect" style={{ direction: dir }}>
          <div className="ento-card-header">
            <div>
              <div className="ento-card-num">٠١ · 01</div>
              <div className="ento-card-title-ku">{lang === "ku" ? "کۆکردنەوە" : lang === "ar" ? "الجمع" : "Collecting"}</div>
            </div>
          </div>
          <p className="ento-body">
            {lang === "ku"
              ? "sweep net / aerial net بۆ Rhopalocera و Apidae لەسەر گوڵ؛ beating tray یان گەڵابینین بۆ Coccinellidae و Aphididae؛ pitfall trap (دەفری نوقم لە خاک، زۆرجار + preservative) بۆ Carabidaeی epigeic. بۆ Culicidae: larval dipping لە ئاو؛ بۆ parasitoid: rearing لە host. protocolی voucher: GPS/ناوچە، elevation، habitat، host plant، collector، date (Roman month). sample size بچووک بێت (ethics + conservation)؛ بێ locality و date تەنها وێنەیە، نەک museum record."
              : lang === "ar"
              ? "شبكة هوائية للفراش والنحل؛ فحص أوراق للمن والدعسوقة؛ مصيدة pitfall لخنافس الأرض. سجّل الإحداثيات والموطن والنبات العائل والجامع والتاريخ. بلا موقع وتاريخ ليست عينة علمية."
              : "Aerial/sweep nets for butterflies and bees; leaf inspection or beating for ladybirds and aphids; pitfall traps for epigeic Carabidae. Mosquito work often uses larval dipping; parasitoids via host rearing. A voucher needs locality (ideally GPS), habitat, host plant, collector and date (day–Roman month–year). Without locality and date it is an image, not a museum record."}
          </p>
        </article>

        <article className="ento-card ento-visible" id="field-pin" style={{ direction: dir }}>
          <div className="ento-card-header">
            <div>
              <div className="ento-card-num">٠٢ · 02</div>
              <div className="ento-card-title-ku">{lang === "ku" ? "شوێنی دەرزە" : lang === "ar" ? "موضع الدبوس" : "Where the pin goes"}</div>
            </div>
          </div>
          <p className="ento-body">
            {lang === "ku"
              ? "entomological pin (زۆرجار #2–#3) لە لای ڕاستی mid-line تێدەچێت تا charactersی diagnostic (elytra suture، scutellum، wing venation، genitalia) نەشاردرێن. double-mount / minuten بۆ نمونەی زۆر بچووک. ئۆردەرێک هەڵبژێرە."
              : lang === "ar"
              ? "الدبوس يمر يمين الخط الوسطي دون إخفاء الصفات التشخيصية. للعينة الدقيقة يُستخدم حامل صغير. اختر رتبة."
              : "A standard entomological pin (often #2–#3) pierces right of the midline so diagnostic characters stay visible. Tiny specimens use minuten or card points. Choose an order."}
          </p>
          <div className="ento-pick-row">
            {pins.map((item) => (
              <button key={item.id} type="button" className={`ento-pick ${item.id === pin ? "active" : ""}`} aria-pressed={item.id === pin} onClick={() => setPin(item.id)}>
                <span className="ento-binomial">{item.name}</span>
              </button>
            ))}
          </div>
          <p className="ento-body" style={{ marginBottom: 0 }}>{text(lang, chosen.where)}</p>
        </article>

        <article className="ento-card ento-visible" id="field-label" style={{ direction: dir }}>
          <div className="ento-card-header">
            <div>
              <div className="ento-card-num">٠٣ · 03</div>
              <div className="ento-card-title-ku">{lang === "ku" ? "لەیبڵی نموونە" : lang === "ar" ? "بطاقة العينة" : "The specimen label"}</div>
            </div>
          </div>
          <p className="ento-body">
            {lang === "ku"
              ? "labelی standardization: (١) locality + وڵات/ناوچە، (٢) date وەک 12.v.2026 (ڕۆژ.مانگی ڕۆمی.ساڵ)، (٣) habitat / microhabitat، (٤) collector. identification labelی جیا: Genus species Author, Family — لاتینی italic. determination و revision دەتوانن labelی دووەم بن. ئەم کارتە teaching exampleـە، نەک voucherی ڕاستەقینە؛ هەر ئەم خانانە خشتەی پەپوولەی کوردستان پڕ دەکەنەوە."
              : lang === "ar"
              ? "بطاقة قياسية: المكان والتاريخ (يوم.شهر روماني.سنة) والموطن والجامع؛ ثم الاسم العلمي مائلاً والفصيلة. هذه للتدريس لا كعينة حقيقية."
              : "Standard data label: locality, date as day.Roman-month.year (e.g. 12.v.2026), habitat, collector. A separate ID label carries Genus species Author and Family in italic Latin. Det. slips record later revisions. This card is a teaching mock-up; the same fields power the Kurdistan butterfly table."}
          </p>
          <div dir="ltr" style={{
            fontFamily: "var(--font-mono)",
            background: "#fbf8f1",
            color: "#1a2418",
            border: "1px solid rgba(26,36,24,.16)",
            padding: "16px 18px",
            lineHeight: 1.7,
            fontSize: ".84rem",
            maxWidth: 360,
          }}>
            <div>Iraq, Kurdistan, Ranya</div>
            <div>12.v.2026</div>
            <div>mountain meadow</div>
            <div>teaching example</div>
            <div className="ento-binomial" style={{ marginTop: 8 }}>Papilio machaon</div>
            <div className="ento-binomial">Papilionidae</div>
          </div>
        </article>
      </div>
      <QuizSection lang={lang} chapter={quiz} />
    </div>
  );
}

const HEMIPTERA = {
  image: "/images/plates/ch10-bug.jpg",
  icon: "bug",
  latin: "Hemiptera",
  num: { ku: "چاپتەری هەشتەم", ar: "الفصل الثامن", en: "Chapter 8" },
  title: { ku: "شەتەک و سنە", ar: "المن والبق", en: "Aphids and true bugs" },
  blocks: [
    {
      id: "hem-def",
      num: "٠١ · 01",
      title: { ku: "پێناسە", ar: "التعريف", en: "What they are" },
      body: {
        ku: "Hemiptera (true bugs sensu lato) هەموویان rostrumی piercing-suckingیان هەیە (styletـەکان لە maxilla/mandible). دوو کلادی گەورە: Heteroptera (سنە — forewing = hemelytron: بنکە coriaceous و نووک membranous) و Sternorrhyncha/Auchenorrhyncha (شەتەک، زنجرە، whitefly). گۆڕانەپەڕە hemimetabolousـە. Aphididae زۆرجار parthenogenesis و telescoping generations؛ honeydew → sooty mold و گواستنەوەی plant virus. Pentatomidae وەک Nezara viridula زیانبەخشی کشتوکاڵین. شەتەک نێچیری سەرەکیی Coccinellidae، Chrysopidae و Syrphidaeـیە لە biocontrolدا.",
        ar: "Hemiptera ذات فم ثاقب ماص. Heteroptera بأجنحة نصفية؛ المن غالباً توالد بكري وينقل فيروسات نباتية. فريسة رئيسية للمكافحة الحيوية.",
        en: "Hemiptera share a piercing-sucking rostrum. Heteroptera have hemelytra; Sternorrhyncha include aphids with frequent parthenogenesis, honeydew and plant-virus transmission. Hemimetabolous. Aphids are prime prey for Coccinellidae, Chrysopidae and syrphid larvae in biocontrol; stink bugs such as Nezara viridula are major crop pests.",
      },
    },
    {
      id: "hem-families",
      num: "٠٢ · 02",
      title: { ku: "سێ خێزان", ar: "ثلاث فصائل", en: "Three families" },
      body: {
        ku: "دەمەکە هەمان شتە. باڵ و قەبارەکە جیاوازن.",
        ar: "الفم واحد. الجناح والحجم يختلفان.",
        en: "The beak is shared. Wings and size are not.",
      },
      families: [
        {
          id: "aphididae",
          name: "Aphididae",
          title: { ku: "شەتەک", ar: "المن", en: "Aphids" },
          rows: {
            ku: [["قەبارە", "بچووک؛ زۆرجار apterous + alate morphs"], ["خۆراک", "phloem sap → honeydew → sooty mold؛ virus vectors"], ["زۆربوون", "parthenogenesis + telescoping generations"]],
            ar: [["الحجم", "صغير؛ غالباً بلا جناح"], ["الطعام", "عصارة ولسنا عسلية وفيروسات"], ["التكاثر", "توالد بكري سريع"]],
            en: [["Size", "small; apterous and alate morphs"], ["Food", "phloem sap, honeydew, plant viruses"], ["Increase", "parthenogenesis; telescoping generations"]],
          },
        },
        {
          id: "pentatomidae",
          name: "Pentatomidae",
          title: { ku: "سنەی قەڵغان", ar: "البق الدرعي", en: "Shield bugs" },
          rows: {
            ku: [["شێوە", "scutellumی گەورە → شێوەی shield"], ["باڵ", "hemelytra (Heteroptera)"], ["بۆن", "metathoracic scent glands (alarm / defence)"]],
            ar: [["الشكل", "درع بخمس زوايا"], ["الجناح", "أجنحة نصفية"], ["الرائحة", "غدد صدرية دفاعية"]],
            en: [["Shape", "enlarged scutellum — shield outline"], ["Wing", "hemelytra"], ["Scent", "metathoracic defensive glands"]],
          },
        },
        {
          id: "cicadellidae",
          name: "Cicadellidae",
          title: { ku: "مێرووی گەڵا", ar: "نطاطات الأوراق", en: "Leafhoppers" },
          rows: {
            ku: [["جووڵە", "saltatorial hind legs (Auchenorrhyncha)"], ["خۆراک", "xylem/phloem sap لە گەڵا"], ["زیان", "vectorی phytoplasma / bacteriaی ڕووەک"]],
            ar: [["الحركة", "قفز"], ["الطعام", "عصارة الورق"], ["الضرر", "نواقل أمراض نباتية"]],
            en: [["Movement", "saltatorial hoppers"], ["Food", "leaf xylem/phloem sap"], ["Harm", "vectors of phytoplasmas and plant bacteria"]],
          },
        },
      ],
    },
    {
      id: "hem-species",
      num: "٠٣ · 03",
      title: { ku: "جۆرە باوەکانی ناوچەکە", ar: "أنواع شائعة في المنطقة", en: "Common species of the region" },
      body: {
        ku: "ئەمانە زیانبەخشی باوی کێڵگە و باخن، نەک ئەنجامی سەرژمێرێک. وێنەی سەرەوە Nezara viridula ـە.",
        ar: "هذه آفات شائعة في الحقل والبستان، لا حصيلة تعداد. الصورة أعلاه Nezara viridula.",
        en: "These are common pests of field and garden, not a counted survey. The picture above is Nezara viridula.",
      },
      species: [
        { name: "Myzus persicae", family: "Aphididae", common: { ku: "شەتەکی قۆخ", ar: "من الدراق", en: "Green peach aphid" }, where: { ku: "باخ و کێڵگە", ar: "بساتين وحقول", en: "Gardens and fields" } },
        { name: "Aphis fabae", family: "Aphididae", common: { ku: "شەتەکی ڕەش", ar: "من الفول الأسود", en: "Black bean aphid" }, where: { ku: "فاسۆلیا و باخچە", ar: "فول وحدائق", en: "Beans and gardens" } },
        { name: "Nezara viridula", family: "Pentatomidae", common: { ku: "سنەی سەوزی باشوور", ar: "البق الأخضر الجنوبي", en: "Southern green stink bug" }, where: { ku: "کێڵگەی سەوزە", ar: "حقول الخضار", en: "Vegetable fields" } },
      ],
    },
  ],
};

const JUMPERS = {
  image: "/images/plates/ch11-dragon.jpg",
  icon: "dragon",
  latin: "Orthoptera · Odonata",
  num: { ku: "چاپتەری نۆیەم", ar: "الفصل التاسع", en: "Chapter 9" },
  title: { ku: "جڕوشک و مێرووی ئاو", ar: "الجنادب والرعاشات", en: "Grasshoppers and dragonflies" },
  blocks: [
    {
      id: "jump-def",
      num: "٠١ · 01",
      title: { ku: "دوو ئۆردەر، یەک گۆڕان", ar: "رتبتان وتحول واحد", en: "Two orders, one kind of change" },
      body: {
        ku: "Orthoptera و Odonata هەردووکیان hemimetabolousـن (بێ پوپا)، بەڵام ئیکۆلۆجی و مۆرفۆلۆجییان جیاوازە. Orthoptera: hind femurی گەورە بۆ saltatorial jump؛ forewing زۆرجار tegmenی چەرمین؛ زۆر جۆر stridulation بۆ دۆزینەوەی هاوسەر. nymph لە گەورە دەچێت بە wing padی کورت. Odonata: دوو جووت باڵی net-veined یەکسان؛ چاوی ئاڵۆزی زۆر گەورە؛ گەورە aerial predatorـە. naiad/nymphی ئاوی labiumی پێشەوەی extendable (mask) بۆ نێچیر بەکاردەهێنێت — لە گەورەی فڕیو ناچێت، بەڵام هەر بێ پیت دەمێنێتەوە. Anisoptera باڵ کراوە ڕادەگرێت؛ Zygoptera باڵ لەسەر پشت کۆدەکاتەوە.",
        ar: "رتبتان بتحول ناقص. Orthoptera تقفز بفخذ خلفي وقد تصرصر. Odonata صياد جوي بعين كبيرة؛ حوريته مائية بفك مندفع. الرعاشات الكبيرة تبقي الجناح مفتوحاً والرعاشات الصغيرة تطويه.",
        en: "Both orders are hemimetabolous but ecologically distinct. Orthoptera: enlarged hind femora for jumping, often tegmina and stridulation; nymphs resemble adults. Odonata: two equal net-veined wing pairs, huge compound eyes, aerial predators; aquatic nymphs capture prey with an extensible labial mask and do not look like adults, yet still lack a pupa. Anisoptera rest with wings open; Zygoptera fold them over the abdomen.",
      },
    },
    {
      id: "jump-families",
      num: "٠٢ · 02",
      title: { ku: "چوار خێزان", ar: "أربع فصائل", en: "Four families" },
      body: {
        ku: "دوو خێزانی یەکەم جڕوشک و سیسرکن. دوو خێزانی دواوە مێرووی ئاون. یەکەمیان باڵی کراوە ڕادەگرێت، و دووەمیان باڵی لەسەر پشت کۆدەکاتەوە.",
        ar: "الأولى والثانية جنادب. الثالثة والرابعة رعاشات: واحدة تُبقي الجناح مفتوحاً، والأخرى تطويه فوق الظهر.",
        en: "The first two are grasshoppers and crickets. The last two are dragonflies and damselflies: one holds the wings open, the other folds them over the back.",
      },
      families: [
        {
          id: "acrididae",
          name: "Acrididae",
          title: { ku: "جڕوشک", ar: "الجراد", en: "Short-horned grasshoppers" },
          rows: {
            ku: [["ئەنتێنا", "کورت (< قاچی جەستە) — Caelifera"], ["کات", "زۆرجار diurnal؛ phase polyphenism لە locusts"], ["نموونە", "Schistocerca gregaria (solitary ↔ gregarious)"]],
            ar: [["القرون", "قصيرة"], ["الوقت", "نهاري؛ للجراد طوران"], ["مثال", "Schistocerca gregaria"]],
            en: [["Antennae", "short (Caelifera)"], ["Time", "often diurnal; locust phase polyphenism"], ["Example", "Schistocerca gregaria"]],
          },
        },
        {
          id: "gryllidae",
          name: "Gryllidae",
          title: { ku: "سیسرک", ar: "الصراصير", en: "Crickets" },
          rows: {
            ku: [["ئەنتێنا", "درێژ — Ensifera"], ["دەنگ", "stridulation (tegmen file + scraper)"], ["کات", "زۆرجار nocturnal calling song"]],
            ar: [["القرون", "طويلة"], ["الصوت", "صرير بالأجنحة"], ["الوقت", "غالباً ليلي"]],
            en: [["Antennae", "long (Ensifera)"], ["Sound", "tegmen stridulation"], ["Time", "often nocturnal song"]],
          },
        },
        {
          id: "libellulidae",
          name: "Libellulidae",
          title: { ku: "مێرووی ئاوی باڵکراوە", ar: "الرعاشات الكبيرة", en: "Dragonflies" },
          rows: {
            ku: [["باڵ", "Anisoptera: باڵ کراوە لە rest"], ["چاو", "compound eyes زۆر گەورە؛ aerial hunter"], ["naiad", "aquatic + labial mask؛ rectal gills"]],
            ar: [["الجناح", "مفتوح عند الراحة"], ["العين", "كبيرة جداً"], ["الحورية", "مائية بفك مندفع"]],
            en: [["Wings", "Anisoptera rest open"], ["Eyes", "huge; aerial predators"], ["Naiad", "aquatic labial mask; rectal gills"]],
          },
        },
        {
          id: "coenagrionidae",
          name: "Coenagrionidae",
          title: { ku: "مێرووی ئاوی باریک", ar: "الرعاشات الصغيرة", en: "Damselflies" },
          rows: {
            ku: [["باڵ", "Zygoptera: باڵ لەسەر abdomen کۆدەبێتەوە"], ["جەستە", "باریک؛ چاو جیاوازتر لە Anisoptera"], ["naiad", "aquatic؛ زۆرجار caudal gillsی دەرەکی"]],
            ar: [["الجناح", "مطوي فوق البطن"], ["الجسم", "رفيع"], ["الحورية", "مائية بخياشيم ذيلية غالباً"]],
            en: [["Wings", "Zygoptera fold over abdomen"], ["Body", "slender; eyes more separated"], ["Naiad", "aquatic; often external caudal gills"]],
          },
        },
      ],
    },
    {
      id: "jump-species",
      num: "٠٣ · 03",
      title: { ku: "جۆرە باوەکانی ناوچەکە", ar: "أنواع شائعة في المنطقة", en: "Common species of the region" },
      body: {
        ku: "وێنەی سەرەوە مێینەی Crocothemis erythraea ـە، بۆیە جەستەکەی قاوەییە. نێرەکەی سوورە. مەڵەشە گەلێکی هەیە کە گەیشتووەتە ئەم ناوچەیە.",
        ar: "الصورة أعلاه أنثى Crocothemis erythraea، لذلك جسمها بني. الذكر أحمر. للجراد أسراب بلغت هذه المنطقة.",
        en: "The picture above is a female Crocothemis erythraea, so the body is brown. The male is red. The desert locust has swarms that have reached this region.",
      },
      species: [
        { name: "Schistocerca gregaria", family: "Acrididae", common: { ku: "مەڵەشەی بیابان", ar: "الجراد الصحراوي", en: "Desert locust" }, where: { ku: "دەشتی وشک، و هەندێک جار گەل", ar: "سهول جافة، وأحياناً أسراب", en: "Dry plains, and sometimes swarms" } },
        { name: "Gryllus bimaculatus", family: "Gryllidae", common: { ku: "سیسرکی دوو خاڵ", ar: "الصرصار ذو النقطتين", en: "Two-spotted cricket" }, where: { ku: "کێڵگە و ماڵ", ar: "حقول وبيوت", en: "Fields and houses" } },
        { name: "Crocothemis erythraea", family: "Libellulidae", common: { ku: "مێرووی ئاوی سوور", ar: "الرعاش القرمزي", en: "Scarlet darter" }, where: { ku: "ئاوە وەستاوەکان", ar: "المياه الراكدة", en: "Still water" } },
      ],
    },
  ],
};

const META_PATHS = [
  {
    id: "complete",
    name: { ku: "تەواو", ar: "كامل", en: "Complete" },
    stages: {
      ku: [["١", "هێلکە"], ["٢", "کۆڵۆک — لە گەورە ناچێت"], ["٣", "پیت — وێنەکە ئەم قۆناغەیە"], ["٤", "گەورە"]],
      ar: [["١", "بيضة"], ["٢", "يرقة — لا تشبه البالغ"], ["٣", "شرنقة — الصورة هي هذه المرحلة"], ["٤", "بالغة"]],
      en: [["1", "Egg"], ["2", "Larva — it does not look like the adult"], ["3", "Pupa — the picture is this stage"], ["4", "Adult"]],
    },
    orders: "Lepidoptera, Coleoptera, Diptera, Hymenoptera, Neuroptera",
  },
  {
    id: "incomplete",
    name: { ku: "ناتەواو", ar: "ناقص", en: "Incomplete" },
    stages: {
      ku: [["١", "هێلکە"], ["٢", "بچووک — لە جڕوشک و سنەدا لە گەورەکە دەچێت"], ["٣", "گەورە"]],
      ar: [["١", "بيضة"], ["٢", "حورية — في الجندب والبق تشبه البالغ"], ["٣", "بالغة"]],
      en: [["1", "Egg"], ["2", "Nymph — in a grasshopper or a bug it looks like the adult"], ["3", "Adult"]],
    },
    orders: "Hemiptera, Orthoptera, Odonata",
  },
];

function MetaChapter({ lang, quiz }) {
  const [id, setId] = useState("complete");
  const path = META_PATHS.find((item) => item.id === id);
  const stages = path.stages[lang] || path.stages.en;
  const dir = lang === "en" ? "ltr" : "rtl";
  return (
    <div className="ento-chapter-page">
      <Hero lang={lang} chapter={{
        image: "/images/plates/ch12-chrysalis.jpg",
        focus: "center 42%",
        icon: "butterfly",
        num: { ku: "چاپتەری دوازدەهەم", ar: "الفصل الثاني عشر", en: "Chapter 12" },
        title: { ku: "دوو گۆڕانەپەڕە", ar: "تحولان", en: "Two metamorphoses" },
      }} />
      <div className="ento-container" dir={dir}>
        <article className="ento-card ento-visible" id="meta-compare" style={{ direction: dir }}>
          <div className="ento-card-header">
            <div>
              <div className="ento-card-num">٠١ · 01</div>
              <div className="ento-card-title-ku">{lang === "ku" ? "پیت هەیە، یان نییە" : lang === "ar" ? "شرنقة أو لا شرنقة" : "A pupa, or none"}</div>
            </div>
          </div>
          <p className="ento-body">
            {lang === "ku"
              ? "Holometabola (Endopterygota): egg → larva (جیاواز لە گەورە) → pupa (histolysis/histogenesis، imaginal discs) → imago. Hemimetabola (Exopterygota): egg → nymph (لە گەورە دەچێت، wing pads دەرەکین) → adult، بێ پوپا. جیاوازییەکە تەنها ژمارەی قۆناغ نییە — پلانی گەشە و ژینگەی لارڤا جیاوازە. وێنەکە chrysalisی Danaus plexippusـە (نموونەی جیهانی؛ لە لیستی کوردستانیی ئەم ئەتڵەسەدا نییە)."
              : lang === "ar"
              ? "Holometabola: بيضة ويرقة مختلفة وعذراء ثم بالغ. Hemimetabola: بيضة وحورية تشبه البالغ ثم بالغ بلا عذراء. الصورة شرنقة Danaus plexippus كمثال عالمي."
              : "Holometabola (Endopterygota): egg → dissimilar larva → pupa (imaginal discs) → imago. Hemimetabola (Exopterygota): egg → nymph with external wing pads → adult, no pupa. The split is developmental architecture, not mere stage count. Image: Danaus plexippus chrysalis (global example, not on this atlas’s Kurdistan shortlist)."}
          </p>
          <div className="ento-pick-row">
            {META_PATHS.map((item) => (
              <button key={item.id} type="button" className={`ento-pick ${item.id === id ? "active" : ""}`} aria-pressed={item.id === id} onClick={() => setId(item.id)}>
                <span>{text(lang, item.name)}</span>
              </button>
            ))}
          </div>
          <ul className="ento-fact-list">
            {stages.map(([label, value]) => (
              <li key={label}><span>{label}</span><strong>{value}</strong></li>
            ))}
          </ul>
          <p className="ento-body" style={{ marginTop: 14, marginBottom: 0 }}>
            {(lang === "ku" ? "ئۆردەرەکان: " : lang === "ar" ? "الرتب: " : "Orders: ")}
            <span className="ento-binomial">{path.orders}</span>
          </p>
        </article>
        <article className="ento-card ento-visible" id="meta-water" style={{ direction: dir }}>
          <div className="ento-card-header">
            <div>
              <div className="ento-card-num">٠٢ · 02</div>
              <div className="ento-card-title-ku">{lang === "ku" ? "مێرووی ئاو جیاوازە" : lang === "ar" ? "الرعاش مختلف" : "The dragonfly is the exception"}</div>
            </div>
          </div>
          <p className="ento-body" style={{ marginBottom: 0 }}>
            {lang === "ku"
              ? "nymphی Orthoptera/Hemiptera terrestrialـە و لە imago دەچێت (external wing pads). naiadی Odonata aquaticـە؛ labiumی prehensile (mask) بۆ prey capture؛ rectal/ caudal gills بۆ هەناسە. emergence: exuvia لەسەر ڕووەک یان بەرد دەمێنێتەوە و imago دەر دەچێت — هێشتا بێ pupa (hemimetabolous)، بەڵام ecological nicheی nymph ≠ adult."
              : lang === "ar"
              ? "حورية الجندب والبق تشبه البالغ. حورية الرعاش مائية بفك مندفع وخياشيم؛ تخرج من جلد الانسلاخ بلا عذراء، لكن بيئتها تختلف عن البالغ."
              : "Orthoptera/Hemiptera nymphs are terrestrial and adult-like with external wing pads. Odonata naiads are aquatic predators with a labial mask and gills; the imago emerges from an exuvia — still no pupa, yet nymph and adult niches differ sharply."}
          </p>
        </article>
      </div>
      <QuizSection lang={lang} chapter={quiz} />
    </div>
  );
}

const NEUROPTERA = {
  image: "/images/plates/ch13-lacewing.jpg",
  icon: "lace",
  latin: "Neuroptera",
  num: { ku: "چاپتەری دەیەم", ar: "الفصل العاشر", en: "Chapter 10" },
  title: { ku: "تۆڕباڵ", ar: "أسد المن والشبكيات", en: "Lacewings" },
  blocks: [
    {
      id: "neu-def",
      num: "٠١ · 01",
      title: { ku: "پێناسە", ar: "التعريف", en: "What they are" },
      body: {
        ku: "Neuroptera («تۆڕ-باڵ») دوو جووت باڵی membranousی net-veinedی نەرم هەیە، بێ scales و بێ elytra؛ کەمەری باریکی Hymenopteraیان نییە. گۆڕانەپەڕە holometabolousـە. لارڤا campodeiform و زۆرجار piercing-sucking mandiblesی هەیە بۆ مژینی نێچیر — Chrysoperla carnea شەتەک دەخوات (biocontrol). Myrmeleontidae (شێری مێروولە) لارڤای pit-building لە لم. گەورە زۆرجار crepuscularـە و شهد/پەلکە دەخوات. لەگەڵ Megaloptera و Raphidioptera کلادی Neuropterida پێک دەهێنن.",
        ar: "Neuroptera زوجان من أجنحة شبكية لينة بلا حراشف ولا أغماد ولا خصر نحل. تحول كامل. يرقة Chrysoperla تفترس المن؛ Myrmeleontidae تبني حفراً في الرمل. مع Megaloptera وRaphidioptera تكوّن Neuropterida.",
        en: "Neuroptera have two soft net-veined wing pairs, without scales, elytra or a wasp waist. Holometabolous. Chrysoperla larvae are aphid predators (biocontrol); Myrmeleontidae larvae dig sand pits. With Megaloptera and Raphidioptera they form Neuropterida.",
      },
    },
    {
      id: "neu-families",
      num: "٠٢ · 02",
      title: { ku: "دوو خێزان", ar: "فصيلتان", en: "Two families" },
      body: {
        ku: "باڵەکە هەمان شتە. شوێن و شێوەی نێچیر جیاوازە.",
        ar: "الجناح واحد. مكان الصيد وشكله يختلفان.",
        en: "The netted wing is shared. Where and how they hunt are not.",
      },
      families: [
        {
          id: "chrysopidae",
          name: "Chrysopidae",
          title: { ku: "تۆڕباڵی سەوز", ar: "أسد المن الأخضر", en: "Green lacewings" },
          rows: {
            ku: [["شێوە", "باڵی green net-veined؛ چاوی زێڕین (golden eyes)"], ["لارڤا", "campodeiform؛ sickle mandibles → Aphididae"], ["کار", "augmentative biocontrol (Chrysoperla)"]],
            ar: [["الشكل", "جناح أخضر شبكي وعين ذهبية"], ["اليرقة", "تفترس المن بفك منجلي"], ["الدور", "مكافحة حيوية"]],
            en: [["Look", "green net-veined wings; golden eyes"], ["Larva", "campodeiform; sickle jaws on aphids"], ["Role", "augmentative biocontrol"]],
          },
        },
        {
          id: "myrmeleontidae",
          name: "Myrmeleontidae",
          title: { ku: "شێری مێروولە", ar: "أسد النمل", en: "Antlions" },
          rows: {
            ku: [["شێوە", "باڵی درێژ net-veined؛ لە Odonata دەچێت بەڵام لاوازترە"], ["لارڤا", "pit-building لە لم؛ ants وەک prey"], ["شوێن", "sandy / dry soil microhabitats"]],
            ar: [["الشكل", "جناح طويل شبكي"], ["اليرقة", "حفرة رملية تفترس النمل"], ["الموطن", "رمل وتربة جافة"]],
            en: [["Look", "long net-veined wings; soft dragonfly-like"], ["Larva", "sand-pit ambush on ants"], ["Where", "sandy dry microhabitats"]],
          },
        },
      ],
    },
    {
      id: "neu-species",
      num: "٠٣ · 03",
      title: { ku: "جۆرە باوەکانی ناوچەکە", ar: "أنواع شائعة في المنطقة", en: "Common species of the region" },
      body: {
        ku: "وێنەی سەرەوە Chrysoperla carnea ـە، تۆڕباڵێکی سەوزی باو لە کوردستان و دەوروبەر. کۆڵۆکەکەی لەسەر گەڵا شەتەک دەخوات.",
        ar: "الصورة أعلاه Chrysoperla carnea، أسد من أخضر شائع في كردستان وما حولها. يرقتها تأكل المن على الأوراق.",
        en: "The picture above is Chrysoperla carnea, a common green lacewing of Kurdistan and the country around it. Its larva eats aphids on leaves.",
      },
      species: [
        { name: "Chrysoperla carnea", family: "Chrysopidae", common: { ku: "تۆڕباڵی سەوزی باو", ar: "أسد المن الأخضر الشائع", en: "Common green lacewing" }, where: { ku: "باخ و کێڵگە", ar: "بساتين وحقول", en: "Orchards and fields" } },
        { name: "Myrmeleon spp.", family: "Myrmeleontidae", common: { ku: "شێری مێروولە", ar: "أسد النمل", en: "Antlion" }, where: { ku: "لم و خاکی وشک", ar: "رمل وتربة جافة", en: "Sand and dry ground" } },
      ],
    },
  ],
};

function KeyChapter({ lang, quiz }) {
  const dir = lang === "en" ? "ltr" : "rtl";
  return (
    <div className="ento-chapter-page">
      <Hero lang={lang} chapter={{
        image: "/images/plates/ch14-key.jpg",
        icon: "key",
        num: { ku: "چاپتەری سێزدەهەم", ar: "الفصل الثالث عشر", en: "Chapter 13" },
        title: { ku: "کلیلی ناسینەوە", ar: "مفتاح التعريف", en: "Identification key" },
      }} />
      <div className="ento-container" dir={dir}>
        <article className="ento-card ento-visible" id="key-how" style={{ direction: dir }}>
          <div className="ento-card-header">
            <div>
              <div className="ento-card-num">٠١ · 01</div>
              <div className="ento-card-title-ku">{lang === "ku" ? "چۆن کلیل بەکاربهێنیت" : lang === "ar" ? "كيف تستخدم المفتاح" : "How to use the key"}</div>
            </div>
          </div>
          <p className="ento-body" style={{ marginBottom: 0 }}>
            {lang === "ku"
              ? "دوو ڕێگا هەیە: پرسیار بە پرسیار، یان هەڵبژاردنی نیشانەکان. کلیلەکە تەنها ئۆردەرەکانی ئەم ئەتڵەسە دەگرێتەوە."
              : lang === "ar"
              ? "طريقتان: سؤالاً بسؤال، أو اختيار العلامات. يغطي المفتاح فقط رتب هذا الأطلس."
              : "Two ways: step-by-step questions, or selecting traits. The key covers only the orders in this atlas."}
          </p>
        </article>
        <article className="ento-card ento-visible" id="key-run" style={{ direction: dir }}>
          <div className="ento-card-header">
            <div>
              <div className="ento-card-num">٠٢ · 02</div>
              <div className="ento-card-title-ku">{lang === "ku" ? "کلیلەکە" : lang === "ar" ? "المفتاح" : "The key"}</div>
            </div>
          </div>
          <IdKey lang={lang} compact />
        </article>
      </div>
      <QuizSection lang={lang} chapter={quiz} />
    </div>
  );
}

export function Chapter6({ lang }) {
  return <TaxonChapter lang={lang} chapter={HYMENOPTERA} quiz="ch6" />;
}
export function Chapter7({ lang }) {
  return <TaxonChapter lang={lang} chapter={COLEOPTERA} quiz="ch7" />;
}
export function Chapter8({ lang }) {
  return <TaxonChapter lang={lang} chapter={DIPTERA} quiz="ch8" />;
}
export function Chapter9({ lang }) {
  return <FieldChapter lang={lang} quiz="ch9" />;
}
export function Chapter10({ lang }) {
  return <TaxonChapter lang={lang} chapter={HEMIPTERA} quiz="ch10" />;
}
export function Chapter11({ lang }) {
  return <TaxonChapter lang={lang} chapter={JUMPERS} quiz="ch11" />;
}
export function Chapter12({ lang }) {
  return <MetaChapter lang={lang} quiz="ch12" />;
}
export function Chapter13({ lang }) {
  return <TaxonChapter lang={lang} chapter={NEUROPTERA} quiz="ch13" />;
}
export function Chapter14({ lang }) {
  return <KeyChapter lang={lang} quiz="ch14" />;
}
