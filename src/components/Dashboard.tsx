"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  addDays,
  isSameDate,
  toYearDay,
  type SDate,
} from "@/lib/calendar";
import { filterEvents, getEventsOn, type FixedEvent } from "@/lib/events";
import {
  getActiveReminders,
  festivalEveBlocked,
  type ReminderBadge,
} from "@/lib/reminders";
import { useSchedule } from "@/components/ScheduleProvider";
import { useGiftDialog } from "@/components/GiftDialogProvider";
import EventIcon from "@/components/EventIcon";
import ReminderIcon from "@/components/ReminderIcon";
import AddTaskDialog from "@/components/AddTaskDialog";
import BundleDialog from "@/components/BundleDialog";
import SeedEfficiencyDialog from "@/components/SeedEfficiencyDialog";
import Modal from "@/components/Modal";
import TimeIcon from "@/components/TimeIcon";
import PixelIcon from "@/components/PixelIcon";
import { BUNDLES, bundleItemKey } from "@/data/bundles";
import { toolPickup } from "@/lib/blacksmith";
import type { ReactNode } from "react";

// 물뿌리개 업그레이드 제안을 멈출 누적 횟수
const MAX_WATERING_CAN_UPGRADES = 3;

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
    memoCategoryToggles,
    rainDays,
    wateringCanUpgrades,
    setRainDay,
    incWateringCanUpgrades,
    addMemo,
    bundleItemsDone,
  } = useSchedule();
  const openGifts = useGiftDialog();
  // 할 일 추가 대상: null=닫힘, "today"=오늘, "tomorrow"=내일
  const [addTarget, setAddTarget] = useState<"today" | "tomorrow" | null>(null);
  const [seedEffOpen, setSeedEffOpen] = useState(false);
  const [rainPromptOpen, setRainPromptOpen] = useState(false);
  const [bundleFillOpen, setBundleFillOpen] = useState(false);

  // 비 오는 날에만 구할 수 있는, 아직 필요한 번들 품목 이름
  const rainBundleNeeds = [
    ...new Set(
      BUNDLES.filter(
        (b) =>
          b.items.filter((i) => bundleItemsDone[bundleItemKey(b.id, i.id)])
            .length < b.needed,
      ).flatMap((b) =>
        b.items
          .filter((i) => i.rainy && !bundleItemsDone[bundleItemKey(b.id, i.id)])
          .map((i) => t(i.nameKey)),
      ),
    ),
  ];

  const tomorrow = addDays(currentDate, 1);
  const tomorrowYd = toYearDay(tomorrow);
  const rainTomorrow = !!rainDays[tomorrowYd];

  const dateLabel = (d: SDate) =>
    t("addTask.dateLabel", { season: t(`seasons.${d.season}`), day: d.day });

  // 마을 회관(추적 번들 전부 완료) 여부 → 금요일 휴무 판단에 사용
  const ccCompleted = BUNDLES.every(
    (b) =>
      b.items.filter((i) => bundleItemsDone[bundleItemKey(b.id, i.id)]).length >=
      b.needed,
  );
  // 오늘 도구를 맡겼을 때 실제 수령 가능일(대장간 휴무 반영)
  const wateringPickup = toolPickup(currentDate, ccCompleted);

  // "내일 비" 토글: 켜면 내일 물주기가 숨겨지고, 업그레이드 여력이 있으면 제안 띄움
  const toggleRainTomorrow = () => {
    const next = !rainTomorrow;
    setRainDay(tomorrowYd, next);
    if (next && wateringCanUpgrades < MAX_WATERING_CAN_UPGRADES) {
      setRainPromptOpen(true);
    }
  };

  // 물뿌리개 업그레이드를 실제 수령 가능일에 추가(대장간 휴무 시 다음 영업일)
  const addWateringCanUpgrade = () => {
    const target = wateringPickup.pickup;
    addMemo({
      season: target.season,
      day: target.day,
      text: t("addTask.toolMemo", { tool: t("tools.wateringCan") }),
      reminderDaysBefore: 0,
      category: "tool",
    });
    incWateringCanUpgrades();
    setRainPromptOpen(false);
  };

  const fixedLabel = (e: FixedEvent): string => {
    if (e.type === "festival") return t(`festivals.${e.refId}`);
    if (e.type === "birthday")
      return t("dashboard.birthdayOf", { name: t(`villagers.${e.refId}`) });
    return t("dashboard.plantDeadline", { crop: t(`crops.${e.refId}`) });
  };

  const reminderBadge = (badge: ReminderBadge): ReactNode => {
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
    const isRain = !!rainDays[yd]; // 비 오는 날엔 물주기 숨김
    const isToday = isSameDate(date, currentDate);
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
      // 비 오는 날은 매일 물주기 리마인더 숨김
      if (r.id === "watering" && isRain) continue;
      const key = `${yd}:reminder-${r.id}`;
      // 날씨·운세(오늘)에는 "내일 비" 토글, 마을회관 번들에는 "번들 채우기" 버튼
      let rightBadge = reminderBadge(r.badge);
      if (r.id === "weatherFortune" && isToday) {
        rightBadge = (
          <RainToggle
            active={rainTomorrow}
            onToggle={toggleRainTomorrow}
            label={t("dashboard.rainTomorrow")}
          />
        );
      } else if (r.id === "communityCenterBundle") {
        rightBadge = (
          <ActionChip
            onClick={() => setBundleFillOpen(true)}
            label={t("bundle.fill")}
          />
        );
      } else if (r.id === "buySeeds") {
        rightBadge = (
          <ActionChip
            onClick={() => setSeedEffOpen(true)}
            label={t("seedEfficiency.view")}
          />
        );
      }
      // 구인광고 확인: 내일이 NPC·상점을 막는 축제면 마감 경고를 함께 표시
      let label = t(`reminders.${r.id}.title`);
      if (r.id === "helpWanted" && festivalEveBlocked(date)) {
        label = `${label} (${t("reminders.helpWanted.eveWarning")})`;
      }
      rows.push({
        key,
        orderKey: `reminder:${r.id}`,
        icon: <ReminderIcon id={r.id} size={16} />,
        label,
        rightBadge,
        done: !!taskDone[key],
        onToggle: () => toggleTask(key),
      });
    }

    for (const m of memosOn(date)) {
      // 씨앗 구매 메모(buySeed): buySeeds 리마인더와 순서·토글 통합
      if (m.category === "buySeed") {
        if (!reminderToggles.buySeeds) continue;
        rows.push({
          key: `memo-${m.id}`,
          orderKey: "reminder:buySeeds",
          icon: <ReminderIcon id="buySeeds" size={16} />,
          label: m.text,
          done: m.done,
          onToggle: () => toggleDone(m.id),
          onDelete: () => deleteMemo(m.id),
        });
        continue;
      }
      // 카테고리가 꺼져 있으면 숨김(카테고리 없는 레거시 메모는 항상 표시)
      if (m.category && !memoCategoryToggles[m.category]) continue;
      // 비 오는 날은 작물별 물주기 숨김
      if (m.category === "watering" && isRain) continue;
      rows.push({
        key: `memo-${m.id}`,
        orderKey: `memo:${m.category ?? "machine"}`,
        icon: <PixelIcon src="/icons/ui/note.png" />,
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

      {/* 할 일 추가 버튼: 오늘 / 내일 */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setAddTarget("today")}
          className="rounded-lg border border-[var(--sv-accent)] bg-[var(--sv-accent)] px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90"
        >
          ＋ {t("addTask.titleWithDay", { day: t("dashboard.today") })}
        </button>
        <button
          onClick={() => setAddTarget("tomorrow")}
          className="rounded-lg border border-[var(--sv-accent)] px-3 py-1.5 text-sm font-semibold text-[var(--sv-accent)] hover:bg-[var(--sv-bg)]"
        >
          ＋ {t("addTask.titleWithDay", { day: t("dashboard.tomorrow") })}
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

      {addTarget && (
        <AddTaskDialog
          baseDate={addTarget === "today" ? currentDate : tomorrow}
          dayLabel={
            addTarget === "today" ? t("dashboard.today") : t("dashboard.tomorrow")
          }
          onClose={() => setAddTarget(null)}
        />
      )}

      {seedEffOpen && (
        <SeedEfficiencyDialog
          season={currentDate.season}
          onClose={() => setSeedEffOpen(false)}
        />
      )}

      {rainPromptOpen && (
        <Modal
          title={t("dashboard.rainPromptTitle")}
          onClose={() => setRainPromptOpen(false)}
        >
          <p className="mb-2 text-sm">{t("dashboard.rainPromptBody")}</p>

          {/* 도구 수령일 + 대장간 휴무 경고 */}
          <p className="mb-3 flex items-center gap-1.5 text-xs text-[var(--sv-ink-muted)]">
            <TimeIcon size={14} />
            {t("addTask.pickupPreview", { date: dateLabel(wateringPickup.pickup) })}
          </p>
          {wateringPickup.closure && (
            <p className="mb-3 rounded-md bg-[#fbeaea] px-3 py-2 text-xs font-semibold text-[#b02a2a]">
              ⚠ {t("blacksmith.pickupWarn", {
                ready: dateLabel(wateringPickup.ready),
                reason: t(`blacksmith.${wateringPickup.closure}`),
              })}
            </p>
          )}

          {/* 비 오는 날에만 구할 수 있는 번들 품목 */}
          {rainBundleNeeds.length > 0 && (
            <div className="mb-3 rounded-md bg-[var(--sv-bg)] p-3">
              <p className="mb-1 flex items-center gap-1 text-xs font-semibold">
                <PixelIcon src="/icons/ui/rain.png" size={14} />
                {t("dashboard.rainBundleItems")}
              </p>
              <p className="mb-2 text-sm">{rainBundleNeeds.join(", ")}</p>
              <button
                onClick={() => {
                  setRainPromptOpen(false);
                  setBundleFillOpen(true);
                }}
                className="rounded-lg border border-[var(--sv-accent)] px-3 py-1 text-xs font-semibold text-[var(--sv-accent)] hover:bg-[var(--sv-panel)]"
              >
                {t("dashboard.rainBundleOpen")}
              </button>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setRainPromptOpen(false)}
              className="rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-sm hover:bg-[var(--sv-bg)]"
            >
              {t("dashboard.rainPromptSkip")}
            </button>
            <button
              onClick={addWateringCanUpgrade}
              className="rounded-lg bg-[var(--sv-accent)] px-4 py-1.5 text-sm font-semibold text-white"
            >
              {t("dashboard.rainPromptAdd")}
            </button>
          </div>
        </Modal>
      )}

      {bundleFillOpen && (
        <BundleDialog
          initialMode="fill"
          onClose={() => setBundleFillOpen(false)}
        />
      )}
    </section>
  );
}

// 행 우측의 작은 액션 버튼(행 토글과 분리)
function ActionChip({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className="shrink-0 rounded bg-[var(--sv-accent)] px-1.5 py-0.5 text-[10px] font-semibold text-white"
    >
      {label}
    </button>
  );
}

// 날씨·운세 행의 "내일 비" 토글 버튼 (행 토글과 분리: preventDefault/stopPropagation)
function RainToggle({
  active,
  onToggle,
  label,
}: {
  active: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={`inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
        active
          ? "bg-[#5b8fb0] text-white"
          : "bg-[var(--sv-border)] text-[var(--sv-ink-muted)]"
      }`}
    >
      <PixelIcon src="/icons/ui/rain.png" size={12} /> {label}
    </button>
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
                  <PixelIcon src="/icons/ui/gift.png" size={14} />
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
