// To Do List 표시 순서 엔트리 정의.
// 항목 단위: 이벤트 타입(3) + 리마인더(전체) + 사용자 메모 카테고리(수확·도구·장비).
// 사용자가 할 일 목록 설정에서 이 엔트리들의 순서를 바꾼다.

import { REMINDERS } from "@/data/reminders";

export type TodoEntryKind = "event" | "reminder" | "memo";

export interface TodoEntry {
  key: string; // 정렬 키 (예: "event:festival", "reminder:watering", "memo:harvest")
  kind: TodoEntryKind;
  ref: string; // 이벤트 타입 / 리마인더 id / 메모 카테고리
}

export const EVENT_TYPES = ["festival", "birthday", "cropDeadline", "foraging"] as const;
// harvest=작물 수확, watering=작물별 물주기(사용자 추가), tool=도구 업그레이드,
// machine=장인 제작품, build=농장 건물 건설·농가 업그레이드, misc=정동석 깨기·박물관 기증,
// eatFood=수확일 음식 먹기(품질 버프), fruit=과일나무 수확, mining=채굴, fishing=낚시
export const MEMO_CATEGORIES = ["plant", "harvest", "watering", "fruit", "machine", "mining", "fishing", "misc", "eatFood"] as const;
// 설정·순서에 노출되는 카테고리(토글/정렬 대상)
export type VisibleMemoCategory = (typeof MEMO_CATEGORIES)[number];
// 도구 업그레이드·건물 건설 기능은 제거됨. 기존에 추가해 둔 메모(레거시)만 표시 호환을 위해 타입에 남긴다.
export type MemoCategory = VisibleMemoCategory | "tool" | "build";

// queenOfSauceRerun은 신규 방영(queenOfSauceNew)의 하위 항목으로 함께 움직이므로
// 별도 순서 엔트리로 노출하지 않는다.
const GROUPED_REMINDERS = new Set(["queenOfSauceRerun"]);

export const TODO_ENTRIES: TodoEntry[] = [
  ...EVENT_TYPES.map((t) => ({ key: `event:${t}`, kind: "event" as const, ref: t })),
  ...REMINDERS.filter((r) => !GROUPED_REMINDERS.has(r.id)).map((r) => ({
    key: `reminder:${r.id}`,
    kind: "reminder" as const,
    ref: r.id,
  })),
  ...MEMO_CATEGORIES.map((c) => ({
    key: `memo:${c}`,
    kind: "memo" as const,
    ref: c,
  })),
];

// 기본 표시 순서(사용자 요청 순서). 정보 항목 → 할 일 항목 순.
// (정보/할 일 구분은 Dashboard가 항목 종류로 판단하고, 각 구역 안에서 이 순서로 정렬한다.)
export const DEFAULT_TODO_ORDER: string[] = [
  // 정보
  "reminder:buySeeds", // 새 계절
  "event:festival", // 축제
  "event:birthday", // 생일(축제 하단, 기본 켜짐)
  "event:cropDeadline", // 작물 심기 마감
  "event:foraging", // 계절 채집 이벤트(새먼베리철 등)
  "reminder:krobusSprinkler", // 이리듐 스프링클러 판매(채집 이벤트 하단, 기본 꺼짐)
  "reminder:travelingCart", // 여행 상인 등장(기본 켜짐)
  "reminder:desertTraderStaircase", // 계단 판매(기본 꺼짐)
  // 할 일
  "reminder:weatherFortune", // 날씨·운세 확인
  "reminder:queenOfSauceNew", // 소스의 여왕(재방송 포함)
  "memo:plant", // 씨앗 심기(물주기·수확·음식 그룹)
  "memo:watering",
  "memo:harvest",
  "memo:eatFood",
  "reminder:animalCare", // 동물 돌보기
  "reminder:forageWeekly", // 채집물 채집(토요일)
  "memo:fruit", // 과일나무 수확
  "memo:machine", // 장인/정제 장비 사용
  "reminder:helpWanted", // 구인 광고 확인
  "reminder:specialOrders", // 특별 주문 게시판 확인
  "reminder:farmCave", // 버섯 동굴 채집
  "reminder:pondCheck", // 물고기 연못 확인
  "reminder:crabPot", // 통발 확인
  "reminder:hardwood", // 단단한 나무 캐기
];

const ENTRY_BY_KEY = new Map(TODO_ENTRIES.map((e) => [e.key, e]));
export function getTodoEntry(key: string): TodoEntry | undefined {
  return ENTRY_BY_KEY.get(key);
}

// 저장된 순서를 현재 엔트리 집합에 맞춰 정리.
// 엔트리 집합이 바뀌면(앱 업데이트로 항목 추가/삭제) 기본 순서로 초기화하고,
// 집합이 동일하면(순수 재정렬) 사용자 순서를 유지한다.
export function reconcileTodoOrder(saved?: string[]): string[] {
  if (!saved) return [...DEFAULT_TODO_ORDER];
  const def = new Set(DEFAULT_TODO_ORDER);
  const sv = new Set(saved);
  if (sv.size !== def.size || [...def].some((k) => !sv.has(k))) {
    return [...DEFAULT_TODO_ORDER];
  }
  const seen = new Set<string>();
  const out: string[] = [];
  for (const k of saved) {
    if (def.has(k) && !seen.has(k)) {
      out.push(k);
      seen.add(k);
    }
  }
  for (const k of DEFAULT_TODO_ORDER) if (!seen.has(k)) out.push(k);
  return out;
}
