import { DAYS_PER_SEASON, type Season } from "@/lib/calendar";

// 게임 내장 고정 반복 이벤트. 표시 이름은 i18n 키로 분리(messages/*.json).

// 축제: 매년 같은 날(또는 기간) 반복. id는 messages "festivals" 네임스페이스 키.
export interface Festival {
  id: string;
  season: Season;
  day: number; // 시작일
  endDay?: number; // 다중일 축제의 종료일
}

export const FESTIVALS: Festival[] = [
  // 봄
  { id: "eggFestival", season: "spring", day: 13 },
  { id: "desertFestival", season: "spring", day: 15, endDay: 17 },
  { id: "flowerDance", season: "spring", day: 24 },
  // 여름
  { id: "luau", season: "summer", day: 11 },
  { id: "troutDerby", season: "summer", day: 20, endDay: 21 },
  { id: "moonlightJellies", season: "summer", day: 28 },
  // 가을
  { id: "stardewValleyFair", season: "fall", day: 16 },
  { id: "spiritsEve", season: "fall", day: 27 },
  // 겨울
  { id: "festivalOfIce", season: "winter", day: 8 },
  { id: "squidFest", season: "winter", day: 12, endDay: 13 },
  { id: "nightMarket", season: "winter", day: 15, endDay: 17 },
  { id: "feastOfWinterStar", season: "winter", day: 25 },
];

// 주민 생일. villager id는 messages "villagers" 네임스페이스 키.
export interface Birthday {
  villager: string;
  season: Season;
  day: number;
}

export const BIRTHDAYS: Birthday[] = [
  // 봄
  { villager: "kent", season: "spring", day: 4 },
  { villager: "lewis", season: "spring", day: 7 },
  { villager: "vincent", season: "spring", day: 10 },
  { villager: "haley", season: "spring", day: 14 },
  { villager: "pam", season: "spring", day: 18 },
  { villager: "shane", season: "spring", day: 20 },
  { villager: "pierre", season: "spring", day: 26 },
  { villager: "emily", season: "spring", day: 27 },
  // 여름
  { villager: "jas", season: "summer", day: 4 },
  { villager: "gus", season: "summer", day: 8 },
  { villager: "maru", season: "summer", day: 10 },
  { villager: "alex", season: "summer", day: 13 },
  { villager: "sam", season: "summer", day: 17 },
  { villager: "demetrius", season: "summer", day: 19 },
  { villager: "dwarf", season: "summer", day: 22 },
  { villager: "willy", season: "summer", day: 24 },
  { villager: "leo", season: "summer", day: 26 },
  // 가을
  { villager: "penny", season: "fall", day: 2 },
  { villager: "elliott", season: "fall", day: 5 },
  { villager: "jodi", season: "fall", day: 11 },
  { villager: "abigail", season: "fall", day: 13 },
  { villager: "sandy", season: "fall", day: 15 },
  { villager: "marnie", season: "fall", day: 18 },
  { villager: "robin", season: "fall", day: 21 },
  { villager: "george", season: "fall", day: 24 },
  // 겨울
  { villager: "krobus", season: "winter", day: 1 },
  { villager: "linus", season: "winter", day: 3 },
  { villager: "caroline", season: "winter", day: 7 },
  { villager: "sebastian", season: "winter", day: 10 },
  { villager: "harvey", season: "winter", day: 14 },
  { villager: "wizard", season: "winter", day: 17 },
  { villager: "evelyn", season: "winter", day: 20 },
  { villager: "leah", season: "winter", day: 23 },
  { villager: "clint", season: "winter", day: 26 },
];

// 작물. id는 messages "crops" 네임스페이스 키.
// growthDays: 심은 날 제외 성장 일수. regrowDays: 첫 수확 후 재성장 주기(없으면 1회성).
// phases: 성장 단계별 일수(합 = growthDays). 농업 전문가·비료 보정 계산에 사용(게임 알고리즘과 동일).
export interface Crop {
  id: string;
  seasons: Season[];
  growthDays: number;
  phases: number[];
  regrowDays?: number;
  // 효율 계산용 경제 데이터(출처: Stardew Profits crops.js).
  sellPrice: number; // 원물 기본 판매가(일반 품질)
  extraYield?: number; // 평균 추가 수확량(= extra × extraPerc), 없으면 0
  kegPrice?: number; // 술통 가공물 판매가(가공 불가 작물은 생략)
  jarPrice?: number; // 보존병 가공물 판매가(가공 불가 작물은 생략)
}

