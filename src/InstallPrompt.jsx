import { useEffect, useState } from "react";

function t(lang, ku, ar, en) {
  return lang === "ku" ? ku : lang === "ar" ? ar : en;
}

export function InstallPrompt({ lang }) {
  const [deferred, setDeferred] = useState(null);
  const [hidden, setHidden] = useState(() => {
    try {
      return sessionStorage.getItem("ento-install-dismissed") === "1";
    } catch {
      return false;
    }
  });
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    setStandalone(isStandalone);

    const on bip = (e) => {
      e.preventDefault();
      setDeferred(e);
    };
    window.addEventListener("beforeinstallprompt", onbip);
    return () => window.removeEventListener("beforeinstallprompt", onbip);
  }, []);

  if (standalone || hidden || !deferred) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem("ento-install-dismissed", "1");
    } catch {}
    setHidden(true);
  };

  const install = async () => {
    deferred.prompt();
    try {
      await deferred.userChoice;
    } catch {}
    setDeferred(null);
    dismiss();
  };

  return (
    <div className="ento-install" role="status" dir={lang === "en" ? "ltr" : "rtl"}>
      <div className="ento-install-copy">
        <strong>{t(lang, "دامەزراندنی Entomo", "تثبيت Entomo", "Install Entomo")}</strong>
        <span>
          {t(
            lang,
            "وەک ئەپ لەسەر مۆبایل یان کۆمپیوتەر دایبمەزرێنە — خێراتر و ئۆفلاین.",
            "ثبّته كتطبيق على الجوال أو الحاسوب — أسرع وبعمله دون اتصال.",
            "Add it as an app on phone or desktop — faster, works offline."
          )}
        </span>
      </div>
      <div className="ento-install-actions">
        <button type="button" className="ento-install-go" onClick={install}>
          {t(lang, "دامەزراندن", "تثبيت", "Install")}
        </button>
        <button type="button" className="ento-install-skip" onClick={dismiss}>
          {t(lang, "دواتر", "لاحقاً", "Later")}
        </button>
      </div>
    </div>
  );
}
