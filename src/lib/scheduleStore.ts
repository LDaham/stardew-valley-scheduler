// localStorage 영속 + useSyncExternalStore 구독을 위한 외부 스토어.
// effect 내 setState 없이 SSR/하이드레이션을 안전하게 처리한다.

import { loadJSON, saveJSON } from "@/lib/storage";
import {
  fromYearDay,
  toYearDay,
  normalizeYearDay,
  DAYS_PER_YEAR,
} from "@/lib/calendar";
import { chainSpawn, spawnYearlyFruitHarvests } from "@/lib/chains";
import { BUNDLES, bundleItemKey } from "@/data/bundles";
import { DEFAULT_REMINDER_TOGGLES, type ReminderId } from "@/data/reminders";
import { DEFAULT_TODO_ORDER, reconcileTodoOrder } from "@/lib/todoOrder";
import {
  DEFAULT_ADD_TASK_ORDER,
  ADD_TASK_CHILDREN,
  reconcileAddTaskOrder,
  reconcileChildOrder,
} from "@/lib/addTaskOrder";
import type {
  BundleMode,
  CharacterInfo,
  DialogFilters,
  Memo,
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
  plant: true,
  watering: true,
  harvest: true,
  eatFood: false,
};

// 다이얼로그 필터 기본값(계절 필터는 undefined → 컴포넌트에서 계절 기반 기본값 사용)
const DEFAULT_DIALOG_FILTERS: DialogFilters = {
  bundleIncompleteFirst: false,
  perfectionIncompleteFirst: false,
  achievementIncompleteFirst: false,
  museumIncompleteFirst: false,
  fieldOfficeIncompleteFirst: false,
  monsterIncompleteFirst: false,
  seedCrossSeason: false,
  seedFertilizer: "none",
  seedProduce: "raw",
  seedFood: "none",
  // 꾸러미 추적 기본: 현재 계절은 항상 표시 + 상시 물품 포함, 완료되지 않은 물품만 보기
  trackerIncludeAlways: true,
  trackerOnlyIncomplete: true,
  trackerGrouped: true,
  // 참고 도구-가게 일정 탭 시나리오 토글 기본값(모두 꺼짐)
  shopKeyApplied: false,
  shopCcRestored: false,
  shopFestivalOn: false,
  shopBoatRepaired: false,
  // 메인 가게 일정 박스 시나리오 토글(탭과 독립, 모두 꺼짐)
  boxKeyApplied: false,
  boxCcRestored: false,
  boxBoatRepaired: false,
  // 기본 고정: 피에르네 잡화점·목공 작업실·대장간
  shopPinned: ["pierre", "carpenter", "blacksmith"],
};

// 메인 상단 박스 종류(꾸러미 추적만). 가게 일정은 항상 표시(할 일 옆), 비 생선은 제거됨.
const MAIN_ORDER_IDS = ["bundleTracker"];
const DEFAULT_MAIN_ORDER = ["bundleTracker"];
// 저장된 순서를 알려진 id로 정리(중복 제거 + 누락분 기본 순서로 보충).
function reconcileMainOrder(saved?: string[]): string[] {
  if (!saved) return [...DEFAULT_MAIN_ORDER];
  const out: string[] = [];
  for (const k of saved)
    if (MAIN_ORDER_IDS.includes(k) && !out.includes(k)) out.push(k);
  for (const k of DEFAULT_MAIN_ORDER) if (!out.includes(k)) out.push(k);
  return out;
}

// 세이브 슬롯: 같은 기기에서 여러 게임을 슬롯별로 저장한다.
// - svs:slots = 슬롯 목록[{id,name,updatedAt}], svs:activeSlot = 활성 슬롯 id
// - 각 슬롯 데이터는 svs:slot:<id>. 구버전 단일 키 svs:schedule는 첫 로드 시 슬롯 1로 이전.
export type Slot = { id: string; name: string; updatedAt: number };
export const MAX_SLOTS = 5;
const SLOTS_KEY = "svs:slots";
const ACTIVE_KEY = "svs:activeSlot";
const LEGACY_KEY = "svs:schedule";
const slotDataKey = (id: string) => `svs:slot:${id}`;
// v2: 할 일 추가 메뉴/장비 기본 순서 개편 → 기존 저장 순서를 1회 새 기본값으로 재설정.
const STATE_VERSION = 2;

