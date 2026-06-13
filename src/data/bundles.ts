import type { Season } from "@/lib/calendar";

// 마을회관 번들(표준). 작물 품목은 crops.* 재사용, 그 외는 bundleItem.* 사용.
// seasons: 획득 가능 계절(빈 배열 = 사계절/상시 획득). rainy: 비 오는 날에만 획득.
// needed: 채워야 하는 칸 수(items.length보다 작으면 그중 n개 선택).

export interface BundleItem {
  id: string; // 상태 저장 키(번들 내 고유)
  nameKey: string; // i18n 키 (crops.* | bundleItem.*)
  seasons: Season[];
  rainy?: boolean;
}

export interface Bundle {
  id: string; // i18n bundle.<id>
  roomKey: string; // i18n bundleRoom.<room>
  needed: number; // 채워야 하는 칸 수
  items: BundleItem[];
}

const crop = (id: string, seasons: Season[]): BundleItem => ({
  id,
  nameKey: `crops.${id}`,
  seasons,
});
const item = (
  id: string,
  seasons: Season[],
  rainy = false,
): BundleItem => ({ id, nameKey: `bundleItem.${id}`, seasons, rainy });

// needed 미지정 시 전체 필요
const all = (
  id: string,
  roomKey: string,
  items: BundleItem[],
  needed = items.length,
): Bundle => ({ id, roomKey, needed, items });

