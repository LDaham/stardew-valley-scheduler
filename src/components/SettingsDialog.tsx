"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import FeedbackForm from "@/components/FeedbackForm";
import TodoSettings from "@/components/TodoSettings";
import { useSchedule } from "@/components/ScheduleProvider";

// 설정 다이얼로그(탭): 일반 · 메인화면(정보/할 일) · 오류 보고.
export default function SettingsDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const { resetAll, exportState, importState } = useSchedule();
  const [confirming, setConfirming] = useState(false);
  // 설정 탭: 일반 / 메인화면 / 오류 보고
  const [tab, setTab] = useState<"general" | "main" | "feedback">("general");
  // 가져오기 결과 안내(성공/실패)
  const [importMsg, setImportMsg] = useState<{ ok: boolean; text: string } | null>(
    null,
  );

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

  // 선택한 JSON 파일을 읽어 상태로 불러오기
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // 같은 파일 재선택 허용
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const ok = importState(String(reader.result));
      setImportMsg({
        ok,
        text: ok ? t("settings.importSuccess") : t("settings.importError"),
      });
    };
    reader.onerror = () =>
      setImportMsg({ ok: false, text: t("settings.importError") });
    reader.readAsText(file);
  };

  const tabs: { key: "general" | "main" | "feedback"; label: string }[] = [
    { key: "general", label: t("settings.tabGeneral") },
    { key: "main", label: t("settings.tabMain") },
    { key: "feedback", label: t("settings.tabFeedback") },
  ];

  return (
    <Modal title={t("settings.title")} onClose={onClose}>
      {/* 상단 탭(밑줄형): 일반 / 메인화면 / 오류 보고 */}
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

      {/* 일반: 테마·언어·데이터 백업·초기화 */}
      {tab === "general" && (
        <>
          <section className="mb-5">
            <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
              {t("settings.themeTitle")}
            </h3>
            <ThemeToggle />
          </section>

          <section className="mb-5">
            <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
              {t("settings.language")}
            </h3>
            <LocaleSwitcher />
          </section>

          {/* 데이터 백업·이전(내보내기/가져오기 JSON) */}
          <section className="mb-5">
            <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
              {t("settings.dataTitle")}
            </h3>
            <p className="mb-2 text-xs text-[var(--sv-ink-muted)]">
              {t("settings.dataDesc")}
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

      {/* 오류 보고·아이디어 제시 */}
      {tab === "feedback" && <FeedbackForm />}
    </Modal>
  );
}
