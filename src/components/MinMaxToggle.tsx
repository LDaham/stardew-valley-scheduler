"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import {
  getMinMaxPref,
  getServerMinMaxPref,
  subscribeMinMax,
  toggleMinMax,
} from "@/lib/minMaxStore";

// Min-Max Guide 토글(설정 일반 탭). 텍스트가 들어간 컴팩트 토글 버튼.
// 켜면 '오늘' 페이지가 가이드 모드로 바뀐다.
export default function MinMaxToggle() {
  const t = useTranslations();
  const on = useSyncExternalStore(
    subscribeMinMax,
    getMinMaxPref,
    getServerMinMaxPref,
  );

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={toggleMinMax}
      className={`rounded-lg border px-3 py-1 text-sm font-semibold ${
        on
          ? "border-transparent bg-[var(--sv-accent)] text-[var(--sv-accent-ink)]"
          : "border-[var(--sv-border)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
      }`}
    >
      {t("minMax.title")}
    </button>
  );
}
