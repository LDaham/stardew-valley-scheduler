"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  getWeekday,
  isSameDate,
  type SDate,
} from "@/lib/calendar";
import { filterEvents, getEventsOn, type FixedEvent } from "@/lib/events";
import { useSchedule } from "@/components/ScheduleProvider";
import { useGiftDialog } from "@/components/GiftDialogProvider";
import EventIcon from "@/components/EventIcon";

const REMINDER_OPTIONS = [0, 1, 2, 3, 5, 7];

interface MemoEditorProps {
  date: SDate | null;
}

export default function MemoEditor({ date }: MemoEditorProps) {
  const t = useTranslations();
  const {
    currentDate,
    setCurrentDate,
    memosOn,
    addMemo,
    deleteMemo,
    toggleDone,
    eventFilters,
  } = useSchedule();
  const openGifts = useGiftDialog();
  const [text, setText] = useState("");
  const [reminder, setReminder] = useState(0);

  if (!date) {
    return (
      <section className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-[var(--sv-border)] p-6 text-center text-[var(--sv-ink-muted)]">
        {t("memo.selectDay")}
      </section>
    );
  }

  const events = filterEvents(getEventsOn(date), eventFilters);
  const memos = memosOn(date);
  const isToday = isSameDate(date, currentDate);

  const eventLabel = (e: FixedEvent): string => {
    if (e.type === "festival") return t(`festivals.${e.refId}`);
    if (e.type === "birthday")
      return t("dashboard.birthdayOf", { name: t(`villagers.${e.refId}`) });
    return t("dashboard.plantDeadline", { crop: t(`crops.${e.refId}`) });
  };

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addMemo({
      season: date.season,
      day: date.day,
      text: trimmed,
      reminderDaysBefore: reminder,
    });
    setText("");
    setReminder(0);
  };

  return (
    <section className="rounded-xl border border-[var(--sv-border)] bg-[var(--sv-panel)] p-4 shadow-sm">
      {/* 헤더 */}
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">
            {t("memo.heading", {
              season: t(`seasons.${date.season}`),
              day: date.day,
            })}
          </h2>
          <p className="text-xs text-[var(--sv-ink-muted)]">
            {t("memo.weekday", {
              weekday: t(`weekdays.${getWeekday(date.day)}`),
            })}
          </p>
        </div>
        <button
          onClick={() => setCurrentDate(date)}
          disabled={isToday}
          className="rounded-lg border border-[var(--sv-accent)] px-3 py-1.5 text-xs font-semibold text-[var(--sv-accent)] disabled:opacity-40"
        >
          {isToday ? t("memo.isToday") : t("memo.setAsToday")}
        </button>
      </div>

      {/* 고정 이벤트 */}
      {events.length > 0 && (
        <div className="mb-3">
          <h3 className="mb-1 text-xs font-semibold text-[var(--sv-ink-muted)]">
            {t("memo.fixedEvents")}
          </h3>
          <ul className="flex flex-col gap-1">
            {events.map((e, i) => (
              <li
                key={i}
                className="flex items-center gap-2 rounded-md bg-[var(--sv-bg)] px-2 py-1 text-sm"
              >
                {e.type === "birthday" ? (
                  <button
                    onClick={() => openGifts(e.refId)}
                    className="flex w-full items-center gap-2 text-left"
                  >
                    <EventIcon event={e} size={20} />
                    <span>{eventLabel(e)}</span>
                    <span className="ml-auto shrink-0 rounded bg-[var(--sv-accent)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      🎁 {t("gift.viewGifts")}
                    </span>
                  </button>
                ) : (
                  <>
                    <EventIcon event={e} size={20} />
                    <span>{eventLabel(e)}</span>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 내 메모 */}
      <h3 className="mb-1 text-xs font-semibold text-[var(--sv-ink-muted)]">
        {t("memo.myMemos")}
      </h3>
      {memos.length === 0 ? (
        <p className="mb-3 text-sm text-[var(--sv-ink-muted)]">
          {t("memo.empty")}
        </p>
      ) : (
        <ul className="mb-3 flex flex-col gap-1">
          {memos.map((m) => (
            <li
              key={m.id}
              className="flex items-center gap-2 rounded-md bg-[var(--sv-bg)] px-2 py-1.5 text-sm"
            >
              <input
                type="checkbox"
                checked={m.done}
                onChange={() => toggleDone(m.id)}
                className="size-4 accent-[var(--sv-accent)]"
              />
              <span
                className={`flex-1 ${m.done ? "text-[var(--sv-ink-muted)] line-through" : ""}`}
              >
                {m.text}
              </span>
              {m.reminderDaysBefore > 0 && (
                <span className="rounded bg-[var(--sv-border)] px-1.5 py-0.5 text-[10px]">
                  🔔 {t("memo.reminderDays", { days: m.reminderDaysBefore })}
                </span>
              )}
              <button
                onClick={() => deleteMemo(m.id)}
                className="text-xs text-[var(--sv-ink-muted)] hover:text-[#b04a3a]"
                aria-label={t("memo.delete")}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 추가 폼 */}
      <div className="flex flex-col gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder={t("memo.addPlaceholder")}
          className="rounded-lg border border-[var(--sv-border)] bg-white px-3 py-2 text-sm outline-none focus:border-[var(--sv-accent)]"
        />
        <div className="flex items-center gap-2">
          <label className="text-xs text-[var(--sv-ink-muted)]">
            {t("memo.reminder")}
          </label>
          <select
            value={reminder}
            onChange={(e) => setReminder(Number(e.target.value))}
            className="rounded-lg border border-[var(--sv-border)] bg-white px-2 py-1 text-xs"
          >
            {REMINDER_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d === 0
                  ? t("memo.reminderNone")
                  : t("memo.reminderDays", { days: d })}
              </option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            className="ml-auto rounded-lg bg-[var(--sv-accent)] px-4 py-1.5 text-sm font-semibold text-white"
          >
            {t("memo.add")}
          </button>
        </div>
      </div>
    </section>
  );
}
