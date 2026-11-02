import { useMemo, useState } from "react";
import { KEY_NODES, ORDERS, TRAITS, scoreOrders } from "./data";

function t(lang, pack) {
  if (!pack) return "";
  if (typeof pack === "string") return pack;
  return pack[lang] || pack.en || pack.ku || "";
}

function Progress({ trail, lang }) {
  const steps = trail
    .map((id) => KEY_NODES[id])
    .filter((n) => n && n.q);
  if (steps.length === 0) return null;
  return (
    <ol className="ento-idkey-progress" aria-label={lang === "ku" ? "هەنگاوەکان" : lang === "ar" ? "الخطوات" : "Steps"}>
      {steps.map((node, i) => (
        <li key={`${trail[i]}-${i}`}>
          <span className="ento-idkey-step-n">{String(i + 1).padStart(2, "0")}</span>
          <span className="ento-idkey-step-q">{t(lang, node.q)}</span>
        </li>
      ))}
    </ol>
  );
}

function ResultCard({ order, lang, onRestart, trailLabels }) {
  return (
    <div className="ento-idkey-result">
      <div className="ento-idkey-result-media">
        <img src={order.image} alt={t(lang, order.name)} loading="lazy" />
      </div>
      <div className="ento-idkey-result-body">
        <p className="ento-binomial ento-idkey-latin">{order.latin}</p>
        <h3 className="ento-idkey-result-title">{t(lang, order.name)}</h3>
        <p className="ento-idkey-result-tip">{t(lang, order.tip)}</p>
        {trailLabels?.length > 0 && (
          <ul className="ento-idkey-trail">
            {trailLabels.map((label, i) => (
              <li key={i}>{label}</li>
            ))}
          </ul>
        )}
        <div className="ento-idkey-actions">
          <a className="ento-hero-cta ento-idkey-cta" href={order.href}>
            {lang === "ku" ? "بەشی ئۆردەرەکە" : lang === "ar" ? "فصل الرتبة" : "Open the order chapter"}
          </a>
          <button type="button" className="ento-pick" onClick={onRestart}>
            <span>{lang === "ku" ? "ناسینەوەیەکی تر" : lang === "ar" ? "تعريف آخر" : "Identify another"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function GuidedKey({ lang }) {
  const [nodeId, setNodeId] = useState("start");
  const [trail, setTrail] = useState(["start"]);
  const [choiceLabels, setChoiceLabels] = useState([]);
  const node = KEY_NODES[nodeId];
  const done = Boolean(node?.result);

  function choose(choice) {
    setChoiceLabels((prev) => [...prev, t(lang, choice.label)]);
    setNodeId(choice.next);
    setTrail((prev) => [...prev, choice.next]);
  }

  function restart() {
    setNodeId("start");
    setTrail(["start"]);
    setChoiceLabels([]);
  }

  function back() {
    if (trail.length < 2) return;
    const nextTrail = trail.slice(0, -1);
    setTrail(nextTrail);
    setNodeId(nextTrail[nextTrail.length - 1]);
    setChoiceLabels((prev) => prev.slice(0, -1));
  }

  if (done) {
    const order = ORDERS[node.orderId] || node;
    return <ResultCard order={order} lang={lang} onRestart={restart} trailLabels={choiceLabels} />;
  }

  return (
    <div className="ento-idkey-guided">
      <Progress trail={trail} lang={lang} />
      <p className="ento-idkey-q">{t(lang, node.q)}</p>
      {node.hint && <p className="ento-idkey-hint">{t(lang, node.hint)}</p>}
      <div className="ento-idkey-choices">
        {node.choices.map((choice) => (
          <button
            key={choice.next + t(lang, choice.label)}
            type="button"
            className="ento-idkey-choice"
            onClick={() => choose(choice)}
          >
            <span className="ento-idkey-choice-label">{t(lang, choice.label)}</span>
          </button>
        ))}
      </div>
      <div className="ento-idkey-actions">
        {trail.length > 1 && (
          <button type="button" className="ento-pick" onClick={back}>
            <span>{lang === "ku" ? "گەڕانەوە" : lang === "ar" ? "رجوع" : "Back"}</span>
          </button>
        )}
        <button type="button" className="ento-pick" onClick={restart}>
          <span>{lang === "ku" ? "لە سەرەتاوە" : lang === "ar" ? "من البداية" : "Start over"}</span>
        </button>
      </div>
    </div>
  );
}

function TraitKey({ lang }) {
  const [selected, setSelected] = useState([]);
  const ranked = useMemo(() => scoreOrders(selected), [selected]);

  function toggle(id) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div className="ento-idkey-traits">
      <p className="ento-idkey-hint">
        {lang === "ku"
          ? "هەموو ئەو نیشانانە هەڵبژێرە کە لەسەر مێرووەکە دەیانبینیت. کلیلەکە ئۆردەرە گونجاوەکان ڕیز دەکات."
          : lang === "ar"
          ? "اختر كل العلامات التي تراها على الحشرة. يرتّب المفتاح الرتب المناسبة."
          : "Select every mark you can see on the insect. The key ranks matching orders."}
      </p>
      <div className="ento-idkey-trait-grid">
        {TRAITS.map((trait) => {
          const on = selected.includes(trait.id);
          return (
            <button
              key={trait.id}
              type="button"
              className={`ento-idkey-trait${on ? " is-on" : ""}`}
              aria-pressed={on}
              onClick={() => toggle(trait.id)}
            >
              {t(lang, trait)}
            </button>
          );
        })}
      </div>
      {selected.length === 0 ? (
        <p className="ento-idkey-empty">
          {lang === "ku" ? "هیچ نیشانەیەک هەڵنەبژێردراوە." : lang === "ar" ? "لم تُختر أي علامة." : "No traits selected yet."}
        </p>
      ) : (
        <ul className="ento-idkey-rank">
          {ranked.map(({ order, hit, total, score }) => (
            <li key={order.id} className="ento-idkey-rank-item">
              <div className="ento-idkey-rank-top">
                <span className="ento-binomial">{order.latin}</span>
                <span className="ento-idkey-score">{Math.round(score * 100)}% · {hit}/{total}</span>
              </div>
              <div className="ento-idkey-rank-name">{t(lang, order.name)}</div>
              <p className="ento-idkey-rank-tip">{t(lang, order.tip)}</p>
              <a className="ento-idkey-chapter-link" href={order.href}>
                {lang === "ku" ? "بەشەکە" : lang === "ar" ? "الفصل" : "Chapter"}
              </a>
            </li>
          ))}
        </ul>
      )}
      {selected.length > 0 && (
        <div className="ento-idkey-actions">
          <button type="button" className="ento-pick" onClick={() => setSelected([])}>
            <span>{lang === "ku" ? "پاککردنەوە" : lang === "ar" ? "مسح" : "Clear"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export function IdKey({ lang, compact = false }) {
  const [mode, setMode] = useState("guided");
  const dir = lang === "en" ? "ltr" : "rtl";

  return (
    <section className={`ento-idkey${compact ? " is-compact" : ""}`} id="id-key" dir={dir}>
      {!compact && (
        <>
          <h2 className="ento-home-label">
            {lang === "ku" ? "کلیلی ناسینەوە" : lang === "ar" ? "مفتاح التعريف" : "Identification key"}
          </h2>
          <hr className="ento-home-rule" />
          <p className="ento-path-lead">
            {lang === "ku"
              ? "مێرووەکە ببینە، پرسیارەکان وەڵام بدەرەوە یان نیشانەکان هەڵبژێرە — ئۆردەرەکەی ئەتڵەسەکە دەدۆزرێتەوە."
              : lang === "ar"
              ? "انظر إلى الحشرة، أجب عن الأسئلة أو اختر العلامات — ستصل إلى رتبة الأطلس."
              : "Look at the insect, answer the questions or pick traits — find the atlas order."}
          </p>
        </>
      )}

      <div className="ento-idkey-panel">
        <div className="ento-idkey-modes" role="tablist" aria-label={lang === "ku" ? "شێوازی کلیل" : "Key mode"}>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "guided"}
            className={`ento-idkey-mode${mode === "guided" ? " is-active" : ""}`}
            onClick={() => setMode("guided")}
          >
            {lang === "ku" ? "پرسیار بە پرسیار" : lang === "ar" ? "سؤالاً بسؤال" : "Step by step"}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "traits"}
            className={`ento-idkey-mode${mode === "traits" ? " is-active" : ""}`}
            onClick={() => setMode("traits")}
          >
            {lang === "ku" ? "نیشانەکان" : lang === "ar" ? "العلامات" : "By traits"}
          </button>
        </div>

        <p className="ento-idkey-scope">
          {lang === "ku"
            ? "ئەم کلیلە ئۆردەرەکانی ئەم ئەتڵەسە دەگرێتەوە (پەپوولە، هەنگ، قوڕقوڕە، مێش، شەتەک، جڕوشک، مێرووی ئاو، تۆڕباڵ)."
            : lang === "ar"
            ? "يغطي هذا المفتاح رتب هذا الأطلس (فراشات، نحل، خنافس، ذباب، من، جنادب، رعاشات، أسد المن)."
            : "This key covers the orders taught in this atlas (butterflies, bees, beetles, flies, bugs, grasshoppers, dragonflies, lacewings)."}
        </p>

        {mode === "guided" ? <GuidedKey lang={lang} /> : <TraitKey lang={lang} />}
      </div>
    </section>
  );
}

export default IdKey;
