"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { addDays, SEASONS, toYearDay, type SDate } from "@/lib/calendar";
import { CROPS } from "@/data/game-data";
import { MACHINES, type MachineCategory } from "@/data/machines";
import { computeHarvest, type Fertilizer } from "@/lib/growth";
import { toolPickup, type ToolPickup } from "@/lib/blacksmith";
import {
  BUILDINGS,
  BUILDING_CATEGORIES,
  type BuildingCategory,
  type BuildingDef,
} from "@/data/buildings";
import { planBuilding } from "@/lib/carpenter";
import { FRUIT_TREES, FRUIT_TREE_MATURE_DAYS } from "@/data/fruitTrees";
import { BUNDLES, bundleItemKey } from "@/data/bundles";
import type { MemoCategory } from "@/lib/todoOrder";
import type { SeedDefaults } from "@/types/schedule";
import { asset } from "@/lib/asset";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";
import TimeIcon from "@/components/TimeIcon";
import PixelIcon from "@/components/PixelIcon";

type Mode =
  | "menu"
  | "tool"
  | "seed"
  | "fruit"
  | "artisanMachine"
  | "refiningMachine"
  | "build"
  | "options";

// 비온실 작물의 수확 마감(yearDay): 심은 계절부터 작물이 자라는 마지막 연속 계절의 28일.
// 이 날을 넘기면(미루기로 밀려서) 작물이 시들어 사라진다.
function cropDeadlineYearDay(
  plant: SDate,
  crop: (typeof CROPS)[number],
): number {
  let last = SEASONS.indexOf(plant.season);
  while (last + 1 < SEASONS.length && crop.seasons.includes(SEASONS[last + 1]))
    last++;
  return toYearDay({ season: SEASONS[last], day: 28 });
}

// 메뉴 항목. tool/seed/fruit/장비/build는 하위 폼, mining/fishing/pond/misc는 즉시 처리.
const MENU = [
  "tool",
  "seed",
  "fruit",
  "artisanMachine",
  "refiningMachine",
  "build",
  "mining",
  "fishing",
  "pond",
  "misc",
] as const;

