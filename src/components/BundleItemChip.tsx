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
}: {
  item: BundleItem;
  checked: boolean;
  onToggle?: () => void;
  disabled?: boolean;
}) {
  const t = useTranslations();
  // 여러 개 제출해야 하면 이름 뒤에 "(개수)" 표기
  const name =
    item.qty && item.qty > 1
      ? `${t(item.nameKey)} (${item.qty})`
      : t(item.nameKey);

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
