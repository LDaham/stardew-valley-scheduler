"use client";

import { useMemo, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";
import TimeIcon from "@/components/TimeIcon";
import SeasonFilter, {
  defaultSeasonSelection,
  matchesSeason,
  type SeasonToken,
} from "@/components/SeasonFilter";
import { FISH, type FishCategory, type FishInfo } from "@/data/fish";
import type { Season } from "@/lib/calendar";

// 낚싯대 내 표시 순서(일반 → 야시장 → 전설 → 전설 II)
const ROD_CATS: (FishCategory | "normal")[] = [
  "normal",
  "nightMarket",
  "legendary",
  "legendaryII",
];
const CAT_LABEL: Record<FishCategory | "normal", string> = {
  normal: "catNormal",
  nightMarket: "catNightMarket",
  legendary: "catLegendary",
  legendaryII: "catLegendaryII",
};

// 날씨·시간 필터 칩(토글). 활성=강조색.
function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        active
          ? "bg-[var(--sv-accent)] text-[var(--sv-accent-ink)]"
          : "border border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
      }`}
    >
      {children}
    </button>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-xs font-semibold text-[var(--sv-ink-muted)]">
        {label}
      </span>
      {children}
    </div>
  );
}

// 시간대 그래프: 가로축 오전 6시(6) → 다음날 오전 2시(26). 잡히는 시간 창만 색칠.
const TL_START = 6;
const TL_END = 26;
const TL_TICKS = [6, 12, 18, 24, 26];
function TimelineBar({ windows }: { windows: number[][] }) {
  const span = TL_END - TL_START;
  const pos = (h: number) => ((h - TL_START) / span) * 100;
  const color = "var(--sv-accent)";
  const tickLabel = (h: number) => (h === 24 ? "0" : h === 26 ? "2" : String(h));
  return (
    <div>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full border border-[var(--sv-border)] bg-[var(--sv-panel)]">
        {/* 정오·자정 등 눈금선 */}
        {TL_TICKS.slice(1, -1).map((h) => (
          <div
            key={h}
            className="absolute inset-y-0 w-px bg-[var(--sv-border)]"
            style={{ left: `${pos(h)}%` }}
          />
        ))}
        {/* 잡히는 시간 창 */}
        {windows.map((w, i) => (
          <div
            key={i}
            className="absolute inset-y-0"
            style={{
              left: `${pos(w[0])}%`,
              width: `${pos(w[1]) - pos(w[0])}%`,
              background: color,
            }}
          />
        ))}
      </div>
      <div className="relative mt-0.5 h-3 text-[8px] leading-none text-[var(--sv-ink-muted)]">
        {TL_TICKS.map((h) => (
          <span
            key={h}
            className="absolute"
            style={{
              left: `${pos(h)}%`,
              transform:
                h === TL_START
                  ? "none"
                  : h === TL_END
                    ? "translateX(-100%)"
                    : "translateX(-50%)",
            }}
          >
            {tickLabel(h)}
          </span>
        ))}
      </div>
    </div>
  );
}

// 생선 정보: 도구(낚싯대/통발)·분류(야시장/전설/전설 II)로 묶어 위치·계절·시간·날씨 표시.
export default function FishInfoDialog({
  season,
  onClose,
  onBack,
  rainPreset = false,
}: {
  season: Season;
  onClose: () => void;
  onBack?: () => void;
  // 비 오는 날 "잡을 수 있는 생선": 필터 UI 숨기고 상시+해당 계절·비·낚싯대(일반+특수) 자동 적용.
  rainPreset?: boolean;
}) {
  const t = useTranslations();
  const { dialogFilters, setDialogFilters } = useSchedule();
  // 프리셋이면 상시+해당 계절 고정. 아니면 저장값(없으면 이번 계절+상시), 마지막 선택 영속.
  const selected = useMemo(
    () =>
      rainPreset
        ? defaultSeasonSelection(season)
        : dialogFilters.fishSeasons
          ? new Set(dialogFilters.fishSeasons as SeasonToken[])
          : defaultSeasonSelection(season),
    [rainPreset, dialogFilters.fishSeasons, season],
  );
  const toggleToken = (tk: SeasonToken) => {
    const next = new Set(selected);
    if (next.has(tk)) next.delete(tk);
    else next.add(tk);
    setDialogFilters({ fishSeasons: [...next] });
  };

  // 날씨 필터(없으면 전체 선택 = 필터 없음). 프리셋이면 비만. 마지막 선택 영속.
  const WEATHER_TOKENS = ["any", "sun", "rain"];
  const weatherSel = rainPreset
    ? new Set(["rain"])
    : new Set(dialogFilters.fishWeather ?? WEATHER_TOKENS);
  const toggleWeather = (v: string) => {
    const base = new Set(dialogFilters.fishWeather ?? WEATHER_TOKENS);
    if (base.has(v)) base.delete(v);
    else base.add(v);
    setDialogFilters({ fishWeather: [...base] });
  };
  const matchWeather = (f: FishInfo) => weatherSel.has(f.weather);

  // 유형 필터: 낚싯대(일반)·낚싯대(특수: 야시장+전설)·게잡이 통발.
  const TYPE_TOKENS = ["rodNormal", "rodSpecial", "crabpot"];
  // 구버전 저장값(rodNightMarket·rodLegendary)은 rodSpecial로 흡수.
  const normalizeType = (x: string) =>
    x === "rodNightMarket" || x === "rodLegendary" ? "rodSpecial" : x;
  const typeSel = rainPreset
    ? new Set(["rodNormal", "rodSpecial"])
    : new Set((dialogFilters.fishType ?? TYPE_TOKENS).map(normalizeType));
  const toggleType = (v: string) => {
    const base = new Set(typeSel);
    if (base.has(v)) base.delete(v);
    else base.add(v);
    setDialogFilters({ fishType: [...base] });
  };
  const typeOf = (f: FishInfo) =>
    f.tool === "crabpot"
      ? "crabpot"
      : f.category === "legendary" ||
          f.category === "legendaryII" ||
          f.category === "nightMarket"
        ? "rodSpecial"
        : "rodNormal";
  const matchType = (f: FishInfo) => typeSel.has(typeOf(f));

  // 계절·날씨·유형 필터 통과 + 이번 계절 우선 정렬
  const sortCur = (list: FishInfo[]) =>
    [...list].sort(
      (a, b) =>
        Number(b.seasons.includes(season)) - Number(a.seasons.includes(season)),
    );
  const visible = FISH.filter(
    (f) =>
      matchesSeason(f.seasons, selected) && matchWeather(f) && matchType(f),
  );
  const rod = sortCur(visible.filter((f) => f.tool === "rod"));
  const crab = sortCur(visible.filter((f) => f.tool === "crabpot"));

  // 박스 안 생선 한 마리: 이미지 + 이름 + 위치만 표시. 내용 폭만큼만 차지(빈 공간 없음).
  const fishItem = (f: FishInfo) => (
    <li
      key={f.id}
      className="flex max-w-full items-center gap-2 rounded-md border border-[var(--sv-border)] bg-[var(--sv-bg)] px-2 py-1.5"
    >
      <Image
        src={asset(`/icons/fish/${f.id}.png`)}
        alt=""
        width={24}
        height={24}
        unoptimized
        className="shrink-0"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="min-w-0">
        <div className="text-sm font-semibold">{t(`fishInfo.${f.id}.name`)}</div>
        <div className="text-[11px] text-[var(--sv-ink-muted)]">
          {t(`fishInfo.${f.id}.location`)}
        </div>
      </div>
    </li>
  );

  // 같은 시간 창끼리 묶기(시작 시각 → 끝 시각 순). 같은 창이면 시간 문자열도 동일.
  const groupByWindow = (list: FishInfo[]) => {
    const map = new Map<string, { windows: number[][]; fish: FishInfo[] }>();
    for (const f of list) {
      const key = JSON.stringify(f.windows);
      if (!map.has(key)) map.set(key, { windows: f.windows, fish: [] });
      map.get(key)!.fish.push(f);
    }
    return [...map.values()].sort(
      (a, b) =>
        a.windows[0][0] - b.windows[0][0] || a.windows[0][1] - b.windows[0][1],
    );
  };

  // 시간대 박스: 헤더(시간 라벨 + 시간 막대) + 해당 시간대 생선 목록.
  const timeBox = (g: { windows: number[][]; fish: FishInfo[] }) => (
    <div
      key={JSON.stringify(g.windows)}
      className="mb-2 rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] p-2"
    >
      <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-[var(--sv-ink-muted)]">
        <TimeIcon size={12} />
        {t(`fishInfo.${g.fish[0].id}.time`)}
      </div>
      <TimelineBar windows={g.windows} />
      <ul className="mt-2 flex flex-wrap gap-1.5">{g.fish.map(fishItem)}</ul>
    </div>
  );

  const toolHeader = (icon: string, label: string) => (
    <h3 className="mb-1.5 flex items-center gap-1.5 border-b border-[var(--sv-border)] pb-1 text-sm font-bold">
      <PixelIcon src={icon} size={16} />
      {label}
    </h3>
  );

  return (
    <Modal title={t("fish.title")} onClose={onClose} onBack={onBack}>
      {/* 프리셋(비 오는 날 잡을 수 있는 생선)에서는 필터 UI를 숨긴다 */}
      {!rainPreset && (
        <div className="mb-3 flex flex-col gap-2">
          <SeasonFilter selected={selected} onToggle={toggleToken} />
          {/* 날씨 필터(토글) */}
          <FilterGroup label={t("fish.weather")}>
            {(["any", "sun", "rain"] as const).map((w) => (
              <FilterChip
                key={w}
                active={weatherSel.has(w)}
                onClick={() => toggleWeather(w)}
              >
                {t(
                  w === "any"
                    ? "fish.weatherAny"
                    : w === "sun"
                      ? "fish.weatherSun"
                      : "fish.weatherRain",
                )}
              </FilterChip>
            ))}
          </FilterGroup>
          {/* 유형 필터(토글) */}
          <FilterGroup label={t("fish.type")}>
            {(["rodNormal", "rodSpecial", "crabpot"] as const).map((tp) => (
              <FilterChip
                key={tp}
                active={typeSel.has(tp)}
                onClick={() => toggleType(tp)}
              >
                {t(
                  tp === "rodNormal"
                    ? "fish.typeRodNormal"
                    : tp === "rodSpecial"
                      ? "fish.typeRodSpecial"
                      : "fish.typeCrabpot",
                )}
              </FilterChip>
            ))}
          </FilterGroup>
        </div>
      )}

      {/* 낚싯대 */}
      {rod.length > 0 && (
        <section className="mb-4">
          {toolHeader("/icons/tools/fishingRod.png", t("fish.toolRod"))}
          {ROD_CATS.map((cat) => {
            const list = rod.filter((f) => (f.category ?? "normal") === cat);
            if (!list.length) return null;
            return (
              <div key={cat} className="mb-2">
                <h4 className="mb-1 text-xs font-semibold text-[var(--sv-ink-muted)]">
                  {t(`fish.${CAT_LABEL[cat]}`)}
                </h4>
                {groupByWindow(list).map(timeBox)}
              </div>
            );
          })}
        </section>
      )}

      {/* 게잡이 통발 */}
      {crab.length > 0 && (
        <section>
          {toolHeader("/icons/tools/crabPot.png", t("fish.toolCrabpot"))}
          {groupByWindow(crab).map(timeBox)}
        </section>
      )}
    </Modal>
  );
}
