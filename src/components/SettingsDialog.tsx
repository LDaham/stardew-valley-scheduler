"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import type { FixedEventType } from "@/lib/events";
import { REMINDERS } from "@/data/reminders";

// 설정 창: 표시할 이벤트 타입 체크박스 + 언어 선택.
const FILTER_ITEMS: { type: FixedEventType; emoji: string }[] = [
  { type: "birthday", emoji: "🎂" },
  { type: "festival", emoji: "🚩" },
  { type: "cropDeadline", emoji: "🌱" },
];

export default function SettingsDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const { eventFilters, setEventFilter, reminderToggles, setReminderToggle } =
    useSchedule();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[85vh] w-full max-w-sm overflow-y-auto rounded-xl border border-[var(--sv-border)] bg-[var(--sv-panel)] p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{t("settings.title")}</h2>
          <button
            onClick={onClose}
            aria-label={t("gift.close")}
            className="text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
          >
            ✕
          </button>
        </div>

        <section className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
            {t("settings.events")}
          </h3>
          <ul className="flex flex-col gap-1">
            {FILTER_ITEMS.map(({ type, emoji }) => (
              <li key={type}>
                <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-[var(--sv-bg)]">
                  <input
                    type="checkbox"
                    checked={eventFilters[type]}
                    onChange={(e) => setEventFilter(type, e.target.checked)}
                    className="size-4 accent-[var(--sv-accent)]"
                  />
                  <span aria-hidden>{emoji}</span>
                  <span className="text-sm">{t(`eventType.${type}`)}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
            {t("settings.reminders")}
          </h3>
          <ul className="flex flex-col gap-1">
            {REMINDERS.map((r) => (
              <li key={r.id}>
                <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-[var(--sv-bg)]">
                  <input
                    type="checkbox"
                    checked={reminderToggles[r.id]}
                    onChange={(e) => setReminderToggle(r.id, e.target.checked)}
                    className="size-4 accent-[var(--sv-accent)]"
                  />
                  <span aria-hidden>{r.emoji}</span>
                  <span className="text-sm">{t(`reminders.${r.id}.title`)}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
            {t("settings.language")}
          </h3>
          <LocaleSwitcher />
        </section>
      </div>
    </div>
  );
}
