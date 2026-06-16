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
import CharacterDialog from "@/components/CharacterDialog";
import AchievementDialog from "@/components/AchievementDialog";
import MinMaxRulesDialog from "@/components/MinMaxRulesDialog";
import PixelIcon from "@/components/PixelIcon";

function AppShell() {
  const t = useTranslations();
  const { minMaxMode } = useSchedule();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [todoSettingsOpen, setTodoSettingsOpen] = useState(false);
  const [bundleOpen, setBundleOpen] = useState(false);
  const [perfectionOpen, setPerfectionOpen] = useState(false);
  const [characterOpen, setCharacterOpen] = useState(false);
  const [achievementOpen, setAchievementOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);

  return (
    <div className="sv-frame mx-auto my-4 flex w-full max-w-5xl flex-col gap-4 p-4 sm:p-6">
      {/* 헤더: 타이틀 배너(중앙) + 좌/우 버튼 그룹 */}
      <header className="flex flex-col gap-3">
        <div className="sv-banner mx-auto px-6 py-2 text-center">
          <h1 className="text-xl font-bold tracking-wide text-[var(--sv-ink)]">
            {t("common.appName")}
          </h1>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* 좌측: 꾸러미 · 완벽 · 업적 */}
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
          </div>
          {/* 우측: (일반) 캐릭터·스케줄러 설정 / (min/max) 규칙 + 설정 */}
          <div className="flex flex-wrap gap-2">
            {minMaxMode ? (
              <button
                onClick={() => setRulesOpen(true)}
                aria-label={t("minMax.rules")}
                className="sv-btn flex items-center gap-1.5 px-3 py-2 text-sm"
              >
                <PixelIcon src="/icons/ui/note.png" size={18} /> {t("minMax.rulesShort")}
              </button>
            ) : (
              <>
                <button
                  onClick={() => setCharacterOpen(true)}
                  aria-label={t("character.open")}
                  className="sv-btn flex items-center gap-1.5 px-3 py-2 text-sm"
                >
                  <PixelIcon src="/icons/ui/character.png" size={18} /> {t("character.short")}
                </button>
                <button
                  onClick={() => setTodoSettingsOpen(true)}
                  aria-label={t("settings.openTodo")}
                  className="sv-btn flex items-center gap-1.5 px-3 py-2 text-sm"
                >
                  <PixelIcon src="/icons/ui/note.png" size={18} /> {t("settings.todoSettings")}
                </button>
              </>
            )}
            <button
              onClick={() => setSettingsOpen(true)}
              aria-label={t("settings.open")}
              className="sv-btn flex items-center gap-1.5 px-3 py-2 text-sm"
            >
              <PixelIcon src="/icons/ui/settings.png" size={18} /> {t("settings.title")}
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
      {characterOpen && (
        <CharacterDialog onClose={() => setCharacterOpen(false)} />
      )}
      {achievementOpen && (
        <AchievementDialog onClose={() => setAchievementOpen(false)} />
      )}
      {rulesOpen && <MinMaxRulesDialog onClose={() => setRulesOpen(false)} />}
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
