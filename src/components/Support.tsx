"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";

// 후원 링크(비영리·광고 없음, 후원 기반 운영). 네비/푸터에서 공용으로 쓰며 자체 모달을 띄운다.
// 기본값은 운영 계정 주소. 다른 계정으로 배포하려면 환경변수로 덮어쓴다.
const PAYPAL_URL =
  process.env.NEXT_PUBLIC_PAYPAL_URL || "https://paypal.me/LDaham";
const BMC_URL =
  process.env.NEXT_PUBLIC_BMC_URL || "https://www.buymeacoffee.com/";

export default function Support({ variant }: { variant: "nav" | "footer" }) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  const trigger =
    variant === "nav" ? (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("support.title")}
        className="-mb-0.5 flex items-center gap-1.5 border-b-2 border-transparent px-2.5 py-2.5 text-[15px] font-semibold text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)] sm:px-3"
      >
        <PixelIcon src="/icons/gifts/Coffee.png" size={18} /> {t("support.title")}
      </button>
    ) : (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="underline hover:text-[var(--sv-ink)]"
      >
        {t("support.title")}
      </button>
    );

  return (
    <>
      {trigger}
      {open && (
        <Modal title={t("support.title")} onClose={() => setOpen(false)}>
          <p className="mb-3 text-sm text-[var(--sv-ink-muted)]">
            {t("support.intro")}
          </p>
          <div className="flex flex-col gap-2">
            <a
              href={PAYPAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--sv-border)] px-3 py-2 text-sm font-semibold hover:bg-[var(--sv-bg)]"
            >
              PayPal
            </a>
            <a
              href={BMC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--sv-border)] px-3 py-2 text-sm font-semibold hover:bg-[var(--sv-bg)]"
            >
              <PixelIcon src="/icons/gifts/Coffee.png" size={16} /> Buy Me a Coffee
            </a>
          </div>
          <p className="mt-3 text-xs text-[var(--sv-ink-muted)]">
            {t("support.note")}
          </p>
        </Modal>
      )}
    </>
  );
}
