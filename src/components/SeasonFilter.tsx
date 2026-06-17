"use client";

import { useTranslations } from "next-intl";
import PixelIcon from "@/components/PixelIcon";
import type { Season } from "@/lib/calendar";

// 계절 필터 토큰: 상시(사계절) + 4계절 + 비(선택 노출)
export type SeasonToken = "all" | Season | "rain";
export const SEASON_TOKENS: SeasonToken[] = [
  "all",
  "spring",
  "summer",
  "fall",
  "winter",
];

// 항목의 계절 토큰: 빈 배열/4계절이면 상시, 그 외엔 해당 계절들
export function itemSeasonTokens(seasons: Season[]): SeasonToken[] {
  return seasons.length === 0 || seasons.length === 4 ? ["all"] : seasons;
}

// 선택된 토큰 집합과 교집합이 있으면 표시. rain 토큰은 비 전용 항목을 추가로 포함(OR).
export function matchesSeason(
  seasons: Season[],
  selected: Set<SeasonToken>,
  rainy?: boolean,
): boolean {
  if (itemSeasonTokens(seasons).some((tk) => selected.has(tk))) return true;
  if (rainy && selected.has("rain")) return true;
  return false;
}

// 기본 선택값: 이번 계절 + 상시
export function defaultSeasonSelection(season: Season): Set<SeasonToken> {
  return new Set<SeasonToken>(["all", season]);
}

// 토큰 색 점(상시=회색). 물품 배지와 같은 계절 색을 써서 색-계절 연상을 돕는다.
const DOT_COLOR: Record<string, string> = {
  all: "var(--sv-ink-muted)",
  spring: "var(--season-spring)",
  summer: "var(--season-summer)",
  fall: "var(--season-fall)",
  winter: "var(--season-winter)",
};

export default function SeasonFilter({
  selected,
  onToggle,
  showRain = false,
}: {
  selected: Set<SeasonToken>;
  onToggle: (tk: SeasonToken) => void;
  showRain?: boolean;
}) {
  const t = useTranslations();
  const tokens: SeasonToken[] = showRain
    ? [...SEASON_TOKENS, "rain"]
    : SEASON_TOKENS;
  return (
    <div className="flex flex-wrap gap-1.5">
      {tokens.map((tk) => {
        const on = selected.has(tk);
        return (
          <button
            key={tk}
            onClick={() => onToggle(tk)}
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
              on
                ? "bg-[var(--sv-accent)] text-white"
                : "border border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink)] hover:bg-[var(--sv-bg)]"
            }`}
          >
            {tk === "rain" ? (
              <PixelIcon src="/icons/ui/rain.png" size={12} />
            ) : (
              <span
                className="inline-block size-2 rounded-full"
                style={{
                  background: DOT_COLOR[tk],
                  outline: on ? "1px solid white" : "none",
                }}
              />
            )}
            {tk === "all"
              ? t("seasonFilter.all")
              : tk === "rain"
                ? t("bundle.rainy")
                : t(`seasons.${tk}`)}
          </button>
        );
      })}
    </div>
  );
}
