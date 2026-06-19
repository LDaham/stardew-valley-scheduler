"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";
import ShopScheduleDialog from "@/components/ShopScheduleDialog";
import SeedEfficiencyDialog from "@/components/SeedEfficiencyDialog";
import FishInfoDialog from "@/components/FishInfoDialog";
import BirthdayGiftDialog from "@/components/BirthdayGiftDialog";
import NpcLocationDialog from "@/components/NpcLocationDialog";
import type { Season } from "@/lib/calendar";

type View = "hub" | "shop" | "seed" | "fish" | "gift" | "npc";

// 정보 허브: 가게 일정·작물 효율·생선 정보·생일 선물 진입점.
// 항목 선택 시 해당 다이얼로그로 전환되고, 좌상단 '이전'으로 허브 복귀.
export default function InfoHubDialog({
  season,
  onClose,
}: {
  season: Season;
  onClose: () => void;
}) {
  const t = useTranslations();
  const [view, setView] = useState<View>("hub");
  const back = () => setView("hub");

  if (view === "shop")
    return <ShopScheduleDialog onClose={onClose} onBack={back} />;
  if (view === "seed")
    return (
      <SeedEfficiencyDialog season={season} onClose={onClose} onBack={back} />
    );
  if (view === "fish")
    return <FishInfoDialog season={season} onClose={onClose} onBack={back} />;
  if (view === "gift")
    return <BirthdayGiftDialog onClose={onClose} onBack={back} />;
  if (view === "npc")
    return <NpcLocationDialog onClose={onClose} onBack={back} />;

  const items: { key: View; icon: string; label: string }[] = [
    { key: "shop", icon: "/icons/ui/time.png", label: t("shopSchedule.short") },
    { key: "seed", icon: "/icons/ui/corn.png", label: t("seedEfficiency.short") },
    { key: "fish", icon: "/icons/tools/fishingRod.png", label: t("fish.title") },
    { key: "gift", icon: "/icons/ui/gift.png", label: t("info.birthdayGift") },
    { key: "npc", icon: "/icons/ui/character.png", label: t("info.npcLocation") },
  ];

  return (
    <Modal title={t("info.title")} onClose={onClose}>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.key}>
            <button
              onClick={() => setView(it.key)}
              className="flex w-full items-center gap-2 rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] px-3 py-3 text-left text-sm font-semibold hover:bg-[var(--sv-bg)]"
            >
              <PixelIcon src={it.icon} size={20} />
              {it.label}
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
