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
import AddTaskDialog from "@/components/AddTaskDialog";
import PixelIcon from "@/components/PixelIcon";

// 메인 헤더의 참고 도구(정보 허브를 펼쳐 한 번에 진입). 각 항목은 모달로 열린다.
type InfoView = "shop" | "seed" | "fish" | "gift" | "movie" | "cost";
// 모바일 하단 탭(데스크탑은 무시). 설정은 탭이 아니라 바로 모달로 연다.
type MobileTab = "today" | "tools" | "progress";

function AppShell() {
  const t = useTranslations();
  const { currentDate } = useSchedule();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [todoSettingsOpen, setTodoSettingsOpen] = useState(false);
  const [bundleOpen, setBundleOpen] = useState(false);
  const [perfectionOpen, setPerfectionOpen] = useState(false);
  const [achievementOpen, setAchievementOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState<InfoView | null>(null);
  // 모바일 전용 상태(데스크탑은 항상 대시보드 전체 노출)
  const [mobileTab, setMobileTab] = useState<MobileTab>("today");
  const [mobileAddOpen, setMobileAddOpen] = useState(false);

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

  // 진행도 그룹(모바일 '진행도' 탭 그리드)
  const progressItems: { icon: string; label: string; onClick: () => void }[] = [
    {
      icon: "/icons/ui/bundle.png",
      label: t("bundle.short"),
      onClick: () => setBundleOpen(true),
    },
    {
      icon: "/icons/ui/perfection.png",
      label: t("perfection.short"),
      onClick: () => setPerfectionOpen(true),
    },
    {
      icon: "/icons/ui/achievement.jpg",
      label: t("achievement.short"),
      onClick: () => setAchievementOpen(true),
    },
  ];

  return (
    <div className="sv-frame mx-auto my-4 flex w-full max-w-5xl flex-col gap-4 p-4 sm:p-6 lg:pb-6">
      {/* 데스크탑 헤더(≥lg): 타이틀 바 + 참고 도구 줄. 모바일은 하단 탭바로 대체. */}
      <header className="hidden flex-col gap-3 lg:flex">
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

      {/* 모바일 상단 바(<lg): 앱 이름만(버튼 군집은 하단 탭바로 이동) */}
      <div className="sv-banner flex items-center justify-between gap-2 px-4 py-2 lg:hidden">
        <h1 className="text-base font-bold tracking-wide text-[var(--sv-ink)]">
          {t("common.appName")}
        </h1>
      </div>

      {/* 오늘(대시보드): 데스크탑 항상 표시, 모바일은 '오늘' 탭에서만(상태 보존 위해 CSS로 숨김) */}
      <div className={mobileTab === "today" ? "" : "hidden lg:block"}>
        <Dashboard />
      </div>

      {/* 참고 도구 패널(모바일 전용): 아이콘 그리드 → 기존 모달 */}
      {mobileTab === "tools" && (
        <section className="lg:hidden">
          <h2 className="mb-3 text-base font-bold text-[var(--sv-ink-muted)]">
            {t("nav.tools")}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {infoItems.map((it) => (
              <button
                key={it.key}
                onClick={() => setOpenInfo(it.key)}
                className="sv-box flex flex-col items-center justify-center gap-2 px-3 py-5 text-sm font-semibold"
              >
                <PixelIcon src={it.icon} size={32} />
                {it.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 진행도 패널(모바일 전용): 꾸러미·완벽·업적 */}
      {mobileTab === "progress" && (
        <section className="lg:hidden">
          <h2 className="mb-3 text-base font-bold text-[var(--sv-ink-muted)]">
            {t("nav.progress")}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {progressItems.map((it) => (
              <button
                key={it.label}
                onClick={it.onClick}
                className="sv-box flex flex-col items-center justify-center gap-2 px-3 py-5 text-sm font-semibold"
              >
                <PixelIcon src={it.icon} size={32} />
                {it.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 하단 탭바 + 중앙 ＋FAB(모바일 전용, 뷰포트 고정). 모달(z-50)보다 아래(z-40). */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-stretch border-t border-[var(--sv-border)] bg-[var(--sv-panel)] pb-[env(safe-area-inset-bottom)] lg:hidden">
        <TabBtn
          icon="/icons/ui/calendar.png"
          label={t("nav.today")}
          active={mobileTab === "today"}
          onClick={() => setMobileTab("today")}
        />
        <TabBtn
          icon="/icons/ui/note.png"
          label={t("nav.tools")}
          active={mobileTab === "tools"}
          onClick={() => setMobileTab("tools")}
        />
        {/* 중앙 FAB 자리: 오늘 할 일 추가 */}
        <div className="relative flex w-16 shrink-0 items-start justify-center">
          <button
            onClick={() => setMobileAddOpen(true)}
            aria-label={t("nav.addTask")}
            className="absolute -top-5 flex size-14 items-center justify-center rounded-full border-4 border-[var(--sv-bg)] bg-[var(--sv-accent)] text-2xl font-bold text-[var(--sv-accent-ink)] shadow-lg"
          >
            ＋
          </button>
        </div>
        <TabBtn
          icon="/icons/ui/perfection.png"
          label={t("nav.progress")}
          active={mobileTab === "progress"}
          onClick={() => setMobileTab("progress")}
        />
        <TabBtn
          icon="/icons/ui/settings.png"
          label={t("settings.title")}
          active={false}
          onClick={() => setSettingsOpen(true)}
        />
      </nav>

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

      {/* 모바일 ＋FAB: 오늘 할 일 추가(데스크탑은 대시보드 내 버튼 사용) */}
      {mobileAddOpen && (
        <AddTaskDialog
          baseDate={currentDate}
          dayLabel={t("dashboard.today")}
          onClose={() => setMobileAddOpen(false)}
        />
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

// 모바일 하단 탭 버튼(아이콘 + 라벨). 활성은 라벨 색·굵기로 표시.
function TabBtn({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] ${
        active
          ? "font-bold text-[var(--sv-accent)]"
          : "text-[var(--sv-ink-muted)]"
      }`}
    >
      <PixelIcon src={icon} size={22} />
      {label}
    </button>
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
