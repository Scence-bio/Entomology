import { useState, useRef, useEffect } from "react";
import PhotoHero from "./chapter/PhotoHero";
import SectionPills from "./chapter/SectionPills";

function t(lang, pack) {
  return pack[lang] || pack.en;
}

const AUTHOR = {
  img: "/images/team/mahmood.webp",
  name: {
    ku: "مەحموود خدر فەقێ ڕەسوڵ",
    ar: "محمود خدر فقێ رسول",
    en: "Mahmood Khdir Faqe Rasul",
  },
  latin: "Mahmood Khdir Faqe Rasul",
  role: {
    ku: "خوێندکاری بەشی بایۆلۆجی · گەشەپێدەری ئەتڵەس",
    ar: "طالب قسم علوم الحياة · مطور الأطلس",
    en: "Biology student · Atlas developer",
  },
  affiliation: {
    ku: "زانکۆی ڕاپەڕین · کۆلێژی زانست · بەشی بایۆلۆجی",
    ar: "جامعة رابرين · كلية العلوم · قسم علوم الحياة",
    en: "University of Raparin · College of Science · Biology Department",
  },
};

const OUTCOMES = [
  {
    id: "01",
    title: {
      ku: "دیجیتاڵکردنی ناوەڕۆکی ئەکادیمی",
      ar: "رقمنة المحتوى الأكاديمي",
      en: "Digitising academic content",
    },
    body: {
      ku: "گواستنەوەی زانیاریی مێرووناسی لە فۆرمی کاغەز و وانەی کلاسیک بۆ پلاتفۆرمێکی وێبیی سێ زمانە، گونجاو بۆ خوێندن و پێداچوونەوە.",
      ar: "نقل معرفة علم الحشرات من الورق والمحاضرة إلى منصة ويب ثلاثية اللغة للمطالعة والمراجعة.",
      en: "Moving entomological knowledge from print and lecture notes into a trilingual web platform for study and revision.",
    },
  },
  {
    id: "02",
    title: {
      ku: "سەرچاوە بە زمانی دایک و زمانە زانستییەکان",
      ar: "مصدر باللغة الأم واللغات العلمية",
      en: "Mother-tongue and scientific languages",
    },
    body: {
      ku: "پێشکەشکردنی دەقی فێرکاری بە کوردی، عەرەبی و ئینگلیزی، لەگەڵ ناوی زانستیی لاتینی و زاراوەی تەکنیکی.",
      ar: "تقديم نص تعليمي بالكردية والعربية والإنجليزية مع الأسماء العلمية اللاتينية والمصطلح التقني.",
      en: "Delivering instructional text in Kurdish, Arabic and English, with Latin binomials and technical terminology.",
    },
  },
  {
    id: "03",
    title: {
      ku: "پۆلێن و ناسینەوەی کارلێکەر",
      ar: "تصنيف وتعريف تفاعليان",
      en: "Interactive classification and identification",
    },
    body: {
      ku: "ڕوونکردنەوەی ئۆردەر و خێزان، کلیلی ناسینەوە، و نموونەی ناوچەیی بۆ جیاکردنەوەی pollinator و pest و vector.",
      ar: "توضيح الرتب والفصائل ومفتاح التعريف وأمثلة إقليمية لتمييز الملقّح والآفة والناقل.",
      en: "Explaining orders and families, an identification key, and regional examples that separate pollinators, pests and vectors.",
    },
  },
  {
    id: "04",
    title: {
      ku: "گرێدانی ناوچە و ژینگە",
      ar: "ربط المنطقة والبيئة",
      en: "Linking region and environment",
    },
    body: {
      ku: "تیشک خستنە سەر فەونای کوردستان و ناوچەی Irano-Anatolian، و ڕۆڵی مێروو وەک bioindicator و لە کشتوکاڵدا.",
      ar: "إبراز فونة كردستان ونقطة Irano-Anatolian ودور الحشرات كمؤشرات حيوية وفي الزراعة.",
      en: "Highlighting Kurdistan’s fauna within the Irano-Anatolian hotspot, and insects as bioindicators and agricultural agents.",
    },
  },
  {
    id: "05",
    title: {
      ku: "پشتیوانی خوێندن و توێژینەوەی سەرەتایی",
      ar: "دعم الدراسة والبحث الأولي",
      en: "Supporting study and early research",
    },
    body: {
      ku: "دابینکردنی چوارچێوەیەکی ڕێکخراو بۆ خوێندکارانی بایۆلۆجی: فەرهەنگ، کویز، و میتۆدی کێڵگە و لەیبڵ.",
      ar: "توفير إطار منظم لطلاب علوم الحياة: مسرد واختبار وطرائق الحقل والبطاقة.",
      en: "Providing a structured frame for biology students: glossary, quiz, and field-and-label methods.",
    },
  },
  {
    id: "06",
    title: {
      ku: "هۆشیاری و پاراستنی مێروو",
      ar: "الوعي وحفظ الحشرات",
      en: "Awareness and insect conservation",
    },
    body: {
      ku: "گۆڕینی تێڕوانینی نەرێنی بەرامبەر مێروو، و پێشنیاری IPM و پاراستنی habitat لەبری پشتبەستنی تەنها بە سم.",
      ar: "تعديل النظرة السلبية إلى الحشرات واقتراح IPM وحفظ الموائل بدل الاعتماد على المبيدات وحدها.",
      en: "Shifting negative attitudes toward insects and promoting IPM and habitat care over chemistry-only control.",
    },
  },
];

