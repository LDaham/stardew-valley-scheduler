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
import AchievementDialog from "@/components/AchievementDialog";
import ShopScheduleDialog from "@/components/ShopScheduleDialog";
import SeedEfficiencyDialog from "@/components/SeedEfficiencyDialog";
import FishInfoDialog from "@/components/FishInfoDialog";
import BirthdayGiftDialog from "@/components/BirthdayGiftDialog";
import MoviePreferenceDialog from "@/components/MoviePreferenceDialog";
import CostMaterialsDialog from "@/components/CostMaterialsDialog";
import PixelIcon from "@/components/PixelIcon";

// 메인 헤더의 참고 도구(정보 허브를 펼쳐 한 번에 진입). 각 항목은 모달로 열린다.
type InfoView = "shop" | "seed" | "fish" | "gift" | "movie" | "cost";

function AppShell() {
  const t = useTranslations();
  const { currentDate } = useSchedule();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [todoSettingsOpen, setTodoSettingsOpen] = useState(false);
  const [bundleOpen, setBundleOpen] = useState(false);
  const [perfectionOpen, setPerfectionOpen] = useState(false);
  const [achievementOpen, setAchievementOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState<InfoView | null>(null);

  // 헤더 참고 도구 줄(아이콘·라벨은 기존 정보 허브와 동일)
  const infoItems: { key: InfoView; icon: string; label: string }[] = [
    { key: "seed", icon: "/icons/ui/corn.png", label: t("seedEfficiency.short") },
    { key: "fish", icon: "/icons/fish/sardine.png", label: t("fish.title") },
    { key: "shop", icon: "/icons/ui/time.png", label: t("shopSchedule.short") },
    {
      key: "cost",
      icon: "/icons/shops/carpenter.png",
      label: t("costMaterials.title"),
    },
    { key: "gift", icon: "/icons/ui/gift.png", label: t("info.birthdayGift") },
    {
      key: "movie",
      icon: "/icons/snacks/Popcorn.png",
      label: t("info.moviePref"),
    },
  ];

  return (
    <div className="sv-frame mx-auto my-4 flex w-full max-w-5xl flex-col gap-4 p-4 sm:p-6">
      {/* 헤더: 타이틀 바(좌 제목 + 우 꾸러미·완벽·업적·설정) → 참고 도구 줄. 1줄 압축. */}
      <header className="flex flex-col gap-3">
        <div className="sv-banner flex flex-wrap items-center justify-between gap-2 px-4 py-2">
          <h1 className="text-lg font-bold tracking-wide text-[var(--sv-ink)]">
            {t("common.appName")}
          </h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setBundleOpen(true)}
              aria-label={t("bundle.open")}
              className="sv-btn flex items-center gap-1.5 px-2.5 py-1.5 text-sm"
            >
              <PixelIcon src="/icons/ui/bundle.png" size={18} /> {t("bundle.short")}
            </button>
            <button
              onClick={() => setPerfectionOpen(true)}
              aria-label={t("perfection.open")}
              className="sv-btn flex items-center gap-1.5 px-2.5 py-1.5 text-sm"
            >
              <PixelIcon src="/icons/ui/perfection.png" size={18} /> {t("perfection.short")}
            </button>
            <button
              onClick={() => setAchievementOpen(true)}
              aria-label={t("achievement.open")}
              className="sv-btn flex items-center gap-1.5 px-2.5 py-1.5 text-sm"
            >
              <PixelIcon src="/icons/ui/achievement.jpg" size={18} /> {t("achievement.short")}
            </button>
            <button
              onClick={() => setSettingsOpen(true)}
              aria-label={t("settings.open")}
              className="sv-btn flex items-center gap-1.5 px-2.5 py-1.5 text-sm"
            >
              <PixelIcon src="/icons/ui/settings.png" size={18} /> {t("settings.title")}
            </button>
          </div>
        </div>

        {/* 참고 도구 전용 줄: 가게 일정·작물 효율·생선·선물 선호·영화·비용(각각 모달) */}
        <div className="flex flex-wrap gap-2">
          {infoItems.map((it) => (
            <button
              key={it.key}
              onClick={() => setOpenInfo(it.key)}
              className="sv-btn flex items-center gap-1.5 px-2.5 py-1.5 text-sm"
            >
              <PixelIcon src={it.icon} size={18} /> {it.label}
            </button>
          ))}
        </div>
      </header>

      <Dashboard />

      {settingsOpen && (
        <SettingsDialog
          onClose={() => setSettingsOpen(false)}
          onOpenTodoSettings={() => {
            setSettingsOpen(false);
            setTodoSettingsOpen(true);
          }}
        />
      )}
      {todoSettingsOpen && (
        <TodoSettingsDialog
          onClose={() => setTodoSettingsOpen(false)}
          onBack={() => {
            setTodoSettingsOpen(false);
            setSettingsOpen(true);
          }}
        />
      )}
      {bundleOpen && <BundleDialog onClose={() => setBundleOpen(false)} />}
      {perfectionOpen && (
        <PerfectionDialog onClose={() => setPerfectionOpen(false)} />
      )}
      {achievementOpen && (
        <AchievementDialog onClose={() => setAchievementOpen(false)} />
      )}

      {/* 참고 도구 모달(허브 없이 메인에서 바로 진입 — onBack 없음) */}
      {openInfo === "shop" && (
        <ShopScheduleDialog onClose={() => setOpenInfo(null)} />
      )}
      {openInfo === "seed" && (
        <SeedEfficiencyDialog
          season={currentDate.season}
          onClose={() => setOpenInfo(null)}
        />
      )}
      {openInfo === "fish" && (
        <FishInfoDialog
          season={currentDate.season}
          onClose={() => setOpenInfo(null)}
        />
      )}
      {openInfo === "gift" && (
        <BirthdayGiftDialog onClose={() => setOpenInfo(null)} />
      )}
      {openInfo === "movie" && (
        <MoviePreferenceDialog onClose={() => setOpenInfo(null)} />
      )}
      {openInfo === "cost" && (
        <CostMaterialsDialog onClose={() => setOpenInfo(null)} />
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
