// 목공 작업실(로빈) 건물 주문 가능일 + 완성 예정일 계산.
// 출처: progress/목공 작업실 - Stardew Valley Wiki.html, progress/가게-일정표-정리.md
// 주문 카운터 휴무: ① 화요일(비 오는 날은 영업하나 날씨 미정 → 휴무로 간주) ② 축제일 ③ 여름 18일(로빈 검진)
// 건설: 주문 다음날부터 시작, 축제일에는 로빈이 작업하지 않아 그만큼 지연. 오두막·배송 상자는 즉시.

import { addDays, getWeekday, type SDate } from "@/lib/calendar";
import { getEventsOn } from "@/lib/events";
import type { BuildingDef } from "@/data/buildings";

export type CarpenterClosure = "tuesday" | "festival" | "checkup";

function isFestival(date: SDate): boolean {
  return getEventsOn(date).some((e) => e.type === "festival");
}

// 해당 날짜에 목공 작업실(주문)이 닫혀 있으면 사유, 열려 있으면 null.
export function carpenterClosureOn(date: SDate): CarpenterClosure | null {
  if (isFestival(date)) return "festival";
  if (date.season === "summer" && date.day === 18) return "checkup"; // 로빈 병원 검진
  if (getWeekday(date.day) === "tue") return "tuesday";
  return null;
}

export interface BuildPlan {
  order: SDate; // 실제 주문 가능일(요청일이 휴무면 다음 영업일)
  orderClosure: CarpenterClosure | null; // 요청일이 휴무라 이동했으면 그 사유
  ready: SDate; // 완성(사용 가능) 예정일
}

const MAX_LOOK = 60;

// 요청일(requestDate)에 건물 건설을 계획했을 때의 주문일·완성일.
export function planBuilding(requestDate: SDate, def: BuildingDef): BuildPlan {
  // 1) 주문 가능일: 요청일이 휴무면 다음 영업일로 이동
  const orderClosure = carpenterClosureOn(requestDate);
  let order = requestDate;
  if (orderClosure) {
    let d = addDays(requestDate, 1);
    for (let i = 0; i < MAX_LOOK; i++) {
      if (!carpenterClosureOn(d)) break;
      d = addDays(d, 1);
    }
    order = d;
  }

  // 2) 즉시 건물(오두막·배송 상자)은 주문 당일 완성
  if (def.buildDays === 0) {
    return { order, orderClosure, ready: order };
  }

  // 3) 주문 다음날부터 buildDays만큼 작업, 축제일은 건너뜀. 완성일 = 마지막 작업일 다음날.
  let cur = addDays(order, 1);
  let lastWorkDay = cur;
  let remaining = def.buildDays;
  for (let i = 0; i < MAX_LOOK && remaining > 0; i++) {
    if (!isFestival(cur)) {
      remaining--;
      lastWorkDay = cur;
    }
    if (remaining > 0) cur = addDays(cur, 1);
  }
  return { order, orderClosure, ready: addDays(lastWorkDay, 1) };
}
