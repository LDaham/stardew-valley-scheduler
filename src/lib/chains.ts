// 완료 시 후속 할 일(체인) 생성 로직. 표시 텍스트는 메모에 미리 구워져 있으므로
// 여기서는 날짜·조건만 계산한다(스토어에서 i18n t() 사용 불가).

import { addDays, type SDate } from "@/lib/calendar";
import { CROPS } from "@/data/game-data";
import { computeHarvest } from "@/lib/growth";
import { toolPickup } from "@/lib/blacksmith";
import {
  FRUIT_TREES,
  FRUIT_TREE_MATURE_DAYS,
  FRUIT_HARVEST_INTERVAL,
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

// 완료된 메모로부터 생성할 후속 메모들. today=완료한 날(현재 날짜), cc=마을회관 복구 여부.
export function chainSpawn(memo: Memo, today: SDate, cc: boolean): NewMemo[] {
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
    const tree = FRUIT_TREES.find((f) => f.id === memo.cropId);
    if (!tree) return [];
    const mature = addDays(today, FRUIT_TREE_MATURE_DAYS);
    const out: NewMemo[] = [];
    const push = (d: SDate) =>
      out.push({
        season: d.season,
        day: d.day,
        text: chain.harvestText,
        reminderDaysBefore: 0,
        category: "fruit",
        cropId: memo.cropId,
        greenhouse: memo.greenhouse,
        groupId: memo.groupId,
      });
    if (memo.greenhouse) {
      for (let i = 0; i <= 108; i += FRUIT_HARVEST_INTERVAL) push(addDays(mature, i));
    } else {
      const startDay = mature.season === tree.season ? mature.day : 1;
      for (let day = startDay; day <= 28; day += FRUIT_HARVEST_INTERVAL)
        push({ season: tree.season, day });
    }
    return out;
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
