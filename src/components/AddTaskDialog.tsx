"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { addDays, type SDate } from "@/lib/calendar";
import { CROPS } from "@/data/game-data";
import { MACHINES } from "@/data/machines";
import { computeHarvest, type Fertilizer } from "@/lib/growth";
import { toolPickup, type ToolPickup } from "@/lib/blacksmith";
import { BUNDLES, bundleItemKey } from "@/data/bundles";
import type { MemoCategory } from "@/lib/todoOrder";
import type { Memo } from "@/types/schedule";
import { asset } from "@/lib/asset";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";
import TimeIcon from "@/components/TimeIcon";
import PixelIcon from "@/components/PixelIcon";

type Mode = "menu" | "tool" | "seed" | "machine";

// 폼이 있는 메뉴(계산 필요) / 폼 없이 즉시 추가하는 단순 메뉴(misc)
const FORM_MENU = ["tool", "seed", "machine"] as const;
const SIMPLE_MENU = ["geode", "museum"] as const;

// 메뉴 항목 아이콘
const MENU_ICONS: Record<
  (typeof FORM_MENU)[number] | (typeof SIMPLE_MENU)[number],
  string
> = {
  tool: "/icons/addTask/tool.png",
  seed: "/icons/addTask/seed.png",
  machine: "/icons/addTask/machine.png",
  geode: "/icons/addTask/geode.png",
  museum: "/icons/addTask/museum.png",
};

const TOOLS = ["axe", "pickaxe", "hoe", "wateringCan", "trashCan"] as const;
const FERTILIZERS: Fertilizer[] = ["none", "speedGro", "deluxe", "hyper"];

export default function AddTaskDialog({
  baseDate,
  dayLabel,
  onClose,
}: {
  baseDate: SDate;
  dayLabel: string;
  onClose: () => void;
}) {
  const t = useTranslations();
  const { addMemo, addMemos, bundleItemsDone } = useSchedule();
  const [mode, setMode] = useState<Mode>("menu");

  // 마을 회관 완료 여부 → 대장간 금요일 휴무 판단
  const ccCompleted = BUNDLES.every(
    (b) =>
      b.items.filter((i) => bundleItemsDone[bundleItemKey(b.id, i.id)]).length >=
      b.needed,
  );
  const pickup = toolPickup(baseDate, ccCompleted);

  const dateLabel = (d: SDate) =>
    t("addTask.dateLabel", { season: t(`seasons.${d.season}`), day: d.day });

  const addAndClose = (date: SDate, text: string, category: MemoCategory) => {
    addMemo({
      season: date.season,
      day: date.day,
      text,
      reminderDaysBefore: 0,
      category,
    });
    onClose();
  };

  // 씨앗 심기: 수확 메모 1개 + 물주기 메모(심은 계절 내, 수확 전날까지 / 재수확이면 계절 끝까지) 일괄 생성
  const addSeed = (cropId: string, agri: boolean, fert: Fertilizer) => {
    const crop = CROPS.find((c) => c.id === cropId);
    if (!crop) return;
    const h = computeHarvest(baseDate, crop, agri, fert);
    const cropName = t(`crops.${cropId}`);
    const memos: Omit<Memo, "id" | "createdAt" | "done">[] = [
      {
        season: h.date.season,
        day: h.date.day,
        text: t("addTask.harvestMemo", { crop: cropName }),
        reminderDaysBefore: 0,
        category: "harvest",
      },
    ];
    const sameSeason = h.date.season === baseDate.season;
    const lastWater = crop.regrowDays ? 28 : sameSeason ? h.date.day - 1 : 28;
    for (let d = baseDate.day; d <= Math.min(lastWater, 28); d++) {
      memos.push({
        season: baseDate.season,
        day: d,
        text: t("addTask.wateringMemo", { crop: cropName }),
        reminderDaysBefore: 0,
        category: "watering",
      });
    }
    // 재수확 작물이 아니고 시즌 내 수확 가능하면, 수확일에 재파종용 씨앗 구매 메모 추가
    if (!crop.regrowDays && !h.willWilt) {
      memos.push({
        season: h.date.season,
        day: h.date.day,
        text: t("addTask.buySeedMemo", { crop: cropName }),
        reminderDaysBefore: 0,
        category: "buySeed",
      });
    }
    addMemos(memos);
    onClose();
  };

  // 메뉴 항목 렌더(아이콘 + 라벨 + 클릭 동작 공통)
  const renderMenuItem = (m: string, onClick: () => void) => (
    <li key={m}>
      <button
        onClick={onClick}
        className="flex w-full items-center gap-3 rounded-lg border border-[var(--sv-border)] px-3 py-3 text-left text-sm font-semibold hover:bg-[var(--sv-bg)]"
      >
        <Image
          src={asset(MENU_ICONS[m as keyof typeof MENU_ICONS])}
          alt=""
          width={28}
          height={28}
          unoptimized
          className="shrink-0"
          style={{ imageRendering: "pixelated" }}
        />
        {t(`addTask.${m}`)}
      </button>
    </li>
  );

  return (
    <Modal
      title={
        mode === "menu"
          ? t("addTask.titleWithDay", { day: dayLabel })
          : t(`addTask.${mode}`)
      }
      onClose={onClose}
    >
      {mode === "menu" && (
        <ul className="flex flex-col gap-2">
          {FORM_MENU.map((m) => renderMenuItem(m, () => setMode(m)))}
          {SIMPLE_MENU.map((m) =>
            renderMenuItem(m, () =>
              addAndClose(baseDate, t(`addTask.${m}Memo`), "misc"),
            ),
          )}
        </ul>
      )}

      {mode === "tool" && (
        <ToolForm
          dateLabel={dateLabel}
          pickup={pickup}
          onBack={() => setMode("menu")}
          onAdd={(toolId) =>
            addAndClose(
              pickup.pickup,
              t("addTask.toolMemo", { tool: t(`tools.${toolId}`) }),
              "tool",
            )
          }
        />
      )}

      {mode === "seed" && (
        <SeedForm
          plantDate={baseDate}
          dateLabel={dateLabel}
          onBack={() => setMode("menu")}
          onAdd={addSeed}
        />
      )}

      {mode === "machine" && (
        <MachineForm
          startDate={baseDate}
          dateLabel={dateLabel}
          onBack={() => setMode("menu")}
          onAdd={(date, outputId) =>
            addAndClose(
              date,
              t("addTask.machineMemo", {
                output: t(`machineOutputs.${outputId}`),
              }),
              "machine",
            )
          }
        />
      )}
    </Modal>
  );
}

