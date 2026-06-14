// 씨앗별 효율(상대 수익) 계산. 출처 로직: progress/Stardew Profits (main.js의 harvests/profit).
// 단순화: 레벨·품질 확률·씨앗 비용·가공 시간은 미반영(상대 비교용).
// 반영: 계절(크로스시즌 자동), 가공 유형(원물/술통/보존병), 비료(성장 속도),
//       스킬(경작인=원물 +10%, 농업 전문가=성장 속도, 식물학자=야생 씨앗 품질).

import { CROPS, type Crop } from "@/data/game-data";
import { DAYS_PER_SEASON, SEASONS, type Season } from "@/lib/calendar";
import { adjustedGrowthDays, speedIncrease, type Fertilizer } from "@/lib/growth";

export type Produce = "raw" | "keg" | "jar";

export interface ProfitOptions {
  fertilizer: Fertilizer;
  produce: Produce;
  tiller: boolean; // 경작인: 원물 판매가 +10%
  agriculturist: boolean; // 농업 전문가: 성장 속도 +10%
  botanist: boolean; // 식물학자: 야생 씨앗 품질(현재 데이터엔 야생 씨앗 없음 → 무효과)
}

export interface SeedProfit {
  cropId: string;
  harvests: number; // 가용 기간 내 수확 횟수
  spanDays: number; // 가용 일수(크로스시즌 반영)
  profit: number; // 기간 총 수익(1포기, 비용 미반영)
  perDay: number; // 일일 수익
  usedProduce: Produce; // 실제 적용된 가공(해당 작물이 가공 불가면 raw로 대체)
  regrow: boolean;
}

// 해당 계절부터 연속으로 같은 작물이 자랄 수 있는 계절 수 × 28일.
// 겨울→봄은 순환하지 않으므로 winter에서 멈춘다.
function seasonSpan(crop: Crop, season: Season): number {
  let span = 0;
  for (let i = SEASONS.indexOf(season); i < SEASONS.length; i++) {
    if (!crop.seasons.includes(SEASONS[i])) break;
    span++;
  }
  return Math.max(span, 1) * DAYS_PER_SEASON;
}

// 게임 성장 알고리즘 기반 수확 횟수(계절 1일 파종 가정).
function countHarvests(
  crop: Crop,
  span: number,
  agriculturist: boolean,
  fert: Fertilizer,
): number {
  const g = adjustedGrowthDays(crop, speedIncrease(agriculturist, fert));
  let harvests = 0;
  let day = 1 + g; // 파종 1일 → 첫 수확 (1+성장일)
  while (day <= span) {
    harvests++;
    day += crop.regrowDays ?? g;
  }
  return harvests;
}

// 단위 판매가(가공 유형 + 경작인 반영). 가공 불가 작물은 원물로 대체.
function unitValue(
  crop: Crop,
  opt: ProfitOptions,
): { value: number; produce: Produce } {
  if (opt.produce === "keg" && crop.kegPrice != null) {
    return { value: crop.kegPrice, produce: "keg" };
  }
  if (opt.produce === "jar" && crop.jarPrice != null) {
    return { value: crop.jarPrice, produce: "jar" };
  }
  // 경작인 +10%는 원물에만 적용(가공물=장인 제품이므로 미적용)
  const raw = Math.floor(crop.sellPrice * (opt.tiller ? 1.1 : 1));
  return { value: raw, produce: "raw" };
}

export function seedProfit(
  crop: Crop,
  season: Season,
  opt: ProfitOptions,
): SeedProfit {
  const spanDays = seasonSpan(crop, season);
  const harvests = countHarvests(crop, spanDays, opt.agriculturist, opt.fertilizer);
  const { value, produce } = unitValue(crop, opt);
  const yieldPer = 1 + (crop.extraYield ?? 0);
  const profit = harvests * yieldPer * value;
  return {
    cropId: crop.id,
    harvests,
    spanDays,
    profit: Math.round(profit),
    perDay: spanDays > 0 ? profit / spanDays : 0,
    usedProduce: produce,
    regrow: !!crop.regrowDays,
  };
}

// 해당 계절에 심을 수 있는 작물의 효율을 수익 내림차순으로 반환.
export function seasonSeedProfits(
  season: Season,
  opt: ProfitOptions,
): SeedProfit[] {
  return CROPS.filter((c) => c.seasons.includes(season))
    .map((c) => seedProfit(c, season, opt))
    .sort((a, b) => b.profit - a.profit);
}
