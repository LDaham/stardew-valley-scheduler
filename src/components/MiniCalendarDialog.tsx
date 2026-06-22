"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  DAYS_PER_SEASON,
  SEASONS,
  WEEKDAYS,
  isSameDate,
  type SDate,
  type Season,
} from "@/lib/calendar";
import { filterEvents, getEventsOn } from "@/lib/events";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import EventIcon from "@/components/EventIcon";

const SEASON_COLOR: Record<Season, string> = {
  spring: "var(--season-spring)",
  summer: "var(--season-summer)",
  fall: "var(--season-fall)",
  winter: "var(--season-winter)",
};

// 꾹 누르면 한 칸씩 계속 이동(처음엔 느리게 → 점점 빠르게). 게임 핀처럼 인라인 SVG 아이콘 사용.
function RepeatButton({
  onStep,
  ariaLabel,
  muted = false,
  children,
}: {
  onStep: () => void;
  ariaLabel: string;
  muted?: boolean;
  children: React.ReactNode;
}) {
  const timer = useRef<number | undefined>(undefined);
  const delay = useRef(400);

  const stop = useCallback(() => {
    if (timer.current !== undefined) {
      window.clearTimeout(timer.current);
      timer.current = undefined;
    }
    delay.current = 400;
  }, []);

  const start = useCallback(() => {
    onStep(); // 첫 클릭은 즉시 1칸
    delay.current = 400; // 첫 반복은 느리게 시작 → 점점 빨라짐
    // 호이스팅되는 함수 선언으로 자기 자신을 재예약(가속).
    function run() {
      onStep();
      delay.current = Math.max(70, delay.current * 0.82);
      timer.current = window.setTimeout(run, delay.current);
    }
    timer.current = window.setTimeout(run, delay.current);
  }, [onStep]);

  useEffect(() => stop, [stop]); // 언마운트 시 타이머 정리

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onPointerDown={(e) => {
        e.preventDefault();
        start();
      }}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      className={`flex items-center justify-center rounded-lg border border-[var(--sv-border)] p-1.5 text-[var(--sv-ink)] hover:bg-[var(--sv-bg)] ${
        muted ? "opacity-40" : ""
      }`}
    >
      {children}
    </button>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

// 소형 달력. 날짜를 고르면 확인 후 그 날짜로 이동(= 해당 일자 todolist 표시).
export default function MiniCalendarDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const { currentDate, year, goToDate, eventFilters } = useSchedule();

  // 보고 있는 연·계절(현재 일자 강조). 연·계절을 한 상태로 묶어 화살표 이동을 안전하게 단계 처리.
  const [view, setView] = useState<{ year: number; season: Season }>({
    year,
    season: currentDate.season,
  });
  // 확인 대기 중인 목표 날짜
  const [pending, setPending] = useState<{ date: SDate; year: number } | null>(
    null,
  );

  const days = Array.from({ length: DAYS_PER_SEASON }, (_, i) => i + 1);

  const seasonLabel = (s: Season) => t(`seasons.${s}`);
  const dateLabel = (d: SDate, y: number) =>
    t("dashboard.dateFull", { year: y, season: seasonLabel(d.season), day: d.day });

  // 계절 단위 이동(겨울→다음 해 봄, 봄→이전 해 겨울). 1년째 봄 미만으로는 가지 않음.
  const step = useCallback((dir: 1 | -1) => {
    setView((v) => {
      const idx = (v.year - 1) * 4 + SEASONS.indexOf(v.season) + dir;
      if (idx < 0) return v; // 1년째 봄에서 더 이전 없음
      return { year: Math.floor(idx / 4) + 1, season: SEASONS[idx % 4] };
    });
  }, []);
  const stepPrev = useCallback(() => step(-1), [step]);
  const stepNext = useCallback(() => step(1), [step]);
  const atStart = view.year <= 1 && view.season === SEASONS[0];

  return (
    <Modal title={t("miniCalendar.title")} onClose={onClose}>
      {/* 연·계절 이동: 화살표를 꾹 누르면 한 칸씩 계속 이동(겨울→다음 해 봄). 가운데는 연도 표시. */}
      <div className="mb-3 flex items-center justify-center gap-3">
        <RepeatButton
          onStep={stepPrev}
          ariaLabel={t("miniCalendar.prev")}
          muted={atStart}
        >
          <Chevron dir="left" />
        </RepeatButton>
        <span className="min-w-20 text-center text-base font-bold">
          {t("miniCalendar.yearPrefix")}
          {view.year}
          {t("miniCalendar.yearSuffix")}
        </span>
        <RepeatButton onStep={stepNext} ariaLabel={t("miniCalendar.next")}>
          <Chevron dir="right" />
        </RepeatButton>
      </div>

      {/* 계절 탭 */}
      <div className="mb-3 flex gap-1.5">
        {SEASONS.map((s) => {
          const active = s === view.season;
          return (
            <button
              key={s}
              onClick={() => setView((v) => ({ ...v, season: s }))}
              className="flex-1 rounded-lg border px-2 py-1.5 text-xs font-semibold transition-colors"
              style={{
                borderColor: SEASON_COLOR[s],
                background: active ? SEASON_COLOR[s] : "transparent",
                color: active ? "#2b2016" : "var(--sv-ink-muted)",
              }}
            >
              {seasonLabel(s)}
            </button>
          );
        })}
      </div>

      {/* 요일 헤더(계절 1일=월요일이므로 7열이 월~일과 정렬됨) */}
      <div className="mb-1 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[11px] font-semibold text-[var(--sv-ink-muted)]"
          >
            {t(`weekdays.${d}`)}
          </div>
        ))}
      </div>

      {/* 28일 그리드: 날짜는 좌상단, 축제·생일·작물 마감·채집 이벤트는 아이콘으로 표시 */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const date: SDate = { season: view.season, day };
          const isToday = view.year === year && isSameDate(date, currentDate);
          // 정보 탭의 이벤트 필터 설정을 그대로 따른다(숨긴 타입은 표시 안 함).
          const events = filterEvents(getEventsOn(date), eventFilters);
          const shown = events.slice(0, 4);
          const extra = events.length - shown.length;
          return (
            <button
              key={day}
              onClick={() => setPending({ date, year: view.year })}
              className="flex aspect-square flex-col items-start gap-0.5 overflow-hidden rounded-lg border p-1 text-base font-bold transition-colors hover:bg-[var(--sv-bg)]"
              style={{
                borderColor: isToday ? "var(--sv-accent)" : "var(--sv-border)",
                borderWidth: isToday ? 2 : 1,
                background: isToday ? "var(--sv-bg)" : "var(--sv-panel)",
              }}
            >
              <span className="leading-none">{day}</span>
              {shown.length > 0 && (
                <span className="flex flex-wrap gap-0.5">
                  {shown.map((e) => (
                    <EventIcon key={`${e.type}-${e.refId}`} event={e} size={18} />
                  ))}
                  {extra > 0 && (
                    <span className="text-[11px] font-normal leading-none text-[var(--sv-ink-muted)]">
                      +{extra}
                    </span>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 이동 확인: 달력 모달 박스 내부 중앙에 겹쳐 표시(배경 클릭 시 취소) */}
      {pending && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/40 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPending(null);
          }}
          role="presentation"
        >
          <div
            className="w-full max-w-sm rounded-xl border border-[var(--sv-border)] bg-[var(--sv-panel)] p-5 shadow-xl"
            role="dialog"
            aria-modal="true"
          >
            <p className="mb-4 text-sm">
              {t("miniCalendar.confirmMove", {
                date: dateLabel(pending.date, pending.year),
              })}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setPending(null)}
                className="rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-sm hover:bg-[var(--sv-bg)]"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={() => {
                  goToDate(pending.date, pending.year);
                  onClose();
                }}
                className="rounded-lg bg-[var(--sv-accent)] px-4 py-1.5 text-sm font-semibold text-[var(--sv-accent-ink)]"
              >
                {t("common.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
