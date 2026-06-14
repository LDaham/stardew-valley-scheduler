"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Season } from "@/lib/calendar";
import { asset } from "@/lib/asset";
import type { Fertilizer } from "@/lib/growth";
import {
  seasonSeedProfits,
  type Produce,
  type ProfitOptions,
} from "@/lib/cropProfit";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";

const FERTILIZERS: Fertilizer[] = ["none", "speedGro", "deluxe", "hyper"];
const PRODUCE: Produce[] = ["raw", "keg", "jar"];

export default function SeedEfficiencyDialog({
  season,
  onClose,
}: {
  season: Season;
  onClose: () => void;
}) {
  const t = useTranslations();
  const [fertilizer, setFertilizer] = useState<Fertilizer>("none");
  const [produce, setProduce] = useState<Produce>("raw");
  const [tiller, setTiller] = useState(false);
  const [agriculturist, setAgriculturist] = useState(false);
  const [botanist, setBotanist] = useState(false);

  const opt: ProfitOptions = { fertilizer, produce, tiller, agriculturist, botanist };
  const rows = seasonSeedProfits(season, opt);
  const max = rows.length ? rows[0].profit : 0;

  return (
    <Modal
      title={`${t(`seasons.${season}`)} · ${t("seedEfficiency.title")}`}
      onClose={onClose}
    >
      {/* 옵션 */}
      <div className="mb-3 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-[var(--sv-ink-muted)]">
              {t("seedEfficiency.fertilizer")}
            </label>
            <Dropdown
              value={fertilizer}
              options={FERTILIZERS.map((f) => ({
                value: f,
                label: t(`fertilizer.${f}`),
                icon: f === "none" ? undefined : `/icons/fertilizer/${f}.png`,
              }))}
              onChange={(v) => setFertilizer(v as Fertilizer)}
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
              }))}
              onChange={(v) => setProduce(v as Produce)}
              ariaLabel={t("seedEfficiency.produce")}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
          <label className="flex cursor-pointer items-center gap-1.5">
            <input
              type="checkbox"
              checked={tiller}
              onChange={(e) => setTiller(e.target.checked)}
              className="size-4 accent-[var(--sv-accent)]"
            />
            {t("seedEfficiency.tiller")}
          </label>
          <label className="flex cursor-pointer items-center gap-1.5">
            <input
              type="checkbox"
              checked={agriculturist}
              onChange={(e) => setAgriculturist(e.target.checked)}
              className="size-4 accent-[var(--sv-accent)]"
            />
            {t("seedEfficiency.agriculturist")}
          </label>
          <label className="flex cursor-pointer items-center gap-1.5">
            <input
              type="checkbox"
              checked={botanist}
              onChange={(e) => setBotanist(e.target.checked)}
              className="size-4 accent-[var(--sv-accent)]"
            />
            {t("seedEfficiency.botanist")}
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
