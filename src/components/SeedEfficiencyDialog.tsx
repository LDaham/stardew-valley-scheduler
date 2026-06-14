"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Season } from "@/lib/calendar";
import { asset } from "@/lib/asset";
import {
  seasonSeedProfits,
  FERTILIZER_IDS,
  FOOD_IDS,
  type Produce,
  type FertilizerId,
  type FoodId,
  type ProfitOptions,
} from "@/lib/cropProfit";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";

const PRODUCE: Produce[] = ["raw", "keg", "jar"];
// 가공 유형 아이콘: 원물=옥수수, 술통=keg, 절임통=preservesJar
const PRODUCE_ICON: Record<Produce, string> = {
  raw: "/icons/seeds/corn.png",
  keg: "/icons/machines/keg.png",
  jar: "/icons/machines/preservesJar.png",
};

export default function SeedEfficiencyDialog({
  season,
  onClose,
}: {
  season: Season;
  onClose: () => void;
}) {
  const t = useTranslations();
  const { character } = useSchedule();
  const [crossSeason, setCrossSeason] = useState(false);
  const [fertilizer, setFertilizer] = useState<FertilizerId>("none");
  const [produce, setProduce] = useState<Produce>("raw");
  const [food, setFood] = useState<FoodId>("none");

  const opt: ProfitOptions = {
    crossSeason,
    fertilizer,
    produce,
    food,
    farmingLevel: character.farmingLevel,
    foragingLevel: character.foragingLevel,
    tiller: character.tiller,
    agriculturist: character.agriculturist,
    artisan: character.artisan,
    gatherer: character.gatherer,
    botanist: character.botanist,
  };
  const rows = seasonSeedProfits(season, opt);
  const max = rows.length ? rows[0].profit : 0;

  return (
    <Modal
      title={`${t(`seasons.${season}`)} · ${t("seedEfficiency.title")}`}
      onClose={onClose}
    >
      {/* 품질 안내 */}
      <p className="mb-3 rounded-md bg-[var(--sv-bg)] px-3 py-2 text-xs text-[var(--sv-ink-muted)]">
        {t("seedEfficiency.qualityHint")}
      </p>

      {/* 옵션 */}
      <div className="mb-3 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[var(--sv-ink-muted)]">
              {t("seedEfficiency.fertilizer")}
            </label>
            <Dropdown
              value={fertilizer}
              options={FERTILIZER_IDS.map((f) => ({
                value: f,
                label: t(`profitFertilizer.${f}`),
                icon: f === "none" ? undefined : `/icons/profitFertilizer/${f}.png`,
              }))}
              onChange={(v) => setFertilizer(v as FertilizerId)}
              ariaLabel={t("seedEfficiency.fertilizer")}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[var(--sv-ink-muted)]">
              {t("seedEfficiency.produce")}
            </label>
            <Dropdown
              value={produce}
              options={PRODUCE.map((p) => ({
                value: p,
                label: t(`seedEfficiency.${p}`),
                icon: PRODUCE_ICON[p],
              }))}
              onChange={(v) => setProduce(v as Produce)}
              ariaLabel={t("seedEfficiency.produce")}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-[var(--sv-ink-muted)]">
              {t("seedEfficiency.food")}
            </label>
            <Dropdown
              value={food}
              options={FOOD_IDS.map((f) => ({
                value: f,
                label: t(`food.${f}`),
                icon: f === "none" ? undefined : `/icons/food/${f}.png`,
              }))}
              onChange={(v) => setFood(v as FoodId)}
              ariaLabel={t("seedEfficiency.food")}
            />
          </div>
          <label className="flex cursor-pointer items-end gap-1.5 pb-2 text-sm">
            <input
              type="checkbox"
              checked={crossSeason}
              onChange={(e) => setCrossSeason(e.target.checked)}
              className="size-4 accent-[var(--sv-accent)]"
            />
            {t("seedEfficiency.crossSeason")}
          </label>
        </div>
      </div>

      {/* 효율 목록(수익 내림차순, 최대=100%) */}
      <ul className="flex flex-col gap-2">
        {rows.map((r, i) => {
          const pct = max > 0 ? Math.round((r.profit / max) * 100) : 0;
          return (
            <li key={r.cropId} className="flex items-center gap-2">
              <span className="w-4 text-right text-xs text-[var(--sv-ink-muted)]">
                {i + 1}
              </span>
              <Image
                src={asset(`/icons/seeds/${r.cropId}.png`)}
                alt=""
                width={20}
                height={20}
                unoptimized
                className="shrink-0"
                style={{ imageRendering: "pixelated" }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="truncate">
                    {t(`crops.${r.cropId}`)}
                    {r.regrow && (
                      <span className="ml-1 text-[10px] text-[var(--sv-ink-muted)]">
                        ↻
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 font-semibold tabular-nums">{pct}%</span>
                </div>
                <div className="mt-0.5 h-1.5 overflow-hidden rounded bg-[var(--sv-bg)]">
                  <div
                    className="h-full rounded bg-[var(--sv-accent)]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="mt-0.5 text-[11px] text-[var(--sv-ink-muted)]">
                  {t("seedEfficiency.detail", {
                    profit: r.profit,
                    harvests: r.harvests,
                    perDay: Math.round(r.perDay),
                  })}
                  {r.usedProduce !== produce && ` · ${t("seedEfficiency.rawFallback")}`}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-[11px] leading-relaxed text-[var(--sv-ink-muted)]">
        {t("seedEfficiency.note")}
      </p>
    </Modal>
  );
}
