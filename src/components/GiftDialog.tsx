"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import GiftSections from "@/components/GiftSections";

// 생일 이벤트 등에서 어디서든 띄우는 선물 반응 팝업(자체 오버레이).
export default function GiftDialog({
  villagerId,
  onClose,
}: {
  villagerId: string;
  onClose: () => void;
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
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[7.5vh]"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-[var(--sv-border)] bg-[var(--sv-panel)] p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-2 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Image
              src={asset(`/icons/villagers/${villagerId}.png`)}
              alt=""
              width={28}
              height={28}
              unoptimized
              style={{ imageRendering: "pixelated" }}
            />
            {t("gift.prefBy", { name: t(`villagers.${villagerId}`) })}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
            aria-label={t("gift.close")}
          >
            ✕
          </button>
        </div>

        <GiftSections villagerId={villagerId} />
      </div>
    </div>
  );
}
