import {
  BIRTHDAYS,
  CROPS,
  FESTIVALS,
  cropLastPlantDay,
} from "@/data/game-data";
import { type SDate, type Season, daysUntil } from "@/lib/calendar";

export type FixedEventType = "festival" | "birthday" | "cropDeadline";

// 이벤트 타입별 표시 여부 필터
export type EventFilters = Record<FixedEventType, boolean>;

// 게임 내장 고정 이벤트의 통합 표현. refId는 해당 i18n 네임스페이스 키.
export interface FixedEvent {
  type: FixedEventType;
  refId: string; // festivals.* | villagers.* | crops.*
  season: Season;
  day: number; // 시작일(축제) / 생일 / 심기 마감일
  endDay?: number; // 다중일 축제 종료일
}

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
