"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { addDays, SEASONS, toYearDay, type SDate } from "@/lib/calendar";
import { CROPS } from "@/data/game-data";
import { MACHINES, type MachineCategory } from "@/data/machines";
import { computeHarvest, type Fertilizer } from "@/lib/growth";
import { FRUIT_TREES } from "@/data/fruitTrees";
import { ADD_TASK_CHILDREN, orderBy } from "@/lib/addTaskOrder";
import { seedSkipPlantMemos, matureFruitHarvestMemos } from "@/lib/chains";
import type { SeedDefaults } from "@/types/schedule";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";
import TimeIcon from "@/components/TimeIcon";
import PixelIcon from "@/components/PixelIcon";

// 카테고리 탭 식별자(상단 레이블). options는 별도 상세 설정 화면.
type Category = "seed" | "fruit" | "artisanMachine" | "refiningMachine";

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

// 메뉴 항목 아이콘(없는 것은 기존 도구·장비·건물 아이콘 재사용).
// 표시 순서·표시 여부는 사용자 설정(addTaskOrder/hiddenItems)을 따른다.
const MENU_ICONS: Record<string, string> = {
  seed: "/icons/addTask/seed.png",
  fruit: "/icons/addTask/fruit.png",
  artisanMachine: "/icons/machines/keg.png",
  refiningMachine: "/icons/machines/furnace.png",
};

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
    addMemos,
    year,
    character,
    seedDefaults,
    setSeedDefaults,
    hiddenItems,
    setHiddenItem,
    addTaskOrder,
    addTaskChildOrder,
    setAddTaskOrder,
    setAddTaskChildOrder,
  } = useSchedule();
  // 표시할 카테고리(상세 옵션에서 숨기지 않은 것, 사용자 순서)
  const visibleItems = addTaskOrder.filter(
    (m) => !hiddenItems[`menu:${m}`],
  ) as Category[];
  const [active, setActive] = useState<Category>(visibleItems[0] ?? "seed");
  // 상세 옵션(표시·순서) 화면 전환
  const [optionsOpen, setOptionsOpen] = useState(false);
  // 숨김 변경 등으로 현재 탭이 사라지면 첫 탭으로 보정
  const current = visibleItems.includes(active) ? active : visibleItems[0];

  const dateLabel = (d: SDate) =>
    t("addTask.dateLabel", { season: t(`seasons.${d.season}`), day: d.day });

  // 작물 재배: 단계별 토글(심기·물주기·수확·음식)에 따라 메모를 생성한다.
  // 심기 ON: 당일 '씨앗 심기' 1건 생성 → 완료 시 물주기 ×K → 수확 → (음식) cascade.
  // 심기 OFF: 이미 심은 것으로 보고 물주기/수확을 baseDate부터 직접 생성.
  const addSeed = (
    cropId: string,
    fert: Fertilizer,
    flags: { plant: boolean; watering: boolean; harvest: boolean; eatFood: boolean },
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
    const chain = {
      kind: "crop" as const,
      stage: "plant" as const,
      cropId,
      remaining: K,
      noWatering: !flags.watering,
      harvest: flags.harvest,
      eatFood: flags.eatFood && !willWilt,
      waterText: t("addTask.wateringMemo", { crop: cropName }),
      harvestText: t("addTask.harvestMemo", { crop: cropName }),
      eatFoodText: t("addTask.eatFoodMemo", { crop: cropName }),
    };
    if (flags.plant) {
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
        chain,
      });
    } else {
      // 이미 심음: 심기 완료가 만들 메모를 baseDate부터 직접 생성
      const ms = seedSkipPlantMemos({ greenhouse, groupId, deadlineYearDay }, chain, baseDate);
      if (ms.length) addMemos(ms);
    }
    // 선택지를 기본값으로 저장(다음 심기에 재사용)
    setSeedDefaults({
      fertilizer: fert,
      plant: flags.plant,
      watering: flags.watering,
      harvest: flags.harvest,
      eatFood: flags.eatFood,
    });
    onClose();
  };

  // 과일 수확: 이미 다 자란 나무로 보고 수확 일정(계절 동안 3일마다)을 baseDate부터 직접 생성.
  // 매년 반복이면 연도 이동 시 그 해 배치가 자동 보충된다(수확 메모의 repeatYearly로 탐지).
  const addFruitHarvest = (
    treeId: string,
    greenhouse: boolean,
    repeatYearly: boolean,
  ) => {
    const fruitName = t(`fruitTrees.${treeId}`);
    const groupId = `${treeId}-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 6)}`;
    const ms = matureFruitHarvestMemos(
      {
        treeId,
        greenhouse,
        repeatYearly,
        groupId,
        harvestText: t("addTask.fruitHarvestMemo", { fruit: fruitName }),
      },
      baseDate,
      year,
    );
    if (ms.length) addMemos(ms);
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
      machineId,
      chain: { kind: "machine", role: "use", useText, receiveText, days, repeat },
    });
    onClose();
  };

  return (
    <Modal
      title={
        optionsOpen
          ? t("addTask.options")
          : t("addTask.titleWithDay", { day: dayLabel })
      }
      onClose={onClose}
      // 상세 옵션 화면에서는 좌상단 '‹'로 탭 목록 복귀
      onBack={optionsOpen ? () => setOptionsOpen(false) : undefined}
    >
      {optionsOpen ? (
        <OptionsPanel
          hiddenItems={hiddenItems}
          setHiddenItem={setHiddenItem}
          order={addTaskOrder}
          setOrder={setAddTaskOrder}
          childOrder={addTaskChildOrder}
          setChildOrder={setAddTaskChildOrder}
        />
      ) : (
        <>
          {/* 상단 카테고리 탭(밑줄형 — 필터 칩과 구분) + 우측 상세 옵션 버튼(액션) */}
          <div className="mb-3 flex flex-wrap items-center gap-1 border-b border-[var(--sv-border)]">
            {visibleItems.map((m) => {
              const isActive = m === current;
              return (
                <button
                  key={m}
                  onClick={() => setActive(m)}
                  aria-pressed={isActive}
                  className={`-mb-px flex items-center gap-1.5 border-b-2 px-3 py-1.5 text-base font-semibold transition-transform ${
                    isActive
                      ? "-translate-y-0.5 border-[var(--sv-accent)] text-[var(--sv-ink)]"
                      : "border-transparent text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
                  }`}
                >
                  <PixelIcon src={MENU_ICONS[m]} size={16} />
                  {t(`addTask.${m}`)}
                </button>
              );
            })}
            <button
              onClick={() => setOptionsOpen(true)}
              aria-label={t("addTask.options")}
              className="mb-1 ml-auto flex items-center gap-1.5 rounded-md border border-[var(--sv-border)] px-2.5 py-1 text-xs text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
            >
              <PixelIcon src="/icons/ui/settings.png" size={14} />
              {t("addTask.options")}
            </button>
          </div>

          {/* 선택된 카테고리 패널 */}
          {current === "seed" && (
            <SeedForm
              plantDate={baseDate}
              dateLabel={dateLabel}
              agri={character.agriculturist}
              defaults={seedDefaults}
              onAdd={addSeed}
            />
          )}
          {current === "fruit" && (
            <FruitForm
              baseDate={baseDate}
              hiddenItems={hiddenItems}
              childOrder={addTaskChildOrder.fruit ?? []}
              onAdd={addFruitHarvest}
            />
          )}
          {(current === "artisanMachine" ||
            current === "refiningMachine") && (
            // 두 장비 탭이 같은 MachineForm을 공유 → key로 카테고리별 재마운트
            // (내부 machineId가 다른 카테고리 값으로 남아 드롭다운이 비어 보이는 현상 방지)
            <MachineForm
              key={current}
              startDate={baseDate}
              dateLabel={dateLabel}
              fixedCategory={current === "artisanMachine" ? "artisan" : "refining"}
              hiddenItems={hiddenItems}
              childOrder={addTaskChildOrder[current] ?? []}
              onAdd={addMachineUse}
            />
          )}
        </>
      )}
    </Modal>
  );
}

