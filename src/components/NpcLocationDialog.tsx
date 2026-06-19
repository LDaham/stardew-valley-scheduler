"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import Modal from "@/components/Modal";
import { useSchedule } from "@/components/ScheduleProvider";
import {
  NPC_SCHEDULE_IDS,
  pickVariant,
  getNpcSchedule,
} from "@/data/npcSchedule";
import {
  SEASONS,
  WEEKDAYS,
  getWeekday,
  type Season,
  type Weekday,
} from "@/lib/calendar";

// NPC 위치(일정). 목록에서 주민을 고르면 계절·요일·날씨 필터로 해당 일정표(시각→장소)를 본다.
export default function NpcLocationDialog({
  onClose,
  onBack,
}: {
  onClose: () => void;
  onBack?: () => void;
}) {
  const t = useTranslations();
  const { currentDate } = useSchedule();
  const [selected, setSelected] = useState<string | null>(null);

  // 목록(일정 데이터가 있는 주민): 이름순
  const npcs = [...NPC_SCHEDULE_IDS].sort((a, b) =>
    t(`villagers.${a}`).localeCompare(t(`villagers.${b}`)),
  );

  if (!selected) {
    return (
      <Modal title={t("info.npcLocation")} onClose={onClose} onBack={onBack}>
        <p className="mb-3 text-xs text-[var(--sv-ink-muted)]">
          {t("info.npcLocationHint")}
        </p>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {npcs.map((id) => (
            <li key={id}>
              <button
                onClick={() => setSelected(id)}
                className="flex w-full items-center gap-2 rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] px-2 py-2 text-left text-sm font-semibold hover:bg-[var(--sv-bg)]"
              >
                <Image
                  src={asset(`/icons/villagers/${id}.png`)}
                  alt=""
                  width={28}
                  height={28}
                  unoptimized
                  className="shrink-0"
                  style={{ imageRendering: "pixelated" }}
                />
                <span className="truncate">{t(`villagers.${id}`)}</span>
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    );
  }

  return (
    <NpcScheduleView
      id={selected}
      defaultSeason={currentDate.season}
      defaultDay={getWeekday(currentDate.day)}
      onClose={onClose}
      onBack={() => setSelected(null)}
    />
  );
}

function NpcScheduleView({
  id,
  defaultSeason,
  defaultDay,
  onClose,
  onBack,
}: {
  id: string;
  defaultSeason: Season;
  defaultDay: Weekday;
  onClose: () => void;
  onBack: () => void;
}) {
  const t = useTranslations();
  const [season, setSeason] = useState<Season>(defaultSeason);
  const [day, setDay] = useState<Weekday>(defaultDay);
  const [rainy, setRainy] = useState(false);

  // 비 전용 변형이 하나라도 있으면 날씨 토글 노출
  const hasRain = getNpcSchedule(id).some((v) => v.rain);
  const variant = pickVariant(id, season, day, rainy);

  const pill = (active: boolean) =>
    `rounded-full px-2.5 py-1 text-xs font-semibold ${
      active
        ? "bg-[var(--sv-accent)] text-white"
        : "border border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink)] hover:bg-[var(--sv-bg)]"
    }`;

  return (
    <Modal
      title={t(`villagers.${id}`)}
      onClose={onClose}
      onBack={onBack}
    >
      <div className="mb-3 flex items-center gap-2">
        <Image
          src={asset(`/icons/villagers/${id}.png`)}
          alt=""
          width={28}
          height={28}
          unoptimized
          className="shrink-0"
          style={{ imageRendering: "pixelated" }}
        />
        <h3 className="text-base font-bold">{t(`villagers.${id}`)}</h3>
      </div>

      {/* 필터: 계절 · 요일 · 날씨 */}
      <div className="mb-3 flex flex-col gap-2">
        <div className="flex flex-wrap gap-1.5">
          {SEASONS.map((s) => (
            <button key={s} onClick={() => setSeason(s)} className={pill(s === season)}>
              {t(`seasons.${s}`)}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {WEEKDAYS.map((d) => (
            <button key={d} onClick={() => setDay(d)} className={pill(d === day)}>
              {t(`weekdays.${d}`)}
            </button>
          ))}
        </div>
        {hasRain && (
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => setRainy(false)} className={pill(!rainy)}>
              {t("fish.weatherSun")}
            </button>
            <button onClick={() => setRainy(true)} className={pill(rainy)}>
              {t("fish.weatherRain")}
            </button>
          </div>
        )}
      </div>

      {/* 일정표: 시각 → 장소 */}
      {variant ? (
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
          {variant.rows.map((r, i) => (
            <div key={i} className="contents">
              <dt className="whitespace-nowrap font-semibold text-[var(--sv-ink-muted)]">
                {r.time}
              </dt>
              <dd>{r.place}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm text-[var(--sv-ink-muted)]">
          {t("info.npcNoSchedule")}
        </p>
      )}

      <p className="mt-3 text-[10px] text-[var(--sv-ink-muted)]">
        {t("info.npcSource")}
      </p>
    </Modal>
  );
}
