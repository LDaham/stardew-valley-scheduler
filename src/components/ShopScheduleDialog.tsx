"use client";

import { Fragment, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import Dropdown from "@/components/Dropdown";
import PixelIcon from "@/components/PixelIcon";
import {
  SHOP_SCHEDULE,
  WEEK_ORDER,
  resolveClosedDays,
  type ShopScheduleEntry,
} from "@/data/shopSchedule";

interface Scenario {
  keyApplied: boolean;
  ccRestored: boolean;
  festivalOn: boolean;
}

// 가게 한 곳의 현재 상태(요일 배지 또는 축제·영구폐점 배지) + 상세 행. 모바일·PC 공용.
function ShopBody({
  entry,
  scenario,
}: {
  entry: ShopScheduleEntry;
  scenario: Scenario;
}) {
  const t = useTranslations();
  const { keyApplied, ccRestored, festivalOn } = scenario;

  // 영업 시간: 열쇠 적용 + 열쇠로 시간이 달라지는 가게만 열쇠 시간, 그 외엔 개점 시간.
  const hoursField = keyApplied && entry.keyChanges ? "key" : "open";

  // 상태 배지 영역: 축제날 > 영구 폐점 > 평상시 요일 배지 순으로 표시.
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
            <dd className="text-[var(--sv-ink-muted)]">
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

// 상단 시나리오 토글 버튼.
function ScenarioToggle({
  icon,
  label,
  active,
  onToggle,
}: {
  icon: string;
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={active}
      className={`sv-btn flex items-center gap-1.5 px-2.5 py-1.5 text-sm ${
        active ? "ring-2 ring-[var(--sv-accent)]" : "opacity-70"
      }`}
    >
      <PixelIcon src={icon} size={16} />
      {label}
    </button>
  );
}

// 정보 툴팁(i). hover/focus 시 설명 표시. 게임 에셋이 없어 인라인 SVG 사용(이모지 아님).
function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <span
        tabIndex={0}
        role="img"
        aria-label={text}
        className="flex size-4 cursor-help items-center justify-center text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute right-0 top-full z-10 mt-1 w-60 rounded-md bg-[var(--sv-ink)] px-2 py-1.5 text-xs leading-relaxed text-[var(--sv-panel)] opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}

// 고정(핀) 토글 버튼. 활성 시 색으로 구분. 게임 핀 에셋이 없어 인라인 SVG 사용(이모지 아님).
function PinButton({
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
}: {
  onClose: () => void;
}) {
  const t = useTranslations();
  const { dialogFilters, setDialogFilters } = useSchedule();
  const [selected, setSelected] = useState(SHOP_SCHEDULE[0].id);
  // 시나리오 토글은 스토어(dialogFilters)에 저장 → 탭을 닫아도 유지된다.
  const scenario: Scenario = {
    keyApplied: dialogFilters.shopKeyApplied,
    ccRestored: dialogFilters.shopCcRestored,
    festivalOn: dialogFilters.shopFestivalOn,
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

  return (
    <Modal title={t("shopSchedule.title")} onClose={onClose}>
      {/* 시나리오 토글: 내 상황(열쇠·복구·축제)에 맞춰 일정 표시를 전환 */}
      <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
        <span className="flex items-center gap-1">
          <ScenarioToggle
            icon="/icons/ui/key.png"
            label={t("shopSchedule.keyToggle")}
            active={scenario.keyApplied}
            onToggle={() =>
              setDialogFilters({ shopKeyApplied: !scenario.keyApplied })
            }
          />
          <InfoTooltip text={t("shopSchedule.ruleKey")} />
        </span>
        <ScenarioToggle
          icon="/icons/ui/bundle.png"
          label={t("shopSchedule.ccToggle")}
          active={scenario.ccRestored}
          onToggle={() =>
            setDialogFilters({ shopCcRestored: !scenario.ccRestored })
          }
        />
        <span className="flex items-center gap-1">
          <ScenarioToggle
            icon="/icons/festival/flag.png"
            label={t("shopSchedule.festivalToggle")}
            active={scenario.festivalOn}
            onToggle={() =>
              setDialogFilters({ shopFestivalOn: !scenario.festivalOn })
            }
          />
          <InfoTooltip text={t("shopSchedule.ruleFestival")} />
        </span>
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

      {/* PC: 카드 그리드(2열). 핀된 가게 우선 표시 */}
      <div className="hidden gap-2 sm:grid sm:grid-cols-2">
        {orderedShops.map((s) => (
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
        ))}
      </div>

      <p className="mt-3 text-[10px] text-[var(--sv-ink-muted)]">
        {t("shopSchedule.source")}
      </p>
    </Modal>
  );
}
