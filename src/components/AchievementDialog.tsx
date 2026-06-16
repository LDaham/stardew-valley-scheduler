"use client";

import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import { ACHIEVEMENTS } from "@/data/achievements";

export default function AchievementDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const { achievementsDone, toggleAchievement, dialogFilters, setDialogFilters } =
    useSchedule();
  // 완료되지 않은 업적 우선 표시(마지막 선택값 영속)
  const incompleteFirst = dialogFilters.achievementIncompleteFirst;
  const setIncompleteFirst = (v: boolean) =>
    setDialogFilters({ achievementIncompleteFirst: v });

  const total = ACHIEVEMENTS.length;
  const done = ACHIEVEMENTS.filter((a) => achievementsDone[a.id]).length;

  // 원래 순서 유지하되, 옵션 시 미완료를 위로(안정 정렬)
  const list = incompleteFirst
    ? [...ACHIEVEMENTS].sort(
        (a, b) =>
          Number(!!achievementsDone[a.id]) - Number(!!achievementsDone[b.id]),
      )
    : ACHIEVEMENTS;

  return (
    <Modal title={t("achievement.title")} onClose={onClose}>
      {/* 달성 업적 / 전체 업적 */}
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-semibold">
          {t("achievement.progress", { done, total })}
        </span>
      </div>
      <div className="mb-3 h-2.5 overflow-hidden rounded bg-[var(--sv-bg)]">
        <div
          className="h-full rounded bg-[var(--sv-accent)]"
          style={{ width: `${total ? (done / total) * 100 : 0}%` }}
        />
      </div>

      <label className="mb-3 flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={incompleteFirst}
          onChange={(e) => setIncompleteFirst(e.target.checked)}
          className="size-4 accent-[var(--sv-accent)]"
        />
        {t("common.incompleteFirst")}
      </label>

      <ul className="flex flex-col gap-1.5">
        {list.map((a) => {
          const checked = !!achievementsDone[a.id];
          return (
            <li key={a.id}>
              <div className="flex items-start gap-2 rounded-md bg-[var(--sv-bg)] px-2.5 py-1.5 hover:bg-[var(--sv-panel)]">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleAchievement(a.id)}
                  aria-label={t(`achievements.${a.id}.name`)}
                  className="mt-0.5 size-4 shrink-0 accent-[var(--sv-accent)]"
                />
                <div className="min-w-0 flex-1">
                  <span
                    className={`text-sm font-semibold ${checked ? "text-[var(--sv-ink-muted)] line-through" : ""}`}
                  >
                    {t(`achievements.${a.id}.name`)}
                  </span>
                  <p className="mt-0.5 text-xs leading-snug text-[var(--sv-ink-muted)]">
                    {t(`achievements.${a.id}.desc`)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
