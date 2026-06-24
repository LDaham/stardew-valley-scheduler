"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ScheduleProvider, useSchedule } from "@/components/ScheduleProvider";
import { GiftDialogProvider } from "@/components/GiftDialogProvider";
import Dashboard from "@/components/Dashboard";
import SettingsDialog from "@/components/SettingsDialog";
import TodoSettingsDialog from "@/components/TodoSettingsDialog";
import BundleDialog from "@/components/BundleDialog";
import PerfectionDialog from "@/components/PerfectionDialog";
import AchievementDialog from "@/components/AchievementDialog";
import MonsterGoalDialog from "@/components/MonsterGoalDialog";
import FieldOfficeDialog from "@/components/FieldOfficeDialog";
import MuseumDialog from "@/components/MuseumDialog";
import ShopScheduleDialog from "@/components/ShopScheduleDialog";
import SeedEfficiencyDialog from "@/components/SeedEfficiencyDialog";
import FishInfoDialog from "@/components/FishInfoDialog";
import BirthdayGiftDialog from "@/components/BirthdayGiftDialog";
import MoviePreferenceDialog from "@/components/MoviePreferenceDialog";
import CostMaterialsDialog from "@/components/CostMaterialsDialog";
import { ModalModeContext } from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";

// 상단 네비 탭(쿼리파라미터로 URL 동기화)
type MainTab = "today" | "tools" | "progress" | "settings";
// 참고 도구 하위 보기
type ToolView = "seed" | "fish" | "shop" | "cost" | "gift" | "movie";
// 진행도 하위 보기
type ProgressView =
  | "bundle"
  | "perfection"
  | "achievement"
  | "monster"
  | "fieldOffice"
  | "museum";

const TOOL_VIEWS: ToolView[] = ["seed", "fish", "shop", "cost", "gift", "movie"];
const PROGRESS_VIEWS: ProgressView[] = [
  "bundle",
  "perfection",
  "achievement",
  "monster",
  "fieldOffice",
  "museum",
];
const noop = () => {};

