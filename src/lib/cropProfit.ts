// 씨앗별 효율(상대 수익) 계산. 출처 로직: progress/Stardew Profits (main.js·predictions.js).
// 반영: 단일 계절(28일, 크로스시즌 토글로 연장), 가공 유형(원물/술통/절임통), 비료(성장·품질),
//       음식(농사 레벨 버프), 캐릭터(농사·채집 레벨, 경작인/농업전문가/채집가/식물학자).
// 단순화: 씨앗 비용·구매처·가공 시간 미반영. 술통·절임통 가공물에는 품질·경작인 미적용(원물에만).

import { CROPS, type Crop } from "@/data/game-data";
import { DAYS_PER_SEASON, SEASONS, type Season } from "@/lib/calendar";

export type Produce = "raw" | "keg" | "jar";

// 비료: 품질비료(ratio>0, 성장 1) 또는 스피드그로(성장<1, ratio 0). Stardew Profits data.js 기준.
export type FertilizerId =
  | "none"
  | "basic"
  | "quality"
  | "deluxeFert"
  | "speedGro"
  | "deluxeSpeed"
  | "hyperSpeed";

interface FertilizerDef {
  growth: number; // 성장 일수 배수(작을수록 빠름)
  ratio: number; // 품질 등급(0 없음 · 1 기본 · 2 고급 · 3 이리듐)
}

const FERTILIZERS: Record<FertilizerId, FertilizerDef> = {
  none: { growth: 1, ratio: 0 },
  basic: { growth: 1, ratio: 1 },
  quality: { growth: 1, ratio: 2 },
  deluxeFert: { growth: 1, ratio: 3 },
  speedGro: { growth: 0.9, ratio: 0 },
  deluxeSpeed: { growth: 0.75, ratio: 0 },
  hyperSpeed: { growth: 0.67, ratio: 0 },
};
export const FERTILIZER_IDS = Object.keys(FERTILIZERS) as FertilizerId[];

// 음식: 수확일에 먹으면 농사 레벨을 일시 상승시켜 품질을 높임(Stardew Profits foodLevel).
export type FoodId =
  | "none"
  | "mapleBar"
  | "hashbrowns"
  | "completeBreakfast"
  | "pepperPoppers"
  | "tomKhaSoup"
  | "farmersLunch";

export const FOOD_LEVEL: Record<FoodId, number> = {
  none: 0,
  mapleBar: 1,
  hashbrowns: 1,
  completeBreakfast: 2,
  pepperPoppers: 2,
  tomKhaSoup: 2,
  farmersLunch: 3,
};
export const FOOD_IDS = Object.keys(FOOD_LEVEL) as FoodId[];

export interface ProfitOptions {
  crossSeason: boolean;
  fertilizer: FertilizerId;
  produce: Produce;
  food: FoodId;
  // 캐릭터 정보
  farmingLevel: number;
  foragingLevel: number;
  tiller: boolean;
  agriculturist: boolean;
  artisan: boolean;
  gatherer: boolean;
  botanist: boolean;
}

export interface SeedProfit {
  cropId: string;
  harvests: number;
  spanDays: number;
  profit: number; // 기간 총 수익(1포기, 비용 미반영)
  perDay: number;
  usedProduce: Produce; // 실제 적용된 가공(가공 불가 작물은 raw)
  regrow: boolean;
  wildseed: boolean;
}

interface Quality {
  regular: number;
  silver: number;
  gold: number;
  iridium: number;
}

// 농사 작물 품질 확률(Stardew Profits predictions.js의 Predict + Probability 기댓값).
function predictFarming(farmingLevel: number, fertRatio: number, isTea: boolean): Quality {
  if (isTea) return { regular: 1, silver: 0, gold: 0, iridium: 0 };
  const forGold = 0.2 * (farmingLevel / 10) + 0.2 * fertRatio * ((farmingLevel + 2) / 12) + 0.01;
  const forSilver = Math.min(0.75, forGold * 2);
  const forIridium = fertRatio >= 3 ? forGold / 2 : 0;

  const iridiumNot = 1 - forIridium;
  const goldNot = 1 - forGold;
  const silverNot = 1 - forSilver;

  const iridium = forIridium;
  const gold = fertRatio >= 3 ? forGold * iridiumNot : forGold;
  const silver = fertRatio >= 3 ? Math.max(0, goldNot * iridiumNot) : goldNot * forSilver;
  const regular = fertRatio < 3 ? goldNot * silverNot : 0;
  return { regular, silver, gold, iridium };
}

