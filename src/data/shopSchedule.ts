// 가게 일정표(표시 순서·상태 데이터). 표시 문자열은 messages의 shopSchedule.* 에 둔다.
// 출처: progress/가게-일정표-정리.md (Stardew Valley Wiki - 가게 일정표, CC BY-NC-SA 3.0)
export type Weekday = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

// 요일 배지 표시 순서(일~토).
export const WEEK_ORDER: Weekday[] = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
];

// festivalClose: 축제날 휴무 정도.
//   all  = 예외 축제 제외 모두 휴무
//   none = 축제 무관(영업)
//   some = 특정 축제에만 휴무(상세는 메시지의 festival 필드)
export type FestivalClose = "all" | "none" | "some";

export interface ShopScheduleEntry {
  id: string;
  hasNote?: boolean;
  hasCheckup?: boolean; // 정기 휴무(검진 등) 날짜가 있는 가게만 true
  keyChanges?: boolean; // 마을의 열쇠로 이용 시간이 달라지는 가게
  festivalClose: FestivalClose;
  // 정기 휴무 요일. 마을회관 복구로 달라지면 before/after를 사용한다.
  closedDays?: Weekday[];
  closedDaysBeforeCC?: Weekday[];
  closedDaysAfterCC?: Weekday[];
  // 마을회관 복구(꾸러미 완료) 후 영구 폐점(조자마트).
  closesAfterCC?: boolean;
}

export const SHOP_SCHEDULE: ShopScheduleEntry[] = [
  {
    id: "pierre",
    keyChanges: true,
    festivalClose: "all",
    closedDaysBeforeCC: ["wed"],
    closedDaysAfterCC: [],
  },
  {
    id: "carpenter",
    hasCheckup: true,
    keyChanges: true,
    festivalClose: "all",
    closedDays: ["tue"],
  },
  {
    id: "blacksmith",
    hasCheckup: true,
    keyChanges: true,
    festivalClose: "all",
    closedDaysBeforeCC: [],
    closedDaysAfterCC: ["fri"],
  },
  {
    id: "fishShop",
    hasNote: true,
    hasCheckup: true,
    festivalClose: "all",
    closedDays: ["sat"],
  },
  {
    id: "ranch",
    hasCheckup: true,
    keyChanges: true,
    festivalClose: "all",
    closedDays: ["mon", "tue"],
  },
  { id: "clinic", hasNote: true, festivalClose: "all", closedDays: ["sat"] },
  {
    id: "saloon",
    hasNote: true,
    hasCheckup: true,
    festivalClose: "all",
    closedDays: [],
  },
  { id: "adventurersGuild", keyChanges: true, festivalClose: "all", closedDays: [] },
  { id: "wizardTower", hasNote: true, keyChanges: true, festivalClose: "some", closedDays: [] },
  {
    id: "travelingCart",
    festivalClose: "none",
    closedDays: ["mon", "tue", "wed", "thu", "sat"],
  },
  {
    id: "joja",
    hasNote: true,
    keyChanges: true,
    festivalClose: "all",
    closedDays: [],
    closesAfterCC: true,
  },
  {
    id: "iceCreamStand",
    hasNote: true,
    hasCheckup: true,
    festivalClose: "none",
    closedDays: ["wed"],
  },
  { id: "movieTheater", festivalClose: "none", closedDays: [] },
  { id: "desertTrader", hasNote: true, festivalClose: "some", closedDays: [] },
  { id: "oasis", hasNote: true, festivalClose: "all", closedDays: [] },
];

// 마을회관 복구 상태에 따른 실제 정기 휴무 요일.
export function resolveClosedDays(
  entry: ShopScheduleEntry,
  ccRestored: boolean,
): Weekday[] {
  if (ccRestored && entry.closedDaysAfterCC) return entry.closedDaysAfterCC;
  if (!ccRestored && entry.closedDaysBeforeCC) return entry.closedDaysBeforeCC;
  return entry.closedDays ?? [];
}