// 할 일 추가 하위 항목 기본 순서(그룹별 데이터 순).
function defaultChildOrder(): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const key of Object.keys(ADD_TASK_CHILDREN))
    out[key] = [...ADD_TASK_CHILDREN[key].defaultIds];
  return out;
}
// 저장된 하위 순서를 그룹별로 정리(집합 다르면 기본값으로).
function reconcileAllChildOrders(
  saved?: Record<string, string[]>,
): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const key of Object.keys(ADD_TASK_CHILDREN))
    out[key] = reconcileChildOrder(key, saved?.[key]);
  return out;
}

const DEFAULT_STATE: ScheduleState = {
  version: STATE_VERSION,
  currentDay: 1, // 봄 1일
  year: 1,
  memos: [],
  eventFilters: { birthday: true, festival: true, cropDeadline: true, foraging: true },
  reminderToggles: DEFAULT_REMINDER_TOGGLES,
  taskDone: {},
  todoOrder: DEFAULT_TODO_ORDER,
  rainDays: {},
  bundleItemsDone: {},
  bundleMode: "standard",
  remixChoices: {},
  seedDefaults: DEFAULT_SEED_DEFAULTS,
  perfectionChecks: {},
  perfectionCounts: {},
  hiddenItems: {},
  addTaskOrder: DEFAULT_ADD_TASK_ORDER,
  addTaskChildOrder: defaultChildOrder(),
  achievementsDone: {},
  monsterGoalsDone: {},
  fieldOfficeDone: {},
  museumDone: {},
  character: DEFAULT_CHARACTER,
  dialogFilters: DEFAULT_DIALOG_FILTERS,
  bundleTrackerShown: false,
  shopScheduleShown: false,
  rainFishShown: false,
  mainOrder: DEFAULT_MAIN_ORDER,
  notepadText: "",
  minMaxOn: false,
};

let state: ScheduleState = DEFAULT_STATE;
let loaded = false;
const listeners = new Set<() => void>();

// 슬롯 레지스트리(스토어 내부 상태) — UI는 subscribeSlots/getSlotsSnapshot로 구독.
let slots: Slot[] = [];
let activeId = "";
let slotsLoaded = false;
const slotListeners = new Set<() => void>();
// useSyncExternalStore 안정성을 위해 변경 시에만 새 객체로 교체.
let slotsSnapshot: { slots: Slot[]; activeId: string } = { slots: [], activeId: "" };
function refreshSlotsSnapshot(): void {
  slotsSnapshot = { slots, activeId };
}

// 슬롯 목록·활성 슬롯을 1회 로드. 없으면 구버전 데이터를 슬롯 1로 이전(없으면 빈 슬롯 생성).
function loadSlots(): void {
  if (slotsLoaded || typeof window === "undefined") return;
  const saved = loadJSON<Slot[]>(SLOTS_KEY, []);
  if (Array.isArray(saved) && saved.length > 0) {
    slots = saved.slice(0, MAX_SLOTS);
    const savedActive = loadJSON<string>(ACTIVE_KEY, "");
    activeId = slots.some((s) => s.id === savedActive) ? savedActive : slots[0].id;
  } else {
    const id = newId();
    activeId = id;
    // 이름은 비워 두고 UI에서 "슬롯 N"으로 표시(스토어는 로케일 비의존).
    slots = [{ id, name: "", updatedAt: Date.now() }];
    const legacy = window.localStorage.getItem(LEGACY_KEY);
    if (legacy) window.localStorage.setItem(slotDataKey(id), legacy);
    else saveJSON(slotDataKey(id), DEFAULT_STATE);
    saveJSON(SLOTS_KEY, slots);
    saveJSON(ACTIVE_KEY, activeId);
  }
  slotsLoaded = true;
  refreshSlotsSnapshot();
}

