// 테마 선택 상태(모드 × 계절 2축). localStorage 영속 + 구독 알림.
// 모드: 시스템/라이트/다크 → 밝기 결정. 계절: 자동/봄/여름/가을/겨울 → 색조 결정.
// 최종 data-theme = 계절(+Dark). 자동 계절은 오늘 페이지의 현재 날짜를 따른다.

import { fromYearDay, type Season } from "@/lib/calendar";
import { getSnapshot } from "@/lib/scheduleStore";

export type ThemeMode = "system" | "light" | "dark";
export type SeasonPref = "auto" | Season;

const MODE_KEY = "svThemeMode";
const SEASON_KEY = "svThemeSeason";

// 구버전 단일 키(svTheme)를 모드/계절 2축으로 1회 이전.
function migrate(): { mode: ThemeMode; season: SeasonPref } {
  const old = localStorage.getItem("svTheme");
  const map: Record<string, { mode: ThemeMode; season: SeasonPref }> = {
    system: { mode: "system", season: "auto" },
    light: { mode: "light", season: "auto" },
    dark: { mode: "dark", season: "auto" },
    spring: { mode: "light", season: "spring" },
    summer: { mode: "light", season: "summer" },
    fall: { mode: "light", season: "fall" },
    winter: { mode: "light", season: "winter" },
    springDark: { mode: "dark", season: "spring" },
    summerDark: { mode: "dark", season: "summer" },
    fallDark: { mode: "dark", season: "fall" },
    winterDark: { mode: "dark", season: "winter" },
  };
  return (old && map[old]) || { mode: "system", season: "auto" };
}

// SSR/하이드레이션 첫 렌더 기준값(부트스트랩 인라인 스크립트와 동일한 기본값).
const SERVER_SNAPSHOT: { mode: ThemeMode; season: SeasonPref } = {
  mode: "system",
  season: "auto",
};

let snapshot = SERVER_SNAPSHOT;
let initialized = false;
const listeners = new Set<() => void>();

function init(): void {
  if (initialized || typeof window === "undefined") return;
  const m = localStorage.getItem(MODE_KEY) as ThemeMode | null;
  const s = localStorage.getItem(SEASON_KEY) as SeasonPref | null;
  snapshot = m && s ? { mode: m, season: s } : migrate();
  initialized = true;
}

export function getThemePref(): { mode: ThemeMode; season: SeasonPref } {
  init();
  return snapshot;
}

export function getServerThemePref(): { mode: ThemeMode; season: SeasonPref } {
  return SERVER_SNAPSHOT;
}

export function subscribeTheme(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function osDark(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

// 모드+계절+현재 날짜 → data-theme 이름(spring | springDark | ...).
export function resolveThemeName(
  mode: ThemeMode,
  season: SeasonPref,
  day: number,
): string {
  const seas: Season = season === "auto" ? fromYearDay(day).season : season;
  const dark = mode === "dark" || (mode === "system" && osDark());
  return dark ? `${seas}Dark` : seas;
}

// 현재 선택 + 현재 날짜로 data-theme를 적용한다(자동 계절 포함).
export function applyTheme(): void {
  init();
  const day = getSnapshot().currentDay;
  document.documentElement.setAttribute(
    "data-theme",
    resolveThemeName(snapshot.mode, snapshot.season, day),
  );
}

export function setMode(mode: ThemeMode): void {
  init();
  snapshot = { ...snapshot, mode };
  try {
    localStorage.setItem(MODE_KEY, mode);
  } catch {}
  applyTheme();
  listeners.forEach((l) => l());
}

export function setSeason(season: SeasonPref): void {
  init();
  snapshot = { ...snapshot, season };
  try {
    localStorage.setItem(SEASON_KEY, season);
  } catch {}
  applyTheme();
  listeners.forEach((l) => l());
}
