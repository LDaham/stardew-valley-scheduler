"use client";

import { useEffect, useSyncExternalStore } from "react";
import { subscribe, getSnapshot } from "@/lib/scheduleStore";
import { applyTheme, subscribeTheme } from "@/lib/themeStore";

// 화면에 항상 마운트되어 테마를 현재 상태에 동기화한다(렌더 출력 없음).
// - 현재 날짜(계절)가 바뀌면 '자동' 계절 테마를 갱신
// - 모드/계절 선택이 바뀌면 즉시 반영
// - 시스템 모드에서 OS 다크 전환 시 반영
export default function ThemeAutoSync() {
  const day = useSyncExternalStore(
    subscribe,
    () => getSnapshot().currentDay,
    () => 1,
  );

  // 첫 페인트 직후 전환을 켠다(초기 로드 페이드 방지). 이후 변경부터 부드럽게 전환.
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      document.documentElement.classList.add("theme-ready"),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  // 날짜 변경 → 계절 자동 테마 재적용
  useEffect(() => {
    applyTheme();
  }, [day]);

  // 모드/계절 선택 변경 → 재적용
  useEffect(() => subscribeTheme(() => applyTheme()), []);

  // 시스템 모드에서 OS 라이트/다크 전환 반영
  useEffect(() => {
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme();
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, []);

  return null;
}
