"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { useSchedule } from "@/components/ScheduleProvider";

// 메인 화면 할 일 목록 오른쪽의 메모장. 자유 텍스트 입력(localStorage 영속).
// 내부 스크롤 없이 내용(엔터 줄 수)에 맞춰 높이가 자동으로 늘어난다.
export default function Notepad() {
  const t = useTranslations();
  const { notepadText, setNotepadText } = useSchedule();
  const ref = useRef<HTMLTextAreaElement>(null);

  // 내용에 맞춰 높이 자동 조절(스크롤 대신 늘어남)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [notepadText]);

  return (
    <div className="flex flex-col">
      <h2 className="mb-2 text-base font-bold">{t("notepad.title")}</h2>
      <textarea
        ref={ref}
        value={notepadText}
        onChange={(e) => setNotepadText(e.target.value)}
        placeholder={t("notepad.placeholder")}
        aria-label={t("notepad.title")}
        rows={1}
        className="min-h-40 w-full resize-none overflow-hidden rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] p-2.5 text-base leading-relaxed outline-none"
      />
    </div>
  );
}