const SCOPE = [
  {
    label: { ku: "ئاست", ar: "المستوى", en: "Level" },
    value: {
      ku: "خوێندنی باڵا — پێشەکیی مێرووناسی",
      ar: "التعليم العالي — مقدمة في علم الحشرات",
      en: "Undergraduate — introductory entomology",
    },
  },
  {
    label: { ku: "زمان", ar: "اللغة", en: "Languages" },
    value: {
      ku: "کوردی (سۆرانی)، عەرەبی، ئینگلیزی + لاتینی",
      ar: "الكردية والسربية والعربية والإنجليزية + اللاتينية",
      en: "Kurdish (Sorani), Arabic, English + Latin",
    },
  },
  {
    label: { ku: "ناوەڕۆک", ar: "المحتوى", en: "Content" },
    value: {
      ku: "بنەما، Arthropoda، ئۆردەرەکان، کێڵگە، کلیل، کویز",
      ar: "الأسس وArthropoda والرتب والحقل والمفتاح والاختبار",
      en: "Foundations, Arthropoda, orders, field work, key, quiz",
    },
  },
  {
    label: { ku: "دامەزراوە", ar: "المؤسسة", en: "Institution" },
    value: {
      ku: "زانکۆی ڕاپەڕین · کۆلێژی زانست",
      ar: "جامعة رابرين · كلية العلوم",
      en: "University of Raparin · College of Science",
    },
  },
];

