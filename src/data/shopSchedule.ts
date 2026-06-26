// 가게 일정표(표시 순서·상태 데이터). 표시 문자열은 messages의 shopSchedule.* 에 둔다.
// 출처: progress/가게-일정표-정리.md (Stardew Valley Wiki - 가게 일정표, CC BY-NC-SA 3.0)
import { getWeekday, type SDate, type Season } from "@/lib/calendar";
import { festivalLocksShops } from "@/lib/events";

export type Weekday = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

// 요일 배지 표시 순서(월~일).
export const WEEK_ORDER: Weekday[] = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
];

// festivalClose: 축제날 휴무 정도.
//   all  = 예외 축제 제외 모두 휴무
//   none = 축제 무관(영업)
//   some = 특정 축제에만 휴무(상세는 festivalClosedDates / 메시지의 festival 필드)
export type FestivalClose = "all" | "none" | "some";

// 자정 기준 분(예: 09:30 → 570). 자정 넘김은 1440 초과로 표현(예: 02:00 → 1560).
export interface HourRange {
  open: number;
  close: number;
}
// 특정 날짜 참조(연도 무관, 계절+일).
export interface DateRef {
  season: Season;
  day: number;
}

export interface ShopScheduleEntry {
  id: string;
  hasNote?: boolean;
  hasCheckup?: boolean; // 정기 휴무(검진 등) 날짜가 있는 가게만 true
  keyChanges?: boolean; // 마을의 열쇠로 이용 시간이 달라지는 가게
  boatChanges?: boolean; // 진저섬 배 수리로 개점 시간이 달라지는 가게(생선 가게)
  festivalClose: FestivalClose;
  // 정기 휴무 요일. 마을회관 복구로 달라지면 before/after를 사용한다.
  closedDays?: Weekday[];
  closedDaysBeforeCC?: Weekday[];
  closedDaysAfterCC?: Weekday[];
  // 마을회관 복구(꾸러미 완료) 후 영구 폐점(조자마트).
  closesAfterCC?: boolean;

  // --- 날짜 기반 상태 계산용(메인 박스의 "오늘" 표시) ---
  hours?: HourRange; // 기본 영업시간
  keyHours?: HourRange[]; // 마을 열쇠 적용 시(분할 영업이면 여러 구간)
  boatHours?: HourRange; // 진저섬 배 수리 시(생선 가게)
  weekdayHours?: Partial<Record<Weekday, HourRange>>; // 특정 요일 영업시간 변경
  dateHours?: { date: DateRef; hours: HourRange }[]; // 특정일 영업시간 변경
  closedDates?: DateRef[]; // 특정일 정기 휴무
  openSeasons?: Season[]; // 운영 계절 한정(없으면 연중)
  openIfRainOnly?: Weekday[]; // 그 요일은 비 올 때만 개점(생선 가게 토요일)
  closedIfRain?: boolean; // 비 오는 날 휴무(아이스크림 가판대)
  festivalClosedDates?: DateRef[]; // festivalClose="some"일 때 휴무하는 축제 날짜
}

// 분 헬퍼(가독성)
const hm = (h: number, m = 0): number => h * 60 + m;

