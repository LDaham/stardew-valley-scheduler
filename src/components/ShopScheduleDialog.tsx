"use client";

import { Fragment, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import TitleToggle from "@/components/TitleToggle";
import Dropdown from "@/components/Dropdown";
import PixelIcon from "@/components/PixelIcon";
import {
  SHOP_SCHEDULE,
  WEEK_ORDER,
  resolveClosedDays,
  type ShopScheduleEntry,
} from "@/data/shopSchedule";

export interface Scenario {
  keyApplied: boolean;
  ccRestored: boolean;
  festivalOn: boolean;
  boatRepaired: boolean;
}

// 가게 한 곳의 현재 상태(요일 배지 또는 축제·영구폐점 배지) + 상세 행. 모바일·PC 공용.
export function ShopBody({
  entry,
  scenario,
}: {
  entry: ShopScheduleEntry;
  scenario: Scenario;
}) {
  const t = useTranslations();
  const { keyApplied, ccRestored, festivalOn, boatRepaired } = scenario;

  // 영업 시간: 열쇠 적용 시 열쇠 시간, 진저섬 배 수리 시 배 시간(생선 가게 8시), 그 외엔 개점 시간.
  let hoursField = "open";
  if (keyApplied && entry.keyChanges) hoursField = "key";
  if (boatRepaired && entry.boatChanges) hoursField = "boat";

  // 상태 배지 영역: 축제날(탭 가정) > 영구 폐점 > 평상시 요일 배지 순으로 표시.
  let statusArea;
  if (festivalOn) {
    if (entry.festivalClose === "none") {
      statusArea = <Badge tone="open">{t("shopSchedule.statusOpen")}</Badge>;
    } else if (entry.festivalClose === "some") {
      statusArea = (
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="partial">{t("shopSchedule.statusPartial")}</Badge>
          <span className="text-xs text-[var(--sv-ink-muted)]">
            {t(`shopSchedule.shops.${entry.id}.festival`)}
          </span>
        </div>
      );
    } else {
      statusArea = <Badge tone="closed">{t("shopSchedule.statusClosed")}</Badge>;
    }
  } else if (entry.closesAfterCC && ccRestored) {
    statusArea = (
      <Badge tone="closed">{t("shopSchedule.statusPermanent")}</Badge>
    );
  } else {
    const closed = new Set(resolveClosedDays(entry, ccRestored));
    statusArea = (
      <div className="flex flex-wrap gap-1">
        {WEEK_ORDER.map((d) => {
          const isClosed = closed.has(d);
          return (
            <span
              key={d}
              title={
                isClosed
                  ? t("shopSchedule.legendClosed")
                  : t("shopSchedule.legendOpen")
              }
              className={`flex size-6 items-center justify-center rounded-full text-xs font-bold ${
                isClosed
                  ? "bg-[var(--sv-danger)] text-white"
                  : "bg-[var(--sv-accent)] text-white"
              }`}
            >
              {t(`weekdays.${d}`)}
            </span>
          );
        })}
      </div>
    );
  }

  // 항상 표시: 영업 시간. 조건부: 정기 휴무(있을 때만)·메모.
  const rows: [labelKey: string, field: string][] = [["colOpen", hoursField]];
  if (entry.hasCheckup) rows.push(["colCheckup", "checkup"]);

  return (
    <div className="flex flex-col gap-2.5">
      {statusArea}
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        {rows.map(([labelKey, field]) => (
          <Fragment key={labelKey}>
            <dt className="font-semibold text-[var(--sv-ink-muted)]">
              {t(`shopSchedule.${labelKey}`)}
            </dt>
            <dd>{t(`shopSchedule.shops.${entry.id}.${field}`)}</dd>
          </Fragment>
        ))}
        {entry.hasNote && (
          <>
            <dt className="font-semibold text-[var(--sv-ink-muted)]">
              {t("shopSchedule.colNote")}
            </dt>
            <dd className="whitespace-pre-line text-[var(--sv-ink-muted)]">
              {t(`shopSchedule.shops.${entry.id}.note`)}
            </dd>
          </>
        )}
      </dl>
    </div>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: "open" | "closed" | "partial";
  children: ReactNode;
}) {
  const cls =
    tone === "open"
      ? "bg-[var(--sv-accent)] text-white"
      : tone === "partial"
        ? "bg-[var(--sv-warn)] text-[var(--sv-ink)]"
        : "bg-[var(--sv-danger)] text-white";
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${cls}`}
    >
      {children}
    </span>
  );
}

// 상단 시나리오 토글(작물 효율·생선 정보 탭처럼 작은 텍스트 칩).
function ScenarioToggle({
  label,
  active,
  onToggle,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={active}
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        active
          ? "bg-[var(--sv-accent)] text-white"
          : "border border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
      }`}
    >
      {label}
    </button>
  );
}

