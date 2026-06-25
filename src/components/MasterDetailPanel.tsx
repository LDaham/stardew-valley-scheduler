"use client";

import { useState, type ReactNode } from "react";
import { useLocale } from "next-intl";

// 검색 정규화: 발음부호 제거(NFD 분해 후 결합문자 strip) + 로케일 소문자.
// 악센트 라틴어(é·ñ·ü 등)는 부호 없이 입력해도 매칭되고, 터키어 I/İ도 로케일 규칙을 따른다.
function normalizeSearch(s: string, locale: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase(locale);
}

// 좌측 목록 + 우측 상세를 동시에 보여주는 공용 레이아웃.
// 선물 선호·영화 선호·구매 가격처럼 "많은 항목 중 하나를 골라 상세를 본다"에 사용.
// 모바일(<sm): 검색 드롭다운(선택값 버튼 → 펼치면 검색+목록) → 아래 상세.
// 데스크톱(≥sm): 좌측 세로 목록(검색 포함) + 우측 상세.
export default function MasterDetailPanel<T>({
  items,
  getId,
  getSearchText,
  renderItem,
  renderDetail,
  searchPlaceholder,
}: {
  items: T[];
  getId: (item: T) => string;
  getSearchText: (item: T) => string; // 검색 매칭용 텍스트(보통 표시명)
  renderItem: (item: T, selected: boolean) => ReactNode; // 목록 버튼 내부(아이콘+이름 등)
  renderDetail: (item: T) => ReactNode; // 우측 상세
  searchPlaceholder: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(
    items[0] ? getId(items[0]) : null,
  );
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false); // 모바일 드롭다운 펼침 여부
  const locale = useLocale();
  const query = normalizeSearch(q.trim(), locale);
  const filtered = query
    ? items.filter((it) =>
        normalizeSearch(getSearchText(it), locale).includes(query),
      )
    : items;
  // 검색으로 목록에서 빠져도 선택 항목은 유지(상세는 계속 표시)
  const selected =
    items.find((it) => getId(it) === selectedId) ?? items[0] ?? null;

  const isOn = (it: T) => selected != null && getId(selected) === getId(it);

  // 목록 항목 버튼(모바일 드롭다운·데스크톱 목록 공용)
  const itemButton = (it: T, onPick: (id: string) => void) => {
    const on = isOn(it);
    return (
      <button
        key={getId(it)}
        onClick={() => onPick(getId(it))}
        aria-current={on ? "true" : undefined}
        className={`flex w-full cursor-pointer items-center gap-2 rounded-md border px-2.5 py-2 text-left text-sm ${
          on
            ? "border-transparent bg-[var(--sv-accent)] text-[var(--sv-accent-ink)]"
            : "border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink)] hover:bg-[var(--sv-bg)]"
        }`}
      >
        {renderItem(it, on)}
      </button>
    );
  };

  const searchInput = (cls: string) => (
    <input
      value={q}
      onChange={(e) => setQ(e.target.value)}
      placeholder={searchPlaceholder}
      className={`w-full rounded-md border border-[var(--sv-border)] bg-[var(--sv-bg)] px-2.5 py-1.5 text-sm outline-none focus:border-[var(--sv-accent)] ${cls}`}
    />
  );

  return (
    <div className="sm:grid sm:grid-cols-[200px_1fr] sm:gap-4">
      {/* 목록(좌) */}
      <div className="mb-4 sm:mb-0">
        {/* 모바일: 검색 드롭다운 */}
        <div className="sm:hidden">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex w-full cursor-pointer items-center gap-2 rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] px-2.5 py-2 text-left text-sm"
          >
            {selected && renderItem(selected, false)}
            <span className="ml-auto shrink-0 text-xs text-[var(--sv-ink-muted)]">
              {open ? "▲" : "▼"}
            </span>
          </button>
          {open && (
            <div className="mt-1.5 rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] p-1.5">
              {searchInput("mb-1.5")}
              <ul className="flex max-h-64 flex-col gap-1 overflow-y-auto">
                {filtered.map((it) => (
                  <li key={getId(it)}>
                    {itemButton(it, (id) => {
                      setSelectedId(id);
                      setOpen(false);
                    })}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 데스크톱: 검색 + 세로 목록 */}
        <div className="hidden sm:block">
          {searchInput("mb-2")}
          <ul className="flex max-h-[460px] flex-col gap-1 overflow-y-auto">
            {filtered.map((it) => (
              <li key={getId(it)}>{itemButton(it, setSelectedId)}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 상세(우) */}
      <div className="min-w-0">{selected && renderDetail(selected)}</div>
    </div>
  );
}
