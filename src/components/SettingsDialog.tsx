"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useSchedule } from "@/components/ScheduleProvider";

// 설정 다이얼로그. 언어 전환 · min/max 모드 · 초기화.
export default function SettingsDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const { resetAll, minMaxMode, setMinMaxMode } = useSchedule();
  const [confirming, setConfirming] = useState(false);

  return (
    <Modal title={t("settings.title")} onClose={onClose}>
      {/* 언어 전환 */}
      <section className="mb-5">
        <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
          {t("settings.language")}
        </h3>
        <LocaleSwitcher />
      </section>

      {/* min/max 스케줄 전환 */}
      <section className="mb-5">
        <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
          {t("settings.minMaxMode")}
        </h3>
        <label className="flex cursor-pointer items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={minMaxMode}
            onChange={(e) => setMinMaxMode(e.target.checked)}
            className="mt-0.5 size-4 accent-[var(--sv-accent)]"
          />
          <span>
            {t("settings.minMaxModeLabel")}
            <span className="block text-xs text-[var(--sv-ink-muted)]">
              {t("settings.minMaxModeNote")}
            </span>
          </span>
        </label>
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
