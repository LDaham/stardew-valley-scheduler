// Min-Max Guide 전용 날짜 상태(전역). localStorage 영속 + 구독 알림.
// 가이드 날짜는 실제 진행 날짜·연도와 분리된 전용 상태로, 항상 1년차 범위
// (봄 1일~겨울 28일)로 제한된다. themeStore와 동일한 useSyncExternalStore 패턴.
//
// 가이드 모드 on/off는 슬롯별로 저장해야 하므로 scheduleStore(ScheduleState.minMaxOn)로 이전됐다.
// 여기서는 가이드 날짜만 다룬다(슬롯과 무관한 전역 보조 상태).

import {
  DAYS_PER_YEAR,
  fromYearDay,
  toYearDay,
  type SDate,
} from "@/lib/calendar";

const KEY_DATE = "svMinMaxDay"; // 가이드 전용 날짜(1..112)

const listeners = new Set<() => void>();

export function subscribeMinMax(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
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
