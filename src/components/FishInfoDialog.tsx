"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import TimeIcon from "@/components/TimeIcon";
import SeasonFilter, {
  defaultSeasonSelection,
  matchesSeason,
  type SeasonToken,
} from "@/components/SeasonFilter";
import { FISH } from "@/data/fish";
import type { Season } from "@/lib/calendar";

// 생선 정보: 출현 위치·계절·시간. 계절 필터(기본=이번 계절+상시).
export default function FishInfoDialog({
  season,
  onClose,
}: {
  season: Season;
  onClose: () => void;
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

  const visible = FISH.filter((f) => matchesSeason(f.seasons, selected)).sort(
    (a, b) =>
      Number(b.seasons.includes(season)) - Number(a.seasons.includes(season)),
  );

  const seasonChip = (s: Season, active: boolean) => (
    <span
      key={s}
      className={`shrink-0 rounded px-1 py-0.5 text-[10px] font-semibold ${
        active
          ? "bg-[var(--sv-accent)] text-white"
          : "bg-[var(--sv-border)] text-[var(--sv-ink-muted)]"
      }`}
    >
      {t(`seasons.${s}`)}
    </span>
  );

  return (
    <Modal title={t("fish.title")} onClose={onClose}>
      <div className="mb-3">
        <SeasonFilter selected={selected} onToggle={toggleToken} />
      </div>

      <ul className="flex flex-col gap-1.5">
        {visible.map((f) => {
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
        })}
      </ul>
    </Modal>
  );
}
