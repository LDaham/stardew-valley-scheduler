"use client";

import { useTranslations } from "next-intl";
import type { CharacterInfo } from "@/types/schedule";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";

// 체크박스로 켜는 독립 스킬(경작인·채집가·식물학자)
const CHECK_SKILLS: (keyof CharacterInfo)[] = ["tiller", "gatherer", "botanist"];

// 도구 등급: 0(기본)~4(이리듐). wateringCanUpgrades 값과 1:1 대응.
const TOOL_TIER_MAX = 4;

// 농사 10레벨 전문직(상호 배타): 농업 전문가 / 장인 (체크박스로 택1)
type Profession = "agriculturist" | "artisan";

export default function CharacterDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const { character, setCharacter, wateringCanUpgrades, setWateringCanUpgrades } =
    useSchedule();

  // 체크박스 택1: 하나를 켜면 나머지는 꺼지고, 끄면 둘 다 해제(전문직 없음)
  const toggleProfession = (p: Profession, checked: boolean) =>
    setCharacter({
      agriculturist: checked && p === "agriculturist",
      artisan: checked && p === "artisan",
    });

  const setLevel = (key: "farmingLevel" | "foragingLevel", n: number) =>
    setCharacter({ [key]: Math.max(0, Math.min(10, n)) } as Partial<CharacterInfo>);

  const stepBtn =
    "flex size-7 shrink-0 items-center justify-center rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] text-base font-bold leading-none hover:bg-[var(--sv-bg)] disabled:opacity-40";

  const levelInput = (key: "farmingLevel" | "foragingLevel") => (
    <div>
      <label className="mb-1 block text-xs font-semibold text-[var(--sv-ink-muted)]">
        {t(`character.${key}`)}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="−"
          disabled={character[key] <= 0}
          onClick={() => setLevel(key, character[key] - 1)}
          className={stepBtn}
        >
          −
        </button>
        <input
          type="number"
          min={0}
          max={10}
          value={character[key]}
          onChange={(e) => setLevel(key, Number(e.target.value) || 0)}
          className="w-10 rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] py-1 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          aria-label="+"
          disabled={character[key] >= 10}
          onClick={() => setLevel(key, character[key] + 1)}
          className={stepBtn}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <Modal title={t("character.title")} onClose={onClose}>
      <p className="mb-3 text-xs text-[var(--sv-ink-muted)]">
        {t("character.hint")}
      </p>
      <div className="mb-3 grid grid-cols-2 gap-2">
        {levelInput("farmingLevel")}
        {levelInput("foragingLevel")}
      </div>

      {/* 도구 등급(물뿌리개 업그레이드 제안과 연동) */}
      <div className="mb-3 rounded-md border border-[var(--sv-border)] p-2">
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

      <div className="flex flex-col gap-2">
        {/* 경작인 */}
        <label className="flex cursor-pointer items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={character.tiller}
            onChange={(e) => setCharacter({ tiller: e.target.checked })}
            className="mt-0.5 size-4 accent-[var(--sv-accent)]"
          />
          <span>
            <span className="font-semibold">{t("character.tiller")}</span>
            <span className="block text-xs text-[var(--sv-ink-muted)]">
              {t("character.tillerDesc")}
            </span>
          </span>
        </label>

        {/* 농사 10레벨 전문직: 농업 전문가 ↔ 장인 (체크박스 택1) */}
        <div className="rounded-md border border-[var(--sv-border)] p-2">
          <p className="mb-1 text-xs font-semibold text-[var(--sv-ink-muted)]">
            {t("character.profession")}
          </p>
          {(["agriculturist", "artisan"] as Profession[]).map((p) => (
            <label
              key={p}
              className="flex cursor-pointer items-start gap-2 py-0.5 text-sm"
            >
              <input
                type="checkbox"
                checked={character[p] as boolean}
                onChange={(e) => toggleProfession(p, e.target.checked)}
                className="mt-0.5 size-4 accent-[var(--sv-accent)]"
              />
              <span>
                <span className="font-semibold">
                  {t(`character.profession_${p}`)}
                </span>
                <span className="block text-xs text-[var(--sv-ink-muted)]">
                  {t(`character.${p}Desc`)}
                </span>
              </span>
            </label>
          ))}
        </div>

        {/* 채집가 · 식물학자 */}
        {CHECK_SKILLS.filter((s) => s !== "tiller").map((s) => (
          <label key={s} className="flex cursor-pointer items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={character[s] as boolean}
              onChange={(e) =>
                setCharacter({ [s]: e.target.checked } as Partial<CharacterInfo>)
              }
              className="mt-0.5 size-4 accent-[var(--sv-accent)]"
            />
            <span>
              <span className="font-semibold">{t(`character.${s}`)}</span>
              <span className="block text-xs text-[var(--sv-ink-muted)]">
                {t(`character.${s}Desc`)}
              </span>
            </span>
          </label>
        ))}
      </div>
    </Modal>
  );
}
