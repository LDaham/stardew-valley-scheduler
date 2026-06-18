"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";
import { asset } from "@/lib/asset";
import Modal from "@/components/Modal";
import { PERFECTION, perfKey, type PerfCategory } from "@/data/perfection";

export default function PerfectionDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const {
    perfectionChecks,
    perfectionCounts,
    togglePerfCheck,
    setPerfCount,
    dialogFilters,
    setDialogFilters,
  } = useSchedule();
  // 한 번에 한 범주만 펼친다(항목이 많아 접어둠)
  const [open, setOpen] = useState<string | null>(null);
  // 완료되지 않은 범주 먼저 보기(마지막 선택값 영속)
  const incompleteFirst = dialogFilters.perfectionIncompleteFirst;

  const progress = (c: PerfCategory) => {
    if (c.kind === "count") {
      return { done: perfectionCounts[c.id] ?? 0, total: c.max ?? 1 };
    }
    const total = c.items?.length ?? 0;
    const done = (c.items ?? []).filter(
      (it) => perfectionChecks[perfKey(c.id, it.id)],
    ).length;
    return { done, total };
  };

  // 전체 완벽 % = Σ 가중치 × (진행/총)
  const overall = PERFECTION.reduce((s, c) => {
    const { done, total } = progress(c);
    return s + c.weight * (total ? done / total : 0);
  }, 0);

  // 펼친 범주 내부의 물품 표시 순서(미완료 먼저). 물품 완료를 눌러도 즉시 재정렬하지
  // 않고, 필터를 바꾸거나 범주를 접었다 펼 때만 다시 계산해 실수 클릭을 되돌릴 여지를 둔다.
  const itemOrder = (c: PerfCategory, incFirst: boolean): string[] => {
    const items = c.items ?? [];
    if (!incFirst) return items.map((it) => it.id);
    return [...items]
      .sort(
        (a, b) =>
          Number(!!perfectionChecks[perfKey(c.id, a.id)]) -
          Number(!!perfectionChecks[perfKey(c.id, b.id)]),
      )
      .map((it) => it.id);
  };
  // 현재 펼친 범주의 물품 순서 스냅샷(범주를 펼칠 때·필터 변경 시에만 계산)
  const [openOrder, setOpenOrder] = useState<string[] | null>(null);
  const openCategory = (id: string | null) => {
    setOpen(id);
    const c = id ? PERFECTION.find((x) => x.id === id) : null;
    setOpenOrder(
      c && c.kind === "checklist" ? itemOrder(c, incompleteFirst) : null,
    );
  };
  const setIncompleteFirst = (v: boolean) => {
    setDialogFilters({ perfectionIncompleteFirst: v });
    // 펼쳐진 범주가 있으면 그 범주의 물품 순서만 다시 계산
    const c = open ? PERFECTION.find((x) => x.id === open) : null;
    setOpenOrder(c && c.kind === "checklist" ? itemOrder(c, v) : null);
  };

  const itemName = (c: PerfCategory, id: string) =>
    c.nameVia === "villagers"
      ? t(`villagers.${id}`)
      : t(`perfectionItems.${c.id}.${id}`);

  const setCount = (c: PerfCategory, n: number) =>
    setPerfCount(c.id, Math.max(0, Math.min(c.max ?? 0, n)));

  const stepBtn =
    "flex size-7 shrink-0 items-center justify-center rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] text-base font-bold leading-none hover:bg-[var(--sv-bg)] disabled:opacity-40";

  return (
    <Modal title={t("perfection.title")} onClose={onClose}>
      {/* 전체 완벽 % */}
      <div className="mb-4">
        <div className="mb-1 flex items-baseline justify-between">
          <span className="text-sm font-semibold">{t("perfection.overall")}</span>
          <span className="text-lg font-bold tabular-nums">
            {overall.toFixed(1)}%
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded bg-[var(--sv-bg)]">
          <div
            className="h-full rounded bg-[var(--sv-accent)]"
            style={{ width: `${overall}%` }}
          />
        </div>
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

      <div className="flex flex-col gap-2">
        {PERFECTION.map((c) => {
          const { done, total } = progress(c);
          const complete = total > 0 && done >= total;
          const isOpen = open === c.id;
          // 펼친 체크리스트 범주의 물품을 스냅샷 순서로(없으면 원래 순서)
          const items = c.items ?? [];
          const orderedItems =
            isOpen && openOrder
              ? openOrder
                  .map((id) => items.find((it) => it.id === id))
                  .filter((it): it is (typeof items)[number] => !!it)
              : items;
          return (
            <section
              key={c.id}
              className="overflow-hidden rounded-md border border-[var(--sv-border)]"
            >
              <button
                onClick={() => openCategory(isOpen ? null : c.id)}
                className="flex w-full items-center gap-2 px-2.5 py-2 text-left hover:bg-[var(--sv-bg)]"
              >
                <span className="text-xs text-[var(--sv-ink-muted)]">
                  {isOpen ? "▾" : "▸"}
                </span>
                <span className="flex-1 text-sm font-semibold">
                  {t(`perfectionCategory.${c.id}`)}
                  <span className="ml-1 text-[10px] font-normal text-[var(--sv-ink-muted)]">
                    ({t("perfection.contribute")} {c.weight}%)
                  </span>
                </span>
                <span
                  className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                    complete
                      ? "bg-[var(--sv-accent)] text-white"
                      : "bg-[var(--sv-ink)] text-white"
                  }`}
                >
                  {complete ? t("perfection.complete") : `${done}/${total}`}
                </span>
              </button>

              {isOpen && c.kind === "count" && (
                <div className="border-t border-[var(--sv-border)] px-3 py-2.5">
                  <p className="mb-1.5 text-xs text-[var(--sv-ink-muted)]">
                    {t(
                      c.id === "walnut"
                        ? "perfection.walnutHint"
                        : "perfection.shippedHint",
                    )}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="−"
                      disabled={(perfectionCounts[c.id] ?? 0) <= 0}
                      onClick={() => setCount(c, (perfectionCounts[c.id] ?? 0) - 1)}
                      className={stepBtn}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={c.max}
                      value={perfectionCounts[c.id] ?? 0}
                      onChange={(e) => setCount(c, Number(e.target.value) || 0)}
                      className="w-16 rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] py-1 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <span className="text-sm text-[var(--sv-ink-muted)]">
                      / {c.max}
                    </span>
                    <button
                      type="button"
                      aria-label="+"
                      disabled={(perfectionCounts[c.id] ?? 0) >= (c.max ?? 0)}
                      onClick={() => setCount(c, (perfectionCounts[c.id] ?? 0) + 1)}
                      className={stepBtn}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {isOpen && c.kind === "checklist" && (
                // 물품을 클릭하면 완료 토글되는 박스(칩)로 행 나열(넘치면 다음 줄).
                // 요리·제작은 칩 안 2번째 줄에 조합법(재료)을 표시.
                <ul className="flex flex-wrap gap-1.5 border-t border-[var(--sv-border)] p-1.5">
                  {orderedItems.map((it) => {
                    const key = perfKey(c.id, it.id);
                    const checked = !!perfectionChecks[key];
                    const name = itemName(c, it.id);
                    const recipe =
                      c.id === "cooking" || c.id === "crafting"
                        ? t(`recipe.${c.id}.${it.id}`)
                        : "";
                    return (
                      <li key={it.id}>
                        <button
                          type="button"
                          onClick={() => togglePerfCheck(key)}
                          aria-pressed={checked}
                          aria-label={name}
                          className={`inline-flex items-start gap-1.5 rounded border px-2 py-1 text-left text-xs ${
                            checked
                              ? "border-[var(--sv-accent)] bg-[#5a8f3c26] text-[var(--sv-ink-muted)]"
                              : "border-[var(--sv-border)] bg-[var(--sv-panel)] hover:bg-[var(--sv-bg)]"
                          }`}
                        >
                          <Image
                            src={asset(it.icon)}
                            alt=""
                            width={16}
                            height={16}
                            unoptimized
                            className="mt-0.5 shrink-0"
                            style={{ imageRendering: "pixelated" }}
                          />
                          <span>
                            <span className={checked ? "line-through" : ""}>
                              {name}
                            </span>
                            {recipe && (
                              <span className="block text-[10px] leading-tight text-[var(--sv-ink-muted)]">
                                {recipe}
                              </span>
                            )}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </Modal>
  );
}