// 메뉴 항목 아이콘(없는 것은 기존 도구·장비·건물 아이콘 재사용)
const MENU_ICONS: Record<string, string> = {
  tool: "/icons/addTask/tool.png",
  seed: "/icons/addTask/seed.png",
  fruit: "/icons/addTask/fruit.png",
  artisanMachine: "/icons/machines/keg.png",
  refiningMachine: "/icons/machines/furnace.png",
  build: "/icons/addTask/build.png",
  mining: "/icons/tools/pickaxe.png",
  fishing: "/icons/addTask/fishing.png",
  pond: "/icons/buildings/fishPond.png",
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
  const {
    addMemo,
    bundleItemsDone,
    character,
    seedDefaults,
    setSeedDefaults,
    hiddenItems,
    setHiddenItem,
    setReminderToggle,
  } = useSchedule();
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

  // 씨앗 심기: 당일 '씨앗 심기' 1건만 생성한다(순차 체인).
  // 완료하면 물주기 ×K → 수확 → (음식/재파종)이 차례로 생성되고,
  // 한 단계가 밀리면 하위 단계가 그만큼 늦게 생긴다(미루기·cascade).
  const addSeed = (
    cropId: string,
    fert: Fertilizer,
    eatFood: boolean,
    noWatering: boolean,
    replant: boolean,
    greenhouse: boolean,
  ) => {
    const crop = CROPS.find((c) => c.id === cropId);
    if (!crop) return;
    // 온실: 계절·시듦 무시. computeHarvest는 시듦 여부만 영향 → 온실이면 무시한다.
    const h = computeHarvest(baseDate, crop, character.agriculturist, fert);
    const willWilt = greenhouse ? false : h.willWilt;
    const cropName = t(`crops.${cropId}`);
    // 물주기 횟수 K = 보정된 성장 일수(심은 날부터 수확 전날까지 매일 1회).
    const K = h.growthDays;
    // 비온실 수확 마감: 작물이 자라는 마지막 연속 계절의 28일(넘기면 통째 소멸).
    const deadlineYearDay = greenhouse
      ? undefined
      : cropDeadlineYearDay(baseDate, crop);
    const groupId = `${cropId}-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 6)}`;
    addMemo({
      season: baseDate.season,
      day: baseDate.day,
      text: t("addTask.plantMemo", { crop: cropName }),
      reminderDaysBefore: 0,
      category: "plant",
      cropId,
      greenhouse,
      groupId,
      deadlineYearDay,
      chain: {
        kind: "crop",
        stage: "plant",
        cropId,
        remaining: K,
        noWatering,
        eatFood: eatFood && !willWilt,
        replant,
        waterText: t("addTask.wateringMemo", { crop: cropName }),
        harvestText: t("addTask.harvestMemo", { crop: cropName }),
        eatFoodText: t("addTask.eatFoodMemo", { crop: cropName }),
        buySeedText: t("addTask.buySeedMemo", { crop: cropName }),
      },
    });
    // 선택지를 기본값으로 저장(다음 심기에 재사용)
    setSeedDefaults({ fertilizer: fert, eatFood, noWatering, replant });
    onClose();
  };

  // 과일 묘목 심기: 당일에 '묘목 심기' 할 일을 추가하고,
  // 심기를 완료하면 수확 일정(성숙 후 3일마다)이 생성된다.
  const addFruitPlant = (treeId: string, greenhouse: boolean) => {
    const fruitName = t(`fruitTrees.${treeId}`);
    const groupId = `${treeId}-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 6)}`;
    addMemo({
      season: baseDate.season,
      day: baseDate.day,
      text: t("addTask.fruitPlantMemo", { fruit: fruitName }),
      reminderDaysBefore: 0,
      category: "fruit",
      cropId: treeId,
      greenhouse,
      groupId,
      chain: {
        kind: "fruitPlant",
        harvestText: t("addTask.fruitHarvestMemo", { fruit: fruitName }),
      },
    });
    onClose();
  };

  // 도구 업그레이드: 당일에 '업그레이드 맡기기'를 추가. 완료하면 수령 일정이 생성된다.
  const addToolUpgrade = (toolId: string) => {
    const toolName = t(`tools.${toolId}`);
    addMemo({
      season: baseDate.season,
      day: baseDate.day,
      text: t("addTask.toolUpgradeMemo", { tool: toolName }),
      reminderDaysBefore: 0,
      category: "tool",
      chain: { kind: "tool", pickupText: t("addTask.toolMemo", { tool: toolName }) },
    });
    onClose();
  };

  // 장비 사용: 당일에 '가동'을 추가. 완료하면 N일 뒤 수령이 생성되고,
  // 반복 제작이면 수령 완료 시 가동이 다시 생성된다.
  const addMachineUse = (
    machineId: string,
    outputId: string,
    days: number,
    repeat: boolean,
  ) => {
    const useText = t("addTask.machineUseMemo", {
      machine: t(`machines.${machineId}`),
      output: t(`machineOutputs.${outputId}`),
    });
    const receiveText = t("addTask.machineMemo", {
      output: t(`machineOutputs.${outputId}`),
    });
    addMemo({
      season: baseDate.season,
      day: baseDate.day,
      text: useText,
      reminderDaysBefore: 0,
      category: "machine",
      chain: { kind: "machine", role: "use", useText, receiveText, days, repeat },
    });
    onClose();
  };

  // 물고기 연못 확인: 매일 리마인더로 표시(메모 대신 토글 활성화)
  const enablePond = () => {
    setReminderToggle("pondCheck", true);
    onClose();
  };

  // 메뉴 항목 클릭 동작
  const menuAction = (m: string): (() => void) => {
    switch (m) {
      case "mining":
        return () => addAndClose(baseDate, t("addTask.miningMemo"), "mining");
      case "fishing":
        return () => addAndClose(baseDate, t("addTask.fishingMemo"), "fishing");
      case "pond":
        return enablePond;
      case "misc":
        return () => addAndClose(baseDate, t("addTask.miscMemo"), "misc");
      default:
        return () => setMode(m as Mode);
    }
  };

  // 메뉴 항목 렌더(아이콘 + 라벨 + 클릭 동작 공통). aside는 우측 보조 버튼.
  const renderMenuItem = (
    m: string,
    onClick: () => void,
    aside?: React.ReactNode,
  ) => (
    <li key={m}>
      <div className="flex items-center gap-2">
        <button
          onClick={onClick}
          className="flex flex-1 items-center gap-3 rounded-lg border border-[var(--sv-border)] px-3 py-3 text-left text-sm font-semibold hover:bg-[var(--sv-bg)]"
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
        {aside}
      </div>
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
        <>
          {/* 상세 옵션(보고 싶지 않은 항목 숨기기) */}
          <div className="mb-2 flex justify-end">
            <button
              onClick={() => setMode("options")}
              aria-label={t("addTask.options")}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--sv-border)] px-2.5 py-1 text-xs text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
            >
              <PixelIcon src="/icons/ui/settings.png" size={14} />
              {t("addTask.options")}
            </button>
          </div>
          <ul className="flex flex-col gap-2">
            {MENU.filter((m) => !hiddenItems[`menu:${m}`]).map((m) =>
              renderMenuItem(m, menuAction(m)),
            )}
          </ul>
        </>
      )}

      {mode === "options" && (
        <OptionsPanel
          hiddenItems={hiddenItems}
          setHiddenItem={setHiddenItem}
          onBack={() => setMode("menu")}
        />
      )}

      {mode === "fruit" && (
        <FruitForm
          plantDate={baseDate}
          hiddenItems={hiddenItems}
          onBack={() => setMode("menu")}
          onAdd={addFruitPlant}
        />
      )}
      {mode === "tool" && (
        <ToolForm
          dateLabel={dateLabel}
          pickup={pickup}
          onBack={() => setMode("menu")}
          onAdd={addToolUpgrade}
        />
      )}

      {mode === "seed" && (
        <SeedForm
          plantDate={baseDate}
          dateLabel={dateLabel}
          agri={character.agriculturist}
          defaults={seedDefaults}
          onBack={() => setMode("menu")}
          onAdd={addSeed}
        />
      )}

      {(mode === "artisanMachine" || mode === "refiningMachine") && (
        <MachineForm
          startDate={baseDate}
          dateLabel={dateLabel}
          fixedCategory={mode === "artisanMachine" ? "artisan" : "refining"}
          hiddenItems={hiddenItems}
          onBack={() => setMode("menu")}
          onAdd={addMachineUse}
        />
      )}

      {mode === "build" && (
        <BuildForm
          requestDate={baseDate}
          dateLabel={dateLabel}
          hiddenItems={hiddenItems}
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
  defaults,
  onBack,
  onAdd,
}: {
  plantDate: SDate;
  dateLabel: (d: SDate) => string;
  agri: boolean; // 농업 전문가 여부(캐릭터 정보에서 전달)
  defaults: SeedDefaults; // 지난번 선택지 기본값
  onBack: () => void;
  onAdd: (
    cropId: string,
    fert: Fertilizer,
    eatFood: boolean,
    noWatering: boolean,
    replant: boolean,
    greenhouse: boolean,
  ) => void;
}) {
  const t = useTranslations();
  const [greenhouse, setGreenhouse] = useState(false);
  // 온실은 모든 계절 작물, 비온실은 해당 계절 작물만 표시
  const seasonCrops = greenhouse
    ? CROPS
    : CROPS.filter((c) => c.seasons.includes(plantDate.season));
  const [cropId, setCropId] = useState<string>(seasonCrops[0]?.id ?? "");
  const [fert, setFert] = useState<Fertilizer>(defaults.fertilizer);
  const [eatFood, setEatFood] = useState(defaults.eatFood);
  const [noWatering, setNoWatering] = useState(defaults.noWatering);
  const [replant, setReplant] = useState(defaults.replant);

  const crop = seasonCrops.find((c) => c.id === cropId);
  const rawHarvest = crop ? computeHarvest(plantDate, crop, agri, fert) : null;
  // 온실에서는 시즌 종료로 시드는 일이 없다.
  const harvest = rawHarvest
    ? { ...rawHarvest, willWilt: greenhouse ? false : rawHarvest.willWilt }
    : null;

  // 온실 토글 시 현재 작물이 목록에 없으면 첫 작물로 초기화
  const toggleGreenhouse = (on: boolean) => {
    setGreenhouse(on);
    const list = on ? CROPS : CROPS.filter((c) => c.seasons.includes(plantDate.season));
    if (!list.some((c) => c.id === cropId)) setCropId(list[0]?.id ?? "");
  };

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
      {/* 온실: 모든 계절 작물 등장, 시듦/계절 제약 없음 */}
      <label className="flex cursor-pointer items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={greenhouse}
          onChange={(e) => toggleGreenhouse(e.target.checked)}
          className="mt-0.5 size-4 accent-[var(--sv-accent)]"
        />
        <span>
          {t("addTask.greenhouseOption")}
          <span className="block text-xs text-[var(--sv-ink-muted)]">
            {t("addTask.greenhouseNote")}
          </span>
        </span>
      </label>

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
        onAdd={() =>
          crop && onAdd(cropId, fert, eatFood, noWatering, replant, greenhouse)
        }
        addDisabled={!crop}
      />
    </div>
  );
}

