/** Dichotomous + trait data for the atlas identification key. */

export const ORDERS = {
  lepidoptera: {
    id: "lepidoptera",
    latin: "Lepidoptera",
    href: "#/ch5",
    image: "/images/plates/ch5-machaon.jpg",
    name: { ku: "پەپوولە / پەپوولەی شەو", ar: "فراشة / عثة", en: "Butterfly or moth" },
    tip: {
      ku: "Scalesی کایتین لەسەر باڵ؛ siphoning proboscis؛ Holometabola (لارڤا ≠ گەورە + پوپا).",
      ar: "حراشف كيتينية وخرطوم ماص؛ تحول كامل.",
      en: "Chitinous scales on wings; siphoning proboscis; holometabolous (larva ≠ adult + pupa).",
    },
    traits: ["wings_2", "scales", "proboscis", "complete_meta"],
  },
  hymenoptera: {
    id: "hymenoptera",
    latin: "Hymenoptera",
    href: "#/ch6",
    image: "/images/plates/ch6-bee.jpg",
    name: { ku: "مێروولە، هەنگ یان زەنبوور", ar: "نمل أو نحل أو زنابير", en: "Ant, bee or wasp" },
    tip: {
      ku: "Petiole (wasp-waist)؛ hamuli؛ زۆرجار haplodiploidy؛ کارگەری Formicidae بێباڵە.",
      ar: "خصر petiole وhamuli؛ شغالة النمل بلا أجنحة؛ haplodiploidy شائع.",
      en: "Petiole waist; hamuli couple the wings; often haplodiploid; Formicidae workers apterous.",
    },
    traits: ["narrow_waist", "membranous", "wings_2", "wingless_ok", "complete_meta"],
  },
  coleoptera: {
    id: "coleoptera",
    latin: "Coleoptera",
    href: "#/ch7",
    image: "/images/plates/ch7-ladybird.jpg",
    name: { ku: "قوڕقوڕە", ar: "خنفساء", en: "Beetle" },
    tip: {
      ku: "Elytraی sclerotized + sutureی mid-dorsal؛ hindwingی membranous؛ Holometabola.",
      ar: "أغماد متصلبة على خط ظهري؛ جناح طيران غشائي؛ تحول كامل.",
      en: "Sclerotized elytra with mid-dorsal suture; membranous hindwings; holometabolous.",
    },
    traits: ["elytra", "wings_2", "hard_cover", "complete_meta"],
  },
  diptera: {
    id: "diptera",
    latin: "Diptera",
    href: "#/ch8",
    image: "/images/plates/ch8-mosquito.jpg",
    name: { ku: "مێش یان مێشوولە", ar: "ذبابة أو بعوضة", en: "Fly or mosquito" },
    tip: {
      ku: "یەک جووت باڵی فڕین + halteresی gyroscopic؛ لارڤا زۆرجار apodous.",
      ar: "زوج طيران واحد وhalteres؛ اليرقة غالباً بلا أرجل ظاهرة.",
      en: "One flight pair + gyroscopic halteres; larvae often apodous maggots.",
    },
    traits: ["wings_1", "halteres", "complete_meta"],
  },
  hemiptera: {
    id: "hemiptera",
    latin: "Hemiptera",
    href: "#/ch10",
    image: "/images/plates/ch10-bug.jpg",
    name: { ku: "شەتەک یان سنە", ar: "من أو بق", en: "Aphid or true bug" },
    tip: {
      ku: "Rostrumی piercing-sucking؛ hemelytra لە Heteroptera؛ Hemimetabola؛ Aphididae زۆرجار بێباڵ.",
      ar: "فم ثاقب ماص؛ أجنحة نصفية في البق؛ تحول ناقص؛ المن غالباً بلا جناح.",
      en: "Piercing-sucking rostrum; hemelytra in Heteroptera; hemimetabolous; aphids often wingless.",
    },
    traits: ["piercing_beak", "hemelytra", "wingless_ok", "incomplete_meta"],
  },
  orthoptera: {
    id: "orthoptera",
    latin: "Orthoptera",
    href: "#/ch11",
    image: "/images/plates/ch11-dragon.jpg",
    name: { ku: "جڕوشک یان سیسرک", ar: "جندب أو صرصار الليل", en: "Grasshopper or cricket" },
    tip: {
      ku: "Hind femurی saltatorial؛ tegmina؛ زۆرجار stridulation؛ Hemimetabola.",
      ar: "فخذ خلفي للقفز وصرير شائع؛ تحول ناقص.",
      en: "Saltatorial hind femora; often tegmina and stridulation; hemimetabolous.",
    },
    traits: ["jumping_legs", "wings_2", "incomplete_meta", "leathery_forewing"],
  },
  odonata: {
    id: "odonata",
    latin: "Odonata",
    href: "#/ch11",
    image: "/images/plates/ch3-dragonfly.jpg",
    name: { ku: "مێرووی ئاو", ar: "رعاش", en: "Dragonfly or damselfly" },
    tip: {
      ku: "چاوی ئاڵۆزی گەورە؛ باڵی net-veined؛ aerial predator؛ naiadی ئاوی + labial mask.",
      ar: "عين مركبة كبيرة وأجنحة شبكية؛ حورية مائية بفك مندفع.",
      en: "Huge compound eyes; net-veined wings; aerial adult; aquatic naiad with labial mask.",
    },
    traits: ["large_eyes", "netted_wings", "wings_2", "incomplete_meta", "aquatic_nymph"],
  },
  neuroptera: {
    id: "neuroptera",
    latin: "Neuroptera",
    href: "#/ch13",
    image: "/images/plates/ch13-lacewing.jpg",
    name: { ku: "تۆڕباڵ", ar: "أسد المن", en: "Lacewing or antlion" },
    tip: {
      ku: "باڵی soft net-veined؛ بێ scales/elytra/petiole؛ لارڤای aphidophagous؛ Holometabola.",
      ar: "جناح شبكي لين بلا حراشف ولا خصر؛ يرقة تفترس المن؛ تحول كامل.",
      en: "Soft net-veined wings; no scales, elytra or petiole; aphidophagous larva; holometabolous.",
    },
    traits: ["netted_wings", "wings_2", "soft_body", "complete_meta", "no_waist"],
  },
};

