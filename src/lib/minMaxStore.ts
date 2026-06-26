// Min-Max Guide 토글 상태(전역 UI 설정). localStorage 영속 + 구독 알림.
// 켜면 '오늘' 페이지가 기존 데이터 대신 해당 날짜의 Min-Max 가이드 할 일을 표시한다.
// (날짜 네비게이션은 유지) — themeStore와 동일한 useSyncExternalStore 패턴.

const KEY = "svMinMaxGuide";

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
