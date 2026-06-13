"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { addDays, type SDate } from "@/lib/calendar";
import { CROPS } from "@/data/game-data";
import { MACHINES } from "@/data/machines";
import { computeHarvest, type Fertilizer } from "@/lib/growth";
import type { MemoCategory } from "@/lib/todoOrder";
import { asset } from "@/lib/asset";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";

type Mode = "menu" | "tool" | "seed" | "machine";

// 메뉴 항목 아이콘: 도구 업그레이드=호미, 씨앗 심기=쌀 씨앗, 장인 장비=숙성용 나무통
const MENU_ICONS: Record<"tool" | "seed" | "machine", string> = {
  tool: "/icons/addTask/tool.png",
  seed: "/icons/addTask/seed.png",
  machine: "/icons/addTask/machine.png",
};

const TOOLS = ["axe", "pickaxe", "hoe", "wateringCan", "trashCan"] as const;
const FERTILIZERS: Fertilizer[] = ["none", "speedGro", "deluxe", "hyper"];
const TOOL_UPGRADE_DAYS = 2; // 클린트 대장간: 2일 후 수령

export default function AddTaskDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const { currentDate, addMemo } = useSchedule();
  const [mode, setMode] = useState<Mode>("menu");

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

  return (
    <Modal
      title={mode === "menu" ? t("addTask.title") : t(`addTask.${mode}`)}
      onClose={onClose}
    >
      {mode === "menu" && (
        <ul className="flex flex-col gap-2">
          {(["tool", "seed", "machine"] as const).map((m) => (
            <li key={m}>
              <button
                onClick={() => setMode(m)}
                className="flex w-full items-center gap-3 rounded-lg border border-[var(--sv-border)] px-3 py-3 text-left text-sm font-semibold hover:bg-[var(--sv-bg)]"
              >
                <Image
                  src={asset(MENU_ICONS[m])}
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
          ))}
        </ul>
      )}

      {mode === "tool" && (
        <ToolForm
          dateLabel={dateLabel}
          target={addDays(currentDate, TOOL_UPGRADE_DAYS)}
          onBack={() => setMode("menu")}
          onAdd={(toolId) =>
            addAndClose(
              addDays(currentDate, TOOL_UPGRADE_DAYS),
              t("addTask.toolMemo", { tool: t(`tools.${toolId}`) }),
              "tool",
            )
          }
        />
      )}

      {mode === "seed" && (
        <SeedForm
          plantDate={currentDate}
          dateLabel={dateLabel}
          onBack={() => setMode("menu")}
          onAdd={(date, cropId) =>
            addAndClose(
              date,
              t("addTask.harvestMemo", { crop: t(`crops.${cropId}`) }),
              "harvest",
            )
          }
        />
      )}

      {mode === "machine" && (
        <MachineForm
          startDate={currentDate}
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
  target,
  onBack,
  onAdd,
}: {
  dateLabel: (d: SDate) => string;
  target: SDate;
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
      <p className="mt-3 rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm">
        📅 {t("addTask.pickupPreview", { date: dateLabel(target) })}
      </p>
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
  onAdd: (date: SDate, cropId: string) => void;
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
          <p>🌾 {t("addTask.harvestPreview", { date: dateLabel(harvest.date) })}</p>
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
        </div>
      )}

      <FormFooter
        onBack={onBack}
        onAdd={() => harvest && onAdd(harvest.date, cropId)}
        addDisabled={!harvest}
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
        <Image
          src={asset("/icons/ui/time.png")}
          alt=""
          width={16}
          height={16}
          unoptimized
          className="shrink-0"
          style={{ imageRendering: "pixelated" }}
        />
        {t("addTask.readyPreview", { date: dateLabel(ready) })}
      </p>

      <FormFooter onBack={onBack} onAdd={() => onAdd(ready, outputId)} />
    </div>
  );
}
