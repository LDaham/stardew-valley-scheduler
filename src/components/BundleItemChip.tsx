"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import PixelIcon from "@/components/PixelIcon";
import type { BundleItem } from "@/data/bundles";
import type { Season } from "@/lib/calendar";

// 꾸러미 물품 칩(이미지 + 이름 + 계절 점 + 비 아이콘).
// - onToggle이 있으면 클릭으로 완료 토글(버튼), 없으면 표시 전용(span).
// - 계절: 색 점(봄=초록·여름=노랑·가을=주황·겨울=하늘). 현재 계절 점은 테두리로 강조.
// - 상시(계절 없음): 회색 점. 비 전용: 물방울 아이콘.
export default function BundleItemChip({
  item,
  checked,
  season,
  onToggle,
}: {
  item: BundleItem;
  checked: boolean;
  season: Season;
  onToggle?: () => void;
}) {
  const t = useTranslations();
  const name = t(item.nameKey);

  const base = `inline-flex items-center gap-1.5 rounded border px-2 py-1 text-xs ${
    checked
      ? "border-[var(--sv-accent)] bg-[#5a8f3c26] text-[var(--sv-ink-muted)]"
      : "border-[var(--sv-border)] bg-[var(--sv-panel)]"
  }`;

  const inner = (
    <>
      <Image
        src={asset(`/icons/bundleItems/${item.id}.png`)}
        alt=""
        width={16}
        height={16}
        unoptimized
        className="shrink-0"
        style={{ imageRendering: "pixelated" }}
      />
      <span className={checked ? "line-through" : ""}>{name}</span>
      {/* 계절 글자 배지(상시=중립 배지). 현재 계절은 테두리로 강조 */}
      <span className="flex shrink-0 items-center gap-0.5">
        {item.seasons.length === 0 ? (
          <span className="rounded border border-[var(--sv-border)] bg-[var(--sv-bg)] px-1 py-0.5 text-[9px] font-semibold leading-none text-[var(--sv-ink)]">
            {t("bundle.allSeasons")}
          </span>
        ) : (
          item.seasons.map((s) => (
            <span
              key={s}
              className="rounded px-1 py-0.5 text-[9px] font-semibold leading-none"
              style={{
                background: `var(--season-${s})`,
                color: "#2b2016",
                outline: s === season ? "1.5px solid var(--sv-ink)" : "none",
              }}
            >
              {t(`seasons.${s}`)}
            </span>
          ))
        )}
      </span>
      {/* 비 전용 */}
      {item.rainy && <PixelIcon src="/icons/ui/rain.png" size={11} />}
    </>
  );

  if (!onToggle) return <span className={base}>{inner}</span>;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={name}
      className={`${base} ${checked ? "" : "hover:bg-[var(--sv-bg)]"}`}
    >
      {inner}
    </button>
  );
}
