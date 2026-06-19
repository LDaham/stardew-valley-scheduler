"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import Modal from "@/components/Modal";
import { useGiftDialog } from "@/components/GiftDialogProvider";
import { GIFT_VILLAGERS } from "@/data/gifts";
import { BIRTHDAYS, type Birthday } from "@/data/game-data";
import { SEASONS } from "@/lib/calendar";

// 생일 선물: 전체 주민 목록(생일 순). 주민 클릭 시 해당 주민 선물 다이얼로그를 연다.
export default function BirthdayGiftDialog({
  onClose,
  onBack,
}: {
  onClose: () => void;
  onBack?: () => void;
}) {
  const t = useTranslations();
  const openGifts = useGiftDialog();
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
      <p className="mb-3 text-xs text-[var(--sv-ink-muted)]">
        {t("info.birthdayGiftHint")}
      </p>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {ordered.map((id) => {
          const b = bday.get(id);
          return (
            <li key={id}>
              <button
                onClick={() => openGifts(id)}
                className="flex w-full items-center gap-2 rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] px-2 py-2 text-left text-sm hover:bg-[var(--sv-bg)]"
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
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">
                    {t(`villagers.${id}`)}
                  </span>
                  {b && (
                    <span className="block text-[10px] text-[var(--sv-ink-muted)]">
                      {t(`seasons.${b.season}`)} {b.day}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