function MachineForm({
  startDate,
  dateLabel,
  fixedCategory,
  hiddenItems,
  onBack,
  onAdd,
}: {
  startDate: SDate;
  dateLabel: (d: SDate) => string;
  fixedCategory: MachineCategory;
  hiddenItems: Record<string, boolean>;
  onBack: () => void;
  onAdd: (
    machineId: string,
    outputId: string,
    days: number,
    repeat: boolean,
  ) => void;
}) {
  const t = useTranslations();
  // 해당 카테고리에서 상세 옵션으로 숨기지 않은 장비만
  const inCategory = MACHINES.filter(
    (m) => m.category === fixedCategory && !hiddenItems[`machine:${m.id}`],
  );
  const [machineId, setMachineId] = useState(inCategory[0]?.id ?? "");
  const machine = inCategory.find((m) => m.id === machineId) ?? inCategory[0];
  const [outputId, setOutputId] = useState(machine?.recipes[0].id ?? "");
  // 해당 산출물 반복 제작: 수령 완료 시 '가동'을 자동으로 다시 추가
  const [repeat, setRepeat] = useState(false);

  // 산출물 라벨: 당일 완성(0일)이면 "당일 완성", 아니면 "N일"
  const daysLabel = (days: number) =>
    days === 0 ? t("addTask.sameDay") : t("addTask.days", { days });

  if (!machine) {
    return (
      <div>
        <p className="text-sm text-[var(--sv-ink-muted)]">
          {t("addTask.allHidden")}
        </p>
        <FormFooter onBack={onBack} onAdd={() => {}} addDisabled />
      </div>
    );
  }

  const recipe =
    machine.recipes.find((r) => r.id === outputId) ?? machine.recipes[0];
  const ready = addDays(startDate, recipe.days);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <FieldLabel>{t("addTask.selectMachine")}</FieldLabel>
        <Dropdown
          value={machineId}
          options={inCategory.map((m) => ({
            value: m.id,
            label: t(`machines.${m.id}`),
            icon: `/icons/machines/${m.id}.png`,
          }))}
          onChange={(v) => {
            const m = inCategory.find((x) => x.id === v) ?? inCategory[0];
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
            label: `${t(`machineOutputs.${r.id}`)} · ${daysLabel(r.days)}`,
            icon: `/icons/machineOutputs/${r.id}.png`,
          }))}
          onChange={setOutputId}
          ariaLabel={t("addTask.selectOutput")}
        />
      </div>

      {/* 오늘 가동 → N일 뒤 수령 예정 */}
      <p className="flex items-center gap-1.5 rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm">
        <TimeIcon />
        {recipe.days === 0
          ? t("addTask.machineUseToday")
          : t("addTask.machineUsePreview", { date: dateLabel(ready) })}
      </p>

      {/* 반복 제작 */}
      <label className="flex cursor-pointer items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={repeat}
          onChange={(e) => setRepeat(e.target.checked)}
          className="mt-0.5 size-4 accent-[var(--sv-accent)]"
        />
        <span>
          {t("addTask.repeatOption")}
          <span className="block text-xs text-[var(--sv-ink-muted)]">
            {t("addTask.repeatNote")}
          </span>
        </span>
      </label>

      <FormFooter
        onBack={onBack}
        onAdd={() => onAdd(machine.id, recipe.id, recipe.days, repeat)}
      />
    </div>
  );
}

