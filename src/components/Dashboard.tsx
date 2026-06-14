"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { addDays, toYearDay, type SDate } from "@/lib/calendar";
import { filterEvents, getEventsOn, type FixedEvent } from "@/lib/events";
import {
  getActiveReminders,
  festivalEveBlocked,
  festivalBlocksOn,
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
import type { Memo } from "@/types/schedule";
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
  done: boolean;
  onToggle: () => void;
  onDelete?: () => void; // 사용자 메모만 삭제 가능
}

// 삭제 팝업 대상: 특정 메모(memoId) + 관련 작물(cropIds)
interface DeleteTarget {
  memoId?: string;
  cropIds: string[];
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
    memos,
    memosOn,
    toggleDone,
    setDoneMany,
    deleteMemo,
    deleteMemos,
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
  const [addTarget, setAddTarget] = useState<"today" | "tomorrow" | null>(null);
  const [seedEffOpen, setSeedEffOpen] = useState(false);
  const [rainPromptOpen, setRainPromptOpen] = useState(false);
  const [bundleFillOpen, setBundleFillOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  // 비 오는 날에만 구할 수 있는, 아직 필요한 번들 품목(중복 id 제거)
  const rainBundleItems = (() => {
    const seen = new Set<string>();
    const out: { id: string; name: string }[] = [];
    for (const b of BUNDLES) {
      const done = b.items.filter(
        (i) => bundleItemsDone[bundleItemKey(b.id, i.id)],
      ).length;
      if (done >= b.needed) continue;
      for (const i of b.items) {
        if (!i.rainy) continue;
        if (bundleItemsDone[bundleItemKey(b.id, i.id)]) continue;
        if (seen.has(i.id)) continue;
        seen.add(i.id);
        out.push({ id: i.id, name: t(i.nameKey) });
      }
    }
    return out;
  })();

  const tomorrow = addDays(currentDate, 1);
  const tomorrowYd = toYearDay(tomorrow);
  const rainTomorrow = !!rainDays[tomorrowYd];

  const dateLabel = (d: SDate) =>
    t("addTask.dateLabel", { season: t(`seasons.${d.season}`), day: d.day });

  const ccCompleted = BUNDLES.every(
    (b) =>
      b.items.filter((i) => bundleItemsDone[bundleItemKey(b.id, i.id)]).length >=
      b.needed,
  );
  const wateringPickup = toolPickup(currentDate, ccCompleted);

  const toggleRainTomorrow = () => {
    const next = !rainTomorrow;
    setRainDay(tomorrowYd, next);
    if (next && wateringCanUpgrades < MAX_WATERING_CAN_UPGRADES) {
      setRainPromptOpen(true);
    }
  };

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

  // 메모 삭제: 작물 관련(씨앗 심기) 메모는 팝업, 그 외는 즉시 삭제
  const onMemoDelete = (m: { id: string; cropId?: string }) =>
    m.cropId
      ? () => setDeleteTarget({ memoId: m.id, cropIds: [m.cropId!] })
      : () => deleteMemo(m.id);

  // 한 날짜의 이벤트·리마인더·메모를 하나의 체크리스트로 합친다.
  const buildRows = (date: SDate): TaskRow[] => {
    const yd = toYearDay(date);
    const isRain = !!rainDays[yd];
    const rows: TaskRow[] = [];

    // 고정 이벤트. 작물 심기 마감일이 휴무일이면 그날은 숨기고 전날로 옮긴다.
    for (const e of filterEvents(getEventsOn(date), eventFilters)) {
      if (e.type === "cropDeadline" && festivalBlocksOn(date)) continue;
      const key = `${yd}:event-${e.type}-${e.refId}`;
      rows.push({
        key,
        orderKey: `event:${e.type}`,
        icon: <EventIcon event={e} size={16} />,
        label: fixedLabel(e),
        rightBadge:
          e.type === "birthday" ? (
            <ActionChip
              onClick={() => openGifts(e.refId)}
              label={t("gift.viewGifts")}
            />
          ) : undefined,
        done: !!taskDone[key],
        onToggle: () => toggleTask(key),
      });
    }
    // 내일이 마감일인데 내일이 휴무면 오늘 미리 표시(+ 안내)
    const tom = addDays(date, 1);
    if (festivalBlocksOn(tom)) {
      for (const e of filterEvents(getEventsOn(tom), eventFilters)) {
        if (e.type !== "cropDeadline") continue;
        const key = `${yd}:deadline-shift-${e.refId}`;
        rows.push({
          key,
          orderKey: "event:cropDeadline",
          icon: <EventIcon event={e} size={16} />,
          label: `${fixedLabel(e)} ${t("dashboard.deadlineShift")}`,
          done: !!taskDone[key],
          onToggle: () => toggleTask(key),
        });
      }
    }

    for (const r of getActiveReminders(date, reminderToggles)) {
      const key = `${yd}:reminder-${r.id}`;
      let rightBadge = reminderBadge(r.badge);
      if (r.id === "communityCenterBundle") {
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
      // 소스의 여왕 재방송은 신규 방영과 함께 움직이도록 같은 순서 키 사용
      const orderKey =
        r.id === "queenOfSauceRerun"
          ? "reminder:queenOfSauceNew"
          : `reminder:${r.id}`;
      rows.push({
        key,
        orderKey,
        icon: <ReminderIcon id={r.id} size={16} />,
        label,
        rightBadge,
        done: !!taskDone[key],
        onToggle: () => toggleTask(key),
      });
    }

    // 메모: 작물 물주기는 한 줄로 묶고, 나머지는 개별 표시.
    const wateringMemos: typeof memos = [];
    for (const m of memosOn(date)) {
      if (m.category === "buySeed") {
        if (!reminderToggles.buySeeds) continue;
        rows.push({
          key: `memo-${m.id}`,
          orderKey: "reminder:buySeeds",
          icon: <ReminderIcon id="buySeeds" size={16} />,
          label: m.text,
          done: m.done,
          onToggle: () => toggleDone(m.id),
          onDelete: onMemoDelete(m),
        });
        continue;
      }
      if (m.category && !memoCategoryToggles[m.category]) continue;
      if (m.category === "watering") {
        if (isRain) continue;
        wateringMemos.push(m);
        continue;
      }
      const icon =
        m.category === "harvest" && m.cropId ? (
          <PixelIcon src={`/icons/seeds/${m.cropId}.png`} />
        ) : m.category === "eatFood" ? (
          <PixelIcon src="/icons/ui/food.png" />
        ) : m.category === "misc" ? (
          <PixelIcon src="/icons/addTask/museum.png" />
        ) : (
          <PixelIcon src="/icons/ui/note.png" />
        );
      rows.push({
        key: `memo-${m.id}`,
        orderKey: `memo:${m.category ?? "machine"}`,
        icon,
        label: m.text,
        done: m.done,
        onToggle: () => toggleDone(m.id),
        onDelete: onMemoDelete(m),
      });
    }
    // 작물 물주기 묶음: "작물 물주기(작물A, 작물B)" — 같은 작물은 한 번만
    if (wateringMemos.length > 0) {
      const names = [
        ...new Set(
          wateringMemos.map((m) => (m.cropId ? t(`crops.${m.cropId}`) : m.text)),
        ),
      ];
      const cropIds = [
        ...new Set(
          wateringMemos
            .map((m) => m.cropId)
            .filter((id): id is string => !!id),
        ),
      ];
      const ids = wateringMemos.map((m) => m.id);
      const allDone = wateringMemos.every((m) => m.done);
      rows.push({
        key: `watering-${yd}`,
        orderKey: "memo:watering",
        icon: <PixelIcon src="/icons/reminders/watering.png" />,
        label: `${t("dashboard.wateringGroup")}(${names.join(", ")})`,
        done: allDone,
        onToggle: () => setDoneMany(ids, !allDone),
        onDelete: () => setDeleteTarget({ cropIds }),
      });
    }

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

      {/* 아침에 확인한 날씨(내일 비 예보) 토글 — todolist 박스 위 */}
      <div className="flex justify-end">
        <button
          onClick={toggleRainTomorrow}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-semibold ${
            rainTomorrow
              ? "border-[#5b8fb0] bg-[#5b8fb0] text-white"
              : "border-[var(--sv-border)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
          }`}
        >
          <PixelIcon src="/icons/ui/rain.png" size={16} />
          {t("dashboard.rainForecast")}
        </button>
      </div>

      {/* 통합 To Do List: 오늘 항목 + 점선 + 내일 항목 */}
      <div className="rounded-xl border-2 border-[var(--sv-accent)] bg-[var(--sv-panel)] p-4 shadow-sm">
        <h2 className="mb-2 text-sm font-bold">{t("dashboard.todoList")}</h2>
        <TaskList
          rows={todayRows}
          emptyText={t("dashboard.noTasks")}
          deleteLabel={t("memo.delete")}
        />
        {tomorrowRows.length > 0 && (
          <>
            <div className="my-3 border-t border-dashed border-[var(--sv-border)]" />
            <TaskList
              rows={tomorrowRows}
              emptyText={t("dashboard.noTasks")}
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

      {/* 관련 할 일 일괄 삭제 팝업(작물별 카테고리 삭제, 남은 항목 있으면 유지) */}
      {deleteTarget && (
        <DeleteTaskDialog
          target={deleteTarget}
          memos={memos}
          onClose={() => setDeleteTarget(null)}
          deleteMemo={deleteMemo}
          deleteMemos={deleteMemos}
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

          {/* 비 오는 날에만 구할 수 있는 번들 품목(이미지 포함) */}
          {rainBundleItems.length > 0 && (
            <div className="mb-3 rounded-md bg-[var(--sv-bg)] p-3">
              <p className="mb-2 flex items-center gap-1 text-xs font-semibold">
                <PixelIcon src="/icons/ui/rain.png" size={14} />
                {t("dashboard.rainBundleItems")}
              </p>
              <ul className="mb-2 flex flex-wrap gap-x-3 gap-y-1">
                {rainBundleItems.map((i) => (
                  <li key={i.id} className="flex items-center gap-1 text-sm">
                    <PixelIcon src={`/icons/bundleItems/${i.id}.png`} size={16} />
                    {i.name}
                  </li>
                ))}
              </ul>
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

// 박스 안에 ✕가 있는 삭제 버튼 [x]
function DeleteBtn({
  onClick,
  label,
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label ?? "삭제"}
      className="flex size-6 shrink-0 items-center justify-center rounded border border-[#e23b3b] text-xs font-bold text-[#e23b3b] hover:bg-[#fbeaea]"
    >
      ✕
    </button>
  );
}

const DELETE_CATS = ["watering", "harvest", "buySeed"] as const;

// 관련 할 일 삭제 팝업: 작물별로 카테고리(물주기/수확/씨앗구매) 전체 삭제.
// 카테고리를 지워도 닫지 않고, 삭제 가능한 항목이 남으면 계속 표시한다.
function DeleteTaskDialog({
  target,
  memos,
  onClose,
  deleteMemo,
  deleteMemos,
}: {
  target: DeleteTarget;
  memos: Memo[];
  onClose: () => void;
  deleteMemo: (id: string) => void;
  deleteMemos: (ids: string[]) => void;
}) {
  const t = useTranslations();
  const idsFor = (cropId: string, cat: string) =>
    memos.filter((m) => m.category === cat && m.cropId === cropId).map((m) => m.id);

  const singleExists =
    !!target.memoId && memos.some((m) => m.id === target.memoId);
  const cropSections = target.cropIds
    .map((cropId) => ({
      cropId,
      cats: DELETE_CATS.map((cat) => ({ cat, ids: idsFor(cropId, cat) })).filter(
        (s) => s.ids.length > 0,
      ),
    }))
    .filter((c) => c.cats.length > 0);

  // 더 삭제할 게 없으면 자동으로 닫기
  const nothingLeft = !singleExists && cropSections.length === 0;
  useEffect(() => {
    if (nothingLeft) onClose();
  }, [nothingLeft, onClose]);
  if (nothingLeft) return null;

  return (
    <Modal title={t("dashboard.deleteTitle")} onClose={onClose}>
      <p className="mb-3 text-sm text-[var(--sv-ink-muted)]">
        {t("dashboard.deleteBody")}
      </p>
      <div className="flex flex-col gap-3">
        {singleExists && (
          <div className="flex items-center justify-between gap-2 rounded-md bg-[var(--sv-bg)] px-2 py-1.5">
            <span className="text-sm">{t("dashboard.deleteOne")}</span>
            <DeleteBtn onClick={() => deleteMemo(target.memoId!)} />
          </div>
        )}
        {cropSections.map((c) => {
          const allIds = c.cats.flatMap((s) => s.ids);
          return (
            <div
              key={c.cropId}
              className="rounded-md border border-[var(--sv-border)] p-2"
            >
              {/* 작물명 + 이 작물 관련 전체 삭제 [x] */}
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">
                  {t(`crops.${c.cropId}`)}
                </span>
                <DeleteBtn
                  onClick={() => deleteMemos(allIds)}
                  label={t("dashboard.deleteAllCrop")}
                />
              </div>
              {/* 카테고리별 전체 삭제 [x] */}
              <div className="flex flex-col gap-1">
                {c.cats.map((s) => (
                  <div
                    key={s.cat}
                    className="flex items-center justify-between gap-2 rounded bg-[var(--sv-bg)] px-2 py-1"
                  >
                    <span className="text-xs">
                      {t("dashboard.deleteAllCat", {
                        cat: t(`dashboard.deleteCat_${s.cat}`),
                        count: s.ids.length,
                      })}
                    </span>
                    <DeleteBtn onClick={() => deleteMemos(s.ids)} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <button
          onClick={onClose}
          className="mt-1 rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-sm hover:bg-[var(--sv-bg)]"
        >
          {t("dashboard.rainPromptSkip")}
        </button>
      </div>
    </Modal>
  );
}

// 왼쪽 체크박스 + 완료 시 줄긋기·희미 처리. 모든 항목(이벤트/리마인더/메모) 공통 렌더.
function TaskList({
  rows,
  emptyText,
  deleteLabel,
  disabled = false,
}: {
  rows: TaskRow[];
  emptyText: string;
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
              <span>{row.label}</span>
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
