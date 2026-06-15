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
import type { Memo } from "@/types/schedule";

// 새로 추가할 메모(아직 id/완료/생성시각 없음)
export type NewMemo = Omit<Memo, "id" | "createdAt" | "done">;

// 완료된 메모로부터 생성할 후속 메모들. today=완료한 날(현재 날짜), cc=마을회관 복구 여부.
export function chainSpawn(memo: Memo, today: SDate, cc: boolean): NewMemo[] {
  const chain = memo.chain;
  if (!chain) return [];

  if (chain.kind === "tool") {
    const pk = toolPickup(today, cc).pickup;
    return [
      {
        season: pk.season,
        day: pk.day,
        text: chain.pickupText,
        reminderDaysBefore: 0,
        category: "tool",
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
