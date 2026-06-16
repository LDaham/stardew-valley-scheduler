"use client";

import { useState } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string; // asset 경로 (없으면 빈 공간)
}

// 옵션마다 이미지를 표시하는 커스텀 드롭다운.
// 모달의 overflow 클리핑을 피하려고 펼침 목록은 absolute가 아닌 일반 흐름으로 둔다.
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
  const current = options.find((o) => o.value === value);

  return (
    <div>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-lg border border-[var(--sv-border)] bg-white px-2 py-2 text-sm"
      >
        {current?.icon && <OptIcon src={current.icon} />}
        <span className="flex-1 text-left">{current?.label}</span>
        <span className="text-xs text-[var(--sv-ink-muted)]">
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="mt-1 max-h-56 overflow-y-auto rounded-lg border border-[var(--sv-border)] bg-[var(--sv-panel)]"
        >
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-2 py-2 text-left text-sm hover:bg-[var(--sv-bg)] ${
                  o.value === value ? "bg-[var(--sv-bg)]" : ""
                }`}
              >
                {o.icon ? <OptIcon src={o.icon} /> : <span className="size-5 shrink-0" />}
                <span>{o.label}</span>
              </button>
            </li>
          ))}
        </ul>
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
