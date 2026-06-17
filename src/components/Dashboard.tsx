"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import { addDays, toYearDay, type SDate } from "@/lib/calendar";
import { filterEvents, getEventsOn, type FixedEvent } from "@/lib/events";
import { getActiveReminders, festivalEveOf, type ReminderBadge } from "@/lib/reminders";
import { useSchedule } from "@/components/ScheduleProvider";
import { useGiftDialog } from "@/components/GiftDialogProvider";
import EventIcon from "@/components/EventIcon";
import ReminderIcon from "@/components/ReminderIcon";
import AddTaskDialog from "@/components/AddTaskDialog";
import BundleDialog from "@/components/BundleDialog";
import BundleTrackerBox from "@/components/BundleTrackerBox";
import FishInfoDialog from "@/components/FishInfoDialog";
import MiniCalendarDialog from "@/components/MiniCalendarDialog";
import MyTasksDialog from "@/components/MyTasksDialog";
import SeedEfficiencyDialog from "@/components/SeedEfficiencyDialog";
import Modal from "@/components/Modal";
import TimeIcon from "@/components/TimeIcon";
import PixelIcon from "@/components/PixelIcon";
import { BUNDLES, bundleItemKey } from "@/data/bundles";
import { toolPickup, blacksmithClosureOn } from "@/lib/blacksmith";
import { carpenterClosureOn } from "@/lib/carpenter";
import type { Memo } from "@/types/schedule";
import type { ReactNode } from "react";

// 물뿌리개 업그레이드 제안을 멈출 누적 횟수(기본→구리→강철→황금→이리듐 = 4단계)
const MAX_WATERING_CAN_UPGRADES = 4;

// 미루기(rollover) 분류
// - 당일만(미루기 없음): 수확일 음식(수확 전에 먹어야 의미 있음)
const NO_ROLLOVER = new Set(["eatFood"]);
// - 자체 계절 끝 만료: 과일 수확·재파종 씨앗 구매(온실 아니면 그 계절 끝나면 사라짐)
const SEASON_EXPIRE = new Set(["fruit", "buySeed"]);
// 작물 생명주기(씨앗 심기·물주기·수확)는 deadlineYearDay로 만료(비온실).
// 그 외(도구·장비·건설·채굴·낚시·정동석 등)는 무기한 → 완료까지 매일 표시(미루기)

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
  logic?: string; // 표시 로직 설명(ⓘ로 펼침, 개발 확인용)
  blocked?: string; // 오늘 해당 가게 휴무로 불가능할 때 사유(빨간색 표시)
  rolled?: boolean; // 이전 날에서 미뤄진 할 일([미뤄짐] 표시)
}

// 삭제 팝업 대상: 특정 메모들(memoIds, 같은 날 묶인 항목) + 관련 작물(cropIds)
interface DeleteTarget {
  memoIds?: string[];
  cropIds: string[];
}

