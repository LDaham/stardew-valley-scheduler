// 클린트 대장간 영업 여부 + 도구 업그레이드 수령일 계산.
// 출처: progress/가게-일정표-정리.md
// 대장간 휴무: ① 축제일(저녁 비잠김 축제 제외) ② 금요일(마을 회관 복구 이후) ③ 겨울 16일(클린트 검진)

import { addDays, getWeekday, isSameDate, type SDate } from "@/lib/calendar";
import { lockingFestivalOn } from "@/lib/events";

const TOOL_UPGRADE_DAYS = 2; // 맡긴 뒤 2일 후 완성(= 3일째 되는 날)

export type BlacksmithClosure = "festival" | "checkup" | "friday";

// 해당 날짜에 대장간이 닫혀 있으면 사유, 열려 있으면 null.
export function blacksmithClosureOn(
  date: SDate,
  ccCompleted: boolean,
): BlacksmithClosure | null {
  // 축제 휴무(사막 축제·송어 시합·오징어 축제·야시장·저녁 축제 등 예외 제외)
  if (lockingFestivalOn(date)) return "festival";
  // 클린트 검진: 겨울 16일
  if (date.season === "winter" && date.day === 16) return "checkup";
  // 마을 회관 복구 이후 금요일 휴무
  if (ccCompleted && getWeekday(date.day) === "fri") return "friday";
  return null;
}

export interface ToolPickup {
  ready: SDate; // 완성 예정일(맡긴 날 +2)
  pickup: SDate; // 실제 수령 가능일(완성일 이후 첫 영업일)
  closure: BlacksmithClosure | null; // 완성일이 휴무면 그 사유
}

// 오늘(dropDate) 도구를 맡겼을 때의 수령 정보.
export function toolPickup(dropDate: SDate, ccCompleted: boolean): ToolPickup {
  const ready = addDays(dropDate, TOOL_UPGRADE_DAYS);
  let d = ready;
  for (let i = 0; i < 14; i++) {
    if (!blacksmithClosureOn(d, ccCompleted)) break;
    d = addDays(d, 1);
  }
  return {
    ready,
    pickup: d,
    closure: isSameDate(d, ready) ? null : blacksmithClosureOn(ready, ccCompleted),
  };
}