function FormFooter({
  onAdd,
  addDisabled,
}: {
  onAdd: () => void;
  addDisabled?: boolean;
}) {
  const t = useTranslations();
  return (
    <div className="mt-4 flex justify-end">
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

// 작물 재배 단계 토글 1줄(체크박스 + 이미지 + 라벨/설명)
function StageCheckbox({
  on,
  onChange,
  icon,
  label,
  note,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  icon: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <input
        type="checkbox"
        checked={on}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 shrink-0 accent-[var(--sv-accent)]"
      />
      <PixelIcon src={icon} size={18} />
      <span>
        {label}
        {note && (
          <span className="block text-xs text-[var(--sv-ink-muted)]">{note}</span>
        )}
      </span>
    </div>
  );
}

function SeedForm({
  plantDate,
  dateLabel,
  agri,
  defaults,
  onAdd,
}: {
  plantDate: SDate;
  dateLabel: (d: SDate) => string;
  agri: boolean; // 농업 전문가 여부(캐릭터 정보에서 전달)
  defaults: SeedDefaults; // 지난번 선택지 기본값
  onAdd: (
    cropId: string,
    fert: Fertilizer,
    flags: { plant: boolean; watering: boolean; harvest: boolean; eatFood: boolean },
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
  // 단계별 생성 토글(심기·물주기·수확·음식)
  const [plant, setPlant] = useState(defaults.plant);
  const [water, setWater] = useState(defaults.watering);
  const [harvestOn, setHarvestOn] = useState(defaults.harvest);
  const [eatFood, setEatFood] = useState(defaults.eatFood);

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
        <FormFooter onAdd={() => {}} addDisabled />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 온실: 모든 계절 작물 등장, 시듦/계절 제약 없음 */}
      <div className="flex items-start gap-2 text-sm">
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
      </div>

      {/* 작물 선택·비료: 내용 너비 드롭다운을 한 행에 배치(좁으면 자동 줄바꿈) */}
      <div className="flex flex-wrap items-start gap-3">
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
          {water && (
            <p className="flex items-center gap-1 text-xs text-[var(--sv-ink-muted)]">
              <PixelIcon src="/icons/reminders/watering.png" size={14} />
              {t("addTask.wateringNote")}
            </p>
          )}
        </div>
      )}

      {/* 단계별 생성 토글: 심기·물주기·수확하기·음식 먹기(각 이미지 포함) */}
      <div className="flex flex-col gap-2">
        <StageCheckbox
          on={plant}
          onChange={setPlant}
          icon="/icons/seeds/parsnip.png"
          label={t("addTask.stagePlant")}
          note={t("addTask.stagePlantNote")}
        />
        <StageCheckbox
          on={water}
          onChange={setWater}
          icon="/icons/reminders/watering.png"
          label={t("addTask.stageWater")}
          note={t("addTask.stageWaterNote")}
        />
        <StageCheckbox
          on={harvestOn}
          onChange={setHarvestOn}
          icon="/icons/bundleItems/parsnip.png"
          label={t("addTask.stageHarvest")}
          note={t("addTask.stageHarvestNote")}
        />
        <StageCheckbox
          on={eatFood}
          onChange={setEatFood}
          icon="/icons/ui/food.png"
          label={t("addTask.stageEatFood")}
          note={t("addTask.stageEatFoodNote")}
        />
      </div>

      <FormFooter
        onAdd={() =>
          crop &&
          onAdd(
            cropId,
            fert,
            { plant, watering: water, harvest: harvestOn, eatFood },
            greenhouse,
          )
        }
        // 아무 단계도 생성하지 않으면(심기·물주기·수확 모두 끔) 추가 비활성
        addDisabled={!crop || (!plant && !water && !harvestOn)}
      />
    </div>
  );
}

