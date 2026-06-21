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
  foraging: "/icons/bundleItems/salmonberry.png",
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

// 정보 영역에 표시되는 항목(나머지는 할 일 목록). 두 그룹은 서로 표시 순서에
// 영향을 주지 않으므로 설정에서도 점선으로 구분해 각 그룹 안에서만 정렬한다.
const INFO_KEYS = new Set<string>([
  "reminder:buySeeds", // 새 계절
  "event:festival", // 축제
  "event:birthday", // 생일
  "event:cropDeadline", // 작물 심기 마감
  "event:foraging", // 계절 채집 이벤트
  "reminder:krobusSprinkler", // 이리듐 스프링클러 판매
  "reminder:travelingCart", // 여행 상인 등장
  "reminder:desertTraderStaircase", // 계단 판매
]);

type Section = "main" | "info" | "todo";
interface DisplayItem {
  id: string;
  keys: string[];
}

// 메인 상단 박스 항목의 표시 아이콘.
const MAIN_ICON: Record<string, string> = {
  shopSchedule: "/icons/ui/time.png",
  bundleTracker: "/icons/ui/bundle.png",
  rainFish: "/icons/ui/rain.png",
};
// 메인 항목 id → 라벨/설명 메시지 키
const MAIN_LABEL: Record<string, { title: string; note: string }> = {
  shopSchedule: {
    title: "settings.shopScheduleShow",
    note: "settings.shopScheduleShowNote",
  },
  bundleTracker: {
    title: "settings.bundleTracker",
    note: "settings.bundleTrackerNote",
  },
  rainFish: {
    title: "settings.rainFishShow",
    note: "settings.rainFishShowNote",
  },
};

function move<T>(arr: T[], from: number, to: number): T[] {
  const next = [...arr];
  const [m] = next.splice(from, 1);
  next.splice(to, 0, m);
  return next;
}

function PixelImage({ src, size = 18 }: { src: string; size?: number }) {
  return (
    <Image
      src={asset(src)}
      alt=""
      width={size}
      height={size}
      unoptimized
      className="inline-block shrink-0"
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        imageRendering: "pixelated",
      }}
    />
  );
}

