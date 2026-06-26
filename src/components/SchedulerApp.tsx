"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ScheduleProvider, useSchedule } from "@/components/ScheduleProvider";
import { GiftDialogProvider } from "@/components/GiftDialogProvider";
import Dashboard from "@/components/Dashboard";
import SettingsDialog from "@/components/SettingsDialog";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Support from "@/components/Support";
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
import Image from "next/image";
import { asset } from "@/lib/asset";

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
      icon: "/icons/ui/fieldOffice.png",
      label: t("fieldOffice.short"),
    },
  ];

  return (
    <>
      {/* 전체폭 분리형 상단 네비(아이콘+텍스트). 모달(z-50)보다 아래(z-30).
          좁은~중간 폭: 앱 이름(좌)+후원·언어·설정(우)만. 메인 탭(오늘·정보·진행도)은 하단 고정 바로.
          넓은 화면(lg+): 한 줄에 앱 이름·탭·우측 컨트롤 모두 표시(하단 바는 숨김). */}
      <nav className="sticky top-0 z-30 border-b-2 border-[var(--sv-border)] bg-[var(--sv-panel)]">
        <div className="mx-auto max-w-5xl px-3 sm:px-5">
          {/* 상단 행: 앱 이름 + (데스크톱)메인 탭 + 설정(우).
              하단 바와 비슷한 높이(약 56px). 밑줄 탭이 하단선에 붙도록 items-stretch,
              로고·언어 등은 self-center로 세로 가운데. */}
          <div className="flex items-stretch gap-x-1 min-h-[3.5rem]">
            {/* 앱 로고(가로형, 약 5:1). 클릭 시 '오늘' 페이지로 이동. */}
            <button
              type="button"
              onClick={() => navigate("today")}
              aria-label={t("nav.today")}
              className="mr-2 shrink-0 cursor-pointer self-center sm:mr-3"
            >
              <Image
                src={asset("/icons/ui/logo.png")}
                alt={t("common.appName")}
                width={2113}
                height={412}
                unoptimized
                priority
                className="h-9 w-auto max-w-[55vw] object-contain sm:h-10 sm:max-w-none"
              />
            </button>
            <div className="hidden items-stretch gap-x-1 lg:flex">
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
            {/* 우측 정렬: 후원 + 언어 선택 + 설정 (모바일은 폭 절약 위해 아이콘 위주) */}
            <div className="ml-auto flex shrink-0 items-stretch gap-x-1 sm:gap-x-2">
              <Support variant="nav" />
              <LocaleSwitcher />
              <NavTab
                icon="/icons/ui/settings.png"
                label={t("settings.title")}
                active={settingsOpen}
                onClick={() => setSettingsOpen(true)}
                iconOnlyMobile
              />
            </div>
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

      {/* 모바일 하단 고정 네비 바: 오늘·정보·진행도(lg+는 상단 인라인이라 숨김).
          모달(z-50)보다 아래(z-30). iOS 홈 인디케이터 대응 safe-area 패딩. */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-[var(--sv-border)] bg-[var(--sv-panel)] pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        <div className="mx-auto flex max-w-5xl">
          {mainTabs.map((m) => {
            const active = tab === m.key;
            return (
              <button
                key={m.key}
                onClick={() => navigate(m.key)}
                aria-current={active ? "page" : undefined}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-semibold ${
                  active
                    ? "text-[var(--sv-accent)]"
                    : "text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
                }`}
              >
                <PixelIcon src={m.icon} size={22} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

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
  iconOnlyMobile = false,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
  iconOnlyMobile?: boolean; // 모바일에선 아이콘만(라벨 숨김) — 네비 폭 절약
}) {
  return (
    <button
      onClick={onClick}
      aria-label={iconOnlyMobile ? label : undefined}
      aria-current={active ? "page" : undefined}
      className={`-mb-0.5 flex items-center gap-1.5 whitespace-nowrap border-b-2 px-2.5 py-2.5 text-[15px] font-semibold sm:px-3 ${
        active
          ? "border-[var(--sv-accent)] text-[var(--sv-accent)]"
          : "border-transparent text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
      } ${className}`}
    >
      <PixelIcon src={icon} size={18} />
      <span className={iconOnlyMobile ? "hidden sm:inline" : ""}>{label}</span>
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
  // 선택된 탭을 가로 스크롤 영역 '가운데'로 부드럽게 이동.
  // 페이지/세로 스크롤은 건드리지 않도록 scrollIntoView 대신 컨테이너만 직접 스크롤한다.
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const c = scrollRef.current;
    const b = activeRef.current;
    if (!c || !b) return;
    const cRect = c.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    // 선택 항목 중심이 컨테이너 중심에 오도록 필요한 스크롤량 계산(끝 항목은 자동으로 양끝에 클램프됨).
    const delta =
      bRect.left - cRect.left - (c.clientWidth - b.clientWidth) / 2;
    c.scrollTo({ left: c.scrollLeft + delta, behavior: "smooth" });
  }, [active]);

  return (
    <div>
      {/* 도구/진행도 탭: 상단 네비 바와 여백으로 구분되는 가로 알약 탭.
          줄바꿈 없이 좌우 스크롤(라벨이 많아도 한 줄 유지). */}
      <div ref={scrollRef} className="mb-5 flex gap-2 overflow-x-auto pb-1">
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
