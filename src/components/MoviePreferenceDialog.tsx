"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import Modal from "@/components/Modal";
import {
  MOVIE_PREF_VILLAGERS,
  getMoviePref,
  type PrefItem,
} from "@/data/moviePrefs";

// 영화 선호: 주민 목록 → 클릭 시 사랑/좋아하는 영화·간식 표시.
export default function MoviePreferenceDialog({
  onClose,
  onBack,
}: {
  onClose: () => void;
  onBack?: () => void;
}) {
  const t = useTranslations();
  const [selected, setSelected] = useState<string | null>(null);

  // 선호 데이터가 있는 주민: 이름순
  const npcs = [...MOVIE_PREF_VILLAGERS].sort((a, b) =>
    t(`villagers.${a}`).localeCompare(t(`villagers.${b}`)),
  );

  if (selected) {
    return (
      <MovieDetailView
        id={selected}
        onClose={onClose}
        onBack={() => setSelected(null)}
      />
    );
  }

  return (
    <Modal title={t("info.moviePref")} onClose={onClose} onBack={onBack}>
      <p className="mb-3 text-xs text-[var(--sv-ink-muted)]">
        {t("info.moviePrefHint")}
      </p>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {npcs.map((id) => (
          <li key={id}>
            <button
              onClick={() => setSelected(id)}
              className="flex w-full cursor-pointer items-center gap-2 rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] px-2 py-2 text-left text-sm font-semibold hover:bg-[var(--sv-bg)]"
            >
              <Image
                src={asset(`/icons/villagers/${id}.png`)}
                alt=""
                width={28}
                height={28}
                unoptimized
                className="shrink-0"
                style={{ imageRendering: "pixelated" }}
              />
              <span className="truncate">{t(`villagers.${id}`)}</span>
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}

function MovieDetailView({
  id,
  onClose,
  onBack,
}: {
  id: string;
  onClose: () => void;
  onBack: () => void;
}) {
  const t = useTranslations();
  const pref = getMoviePref(id);

  const sections: { key: string; color: string; items: PrefItem[] }[] = [
    { key: "lovedMovies", color: "#c0506b", items: pref?.lovedMovies ?? [] },
    { key: "likedMovies", color: "#5a8f3c", items: pref?.likedMovies ?? [] },
    { key: "lovedSnacks", color: "#c0506b", items: pref?.lovedSnacks ?? [] },
    { key: "likedSnacks", color: "#5a8f3c", items: pref?.likedSnacks ?? [] },
  ];
  const hasAny = sections.some((s) => s.items.length > 0);

  return (
    <Modal title={t(`villagers.${id}`)} onClose={onClose} onBack={onBack}>
      <div className="mb-3 flex items-center gap-2">
        <Image
          src={asset(`/icons/villagers/${id}.png`)}
          alt=""
          width={28}
          height={28}
          unoptimized
          className="shrink-0"
          style={{ imageRendering: "pixelated" }}
        />
        <h3 className="text-base font-bold">{t(`villagers.${id}`)}</h3>
      </div>

      {hasAny ? (
        <div className="flex flex-col gap-4">
          {sections
            .filter((s) => s.items.length > 0)
            .map((s) => (
              <section key={s.key}>
                <h4
                  className="mb-1.5 text-sm font-bold"
                  style={{ color: s.color }}
                >
                  {t(`movie.${s.key}`)}
                </h4>
                <ul className="flex flex-wrap gap-1.5">
                  {s.items.map((it) => (
                    <li key={it.en}>
                      <PrefChip item={it} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
        </div>
      ) : (
        <p className="rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm text-[var(--sv-ink-muted)]">
          {t("movie.none")}
        </p>
      )}

      <p className="mt-3 text-[10px] text-[var(--sv-ink-muted)]">
        {t("movie.source")}
      </p>
    </Modal>
  );
}

function PrefChip({ item }: { item: PrefItem }) {
  const locale = useLocale();
  return (
    <span className="flex items-center gap-1.5 rounded-md bg-[var(--sv-bg)] px-2 py-1 text-xs">
      <Image
        src={asset(item.icon)}
        alt=""
        width={22}
        height={22}
        unoptimized
        className="shrink-0"
        style={{ imageRendering: "pixelated" }}
      />
      <span>{locale === "ko" ? item.ko : item.en}</span>
    </span>
  );
}
