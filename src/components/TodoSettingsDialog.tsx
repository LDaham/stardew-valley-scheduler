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
import { getTodoEntry } from "@/lib/todoOrder";

// 설정 표시용 대표 이미지.
const EVENT_ICON: Record<string, string> = {
  festival: "/icons/festival/flag.png",
  birthday: "/icons/event/birthday.png",
  cropDeadline: "/icons/event/cropDeadline.png",
};
const MEMO_ICON: Record<string, string> = {
  harvest: "/icons/addTask/seed.png",
  tool: "/icons/addTask/tool.png",
  machine: "/icons/addTask/machine.png",
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
              </span>
            );
          } else {
            // memo 카테고리: 토글 없음
            control = <span className="size-4 shrink-0" />;
            icon = <PixelImage src={MEMO_ICON[entry.ref]} />;
            label = (
              <span className="flex items-center gap-1.5">
                <span className="text-sm">{t(`todoCategory.${entry.ref}`)}</span>
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
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => {
                e.preventDefault();
                setOverIndex(i);
              }}
              onDrop={(e) => {
                e.preventDefault();
                drop(i);
              }}
              onDragEnd={resetDrag}
              className={`flex items-center gap-2 rounded-md border-t-2 px-2 py-1.5 hover:bg-[var(--sv-bg)] ${
                isOver ? "border-[var(--sv-accent)]" : "border-transparent"
              } ${isDragging ? "opacity-40" : ""}`}
            >
              <span
                aria-hidden
                title={t("settings.reorder")}
                className="shrink-0 cursor-grab select-none px-0.5 text-[var(--sv-ink-muted)]"
              >
                ⠿
              </span>
              {control}
              <span className="mt-0.5">{icon}</span>
              <span className="flex-1">{label}</span>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
