import { useState, useRef, useEffect } from "react";
import { Mark } from "./marks";
import { AppFooter } from "./Footer";

const TEAM = [
  {
    img: "/images/team/mahmood.webp",
    nameKu: "مەحموود خدر فەقێ ڕەسوڵ",
    nameAr: "محمود خدر فقێ رسول",
    nameEn: "Mahmood Khdir Faqe Rasul",
    roleKu: "خوێندکاری بایۆلۆجی · گەشەپێدەری وێب سایت",
    roleAr: "طالب علوم بايولوجي · مطور موقع",
    roleEn: "Biology Student · Website Developer",
    icon: "💻",
  }
];


const SECTIONS = [
  {
    id: "intro",
    icon: "📘",
    titles: { ku: "پێشەکی", ar: "المقدمة", en: "Introduction" }
  },
  {
    id: "goals",
    icon: "🎯",
    titles: { ku: "ئامانج", ar: "الأهداف", en: "Goals" }
  },
  {
    id: "team",
    icon: "👥",
    titles: { ku: "دەربارەی ئێمە", ar: "معلومات عنا", en: "About Us" }
  }
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

function TeamSection({ lang }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <section
      ref={ref}
      id="team"
      className={`ento-team-section ${visible ? "ento-visible" : ""}`}
      dir={lang === "en" ? "ltr" : "rtl"}
    >
      <div className="ento-team-header">
        <span className="ento-team-icon">👨‍💻</span>
        <div>
          <h2 className="ento-team-title">
            {lang === "ku" ? "تیمی پەرەپێدەران" : lang === "ar" ? "فريق التطوير" : "Development Team"}
          </h2>
          <p className="ento-team-sub">
            {lang === "ku"
              ? "ئەم پرۆژەیە لەلایەن خوێندکارانی بایۆلۆجی — زانکۆی ڕاپەڕین دروستکراوە"
              : lang === "ar"
              ? "هذا المشروع من تطوير طلاب علوم بايولوجي — جامعة رابرين"
              : "This project is developed by Biology students — University of Raparin"}
          </p>
        </div>
      </div>

      {/* ── ABOUT BIONOVA ── */}
      <div className="ento-about-box">
        <div className="ento-about-badge">🧬 BioNova</div>
        <h3 className="ento-about-heading">
          {lang === "ku" ? "دەربارەی ئێمە"
           : lang === "ar" ? "عنّا"
           : "About Us"}
        </h3>
        <p className="ento-about-text">
          {lang === "ku"
            ? "ئێمە خوێندکاری بەشی بایۆلۆجین لە زانکۆی ڕاپەڕین، و خولیای زانست و داهێنان کۆمان کردووەتەوە. ئەم پرۆژەیە لەبەر ئەوە لەدایک بوو کە سەرچاوەیەکی زانستیی ئەکادیمی بە زمانی دایکمان لە بواری ئێنتۆمۆلۆجیدا نەبوو. باوەڕمان وایە زانست بەهێزتر دەبێت کاتێک بە شێوازێکی مۆدێرن و گشتگیر پێشکەش دەکرێت. بۆیە هەوڵمان داوە «ئەتڵەسی ئێنتۆمۆلۆجی» ببێتە پردێک لە نێوان توێژینەوەی ئەکادیمی و هەموو ئەو کەسانەی حەزیان لە ناسینی نهێنییەکانی سروشتە."
            : lang === "ar"
            ? "نحن فريق BioNova، طالبان من قسم علوم بايولوجي في جامعة رابرين، جمعتنا شغفنا المشترك بالعلم والابتكار. وُلد هذا المشروع من إحساسنا بغياب المصادر العلمية الأكاديمية باللغة الأم في مجال علم الحشرات. نؤمن بأن العلم يزداد قوةً حين يُقدَّم بأسلوب حديث وشامل، لذا سعينا إلى جعل \"أطلس علم الحشرات\" جسرًا بين الأبحاث الأكاديمية وكل من تتوق روحه إلى معرفة أسرار الطبيعة."
            : "We are BioNova — two biology students from the University of Raparin united by a shared passion for science and innovation. This project was born out of a felt absence of academic scientific resources in our mother tongue in the field of entomology. We believe science grows stronger when presented in a modern and inclusive way, so we set out to make the Atlas of Entomology a bridge between academic research and everyone who longs to uncover the secrets of nature."}
        </p>
      </div>

      <div className="ento-team-grid">
        {TEAM.map((m, i) => (
          <div key={i} className="ento-team-card">
            <div className="ento-team-photo-wrap">
              <img src={m.img} alt={m.nameEn} className="ento-team-photo" loading="lazy" />
              <div className="ento-team-badge">{m.icon}</div>
            </div>
            <div className="ento-team-info">
              <div className="ento-team-name">
                {lang === "ku" ? m.nameKu : lang === "ar" ? m.nameAr : m.nameEn}
              </div>
              <div className="ento-team-name-en">{m.nameEn}</div>
              <div className="ento-team-role">
                {lang === "ku" ? m.roleKu : lang === "ar" ? m.roleAr : m.roleEn}
              </div>
              <div className="ento-team-uni">
                {lang === "ku" ? "🏛️ زانکۆی ڕاپەڕین · بەشی بایۆلۆجی"
                 : lang === "ar" ? "🏛️ جامعة رابرين · قسم علوم بايولوجي"
                 : "🏛️ University of Raparin · Biology Dept."}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   INTRO / PREFACE SECTION
═══════════════════════════════════════════════ */
const GOALS = [
  {
    num: "١",
    icon: "💻",
    ku: "دیجیتاڵکردنی زانست",
    ar: "رقمنة العلم",
    en: "Digitising Science",
    descKu: "گۆڕینی زانیارییە کاغەزییەکان بۆ پلاتفۆرمێکی دیجیتاڵی مۆدێرن.",
    descAr: "تحويل المعلومات الورقية إلى منصة رقمية حديثة.",
    descEn: "Transforming paper-based knowledge into a modern digital platform.",
  },
  {
    num: "٢",
    icon: "🗣️",
    ku: "سەرچاوەی زمانی دایک",
    ar: "مصدر باللغة الأم",
    en: "Mother-Tongue Resource",
    descKu: "دابینکردنی زانیارییە ئەکادیمییەکان بە زمانی کوردی بۆ خوێندکاران و مامۆستایان و زانست دۆستان.",
    descAr: "توفير المعلومات الأكاديمية باللغة الكردية للطلاب والمعلمين وعشاق العلم.",
    descEn: "Providing academic information in Kurdish for students, teachers and science enthusiasts.",
  },
  {
    num: "٣",
    icon: "🔬",
    ku: "پۆلێنکردنی کارلێکەر",
    ar: "التصنيف التفاعلي",
    en: "Interactive Classification",
    descKu: "نیشاندانی تێرمی زانستی و پۆلەکان بە شێوازێکی بینراو و مۆدێرن.",
    descAr: "عرض المصطلحات العلمية والتصنيفات بأسلوب بصري وحديث.",
    descEn: "Presenting scientific terms and classifications in a visual, modern style.",
  },
  {
    num: "٤",
    icon: "🌿",
    ku: "ناساندنی ژینگەی کوردستان",
    ar: "التعريف ببيئة كردستان",
    en: "Kurdistan's Environment",
    descKu: "تیشک خستنە سەر جۆرە جیاوازەکانی مێروو لە ناوچەکەدا.",
    descAr: "تسليط الضوء على الأنواع المتنوعة من الحشرات في المنطقة.",
    descEn: "Spotlighting the diverse insect species found across the region.",
  },
  {
    num: "٥",
    icon: "💡",
    ku: "هۆشیاری بایۆلۆجی",
    ar: "الوعي البيولوجي",
    en: "Biological Awareness",
    descKu: "گۆڕینی تێڕوانینی نەرێنی کۆمەڵگە بەرامبەر بە جیهانی مێرووەکان.",
    descAr: "تغيير النظرة السلبية للمجتمع تجاه عالم الحشرات.",
    descEn: "Changing society's negative perception of the insect world.",
  },
  {
    num: "٦",
    icon: "🌍",
    ku: "پێوەرە ژینگەییەکان",
    ar: "المؤشرات البيئية",
    en: "Environmental Indicators",
    descKu: "ئاشناکردنی خەڵک بە مێرووەکان وەک نیشاندەری پاکیی ژینگە.",
    descAr: "تعريف الناس بالحشرات كمؤشرات لنقاء البيئة.",
    descEn: "Acquainting people with insects as indicators of environmental health.",
  },
  {
    num: "٧",
    icon: "🔗",
    ku: "بەستنەوەی زانستەکان",
    ar: "ربط العلوم",
    en: "Connecting Sciences",
    descKu: "نیشاندانی پەیوەندی نێوان بایۆلۆجی و تەکنەلۆژیای سەردەم.",
    descAr: "إبراز العلاقة بين علم الأحياء وتكنولوجيا العصر.",
    descEn: "Showcasing the relationship between biology and modern technology.",
  },
  {
    num: "٨",
    icon: "📊",
    ku: "پشتیوانی توێژەران",
    ar: "دعم الباحثين",
    en: "Supporting Researchers",
    descKu: "دابینکردنی داتای ورد بۆ خوێندکارانی بەشی بایۆلۆجی و پاراستنی ڕووەک.",
    descAr: "توفير بيانات دقيقة لطلاب قسم علوم بايولوجي وعلم النبات.",
    descEn: "Providing detailed data for biology and plant-science students.",
  },
  {
    num: "٩",
    icon: "🌾",
    ku: "کۆنترۆڵی بایۆلۆجی",
    ar: "المكافحة الحيوية",
    en: "Biological Control",
    descKu: "هۆشیارکردنەوە لەسەر گرنگی مێرووە سوودبەخشەکان لە کشتوکاڵدا.",
    descAr: "التوعية بأهمية الحشرات المفيدة في الزراعة.",
    descEn: "Raising awareness of beneficial insects' importance in agriculture.",
  },
  {
    num: "١٠",
    icon: "🎨",
    ku: "داهێنانی بینراو",
    ar: "الابتكار البصري",
    en: "Visual Innovation",
    descKu: "بەکارهێنانی وێنە و ئینفۆگرافیکی سێ ڕەهەندی بۆ فێربوونی خێراتر.",
    descAr: "توظيف الصور والإنفوجرافيك ثلاثي الأبعاد لتسريع التعلم.",
    descEn: "Using images and 3-D infographics for faster, deeper learning.",
  },
];

function GoalsSection({ lang }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const isRtl = lang !== "en";
  return (
    <section
      ref={ref}
      id="goals"
      className={`ento-goals-section ${visible ? "ento-visible" : ""}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="ento-goals-header">
        <span className="ento-goals-icon">🎯</span>
        <div>
          <h2 className="ento-goals-title">
            {lang === "ku" ? "ئامانجە ستراتیژییەکان"
             : lang === "ar" ? "الأهداف الاستراتيجية"
             : "Strategic Goals"}
          </h2>
          <p className="ento-goals-sub">
            {lang === "ku" ? "١٠ ئامانجی بنەڕەتیی ئەتڵەسی ئێنتۆمۆلۆجی"
             : lang === "ar" ? "١٠ أهداف أساسية لأطلس علم الحشرات"
             : "10 core goals of the Atlas of Entomology"}
          </p>
        </div>
      </div>

      <div className="ento-goals-grid">
        {GOALS.map((g, i) => (
          <div key={i} className="ento-goals-card" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="ento-goals-card-top">
              <span className="ento-goals-num">{g.num}</span>
              <span className="ento-goals-emoji">{g.icon}</span>
            </div>
            <div className="ento-goals-card-title">
              {lang === "ku" ? g.ku : lang === "ar" ? g.ar : g.en}
            </div>
            <div className="ento-goals-card-desc">
              {lang === "ku" ? g.descKu : lang === "ar" ? g.descAr : g.descEn}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   QUIZ SECTION
═══════════════════════════════════════════════ */
export default function Chapter1({ lang }) {
  return (
    <div className="ento-chapter-page">
      <div className="ento-chapter-hero">
        <div className="ento-chapter-hero-num">{lang === "ku" ? "چاپتەری یەکەم" : lang === "ar" ? "الفصل الأول" : "Chapter 1"}</div>
        <span className="ento-chapter-hero-icon"><Mark name="pin" /></span>
        <h1 className="ento-chapter-hero-title">
          {lang === "ku" ? "زانیاری زیادە" : lang === "ar" ? "معلومات إضافية" : "Additional Information"}
        </h1>
        <div className="ento-chapter-hero-en">Additional Information · زانیاری زیادە</div>
      </div>
      <TeamSection lang={lang} />
      <GoalsSection lang={lang} />
      <AppFooter lang={lang} sections={SECTIONS} />
    </div>
  );
}

