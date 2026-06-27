// Min-Max 가이드 로케일 라우팅 + 표시용 룩업.
// 요청 로케일의 번역이 없으면 en → ko 순으로 폴백한다(현재는 ko만 존재 → 모두 ko).
// 정확한 (계절,일) 항목이 없으면 가장 가까운 '이전' 날짜 항목을 이어 보여준다.

import { SEASONS, seasonIndex, type Season } from "@/lib/calendar";
import type { GuideBundle, GuideData, GuideLookup } from "./types";
import * as ko from "./ko";
import * as en from "./en";
import * as de from "./de";
import * as es from "./es";
import * as fr from "./fr";
import * as it from "./it";
import * as hu from "./hu";
import * as ja from "./ja";
import * as ptBR from "./pt-BR";
import * as ru from "./ru";
import * as tr from "./tr";
import * as zhCN from "./zh-CN";

export type {
  GuideKind,
  GuideNode,
  GuideDay,
  GuideData,
  GoalsData,
  GuideBundle,
  GuideLookup,
} from "./types";

// 로케일별 가이드 묶음 등록(번역 추가 시 여기에 import 후 추가).
const BUNDLES: Record<string, GuideBundle> = {
  ko: { guide: ko.MIN_MAX_GUIDE, goals: ko.DAILY_GOALS },
  en: { guide: en.MIN_MAX_GUIDE, goals: en.DAILY_GOALS },
  de: { guide: de.MIN_MAX_GUIDE, goals: de.DAILY_GOALS },
  es: { guide: es.MIN_MAX_GUIDE, goals: es.DAILY_GOALS },
  fr: { guide: fr.MIN_MAX_GUIDE, goals: fr.DAILY_GOALS },
  it: { guide: it.MIN_MAX_GUIDE, goals: it.DAILY_GOALS },
  hu: { guide: hu.MIN_MAX_GUIDE, goals: hu.DAILY_GOALS },
  ja: { guide: ja.MIN_MAX_GUIDE, goals: ja.DAILY_GOALS },
  "pt-BR": { guide: ptBR.MIN_MAX_GUIDE, goals: ptBR.DAILY_GOALS },
  ru: { guide: ru.MIN_MAX_GUIDE, goals: ru.DAILY_GOALS },
  tr: { guide: tr.MIN_MAX_GUIDE, goals: tr.DAILY_GOALS },
  "zh-CN": { guide: zhCN.MIN_MAX_GUIDE, goals: zhCN.DAILY_GOALS },
};

// 폴백 순서: 영어 → 한국어.
const FALLBACK = ["en", "ko"];

function pickBundle(locale: string): GuideBundle {
  if (BUNDLES[locale]) return BUNDLES[locale];
  for (const l of FALLBACK) if (BUNDLES[l]) return BUNDLES[l];
  return BUNDLES.ko;
}

// 묶음별 정렬된 엔트리 키 캐시(본문 객체 기준).
type EntryKey = { yd: number; season: Season; day: number };
const keyCache = new WeakMap<GuideData, EntryKey[]>();

function entryKeys(guide: GuideData): EntryKey[] {
  const cached = keyCache.get(guide);
  if (cached) return cached;
  const keys: EntryKey[] = [];
  for (const season of SEASONS) {
    const days = guide[season];
    if (!days) continue;
    for (const dayStr of Object.keys(days)) {
      const day = Number(dayStr);
      keys.push({ yd: seasonIndex(season) * 28 + day, season, day });
    }
  }
  keys.sort((a, b) => a.yd - b.yd);
  keyCache.set(guide, keys);
  return keys;
}

// locale/season/day(연도 무관)에 대해 가이드 항목을 찾는다(이전 항목 이어보기).
export function lookupGuide(
  locale: string,
  season: Season,
  day: number,
): GuideLookup | null {
  const bundle = pickBundle(locale);
  const keys = entryKeys(bundle.guide);
  const target = seasonIndex(season) * 28 + day;
  let found: EntryKey | null = null;
  for (const k of keys) {
    if (k.yd <= target) found = k;
    else break;
  }
  if (!found) found = keys[0]; // 가장 이른 항목으로 폴백
  if (!found) return null;
  const entry = bundle.guide[found.season]?.[found.day];
  if (!entry) return null;
  return {
    season: found.season,
    day: found.day,
    exact: found.season === season && found.day === day,
    entry,
    goals: bundle.goals[found.season]?.[found.day],
  };
}
