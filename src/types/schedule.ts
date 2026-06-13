import type { Season } from "@/lib/calendar";
import type { EventFilters } from "@/lib/events";

// 순환 메모 1건. (계절,일)에 귀속되어 매 순환마다 반복 표시된다.
export interface Memo {
  id: string;
  season: Season;
  day: number;
  text: string;
  done: boolean;
  // 사전 대비 알림: 해당 일수 전부터 대시보드에 미리 표시 (0이면 당일만)
  reminderDaysBefore: number;
  createdAt: number;
}

// localStorage에 저장되는 전체 스케줄 상태
export interface ScheduleState {
  version: number;
  currentDay: number; // 1..112 (절대 일수)
  memos: Memo[];
  eventFilters: EventFilters; // 이벤트 타입별 표시 여부
}
