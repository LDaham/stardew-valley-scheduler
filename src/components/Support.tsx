"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";
import { asset } from "@/lib/asset";

// 후원 링크(비영리·광고 없음, 후원 기반 운영). 네비/푸터에서 공용으로 쓰며 자체 모달을 띄운다.
// 기본값은 운영 계정 주소. 다른 계정으로 배포하려면 환경변수로 덮어쓴다.
const PAYPAL_URL =
  process.env.NEXT_PUBLIC_PAYPAL_URL || "https://paypal.me/LDaham";

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
        <PixelIcon src="/icons/gifts/Coffee.png" size={18} />
        <span className="hidden sm:inline">{t("support.title")}</span>
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
          <p className="mb-3 whitespace-pre-line text-sm text-[var(--sv-ink-muted)]">
            {t("support.intro")}
          </p>
          <div className="flex justify-start py-1">
            <a
              href={PAYPAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PayPal"
              className="inline-flex items-center justify-center rounded-lg border border-[var(--sv-border)] px-10 py-3 hover:bg-[var(--sv-bg)]"
            >
              {/* 가로형 워드마크라 높이 기준으로 표시(상하 여백은 버튼 패딩으로 확보) */}
              <img
                src={asset("/icons/ui/paypal.svg")}
                alt="PayPal"
                className="h-6 w-auto"
              />
            </a>
          </div>
          <p className="mt-3 whitespace-pre-line text-xs text-[var(--sv-ink-muted)]">
            {t("support.note")}
          </p>
        </Modal>
      )}
    </>
  );
}