function BuildForm({
  requestDate,
  dateLabel,
  hiddenItems,
  onBack,
  onAdd,
}: {
  requestDate: SDate;
  dateLabel: (d: SDate) => string;
  hiddenItems: Record<string, boolean>;
  onBack: () => void;
  onAdd: (orderDate: SDate, text: string) => void;
}) {
  const t = useTranslations();
  const [category, setCategory] = useState<BuildingCategory>("animal");
  // 상세 옵션으로 숨기지 않은 건물만
  const inCategory = BUILDINGS.filter(
    (b) => b.category === category && !hiddenItems[`building:${b.id}`],
  );
  const [buildingId, setBuildingId] = useState<string>(inCategory[0]?.id ?? "");

  const def: BuildingDef | undefined =
    inCategory.find((b) => b.id === buildingId) ?? inCategory[0];
  const plan = def ? planBuilding(requestDate, def) : null;

  // 카테고리 변경 시 해당 카테고리 첫(숨기지 않은) 건물로 선택 초기화
  const changeCategory = (c: BuildingCategory) => {
    setCategory(c);
    const first = BUILDINGS.find(
      (b) => b.category === c && !hiddenItems[`building:${b.id}`],
    );
    setBuildingId(first?.id ?? "");
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

function FruitForm({
  plantDate,
  hiddenItems,
  onBack,
  onAdd,
}: {
  plantDate: SDate;
  hiddenItems: Record<string, boolean>;
  onBack: () => void;
  onAdd: (treeId: string, greenhouse: boolean) => void;
}) {
  const t = useTranslations();
  const [greenhouse, setGreenhouse] = useState(false);
  // 상세 옵션으로 숨기지 않은 과일나무만
  const trees = FRUIT_TREES.filter((f) => !hiddenItems[`fruit:${f.id}`]);
  const [treeId, setTreeId] = useState<string>(trees[0]?.id ?? "");
  const tree = trees.find((f) => f.id === treeId) ?? trees[0];

  const dateLabel = (d: SDate) =>
    t("addTask.dateLabel", { season: t(`seasons.${d.season}`), day: d.day });
  const mature = addDays(plantDate, FRUIT_TREE_MATURE_DAYS);

  if (!tree) {
    return (
      <div>
        <p className="text-sm text-[var(--sv-ink-muted)]">
          {t("addTask.allHidden")}
        </p>
        <FormFooter onBack={onBack} onAdd={() => {}} addDisabled />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 온실: 연중 열매 */}
      <label className="flex cursor-pointer items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={greenhouse}
          onChange={(e) => setGreenhouse(e.target.checked)}
          className="mt-0.5 size-4 accent-[var(--sv-accent)]"
        />
        <span>
          {t("addTask.greenhouseOption")}
          <span className="block text-xs text-[var(--sv-ink-muted)]">
            {t("addTask.fruitGreenhouseNote")}
          </span>
        </span>
      </label>

      <div>
        <FieldLabel>{t("addTask.selectFruitTree")}</FieldLabel>
        <Dropdown
          value={treeId}
          options={trees.map((f) => ({
            value: f.id,
            label: `${t(`fruitTrees.${f.id}`)} · ${t(`seasons.${f.season}`)}`,
            icon: `/icons/fruitTrees/${f.id}.png`,
          }))}
          onChange={setTreeId}
          ariaLabel={t("addTask.selectFruitTree")}
        />
      </div>

      <div className="rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm">
        <p className="flex items-center gap-1.5">
          <TimeIcon />
          {t("addTask.fruitMatureNote", { date: dateLabel(mature) })}
        </p>
        <p className="text-xs text-[var(--sv-ink-muted)]">
          {greenhouse
            ? t("addTask.fruitHarvestGreenhouseHint")
            : t("addTask.fruitHarvestHint", {
                season: t(`seasons.${tree.season}`),
              })}
        </p>
      </div>

      <FormFooter onBack={onBack} onAdd={() => onAdd(treeId, greenhouse)} />
    </div>
  );
}

// 상세 옵션: 할 일 추가에서 보고 싶지 않은 항목 숨기기(체크=표시).
function OptionsPanel({
  hiddenItems,
  setHiddenItem,
  onBack,
}: {
  hiddenItems: Record<string, boolean>;
  setHiddenItem: (key: string, hidden: boolean) => void;
  onBack: () => void;
}) {
  const t = useTranslations();

  // 한 줄(체크=표시). 컴포넌트가 아니라 렌더 헬퍼로 정의(상태 보존).
  const renderRow = (itemKey: string, label: string, icon?: string) => {
    const hidden = !!hiddenItems[itemKey];
    return (
      <li key={itemKey}>
        <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-[var(--sv-bg)]">
          <input
            type="checkbox"
            checked={!hidden}
            onChange={(e) => setHiddenItem(itemKey, !e.target.checked)}
            className="size-4 shrink-0 accent-[var(--sv-accent)]"
          />
          {icon && <PixelIcon src={icon} size={16} />}
          <span
            className={hidden ? "text-[var(--sv-ink-muted)] line-through" : ""}
          >
            {label}
          </span>
        </label>
      </li>
    );
  };

  const renderSection = (title: string, rows: React.ReactNode) => (
    <div>
      <FieldLabel>{title}</FieldLabel>
      <ul className="flex flex-col gap-0.5">{rows}</ul>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-[var(--sv-ink-muted)]">
        {t("addTask.optionsHint")}
      </p>

      {renderSection(
        t("addTask.optionMenu"),
        MENU.map((m) => renderRow(`menu:${m}`, t(`addTask.${m}`), MENU_ICONS[m])),
      )}

      {renderSection(
        t("machineCategory.artisan"),
        MACHINES.filter((m) => m.category === "artisan").map((m) =>
          renderRow(`machine:${m.id}`, t(`machines.${m.id}`), `/icons/machines/${m.id}.png`),
        ),
      )}

      {renderSection(
        t("machineCategory.refining"),
        MACHINES.filter((m) => m.category === "refining").map((m) =>
          renderRow(`machine:${m.id}`, t(`machines.${m.id}`), `/icons/machines/${m.id}.png`),
        ),
      )}

      {renderSection(
        t("addTask.optionBuilding"),
        BUILDINGS.map((b) =>
          renderRow(`building:${b.id}`, t(`buildings.${b.id}`), `/icons/buildings/${b.id}.png`),
        ),
      )}

      {renderSection(
        t("addTask.optionFruit"),
        FRUIT_TREES.map((f) =>
          renderRow(`fruit:${f.id}`, t(`fruitTrees.${f.id}`), `/icons/fruitTrees/${f.id}.png`),
        ),
      )}

      <div className="mt-1 flex justify-start">
        <button
          onClick={onBack}
          className="rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-sm hover:bg-[var(--sv-bg)]"
        >
          ← {t("addTask.back")}
        </button>
      </div>
    </div>
  );
}
