"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  DAYS_PER_SEASON,
  SEASONS,
  isSameDate,
  type SDate,
  type Season,
} from "@/lib/calendar";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";

const SEASON_COLOR: Record<Season, string> = {
  spring: "var(--season-spring)",
  summer: "var(--season-summer)",
  fall: "var(--season-fall)",
  winter: "var(--season-winter)",
};

// 숫자만 있는 소형 달력. 날짜를 고르면 확인 후 그 날짜로 이동(= 해당 일자 todolist 표시).
export default function MiniCalendarDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const { currentDate, year, goToDate } = useSchedule();

  // 기본 표시: 현재 연도/계절(현재 일자 강조)
  const [viewYear, setViewYear] = useState(year);
  const [viewSeason, setViewSeason] = useState<Season>(currentDate.season);
  // 확인 대기 중인 목표 날짜
  const [pending, setPending] = useState<{ date: SDate; year: number } | null>(
    null,
  );

  const days = Array.from({ length: DAYS_PER_SEASON }, (_, i) => i + 1);

  const seasonLabel = (s: Season) => t(`seasons.${s}`);
  const dateLabel = (d: SDate, y: number) =>
    t("dashboard.dateFull", { year: y, season: seasonLabel(d.season), day: d.day });

  // 확인 단계: 이동 여부 묻기
  if (pending) {
    return (
      <Modal title={t("miniCalendar.title")} onClose={onClose}>
        <p className="mb-4 text-sm">
          {t("miniCalendar.confirmMove", {
            date: dateLabel(pending.date, pending.year),
          })}
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setPending(null)}
            className="rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-sm hover:bg-[var(--sv-bg)]"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={() => {
              goToDate(pending.date, pending.year);
              onClose();
            }}
            className="rounded-lg bg-[var(--sv-accent)] px-4 py-1.5 text-sm font-semibold text-white"
          >
            {t("common.confirm")}
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title={t("miniCalendar.title")} onClose={onClose}>
      {/* 연도 이동(1년째 미만 불가) */}
      <div className="mb-3 flex items-center justify-center gap-3">
        <button
          onClick={() => setViewYear((y) => Math.max(1, y - 1))}
          disabled={viewYear <= 1}
          aria-label={t("miniCalendar.prevYear")}
          className="rounded-lg border border-[var(--sv-border)] px-2 py-1 text-sm hover:bg-[var(--sv-bg)] disabled:opacity-40"
        >
          ←
        </button>
        <span className="min-w-20 text-center text-sm font-bold">
          {t("miniCalendar.yearLabel", { year: viewYear })}
        </span>
        <button
          onClick={() => setViewYear((y) => y + 1)}
          aria-label={t("miniCalendar.nextYear")}
          className="rounded-lg border border-[var(--sv-border)] px-2 py-1 text-sm hover:bg-[var(--sv-bg)]"
        >
          →
        </button>
      </div>

      {/* 계절 탭 */}
      <div className="mb-3 flex gap-1.5">
        {SEASONS.map((s) => {
          const active = s === viewSeason;
          return (
            <button
              key={s}
              onClick={() => setViewSeason(s)}
              className="flex-1 rounded-lg border px-2 py-1.5 text-xs font-semibold transition-colors"
              style={{
                borderColor: SEASON_COLOR[s],
                background: active ? SEASON_COLOR[s] : "transparent",
                color: active ? "#2b2016" : "var(--sv-ink-muted)",
              }}
            >
              {seasonLabel(s)}
            </button>
          );
        })}
      </div>

      {/* 28일 숫자 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const date: SDate = { season: viewSeason, day };
          const isToday =
            viewYear === year && isSameDate(date, currentDate);
          return (
            <button
              key={day}
              onClick={() => setPending({ date, year: viewYear })}
              className="flex aspect-square items-center justify-center rounded-lg border text-sm font-semibold transition-colors hover:bg-[var(--sv-bg)]"
              style={{
                borderColor: isToday ? "var(--sv-accent)" : "var(--sv-border)",
                borderWidth: isToday ? 2 : 1,
                background: isToday ? "var(--sv-bg)" : "var(--sv-panel)",
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
