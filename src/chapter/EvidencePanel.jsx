import {
  DATABASES,
  GLOBAL,
  GBIF_IRAQ,
  REGIONAL_LITERATURE,
  SPECIES,
  gbifSpeciesUrl,
  gbifIraqOrderUrl,
} from "../data/trustedSources";

function t(lang, pack) {
  if (!pack) return "";
  if (typeof pack === "string") return pack;
  return pack[lang] || pack.en || pack.ku || "";
}

function digits(lang, n) {
  if (n == null || Number.isNaN(n)) return "—";
  const s = Number(n).toLocaleString("en-US");
  if (lang === "en") return s;
  return s.replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
}

/** Compact GBIF Iraq order strip for taxon chapters. */
export function GbifOrderStrip({ lang, order }) {
  const row = GBIF_IRAQ.orders[order];
  if (!row) return null;
  return (
    <aside className="ento-evidence-strip" dir={lang === "en" ? "ltr" : "rtl"}>
      <p className="ento-evidence-kicker" dir="ltr">GBIF · Iraq · {order}</p>
      <dl className="ento-evidence-metrics">
        <div>
          <dt>{t(lang, { ku: "ڕوودان", ar: "سجلات", en: "Occurrences" })}</dt>
          <dd dir="ltr">{digits(lang, row.occurrences)}</dd>
        </div>
        <div>
          <dt>{t(lang, { ku: "جۆر (speciesKey)", ar: "أنواع (speciesKey)", en: "Species keys" })}</dt>
          <dd dir="ltr">{digits(lang, row.distinctSpeciesKeys)}</dd>
        </div>
        <div>
          <dt>{t(lang, { ku: "taxonKey", ar: "taxonKey", en: "taxonKey" })}</dt>
          <dd dir="ltr">{row.taxonKey}</dd>
        </div>
      </dl>
      <p className="ento-evidence-note">{t(lang, GBIF_IRAQ.caveat)}</p>
      <p className="ento-evidence-meta" dir="ltr">
        Snapshot {GBIF_IRAQ.retrieved} ·{" "}
        <a href={gbifIraqOrderUrl(row.taxonKey)} target="_blank" rel="noopener noreferrer">
          Open in GBIF
        </a>
      </p>
    </aside>
  );
}

