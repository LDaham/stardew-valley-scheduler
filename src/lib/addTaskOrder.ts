// 할 일 추가(AddTask) 메뉴의 표시 순서 + 하위 항목(장비·건물·과일나무) 순서 정의.
// 스케줄러 설정처럼 사용자가 상세 옵션에서 드래그로 순서를 바꿀 수 있다.

import { MACHINES } from "@/data/machines";
import { BUILDINGS } from "@/data/buildings";
import { FRUIT_TREES } from "@/data/fruitTrees";

// 상위 메뉴 기본 순서(= 할 일 추가에서 보여지는 순서).
// 물고기 연못 확인·정동석/박물관·채굴·낚시는 제외됨.
export const DEFAULT_ADD_TASK_ORDER: string[] = [
  "seed", // 씨앗 심기
  "fruit", // 과일 수확하기(과일나무 묘목 심기)
  "artisanMachine", // 장인 장비 사용
  "tool", // 도구 업그레이드
  "build", // 건물 건설
  "refiningMachine", // 정제 장비 사용
];

// 하위 항목(트리)을 가진 상위 메뉴 정의. hiddenPrefix는 hiddenItems 키 접두사.
export interface ChildGroup {
  parent: string;
  hiddenPrefix: string; // hiddenItems[`${hiddenPrefix}:${id}`]
  defaultIds: string[]; // 기본 자식 순서(데이터 순)
  icon: (id: string) => string;
  labelKey: (id: string) => string; // i18n 키
}

export const ADD_TASK_CHILDREN: Record<string, ChildGroup> = {
  artisanMachine: {
    parent: "artisanMachine",
    hiddenPrefix: "machine",
    defaultIds: MACHINES.filter((m) => m.category === "artisan").map((m) => m.id),
    icon: (id) => `/icons/machines/${id}.png`,
    labelKey: (id) => `machines.${id}`,
  },
  refiningMachine: {
    parent: "refiningMachine",
    hiddenPrefix: "machine",
    defaultIds: MACHINES.filter((m) => m.category === "refining").map((m) => m.id),
    icon: (id) => `/icons/machines/${id}.png`,
    labelKey: (id) => `machines.${id}`,
  },
  build: {
    parent: "build",
    hiddenPrefix: "building",
    defaultIds: BUILDINGS.map((b) => b.id),
    icon: (id) => `/icons/buildings/${id}.png`,
    labelKey: (id) => `buildings.${id}`,
  },
  fruit: {
    parent: "fruit",
    hiddenPrefix: "fruit",
    defaultIds: FRUIT_TREES.map((f) => f.id),
    icon: (id) => `/icons/fruitTrees/${id}.png`,
    labelKey: (id) => `fruitTrees.${id}`,
  },
};

// 저장된 상위 순서를 현재 항목 집합에 맞춰 정리(집합이 다르면 기본값으로 초기화).
export function reconcileAddTaskOrder(saved?: string[]): string[] {
  if (!saved) return [...DEFAULT_ADD_TASK_ORDER];
  const def = new Set(DEFAULT_ADD_TASK_ORDER);
  const sv = new Set(saved);
  if (sv.size !== def.size || [...def].some((k) => !sv.has(k))) {
    return [...DEFAULT_ADD_TASK_ORDER];
  }
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of saved)
    if (def.has(k) && !seen.has(k)) {
      out.push(k);
      seen.add(k);
    }
  for (const k of DEFAULT_ADD_TASK_ORDER) if (!seen.has(k)) out.push(k);
  return out;
}

// 특정 그룹의 저장된 자식 순서를 기본 집합에 맞춰 정리.
export function reconcileChildOrder(parent: string, saved?: string[]): string[] {
  const group = ADD_TASK_CHILDREN[parent];
  if (!group) return [];
  if (!saved) return [...group.defaultIds];
  const def = new Set(group.defaultIds);
  const sv = new Set(saved);
  if (sv.size !== def.size || [...def].some((k) => !sv.has(k))) {
    return [...group.defaultIds];
  }
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of saved)
    if (def.has(k) && !seen.has(k)) {
      out.push(k);
      seen.add(k);
    }
  for (const k of group.defaultIds) if (!seen.has(k)) out.push(k);
  return out;
}

// ids를 order 순서로 정렬(order에 없는 건 뒤로).
export function orderBy<T>(items: T[], idOf: (t: T) => string, order: string[]): T[] {
  const rank = (id: string) => {
    const i = order.indexOf(id);
    return i < 0 ? Number.MAX_SAFE_INTEGER : i;
  };
  return [...items].sort((a, b) => rank(idOf(a)) - rank(idOf(b)));
}
