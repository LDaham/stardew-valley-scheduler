"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import PixelIcon from "@/components/PixelIcon";
import type { BundleItem } from "@/data/bundles";

// 꾸러미 물품 칩(이미지 + 이름 + (개수) + 비 아이콘).
// 가독성을 위해 계절은 칩에 표시하지 않고 상단 계절·비 필터로 선택한다.
// onToggle이 있으면 클릭으로 완료 토글(버튼), 없으면 표시 전용(span).
// disabled: 부분 충족 꾸러미(n/m)에서 필요 개수를 이미 채워 남은 물품을 잠글 때.
export default function BundleItemChip({
  item,
  checked,
  onToggle,
  disabled = false,
  gold = false,
}: {
  item: BundleItem;
  checked: boolean;
  onToggle?: () => void;
  disabled?: boolean;
  gold?: boolean; // 금 등급(★) 이상 제출 꾸러미: 이름 뒤에 노란 ★ 표기
}) {
  const t = useTranslations();
  // 여러 개 제출해야 하면 이름 뒤에 "(개수)" 표기. 금 등급은 아이콘에 금별 오버레이로 표현.
  const baseName = t(item.nameKey);
  const qtyText = item.qty && item.qty > 1 ? ` (${item.qty})` : "";
  const name = `${baseName}${gold ? ` ${t("bundle.goldQuality")}` : ""}${qtyText}`;

  const base = `inline-flex items-center gap-1.5 rounded border px-2 py-1 text-xs ${
    checked
      ? "border-[var(--sv-accent)] bg-[#5a8f3c26] text-[var(--sv-ink-muted)]"
      : "border-[var(--sv-border)] bg-[var(--sv-panel)]"
  }`;

  const inner = (
    <>
      {/* 금 등급 꾸러미: 아이템을 흐리게 하지 않고 금별 아이콘을 그대로 오버레이.
          아이템이 세로로 긴 경우에도 어긋나지 않도록 하단(bottom-left) 기준으로 정렬한다. */}
      <span className="relative inline-flex shrink-0">
        <Image
          src={asset(`/icons/bundleItems/${item.id}.png`)}
          alt=""
          width={16}
          height={16}
          unoptimized
          style={{ imageRendering: "pixelated" }}
        />
        {gold && (
          <Image
            src={asset("/icons/ui/Gold_Quality_Icon.png")}
            alt=""
            width={16}
            height={16}
            unoptimized
            className="absolute bottom-0 left-0"
            style={{ width: 16, height: 16, imageRendering: "pixelated" }}
          />
        )}
      </span>
      <span className={checked ? "line-through" : ""}>
        {baseName}
        {qtyText}
      </span>
      {/* 비 오는 날에만 얻는 물품 표시 */}
      {item.rainy && <PixelIcon src="/icons/ui/rain.png" size={11} />}
    </>
  );

  if (!onToggle) return <span className={base}>{inner}</span>;
  // 필요 개수를 채운 뒤 남은 물품: 선택 불가(흐리게 + 안내 툴팁)
  if (disabled)
    return (
      <button
        type="button"
        disabled
        aria-pressed={checked}
        aria-label={name}
        title={t("bundle.needMetLock")}
        className={`${base} cursor-not-allowed opacity-50`}
      >
        {inner}
      </button>
    );
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
