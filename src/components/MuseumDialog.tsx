"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import { localizeItem } from "@/lib/itemName";
import { useSchedule } from "@/components/ScheduleProvider";
import Modal from "@/components/Modal";
import { MUSEUM_ITEMS } from "@/data/museum";

// 박물관 기증: 유물/광물 탭 + 기증 여부만 체크(아이콘 없는 텍스트 체크리스트).
export default function MuseumDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const locale = useLocale();
  const { museumDone, toggleMuseum, dialogFilters, setDialogFilters } =
    useSchedule();
  const [cat, setCat] = useState<"artifact" | "mineral">("artifact");

  // 완료되지 않은 항목 먼저 보기(체크 직후 즉시 재정렬하지 않도록 열 때·필터 변경 시에만 계산)
  const incompleteFirst = dialogFilters.museumIncompleteFirst;
  const computeList = (inc: boolean) =>
    inc
      ? [...MUSEUM_ITEMS].sort(
          (a, b) => Number(!!museumDone[a.id]) - Number(!!museumDone[b.id]),
        )
      : MUSEUM_ITEMS;
  const [list, setList] = useState(() => computeList(incompleteFirst));
  const setIncompleteFirst = (v: boolean) => {
    setDialogFilters({ museumIncompleteFirst: v });
    setList(computeList(v));
  };

  const total = MUSEUM_ITEMS.length;
  const done = MUSEUM_ITEMS.filter((m) => museumDone[m.id]).length;
  const shown = list.filter((m) => m.cat === cat);

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
        {(["artifact", "mineral"] as const).map((c) => {
          // 각 버튼은 자기 카테고리(c)의 개수를 표시한다(선택된 cat이 아니라).
          const items = MUSEUM_ITEMS.filter((m) => m.cat === c);
          const cDone = items.filter((m) => museumDone[m.id]).length;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`cursor-pointer rounded-md border px-2.5 py-1 text-xs font-semibold ${
                cat === c
                  ? "border-[var(--sv-accent)] bg-[var(--sv-accent)] text-white"
                  : "border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
              }`}
            >
              {t(`museum.${c}`)} ({cDone}/{items.length})
            </button>
          );
        })}
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
        {shown.map((m) => {
          const checked = !!museumDone[m.id];
          const name = localizeItem(m.en, m.ko, locale);
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => toggleMuseum(m.id)}
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
                <span className={checked ? "line-through" : ""}>{name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}