export const CROPS: Crop[] = [
  // 봄
  { id: "parsnip", seasons: ["spring"], growthDays: 4, phases: [1, 1, 1, 1], sellPrice: 35, kegPrice: 78, jarPrice: 120 },
  { id: "potato", seasons: ["spring"], growthDays: 6, phases: [1, 1, 1, 2, 1], sellPrice: 80, extraYield: 0.25, kegPrice: 180, jarPrice: 210 },
  { id: "cauliflower", seasons: ["spring"], growthDays: 12, phases: [1, 2, 4, 5], sellPrice: 175, kegPrice: 393, jarPrice: 400 },
  { id: "kale", seasons: ["spring"], growthDays: 6, phases: [1, 2, 2, 1], sellPrice: 110, kegPrice: 247, jarPrice: 270 },
  { id: "garlic", seasons: ["spring"], growthDays: 4, phases: [1, 1, 1, 1], sellPrice: 60, kegPrice: 135, jarPrice: 170 },
  { id: "rhubarb", seasons: ["spring"], growthDays: 13, phases: [2, 2, 2, 3, 4], sellPrice: 220, kegPrice: 660, jarPrice: 490 },
  { id: "strawberry", seasons: ["spring"], growthDays: 8, phases: [1, 1, 2, 2, 2], regrowDays: 4, sellPrice: 120, extraYield: 0.02, kegPrice: 360, jarPrice: 290 },
  { id: "greenBean", seasons: ["spring"], growthDays: 10, phases: [1, 1, 1, 3, 4], regrowDays: 3, sellPrice: 40, kegPrice: 90, jarPrice: 130 },
  { id: "tulip", seasons: ["spring"], growthDays: 6, phases: [1, 1, 2, 2], sellPrice: 30 },
  { id: "blueJazz", seasons: ["spring"], growthDays: 7, phases: [1, 2, 2, 2], sellPrice: 50 },
  { id: "coffeeBean", seasons: ["spring", "summer"], growthDays: 10, phases: [1, 2, 2, 3, 2], regrowDays: 2, sellPrice: 15, extraYield: 3, kegPrice: 30 },
  // 여름
  { id: "blueberry", seasons: ["summer"], growthDays: 13, phases: [1, 3, 3, 4, 2], regrowDays: 4, sellPrice: 50, extraYield: 2, kegPrice: 150, jarPrice: 150 },
  { id: "melon", seasons: ["summer"], growthDays: 12, phases: [1, 2, 3, 3, 3], sellPrice: 250, kegPrice: 750, jarPrice: 550 },
  { id: "tomato", seasons: ["summer"], growthDays: 11, phases: [2, 2, 2, 2, 3], regrowDays: 4, sellPrice: 60, extraYield: 0.05, kegPrice: 135, jarPrice: 170 },
  { id: "hotPepper", seasons: ["summer"], growthDays: 5, phases: [1, 1, 1, 1, 1], regrowDays: 3, sellPrice: 40, extraYield: 0.03, kegPrice: 120, jarPrice: 130 },
  { id: "radish", seasons: ["summer"], growthDays: 6, phases: [2, 1, 2, 1], sellPrice: 90, kegPrice: 202, jarPrice: 230 },
  { id: "hops", seasons: ["summer"], growthDays: 11, phases: [1, 1, 2, 3, 4], regrowDays: 1, sellPrice: 25, kegPrice: 300, jarPrice: 100 },
  { id: "poppy", seasons: ["summer"], growthDays: 7, phases: [1, 2, 2, 2], sellPrice: 140 },
  { id: "redCabbage", seasons: ["summer"], growthDays: 9, phases: [2, 1, 2, 2, 2], sellPrice: 260, kegPrice: 585, jarPrice: 570 },
  { id: "starfruit", seasons: ["summer"], growthDays: 13, phases: [2, 3, 2, 3, 3], sellPrice: 750, kegPrice: 2250, jarPrice: 1550 },
  { id: "wheat", seasons: ["summer", "fall"], growthDays: 4, phases: [1, 1, 1, 1], sellPrice: 25, kegPrice: 200, jarPrice: 100 },
  { id: "corn", seasons: ["summer", "fall"], growthDays: 14, phases: [2, 3, 3, 3, 3], regrowDays: 4, sellPrice: 50, kegPrice: 112, jarPrice: 150 },
  { id: "sunflower", seasons: ["summer", "fall"], growthDays: 8, phases: [1, 2, 3, 2], sellPrice: 80 },
  // 가을
  { id: "pumpkin", seasons: ["fall"], growthDays: 13, phases: [1, 2, 3, 4, 3], sellPrice: 320, kegPrice: 720, jarPrice: 690 },
  { id: "cranberry", seasons: ["fall"], growthDays: 7, phases: [1, 2, 1, 1, 2], regrowDays: 5, sellPrice: 75, extraYield: 1, kegPrice: 225, jarPrice: 200 },
  { id: "eggplant", seasons: ["fall"], growthDays: 5, phases: [1, 1, 1, 1, 1], regrowDays: 5, sellPrice: 60, extraYield: 0.002, kegPrice: 135, jarPrice: 170 },
  { id: "amaranth", seasons: ["fall"], growthDays: 7, phases: [1, 2, 2, 2], sellPrice: 150, kegPrice: 337, jarPrice: 350 },
  { id: "grape", seasons: ["fall"], growthDays: 10, phases: [1, 2, 3, 2, 2], regrowDays: 3, sellPrice: 80, kegPrice: 240, jarPrice: 210 },
  { id: "yam", seasons: ["fall"], growthDays: 10, phases: [1, 3, 3, 3], sellPrice: 160, kegPrice: 360, jarPrice: 370 },
  { id: "bokChoy", seasons: ["fall"], growthDays: 4, phases: [1, 1, 1, 1], sellPrice: 80, kegPrice: 180, jarPrice: 210 },
  { id: "artichoke", seasons: ["fall"], growthDays: 8, phases: [2, 2, 1, 2, 1], sellPrice: 160, kegPrice: 360, jarPrice: 370 },
  { id: "beet", seasons: ["fall"], growthDays: 6, phases: [1, 1, 2, 2], sellPrice: 100, kegPrice: 225, jarPrice: 250 },
  { id: "fairyRose", seasons: ["fall"], growthDays: 12, phases: [1, 4, 4, 3], sellPrice: 290 },
  { id: "sweetGemBerry", seasons: ["fall"], growthDays: 24, phases: [2, 4, 6, 6, 6], sellPrice: 3000 },
];

// 해당 계절에 작물을 심어 시즌 내 첫 수확을 보려면 늦어도 이 날까지 심어야 한다.
// (계절 말 28일 경과 시 작물이 시들어 죽으므로)
export function cropLastPlantDay(crop: Crop): number {
  return DAYS_PER_SEASON - crop.growthDays;
}