const HOW_TO = [
  {
    step: "01",
    title: { ku: "نەخشەی فێرکاری", ar: "مسار التعلم", en: "Learning path" },
    body: {
      ku: "لە سەرەکیەوە بە ڕیز بخوێنە: دەستپێک → ئۆردەرەکان → کێڵگە و کلیل → کویز.",
      ar: "من الرئيسية اقرأ بالترتيب: البداية ثم الرتب ثم الحقل والمفتاح ثم الاختبار.",
      en: "From Home, follow the path: foundations → orders → field and key → quiz.",
    },
  },
  {
    step: "02",
    title: { ku: "کلیلی ناسینەوە", ar: "مفتاح التعريف", en: "Identification key" },
    body: {
      ku: "بۆ نمونەیەکی نادیار، کلیلی ڕێنیشاندەر یان نیشانەکان بەکاربهێنە؛ ئەنجامەکە بە چاپتەری ئۆردەر ببەستەوە.",
      ar: "للعينة المجهولة استخدم المفتاح الإرشادي أو الصفات، ثم اربط النتيجة بفصل الرتبة.",
      en: "For an unknown specimen, use the guided key or traits, then open the matching order chapter.",
    },
  },
  {
    step: "03",
    title: { ku: "کویز و پێداچوونەوە", ar: "الاختبار والمراجعة", en: "Quiz and revision" },
    body: {
      ku: "دوای خوێندن، کویز بکە بۆ پشکنینی تێگەیشتن؛ وەڵامە هەڵەکان بگەڕێنەوە بۆ بەشی پەیوەندیدار.",
      ar: "بعد القراءة خض الاختبار لقياس الفهم، وارجع للأقسام ذات الصلة عند الخطأ.",
      en: "After reading, take the quiz to check understanding and revisit linked sections on mistakes.",
    },
  },
];

const NAV = [
  { id: "preface", ku: "پێشەکی", ar: "المقدمة", en: "Preface" },
  { id: "scope", ku: "چوارچێوە", ar: "الإطار", en: "Scope" },
  { id: "outcomes", ku: "ئامانج", ar: "المخرجات", en: "Outcomes" },
  { id: "howto", ku: "چۆنیەتی", ar: "الاستخدام", en: "How to use" },
  { id: "institution", ku: "دامەزراوە", ar: "المؤسسة", en: "Institution" },
  { id: "author", ku: "نووسەر", ar: "المؤلف", en: "Author" },
];

function useInView(ref, { threshold = 0.08, rootMargin = "0px 0px -24px 0px" } = {}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return undefined;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold, rootMargin });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold, rootMargin]);
  return visible;
}

function Block({ id, lang, title, lead, children }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const dir = lang === "en" ? "ltr" : "rtl";
  return (
    <section
      ref={ref}
      id={id}
      className={`ento-ch1-block ${visible ? "ento-visible" : ""}`}
      dir={dir}
    >
      <header className="ento-ch1-head">
        <h2 className="ento-ch1-title">{title}</h2>
        {lead ? <p className="ento-ch1-lead">{lead}</p> : null}
      </header>
      {children}
    </section>
  );
}

