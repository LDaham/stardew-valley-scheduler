"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";
import {
  COST_SHOPS,
  COST_SHOP_ICON,
  getCostShop,
  type CostOffer,
} from "@/data/costMaterials";

// note의 "<계절> 한정"으로 계절 토큰을 뽑는다(잡화점 등 계절 한정 씨앗용).
const SEASON_KEYS = ["spring", "summer", "fall", "winter"] as const;
const SEASON_WORD: Record<string, string> = {
  spring: "봄",
  summer: "여름",
  fall: "가을",
  winter: "겨울",
};
function offerSeasons(o: CostOffer): string[] {
  const note = o.note ?? "";
  return SEASON_KEYS.filter((k) => note.includes(`${SEASON_WORD[k]} 한정`));
}

// 비용 및 재료: 가게 목록 → 가게 클릭 시 해당 가게의 비용(골드)·재료 패널 표시.
// 가게가 많아져(14개) 탭 대신 선물 선호와 동일한 목록→드릴인 방식. 상세에서 '‹'로 복귀.
export default function CostMaterialsDialog({
  onClose,
  onBack,
}: {
  onClose: () => void;
  onBack?: () => void;
}) {
  const t = useTranslations();
  const [selected, setSelected] = useState<string | null>(null);

  // 상세: 선택한 가게의 판매 물품(목록과 같은 창, '‹'로 복귀)
  if (selected) {
    return (
      <Modal
        title={t(`costMaterials.shops.${selected}`)}
        onClose={onClose}
        onBack={() => setSelected(null)}
        titleIcon={
          <PixelIcon
            src={`/icons/shops/${COST_SHOP_ICON[selected]}.png`}
            size={22}
          />
        }
      >
        <ShopOffersPanel key={selected} id={selected} />
        <p className="mt-3 text-[10px] text-[var(--sv-ink-muted)]">
          {t("costMaterials.source")}
        </p>
      </Modal>
    );
  }

  // 목록: 가게 선택
  return (
    <Modal title={t("costMaterials.title")} onClose={onClose} onBack={onBack}>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {COST_SHOPS.map((s) => (
          <li key={s.id}>
            <button
              onClick={() => setSelected(s.id)}
              className="flex w-full cursor-pointer items-center gap-2 rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] px-2 py-2 text-left text-sm font-semibold hover:bg-[var(--sv-bg)]"
            >
              <PixelIcon
                src={`/icons/shops/${COST_SHOP_ICON[s.id]}.png`}
                size={24}
              />
              <span className="truncate">{t(`costMaterials.shops.${s.id}`)}</span>
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}

// 선택된 가게의 판매 물품 패널(모달 래퍼 없이 본문만).
// 가게가 여러 서비스(상점·업그레이드·정동석 가공 등)를 제공하면 offer의 cat으로
// 묶어 상단 탭으로 나눈다(데이터 등장 순서 = 탭 순서). cat이 1종 이하면 탭 없이 표시.
// 읽기 순서대로 채우는 단순 그리드(데이터 순서 = 표시 순서).
function ShopOffersPanel({ id }: { id: string }) {
  const t = useTranslations();
  const offers = getCostShop(id)?.offers ?? [];

  // 등장 순서대로 카테고리 수집(중복 제거)
  const cats: string[] = [];
  for (const o of offers) {
    const c = o.cat;
    if (c && !cats.includes(c)) cats.push(c);
  }
  const hasTabs = cats.length > 1;
  const [tab, setTab] = useState(cats[0] ?? "");

  const catShown = hasTabs ? offers.filter((o) => o.cat === tab) : offers;

  // 계절 필터: note의 "<계절> 한정"으로 판별. 계절 항목이 있는 가게(잡화점 등)에만 노출.
  const seasonsPresent = SEASON_KEYS.filter((k) =>
    offers.some((o) => offerSeasons(o).includes(k)),
  );
  const hasSeasonFilter = seasonsPresent.length > 0;
  const [season, setSeason] = useState<string>("all");
  const shown =
    !hasSeasonFilter || season === "all"
      ? catShown
      : catShown.filter((o) => {
          const ss = offerSeasons(o);
          return ss.length === 0 || ss.includes(season); // 상시 품목은 항상 표시
        });

  return (
    <>
      {hasTabs && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setTab(c)}
              className={`cursor-pointer rounded-md border px-2.5 py-1 text-xs font-semibold ${
                tab === c
                  ? "border-[var(--sv-accent)] bg-[var(--sv-accent)] text-white"
                  : "border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
              }`}
            >
              {t(`costMaterials.cats.${c}`)}
            </button>
          ))}
        </div>
      )}
      {hasSeasonFilter && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {["all", ...seasonsPresent].map((k) => (
            <button
              key={k}
              onClick={() => setSeason(k)}
              className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold ${
                season === k
                  ? "bg-[var(--sv-accent)] text-[var(--sv-accent-ink)]"
                  : "border border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink)] hover:bg-[var(--sv-bg)]"
              }`}
            >
              {k === "all" ? t("seasonFilter.all") : t(`seasons.${k}`)}
            </button>
          ))}
        </div>
      )}
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {shown.map((o, i) => (
          <li key={`${o.en}-${i}`}>
            <OfferRow offer={o} />
          </li>
        ))}
      </ul>
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
