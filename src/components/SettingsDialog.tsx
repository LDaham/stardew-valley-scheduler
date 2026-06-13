"use client";

import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import LocaleSwitcher from "@/components/LocaleSwitcher";

// 언어 설정 다이얼로그.
export default function SettingsDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();

  return (
    <Modal title={t("settings.title")} onClose={onClose}>
      <section>
        <h3 className="mb-2 text-sm font-semibold text-[var(--sv-ink-muted)]">
          {t("settings.language")}
        </h3>
        <LocaleSwitcher />
      </section>
    </Modal>
  );
}
