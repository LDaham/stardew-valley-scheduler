"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { addDays, toYearDay, type SDate } from "@/lib/calendar";
import { filterEvents, getEventsOn, type FixedEvent } from "@/lib/events";
import {
  getActiveReminders,
  type ReminderBadge,
} from "@/lib/reminders";
import { useSchedule } from "@/components/ScheduleProvider";
import { useGiftDialog } from "@/components/GiftDialogProvider";
import EventIcon from "@/components/EventIcon";
import ReminderIcon from "@/components/ReminderIcon";
import AddTaskDialog from "@/components/AddTaskDialog";
import type { ReactNode } from "react";

// 통합 체크리스트의 한 항목 (고정 이벤트 / 리마인더 / 메모 공통 표현)
interface TaskRow {
  key: string;
  orderKey: string; // 표시 순서 정렬용 엔트리 키
  icon: ReactNode;
  label: string;
  rightBadge?: ReactNode;
  isGift?: boolean; // 생일이면 클릭 시 선물 모달
  refId?: string;
  done: boolean;
  onToggle: () => void;
  onDelete?: () => void; // 사용자 메모만 삭제 가능
}

export default function Dashboard({
  onSelectDate,
}: {
  onSelectDate: (date: SDate) => void;
}) {
  const t = useTranslations();
  const {
    currentDate,
    setCurrentDate,
    memosOn,
    toggleDone,
    deleteMemo,
    taskDone,
    toggleTask,
    eventFilters,
    reminderToggles,
    todoOrder,
  } = useSchedule();
  const openGifts = useGiftDialog();
  const [addOpen, setAddOpen] = useState(false);

  const tomorrow = addDays(currentDate, 1);

  const fixedLabel = (e: FixedEvent): string => {
    if (e.type === "festival") return t(`festivals.${e.refId}`);
    if (e.type === "birthday")
      return t("dashboard.birthdayOf", { name: t(`villagers.${e.refId}`) });
    return t("dashboard.plantDeadline", { crop: t(`crops.${e.refId}`) });
  };

  const reminderBadge = (badge: ReminderBadge): ReactNode => {
    if (badge.kind === "eve")
      return (
        <span className="shrink-0 rounded bg-[#c0506b] px-1.5 py-0.5 text-[10px] font-semibold text-white">
          ⚠ {t("dashboard.reminderEve")}
        </span>
      );
    if (badge.kind === "dDay")
      return (
        <span className="shrink-0 rounded bg-[#e0b84c] px-1.5 py-0.5 text-[10px] font-semibold text-[#5a4416]">
          {t("dashboard.dDay", { days: badge.days })}
        </span>
      );
    return null;
  };

  // 한 날짜의 이벤트·리마인더·메모를 하나의 체크리스트로 합친다.
  const buildRows = (date: SDate): TaskRow[] => {
    const yd = toYearDay(date);
    const rows: TaskRow[] = [];

    for (const e of filterEvents(getEventsOn(date), eventFilters)) {
      const key = `${yd}:event-${e.type}-${e.refId}`;
      rows.push({
        key,
        orderKey: `event:${e.type}`,
        icon: <EventIcon event={e} size={16} />,
        label: fixedLabel(e),
        isGift: e.type === "birthday",
        refId: e.refId,
        done: !!taskDone[key],
        onToggle: () => toggleTask(key),
      });
    }

    for (const r of getActiveReminders(date, reminderToggles)) {
      const key = `${yd}:reminder-${r.id}`;
      rows.push({
        key,
        orderKey: `reminder:${r.id}`,
        icon: <ReminderIcon id={r.id} size={16} />,
        label: t(`reminders.${r.id}.title`),
        rightBadge: reminderBadge(r.badge),
        done: !!taskDone[key],
        onToggle: () => toggleTask(key),
      });
    }

    for (const m of memosOn(date)) {
      rows.push({
        key: `memo-${m.id}`,
        orderKey: `memo:${m.category ?? "machine"}`,
        icon: <span aria-hidden>📝</span>,
        label: m.text,
        done: m.done,
        onToggle: () => toggleDone(m.id),
        onDelete: () => deleteMemo(m.id),
      });
    }

    // 사용자 지정 표시 순서로 정렬(같은 엔트리 내에서는 원래 순서 유지 = 안정 정렬)
    const rank = (k: string) => {
      const i = todoOrder.indexOf(k);
      return i < 0 ? Number.MAX_SAFE_INTEGER : i;
    };
    rows.sort((a, b) => rank(a.orderKey) - rank(b.orderKey));

    return rows;
  };

  const todayRows = buildRows(currentDate);
  const tomorrowRows = buildRows(tomorrow);

  return (
    <section className="flex flex-col gap-3">
      {/* 날짜 이동 버튼 (박스 밖) */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => setCurrentDate(addDays(currentDate, -1))}
          className="rounded-lg border border-[var(--sv-border)] bg-[var(--sv-panel)] px-3 py-1.5 text-sm hover:bg-[var(--sv-bg)]"
        >
          ← {t("dashboard.prevDay")}
        </button>
        <button
          onClick={() => onSelectDate(currentDate)}
          className="flex items-baseline gap-2 hover:underline"
        >
          <span className="text-sm font-bold">{t("dashboard.today")}</span>
          <span className="text-xs text-[var(--sv-ink-muted)]">
            {t(`seasons.${currentDate.season}`)} {currentDate.day}
          </span>
        </button>
        <button
          onClick={() => setCurrentDate(addDays(currentDate, 1))}
          className="rounded-lg border border-[var(--sv-border)] bg-[var(--sv-panel)] px-3 py-1.5 text-sm hover:bg-[var(--sv-bg)]"
        >
          {t("dashboard.nextDay")} →
        </button>
      </div>

      {/* 할 일 추가 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={() => setAddOpen(true)}
          className="rounded-lg border border-[var(--sv-accent)] bg-[var(--sv-accent)] px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90"
        >
          ＋ {t("addTask.title")}
        </button>
      </div>

      {/* 통합 To Do List: 오늘 항목 + 점선 + 내일 항목 */}
      <div className="rounded-xl border-2 border-[var(--sv-accent)] bg-[var(--sv-panel)] p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-bold">{t("dashboard.todoList")}</h2>
        <TaskList
          rows={todayRows}
          emptyText={t("dashboard.noTasks")}
          onGift={openGifts}
          deleteLabel={t("memo.delete")}
        />
        {tomorrowRows.length > 0 && (
          <>
            <div className="my-3 border-t border-dashed border-[var(--sv-border)]" />
            {/* 내일 항목은 미리 체크할 수 없도록 비활성화 */}
            <TaskList
              rows={tomorrowRows}
              emptyText={t("dashboard.noTasks")}
              onGift={openGifts}
              deleteLabel={t("memo.delete")}
              disabled
            />
          </>
        )}
      </div>

      {addOpen && <AddTaskDialog onClose={() => setAddOpen(false)} />}
    </section>
  );
}