function MachineForm({
  startDate,
  dateLabel,
  fixedCategory,
  hiddenItems,
  childOrder,
  onAdd,
}: {
  startDate: SDate;
  dateLabel: (d: SDate) => string;
  fixedCategory: MachineCategory;
  hiddenItems: Record<string, boolean>;
  childOrder: string[];
  onAdd: (
    machineId: string,
    outputId: string,
    days: number,
    repeat: boolean,
  ) => void;
}) {
  const t = useTranslations();
  // 해당 카테고리에서 상세 옵션으로 숨기지 않은 장비만(사용자 순서 적용)
  const inCategory = orderBy(
    MACHINES.filter(
      (m) => m.category === fixedCategory && !hiddenItems[`machine:${m.id}`],
    ),
    (m) => m.id,
    childOrder,
  );
  const [machineId, setMachineId] = useState(inCategory[0]?.id ?? "");
  const machine = inCategory.find((m) => m.id === machineId) ?? inCategory[0];
  // 산출물은 적게 걸리는 것부터(소요일 오름차순) 표시한다.
  const sortedRecipes = machine
    ? [...machine.recipes].sort((a, b) => a.days - b.days)
    : [];
  const [outputId, setOutputId] = useState(sortedRecipes[0]?.id ?? "");
  // 해당 산출물 반복 제작: 수령 완료 시 '가동'을 자동으로 다시 추가.
  // 장인 장비(술통·절임통 등)는 기본 활성화, 정제 장비는 기본 비활성화.
  const [repeat, setRepeat] = useState(fixedCategory === "artisan");

  // 산출물 라벨: 당일 완성(0일)이면 "당일 완성", 아니면 "N일"
  const daysLabel = (days: number) =>
    days === 0 ? t("addTask.sameDay") : t("addTask.days", { days });

  if (!machine) {
    return (
      <div>
        <p className="text-sm text-[var(--sv-ink-muted)]">
          {t("addTask.allHidden")}
        </p>
        <FormFooter onAdd={() => {}} addDisabled />
      </div>
    );
  }

  const recipe =
    sortedRecipes.find((r) => r.id === outputId) ?? sortedRecipes[0];
  const ready = addDays(startDate, recipe.days);

  return (
    <div className="flex flex-col gap-3">
      {/* 장비 선택·산출물: 내용 너비 드롭다운을 한 행에 배치(좁으면 자동 줄바꿈) */}
      <div className="flex flex-wrap items-start gap-3">
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
              setOutputId(
                [...m.recipes].sort((a, b) => a.days - b.days)[0].id,
              );
            }}
            ariaLabel={t("addTask.selectMachine")}
          />
        </div>

        <div>
          <FieldLabel>{t("addTask.selectOutput")}</FieldLabel>
          <Dropdown
            value={outputId}
            options={sortedRecipes.map((r) => ({
              value: r.id,
              label: `${t(`machineOutputs.${r.id}`)} · ${daysLabel(r.days)}`,
              icon: `/icons/machineOutputs/${r.id}.png`,
            }))}
            onChange={setOutputId}
            ariaLabel={t("addTask.selectOutput")}
          />
        </div>
      </div>

      {/* 오늘 가동 → N일 뒤 수령 예정 */}
      <p className="flex items-center gap-1.5 rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm">
        <TimeIcon />
        {recipe.days === 0
          ? t("addTask.machineUseToday")
          : t("addTask.machineUsePreview", { date: dateLabel(ready) })}
      </p>

      {/* 반복 제작 */}
      <div className="flex items-start gap-2 text-sm">
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
      </div>

      <FormFooter
        onAdd={() => onAdd(machine.id, recipe.id, recipe.days, repeat)}
      />
    </div>
  );
}

