import giftsData from "./gifts.json";

// 위키 "모든 선물 목록"+"우정"에서 추출한 주민별 선물 반응(사랑+80 / 좋아+45 / 중립+20).
// 보편 선물도 병합됨. 구체 아이템은 icon, 카테고리 규칙은 detail(예외 포함 설명) 보유.
// cat: 펼치기 가능한 카테고리 키(category-members.json), 없으면 펼치기 불가.
export interface GiftEntry {
  ko: string;
  en: string;
  icon?: string;
  detail?: string;
  cat?: string | null;
}

export interface VillagerGifts {
  loves: GiftEntry[];
  likes: GiftEntry[];
  neutral: GiftEntry[];
  avoidEn: string[]; // 이 주민이 싫어/혐오하는 아이템(영문명) — 카테고리 펼칠 때 제외
}

const gifts = giftsData as Record<string, VillagerGifts>;

const EMPTY: VillagerGifts = { loves: [], likes: [], neutral: [], avoidEn: [] };

// 선물 데이터를 가진 전체 주민 id 목록(생일 선물 목록 등에서 사용).
export const GIFT_VILLAGERS: string[] = Object.keys(gifts);

export function getVillagerGifts(villagerId: string): VillagerGifts {
  return gifts[villagerId] ?? EMPTY;
}
