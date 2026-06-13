// 스타듀밸리 달력 핵심 계산: 4계절 × 28일 = 112일, 연도 없이 순환.

export const SEASONS = ["spring", "summer", "fall", "winter"] as const;
export type Season = (typeof SEASONS)[number];

export const DAYS_PER_SEASON = 28;
export const DAYS_PER_YEAR = SEASONS.length * DAYS_PER_SEASON; // 112

// 각 계절 1일은 항상 월요일이고 7일 주기로 반복된다.
export const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type Weekday = (typeof WEEKDAYS)[number];

// 연도를 갖지 않는 날짜 (순환 메모의 기준 단위)
export interface SDate {
  season: Season;
  day: number; // 1..28
}

export function seasonIndex(season: Season): number {
  return SEASONS.indexOf(season);
}

// day(1..28) → 요일. 계절 1일 = 월요일.
export function getWeekday(day: number): Weekday {
  return WEEKDAYS[(day - 1) % 7];
}

// SDate → 1년 내 절대 일수 (1..112)
export function toYearDay(d: SDate): number {
  return seasonIndex(d.season) * DAYS_PER_SEASON + d.day;
}

// 1..112 절대 일수 → SDate (정규화된 입력 가정)
export function fromYearDay(n: number): SDate {
  const idx = Math.floor((n - 1) / DAYS_PER_SEASON);
  const day = ((n - 1) % DAYS_PER_SEASON) + 1;
  return { season: SEASONS[idx], day };
}

// 임의 정수를 1..112 범위로 순환 래핑
export function normalizeYearDay(n: number): number {
  return (((n - 1) % DAYS_PER_YEAR) + DAYS_PER_YEAR) % DAYS_PER_YEAR + 1;
}

// 기준일에서 days만큼 이동한 날짜 (순환)
export function addDays(d: SDate, days: number): SDate {
  return fromYearDay(normalizeYearDay(toYearDay(d) + days));
}

// from에서 다음 to 발생까지 남은 일수 (0..111). 같은 날이면 0.
export function daysUntil(from: SDate, to: SDate): number {
  const diff = toYearDay(to) - toYearDay(from);
  return ((diff % DAYS_PER_YEAR) + DAYS_PER_YEAR) % DAYS_PER_YEAR;
}

// 두 날짜가 같은지
export function isSameDate(a: SDate, b: SDate): boolean {
  return a.season === b.season && a.day === b.day;
}

// "봄-5" 같은 안정적 키 (메모 저장용)
export function dateKey(d: SDate): string {
  return `${d.season}-${d.day}`;
}