function FormFooter({
  onBack,
  onAdd,
  addDisabled,
}: {
  onBack: () => void;
  onAdd: () => void;
  addDisabled?: boolean;
}) {
  const t = useTranslations();
  return (
    <div className="mt-4 flex items-center justify-between">
      <button
        onClick={onBack}
        className="rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-sm hover:bg-[var(--sv-bg)]"
      >
        ← {t("addTask.back")}
      </button>
      <button
        onClick={onAdd}
        disabled={addDisabled}
        className="rounded-lg bg-[var(--sv-accent)] px-4 py-1.5 text-sm font-semibold text-white disabled:opacity-40"
      >
        {t("addTask.add")}
      </button>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-xs font-semibold text-[var(--sv-ink-muted)]">
      {children}
    </label>
  );
}

function ToolForm({
  dateLabel,
  pickup,
  onBack,
  onAdd,
}: {
  dateLabel: (d: SDate) => string;
  pickup: ToolPickup;
  onBack: () => void;
  onAdd: (toolId: string) => void;
}) {
  const t = useTranslations();
  const [tool, setTool] = useState<string>(TOOLS[0]);
  const options = TOOLS.map((id) => ({
    value: id,
    label: t(`tools.${id}`),
    icon: `/icons/tools/${id}.png`,
  }));
  return (
    <div>
      <FieldLabel>{t("addTask.selectTool")}</FieldLabel>
      <Dropdown
        value={tool}
        options={options}
        onChange={setTool}
        ariaLabel={t("addTask.selectTool")}
      />
      <p className="mt-3 flex items-center gap-1.5 rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm">
        <TimeIcon />
        {t("addTask.pickupPreview", { date: dateLabel(pickup.pickup) })}
      </p>
      {pickup.closure && (
        <p className="mt-2 rounded-md bg-[#fbeaea] px-3 py-2 text-xs font-semibold text-[#b02a2a]">
          ⚠{" "}
          {t("blacksmith.pickupWarn", {
            ready: dateLabel(pickup.ready),
            reason: t(`blacksmith.${pickup.closure}`),
          })}
        </p>
      )}
      <FormFooter onBack={onBack} onAdd={() => onAdd(tool)} />
    </div>
  );
}

