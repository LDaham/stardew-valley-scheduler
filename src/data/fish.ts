// 생선 출현 정보 — 생선 정보 모달용. 표시명·위치·시간·날씨는 i18n(fishInfo.<id>)로 분리.
// 출처: progress/생선 위키. 계절·도구·분류는 필터/그룹용 구조 데이터.

import type { Season } from "@/lib/calendar";

// 도구 유형: 낚싯대 / 게잡이 통발
export type FishTool = "rod" | "crabpot";
// 낚싯대 어종 세부 분류(없으면 일반). 야시장 잠수함·전설·전설 II.
export type FishCategory = "nightMarket" | "legendary" | "legendaryII";
// 날씨 조건: 아무때나 / 맑음 / 비
export type FishWeather = "any" | "sun" | "rain";

// 출현 시간 창. 낚시 가능 시각은 오전 6시(6) ~ 다음날 오전 2시(26) 기준.
// [시작, 끝] 시각(시). 자정 넘김은 24를 더한 값(예: 오전 2시 = 26). 분리된 시간대는 배열 2개.
// 아무때나 = [[6, 26]]. (배열 [시작, 끝])
export type FishWindow = number[];

export interface FishInfo {
  id: string; // i18n fishInfo.<id>.* / 아이콘 /icons/fish/<id>.png
  seasons: Season[]; // 출현 계절(필터용). 4계절이면 상시.
  tool: FishTool;
  weather: FishWeather;
  windows: FishWindow[]; // 시간대 그래프용
  category?: FishCategory; // 낚싯대 내 특수 분류
}

const ALL: Season[] = ["spring", "summer", "fall", "winter"];

