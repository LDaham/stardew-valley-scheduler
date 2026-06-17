import type { Weekday } from "@/lib/calendar";

// 요일/축제 기반 반복 리마인더 정의.
// 표시 문자열은 i18n 키로 분리: reminders.<id>.title / reminders.<id>.detail

export type ReminderId =
  | "weatherFortune"
  | "animalCare"
  | "farmCave"
  | "hardwood"
  | "travelingCart"
  | "krobusSprinkler"
  | "desertTraderStaircase"
  | "specialOrders"
  | "queenOfSauceNew"
  | "queenOfSauceRerun"
  | "buySeeds"
  | "helpWanted"
  | "crabPot"
  | "pondCheck";

// 트리거 종류
export type ReminderTrigger =
  // 매일
  | { kind: "daily" }
  // 매 계절 첫날(매월 1일)
  | { kind: "seasonStart" }
  // 매주 특정 요일
  | { kind: "weekly"; weekdays: Weekday[] }
  // 특정 축제 daysBefore일 전부터 당일 직전까지 (D-day 카운트다운)
  | { kind: "festivalPrep"; festivalId: string; daysBefore: number };

export interface ReminderDef {
  id: ReminderId;
  trigger: ReminderTrigger;
  // 축제 당일에는 표시하지 않음(상점 잠김/시간 부족)
  suppressOnFestival?: boolean;
  // 축제 전날에도 표시하지 않음(다음 날 상점/NPC 막힘 — 구인광고 등)
  suppressOnFestivalEve?: boolean;
  // 야시장(겨울 15~17일)에는 요일과 무관하게 매일 표시
  nightMarketDaily?: boolean;
}

// 표시 아이콘은 이모지가 아니라 public/icons/reminders/<id>.png 이미지를 사용한다.
export const REMINDERS: ReminderDef[] = [
  { id: "weatherFortune", trigger: { kind: "daily" } },
  { id: "animalCare", trigger: { kind: "daily" } },
  { id: "farmCave", trigger: { kind: "daily" } },
  { id: "hardwood", trigger: { kind: "daily" } },
  {
    id: "travelingCart",
    trigger: { kind: "weekly", weekdays: ["fri", "sun"] },
    nightMarketDaily: true,
  },
  {
    id: "krobusSprinkler",
    trigger: { kind: "weekly", weekdays: ["fri"] },
    suppressOnFestival: true,
  },
  {
    id: "desertTraderStaircase",
    trigger: { kind: "weekly", weekdays: ["sun"] },
  },
  // 매주 월요일 갱신 + 일요일까지 미룰 수 있음(주중 매일 표시, 완료 시 그 주는 숨김 — Dashboard 처리)
  {
    id: "specialOrders",
    trigger: {
      kind: "weekly",
      weekdays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    },
  },
  { id: "queenOfSauceNew", trigger: { kind: "weekly", weekdays: ["sun"] } },
  { id: "queenOfSauceRerun", trigger: { kind: "weekly", weekdays: ["wed"] } },
  { id: "buySeeds", trigger: { kind: "seasonStart" } },
  {
    id: "helpWanted",
    trigger: { kind: "daily" },
    // 축제 당일은 구인 게시판이 막혀 확인 불가. 전날은 표시(내일 축제 안내 문구 함께 노출).
    suppressOnFestival: true,
  },
  { id: "crabPot", trigger: { kind: "daily" } },
  // 물고기 연못 확인: 매일 연못 바구니에 생산물이 쌓이므로 매일 표시
  { id: "pondCheck", trigger: { kind: "daily" } },
];

// 기본으로 켜진 리마인더(나머지는 꺼짐).
const DEFAULT_ON_REMINDERS: ReminderId[] = [
  "buySeeds", // 새 계절
  "weatherFortune", // 날씨·운세
  "queenOfSauceNew", // 소스의 여왕(신규)
  "queenOfSauceRerun", // 소스의 여왕(재방송)
  "helpWanted", // 구인 광고
  "specialOrders", // 특별 주문
  "travelingCart", // 여행 상인
];

// 기본 토글 상태
export const DEFAULT_REMINDER_TOGGLES: Record<ReminderId, boolean> =
  REMINDERS.reduce(
    (acc, r) => {
      acc[r.id] = DEFAULT_ON_REMINDERS.includes(r.id);
      return acc;
    },
    {} as Record<ReminderId, boolean>,
  );
