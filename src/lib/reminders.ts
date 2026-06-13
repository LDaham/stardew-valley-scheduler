import { FESTIVALS } from "@/data/game-data";
import {
  REMINDERS,
  type ReminderDef,
  type ReminderId,
} from "@/data/reminders";
import { addDays, daysUntil, getWeekday, type SDate } from "@/lib/calendar";
import { getEventsOn } from "@/lib/events";

// 저녁에 시작해 건물이 잠기지 않는 축제 — 이 축제 전날은 퀘스트 완료가 가능하므로 경고 제외.
// (정령의 밤·달빛 해파리·밤 시장. 가게 일정표 위키 기준)
const EVENING_FESTIVALS = new Set([
  "spiritsEve",
  "moonlightJellies",
  "nightMarket",
]);

export type ReminderBadge =
  | { kind: "today" }
  | { kind: "dDay"; days: number }
  | { kind: "eve" };

export interface ActiveReminder {
  id: ReminderId;
  emoji: string;
  badge: ReminderBadge;
}

function festivalDate(id: string): SDate | null {
  const f = FESTIVALS.find((x) => x.id === id);
  return f ? { season: f.season, day: f.day } : null;
}

// 해당 날짜가 축제 기간(다중일 포함)인지
function isFestivalDay(date: SDate): boolean {
  return getEventsOn(date).some((e) => e.type === "festival");
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

  if (tr.kind === "weekly") {
    if (tr.weekdays.includes(getWeekday(date.day))) return { kind: "today" };
    // 야시장 기간에는 요일과 무관하게 매일(여행 카트)
    if (def.nightMarketDaily && isNightMarket(date)) return { kind: "today" };
    return null;
  }

  if (tr.kind === "festivalPrep") {
    const fd = festivalDate(tr.festivalId);
    if (!fd) return null;
    const away = daysUntil(date, fd);
    if (away >= 1 && away <= tr.daysBefore) return { kind: "dDay", days: away };
    return null;
  }

  // festivalEve: 내일이 축제 시작일이고, 저녁 축제가 아니면 경고
  const fest = festivalStartingOn(addDays(date, 1));
  if (fest && !EVENING_FESTIVALS.has(fest.id)) return { kind: "eve" };
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
    if (def.suppressOnFestival && isFestivalDay(date)) continue;

    const badge = matchTrigger(def, date);
    if (badge) out.push({ id: def.id, emoji: def.emoji, badge });
  }
  return out;
}
