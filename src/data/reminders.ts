import type { Weekday } from "@/lib/calendar";

// 요일/축제 기반 반복 리마인더 정의.
// 표시 문자열은 i18n 키로 분리: reminders.<id>.title / reminders.<id>.detail

export type ReminderId =
  | "weatherFortune"
  | "watering"
  | "animalCare"
  | "farmCave"
  | "hardwood"
  | "travelingCart"
  | "krobusSprinkler"
  | "desertTraderStaircase"
  | "specialOrders"
  | "queenOfSauceNew"
  | "queenOfSauceRerun"
  | "questFestivalWarning";

// 트리거 종류
export type ReminderTrigger =
  // 매일
  | { kind: "daily" }
  // 매주 특정 요일
  | { kind: "weekly"; weekdays: Weekday[] }
  // 특정 축제 daysBefore일 전부터 당일 직전까지 (D-day 카운트다운)
  | { kind: "festivalPrep"; festivalId: string; daysBefore: number }
  // 모든 축제 시작 "전날" (저녁 축제는 logic에서 제외)
  | { kind: "festivalEve" };

export interface ReminderDef {
  id: ReminderId;
  trigger: ReminderTrigger;
  emoji: string;
  // 축제 당일에는 표시하지 않음(상점 잠김/시간 부족)
  suppressOnFestival?: boolean;
  // 야시장(겨울 15~17일)에는 요일과 무관하게 매일 표시
  nightMarketDaily?: boolean;
}

export const REMINDERS: ReminderDef[] = [
  {
    id: "weatherFortune",
    trigger: { kind: "daily" },
    emoji: "🌤️",
  },
  {
    id: "watering",
    trigger: { kind: "daily" },
    emoji: "💦",
  },
  {
    id: "animalCare",
    trigger: { kind: "daily" },
    emoji: "🐄",
  },
  {
    id: "farmCave",
    trigger: { kind: "daily" },
    emoji: "🍄",
  },
  {
    id: "hardwood",
    trigger: { kind: "daily" },
    emoji: "🪵",
  },
  {
    id: "travelingCart",
    trigger: { kind: "weekly", weekdays: ["fri", "sun"] },
    emoji: "🛒",
    nightMarketDaily: true,
  },
  {
    id: "krobusSprinkler",
    trigger: { kind: "weekly", weekdays: ["fri"] },
    emoji: "💧",
    suppressOnFestival: true,
  },
  {
    id: "desertTraderStaircase",
    trigger: { kind: "weekly", weekdays: ["sun"] },
    emoji: "🪜",
  },
  {
    id: "specialOrders",
    trigger: { kind: "weekly", weekdays: ["mon"] },
    emoji: "📋",
  },
  {
    id: "queenOfSauceNew",
    trigger: { kind: "weekly", weekdays: ["sun"] },
    emoji: "📺",
  },
  {
    id: "queenOfSauceRerun",
    trigger: { kind: "weekly", weekdays: ["wed"] },
    emoji: "📺",
  },
  {
    id: "questFestivalWarning",
    trigger: { kind: "festivalEve" },
    emoji: "⚠️",
  },
];

// 기본 토글 상태: 전부 꺼짐
export const DEFAULT_REMINDER_TOGGLES: Record<ReminderId, boolean> =
  REMINDERS.reduce(
    (acc, r) => {
      acc[r.id] = false;
      return acc;
    },
    {} as Record<ReminderId, boolean>,
  );
