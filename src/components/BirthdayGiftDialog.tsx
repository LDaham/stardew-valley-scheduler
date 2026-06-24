"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import Modal from "@/components/Modal";
import MasterDetailPanel from "@/components/MasterDetailPanel";
import GiftSections from "@/components/GiftSections";
import { GIFT_VILLAGERS } from "@/data/gifts";
import { BIRTHDAYS, type Birthday } from "@/data/game-data";
import { SEASONS } from "@/lib/calendar";

// 선물 선호: 좌측 주민 목록(생일 순) + 우측 선물 반응을 동시에 표시.
export default function BirthdayGiftDialog({
  onClose,
  onBack,
}: {
  onClose: () => void;
  onBack?: () => void;
}) {
  const t = useTranslations();
  const bday = new Map<string, Birthday>(BIRTHDAYS.map((b) => [b.villager, b]));
  const yearDay = (b: Birthday) => SEASONS.indexOf(b.season) * 28 + b.day;
  // 생일 있는 주민은 달력 순, 생일 없는 주민은 이름순으로 뒤에.
  const ordered = [...GIFT_VILLAGERS].sort((a, b) => {
    const ba = bday.get(a);
    const bb = bday.get(b);
    if (ba && bb) return yearDay(ba) - yearDay(bb);
    if (ba) return -1;
    if (bb) return 1;
    return t(`villagers.${a}`).localeCompare(t(`villagers.${b}`));
  });

  return (
    <Modal title={t("info.birthdayGift")} onClose={onClose} onBack={onBack}>
      <MasterDetailPanel
        items={ordered}
        getId={(id) => id}
        getSearchText={(id) => t(`villagers.${id}`)}
        searchPlaceholder={t("info.searchVillager")}
        renderItem={(id, on) => {
          const b = bday.get(id);
          return (
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
              <span className="min-w-0 flex-1">
                <span className="block truncate font-semibold">
                  {t(`villagers.${id}`)}
                </span>
                {b && (
                  <span
                    className={`block text-xs ${on ? "text-[var(--sv-accent-ink)]/80" : "text-[var(--sv-ink-muted)]"}`}
                  >
                    {t(`seasons.${b.season}`)} {b.day}
                  </span>
                )}
              </span>
            </>
          );
        }}
        renderDetail={(id) => (
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
                {t("gift.prefBy", { name: t(`villagers.${id}`) })}
              </h3>
            </div>
            <GiftSections villagerId={id} />
          </div>
        )}
      />
    </Modal>
  );
}
