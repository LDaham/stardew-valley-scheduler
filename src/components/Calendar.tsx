"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  DAYS_PER_SEASON,
  SEASONS,
  WEEKDAYS,
  getWeekday,
  isSameDate,
  type SDate,
  type Season,
} from "@/lib/calendar";
import { filterEvents, getEventsOn, type FixedEvent } from "@/lib/events";
import { getActiveReminders } from "@/lib/reminders";
import { useSchedule } from "@/components/ScheduleProvider";
import EventIcon from "@/components/EventIcon";

const SEASON_COLOR: Record<Season, string> = {
  spring: "var(--season-spring)",
  summer: "var(--season-summer)",
  fall: "var(--season-fall)",
  winter: "var(--season-winter)",
};

interface CalendarProps {
  selectedDate: SDate | null;
  onSelectDate: (date: SDate) => void;
}

export default function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const t = useTranslations();
  const { currentDate, setCurrentDate, memosOn, eventFilters, reminderToggles } =
    useSchedule();
  // 선택한 날짜를 "오늘"로 설정할 수 있는지 (선택 없음/이미 오늘이면 불가)
  const isSelectedToday =
    selectedDate !== null && isSameDate(selectedDate, currentDate);
  const canSetToday = selectedDate !== null && !isSelectedToday;
  // 기본은 현재 날짜의 계절을 따르고, 탭을 직접 누른 경우에만 고정한다.
  const [seasonOverride, setSeasonOverride] = useState<Season | null>(null);
  const viewedSeason = seasonOverride ?? currentDate.season;

  // 이벤트 이름을 i18n으로 변환 (툴팁용)
  const eventLabel = (e: FixedEvent): string => {
    if (e.type === "festival") return t(`festivals.${e.refId}`);
    if (e.type === "birthday")
      return `${t(`villagers.${e.refId}`)} 🎂`;
    return `${t(`crops.${e.refId}`)} ${t("calendar.plantBy")}`;
  };

  const days = Array.from({ length: DAYS_PER_SEASON }, (_, i) => i + 1);

  return (
    <section className="rounded-xl border border-[var(--sv-border)] bg-[var(--sv-panel)] p-4 shadow-sm">
      {/* 선택한 날짜를 오늘로 설정 */}
      <div className="mb-3 flex justify-end">
        <button
          onClick={() => selectedDate && setCurrentDate(selectedDate)}
          disabled={!canSetToday}
          className="rounded-lg border border-[var(--sv-accent)] px-3 py-1.5 text-xs font-semibold text-[var(--sv-accent)] disabled:opacity-40"
        >
          {isSelectedToday ? t("memo.isToday") : t("memo.setAsToday")}
        </button>
      </div>

      {/* 계절 탭 */}
      <div className="mb-4 flex gap-2">
        {SEASONS.map((s) => {
          const active = s === viewedSeason;
          return (
            <button
              key={s}
              onClick={() => setSeasonOverride(s)}
              className="flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors"
              style={{
                borderColor: SEASON_COLOR[s],
                background: active ? SEASON_COLOR[s] : "transparent",
                color: active ? "#2b2016" : "var(--sv-ink-muted)",
              }}
            >
              {t(`seasons.${s}`)}
            </button>
          );
        })}
      </div>

      {/* 요일 헤더 */}
      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs font-medium text-[var(--sv-ink-muted)]">
        {WEEKDAYS.map((w) => (
          <div key={w}>{t(`weekdays.${w}`)}</div>
        ))}
      </div>

      {/* 28일 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const date: SDate = { season: viewedSeason, day };
          const events = filterEvents(getEventsOn(date), eventFilters);
          const reminders = getActiveReminders(date, reminderToggles);
          const memos = memosOn(date);
          const isToday = isSameDate(date, currentDate);
          const isSelected = selectedDate && isSameDate(date, selectedDate);
          const weekend =
            getWeekday(day) === "sat" || getWeekday(day) === "sun";

          return (
            <button
              key={day}
              onClick={() => onSelectDate(date)}
              title={[
                ...events.map(eventLabel),
                ...reminders.map((r) => t(`reminders.${r.id}.title`)),
              ].join(", ")}
              className="flex aspect-square flex-col rounded-lg border p-1 text-left transition-colors hover:bg-[var(--sv-bg)]"
              style={{
                borderColor: isSelected
                  ? "var(--sv-accent)"
                  : "var(--sv-border)",
                borderWidth: isSelected ? 2 : 1,
                background: isToday ? "var(--sv-bg)" : "var(--sv-panel)",
                boxShadow: isToday
                  ? "inset 0 0 0 2px var(--sv-accent)"
                  : undefined,
              }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: weekend ? "#b04a3a" : "var(--sv-ink)" }}
              >
                {day}
              </span>
              {/* 이벤트 아이콘 */}
              <span className="mt-auto flex flex-wrap items-center gap-0.5 text-[10px] leading-none">
                {events.slice(0, 3).map((e, i) => (
                  <EventIcon key={i} event={e} size={14} />
                ))}
                {reminders.slice(0, 2).map((r) => (
                  <span key={r.id} aria-hidden>
                    {r.emoji}
                  </span>
                ))}
                {memos.length > 0 && <span>📝</span>}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
