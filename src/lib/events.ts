import {
  BIRTHDAYS,
  CROPS,
  FESTIVALS,
  cropLastPlantDay,
} from "@/data/game-data";
import { type SDate, type Season, daysUntil } from "@/lib/calendar";

export type FixedEventType =
  | "festival"
  | "birthday"
  | "cropDeadline"
  | "foraging";

// 이벤트 타입별 표시 여부 필터
export type EventFilters = Record<FixedEventType, boolean>;

// 게임 내장 고정 이벤트의 통합 표현. refId는 해당 i18n 네임스페이스 키.
export interface FixedEvent {
  type: FixedEventType;
  refId: string; // festivals.* | villagers.* | crops.* | foraging.*
  season: Season;
  day: number; // 시작일(축제) / 생일 / 심기 마감일 / 채집 이벤트 시작일
  endDay?: number; // 다중일 축제·채집 이벤트 종료일
  icon?: string; // 채집 이벤트 등 개별 아이콘 경로
}

// 계절 채집 이벤트(달력 위키). 정보 영역에 기간 동안 표시(완료 체크 없음).
// 출처: 달력 - Stardew Valley Wiki / 아이콘: 채집 - Stardew Valley Wiki
const FORAGING_EVENTS: FixedEvent[] = [
  {
    type: "foraging",
    refId: "salmonberrySeason",
    season: "spring",
    day: 15,
    endDay: 18,
    icon: "/icons/bundleItems/salmonberry.png",
  },
  {
    type: "foraging",
    refId: "summerBeachForaging",
    season: "summer",
    day: 12,
    endDay: 14,
    icon: "/icons/bundleItems/clam.png",
  },
  {
    type: "foraging",
    refId: "blackberrySeason",
    season: "fall",
    day: 8,
    endDay: 11,
    icon: "/icons/bundleItems/blackberry.png",
  },
];

// 모든 고정 이벤트를 평탄화한 목록 (메모이즈)
export const FIXED_EVENTS: FixedEvent[] = [
  ...FESTIVALS.map((f) => ({
    type: "festival" as const,
    refId: f.id,
    season: f.season,
    day: f.day,
    endDay: f.endDay,
  })),
  ...BIRTHDAYS.map((b) => ({
    type: "birthday" as const,
    refId: b.villager,
    season: b.season,
    day: b.day,
  })),
  ...CROPS.flatMap((c) =>
    c.seasons.map((season) => ({
      type: "cropDeadline" as const,
      refId: c.id,
      season,
      day: cropLastPlantDay(c),
    })),
  ),
  ...FORAGING_EVENTS,
];

// 활성화된 타입만 남긴다
export function filterEvents(
  events: FixedEvent[],
  filters: EventFilters,
): FixedEvent[] {
  return events.filter((e) => filters[e.type]);
}

// 특정 날짜에 발생하는 고정 이벤트 (다중일 축제는 기간 내 모든 날 포함)
export function getEventsOn(date: SDate): FixedEvent[] {
  return FIXED_EVENTS.filter((e) => {
    if (e.season !== date.season) return false;
    if (e.endDay) return date.day >= e.day && date.day <= e.endDay;
    return e.day === date.day;
  });
}

// 건물·상점이 잠기지 않는 축제(이 날에는 상점·집이 정상 영업):
// - 저녁 시작: 영령의 전야제, 달빛 해파리들의 춤(낮에는 상점 열림)
// - 전체 예외: 사막 축제, 송어 시합, 오징어 축제, 야시장(상점·집 항상 열림, 시간도 흐름)
// 출처: 가게 일정표 위키(progress/가게-일정표-정리.md). 가게 휴무·리마인더 억제 판정의 단일 기준.
export const NON_LOCKING_FESTIVALS = new Set([
  "spiritsEve",
  "moonlightJellies",
  "desertFestival",
  "troutDerby",
  "squidFest",
  "nightMarket",
]);

// 그날 상점·집을 잠그는 축제(있으면 그 축제 이벤트, 없으면 null).
export function lockingFestivalOn(date: SDate): FixedEvent | null {
  return (
    getEventsOn(date).find(
      (e) => e.type === "festival" && !NON_LOCKING_FESTIVALS.has(e.refId),
    ) ?? null
  );
}

// 그날 상점이 축제로 잠기는지
export function festivalLocksShops(date: SDate): boolean {
  return lockingFestivalOn(date) !== null;
}

export interface UpcomingEvent {
  event: FixedEvent;
  daysAway: number; // 0 = 오늘
  occursOn: SDate;
}

// 기준일로부터 withinDays 이내에 다가오는 고정 이벤트 (가까운 순 정렬)
export function getUpcomingEvents(
  from: SDate,
  withinDays: number,
): UpcomingEvent[] {
  return FIXED_EVENTS.map((event) => {
    const occursOn: SDate = { season: event.season, day: event.day };
    return { event, occursOn, daysAway: daysUntil(from, occursOn) };
  })
    .filter((u) => u.daysAway <= withinDays)
    .sort((a, b) => a.daysAway - b.daysAway);
}
