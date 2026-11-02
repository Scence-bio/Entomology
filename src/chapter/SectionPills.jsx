function label(lang, item) {
  return item[lang] || item.en || item.ku || "";
}

export default function SectionPills({ lang, items, active, ariaLabel }) {
  const dir = lang === "en" ? "ltr" : "rtl";
  return (
    <nav
      className="ento-section-nav"
      dir={dir}
      aria-label={
        ariaLabel ||
        (lang === "ku"
          ? "بەشەکانی چاپتەر"
          : lang === "ar"
            ? "أقسام الفصل"
            : "Chapter sections")
      }
    >
      {items.map((item) => (
        <a
          key={item.id}
          className={`ento-snav-pill${active === item.id ? " active" : ""}`}
          href={`#${item.id}`}
        >
          {label(lang, item)}
        </a>
      ))}
    </nav>
  );
}
