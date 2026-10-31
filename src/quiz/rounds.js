import { SPECIMENS } from "../butterflies";

export function shuffle(list) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Same order for every language, so switching language mid-question keeps
// the answer under the same letter.
function shuffleOptions(question) {
  const order = shuffle(question.opts.en.map((_, i) => i));
  const opts = {};
  for (const lang of Object.keys(question.opts)) {
    opts[lang] = order.map((i) => question.opts[lang][i]);
  }
  return { ...question, opts, correct: order.indexOf(question.correct) };
}

const SPECIES = Object.values(
  SPECIMENS.reduce((acc, s) => {
    if (!acc[s.sci]) acc[s.sci] = s;
    return acc;
  }, {})
);

// "Which species is this?" built from the butterfly gallery photos. The
// answers are scientific names, which read the same in every language.
export function pictureQuestions(count) {
  return shuffle(SPECIES).slice(0, count).map((s) => {
    const others = shuffle(SPECIES.filter((o) => o.sci !== s.sci)).slice(0, 3).map((o) => o.sci);
    const names = [s.sci, ...others];
    return {
      id: `pic-${s.id}`,
      chapter: "ch5",
      image: s.img,
      latinOptions: true,
      section: { ku: "پرسیاری وێنە", ar: "سؤال بالصورة", en: "Picture question" },
      q: {
        ku: "ناوی زانستیی ئەم جۆرە چییە؟",
        ar: "ما الاسم العلمي لهذا النوع؟",
        en: "What is the scientific name of this species?",
      },
      opts: { ku: names, ar: names, en: names },
      correct: 0,
      why: {
        ku: `${s.sci}، لە خێزانی ${s.family}.`,
        ar: `${s.sci}، من فصيلة ${s.family}.`,
        en: `${s.sci}, family ${s.family}.`,
      },
    };
  });
}

// The full quiz takes 8 questions from every chapter plus 2 photos; a
// chapter quiz takes up to 5 of its own (chapter 5 adds 2 photos).
export function buildRound(pool, chapter) {
  const own = chapter ? pool.filter((q) => q.chapter === chapter) : pool;
  const textCount = chapter ? 5 : 8;
  const photos = !chapter || chapter === "ch5" ? 2 : 0;
  const picked = [...shuffle(own).slice(0, textCount), ...pictureQuestions(photos)];
  return shuffle(picked).map(shuffleOptions);
}
