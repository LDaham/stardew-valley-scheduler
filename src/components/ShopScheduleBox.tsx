"use client";

import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import { toYearDay } from "@/lib/calendar";
import PixelIcon from "@/components/PixelIcon";
import { PinButton } from "@/components/ShopScheduleDialog";
import {
  SHOP_SCHEDULE,
  resolveShopStatusOn,
  shopIconSrc,
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
  const { dialogFilters, setDialogFilters, currentDate, rainDays } =
    useSchedule();

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

  // 한 가게: 이름(굵게) + 그 아래 운영시간(휴무면 "휴무 · 정기 휴무"). 메모장 자리에 임베드.
  const renderShop = (s: ShopScheduleEntry) => {
    const status = resolveShopStatusOn(s, ctx);
    const hours = status.closed
      ? `${t("shopSchedule.todayClosed")} · ${reasonLabel(status)}`
      : status.segments
          .map((seg) => `${timeLabel(seg.open, t)} – ${timeLabel(seg.close, t)}`)
          .join(", ");
    return (
      <li key={s.id} className="flex items-start gap-2">
        <PixelIcon src={shopIconSrc(s.id)} size={18} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="flex-1 text-sm font-semibold">
              {t(`shopSchedule.shops.${s.id}.name`)}
            </span>
            <PinButton
              pinned
              onToggle={() => unpin(s.id)}
              label={t("shopSchedule.pin")}
            />
          </div>
          <div
            className={`text-xs ${
              status.closed
                ? "font-semibold text-[var(--sv-danger)]"
                : "text-[var(--sv-ink-muted)]"
            }`}
          >
            {hours}
          </div>
        </div>
      </li>
    );
  };

  return (
    // 외곽 박스 없이(부모 sv-box 안에 임베드) 제목 + 가게 목록.
    // 시나리오 필터(열쇠·복구·배 수리)는 가게 일정 모달에서 설정 → 여기 자동 반영(축제는 날짜 자동 판정).
    <div className="flex flex-col">
      <h2 className="mb-2 text-base font-bold">{t("shopSchedule.title")}</h2>

      {shops.length === 0 ? (
        <p className="rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm text-[var(--sv-ink-muted)]">
          {t("shopSchedule.boxEmpty")}
        </p>
      ) : (
        <ul className="flex flex-col gap-2.5">{shops.map(renderShop)}</ul>
      )}
    </div>
  );
}