export const BUNDLES: Bundle[] = [
  // ── 식료품 저장실 ──
  all("springCrops", "pantry", [
    crop("parsnip", ["spring"]),
    crop("greenBean", ["spring"]),
    crop("cauliflower", ["spring"]),
    crop("potato", ["spring"]),
  ]),
  all("summerCrops", "pantry", [
    crop("tomato", ["summer"]),
    crop("hotPepper", ["summer"]),
    crop("blueberry", ["summer"]),
    crop("melon", ["summer"]),
  ]),
  all("fallCrops", "pantry", [
    crop("corn", ["summer", "fall"]),
    crop("eggplant", ["fall"]),
    crop("pumpkin", ["fall"]),
    crop("yam", ["fall"]),
  ]),
  // ── 공예품 방 ──
  all("springForaging", "craftsRoom", [
    item("wildHorseradish", ["spring"]),
    item("daffodil", ["spring"]),
    item("leek", ["spring"]),
    item("dandelion", ["spring"]),
  ]),
  all("summerForaging", "craftsRoom", [
    crop("grape", ["summer"]),
    item("spiceBerry", ["summer"]),
    item("sweetPea", ["summer"]),
  ]),
  all("fallForaging", "craftsRoom", [
    item("commonMushroom", ["fall"]),
    item("wildPlum", ["fall"]),
    item("hazelnut", ["fall"]),
    item("blackberry", ["fall"]),
  ]),
  all("winterForaging", "craftsRoom", [
    item("winterRoot", ["winter"]),
    item("crystalFruit", ["winter"]),
    item("snowYam", ["winter"]),
    item("crocus", ["winter"]),
  ]),
  all("construction", "craftsRoom", [
    item("wood", []),
    item("stone", []),
    item("hardwood", []),
  ]),
  // 9개 중 5개 선택
  all(
    "exoticForaging",
    "craftsRoom",
    [
      item("coconut", []),
      item("cactusFruit", []),
      item("caveCarrot", []),
      item("redMushroom", ["summer", "fall"]),
      item("purpleMushroom", []),
      item("mapleSyrup", []),
      item("oakResin", []),
      item("pineTar", []),
      item("morel", ["spring"]),
    ],
    5,
  ),
  // ── 어류 탱크 ──
  all("riverFish", "fishTank", [
    item("sunfish", ["spring", "summer"]),
    item("catfish", ["spring", "fall"], true),
    item("shad", ["spring", "summer", "fall"], true),
    item("tigerTrout", ["fall", "winter"]),
  ]),
  all("lakeFish", "fishTank", [
    item("largemouthBass", []),
    item("carp", []),
    item("bullhead", []),
    item("sturgeon", ["summer", "winter"]),
  ]),
  all("oceanFish", "fishTank", [
    item("sardine", ["spring", "fall", "winter"]),
    item("tuna", ["summer", "winter"]),
    item("redSnapper", ["summer", "fall", "winter"]),
    item("tilapia", ["summer", "fall"]),
  ]),
  all("nightFishing", "fishTank", [
    item("walleye", ["fall"], true),
    item("bream", []),
    item("eel", ["spring", "fall"], true),
  ]),
  // 10개 중 5개 선택
  all(
    "crabPot",
    "fishTank",
    [
      item("lobster", []),
      item("crab", []),
      item("shrimp", []),
      item("crayfish", []),
      item("snail", []),
      item("periwinkle", []),
      item("mussel", []),
      item("cockle", []),
      item("oyster", []),
      item("clam", []),
    ],
    5,
  ),
  all("specialtyFish", "fishTank", [
    item("pufferfish", ["summer"]),
    item("ghostfish", []),
    item("sandfish", ["fall"]),
    item("woodskip", []),
  ]),
  // ── 식료품 저장실 (추가) ──
  all("qualityCrops", "pantry", [
    crop("parsnip", ["spring"]),
    crop("melon", ["summer"]),
    crop("pumpkin", ["fall"]),
    crop("corn", ["summer", "fall"]),
  ]),
  all(
    "animalProducts",
    "pantry",
    [
      item("largeMilk", []),
      item("largeEgg", []),
      item("largeBrownEgg", []),
      item("largeGoatMilk", []),
      item("wool", []),
      item("duckEgg", []),
    ],
    5,
  ),
  all(
    "artisan",
    "pantry",
    [
      item("truffleOil", []),
      item("cloth", []),
      item("goatCheese", []),
      item("cheese", []),
      item("honey", []),
      item("jelly", []),
      item("apple", ["fall"]),
      item("apricot", ["spring"]),
      item("orange", ["summer"]),
      item("peach", ["summer"]),
      item("pomegranate", ["fall"]),
      item("cherry", ["spring"]),
    ],
    6,
  ),
  // ── 보일러실 ──
  all("blacksmith", "boilerRoom", [
    item("copperBar", []),
    item("ironBar", []),
    item("goldBar", []),
  ]),
  all("geologist", "boilerRoom", [
    item("quartz", []),
    item("earthCrystal", []),
    item("frozenTear", []),
    item("fireQuartz", []),
  ]),
  all(
    "adventurer",
    "boilerRoom",
    [
      item("slime", []),
      item("batWing", []),
      item("solarEssence", []),
      item("voidEssence", []),
    ],
    2,
  ),
  // ── 게시판 ──
  all("chef", "bulletinBoard", [
    item("mapleSyrup", []),
    item("fiddleheadFern", ["summer"]),
    item("truffle", []),
    crop("poppy", ["summer"]),
    item("makiRoll", []),
    item("friedEgg", []),
  ]),
  all("dye", "bulletinBoard", [
    item("redMushroom", ["summer", "fall"]),
    item("seaUrchin", []),
    crop("sunflower", ["summer", "fall"]),
    item("duckFeather", []),
    item("aquamarine", []),
    crop("redCabbage", ["summer"]),
  ]),
  all("fieldResearch", "bulletinBoard", [
    item("purpleMushroom", []),
    item("nautilusShell", ["winter"]),
    item("chub", []),
    item("frozenGeode", []),
  ]),
  all("fodder", "bulletinBoard", [
    crop("wheat", ["summer", "fall"]),
    item("hay", []),
    item("apple", ["fall"]),
  ]),
  all("enchanter", "bulletinBoard", [
    item("oakResin", []),
    item("wine", []),
    item("rabbitsFoot", []),
    item("pomegranate", ["fall"]),
  ]),
];

// 번들 품목 상태 키
export function bundleItemKey(bundleId: string, itemId: string): string {
  return `${bundleId}:${itemId}`;
}
