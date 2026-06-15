"use client";

import { useMemo, useState } from "react";
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
  plant: "/icons/addTask/seed.png",
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

// 씨앗 심기 생명주기(상위→하위 순서). 설정에서는 한 그룹으로 묶어 표시한다.
const CROP_GROUP_CATS = ["plant", "watering", "harvest", "eatFood"] as const;
const CROP_GROUP_KEYS = CROP_GROUP_CATS.map((c) => `memo:${c}`);
const CROP_GROUP_ID = "group:crop";

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

  // 씨앗 심기(plant/watering/harvest/eatFood)는 한 그룹으로 접어 표시한다.
  // 표시·드래그는 displayItems(그룹=1행) 기준으로 하고, 저장 시 키 배열로 펼친다.
  const displayItems = useMemo(() => {
    const items: { id: string; keys: string[] }[] = [];
    let groupAdded = false;
    for (const key of todoOrder) {
      if (CROP_GROUP_KEYS.includes(key)) {
        if (!groupAdded) {
          items.push({ id: CROP_GROUP_ID, keys: [...CROP_GROUP_KEYS] });
          groupAdded = true;
        }
        continue;
      }
      items.push({ id: key, keys: [key] });
    }
    return items;
  }, [todoOrder]);

  // 드래그 앤 드롭 순서 변경(displayItems 기준)
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
    const items = [...displayItems];
    const [moved] = items.splice(dragIndex, 1);
    items.splice(i, 0, moved);
    setTodoOrder(items.flatMap((it) => it.keys));
    resetDrag();
  };
  // 그룹 체크박스 상태: 4개 카테고리 모두 켜져 있을 때만 체크
  const cropGroupOn = CROP_GROUP_CATS.every((c) => memoCategoryToggles[c]);
  const setCropGroup = (val: boolean) =>
    CROP_GROUP_CATS.forEach((c) => setMemoCategoryToggle(c, val));
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
        {displayItems.map((item, i) => {
          // 종류별 컨트롤/아이콘/라벨 구성
          let control: React.ReactNode;
          let icon: React.ReactNode;
          let label: React.ReactNode;

          if (item.id === CROP_GROUP_ID) {
            // 씨앗 심기 그룹: 4개 카테고리 일괄 토글 + 상위→하위 게이팅 안내
            control = (
              <input
                type="checkbox"
                checked={cropGroupOn}
                onChange={(e) => setCropGroup(e.target.checked)}
                className="mt-0.5 size-4 shrink-0 accent-[var(--sv-accent)]"
              />
            );
            icon = <PixelImage src="/icons/addTask/seed.png" />;
            label = (
              <span>
                <span className="text-sm font-semibold">
                  {t("settings.cropGroup")}
                </span>
                <span className="block text-xs text-[var(--sv-ink-muted)]">
                  {t("settings.cropGroupNote")}
                </span>
              </span>
            );
          } else {
          const entry = getTodoEntry(item.id);
          if (!entry) return null;
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
          }

          const isDragging = dragIndex === i;
          const isOver =
            overIndex === i && dragIndex !== null && dragIndex !== i;
          return (
            <li
              key={item.id}
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
