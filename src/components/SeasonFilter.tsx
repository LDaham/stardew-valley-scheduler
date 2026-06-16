"use client";

import { useTranslations } from "next-intl";
import type { Season } from "@/lib/calendar";

// 계절 필터 토큰: 상시(사계절) + 4계절
export type SeasonToken = "all" | Season;
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

// 선택된 토큰 집합과 교집합이 있으면 표시
export function matchesSeason(
  seasons: Season[],
  selected: Set<SeasonToken>,
): boolean {
  return itemSeasonTokens(seasons).some((tk) => selected.has(tk));
}

// 기본 선택값: 이번 계절 + 상시
export function defaultSeasonSelection(season: Season): Set<SeasonToken> {
  return new Set<SeasonToken>(["all", season]);
}

export default function SeasonFilter({
  selected,
  onToggle,
}: {
  selected: Set<SeasonToken>;
  onToggle: (tk: SeasonToken) => void;
}) {
  const t = useTranslations();
  return (
    <div className="flex flex-wrap gap-1.5">
      {SEASON_TOKENS.map((tk) => {
        const on = selected.has(tk);
        return (
          <button
            key={tk}
            onClick={() => onToggle(tk)}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              on
                ? "bg-[var(--sv-accent)] text-white"
                : "border border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink)] hover:bg-[var(--sv-bg)]"
            }`}
          >
            {tk === "all" ? t("seasonFilter.all") : t(`seasons.${tk}`)}
          </button>
        );
      })}
    </div>
  );
}
