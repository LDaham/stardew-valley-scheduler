"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SEASONS, type Season } from "@/lib/calendar";
import { asset } from "@/lib/asset";
import type { CharacterInfo } from "@/types/schedule";
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
// 가공 유형 아이콘: 원물=옥수수(작물), 술통=keg, 절임통=preservesJar
const PRODUCE_ICON: Record<Produce, string> = {
  raw: "/icons/ui/corn.png",
  keg: "/icons/machines/keg.png",
  jar: "/icons/machines/preservesJar.png",
};

// 농사 10레벨 전문직(상호 배타): 농업 전문가 / 장인 (체크박스로 택1)
type Profession = "agriculturist" | "artisan";

export default function SeedEfficiencyDialog({
  season,
  onClose,
  onBack,
  lockSeason = false,
}: {
  season: Season;
  onClose: () => void;
  onBack?: () => void;
  // 새 계절 "작물 효율": 계절 필터 숨기고 현재 계절로 고정.
  lockSeason?: boolean;
}) {
  const t = useTranslations();
  const { character, setCharacter, dialogFilters, setDialogFilters } =
    useSchedule();
  // 캐릭터 설정(레벨·스킬)은 효율에 영향을 주는 보조 설정이라 아코디언으로 접어 둔다.
  const [charOpen, setCharOpen] = useState(false);
  // 잠금이면 현재 계절 고정. 아니면 저장값(없으면 현재 계절), 마지막 선택 유지.
  const viewSeason = lockSeason
    ? season
    : ((dialogFilters.seedSeason as Season) ?? season);
  const setViewSeason = (s: Season) => setDialogFilters({ seedSeason: s });
  // 필터(다계절 포함·비료·가공·음식) 마지막 선택값 영속.
  const crossSeason = dialogFilters.seedCrossSeason;
  const setCrossSeason = (v: boolean) =>
    setDialogFilters({ seedCrossSeason: v });
  const fertilizer = dialogFilters.seedFertilizer as FertilizerId;
  const setFertilizer = (v: FertilizerId) =>
    setDialogFilters({ seedFertilizer: v });
  const produce = dialogFilters.seedProduce as Produce;
  const setProduce = (v: Produce) => setDialogFilters({ seedProduce: v });
  const food = dialogFilters.seedFood as FoodId;
  const setFood = (v: FoodId) => setDialogFilters({ seedFood: v });

  // ── 캐릭터 설정(캐릭터 설정 탭에서 이동) ─────────────────────────────
  const setLevel = (key: "farmingLevel" | "foragingLevel", n: number) =>
    setCharacter({
      [key]: Math.max(0, Math.min(10, n)),
    } as Partial<CharacterInfo>);
  // 체크박스 택1: 하나를 켜면 나머지는 꺼지고, 끄면 둘 다 해제(전문직 없음)
  const toggleProfession = (p: Profession, checked: boolean) =>
    setCharacter({
      agriculturist: checked && p === "agriculturist",
      artisan: checked && p === "artisan",
    });
  const stepBtn =
    "flex size-7 shrink-0 items-center justify-center rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] text-base font-bold leading-none hover:bg-[var(--sv-bg)] disabled:opacity-40";
  const levelInput = (key: "farmingLevel" | "foragingLevel") => (
    <div>
      <label className="mb-1 block text-xs font-semibold text-[var(--sv-ink-muted)]">
        {t(`character.${key}`)}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="−"
          disabled={character[key] <= 0}
          onClick={() => setLevel(key, character[key] - 1)}
          className={stepBtn}
        >
          −
        </button>
        <input
          type="number"
          min={0}
          max={10}
          value={character[key]}
          onChange={(e) => setLevel(key, Number(e.target.value) || 0)}
          className="w-10 rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] py-1 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          aria-label="+"
          disabled={character[key] >= 10}
          onClick={() => setLevel(key, character[key] + 1)}
          className={stepBtn}
        >
          +
        </button>
      </div>
    </div>
  );

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
  const rows = seasonSeedProfits(viewSeason, opt);
  const max = rows.length ? rows[0].profit : 0;

  return (
    <Modal
      title={`${t(`seasons.${viewSeason}`)} · ${t("seedEfficiency.title")}`}
      onClose={onClose}
      onBack={onBack}
    >
      {/* 계절 선택(잠금 시 숨김 — 현재 계절 고정) */}
      {!lockSeason && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {SEASONS.map((s) => {
            const on = s === viewSeason;
            return (
              <button
                key={s}
                onClick={() => setViewSeason(s)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  on
                    ? "bg-[var(--sv-accent)] text-[var(--sv-accent-ink)]"
                    : "border border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink)] hover:bg-[var(--sv-bg)]"
                }`}
              >
                {t(`seasons.${s}`)}
              </button>
            );
          })}
        </div>
      )}

      {/* 캐릭터 설정(레벨·스킬) 아코디언 */}
      <section className="mb-3 overflow-hidden rounded-md border border-[var(--sv-border)]">
        <button
          onClick={() => setCharOpen((o) => !o)}
          aria-expanded={charOpen}
          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold hover:bg-[var(--sv-bg)]"
        >
          <span className="text-xs text-[var(--sv-ink-muted)]">
            {charOpen ? "▾" : "▸"}
          </span>
          <span className="flex-1">{t("character.title")}</span>
        </button>
        {charOpen && (
          <div className="flex flex-col gap-3 border-t border-[var(--sv-border)] p-3">
            <div className="grid grid-cols-2 gap-2">
              {levelInput("farmingLevel")}
              {levelInput("foragingLevel")}
            </div>

            {/* 경작인 */}
            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={character.tiller}
                onChange={(e) => setCharacter({ tiller: e.target.checked })}
                className="mt-0.5 size-4 accent-[var(--sv-accent)]"
              />
              <span>
                <span className="font-semibold">{t("character.tiller")}</span>
                <span className="block text-xs text-[var(--sv-ink-muted)]">
                  {t("character.tillerDesc")}
                </span>
              </span>
            </div>

            {/* 농사 10레벨 전문직: 농업 전문가 ↔ 장인 (체크박스 택1) */}
            <div className="rounded-md border border-[var(--sv-border)] p-2">
              <p className="mb-1 text-xs font-semibold text-[var(--sv-ink-muted)]">
                {t("character.profession")}
              </p>
              {(["agriculturist", "artisan"] as Profession[]).map((p) => (
                <div
                  key={p}
                  className="flex items-start gap-2 py-0.5 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={character[p] as boolean}
                    onChange={(e) => toggleProfession(p, e.target.checked)}
                    className="mt-0.5 size-4 accent-[var(--sv-accent)]"
                  />
                  <span>
                    <span className="font-semibold">
                      {t(`character.profession_${p}`)}
                    </span>
                    <span className="block text-xs text-[var(--sv-ink-muted)]">
                      {t(`character.${p}Desc`)}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* 채집가 · 식물학자 */}
            {(["gatherer", "botanist"] as (keyof CharacterInfo)[]).map((s) => (
              <div
                key={s}
                className="flex items-start gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={character[s] as boolean}
                  onChange={(e) =>
                    setCharacter({
                      [s]: e.target.checked,
                    } as Partial<CharacterInfo>)
                  }
                  className="mt-0.5 size-4 accent-[var(--sv-accent)]"
                />
                <span>
                  <span className="font-semibold">{t(`character.${s}`)}</span>
                  <span className="block text-xs text-[var(--sv-ink-muted)]">
                    {t(`character.${s}Desc`)}
                  </span>
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 품질 안내 */}
      <p className="mb-3 rounded-md bg-[var(--sv-bg)] px-3 py-2 text-xs text-[var(--sv-ink-muted)]">
        {t("seedEfficiency.qualityHint")}
      </p>

      {/* 옵션 */}
      <div className="mb-3 flex flex-col gap-2">
        {/* 내용 너비 드롭다운들을 한 줄에 배치(좁으면 자동 줄바꿈) */}
        <div className="flex flex-wrap items-start gap-3">
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
          {/* 다계절 포함: 체크박스로만 토글(라벨 클릭으로 토글되지 않도록 label 미사용) */}
          <div className="flex items-end gap-1.5 self-end pb-2 text-sm">
            <input
              type="checkbox"
              checked={crossSeason}
              onChange={(e) => setCrossSeason(e.target.checked)}
              className="size-4 cursor-pointer accent-[var(--sv-accent)]"
            />
            <span>{t("seedEfficiency.crossSeason")}</span>
          </div>
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
