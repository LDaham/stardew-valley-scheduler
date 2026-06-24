"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import {
  getThemePref,
  getServerThemePref,
  subscribeTheme,
  setMode,
  setSeason,
  type ThemeMode,
  type SeasonPref,
} from "@/lib/themeStore";

// 테마는 모드(밝기) × 계절(색조) 두 축을 합쳐 결정한다(예: 다크 + 봄 = springDark).
// 계절 '자동'은 오늘 페이지의 현재 날짜를 따른다. 적용/영속은 themeStore가 담당.
export default function ThemeToggle() {
  const t = useTranslations();
  const { mode, season } = useSyncExternalStore(
    subscribeTheme,
    getThemePref,
    getServerThemePref,
  );

  const modeOpts: { v: ThemeMode; label: string }[] = [
    { v: "system", label: t("settings.themeSystem") },
    { v: "light", label: t("settings.themeLight") },
    { v: "dark", label: t("settings.themeDark") },
  ];
  const seasonOpts: { v: SeasonPref; label: string }[] = [
    { v: "auto", label: t("settings.themeSeasonAuto") },
    { v: "spring", label: t("settings.themeSpring") },
    { v: "summer", label: t("settings.themeSummer") },
    { v: "fall", label: t("settings.themeFall") },
    { v: "winter", label: t("settings.themeWinter") },
  ];

  const btn = (active: boolean) =>
    `rounded-lg border px-3 py-1 text-sm font-semibold ${
      active
        ? "border-transparent bg-[var(--sv-accent)] text-[var(--sv-accent-ink)]"
        : "border-[var(--sv-border)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
    }`;

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="mb-1 text-xs font-semibold text-[var(--sv-ink-muted)]">
          {t("settings.themeModeLabel")}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {modeOpts.map((o) => (
            <button
              key={o.v}
              onClick={() => setMode(o.v)}
              aria-pressed={mode === o.v}
              className={btn(mode === o.v)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1 text-xs font-semibold text-[var(--sv-ink-muted)]">
          {t("settings.themeSeasonLabel")}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {seasonOpts.map((o) => (
            <button
              key={o.v}
              onClick={() => setSeason(o.v)}
              aria-pressed={season === o.v}
              className={btn(season === o.v)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
