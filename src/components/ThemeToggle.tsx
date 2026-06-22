"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

// 'system'은 OS 설정(라이트/다크)을 따르고, 그 외는 해당 테마를 그대로 적용.
type Pref = "system" | "light" | "dark" | "stardew" | "stardewNight";

function resolveTheme(pref: Pref): string {
  if (pref === "system")
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  return pref;
}
function applyTheme(pref: Pref) {
  document.documentElement.setAttribute("data-theme", resolveTheme(pref));
}

// 테마 선택(시스템·라이트·다크·스타듀·스타듀 밤). 선택은 localStorage(svTheme)에 저장.
// 초기 적용은 layout의 인라인 스크립트가 담당하고, 여기선 사용자 변경만 처리한다.
export default function ThemeToggle() {
  const t = useTranslations();
  // 저장된 선택을 첫 렌더에 바로 읽는다(클라이언트 전용 컴포넌트).
  const [pref, setPref] = useState<Pref>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("svTheme") as Pref) || "system";
  });

  // 시스템 모드일 때 OS 테마가 바뀌면 즉시 반영
  useEffect(() => {
    if (pref !== "system") return;
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, [pref]);

  const choose = (p: Pref) => {
    setPref(p);
    try {
      localStorage.setItem("svTheme", p);
    } catch {}
    applyTheme(p);
  };

  const opts: { v: Pref; label: string }[] = [
    { v: "system", label: t("settings.themeSystem") },
    { v: "light", label: t("settings.themeLight") },
    { v: "dark", label: t("settings.themeDark") },
    { v: "stardew", label: t("settings.themeStardew") },
    { v: "stardewNight", label: t("settings.themeStardewNight") },
  ];

  return (
    <div className="flex flex-wrap gap-1.5">
      {opts.map((o) => (
        <button
          key={o.v}
          onClick={() => choose(o.v)}
          aria-pressed={pref === o.v}
          className={`rounded-lg border px-3 py-1 text-sm font-semibold ${
            pref === o.v
              ? "border-transparent bg-[var(--sv-accent)] text-[var(--sv-accent-ink)]"
              : "border-[var(--sv-border)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
