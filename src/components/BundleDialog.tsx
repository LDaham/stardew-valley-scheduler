"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import { asset } from "@/lib/asset";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";
import {
  BUNDLES,
  bundleItemKey,
  type Bundle,
  type BundleItem,
} from "@/data/bundles";
import type { Season } from "@/lib/calendar";

// 빈 계절 배열 = 사계절/상시 → 항상 "획득 가능"
const availableNow = (i: BundleItem, season: Season) =>
  i.seasons.length === 0 || i.seasons.includes(season);

// 이번 계절에만 획득 가능(단일 계절 = 현재 계절)
const currentSeasonOnly = (i: BundleItem, season: Season) =>
  i.seasons.length === 1 && i.seasons[0] === season;

// 정렬 등급: 이번 계절만(0) → 이번 계절+다른 계절(1) → 상시(2) → 다른 계절에만(3)
const sortTier = (i: BundleItem, season: Season) => {
  if (i.seasons.length === 0) return 2;
  if (i.seasons.includes(season)) return i.seasons.length === 1 ? 0 : 1;
  return 3;
};

const SEASON_BG: Record<Season, string> = {
  spring: "var(--season-spring)",
  summer: "var(--season-summer)",
  fall: "var(--season-fall)",
  winter: "var(--season-winter)",
};

export default function BundleDialog({
  onClose,
  initialMode = "all",
}: {
  onClose: () => void;
  initialMode?: "fill" | "all";
}) {
  const t = useTranslations();
  const { currentDate, bundleItemsDone, toggleBundleItem } = useSchedule();
  const season = currentDate.season;
  // 이번 계절에 획득 불가능한 품목 제외(fill 모드 기본 켜짐)
  const [excludeUnobtainable, setExcludeUnobtainable] = useState(
    initialMode === "fill",
  );
  // 이번 계절에만 획득 가능한 품목만 보기(카테고리 무관)
  const [onlyCurrentOnly, setOnlyCurrentOnly] = useState(false);

  const isDone = (b: Bundle, itemId: string) =>
    !!bundleItemsDone[bundleItemKey(b.id, itemId)];
  const doneCount = (b: Bundle) =>
    b.items.filter((i) => isDone(b, i.id)).length;
  const isComplete = (b: Bundle) => doneCount(b) >= b.needed;

  return (
    <Modal title={t("bundle.title")} onClose={onClose}>
      {/* 필터 */}
      <div className="mb-4 flex flex-col gap-1.5">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={excludeUnobtainable}
            onChange={(e) => setExcludeUnobtainable(e.target.checked)}
            className="size-4 accent-[var(--sv-accent)]"
          />
          {t("bundle.excludeUnobtainable")}
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={onlyCurrentOnly}
            onChange={(e) => setOnlyCurrentOnly(e.target.checked)}
            className="size-4 accent-[var(--sv-accent)]"
          />
          {t("bundle.onlyCurrentOnly", { season: t(`seasons.${season}`) })}
        </label>
      </div>

      <div className="flex flex-col gap-4">
        {BUNDLES.map((b) => {
          const visible = b.items
            .filter((i) =>
              onlyCurrentOnly
                ? currentSeasonOnly(i, season)
                : !excludeUnobtainable || availableNow(i, season),
            )
            // 계절 우선 정렬(이번 계절만 → 이번+다른 → 상시 → 다른 계절만)
            .sort((a, b2) => sortTier(a, season) - sortTier(b2, season));
          if (visible.length === 0) return null;
          const done = doneCount(b);
          const complete = isComplete(b);
          const subset = b.needed < b.items.length;
          return (
            <section key={b.id}>
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold">
                  <span className="text-[10px] text-[var(--sv-ink-muted)]">
                    {t(`bundleRoom.${b.roomKey}`)}
                  </span>{" "}
                  {t(`bundle.${b.id}`)}
                  {subset && (
                    <span className="ml-1 text-[10px] text-[var(--sv-ink-muted)]">
                      ({t("bundle.pick", { needed: b.needed, total: b.items.length })})
                    </span>
                  )}
                </h3>
                <span
                  className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                    complete
                      ? "bg-[var(--sv-accent)] text-white"
                      : "bg-[var(--sv-border)] text-[var(--sv-ink-muted)]"
                  }`}
                >
                  {complete ? t("bundle.complete") : `${done}/${b.needed}`}
                </span>
              </div>
              <ul className="flex flex-col gap-1">
                {visible.map((i) => {
                  const key = bundleItemKey(b.id, i.id);
                  const checked = isDone(b, i.id);
                  return (
                    <li key={i.id}>
                      <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-[var(--sv-bg)]">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleBundleItem(key)}
                          className="size-4 shrink-0 accent-[var(--sv-accent)]"
                        />
                        <Image
                          src={asset(`/icons/bundleItems/${i.id}.png`)}
                          alt=""
                          width={18}
                          height={18}
                          unoptimized
                          className="shrink-0"
                          style={{ imageRendering: "pixelated" }}
                        />
                        <span
                          className={`flex-1 ${checked ? "text-[var(--sv-ink-muted)] line-through" : ""}`}
                        >
                          {t(i.nameKey)}
                        </span>
                        {i.rainy && (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded bg-[#5b8fb0] px-1 py-0.5 text-[10px] font-semibold text-white">
                            <PixelIcon src="/icons/ui/rain.png" size={11} />
                            {t("bundle.rainy")}
                          </span>
                        )}
                        {/* 계절 배지: 이번 계절은 강조(테두리), 그 외는 옅게 */}
                        {i.seasons.length === 0 ? (
                          <span className="shrink-0 rounded bg-[var(--sv-border)] px-1 py-0.5 text-[10px] font-semibold text-[var(--sv-ink-muted)]">
                            {t("bundle.allSeasons")}
                          </span>
                        ) : (
                          i.seasons.map((s) => (
                            <span
                              key={s}
                              className="shrink-0 rounded px-1 py-0.5 text-[10px] font-semibold"
                              style={{
                                background: SEASON_BG[s],
                                color: "#2b2016",
                                opacity: s === season ? 1 : 0.55,
                                outline:
                                  s === season ? "2px solid var(--sv-ink)" : "none",
                              }}
                            >
                              {t(`seasons.${s}`)}
                            </span>
                          ))
                        )}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </Modal>
  );
}
