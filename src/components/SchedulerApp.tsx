"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ScheduleProvider, useSchedule } from "@/components/ScheduleProvider";
import { GiftDialogProvider } from "@/components/GiftDialogProvider";
import Dashboard from "@/components/Dashboard";
import SettingsDialog from "@/components/SettingsDialog";
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

// 상단 네비 탭(쿼리파라미터로 URL 동기화). 설정은 탭이 아니라 오버레이 모달로 연다.
type MainTab = "today" | "info" | "progress";
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
  // 설정은 오버레이 모달로 연다(별도 페이지 아님).
  const [settingsOpen, setSettingsOpen] = useState(false);

  // 첫 진입/공유 링크/뒤로가기에서 URL → 상태 복원
  useEffect(() => {
    const sync = () => {
      const p = new URLSearchParams(window.location.search);
      const tb = p.get("tab");
      setTab(tb === "info" || tb === "progress" ? tb : "today");
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
    if (nextTab === "info") p.set("tool", nTool);
    if (nextTab === "progress") p.set("view", nView);
    const qs = p.toString();
    window.history.pushState(
      null,
      "",
      qs ? `?${qs}` : window.location.pathname,
    );
  };

  // 상단 메인 탭(오늘·정보·진행도). 모바일 2행·데스크톱 1행에서 동일 목록을 재사용.
  const mainTabs: { key: MainTab; icon: string; label: string }[] = [
    { key: "today", icon: "/icons/ui/calendar.png", label: t("nav.today") },
    { key: "info", icon: "/icons/ui/note.png", label: t("nav.tools") },
    { key: "progress", icon: "/icons/ui/bundle.png", label: t("nav.progress") },
  ];

  // 참고 도구 목록(상단 가로 탭 ↔ 인라인 콘텐츠)
  const toolItems: { key: ToolView; icon: string; label: string }[] = [
    { key: "seed", icon: "/icons/ui/corn.png", label: t("seedEfficiency.short") },
    { key: "fish", icon: "/icons/fish/sardine.png", label: t("fish.title") },
    { key: "shop", icon: "/icons/ui/time.png", label: t("shopSchedule.short") },
    {
      key: "cost",
      icon: "/icons/costMaterials/Backpack.png",
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
  // 표시 순서: 업적 → 완벽 → 꾸러미 → 박물관 → 박멸 목표 → 현장 사무소
  const progressNav: { key: ProgressView; icon: string; label: string }[] = [
    {
      key: "achievement",
      icon: "/icons/ui/achievement.jpg",
      label: t("achievement.short"),
    },
    {
      key: "perfection",
      icon: "/icons/ui/perfection.png",
      label: t("perfection.short"),
    },
    { key: "bundle", icon: "/icons/ui/bundle.png", label: t("bundle.short") },
    {
      key: "museum",
      icon: "/icons/addTask/museum.png",
      label: t("museum.short"),
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
  ];

  return (
    <>
      {/* 전체폭 분리형 상단 네비(아이콘+텍스트). 모달(z-50)보다 아래(z-30).
          모바일: 1행 = 앱 이름(좌)+설정(우), 2행 = 오늘·정보·진행도.
          데스크톱(sm+): 한 줄에 앱 이름·탭·설정 모두 표시. */}
      <nav className="sticky top-0 z-30 border-b-2 border-[var(--sv-border)] bg-[var(--sv-panel)]">
        <div className="mx-auto max-w-5xl px-3 sm:px-5">
          {/* 상단 행: 앱 이름 + (데스크톱)메인 탭 + 설정(우) */}
          <div className="flex items-center gap-x-1">
            <span className="mr-3 py-2.5 text-lg font-extrabold tracking-wide">
              {t("common.appName")}
            </span>
            <div className="hidden items-center gap-x-1 sm:flex">
              {mainTabs.map((m) => (
                <NavTab
                  key={m.key}
                  icon={m.icon}
                  label={m.label}
                  active={tab === m.key}
                  onClick={() => navigate(m.key)}
                />
              ))}
            </div>
            <NavTab
              icon="/icons/ui/settings.png"
              label={t("settings.title")}
              active={settingsOpen}
              onClick={() => setSettingsOpen(true)}
              className="ml-auto"
            />
          </div>
          {/* 모바일 전용 2행: 메인 탭 */}
          <div className="flex items-center gap-x-1 sm:hidden">
            {mainTabs.map((m) => (
              <NavTab
                key={m.key}
                icon={m.icon}
                label={m.label}
                active={tab === m.key}
                onClick={() => navigate(m.key)}
              />
            ))}
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-5 sm:py-6">
        {/* 오늘: 대시보드(상태 보존 위해 CSS로 숨김) */}
        <div className={tab === "today" ? "" : "hidden"}>
          <Dashboard />
        </div>

        {/* 참고 도구: 상단 가로 탭 + 인라인 콘텐츠 */}
        {tab === "info" && (
          <SectionLayout
            items={toolItems}
            active={tool}
            onSelect={(k) => navigate("info", { tool: k })}
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

        {/* 진행도: 상단 가로 탭 + 인라인 콘텐츠 */}
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

      </main>

      {/* 설정: 오버레이 모달(일반/메인화면/오류 보고 탭) */}
      {settingsOpen && <SettingsDialog onClose={() => setSettingsOpen(false)} />}
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
      className={`-mb-0.5 flex items-center gap-1.5 border-b-2 px-2.5 py-2.5 text-[15px] font-semibold sm:px-3 ${
        active
          ? "border-[var(--sv-accent)] text-[var(--sv-accent)]"
          : "border-transparent text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
      } ${className}`}
    >
      <PixelIcon src={icon} size={18} /> {label}
    </button>
  );
}

// 상단 가로 탭(도구/진행도 공용) + 아래 콘텐츠
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
  // 선택된 탭이 가로 스크롤 영역 끝에서 잘려 있으면 보이도록 최소한만 스크롤.
  const activeRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    activeRef.current?.scrollIntoView({
      inline: "nearest", // 잘리지 않을 정도만(가운데 정렬 X)
      block: "nearest", // 세로 스크롤은 건드리지 않음
    });
  }, [active]);

  return (
    <div>
      {/* 도구/진행도 탭: 상단 네비 바와 여백으로 구분되는 가로 알약 탭.
          줄바꿈 없이 좌우 스크롤(라벨이 많아도 한 줄 유지). */}
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {items.map((it) => {
          const on = it.key === active;
          return (
            <button
              key={it.key}
              ref={on ? activeRef : undefined}
              onClick={() => onSelect(it.key)}
              aria-current={on ? "page" : undefined}
              className={`flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold ${
                on
                  ? "border-transparent bg-[var(--sv-accent)] text-[var(--sv-accent-ink)]"
                  : "border-[var(--sv-border)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
              }`}
            >
              <PixelIcon src={it.icon} size={18} /> {it.label}
            </button>
          );
        })}
      </div>
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
