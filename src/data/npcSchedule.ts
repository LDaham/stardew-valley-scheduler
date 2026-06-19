import data from "./npcSchedule.json";
import type { Season } from "@/lib/calendar";
import type { Weekday } from "@/lib/calendar";

// NPC 일정(위치). 위키 일정표에서 추출: 계절 → 조건(요일 묶음/비) → 시각·장소.
// 출처: 각 주민 위키 페이지(progress/<주민> - Stardew Valley Wiki.html, CC BY-NC-SA 3.0).
// 파일럿: 일부 주민만 수록. days=적용 요일, rain=비 오는 날 전용 변형.
export interface ScheduleRow {
  time: string; // 위키 원문(예: "오전 9:00")
  place: string; // 위키 원문 장소 설명(한국어)
}
export interface ScheduleVariant {
  season: Season;
  days: Weekday[]; // 적용 요일(비/보통 변형은 빈 배열)
  rain: boolean; // 비 오는 날 전용
  isDefault: boolean; // "보통 일정"(특정 요일 변형이 없는 날의 기본)
  rows: ScheduleRow[];
}

const schedules = data as Record<string, ScheduleVariant[]>;

// 일정 데이터가 있는 주민 id(목록 표시 순서는 BirthdayGift와 동일하게 호출부에서 정렬).
export const NPC_SCHEDULE_IDS: string[] = Object.keys(schedules);

export function getNpcSchedule(id: string): ScheduleVariant[] {
  return schedules[id] ?? [];
}

// 계절·요일·날씨에 맞는 변형 선택.
// 우선순위: (비 선택 시) 비 전용 변형 > 해당 요일 변형 > 보통 일정.
export function pickVariant(
  id: string,
  season: Season,
  day: Weekday,
  rainy: boolean,
): ScheduleVariant | null {
  const cands = getNpcSchedule(id).filter((v) => v.season === season);
  if (rainy) {
    const rain = cands.find((v) => v.rain);
    if (rain) return rain;
  }
  const dayVar = cands.find(
    (v) => !v.rain && !v.isDefault && v.days.includes(day),
  );
  if (dayVar) return dayVar;
  return cands.find((v) => v.isDefault && !v.rain) ?? null;
}