// 시나리오 필터(열쇠·복구·[축제]·배 수리). dialogFilters를 읽고 쓰므로
// 가게 일정 탭과 메인 박스가 같은 상태를 공유한다(한쪽에서 켜면 다른 쪽도 적용).
// 단, 축제 토글은 가게 일정 탭 전용(includeFestival)이며 메인 박스는 당일 날짜로 자동 판정한다.
// fragment를 반환하므로 감싸는 컨테이너(정렬)는 호출부가 제공한다.
export function ShopScenarioFilters({
  includeFestival = false,
}: {
  includeFestival?: boolean;
}) {
  const t = useTranslations();
  const { dialogFilters, setDialogFilters } = useSchedule();
  const s = dialogFilters;
  return (
    <>
      <ScenarioToggle
        label={t("shopSchedule.keyToggle")}
        active={s.shopKeyApplied}
        onToggle={() => setDialogFilters({ shopKeyApplied: !s.shopKeyApplied })}
      />
      <ScenarioToggle
        label={t("shopSchedule.ccToggle")}
        active={s.shopCcRestored}
        onToggle={() => setDialogFilters({ shopCcRestored: !s.shopCcRestored })}
      />
      {includeFestival && (
        <ScenarioToggle
          label={t("shopSchedule.festivalToggle")}
          active={s.shopFestivalOn}
          onToggle={() => setDialogFilters({ shopFestivalOn: !s.shopFestivalOn })}
        />
      )}
      <ScenarioToggle
        label={t("shopSchedule.boatToggle")}
        active={s.shopBoatRepaired}
        onToggle={() =>
          setDialogFilters({ shopBoatRepaired: !s.shopBoatRepaired })
        }
      />
    </>
  );
}

