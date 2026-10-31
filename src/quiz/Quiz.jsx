import { useState, useRef, useEffect, useCallback } from "react";
import { QUIZ } from "./questions";
import { cachedSheetQuestions, loadSheetQuestions } from "./sheet";
import { buildRound } from "./rounds";
import { leaderboardEnabled, fetchTop, submitScore } from "./leaderboard";

const TIMER_SEC = 30;
const SITE = "https://www.entomo.online/";

const t = (lang, ku, ar, en) => (lang === "ku" ? ku : lang === "ar" ? ar : en);

// Kurdish and Arabic text uses Eastern Arabic digits.
function digits(lang, value) {
  const s = String(value);
  return lang === "en" ? s : s.replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
}

function useQuestionPool() {
  const [pool, setPool] = useState(() => cachedSheetQuestions() || QUIZ);
  useEffect(() => {
    let live = true;
    loadSheetQuestions().then((questions) => {
      if (live && questions) setPool(questions);
    });
    return () => { live = false; };
  }, []);
  return pool;
}

function readBest(scope) {
  try {
    const value = JSON.parse(localStorage.getItem(`quizBest:${scope}`) || "null");
    return value && typeof value.score === "number" ? value : null;
  } catch {
    return null;
  }
}

function saveBest(scope, score, total) {
  const best = readBest(scope);
  if (best && best.score / best.total >= score / total) return best;
  const next = { score, total };
  try { localStorage.setItem(`quizBest:${scope}`, JSON.stringify(next)); } catch {}
  return next;
}

