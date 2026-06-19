"use client";

import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";

// 도구 등급: 0(기본)~4(이리듐). wateringCanUpgrades 값과 1:1 대응.
const TOOL_TIER_MAX = 4;

export default function CharacterDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const { wateringCanUpgrades, setWateringCanUpgrades } = useSchedule();

  const stepBtn =
    "flex size-7 shrink-0 items-center justify-center rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] text-base font-bold leading-none hover:bg-[var(--sv-bg)] disabled:opacity-40";

  return (
    <Modal title={t("character.title")} onClose={onClose}>
      {/* 도구 등급(물뿌리개 업그레이드 제안과 연동) */}
      <div className="rounded-md border border-[var(--sv-border)] p-2">
        <label className="mb-1 block text-xs font-semibold text-[var(--sv-ink-muted)]">
          {t("character.toolTier")}
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="−"
            disabled={wateringCanUpgrades <= 0}
            onClick={() => setWateringCanUpgrades(wateringCanUpgrades - 1)}
            className={stepBtn}
          >
            −
          </button>
          <span className="flex flex-1 items-center justify-center gap-2 text-sm font-semibold">
            <PixelIcon
              src={`/icons/tools/wateringCan${wateringCanUpgrades}.png`}
              size={24}
            />
            {t(`character.toolTier_${wateringCanUpgrades}`)}
          </span>
          <button
            type="button"
            aria-label="+"
            disabled={wateringCanUpgrades >= TOOL_TIER_MAX}
            onClick={() => setWateringCanUpgrades(wateringCanUpgrades + 1)}
            className={stepBtn}
          >
            +
          </button>
        </div>
        <p className="mt-1 text-[11px] text-[var(--sv-ink-muted)]">
          {t("character.toolTierDesc")}
        </p>
      </div>
    </Modal>
  );
}
