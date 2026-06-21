"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";
import MasonryColumns from "@/components/MasonryColumns";
import {
  COST_SHOPS,
  COST_SHOP_ICON,
  getCostShop,
  type CostOffer,
} from "@/data/costMaterials";

// 비용 및 재료: 상단 레이블(탭)로 가게 선택 → 해당 가게의 비용(골드)·재료 패널 표시.
export default function CostMaterialsDialog({
  onClose,
  onBack,
}: {
  onClose: () => void;
  onBack?: () => void;
}) {
  const t = useTranslations();
  // 기본 선택: 첫 가게(탭 형태라 항상 하나가 열려 있다)
  const [selected, setSelected] = useState<string>(COST_SHOPS[0].id);

  return (
    <Modal title={t("costMaterials.title")} onClose={onClose} onBack={onBack}>
      {/* 상단 가게 레이블(탭): 클릭 시 아래 패널이 해당 가게로 전환 */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {COST_SHOPS.map((s) => {
          const active = s.id === selected;
          return (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              aria-pressed={active}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                active
                  ? "bg-[var(--sv-accent)] text-white"
                  : "border border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
              }`}
            >
              <PixelIcon src={`/icons/shops/${COST_SHOP_ICON[s.id]}.png`} size={16} />
              {t(`costMaterials.shops.${s.id}`)}
            </button>
          );
        })}
      </div>

      <ShopOffersPanel id={selected} />

      <p className="mt-3 text-[10px] text-[var(--sv-ink-muted)]">
        {t("costMaterials.source")}
      </p>
    </Modal>
  );
}

// 선택된 가게의 판매 물품 패널(모달 래퍼 없이 본문만).
function ShopOffersPanel({ id }: { id: string }) {
  const shop = getCostShop(id);

  return (
    <>
      {/* 모바일: 1열 */}
      <div className="flex flex-col gap-2 sm:hidden">
        {shop?.offers.map((o, i) => (
          <OfferRow key={`${o.en}-${i}`} offer={o} />
        ))}
      </div>
      {/* 데스크톱: 2열(내용 높이만큼 — 빈 공간 없이 채움) */}
      <div className="hidden sm:block">
        <MasonryColumns
          items={shop?.offers ?? []}
          getKey={(o) => `${o.en}-${o.gold}-${o.day ?? ""}`}
          render={(o) => <OfferRow offer={o} />}
        />
      </div>
    </>
  );
}

function OfferRow({ offer }: { offer: CostOffer }) {
  const t = useTranslations();
  const locale = useLocale();
  const name = (it: { ko: string; en: string }) =>
    locale === "ko" ? it.ko : it.en;

  const hasMaterials = offer.materials.length > 0;
  return (
    <div className="rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] p-2.5">
      {/* 이름(좌) + 판매일 + 골드 비용(오른쪽 끝) */}
      <div className="flex items-center gap-2">
        <Image
          src={asset(offer.icon)}
          alt=""
          width={24}
          height={24}
          unoptimized
          className="shrink-0"
          style={{ imageRendering: "pixelated" }}
        />
        <span className="min-w-0 flex-1 text-sm font-semibold">
          {name(offer)}
        </span>
        {offer.day && (
          <span className="shrink-0 rounded bg-[var(--sv-bg)] px-1.5 py-0.5 text-[10px] text-[var(--sv-ink-muted)]">
            {offer.day}
          </span>
        )}
        {offer.gold > 0 && (
          <span className="shrink-0 rounded-md bg-[var(--sv-bg)] px-2 py-0.5 text-xs font-semibold text-[var(--sv-warn)]">
            {offer.gold.toLocaleString()} {t("costMaterials.gold")}
          </span>
        )}
      </div>

      {/* 재료(있을 때만). 골드도 재료도 없으면 '무료' */}
      {hasMaterials ? (
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
          {offer.materials.map((m, i) => (
            <span
              key={`${m.en}-${i}`}
              className="flex items-center gap-1 rounded-md bg-[var(--sv-bg)] px-2 py-1"
            >
              <Image
                src={asset(m.icon)}
                alt=""
                width={18}
                height={18}
                unoptimized
                className="shrink-0"
                style={{ imageRendering: "pixelated" }}
              />
              {name(m)}
              {m.qty > 1 && (
                <span className="text-[var(--sv-ink-muted)]">×{m.qty}</span>
              )}
            </span>
          ))}
        </div>
      ) : (
        offer.gold === 0 && (
          <div className="mt-1.5 text-xs text-[var(--sv-ink-muted)]">
            {t("costMaterials.free")}
          </div>
        )
      )}

      {/* 구매 조건 등 부가 설명(긴 텍스트 — 박스 안에 별도 줄로 표시) */}
      {offer.note && (
        <p className="mt-1.5 text-[11px] leading-snug text-[var(--sv-ink-muted)]">
          {offer.note}
        </p>
      )}
    </div>
  );
}
