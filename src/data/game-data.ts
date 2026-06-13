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
export interface Crop {
  id: string;
  seasons: Season[];
  growthDays: number;
  regrowDays?: number;
}

export const CROPS: Crop[] = [
  // 봄
  { id: "parsnip", seasons: ["spring"], growthDays: 4 },
  { id: "potato", seasons: ["spring"], growthDays: 6 },
  { id: "cauliflower", seasons: ["spring"], growthDays: 12 },
  { id: "kale", seasons: ["spring"], growthDays: 6 },
  { id: "garlic", seasons: ["spring"], growthDays: 4 },
  { id: "rhubarb", seasons: ["spring"], growthDays: 13 },
  { id: "strawberry", seasons: ["spring"], growthDays: 8, regrowDays: 4 },
  { id: "greenBean", seasons: ["spring"], growthDays: 10, regrowDays: 3 },
  { id: "tulip", seasons: ["spring"], growthDays: 6 },
  { id: "blueJazz", seasons: ["spring"], growthDays: 7 },
  { id: "coffeeBean", seasons: ["spring", "summer"], growthDays: 10, regrowDays: 2 },
  // 여름
  { id: "blueberry", seasons: ["summer"], growthDays: 13, regrowDays: 4 },
  { id: "melon", seasons: ["summer"], growthDays: 12 },
  { id: "tomato", seasons: ["summer"], growthDays: 11, regrowDays: 4 },
  { id: "hotPepper", seasons: ["summer"], growthDays: 5, regrowDays: 3 },
  { id: "radish", seasons: ["summer"], growthDays: 6 },
  { id: "hops", seasons: ["summer"], growthDays: 11, regrowDays: 1 },
  { id: "poppy", seasons: ["summer"], growthDays: 7 },
  { id: "redCabbage", seasons: ["summer"], growthDays: 9 },
  { id: "starfruit", seasons: ["summer"], growthDays: 13 },
  { id: "wheat", seasons: ["summer", "fall"], growthDays: 4 },
  { id: "corn", seasons: ["summer", "fall"], growthDays: 14, regrowDays: 4 },
  { id: "sunflower", seasons: ["summer", "fall"], growthDays: 8 },
  // 가을
  { id: "pumpkin", seasons: ["fall"], growthDays: 13 },
  { id: "cranberry", seasons: ["fall"], growthDays: 7, regrowDays: 5 },
  { id: "eggplant", seasons: ["fall"], growthDays: 5, regrowDays: 5 },
  { id: "amaranth", seasons: ["fall"], growthDays: 7 },
  { id: "grape", seasons: ["fall"], growthDays: 10, regrowDays: 3 },
  { id: "yam", seasons: ["fall"], growthDays: 10 },
  { id: "bokChoy", seasons: ["fall"], growthDays: 4 },
  { id: "artichoke", seasons: ["fall"], growthDays: 8 },
  { id: "beet", seasons: ["fall"], growthDays: 6 },
  { id: "fairyRose", seasons: ["fall"], growthDays: 12 },
  { id: "sweetGemBerry", seasons: ["fall"], growthDays: 24 },
];

// 해당 계절에 작물을 심어 시즌 내 첫 수확을 보려면 늦어도 이 날까지 심어야 한다.
// (계절 말 28일 경과 시 작물이 시들어 죽으므로)
export function cropLastPlantDay(crop: Crop): number {
  return DAYS_PER_SEASON - crop.growthDays;
}