export const TRAITS = [
  { id: "wings_1", ku: "یەک جووت باڵی فڕین", ar: "زوج أجنحة طيران واحد", en: "One pair of flying wings" },
  { id: "wings_2", ku: "دوو جووت باڵ", ar: "زوجان من الأجنحة", en: "Two pairs of wings" },
  { id: "wingless_ok", ku: "بێباڵ (گەورە)", ar: "بلا أجنحة (بالغ)", en: "Wingless adult" },
  { id: "elytra", ku: "قاوغی باڵی ڕەق (elytra)", ar: "أغماد صلبة", en: "Hard wing covers (elytra)" },
  { id: "scales", ku: "باڵ پۆشراو بە قاو", ar: "جناح مغطى بحراشف", en: "Wings covered in scales" },
  { id: "halteres", ku: "هەڵتەر لە پشت باڵ", ar: "دبابيس توازن", en: "Halteres behind the wings" },
  { id: "hemelytra", ku: "باڵی نیوە قاوغ", ar: "جناح نصفه صلب", en: "Half-hard forewings" },
  { id: "narrow_waist", ku: "کەمەری باریک", ar: "خصر ضيق", en: "Narrow waist" },
  { id: "no_waist", ku: "بێ کەمەری باریک", ar: "بلا خصر ضيق", en: "No narrow waist" },
  { id: "piercing_beak", ku: "دەمی کونکەر", ar: "فم ثاقب ماص", en: "Piercing-sucking beak" },
  { id: "proboscis", ku: "خرطومی پێچراو", ar: "خرطوم ملفوف", en: "Coiled drinking proboscis" },
  { id: "jumping_legs", ku: "قاچی دواوە بۆ باز", ar: "أرجل خلفية للقفز", en: "Hind legs built for jumping" },
  { id: "large_eyes", ku: "چاوی گەورەی ئاڵۆز", ar: "عين مركبة كبيرة", en: "Very large compound eyes" },
  { id: "netted_wings", ku: "باڵی تۆڕاوی", ar: "جناح شبكي", en: "Netted / many-veined wings" },
  { id: "soft_body", ku: "جەستەی نەرم، باڵی ناسک", ar: "جسم لين وأجنحة رقيقة", en: "Soft body, delicate wings" },
  { id: "complete_meta", ku: "پیت / کۆڵۆک هەیە لە سوڕدا", ar: "شرنقة أو يرقة في الدورة", en: "Has a pupa / larva stage" },
  { id: "incomplete_meta", ku: "پیت نییە؛ بچووک لە گەورە دەچێت", ar: "بلا شرنقة؛ الحورية تشبه البالغ", en: "No pupa; nymph resembles adult" },
];

