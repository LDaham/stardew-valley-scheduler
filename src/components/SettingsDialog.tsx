"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import PixelIcon from "@/components/PixelIcon";
import ThemeToggle from "@/components/ThemeToggle";
import { useSchedule } from "@/components/ScheduleProvider";

// 설정 다이얼로그. 메인화면 설정 진입 · 언어 전환 · 초기화.
export default function SettingsDialog({
  onClose,
  onOpenTodoSettings,
}: {
  onClose: () => void;
  onOpenTodoSettings: () => void;
}) {
  const t = useTranslations();
  const { resetAll } = useSchedule();
  const [confirming, setConfirming] = useState(false);

  return (
    <Modal title={t("settings.title")} onClose={onClose}>
      {/* 메인화면 설정 진입(별도 다이얼로그로 전환). 설정 톤에 맞춘 네비게이션 행. */}
      <section className="mb-5">
        <button
          onClick={onOpenTodoSettings}
          aria-label={t("settings.openTodo")}
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--sv-border)] px-3 py-2 text-left hover:bg-[var(--sv-bg)]"
        >
          <PixelIcon src="/icons/ui/note.png" size={18} />
          <span className="text-sm font-semibold">
            {t("settings.todoSettings")}
          </span>
        </button>
      </section>

      {/* 테마(라이트/다크) */}
      <section className="mb-5">
        <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
          {t("settings.themeTitle")}
        </h3>
        <ThemeToggle />
      </section>

      {/* 언어 전환 */}
      <section className="mb-5">
        <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
          {t("settings.language")}
        </h3>
        <LocaleSwitcher />
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
    </Modal>
  );
}
