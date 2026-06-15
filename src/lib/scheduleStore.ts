// localStorage 영속 + useSyncExternalStore 구독을 위한 외부 스토어.
// effect 내 setState 없이 SSR/하이드레이션을 안전하게 처리한다.

import { loadJSON, saveJSON } from "@/lib/storage";
import { fromYearDay, normalizeYearDay, DAYS_PER_YEAR } from "@/lib/calendar";
import { chainSpawn } from "@/lib/chains";
import { BUNDLES, bundleItemKey } from "@/data/bundles";
import { DEFAULT_REMINDER_TOGGLES, type ReminderId } from "@/data/reminders";
import {
  DEFAULT_TODO_ORDER,
  MEMO_CATEGORIES,
  reconcileTodoOrder,
  type MemoCategory,
} from "@/lib/todoOrder";
import type {
  BundleMode,
  CharacterInfo,
  Memo,
  MemoCategoryToggles,
  ScheduleState,
  SeedDefaults,
} from "@/types/schedule";

const DEFAULT_CHARACTER: CharacterInfo = {
  farmingLevel: 0,
  foragingLevel: 0,
  tiller: false,
  agriculturist: false,
  artisan: false,
  gatherer: false,
  botanist: false,
};

const DEFAULT_SEED_DEFAULTS: SeedDefaults = {
  fertilizer: "none",
  noWatering: false,
  eatFood: false,
  replant: true,
};

// 기본으로 꺼진 메모 카테고리: 과일나무 수확·장인/정제 장비 사용.
const MEMO_OFF_BY_DEFAULT = new Set<string>(["fruit", "machine"]);
const DEFAULT_MEMO_CATEGORY_TOGGLES: MemoCategoryToggles = MEMO_CATEGORIES.reduce(
  (acc, c) => {
    acc[c] = !MEMO_OFF_BY_DEFAULT.has(c);
    return acc;
  },
  {} as MemoCategoryToggles,
);

const STORAGE_KEY = "svs:schedule";
const STATE_VERSION = 1;

