import { useState, useRef, useEffect, useCallback } from "react";
import { Mark } from "./marks";

const VIDEOS = [
  {
    id: "QL906_79HJM",
    title: {
      ku: "ئێنتۆمۆلۆجی — ناسنامەی مێرووەکان",
      ar: "علم الحشرات — التعرف على الحشرات",
      en: "Entomology — Insect Identification",
    },
  },
  {
    id: "vpJDYwRtuNI",
    title: {
      ku: "ئێنتۆمۆلۆجی — ژیان و گەشەی مێرووەکان",
      ar: "علم الحشرات — حياة الحشرات وتطورها",
      en: "Entomology — Insect Life & Development",
    },
  },
];

const QUIZ = [
  {
    id:1,
    section:{ ku:"بەشی یەکەم: پێناسە و مێژوو", ar:"القسم الأول: التعريف والتاريخ", en:"Section 1: Definition & History" },
    q:{ ku:"وشەی Entomology لە بنەڕەتدا لە چ زمانێکەوە هاتوە؟", ar:"كلمة Entomology مشتقة أصلاً من أي لغة؟", en:"The word 'Entomology' originally comes from which language?" },
    opts:{ ku:["لاتینی","یۆنانی کۆن","فەرەنسی","ئەڵمانی"], ar:["اللاتينية","اليونانية القديمة","الفرنسية","الألمانية"], en:["Latin","Ancient Greek","French","German"] },
    correct:1,
  },
  {
    id:2,
    section:{ ku:"بەشی یەکەم: پێناسە و مێژوو", ar:"القسم الأول: التعريف والتاريخ", en:"Section 1: Definition & History" },
    q:{ ku:"کام لەم زانایانە بە «باوکی Taxonomy» دادەنرێت؟", ar:"من يُلقب بـ«أب علم التصنيف»؟", en:"Which scientist is considered the 'Father of Taxonomy'?" },
    opts:{ ku:["Jean-Henri Fabre","Charles Darwin","Carl Linnaeus","William Kirby"], ar:["جان هنري فابر","تشارلز داروين","كارل لينيوس","وليام كيربي"], en:["Jean-Henri Fabre","Charles Darwin","Carl Linnaeus","William Kirby"] },
    correct:2,
  },
  {
    id:3,
    section:{ ku:"بەشی یەکەم: پێناسە و مێژوو", ar:"القسم الأول: التعريف والتاريخ", en:"Section 1: Definition & History" },
    q:{ ku:"یەکەمین هەوڵی جیدی بۆ پۆلێنکردنی مێرووەکان لە سەردەمی کۆن کێی کرد؟", ar:"من بذل أول جهد جاد لتصنيف الحشرات في العصور القديمة؟", en:"Who made the first serious attempt to classify insects in ancient times?" },
    opts:{ ku:["ئەرستۆ","ئەفلاتون","سوقرات","فیساگۆرس"], ar:["أرسطو","أفلاطون","سقراط","فيثاغورس"], en:["Aristotle","Plato","Socrates","Pythagoras"] },
    correct:0,
  },
  {
    id:4,
    section:{ ku:"بەشی دووەم: مۆرفۆلۆجی و فیزیۆلۆجی", ar:"القسم الثاني: المورفولوجيا والفيزيولوجيا", en:"Section 2: Morphology & Physiology" },
    q:{ ku:"جەستەی مێرووەکان لە چەند بەشی سەرەکی (Tagmata) پێکهاتووە؟", ar:"كم عدد الأجزاء الرئيسية (Tagmata) في جسم الحشرة؟", en:"How many main body regions (Tagmata) do insects have?" },
    opts:{ ku:["٢ بەش","٣ بەش","٤ بەش","٥ بەش"], ar:["قسمان","٣ أقسام","٤ أقسام","٥ أقسام"], en:["2 parts","3 parts","4 parts","5 parts"] },
    correct:1,
  },
  {
    id:5,
    section:{ ku:"بەشی دووەم: مۆرفۆلۆجی و فیزیۆلۆجی", ar:"القسم الثاني: المورفولوجيا والفيزيولوجيا", en:"Section 2: Morphology & Physiology" },
    q:{ ku:"ئێسکەپەیکەری دەرەکی مێرووەکان لە چ ماددەیەک دروست بووە؟", ar:"من أي مادة يتكون الهيكل الخارجي للحشرات؟", en:"What substance makes up the exoskeleton of insects?" },
    opts:{ ku:["کالیسیۆم","کایتین (Chitin)","سیلۆلۆز","کەرەیتین"], ar:["الكالسيوم","الكيتين (Chitin)","السيليلوز","الكيراتين"], en:["Calcium","Chitin","Cellulose","Keratin"] },
    correct:1,
  },
  {
    id:6,
    section:{ ku:"بەشی دووەم: مۆرفۆلۆجی و فیزیۆلۆجی", ar:"القسم الثاني: المورفولوجيا والفيزيولوجيا", en:"Section 2: Morphology & Physiology" },
    q:{ ku:"مێرووەکان خاوەنی چەند قاچن؟", ar:"كم عدد أرجل الحشرات؟", en:"How many legs do insects have?" },
    opts:{ ku:["٤ قاچ","٦ قاچ","٨ قاچ","١٠ قاچ"], ar:["٤ أرجل","٦ أرجل","٨ أرجل","١٠ أرجل"], en:["4 legs","6 legs","8 legs","10 legs"] },
    correct:1,
  },
  {
    id:7,
    section:{ ku:"بەشی دووەم: مۆرفۆلۆجی و فیزیۆلۆجی", ar:"القسم الثاني: المورفولوجيا والفيزيولوجيا", en:"Section 2: Morphology & Physiology" },
    q:{ ku:"سیستەمی هەناسەدان لە مێرووەکاندا پێی دەوترێت چی؟", ar:"ما اسم جهاز التنفس في الحشرات؟", en:"What is the respiratory system in insects called?" },
    opts:{ ku:["سیستەمی سییەکان","سیستەمی بۆری هەوایی (Tracheal System)","هەناسەدانی پێستی","سیستەمی ئاویی"], ar:["الجهاز الشُّعبي","الجهاز القصيبي (Tracheal System)","التنفس الجلدي","الجهاز المائي"], en:["Gill system","Tracheal System","Cutaneous breathing","Aquatic system"] },
    correct:1,
  },
  {
    id:8,
    section:{ ku:"بەشی سێیەم: پۆلێنکردنی جومگەپێیەکان", ar:"القسم الثالث: تصنيف المفصليات", en:"Section 3: Arthropod Classification" },
    q:{ ku:"کام لەم پۆلانە خاوەنی ٨ قاچن و ئەنتێنایان نییە؟", ar:"أي من هذه المجموعات لديها ٨ أرجل وتفتقر إلى القرون؟", en:"Which group has 8 legs and no antennae?" },
    opts:{ ku:["Insecta","Crustacea","Arachnida","Chilopoda"], ar:["الحشرات","القشريات","العنكبيات","الحريشيات"], en:["Insecta","Crustacea","Arachnida","Chilopoda"] },
    correct:2,
  },
  {
    id:9,
    section:{ ku:"بەشی سێیەم: پۆلێنکردنی جومگەپێیەکان", ar:"القسم الثالث: تصنيف المفصليات", en:"Section 3: Arthropod Classification" },
    q:{ ku:"سەب-فایڵەمی Myriapoda چ جۆرە زیندەوەرێک لە خۆ دەگرێت؟", ar:"ماذا يضم الصف الفرعي Myriapoda؟", en:"What organisms does subphylum Myriapoda include?" },
    opts:{ ku:["سپایدەرەکان","قرژاڵەکان","هەزارپێ و سەپێیەکان","پەپوولەکان"], ar:["العناكب","الخنافس","الحريشيات وذوات الألف رجل","الفراشات"], en:["Spiders","Beetles","Centipedes & Millipedes","Butterflies"] },
    correct:2,
  },
  {
    id:10,
    section:{ ku:"بەشی سێیەم: پۆلێنکردنی جومگەپێیەکان", ar:"القسم الثالث: تصنيف المفصليات", en:"Section 3: Arthropod Classification" },
    q:{ ku:"کام گروپ تەنها دوو جووت ئەنتێنایان هەیە؟", ar:"أي مجموعة تمتلك زوجين فقط من القرون؟", en:"Which group has only two pairs of antennae?" },
    opts:{ ku:["مێرووەکان","ئەرەکنایدەکان","کراستێشیا (Crustacea)","تڕایلۆبایتەکان"], ar:["الحشرات","العنكبيات","القشريات (Crustacea)","الثلاثيات الفصوص"], en:["Insects","Arachnids","Crustacea","Trilobites"] },
    correct:2,
  },
  {
    id:11,
    section:{ ku:"بەشی چوارەم: سوود و زیانەکان", ar:"القسم الرابع: الفوائد والأضرار", en:"Section 4: Benefits & Harms" },
    q:{ ku:"بەکارهێنانی مێرووەکان بۆ دیاریکردنی کاتی مردن لە تاوانەکاندا پێی دەوترێت:", ar:"ما اسم استخدام الحشرات لتحديد وقت الوفاة في الجرائم؟", en:"Using insects to determine time of death in crimes is called:" },
    opts:{ ku:["ئێنتۆمۆلۆجی کشتوکاڵی","ئێنتۆمۆلۆجی دادوەری (Forensic)","ئێنتۆمۆلۆجی پزیشکی","ئێنتۆمۆلۆجی ئیکۆلۆجی"], ar:["علم الحشرات الزراعي","علم الحشرات الجنائي (Forensic)","علم الحشرات الطبي","علم الحشرات البيئي"], en:["Agricultural Entomology","Forensic Entomology","Medical Entomology","Ecological Entomology"] },
    correct:1,
  },
  {
    id:12,
    section:{ ku:"بەشی چوارەم: سوود و زیانەکان", ar:"القسم الرابع: الفوائد والأضرار", en:"Section 4: Benefits & Harms" },
    q:{ ku:"«Bio-indicators» مەبەست لێی چییە؟", ar:"ماذا تعني «Bio-indicators»؟", en:"What do 'Bio-indicators' mean?" },
    opts:{ ku:["مێرووی زیانبەخش بۆ کشتوکاڵ","مێروو وەک پێوەر بۆ پاکی ژینگە","مێرووە گۆشتخۆرەکان","گواستنەوەی نەخۆشی"], ar:["الحشرات الضارة بالزراعة","الحشرات كمؤشر لصحة البيئة","الحشرات آكلة اللحوم","ناقلات الأمراض"], en:["Harmful agricultural insects","Insects as environmental health indicators","Carnivorous insects","Disease vectors"] },
    correct:1,
  },
  {
    id:13,
    section:{ ku:"بەشی چوارەم: سوود و زیانەکان", ar:"القسم الرابع: الفوائد والأضرار", en:"Section 4: Benefits & Harms" },
    q:{ ku:"پرۆسەی گواستنەوەی هەڵاڵە لە نێوان گوڵەکاندا پێی دەوترێت:", ar:"ما اسم عملية نقل حبوب اللقاح بين الأزهار؟", en:"The process of transferring pollen between flowers is called:" },
    opts:{ ku:["Decomposition","Metamorphosis","Pollination","Respiration"], ar:["التحلل","التحول","التلقيح (Pollination)","التنفس"], en:["Decomposition","Metamorphosis","Pollination","Respiration"] },
    correct:2,
  },
  {
    id:14,
    section:{ ku:"بەشی پێنجەم: مێروولە و کوردستان", ar:"القسم الخامس: النمل وكردستان", en:"Section 5: Ants & Kurdistan" },
    q:{ ku:"کوردستان بە ناوچەیەکی دەوڵەمەند بە زیندەوەران دادەنرێت کە پێی دەوترێت:", ar:"كيف تُوصف كردستان من حيث التنوع البيولوجي؟", en:"Kurdistan is described as a rich biodiversity area called:" },
    opts:{ ku:["Blue Zone","Biodiversity Hotspot","Dead Zone","Desert Zone"], ar:["المنطقة الزرقاء","نقطة التنوع البيولوجي الساخنة","المنطقة الميتة","المنطقة الصحراوية"], en:["Blue Zone","Biodiversity Hotspot","Dead Zone","Desert Zone"] },
    correct:1,
  },
  {
    id:15,
    section:{ ku:"بەشی پێنجەم: مێروولە و کوردستان", ar:"القسم الخامس: النمل وكردستان", en:"Section 5: Ants & Kurdistan" },
    q:{ ku:"مێروولەکان سەر بە کام Order مێرووەکانن؟", ar:"إلى أي رتبة (Order) تنتمي النمل؟", en:"Ants belong to which insect Order?" },
    opts:{ ku:["Coleoptera","Lepidoptera","Hymenoptera","Diptera"], ar:["غمديات الأجنحة","حرشفيات الأجنحة","غشائيات الأجنحة (Hymenoptera)","ثنائيات الأجنحة"], en:["Coleoptera","Lepidoptera","Hymenoptera","Diptera"] },
    correct:2,
  },
  {
    id:16,
    section:{ ku:"بەشی پێنجەم: مێروولە و کوردستان", ar:"القسم الخامس: النمل وكردستان", en:"Section 5: Ants & Kurdistan" },
    q:{ ku:"کام جۆرە مێروولە بە «جوتیار» ناسراون چونکە کارەگەی قارچکیان هەیە؟", ar:"أي نوع من النمل يُعرف بـ«المزارع» لأنه يزرع الفطريات؟", en:"Which ant species is known as the 'farmer' because it cultivates fungi?" },
    opts:{ ku:["مێروولەی ئاگرین","مێروولەی گەڵابڕ (Leafcutter)","مێروولەی دارتاش","مێروولەی سەرباز"], ar:["النمل الناري","النمل القاطع للأوراق (Leafcutter)","النمل النجار","النمل الجندي"], en:["Fire ant","Leafcutter ant","Carpenter ant","Soldier ant"] },
    correct:1,
  },
  {
    id:17,
    section:{ ku:"بەشی شەشەم: پرسیاری گشتی و ورد", ar:"القسم السادس: أسئلة عامة ودقيقة", en:"Section 6: General & Detailed Questions" },
    q:{ ku:"وشەی «Hexapoda» بە واتای چی دێت؟", ar:"ما معنى كلمة «Hexapoda»؟", en:"What does the word 'Hexapoda' mean?" },
    opts:{ ku:["هەشت پێ","بێ پێ","شەش پێ","دە پێ"], ar:["ثماني أرجل","بلا أرجل","ست أرجل","عشر أرجل"], en:["Eight legs","No legs","Six legs","Ten legs"] },
    correct:2,
  },
  {
    id:18,
    section:{ ku:"بەشی شەشەم: پرسیاری گشتی و ورد", ar:"القسم السادس: أسئلة عامة ودقيقة", en:"Section 6: General & Detailed Questions" },
    q:{ ku:"کام لەم مێرووانە بە «گۆڕانی تەواو» (Holometabolous) تێدەپەڕێت؟", ar:"أي من هذه الحشرات تمر بـ«التحول الكامل» (Holometabolous)؟", en:"Which of these insects undergoes complete metamorphosis (Holometabolous)?" },
    opts:{ ku:["کوللە","جڕوشکە","پەپوولە","سیسرکە"], ar:["الصرصار","الجندب","الفراشة","الصراصير"], en:["Cockroach","Grasshopper","Butterfly","Cricket"] },
    correct:2,
  },
  {
    id:19,
    section:{ ku:"بەشی شەشەم: پرسیاری گشتی و ورد", ar:"القسم السادس: أسئلة عامة ودقيقة", en:"Section 6: General & Detailed Questions" },
    q:{ ku:"خوێنی مێرووەکان کە ئۆکسجین ناگوازێتەوە ناوی زانستیی چییە؟", ar:"ما الاسم العلمي لدم الحشرات الذي لا ينقل الأوكسجين؟", en:"What is the scientific name for insect blood that does not transport oxygen?" },
    opts:{ ku:["Hemoglobin","Hemolymph","Plasma","Serum"], ar:["الهيموغلوبين","الهيموليمف (Hemolymph)","البلازما","المصل"], en:["Hemoglobin","Hemolymph","Plasma","Serum"] },
    correct:1,
  },
  {
    id:20,
    section:{ ku:"بەشی شەشەم: پرسیاری گشتی و ورد", ar:"القسم السادس: أسئلة عامة ودقيقة", en:"Section 6: General & Detailed Questions" },
    q:{ ku:"مەبەست لە «Invasive Species» چییە؟", ar:"ما المقصود بـ«Invasive Species»؟", en:"What does 'Invasive Species' mean?" },
    opts:{ ku:["مێرووە سوودبەخشەکان","جۆرە داگیرکەر و نامۆکان کە ژینگە تێکدەدەن","مێرووەکانی کوردستان","مێرووە قەلاچۆبووەکان"], ar:["الحشرات المفيدة","الأنواع الغازية التي تدمر البيئة","حشرات كردستان","الحشرات المنقرضة"], en:["Beneficial insects","Invasive species that disrupt ecosystems","Kurdistan's insects","Extinct insects"] },
    correct:1,
  },
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

const TIMER_SEC = 30;

function QuizSection({ lang }) {
  const isRtl = lang !== "en";
  const [phase, setPhase]       = useState("idle");   // idle | active | result
  const [idx, setIdx]           = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers]   = useState([]);        // array of chosen index | null
  const [timer, setTimer]       = useState(TIMER_SEC);
  const timerRef                = useRef(null);
  const sectionRef              = useRef(null);

  const q = QUIZ[idx];

  const advance = useCallback((chosen) => {
    clearInterval(timerRef.current);
    const next = [...answers, chosen];
    setAnswers(next);
    setSelected(chosen);
    setTimeout(() => {
      if (idx + 1 < QUIZ.length) {
        setIdx(i => i + 1);
        setSelected(null);
        setTimer(TIMER_SEC);
      } else {
        setPhase("result");
      }
    }, 900);
  }, [idx, answers]);

  useEffect(() => {
    if (phase !== "active") return;
    setTimer(TIMER_SEC);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) { advance(null); return TIMER_SEC; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, idx, advance]);

  const start = () => {
    setIdx(0); setSelected(null); setAnswers([]);
    setTimer(TIMER_SEC); setPhase("active");
    setTimeout(() => sectionRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 100);
  };
  const restart = () => { setPhase("idle"); };

  const score = answers.filter((a, i) => a === QUIZ[i].correct).length;
  const pct   = Math.round((score / QUIZ.length) * 100);
  const grade = pct >= 90 ? { ku:"زۆر باش 🏆", ar:"ممتاز 🏆", en:"Excellent 🏆" }
              : pct >= 70 ? { ku:"باش 👏",       ar:"جيد 👏",   en:"Good 👏" }
              : pct >= 50 ? { ku:"مامناوەند 📚", ar:"متوسط 📚", en:"Average 📚" }
              :             { ku:"دووبارە هەوڵ بدە 💪", ar:"حاول مرة أخرى 💪", en:"Try Again 💪" };

  const timerPct = (timer / TIMER_SEC) * 100;
  const timerColor = timer > 15 ? "#22c55e" : timer > 7 ? "#f59e0b" : "#ef4444";

  return (
    <section ref={sectionRef} id="quiz" className="ento-quiz-section" dir={isRtl ? "rtl" : "ltr"}>
      <div className="ento-quiz-header">
        <span className="ento-quiz-icon">🧠</span>
        <div>
          <h2 className="ento-quiz-title">
            {lang === "ku" ? "تاقیکردنەوەی زانیاری" : lang === "ar" ? "اختبر معلوماتك" : "Test Your Knowledge"}
          </h2>
          <p className="ento-quiz-sub">
            {lang === "ku" ? `${QUIZ.length} پرسیار · هەر پرسیارێک ${TIMER_SEC} چرکە`
             : lang === "ar" ? `${QUIZ.length} سؤال · ${TIMER_SEC} ثانية لكل سؤال`
             : `${QUIZ.length} questions · ${TIMER_SEC} seconds per question`}
          </p>
        </div>
      </div>

      {/* ── IDLE ── */}
      {phase === "idle" && (
        <div className="ento-quiz-idle">
          <p className="ento-quiz-idle-desc">
            {lang === "ku"
              ? "تاقیکردنەوەکە ٦ بەش و ٢٠ پرسیاری تێدایە. هەر وەڵامی ڕاست ١ نمرە."
              : lang === "ar"
              ? "يحتوي الاختبار على ٦ أقسام و٢٠ سؤالاً. كل إجابة صحيحة = نقطة واحدة."
              : "The quiz has 6 sections and 20 questions. Each correct answer = 1 point."}
          </p>
          <button className="ento-quiz-start-btn" onClick={start}>
            {lang === "ku" ? "▶ دەستپێکردن" : lang === "ar" ? "▶ ابدأ الاختبار" : "▶ Start Quiz"}
          </button>
        </div>
      )}

      {/* ── ACTIVE ── */}
      {phase === "active" && (
        <div className="ento-quiz-active">
          {/* progress bar */}
          <div className="ento-quiz-progress-row">
            <span className="ento-quiz-prog-label">
              {lang === "ku" ? `پرسیار ${idx + 1} / ${QUIZ.length}` : lang === "ar" ? `السؤال ${idx + 1} / ${QUIZ.length}` : `Question ${idx + 1} / ${QUIZ.length}`}
            </span>
            <span className="ento-quiz-score-live">
              {lang === "ku" ? `نمرە: ${answers.filter((a,i)=>a===QUIZ[i].correct).length}` : lang === "ar" ? `النقاط: ${answers.filter((a,i)=>a===QUIZ[i].correct).length}` : `Score: ${answers.filter((a,i)=>a===QUIZ[i].correct).length}`}
            </span>
          </div>
          <div className="ento-quiz-bar-wrap">
            <div className="ento-quiz-bar-fill" style={{ width:`${((idx)/QUIZ.length)*100}%` }} />
          </div>

          {/* section badge */}
          <div className="ento-quiz-section-badge">{q.section[lang]}</div>

          {/* timer */}
          <div className="ento-quiz-timer-row">
            <div className="ento-quiz-timer-ring">
              <svg viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="4"/>
                <circle cx="22" cy="22" r="18" fill="none" stroke={timerColor} strokeWidth="4"
                  strokeDasharray={`${2*Math.PI*18}`}
                  strokeDashoffset={`${2*Math.PI*18*(1-timerPct/100)}`}
                  strokeLinecap="round"
                  style={{ transition:"stroke-dashoffset 1s linear, stroke .4s" }}
                  transform="rotate(-90 22 22)"
                />
                <text x="22" y="27" textAnchor="middle" fontSize="11" fill={timerColor} fontWeight="700">{timer}</text>
              </svg>
            </div>
            <div className="ento-quiz-q-text">{q.q[lang]}</div>
          </div>

          {/* options */}
          <div className="ento-quiz-opts">
            {q.opts[lang].map((opt, i) => {
              let cls = "ento-quiz-opt";
              if (selected !== null) {
                if (i === q.correct)  cls += " ento-opt-correct";
                else if (i === selected) cls += " ento-opt-wrong";
                else cls += " ento-opt-dim";
              }
              return (
                <button key={i} className={cls}
                  disabled={selected !== null}
                  onClick={() => advance(i)}>
                  <span className="ento-opt-letter">{(lang === "en" ? ["A","B","C","D"] : ["أ","ب","ج","د"])[i]}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {phase === "result" && (
        <div className="ento-quiz-result">
          <div className="ento-quiz-score-circle">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(245,158,11,.15)" strokeWidth="10"/>
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--accent-bright)" strokeWidth="10"
                strokeDasharray={`${2*Math.PI*52}`}
                strokeDashoffset={`${2*Math.PI*52*(1-pct/100)}`}
                strokeLinecap="round" transform="rotate(-90 60 60)"
                style={{ transition:"stroke-dashoffset 1.2s ease" }}
              />
              <text x="60" y="52" textAnchor="middle" fontSize="26" fill="var(--accent-bright)" fontWeight="900">{score}</text>
              <text x="60" y="70" textAnchor="middle" fontSize="13" fill="rgba(255,255,255,.5)">/ {QUIZ.length}</text>
            </svg>
          </div>
          <div className="ento-quiz-grade">{grade[lang]}</div>
          <div className="ento-quiz-pct">{pct}%</div>

          {/* answers review */}
          <div className="ento-quiz-review">
            <h3 className="ento-quiz-review-title">
              {lang === "ku" ? "پشکنینی وەڵامەکان" : lang === "ar" ? "مراجعة الإجابات" : "Answer Review"}
            </h3>
            {QUIZ.map((qq, i) => {
              const isRight = answers[i] === qq.correct;
              return (
                <div key={qq.id} className={`ento-quiz-rev-item ${isRight ? "ento-rev-right" : "ento-rev-wrong"}`}>
                  <div className="ento-rev-top">
                    <span className="ento-rev-num">{qq.id}</span>
                    <span className="ento-rev-icon">{isRight ? "✓" : "✗"}</span>
                    <span className="ento-rev-q">{qq.q[lang]}</span>
                  </div>
                  {!isRight && (
                    <div className="ento-rev-answer">
                      {lang === "ku" ? "وەڵامی ڕاست: " : lang === "ar" ? "الإجابة الصحيحة: " : "Correct answer: "}
                      <strong>{qq.opts[lang][qq.correct]}</strong>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button className="ento-quiz-start-btn" onClick={restart} style={{ marginTop:24 }}>
            {lang === "ku" ? "↺ دووبارە هەوڵدان" : lang === "ar" ? "↺ إعادة الاختبار" : "↺ Retry Quiz"}
          </button>
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════════
   VIDEO SECTION
═══════════════════════════════════════════════ */
function VideoSection({ lang }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <section
      ref={ref}
      id="videos"
      className={`ento-video-section ${visible ? "ento-visible" : ""}`}
      dir={lang === "en" ? "ltr" : "rtl"}
    >
      <div className="ento-video-header">
        <span className="ento-video-icon">🎬</span>
        <div>
          <h2 className="ento-video-title">
            {lang === "ku" ? "ڤیدیۆ" : lang === "ar" ? "فيديو" : "Video"}
          </h2>
          <p className="ento-video-sub">
            {lang === "ku"
              ? "بۆ زانیاری زیاتر ڤیدیۆکانی خوارەوە سەیر بکە"
              : lang === "ar"
              ? "لمزيد من المعلومات شاهد الفيديوهات أدناه"
              : "For more information watch the videos below"}
          </p>
        </div>
      </div>
      <div className="ento-video-grid">
        {VIDEOS.map((v) => (
          <div key={v.id} className="ento-video-card">
            <div className="ento-video-embed-wrap">
              <iframe
                className="ento-video-iframe"
                src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`}
                title={v.title[lang]}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="ento-video-label">{v.title[lang]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AppFooter({ lang }) {
  return (
    <footer className="ento-footer">
        <div className="ento-footer-inner" dir={lang === "en" ? "ltr" : "rtl"}>

          {/* Col 1 — Project */}
          <div className="ento-footer-col">
            <div className="ento-footer-col-title">
              {lang === "ku" ? "پرۆژە" : lang === "ar" ? "المشروع" : "Project"}
            </div>
            <div className="ento-footer-project">Atlas of <span>Entomology</span></div>
            <div className="ento-footer-tagline">
              {lang === "ku"
                ? "سەرچاوەی زانستی و ئەکادیمی بۆ خوێندنی مێرووناسی"
                : lang === "ar"
                ? "مرجع علمي وأكاديمي لدراسة علم الحشرات"
                : "A scientific & academic reference for Entomology"}
            </div>
          </div>

          {/* Col 2 — Academic Info */}
          <div className="ento-footer-col" dir={lang === "en" ? "ltr" : "rtl"} style={{ textAlign: lang === "en" ? "left" : "right" }}>
            <div className="ento-footer-col-title">
              {lang === "ku" ? "زانیاری ئەکادیمی" : lang === "ar" ? "المعلومات الأكاديمية" : "Academic Info"}
            </div>
            <div className="ento-footer-info-row">
              {[
                {
                  labelKu: "بەش", labelAr: "القسم", labelEn: "Department",
                  value: lang === "ku" ? "بایۆلۆجی" : lang === "ar" ? "علوم بايولوجي" : "Biology",
                },
                {
                  labelKu: "زانکۆ", labelAr: "الجامعة", labelEn: "University",
                  value: lang === "ku" ? "زانکۆی ڕاپەڕین" : lang === "ar" ? "جامعة رابرين" : "Raparin University",
                },
                {
                  labelKu: "بابەت", labelAr: "المادة", labelEn: "Course",
                  value: lang === "ku" ? "ئێنتۆمۆلۆجی" : lang === "ar" ? "علم الحشرات" : "Entomology",
                },
                {
                  labelKu: "ساڵ", labelAr: "السنة", labelEn: "Year",
                  value: "2025 – 2026",
                },
                {
                  labelKu: "زمان", labelAr: "اللغة", labelEn: "Language",
                  value: "کوردی · عربی · English",
                },
              ].map(item => (
                <div key={item.labelEn} className="ento-footer-info-item" dir={lang === "en" ? "ltr" : "rtl"} style={{ justifyContent: "space-between", width: "100%" }}>
                  {lang === "en" ? (
                    <>
                      <span className="ento-footer-info-label">{item.labelEn}</span>
                      <span className="ento-footer-info-sep">:</span>
                      <span className="ento-footer-info-value">{item.value}</span>
                    </>
                  ) : (
                    <>
                      <span className="ento-footer-info-value">{item.value}</span>
                      <span style={{ display: "flex", gap: "4px" }}>
                        <span className="ento-footer-info-sep">:</span>
                        <span className="ento-footer-info-label">{lang === "ku" ? item.labelKu : item.labelAr}</span>
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Col 3 — Quick Links */}
          <div className="ento-footer-col">
            <div className="ento-footer-col-title">
              {lang === "ku" ? "لینکە خێراکان" : lang === "ar" ? "روابط سريعة" : "Quick Links"}
            </div>
            <div className="ento-footer-links">
              {[
                { href: "https://gov.krd/mohe/",                             ku: "وەزارەتی خوێندنی باڵا و توێژینەوەی زانستی",    ar: "وزارة التعليم العالي والبحث العلمي",        en: "Ministry of Higher Ed. & Scientific Research" },
                { href: "https://uor.edu.krd/en/",                           ku: "زانکۆی ڕاپەڕین",           ar: "جامعة رابرين",                en: "University of Raparin" },
                { href: "https://sci.uor.edu.krd/en/",                       ku: "کۆلێژی زانست",             ar: "كلية العلوم",                 en: "College of Science" },
                { href: "https://sci.uor.edu.krd/en/departments/biology/",   ku: "بەشی بایۆلۆجی",            ar: "قسم علوم بايولوجي",              en: "Biology Department" },
                { href: "https://scence-bio.github.io/Biology/",             ku: "BioGuide",         ar: "BioGuide",             en: "BioGuide" },
              ].map(link => (
                <a key={link.href} className="ento-footer-link" href={link.href} target="_blank" rel="noopener noreferrer">
                  <span className="ento-footer-link-arrow">{lang === "en" ? "→" : "←"}</span>
                  <span>{lang === "ku" ? link.ku : lang === "ar" ? link.ar : link.en}</span>
                </a>
              ))}
              {/* BioGuide — two-line entry */}
              <a className="ento-footer-link ento-footer-link-bioguide" href="https://scence-bio.github.io/library/" target="_blank" rel="noopener noreferrer">
                <span className="ento-footer-link-arrow">{lang === "en" ? "→" : "←"}</span>
                <span className="ento-footer-link-bioguide-inner">
                  <span className="ento-footer-link-bioguide-name">
                    {lang === "ku" ? "کتێبخانەی ئەلیکترۆنی کۆلێژی زانست"
                     : lang === "ar" ? "المكتبة الإلكترونية لكلية العلوم"
                     : "e-Library of College of Science"}
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* Col 4 — Sections */}
          <div className="ento-footer-col">
            <div className="ento-footer-col-title">
              {lang === "ku" ? "بەشەکان" : lang === "ar" ? "الأقسام" : "Sections"}
            </div>
            <div className="ento-footer-links">
              {SECTIONS.map(s => (
                <a key={s.id} className="ento-footer-link" href={`#${s.id}`}>
                  <span className="ento-footer-link-arrow">{lang === "en" ? "→" : "←"}</span>
                  <span>{s.titles[lang]} {s.icon}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

        <hr className="ento-footer-divider" />

        <div className="ento-footer-bottom" style={{ direction: "ltr" }}>
          <span className="ento-footer-copy">© 2025 Atlas of Entomology · Academic Reference · All rights reserved</span>
        </div>
      </footer>
  );
}


const SECTIONS = [
  {
    id: "quiz",
    icon: "🧠",
    titles: { ku: "کویز", ar: "الاختبار", en: "Quiz" }
  },
  {
    id: "videos",
    icon: "🎥",
    titles: { ku: "ڤیدیۆ", ar: "الفيديوهات", en: "Videos" }
  }
];

export default function Chapter4({ lang }) {
  return (
    <div className="ento-chapter-page">
      <div className="ento-chapter-hero">
        <div className="ento-chapter-hero-num">{lang === "ku" ? "چاپتەری چوارەم" : lang === "ar" ? "الفصل الرابع" : "Chapter 4"}</div>
        <span className="ento-chapter-hero-icon"><Mark name="card" /></span>
        <div className="ento-chapter-hero-title">
          {lang === "ku" ? "کویز" : lang === "ar" ? "اختبار" : "Quiz"}
        </div>
        <div className="ento-chapter-hero-en">Quiz · کویز · اختبار</div>
      </div>
      <QuizSection lang={lang} />
      <VideoSection lang={lang} />
      <AppFooter lang={lang} />
    </div>
  );
}

