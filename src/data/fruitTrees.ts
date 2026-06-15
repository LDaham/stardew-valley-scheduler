// 과일나무 정의 — 수확 리마인더(성숙 후 N일마다) 계산용. 표시명은 i18n 키로 분리.
// 출처: progress/과일나무 위키. 묘목을 심으면 28일 후 성숙, 이후 해당 계절 동안
// 매일 과일 1개 생산(최대 3개까지 누적) → 본 앱은 3일마다 수확 알림으로 처리한다.

import type { Season } from "@/lib/calendar";

export interface FruitTreeDef {
  id: string; // i18n fruitTrees.<id> / 아이콘 /icons/fruitTrees/<id>.png
  season: Season; // 열매를 맺는 계절(비온실)
}

// 묘목 심은 뒤 성숙까지 일수
export const FRUIT_TREE_MATURE_DAYS = 28;
// 수확 알림 주기(나무는 최대 3개까지 과일을 보관하므로 3일마다 알림)
export const FRUIT_HARVEST_INTERVAL = 3;

export const FRUIT_TREES: FruitTreeDef[] = [
  { id: "apricot", season: "spring" },
  { id: "cherry", season: "spring" },
  { id: "banana", season: "summer" },
  { id: "mango", season: "summer" },
  { id: "peach", season: "summer" },
  { id: "orange", season: "summer" },
  { id: "apple", season: "fall" },
  { id: "pomegranate", season: "fall" },
];
