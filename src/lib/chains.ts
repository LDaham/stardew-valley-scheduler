// 완료 시 후속 할 일(체인) 생성 로직. 표시 텍스트는 메모에 미리 구워져 있으므로
// 여기서는 날짜·조건만 계산한다(스토어에서 i18n t() 사용 불가).

import {
  addDays,
  toAbsDay,
  fromAbsDay,
  DAYS_PER_YEAR,
  type SDate,
} from "@/lib/calendar";
import { CROPS } from "@/data/game-data";
import { computeHarvest } from "@/lib/growth";
import { toolPickup } from "@/lib/blacksmith";
import {
  FRUIT_TREES,
  FRUIT_TREE_MATURE_DAYS,
  FRUIT_HARVEST_INTERVAL,
  type FruitTreeDef,
} from "@/data/fruitTrees";
import type { Memo, MemoChain } from "@/types/schedule";

// 새로 추가할 메모(아직 id/완료/생성시각 없음)
export type NewMemo = Omit<Memo, "id" | "createdAt" | "done">;

// 작물 물주기 메모 1건 생성(부모의 작물·온실·마감 정보를 그대로 물려준다).
function cropWaterMemo(
  date: SDate,
  memo: Memo,
  chain: Extract<MemoChain, { kind: "crop" }>,
  remaining: number,
): NewMemo {
  return {
    season: date.season,
    day: date.day,
    text: chain.waterText,
    reminderDaysBefore: 0,
    category: "watering",
    cropId: chain.cropId,
    greenhouse: memo.greenhouse,
    groupId: memo.groupId,
    deadlineYearDay: memo.deadlineYearDay,
    chain: { ...chain, stage: "water", remaining },
  };
}

// 수확(+선택 시 수확일 음식) 메모 생성. 재파종 작물이면 수확에 replant 체인을 단다.
function cropHarvestMemos(
  date: SDate,
  memo: Memo,
  chain: Extract<MemoChain, { kind: "crop" }>,
): NewMemo[] {
  const harvest: NewMemo = {
    season: date.season,
    day: date.day,
    text: chain.harvestText,
    reminderDaysBefore: 0,
    category: "harvest",
    cropId: chain.cropId,
    greenhouse: memo.greenhouse,
    groupId: memo.groupId,
    deadlineYearDay: memo.deadlineYearDay,
  };
  const crop = CROPS.find((c) => c.id === chain.cropId);
  if (crop?.regrowDays) {
    // 재수확 작물: 수확 완료 시 재성장 물주기(regrowDays회)를 거쳐 다시 수확(반복).
    // 비온실은 deadlineYearDay로, 온실은 무기한 반복.
    harvest.chain = { ...chain, stage: "regrow", remaining: crop.regrowDays };
  } else if (chain.replant) {
    // 재수확 작물이 아니고 재파종 선택 시 수확 완료 → 씨앗 구매(재파종) 생성
    harvest.chain = { kind: "replant", buySeedText: chain.buySeedText };
  }
  const out: NewMemo[] = [harvest];
  if (chain.eatFood) {
    out.push({
      season: date.season,
      day: date.day,
      text: chain.eatFoodText,
      reminderDaysBefore: 0,
      category: "eatFood",
      cropId: chain.cropId,
      greenhouse: memo.greenhouse,
      groupId: memo.groupId,
    });
  }
  return out;
}

// 과일나무 수확 공통 정보(텍스트·작물·온실·묶음)
interface FruitBatchBase {
  text: string;
  cropId: string;
  greenhouse: boolean;
  groupId?: string;
}

// 수확 메모 1건(특정 연도 스탬프)
function fruitHarvestMemo(
  date: SDate,
  year: number,
  base: FruitBatchBase,
): NewMemo {
  return {
    season: date.season,
    day: date.day,
    text: base.text,
    reminderDaysBefore: 0,
    category: "fruit",
    cropId: base.cropId,
    greenhouse: base.greenhouse,
    groupId: base.groupId,
    year,
  };
}