function SeedForm({
  plantDate,
  dateLabel,
  onBack,
  onAdd,
}: {
  plantDate: SDate;
  dateLabel: (d: SDate) => string;
  onBack: () => void;
  onAdd: (cropId: string, agri: boolean, fert: Fertilizer) => void;
}) {
  const t = useTranslations();
  const seasonCrops = CROPS.filter((c) => c.seasons.includes(plantDate.season));
  const [cropId, setCropId] = useState<string>(seasonCrops[0]?.id ?? "");
  const [agri, setAgri] = useState(false);
  const [fert, setFert] = useState<Fertilizer>("none");

  const crop = seasonCrops.find((c) => c.id === cropId);
  const harvest = crop ? computeHarvest(plantDate, crop, agri, fert) : null;

  if (seasonCrops.length === 0) {
    return (
      <div>
        <p className="text-sm text-[var(--sv-ink-muted)]">
          {t("addTask.noSeasonCrops")}
        </p>
        <FormFooter onBack={onBack} onAdd={() => {}} addDisabled />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <FieldLabel>{t("addTask.selectCrop")}</FieldLabel>
        <Dropdown
          value={cropId}
          options={seasonCrops.map((c) => ({
            value: c.id,
            label: t(`crops.${c.id}`),
            icon: `/icons/seeds/${c.id}.png`,
          }))}
          onChange={setCropId}
          ariaLabel={t("addTask.selectCrop")}
        />
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={agri}
          onChange={(e) => setAgri(e.target.checked)}
          className="size-4 accent-[var(--sv-accent)]"
        />
        {t("addTask.agriculturist")}
      </label>

      <div>
        <FieldLabel>{t("addTask.fertilizer")}</FieldLabel>
        <Dropdown
          value={fert}
          options={FERTILIZERS.map((f) => ({
            value: f,
            label: t(`fertilizer.${f}`),
            icon: f === "none" ? undefined : `/icons/fertilizer/${f}.png`,
          }))}
          onChange={(v) => setFert(v as Fertilizer)}
          ariaLabel={t("addTask.fertilizer")}
        />
      </div>

      {harvest && (
        <div className="rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm">
          <p className="flex items-center gap-1.5">
            <TimeIcon />
            {t("addTask.harvestPreview", { date: dateLabel(harvest.date) })}
          </p>
          {harvest.regrowDays && (
            <p className="text-xs text-[var(--sv-ink-muted)]">
              {t("addTask.regrowNote", { days: harvest.regrowDays })}
            </p>
          )}
          {harvest.willWilt && (
            <p className="text-xs font-semibold text-[#c0506b]">
              ⚠ {t("addTask.wiltWarning")}
            </p>
          )}
          <p className="flex items-center gap-1 text-xs text-[var(--sv-ink-muted)]">
            <PixelIcon src="/icons/reminders/watering.png" size={14} />
            {t("addTask.wateringNote")}
          </p>
        </div>
      )}

      <FormFooter
        onBack={onBack}
        onAdd={() => crop && onAdd(cropId, agri, fert)}
        addDisabled={!crop}
      />
    </div>
  );
}

function MachineForm({
  startDate,
  dateLabel,
  onBack,
  onAdd,
}: {
  startDate: SDate;
  dateLabel: (d: SDate) => string;
  onBack: () => void;
  onAdd: (date: SDate, outputId: string) => void;
}) {
  const t = useTranslations();
  const [machineId, setMachineId] = useState(MACHINES[0].id);
  const machine = MACHINES.find((m) => m.id === machineId) ?? MACHINES[0];
  const [outputId, setOutputId] = useState(machine.recipes[0].id);

  const recipe =
    machine.recipes.find((r) => r.id === outputId) ?? machine.recipes[0];
  const ready = addDays(startDate, recipe.days);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <FieldLabel>{t("addTask.selectMachine")}</FieldLabel>
        <Dropdown
          value={machineId}
          options={MACHINES.map((m) => ({
            value: m.id,
            label: t(`machines.${m.id}`),
            icon: `/icons/machines/${m.id}.png`,
          }))}
          onChange={(v) => {
            const m = MACHINES.find((x) => x.id === v) ?? MACHINES[0];
            setMachineId(m.id);
            setOutputId(m.recipes[0].id);
          }}
          ariaLabel={t("addTask.selectMachine")}
        />
      </div>

      <div>
        <FieldLabel>{t("addTask.selectOutput")}</FieldLabel>
        <Dropdown
          value={outputId}
          options={machine.recipes.map((r) => ({
            value: r.id,
            label: `${t(`machineOutputs.${r.id}`)} · ${t("addTask.days", { days: r.days })}`,
            icon: `/icons/machineOutputs/${r.id}.png`,
          }))}
          onChange={setOutputId}
          ariaLabel={t("addTask.selectOutput")}
        />
      </div>

      <p className="flex items-center gap-1.5 rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm">
        <TimeIcon />
        {t("addTask.readyPreview", { date: dateLabel(ready) })}
      </p>

      <FormFooter onBack={onBack} onAdd={() => onAdd(ready, outputId)} />
    </div>
  );
}
