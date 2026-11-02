import PhotoHero from "./chapter/PhotoHero";
import SectionPills from "./chapter/SectionPills";
import {
  LEDGER_META,
  FAUNAL_STUDIES,
  ACADEMIC_LEXICON,
  LEDGER_OUTCOMES,
} from "./data/kurdistanFauna";
import { GBIF_IRAQ, DATABASES } from "./data/trustedSources";

function t(lang, pack) {
  return pack[lang] || pack.en || pack.ku || "";
}

function digits(lang, n) {
  const s = Number(n).toLocaleString("en-US");
  if (lang === "en") return s;
  return s.replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
}

const NAV = [
  { id: "preamble", ku: "پێشەکی", ar: "المقدمة", en: "Preamble" },
  { id: "outcomes", ku: "ئامانج", ar: "المخرجات", en: "Outcomes" },
  { id: "studies", ku: "توێژینەوە", ar: "الأبحاث", en: "Studies" },
  { id: "lexicon", ku: "فەرهەنگ", ar: "المعجم", en: "Lexicon" },
  { id: "method", ku: "میتۆد", ar: "المنهج", en: "Method" },
];

export default function KurdistanLedger({ lang }) {
  const dir = lang === "en" ? "ltr" : "rtl";

  return (
    <div className="ento-chapter-page ento-ch1 ento-ledger">
      <PhotoHero
        lang={lang}
        image="/images/plates/ch1-uor-campus.jpg"
        imageAlt={{
          ku: "کەمپەسی زانکۆی ڕاپەڕین",
          ar: "حرم جامعة رابرين",
          en: "University of Raparin campus",
        }}
        focus="center 45%"
        num={{
          ku: "تۆماری فەرمی",
          ar: "سجل رسمي",
          en: "Formal ledger",
        }}
        icon="pin"
        title={LEDGER_META.title}
        subtitle={LEDGER_META.subtitle}
      />
      <SectionPills lang={lang} items={NAV} />

      <div className="ento-ch1-wrap" dir={dir}>
        <section id="preamble" className="ento-ch1-block ento-visible">
          <header className="ento-ch1-head">
            <h2 className="ento-ch1-title">
              {t(lang, {
                ku: "پێشەکیی فەرمی",
                ar: "مقدمة رسمية",
                en: "Formal preamble",
              })}
            </h2>
            <p className="ento-ch1-lead">{t(lang, LEDGER_META.preamble)}</p>
          </header>
          <div className="ento-ch1-prose">
            <p>
              {t(lang, {
                ku: `لە وێنەی GBIFـی عێراق (${GBIF_IRAQ.retrieved})دا ${digits(lang, GBIF_IRAQ.insecta.occurrences)} ڕوودانی Insecta و ${digits(lang, GBIF_IRAQ.insecta.distinctSpeciesKeys)} speciesKey تۆمار کراون. ئەم ژمارانە بنەمای دیجیتاڵن؛ توێژینەوەی خوارەوە قووڵایی ناوچەیی دەبەخشن کە GBIF بەتەنهایی ناتوانێت پڕی بکاتەوە.`,
                ar: `في لقطة GBIF للعراق (${GBIF_IRAQ.retrieved}) سُجّل ${digits(lang, GBIF_IRAQ.insecta.occurrences)} تواجداً لـInsecta و${digits(lang, GBIF_IRAQ.insecta.distinctSpeciesKeys)} مفتاح نوع. هذه أرقام رقمية؛ والأبحاث أدناه تمنح عمقاً إقليمياً لا يوفره GBIF وحده.`,
                en: `Iraq’s GBIF snapshot (${GBIF_IRAQ.retrieved}) holds ${digits(lang, GBIF_IRAQ.insecta.occurrences)} Insecta occurrences and ${digits(lang, GBIF_IRAQ.insecta.distinctSpeciesKeys)} species keys. Those are digital baselines; the studies below supply regional depth GBIF alone cannot.`,
              })}
            </p>
            <p>
              {t(lang, {
                ku: "ئەم تۆمارە لە چوارچێوەی زانکۆی ڕاپەڕین · کۆلێژی زانست · بەشی بایۆلۆجی ئامادە کراوە، وەک بەشێک لە ئەتڵەسی مێرووناسی — سێ زمان، یەک ستانداردی ئەکادیمی.",
                ar: "أُعدّ هذا السجل في إطار جامعة رابرين · كلية العلوم · قسم علوم الحياة، ضمن أطلس علم الحشرات — ثلاث لغات ومعيار أكاديمي واحد.",
                en: "Prepared within the University of Raparin · College of Science · Biology Department, as part of the Atlas of Entomology — three languages, one academic standard.",
              })}
            </p>
          </div>
        </section>

        <section id="outcomes" className="ento-ch1-block ento-visible">
          <header className="ento-ch1-head">
            <h2 className="ento-ch1-title">
              {t(lang, {
                ku: "ئامانجە فێرکارییەکان",
                ar: "مخرجات التعلم",
                en: "Intended learning outcomes",
              })}
            </h2>
            <p className="ento-ch1-lead">
              {t(lang, {
                ku: "دوای خوێندنی تۆمارەکە، خوێندکار دەبێت بتوانێت ئەم سێ ئامانجە جێبەجێ بکات.",
                ar: "بعد دراسة السجل ينبغي أن يحقق المتعلم هذه المخرجات الثلاث.",
                en: "After studying the ledger, a learner should meet these three outcomes.",
              })}
            </p>
          </header>
          <ol className="ento-ch1-outcomes">
            {LEDGER_OUTCOMES.map((item) => (
              <li key={item.id}>
                <span className="ento-ch1-outcome-num" dir="ltr">
                  {item.id}
                </span>
                <div>
                  <strong>{t(lang, item.title)}</strong>
                  <p>{t(lang, item.body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="studies" className="ento-ch1-block ento-visible">
          <header className="ento-ch1-head">
            <h2 className="ento-ch1-title">
              {t(lang, {
                ku: "توێژینەوەی ناوچەییی بڵاوکراو",
                ar: "أبحاث إقليمية منشورة",
                en: "Published regional studies",
              })}
            </h2>
            <p className="ento-ch1-lead">
              {t(lang, {
                ku: "هەر کارتێک پوختەیەکی فەرمیی توێژینەوەیەکە بە هەمان قووڵایی لە هەر سێ زماندا.",
                ar: "كل بطاقة خلاصة رسمية لبحث واحد بنفس العمق في اللغات الثلاث.",
                en: "Each card is a formal digest of one study, written to equal depth in all three languages.",
              })}
            </p>
          </header>

          <div className="ento-ledger-studies">
            {FAUNAL_STUDIES.map((study) => (
              <article key={study.id} className="ento-ledger-study" id={study.id}>
                <p className="ento-ch1-inst-kicker" dir="ltr">
                  {study.order} · {study.taxon} · {study.year}
                </p>
                <h3>{t(lang, study.title)}</h3>
                <p className="ento-ledger-aff">{t(lang, study.affiliation)}</p>
                <p className="ento-ledger-venue" dir="ltr">
                  {study.authors} · {study.venue}
                </p>
                <p className="ento-ledger-finding">{t(lang, study.finding)}</p>
                <ul className="ento-ledger-metrics">
                  {study.metrics.map((m) => (
                    <li key={t(lang, m)}>{t(lang, m)}</li>
                  ))}
                </ul>
                <a
                  className="ento-ledger-link"
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(lang, {
                    ku: "سەیری توێژینەوەکە بکە",
                    ar: "اطّلع على البحث",
                    en: "Open the study",
                  })}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="lexicon" className="ento-ch1-block ento-visible">
          <header className="ento-ch1-head">
            <h2 className="ento-ch1-title">
              {t(lang, {
                ku: "فەرهەنگی ئەکادیمیی سێ زمانە",
                ar: "معجم أكاديمي ثلاثي اللغة",
                en: "Trilingual academic lexicon",
              })}
            </h2>
            <p className="ento-ch1-lead">
              {t(lang, {
                ku: "ناوی لاتینی وەک خۆی دەمێنێتەوە؛ پێناسە بە کوردی، عەرەبی و ئینگلیزی بە یەک ئاستی وردەکاری نووسراوە.",
                ar: "يبقى الاسم اللاتيني كما هو؛ والتعريف مكتوب بالكردية والعربية والإنجليزية بنفس مستوى التفصيل.",
                en: "Latin names remain Latin; each definition is written in Kurdish, Arabic and English at the same level of detail.",
              })}
            </p>
          </header>
          <div className="ento-ledger-lexicon">
            {ACADEMIC_LEXICON.map((entry) => (
              <article key={entry.term} className="ento-ledger-lex-item">
                <h3 className="ento-binomial" dir="ltr">
                  {entry.term}
                </h3>
                <dl className="ento-ledger-lex-defs">
                  <div>
                    <dt>کوردی</dt>
                    <dd>{entry.ku}</dd>
                  </div>
                  <div>
                    <dt>العربية</dt>
                    <dd>{entry.ar}</dd>
                  </div>
                  <div>
                    <dt>English</dt>
                    <dd>{entry.en}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section id="method" className="ento-ch1-block ento-visible">
          <header className="ento-ch1-head">
            <h2 className="ento-ch1-title">
              {t(lang, {
                ku: "میتۆد و ستاندارد",
                ar: "المنهج والمعيار",
                en: "Method and standard",
              })}
            </h2>
            <p className="ento-ch1-lead">
              {t(lang, {
                ku: "چۆنیەتی هەڵبژاردنی سەرچاوە و پاراستنی یەکسانیی زمان.",
                ar: "كيف تُختار المصادر وكيف تُحفظ المساواة اللغوية.",
                en: "How sources are chosen and how linguistic parity is maintained.",
              })}
            </p>
          </header>
          <div className="ento-ch1-prose">
            <p>
              {t(lang, {
                ku: "١) تەنها توێژینەوەی بڵاوکراو یان داتابەسی دامەزراو (GBIF، Catalogue of Life، ITIS، NCBI، BOLD، EPPO، IUCN) دەخرێنە تۆمارەکە. ٢) هەر دەقێکی فێرکاری بە سێ زمان دەنووسرێتەوە؛ کورتکردنەوەی زمانێک بەرامبەر ئەوی دیکە قەدەغەیە. ٣) ناوی زانستی لاتینی و DOI دەمێننەوە. ٤) ئەم تۆمارە «کار لە پێشە»ـیە و لەگەڵ بڵاوبوونەوەی نوێ نوێ دەکرێتەوە.",
                ar: "١) تُدرج فقط الأبحاث المنشورة أو قواعد البيانات المؤسسية (GBIF وCatalogue of Life وITIS وNCBI وBOLD وEPPO وIUCN). ٢) يُكتب كل نص تعليمي باللغات الثلاث؛ ويُمنع اختصار لغة مقابل أخرى. ٣) تبقى الأسماء العلمية اللاتينية ومعرّفات DOI. ٤) السجل عمل جارٍ يُحدَّث مع المنشورات الجديدة.",
                en: "1) Only published studies or institutional databases (GBIF, Catalogue of Life, ITIS, NCBI, BOLD, EPPO, IUCN) enter the ledger. 2) Every instructional passage is authored in all three languages; shortening one language against another is forbidden. 3) Latin binomials and DOIs are retained. 4) The ledger is a living document, revised as new papers appear.",
              })}
            </p>
          </div>
          <ul className="ento-evidence-dbs" style={{ marginTop: 16 }}>
            {DATABASES.slice(0, 5).map((db) => (
              <li key={db.id}>
                <a href={db.url} target="_blank" rel="noopener noreferrer" dir="ltr">
                  {db.name}
                </a>
                <span className="ento-evidence-db-full" dir="ltr">
                  {" "}
                  — {db.full}
                </span>
                <p>{t(lang, db.role)}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
