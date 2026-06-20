"use client";

// 다이얼로그 제목 오른쪽에 붙는 표시 토글(체크박스 + 라벨).
// 메인 화면 박스 표시 여부를 해당 탭에서도 켜고 끌 수 있게 한다(설정 토글과 같은 상태를 공유).
// 체크박스 자체만 토글되도록 라벨 래퍼 대신 div 사용(텍스트 클릭으로 토글 방지).
export default function TitleToggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-normal text-[var(--sv-ink-muted)]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 accent-[var(--sv-accent)]"
      />
      {label}
    </span>
  );
}
