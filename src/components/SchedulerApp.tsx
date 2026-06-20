"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ScheduleProvider, useSchedule } from "@/components/ScheduleProvider";
import { GiftDialogProvider } from "@/components/GiftDialogProvider";
import Dashboard from "@/components/Dashboard";
import SettingsDialog from "@/components/SettingsDialog";
import TodoSettingsDialog from "@/components/TodoSettingsDialog";
import BundleDialog from "@/components/BundleDialog";
import PerfectionDialog from "@/components/PerfectionDialog";
import InfoHubDialog from "@/components/InfoHubDialog";
import AchievementDialog from "@/components/AchievementDialog";
import PixelIcon from "@/components/PixelIcon";

function AppShell() {
  const t = useTranslations();
  const { currentDate } = useSchedule();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [todoSettingsOpen, setTodoSettingsOpen] = useState(false);
  const [bundleOpen, setBundleOpen] = useState(false);
  const [perfectionOpen, setPerfectionOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [achievementOpen, setAchievementOpen] = useState(false);

  return (
    <div className="sv-frame mx-auto my-4 flex w-full max-w-5xl flex-col gap-4 p-4 sm:p-6">
      {/* 헤더: 타이틀 배너(중앙, 우측에 설정 버튼) + 좌/우 버튼 그룹 */}
      <header className="flex flex-col gap-3">
        <div className="relative flex items-center justify-center">
          <div className="sv-banner px-6 py-2 text-center">
            <h1 className="text-xl font-bold tracking-wide text-[var(--sv-ink)]">
              {t("common.appName")}
            </h1>
          </div>
          {/* 설정 버튼: 타이틀 라인 우측으로 이동 */}
          <button
            onClick={() => setSettingsOpen(true)}
            aria-label={t("settings.open")}
            className="sv-btn absolute right-0 flex items-center gap-1.5 px-3 py-2 text-sm"
          >
            <PixelIcon src="/icons/ui/settings.png" size={18} /> {t("settings.title")}
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* 좌측: 꾸러미 · 완벽 · 업적 · 정보 */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setBundleOpen(true)}
              aria-label={t("bundle.open")}
              className="sv-btn flex items-center gap-1.5 px-3 py-2 text-sm"
            >
              <PixelIcon src="/icons/ui/bundle.png" size={18} /> {t("bundle.short")}
            </button>
            <button
              onClick={() => setPerfectionOpen(true)}
              aria-label={t("perfection.open")}
              className="sv-btn flex items-center gap-1.5 px-3 py-2 text-sm"
            >
              <PixelIcon src="/icons/ui/perfection.png" size={18} /> {t("perfection.short")}
            </button>
            <button
              onClick={() => setAchievementOpen(true)}
              aria-label={t("achievement.open")}
              className="sv-btn flex items-center gap-1.5 px-3 py-2 text-sm"
            >
              <PixelIcon src="/icons/ui/achievement.jpg" size={18} /> {t("achievement.short")}
            </button>
            <button
              onClick={() => setInfoOpen(true)}
              aria-label={t("info.open")}
              className="sv-btn flex items-center gap-1.5 px-3 py-2 text-sm"
            >
              <PixelIcon src="/icons/ui/globe.png" size={18} /> {t("info.short")}
            </button>
          </div>
          {/* 우측: 스케줄러 설정 */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTodoSettingsOpen(true)}
              aria-label={t("settings.openTodo")}
              className="sv-btn flex items-center gap-1.5 px-3 py-2 text-sm"
            >
              <PixelIcon src="/icons/ui/note.png" size={18} /> {t("settings.todoSettings")}
            </button>
          </div>
        </div>
      </header>

      <Dashboard />

      {settingsOpen && <SettingsDialog onClose={() => setSettingsOpen(false)} />}
      {todoSettingsOpen && (
        <TodoSettingsDialog onClose={() => setTodoSettingsOpen(false)} />
      )}
      {bundleOpen && <BundleDialog onClose={() => setBundleOpen(false)} />}
      {perfectionOpen && (
        <PerfectionDialog onClose={() => setPerfectionOpen(false)} />
      )}
      {infoOpen && (
        <InfoHubDialog
          season={currentDate.season}
          onClose={() => setInfoOpen(false)}
        />
      )}
      {achievementOpen && (
        <AchievementDialog onClose={() => setAchievementOpen(false)} />
      )}
    </div>
  );
}

export default function SchedulerApp() {
  return (
    <ScheduleProvider>
      <GiftDialogProvider>
        <AppShell />
      </GiftDialogProvider>
    </ScheduleProvider>
  );
}
