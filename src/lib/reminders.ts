import { FESTIVALS } from "@/data/game-data";
import {
  REMINDERS,
  type ReminderDef,
  type ReminderId,
} from "@/data/reminders";
import { addDays, daysUntil, getWeekday, type SDate } from "@/lib/calendar";
import { NON_LOCKING_FESTIVALS, festivalLocksShops } from "@/lib/events";

export type ReminderBadge =
  | { kind: "today" }
  | { kind: "dDay"; days: number };

// 내일 시작하는, NPC·상점 이용을 막는 축제(없으면 null). 전날 안내 문구용.
// 저녁에 시작해 건물이 잠기지 않는 축제는 제외.
export function festivalEveOf(date: SDate) {
  const fest = festivalStartingOn(addDays(date, 1));
  return fest && !NON_LOCKING_FESTIVALS.has(fest.id) ? fest : null;
}

// 내일이 NPC·상점 이용을 막는 축제 시작일인지(= 오늘 안에 끝내야 하는 날).
export function festivalEveBlocked(date: SDate): boolean {
  return !!festivalEveOf(date);
}

// 그날 NPC·상점이 막히는 축제일인지(피에르네 등 상점에서 씨앗 구매 불가).
// 다중일 축제 포함, 저녁 축제는 제외.
export function festivalBlocksOn(date: SDate): boolean {
  return festivalLocksShops(date);
}

export interface ActiveReminder {
  id: ReminderId;
  badge: ReminderBadge;
}

function festivalDate(id: string): SDate | null {
  const f = FESTIVALS.find((x) => x.id === id);
  return f ? { season: f.season, day: f.day } : null;
}

// 야시장(겨울 15~17일)인지
function isNightMarket(date: SDate): boolean {
  return date.season === "winter" && date.day >= 15 && date.day <= 17;
}

// 해당 날짜에 "시작"하는 축제 (다중일 축제의 중간/마지막 날은 제외)
function festivalStartingOn(date: SDate) {
  return FESTIVALS.find((f) => f.season === date.season && f.day === date.day);
}

function matchTrigger(def: ReminderDef, date: SDate): ReminderBadge | null {
  const tr = def.trigger;

  if (tr.kind === "daily") return { kind: "today" };

  if (tr.kind === "seasonStart") {
    return date.day === 1 ? { kind: "today" } : null;
  }

  if (tr.kind === "weekly") {
    if (tr.weekdays.includes(getWeekday(date.day))) return { kind: "today" };
    // 야시장 기간에는 요일과 무관하게 매일(여행 카트)
    if (def.nightMarketDaily && isNightMarket(date)) return { kind: "today" };
    return null;
  }

  // festivalPrep
  const fd = festivalDate(tr.festivalId);
  if (!fd) return null;
  const away = daysUntil(date, fd);
  if (away >= 1 && away <= tr.daysBefore) return { kind: "dDay", days: away };
  return null;
}

// 기준일에 활성화된 리마인더 목록 (정의 순서 유지)
export function getActiveReminders(
  date: SDate,
  toggles: Record<ReminderId, boolean>,
): ActiveReminder[] {
  const out: ActiveReminder[] = [];
  for (const def of REMINDERS) {
    if (!toggles[def.id]) continue;
    if (def.suppressOnFestival && festivalLocksShops(date)) continue;
    if (def.suppressOnFestivalEve && festivalEveBlocked(date)) continue;

    const badge = matchTrigger(def, date);
    if (badge) out.push({ id: def.id, badge });
  }
  return out;
}