/** Species evidence line under a binomial. */
export function SpeciesEvidence({ lang, name }) {
  const rec = SPECIES[name];
  if (!rec) return null;
  return (
    <div className="ento-species-evidence" dir={lang === "en" ? "ltr" : "rtl"}>
      <p className="ento-binomial" dir="ltr">
        {name} <span className="ento-authorship">{rec.authorship}</span>
      </p>
      <ul className="ento-evidence-bullets">
        <li dir="ltr">
          GBIF {rec.gbifKey}
          {" · "}
          <a href={gbifSpeciesUrl(rec.gbifKey)} target="_blank" rel="noopener noreferrer">
            species page
          </a>
          {rec.iqOccurrences != null ? ` · Iraq occurrences: ${digits("en", rec.iqOccurrences)}` : null}
        </li>
        {rec.family ? (
          <li dir="ltr">
            {rec.order} · {rec.family}
          </li>
        ) : null}
        {rec.note ? <li>{t(lang, rec.note)}</li> : null}
        {rec.literature
          ? rec.literature.map((line) => (
              <li key={line} dir="ltr">
                {line}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

/** Full evidence block for Chapter 2 (databases + global + Iraq). */
export default function EvidencePanel({ lang }) {
  const dir = lang === "en" ? "ltr" : "rtl";
  const g = GLOBAL.stork2018;
  const iq = GBIF_IRAQ.insecta;

  return (
    <section className="ento-evidence-panel" dir={dir} id="evidence">
      <header className="ento-ch1-head">
        <h2 className="ento-ch1-title">
          {t(lang, {
            ku: "داتابەس و بەڵگەی جیهانی",
            ar: "قواعد البيانات والأدلة العالمية",
            en: "Global databases and evidence",
          })}
        </h2>
        <p className="ento-ch1-lead">
          {t(lang, {
            ku: "ژمارە و ناوی زانستی لەم ئەتڵەسەدا لە داتابەسە باوەڕپێکراوەکان وەردەگیرێن؛ خوێندکار دەبێت بتوانێت خۆی سەیریان بکاتەوە.",
            ar: "تُستمد الأرقام والأسماء العلمية هنا من قواعد موثوقة؛ وينبغي أن يتمكن الطالب من التحقق بنفسه.",
            en: "Figures and binomials here are anchored in trusted repositories; learners should be able to verify them independently.",
          })}
        </p>
      </header>

      <div className="ento-evidence-grid">
        <article className="ento-evidence-card">
          <h3>{t(lang, { ku: "خەمڵاندنی جیهانی", ar: "التقدير العالمي", en: "Global estimate" })}</h3>
          <dl className="ento-evidence-metrics">
            <div>
              <dt>{t(lang, { ku: "مێرووی خەمڵێنراو", ar: "حشرات مقدّرة", en: "Insects estimated" })}</dt>
              <dd dir="ltr">~{digits(lang, g.insectsEstimated)}</dd>
            </div>
            <div>
              <dt>{t(lang, { ku: "وەسفکراو (نزیکەیی)", ar: "موصوفة (تقريباً)", en: "Described (approx.)" })}</dt>
              <dd dir="ltr">~{digits(lang, g.insectsDescribedApprox)}</dd>
            </div>
            <div>
              <dt>{t(lang, { ku: "هێشتا نەدۆزراوەتەوە", ar: "غير مكتشفة", en: "Still undescribed" })}</dt>
              <dd dir="ltr">~{digits(lang, g.undescribedPctApprox)}%</dd>
            </div>
          </dl>
          <p className="ento-evidence-meta" dir="ltr">
            {g.citation} · doi:{g.doi}
          </p>
        </article>

        <article className="ento-evidence-card">
          <h3>{t(lang, { ku: "GBIF · عێراق · Insecta", ar: "GBIF · العراق · Insecta", en: "GBIF · Iraq · Insecta" })}</h3>
          <dl className="ento-evidence-metrics">
            <div>
              <dt>{t(lang, { ku: "ڕوودان", ar: "سجلات التواجد", en: "Occurrences" })}</dt>
              <dd dir="ltr">{digits(lang, iq.occurrences)}</dd>
            </div>
            <div>
              <dt>{t(lang, { ku: "speciesKeyی جیاواز", ar: "speciesKey متمايزة", en: "Distinct species keys" })}</dt>
              <dd dir="ltr">{digits(lang, iq.distinctSpeciesKeys)}</dd>
            </div>
            <div>
              <dt>taxonKey</dt>
              <dd dir="ltr">{iq.taxonKey}</dd>
            </div>
          </dl>
          <p className="ento-evidence-note">{t(lang, GBIF_IRAQ.caveat)}</p>
          <p className="ento-evidence-meta" dir="ltr">
            Snapshot {GBIF_IRAQ.retrieved} ·{" "}
            <a href={GBIF_IRAQ.portal} target="_blank" rel="noopener noreferrer">
              Open Iraq Insecta in GBIF
            </a>
          </p>
        </article>
      </div>

      <h3 className="ento-evidence-sub">
        {t(lang, {
          ku: "ئۆردەرەکان لە GBIF (عێراق)",
          ar: "الرتب في GBIF (العراق)",
          en: "Orders in GBIF (Iraq)",
        })}
      </h3>
      <div className="ento-evidence-table-wrap">
        <table className="ento-record ento-evidence-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>{t(lang, { ku: "ڕوودان", ar: "سجلات", en: "Occ." })}</th>
              <th>{t(lang, { ku: "جۆر", ar: "أنواع", en: "Spp. keys" })}</th>
              <th>taxonKey</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(GBIF_IRAQ.orders).map(([order, row]) => (
              <tr key={order}>
                <td className="ento-binomial">
                  <a href={gbifIraqOrderUrl(row.taxonKey)} target="_blank" rel="noopener noreferrer">
                    {order}
                  </a>
                </td>
                <td dir="ltr">{digits(lang, row.occurrences)}</td>
                <td dir="ltr">{digits(lang, row.distinctSpeciesKeys)}</td>
                <td dir="ltr">{row.taxonKey}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="ento-evidence-sub">
        {t(lang, {
          ku: "داتابەسە باوەڕپێکراوەکان",
          ar: "قواعد البيانات الموثوقة",
          en: "Trusted databases",
        })}
      </h3>
      <ul className="ento-evidence-dbs">
        {DATABASES.map((db) => (
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

      <h3 className="ento-evidence-sub">
        {t(lang, {
          ku: "ئەدەبیاتی ناوچەیی",
          ar: "أدبيات إقليمية",
          en: "Regional literature",
        })}
      </h3>
      <ul className="ento-evidence-dbs">
        {REGIONAL_LITERATURE.map((item) => (
          <li key={item.id}>
            <a href={item.url} target="_blank" rel="noopener noreferrer" dir="ltr">
              {item.title}
              {item.year ? ` (${item.year})` : ""}
            </a>
            <span className="ento-evidence-db-full" dir="ltr">
              {" "}
              — {item.venue}
            </span>
            <p>{t(lang, item.finding)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
