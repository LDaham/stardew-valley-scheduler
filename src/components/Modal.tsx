"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

// 열린 모달 수(중첩 시 마지막 닫힐 때 스크롤 복원)
let modalOpenCount = 0;
let savedBodyOverflow = "";

// 모달 렌더 모드. "overlay"=기존 팝업, "inline"=페이지에 끼워 넣는 패널(오버레이·닫기 없음).
// 섹션 페이지에서 <ModalModeContext.Provider value="inline">로 감싸면 그 안의 Modal들이
// 자동으로 인라인 렌더된다(각 다이얼로그 코드를 고치지 않아도 됨).
export const ModalModeContext = createContext<"overlay" | "inline">("overlay");

// 설정류 다이얼로그 공용 모달: 오버레이·ESC 닫기·헤더(제목+닫기)·배경 스크롤 잠금 제공.
export default function Modal({
  title,
  onClose,
  onBack,
  titleIcon,
  titleAfter,
  maxWidthClass = "max-w-3xl",
  center = false,
  children,
}: {
  title: string;
  onClose: () => void;
  onBack?: () => void; // 있으면 좌상단에 '이전'(허브 복귀) 버튼 표시
  titleIcon?: ReactNode; // 제목 왼쪽에 붙는 아이콘(주민·가게 등)
  titleAfter?: ReactNode; // 제목 오른쪽에 붙는 보조 컨트롤(예: 표시 토글)
  maxWidthClass?: string; // 모달 최대 너비(기본 max-w-3xl, 확인창 등은 더 좁게)
  center?: boolean; // 세로 중앙 정렬(기본은 상단 고정). 중첩 확인창 등에서 사용
  children: ReactNode;
}) {
  const t = useTranslations();
  const inline = useContext(ModalModeContext) === "inline";
  // 오버레이에서 "눌러서 시작"한 클릭만 닫기로 처리.
  // (입력값 드래그 중 창 밖에서 마우스를 떼도 닫히지 않도록)
  const pressedOnBackdrop = useRef(false);

  useEffect(() => {
    if (inline) return; // 인라인은 ESC 닫기 없음
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, inline]);

  // 모달 열려 있는 동안 배경(외부) 스크롤 잠금. 모달 중첩도 안전하게 처리.
  useEffect(() => {
    if (inline) return; // 인라인은 페이지 흐름이라 스크롤 잠금 안 함
    if (modalOpenCount === 0) {
      savedBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    modalOpenCount += 1;
    return () => {
      modalOpenCount -= 1;
      if (modalOpenCount === 0) document.body.style.overflow = savedBodyOverflow;
    };
  }, [inline]);

  // 인라인: 오버레이·닫기 없이 패널로 렌더. 내부 중첩 모달은 다시 overlay로(컨텍스트 리셋).
  if (inline) {
    return (
      <ModalModeContext.Provider value="overlay">
        <section className="sv-panel p-5" aria-label={title}>
          <div className="mb-4 flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                aria-label={t("info.back")}
                className="-ml-1 shrink-0 px-1 text-3xl leading-none text-[var(--sv-ink-muted)] hover:text-[var(--sv-ink)]"
              >
                ‹
              </button>
            )}
            {titleIcon && <div className="shrink-0">{titleIcon}</div>}
            <h2 className="truncate text-lg font-bold">{title}</h2>
            {titleAfter && <div className="shrink-0">{titleAfter}</div>}
          </div>
          {children}
        </section>
      </ModalModeContext.Provider>
    );
  }

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
            {titleIcon && <div className="shrink-0">{titleIcon}</div>}
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
