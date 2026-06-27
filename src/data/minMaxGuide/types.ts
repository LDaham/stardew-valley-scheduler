// Min-Max 가이드 공통 타입(로케일 무관). 데이터는 ko.ts·en.ts 등 로케일별 파일에 둔다.

import type { Season } from "@/lib/calendar";

// 항목 성격: action(기본·할 일) / tip(팁·요령) / reason(이유) / warn(주의) / result(하루 끝 획득)
export type GuideKind = "tip" | "reason" | "warn" | "result";

// 가이드 노드: 단순 문자열(=action) 또는 { 본문 t, 시간 time, 성격 k, 하위 항목 c }
// k 생략 = action. c가 있으면 접을 수 있는 하위 항목을 가진다.
// time: 좌측 타임라인 거터에 표시할 시간(본문에서 시간을 뺀 경우 명시). 없으면 본문에서 파싱.
export type GuideNode =
  | string
  | { t: string; time?: string; k?: GuideKind; c?: GuideNode[] };

export interface GuideDay {
  notes?: string[]; // 도입 설명 단락
  items: GuideNode[]; // 할 일(중첩 가능)
}

// season → day(1..28) → 항목 / 목표
export type GuideData = Partial<Record<Season, Record<number, GuideDay>>>;
export type GoalsData = Partial<Record<Season, Record<number, GuideNode[]>>>;

// 한 로케일의 가이드 묶음(본문 + 오늘의 목표)
export interface GuideBundle {
  guide: GuideData;
  goals: GoalsData;
}

export interface GuideLookup {
  season: Season; // 실제 표시 항목의 계절
  day: number; // 실제 표시 항목의 일
  exact: boolean; // 대상 날짜와 정확히 일치하는지
  entry: GuideDay;
  goals?: GuideNode[]; // 오늘의 목표(요약)
}
