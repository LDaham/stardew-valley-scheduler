import universalData from "./universal-gifts.json";
import type { GiftEntry, VillagerGifts } from "./gifts";

// 위키 "우정 > 보편적인 선물"에서 추출한, 대부분의 주민에게 공통 적용되는 선물.
// 주민별 예외는 gifts.json(주민별 실제 반응)을 기준으로 런타임에 판별한다.
export type Tier = "loves" | "likes" | "neutral";

export interface UniversalGifts {
  loves: GiftEntry[];
  likes: GiftEntry[];
  neutral: GiftEntry[];
}

const universal = universalData as UniversalGifts;

// tier별 보편 선물 영문명 집합 — 주민 고유 선물과 분리할 때 사용
export const UNIVERSAL_EN: Record<Tier, Set<string>> = {
  loves: new Set(universal.loves.map((e) => e.en)),
  likes: new Set(universal.likes.map((e) => e.en)),
  neutral: new Set(universal.neutral.map((e) => e.en)),
};

export function getUniversalGifts(): UniversalGifts {
  return universal;
}

// 특정 주민의 어떤 아이템(en)에 대한 실제 반응. 없으면 null.
export function reactionOf(gifts: VillagerGifts, en: string): Tier | "avoid" | null {
  if (gifts.avoidEn.includes(en)) return "avoid";
  for (const t of ["loves", "likes", "neutral"] as const) {
    if (gifts[t].some((e) => e.en === en)) return t;
  }
  return null;
}

export interface UniversalException {
  entry: GiftEntry;
  reaction: Exclude<Tier | "avoid", never>;
}

// 해당 tier의 보편 선물을 주민 기준으로 분리:
// - normal: 이 주민에게도 동일 tier로 적용되는 항목
// - exceptions: 반응이 다른 항목(주민 폴더에서 제거하고 사실을 명시)
export function partitionUniversal(
  gifts: VillagerGifts,
  tier: Tier,
): { normal: GiftEntry[]; exceptions: UniversalException[] } {
  const normal: GiftEntry[] = [];
  const exceptions: UniversalException[] = [];
  for (const e of getUniversalGifts()[tier]) {
    const r = reactionOf(gifts, e.en);
    // 반응을 알 수 없으면(데이터 없음) 보편 기준을 따른다고 가정
    if (r === null || r === tier) normal.push(e);
    else exceptions.push({ entry: e, reaction: r });
  }
  return { normal, exceptions };
}
