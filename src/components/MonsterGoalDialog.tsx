"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import { MONSTER_GOALS } from "@/data/monsterGoals";

// 몬스터 박멸 목표: 달성 여부만 체크(업적 추적기와 동일한 단순 토글).
export default function MonsterGoalDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const locale = useLocale();
  const { monsterGoalsDone, toggleMonsterGoal } = useSchedule();
  const name = (o: { ko: string; en: string }) =>
    locale === "ko" ? o.ko : o.en;

  const total = MONSTER_GOALS.length;
  const done = MONSTER_GOALS.filter((g) => monsterGoalsDone[g.id]).length;

  return (
    <Modal title={t("monster.title")} onClose={onClose}>
      <div className="mb-2 text-sm font-semibold">
        {t("monster.progress", { done, total })}
      </div>
      <div className="mb-3 h-2.5 overflow-hidden rounded bg-[var(--sv-bg)]">
        <div
          className="h-full rounded bg-[var(--sv-accent)]"
          style={{ width: `${total ? (done / total) * 100 : 0}%` }}
        />
      </div>

      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {MONSTER_GOALS.map((g) => {
          const checked = !!monsterGoalsDone[g.id];
          return (
            <li key={g.id}>
              <label className="flex cursor-pointer items-center gap-2 rounded-md bg-[var(--sv-bg)] px-2.5 py-1.5 hover:bg-[var(--sv-panel)]">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMonsterGoal(g.id)}
                  aria-label={name(g)}
                  className="size-4 shrink-0 accent-[var(--sv-accent)]"
                />
                <Image
                  src={asset(g.reward.icon)}
                  alt=""
                  width={24}
                  height={24}
                  unoptimized
                  className="shrink-0"
                  style={{ imageRendering: "pixelated" }}
                />
                <div className="min-w-0 flex-1">
                  <span
                    className={`block text-sm font-semibold ${checked ? "text-[var(--sv-ink-muted)] line-through" : ""}`}
                  >
                    {name(g)} {t("monster.kills", { count: g.count })}
                  </span>
                  <span className="block truncate text-xs text-[var(--sv-ink-muted)]">
                    → {name(g.reward)}
                  </span>
                </div>
              </label>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-[10px] text-[var(--sv-ink-muted)]">
        {t("monster.source")}
      </p>
    </Modal>
  );
}