export default function Chapter1({ lang }) {
  const dir = lang === "en" ? "ltr" : "rtl";

  return (
    <div className="ento-chapter-page ento-ch1">
      <PhotoHero
        lang={lang}
        image="/images/plates/ch1-college-science.jpg"
        imageAlt={{
          ku: "کۆلێژی زانست · زانکۆی ڕاپەڕین",
          ar: "كلية العلوم · جامعة رابرين",
          en: "College of Science · University of Raparin",
        }}
        num={{ ku: "چاپتەری یەکەم", ar: "الفصل الأول", en: "Chapter 1" }}
        icon="pin"
        title={{
          ku: "پێشەکی و دامەزراوە",
          ar: "المقدمة والمؤسسة",
          en: "Preface and institution",
        }}
        subtitle={{
          ku: "چوارچێوەی ئەکادیمی · زانکۆی ڕاپەڕین",
          ar: "إطار أكاديمي · جامعة رابرين",
          en: "Academic frame · University of Raparin",
        }}
      />

      <SectionPills lang={lang} items={NAV} />

      <div className="ento-ch1-wrap" dir={dir}>
        <Block
          id="preface"
          lang={lang}
          title={t(lang, { ku: "پێشەکی", ar: "مقدمة", en: "Preface" })}
          lead={t(lang, {
            ku: "ئەم ئەتڵەسە سەرچاوەیەکی فێرکاریی کراوەیە بۆ مێرووناسی لە چوارچێوەی کۆلێژی زانست.",
            ar: "هذا الأطلس مصدر تعليمي مفتوح لعلم الحشرات في إطار كلية العلوم.",
            en: "This atlas is an open instructional resource for entomology within the College of Science.",
          })}
        >
          <div className="ento-ch1-prose">
            <p>
              {t(lang, {
                ku: "مێرووناسی (Entomology) لقێکی زانستی زیندەوەرە کە Insecta دەخوێنێتەوە: مۆرفۆلۆجی، فیزیۆلۆجی، ئیکۆلۆجی، ڕەفتار، پۆلێنکردن و پەیوەندی لەگەڵ مرۆڤ و کشتوکاڵ. لە زۆر ناوچەدا سەرچاوەی ئەکادیمی بە زمانی دایک کەمە؛ ئەم پرۆژەیە بۆ پڕکردنەوەی ئەو بۆشاییە دانراوە.",
                ar: "علم الحشرات فرع من علم الأحياء يدرس طائفة Insecta: الشكل والوظيفة والبيئة والسلوك والتصنيف وعلاقة الحشرات بالإنسان والزراعة. في كثير من المناطق تقل المصادر الأكاديمية باللغة الأم؛ وُضع هذا المشروع لسدّ تلك الفجوة.",
                en: "Entomology is the biological study of Insecta—morphology, physiology, ecology, behaviour, systematics and human–agricultural interactions. Academic resources in the mother tongue are scarce in many regions; this project was built to narrow that gap.",
              })}
            </p>
            <p>
              {t(lang, {
                ku: "ئامانجی سەرەکی بریتییە لە پێشکەشکردنی دەقی ورد، نموونەی ناوچەیی، و ئامرازی ناسینەوە و تاقیکردنەوە — بە شێوازێک کە بۆ وانە، خۆخوێندن و پێداچوونەوەی تاقیکردنەوە گونجاو بێت.",
                ar: "الهدف الرئيس تقديم نص دقيق وأمثلة إقليمية وأدوات تعريف واختبار بأسلوب يصلح للمحاضرة والدراسة الذاتية ومراجعة الامتحان.",
                en: "The primary aim is precise text, regional examples, and tools for identification and assessment—suitable for lectures, self-study and exam revision.",
              })}
            </p>
          </div>
        </Block>

        <Block
          id="scope"
          lang={lang}
          title={t(lang, { ku: "چوارچێوە و سنوور", ar: "الإطار والنطاق", en: "Scope and frame" })}
          lead={t(lang, {
            ku: "ئەم خشتەیە سنووری فێرکاری و دامەزراوەیی ئەتڵەسەکە دیاری دەکات.",
            ar: "يحدد هذا الجدول النطاق التعليمي والمؤسسي للأطلس.",
            en: "This table states the instructional and institutional bounds of the atlas.",
          })}
        >
          <dl className="ento-ch1-meta">
            {SCOPE.map((row) => (
              <div key={row.label.en} className="ento-ch1-meta-row">
                <dt>{t(lang, row.label)}</dt>
                <dd>{t(lang, row.value)}</dd>
              </div>
            ))}
          </dl>
        </Block>

        <Block
          id="outcomes"
          lang={lang}
          title={t(lang, { ku: "ئامانجە فێرکارییەکان", ar: "مخرجات التعلم", en: "Learning outcomes" })}
          lead={t(lang, {
            ku: "دوای خوێندنی ئەتڵەسەکە، خوێندکار دەتوانێت ئەم ئامانجانە جێبەجێ بکات.",
            ar: "بعد دراسة الأطلس يستطيع المتعلم تحقيق هذه المخرجات.",
            en: "After studying the atlas, a learner should be able to meet these outcomes.",
          })}
        >
          <ol className="ento-ch1-outcomes">
            {OUTCOMES.map((item) => (
              <li key={item.id}>
                <span className="ento-ch1-outcome-num" dir="ltr">{item.id}</span>
                <div>
                  <strong>{t(lang, item.title)}</strong>
                  <p>{t(lang, item.body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </Block>

        <Block
          id="howto"
          lang={lang}
          title={t(lang, { ku: "چۆنیەتی بەکارهێنان", ar: "كيفية الاستخدام", en: "How to use this atlas" })}
          lead={t(lang, {
            ku: "سێ هەنگاوی کرداری بۆ خوێندنەوەی ڕێکخراو.",
            ar: "ثلاث خطوات عملية للقراءة المنظمة.",
            en: "Three practical steps for structured study.",
          })}
        >
          <div className="ento-ch1-steps">
            {HOW_TO.map((item) => (
              <article key={item.step} className="ento-ch1-step">
                <span className="ento-ch1-step-num" dir="ltr">{item.step}</span>
                <h3>{t(lang, item.title)}</h3>
                <p>{t(lang, item.body)}</p>
              </article>
            ))}
          </div>
        </Block>

        <Block
          id="institution"
          lang={lang}
          title={t(lang, { ku: "دامەزراوە", ar: "المؤسسة", en: "Institution" })}
          lead={t(lang, {
            ku: "ئەم ئەتڵەسە لە چوارچێوەی زانکۆی ڕاپەڕین پەرەی پێ دراوە.",
            ar: "طُوّر هذا الأطلس في إطار جامعة رابرين.",
            en: "This atlas was developed in the frame of the University of Raparin.",
          })}
        >
          <div className="ento-ch1-institution">
            <div className="ento-ch1-inst-card">
              <p className="ento-ch1-inst-kicker" dir="ltr">University of Raparin</p>
              <h3>{t(lang, { ku: "زانکۆی ڕاپەڕین", ar: "جامعة رابرين", en: "University of Raparin" })}</h3>
              <p>
                {t(lang, {
                  ku: "کۆلێژی زانست · بەشی بایۆلۆجی. سەرچاوەی فێرکاریی کراوە بۆ خوێندکار و مامۆستا.",
                  ar: "كلية العلوم · قسم علوم الحياة. مصدر تعليمي مفتوح للطلاب والأساتذة.",
                  en: "College of Science · Biology Department. An open instructional resource for students and staff.",
                })}
              </p>
              <div
                className="ento-ch1-inst-gallery"
                role="group"
                aria-label={t(lang, {
                  ku: "وێنەی فەرمیی کەمپەس",
                  ar: "صور الحرم الرسمية",
                  en: "Official campus photographs",
                })}
              >
                <figure className="ento-ch1-inst-shot">
                  <img
                    src="/images/plates/ch1-college-science.jpg"
                    alt={t(lang, {
                      ku: "بینای کۆلێژی زانست",
                      ar: "مبنى كلية العلوم",
                      en: "College of Science building",
                    })}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="530"
                  />
                  <figcaption>
                    {t(lang, {
                      ku: "کۆلێژی زانست · sci.uor.edu.krd",
                      ar: "كلية العلوم · sci.uor.edu.krd",
                      en: "College of Science · sci.uor.edu.krd",
                    })}
                  </figcaption>
                </figure>
                <figure className="ento-ch1-inst-shot">
                  <img
                    src="/images/plates/ch1-uor-campus.jpg"
                    alt={t(lang, {
                      ku: "کەمپەسی سەرەکیی زانکۆی ڕاپەڕین",
                      ar: "الحرم الرئيسي لجامعة رابرين",
                      en: "University of Raparin main campus",
                    })}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="530"
                  />
                  <figcaption>
                    {t(lang, {
                      ku: "کەمپەسی زانکۆ · uor.edu.krd",
                      ar: "حرم الجامعة · uor.edu.krd",
                      en: "University campus · uor.edu.krd",
                    })}
                  </figcaption>
                </figure>
                <figure className="ento-ch1-inst-shot">
                  <img
                    src="/images/plates/ch1-sci-campus-1.jpg"
                    alt={t(lang, {
                      ku: "تاقیگەی کۆلێژی زانست",
                      ar: "مختبر كلية العلوم",
                      en: "College of Science laboratory",
                    })}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="530"
                  />
                  <figcaption>
                    {t(lang, {
                      ku: "تاقیگە · گەلەریی کۆلێژ",
                      ar: "مختبر · معرض الكلية",
                      en: "Laboratory · college gallery",
                    })}
                  </figcaption>
                </figure>
                <figure className="ento-ch1-inst-shot">
                  <img
                    src="/images/plates/ch1-sci-campus-2.jpg"
                    alt={t(lang, {
                      ku: "خوێندکار لەسەر مایکرۆسکۆپ",
                      ar: "طالبة على المجهر",
                      en: "Student at the microscope",
                    })}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="530"
                  />
                  <figcaption>
                    {t(lang, {
                      ku: "کارکردن لە تاقیگە · گەلەریی کۆلێژ",
                      ar: "عمل مخبري · معرض الكلية",
                      en: "Lab work · college gallery",
                    })}
                  </figcaption>
                </figure>
              </div>
              <ul className="ento-ch1-links">
                <li>
                  <a href="https://uor.edu.krd/en/" target="_blank" rel="noopener noreferrer">
                    {t(lang, { ku: "ماڵپەڕی زانکۆ", ar: "موقع الجامعة", en: "University website" })}
                  </a>
                </li>
                <li>
                  <a href="https://sci.uor.edu.krd/en/" target="_blank" rel="noopener noreferrer">
                    {t(lang, { ku: "کۆلێژی زانست", ar: "كلية العلوم", en: "College of Science" })}
                  </a>
                </li>
                <li>
                  <a href="https://sci.uor.edu.krd/en/departments/biology/" target="_blank" rel="noopener noreferrer">
                    {t(lang, { ku: "بەشی بایۆلۆجی", ar: "قسم علوم الحياة", en: "Biology Department" })}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Block>

        <Block
          id="author"
          lang={lang}
          title={t(lang, { ku: "نووسەر و گەشەپێدەر", ar: "المؤلف والمطور", en: "Author and developer" })}
          lead={t(lang, {
            ku: "دیزاین، ناوەڕۆک و جێبەجێکردنی وێب لەلایەن خوێندکارێکی بەشی بایۆلۆجی.",
            ar: "تصميم المحتوى وتنفيذ الويب بواسطة طالب في قسم علوم الحياة.",
            en: "Content design and web implementation by a Biology Department student.",
          })}
        >
          <article className="ento-ch1-author">
            <div className="ento-ch1-author-photo">
              <img
                src={AUTHOR.img}
                alt={AUTHOR.latin}
                loading="lazy"
                decoding="async"
                width="320"
                height="400"
              />
            </div>
            <div className="ento-ch1-author-body">
              <h3>{t(lang, AUTHOR.name)}</h3>
              <p className="ento-ch1-author-latin" dir="ltr">{AUTHOR.latin}</p>
              <p className="ento-ch1-author-role">{t(lang, AUTHOR.role)}</p>
              <p className="ento-ch1-author-aff">{t(lang, AUTHOR.affiliation)}</p>
              <p className="ento-ch1-author-note">
                {t(lang, {
                  ku: "ئەم ئەتڵەسە وەک سەرچاوەی فێرکاریی ئەکادیمی ئامادە کراوە؛ ناوەڕۆکەکە بۆ خوێندن و وانە بەکاردێت و جێگای دەستنیشانکردنی تاکەسەرچاوەی توێژینەوەی سەربەخۆ ناگرێتەوە بەبێ پێداچوونەوەی زیاتر.",
                  ar: "أُعدّ هذا الأطلس مصدراً تعليمياً أكاديمياً؛ يصلح للدراسة والمحاضرة ولا يغني عن المراجعة العلمية الإضافية في البحث المستقل.",
                  en: "Prepared as an academic teaching resource for study and lectures; it does not replace further scholarly review for independent research.",
                })}
              </p>
            </div>
          </article>
        </Block>
      </div>
    </div>
  );
}
