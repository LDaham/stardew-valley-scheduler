// Min-Max Guide 토글 상태(전역 UI 설정). localStorage 영속 + 구독 알림.
// 켜면 '오늘' 페이지가 기존 데이터 대신 해당 날짜의 Min-Max 가이드 할 일을 표시한다.
// 가이드 날짜는 실제 진행 날짜·연도와 분리된 전용 상태로, 항상 1년차 범위
// (봄 1일~겨울 28일)로 제한된다. themeStore와 동일한 useSyncExternalStore 패턴.

import {
  DAYS_PER_YEAR,
  fromYearDay,
  toYearDay,
  type SDate,
} from "@/lib/calendar";

const KEY = "svMinMaxGuide";
const KEY_DATE = "svMinMaxDay"; // 가이드 전용 날짜(1..112)

// SSR/하이드레이션 첫 렌더 기준값(기본 꺼짐).
const SERVER_SNAPSHOT = false;

let snapshot = SERVER_SNAPSHOT;
let initialized = false;
const listeners = new Set<() => void>();

function init(): void {
  if (initialized || typeof window === "undefined") return;
  snapshot = localStorage.getItem(KEY) === "1";
  initialized = true;
}

export function getMinMaxPref(): boolean {
  init();
  return snapshot;
}

export function getServerMinMaxPref(): boolean {
  return SERVER_SNAPSHOT;
}

export function subscribeMinMax(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function setMinMax(on: boolean): void {
  init();
  snapshot = on;
  try {
    localStorage.setItem(KEY, on ? "1" : "0");
  } catch {}
  listeners.forEach((l) => l());
}

export function toggleMinMax(): void {
  setMinMax(!getMinMaxPref());
}

// ── 가이드 전용 날짜(실제 진행 날짜와 분리, 항상 1년차 범위) ──────────────
const SERVER_DATE: SDate = { season: "spring", day: 1 };
let dateSnapshot: SDate = SERVER_DATE; // 안정 참조(바뀔 때만 새 객체)
let dateInit = false;

function clampYd(yd: number): number {
  return Math.min(DAYS_PER_YEAR, Math.max(1, yd));
}

function initDate(): void {
  if (dateInit || typeof window === "undefined") return;
  const raw = Number(localStorage.getItem(KEY_DATE));
  if (Number.isFinite(raw) && raw >= 1 && raw <= DAYS_PER_YEAR) {
    dateSnapshot = fromYearDay(raw);
  }
  dateInit = true;
}

export function getMinMaxDate(): SDate {
  initDate();
  return dateSnapshot;
}

export function getServerMinMaxDate(): SDate {
  return SERVER_DATE;
}

// 가이드 날짜 설정(1..112로 클램프 — 1년차를 벗어나지 않는다).
export function setMinMaxDate(date: SDate): void {
  initDate();
  const yd = clampYd(toYearDay(date));
  dateSnapshot = fromYearDay(yd); // 새 안정 참조
  try {
    localStorage.setItem(KEY_DATE, String(yd));
  } catch {}
  listeners.forEach((l) => l());
}