// 왼쪽 체크박스 + 완료 시 줄긋기·희미 처리. 모든 항목(이벤트/리마인더/메모) 공통 렌더.
function TaskList({
  rows,
  emptyText,
  onGift,
  deleteLabel,
  disabled = false,
}: {
  rows: TaskRow[];
  emptyText: string;
  onGift: (villagerId: string) => void;
  deleteLabel: string;
  disabled?: boolean;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-[var(--sv-ink-muted)]">{emptyText}</p>;
  }
  return (
    <ul className="flex flex-col gap-1">
      {rows.map((row) => (
        <li key={row.key}>
          {/* 행 전체(label)를 눌러 완료 토글. 내일 항목(disabled)은 체크 불가 */}
          <label
            className={`flex items-center gap-2 rounded-md bg-[var(--sv-bg)] px-2 py-1.5 text-sm ${
              disabled ? "" : "cursor-pointer"
            }`}
          >
            <input
              type="checkbox"
              checked={row.done}
              onChange={row.onToggle}
              disabled={disabled}
              className="size-4 shrink-0 accent-[var(--sv-accent)] disabled:opacity-50"
            />
            <span
              className={`flex flex-1 items-center gap-1.5 ${
                row.done ? "text-[var(--sv-ink-muted)] line-through" : ""
              }`}
            >
              {row.icon}
              {row.isGift && row.refId ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onGift(row.refId!);
                  }}
                  className="flex items-center gap-1 text-left hover:underline"
                >
                  <span>{row.label}</span>
                  <span className="text-[10px]">🎁</span>
                </button>
              ) : (
                <span>{row.label}</span>
              )}
            </span>
            {row.rightBadge}
            {row.onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  row.onDelete!();
                }}
                aria-label={deleteLabel}
                className="shrink-0 text-sm font-bold text-[#e23b3b] hover:text-[#b02a2a]"
              >
                ✕
              </button>
            )}
          </label>
        </li>
      ))}
    </ul>
  );
}
