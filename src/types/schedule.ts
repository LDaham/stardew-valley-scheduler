import type { Season } from "@/lib/calendar";
import type { EventFilters } from "@/lib/events";
import type { ReminderId } from "@/data/reminders";
import type { MemoCategory } from "@/lib/todoOrder";
import type { Fertilizer } from "@/lib/growth";

// 씨앗 심기 선택지 기본값(다음 심기에도 재사용되도록 영속).
// 작물 재배 단계별 생성 여부(다음 심기에도 재사용되도록 영속).
export interface SeedDefaults {
  fertilizer: Fertilizer;
  plant: boolean; // 심기 할 일 생성(끄면 이미 심은 것으로 보고 다음 단계부터)
  watering: boolean; // 물주기 생성
  harvest: boolean; // 수확 생성
  eatFood: boolean; // 수확일 음식 먹기 생성
}

// 캐릭터 정보(씨앗 효율 품질·성장 계산에 사용). 효율 팝업 밖에서 입력·영속.
export interface CharacterInfo {
  farmingLevel: number; // 0~14
  foragingLevel: number; // 0~14 (야생 씨앗 품질)
  tiller: boolean; // 경작인: 원물 판매가 +10%
  // 농사 10레벨 전문직(상호 배타): 농업 전문가 또는 장인 중 하나만 선택
  agriculturist: boolean; // 농업 전문가: 성장 속도 +10%
  artisan: boolean; // 장인: 가공물(술통·절임통) 가치 +40%
  gatherer: boolean; // 채집가: 야생 씨앗 수확량 +20%
  botanist: boolean; // 식물학자: 야생 씨앗 항상 이리듐 품질
}

// 완료 시 후속 할 일을 생성하는 체인 메타데이터(텍스트는 생성 시점에 미리 구워 둠).
// - tool: 도구 업그레이드 완료 → 수령 생성
// - machine: 장비 사용 완료 → 수령 생성 / 수령 완료 → (반복 시) 사용 재생성
// - fruitPlant: 묘목 심기 완료 → 수확 일정 생성
export type MemoChain =
  | { kind: "tool"; pickupText: string }
  | {
      kind: "machine";
      role: "use" | "receive";
      useText: string;
      receiveText: string;
      days: number;
      repeat: boolean;
    }
  | { kind: "fruitPlant"; harvestText: string; repeatYearly: boolean }
  // 작물 생명주기 순차 체인: 씨앗 심기 → 물주기 ×K → 수확(+음식).
  // 상위 단계를 완료해야 하위 단계가 생성된다(미완료는 미루기로 그날 계속 표시).
  // stage=plant: 완료 시 물주기 #1(remaining=K) 당일 생성(noWatering이면 수확을 +K일에 생성).
  // stage=water: 완료 시 remaining-1>0이면 다음 물주기를 다음 날, 0이면 수확을 다음 날 생성.
  // stage=regrow: 재수확 작물의 수확. 완료 시 다음 재성장 물주기(remaining=regrowDays)를 다음 날 생성(반복).
  | {
      kind: "crop";
      stage: "plant" | "water" | "regrow";
      cropId: string;
      remaining: number; // 남은 물주기 수(plant 단계에선 총 K)
      noWatering: boolean;
      harvest: boolean; // 수확 메모 생성 여부(끄면 마지막 물주기 후 종료)
      eatFood: boolean;
      waterText: string;
      harvestText: string;
      eatFoodText: string;
    };

// 순환 메모 1건. (계절,일)에 귀속되어 매 순환마다 반복 표시된다.
export interface Memo {
  id: string;
  season: Season;
  day: number;
  text: string;
  done: boolean;
  // 사전 대비 알림: 해당 일수 전부터 대시보드에 미리 표시 (0이면 당일만)
  reminderDaysBefore: number;
  // 할 일 추가 출처(수확/도구/장비). 순서 정렬에 사용. 없으면 일반 메모.
  category?: MemoCategory;
  // 씨앗 심기에서 생성된 메모의 작물 id(아이콘 표시·관련 메모 일괄 삭제에 사용).
  cropId?: string;
  // 도구 업그레이드 메모의 도구 id(기본 도구 아이콘 표시에 사용). axe/pickaxe/hoe/wateringCan/trashCan.
  toolId?: string;
  // 장비 사용 메모의 장비 id(장비 아이콘 표시에 사용). 예: keg, crystalarium.
  machineId?: string;
  // 한 번의 씨앗 심기로 파생된 메모 묶음 id(같은 작물을 다른 날 심으면 구분).
  groupId?: string;
  // 온실에서 심음(계절 만료 없음 — 작물/과일 수확 메모가 사라지지 않는다).
  greenhouse?: boolean;
  // 특정 연도에만 표시할 메모(과일나무 연차별 수확). 없으면 매년 순환 표시.
  year?: number;
  // 과일 수확 메모의 '매년 반복' 여부(연도 이동 시 그 해 배치 자동 보충 대상 표시).
  repeatYearly?: boolean;
  // 작물 생명주기 메모의 수확 마감(yearDay). 비온실에서 이 날을 넘기면 통째로 소멸.
  deadlineYearDay?: number;
  // 완료 시 후속 할 일을 생성하는 체인. spawned=이미 생성 완료(재체크 시 중복 방지).
  chain?: MemoChain;
  spawned?: boolean;
  createdAt: number;
}

