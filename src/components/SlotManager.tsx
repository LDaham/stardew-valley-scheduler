"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSlots } from "@/components/ScheduleProvider";

// 세이브 슬롯 관리(설정 일반 탭). 같은 기기에서 여러 게임을 슬롯별로 저장·전환.
// 이름이 빈 슬롯은 "슬롯 N"으로 표시(스토어는 로케일 비의존이라 표시 시 보정).
export default function SlotManager() {
  const t = useTranslations();
  const locale = useLocale();
  const { slots, activeId, maxSlots, switchSlot, createSlot, renameSlot, duplicateSlot, deleteSlot } =
    useSlots();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const label = (name: string, index: number) =>
    name.trim() || t("slots.slotN", { n: index + 1 });
  const fmtDate = (ms: number) => {
    try {
      return new Date(ms).toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  const startRename = (id: string, current: string) => {
    setEditingId(id);
    setDraftName(current);
  };
  const commitRename = (id: string) => {
    renameSlot(id, draftName.trim());
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-1.5">
        {slots.map((s, i) => {
          const isActive = s.id === activeId;
          const editing = editingId === s.id;
          return (
            <li
              key={s.id}
              className={`rounded-lg border px-3 py-2 ${
                isActive
                  ? "border-[var(--sv-accent)] bg-[var(--sv-bg)]"
                  : "border-[var(--sv-border)] bg-[var(--sv-panel)]"
              }`}
            >
              <div className="flex items-center gap-2">
                {editing ? (
                  <input
                    autoFocus
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitRename(s.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    maxLength={24}
                    placeholder={t("slots.namePlaceholder")}
                    className="min-w-0 flex-1 rounded-md border border-[var(--sv-border)] bg-[var(--sv-bg)] px-2 py-1 text-sm outline-none focus:border-[var(--sv-accent)]"
                  />
                ) : (
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">
                      {label(s.name, i)}
                      {isActive && (
                        <span className="ml-2 rounded-full bg-[var(--sv-accent)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--sv-accent-ink)] align-middle">
                          {t("slots.active")}
                        </span>
                      )}
                    </span>
                    <span className="text-[11px] text-[var(--sv-ink-muted)]">
                      {t("slots.updated", { date: fmtDate(s.updatedAt) })}
                    </span>
                  </div>
                )}

                {editing ? (
                  <button
                    type="button"
                    onClick={() => commitRename(s.id)}
                    className="rounded-md border border-[var(--sv-border)] px-2 py-1 text-xs font-semibold hover:bg-[var(--sv-bg)]"
                  >
                    {t("common.confirm")}
                  </button>
                ) : (
                  !isActive && (
                    <button
                      type="button"
                      onClick={() => switchSlot(s.id)}
                      className="rounded-md border border-transparent bg-[var(--sv-accent)] px-2.5 py-1 text-xs font-semibold text-[var(--sv-accent-ink)]"
                    >
                      {t("slots.switch")}
                    </button>
                  )
                )}
              </div>

              {!editing && (
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => startRename(s.id, s.name)}
                    className="rounded-md border border-[var(--sv-border)] px-2 py-0.5 text-[11px] hover:bg-[var(--sv-bg)]"
                  >
                    {t("slots.rename")}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      duplicateSlot(
                        s.id,
                        t("slots.copyOf", { name: label(s.name, i) }).slice(0, 24),
                      )
                    }
                    disabled={slots.length >= maxSlots}
                    className="rounded-md border border-[var(--sv-border)] px-2 py-0.5 text-[11px] hover:bg-[var(--sv-bg)] disabled:opacity-40"
                  >
                    {t("slots.duplicate")}
                  </button>
                  {slots.length > 1 &&
                    (confirmDelete === s.id ? (
                      <span className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-[var(--sv-danger)]">
                          {t("slots.deleteConfirm")}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            deleteSlot(s.id);
                            setConfirmDelete(null);
                          }}
                          className="rounded-md bg-[#e23b3b] px-2 py-0.5 text-[11px] font-semibold text-white hover:bg-[#b02a2a]"
                        >
                          {t("slots.delete")}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDelete(null)}
                          className="rounded-md border border-[var(--sv-border)] px-2 py-0.5 text-[11px] hover:bg-[var(--sv-bg)]"
                        >
                          {t("settings.resetNo")}
                        </button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(s.id)}
                        className="rounded-md border border-[#e23b3b] px-2 py-0.5 text-[11px] font-semibold text-[#e23b3b] hover:bg-[#fbeaea]"
                      >
                        {t("slots.delete")}
                      </button>
                    ))}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => createSlot("")}
        disabled={slots.length >= maxSlots}
        className="self-start rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-sm font-semibold hover:bg-[var(--sv-bg)] disabled:opacity-40"
      >
        {slots.length >= maxSlots
          ? t("slots.full", { max: maxSlots })
          : t("slots.add")}
      </button>
    </div>
  );
}
