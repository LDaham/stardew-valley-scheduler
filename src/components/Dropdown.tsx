"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { asset } from "@/lib/asset";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string; // asset 경로 (없으면 빈 공간)
}

// 옵션마다 이미지를 표시하는 커스텀 드롭다운.
// 펼침 목록은 portal + position:fixed로 다른 UI '위에 띄운다'(모달 overflow에 잘리지 않고,
// 아래 요소를 밀어내지 않는다). 트리거 버튼 좌표를 기준으로 위치를 잡는다.
export default function Dropdown({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState<{
    top: number;
    left: number;
    right: number;
    width: number;
    vw: number;
  } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const current = options.find((o) => o.value === value);
  // 아이콘이 하나도 없는 드롭다운(예: 언어 선택)은 아이콘 자리(빈 칸)를 두지 않는다.
  // → 목록이 트리거보다 넓어져 한쪽으로 삐져나오는 현상 방지.
  const hasIcons = options.some((o) => o.icon);

  const toggle = () => {
    if (open) {
      setOpen(false);
      return;
    }
    const r = btnRef.current?.getBoundingClientRect();
    if (r)
      setRect({
        top: r.bottom,
        left: r.left,
        right: r.right,
        width: r.width,
        // 스크롤바를 제외한 폭. position:fixed의 right는 스크롤바를 뺀 영역 기준이라
        // window.innerWidth(스크롤바 포함)를 쓰면 우측 정렬이 그만큼 왼쪽으로 밀린다.
        vw: document.documentElement.clientWidth,
      });
    setOpen(true);
  };

  // 바깥 클릭·스크롤·리사이즈·ESC 시 닫기(떠 있는 목록이므로 좌표가 어긋나지 않도록 스크롤 시 닫음).
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (btnRef.current?.contains(target) || listRef.current?.contains(target))
        return;
      setOpen(false);
    };
    // 목록 내부 스크롤(overflow-y-auto)은 무시 — 외부(페이지·모달) 스크롤만 좌표가 어긋나므로 닫는다.
    const onScroll = (e: Event) => {
      if (
        e.target instanceof Node &&
        listRef.current?.contains(e.target)
      )
        return;
      setOpen(false);
    };
    const onResize = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    // 내용 너비(가장 긴 옵션 폭에 고정): 모든 옵션을 같은 grid 셀에 보이지 않게 겹쳐 쌓으면
    // 셀 너비가 '가장 긴 옵션'으로 잡힌다 → 선택값이 바뀌어도 폭이 출렁이지 않는다(측정 JS 불필요).
    // max-w-full+overflow로 컨테이너를 넘지 않게, 라벨은 truncate로 보호(전체 텍스트는 펼침 목록에서 확인).
    <div className="relative inline-grid max-w-full overflow-hidden align-top">
      {options.map((o) => (
        <span
          key={o.value}
          aria-hidden
          className="invisible col-start-1 row-start-1 flex items-center gap-2 whitespace-nowrap border border-transparent px-2 py-2 text-sm"
        >
          {hasIcons && <span className="size-5 shrink-0" />}
          <span>{o.label}</span>
          <span className="text-xs">▼</span>
        </span>
      ))}
      <button
        ref={btnRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggle}
        className="col-start-1 row-start-1 flex w-full min-w-0 items-center gap-2 rounded-lg border border-[var(--sv-border)] bg-[var(--sv-panel)] px-2 py-2 text-sm"
      >
        {current?.icon ? (
          <OptIcon src={current.icon} />
        ) : hasIcons ? (
          <span className="size-5 shrink-0" />
        ) : null}
        <span className="flex-1 truncate text-left">{current?.label}</span>
        <span className="text-xs text-[var(--sv-ink-muted)]">
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open &&
        rect &&
        createPortal(
          <ul
            ref={listRef}
            role="listbox"
            // 폭: 트리거보다 좁아지지 않게(minWidth) 하되 내용 폭(w-max)으로 펼쳐 항목이 잘리지 않게,
            // 화면 너비는 넘지 않도록 maxWidth로 클램프.
            // 위치: 트리거가 화면 오른쪽 절반에 있으면 우측 기준 정렬해 화면 밖으로 넘치지 않게 한다.
            style={{
              position: "fixed",
              top: rect.top + 4,
              ...(rect.left > rect.vw / 2
                ? { right: Math.max(8, rect.vw - rect.right) }
                : { left: rect.left }),
              minWidth: rect.width,
              maxWidth: "calc(100vw - 16px)",
              zIndex: 60,
            }}
            className="max-h-56 w-max overflow-y-auto rounded-lg border border-[var(--sv-border)] bg-[var(--sv-panel)] shadow-xl"
          >
            {options.map((o) => (
              <li key={o.value} role="option" aria-selected={o.value === value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 whitespace-nowrap px-2 py-2 text-left text-sm hover:bg-[var(--sv-bg)] ${
                    o.value === value ? "bg-[var(--sv-bg)]" : ""
                  }`}
                >
                  {o.icon ? (
                    <OptIcon src={o.icon} />
                  ) : hasIcons ? (
                    <span className="size-5 shrink-0" />
                  ) : null}
                  <span>{o.label}</span>
                </button>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}

function OptIcon({ src }: { src: string }) {
  return (
    <Image
      src={asset(src)}
      alt=""
      width={20}
      height={20}
      unoptimized
      className="shrink-0"
      // 크기 고정(+object-contain): 비정사각형 이미지가 행을 늘리지 않도록
      style={{
        width: 20,
        height: 20,
        objectFit: "contain",
        imageRendering: "pixelated",
      }}
    />
  );
}
