"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getVillagerGifts, type GiftEntry, type VillagerGifts } from "@/data/gifts";
import { expandCategory } from "@/data/category-members";
import {
  UNIVERSAL_EN,
  partitionUniversal,
  type Tier,
} from "@/data/universal-gifts";
import { asset } from "@/lib/asset";
import PixelIcon from "@/components/PixelIcon";

const TIER_COLOR: Record<string, string> = {
  loves: "#c0506b",
  likes: "#5a8f3c",
  neutral: "#8b7355",
};

function ItemChip({ ko, en, icon }: { ko: string; en: string; icon?: string }) {
  const locale = useLocale();
  return (
    <span className="flex items-center gap-1.5 rounded-md bg-[var(--sv-bg)] px-2 py-1 text-xs">
      {icon ? (
        <Image
          src={asset(icon)}
          alt=""
          width={20}
          height={20}
          unoptimized
          className="shrink-0"
          style={{ imageRendering: "pixelated" }}
        />
      ) : (
        <PixelIcon src="/icons/ui/gift.png" size={18} />
      )}
      <span>{locale === "ko" ? ko : en}</span>
    </span>
  );
}

// 펼칠 수 있는 카테고리 칩 (클릭 → 소속 아이템, 주민 예외 제외)
function CategoryRow({
  entry,
  avoidEn,
}: {
  entry: GiftEntry;
  avoidEn: string[];
}) {
  const t = useTranslations();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const expandable = !!entry.cat;
  const members = open && entry.cat ? expandCategory(entry.cat, entry.detail, avoidEn) : [];

  if (!expandable) {
    // 펼치기 불가: 정적 칩 + 전체 설명 툴팁
    return (
      <span
        title={entry.detail ?? undefined}
        className="flex items-center gap-1.5 rounded-md bg-[var(--sv-bg)] px-2 py-1 text-xs italic"
      >
        <PixelIcon src="/icons/ui/gift.png" size={14} />
        {locale === "ko" ? entry.ko : entry.en}
      </span>
    );
  }

  return (
    <div className="rounded-md bg-[var(--sv-bg)] px-2 py-1">
      <button
        onClick={() => setOpen((v) => !v)}
        title={entry.detail ?? undefined}
        className="flex w-full items-center gap-1.5 text-left text-xs font-medium"
      >
        <PixelIcon src="/icons/ui/gift.png" size={14} />
        <span>{locale === "ko" ? entry.ko : entry.en}</span>
        <span className="ml-auto text-[10px] text-[var(--sv-ink-muted)]">
          {open ? "▾" : `▸ ${t("gift.expand")}`}
        </span>
      </button>
      {open && (
        <ul className="mt-1.5 flex flex-wrap gap-1">
          {members.map((m) => (
            <li key={m.en}>
              <ItemChip ko={m.ko} en={m.en} icon={m.icon} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 보편 선물 폴더 (tier별 1개). 주민 예외는 제거하고 하단에 명시.
function UniversalFolder({
  tierKey,
  gifts,
}: {
  tierKey: Tier;
  gifts: VillagerGifts;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const { normal, exceptions } = partitionUniversal(gifts, tierKey);

  if (normal.length === 0 && exceptions.length === 0) return null;

  const concrete = normal.filter((e) => !e.cat);
  const cats = normal.filter((e) => e.cat);

  return (
    <div className="rounded-md border border-dashed border-[var(--sv-border)] bg-[var(--sv-bg)] px-2 py-1.5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-1.5 text-left text-xs font-medium"
      >
        <PixelIcon src="/icons/ui/gift.png" size={14} />
        <span>{t(`gift.universal.${tierKey}`)}</span>
        <span className="ml-auto text-[10px] text-[var(--sv-ink-muted)]">
          {open ? "▾" : `▸ ${t("gift.expand")}`}
        </span>
      </button>
      {open && (
        <div className="mt-1.5 flex flex-col gap-1.5">
          {exceptions.length > 0 && (
            <p className="text-[10px] text-[var(--sv-ink-muted)]">
              <span className="font-semibold">{t("gift.exceptionLabel")}: </span>
              {exceptions.map((ex, i) => (
                <span key={ex.entry.en}>
                  {i > 0 ? ", " : ""}
                  {locale === "ko" ? ex.entry.ko : ex.entry.en}
                  {` (${t(`gift.reaction.${ex.reaction}`)})`}
                </span>
              ))}
            </p>
          )}
          {concrete.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {concrete.map((g, i) => (
                <li key={`${g.en}-${i}`}>
                  <ItemChip ko={g.ko} en={g.en} icon={g.icon} />
                </li>
              ))}
            </ul>
          )}
          {cats.length > 0 && (
            <div className="flex flex-col gap-1">
              {cats.map((g, i) => (
                <CategoryRow
                  key={`${g.ko}-${i}`}
                  entry={g}
                  avoidEn={gifts.avoidEn}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 한 주민의 선물 반응(사랑/좋아함/보통) 본문. 모달 껍데기 없이 내용만 렌더 → 어디서든 재사용.
export default function GiftSections({ villagerId }: { villagerId: string }) {
  const t = useTranslations();
  const gifts = getVillagerGifts(villagerId);

  const tiers = [
    { key: "loves", items: gifts.loves },
    { key: "likes", items: gifts.likes },
    { key: "neutral", items: gifts.neutral },
  ] as const;

  return (
    <>
      <p className="mb-3 text-xs text-[var(--sv-ink-muted)]">
        {t("gift.birthdayHint")}
      </p>

      <div className="flex flex-col gap-4">
        {tiers.map(({ key, items }) => {
          // 보편 선물은 별도 폴더로 분리하고, 주민 고유 선물만 위에 노출
          const specific = items.filter((e) => !UNIVERSAL_EN[key].has(e.en));
          const concrete = specific.filter((e) => !e.detail);
          const cats = specific.filter((e) => e.detail);
          return (
            <section key={key}>
              <h3
                className="mb-1.5 text-sm font-bold"
                style={{ color: TIER_COLOR[key] }}
              >
                {t(`gift.${key}`)}
              </h3>
              {concrete.length > 0 && (
                <ul className="mb-1.5 flex flex-wrap gap-1.5">
                  {concrete.map((g, i) => (
                    <li key={`${g.en}-${i}`}>
                      <ItemChip ko={g.ko} en={g.en} icon={g.icon} />
                    </li>
                  ))}
                </ul>
              )}
              {cats.length > 0 && (
                <div className="mb-1.5 flex flex-col gap-1">
                  {cats.map((g, i) => (
                    <CategoryRow
                      key={`${g.ko}-${i}`}
                      entry={g}
                      avoidEn={gifts.avoidEn}
                    />
                  ))}
                </div>
              )}
              <UniversalFolder tierKey={key} gifts={gifts} />
            </section>
          );
        })}
      </div>
    </>
  );
}
