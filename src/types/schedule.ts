import type { Season } from "@/lib/calendar";
import type { EventFilters } from "@/lib/events";
import type { ReminderId } from "@/data/reminders";
import type { MemoCategory } from "@/lib/todoOrder";

export type MemoCategoryToggles = Record<MemoCategory, boolean>;

// 순환 메모 1건. (계절,일)에 귀속되어 매 순환마다 반복 표시된다.
export interface Memo {
  id: string;
  season: Season;
  day: number;
  text: string;
  done: boolean;
  // 사전 대비 알림: 해당 일수 전부터 대시보드에 미리 표시 (0이면 당일만)
  reminderDaysBefore: number;
  // 할 일 추가 출처(수확/도구/장비). 순서 정렬에 사용. 없으면 일반 메모.
  category?: MemoCategory;
  createdAt: number;
}

// localStorage에 저장되는 전체 스케줄 상태
export interface ScheduleState {
  version: number;
  currentDay: number; // 1..112 (절대 일수)
  memos: Memo[];
  eventFilters: EventFilters; // 이벤트 타입별 표시 여부
  reminderToggles: Record<ReminderId, boolean>; // 리마인더별 on/off
  // 이벤트·리마인더 완료 체크 상태. 키: `${yearDay}:${itemKey}` (날짜별로 구분되어 날이 바뀌면 초기화)
  taskDone: Record<string, boolean>;
  // To Do List 표시 순서(엔트리 키 배열). 비면 기본 순서 사용.
  todoOrder: string[];
  // 사용자 메모 카테고리(수확/물주기/도구/장비)별 표시 여부. 기본 전부 표시.
  memoCategoryToggles: MemoCategoryToggles;
  // 비 예보. 키=yearDay, 값=true면 그날 비 → 물주기 숨김.
  rainDays: Record<string, boolean>;
  // 물뿌리개 업그레이드 누적 횟수(이 수에 도달하면 비 오는 날 업그레이드 제안 중단).
  wateringCanUpgrades: number;
  // 마을회관 번들 품목 기증 여부. 키=`${bundleId}:${itemId}`.
  bundleItemsDone: Record<string, boolean>;
}
