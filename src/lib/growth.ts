// 작물 수확일 계산. 농업 전문가(−10%)와 비료(스피드그로 −10% / 고급 −25% / 초고속 −33%)
// 보정을 게임과 동일한 단계별 알고리즘으로 반영한다.
// 참고: progress/scheduler/작물 성장 달력 위키

import { addDays, type SDate } from "@/lib/calendar";
import type { Crop } from "@/data/game-data";

export type Fertilizer = "none" | "speedGro" | "deluxe" | "hyper";

const FERT_RATE: Record<Fertilizer, number> = {
  none: 0,
  speedGro: 0.1,
  deluxe: 0.25,
  hyper: 0.33,
};

// 성장 속도 증가율(합산). 농업 전문가 10% + 비료.
export function speedIncrease(agriculturist: boolean, fert: Fertilizer): number {
  return (agriculturist ? 0.1 : 0) + FERT_RATE[fert];
}

// 보정된 총 성장 일수. 게임 알고리즘: 단계 합 × 증가율을 올림한 만큼을
// 각 단계에서 하루씩(첫 단계는 1 미만 불가) 최대 3회 순회하며 제거한다.
export function adjustedGrowthDays(crop: Crop, increase: number): number {
  if (increase <= 0) return crop.growthDays;
  const p = [...crop.phases];
  const total = p.reduce((a, b) => a + b, 0);
  let daysToRemove = Math.ceil(total * increase);
  for (let tries = 0; tries < 3 && daysToRemove > 0; tries++) {
    for (let i = 0; i < p.length; i++) {
      if ((i > 0 || p[i] > 1) && p[i] > 0) {
        p[i]--;
        daysToRemove--;
      }
      if (daysToRemove <= 0) break;
    }
  }
  return p.reduce((a, b) => a + b, 0);
}

export interface HarvestInfo {
  date: SDate; // 첫 수확일
  growthDays: number; // 보정된 성장 일수
  regrowDays?: number; // 재성장 주기(있으면 반복 수확)
  // 심은 계절에 수확 불가(시즌 종료로 시들 수 있음)
  willWilt: boolean;
}

export function computeHarvest(
  plantDate: SDate,
  crop: Crop,
  agriculturist: boolean,
  fert: Fertilizer,
): HarvestInfo {
  const growthDays = adjustedGrowthDays(crop, speedIncrease(agriculturist, fert));
  const date = addDays(plantDate, growthDays);
  return {
    date,
    growthDays,
    regrowDays: crop.regrowDays,
    willWilt: !crop.seasons.includes(date.season),
  };
}
