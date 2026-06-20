"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import { useSchedule } from "@/components/ScheduleProvider";
import PixelIcon from "@/components/PixelIcon";
import { FISH, type FishInfo } from "@/data/fish";
import { toYearDay } from "@/lib/calendar";

// 메인 화면 상단 "비 오는 날에만 구할 수 있는 생선" 박스.
// - 표시 여부는 스케줄러 설정 "메인" 섹션 / 생선 정보 탭의 토글(rainFishShown)로 켠다.
// - 당일(오늘)이 '비 오는 날'일 때만 표시하고, 그 계절의 비 전용 생선만 보여준다.
// - 비 예보가 없으면(오늘이 비가 아니면) 박스 자체를 숨긴다.
// - 목록은 생선 정보 탭과 동일한 데이터(FISH, weather === "rain")를 사용.
export default function RainFishBox() {
  const t = useTranslations();
  const { rainFishShown, currentDate, rainDays } = useSchedule();

  // 토글이 꺼져 있거나 오늘이 비 오는 날이 아니면 박스를 표시하지 않는다.
  if (!rainFishShown || !rainDays[toYearDay(currentDate)]) return null;

  // 오늘 계절의 비 전용 생선만
  const fish = FISH.filter(
    (f) => f.weather === "rain" && f.seasons.includes(currentDate.season),
  );

  const fishChip = (f: FishInfo) => (
    <li
      key={f.id}
      className="flex max-w-full items-center gap-2 rounded-md border border-[var(--sv-border)] bg-[var(--sv-bg)] px-2 py-1.5"
    >
      <Image
        src={asset(`/icons/fish/${f.id}.png`)}
        alt=""
        width={24}
        height={24}
        unoptimized
        className="shrink-0"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="min-w-0">
        <div className="text-sm font-semibold">{t(`fishInfo.${f.id}.name`)}</div>
        <div className="text-[11px] text-[var(--sv-ink-muted)]">
          {t(`fishInfo.${f.id}.location`)}
        </div>
      </div>
    </li>
  );

  return (
    <div className="sv-box p-3">
      <div className="mb-3 flex items-center gap-1.5">
        <PixelIcon src="/icons/ui/rain.png" size={18} />
        <h2 className="text-base font-bold">{t("rainFish.title")}</h2>
      </div>

      {fish.length === 0 ? (
        <p className="rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm text-[var(--sv-ink-muted)]">
          {t("rainFish.empty")}
        </p>
      ) : (
        <ul className="flex flex-wrap gap-1.5">{fish.map(fishChip)}</ul>
      )}
    </div>
  );
}