function AppShell() {
  const t = useTranslations();
  const { currentDate } = useSchedule();
  // 탭/하위 보기 상태 — URL 쿼리(?tab=&tool=&view=)와 동기화. 경로는 그대로라 전환이 부드럽다.
  const [tab, setTab] = useState<MainTab>("today");
  const [tool, setTool] = useState<ToolView>("seed");
  const [view, setView] = useState<ProgressView>("bundle");
  // 설정 → 메인화면 설정(중첩)은 오버레이 모달로 유지
  const [todoSettingsOpen, setTodoSettingsOpen] = useState(false);

  // 첫 진입/공유 링크/뒤로가기에서 URL → 상태 복원
  useEffect(() => {
    const sync = () => {
      const p = new URLSearchParams(window.location.search);
      const tb = p.get("tab");
      setTab(
        tb === "tools" || tb === "progress" || tb === "settings" ? tb : "today",
      );
      const tl = p.get("tool") as ToolView | null;
      if (tl && TOOL_VIEWS.includes(tl)) setTool(tl);
      const vw = p.get("view") as ProgressView | null;
      if (vw && PROGRESS_VIEWS.includes(vw)) setView(vw);
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  // 상태 변경 + URL 반영(pushState → 뒤로가기로 탭 이동 가능). 리로드 없이 부드럽게 전환.
  const navigate = (
    nextTab: MainTab,
    opts?: { tool?: ToolView; view?: ProgressView },
  ) => {
    const nTool = opts?.tool ?? tool;
    const nView = opts?.view ?? view;
    setTab(nextTab);
    setTool(nTool);
    setView(nView);
    const p = new URLSearchParams();
    if (nextTab !== "today") p.set("tab", nextTab);
    if (nextTab === "tools") p.set("tool", nTool);
    if (nextTab === "progress") p.set("view", nView);
    const qs = p.toString();
    window.history.pushState(
      null,
      "",
      qs ? `?${qs}` : window.location.pathname,
    );
  };

  // 참고 도구 목록(좌측 레이블 ↔ 인라인 콘텐츠)
  const toolItems: { key: ToolView; icon: string; label: string }[] = [
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

  // 진행도 목록
  const progressNav: { key: ProgressView; icon: string; label: string }[] = [
    { key: "bundle", icon: "/icons/ui/bundle.png", label: t("bundle.short") },
    {
      key: "perfection",
      icon: "/icons/ui/perfection.png",
      label: t("perfection.short"),
    },
    {
      key: "achievement",
      icon: "/icons/ui/achievement.jpg",
      label: t("achievement.short"),
    },
    {
      key: "monster",
      icon: "/icons/shops/adventurersGuild.png",
      label: t("monster.short"),
    },
    {
      key: "fieldOffice",
      icon: "/icons/addTask/geode.png",
      label: t("fieldOffice.short"),
    },
    {
      key: "museum",
      icon: "/icons/addTask/museum.png",
      label: t("museum.short"),
    },
  ];

  return (
    <>
      {/* 전체폭 분리형 상단 네비(아이콘+텍스트). 모달(z-50)보다 아래(z-30). */}
      <nav className="sticky top-0 z-30 border-b-2 border-[var(--sv-border)] bg-[var(--sv-panel)]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-1 gap-y-0 px-3 sm:px-5">
          <span className="mr-3 py-2.5 text-base font-extrabold tracking-wide">
            {t("common.appName")}
          </span>
          <NavTab
            icon="/icons/ui/calendar.png"
            label={t("nav.today")}
            active={tab === "today"}
            onClick={() => navigate("today")}
          />
          <NavTab
            icon="/icons/ui/note.png"
            label={t("nav.tools")}
            active={tab === "tools"}
            onClick={() => navigate("tools")}
          />
          <NavTab
            icon="/icons/ui/perfection.png"
            label={t("nav.progress")}
            active={tab === "progress"}
            onClick={() => navigate("progress")}
          />
          <NavTab
            icon="/icons/ui/settings.png"
            label={t("settings.title")}
            active={tab === "settings"}
            onClick={() => navigate("settings")}
            className="ml-auto"
          />
        </div>
      </nav>

      <main className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-5 sm:py-6">
        {/* 오늘: 대시보드(상태 보존 위해 CSS로 숨김) */}
        <div className={tab === "today" ? "" : "hidden"}>
          <Dashboard />
        </div>

        {/* 참고 도구: 좌측 세로 레이블 + 우측 인라인 콘텐츠 */}
        {tab === "tools" && (
          <SectionLayout
            items={toolItems}
            active={tool}
            onSelect={(k) => navigate("tools", { tool: k })}
          >
            <ModalModeContext.Provider value="inline">
              {tool === "seed" && (
                <SeedEfficiencyDialog
                  season={currentDate.season}
                  onClose={noop}
                />
              )}
              {tool === "fish" && (
                <FishInfoDialog season={currentDate.season} onClose={noop} />
              )}
              {tool === "shop" && <ShopScheduleDialog onClose={noop} />}
              {tool === "cost" && <CostMaterialsDialog onClose={noop} />}
              {tool === "gift" && <BirthdayGiftDialog onClose={noop} />}
              {tool === "movie" && <MoviePreferenceDialog onClose={noop} />}
            </ModalModeContext.Provider>
          </SectionLayout>
        )}

        {/* 진행도: 좌측 세로 레이블 + 우측 인라인 콘텐츠 */}
        {tab === "progress" && (
          <SectionLayout
            items={progressNav}
            active={view}
            onSelect={(k) => navigate("progress", { view: k })}
          >
            <ModalModeContext.Provider value="inline">
              {view === "bundle" && <BundleDialog onClose={noop} />}
              {view === "perfection" && <PerfectionDialog onClose={noop} />}
              {view === "achievement" && <AchievementDialog onClose={noop} />}
              {view === "monster" && <MonsterGoalDialog onClose={noop} />}
              {view === "fieldOffice" && <FieldOfficeDialog onClose={noop} />}
              {view === "museum" && <MuseumDialog onClose={noop} />}
            </ModalModeContext.Provider>
          </SectionLayout>
        )}

        {/* 설정: 인라인 패널(메인화면 설정은 오버레이 모달로 진입) */}
        {tab === "settings" && (
          <ModalModeContext.Provider value="inline">
            <SettingsDialog
              onClose={noop}
              onOpenTodoSettings={() => setTodoSettingsOpen(true)}
            />
          </ModalModeContext.Provider>
        )}
      </main>

      {/* 메인화면 설정(설정 페이지 위 오버레이) */}
      {todoSettingsOpen && (
        <TodoSettingsDialog
          onClose={() => setTodoSettingsOpen(false)}
          onBack={() => setTodoSettingsOpen(false)}
        />
      )}
    </>
  );
}

// 상단 네비 탭(밑줄형, 아이콘+텍스트)
function NavTab({
  icon,
  label,
  active,
  onClick,
  className = "",
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`-mb-0.5 flex items-center gap-1.5 border-b-2 px-2.5 py-2.5 text-sm font-semibold sm:px-3 ${
        active
          ? "border-[var(--sv-accent)] text-[var(--sv-accent)]"
          : "border-transparent text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
      } ${className}`}
    >
      <PixelIcon src={icon} size={18} /> {label}
    </button>
  );
}

// 좌측 세로 레이블(모바일은 가로 스크롤) + 우측 콘텐츠 2단 레이아웃
function SectionLayout<K extends string>({
  items,
  active,
  onSelect,
  children,
}: {
  items: { key: K; icon: string; label: string }[];
  active: K;
  onSelect: (key: K) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="lg:grid lg:grid-cols-[180px_1fr] lg:gap-5">
      <aside className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:mb-0 lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map((it) => {
          const on = it.key === active;
          return (
            <button
              key={it.key}
              onClick={() => onSelect(it.key)}
              aria-current={on ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold lg:w-full ${
                on
                  ? "border-transparent bg-[var(--sv-accent)] text-[var(--sv-accent-ink)]"
                  : "border-[var(--sv-border)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
              }`}
            >
              <PixelIcon src={it.icon} size={18} /> {it.label}
            </button>
          );
        })}
      </aside>
      <div className="min-w-0">{children}</div>
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
