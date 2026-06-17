"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";
import BundleItemChip from "@/components/BundleItemChip";
import { BUNDLES, bundleItemKey, type Bundle } from "@/data/bundles";
import { REMIX_SLOTS } from "@/data/remixBundles";
import SeasonFilter, {
  defaultSeasonSelection,
  matchesSeason,
  type SeasonToken,
} from "@/components/SeasonFilter";

// 메인 화면 상단 꾸러미 추적 박스.
// - 표시 여부는 꾸러미 추적 탭의 "메인 화면에서 꾸러미 추적 보기" 옵션으로 켠다.
// - 표준 모드: 설정에서 고른 꾸러미(bundleTrackerIds)를 표시.
// - 리믹스 모드: 리믹스 탭에서 선택(활성)된 무작위 꾸러미만 표시.
// - 상단 설정 버튼: 표시할 꾸러미 선택 + 각 꾸러미에 넣을 물품 미리 보기(계절·미완료 필터).
export default function BundleTrackerBox() {
  const t = useTranslations();
  const {
    currentDate,
    reminderToggles,
    bundleTrackerIds,
    toggleBundleTrackerId,
    bundleItemsDone,
    toggleBundleItem,
    bundleMode,
    remixChoices,
    dialogFilters,
    setDialogFilters,
  } = useSchedule();
  const [settingsOpen, setSettingsOpen] = useState(false);

  // 박스 표시 여부는 "마을회관 꾸러미 채우기"(communityCenterBundle) 토글과 공유한다.
  if (!reminderToggles.communityCenterBundle) return null;

  const season = currentDate.season;
  const trackedSet = new Set(bundleTrackerIds);

  // 리믹스 모드에서 현재 활성(선택)된 꾸러미: 고정 슬롯 전체 + 무작위 슬롯의 선택분.
  const activeRemixBundles = (): Bundle[] => {
    const out: Bundle[] = [];
    for (const slot of REMIX_SLOTS) {
      if (slot.fixed) out.push(...slot.bundles);
      else {
        const chosen = remixChoices[slot.id] ?? [];
        out.push(...slot.bundles.filter((b) => chosen.includes(b.id)));
      }
    }
    return out;
  };

  // 박스에 표시할 꾸러미(모드별)
  const displayed =
    bundleMode === "remix"
      ? activeRemixBundles()
      : BUNDLES.filter((b) => trackedSet.has(b.id));

  const doneCount = (b: Bundle) =>
    b.items.filter((i) => bundleItemsDone[bundleItemKey(b.id, i.id)]).length;

  // ── 설정 모달용 필터(영속) ──
  const selectedSeasons = dialogFilters.trackerSeasons
    ? new Set(dialogFilters.trackerSeasons as SeasonToken[])
    : defaultSeasonSelection(season);
  const toggleSeason = (tk: SeasonToken) => {
    const next = new Set(selectedSeasons);
    if (next.has(tk)) next.delete(tk);
    else next.add(tk);
    setDialogFilters({ trackerSeasons: [...next] });
  };
  const incompleteFirst = dialogFilters.trackerIncompleteFirst;

  // 설정 모달에 나열할 꾸러미(표준=전체, 리믹스=활성분)와 방 묶음
  const settingsBundles = bundleMode === "remix" ? activeRemixBundles() : BUNDLES;
  const rooms: string[] = [];
  for (const b of settingsBundles)
    if (!rooms.includes(b.roomKey)) rooms.push(b.roomKey);

  // 계절·비 필터 적용 + (옵션) 미완료 먼저 정렬한 물품 목록.
  // 메인 박스·표시 설정 모두 이 필터를 공유한다.
  const visibleItems = (b: Bundle) => {
    const items = b.items.filter((i) =>
      matchesSeason(i.seasons, selectedSeasons, i.rainy),
    );
    if (!incompleteFirst) return items;
    return [...items].sort(
      (a, c) =>
        Number(!!bundleItemsDone[bundleItemKey(b.id, a.id)]) -
        Number(!!bundleItemsDone[bundleItemKey(b.id, c.id)]),
    );
  };

  return (
    <div className="sv-box p-3">
      {/* 헤더: 제목 + 설정 버튼 */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-1.5 text-base font-bold">
          <PixelIcon src="/icons/ui/bundle.png" size={18} />
          {t("bundleTracker.title")}
        </h2>
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          aria-label={t("bundleTracker.settings")}
          className="sv-btn flex items-center gap-1 px-2 py-1 text-sm"
        >
          <PixelIcon src="/icons/ui/settings.png" size={14} />
          {t("bundleTracker.settings")}
        </button>
      </div>

      {displayed.length === 0 ? (
        <p className="rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm text-[var(--sv-ink-muted)]">
          {bundleMode === "remix"
            ? t("bundleTracker.emptyRemix")
            : t("bundleTracker.empty")}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {displayed.map((b) => {
            // 표시 설정의 계절·비 필터를 메인 박스 물품에도 적용. 표시할 물품 없으면 숨김.
            const items = visibleItems(b);
            if (items.length === 0) return null;
            const done = doneCount(b);
            const complete = done >= b.needed;
            return (
              <section key={b.id}>
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
                          season={season}
                          onToggle={() => toggleBundleItem(key)}
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

      {/* 설정: 표시할 꾸러미 선택 + 물품 미리 보기 */}
      {settingsOpen && (
        <Modal
          title={t("bundleTracker.settingsTitle")}
          onClose={() => setSettingsOpen(false)}
        >
          <p className="mb-2 text-xs text-[var(--sv-ink-muted)]">
            {bundleMode === "remix"
              ? t("bundleTracker.settingsHintRemix")
              : t("bundleTracker.settingsHint")}
          </p>

          {/* 상단 필터: 계절(상시 포함)·비 + 미완료 물품 먼저 보기 */}
          <div className="mb-2">
            <SeasonFilter
              selected={selectedSeasons}
              onToggle={toggleSeason}
              showRain
            />
          </div>
          <label className="mb-4 flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={incompleteFirst}
              onChange={(e) =>
                setDialogFilters({ trackerIncompleteFirst: e.target.checked })
              }
              className="size-4 accent-[var(--sv-accent)]"
            />
            {t("bundleTracker.incompleteFirst")}
          </label>

          <div className="flex flex-col gap-3">
            {rooms.map((room) => {
              // 계절 필터로 표시할 물품이 하나도 없는 꾸러미는 제외(없으면 방도 숨김)
              const roomBundles = settingsBundles.filter(
                (b) => b.roomKey === room && visibleItems(b).length > 0,
              );
              if (roomBundles.length === 0) return null;
              return (
                <section key={room}>
                  <h3 className="mb-1 text-sm font-semibold text-[var(--sv-ink-muted)]">
                    {t(`bundleRoom.${room}`)}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {roomBundles.map((b) => {
                      const items = visibleItems(b);
                      return (
                        <li key={b.id}>
                          {/* 꾸러미 선택(표준 모드만) + 이름 */}
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            {bundleMode === "standard" && (
                              <input
                                type="checkbox"
                                checked={trackedSet.has(b.id)}
                                onChange={() => toggleBundleTrackerId(b.id)}
                                aria-label={t(`bundle.${b.id}`)}
                                className="size-4 shrink-0 accent-[var(--sv-accent)]"
                              />
                            )}
                            <span className="flex-1">{t(`bundle.${b.id}`)}</span>
                            <span className="shrink-0 text-[10px] font-normal text-[var(--sv-ink-muted)]">
                              {t("bundle.pick", {
                                needed: b.needed,
                                total: b.items.length,
                              })}
                            </span>
                          </div>
                          {/* 넣어야 할 물품: 표시 전용 칩(계절 점 포함)을 행으로 나열 */}
                          <ul className="mt-1 flex flex-wrap gap-1.5 pl-1">
                            {items.map((i) => (
                              <li key={i.id}>
                                <BundleItemChip
                                  item={i}
                                  checked={
                                    !!bundleItemsDone[bundleItemKey(b.id, i.id)]
                                  }
                                  season={season}
                                />
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        </Modal>
      )}
    </div>
  );
}
