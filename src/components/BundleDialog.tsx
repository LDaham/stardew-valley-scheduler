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

// 정렬 등급: 이번 계절(0) → 상시(1) → 다른 계절에만(2)
const sortTier = (i: BundleItem, season: Season) =>
  i.seasons.includes(season) ? 0 : i.seasons.length === 0 ? 1 : 2;

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
  // fill 모드: 이번 계절·사계절 획득 가능 품목만. all 모드: 전체.
  const [showAll, setShowAll] = useState(initialMode === "all");

  const isDone = (b: Bundle, itemId: string) =>
    !!bundleItemsDone[bundleItemKey(b.id, itemId)];
  const doneCount = (b: Bundle) =>
    b.items.filter((i) => isDone(b, i.id)).length;
  const isComplete = (b: Bundle) => doneCount(b) >= b.needed;

  const seasonNeeds = BUNDLES.filter((b) => !isComplete(b)).flatMap((b) =>
    b.items
      .filter((i) => !isDone(b, i.id) && i.seasons.includes(season))
      .map((i) => t(i.nameKey)),
  );
  const uniqueNeeds = [...new Set(seasonNeeds)];

  return (
    <Modal title={t("bundle.title")} onClose={onClose}>
      {/* 이번 계절 획득 가능 안내 + 보기 전환 */}
      <div className="mb-4 rounded-lg border border-[var(--sv-accent)] bg-[var(--sv-bg)] p-3">
        <div className="mb-1 flex items-center justify-between gap-2">
          <h3 className="text-sm font-bold">
            {t("bundle.seasonNeeds", { season: t(`seasons.${season}`) })}
          </h3>
          <button
            onClick={() => setShowAll((v) => !v)}
            className="shrink-0 rounded border border-[var(--sv-border)] px-2 py-0.5 text-[11px] hover:bg-[var(--sv-panel)]"
          >
            {showAll ? t("bundle.showFill") : t("bundle.showAll")}
          </button>
        </div>
        {uniqueNeeds.length === 0 ? (
          <p className="text-xs text-[var(--sv-ink-muted)]">
            {t("bundle.seasonNeedsNone")}
          </p>
        ) : (
          <p className="text-sm">{uniqueNeeds.join(", ")}</p>
        )}
        {!showAll && (
          <p className="mt-1 text-[11px] text-[var(--sv-ink-muted)]">
            {t("bundle.hiddenNote")}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {BUNDLES.map((b) => {
          const visible = b.items
            .filter((i) => showAll || availableNow(i, season))
            // 이번 계절 획득 가능 품목을 위로 정렬(기본)
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
