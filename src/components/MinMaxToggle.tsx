"use client";

import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";

// Min-Max Guide 토글(설정 일반 탭). 텍스트가 들어간 컴팩트 토글 버튼.
// 켜면 '오늘' 페이지가 가이드 모드로 바뀐다. 상태는 슬롯별로 저장(슬롯 전환 시 따라감).
export default function MinMaxToggle() {
  const t = useTranslations();
  const { minMaxOn, setMinMaxOn } = useSchedule();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={minMaxOn}
      onClick={() => setMinMaxOn(!minMaxOn)}
      className={`rounded-lg border px-3 py-1 text-sm font-semibold ${
        minMaxOn
          ? "border-transparent bg-[var(--sv-accent)] text-[var(--sv-accent-ink)]"
          : "border-[var(--sv-border)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
      }`}
    >
      {t("minMax.title")}
    </button>
  );
}