export default function Dashboard() {
  const t = useTranslations();
  const {
    currentDate,
    year,
    goToNextDay,
    goToPrevDay,
    memos,
    setDoneMany,
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
  const [fishInfoOpen, setFishInfoOpen] = useState(false);
  const [miniCalOpen, setMiniCalOpen] = useState(false);
  const [myTasksOpen, setMyTasksOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

  // 게임 시작일(1년째 봄 1일): 전날로 이동 불가
  const atStart =
    year === 1 && currentDate.season === "spring" && currentDate.day === 1;

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
    // 당일에 '업그레이드 맡기기'를 추가(완료하면 수령 일정이 생성됨)
    const toolName = t("tools.wateringCan");
    addMemo({
      season: currentDate.season,
      day: currentDate.day,
      text: t("addTask.toolUpgradeMemo", { tool: toolName }),
      reminderDaysBefore: 0,
      category: "tool",
      toolId: "wateringCan",
      chain: { kind: "tool", pickupText: t("addTask.toolMemo", { tool: toolName }) },
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
        <span className="shrink-0 rounded bg-[#e0b84c] px-1.5 py-0.5 text-[12px] font-semibold text-[#5a4416]">
          {t("dashboard.dDay", { days: badge.days })}
        </span>
      );
    return null;
  };

  // 메모 묶음 삭제: 작물 관련(씨앗 심기) 메모는 팝업, 그 외는 즉시 삭제.
  // list는 같은 날 같은 카테고리·내용으로 묶인 메모들(여러 번 심어 겹친 경우 포함).
  const memoGroupDelete = (list: { id: string; cropId?: string }[]) => {
    const ids = list.map((m) => m.id);
    const cropIds = [
      ...new Set(list.map((m) => m.cropId).filter((id): id is string => !!id)),
    ];
    return cropIds.length > 0
      ? () => setDeleteTarget({ memoIds: ids, cropIds })
      : () => deleteMemos(ids);
  };

  // 그 날짜에 "표시할" 메모 = 미루기 + 만료 규칙 적용.
  // - 당일만 카테고리(물주기·음식): anchor == 오늘일 때만.
  // - 그 외: 생성일(anchor) ≤ 오늘이면 완료/만료 전까지 매일 표시(미루기).
  //   계절 만료 카테고리는 온실이 아니면 그 계절이 지나면 사라짐.
  const activeMemosOn = (date: SDate): Memo[] => {
    const d = toYearDay(date);
    return memos.filter((m) => {
      // 연도 스탬프가 있는 메모(과일나무 연차별 수확)는 그 연도에만 표시
      if (m.year != null && m.year !== year) return false;
      const a = toYearDay({ season: m.season, day: m.day });
      if (m.category && NO_ROLLOVER.has(m.category)) return a === d;
      if (a === d) return true; // 당일은 완료 여부와 무관하게 표시(체크 확인용)
      if (m.done) return false; // 미루기는 미완료만
      if (a > d) return false; // 아직 시작 전
      // 작물 생명주기: 수확 마감(deadlineYearDay)을 넘기면 비온실은 소멸.
      if (m.deadlineYearDay != null && !m.greenhouse && d > m.deadlineYearDay)
        return false;
      // 과일 수확·재파종: 자체 계절 끝 만료(비온실). 묘목 심기(fruitPlant)는 제외.
      if (
        m.category &&
        SEASON_EXPIRE.has(m.category) &&
        !m.greenhouse &&
        m.chain?.kind !== "fruitPlant"
      ) {
        const seasonEnd = toYearDay({ season: m.season, day: 28 });
        if (d > seasonEnd) return false; // 계절 만료
      }
      return true;
    });
  };

  // 가게 일정에 묶인 할 일이 그 날 불가능하면 사유를 반환(아니면 undefined).
  // - tool(도구 업그레이드 맡기기·수령)·misc(정동석 깨기): 대장간 휴무
  // - build(건물 건설 주문): 목공 작업실 휴무
  const blockedReason = (date: SDate, category?: string): string | undefined => {
    if (category === "tool" || category === "misc") {
      const c = blacksmithClosureOn(date, ccCompleted);
      return c
        ? t("dashboard.blockedToday", { reason: t(`blacksmith.${c}`) })
        : undefined;
    }
    if (category === "build") {
      const c = carpenterClosureOn(date);
      return c
        ? t("dashboard.blockedToday", { reason: t(`carpenter.${c}`) })
        : undefined;
    }
    return undefined;
  };

  // 한 날짜의 항목을 정보(info)와 할 일(todo)로 나눠 만든다.
  const buildRows = (date: SDate): { info: TaskRow[]; todo: TaskRow[] } => {
    const yd = toYearDay(date);
    const isRain = !!rainDays[yd];
    const info: TaskRow[] = [];
    const rows: TaskRow[] = [];
    // 메모 anchor가 오늘보다 이전이면 미뤄진 할 일([미뤄짐] 표시).
    const isRolled = (m: Memo) =>
      toYearDay({ season: m.season, day: m.day }) < yd;

    // 고정 이벤트: 축제·작물 마감일은 정보(완료 없음), 생일은 할 일(당일 한정).
    // 작물 마감일은 휴무 여부와 무관하게 항상 원래 날짜에 표시한다.
    for (const e of filterEvents(getEventsOn(date), eventFilters)) {
      const key = `${yd}:event-${e.type}-${e.refId}`;
      if (e.type === "birthday") {
        rows.push({
          key,
          orderKey: `event:${e.type}`,
          icon: <EventIcon event={e} size={16} />,
          label: fixedLabel(e),
          rightBadge: (
            <ActionChip
              onClick={() => openGifts(e.refId)}
              label={t("gift.viewGifts")}
            />
          ),
          done: !!taskDone[key],
          onToggle: () => toggleTask(key),
          logic: t("logic.birthday"),
        });
      } else {
        info.push({
          key,
          orderKey: `event:${e.type}`,
          icon: <EventIcon event={e} size={16} />,
          label: fixedLabel(e),
          done: false,
          onToggle: () => {},
          logic: t(`logic.${e.type}`),
        });
      }
    }

    // 축제 전날: "내일이 축제임을 고려" 안내(상점·NPC·구인 게시판 휴무)
    const eveFest = festivalEveOf(date);
    if (eveFest) {
      info.push({
        key: `${yd}:festivalEve`,
        orderKey: "event:festival",
        icon: <PixelIcon src="/icons/festival/flag.png" size={16} />,
        label: t("dashboard.festivalEveNote", {
          festival: t(`festivals.${eveFest.id}`),
        }),
        done: false,
        onToggle: () => {},
      });
    }

    for (const r of getActiveReminders(date, reminderToggles)) {
      const key = `${yd}:reminder-${r.id}`;
      // 소스의 여왕 재방송: 직전 일요일 신규 방영을 봤으면(체크) 생략.
      if (r.id === "queenOfSauceRerun") {
        const sunYd = toYearDay(addDays(date, -3));
        if (taskDone[`${sunYd}:reminder-queenOfSauceNew`]) continue;
      }
      // 특별 주문: 1년차 가을 2일(화)에 게시판 해금 — 그 전에는 표시 안 함.
      // 해금 후엔 7요일 트리거 + 아래 '그 주 확인 시 숨김'으로 화~일 미루기가 유지된다.
      if (r.id === "specialOrders") {
        const unlockYd = toYearDay({ season: "fall", day: 2 });
        if (year === 1 && yd < unlockYd) continue;
        // 이번 주(월요일~) 이미 확인했으면 그 주 동안 숨김(월요일에 갱신).
        const weekMon = yd - ((yd - 1) % 7);
        let doneEarlier = false;
        for (let dd = weekMon; dd < yd; dd++)
          if (taskDone[`${dd}:reminder-specialOrders`]) {
            doneEarlier = true;
            break;
          }
        if (doneEarlier) continue;
      }
      // 새 계절 알림(씨앗 구매 알림 대체)은 정보로 표시(완료 체크 없음).
      if (r.id === "buySeeds") {
        info.push({
          key,
          orderKey: `reminder:${r.id}`,
          icon: <ReminderIcon id={r.id} size={16} />,
          label: t("reminders.buySeeds.title"),
          rightBadge: (
            <ActionChip
              onClick={() => setSeedEffOpen(true)}
              label={t("seedEfficiency.view")}
            />
          ),
          done: false,
          onToggle: () => {},
          logic: t("logic.newSeason"),
        });
        continue;
      }
      // 마을회관 꾸러미 채우기도 정보로 표시(완료 체크 없음, 꾸러미 창 열기 버튼).
      if (r.id === "communityCenterBundle") {
        info.push({
          key,
          orderKey: `reminder:${r.id}`,
          icon: <ReminderIcon id={r.id} size={16} />,
          label: t("reminders.communityCenterBundle.title"),
          rightBadge: (
            <ActionChip
              onClick={() => setBundleFillOpen(true)}
              label={t("bundle.fill")}
            />
          ),
          done: false,
          onToggle: () => {},
          logic: t("logic.communityCenterBundle"),
        });
        continue;
      }
      let rightBadge = reminderBadge(r.badge);
      // 내일 비 예보 토글 — 날씨·운세 확인 행 오른쪽에 배치
      if (r.id === "weatherFortune") {
        rightBadge = (
          <RainSwitch
            on={rainTomorrow}
            onToggle={toggleRainTomorrow}
            label={t("dashboard.rainForecast")}
          />
        );
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
        label: t(`reminders.${r.id}.title`),
        rightBadge,
        done: !!taskDone[key],
        onToggle: () => toggleTask(key),
        logic: t(`logic.${r.id}`),
      });
    }

    // 메모: 작물 물주기는 한 줄로 묶고, 나머지도 같은 날 같은 카테고리·내용이면
    // 한 번만 표시한다(같은 작물을 여러 번 심어 수확·재파종 등이 겹치는 경우).
    const wateringMemos: typeof memos = [];
    const fruitMemos: typeof memos = [];
    const memoGroups = new Map<string, typeof memos>();
    const memoGroupOrder: string[] = [];
    for (const m of activeMemosOn(date)) {
      // 재파종(buySeed)은 별도 토글 없이 항상 표시. 그 외만 카테고리 토글/그룹 처리.
      if (m.category !== "buySeed") {
        if (m.category && !memoCategoryToggles[m.category]) continue;
        if (m.category === "watering") {
          if (isRain) continue;
          wateringMemos.push(m);
          continue;
        }
        // 과일 수확만 한 줄로 묶는다(물주기와 동일). 묘목 심기(fruitPlant)는 개별 표시.
        if (m.category === "fruit" && m.chain?.kind !== "fruitPlant") {
          fruitMemos.push(m);
          continue;
        }
      }
      const gk = `${m.category ?? ""}|${m.text}`;
      if (!memoGroups.has(gk)) {
        memoGroups.set(gk, []);
        memoGroupOrder.push(gk);
      }
      memoGroups.get(gk)!.push(m);
    }
    for (const gk of memoGroupOrder) {
      const list = memoGroups.get(gk)!;
      const m = list[0];
      const ids = list.map((x) => x.id);
      const allDone = list.every((x) => x.done);
      const onDelete = memoGroupDelete(list);
      if (m.category === "buySeed") {
        rows.push({
          key: `memo-${m.id}`,
          orderKey: "reminder:buySeeds",
          icon: <ReminderIcon id="buySeeds" size={16} />,
          label: m.text,
          done: allDone,
          onToggle: () => setDoneMany(ids, !allDone),
          onDelete,
          logic: t("logic.buySeed"),
          rolled: list.some(isRolled),
        });
        continue;
      }
      const icon =
        (m.category === "harvest" || m.category === "plant") && m.cropId ? (
          <PixelIcon src={`/icons/seeds/${m.cropId}.png`} />
        ) : m.category === "fruit" && m.cropId ? (
          // 개별 표시는 묘목 심기(fruitPlant)뿐 — 열매가 아닌 묘목 이미지로 표시
          <PixelIcon src={`/icons/fruitTrees/saplings/${m.cropId}.png`} />
        ) : m.category === "eatFood" ? (
          <PixelIcon src="/icons/ui/food.png" />
        ) : m.category === "tool" && m.toolId ? (
          // 도구 업그레이드/수령: 업그레이드 등급이 아닌 기본 도구 이미지 표시
          <PixelIcon src={`/icons/tools/${m.toolId}.png`} />
        ) : m.category === "machine" && m.machineId ? (
          // 장비 사용/수령: 해당 장비 이미지 표시
          <PixelIcon src={`/icons/machines/${m.machineId}.png`} />
        ) : m.category === "mining" ? (
          <PixelIcon src="/icons/tools/pickaxe.png" />
        ) : m.category === "fishing" ? (
          <PixelIcon src="/icons/addTask/fishing.png" />
        ) : m.category === "misc" ? (
          <PixelIcon src="/icons/addTask/museum.png" />
        ) : m.category === "build" ? (
          <PixelIcon src="/icons/addTask/build.png" />
        ) : (
          <PixelIcon src="/icons/ui/note.png" />
        );
      rows.push({
        key: `memo-${m.id}`,
        orderKey: `memo:${m.category ?? "machine"}`,
        icon,
        label: m.text,
        // 낚시 메모: 우측에 생선 정보 버튼
        rightBadge:
          m.category === "fishing" ? (
            <ActionChip
              onClick={() => setFishInfoOpen(true)}
              label={t("fish.title")}
            />
          ) : undefined,
        done: allDone,
        onToggle: () => setDoneMany(ids, !allDone),
        onDelete,
        logic: t(`logic.${m.category ?? "machine"}`),
        blocked: blockedReason(date, m.category),
        rolled: list.some(isRolled),
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
        logic: t("logic.watering"),
        rolled: wateringMemos.some(isRolled),
      });
    }
    // 과일 수확 묶음: "과일 수확하기(살구, 체리)" — 같은 나무는 한 번만
    if (fruitMemos.length > 0) {
      const names = [
        ...new Set(
          fruitMemos.map((m) =>
            m.cropId ? t(`fruitTrees.${m.cropId}`) : m.text,
          ),
        ),
      ];
      const cropIds = [
        ...new Set(
          fruitMemos.map((m) => m.cropId).filter((id): id is string => !!id),
        ),
      ];
      const ids = fruitMemos.map((m) => m.id);
      const allDone = fruitMemos.every((m) => m.done);
      rows.push({
        key: `fruit-${yd}`,
        orderKey: "memo:fruit",
        icon: <PixelIcon src="/icons/addTask/fruit.png" />,
        label: `${t("dashboard.fruitGroup")}(${names.join(", ")})`,
        done: allDone,
        onToggle: () => setDoneMany(ids, !allDone),
        onDelete: () => setDeleteTarget({ cropIds }),
        logic: t("logic.fruit"),
        rolled: fruitMemos.some(isRolled),
      });
    }

    const rank = (k: string) => {
      const i = todoOrder.indexOf(k);
      return i < 0 ? Number.MAX_SAFE_INTEGER : i;
    };
    const byRank = (a: TaskRow, b: TaskRow) => rank(a.orderKey) - rank(b.orderKey);
    info.sort(byRank);
    rows.sort(byRank);
    return { info, todo: rows };
  };

  const todayBuilt = buildRows(currentDate);
  const tomorrowBuilt = buildRows(tomorrow);

  return (
    <section className="flex flex-col gap-3">
      {/* 꾸러미 추적 박스(옵션 켜짐 시 날짜 이동 위에 표시) */}
      <BundleTrackerBox />

      {/* 날짜 이동 버튼 (박스 밖) */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={goToPrevDay}
          disabled={atStart}
          className="sv-btn px-3 py-1.5 text-base"
        >
          ◀ {t("dashboard.prevDay")}
        </button>
        <button
          onClick={() => setMiniCalOpen(true)}
          aria-label={t("miniCalendar.title")}
          className="flex items-center gap-2 hover:underline"
        >
          {/* 달력 이미지 = 날짜 수정 가능 표시 */}
          <Image
            src={asset("/icons/ui/calendar.png")}
            alt=""
            width={18}
            height={25}
            unoptimized
            className="shrink-0"
            style={{ imageRendering: "pixelated" }}
          />
          <span className="text-lg font-bold">
            {t("dashboard.dateFull", {
              year,
              season: t(`seasons.${currentDate.season}`),
              day: currentDate.day,
            })}
          </span>
        </button>
        <button onClick={goToNextDay} className="sv-btn px-3 py-1.5 text-base">
          {t("dashboard.nextDay")} ▶
        </button>
      </div>

      {/* 정보(오늘·내일 좌우 분할) → 점선 → 할 일 목록 → 할 일 추가. 비어 있어도 표시. */}
      <div className="sv-box p-4">
        {/* 오늘 정보 / 내일 정보 좌우 분할 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="mb-2 text-base font-bold text-[var(--sv-ink-muted)]">
              {t("dashboard.infoTitle")}
            </h2>
            <TaskList
              rows={todayBuilt.info}
              emptyText={t("dashboard.noInfo")}
              deleteLabel={t("memo.delete")}
              hideCheckbox
            />
          </div>
          <div className="border-l border-dashed border-[var(--sv-border)] pl-4">
            <h2 className="mb-2 text-base font-bold text-[var(--sv-ink-muted)]">
              {t("dashboard.tomorrowInfoTitle")}
            </h2>
            <TaskList
              rows={tomorrowBuilt.info}
              emptyText={t("dashboard.noInfo")}
              deleteLabel={t("memo.delete")}
              hideCheckbox
              disabled
            />
          </div>
        </div>

        <div className="my-3 border-t border-dashed border-[var(--sv-border)]" />

        {/* 할 일 목록 헤더: 좌측 제목, 우측 [추가한 할 일 확인][오늘 할 일 추가] */}
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-bold">{t("dashboard.todoList")}</h2>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setMyTasksOpen(true)}
              className="sv-btn px-3 py-1.5 text-base"
            >
              {t("myTasks.checkButton")}
            </button>
            <button
              onClick={() => setAddTarget("today")}
              className="sv-btn sv-btn-primary px-3 py-1.5 text-base"
            >
              ＋ {t("addTask.titleWithDay", { day: t("dashboard.today") })}
            </button>
          </div>
        </div>
        <TaskList
          rows={todayBuilt.todo}
          emptyText={t("dashboard.noTasks")}
          deleteLabel={t("memo.delete")}
        />
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
          deleteMemos={deleteMemos}
        />
      )}

      {rainPromptOpen && (
        <Modal
          title={t("dashboard.rainPromptTitle")}
          onClose={() => setRainPromptOpen(false)}
        >
          <p className="mb-2 text-base">{t("dashboard.rainPromptBody")}</p>

          {/* 도구 수령일 + 대장간 휴무 경고 */}
          <p className="mb-3 flex items-center gap-1.5 text-sm text-[var(--sv-ink-muted)]">
            <TimeIcon size={14} />
            {t("addTask.pickupPreview", { date: dateLabel(wateringPickup.pickup) })}
          </p>
          {wateringPickup.closure && (
            <p className="mb-3 rounded-md bg-[#fbeaea] px-3 py-2 text-sm font-semibold text-[#b02a2a]">
              ⚠ {t("blacksmith.pickupWarn", {
                ready: dateLabel(wateringPickup.ready),
                reason: t(`blacksmith.${wateringPickup.closure}`),
              })}
            </p>
          )}

          {/* 비 오는 날에만 구할 수 있는 번들 품목(이미지 포함) */}
          {rainBundleItems.length > 0 && (
            <div className="mb-3 rounded-md bg-[var(--sv-bg)] p-3">
              <p className="mb-2 flex items-center gap-1 text-sm font-semibold">
                <PixelIcon src="/icons/ui/rain.png" size={14} />
                {t("dashboard.rainBundleItems")}
              </p>
              <ul className="mb-2 flex flex-wrap gap-x-3 gap-y-1">
                {rainBundleItems.map((i) => (
                  <li key={i.id} className="flex items-center gap-1 text-base">
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
                className="rounded-lg border border-[var(--sv-accent)] px-3 py-1 text-sm font-semibold text-[var(--sv-accent)] hover:bg-[var(--sv-panel)]"
              >
                {t("dashboard.rainBundleOpen")}
              </button>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setRainPromptOpen(false)}
              className="rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-base hover:bg-[var(--sv-bg)]"
            >
              {t("dashboard.rainPromptSkip")}
            </button>
            <button
              onClick={addWateringCanUpgrade}
              className="rounded-lg bg-[var(--sv-accent)] px-4 py-1.5 text-base font-semibold text-white"
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

      {fishInfoOpen && (
        <FishInfoDialog
          season={currentDate.season}
          onClose={() => setFishInfoOpen(false)}
        />
      )}

      {miniCalOpen && (
        <MiniCalendarDialog onClose={() => setMiniCalOpen(false)} />
      )}

      {myTasksOpen && <MyTasksDialog onClose={() => setMyTasksOpen(false)} />}
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
      className="shrink-0 rounded bg-[var(--sv-accent)] px-1.5 py-0.5 text-[12px] font-semibold text-white"
    >
      {label}
    </button>
  );
}

// 내일 비 예보 토글 스위치(날씨·운세 행 우측). 행 체크와 분리.
function RainSwitch({
  on,
  onToggle,
  label,
}: {
  on: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <span className="flex shrink-0 items-center gap-1.5">
      <span className="text-sm text-[var(--sv-ink-muted)]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        title={label}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggle();
        }}
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors ${
          on
            ? "border-[#5b8fb0] bg-[#5b8fb0]"
            : "border-[var(--sv-border)] bg-[var(--sv-bg)]"
        }`}
      >
        <span
          className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    </span>
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
      className="flex size-6 shrink-0 items-center justify-center rounded border border-[#e23b3b] text-sm font-bold text-[#e23b3b] hover:bg-[#fbeaea]"
    >
      ✕
    </button>
  );
}

// 씨앗 심기·과일나무 한 번에서 파생되는 할 일들(같은 작물·나무). 삭제 창에서 묶어 관리한다.
const DELETE_CATS = ["plant", "watering", "eatFood", "harvest", "buySeed", "fruit"] as const;

// 관련 할 일 삭제 팝업: 작물별로 카테고리(물주기/수확/씨앗구매) 전체 삭제.
// 카테고리를 지워도 닫지 않고, 삭제 가능한 항목이 남으면 계속 표시한다.
function DeleteTaskDialog({
  target,
  memos,
  onClose,
  deleteMemos,
}: {
  target: DeleteTarget;
  memos: Memo[];
  onClose: () => void;
  deleteMemos: (ids: string[]) => void;
}) {
  const t = useTranslations();
  const idsFor = (cropId: string, cat: string) =>
    memos.filter((m) => m.category === cat && m.cropId === cropId).map((m) => m.id);
  // 과일나무는 fruitTrees, 작물은 crops 네임스페이스로 이름 표시
  const entityName = (cropId: string) =>
    memos.some((m) => m.cropId === cropId && m.category === "fruit")
      ? t(`fruitTrees.${cropId}`)
      : t(`crops.${cropId}`);

  // 아직 남아 있는(삭제 가능한) 단일 항목 id들
  const singleIds = (target.memoIds ?? []).filter((id) =>
    memos.some((m) => m.id === id),
  );
  const singleExists = singleIds.length > 0;
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
      <p className="mb-3 text-base text-[var(--sv-ink-muted)]">
        {t("dashboard.deleteBody")}
      </p>
      <div className="flex flex-col gap-3">
        {singleExists && (
          <div className="flex items-center justify-between gap-2 rounded-md bg-[var(--sv-bg)] px-2 py-1.5">
            <span className="text-base">{t("dashboard.deleteOne")}</span>
            <DeleteBtn onClick={() => deleteMemos(singleIds)} />
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
                <span className="text-base font-semibold">
                  {entityName(c.cropId)}
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
                    <span className="text-sm">
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
          className="mt-1 rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-base hover:bg-[var(--sv-bg)]"
        >
          {t("dashboard.rainPromptSkip")}
        </button>
      </div>
    </Modal>
  );
}

// 왼쪽 체크박스 + 완료 시 줄긋기·희미 처리. 모든 항목(이벤트/리마인더/메모) 공통 렌더.
// hideCheckbox=정보(info) 항목(완료 표시 없음). ⓘ로 표시 로직 펼침.
function TaskList({
  rows,
  emptyText,
  deleteLabel,
  disabled = false,
  hideCheckbox = false,
}: {
  rows: TaskRow[];
  emptyText: string;
  deleteLabel: string;
  disabled?: boolean;
  hideCheckbox?: boolean;
}) {
  const t = useTranslations();
  const [openLogic, setOpenLogic] = useState<Set<string>>(new Set());
  const toggleLogic = (key: string) =>
    setOpenLogic((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  if (rows.length === 0) {
    return <p className="text-base text-[var(--sv-ink-muted)]">{emptyText}</p>;
  }
  return (
    <ul className="flex flex-col gap-1">
      {rows.map((row) => (
        <li key={row.key}>
          <div className="flex items-center gap-2 rounded-md bg-[var(--sv-bg)] px-2 py-1.5 text-base">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {!hideCheckbox && (
                <input
                  type="checkbox"
                  checked={row.done}
                  onChange={row.onToggle}
                  disabled={disabled}
                  aria-label={row.label}
                  className="size-4 shrink-0 accent-[var(--sv-accent)] disabled:opacity-50"
                />
              )}
              <span
                className={`flex flex-1 items-center gap-1.5 ${
                  row.done
                    ? "text-[var(--sv-ink-muted)] line-through"
                    : row.blocked
                      ? "font-semibold text-[#e23b3b]"
                      : ""
                }`}
              >
                {row.icon}
                <span>{row.label}</span>
                {row.rolled && !row.done && (
                  <span className="shrink-0 rounded bg-[#e0b84c] px-1.5 py-0.5 text-[12px] font-semibold text-[#5a4416]">
                    {t("dashboard.rolled")}
                  </span>
                )}
              </span>
            </div>
            {row.rightBadge}
            {row.logic && (
              <button
                type="button"
                onClick={() => toggleLogic(row.key)}
                aria-label="표시 로직"
                className="shrink-0 text-sm font-bold text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
              >
                ⓘ
              </button>
            )}
            {row.onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  row.onDelete!();
                }}
                aria-label={deleteLabel}
                className="shrink-0 text-base font-bold text-[#e23b3b] hover:text-[#b02a2a]"
              >
                ✕
              </button>
            )}
          </div>
          {row.blocked && !row.done && (
            <p className="mx-2 mb-1 mt-0.5 rounded bg-[#fbeaea] px-2 py-1 text-[13px] font-semibold leading-snug text-[#b02a2a]">
              ⚠ {row.blocked}
            </p>
          )}
          {row.logic && openLogic.has(row.key) && (
            <p className="mx-2 mb-1 mt-0.5 rounded bg-[var(--sv-bg)] px-2 py-1 text-[13px] leading-snug text-[var(--sv-ink-muted)]">
              {row.logic}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
