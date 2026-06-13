// localStorage 영속 + useSyncExternalStore 구독을 위한 외부 스토어.
// effect 내 setState 없이 SSR/하이드레이션을 안전하게 처리한다.

import { loadJSON, saveJSON } from "@/lib/storage";
import { DEFAULT_REMINDER_TOGGLES, type ReminderId } from "@/data/reminders";
import type { Memo, ScheduleState } from "@/types/schedule";

const STORAGE_KEY = "svs:schedule";
const STATE_VERSION = 1;

const DEFAULT_STATE: ScheduleState = {
  version: STATE_VERSION,
  currentDay: 1, // 봄 1일
  memos: [],
  eventFilters: { birthday: true, festival: true, cropDeadline: true },
  reminderToggles: DEFAULT_REMINDER_TOGGLES,
};

let state: ScheduleState = DEFAULT_STATE;
let loaded = false;
const listeners = new Set<() => void>();

// 클라이언트에서 최초 접근 시 1회 로드 (getSnapshot 참조 안정성 유지)
function ensureLoaded(): void {
  if (loaded || typeof window === "undefined") return;
  const saved = loadJSON(STORAGE_KEY, DEFAULT_STATE);
  state = {
    ...DEFAULT_STATE,
    ...saved,
    // 신규 필드는 기본값과 병합(구버전 저장 데이터 호환)
    eventFilters: { ...DEFAULT_STATE.eventFilters, ...saved.eventFilters },
    reminderToggles: {
      ...DEFAULT_STATE.reminderToggles,
      ...saved.reminderToggles,
    },
    version: STATE_VERSION,
  };
  loaded = true;
}

function commit(next: ScheduleState): void {
  state = next;
  saveJSON(STORAGE_KEY, state);
  listeners.forEach((l) => l());
}

export function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getSnapshot(): ScheduleState {
  ensureLoaded();
  return state;
}

// SSR 및 하이드레이션 첫 렌더는 항상 기본값으로 일치시킨다.
export function getServerSnapshot(): ScheduleState {
  return DEFAULT_STATE;
}

function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export const scheduleActions = {
  setCurrentDay(day: number) {
    commit({ ...state, currentDay: day });
  },
  setEventFilter(type: keyof ScheduleState["eventFilters"], value: boolean) {
    commit({
      ...state,
      eventFilters: { ...state.eventFilters, [type]: value },
    });
  },
  setReminderToggle(id: ReminderId, value: boolean) {
    commit({
      ...state,
      reminderToggles: { ...state.reminderToggles, [id]: value },
    });
  },
  addMemo(input: Omit<Memo, "id" | "createdAt" | "done">) {
    commit({
      ...state,
      memos: [
        ...state.memos,
        { ...input, id: newId(), done: false, createdAt: Date.now() },
      ],
    });
  },
  updateMemo(id: string, patch: Partial<Omit<Memo, "id">>) {
    commit({
      ...state,
      memos: state.memos.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    });
  },
  deleteMemo(id: string) {
    commit({ ...state, memos: state.memos.filter((m) => m.id !== id) });
  },
  toggleDone(id: string) {
    commit({
      ...state,
      memos: state.memos.map((m) =>
        m.id === id ? { ...m, done: !m.done } : m,
      ),
    });
  },
};
