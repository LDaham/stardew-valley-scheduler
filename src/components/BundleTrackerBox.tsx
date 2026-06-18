"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import PixelIcon from "@/components/PixelIcon";
import BundleItemChip from "@/components/BundleItemChip";
import {
  BUNDLES,
  bundleItemKey,
  type Bundle,
  type BundleItem,
} from "@/data/bundles";
import { REMIX_SLOTS } from "@/data/remixBundles";
import SeasonFilter, {
  defaultSeasonSelection,
  matchesSeason,
  type SeasonToken,
} from "@/components/SeasonFilter";

// 메인 화면 상단 꾸러미 추적 박스.
// - 표시 여부는 스케줄러 설정 최상단의 "꾸러미 추적" 토글(bundleTrackerShown)로 켠다.
// - 표준 모드: 표준 꾸러미 전체를 표시.
// - 리믹스 모드: 리믹스 탭에서 선택(활성)된 무작위 꾸러미만 표시.
// - 제목 오른쪽 인라인 필터: 계절·비·상시 + 완료되지 않은 물품만 보기.
// - 표시 물품은 "스냅샷"이라, 필터를 바꾸거나 날짜를 옮기기 전까지는 그대로 유지된다.
//   (완료 체크를 잘못 눌러도 그 자리에서 바로 사라지지 않아 되돌릴 여지가 있다.)
export default function BundleTrackerBox() {
  const t = useTranslations();
  const {
    currentDate,
    year,
    bundleTrackerShown,
    bundleItemsDone,
    toggleBundleItem,
    bundleMode,
    remixChoices,
    dialogFilters,
    setDialogFilters,
  } = useSchedule();

  const season = currentDate.season;
  const trackerSeasons = dialogFilters.trackerSeasons;
  const onlyIncomplete = dialogFilters.trackerOnlyIncomplete;
  // 날짜 키: 바뀌면 스냅샷을 다시 계산(완료된 물품을 다시 걸러냄)
  const dayKey = `${year}-${currentDate.season}-${currentDate.day}`;

  // 계절 필터 집합(없으면 현재 계절+상시)
  const selectedSeasons = useMemo<Set<SeasonToken>>(
    () =>
      trackerSeasons
        ? new Set(trackerSeasons as SeasonToken[])
        : defaultSeasonSelection(season),
    [trackerSeasons, season],
  );

  // 표시 스냅샷: {꾸러미, 표시할 물품}[]. deps가 바뀔 때만(=필터·모드·날짜 변경) 다시 계산.
  // bundleItemsDone는 일부러 deps에서 제외 → 완료 토글로는 재계산되지 않아 목록이 유지된다.
  const snapshot = useMemo<{ bundle: Bundle; items: BundleItem[] }[]>(() => {
    const done = bundleItemsDone;

    // 표시할 꾸러미(모드별)
    const bundles: Bundle[] = [];
    if (bundleMode === "remix") {
      for (const slot of REMIX_SLOTS) {
        if (slot.fixed) bundles.push(...slot.bundles);
        else {
          const chosen = remixChoices[slot.id] ?? [];
          bundles.push(...slot.bundles.filter((b) => chosen.includes(b.id)));
        }
      }
    } else {
      bundles.push(...BUNDLES);
    }

    return bundles.map((b) => {
      let items = b.items.filter((i) =>
        matchesSeason(i.seasons, selectedSeasons, i.rainy),
      );
      if (onlyIncomplete)
        items = items.filter((i) => !done[bundleItemKey(b.id, i.id)]);
      return { bundle: b, items };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bundleMode, remixChoices, selectedSeasons, onlyIncomplete, dayKey]);

  // 박스 표시 여부는 스케줄러 설정 최상단의 "꾸러미 추적" 토글로 켠다.
  if (!bundleTrackerShown) return null;

  const toggleSeason = (tk: SeasonToken) => {
    const next = new Set(selectedSeasons);
    if (next.has(tk)) next.delete(tk);
    else next.add(tk);
    setDialogFilters({ trackerSeasons: [...next] });
  };

  // 진행도 카운트는 실시간(완료 토글 즉시 반영)
  const doneCount = (b: Bundle) =>
    b.items.filter((i) => bundleItemsDone[bundleItemKey(b.id, i.id)]).length;

  return (
    <div className="sv-box p-3">
      {/* 헤더: 제목 + 오른쪽 인라인 필터(계절·비·상시 + 완료되지 않은 물품만) */}
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="flex items-center gap-1.5 text-base font-bold">
          <PixelIcon src="/icons/ui/bundle.png" size={18} />
          {t("bundleTracker.title")}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <SeasonFilter selected={selectedSeasons} onToggle={toggleSeason} />
          <label className="flex cursor-pointer items-center gap-1.5 text-xs">
            <input
              type="checkbox"
              checked={onlyIncomplete}
              onChange={(e) =>
                setDialogFilters({ trackerOnlyIncomplete: e.target.checked })
              }
              className="size-4 accent-[var(--sv-accent)]"
            />
            {t("bundleTracker.onlyIncomplete")}
          </label>
        </div>
      </div>

      {snapshot.length === 0 ? (
        <p className="rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm text-[var(--sv-ink-muted)]">
          {bundleMode === "remix"
            ? t("bundleTracker.emptyRemix")
            : t("bundleTracker.empty")}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {snapshot.map(({ bundle: b, items }) => {
            // 필터로 표시할 물품이 없으면 해당 꾸러미는 숨김
            if (items.length === 0) return null;
            const done = doneCount(b);
            const complete = done >= b.needed;
            return (
              <section
                key={b.id}
                className="rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] p-2"
              >
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold">
                    <span className="text-[10px] text-[var(--sv-ink-muted)]">
                      {t(`bundleRoom.${b.roomKey}`)}
                    </span>{" "}
                    {t(`bundle.${b.id}`)}
                  </h3>
                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                      complete
                        ? "bg-[var(--sv-accent)] text-white"
                        : "bg-[var(--sv-ink)] text-white"
                    }`}
                  >
                    {complete ? t("bundle.complete") : `${done}/${b.needed}`}
                  </span>
                </div>
                {b.quality === "gold" && (
                  <p className="mb-1 rounded bg-[#fff3d6] px-2 py-1 text-[11px] font-semibold text-[#b8860b]">
                    {t("bundle.qualityGoldNote")}
                  </p>
                )}
                {/* 물품: 클릭하면 완료 토글되는 칩을 행으로 나열(넘치면 다음 줄) */}
                <ul className="flex flex-wrap gap-1.5">
                  {items.map((i) => {
                    const key = bundleItemKey(b.id, i.id);
                    return (
                      <li key={i.id}>
                        <BundleItemChip
                          item={i}
                          checked={!!bundleItemsDone[key]}
                          onToggle={() => toggleBundleItem(key)}
                          disabled={complete && !bundleItemsDone[key]}
                        />
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