export default function TodoSettingsDialog({
  onClose,
  onBack,
}: {
  onClose: () => void;
  onBack?: () => void;
}) {
  const t = useTranslations();
  const {
    eventFilters,
    setEventFilter,
    reminderToggles,
    setReminderToggle,
    todoOrder,
    setTodoOrder,
    bundleTrackerShown,
    setBundleTrackerShown,
    shopScheduleShown,
    setShopScheduleShown,
    rainFishShown,
    setRainFishShown,
    mainOrder,
    setMainOrder,
  } = useSchedule();

  // 씨앗 심기(plant/watering/harvest/eatFood)는 한 그룹으로 접어 표시한다.
  // 표시·드래그는 displayItems(그룹=1행) 기준으로 하고, 저장 시 키 배열로 펼친다.
  const displayItems = useMemo<DisplayItem[]>(() => {
    const items: DisplayItem[] = [];
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

  // 메인 상단 박스 항목(가게 일정·꾸러미 추적): mainOrder 순서.
  const mainItems = useMemo<DisplayItem[]>(
    () => mainOrder.map((id) => ({ id, keys: [id] })),
    [mainOrder],
  );

  // 정보 항목 / 할 일 항목으로 분리(각각 todoOrder 상대 순서 유지).
  const infoItems = displayItems.filter((it) => INFO_KEYS.has(it.id));
  const todoItems = displayItems.filter((it) => !INFO_KEYS.has(it.id));

  // 드래그 앤 드롭 순서 변경(그룹 안에서만). section으로 정보/할 일을 구분한다.
  const [drag, setDrag] = useState<{ section: Section; from: number } | null>(
    null,
  );
  const [over, setOver] = useState<number | null>(null);
  const resetDrag = () => {
    setDrag(null);
    setOver(null);
  };

  // 카테고리(메인/정보/할 일): 상단 레이블(탭)로 선택. 기본은 메인.
  const [active, setActive] = useState<Section>("main");
  const drop = (section: Section, to: number) => {
    if (!drag || drag.section !== section || drag.from === to) {
      resetDrag();
      return;
    }
    if (section === "main") {
      setMainOrder(move(mainOrder, drag.from, to));
      resetDrag();
      return;
    }
    const next =
      section === "info"
        ? [...move(infoItems, drag.from, to), ...todoItems]
        : [...infoItems, ...move(todoItems, drag.from, to)];
    setTodoOrder(next.flatMap((it) => it.keys));
    resetDrag();
  };
  // 같은 섹션에서 포인터 좌표 아래에 있는 행 인덱스
  const indexFromPoint = (section: Section, x: number, y: number): number | null => {
    const el = document.elementFromPoint(x, y);
    const li = el?.closest(
      `[data-row-index][data-section="${section}"]`,
    ) as HTMLElement | null;
    if (!li) return null;
    const idx = Number(li.dataset.rowIndex);
    return Number.isNaN(idx) ? null : idx;
  };

  // 한 항목의 컨트롤·아이콘·라벨 구성
  const rowParts = (item: DisplayItem) => {
    let control: React.ReactNode = null;
    let icon: React.ReactNode = null;
    let label: React.ReactNode = null;

    // 메인 상단 박스 항목(가게 일정·꾸러미·비 생선): 체크박스(만)로 표시 토글 + 드래그 정렬.
    if (MAIN_LABEL[item.id]) {
      const shown =
        item.id === "shopSchedule"
          ? shopScheduleShown
          : item.id === "rainFish"
            ? rainFishShown
            : bundleTrackerShown;
      const setShown =
        item.id === "shopSchedule"
          ? setShopScheduleShown
          : item.id === "rainFish"
            ? setRainFishShown
            : setBundleTrackerShown;
      control = (
        <input
          type="checkbox"
          checked={shown}
          onChange={(e) => setShown(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-[var(--sv-accent)]"
        />
      );
      icon = <PixelImage src={MAIN_ICON[item.id]} />;
      label = (
        <span>
          <span className="text-sm font-semibold">
            {t(MAIN_LABEL[item.id].title)}
          </span>
          <span className="block text-xs text-[var(--sv-ink-muted)]">
            {t(MAIN_LABEL[item.id].note)}
          </span>
        </span>
      );
      return { control, icon, label };
    }

    if (item.id === CROP_GROUP_ID) {
      // 사용자 추가 항목은 표시 토글 없이 순서 변경(드래그)만 제공
      icon = <PixelImage src="/icons/addTask/seed.png" />;
      label = (
        <span>
          <span className="flex items-center gap-1.5">
            <span className="text-sm font-semibold">
              {t("settings.cropGroup")}
            </span>
            <span className="rounded bg-[var(--sv-bg)] px-1 py-0.5 text-[10px] text-[var(--sv-ink-muted)]">
              {t("settings.userAdded")}
            </span>
          </span>
          <span className="block text-xs text-[var(--sv-ink-muted)]">
            {t("settings.cropGroupNote")}
          </span>
        </span>
      );
      return { control, icon, label };
    }

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
          {/* 소스의 여왕 재방송: 신규 방영의 하위 토글(순서는 함께 이동).
              신규 방영과 시각적으로 떨어뜨리고(들여쓰기·여백), 체크박스로만 토글되도록
              label이 아닌 span으로 감싼다. */}
          {id === "queenOfSauceNew" && (
            <span
              className={`mt-2 block border-l-2 border-[var(--sv-border)] pl-2 ${
                reminderToggles.queenOfSauceNew ? "" : "opacity-50"
              }`}
            >
              <span className="flex items-center gap-1.5 text-xs">
                <input
                  type="checkbox"
                  // 저장값(사용자 선택)은 유지하고, 신규 방영이 꺼져 있으면 잠근다.
                  // → 신규 방영을 다시 켜면 이전 재방송 설정이 그대로 복원된다.
                  checked={reminderToggles.queenOfSauceRerun}
                  disabled={!reminderToggles.queenOfSauceNew}
                  onChange={(e) =>
                    setReminderToggle("queenOfSauceRerun", e.target.checked)
                  }
                  className="size-3.5 shrink-0 accent-[var(--sv-accent)] disabled:cursor-not-allowed"
                />
                <ReminderIcon id="queenOfSauceRerun" size={14} />
                <span>{t("reminders.queenOfSauceRerun.title")}</span>
              </span>
              <span className="mt-0.5 block text-[10px] text-[var(--sv-ink-muted)]">
                {t("reminders.queenOfSauceRerun.note")}
              </span>
            </span>
          )}
        </span>
      );
    } else {
      // 사용자 추가 메모 카테고리: 표시 토글 없이 순서 변경(드래그)만 제공
      const cat = entry.ref as VisibleMemoCategory;
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
    return { control, icon, label };
  };

  // 드래그 핸들(렌더 헬퍼)
  const renderHandle = (section: Section, i: number) => (
    <span
      aria-hidden
      title={t("settings.reorder")}
      onPointerDown={(e) => {
        e.preventDefault();
        setDrag({ section, from: i });
        setOver(i);
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag || drag.section !== section) return;
        const idx = indexFromPoint(section, e.clientX, e.clientY);
        if (idx !== null) setOver(idx);
      }}
      onPointerUp={(e) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        if (over !== null) drop(section, over);
        else resetDrag();
      }}
      onPointerCancel={resetDrag}
      className="shrink-0 cursor-grab touch-none select-none px-1 text-[var(--sv-ink-muted)]"
    >
      ⠿
    </span>
  );

  // 한 섹션의 행 목록 렌더
  const renderSection = (section: Section, items: DisplayItem[]) => (
    <ul className="flex flex-col gap-1">
      {items.map((item, i) => {
        const parts = rowParts(item);
        if (!parts) return null;
        const isDragging = drag?.section === section && drag.from === i;
        const isOver =
          over === i && drag?.section === section && drag.from !== i;
        return (
          <li
            key={item.id}
            data-row-index={i}
            data-section={section}
            className={`flex items-center gap-2 rounded-md border-t-2 px-2 py-1.5 hover:bg-[var(--sv-bg)] ${
              isOver ? "border-[var(--sv-accent)]" : "border-transparent"
            } ${isDragging ? "opacity-40" : ""}`}
          >
            {/* 체크박스 없는(사용자 추가) 항목은 같은 너비의 빈 자리로 정렬을 맞춘다 */}
            {parts.control ?? <span aria-hidden className="size-4 shrink-0" />}
            <span className="mt-0.5">{parts.icon}</span>
            <span className="flex-1">{parts.label}</span>
            {renderHandle(section, i)}
          </li>
        );
      })}
    </ul>
  );

  // 카테고리 정의(섹션 키 + 제목 메시지 + 항목 목록)
  const sections: { section: Section; title: string; items: DisplayItem[] }[] = [
    { section: "main", title: t("settings.mainTitle"), items: mainItems },
    { section: "info", title: t("dashboard.infoTitle"), items: infoItems },
    { section: "todo", title: t("dashboard.todoList"), items: todoItems },
  ];

  return (
    <Modal title={t("settings.todoSettings")} onClose={onClose} onBack={onBack}>
      <p className="mb-3 text-xs text-[var(--sv-ink-muted)]">
        {t("settings.orderHint")}
      </p>

      {/* 상단 카테고리 탭(밑줄형 — 필터 칩과 구분): 선택 시 아래 패널 전환 */}
      <div className="mb-3 flex flex-wrap gap-1 border-b border-[var(--sv-border)]">
        {sections.map(({ section, title, items }) => {
          const isActive = section === active;
          return (
            <button
              key={section}
              onClick={() => setActive(section)}
              aria-pressed={isActive}
              className={`-mb-px flex items-center gap-1.5 border-b-2 px-3 py-1.5 text-base font-semibold transition-transform ${
                isActive
                  ? "-translate-y-0.5 border-[var(--sv-accent)] text-[var(--sv-ink)]"
                  : "border-transparent text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
              }`}
            >
              {title}
              <span className="text-xs text-[var(--sv-ink-muted)]">
                {items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* 선택된 카테고리 패널 */}
      {sections
        .filter(({ section }) => section === active)
        .map(({ section, items }) => (
          <div key={section}>{renderSection(section, items)}</div>
        ))}
    </Modal>
  );
}
