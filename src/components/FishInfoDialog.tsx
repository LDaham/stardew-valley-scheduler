"use client";

import { useMemo } from "react";
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

// 생선 정보: 도구(낚싯대/통발)·분류(야시장/전설/전설 II)로 묶어 위치·계절·시간·날씨 표시.
export default function FishInfoDialog({
  season,
  onClose,
  onBack,
}: {
  season: Season;
  onClose: () => void;
  onBack?: () => void;
}) {
  const t = useTranslations();
  const { dialogFilters, setDialogFilters } = useSchedule();
  // 저장값 없으면 이번 계절+상시. 마지막 선택값 영속.
  const selected = useMemo(
    () =>
      dialogFilters.fishSeasons
        ? new Set(dialogFilters.fishSeasons as SeasonToken[])
        : defaultSeasonSelection(season),
    [dialogFilters.fishSeasons, season],
  );
  const toggleToken = (tk: SeasonToken) => {
    const next = new Set(selected);
    if (next.has(tk)) next.delete(tk);
    else next.add(tk);
    setDialogFilters({ fishSeasons: [...next] });
  };

  // 계절 필터 통과 + 이번 계절 우선 정렬
  const sortCur = (list: FishInfo[]) =>
    [...list].sort(
      (a, b) =>
        Number(b.seasons.includes(season)) - Number(a.seasons.includes(season)),
    );
  const visible = FISH.filter((f) => matchesSeason(f.seasons, selected));
  const rod = sortCur(visible.filter((f) => f.tool === "rod"));
  const crab = sortCur(visible.filter((f) => f.tool === "crabpot"));

  // 계절별 고유 색(꾸러미·필터와 동일). 이번 계절은 외곽선으로 강조.
  const SEASON_BG: Record<Season, string> = {
    spring: "var(--season-spring)",
    summer: "var(--season-summer)",
    fall: "var(--season-fall)",
    winter: "var(--season-winter)",
  };
  const seasonChip = (s: Season, active: boolean) => (
    <span
      key={s}
      style={{ background: SEASON_BG[s] }}
      className={`shrink-0 rounded px-1 py-0.5 text-[10px] font-semibold text-[var(--sv-ink)] ${
        active ? "ring-1 ring-[var(--sv-ink)]" : ""
      }`}
    >
      {t(`seasons.${s}`)}
    </span>
  );

  const fishRow = (f: FishInfo) => {
    const allSeasons = f.seasons.length === 4;
    return (
      <li
        key={f.id}
        className="flex items-start gap-2 rounded-md bg-[var(--sv-bg)] px-2 py-1.5"
      >
        <Image
          src={asset(`/icons/fish/${f.id}.png`)}
          alt=""
          width={24}
          height={24}
          unoptimized
          className="mt-0.5 shrink-0"
          style={{ imageRendering: "pixelated" }}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-semibold">
              {t(`fishInfo.${f.id}.name`)}
            </span>
            {allSeasons ? (
              <span className="shrink-0 rounded bg-[var(--sv-border)] px-1 py-0.5 text-[10px] font-semibold text-[var(--sv-ink-muted)]">
                {t("fish.allSeasons")}
              </span>
            ) : (
              f.seasons.map((s) => seasonChip(s, s === season))
            )}
            {f.weather === "rain" && (
              <span className="flex shrink-0 items-center gap-0.5 rounded bg-[var(--season-winter)] px-1 py-0.5 text-[10px] font-semibold text-[var(--sv-ink)]">
                <PixelIcon src="/icons/ui/rain.png" size={10} />
                {t("fish.weatherRain")}
              </span>
            )}
            {f.weather === "sun" && (
              <span className="shrink-0 rounded bg-[var(--season-summer)] px-1 py-0.5 text-[10px] font-semibold text-[var(--sv-ink)]">
                {t("fish.weatherSun")}
              </span>
            )}
          </div>
          <div className="text-xs text-[var(--sv-ink-muted)]">
            {t("fish.location")}: {t(`fishInfo.${f.id}.location`)}
          </div>
          <div className="flex items-center gap-1 text-xs text-[var(--sv-ink-muted)]">
            <TimeIcon size={12} />
            {t(`fishInfo.${f.id}.time`)}
          </div>
        </div>
      </li>
    );
  };

  const toolHeader = (icon: string, label: string) => (
    <h3 className="mb-1.5 flex items-center gap-1.5 border-b border-[var(--sv-border)] pb-1 text-sm font-bold">
      <PixelIcon src={icon} size={16} />
      {label}
    </h3>
  );

  return (
    <Modal title={t("fish.title")} onClose={onClose} onBack={onBack}>
      <div className="mb-3">
        <SeasonFilter selected={selected} onToggle={toggleToken} />
      </div>

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
                <ul className="flex flex-col gap-1.5">{list.map(fishRow)}</ul>
              </div>
            );
          })}
        </section>
      )}

      {/* 게잡이 통발 */}
      {crab.length > 0 && (
        <section>
          {toolHeader("/icons/tools/crabPot.png", t("fish.toolCrabpot"))}
          <ul className="flex flex-col gap-1.5">{crab.map(fishRow)}</ul>
        </section>
      )}
    </Modal>
  );
}
