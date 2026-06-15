"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { SDate } from "@/lib/calendar";
import { ScheduleProvider } from "@/components/ScheduleProvider";
import { GiftDialogProvider } from "@/components/GiftDialogProvider";
import Dashboard from "@/components/Dashboard";
import Calendar from "@/components/Calendar";
import SettingsDialog from "@/components/SettingsDialog";
import TodoSettingsDialog from "@/components/TodoSettingsDialog";
import BundleDialog from "@/components/BundleDialog";
import PerfectionDialog from "@/components/PerfectionDialog";
import CharacterDialog from "@/components/CharacterDialog";
import MyTasksDialog from "@/components/MyTasksDialog";
import PixelIcon from "@/components/PixelIcon";

function AppShell() {
  const t = useTranslations();
  const [selectedDate, setSelectedDate] = useState<SDate | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [todoSettingsOpen, setTodoSettingsOpen] = useState(false);
  const [bundleOpen, setBundleOpen] = useState(false);
  const [perfectionOpen, setPerfectionOpen] = useState(false);
  const [characterOpen, setCharacterOpen] = useState(false);
  const [myTasksOpen, setMyTasksOpen] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4">
      {/* 헤더 */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{t("common.appName")}</h1>
          <p className="text-xs text-[var(--sv-ink-muted)]">
            {t("home.subtitle")}
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <button
            onClick={() => setBundleOpen(true)}
            aria-label={t("bundle.open")}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--sv-border)] bg-[var(--sv-panel)] px-3 py-2 text-sm hover:bg-[var(--sv-bg)]"
          >
            <PixelIcon src="/icons/ui/bundle.png" size={18} /> {t("bundle.short")}
          </button>
          <button
            onClick={() => setPerfectionOpen(true)}
            aria-label={t("perfection.open")}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--sv-border)] bg-[var(--sv-panel)] px-3 py-2 text-sm hover:bg-[var(--sv-bg)]"
          >
            <PixelIcon src="/icons/ui/perfection.png" size={18} /> {t("perfection.short")}
          </button>
          <button
            onClick={() => setMyTasksOpen(true)}
            aria-label={t("myTasks.open")}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--sv-border)] bg-[var(--sv-panel)] px-3 py-2 text-sm hover:bg-[var(--sv-bg)]"
          >
            <PixelIcon src="/icons/ui/note.png" size={18} /> {t("myTasks.short")}
          </button>
          <button
            onClick={() => setCharacterOpen(true)}
            aria-label={t("character.open")}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--sv-border)] bg-[var(--sv-panel)] px-3 py-2 text-sm hover:bg-[var(--sv-bg)]"
          >
            <PixelIcon src="/icons/ui/character.png" size={18} /> {t("character.short")}
          </button>
          <button
            onClick={() => setTodoSettingsOpen(true)}
            aria-label={t("settings.openTodo")}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--sv-border)] bg-[var(--sv-panel)] px-3 py-2 text-sm hover:bg-[var(--sv-bg)]"
          >
            <PixelIcon src="/icons/ui/note.png" size={18} /> {t("settings.todoSettings")}
          </button>
          <button
            onClick={() => setSettingsOpen(true)}
            aria-label={t("settings.open")}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--sv-border)] bg-[var(--sv-panel)] px-3 py-2 text-sm hover:bg-[var(--sv-bg)]"
          >
            <PixelIcon src="/icons/ui/settings.png" size={18} /> {t("settings.title")}
          </button>
        </div>
      </header>

      <Dashboard onSelectDate={setSelectedDate} />

      {/* 캘린더 */}
      <Calendar selectedDate={selectedDate} onSelectDate={setSelectedDate} />

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
      {myTasksOpen && <MyTasksDialog onClose={() => setMyTasksOpen(false)} />}
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