// 저장본(또는 가져온 JSON)을 기본값과 안전하게 병합 → 누락 필드·구버전 호환·순서 재정리.
// 최초 로드(ensureLoaded)와 데이터 가져오기(importState)가 함께 쓴다.
function mergeSaved(saved: ScheduleState): ScheduleState {
  // 구버전(<2) 저장본은 할 일 추가 순서를 새 기본값으로 1회 마이그레이션한다.
  const migrateOrder = saved.version !== STATE_VERSION;
  return {
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
    rainDays: saved.rainDays ?? {},
    bundleItemsDone: saved.bundleItemsDone ?? {},
    bundleMode: saved.bundleMode ?? "standard",
    remixChoices: saved.remixChoices ?? {},
    seedDefaults: { ...DEFAULT_SEED_DEFAULTS, ...saved.seedDefaults },
    perfectionChecks: saved.perfectionChecks ?? {},
    perfectionCounts: saved.perfectionCounts ?? {},
    hiddenItems: saved.hiddenItems ?? {},
    addTaskOrder: migrateOrder
      ? [...DEFAULT_ADD_TASK_ORDER]
      : reconcileAddTaskOrder(saved.addTaskOrder),
    addTaskChildOrder: migrateOrder
      ? defaultChildOrder()
      : reconcileAllChildOrders(saved.addTaskChildOrder),
    achievementsDone: saved.achievementsDone ?? {},
    monsterGoalsDone: saved.monsterGoalsDone ?? {},
    fieldOfficeDone: saved.fieldOfficeDone ?? {},
    museumDone: saved.museumDone ?? {},
    character: { ...DEFAULT_CHARACTER, ...saved.character },
    dialogFilters: { ...DEFAULT_DIALOG_FILTERS, ...saved.dialogFilters },
    bundleTrackerShown: saved.bundleTrackerShown ?? false,
    shopScheduleShown: saved.shopScheduleShown ?? false,
    rainFishShown: saved.rainFishShown ?? false,
    mainOrder: reconcileMainOrder(saved.mainOrder),
    // 구버전 블록 메모(notes[])는 줄바꿈으로 합쳐 단일 텍스트로 이전.
    notepadText:
      saved.notepadText ??
      ((saved as { notes?: { text: string }[] }).notes ?? [])
        .map((n) => n.text)
        .join("\n"),
    year: saved.year ?? 1,
    version: STATE_VERSION,
  };
}

// 클라이언트에서 최초 접근 시 1회 로드 (getSnapshot 참조 안정성 유지)
function ensureLoaded(): void {
  if (loaded || typeof window === "undefined") return;
  loadSlots();
  state = mergeSaved(loadJSON(slotDataKey(activeId), DEFAULT_STATE));
  loaded = true;
}

