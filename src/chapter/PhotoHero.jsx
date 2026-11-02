import { Mark } from "../marks";

function t(lang, pack) {
  if (!pack) return "";
  if (typeof pack === "string") return pack;
  return pack[lang] || pack.en || pack.ku || "";
}

/**
 * Academic photo hero — same composition as Chapter 1.
 */
export default function PhotoHero({
  lang,
  image,
  imageAlt,
  focus = "center 42%",
  num,
  icon,
  title,
  subtitle,
  latin,
}) {
  return (
    <div className="ento-chapter-hero ento-ch1-hero">
      <img
        className="ento-ch1-hero-img"
        src={image}
        alt={t(lang, imageAlt)}
        style={{ objectPosition: focus }}
        loading="eager"
        decoding="async"
        width="1600"
        height="1060"
      />
      <div className="ento-ch1-hero-shade" aria-hidden="true" />
      <div className="ento-ch1-hero-copy">
        <div className="ento-chapter-hero-num">{t(lang, num)}</div>
        {icon ? (
          <span className="ento-chapter-hero-icon">
            <Mark name={icon} />
          </span>
        ) : null}
        <h1 className="ento-chapter-hero-title">{t(lang, title)}</h1>
        {latin ? <p className="ento-binomial">{latin}</p> : null}
        {subtitle ? (
          <p className="ento-chapter-hero-en">{t(lang, subtitle)}</p>
        ) : null}
      </div>
    </div>
  );
}
