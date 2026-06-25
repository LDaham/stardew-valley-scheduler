"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import { localizeItem } from "@/lib/itemName";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import { FIELD_OFFICE_ITEMS } from "@/data/fieldOffice";

// 현장 사무소 기증: 기증 완료 여부만 체크(아이콘 없는 텍스트 체크리스트).
export default function FieldOfficeDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const locale = useLocale();
  const { fieldOfficeDone, toggleFieldOffice, dialogFilters, setDialogFilters } =
    useSchedule();

  // 완료되지 않은 항목 먼저 보기(체크 직후 즉시 재정렬하지 않도록 열 때·필터 변경 시에만 계산)
  const incompleteFirst = dialogFilters.fieldOfficeIncompleteFirst;
  const computeList = (inc: boolean) =>
    inc
      ? [...FIELD_OFFICE_ITEMS].sort(
          (a, b) =>
            Number(!!fieldOfficeDone[a.id]) - Number(!!fieldOfficeDone[b.id]),
        )
      : FIELD_OFFICE_ITEMS;
  const [list, setList] = useState(() => computeList(incompleteFirst));
  const setIncompleteFirst = (v: boolean) => {
    setDialogFilters({ fieldOfficeIncompleteFirst: v });
    setList(computeList(v));
  };

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

      <span className="mb-3 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={incompleteFirst}
          onChange={(e) => setIncompleteFirst(e.target.checked)}
          className="size-4 accent-[var(--sv-accent)]"
        />
        {t("common.incompleteFirst")}
      </span>

      {/* 물품을 클릭하면 기증 토글되는 칩(아이콘+이름)을 행으로 나열(넘치면 다음 줄) */}
      <ul className="flex flex-wrap gap-1.5">
        {list.map((m) => {
          const checked = !!fieldOfficeDone[m.id];
          const name = localizeItem(m.en, m.ko, locale);
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => toggleFieldOffice(m.id)}
                aria-pressed={checked}
                aria-label={name}
                className={`inline-flex items-center gap-1.5 rounded border px-2 py-1 text-left text-xs ${
                  checked
                    ? "border-[var(--sv-accent)] bg-[#5a8f3c26] text-[var(--sv-ink-muted)]"
                    : "border-[var(--sv-border)] bg-[var(--sv-panel)] hover:bg-[var(--sv-bg)]"
                }`}
              >
                <Image
                  src={asset(m.icon)}
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                  className="shrink-0"
                  style={{ imageRendering: "pixelated" }}
                />
                <span className={checked ? "line-through" : ""}>
                  {name}
                  {m.qty > 1 && (
                    <span className="ml-1 text-[var(--sv-ink-muted)]">
                      ×{m.qty}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-xs text-[var(--sv-ink-muted)]">
        {t("fieldOffice.source")}
      </p>
    </Modal>
  );
}