function commit(next: ScheduleState): void {
  state = next;
  loadSlots();
  saveJSON(slotDataKey(activeId), state);
  // 활성 슬롯 수정시각 갱신(슬롯 목록 UI는 다음 구조 변경/열람 시 반영).
  const s = slots.find((x) => x.id === activeId);
  if (s) {
    s.updatedAt = Date.now();
    saveJSON(SLOTS_KEY, slots);
  }
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

// ── 세이브 슬롯 구독/스냅샷 ──
export function subscribeSlots(cb: () => void): () => void {
  slotListeners.add(cb);
  return () => slotListeners.delete(cb);
}
export function getSlotsSnapshot(): { slots: Slot[]; activeId: string } {
  loadSlots();
  return slotsSnapshot;
}
const SERVER_SLOTS_SNAPSHOT = { slots: [], activeId: "" } as {
  slots: Slot[];
  activeId: string;
};
export function getServerSlotsSnapshot() {
  return SERVER_SLOTS_SNAPSHOT;
}
function notifySlots(): void {
  slotListeners.forEach((l) => l());
}

export const slotActions = {
  // 슬롯 전환: 현재 슬롯 저장 후 대상 슬롯 데이터를 로드해 화면을 즉시 갱신.
  switchSlot(id: string) {
    loadSlots();
    if (id === activeId || !slots.some((s) => s.id === id)) return;
    saveJSON(slotDataKey(activeId), state);
    activeId = id;
    saveJSON(ACTIVE_KEY, activeId);
    state = mergeSaved(loadJSON(slotDataKey(id), DEFAULT_STATE));
    loaded = true;
    refreshSlotsSnapshot();
    listeners.forEach((l) => l());
    notifySlots();
  },
  // 새 빈 슬롯을 목록에 추가(최대 MAX_SLOTS). 활성 슬롯은 그대로 두고,
  // 전환은 사용자가 '전환'으로 명시적으로 한다(현재 화면이 갑자기 초기화되지 않게).
  createSlot(name = "") {
    loadSlots();
    if (slots.length >= MAX_SLOTS) return null;
    const id = newId();
    saveJSON(slotDataKey(id), DEFAULT_STATE);
    slots = [...slots, { id, name, updatedAt: Date.now() }];
    saveJSON(SLOTS_KEY, slots);
    refreshSlotsSnapshot();
    notifySlots();
    return id;
  },
  renameSlot(id: string, name: string) {
    loadSlots();
    slots = slots.map((s) => (s.id === id ? { ...s, name } : s));
    saveJSON(SLOTS_KEY, slots);
    refreshSlotsSnapshot();
    notifySlots();
  },
  // 슬롯 복제(최대 MAX_SLOTS). name은 UI가 로케일 반영해 전달.
  duplicateSlot(id: string, name = "") {
    loadSlots();
    if (slots.length >= MAX_SLOTS || !slots.some((s) => s.id === id)) return null;
    const newIdv = newId();
    saveJSON(slotDataKey(newIdv), loadJSON(slotDataKey(id), DEFAULT_STATE));
    slots = [...slots, { id: newIdv, name, updatedAt: Date.now() }];
    saveJSON(SLOTS_KEY, slots);
    refreshSlotsSnapshot();
    notifySlots();
    return newIdv;
  },
  // 슬롯 삭제(마지막 1개는 삭제 불가). 활성 슬롯 삭제 시 첫 슬롯으로 전환.
  deleteSlot(id: string) {
    loadSlots();
    if (slots.length <= 1 || !slots.some((s) => s.id === id)) return;
    if (typeof window !== "undefined")
      window.localStorage.removeItem(slotDataKey(id));
    slots = slots.filter((s) => s.id !== id);
    saveJSON(SLOTS_KEY, slots);
    if (activeId === id) {
      activeId = slots[0].id;
      saveJSON(ACTIVE_KEY, activeId);
      state = mergeSaved(loadJSON(slotDataKey(activeId), DEFAULT_STATE));
      loaded = true;
      listeners.forEach((l) => l());
    }
    refreshSlotsSnapshot();
    notifySlots();
  },
  // 가져온 JSON을 특정 슬롯에 넣는다. targetId=null이면 새 슬롯으로(가득 차면 false).
  importToSlot(json: string, targetId: string | null): boolean {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      return false;
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return false;
    loadSlots();
    const merged = mergeSaved(parsed as ScheduleState);
    let id = targetId;
    if (!id) {
      if (slots.length >= MAX_SLOTS) return false;
      id = newId();
      slots = [...slots, { id, name: "", updatedAt: Date.now() }];
    } else {
      if (!slots.some((s) => s.id === id)) return false;
      slots = slots.map((s) =>
        s.id === id ? { ...s, updatedAt: Date.now() } : s,
      );
    }
    saveJSON(slotDataKey(id), merged);
    saveJSON(SLOTS_KEY, slots);
    if (id === activeId) {
      state = merged;
      loaded = true;
      listeners.forEach((l) => l());
    }
    refreshSlotsSnapshot();
    notifySlots();
    return true;
  },
};

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
function applyCompletion(
  memos: Memo[],
  ids: string[],
  todayYd?: number,
): Memo[] {
  const today = fromYearDay(todayYd ?? state.currentDay);
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
    for (const c of chainSpawn(m, today, cc, state.year))
      children.push({ ...c, id: newId(), done: false, createdAt: now });
  return [...result, ...children];
}

// 비 오는 날: 그날(이전) 활성 물주기를 비가 대신 줘 완료 처리 → 체인 진행
// (remaining 감소·다음 물주기를 다음 날 생성, 마지막이면 수확 생성). 시간 경과로만 적용돼
// 토글 되돌림 문제가 없다. todayYd로 다음 물주기 날짜를 비 온 날 기준(+1)으로 맞춘다.
function rainWaterMemos(memos: Memo[], yd: number): Memo[] {
  const targets = memos.filter((m) => {
    if (m.category !== "watering" || m.done || m.spawned) return false;
    if (!m.chain || m.chain.kind !== "crop" || m.chain.stage !== "water")
      return false;
    return toYearDay({ season: m.season, day: m.day }) <= yd;
  });
  if (targets.length === 0) return memos;
  const ids = targets.map((m) => m.id);
  const set = new Set(ids);
  const marked = memos.map((m) => (set.has(m.id) ? { ...m, done: true } : m));
  return applyCompletion(marked, ids, yd);
}

// 연도가 바뀐 직후, 반복 설정된 과일나무의 targetYear 수확 배치를 보충(없으면 추가).
function withYearlyFruit(memos: Memo[], targetYear: number): Memo[] {
  const extra = spawnYearlyFruitHarvests(memos, targetYear);
  if (extra.length === 0) return memos;
  const now = Date.now();
  return [
    ...memos,
    ...extra.map((c) => ({ ...c, id: newId(), done: false, createdAt: now })),
  ];
}

export const scheduleActions = {
  setCurrentDay(day: number) {
    // 달력에서 임의 날짜 선택: 연도는 그대로 둔다.
    commit({ ...state, currentDay: day });
  },
  // 하루 뒤로: winter 28(112)→spring 1이면 연도 +1.
  goToNextDay() {
    const newDay = normalizeYearDay(state.currentDay + 1);
    const year = state.currentDay === DAYS_PER_YEAR ? state.year + 1 : state.year;
    let memos =
      year !== state.year ? withYearlyFruit(state.memos, year) : state.memos;
    // 새 날이 비 예보면 그날 물주기를 비가 대신 줘 체인을 진행시킨다(시간 경과).
    if (state.rainDays[newDay]) memos = rainWaterMemos(memos, newDay);
    commit({ ...state, currentDay: newDay, year, memos });
  },
  // 하루 앞으로: spring 1→winter 28이면 연도 -1(최소 1).
  goToPrevDay() {
    // 게임 시작일(1년째 봄 1일) 이전으로는 이동 불가
    if (state.year === 1 && state.currentDay === 1) return;
    const year = state.currentDay === 1 ? Math.max(1, state.year - 1) : state.year;
    const memos =
      year !== state.year ? withYearlyFruit(state.memos, year) : state.memos;
    commit({
      ...state,
      currentDay: normalizeYearDay(state.currentDay - 1),
      year,
      memos,
    });
  },
  // 미니 달력 등에서 특정 (연도, 날짜)로 직접 이동
  goToDate(yearDay: number, year: number) {
    const y = Math.max(1, year);
    const memos = y !== state.year ? withYearlyFruit(state.memos, y) : state.memos;
    commit({ ...state, currentDay: yearDay, year: y, memos });
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
  // 특정 날(yearDay)의 비 예보 설정. 지금 날을 비로 표시하면 그날 물주기를 즉시 비로 처리한다
  // (미래 날은 그 날에 도달할 때 goToNextDay에서 처리).
  setRainDay(yearDay: number, value: boolean) {
    const memos =
      value && yearDay === state.currentDay
        ? rainWaterMemos(state.memos, yearDay)
        : state.memos;
    commit({
      ...state,
      memos,
      rainDays: { ...state.rainDays, [yearDay]: value },
    });
  },
  // 캐릭터 정보 부분 갱신
  setCharacter(patch: Partial<CharacterInfo>) {
    commit({ ...state, character: { ...state.character, ...patch } });
  },
  // 다이얼로그 필터 부분 갱신(마지막 선택값 영속)
  setDialogFilters(patch: Partial<DialogFilters>) {
    commit({ ...state, dialogFilters: { ...state.dialogFilters, ...patch } });
  },
  // 메인 화면 꾸러미 추적 박스 표시 여부
  setBundleTrackerShown(v: boolean) {
    commit({ ...state, bundleTrackerShown: v });
  },
  // 메인 화면 가게 일정 박스 표시 여부
  setShopScheduleShown(v: boolean) {
    commit({ ...state, shopScheduleShown: v });
  },
  // 메인 화면 비 생선 박스 표시 여부
  setRainFishShown(v: boolean) {
    commit({ ...state, rainFishShown: v });
  },
  // 메인 상단 박스 표시 순서 설정
  setMainOrder(order: string[]) {
    commit({ ...state, mainOrder: order });
  },
  // 저장된 모든 설정 초기화(번들·캐릭터·메모·순서·토글 등 전부 기본값으로)
  resetAll() {
    commit({
      version: STATE_VERSION,
      currentDay: 1,
      year: 1,
      memos: [],
      eventFilters: { birthday: true, festival: true, cropDeadline: true, foraging: true },
      reminderToggles: { ...DEFAULT_REMINDER_TOGGLES },
      taskDone: {},
      todoOrder: [...DEFAULT_TODO_ORDER],
      rainDays: {},
      bundleItemsDone: {},
      bundleMode: "standard",
      remixChoices: {},
      seedDefaults: { ...DEFAULT_SEED_DEFAULTS },
      perfectionChecks: {},
      perfectionCounts: {},
      hiddenItems: {},
      addTaskOrder: [...DEFAULT_ADD_TASK_ORDER],
      addTaskChildOrder: defaultChildOrder(),
      achievementsDone: {},
      monsterGoalsDone: {},
      fieldOfficeDone: {},
      museumDone: {},
      character: { ...DEFAULT_CHARACTER },
      dialogFilters: { ...DEFAULT_DIALOG_FILTERS },
      bundleTrackerShown: false,
      shopScheduleShown: false,
      rainFishShown: false,
      mainOrder: [...DEFAULT_MAIN_ORDER],
      notepadText: "",
      minMaxOn: false,
    });
  },
  // 메인 메모장: 자유 텍스트 갱신
  setNotepadText(text: string) {
    commit({ ...state, notepadText: text });
  },
  // Min-Max 가이드 모드 토글(슬롯별 저장 → 슬롯 전환 시 자동 복원)
  setMinMaxOn(value: boolean) {
    commit({ ...state, minMaxOn: value });
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
  // 할 일 추가 메뉴 순서 설정
  setAddTaskOrder(order: string[]) {
    commit({ ...state, addTaskOrder: order });
  },
  // 할 일 추가 하위 항목 순서 설정(그룹별)
  setAddTaskChildOrder(parent: string, order: string[]) {
    commit({
      ...state,
      addTaskChildOrder: { ...state.addTaskChildOrder, [parent]: order },
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
  // 몬스터 박멸 목표 달성 토글
  toggleMonsterGoal(id: string) {
    commit({
      ...state,
      monsterGoalsDone: {
        ...state.monsterGoalsDone,
        [id]: !state.monsterGoalsDone[id],
      },
    });
  },
  // 현장 사무소 기증 토글
  toggleFieldOffice(id: string) {
    commit({
      ...state,
      fieldOfficeDone: { ...state.fieldOfficeDone, [id]: !state.fieldOfficeDone[id] },
    });
  },
  // 박물관 기증 토글
  toggleMuseum(id: string) {
    commit({
      ...state,
      museumDone: { ...state.museumDone, [id]: !state.museumDone[id] },
    });
  },
  // 전체 설정을 JSON 문자열로 내보낸다(기기 이전·백업용 다운로드).
  exportState(): string {
    ensureLoaded();
    return JSON.stringify(state, null, 2);
  },
  // 내보낸 JSON을 불러와 상태를 교체한다(기본값 병합으로 누락 필드·구버전 호환).
  // 형식이 올바르지 않으면 false를 반환하고 상태를 바꾸지 않는다.
  importState(json: string): boolean {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      return false;
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return false;
    commit(mergeSaved(parsed as ScheduleState));
    return true;
  },
};