const DEFAULT_STATE: ScheduleState = {
  version: STATE_VERSION,
  currentDay: 1, // 봄 1일
  year: 1,
  memos: [],
  eventFilters: { birthday: true, festival: true, cropDeadline: true },
  reminderToggles: DEFAULT_REMINDER_TOGGLES,
  taskDone: {},
  todoOrder: DEFAULT_TODO_ORDER,
  memoCategoryToggles: DEFAULT_MEMO_CATEGORY_TOGGLES,
  rainDays: {},
  wateringCanUpgrades: 0,
  bundleItemsDone: {},
  bundleMode: "standard",
  remixChoices: {},
  seedDefaults: DEFAULT_SEED_DEFAULTS,
  perfectionChecks: {},
  perfectionCounts: {},
  hiddenItems: {},
  achievementsDone: {},
  character: DEFAULT_CHARACTER,
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
    taskDone: { ...DEFAULT_STATE.taskDone, ...saved.taskDone },
    todoOrder: reconcileTodoOrder(saved.todoOrder),
    memoCategoryToggles: {
      ...DEFAULT_MEMO_CATEGORY_TOGGLES,
      ...saved.memoCategoryToggles,
    },
    rainDays: saved.rainDays ?? {},
    wateringCanUpgrades: saved.wateringCanUpgrades ?? 0,
    bundleItemsDone: saved.bundleItemsDone ?? {},
    bundleMode: saved.bundleMode ?? "standard",
    remixChoices: saved.remixChoices ?? {},
    seedDefaults: { ...DEFAULT_SEED_DEFAULTS, ...saved.seedDefaults },
    perfectionChecks: saved.perfectionChecks ?? {},
    perfectionCounts: saved.perfectionCounts ?? {},
    hiddenItems: saved.hiddenItems ?? {},
    achievementsDone: saved.achievementsDone ?? {},
    character: { ...DEFAULT_CHARACTER, ...saved.character },
    year: saved.year ?? 1,
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

// 마을회관 번들 전부 완료 여부(대장간 금요일 휴무 판단용)
function ccCompleted(done: Record<string, boolean>): boolean {
  return BUNDLES.every(
    (b) =>
      b.items.filter((i) => done[bundleItemKey(b.id, i.id)]).length >= b.needed,
  );
}

// 메모 완료(value=true) 처리 시: 수확→음식 취소 + 체인 후속 할 일 생성.
function applyCompletion(memos: Memo[], ids: string[]): Memo[] {
  const today = fromYearDay(state.currentDay);
  const cc = ccCompleted(state.bundleItemsDone);
  const idset = new Set(ids);
  // 수확일 음식 자동 삭제: 완료된 작물 수확의 그룹에서 아직 안 먹은 음식 메모 제거
  const harvestGroups = new Set(
    memos
      .filter(
        (m) =>
          idset.has(m.id) && m.done && m.category === "harvest" && m.groupId,
      )
      .map((m) => m.groupId),
  );
  let result = memos.filter(
    (m) =>
      !(
        m.category === "eatFood" &&
        !m.done &&
        m.groupId &&
        harvestGroups.has(m.groupId)
      ),
  );
  // 체인 후속 생성(완료·미생성·체인 보유). spawned로 재체크 중복 방지.
  const toSpawn = result.filter(
    (m) => idset.has(m.id) && m.done && !m.spawned && m.chain,
  );
  const spawnIds = new Set(toSpawn.map((m) => m.id));
  result = result.map((m) => (spawnIds.has(m.id) ? { ...m, spawned: true } : m));
  const now = Date.now();
  const children: Memo[] = [];
  for (const m of toSpawn)
    for (const c of chainSpawn(m, today, cc))
      children.push({ ...c, id: newId(), done: false, createdAt: now });
  return [...result, ...children];
}

export const scheduleActions = {
  setCurrentDay(day: number) {
    // 달력에서 임의 날짜 선택: 연도는 그대로 둔다.
    commit({ ...state, currentDay: day });
  },
  // 하루 뒤로: winter 28(112)→spring 1이면 연도 +1.
  goToNextDay() {
    const year = state.currentDay === DAYS_PER_YEAR ? state.year + 1 : state.year;
    commit({ ...state, currentDay: normalizeYearDay(state.currentDay + 1), year });
  },
  // 하루 앞으로: spring 1→winter 28이면 연도 -1(최소 1).
  goToPrevDay() {
    // 게임 시작일(1년째 봄 1일) 이전으로는 이동 불가
    if (state.year === 1 && state.currentDay === 1) return;
    const year = state.currentDay === 1 ? Math.max(1, state.year - 1) : state.year;
    commit({ ...state, currentDay: normalizeYearDay(state.currentDay - 1), year });
  },
  // 미니 달력 등에서 특정 (연도, 날짜)로 직접 이동
  goToDate(yearDay: number, year: number) {
    commit({ ...state, currentDay: yearDay, year: Math.max(1, year) });
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
  // 여러 메모를 한 번에 추가(씨앗 심기 → 수확+물주기 일괄 생성 시 1회 커밋)
  addMemos(inputs: Omit<Memo, "id" | "createdAt" | "done">[]) {
    const now = Date.now();
    commit({
      ...state,
      memos: [
        ...state.memos,
        ...inputs.map((input) => ({
          ...input,
          id: newId(),
          done: false,
          createdAt: now,
        })),
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
  // 여러 메모 일괄 삭제(관련 메모 전체 삭제 팝업에서 사용)
  deleteMemos(ids: string[]) {
    const set = new Set(ids);
    commit({ ...state, memos: state.memos.filter((m) => !set.has(m.id)) });
  },
  toggleDone(id: string) {
    const cur = state.memos.find((m) => m.id === id);
    const newVal = !cur?.done;
    let memos = state.memos.map((m) =>
      m.id === id ? { ...m, done: newVal } : m,
    );
    if (newVal) memos = applyCompletion(memos, [id]);
    commit({ ...state, memos });
  },
  // 여러 메모의 완료 상태를 한 번에 설정(작물 물주기 묶음 토글에 사용)
  setDoneMany(ids: string[], value: boolean) {
    const set = new Set(ids);
    let memos = state.memos.map((m) =>
      set.has(m.id) ? { ...m, done: value } : m,
    );
    if (value) memos = applyCompletion(memos, ids);
    commit({ ...state, memos });
  },
  // 이벤트·리마인더 완료 체크 토글 (키는 `${yearDay}:${itemKey}`)
  toggleTask(key: string) {
    commit({
      ...state,
      taskDone: { ...state.taskDone, [key]: !state.taskDone[key] },
    });
  },
  // To Do List 표시 순서 설정
  setTodoOrder(order: string[]) {
    commit({ ...state, todoOrder: order });
  },
  // 메모 카테고리 표시 토글
  setMemoCategoryToggle(category: MemoCategory, value: boolean) {
    commit({
      ...state,
      memoCategoryToggles: {
        ...state.memoCategoryToggles,
        [category]: value,
      },
    });
  },
  // 특정 날(yearDay)의 비 예보 설정
  setRainDay(yearDay: number, value: boolean) {
    commit({
      ...state,
      rainDays: { ...state.rainDays, [yearDay]: value },
    });
  },
  // 물뿌리개 업그레이드 횟수 +1
  incWateringCanUpgrades() {
    commit({ ...state, wateringCanUpgrades: state.wateringCanUpgrades + 1 });
  },
  // 도구 등급 직접 설정(캐릭터 창의 등급 선택). 0(기본)~4(이리듐)로 제한.
  setWateringCanUpgrades(n: number) {
    commit({ ...state, wateringCanUpgrades: Math.max(0, Math.min(4, n)) });
  },
  // 캐릭터 정보 부분 갱신
  setCharacter(patch: Partial<CharacterInfo>) {
    commit({ ...state, character: { ...state.character, ...patch } });
  },
  // 저장된 모든 설정 초기화(번들·캐릭터·메모·순서·토글 등 전부 기본값으로)
  resetAll() {
    commit({
      version: STATE_VERSION,
      currentDay: 1,
      year: 1,
      memos: [],
      eventFilters: { birthday: true, festival: true, cropDeadline: true },
      reminderToggles: { ...DEFAULT_REMINDER_TOGGLES },
      taskDone: {},
      todoOrder: [...DEFAULT_TODO_ORDER],
      memoCategoryToggles: { ...DEFAULT_MEMO_CATEGORY_TOGGLES },
      rainDays: {},
      wateringCanUpgrades: 0,
      bundleItemsDone: {},
      bundleMode: "standard",
      remixChoices: {},
      seedDefaults: { ...DEFAULT_SEED_DEFAULTS },
      perfectionChecks: {},
      perfectionCounts: {},
      hiddenItems: {},
      achievementsDone: {},
      character: { ...DEFAULT_CHARACTER },
    });
  },
  // 번들 품목 기증 토글
  toggleBundleItem(key: string) {
    commit({
      ...state,
      bundleItemsDone: {
        ...state.bundleItemsDone,
        [key]: !state.bundleItemsDone[key],
      },
    });
  },
  // 꾸러미 추적 모드 전환(표준/리믹스)
  setBundleMode(mode: BundleMode) {
    commit({ ...state, bundleMode: mode });
  },
  // 리믹스 무작위 슬롯의 선택 꾸러미 목록 설정
  setRemixChoice(slotId: string, bundleIds: string[]) {
    commit({
      ...state,
      remixChoices: { ...state.remixChoices, [slotId]: bundleIds },
    });
  },
  // 씨앗 심기 선택지 기본값 갱신(다음 심기에 재사용)
  setSeedDefaults(patch: Partial<SeedDefaults>) {
    commit({ ...state, seedDefaults: { ...state.seedDefaults, ...patch } });
  },
  // 완벽 추적 체크 토글
  togglePerfCheck(key: string) {
    commit({
      ...state,
      perfectionChecks: {
        ...state.perfectionChecks,
        [key]: !state.perfectionChecks[key],
      },
    });
  },
  // 완벽 추적 카운터 설정(운송·황금 호두)
  setPerfCount(catId: string, value: number) {
    commit({
      ...state,
      perfectionCounts: { ...state.perfectionCounts, [catId]: value },
    });
  },
  // 할 일 추가 상세 옵션: 항목 숨김 토글
  setHiddenItem(key: string, hidden: boolean) {
    commit({
      ...state,
      hiddenItems: { ...state.hiddenItems, [key]: hidden },
    });
  },
  // 업적 달성 토글
  toggleAchievement(id: string) {
    commit({
      ...state,
      achievementsDone: {
        ...state.achievementsDone,
        [id]: !state.achievementsDone[id],
      },
    });
  },
};