// 비온실 한 해 배치: 나무 계절 동안만. 매일 1개씩 최대 3개 보관 → 3개 모이는 시점부터 3일 간격.
// absMature 이전(미성숙)에는 생성하지 않는다(첫 결실 연도엔 성숙 보정, 이후 연도엔 absMature=0이라
// 계절 3일째부터 시작). 그 계절에 열매를 못 맺으면 빈 배열 → 호출부가 다음 연도를 탐색.
export function nonGreenhouseFruitBatch(
  tree: FruitTreeDef,
  absMature: number,
  year: number,
  base: FruitBatchBase,
): NewMemo[] {
  const seasonStart = toAbsDay({ season: tree.season, day: 1 }, year);
  const seasonEnd = seasonStart + 27; // 그 계절 28일
  const firstHarvest = Math.max(seasonStart, absMature) + 2; // 3개 누적 시점
  const out: NewMemo[] = [];
  for (let abs = firstHarvest; abs <= seasonEnd; abs += FRUIT_HARVEST_INTERVAL)
    out.push(fruitHarvestMemo(fromAbsDay(abs).date, year, base));
  return out;
}

// 온실 한 해 배치: 연중. anchorAbs(첫 3개 수확 절대일)와 같은 3일 주기 위상으로 year 범위만 생성.
export function greenhouseFruitBatch(
  anchorAbs: number,
  year: number,
  base: FruitBatchBase,
): NewMemo[] {
  const yearStart = (year - 1) * DAYS_PER_YEAR + 1;
  const yearEnd = year * DAYS_PER_YEAR;
  let start = Math.max(anchorAbs, yearStart);
  const phase =
    (((start - anchorAbs) % FRUIT_HARVEST_INTERVAL) + FRUIT_HARVEST_INTERVAL) %
    FRUIT_HARVEST_INTERVAL;
  if (phase !== 0) start += FRUIT_HARVEST_INTERVAL - phase;
  const out: NewMemo[] = [];
  for (let abs = start; abs <= yearEnd; abs += FRUIT_HARVEST_INTERVAL)
    out.push(fruitHarvestMemo(fromAbsDay(abs).date, year, base));
  return out;
}

// 묘목 심기 완료 시 첫 결실 연도의 수확 배치 생성(year=완료 연도).
function fruitPlantSpawn(
  memo: Memo,
  chain: Extract<MemoChain, { kind: "fruitPlant" }>,
  today: SDate,
  year: number,
): NewMemo[] {
  const tree = FRUIT_TREES.find((f) => f.id === memo.cropId);
  if (!tree || !memo.cropId) return [];
  const base: FruitBatchBase = {
    text: chain.harvestText,
    cropId: memo.cropId,
    greenhouse: !!memo.greenhouse,
    groupId: memo.groupId,
  };
  const absComp = toAbsDay(today, year);
  // 성숙(+28)에 첫 열매 1개, +2일(=+30)에 3개 누적 → 그때부터 수확 알림.
  if (memo.greenhouse) {
    const anchor = absComp + FRUIT_TREE_MATURE_DAYS + 2;
    const firstYear = Math.floor((anchor - 1) / DAYS_PER_YEAR) + 1;
    return greenhouseFruitBatch(anchor, firstYear, base);
  }
  // 비온실: 성숙을 고려한 첫 결실 연도의 배치만(이후 연도는 연도 이동 시 보충).
  const absMature = absComp + FRUIT_TREE_MATURE_DAYS;
  for (let y = year; y <= year + 2; y++) {
    const batch = nonGreenhouseFruitBatch(tree, absMature, y, base);
    if (batch.length) return batch;
  }
  return [];
}

// 연도 이동 시: 반복 설정된 과일나무에 targetYear 수확 배치가 없으면 생성.
// 첫 결실 연도·온실 주기는 기존 수확 메모(같은 groupId, 연도 스탬프)에서 역산하므로
// 묘목 심기 메모에 별도 데이터를 저장하지 않는다. 같은 연도 중복 생성하지 않음(idempotent).
export function spawnYearlyFruitHarvests(
  memos: Memo[],
  targetYear: number,
): NewMemo[] {
  const out: NewMemo[] = [];
  for (const p of memos) {
    if (p.chain?.kind !== "fruitPlant" || !p.chain.repeatYearly) continue;
    if (!p.spawned || !p.groupId || !p.cropId) continue;
    const tree = FRUIT_TREES.find((f) => f.id === p.cropId);
    if (!tree) continue;
    const existing = memos.filter(
      (m) =>
        m.category === "fruit" &&
        !m.chain &&
        m.groupId === p.groupId &&
        m.year != null,
    );
    if (existing.length === 0) continue; // 첫 배치 없음(미완료/삭제)
    const years = existing.map((m) => m.year!);
    const firstYear = Math.min(...years);
    if (targetYear <= firstYear || years.includes(targetYear)) continue;
    const base: FruitBatchBase = {
      text: p.chain.harvestText,
      cropId: p.cropId,
      greenhouse: !!p.greenhouse,
      groupId: p.groupId,
    };
    if (p.greenhouse) {
      const anchorAbs = Math.min(
        ...existing.map((m) =>
          toAbsDay({ season: m.season, day: m.day }, m.year!),
        ),
      );
      out.push(...greenhouseFruitBatch(anchorAbs, targetYear, base));
    } else {
      out.push(...nonGreenhouseFruitBatch(tree, 0, targetYear, base));
    }
  }
  return out;
}

