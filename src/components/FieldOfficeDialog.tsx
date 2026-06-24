"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import { FIELD_OFFICE_ITEMS } from "@/data/fieldOffice";

// 현장 사무소 기증: 기증 완료 여부만 체크(아이콘 없는 텍스트 체크리스트).
export default function FieldOfficeDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const locale = useLocale();
  const { fieldOfficeDone, toggleFieldOffice } = useSchedule();

  const total = FIELD_OFFICE_ITEMS.length;
  const done = FIELD_OFFICE_ITEMS.filter((m) => fieldOfficeDone[m.id]).length;

  return (
    <Modal title={t("fieldOffice.title")} onClose={onClose}>
      <p className="mb-2 text-xs text-[var(--sv-ink-muted)]">
        {t("fieldOffice.hint")}
      </p>
      <div className="mb-2 text-sm font-semibold">
        {t("fieldOffice.progress", { done, total })}
      </div>
      <div className="mb-3 h-2.5 overflow-hidden rounded bg-[var(--sv-bg)]">
        <div
          className="h-full rounded bg-[var(--sv-accent)]"
          style={{ width: `${total ? (done / total) * 100 : 0}%` }}
        />
      </div>

      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {FIELD_OFFICE_ITEMS.map((m) => {
          const checked = !!fieldOfficeDone[m.id];
          return (
            <li key={m.id}>
              <label className="flex cursor-pointer items-center gap-2 rounded-md bg-[var(--sv-bg)] px-2.5 py-1.5 hover:bg-[var(--sv-panel)]">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleFieldOffice(m.id)}
                  aria-label={locale === "ko" ? m.ko : m.en}
                  className="size-4 shrink-0 accent-[var(--sv-accent)]"
                />
                <span
                  className={`text-sm font-semibold ${checked ? "text-[var(--sv-ink-muted)] line-through" : ""}`}
                >
                  {locale === "ko" ? m.ko : m.en}
                  {m.qty > 1 && (
                    <span className="ml-1 text-[var(--sv-ink-muted)]">
                      ×{m.qty}
                    </span>
                  )}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-[10px] text-[var(--sv-ink-muted)]">
        {t("fieldOffice.source")}
      </p>
    </Modal>
  );
}
