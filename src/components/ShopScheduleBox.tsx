"use client";

import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import { toYearDay } from "@/lib/calendar";
import PixelIcon from "@/components/PixelIcon";
import { PinButton, ShopScenarioFilters } from "@/components/ShopScheduleDialog";
import {
  SHOP_SCHEDULE,
  resolveShopStatusOn,
  type ShopScheduleEntry,
  type ShopStatus,
} from "@/data/shopSchedule";

// 자정 기준 분 → "오전 9시" / "9 AM" 라벨(로케일별 포맷은 메시지 timeHour(Min)로 구성).
function timeLabel(min: number, t: ReturnType<typeof useTranslations>): string {
  const total = ((min % 1440) + 1440) % 1440;
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const ampm = t(`shopSchedule.${h24 < 12 ? "am" : "pm"}`);
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return t(m ? "shopSchedule.timeHourMin" : "shopSchedule.timeHour", {
    ampm,
    h,
    m,
  });
}

// 메인 화면 상단 가게 일정 박스.
// - 표시 여부는 스케줄러 설정 "메인" 섹션의 "가게 일정 표시" 토글(shopScheduleShown)로 켠다.
// - 정보-가게 일정 탭에서 고정(핀)한 가게만, 설정한 날짜 기준 "오늘" 상태(휴무/영업시간)로 표시한다.
// - 시나리오(열쇠·복구·배 수리)는 그 탭과 공유하고, 축제·비는 현재 날짜·비 예보로 자동 반영한다.
export default function ShopScheduleBox() {
  const t = useTranslations();
  const { shopScheduleShown, dialogFilters, setDialogFilters, currentDate, rainDays } =
    useSchedule();

  if (!shopScheduleShown) return null;

  const isRainToday = !!rainDays[toYearDay(currentDate)];
  const ctx = {
    date: currentDate,
    ccRestored: dialogFilters.shopCcRestored,
    keyApplied: dialogFilters.shopKeyApplied,
    boatRepaired: dialogFilters.shopBoatRepaired,
    isRainToday,
  };

  // 핀된 가게(원래 일정 순서 유지)
  const pinnedIds = dialogFilters.shopPinned;
  const shops = SHOP_SCHEDULE.filter((s) => pinnedIds.includes(s.id));
  const unpin = (id: string) =>
    setDialogFilters({ shopPinned: pinnedIds.filter((x) => x !== id) });

  // 휴무 사유 메시지 키(특정일·요일 휴무는 "정기 휴무"로 통합).
  const reasonLabel = (status: Extract<ShopStatus, { closed: true }>) => {
    const key =
      status.reason === "festival"
        ? "reasonFestival"
        : status.reason === "season"
          ? "reasonSeason"
          : status.reason === "rain"
            ? "reasonRain"
            : status.reason === "permanent"
              ? "reasonPermanent"
              : "reasonClosed"; // date | weekday
    return t(`shopSchedule.${key}`);
  };

  const renderCard = (s: ShopScheduleEntry) => {
    const status = resolveShopStatusOn(s, ctx);
    return (
      <section
        key={s.id}
        className="w-fit max-w-full rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] p-2"
      >
        <div className="flex items-center gap-2">
          <PixelIcon src={`/icons/shops/${s.id}.png`} size={18} />
          <h3 className="flex-1 text-sm font-bold">
            {t(`shopSchedule.shops.${s.id}.name`)}
          </h3>
          <PinButton
            pinned
            onToggle={() => unpin(s.id)}
            label={t("shopSchedule.pin")}
          />
        </div>
        <div className="mt-1.5">
          {status.closed ? (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[var(--sv-danger)] px-2.5 py-0.5 text-xs font-bold text-white">
              {t("shopSchedule.todayClosed")} · {reasonLabel(status)}
            </span>
          ) : (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[var(--sv-accent)] px-2.5 py-0.5 text-xs font-bold text-white">
              {status.segments
                .map((seg) => `${timeLabel(seg.open, t)} – ${timeLabel(seg.close, t)}`)
                .join(", ")}
            </span>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="sv-box p-3">
      {/* 제목 + 오른쪽 시나리오 필터(가게 일정 탭과 동기화) */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5">
          <PixelIcon src="/icons/ui/time.png" size={18} />
          <h2 className="text-base font-bold">{t("shopSchedule.title")}</h2>
        </div>
        <ShopScenarioFilters />
      </div>

      {shops.length === 0 ? (
        <p className="rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm text-[var(--sv-ink-muted)]">
          {t("shopSchedule.boxEmpty")}
        </p>
      ) : (
        // 내용 너비 카드들을 좌→우로 채우고 넘치면 줄바꿈(카드 내부 빈 공간 없음)
        <div className="flex flex-wrap items-start gap-2">
          {shops.map(renderCard)}
        </div>
      )}
    </div>
  );
}
