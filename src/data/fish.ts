// 생선 출현 정보 — 생선 정보 모달용. 표시명·위치·시간·날씨는 i18n(fishInfo.<id>)로 분리.
// 출처: progress/생선 위키. 계절·도구·분류는 필터/그룹용 구조 데이터.

import type { Season } from "@/lib/calendar";

// 도구 유형: 낚싯대 / 게잡이 통발
export type FishTool = "rod" | "crabpot";
// 낚싯대 어종 세부 분류(없으면 일반). 야시장 잠수함·전설·전설 II.
export type FishCategory = "nightMarket" | "legendary" | "legendaryII";
// 날씨 조건: 아무때나 / 맑음 / 비
export type FishWeather = "any" | "sun" | "rain";

export interface FishInfo {
  id: string; // i18n fishInfo.<id>.* / 아이콘 /icons/fish/<id>.png
  seasons: Season[]; // 출현 계절(필터용). 4계절이면 상시.
  tool: FishTool;
  weather: FishWeather;
  category?: FishCategory; // 낚싯대 내 특수 분류
}

const ALL: Season[] = ["spring", "summer", "fall", "winter"];

export const FISH: FishInfo[] = [
  // ── 낚싯대: 일반 어종 ───────────────────────────────────────────
  { id: "pufferfish", seasons: ["summer"], tool: "rod", weather: "sun" },
  { id: "anchovy", seasons: ["spring", "fall"], tool: "rod", weather: "any" },
  { id: "tuna", seasons: ["summer", "winter"], tool: "rod", weather: "any" },
  { id: "sardine", seasons: ["spring", "fall", "winter"], tool: "rod", weather: "any" },
  { id: "bream", seasons: ALL, tool: "rod", weather: "any" },
  { id: "largemouthBass", seasons: ALL, tool: "rod", weather: "any" },
  { id: "smallmouthBass", seasons: ["spring", "fall"], tool: "rod", weather: "any" },
  { id: "rainbowTrout", seasons: ["summer"], tool: "rod", weather: "sun" },
  { id: "salmon", seasons: ["fall"], tool: "rod", weather: "any" },
  { id: "walleye", seasons: ["fall", "winter"], tool: "rod", weather: "rain" },
  { id: "perch", seasons: ["winter"], tool: "rod", weather: "any" },
  { id: "carp", seasons: ALL, tool: "rod", weather: "any" },
  { id: "catfish", seasons: ["spring", "summer", "fall"], tool: "rod", weather: "rain" },
  { id: "pike", seasons: ["summer", "winter"], tool: "rod", weather: "any" },
  { id: "sunfish", seasons: ["spring", "summer"], tool: "rod", weather: "sun" },
  { id: "redMullet", seasons: ["summer", "winter"], tool: "rod", weather: "any" },
  { id: "herring", seasons: ["spring", "winter"], tool: "rod", weather: "any" },
  { id: "eel", seasons: ["spring", "fall"], tool: "rod", weather: "rain" },
  { id: "octopus", seasons: ["summer"], tool: "rod", weather: "any" },
  { id: "redSnapper", seasons: ["summer", "fall", "winter"], tool: "rod", weather: "rain" },
  { id: "squid", seasons: ["winter"], tool: "rod", weather: "any" },
  { id: "seaCucumber", seasons: ["fall", "winter"], tool: "rod", weather: "any" },
  { id: "superCucumber", seasons: ["summer", "fall"], tool: "rod", weather: "any" },
  { id: "ghostfish", seasons: ALL, tool: "rod", weather: "any" },
  { id: "stonefish", seasons: ALL, tool: "rod", weather: "any" },
  { id: "icePip", seasons: ALL, tool: "rod", weather: "any" },
  { id: "lavaEel", seasons: ALL, tool: "rod", weather: "any" },
  { id: "sandfish", seasons: ALL, tool: "rod", weather: "any" },
  { id: "scorpionCarp", seasons: ALL, tool: "rod", weather: "any" },
  { id: "flounder", seasons: ["spring", "summer"], tool: "rod", weather: "any" },
  { id: "midnightCarp", seasons: ["fall", "winter"], tool: "rod", weather: "any" },
  { id: "sturgeon", seasons: ["summer", "winter"], tool: "rod", weather: "any" },
  { id: "tigerTrout", seasons: ["fall", "winter"], tool: "rod", weather: "any" },
  { id: "bullhead", seasons: ALL, tool: "rod", weather: "any" },
  { id: "tilapia", seasons: ["summer", "fall"], tool: "rod", weather: "any" },
  { id: "chub", seasons: ALL, tool: "rod", weather: "any" },
  { id: "dorado", seasons: ["summer"], tool: "rod", weather: "any" },
  { id: "albacore", seasons: ["fall", "winter"], tool: "rod", weather: "any" },
  { id: "shad", seasons: ["spring", "summer", "fall"], tool: "rod", weather: "rain" },
  { id: "lingcod", seasons: ["winter"], tool: "rod", weather: "any" },
  { id: "halibut", seasons: ["spring", "summer", "winter"], tool: "rod", weather: "any" },
  { id: "woodskip", seasons: ALL, tool: "rod", weather: "any" },
  { id: "voidSalmon", seasons: ALL, tool: "rod", weather: "any" },
  { id: "slimejack", seasons: ALL, tool: "rod", weather: "any" },
  { id: "lionfish", seasons: ALL, tool: "rod", weather: "any" },
  { id: "blueDiscus", seasons: ALL, tool: "rod", weather: "any" },
  { id: "stingray", seasons: ALL, tool: "rod", weather: "any" },

  // ── 낚싯대: 야시장(겨울 15–17일, 잠수함) ────────────────────────
  { id: "midnightSquid", seasons: ["winter"], tool: "rod", weather: "any", category: "nightMarket" },
  { id: "spookFish", seasons: ["winter"], tool: "rod", weather: "any", category: "nightMarket" },
  { id: "blobfish", seasons: ["winter"], tool: "rod", weather: "any", category: "nightMarket" },

  // ── 낚싯대: 전설 생선 ──────────────────────────────────────────
  { id: "crimsonfish", seasons: ["summer"], tool: "rod", weather: "any", category: "legendary" },
  { id: "angler", seasons: ["fall"], tool: "rod", weather: "any", category: "legendary" },
  { id: "legend", seasons: ["spring"], tool: "rod", weather: "rain", category: "legendary" },
  { id: "glacierfish", seasons: ["winter"], tool: "rod", weather: "any", category: "legendary" },
  { id: "mutantCarp", seasons: ALL, tool: "rod", weather: "any", category: "legendary" },

  // ── 낚싯대: 전설 생선 II (미스터 Qi의 대가족) ───────────────────
  { id: "sonOfCrimsonfish", seasons: ALL, tool: "rod", weather: "any", category: "legendaryII" },
  { id: "msAngler", seasons: ALL, tool: "rod", weather: "any", category: "legendaryII" },
  { id: "legendII", seasons: ALL, tool: "rod", weather: "any", category: "legendaryII" },
  { id: "glacierfishJr", seasons: ALL, tool: "rod", weather: "any", category: "legendaryII" },
  { id: "radioactiveCarp", seasons: ALL, tool: "rod", weather: "any", category: "legendaryII" },

  // ── 게잡이 통발 ───────────────────────────────────────────────
  { id: "lobster", seasons: ALL, tool: "crabpot", weather: "any" },
  { id: "crab", seasons: ALL, tool: "crabpot", weather: "any" },
  { id: "shrimp", seasons: ALL, tool: "crabpot", weather: "any" },
  { id: "cockle", seasons: ALL, tool: "crabpot", weather: "any" },
  { id: "mussel", seasons: ALL, tool: "crabpot", weather: "any" },
  { id: "oyster", seasons: ALL, tool: "crabpot", weather: "any" },
  { id: "clam", seasons: ALL, tool: "crabpot", weather: "any" },
  { id: "crayfish", seasons: ALL, tool: "crabpot", weather: "any" },
  { id: "snail", seasons: ALL, tool: "crabpot", weather: "any" },
  { id: "periwinkle", seasons: ALL, tool: "crabpot", weather: "any" },
];
