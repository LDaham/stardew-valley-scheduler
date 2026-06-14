// To Do List 표시 순서 엔트리 정의.
// 항목 단위: 이벤트 타입(3) + 리마인더(전체) + 사용자 메모 카테고리(수확·도구·장비).
// 사용자가 할 일 목록 설정에서 이 엔트리들의 순서를 바꾼다.

import { REMINDERS } from "@/data/reminders";

export type TodoEntryKind = "event" | "reminder" | "memo";

export interface TodoEntry {
  key: string; // 정렬 키 (예: "event:festival", "reminder:watering", "memo:harvest")
  kind: TodoEntryKind;
  ref: string; // 이벤트 타입 / 리마인더 id / 메모 카테고리
}

export const EVENT_TYPES = ["festival", "birthday", "cropDeadline"] as const;
// harvest=작물 수확, watering=작물별 물주기(사용자 추가), tool=도구 업그레이드,
// machine=장인 제작품, build=농장 건물 건설·농가 업그레이드, misc=정동석 깨기·박물관 기증,
// eatFood=수확일 음식 먹기(품질 버프)
export const MEMO_CATEGORIES = ["harvest", "watering", "tool", "machine", "build", "misc", "eatFood"] as const;
// 설정·순서에 노출되는 카테고리(토글/정렬 대상)
export type VisibleMemoCategory = (typeof MEMO_CATEGORIES)[number];
// buySeed: 수확일 씨앗 구매 메모. 순서·토글은 buySeeds 리마인더와 통합되어
// 별도 카테고리로 노출하지 않으므로 MEMO_CATEGORIES에는 포함하지 않는다.
export type MemoCategory = VisibleMemoCategory | "buySeed";

// queenOfSauceRerun은 신규 방영(queenOfSauceNew)의 하위 항목으로 함께 움직이므로
// 별도 순서 엔트리로 노출하지 않는다.
const GROUPED_REMINDERS = new Set(["queenOfSauceRerun"]);

export const TODO_ENTRIES: TodoEntry[] = [
  ...EVENT_TYPES.map((t) => ({ key: `event:${t}`, kind: "event" as const, ref: t })),
  ...REMINDERS.filter((r) => !GROUPED_REMINDERS.has(r.id)).map((r) => ({
    key: `reminder:${r.id}`,
    kind: "reminder" as const,
    ref: r.id,
  })),
  ...MEMO_CATEGORIES.map((c) => ({
    key: `memo:${c}`,
    kind: "memo" as const,
    ref: c,
  })),
];

// 기본 표시 순서(사용자 요청 순서). 이벤트·리마인더·메모를 교차 배치.
export const DEFAULT_TODO_ORDER: string[] = [
  "event:festival",
  "event:birthday",
  "event:cropDeadline",
  "reminder:queenOfSauceNew",
  "reminder:weatherFortune",
  "memo:eatFood",
  "memo:harvest",
  "memo:watering",
  "reminder:animalCare",
  "reminder:buySeeds",
  "reminder:helpWanted",
  "reminder:specialOrders",
  "memo:tool",
  "memo:build",
  "memo:misc",
  "reminder:krobusSprinkler",
  "reminder:communityCenterBundle",
  "reminder:desertTraderStaircase",
  "reminder:travelingCart",
  "memo:machine",
  "reminder:farmCave",
  "reminder:crabPot",
  "reminder:hardwood",
];

const ENTRY_BY_KEY = new Map(TODO_ENTRIES.map((e) => [e.key, e]));
export function getTodoEntry(key: string): TodoEntry | undefined {
  return ENTRY_BY_KEY.get(key);
}

// 저장된 순서를 현재 엔트리 집합에 맞춰 정리.
// 엔트리 집합이 바뀌면(앱 업데이트로 항목 추가/삭제) 기본 순서로 초기화하고,
// 집합이 동일하면(순수 재정렬) 사용자 순서를 유지한다.
export function reconcileTodoOrder(saved?: string[]): string[] {
  if (!saved) return [...DEFAULT_TODO_ORDER];
  const def = new Set(DEFAULT_TODO_ORDER);
  const sv = new Set(saved);
  if (sv.size !== def.size || [...def].some((k) => !sv.has(k))) {
    return [...DEFAULT_TODO_ORDER];
  }
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of saved) {
    if (def.has(k) && !seen.has(k)) {
      out.push(k);
      seen.add(k);
    }
  }
  for (const k of DEFAULT_TODO_ORDER) if (!seen.has(k)) out.push(k);
  return out;
}
