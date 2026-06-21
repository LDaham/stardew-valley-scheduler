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
    year: state.year,
    memos: state.memos,
    eventFilters: state.eventFilters,
    reminderToggles: state.reminderToggles,
    taskDone: state.taskDone,
    todoOrder: state.todoOrder,
    rainDays: state.rainDays,
    bundleItemsDone: state.bundleItemsDone,
    bundleMode: state.bundleMode,
    remixChoices: state.remixChoices,
    seedDefaults: state.seedDefaults,
    perfectionChecks: state.perfectionChecks,
    perfectionCounts: state.perfectionCounts,
    hiddenItems: state.hiddenItems,
    addTaskOrder: state.addTaskOrder,
    addTaskChildOrder: state.addTaskChildOrder,
    achievementsDone: state.achievementsDone,
    character: state.character,
    dialogFilters: state.dialogFilters,
    bundleTrackerShown: state.bundleTrackerShown,
    shopScheduleShown: state.shopScheduleShown,
    rainFishShown: state.rainFishShown,
    mainOrder: state.mainOrder,
    notepadText: state.notepadText,
    memosOn: (date: SDate): Memo[] =>
      state.memos.filter(
        (m) => m.season === date.season && m.day === date.day,
      ),
    setCurrentDate: (date: SDate) =>
      scheduleActions.setCurrentDay(toYearDay(date)),
    goToNextDay: scheduleActions.goToNextDay,
    goToPrevDay: scheduleActions.goToPrevDay,
    goToDate: (date: SDate, yr: number) =>
      scheduleActions.goToDate(toYearDay(date), yr),
    addMemo: scheduleActions.addMemo,
    addMemos: scheduleActions.addMemos,
    updateMemo: scheduleActions.updateMemo,
    deleteMemo: scheduleActions.deleteMemo,
    deleteMemos: scheduleActions.deleteMemos,
    toggleDone: scheduleActions.toggleDone,
    setDoneMany: scheduleActions.setDoneMany,
    setEventFilter: scheduleActions.setEventFilter,
    setReminderToggle: scheduleActions.setReminderToggle,
    toggleTask: scheduleActions.toggleTask,
    setTodoOrder: scheduleActions.setTodoOrder,
    setRainDay: scheduleActions.setRainDay,
    toggleBundleItem: scheduleActions.toggleBundleItem,
    setBundleMode: scheduleActions.setBundleMode,
    setRemixChoice: scheduleActions.setRemixChoice,
    setSeedDefaults: scheduleActions.setSeedDefaults,
    togglePerfCheck: scheduleActions.togglePerfCheck,
    setPerfCount: scheduleActions.setPerfCount,
    setHiddenItem: scheduleActions.setHiddenItem,
    setAddTaskOrder: scheduleActions.setAddTaskOrder,
    setAddTaskChildOrder: scheduleActions.setAddTaskChildOrder,
    toggleAchievement: scheduleActions.toggleAchievement,
    setCharacter: scheduleActions.setCharacter,
    setDialogFilters: scheduleActions.setDialogFilters,
    setBundleTrackerShown: scheduleActions.setBundleTrackerShown,
    setShopScheduleShown: scheduleActions.setShopScheduleShown,
    setRainFishShown: scheduleActions.setRainFishShown,
    setMainOrder: scheduleActions.setMainOrder,
    setNotepadText: scheduleActions.setNotepadText,
    resetAll: scheduleActions.resetAll,
  };
}
