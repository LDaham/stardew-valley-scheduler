"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

// 열린 모달 수(중첩 시 마지막 닫힐 때 스크롤 복원)
let modalOpenCount = 0;
let savedBodyOverflow = "";

// 설정류 다이얼로그 공용 모달: 오버레이·ESC 닫기·헤더(제목+닫기)·배경 스크롤 잠금 제공.
export default function Modal({
  title,
  onClose,
  onBack,
  titleAfter,
  maxWidthClass = "max-w-3xl",
  center = false,
  children,
}: {
  title: string;
  onClose: () => void;
  onBack?: () => void; // 있으면 좌상단에 '이전'(허브 복귀) 버튼 표시
  titleAfter?: ReactNode; // 제목 오른쪽에 붙는 보조 컨트롤(예: 표시 토글)
  maxWidthClass?: string; // 모달 최대 너비(기본 max-w-3xl, 확인창 등은 더 좁게)
  center?: boolean; // 세로 중앙 정렬(기본은 상단 고정). 중첩 확인창 등에서 사용
  children: ReactNode;
}) {
  const t = useTranslations();
  // 오버레이에서 "눌러서 시작"한 클릭만 닫기로 처리.
  // (입력값 드래그 중 창 밖에서 마우스를 떼도 닫히지 않도록)
  const pressedOnBackdrop = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // 모달 열려 있는 동안 배경(외부) 스크롤 잠금. 모달 중첩도 안전하게 처리.
  useEffect(() => {
    if (modalOpenCount === 0) {
      savedBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    modalOpenCount += 1;
    return () => {
      modalOpenCount -= 1;
      if (modalOpenCount === 0) document.body.style.overflow = savedBodyOverflow;
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center bg-black/40 p-4 ${
        center ? "items-center" : "items-start pt-[7.5vh]"
      }`}
      onMouseDown={(e) => {
        pressedOnBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && pressedOnBackdrop.current) onClose();
      }}
      role="presentation"
    >
      <div
        className={`relative max-h-[85vh] w-full ${maxWidthClass} overflow-y-auto rounded-xl border border-[var(--sv-border)] bg-[var(--sv-panel)] p-5 shadow-xl`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                aria-label={t("info.back")}
                className="-ml-1 shrink-0 px-1 text-3xl leading-none text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
              >
                ‹
              </button>
            )}
            <h2 className="truncate text-lg font-bold">{title}</h2>
            {titleAfter && <div className="shrink-0">{titleAfter}</div>}
          </div>
          <button
            onClick={onClose}
            aria-label={t("gift.close")}
            className="shrink-0 text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
