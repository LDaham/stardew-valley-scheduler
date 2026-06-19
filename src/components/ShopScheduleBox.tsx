"use client";

import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import PixelIcon from "@/components/PixelIcon";
import MasonryColumns from "@/components/MasonryColumns";
import { ShopBody, type Scenario } from "@/components/ShopScheduleDialog";
import { SHOP_SCHEDULE, type ShopScheduleEntry } from "@/data/shopSchedule";

// 메인 화면 상단 가게 일정 박스.
// - 표시 여부는 스케줄러 설정 "메인" 섹션의 "가게 일정 표시" 토글(shopScheduleShown)로 켠다.
// - 정보-가게 일정 탭에서 고정(핀)한 가게만 표시한다(시나리오 토글값도 그 탭과 공유).
export default function ShopScheduleBox() {
  const t = useTranslations();
  const { shopScheduleShown, dialogFilters } = useSchedule();

  if (!shopScheduleShown) return null;

  const scenario: Scenario = {
    keyApplied: dialogFilters.shopKeyApplied,
    ccRestored: dialogFilters.shopCcRestored,
    festivalOn: dialogFilters.shopFestivalOn,
  };

  // 핀된 가게(원래 일정 순서 유지)
  const pinned = new Set(dialogFilters.shopPinned);
  const shops = SHOP_SCHEDULE.filter((s) => pinned.has(s.id));

  const renderCard = (s: ShopScheduleEntry) => (
    <section
      key={s.id}
      className="rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] p-2"
    >
      <div className="mb-1.5 flex items-center gap-2">
        <PixelIcon src={`/icons/shops/${s.id}.png`} size={18} />
        <h3 className="text-sm font-bold">
          {t(`shopSchedule.shops.${s.id}.name`)}
        </h3>
      </div>
      <ShopBody entry={s} scenario={scenario} />
    </section>
  );

  return (
    <div className="sv-box p-3">
      <div className="mb-3 flex items-center gap-1.5">
        <PixelIcon src="/icons/ui/time.png" size={18} />
        <h2 className="text-base font-bold">{t("shopSchedule.title")}</h2>
      </div>

      {shops.length === 0 ? (
        <p className="rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm text-[var(--sv-ink-muted)]">
          {t("shopSchedule.boxEmpty")}
        </p>
      ) : (
        <>
          {/* 모바일: 1열 */}
          <div className="flex flex-col gap-2 sm:hidden">
            {shops.map(renderCard)}
          </div>
          {/* 데스크톱: 2열 메이슨리(실제 높이 측정 → 먼저 끝난 열에 다음 박스) */}
          <div className="hidden sm:block">
            <MasonryColumns
              items={shops}
              getKey={(s) => s.id}
              render={renderCard}
            />
          </div>
        </>
      )}
    </div>
  );
}
