"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import { asset } from "@/lib/asset";
import Modal from "@/components/Modal";
import ReminderIcon from "@/components/ReminderIcon";
import type { FixedEventType } from "@/lib/events";
import type { ReminderId } from "@/data/reminders";
import { getTodoEntry, type VisibleMemoCategory } from "@/lib/todoOrder";

// 설정 표시용 대표 이미지.
const EVENT_ICON: Record<string, string> = {
  festival: "/icons/festival/flag.png",
  birthday: "/icons/event/birthday.png",
  cropDeadline: "/icons/event/cropDeadline.png",
};
const MEMO_ICON: Record<string, string> = {
  harvest: "/icons/addTask/seed.png",
  watering: "/icons/reminders/watering.png",
  fruit: "/icons/addTask/fruit.png",
  tool: "/icons/addTask/tool.png",
  machine: "/icons/addTask/machine.png",
  build: "/icons/addTask/build.png",
  mining: "/icons/tools/pickaxe.png",
  fishing: "/icons/addTask/fishing.png",
  misc: "/icons/addTask/misc.png",
  eatFood: "/icons/ui/food.png",
};

function PixelImage({ src, size = 18 }: { src: string; size?: number }) {
  return (
    <Image
      src={asset(src)}
      alt=""
      width={size}
      height={size}
      unoptimized
      className="inline-block shrink-0"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

export default function TodoSettingsDialog({
  onClose,
}: {
  onClose: () => void;
}) {
  const t = useTranslations();
  const {
    eventFilters,
    setEventFilter,
    reminderToggles,
    setReminderToggle,
    memoCategoryToggles,
    setMemoCategoryToggle,
    todoOrder,
    setTodoOrder,
  } = useSchedule();

  // 드래그 앤 드롭 순서 변경
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const resetDrag = () => {
    setDragIndex(null);
    setOverIndex(null);
  };
  const drop = (i: number) => {
    if (dragIndex === null || dragIndex === i) {
      resetDrag();
      return;
    }
    const next = [...todoOrder];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(i, 0, moved);
    setTodoOrder(next);
    resetDrag();
  };
  // 포인터 좌표 아래에 있는 행 인덱스(마우스·터치 공통)
  const indexFromPoint = (x: number, y: number): number | null => {
    const el = document.elementFromPoint(x, y);
    const li = el?.closest("[data-todo-index]") as HTMLElement | null;
    if (!li) return null;
    const idx = Number(li.dataset.todoIndex);
    return Number.isNaN(idx) ? null : idx;
  };

  return (
    <Modal title={t("settings.todoSettings")} onClose={onClose}>
      <p className="mb-2 text-xs text-[var(--sv-ink-muted)]">
        {t("settings.orderHint")}
      </p>
      <ul className="flex flex-col gap-1">
        {todoOrder.map((key, i) => {
          const entry = getTodoEntry(key);
          if (!entry) return null;

          // 종류별 컨트롤/아이콘/라벨 구성
          let control: React.ReactNode;
          let icon: React.ReactNode;
          let label: React.ReactNode;

          if (entry.kind === "event") {
            const type = entry.ref as FixedEventType;
            control = (
              <input
                type="checkbox"
                checked={eventFilters[type]}
                onChange={(e) => setEventFilter(type, e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-[var(--sv-accent)]"
              />
            );
            icon = <PixelImage src={EVENT_ICON[type]} />;
            label = <span className="text-sm">{t(`eventType.${type}`)}</span>;
          } else if (entry.kind === "reminder") {
            const id = entry.ref as ReminderId;
            control = (
              <input
                type="checkbox"
                checked={reminderToggles[id]}
                onChange={(e) => setReminderToggle(id, e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-[var(--sv-accent)]"
              />
            );
            icon = <ReminderIcon id={id} size={18} />;
            label = (
              <span>
                <span className="text-sm">{t(`reminders.${id}.title`)}</span>
                <span className="block text-xs text-[var(--sv-ink-muted)]">
                  {t(`reminders.${id}.detail`)}
                </span>
                {/* 소스의 여왕 재방송: 신규 방영의 하위 토글(순서는 함께 이동) */}
                {id === "queenOfSauceNew" && (
                  <label className="mt-1 flex cursor-pointer items-center gap-1.5 text-xs">
                    <input
                      type="checkbox"
                      checked={reminderToggles.queenOfSauceRerun}
                      onChange={(e) =>
                        setReminderToggle("queenOfSauceRerun", e.target.checked)
                      }
                      className="size-3.5 accent-[var(--sv-accent)]"
                    />
                    <ReminderIcon id="queenOfSauceRerun" size={14} />
                    <span>{t("reminders.queenOfSauceRerun.title")}</span>
                  </label>
                )}
                {id === "queenOfSauceNew" && (
                  <span className="mt-0.5 block text-[10px] text-[var(--sv-ink-muted)]">
                    {t("reminders.queenOfSauceRerun.note")}
                  </span>
                )}
              </span>
            );
          } else {
            const cat = entry.ref as VisibleMemoCategory;
            control = (
              <input
                type="checkbox"
                checked={memoCategoryToggles[cat]}
                onChange={(e) => setMemoCategoryToggle(cat, e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-[var(--sv-accent)]"
              />
            );
            icon = <PixelImage src={MEMO_ICON[cat]} />;
            label = (
              <span className="flex items-center gap-1.5">
                <span className="text-sm">{t(`todoCategory.${cat}`)}</span>
                <span className="rounded bg-[var(--sv-bg)] px-1 py-0.5 text-[10px] text-[var(--sv-ink-muted)]">
                  {t("settings.userAdded")}
                </span>
              </span>
            );
          }

          const isDragging = dragIndex === i;
          const isOver =
            overIndex === i && dragIndex !== null && dragIndex !== i;
          return (
            <li
              key={key}
              data-todo-index={i}
              className={`flex items-center gap-2 rounded-md border-t-2 px-2 py-1.5 hover:bg-[var(--sv-bg)] ${
                isOver ? "border-[var(--sv-accent)]" : "border-transparent"
              } ${isDragging ? "opacity-40" : ""}`}
            >
              {control}
              <span className="mt-0.5">{icon}</span>
              <span className="flex-1">{label}</span>
              <span
                aria-hidden
                title={t("settings.reorder")}
                onPointerDown={(e) => {
                  e.preventDefault();
                  setDragIndex(i);
                  setOverIndex(i);
                  e.currentTarget.setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => {
                  if (dragIndex === null) return;
                  const idx = indexFromPoint(e.clientX, e.clientY);
                  if (idx !== null) setOverIndex(idx);
                }}
                onPointerUp={(e) => {
                  e.currentTarget.releasePointerCapture(e.pointerId);
                  if (overIndex !== null) drop(overIndex);
                  else resetDrag();
                }}
                onPointerCancel={resetDrag}
                className="shrink-0 cursor-grab touch-none select-none px-1 text-[var(--sv-ink-muted)]"
              >
                ⠿
              </span>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
