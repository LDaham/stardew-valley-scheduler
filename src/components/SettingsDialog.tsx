"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import { useSchedule } from "@/components/ScheduleProvider";

// 설정 다이얼로그. (언어 설정은 현재 비활성화 — 한글만 사용)
export default function SettingsDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  const { resetAll } = useSchedule();
  const [confirming, setConfirming] = useState(false);

  return (
    <Modal title={t("settings.title")} onClose={onClose}>
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