export const KEY_NODES = {
  start: {
    step: 1,
    q: {
      ku: "مێرووەکە کە دەیبینیت چۆنە؟",
      ar: "كيف تبدو الحشرة التي تراها؟",
      en: "What does the insect you see look like?",
    },
    hint: {
      ku: "سەیری باڵ و قۆناغی ژیان بکە. ئەگەر دڵنیا نیت، ئەوە هەڵبژێرە کە نزیکترە.",
      ar: "انظر إلى الأجنحة ومرحلة الحياة. إن لم تكن متأكداً اختر الأقرب.",
      en: "Look at the wings and life stage. If unsure, pick the closest match.",
    },
    choices: [
      { label: { ku: "گەورەیە و باڵی دیارە", ar: "بالغة ولها أجنحة ظاهرة", en: "Adult with visible wings" }, next: "winged", icon: "wing" },
      { label: { ku: "گەورەیە بەڵام باڵی نییە", ar: "بالغة بلا أجنحة", en: "Adult without wings" }, next: "wingless", icon: "body" },
      { label: { ku: "بچووک / کۆڵۆک / پیتە", ar: "حورية أو يرقة أو شرنقة", en: "Nymph, larva or pupa" }, next: "immature", icon: "stage" },
    ],
  },
  immature: {
    step: 2,
    q: {
      ku: "بچووکەکە زیاتر لە کامە دەچێت؟",
      ar: "إلى أي شيء تشبه المرحلة الصغيرة؟",
      en: "What does the immature stage look like?",
    },
    hint: {
      ku: "ئەگەر لە گەورەکەی دەچێت بەڵام بچووکە → گۆڕانی ناتەواو. ئەگەر کرمێکی جیاوازە یان پیتە → گۆڕانی تەواو.",
      ar: "إن أشبهت البالغ → تحول ناقص. إن كانت يرقة مختلفة أو شرنقة → تحول كامل.",
      en: "If it looks like a small adult → incomplete. If it is a different larva or a pupa → complete.",
    },
    choices: [
      { label: { ku: "لە گەورەکەی دەچێت (بێ پیت)", ar: "تشبه البالغ (بلا شرنقة)", en: "Looks like a small adult (no pupa)" }, next: "nymph_kind", icon: "body" },
      { label: { ku: "کرم / کۆڵۆک یان پیتی جیاواز", ar: "يرقة أو شرنقة مختلفة", en: "A larva or distinct pupa" }, next: "larva_kind", icon: "stage" },
    ],
  },
  nymph_kind: {
    step: 3,
    q: {
      ku: "بچووکی ناتەواو کام نیشانەی هەیە؟",
      ar: "أي علامة لدى هذه الحورية؟",
      en: "Which mark does this nymph show?",
    },
    choices: [
      { label: { ku: "لە ئاو دەژی؛ دواتر دەبێتە مێرووی ئاو", ar: "تعيش في الماء ثم تصبح رعاشاً", en: "Lives in water; becomes a dragonfly" }, next: "odonata", icon: "water" },
      { label: { ku: "قاچی دواوە درێژ؛ باز دەدات", ar: "أرجل خلفية طويلة تقفز", en: "Long hind legs; jumps" }, next: "orthoptera", icon: "jump" },
      { label: { ku: "دەمی کونکەر؛ زۆرجار لەسەر گەڵا", ar: "فم ثاقب؛ غالباً على الأوراق", en: "Piercing beak; often on leaves" }, next: "hemiptera", icon: "beak" },
    ],
  },
  larva_kind: {
    step: 3,
    q: {
      ku: "کۆڵۆک / پیتەکە کامە؟",
      ar: "أي وصف يناسب اليرقة أو الشرنقة؟",
      en: "Which description fits the larva or pupa?",
    },
    choices: [
      { label: { ku: "کۆڵۆکی ڕاوەکەر؛ شەتەک دەخوات", ar: "يرقة مفترسة تأكل المن", en: "Predatory larva that eats aphids" }, next: "neuroptera", icon: "hunt" },
      { label: { ku: "پیتی سەوز یان قاوغدار (پەپوولە)", ar: "شرنقة خضراء أو حرشفية", en: "Chrysalis / moth pupa" }, next: "lepidoptera", icon: "stage" },
      { label: { ku: "کۆڵۆکی ناو خاک / قاوغ — قوڕقوڕە", ar: "يرقة في التربة أو غلاف — خنفساء", en: "Soil / grub larva — beetle" }, next: "coleoptera", icon: "body" },
      { label: { ku: "ماگۆت یان کۆڵۆکی بێ قاچ — مێش", ar: "يرقة بلا أرجل ظاهرة — ذبابة", en: "Maggot-like larva — fly" }, next: "diptera", icon: "wing" },
      { label: { ku: "لە ناو خانەی هەنگ / زەنبوور", ar: "داخل خلية نحل أو زنابير", en: "Inside a bee or wasp nest cell" }, next: "hymenoptera", icon: "waist" },
    ],
  },
  wingless: {
    step: 2,
    q: {
      ku: "گەورەی بێباڵ — کام نیشانە دیارە؟",
      ar: "بالغة بلا أجنحة — أي علامة واضحة؟",
      en: "Wingless adult — which mark is clearest?",
    },
    hint: {
      ku: "مێروولەی کارگەر کەمەری باریکی هەیە. شەتەک دەمی کونکەری هەیە و زۆرجار لەسەر گەڵایە.",
      ar: "شغالة النمل لها خصر ضيق. للمن فم ثاقب وغالباً على الأوراق.",
      en: "Ant workers have a narrow waist. Aphids have a piercing beak and sit on leaves.",
    },
    choices: [
      { label: { ku: "کەمەری باریک — کارگەری مێروولە", ar: "خصر ضيق — شغالة نمل", en: "Narrow waist — ant worker" }, next: "hymenoptera", icon: "waist" },
      { label: { ku: "دەمی کونکەر — شەتەک / سنەی نەرم", ar: "فم ثاقب — من أو بق لين", en: "Piercing beak — aphid / soft bug" }, next: "hemiptera", icon: "beak" },
      { label: { ku: "قاچی دواوە درێژ؛ باز دەدات", ar: "أرجل خلفية طويلة تقفز", en: "Long hind legs; jumps" }, next: "orthoptera", icon: "jump" },
      { label: { ku: "قاوغی پشت ڕەقە وەک قوڕقوڕە", ar: "ظهر صلب كالخنفساء", en: "Hard shell like a beetle" }, next: "coleoptera", icon: "shell" },
    ],
  },
  winged: {
    step: 2,
    q: {
      ku: "چەند جووت باڵی فڕینی دەبینیت؟",
      ar: "كم زوج أجنحة طيران ترى؟",
      en: "How many pairs of flying wings do you see?",
    },
    hint: {
      ku: "لە مێشدا جووتی دووەم بووەتە هەڵتەری بچووک لە پشت باڵی گەورە.",
      ar: "في الذباب يصبح الزوج الثاني دبابيس توازن صغيرة خلف الجناح الكبير.",
      en: "In flies the second pair became tiny halteres behind the big wings.",
    },
    choices: [
      { label: { ku: "یەک جووت (+ هەڵتەر)", ar: "زوج واحد (+ دبابيس توازن)", en: "One pair (+ halteres)" }, next: "diptera", icon: "wing" },
      { label: { ku: "دوو جووت", ar: "زوجان", en: "Two pairs" }, next: "two_pairs", icon: "wing" },
    ],
  },
  two_pairs: {
    step: 3,
    q: {
      ku: "باڵی پێشەوە چۆنە؟",
      ar: "كيف يبدو الجناح الأمامي؟",
      en: "What is the forewing like?",
    },
    choices: [
      { label: { ku: "قاوغی ڕەق؛ هێڵێکی ڕاست لەسەر پشت", ar: "غمد صلب وخط مستقيم على الظهر", en: "Hard covers; straight line on the back" }, next: "coleoptera", icon: "shell" },
      { label: { ku: "نیوە قاوغ، نیوە پەردە", ar: "نصفه صلب ونصفه غشاء", en: "Half hard, half membrane" }, next: "hemiptera", icon: "beak" },
      { label: { ku: "پۆشراو بە قاوی ڕەنگاوڕەنگ", ar: "مغطى بحراشف ملونة", en: "Covered in colourful scales" }, next: "lep_check", icon: "scale" },
      { label: { ku: "پەردەیی / تۆڕاوی، بێ قاو", ar: "غشائي أو شبكي بلا حراشف", en: "Membranous or netted, no scales" }, next: "membrane", icon: "net" },
    ],
  },
  lep_check: {
    step: 4,
    q: {
      ku: "پەپوولەیە یان پەپوولەی شەو؟",
      ar: "أفراشة نهارية أم عثة؟",
      en: "Day butterfly or moth?",
    },
    hint: {
      ku: "هەردووکیان Lepidoptera ـن. ئەنتێنای یەکسان و تۆخ → زۆرجار پەپوولە. ئەنتێنای باریک یان شانەیی → زۆرجار شەو.",
      ar: "كلاهما Lepidoptera. قرون متساوية سميكة → فراشة غالباً. رفيعة أو مشطية → عثة غالباً.",
      en: "Both are Lepidoptera. Clubbed antennae → often butterfly. Thin or feathery → often moth.",
    },
    choices: [
      { label: { ku: "ئەنتێنای تۆخ؛ ڕۆژ دەفڕێت", ar: "قرون سميكة؛ تطير نهاراً", en: "Clubbed antennae; flies by day" }, next: "lepidoptera", icon: "scale" },
      { label: { ku: "ئەنتێنای باریک/شانەیی؛ شەو", ar: "قرون رفيعة/مشطية؛ ليلية", en: "Thin or feathery antennae; night" }, next: "lepidoptera", icon: "scale" },
      { label: { ku: "دڵنیا نیم — هەر Lepidoptera", ar: "لست متأكداً — Lepidoptera", en: "Not sure — still Lepidoptera" }, next: "lepidoptera", icon: "scale" },
    ],
  },
  membrane: {
    step: 4,
    q: {
      ku: "کام نیشانەی تر دەیبینیت؟",
      ar: "أي علامة أخرى ترى؟",
      en: "Which other mark do you see?",
    },
    choices: [
      { label: { ku: "کەمەری باریک + باڵی پەردەیی", ar: "خصر ضيق + أجنحة غشائية", en: "Narrow waist + membranous wings" }, next: "hymenoptera", icon: "waist" },
      { label: { ku: "قاچی دواوە درێژ بۆ باز", ar: "أرجل خلفية للقفز", en: "Long hind legs for jumping" }, next: "orthoptera", icon: "jump" },
      { label: { ku: "چاوی گەورە؛ باڵ کراوە یان تاودراو", ar: "عين كبيرة؛ أجنحة مفتوحة أو مطوية", en: "Huge eyes; wings open or folded" }, next: "odonata", icon: "eye" },
      { label: { ku: "باڵی تۆڕاوی نەرم، بێ کەمەر", ar: "جناح شبكي لين بلا خصر", en: "Soft netted wings, no waist" }, next: "neuroptera", icon: "net" },
    ],
  },
};

/** Attach result payloads onto terminal order ids. */
for (const [id, order] of Object.entries(ORDERS)) {
  KEY_NODES[id] = {
    result: true,
    orderId: id,
    ...order,
  };
}

export function scoreOrders(selectedTraitIds) {
  const selected = new Set(selectedTraitIds);
  if (selected.size === 0) return [];
  return Object.values(ORDERS)
    .map((order) => {
      const hit = order.traits.filter((t) => selected.has(t)).length;
      const score = hit / selected.size;
      return { order, hit, score, total: selected.size };
    })
    .filter((row) => row.hit > 0)
    .sort((a, b) => b.score - a.score || b.hit - a.hit);
}