// localStorage에 저장되는 전체 스케줄 상태
export interface ScheduleState {
  version: number;
  currentDay: number; // 1..112 (계절 내 절대 일수, 순환)
  year: number; // 1부터 시작. winter 28→spring 1 넘어가면 +1, 역방향 -1
  memos: Memo[];
  eventFilters: EventFilters; // 이벤트 타입별 표시 여부
  reminderToggles: Record<ReminderId, boolean>; // 리마인더별 on/off
  // 이벤트·리마인더 완료 체크 상태. 키: `${yearDay}:${itemKey}` (날짜별로 구분되어 날이 바뀌면 초기화)
  taskDone: Record<string, boolean>;
  // To Do List 표시 순서(엔트리 키 배열). 비면 기본 순서 사용.
  todoOrder: string[];
  // 비 예보. 키=yearDay, 값=true면 그날 비 → 물주기 숨김.
  rainDays: Record<string, boolean>;
  // 마을회관 번들 품목 기증 여부. 키=`${bundleId}:${itemId}`.
  bundleItemsDone: Record<string, boolean>;
  // 꾸러미 추적 모드: 표준(고정) / 리믹스(무작위).
  bundleMode: BundleMode;
  // 리믹스 무작위 슬롯에서 사용자가 선택한 꾸러미 id 목록. 키=슬롯 id.
  remixChoices: Record<string, string[]>;
  // 씨앗 심기 선택지 기본값(비료·물주기·음식·재파종).
  seedDefaults: SeedDefaults;
  // 완벽 추적 체크 상태. 키=`${catId}:${itemId}`.
  perfectionChecks: Record<string, boolean>;
  // 완벽 추적 카운터(운송·황금 호두). 키=catId.
  perfectionCounts: Record<string, number>;
  // 할 일 추가 상세 옵션: 숨긴 항목. 키=`menu:<id>`/`machine:<id>`/`building:<id>`/`fruit:<id>`, 값=true면 숨김.
  hiddenItems: Record<string, boolean>;
  // 할 일 추가 메뉴 표시 순서(상위 항목 키 배열).
  addTaskOrder: string[];
  // 할 일 추가 하위 항목 순서. 키=상위 메뉴 키(artisanMachine/refiningMachine/build/fruit), 값=자식 id 배열.
  addTaskChildOrder: Record<string, string[]>;
  // 달성한 업적. 키=업적 id.
  achievementsDone: Record<string, boolean>;
  // 캐릭터 정보(농사/채집 레벨·스킬). 씨앗 효율 계산에 사용.
  character: CharacterInfo;
  // 다이얼로그 필터(꾸러미·완벽·업적·생선·씨앗 효율)의 마지막 선택값. 다시 열 때 복원.
  dialogFilters: DialogFilters;
  // 메인 화면 상단 꾸러미 추적 박스 표시 여부(스케줄러 설정 "메인" 섹션의 "꾸러미 추적" 토글).
  bundleTrackerShown: boolean;
  // 메인 화면 상단 가게 일정 박스 표시 여부(정보-가게 일정 탭에서 고정한 일정 표시).
  shopScheduleShown: boolean;
  // 메인 화면 상단 비 생선 박스 표시 여부(비 예보가 있는 날 그 계절의 비 전용 생선 표시).
  rainFishShown: boolean;
  // 메인 상단 박스 표시 순서. 값: "shopSchedule" | "bundleTracker" | "rainFish".
  mainOrder: string[];
  // 메인 메모장 텍스트(할 일 목록 오른쪽). 자유 입력 메모.
  notepadText: string;
}

export type BundleMode = "standard" | "remix";

// 다이얼로그별 필터/선택값(영속). 계절 토큰·가공 유형 등은 string으로 저장해 컴포넌트에서 캐스팅.
// 계절 필터는 undefined면 '이번 계절 + 상시' 기본값을 사용한다.
export interface DialogFilters {
  bundleSeasons?: string[];
  bundleIncompleteFirst: boolean;
  fishSeasons?: string[];
  fishWeather?: string[]; // 생선 날씨 필터(없으면 전체). 값: "any" | "sun" | "rain"
  fishType?: string[]; // 생선 유형 필터(없으면 전체). 값: "rodNormal" | "rodLegendary" | "crabpot"
  perfectionIncompleteFirst: boolean;
  achievementIncompleteFirst: boolean;
  seedCrossSeason: boolean;
  seedFertilizer: string;
  seedProduce: string;
  seedFood: string;
  seedSeason?: string; // 작물 효율 계절 필터(없으면 현재 계절)
  trackerSeasons?: string[]; // 꾸러미 추적의 계절 필터(없으면 현재 계절+상시)
  trackerOnlyIncomplete: boolean; // 꾸러미 추적에서 완료되지 않은 물품만 보기
  trackerGrouped: boolean; // 꾸러미 단위 박스로 묶어서 보기(끄면 물품만 평면 표시)
  shopKeyApplied: boolean; // 가게 일정: 마을의 열쇠 적용
  shopCcRestored: boolean; // 가게 일정: 마을회관 복구
  shopFestivalOn: boolean; // 가게 일정 탭 전용: 축제날 가정(메인 박스는 당일 날짜로 자동 판정)
  shopBoatRepaired: boolean; // 가게 일정: 진저섬 배 수리(생선 가게 8시 개점)
  shopPinned: string[]; // 가게 일정: 고정(핀)된 가게 id 목록(우선 표시)
}
