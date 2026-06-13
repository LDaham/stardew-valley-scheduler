"use client";

import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import type { FixedEventType } from "@/lib/events";
import { REMINDERS } from "@/data/reminders";

// 할 일 목록에 표시할 고정 이벤트 타입 + 리마인더 설정.
const FILTER_ITEMS: { type: FixedEventType; emoji: string }[] = [
  { type: "birthday", emoji: "🎂" },
  { type: "festival", emoji: "🚩" },
  { type: "cropDeadline", emoji: "🌱" },
];

export default function TodoSettingsDialog({
  onClose,
}: {
  onClose: () => void;
}) {
  const t = useTranslations();
  const { eventFilters, setEventFilter, reminderToggles, setReminderToggle } =
    useSchedule();

  return (
    <Modal title={t("settings.todoSettings")} onClose={onClose}>
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

      <section>
        <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
          {t("settings.reminders")}
        </h3>
        <ul className="flex flex-col gap-1">
          {REMINDERS.map((r) => (
            <li key={r.id}>
              <label className="flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 hover:bg-[var(--sv-bg)]">
                <input
                  type="checkbox"
                  checked={reminderToggles[r.id]}
                  onChange={(e) => setReminderToggle(r.id, e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 accent-[var(--sv-accent)]"
                />
                <span aria-hidden className="mt-0.5">
                  {r.emoji}
                </span>
                <span className="flex-1">
                  <span className="text-sm">{t(`reminders.${r.id}.title`)}</span>
                  <p className="text-xs text-[var(--sv-ink-muted)]">
                    {t(`reminders.${r.id}.detail`)}
                  </p>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>
    </Modal>
  );
}
