"use client";

import { useSyncExternalStore } from "react";
import { fromYearDay, toYearDay, type SDate } from "@/lib/calendar";
import {
  getServerSnapshot,
  getSnapshot,
  scheduleActions,
  subscribe,
} from "@/lib/scheduleStore";
import type { Memo } from "@/types/schedule";

// 외부 스토어를 React 컨텍스트 없이도 쓸 수 있어 Provider는 단순 패스스루로 둔다.
export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useSchedule() {
  const state = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const currentDate = fromYearDay(state.currentDay);

  return {
    currentDate,
    memos: state.memos,
    eventFilters: state.eventFilters,
    reminderToggles: state.reminderToggles,
    taskDone: state.taskDone,
    todoOrder: state.todoOrder,
    memoCategoryToggles: state.memoCategoryToggles,
    rainDays: state.rainDays,
    wateringCanUpgrades: state.wateringCanUpgrades,
    bundleItemsDone: state.bundleItemsDone,
    memosOn: (date: SDate): Memo[] =>
      state.memos.filter(
        (m) => m.season === date.season && m.day === date.day,
      ),
    setCurrentDate: (date: SDate) =>
      scheduleActions.setCurrentDay(toYearDay(date)),
    addMemo: scheduleActions.addMemo,
    addMemos: scheduleActions.addMemos,
    updateMemo: scheduleActions.updateMemo,
    deleteMemo: scheduleActions.deleteMemo,
    toggleDone: scheduleActions.toggleDone,
    setEventFilter: scheduleActions.setEventFilter,
    setReminderToggle: scheduleActions.setReminderToggle,
    toggleTask: scheduleActions.toggleTask,
    setTodoOrder: scheduleActions.setTodoOrder,
    setMemoCategoryToggle: scheduleActions.setMemoCategoryToggle,
    setRainDay: scheduleActions.setRainDay,
    incWateringCanUpgrades: scheduleActions.incWateringCanUpgrades,
    toggleBundleItem: scheduleActions.toggleBundleItem,
  };
}
