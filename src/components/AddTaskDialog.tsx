"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { addDays, SEASONS, type SDate } from "@/lib/calendar";
import { CROPS } from "@/data/game-data";
import { MACHINES } from "@/data/machines";
import { computeHarvest, type Fertilizer } from "@/lib/growth";
import { toolPickup, type ToolPickup } from "@/lib/blacksmith";
import {
  BUILDINGS,
  BUILDING_CATEGORIES,
  type BuildingCategory,
  type BuildingDef,
} from "@/data/buildings";
import { planBuilding } from "@/lib/carpenter";
import { BUNDLES, bundleItemKey } from "@/data/bundles";
import type { MemoCategory } from "@/lib/todoOrder";
import type { Memo } from "@/types/schedule";
import { asset } from "@/lib/asset";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";
import TimeIcon from "@/components/TimeIcon";
import PixelIcon from "@/components/PixelIcon";

type Mode = "menu" | "tool" | "seed" | "machine" | "build";

// 메뉴 항목. tool/seed/machine/build는 하위 폼, misc(정동석·박물관)는 즉시 추가(단일 항목).
const MENU = ["tool", "seed", "machine", "build", "misc"] as const;

// 메뉴 항목 아이콘
const MENU_ICONS: Record<string, string> = {
  tool: "/icons/addTask/tool.png",
  seed: "/icons/addTask/seed.png",
  machine: "/icons/addTask/machine.png",
  build: "/icons/addTask/build.png",
  misc: "/icons/addTask/misc.png",
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
  const { addMemo, addMemos, bundleItemsDone, character } = useSchedule();
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
  // 농업 전문가(성장 속도) 여부는 캐릭터 정보를 활용한다.
  const addSeed = (
    cropId: string,
    fert: Fertilizer,
    eatFood: boolean,
    noWatering: boolean,
    replant: boolean,
  ) => {
    const crop = CROPS.find((c) => c.id === cropId);
    if (!crop) return;
    const h = computeHarvest(baseDate, crop, character.agriculturist, fert);
    const cropName = t(`crops.${cropId}`);
    const memos: Omit<Memo, "id" | "createdAt" | "done">[] = [
      {
        season: h.date.season,
        day: h.date.day,
        text: t("addTask.harvestMemo", { crop: cropName }),
        reminderDaysBefore: 0,
        category: "harvest",
        cropId,
      },
    ];

    // 물주기 유효일: 이 계절 안에서 수확에 도움이 되는 날만.
    // 단, 다음 계절에도 자라는 작물이면 계절 끝까지(다음 계절 수확을 위해).
    // noWatering(스프링클러 사용 등)이면 물주기 메모를 생성하지 않는다.
    const idx = SEASONS.indexOf(baseDate.season);
    const growsNext =
      baseDate.season !== "winter" &&
      idx < 3 &&
      crop.seasons.includes(SEASONS[idx + 1]);
    let lastWater: number;
    if (growsNext) {
      lastWater = 28;
    } else if (h.willWilt) {
      lastWater = 0; // 이 계절·다음 계절 모두 수확 불가 → 물주기 제외
    } else {
      let last = h.date.day; // 이 계절 마지막 수확일
      if (crop.regrowDays) while (last + crop.regrowDays <= 28) last += crop.regrowDays;
      lastWater = last - 1; // 마지막 수확 전날까지
    }
    if (!noWatering) {
      for (let d = baseDate.day; d <= Math.min(lastWater, 28); d++) {
        memos.push({
          season: baseDate.season,
          day: d,
          text: t("addTask.wateringMemo", { crop: cropName }),
          reminderDaysBefore: 0,
          category: "watering",
          cropId,
        });
      }
    }
    // 재수확 작물이 아니고 시즌 내 수확 가능하며 재파종을 선택했으면,
    // 수확일에 재파종용 씨앗 구매 메모 추가
    if (replant && !crop.regrowDays && !h.willWilt) {
      memos.push({
        season: h.date.season,
        day: h.date.day,
        text: t("addTask.buySeedMemo", { crop: cropName }),
        reminderDaysBefore: 0,
        category: "buySeed",
        cropId,
      });
    }
    // 수확일에 음식 먹기(품질 버프) — 선택 시 수확일에 메모 추가
    if (eatFood && !h.willWilt) {
      memos.push({
        season: h.date.season,
        day: h.date.day,
        text: t("addTask.eatFoodMemo", { crop: cropName }),
        reminderDaysBefore: 0,
        category: "eatFood",
        cropId,
      });
    }
    // 한 번의 심기로 파생된 메모를 같은 groupId로 묶는다(같은 작물 다른 날짜 구분용).
    const groupId = `${cropId}-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 6)}`;
    addMemos(memos.map((m) => ({ ...m, groupId })));
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
          {MENU.map((m) =>
            renderMenuItem(
              m,
              m === "misc"
                ? () => addAndClose(baseDate, t("addTask.miscMemo"), "misc")
                : () => setMode(m),
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
          agri={character.agriculturist}
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

      {mode === "build" && (
        <BuildForm
          requestDate={baseDate}
          dateLabel={dateLabel}
          onBack={() => setMode("menu")}
          onAdd={(date, text) => addAndClose(date, text, "build")}
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
  agri,
  onBack,
  onAdd,
}: {
  plantDate: SDate;
  dateLabel: (d: SDate) => string;
  agri: boolean; // 농업 전문가 여부(캐릭터 정보에서 전달)
  onBack: () => void;
  onAdd: (
    cropId: string,
    fert: Fertilizer,
    eatFood: boolean,
    noWatering: boolean,
    replant: boolean,
  ) => void;
}) {
  const t = useTranslations();
  // 효율 창과 동일하게 해당 계절에 심을 수 있는 모든 작물 표시
  const seasonCrops = CROPS.filter((c) => c.seasons.includes(plantDate.season));
  const [cropId, setCropId] = useState<string>(seasonCrops[0]?.id ?? "");
  const [fert, setFert] = useState<Fertilizer>("none");
  const [eatFood, setEatFood] = useState(false);
  const [noWatering, setNoWatering] = useState(false);
  const [replant, setReplant] = useState(true);

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
          {!noWatering && (
            <p className="flex items-center gap-1 text-xs text-[var(--sv-ink-muted)]">
              <PixelIcon src="/icons/reminders/watering.png" size={14} />
              {t("addTask.wateringNote")}
            </p>
          )}
        </div>
      )}

      {/* 물주기 메모 추가 안 함(스프링클러 사용 등) */}
      <label className="flex cursor-pointer items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={noWatering}
          onChange={(e) => setNoWatering(e.target.checked)}
          className="mt-0.5 size-4 accent-[var(--sv-accent)]"
        />
        <span>
          {t("addTask.noWateringOption")}
          <span className="block text-xs text-[var(--sv-ink-muted)]">
            {t("addTask.noWateringNote")}
          </span>
        </span>
      </label>

      {/* 수확일에 음식 먹기(품질 버프) 추가 여부 */}
      <label className="flex cursor-pointer items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={eatFood}
          onChange={(e) => setEatFood(e.target.checked)}
          className="mt-0.5 size-4 accent-[var(--sv-accent)]"
        />
        <span>
          {t("addTask.eatFoodOption")}
          <span className="block text-xs text-[var(--sv-ink-muted)]">
            {t("addTask.eatFoodNote")}
          </span>
        </span>
      </label>

      {/* 재파종(수확일 씨앗 구매) 메모 추가 여부 — 재수확/시들 작물은 해당 없음 */}
      {crop && !crop.regrowDays && harvest && !harvest.willWilt && (
        <label className="flex cursor-pointer items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={replant}
            onChange={(e) => setReplant(e.target.checked)}
            className="mt-0.5 size-4 accent-[var(--sv-accent)]"
          />
          <span>
            {t("addTask.replantOption")}
            <span className="block text-xs text-[var(--sv-ink-muted)]">
              {t("addTask.replantNote")}
            </span>
          </span>
        </label>
      )}

      <FormFooter
        onBack={onBack}
        onAdd={() => crop && onAdd(cropId, fert, eatFood, noWatering, replant)}
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

function BuildForm({
  requestDate,
  dateLabel,
  onBack,
  onAdd,
}: {
  requestDate: SDate;
  dateLabel: (d: SDate) => string;
  onBack: () => void;
  onAdd: (orderDate: SDate, text: string) => void;
}) {
  const t = useTranslations();
  const [category, setCategory] = useState<BuildingCategory>("animal");
  const inCategory = BUILDINGS.filter((b) => b.category === category);
  const [buildingId, setBuildingId] = useState<string>(inCategory[0]?.id ?? "");

  const def: BuildingDef | undefined =
    inCategory.find((b) => b.id === buildingId) ?? inCategory[0];
  const plan = def ? planBuilding(requestDate, def) : null;

  // 카테고리 변경 시 해당 카테고리 첫 건물로 선택 초기화
  const changeCategory = (c: BuildingCategory) => {
    setCategory(c);
    const first = BUILDINGS.find((b) => b.category === c);
    if (first) setBuildingId(first.id);
  };

  // 메모 텍스트: "{건물} 건설 (재료: 10,000g · 나무 450)" / 재료 없으면 골드만
  const buildMemoText = (b: BuildingDef): string => {
    const goldStr = `${b.gold.toLocaleString()}g`;
    const matStr = b.materials
      .map((m) => `${t(`materials.${m.id}`)} ${m.qty}`)
      .join(" · ");
    const cost = matStr ? `${goldStr} · ${matStr}` : goldStr;
    return t("addTask.buildMemo", { building: t(`buildings.${b.id}`), cost });
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <FieldLabel>{t("addTask.selectBuildCategory")}</FieldLabel>
        <Dropdown
          value={category}
          options={BUILDING_CATEGORIES.map((c) => ({
            value: c,
            label: t(`buildingCategory.${c}`),
          }))}
          onChange={(v) => changeCategory(v as BuildingCategory)}
          ariaLabel={t("addTask.selectBuildCategory")}
        />
      </div>

      <div>
        <FieldLabel>{t("addTask.selectBuilding")}</FieldLabel>
        <Dropdown
          value={buildingId}
          options={inCategory.map((b) => ({
            value: b.id,
            label: t(`buildings.${b.id}`),
            icon: `/icons/buildings/${b.id}.png`,
          }))}
          onChange={setBuildingId}
          ariaLabel={t("addTask.selectBuilding")}
        />
      </div>

      {def && plan && (
        <div className="rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm">
          {/* 비용·재료 */}
          <p className="font-semibold">
            {def.gold.toLocaleString()}g
          </p>
          {def.materials.length > 0 && (
            <ul className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
              {def.materials.map((m) => (
                <li key={m.id} className="flex items-center gap-1 text-sm">
                  <PixelIcon src={`/icons/materials/${m.id}.png`} size={16} />
                  {t(`materials.${m.id}`)} {m.qty}
                </li>
              ))}
            </ul>
          )}

          {/* 선행 건물 안내 */}
          {def.requires && (
            <p className="mt-1.5 text-xs text-[var(--sv-ink-muted)]">
              {t("addTask.buildRequires", {
                building: t(`buildings.${def.requires}`),
              })}
            </p>
          )}

          {/* 주문일 휴무 이동 안내 */}
          {plan.orderClosure && (
            <p className="mt-2 rounded-md bg-[#fbeaea] px-2 py-1.5 text-xs font-semibold text-[#b02a2a]">
              ⚠{" "}
              {t("addTask.buildClosureWarn", {
                reason: t(`carpenter.${plan.orderClosure}`),
                date: dateLabel(plan.order),
              })}
            </p>
          )}

          {/* 완성 예정일 */}
          <p className="mt-2 flex items-center gap-1.5">
            <TimeIcon />
            {def.buildDays === 0
              ? t("addTask.buildInstant")
              : t("addTask.buildReadyPreview", { date: dateLabel(plan.ready) })}
          </p>
        </div>
      )}

      <FormFooter
        onBack={onBack}
        onAdd={() => def && plan && onAdd(plan.order, buildMemoText(def))}
        addDisabled={!def}
      />
    </div>
  );
}
