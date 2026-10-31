import { useState } from "react";
import { Mark } from "./marks";

function text(lang, pack) {
  return pack[lang] || pack.en;
}

function Hero({ lang, chapter }) {
  return (
    <div className="ento-chapter-hero" style={{ position: "relative", overflow: "hidden", minHeight: 420, padding: 0, background: "#0d2107" }}>
      <img
        src={chapter.image}
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: chapter.focus || "center" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.42)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 2, minHeight: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "clamp(36px,6vw,64px) 20px" }}>
        <div className="ento-chapter-hero-num">{text(lang, chapter.num)}</div>
        <span className="ento-chapter-hero-icon"><Mark name={chapter.icon} /></span>
        <div className="ento-chapter-hero-title">{text(lang, chapter.title)}</div>
        {chapter.latin && <div className="ento-binomial" style={{ color: "#e8d7b0", fontSize: "1.15rem", marginTop: 6 }}>{chapter.latin}</div>}
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
          <button key={item.id} type="button" className={`ento-pick ${item.id === id ? "active" : ""}`} onClick={() => setId(item.id)}>
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

function TaxonChapter({ lang, chapter }) {
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
    </div>
  );
}

const HYMENOPTERA = {
  image: "/images/plates/ch6-bee.jpg",
  icon: "bee",
  latin: "Hymenoptera",
  num: { ku: "چاپتەری شەشەم", ar: "الفصل السادس", en: "Chapter 6" },
  title: { ku: "مێروولە، هەنگ و زەنبوور", ar: "النمل والنحل والزنابير", en: "Ants, bees and wasps" },
  blocks: [
    {
      id: "hym-def",
      num: "٠١ · 01",
      title: { ku: "پێناسە", ar: "التعريف", en: "What they are" },
      body: {
        ku: "Hymenoptera ئۆردەری مێروولە، هەنگ و زەنبوورە. ناوەکە لە hymen (پەردە) و pteron (باڵ)ەوەیە: دوو جووت باڵی پەردەیی، کە بە چنگە بچووکەکان (hamuli) بە یەکەوە دەبەسترێن. زۆربەیان کەمەرێکی باریکیان هەیە. کارگەری مێروولە باڵی نییە. گۆڕانەپەڕەیان تەواوە. هەنگ پەیتاندن دەکات، مێروولە خاک ئاوا دەکات، و زەنبووری پارازیتۆید هێلکە لە ناو لارڤای زیانبەخشدا دادەنێت.",
        ar: "Hymenoptera رتبة النمل والنحل والزنابير. الاسم من hymen (غشاء) وpteron (جناح): زوجان من الأجنحة الغشائية يربطهما خطاطيف صغيرة (hamuli). لمعظمها خصر ضيق. شغالة النمل بلا أجنحة. تحولها كامل. النحل يلقّح، والنمل يهوّي التربة، والزنبار الطفيلي يضع بيضه داخل يرقة الآفة.",
        en: "Hymenoptera is the order of ants, bees and wasps. The name is hymen (membrane) and pteron (wing): two pairs of membranous wings locked together by tiny hooks, the hamuli. Most have a narrow waist. Ant workers have no wings. Their metamorphosis is complete. Bees move pollen, ants aerate soil, and a parasitoid wasp lays its egg inside a pest larva.",
      },
    },
    {
      id: "hym-families",
      num: "٠٢ · 02",
      title: { ku: "سێ خێزان", ar: "ثلاث فصائل", en: "Three families" },
      body: {
        ku: "خێزانێک هەڵبژێرە. هەر سێکیان لە هەمان ئۆردەردان، بەڵام کارەکانیان جیاوازە.",
        ar: "اختر فصيلة. الثلاث من الرتبة نفسها، وأعمالها مختلفة.",
        en: "Choose a family. All three sit in this order, and each does a different job.",
      },
      families: [
        {
          id: "formicidae",
          name: "Formicidae",
          title: { ku: "مێروولە", ar: "النمل", en: "Ants" },
          rows: {
            ku: [["باڵ", "کارگەر بێباڵە"], ["کۆمەڵگە", "مالکە، کارگەر، نێر"], ["کار", "خاک، تۆو، کەمکردنەوەی مێرووی تر"]],
            ar: [["الأجنحة", "الشغالة بلا أجنحة"], ["المستعمرة", "ملكة وعمال وذكور"], ["العمل", "التربة والبذور وكبح حشرات أخرى"]],
            en: [["Wings", "workers are wingless"], ["Colony", "queen, workers, males"], ["Work", "soil, seeds, holding other insects down"]],
          },
        },
        {
          id: "apidae",
          name: "Apidae",
          title: { ku: "هەنگ", ar: "النحل", en: "Bees" },
          rows: {
            ku: [["موو", "مووی لقڵق بۆ هەڵگرتنی هەڵاڵە"], ["خۆراک", "شیلەی گوڵ و هەڵاڵە"], ["نموونە", "Apis، هەنگی شاخ، Xylocopa"]],
            ar: [["الشعر", "شعر متفرع يحمل اللقاح"], ["الغذاء", "رحيق الأزهار وحبوب اللقاح"], ["أمثلة", "Apis والنحل الطنان وXylocopa"]],
            en: [["Hair", "branched hairs carry pollen"], ["Food", "nectar and pollen"], ["Examples", "Apis, bumblebees, Xylocopa"]],
          },
        },
        {
          id: "ichneumonidae",
          name: "Ichneumonidae",
          title: { ku: "زەنبووری پارازیتۆید", ar: "الزنابير الطفيلية", en: "Parasitoid wasps" },
          rows: {
            ku: [["ئامراز", "ئۆڤیپۆزیتۆرێکی درێژ"], ["کار", "هێلکە لە ناو لارڤای خانەخوێ"], ["بەکارهێنان", "بەشێک لە کۆنترۆڵی بایۆلۆجی"]],
            ar: [["الأداة", "حامل بيض طويل"], ["العمل", "بيضة داخل يرقة العائل"], ["الاستعمال", "جزء من المكافحة الحيوية"]],
            en: [["Tool", "a long ovipositor"], ["Work", "an egg inside a host larva"], ["Use", "one part of biological control"]],
          },
        },
      ],
    },
    {
      id: "hym-species",
      num: "٠٣ · 03",
      title: { ku: "جۆرە باوەکانی ناوچەکە", ar: "أنواع شائعة في المنطقة", en: "Common species of the region" },
      body: {
        ku: "ئەمانە جۆری باوی کوردستان و دەوروبەرین، نەک ئەنجامی ژمارەیەکی تۆمارکراو. مێروولەی گەڵابڕ لێرە نییە.",
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
  num: { ku: "چاپتەری حەوتەم", ar: "الفصل السابع", en: "Chapter 7" },
  title: { ku: "قوڕقوڕەکان", ar: "الخنافس", en: "Beetles" },
  blocks: [
    {
      id: "col-def",
      num: "٠١ · 01",
      title: { ku: "پێناسە", ar: "التعريف", en: "What they are" },
      body: {
        ku: "Coleoptera گەورەترین ئۆردەری مێرووەکانە. ناوەکە لە coleos (قاوغ) و pteron (باڵ)ەوەیە. باڵی پێشەوە بووە بە قاوغێکی ڕەق، elytra، کە لە ناوەڕاستدا لەسەر هێڵێکی ڕاست یەک دەگرن و باڵی ناسکی فڕین دەپارێزن. گۆڕانەپەڕەیان تەواوە. خاڵخاڵۆکە، کە لە کۆنترۆڵی بایۆلۆجیدا شەتەک دەخوات، قوڕقوڕەیە.",
        ar: "Coleoptera أكبر رتبة من الحشرات. الاسم من coleos (غمد) وpteron (جناح). الجناح الأمامي غمد صلب، elytra، يلتقي على خط مستقيم في الظهر ويحمي جناح الطيران الرقيق. تحولها كامل. الدعسوقة التي تأكل المن في المكافحة الحيوية خنفساء.",
        en: "Coleoptera is the largest order of insects. The name is coleos (sheath) and pteron (wing). The forewings have become hard covers, the elytra, which meet in a straight line down the back and protect the thin flying wings. Metamorphosis is complete. The ladybird that eats aphids in biological control is a beetle.",
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
            ku: [["شێوە", "خول و خاڵخاڵ"], ["خۆراک", "شەتەک"], ["کار", "کۆنترۆڵی بایۆلۆجی"]],
            ar: [["الشكل", "مستدير ومنقّط"], ["الطعام", "المن"], ["العمل", "مكافحة حيوية"]],
            en: [["Shape", "round and spotted"], ["Food", "aphids"], ["Work", "biological control"]],
          },
        },
        {
          id: "carabidae",
          name: "Carabidae",
          title: { ku: "قوڕقوڕەی زەوی", ar: "الخنافس الأرضية", en: "Ground beetles" },
          rows: {
            ku: [["قاچ", "درێژ، بۆ ڕاکردن"], ["خۆراک", "زۆربەیان نێچیرخۆرن"], ["نموونە", "Calosoma کرم دەخوات"]],
            ar: [["الأرجل", "طويلة للجري"], ["الطعام", "معظمها مفترس"], ["مثال", "Calosoma يأكل اليساريع"]],
            en: [["Legs", "long, for running"], ["Food", "most are hunters"], ["Example", "Calosoma eats caterpillars"]],
          },
        },
        {
          id: "scarabaeidae",
          name: "Scarabaeidae",
          title: { ku: "قوڕقوڕەی قاوغ", ar: "الجعليات", en: "Scarabs" },
          rows: {
            ku: [["ئەنتێنا", "کۆتاییەکەی وەک پەڕ"], ["خۆراک", "پەیین، ڕەگ، یان گوڵ"], ["نموونە", "Cetonia لەسەر گوڵ"]],
            ar: [["القرون", "طرفها ورقي"], ["الطعام", "روث أو جذور أو أزهار"], ["مثال", "Cetonia على الأزهار"]],
            en: [["Antennae", "the tip is a leaf-like club"], ["Food", "dung, roots, or flowers"], ["Example", "Cetonia on flowers"]],
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
  num: { ku: "چاپتەری هەشتەم", ar: "الفصل الثامن", en: "Chapter 8" },
  title: { ku: "مێش و مێشوولە", ar: "الذباب والبعوض", en: "Flies and mosquitoes" },
  blocks: [
    {
      id: "dip-def",
      num: "٠١ · 01",
      title: { ku: "پێناسە", ar: "التعريف", en: "What they are" },
      body: {
        ku: "Diptera یەک جووت باڵی فڕینی هەیە. ناوەکە لە di (دوو) و pteron (باڵ)ەوەیە. جووتی دواوە بووە بە هەڵتەر (halteres)، دوو گۆچانەی بچووک کە هاوسەنگی دەگرن. گۆڕانەپەڕەیان تەواوە. هەموویان ناگەزن: مێشوولە خوێن دەمژێت، مێشی ماڵەوە شلە دەمژێت، و مێشی گوڵ سەردانی گوڵ دەکات.",
        ar: "لـ Diptera زوج واحد من أجنحة الطيران. الاسم من di (اثنان) وpteron (جناح). الزوج الخلفي صار دبوساً للتوازن (halteres). تحولها كامل. ليست كلها تلسع: البعوض يمتص الدم، والذبابة المنزلية تمتص السوائل، وذباب الأزهار يزور الزهر.",
        en: "Diptera has one pair of flying wings. The name is di (two) and pteron (wing). The hind pair has become halteres, two small clubs that keep balance. Metamorphosis is complete. They do not all bite: a mosquito takes blood, a house fly takes liquids, and a hoverfly visits flowers.",
      },
    },
    {
      id: "dip-families",
      num: "٠٢ · 02",
      title: { ku: "سێ خێزان", ar: "ثلاث فصائل", en: "Three families" },
      body: {
        ku: "مەلاریا و زیکا یەک مێشوولە نین. Anopheles مەلاریا دەگوازێتەوە. Aedes دەتوانێت دێنگ و زیکا بگوازێتەوە.",
        ar: "الملاريا وزيكا ليستا بعوضة واحدة. Anopheles ينقل الملاريا. Aedes يمكن أن ينقل الضنك وزيكا.",
        en: "Malaria and Zika are not the same mosquito. Anopheles carries malaria. Aedes can carry dengue and Zika.",
      },
      families: [
        {
          id: "culicidae",
          name: "Culicidae",
          title: { ku: "مێشوولە", ar: "البعوض", en: "Mosquitoes" },
          rows: {
            ku: [["دەم", "خرتومێکی درێژ"], ["مێینە", "خوێن دەمژێت بۆ هێلکە"], ["نەخۆشی", "Anopheles مەلاریا، Aedes زیکا و دێنگ"]],
            ar: [["الفم", "خرطوم طويل"], ["الأنثى", "تمتص الدم للبيض"], ["المرض", "Anopheles للملاريا، Aedes لزيكا والضنك"]],
            en: [["Mouth", "a long proboscis"], ["Female", "takes blood for her eggs"], ["Disease", "Anopheles for malaria, Aedes for Zika and dengue"]],
          },
        },
        {
          id: "muscidae",
          name: "Muscidae",
          title: { ku: "مێشی ماڵەوە", ar: "الذباب المنزلي", en: "House flies" },
          rows: {
            ku: [["دەم", "ئسفنجی، بۆ شلە"], ["گەز", "Musca domestica ناگەزێت"], ["زیان", "میکرۆب لەسەر قاچ و دەمی هەڵدەگرێت"]],
            ar: [["الفم", "إسفنجي للسوائل"], ["اللسع", "Musca domestica لا تلسع"], ["الضرر", "تحمل الجراثيم على أرجلها وفمها"]],
            en: [["Mouth", "a sponge for liquids"], ["Bite", "Musca domestica does not bite"], ["Harm", "it carries germs on its feet and mouth"]],
          },
        },
        {
          id: "syrphidae",
          name: "Syrphidae",
          title: { ku: "مێشی گوڵ", ar: "ذباب الأزهار", en: "Hoverflies" },
          rows: {
            ku: [["شێوە", "لە هەنگ دەچێت، بەڵام یەک جووت باڵە"], ["گەورە", "پەیتاندن"], ["لارڤا", "زۆریان شەتەک دەخوات"]],
            ar: [["الشكل", "يشبه النحلة، وبجناح واحد"], ["البالغ", "يلقّح"], ["اليرقة", "كثير منها يأكل المن"]],
            en: [["Look", "bee-like, but one pair of wings"], ["Adult", "moves pollen"], ["Larva", "many eat aphids"]],
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

function FieldChapter({ lang }) {
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
        num: { ku: "چاپتەری نۆیەم", ar: "الفصل التاسع", en: "Chapter 9" },
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
              ? "تۆڕ بۆ پەپوولە و هەنگ لەسەر گوڵ. سەیرکردنی گەڵا بۆ خاڵخاڵۆکە و شەتەک. دەفرێکی نوقم لە خاک بۆ قوڕقوڕەی زەوی، کە پێی دەوترێت pitfall. لە هەر شوێنێک کەم بگرە، و ناوی ڕووەکەکە یان ئاوەکە بنووسە. نموونەیەک بەبێ شوێن و بەروار تەنها وێنەیەکە، تۆمار نییە."
              : lang === "ar"
              ? "شبكة للفراشات والنحل على الزهر. تفحّص الأوراق للدعسوقة والمن. إناء غائر في التربة لخنافس الأرض، ويسمى pitfall. خذ القليل من كل مكان، واكتب اسم النبات أو الماء. عينة بلا مكان وتاريخ صورة، لا سجل."
              : "A net for butterflies and bees on flowers. A look under leaves for ladybirds and aphids. A cup sunk in the soil for ground beetles, a pitfall. Take few from any one place, and write down the plant or the water. A specimen without a place and a date is a picture, not a record."}
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
              ? "دەرزەکە ئاژەڵەکە ڕادەگرێت بەبێ ئەوەی ئەو بەشە بشارێتەوە کە پێی دەناسرێتەوە. ئۆردەرێک هەڵبژێرە."
              : lang === "ar"
              ? "الدبوس يمسك الحيوان دون أن يخفي الجزء الذي يُعرف به. اختر رتبة."
              : "The pin holds the animal without hiding the part you name it by. Choose an order."}
          </p>
          <div className="ento-pick-row">
            {pins.map((item) => (
              <button key={item.id} type="button" className={`ento-pick ${item.id === pin ? "active" : ""}`} onClick={() => setPin(item.id)}>
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
              ? "چوار دێڕ بەسە: شوێن، بەروار، ژینگە، و کۆکەرەوە. ناوی زانستی لە ژێرەوەیە، بە لاتینی و لار. بەروارەکە بە ڕێسای کۆن دەنووسرێت: ڕۆژ، مانگی ڕۆمی، ساڵ. ئەم کارتە نموونەی فێرکارییە، تۆمارێکی کۆکراوەی ڕاستەقینە نییە. هەر ئەم خانانەن کە خشتەی پەپوولەی کوردستان پێیان پڕ دەبێتەوە: ناو، خێزان، و شوێن."
              : lang === "ar"
              ? "تكفي أربعة أسطر: المكان والتاريخ والموطن والجامع. الاسم العلمي تحتها، باللاتينية ومائل. يُكتب التاريخ على العرف القديم: اليوم، الشهر الروماني، السنة. هذه البطاقة مثال تعليمي، لا عينة مجموعة حقيقية. هذه الخانات نفسها تملأ جدول فراشات كردستان: الاسم والفصيلة والموطن."
              : "Four lines are enough: place, date, habitat, and collector. The scientific name sits under them, in Latin and in italic. The date is written the old way: day, Roman month, year. This card is a teaching example, not a real capture. These are the same fields that fill the Kurdistan butterfly table: name, family, and place."}
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
    </div>
  );
}

export function Chapter6({ lang }) {
  return <TaxonChapter lang={lang} chapter={HYMENOPTERA} />;
}
export function Chapter7({ lang }) {
  return <TaxonChapter lang={lang} chapter={COLEOPTERA} />;
}
export function Chapter8({ lang }) {
  return <TaxonChapter lang={lang} chapter={DIPTERA} />;
}
export function Chapter9({ lang }) {
  return <FieldChapter lang={lang} />;
}
