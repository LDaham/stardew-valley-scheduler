"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

// 설정류 다이얼로그 공용 모달: 오버레이·ESC 닫기·헤더(제목+닫기) 제공.
export default function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const t = useTranslations();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[85vh] w-full max-w-sm overflow-y-auto rounded-xl border border-[var(--sv-border)] bg-[var(--sv-panel)] p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            aria-label={t("gift.close")}
            className="text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
