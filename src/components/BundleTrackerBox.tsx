"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import { asset } from "@/lib/asset";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";
import { BUNDLES, bundleItemKey, type Bundle } from "@/data/bundles";

// 메인 화면 상단 꾸러미 추적 박스.
// - 표시 여부는 꾸러미 추적 탭의 "메인 화면에서 꾸러미 추적 보기" 옵션으로 켠다.
// - 박스 상단 설정 버튼으로 표시할 꾸러미를 직접 고른다(bundleTrackerIds).
export default function BundleTrackerBox() {
  const t = useTranslations();
  const {
    bundleTrackerShown,
    bundleTrackerIds,
    toggleBundleTrackerId,
    bundleItemsDone,
    toggleBundleItem,
  } = useSchedule();
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (!bundleTrackerShown) return null;

  const trackedSet = new Set(bundleTrackerIds);
  // BUNDLES 순서를 유지해 안정적으로 표시
  const tracked = BUNDLES.filter((b) => trackedSet.has(b.id));

  const doneCount = (b: Bundle) =>
    b.items.filter((i) => bundleItemsDone[bundleItemKey(b.id, i.id)]).length;

  // 설정 모달용: 방(roomKey)별로 묶기(BUNDLES 등장 순서 유지)
  const rooms: string[] = [];
  for (const b of BUNDLES) if (!rooms.includes(b.roomKey)) rooms.push(b.roomKey);

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

      {tracked.length === 0 ? (
        <p className="rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm text-[var(--sv-ink-muted)]">
          {t("bundleTracker.empty")}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {tracked.map((b) => {
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
                <ul className="flex flex-col gap-1">
                  {b.items.map((i) => {
                    const key = bundleItemKey(b.id, i.id);
                    const checked = !!bundleItemsDone[key];
                    return (
                      <li key={i.id}>
                        <div className="flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-[var(--sv-bg)]">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleBundleItem(key)}
                            aria-label={t(i.nameKey)}
                            className="size-4 shrink-0 accent-[var(--sv-accent)]"
                          />
                          <Image
                            src={asset(`/icons/bundleItems/${i.id}.png`)}
                            alt=""
                            width={18}
                            height={18}
                            unoptimized
                            className="shrink-0"
                            style={{ imageRendering: "pixelated" }}
                          />
                          <span
                            className={`flex-1 ${checked ? "text-[var(--sv-ink-muted)] line-through" : ""}`}
                          >
                            {t(i.nameKey)}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}

      {/* 설정: 표시할 꾸러미 선택 */}
      {settingsOpen && (
        <Modal
          title={t("bundleTracker.settingsTitle")}
          onClose={() => setSettingsOpen(false)}
        >
          <p className="mb-3 text-xs text-[var(--sv-ink-muted)]">
            {t("bundleTracker.settingsHint")}
          </p>
          <div className="flex flex-col gap-3">
            {rooms.map((room) => (
              <section key={room}>
                <h3 className="mb-1 text-sm font-semibold text-[var(--sv-ink-muted)]">
                  {t(`bundleRoom.${room}`)}
                </h3>
                <ul className="flex flex-col gap-1">
                  {BUNDLES.filter((b) => b.roomKey === room).map((b) => {
                    const on = trackedSet.has(b.id);
                    return (
                      <li key={b.id}>
                        <div className="flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-[var(--sv-bg)]">
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => toggleBundleTrackerId(b.id)}
                            aria-label={t(`bundle.${b.id}`)}
                            className="size-4 shrink-0 accent-[var(--sv-accent)]"
                          />
                          <span className="flex-1">{t(`bundle.${b.id}`)}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
