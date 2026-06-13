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
export const MEMO_CATEGORIES = ["harvest", "tool", "machine"] as const;
export type MemoCategory = (typeof MEMO_CATEGORIES)[number];

export const TODO_ENTRIES: TodoEntry[] = [
  ...EVENT_TYPES.map((t) => ({ key: `event:${t}`, kind: "event" as const, ref: t })),
  ...REMINDERS.map((r) => ({
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

// 기본 순서(엔트리 정의 순서)
export const DEFAULT_TODO_ORDER: string[] = TODO_ENTRIES.map((e) => e.key);

const ENTRY_BY_KEY = new Map(TODO_ENTRIES.map((e) => [e.key, e]));
export function getTodoEntry(key: string): TodoEntry | undefined {
  return ENTRY_BY_KEY.get(key);
}

// 저장된 순서를 현재 엔트리 집합에 맞춰 정리(누락 추가·무효 제거·중복 제거).
export function reconcileTodoOrder(saved?: string[]): string[] {
  const valid = new Set(DEFAULT_TODO_ORDER);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of saved ?? []) {
    if (valid.has(k) && !seen.has(k)) {
      out.push(k);
      seen.add(k);
    }
  }
  for (const k of DEFAULT_TODO_ORDER) {
    if (!seen.has(k)) out.push(k);
  }
  return out;
}