// 야생 씨앗 품질(채집 레벨·식물학자). 식물학자면 전부 이리듐.
function predictForaging(foragingLevel: number, botanist: boolean): Quality {
  if (botanist) return { regular: 0, silver: 0, gold: 0, iridium: 1 };
  const gold = foragingLevel / 30;
  const silver = (1 - gold) * (foragingLevel / 15);
  const regular = (1 - gold) * (1 - foragingLevel / 15);
  return { regular, silver, gold, iridium: 0 };
}

// 해당 계절부터 연속으로 같은 작물이 자랄 수 있는 계절 수 × 28일(크로스시즌). 겨울→봄 비순환.
function seasonSpan(crop: Crop, season: Season): number {
  let span = 0;
  for (let i = SEASONS.indexOf(season); i < SEASONS.length; i++) {
    if (!crop.seasons.includes(SEASONS[i])) break;
    span++;
  }
  return Math.max(span, 1) * DAYS_PER_SEASON;
}

// 게임 성장 알고리즘 기반 수확 횟수(계절 1일 파종, Stardew Profits harvests()와 동일).
function countHarvests(
  crop: Crop,
  span: number,
  growthFactor: number,
  agriculturist: boolean,
): number {
  const g = Math.ceil(crop.growthDays * (growthFactor - (agriculturist ? 0.1 : 0)));
  const inBloom = (day: number) => !crop.isTea || ((day - 1) % 28) + 1 > 21;
  let harvests = 0;
  let day = 1 + g;
  if (day <= span && inBloom(day)) harvests++;
  while (day <= span) {
    day += crop.regrowDays ?? g;
    if (day <= span && inBloom(day)) harvests++;
  }
  return harvests;
}

export function seedProfit(crop: Crop, season: Season, opt: ProfitOptions): SeedProfit {
  const fert = FERTILIZERS[opt.fertilizer];
  const spanDays = opt.crossSeason ? seasonSpan(crop, season) : DAYS_PER_SEASON;
  const harvests = countHarvests(crop, spanDays, fert.growth, opt.agriculturist);

  let yieldPer = 1 + (crop.extraYield ?? 0);
  if (crop.isWildseed && opt.gatherer) yieldPer *= 1.2; // 채집가: 야생 +20%
  const totalCrops = harvests * yieldPer;

  // 장인: 가공물(술통·절임통) 가치 +40%
  const artisanMult = opt.artisan ? 1.4 : 1;
  let profit: number;
  let usedProduce: Produce;
  if (opt.produce === "keg" && crop.kegPrice != null) {
    profit = totalCrops * crop.kegPrice * artisanMult; // 가공물: 품질·경작인 미적용
    usedProduce = "keg";
  } else if (opt.produce === "jar" && crop.jarPrice != null) {
    profit = totalCrops * crop.jarPrice * artisanMult;
    usedProduce = "jar";
  } else {
    // 원물: 품질 가중 + 경작인 +10%
    const q = crop.isWildseed
      ? predictForaging(opt.foragingLevel, opt.botanist)
      : predictFarming(opt.farmingLevel + FOOD_LEVEL[opt.food], fert.ratio, !!crop.isTea);
    const p = crop.sellPrice;
    let unit =
      q.regular * p +
      q.silver * Math.trunc(p * 1.25) +
      q.gold * Math.trunc(p * 1.5) +
      q.iridium * p * 2;
    if (opt.tiller) unit *= 1.1;
    profit = totalCrops * unit;
    usedProduce = "raw";
  }

  return {
    cropId: crop.id,
    harvests,
    spanDays,
    profit: Math.round(profit),
    perDay: spanDays > 0 ? profit / spanDays : 0,
    usedProduce,
    regrow: !!crop.regrowDays,
    wildseed: !!crop.isWildseed,
  };
}

// 해당 계절에 심을 수 있는 작물의 효율을 수익 내림차순으로 반환.
export function seasonSeedProfits(season: Season, opt: ProfitOptions): SeedProfit[] {
  return CROPS.filter((c) => c.seasons.includes(season))
    .map((c) => seedProfit(c, season, opt))
    .sort((a, b) => b.profit - a.profit);
}
