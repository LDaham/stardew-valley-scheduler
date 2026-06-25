"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import { localizeItem } from "@/lib/itemName";
import Modal from "@/components/Modal";
import MasterDetailPanel from "@/components/MasterDetailPanel";
import {
  MOVIE_PREF_VILLAGERS,
  getMoviePref,
  type PrefItem,
} from "@/data/moviePrefs";

// 주민 표시 순서(총각 → 총각녀 → 그 외, 사용자 지정).
const NPC_ORDER = [
  "sam", "sebastian", "shane", "alex", "elliott", "harvey",
  "leah", "maru", "abigail", "emily", "penny", "haley",
  "gus", "demetrius", "dwarf", "linus", "leo", "robin", "lewis",
  "marnie", "wizard", "vincent", "sandy", "evelyn", "willy", "jas",
  "jodi", "george", "caroline", "kent", "krobus", "clint", "pam", "pierre",
];

// 영화 선호: 좌측 주민 목록 + 우측 사랑/좋아하는 영화·간식을 동시에 표시.
export default function MoviePreferenceDialog({
  onClose,
  onBack,
}: {
  onClose: () => void;
  onBack?: () => void;
}) {
  const t = useTranslations();

  // 선호 데이터가 있는 주민: 지정 순서(미지정은 뒤)
  const rank = (id: string) => {
    const i = NPC_ORDER.indexOf(id);
    return i < 0 ? Number.MAX_SAFE_INTEGER : i;
  };
  const npcs = [...MOVIE_PREF_VILLAGERS].sort((a, b) => rank(a) - rank(b));

  return (
    <Modal title={t("info.moviePref")} onClose={onClose} onBack={onBack}>
      <MasterDetailPanel
        items={npcs}
        getId={(id) => id}
        getSearchText={(id) => t(`villagers.${id}`)}
        searchPlaceholder={t("info.searchVillager")}
        renderItem={(id) => (
          <>
            <Image
              src={asset(`/icons/villagers/${id}.png`)}
              alt=""
              width={28}
              height={28}
              unoptimized
              className="shrink-0"
              style={{ imageRendering: "pixelated" }}
            />
            <span className="truncate font-semibold">{t(`villagers.${id}`)}</span>
          </>
        )}
        renderDetail={(id) => <MovieDetail id={id} />}
      />
    </Modal>
  );
}

function MovieDetail({ id }: { id: string }) {
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
    <div>
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
        <h3 className="text-base font-bold">
          {t("movie.prefBy", { name: t(`villagers.${id}`) })}
        </h3>
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

      <p className="mt-3 text-xs text-[var(--sv-ink-muted)]">
        {t("movie.source")}
      </p>
    </div>
  );
}

function PrefChip({ item }: { item: PrefItem }) {
  const locale = useLocale();
  return (
    <span className="flex items-center gap-1.5 rounded-md bg-[var(--sv-bg)] px-2 py-1 text-xs">
      <Image
        src={asset(item.icon)}
        alt=""
        width={20}
        height={20}
        unoptimized
        className="shrink-0"
        style={{ imageRendering: "pixelated" }}
      />
      <span>{localizeItem(item.en, item.ko, locale)}</span>
    </span>
  );
}
