import data from "./category-members.json";

// 카테고리(키)별 소속 아이템 목록. 위키 페이지/하드코딩에서 추출.
export interface CategoryMember {
  ko: string;
  en: string;
  icon: string;
}

const members = data as Record<string, CategoryMember[]>;

export function getCategoryMembers(cat: string): CategoryMember[] {
  return members[cat] ?? [];
}

// 카테고리 칩을 펼쳐 보여줄 항목: 주민의 회피 목록(avoidEn)과
// 칩 자체의 "(… 제외)" 예외를 제거한 결과.
export function expandCategory(
  cat: string,
  detail: string | undefined,
  avoidEn: string[],
): CategoryMember[] {
  const all = getCategoryMembers(cat);
  const avoid = new Set(avoidEn);
  // "제외"가 있을 때만 괄호 안 내용을 예외로 간주
  const paren =
    detail && detail.includes("제외")
      ? (detail.match(/\(([^)]*)\)/)?.[1] ?? "")
      : "";
  // 괄호에 이름이 등장하는 멤버. 단, 더 긴 다른 멤버명의 일부인 경우는
  // 오탐이므로 제외 대상에서 빼준다. (예: "공허의 달걀" 때문에 "달걀"이 걸리는 것 방지)
  const inParen = paren ? all.filter((m) => paren.includes(m.ko)) : [];
  const excludeKo = new Set(
    inParen
      .filter((m) => !inParen.some((o) => o.ko !== m.ko && o.ko.includes(m.ko)))
      .map((m) => m.ko),
  );
  return all.filter((m) => !avoid.has(m.en) && !excludeKo.has(m.ko));
}