// 고정(핀) 토글 버튼. 활성 시 색으로 구분. 게임 핀 에셋이 없어 인라인 SVG 사용(이모지 아님).
export function PinButton({
  pinned,
  onToggle,
  label,
}: {
  pinned: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={pinned}
      aria-label={label}
      title={label}
      className={`shrink-0 ${
        pinned
          ? "text-[var(--sv-accent)]"
          : "text-[var(--sv-ink-muted)] opacity-50 hover:opacity-100"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z" />
      </svg>
    </button>
  );
}

export default function ShopScheduleDialog({
  onClose,
  onBack,
}: {
  onClose: () => void;
  onBack?: () => void;
}) {
  const t = useTranslations();
  const { dialogFilters, setDialogFilters, shopScheduleShown, setShopScheduleShown } =
    useSchedule();
  const [selected, setSelected] = useState(SHOP_SCHEDULE[0].id);
  // 시나리오 토글은 스토어(dialogFilters)에 저장 → 탭을 닫아도 유지된다.
  const scenario: Scenario = {
    keyApplied: dialogFilters.shopKeyApplied,
    ccRestored: dialogFilters.shopCcRestored,
    festivalOn: dialogFilters.shopFestivalOn,
    boatRepaired: dialogFilters.shopBoatRepaired,
  };
  const sel = SHOP_SCHEDULE.find((s) => s.id === selected) ?? SHOP_SCHEDULE[0];

  // 고정(핀): 스토어에 저장 → 탭을 닫아도 유지. 핀된 가게를 앞으로(각 그룹은 기존 순서 유지).
  const pinned = dialogFilters.shopPinned;
  const isPinned = (id: string) => pinned.includes(id);
  const togglePin = (id: string) =>
    setDialogFilters({
      shopPinned: isPinned(id)
        ? pinned.filter((x) => x !== id)
        : [...pinned, id],
    });
  const orderedShops = [
    ...SHOP_SCHEDULE.filter((s) => isPinned(s.id)),
    ...SHOP_SCHEDULE.filter((s) => !isPinned(s.id)),
  ];

  // PC 카드 한 장.
  const renderCard = (s: ShopScheduleEntry) => (
    <section
      key={s.id}
      className="rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] p-3"
    >
      <div className="mb-2 flex items-center gap-2">
        <PixelIcon src={`/icons/shops/${s.id}.png`} size={20} />
        <h3 className="flex-1 text-base font-bold">
          {t(`shopSchedule.shops.${s.id}.name`)}
        </h3>
        <PinButton
          pinned={isPinned(s.id)}
          onToggle={() => togglePin(s.id)}
          label={t("shopSchedule.pin")}
        />
      </div>
      <ShopBody entry={s} scenario={scenario} />
    </section>
  );

  // PC 2열 메이슨리: 우선순위 순으로 더 짧은 열에 배치(동률은 왼쪽).
  // 높이는 내용량(메모·정기 휴무 유무)으로 근사 → 박스는 자기 내용 높이만큼만.
  const cols: ShopScheduleEntry[][] = [[], []];
  const heights = [0, 0];
  for (const s of orderedShops) {
    const c = heights[0] <= heights[1] ? 0 : 1;
    cols[c].push(s);
    heights[c] += 2 + (s.hasCheckup ? 1 : 0) + (s.hasNote ? 2 : 0);
  }

  return (
    <Modal
      title={t("shopSchedule.title")}
      onClose={onClose}
      onBack={onBack}
      titleAfter={
        <TitleToggle
          checked={shopScheduleShown}
          onChange={setShopScheduleShown}
          label={t("settings.shopScheduleShow")}
        />
      }
    >
      {/* 시나리오 토글: 내 상황(열쇠·복구·축제·배 수리)에 맞춰 일정 표시를 전환(축제는 탭 전용) */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <ShopScenarioFilters includeFestival />
      </div>

      {/* 모바일: 가게 드롭다운 + 세로 카드 */}
      <div className="sm:hidden">
        <Dropdown
          value={selected}
          options={orderedShops.map((s) => ({
            value: s.id,
            label: t(`shopSchedule.shops.${s.id}.name`),
          }))}
          onChange={setSelected}
          ariaLabel={t("shopSchedule.selectShop")}
        />
        <div className="mt-3 rounded-md border border-[var(--sv-border)] p-3">
          <div className="mb-2 flex items-center gap-2">
            <PixelIcon src={`/icons/shops/${sel.id}.png`} size={20} />
            <h3 className="flex-1 text-base font-bold">
              {t(`shopSchedule.shops.${sel.id}.name`)}
            </h3>
            <PinButton
              pinned={isPinned(sel.id)}
              onToggle={() => togglePin(sel.id)}
              label={t("shopSchedule.pin")}
            />
          </div>
          <ShopBody entry={sel} scenario={scenario} />
        </div>
      </div>

      {/* PC: 2열 메이슨리(더 짧은 열에 배치, 박스는 내용 높이만큼만). 핀된 가게 우선 */}
      <div className="hidden gap-2 sm:flex sm:items-start">
        {cols.map((col, i) => (
          <div key={i} className="flex flex-1 flex-col gap-2">
            {col.map(renderCard)}
          </div>
        ))}
      </div>

      {/* 축제날 예외 안내(이 축제들엔 상점·집이 정상 영업) */}
      <p className="mt-3 border-t border-dashed border-[var(--sv-border)] pt-2 text-xs leading-relaxed text-[var(--sv-ink-muted)]">
        {t("shopSchedule.festivalExceptionNote")}
      </p>

      <p className="mt-2 text-[10px] text-[var(--sv-ink-muted)]">
        {t("shopSchedule.source")}
      </p>
    </Modal>
  );
}