// 완료된 메모로부터 생성할 후속 메모들. today=완료한 날(현재 날짜), cc=마을회관 복구 여부, year=완료 연도.
export function chainSpawn(
  memo: Memo,
  today: SDate,
  cc: boolean,
  year: number,
): NewMemo[] {
  const chain = memo.chain;
  if (!chain) return [];

  if (chain.kind === "crop") {
    if (chain.stage === "plant") {
      // 스프링클러(noWatering): 물주기 없이 수확을 +K일에 생성.
      if (chain.noWatering)
        return cropHarvestMemos(addDays(today, chain.remaining), memo, chain);
      // 일반: 심은 당일에 물주기 #1 생성(remaining=K).
      return [cropWaterMemo(today, memo, chain, chain.remaining)];
    }
    if (chain.stage === "regrow") {
      // 재수확 작물 수확 완료 → 다음 날부터 재성장 물주기(remaining=regrowDays) 시작.
      return [cropWaterMemo(addDays(today, 1), memo, chain, chain.remaining)];
    }
    // stage === "water": 이번 물주기 완료 → 남은 수에 따라 다음 물주기/수확.
    const left = chain.remaining - 1;
    if (left > 0) return [cropWaterMemo(addDays(today, 1), memo, chain, left)];
    return cropHarvestMemos(addDays(today, 1), memo, chain);
  }

  if (chain.kind === "tool") {
    const pk = toolPickup(today, cc).pickup;
    return [
      {
        season: pk.season,
        day: pk.day,
        text: chain.pickupText,
        reminderDaysBefore: 0,
        category: "tool",
        toolId: memo.toolId,
        groupId: memo.groupId,
      },
    ];
  }

  if (chain.kind === "machine") {
    if (chain.role === "use") {
      // 사용 완료 → days일 뒤 수령 생성(수령에도 같은 체인을 달아 반복 가능)
      const d = addDays(today, chain.days);
      return [
        {
          season: d.season,
          day: d.day,
          text: chain.receiveText,
          reminderDaysBefore: 0,
          category: "machine",
          machineId: memo.machineId,
          groupId: memo.groupId,
          chain: { ...chain, role: "receive" },
        },
      ];
    }
    // 수령 완료 → 반복 제작이면 당일에 사용 재생성
    if (!chain.repeat) return [];
    return [
      {
        season: today.season,
        day: today.day,
        text: chain.useText,
        reminderDaysBefore: 0,
        category: "machine",
        machineId: memo.machineId,
        groupId: memo.groupId,
        chain: { ...chain, role: "use" },
      },
    ];
  }

  if (chain.kind === "fruitPlant") {
    return fruitPlantSpawn(memo, chain, today, year);
  }

  // replant: 작물 수확 완료 → 재수확 아님 + 지금 심어도 수확 가능할 때만 씨앗 구매 생성
  const crop = CROPS.find((c) => c.id === memo.cropId);
  if (!crop || crop.regrowDays) return [];
  const willWilt = computeHarvest(today, crop, false, "none").willWilt;
  if (willWilt && !memo.greenhouse) return [];
  return [
    {
      season: today.season,
      day: today.day,
      text: chain.buySeedText,
      reminderDaysBefore: 0,
      category: "buySeed",
      cropId: memo.cropId,
      greenhouse: memo.greenhouse,
      groupId: memo.groupId,
    },
  ];
}
