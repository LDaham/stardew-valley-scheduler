"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import ThemeToggle from "@/components/ThemeToggle";
import MinMaxToggle from "@/components/MinMaxToggle";
import TodoSettings from "@/components/TodoSettings";
import SlotManager from "@/components/SlotManager";
import { useSchedule, useSlots } from "@/components/ScheduleProvider";

// 설정 다이얼로그(탭): 일반 · 데이터 · 메인화면(정보/할 일).
export default function SettingsDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const { resetAll, exportState } = useSchedule();
  const { slots, activeId, maxSlots, importToSlot } = useSlots();
  const [confirming, setConfirming] = useState(false);
  // 설정 탭: 일반 / 데이터 / 메인화면
  const [tab, setTab] = useState<"general" | "data" | "main">("general");
  // 가져오기 결과 안내(성공/실패)
  const [importMsg, setImportMsg] = useState<{ ok: boolean; text: string } | null>(
    null,
  );
  // 가져오기 대기: 파일 내용 보관 후 대상 슬롯을 고르게 한다.
  const [pendingImport, setPendingImport] = useState<string | null>(null);

  // 전체 데이터를 JSON 파일로 내려받기(기기 이전·백업용)
  const handleExport = () => {
    const blob = new Blob([exportState()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `stardew-scheduler-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 선택한 JSON 파일을 읽어, 어느 슬롯에 넣을지 고르도록 대기 상태로 둔다.
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // 같은 파일 재선택 허용
    if (!file) return;
    setImportMsg(null);
    const reader = new FileReader();
    reader.onload = () => setPendingImport(String(reader.result));
    reader.onerror = () =>
      setImportMsg({ ok: false, text: t("settings.importError") });
    reader.readAsText(file);
  };

  // 대상 슬롯 확정(targetId=null이면 새 슬롯). 성공/실패 안내 후 대기 해제.
  const doImport = (targetId: string | null) => {
    if (pendingImport == null) return;
    const ok = importToSlot(pendingImport, targetId);
    setImportMsg({
      ok,
      text: ok ? t("settings.importSuccess") : t("settings.importError"),
    });
    setPendingImport(null);
  };

  const slotLabel = (name: string, index: number) =>
    name.trim() || t("slots.slotN", { n: index + 1 });

  // 내보내기 대상 = 현재 활성 슬롯(표기용 이름)
  const activeIndex = slots.findIndex((s) => s.id === activeId);
  const activeSlotName =
    activeIndex >= 0 ? slotLabel(slots[activeIndex].name, activeIndex) : "";

  const tabs: { key: "general" | "data" | "main"; label: string }[] = [
    { key: "general", label: t("settings.tabGeneral") },
    { key: "data", label: t("settings.tabData") },
    { key: "main", label: t("settings.tabMain") },
  ];

  return (
    <Modal title={t("settings.title")} onClose={onClose}>
      {/* 상단 탭(밑줄형): 일반 / 메인화면 */}
      <div className="mb-4 flex flex-wrap gap-1 border-b border-[var(--sv-border)]">
        {tabs.map(({ key, label }) => {
          const isActive = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              aria-pressed={isActive}
              className={`-mb-px border-b-2 px-3 py-1.5 text-base font-semibold ${
                isActive
                  ? "border-[var(--sv-accent)] text-[var(--sv-ink)]"
                  : "border-transparent text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* 일반: 테마(계절) + Min-Max Guide 토글. 오류 보고·건의는 지원 탭으로 이동 */}
      {tab === "general" && (
        <>
          <section className="mb-5">
            <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
              {t("settings.themeTitle")}
            </h3>
            <ThemeToggle />
          </section>
          <section>
            <MinMaxToggle />
          </section>
        </>
      )}

      {/* 데이터: 세이브 슬롯·백업/이전·초기화 */}
      {tab === "data" && (
        <>
          {/* 세이브 슬롯: 같은 기기에서 여러 게임을 슬롯별로 저장·전환 */}
          <section className="mb-5">
            <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
              {t("slots.title")}
            </h3>
            <p className="mb-2 text-xs text-[var(--sv-ink-muted)]">
              {t("slots.hint", { max: maxSlots })}
            </p>
            <SlotManager />
          </section>

          {/* 데이터 백업·이전(내보내기/가져오기 JSON) */}
          <section className="mb-5">
            <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
              {t("settings.dataTitle")}
            </h3>
            <p className="mb-1 text-xs text-[var(--sv-ink-muted)]">
              {t("settings.dataDesc")}
            </p>
            {/* 내보내기 대상이 현재 슬롯임을 명시 */}
            <p className="mb-2 text-xs font-semibold text-[var(--sv-ink)]">
              {t("settings.exportSlotNote", { name: activeSlotName })}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-sm font-semibold hover:bg-[var(--sv-bg)]"
              >
                {t("settings.exportButton")}
              </button>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-sm font-semibold hover:bg-[var(--sv-bg)]">
                {t("settings.importButton")}
                <input
                  type="file"
                  accept="application/json,.json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>

            {/* 가져오기 대상 슬롯 선택(매번 어느 슬롯에 넣을지 고른다) */}
            {pendingImport != null && (
              <div className="mt-3 rounded-lg border border-[var(--sv-accent)] bg-[var(--sv-bg)] p-3">
                <p className="mb-2 text-xs font-semibold">
                  {t("slots.importTitle")}
                </p>
                <div className="flex flex-col gap-1.5">
                  {slots.map((s, i) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => doImport(s.id)}
                      className="rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] px-2.5 py-1.5 text-left text-sm hover:bg-[var(--sv-bg)]"
                    >
                      {t("slots.importOverwrite", {
                        name: slotLabel(s.name, i),
                      })}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => doImport(null)}
                    disabled={slots.length >= maxSlots}
                    className="rounded-md border border-transparent bg-[var(--sv-accent)] px-2.5 py-1.5 text-left text-sm font-semibold text-[var(--sv-accent-ink)] disabled:opacity-40"
                  >
                    {slots.length >= maxSlots
                      ? t("slots.full", { max: maxSlots })
                      : t("slots.importNew")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingImport(null)}
                    className="self-start px-1 py-0.5 text-xs text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
                  >
                    {t("common.cancel")}
                  </button>
                </div>
              </div>
            )}
            {importMsg && (
              <p
                className={`mt-2 text-xs ${
                  importMsg.ok
                    ? "text-[var(--sv-accent)]"
                    : "text-[var(--sv-danger)]"
                }`}
              >
                {importMsg.text}
              </p>
            )}
          </section>

          <section>
            <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
              {t("settings.resetTitle")}
            </h3>
            <p className="mb-2 text-xs text-[var(--sv-ink-muted)]">
              {t("settings.resetDesc")}
            </p>
            {confirming ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {t("settings.resetConfirm")}
                </span>
                <button
                  onClick={() => {
                    resetAll();
                    setConfirming(false);
                    onClose();
                  }}
                  className="rounded-lg bg-[#e23b3b] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#b02a2a]"
                >
                  {t("settings.resetYes")}
                </button>
                <button
                  onClick={() => setConfirming(false)}
                  className="rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-sm hover:bg-[var(--sv-bg)]"
                >
                  {t("settings.resetNo")}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirming(true)}
                className="rounded-lg border border-[#e23b3b] px-3 py-1.5 text-sm font-semibold text-[#e23b3b] hover:bg-[#fbeaea]"
              >
                {t("settings.resetButton")}
              </button>
            )}
          </section>
        </>
      )}

      {/* 메인화면: 표시 항목·순서 설정(정보/할 일)을 인라인으로 표시 */}
      {tab === "main" && <TodoSettings />}
    </Modal>
  );
}