export const SHOP_SCHEDULE: ShopScheduleEntry[] = [
  {
    id: "pierre",
    keyChanges: true,
    festivalClose: "all",
    closedDaysBeforeCC: ["wed"],
    closedDaysAfterCC: [],
    hours: { open: hm(9), close: hm(17) },
    keyHours: [
      { open: hm(6), close: hm(7) },
      { open: hm(8, 30), close: hm(17) },
    ], // 오전 6–7시 / 8:30–17시
  },
  {
    id: "carpenter",
    hasNote: true,
    hasCheckup: true,
    keyChanges: true,
    festivalClose: "all",
    closedDays: ["tue"],
    hours: { open: hm(9), close: hm(17) },
    keyHours: [{ open: hm(8, 20), close: hm(17) }],
    weekdayHours: { fri: { open: hm(9), close: hm(16) } }, // 금요일 오후 4시 폐점
    closedDates: [{ season: "summer", day: 18 }], // 여름 18일 정기 휴무
  },
  {
    id: "blacksmith",
    hasCheckup: true,
    keyChanges: true,
    festivalClose: "all",
    closedDaysBeforeCC: [],
    closedDaysAfterCC: ["fri"],
    hours: { open: hm(9), close: hm(16) },
    keyHours: [{ open: hm(6), close: hm(19) }],
    closedDates: [{ season: "winter", day: 16 }], // 겨울 16일 정기 휴무
  },
  {
    id: "fishShop",
    hasNote: true,
    hasCheckup: true,
    boatChanges: true,
    festivalClose: "all",
    closedDays: ["sat"],
    hours: { open: hm(9), close: hm(17) },
    boatHours: { open: hm(8), close: hm(17) }, // 진저섬 배 수리 후 8시 개점
    openIfRainOnly: ["sat"], // 토요일은 비 올 때만 개점
    dateHours: [
      { date: { season: "spring", day: 9 }, hours: { open: hm(9), close: hm(10) } }, // 봄 9일 9–10시만
    ],
  },
  {
    id: "ranch",
    hasCheckup: true,
    keyChanges: true,
    festivalClose: "all",
    closedDays: ["mon", "tue"],
    hours: { open: hm(9), close: hm(16) },
    keyHours: [
      { open: hm(6), close: hm(8, 30) },
      { open: hm(9), close: hm(17) },
    ], // 오전 6–8:30 / 9–17시
    closedDates: [
      { season: "fall", day: 18 },
      { season: "winter", day: 18 },
    ], // 가을 18일 / 겨울 18일 정기 휴무
  },
  {
    id: "saloon",
    hasNote: true,
    festivalClose: "all",
    closedDays: [],
    hours: { open: hm(12), close: hm(24) },
    dateHours: [
      { date: { season: "fall", day: 4 }, hours: { open: hm(16, 30), close: hm(24) } }, // 가을 4일 16:30 개점(정기 휴무 아님)
    ],
  },
  {
    id: "adventurersGuild",
    keyChanges: true,
    festivalClose: "all",
    closedDays: [],
    hours: { open: hm(14), close: hm(22) },
    keyHours: [{ open: hm(6), close: hm(14) }],
  },
  {
    id: "clinic",
    hasNote: true,
    festivalClose: "all",
    closedDays: ["sat"],
    hours: { open: hm(9), close: hm(12) },
    weekdayHours: {
      tue: { open: hm(9), close: hm(14) }, // 화·목 오후 2시 폐점
      thu: { open: hm(9), close: hm(14) },
    },
  },
  {
    id: "museum",
    festivalClose: "all",
    closedDays: [],
    hours: { open: hm(8), close: hm(18) },
  },
  {
    id: "wizardTower",
    hasNote: true,
    keyChanges: true,
    festivalClose: "some",
    closedDays: [],
    hours: { open: hm(6), close: hm(23) },
    keyHours: [{ open: hm(6), close: hm(26) }], // 오전 2시까지
    festivalClosedDates: [
      { season: "spring", day: 24 }, // 봄꽃 무도회
      { season: "winter", day: 8 }, // 얼음 축제
    ],
  },
  {
    id: "travelingCart",
    festivalClose: "none",
    closedDays: ["mon", "tue", "wed", "thu", "sat"],
    hours: { open: hm(6), close: hm(20) },
  },
  {
    id: "joja",
    hasNote: true,
    keyChanges: true,
    festivalClose: "all",
    closedDays: [],
    closesAfterCC: true,
    hours: { open: hm(9), close: hm(23) },
    keyHours: [{ open: hm(6), close: hm(26) }],
  },
  {
    id: "iceCreamStand",
    hasNote: true,
    hasCheckup: true,
    festivalClose: "none",
    closedDays: ["wed"],
    hours: { open: hm(13), close: hm(17) },
    openSeasons: ["summer"], // 여름에만 운영
    closedIfRain: true, // 비 오는 날 휴무
    closedDates: [{ season: "summer", day: 16 }], // 여름 16일 폐점
  },
  {
    id: "movieTheater",
    festivalClose: "none",
    closedDays: [],
    hours: { open: hm(9), close: hm(21) },
  },
  {
    id: "desertTrader",
    hasNote: true,
    festivalClose: "some",
    closedDays: [],
    hours: { open: hm(6), close: hm(26) },
    festivalClosedDates: [
      { season: "winter", day: 15 },
      { season: "winter", day: 16 },
      { season: "winter", day: 17 }, // 야시장
    ],
  },
  {
    id: "oasis",
    hasNote: true,
    festivalClose: "all",
    closedDays: [],
    hours: { open: hm(9), close: hm(23, 50) },
  },
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

// 메인 박스의 "오늘" 상태 계산에 필요한 맥락.
export interface ShopStatusCtx {
  date: SDate;
  ccRestored: boolean;
  keyApplied: boolean;
  boatRepaired: boolean;
  isRainToday: boolean;
}

// 휴무 사유(메시지 키와 매핑). closed=false면 영업 구간들(분할 영업이면 여러 개).
export type ShopStatus =
  | { closed: true; reason: "permanent" | "season" | "festival" | "date" | "rain" | "weekday" }
  | { closed: false; segments: HourRange[] };

const onDate = (d: DateRef, date: SDate) =>
  d.season === date.season && d.day === date.day;

function isFestivalClosed(entry: ShopScheduleEntry, date: SDate): boolean {
  if (entry.festivalClose === "none") return false;
  if (entry.festivalClose === "some")
    return entry.festivalClosedDates?.some((d) => onDate(d, date)) ?? false;
  return festivalLocksShops(date); // "all": 그날 실제 축제 여부로 자동 판정
}

// 일부 가게는 대표 이미지를 별도 지정(영화관 → 팝콘 등). 그 외엔 가게 id로 매핑.
const SHOP_ICON_OVERRIDE: Record<string, string> = {
  movieTheater: "/icons/snacks/Popcorn.png",
};
export function shopIconSrc(id: string): string {
  return SHOP_ICON_OVERRIDE[id] ?? `/icons/shops/${id}.png`;
}

// 설정한 날짜 기준으로 가게의 오늘 상태(휴무 여부·영업시간)를 계산한다.
// 판정 순서: 영구 폐점 → 운영 계절 → 축제(자동) → 특정일 휴무 → 비 휴무 → 요일 휴무 → 영업시간.
export function resolveShopStatusOn(
  entry: ShopScheduleEntry,
  ctx: ShopStatusCtx,
): ShopStatus {
  const { date } = ctx;
  const weekday = getWeekday(date.day) as Weekday;

  if (entry.closesAfterCC && ctx.ccRestored)
    return { closed: true, reason: "permanent" };
  if (entry.openSeasons && !entry.openSeasons.includes(date.season))
    return { closed: true, reason: "season" };
  if (isFestivalClosed(entry, date)) return { closed: true, reason: "festival" };
  if (entry.closedDates?.some((d) => onDate(d, date)))
    return { closed: true, reason: "date" };
  if (entry.closedIfRain && ctx.isRainToday)
    return { closed: true, reason: "rain" };

  const closedDays = resolveClosedDays(entry, ctx.ccRestored);
  if (closedDays.includes(weekday)) {
    // 비 올 때만 개점하는 요일(생선 가게 토요일)은 비 오면 영업으로 처리.
    const rainException =
      !!entry.openIfRainOnly?.includes(weekday) && ctx.isRainToday;
    if (!rainException) return { closed: true, reason: "weekday" };
  }

  // 영업시간 결정: 특정일 > 요일 > (열쇠/배) > 기본. 열쇠는 분할 영업이면 여러 구간.
  let segments: HourRange[] = [entry.hours ?? { open: hm(9), close: hm(17) }];
  if (ctx.keyApplied && entry.keyChanges && entry.keyHours)
    segments = entry.keyHours;
  if (ctx.boatRepaired && entry.boatChanges && entry.boatHours)
    segments = [entry.boatHours];
  const dh = entry.dateHours?.find((x) => onDate(x.date, date));
  if (dh) segments = [dh.hours];
  else if (entry.weekdayHours?.[weekday])
    segments = [entry.weekdayHours[weekday]!];

  return { closed: false, segments };
}