function FruitForm({
  baseDate,
  hiddenItems,
  childOrder,
  onAdd,
}: {
  baseDate: SDate;
  hiddenItems: Record<string, boolean>;
  childOrder: string[];
  onAdd: (treeId: string, greenhouse: boolean, repeatYearly: boolean) => void;
}) {
  const t = useTranslations();
  const [greenhouse, setGreenhouse] = useState(false);
  // 매년 해당 계절에 수확 알림 반복(기본 켜짐). 연도 이동 시 그 해 배치가 보충된다.
  const [repeatYearly, setRepeatYearly] = useState(true);
  // 상세 옵션으로 숨기지 않은 과일나무만(사용자 순서 적용)
  const trees = orderBy(
    FRUIT_TREES.filter((f) => !hiddenItems[`fruit:${f.id}`]),
    (f) => f.id,
    childOrder,
  );
  const [treeId, setTreeId] = useState<string>(trees[0]?.id ?? "");
  const tree = trees.find((f) => f.id === treeId) ?? trees[0];

  if (!tree) {
    return (
      <div>
        <p className="text-sm text-[var(--sv-ink-muted)]">
          {t("addTask.allHidden")}
        </p>
        <FormFooter onAdd={() => {}} addDisabled />
      </div>
    );
  }

  // 비온실 나무가 baseDate 계절에 열매를 맺지 않으면 다음 결실 계절을 안내
  const fruitsThisSeason = greenhouse || tree.season === baseDate.season;

  return (
    <div className="flex flex-col gap-3">
      {/* 이미 다 자란 나무 기준 안내 */}
      <p className="text-xs text-[var(--sv-ink-muted)]">
        {t("addTask.fruitHarvestIntro")}
      </p>

      {/* 온실: 연중 열매 */}
      <div className="flex items-start gap-2 text-sm">
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
      </div>

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
          {greenhouse
            ? t("addTask.fruitHarvestGreenhouseHint")
            : t("addTask.fruitHarvestHint", {
                season: t(`seasons.${tree.season}`),
              })}
        </p>
        {!fruitsThisSeason && (
          <p className="text-xs text-[var(--sv-ink-muted)]">
            {t("addTask.fruitNextSeasonNote", {
              season: t(`seasons.${tree.season}`),
            })}
          </p>
        )}
      </div>

      {/* 매년 수확 알림 반복 */}
      <div className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={repeatYearly}
          onChange={(e) => setRepeatYearly(e.target.checked)}
          className="mt-0.5 size-4 accent-[var(--sv-accent)]"
        />
        <span>
          {t("addTask.fruitRepeatYearly")}
          <span className="block text-xs text-[var(--sv-ink-muted)]">
            {t("addTask.fruitRepeatYearlyNote")}
          </span>
        </span>
      </div>

      <FormFooter
        onAdd={() => onAdd(treeId, greenhouse, repeatYearly)}
      />
    </div>
  );
}

