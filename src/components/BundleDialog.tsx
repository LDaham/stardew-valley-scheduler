"use client";

import { useMemo, useState } from "react";
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
import { REMIX_SLOTS, type RemixSlot } from "@/data/remixBundles";
import type { Season } from "@/lib/calendar";
import SeasonFilter, {
  defaultSeasonSelection,
  matchesSeason,
  type SeasonToken,
} from "@/components/SeasonFilter";

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
}: {
  onClose: () => void;
  initialMode?: "fill" | "all";
}) {
  const t = useTranslations();
  const {
    currentDate,
    bundleItemsDone,
    toggleBundleItem,
    bundleMode,
    setBundleMode,
    remixChoices,
    setRemixChoice,
    dialogFilters,
    setDialogFilters,
  } = useSchedule();
  const season = currentDate.season;
  // 계절 필터(상시·봄·여름·가을·겨울). 저장값 없으면 이번 계절+상시. 마지막 선택값 영속.
  const selected = useMemo(
    () =>
      dialogFilters.bundleSeasons
        ? new Set(dialogFilters.bundleSeasons as SeasonToken[])
        : defaultSeasonSelection(season),
    [dialogFilters.bundleSeasons, season],
  );
  // 완료되지 않은 꾸러미 먼저 보기(마지막 선택값 영속)
  const incompleteFirst = dialogFilters.bundleIncompleteFirst;

  const isDone = (b: Bundle, itemId: string) =>
    !!bundleItemsDone[bundleItemKey(b.id, itemId)];
  const doneCount = (b: Bundle) =>
    b.items.filter((i) => isDone(b, i.id)).length;
  const isComplete = (b: Bundle) => doneCount(b) >= b.needed;

  // 표시 순서는 '열 때 / 필터(계절·먼저 보기) 변경 시'에만 다시 계산한다.
  // 체크 직후 즉시 재정렬하지 않아, 실수로 완료한 꾸러미를 그 자리에서 해제하기 쉽다.
  const computeOrder = (incFirst: boolean): Bundle[] =>
    incFirst
      ? [...BUNDLES].sort((a, b) => Number(isComplete(a)) - Number(isComplete(b)))
      : BUNDLES;
  const [bundleOrder, setBundleOrder] = useState(() =>
    computeOrder(incompleteFirst),
  );
  const setIncompleteFirst = (v: boolean) => {
    setDialogFilters({ bundleIncompleteFirst: v });
    setBundleOrder(computeOrder(v));
  };
  const toggleToken = (tk: SeasonToken) => {
    const next = new Set(selected);
    if (next.has(tk)) next.delete(tk);
    else next.add(tk);
    setDialogFilters({ bundleSeasons: [...next] });
    setBundleOrder(computeOrder(incompleteFirst));
  };

  // 꾸러미 한 개를 섹션으로 렌더(필터 적용 후 표시할 품목이 없으면 null)
  const renderBundle = (b: Bundle) => {
    const visible = b.items
      .filter((i) => matchesSeason(i.seasons, selected))
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
                : "bg-[var(--sv-ink)] text-white"
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
                <div className="flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-[var(--sv-bg)]">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleBundleItem(key)}
                    aria-label={t(i.nameKey)}
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
                  {i.seasons.length === 0 ? (
                    <span className="shrink-0 rounded border border-[var(--sv-border)] bg-[var(--sv-bg)] px-1 py-0.5 text-[10px] font-semibold text-[var(--sv-ink)]">
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
                          // 현재 계절은 테두리로 구분(다른 계절도 흐리지 않고 또렷하게)
                          outline:
                            s === season ? "2px solid var(--sv-ink)" : "none",
                        }}
                      >
                        {t(`seasons.${s}`)}
                      </span>
                    ))
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    );
  };

  // 리믹스 무작위 슬롯: 후보 꾸러미를 체크박스로 선택(pick개 제한)
  const renderRandomSlot = (slot: RemixSlot) => {
    const selected = remixChoices[slot.id] ?? [];
    const toggle = (id: string) => {
      if (selected.includes(id)) {
        setRemixChoice(slot.id, selected.filter((x) => x !== id));
      } else if (selected.length < slot.pick) {
        setRemixChoice(slot.id, [...selected, id]);
      } else if (slot.pick === 1) {
        setRemixChoice(slot.id, [id]); // 택1은 교체
      }
    };
    return (
      <div
        key={slot.id}
        className="rounded-md border border-dashed border-[var(--sv-border)] p-2"
      >
        <div className="mb-1.5 flex items-baseline justify-between gap-2">
          <span className="text-xs font-semibold text-[var(--sv-ink-muted)]">
            {t(`bundleRoom.${slot.roomKey}`)} · {t("bundle.remixRandomSlot")}
          </span>
          <span className="shrink-0 text-[10px] font-semibold text-[var(--sv-ink-muted)]">
            {t("bundle.remixPickCount", {
              pick: slot.pick,
              count: selected.length,
            })}
          </span>
        </div>
        {/* 후보 꾸러미 선택 */}
        <ul className="mb-2 flex flex-col gap-1">
          {slot.bundles.map((b) => {
            const checked = selected.includes(b.id);
            const atLimit =
              !checked && selected.length >= slot.pick && slot.pick > 1;
            return (
              <li key={b.id}>
                <div
                  className={`flex items-center gap-2 rounded-md px-2 py-1 text-sm ${
                    atLimit ? "opacity-40" : "hover:bg-[var(--sv-bg)]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={atLimit}
                    onChange={() => toggle(b.id)}
                    aria-label={t(`bundle.${b.id}`)}
                    className="size-4 shrink-0 accent-[var(--sv-accent)]"
                  />
                  <span className="flex-1">{t(`bundle.${b.id}`)}</span>
                </div>
              </li>
            );
          })}
        </ul>
        {/* 선택한 꾸러미 상세 */}
        <div className="flex flex-col gap-3">
          {slot.bundles
            .filter((b) => selected.includes(b.id))
            .map((b) => renderBundle(b))}
        </div>
      </div>
    );
  };

  return (
    <Modal title={t("bundle.title")} onClose={onClose}>
      {/* 표준/리믹스 모드 전환 */}
      <div className="mb-3 flex gap-1 rounded-lg bg-[var(--sv-bg)] p-1">
        {(["standard", "remix"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setBundleMode(m)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-semibold ${
              bundleMode === m
                ? "bg-[var(--sv-accent)] text-white"
                : "text-[var(--sv-ink-muted)] hover:bg-[var(--sv-panel)]"
            }`}
          >
            {t(m === "standard" ? "bundle.modeStandard" : "bundle.modeRemix")}
          </button>
        ))}
      </div>

      {/* 계절 필터(상시·봄·여름·가을·겨울) */}
      <div className="mb-2">
        <SeasonFilter selected={selected} onToggle={toggleToken} />
      </div>
      <label className="mb-4 flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={incompleteFirst}
          onChange={(e) => setIncompleteFirst(e.target.checked)}
          className="size-4 accent-[var(--sv-accent)]"
        />
        {t("common.incompleteFirst")}
      </label>

      {bundleMode === "remix" && (
        <p className="mb-3 text-[11px] leading-relaxed text-[var(--sv-ink-muted)]">
          {t("bundle.remixChooseHint")}
        </p>
      )}

      <div className="flex flex-col gap-4">
        {bundleMode === "standard"
          ? bundleOrder.map((b) => renderBundle(b))
          : REMIX_SLOTS.map((slot) =>
              slot.fixed
                ? slot.bundles.map((b) => renderBundle(b))
                : renderRandomSlot(slot),
            )}
      </div>
    </Modal>
  );
}
