"use client";

import { useTranslations } from "next-intl";
import { addDays, daysUntil, type SDate } from "@/lib/calendar";
import {
  filterEvents,
  getEventsOn,
  getUpcomingEvents,
  type FixedEvent,
} from "@/lib/events";
import { getActiveReminders } from "@/lib/reminders";
import { useSchedule } from "@/components/ScheduleProvider";
import { useGiftDialog } from "@/components/GiftDialogProvider";
import EventIcon from "@/components/EventIcon";
import type { Memo } from "@/types/schedule";
import type { ReactNode } from "react";

const UPCOMING_WINDOW = 7; // 다가오는 이벤트 표시 범위(일)
const PREPARE_THRESHOLD = 3; // 이 일수 이내면 "미리 대비" 강조

interface UpcomingItem {
  key: string;
  icon: ReactNode;
  label: string;
  daysAway: number;
  prepare: boolean;
  villagerId?: string; // 생일 이벤트면 클릭 시 선물 모달을 연다
}

export default function Dashboard({
  onSelectDate,
}: {
  onSelectDate: (date: SDate) => void;
}) {
  const t = useTranslations();
  const { currentDate, memosOn, memos, eventFilters, reminderToggles } =
    useSchedule();
  const openGifts = useGiftDialog();

  const tomorrow = addDays(currentDate, 1);
  const reminders = getActiveReminders(currentDate, reminderToggles);

  const fixedLabel = (e: FixedEvent): string => {
    if (e.type === "festival") return t(`festivals.${e.refId}`);
    if (e.type === "birthday")
      return t("dashboard.birthdayOf", { name: t(`villagers.${e.refId}`) });
    return t("dashboard.plantDeadline", { crop: t(`crops.${e.refId}`) });
  };

  // 다가오는 고정 이벤트 (오늘 제외)
  const upcoming: UpcomingItem[] = getUpcomingEvents(currentDate, UPCOMING_WINDOW)
    .filter((u) => u.daysAway > 0 && eventFilters[u.event.type])
    .map((u) => ({
      key: `f-${u.event.type}-${u.event.refId}`,
      icon: <EventIcon event={u.event} size={18} />,
      label: fixedLabel(u.event),
      daysAway: u.daysAway,
      prepare: u.daysAway <= PREPARE_THRESHOLD,
      villagerId: u.event.type === "birthday" ? u.event.refId : undefined,
    }));

  // 사전 알림이 설정된 메모: 알림 범위에 들어오면 추가
  for (const m of memos) {
    if (m.reminderDaysBefore <= 0) continue;
    const memoDate: SDate = { season: m.season, day: m.day };
    const away = daysUntil(currentDate, memoDate);
    if (away > 0 && away <= m.reminderDaysBefore) {
      upcoming.push({
        key: `m-${m.id}`,
        icon: "📝",
        label: m.text,

        daysAway: away,
        prepare: true,
      });
    }
  }
  upcoming.sort((a, b) => a.daysAway - b.daysAway);

  return (
    <section className="flex flex-col gap-4">
      {/* 오늘 / 내일 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DayPanel
          title={t("dashboard.today")}
          date={currentDate}
          highlight
          memos={memosOn(currentDate)}
          events={filterEvents(getEventsOn(currentDate), eventFilters)}
          fixedLabel={fixedLabel}
          emptyText={t("dashboard.noTasks")}
          onClick={() => onSelectDate(currentDate)}
        />
        <DayPanel
          title={t("dashboard.tomorrow")}
          date={tomorrow}
          memos={memosOn(tomorrow)}
          events={filterEvents(getEventsOn(tomorrow), eventFilters)}
          fixedLabel={fixedLabel}
          emptyText={t("dashboard.noTasks")}
          onClick={() => onSelectDate(tomorrow)}
        />
      </div>

      {/* 오늘의 리마인더 (활성 항목 있을 때만) */}
      {reminders.length > 0 && (
        <div className="rounded-xl border border-[var(--sv-border)] bg-[var(--sv-panel)] p-4 shadow-sm">
          <h2 className="mb-2 text-sm font-bold">{t("dashboard.reminders")}</h2>
          <ul className="flex flex-col gap-1">
            {reminders.map((r) => (
              <li
                key={r.id}
                className="flex items-start gap-2 rounded-md bg-[var(--sv-bg)] px-2 py-1.5 text-sm"
              >
                <span aria-hidden>{r.emoji}</span>
                <div className="flex-1">
                  <span className="font-medium">
                    {t(`reminders.${r.id}.title`)}
                  </span>
                  <p className="text-xs text-[var(--sv-ink-muted)]">
                    {t(`reminders.${r.id}.detail`)}
                  </p>
                </div>
                {r.badge.kind === "eve" ? (
                  <span className="shrink-0 rounded bg-[#c0506b] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    ⚠ {t("dashboard.reminderEve")}
                  </span>
                ) : r.badge.kind === "dDay" ? (
                  <span className="shrink-0 rounded bg-[#e0b84c] px-1.5 py-0.5 text-[10px] font-semibold text-[#5a4416]">
                    {t("dashboard.dDay", { days: r.badge.days })}
                  </span>
                ) : (
                  <span className="shrink-0 rounded bg-[var(--sv-accent)] px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {t("dashboard.reminderToday")}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 다가오는 이벤트 (미리 대비) */}
      <div className="rounded-xl border border-[var(--sv-border)] bg-[var(--sv-panel)] p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-bold">{t("dashboard.upcoming")}</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-[var(--sv-ink-muted)]">
            {t("dashboard.noUpcoming")}
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {upcoming.map((item) => (
              <li
                key={item.key}
                className="flex items-center gap-2 rounded-md bg-[var(--sv-bg)] px-2 py-1.5 text-sm"
              >
                <span>{item.icon}</span>
                {item.villagerId ? (
                  <button
                    onClick={() => openGifts(item.villagerId!)}
                    className="flex flex-1 items-center gap-1 text-left hover:underline"
                  >
                    {item.label}
                    <span className="text-[10px]">🎁</span>
                  </button>
                ) : (
                  <span className="flex-1">{item.label}</span>
                )}
                {item.prepare && (
                  <span className="rounded bg-[#e0b84c] px-1.5 py-0.5 text-[10px] font-semibold text-[#5a4416]">
                    ⚠ {t("dashboard.prepare")}
                  </span>
                )}
                <span className="text-xs text-[var(--sv-ink-muted)]">
                  {t("dashboard.inDays", { days: item.daysAway })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function DayPanel({
  title,
  date,
  highlight,
  memos,
  events,
  fixedLabel,
  emptyText,
  onClick,
}: {
  title: string;
  date: SDate;
  highlight?: boolean;
  memos: Memo[];
  events: FixedEvent[];
  fixedLabel: (e: FixedEvent) => string;
  emptyText: string;
  onClick: () => void;
}) {
  const t = useTranslations();
  const empty = memos.length === 0 && events.length === 0;

  return (
    <button
      onClick={onClick}
      className="flex flex-col rounded-xl border bg-[var(--sv-panel)] p-4 text-left shadow-sm transition-colors hover:bg-[var(--sv-bg)]"
      style={{
        borderColor: highlight ? "var(--sv-accent)" : "var(--sv-border)",
        borderWidth: highlight ? 2 : 1,
      }}
    >
      <div className="mb-2 flex items-baseline gap-2">
        <h2 className="text-sm font-bold">{title}</h2>
        <span className="text-xs text-[var(--sv-ink-muted)]">
          {t(`seasons.${date.season}`)} {date.day}
        </span>
      </div>
      {empty ? (
        <p className="text-sm text-[var(--sv-ink-muted)]">{emptyText}</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {events.map((e, i) => (
            <li key={`e${i}`} className="flex items-center gap-1.5 text-sm">
              <EventIcon event={e} size={16} />
              <span>{fixedLabel(e)}</span>
            </li>
          ))}
          {memos.map((m) => (
            <li
              key={m.id}
              className={`text-sm ${m.done ? "text-[var(--sv-ink-muted)] line-through" : ""}`}
            >
              📝 {m.text}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}