function Leaderboard({ lang, scope, score, total }) {
  const [rows, setRows] = useState(null);
  const [failed, setFailed] = useState(false);
  const [name, setName] = useState(() => {
    try { return localStorage.getItem("quizName") || ""; } catch { return ""; }
  });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    fetchTop(scope).then(setRows).catch(() => setFailed(true));
  }, [scope]);

  useEffect(() => { load(); }, [load]);

  const send = async (e) => {
    e.preventDefault();
    const clean = name.trim().replace(/\s+/g, " ");
    if (clean.length < 2 || busy) return;
    setBusy(true);
    try {
      await submitScore({ name: clean.slice(0, 30), scope, score, total });
      try { localStorage.setItem("quizName", clean); } catch {}
      setSent(true);
      load();
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="ento-quiz-board">
      <h3 className="ento-quiz-review-title">{t(lang, "باشترینەکان", "لوحة الصدارة", "Leaderboard")}</h3>
      {!sent && (
        <form className="ento-quiz-board-form" onSubmit={send}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            placeholder={t(lang, "ناوت بنووسە", "اكتب اسمك", "Your name")}
            aria-label={t(lang, "ناوت بنووسە", "اكتب اسمك", "Your name")}
          />
          <button type="submit" disabled={busy || name.trim().length < 2}>
            {t(lang, "ناردنی نمرە", "إرسال النتيجة", "Submit score")}
          </button>
        </form>
      )}
      {failed && <p className="ento-quiz-board-note">{t(lang, "ڕیزبەندی ئێستا بەردەست نییە.", "لوحة الصدارة غير متاحة الآن.", "The leaderboard is not available right now.")}</p>}
      {rows && rows.length === 0 && <p className="ento-quiz-board-note">{t(lang, "هێشتا کەس نمرەی نەناردووە.", "لم يرسل أحد نتيجة بعد.", "No scores yet.")}</p>}
      {rows && rows.length > 0 && (
        <ol className="ento-quiz-board-list">
          {rows.map((row, i) => (
            <li key={i}>
              <span>{digits(lang, i + 1)}. {row.name}</span>
              <strong>{digits(lang, `${row.score} / ${row.total}`)}</strong>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export function QuizSection({ lang, chapter, id = "quiz" }) {
  const isRtl = lang !== "en";
  const scope = chapter || "all";
  const pool = useQuestionPool();
  const [round, setRound]       = useState([]);
  const [phase, setPhase]       = useState("idle");   // idle | active | result
  const [idx, setIdx]           = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers]   = useState([]);        // chosen index, or null on timeout
  const [timer, setTimer]       = useState(TIMER_SEC);
  const [best, setBest]         = useState(() => readBest(scope));
  const [shared, setShared]     = useState(false);
  const timerRef                = useRef(null);
  const nextRef                 = useRef(null);
  const sectionRef              = useRef(null);

  const available = chapter ? pool.filter((q) => q.chapter === chapter).length : pool.length;

  useEffect(() => () => clearTimeout(nextRef.current), []);

  // chosen is null when the timer runs out; selected then becomes -1 so the
  // options lock and the answer shows, exactly as after a click.
  const advance = useCallback((chosen) => {
    if (selected !== null) return;
    clearInterval(timerRef.current);
    const next = [...answers, chosen];
    setAnswers(next);
    setSelected(chosen === null ? -1 : chosen);
    nextRef.current = setTimeout(() => {
      if (idx + 1 < round.length) {
        setIdx((i) => i + 1);
        setSelected(null);
        setTimer(TIMER_SEC);
      } else {
        const score = next.filter((a, i) => a === round[i].correct).length;
        setBest(saveBest(scope, score, round.length));
        setPhase("result");
      }
    }, 2400);
  }, [idx, answers, selected, round, scope]);

  useEffect(() => {
    if (phase !== "active") return;
    setTimer(TIMER_SEC);
    timerRef.current = setInterval(() => {
      setTimer((s) => Math.max(s - 1, 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, idx]);

  useEffect(() => {
    if (phase === "active" && timer === 0 && selected === null) advance(null);
  }, [phase, timer, selected, advance]);

  const start = () => {
    clearTimeout(nextRef.current);
    setRound(buildRound(pool, chapter));
    setIdx(0); setSelected(null); setAnswers([]); setShared(false);
    setTimer(TIMER_SEC); setPhase("active");
    setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const score = answers.filter((a, i) => round[i] && a === round[i].correct).length;
  const pct   = round.length ? Math.round((score / round.length) * 100) : 0;
  const grade = pct >= 90 ? t(lang, "زۆر باش 🏆", "ممتاز 🏆", "Excellent 🏆")
              : pct >= 70 ? t(lang, "باش 👏", "جيد 👏", "Good 👏")
              : pct >= 50 ? t(lang, "مامناوەند 📚", "متوسط 📚", "Average 📚")
              :             t(lang, "دووبارە هەوڵ بدە 💪", "حاول مرة أخرى 💪", "Try Again 💪");

  const share = async () => {
    const link = `${SITE}#/${chapter || "ch4"}`;
    const text = t(lang,
      `لە کویزی ئەتڵەسی مێرووناسیدا ${digits(lang, score)} لە ${digits(lang, round.length)}م هێنا. تۆش تاقی بکەرەوە:`,
      `حصلت على ${digits(lang, score)} من ${digits(lang, round.length)} في اختبار أطلس علم الحشرات. جرّب أنت أيضاً:`,
      `I scored ${score} / ${round.length} on the Atlas of Entomology quiz. Try it:`);
    try {
      if (navigator.share) {
        await navigator.share({ title: "Atlas of Entomology", text, url: link });
        return;
      }
    } catch (err) {
      if (err && err.name === "AbortError") return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${link}`)}`, "_blank", "noopener");
    setShared(true);
  };

  const q = round[idx];
  const timerPct = (timer / TIMER_SEC) * 100;
  const timerColor = timer > 15 ? "#22c55e" : timer > 7 ? "#f59e0b" : "#ef4444";
  const letters = lang === "en" ? ["A", "B", "C", "D"] : ["أ", "ب", "ج", "د"];
  const count = buildCount(chapter, available);

  if (chapter && available === 0) return null;

  return (
    <section ref={sectionRef} id={id} className="ento-quiz-section" dir={isRtl ? "rtl" : "ltr"}>
      <div className="ento-quiz-header">
        <div>
          <h2 className="ento-quiz-title">
            {chapter
              ? t(lang, "خۆت تاقی بکەرەوە", "اختبر نفسك", "Test yourself")
              : t(lang, "تاقیکردنەوەی زانیاری", "اختبر معلوماتك", "Test Your Knowledge")}
          </h2>
          <p className="ento-quiz-sub">
            {t(lang,
              `${digits(lang, count)} پرسیار · هەر پرسیارێک ${digits(lang, TIMER_SEC)} چرکە`,
              `${digits(lang, count)} أسئلة · ${digits(lang, TIMER_SEC)} ثانية لكل سؤال`,
              `${count} questions · ${TIMER_SEC} seconds each`)}
          </p>
        </div>
      </div>

      {phase === "idle" && (
        <div className="ento-quiz-idle">
          <p className="ento-quiz-idle-desc">
            {t(lang,
              `هەر جارێک ${digits(lang, count)} پرسیار بە هەڕەمەکی هەڵدەبژێردرێن و ڕیزبەندیی وەڵامەکانیش دەگۆڕێت. هەر وەڵامێکی ڕاست ١ نمرەیە.`,
              `في كل مرة تُختار ${digits(lang, count)} أسئلة عشوائياً ويتغير ترتيب الإجابات. كل إجابة صحيحة = نقطة واحدة.`,
              `Each time, ${count} questions are picked at random and the answers are shuffled. Each correct answer = 1 point.`)}
          </p>
          {best && (
            <p className="ento-quiz-best">
              {t(lang, "باشترین نمرەت: ", "أفضل نتيجة لك: ", "Your best: ")}
              <strong>{digits(lang, `${best.score} / ${best.total}`)}</strong>
            </p>
          )}
          <button className="ento-quiz-start-btn" onClick={start}>
            {t(lang, "▶ دەستپێکردن", "▶ ابدأ الاختبار", "▶ Start Quiz")}
          </button>
        </div>
      )}

      {phase === "active" && q && (
        <div className="ento-quiz-active">
          <div className="ento-quiz-progress-row">
            <span className="ento-quiz-prog-label">
              {t(lang,
                `پرسیار ${digits(lang, idx + 1)} / ${digits(lang, round.length)}`,
                `السؤال ${digits(lang, idx + 1)} / ${digits(lang, round.length)}`,
                `Question ${idx + 1} / ${round.length}`)}
            </span>
            <span className="ento-quiz-score-live">
              {t(lang, "نمرە: ", "النقاط: ", "Score: ")}{digits(lang, score)}
            </span>
          </div>
          <div className="ento-quiz-bar-wrap">
            <div className="ento-quiz-bar-fill" style={{ width: `${(idx / round.length) * 100}%` }} />
          </div>

          {(!chapter || q.image) && <div className="ento-quiz-section-badge">{q.section[lang]}</div>}

          {q.image && (
            <div className="ento-quiz-img">
              <img src={q.image} alt="" />
            </div>
          )}

          <div className="ento-quiz-timer-row">
            <div className="ento-quiz-timer-ring" role="timer" aria-label={t(lang, `${digits(lang, timer)} چرکە ماوە`, `${digits(lang, timer)} ثانية متبقية`, `${timer} seconds left`)}>
              <svg viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" fill="none" stroke="var(--accent-dim)" strokeWidth="4" />
                <circle cx="22" cy="22" r="18" fill="none" stroke={timerColor} strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 18}`}
                  strokeDashoffset={`${2 * Math.PI * 18 * (1 - timerPct / 100)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s linear, stroke .4s" }}
                  transform="rotate(-90 22 22)"
                />
                <text x="22" y="27" textAnchor="middle" fontSize="11" fill={timerColor} fontWeight="700">{digits(lang, timer)}</text>
              </svg>
            </div>
            <div className="ento-quiz-q-text">{q.q[lang]}</div>
          </div>

          <div className="ento-quiz-opts">
            {q.opts[lang].map((opt, i) => {
              let cls = "ento-quiz-opt";
              if (selected !== null) {
                if (i === q.correct) cls += " ento-opt-correct";
                else if (i === selected) cls += " ento-opt-wrong";
                else cls += " ento-opt-dim";
              }
              return (
                <button key={i} type="button" className={cls} disabled={selected !== null} onClick={() => advance(i)}>
                  <span className="ento-opt-letter">{letters[i]}</span>
                  <span className={q.latinOptions ? "ento-binomial" : undefined}>{opt}</span>
                </button>
              );
            })}
          </div>
          {selected === -1 && (
            <p className="ento-quiz-why">{t(lang, "کات تەواو بوو. ", "انتهى الوقت. ", "Time is up. ")}{q.why[lang]}</p>
          )}
          {selected !== null && selected !== -1 && <p className="ento-quiz-why">{q.why[lang]}</p>}
        </div>
      )}

      {phase === "result" && (
        <div className="ento-quiz-result">
          <div className="ento-quiz-score-circle">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(245,158,11,.15)" strokeWidth="10" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--accent-bright)" strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - pct / 100)}`}
                strokeLinecap="round" transform="rotate(-90 60 60)"
                style={{ transition: "stroke-dashoffset 1.2s ease" }}
              />
              <text x="60" y="52" textAnchor="middle" fontSize="26" fill="var(--accent-bright)" fontWeight="900">{digits(lang, score)}</text>
              <text x="60" y="70" textAnchor="middle" fontSize="13" fill="var(--text-muted)">/ {digits(lang, round.length)}</text>
            </svg>
          </div>
          <div className="ento-quiz-grade">{grade}</div>
          <div className="ento-quiz-pct">{digits(lang, pct)}%</div>
          {best && (
            <p className="ento-quiz-best">
              {t(lang, "باشترین نمرەت: ", "أفضل نتيجة لك: ", "Your best: ")}
              <strong>{digits(lang, `${best.score} / ${best.total}`)}</strong>
            </p>
          )}

          <div className="ento-quiz-actions">
            <button type="button" className="ento-quiz-start-btn" onClick={start}>
              {t(lang, "↺ دووبارە هەوڵدان", "↺ إعادة الاختبار", "↺ Retry Quiz")}
            </button>
            <button type="button" className="ento-quiz-share-btn" onClick={share}>
              {t(lang, "هاوبەشکردنی ئەنجام", "مشاركة النتيجة", "Share result")}
            </button>
          </div>
          {shared && <p className="ento-quiz-board-note">{t(lang, "واتسئاپ کرایەوە.", "تم فتح واتساب.", "WhatsApp opened.")}</p>}

          {leaderboardEnabled && <Leaderboard lang={lang} scope={scope} score={score} total={round.length} />}

          <div className="ento-quiz-review">
            <h3 className="ento-quiz-review-title">
              {t(lang, "پشکنینی وەڵامەکان", "مراجعة الإجابات", "Answer Review")}
            </h3>
            {round.map((qq, i) => {
              const isRight = answers[i] === qq.correct;
              return (
                <div key={qq.id} className={`ento-quiz-rev-item ${isRight ? "ento-rev-right" : "ento-rev-wrong"}`}>
                  <div className="ento-rev-top">
                    <span className="ento-rev-num">{digits(lang, i + 1)}</span>
                    <span className="ento-rev-icon">{isRight ? "✓" : "✗"}</span>
                    <span className="ento-rev-q">{qq.q[lang]}</span>
                  </div>
                  {qq.image && <img className="ento-rev-img" src={qq.image} alt="" loading="lazy" />}
                  {!isRight && (
                    <div className="ento-rev-answer">
                      {t(lang, "وەڵامی ڕاست: ", "الإجابة الصحيحة: ", "Correct answer: ")}
                      <strong className={qq.latinOptions ? "ento-binomial" : undefined}>{qq.opts[lang][qq.correct]}</strong>
                    </div>
                  )}
                  <div className="ento-rev-answer">{qq.why[lang]}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

function buildCount(chapter, available) {
  if (!chapter) return Math.min(8, available) + 2;
  return Math.min(5, available) + (chapter === "ch5" ? 2 : 0);
}
