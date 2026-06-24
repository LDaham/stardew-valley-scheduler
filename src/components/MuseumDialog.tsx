"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import { MUSEUM_ITEMS } from "@/data/museum";

// 박물관 기증: 유물/광물 탭 + 기증 여부만 체크(아이콘 없는 텍스트 체크리스트).
export default function MuseumDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const locale = useLocale();
  const { museumDone, toggleMuseum } = useSchedule();
  const [cat, setCat] = useState<"artifact" | "mineral">("artifact");

  const total = MUSEUM_ITEMS.length;
  const done = MUSEUM_ITEMS.filter((m) => museumDone[m.id]).length;
  const shown = MUSEUM_ITEMS.filter((m) => m.cat === cat);
  const catDone = shown.filter((m) => museumDone[m.id]).length;

  return (
    <Modal title={t("museum.title")} onClose={onClose}>
      <div className="mb-2 text-sm font-semibold">
        {t("museum.progress", { done, total })}
      </div>
      <div className="mb-3 h-2.5 overflow-hidden rounded bg-[var(--sv-bg)]">
        <div
          className="h-full rounded bg-[var(--sv-accent)]"
          style={{ width: `${total ? (done / total) * 100 : 0}%` }}
        />
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {(["artifact", "mineral"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`cursor-pointer rounded-md border px-2.5 py-1 text-xs font-semibold ${
              cat === c
                ? "border-[var(--sv-accent)] bg-[var(--sv-accent)] text-white"
                : "border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
            }`}
          >
            {t(`museum.${c}`)} ({catDone}/{shown.length})
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {shown.map((m) => {
          const checked = !!museumDone[m.id];
          return (
            <li key={m.id}>
              <label className="flex cursor-pointer items-center gap-2 rounded-md bg-[var(--sv-bg)] px-2.5 py-1.5 hover:bg-[var(--sv-panel)]">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMuseum(m.id)}
                  aria-label={locale === "ko" ? m.ko : m.en}
                  className="size-4 shrink-0 accent-[var(--sv-accent)]"
                />
                <span
                  className={`text-sm font-semibold ${checked ? "text-[var(--sv-ink-muted)] line-through" : ""}`}
                >
                  {locale === "ko" ? m.ko : m.en}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-[10px] text-[var(--sv-ink-muted)]">
        {t("museum.source")}
      </p>
    </Modal>
  );
}
