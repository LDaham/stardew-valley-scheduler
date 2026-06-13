"use client";

import { useEffect, useState } from "react";
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
        <span aria-hidden>📦</span>
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
        <span aria-hidden>📦</span>
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
        <span aria-hidden>{open ? "📂" : "📦"}</span>
        <span>{locale === "ko" ? entry.ko : entry.en}</span>
        <span className="ml-auto text-[10px] text-[var(--sv-ink-muted)]">
          {open ? "▾" : `▸ ${t("gift.expand")}`}
        </span>
      </button>
      {open && (
        <ul className="mt-1.5 grid grid-cols-2 gap-1 sm:grid-cols-3">
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
        <span aria-hidden>{open ? "📂" : "📦"}</span>
        <span>{t(`gift.universal.${tierKey}`)}</span>
        <span className="ml-auto text-[10px] text-[var(--sv-ink-muted)]">
          {open ? "▾" : `▸ ${t("gift.expand")}`}
        </span>
      </button>
      {open && (
        <div className="mt-1.5 flex flex-col gap-1.5">
          <p className="text-[10px] text-[var(--sv-ink-muted)]">
            {t("gift.universalHint")}
          </p>
          {concrete.length > 0 && (
            <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
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
        </div>
      )}
    </div>
  );
}

export default function GiftDialog({
  villagerId,
  onClose,
}: {
  villagerId: string;
  onClose: () => void;
}) {
  const t = useTranslations();
  const gifts = getVillagerGifts(villagerId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const tiers = [
    { key: "loves", items: gifts.loves },
    { key: "likes", items: gifts.likes },
    { key: "neutral", items: gifts.neutral },
  ] as const;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[var(--sv-border)] bg-[var(--sv-panel)] p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-2 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Image
              src={asset(`/icons/villagers/${villagerId}.png`)}
              alt=""
              width={28}
              height={28}
              unoptimized
              style={{ imageRendering: "pixelated" }}
            />
            {t("gift.prefBy", { name: t(`villagers.${villagerId}`) })}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
            aria-label={t("gift.close")}
          >
            ✕
          </button>
        </div>

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
                  <ul className="mb-1.5 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
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
      </div>
    </div>
  );
}