// 상세 옵션: 트리(상위→하위) + 체크(표시 여부) + ⠿ 드래그(순서 변경, 할 일 추가 표시 순서).
function OptionsPanel({
  hiddenItems,
  setHiddenItem,
  order,
  setOrder,
  childOrder,
  setChildOrder,
}: {
  hiddenItems: Record<string, boolean>;
  setHiddenItem: (key: string, hidden: boolean) => void;
  order: string[];
  setOrder: (order: string[]) => void;
  childOrder: Record<string, string[]>;
  setChildOrder: (parent: string, order: string[]) => void;
}) {
  const t = useTranslations();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  // 드래그 상태: parent=null이면 상위, 그 외엔 해당 그룹 내부.
  const [drag, setDrag] = useState<{ parent: string | null; from: number } | null>(
    null,
  );
  const [over, setOver] = useState<number | null>(null);
  const resetDrag = () => {
    setDrag(null);
    setOver(null);
  };

  const toggleExpand = (key: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const childList = (parent: string) =>
    childOrder[parent] ?? ADD_TASK_CHILDREN[parent]?.defaultIds ?? [];

  const move = (arr: string[], from: number, to: number) => {
    const next = [...arr];
    const [m] = next.splice(from, 1);
    next.splice(to, 0, m);
    return next;
  };

  const drop = (parent: string | null, to: number) => {
    if (!drag || drag.parent !== parent || drag.from === to) {
      resetDrag();
      return;
    }
    if (parent === null) setOrder(move(order, drag.from, to));
    else setChildOrder(parent, move(childList(parent), drag.from, to));
    resetDrag();
  };

  // 같은 레벨에서 포인터 아래의 인덱스
  const indexFromPoint = (
    parent: string | null,
    x: number,
    y: number,
  ): number | null => {
    const sel =
      parent === null
        ? "[data-top-index]"
        : `[data-child-index][data-child-parent="${parent}"]`;
    const el = document.elementFromPoint(x, y);
    const li = el?.closest(sel) as HTMLElement | null;
    if (!li) return null;
    const idx = Number(
      parent === null ? li.dataset.topIndex : li.dataset.childIndex,
    );
    return Number.isNaN(idx) ? null : idx;
  };

  // 드래그 핸들(컴포넌트가 아닌 렌더 헬퍼).
  const renderHandle = (parent: string | null, i: number) => (
    <span
      aria-hidden
      title={t("settings.reorder")}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => {
        e.preventDefault();
        setDrag({ parent, from: i });
        setOver(i);
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag || drag.parent !== parent) return;
        const idx = indexFromPoint(parent, e.clientX, e.clientY);
        if (idx !== null) setOver(idx);
      }}
      onPointerUp={(e) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        if (over !== null) drop(parent, over);
        else resetDrag();
      }}
      onPointerCancel={resetDrag}
      className="shrink-0 cursor-grab touch-none select-none px-1 text-[var(--sv-ink-muted)]"
    >
      ⠿
    </span>
  );

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-[var(--sv-ink-muted)]">
        {t("addTask.optionsTreeHint")}
      </p>
      <ul className="flex flex-col gap-1">
        {order.map((key, i) => {
          const group = ADD_TASK_CHILDREN[key];
          const open = expanded.has(key);
          const hidden = !!hiddenItems[`menu:${key}`];
          const isOver = over === i && drag?.parent === null && drag.from !== i;
          const isDragging = drag?.parent === null && drag.from === i;
          return (
            <li
              key={key}
              data-top-index={i}
              className={`rounded-md border-t-2 ${
                isOver ? "border-[var(--sv-accent)]" : "border-transparent"
              } ${isDragging ? "opacity-40" : ""}`}
            >
              <div
                className={`flex items-center gap-1.5 px-1 py-1.5 hover:bg-[var(--sv-bg)] ${
                  group ? "cursor-pointer" : ""
                }`}
                onClick={group ? () => toggleExpand(key) : undefined}
              >
                <input
                  type="checkbox"
                  checked={!hidden}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setHiddenItem(`menu:${key}`, !e.target.checked)}
                  className="size-4 shrink-0 accent-[var(--sv-accent)]"
                />
                <PixelIcon src={MENU_ICONS[key]} size={18} />
                <span
                  className={`text-sm font-semibold ${
                    hidden ? "text-[var(--sv-ink-muted)] line-through" : ""
                  }`}
                >
                  {t(`addTask.${key}`)}
                </span>
                <span className="ml-auto flex shrink-0 items-center gap-1">
                  {group && (
                    <span
                      aria-label={open ? t("addTask.collapse") : t("addTask.expand")}
                      className="text-xs text-[var(--sv-ink-muted)]"
                    >
                      {open ? "▲" : "▼"}
                    </span>
                  )}
                  {renderHandle(null, i)}
                </span>
              </div>

              {group && open && (
                <ul className="ml-7 flex flex-col gap-0.5 border-l border-dashed border-[var(--sv-border)] pl-2">
                  {childList(key).map((id, ci) => {
                    const ck = `${group.hiddenPrefix}:${id}`;
                    const chidden = !!hiddenItems[ck];
                    const cOver =
                      over === ci && drag?.parent === key && drag.from !== ci;
                    const cDragging = drag?.parent === key && drag.from === ci;
                    return (
                      <li
                        key={id}
                        data-child-index={ci}
                        data-child-parent={key}
                        className={`flex items-center gap-1.5 rounded-md border-t-2 px-1 py-1 hover:bg-[var(--sv-bg)] ${
                          cOver ? "border-[var(--sv-accent)]" : "border-transparent"
                        } ${cDragging ? "opacity-40" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={!chidden}
                          onChange={(e) => setHiddenItem(ck, !e.target.checked)}
                          className="size-4 shrink-0 accent-[var(--sv-accent)]"
                        />
                        <PixelIcon src={group.icon(id)} size={16} />
                        <span
                          className={`text-sm ${
                            chidden ? "text-[var(--sv-ink-muted)] line-through" : ""
                          }`}
                        >
                          {t(group.labelKey(id))}
                        </span>
                        <span className="ml-auto shrink-0">
                          {renderHandle(key, ci)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