export const FISH: FishInfo[] = [
  // ── 낚싯대: 일반 어종 ───────────────────────────────────────────
  { id: "pufferfish", seasons: ["summer"], tool: "rod", weather: "sun", windows: [[12,16]] },
  { id: "anchovy", seasons: ["spring", "fall"], tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "tuna", seasons: ["summer", "winter"], tool: "rod", weather: "any", windows: [[6,19]] },
  { id: "sardine", seasons: ["spring", "fall", "winter"], tool: "rod", weather: "any", windows: [[6,19]] },
  { id: "bream", seasons: ALL, tool: "rod", weather: "any", windows: [[18,26]] },
  { id: "largemouthBass", seasons: ALL, tool: "rod", weather: "any", windows: [[6,19]] },
  { id: "smallmouthBass", seasons: ["spring", "fall"], tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "rainbowTrout", seasons: ["summer"], tool: "rod", weather: "sun", windows: [[6,19]] },
  { id: "salmon", seasons: ["fall"], tool: "rod", weather: "any", windows: [[6,19]] },
  { id: "walleye", seasons: ["fall", "winter"], tool: "rod", weather: "rain", windows: [[12,26]] },
  { id: "perch", seasons: ["winter"], tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "carp", seasons: ALL, tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "catfish", seasons: ["spring", "summer", "fall"], tool: "rod", weather: "rain", windows: [[6,26]] },
  { id: "pike", seasons: ["summer", "winter"], tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "sunfish", seasons: ["spring", "summer"], tool: "rod", weather: "sun", windows: [[6,19]] },
  { id: "redMullet", seasons: ["summer", "winter"], tool: "rod", weather: "any", windows: [[6,19]] },
  { id: "herring", seasons: ["spring", "winter"], tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "eel", seasons: ["spring", "fall"], tool: "rod", weather: "rain", windows: [[16,26]] },
  { id: "octopus", seasons: ["summer"], tool: "rod", weather: "any", windows: [[6,13]] },
  { id: "redSnapper", seasons: ["summer", "fall", "winter"], tool: "rod", weather: "rain", windows: [[6,19]] },
  { id: "squid", seasons: ["winter"], tool: "rod", weather: "any", windows: [[18,26]] },
  { id: "seaCucumber", seasons: ["fall", "winter"], tool: "rod", weather: "any", windows: [[6,19]] },
  { id: "superCucumber", seasons: ["summer", "fall"], tool: "rod", weather: "any", windows: [[18,26]] },
  { id: "ghostfish", seasons: ALL, tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "stonefish", seasons: ALL, tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "icePip", seasons: ALL, tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "lavaEel", seasons: ALL, tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "sandfish", seasons: ALL, tool: "rod", weather: "any", windows: [[6,20]] },
  { id: "scorpionCarp", seasons: ALL, tool: "rod", weather: "any", windows: [[6,20]] },
  { id: "flounder", seasons: ["spring", "summer"], tool: "rod", weather: "any", windows: [[6,20]] },
  { id: "midnightCarp", seasons: ["fall", "winter"], tool: "rod", weather: "any", windows: [[22,26]] },
  { id: "sturgeon", seasons: ["summer", "winter"], tool: "rod", weather: "any", windows: [[6,19]] },
  { id: "tigerTrout", seasons: ["fall", "winter"], tool: "rod", weather: "any", windows: [[6,19]] },
  { id: "bullhead", seasons: ALL, tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "tilapia", seasons: ["summer", "fall"], tool: "rod", weather: "any", windows: [[6,14]] },
  { id: "chub", seasons: ALL, tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "dorado", seasons: ["summer"], tool: "rod", weather: "any", windows: [[6,19]] },
  { id: "albacore", seasons: ["fall", "winter"], tool: "rod", weather: "any", windows: [[6,11],[18,26]] },
  { id: "shad", seasons: ["spring", "summer", "fall"], tool: "rod", weather: "rain", windows: [[9,26]] },
  { id: "lingcod", seasons: ["winter"], tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "halibut", seasons: ["spring", "summer", "winter"], tool: "rod", weather: "any", windows: [[6,11],[19,26]] },
  { id: "woodskip", seasons: ALL, tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "voidSalmon", seasons: ALL, tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "slimejack", seasons: ALL, tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "lionfish", seasons: ALL, tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "blueDiscus", seasons: ALL, tool: "rod", weather: "any", windows: [[6,26]] },
  { id: "stingray", seasons: ALL, tool: "rod", weather: "any", windows: [[6,26]] },

  // ── 낚싯대: 야시장(겨울 15–17일, 잠수함) ────────────────────────
  { id: "midnightSquid", seasons: ["winter"], tool: "rod", weather: "any", category: "nightMarket", windows: [[17,26]] },
  { id: "spookFish", seasons: ["winter"], tool: "rod", weather: "any", category: "nightMarket", windows: [[17,26]] },
  { id: "blobfish", seasons: ["winter"], tool: "rod", weather: "any", category: "nightMarket", windows: [[17,26]] },

  // ── 낚싯대: 전설 생선 ──────────────────────────────────────────
  { id: "crimsonfish", seasons: ["summer"], tool: "rod", weather: "any", category: "legendary", windows: [[6,26]] },
  { id: "angler", seasons: ["fall"], tool: "rod", weather: "any", category: "legendary", windows: [[6,26]] },
  { id: "legend", seasons: ["spring"], tool: "rod", weather: "rain", category: "legendary", windows: [[6,26]] },
  { id: "glacierfish", seasons: ["winter"], tool: "rod", weather: "any", category: "legendary", windows: [[6,26]] },
  { id: "mutantCarp", seasons: ALL, tool: "rod", weather: "any", category: "legendary", windows: [[6,26]] },

  // ── 낚싯대: 전설 생선 II (미스터 Qi의 대가족) ───────────────────
  { id: "sonOfCrimsonfish", seasons: ALL, tool: "rod", weather: "any", category: "legendaryII", windows: [[6,26]] },
  { id: "msAngler", seasons: ALL, tool: "rod", weather: "any", category: "legendaryII", windows: [[6,26]] },
  { id: "legendII", seasons: ALL, tool: "rod", weather: "any", category: "legendaryII", windows: [[6,26]] },
  { id: "glacierfishJr", seasons: ALL, tool: "rod", weather: "any", category: "legendaryII", windows: [[6,26]] },
  { id: "radioactiveCarp", seasons: ALL, tool: "rod", weather: "any", category: "legendaryII", windows: [[6,26]] },

  // ── 게잡이 통발 ───────────────────────────────────────────────
  { id: "lobster", seasons: ALL, tool: "crabpot", weather: "any", windows: [[6,26]] },
  { id: "crab", seasons: ALL, tool: "crabpot", weather: "any", windows: [[6,26]] },
  { id: "shrimp", seasons: ALL, tool: "crabpot", weather: "any", windows: [[6,26]] },
  { id: "cockle", seasons: ALL, tool: "crabpot", weather: "any", windows: [[6,26]] },
  { id: "mussel", seasons: ALL, tool: "crabpot", weather: "any", windows: [[6,26]] },
  { id: "oyster", seasons: ALL, tool: "crabpot", weather: "any", windows: [[6,26]] },
  { id: "clam", seasons: ALL, tool: "crabpot", weather: "any", windows: [[6,26]] },
  { id: "crayfish", seasons: ALL, tool: "crabpot", weather: "any", windows: [[6,26]] },
  { id: "snail", seasons: ALL, tool: "crabpot", weather: "any", windows: [[6,26]] },
  { id: "periwinkle", seasons: ALL, tool: "crabpot", weather: "any", windows: [[6,26]] },
];
