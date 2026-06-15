// 리믹스 꾸러미(Remixed Bundles) 정의.
// 출처: progress/리믹스 꾸러미 - Stardew Valley Wiki.html
//
// 구조: 방마다 "슬롯"이 있고, 슬롯은 세 종류다.
//  - fixed: 항상 등장(자동 표시). bundles 전부를 보여준다.
//  - 택1(pick=1, fixed=false): 후보 꾸러미 중 1개를 사용자가 선택.
//  - 택K(pick=K, fixed=false): 후보 꾸러미 중 K개를 사용자가 선택.
//
// needed(채워야 하는 칸 수)는 위키가 "무작위로 N개가 선정됨"이라 명시한 경우 N을,
// 명시가 없으면 표준 꾸러미(data/bundles.ts) 동등값을 따른다(일부는 추정 — 주석 표시).
// 리믹스 꾸러미 id는 표준과 충돌하지 않도록 모두 rx_ 접두를 쓴다.

import type { Bundle, BundleItem } from "@/data/bundles";
import type { Season } from "@/lib/calendar";

const c = (id: string, seasons: Season[] = []): BundleItem => ({
  id,
  nameKey: `crops.${id}`,
  seasons,
});
const b = (
  id: string,
  seasons: Season[] = [],
  rainy = false,
): BundleItem => ({ id, nameKey: `bundleItem.${id}`, seasons, rainy });

const bundle = (
  id: string,
  roomKey: string,
  items: BundleItem[],
  needed: number = items.length,
): Bundle => ({ id, roomKey, needed, items });

export interface RemixSlot {
  id: string; // 슬롯 고유 키(선택 저장용)
  roomKey: string; // i18n bundleRoom.<room>
  fixed: boolean; // true=자동 표시(선택 UI 없음)
  pick: number; // 표시할 꾸러미 수(고정=후보 길이, 택1=1, 택K=K)
  bundles: Bundle[]; // 후보 꾸러미
}

export const REMIX_SLOTS: RemixSlot[] = [
  // ── 공예실 ──
  {
    id: "crafts1", roomKey: "craftsRoom", fixed: true, pick: 1,
    bundles: [
      bundle("rx_springForaging", "craftsRoom", [
        b("wildHorseradish", ["spring"]),
        b("daffodil", ["spring"]),
        b("leek", ["spring"]),
        b("dandelion", ["spring"]),
        b("springOnion", ["spring"]),
      ], 4),
    ],
  },
  {
    id: "crafts2", roomKey: "craftsRoom", fixed: true, pick: 1,
    bundles: [
      bundle("rx_summerForaging", "craftsRoom", [
        c("grape", ["summer"]),
        b("spiceBerry", ["summer"]),
        b("sweetPea", ["summer"]),
      ]),
    ],
  },
  {
    id: "crafts3", roomKey: "craftsRoom", fixed: true, pick: 1,
    bundles: [
      bundle("rx_fallForaging", "craftsRoom", [
        b("commonMushroom", ["fall"]),
        b("wildPlum", ["fall"]),
        b("hazelnut", ["fall"]),
        b("blackberry", ["fall"]),
      ]),
    ],
  },
  {
    id: "crafts4", roomKey: "craftsRoom", fixed: true, pick: 1,
    bundles: [
      bundle("rx_winterForaging", "craftsRoom", [
        b("winterRoot", ["winter"]),
        b("crystalFruit", ["winter"]),
        b("snowYam", ["winter"]),
        b("crocus", ["winter"]),
        b("holly", ["winter"]),
      ], 4),
    ],
  },
  {
    id: "crafts5", roomKey: "craftsRoom", fixed: false, pick: 1,
    bundles: [
      bundle("rx_construction", "craftsRoom", [
        b("wood", []),
        b("wood2", []),
        b("stone", []),
        b("hardwood", []),
      ]),
      bundle("rx_sticky", "craftsRoom", [b("sap", [])]),
      // 숲 꾸러미: 위키 "무작위로 3개가 선정됨" → needed 3
      bundle("rx_forest", "craftsRoom", [
        b("moss", []),
        b("fiber", []),
        b("acorn", []),
        b("mapleSeed", []),
      ], 3),
    ],
  },
  {
    id: "crafts6", roomKey: "craftsRoom", fixed: false, pick: 1,
    bundles: [
      bundle("rx_exoticForaging", "craftsRoom", [
        b("coconut", []),
        b("cactusFruit", []),
        b("caveCarrot", []),
        b("redMushroom", ["summer", "fall"]),
        b("purpleMushroom", []),
        b("mapleSyrup", []),
        b("oakResin", []),
        b("pineTar", []),
        b("morel", ["spring"]),
      ], 5),
      bundle("rx_wildMedicine", "craftsRoom", [
        b("purpleMushroom", []),
        b("fiddleheadFern", ["summer"]),
        b("whiteAlgae", []),
        c("hops", ["summer"]),
      ]),
    ],
  },

  // ── 식료품 저장실 ──
  {
    id: "pantry1", roomKey: "pantry", fixed: true, pick: 1,
    bundles: [
      bundle("rx_springCrops", "pantry", [
        c("parsnip", ["spring"]),
        c("greenBean", ["spring"]),
        c("cauliflower", ["spring"]),
        c("potato", ["spring"]),
        c("kale", ["spring"]),
        c("carrot", ["spring"]),
      ], 4),
    ],
  },
  {
    id: "pantry2", roomKey: "pantry", fixed: true, pick: 1,
    bundles: [
      bundle("rx_summerCrops", "pantry", [
        c("tomato", ["summer"]),
        c("hotPepper", ["summer"]),
        c("blueberry", ["summer"]),
        c("melon", ["summer"]),
        c("summerSquash", ["summer"]),
      ], 4),
    ],
  },
  {
    id: "pantry3", roomKey: "pantry", fixed: true, pick: 1,
    bundles: [
      bundle("rx_fallCrops", "pantry", [
        c("corn", ["summer", "fall"]),
        c("eggplant", ["fall"]),
        c("pumpkin", ["fall"]),
        c("yam", ["fall"]),
        c("broccoli", ["fall"]),
      ], 4),
    ],
  },
  {
    id: "pantry4", roomKey: "pantry", fixed: false, pick: 1,
    bundles: [
      // 고급 작물(금별): needed는 추정(3) — 위키 미명시
      bundle("rx_qualityCrops", "pantry", [
        c("parsnip", ["spring"]),
        c("greenBean", ["spring"]),
        c("potato", ["spring"]),
        c("cauliflower", ["spring"]),
        c("melon", ["summer"]),
        c("blueberry", ["summer"]),
        c("hotPepper", ["summer"]),
        c("pumpkin", ["fall"]),
        c("yam", ["fall"]),
        c("eggplant", ["fall"]),
        c("corn", ["summer", "fall"]),
      ], 3),
      bundle("rx_rareCrops", "pantry", [
        c("ancientFruit", ["spring", "summer", "fall"]),
        c("sweetGemBerry", ["fall"]),
      ]),
    ],
  },
  {
    id: "pantry5", roomKey: "pantry", fixed: false, pick: 1,
    bundles: [
      bundle("rx_animal", "pantry", [
        b("largeMilk", []),
        b("largeEgg", []),
        b("largeBrownEgg", []),
        b("largeGoatMilk", []),
        b("wool", []),
        b("duckEgg", []),
      ], 5),
      bundle("rx_fishFarmer", "pantry", [
        b("roe", []),
        b("agedRoe", []),
        b("squidInk", []),
      ]),
      // 정원 꾸러미: needed 추정(4) — 위키 미명시
      bundle("rx_garden", "pantry", [
        c("tulip", ["spring"]),
        c("blueJazz", ["spring"]),
        c("summerSpangle", ["summer"]),
        c("sunflower", ["summer", "fall"]),
        c("fairyRose", ["fall"]),
      ], 4),
    ],
  },
  {
    id: "pantry6", roomKey: "pantry", fixed: false, pick: 1,
    bundles: [
      bundle("rx_artisan", "pantry", [
        b("truffleOil", []),
        b("cloth", []),
        b("goatCheese", []),
        b("honey", []),
        b("jelly", []),
        b("apple", ["fall"]),
        b("apricot", ["spring"]),
        b("orange", ["summer"]),
        b("peach", ["summer"]),
        b("pomegranate", ["fall"]),
        b("cherry", ["spring"]),
      ], 6),
      bundle("rx_brewer", "pantry", [
        b("mead", []),
        b("paleAle", []),
        b("wine", []),
        b("juice", []),
        b("greenTea", []),
      ]),
    ],
  },

  // ── 어항 ──
  {
    id: "fish1", roomKey: "fishTank", fixed: true, pick: 1,
    bundles: [
      bundle("rx_riverFish", "fishTank", [
        b("sunfish", ["spring", "summer"]),
        b("catfish", ["spring", "fall"], true),
        b("shad", ["spring", "summer", "fall"], true),
        b("tigerTrout", ["fall", "winter"]),
      ]),
    ],
  },
  {
    id: "fish2", roomKey: "fishTank", fixed: true, pick: 1,
    bundles: [
      bundle("rx_lakeFish", "fishTank", [
        b("largemouthBass", []),
        b("carp", []),
        b("bullhead", []),
        b("sturgeon", ["summer", "winter"]),
      ]),
    ],
  },
  {
    id: "fish3", roomKey: "fishTank", fixed: true, pick: 1,
    bundles: [
      bundle("rx_oceanFish", "fishTank", [
        b("sardine", ["spring", "fall", "winter"]),
        b("tuna", ["summer", "winter"]),
        b("redSnapper", ["summer", "fall", "winter"], true),
        b("tilapia", ["summer", "fall"]),
      ]),
    ],
  },
  {
    id: "fish4", roomKey: "fishTank", fixed: true, pick: 1,
    bundles: [
      bundle("rx_nightFish", "fishTank", [
        b("walleye", ["fall"], true),
        b("bream", []),
        b("eel", ["spring", "fall"], true),
      ]),
    ],
  },
  {
    id: "fish5", roomKey: "fishTank", fixed: true, pick: 1,
    bundles: [
      bundle("rx_crabPot", "fishTank", [
        b("lobster", []),
        b("crab", []),
        b("shrimp", []),
        b("crayfish", []),
        b("snail", []),
        b("periwinkle", []),
        b("mussel", []),
        b("cockle", []),
        b("oyster", []),
        b("clam", []),
      ], 5),
    ],
  },
  {
    id: "fish6", roomKey: "fishTank", fixed: false, pick: 1,
    bundles: [
      bundle("rx_specialtyFish", "fishTank", [
        b("pufferfish", ["summer"]),
        b("ghostfish", []),
        b("sandfish", ["fall"]),
        b("woodskip", []),
      ]),
      bundle("rx_qualityFish", "fishTank", [
        b("largemouthBass", []),
        b("shad", [], true),
        b("tuna", ["summer", "winter"]),
        b("walleye", ["fall"], true),
      ]),
      bundle("rx_masterFisher", "fishTank", [
        b("lavaEel", []),
        b("scorpionCarp", []),
        b("octopus", ["summer"]),
        b("blobfish", ["winter"]),
      ]),
    ],
  },

  // ── 보일러실: 5개 중 3개 선택 ──
  {
    id: "boiler", roomKey: "boilerRoom", fixed: false, pick: 3,
    bundles: [
      bundle("rx_blacksmith", "boilerRoom", [
        b("copperBar", []),
        b("ironBar", []),
        b("goldBar", []),
      ]),
      bundle("rx_geologist", "boilerRoom", [
        b("quartz", []),
        b("earthCrystal", []),
        b("frozenTear", []),
        b("fireQuartz", []),
      ]),
      // 모험: 위키 "목록 중 4개 무작위 선정" — 표준 모험 꾸러미 needed 2를 따름
      bundle("rx_adventurer", "boilerRoom", [
        b("slime", []),
        b("batWing", []),
        b("solarEssence", []),
        b("voidEssence", []),
        b("boneFragment", []),
      ], 2),
      bundle("rx_treasureHunter", "boilerRoom", [
        b("amethyst", []),
        b("aquamarine", []),
        b("diamond", []),
        b("emerald", []),
        b("ruby", []),
        b("topaz", []),
      ], 3),
      bundle("rx_engineer", "boilerRoom", [
        b("iridiumOre", []),
        b("batteryPack", []),
        b("refinedQuartz", []),
      ]),
    ],
  },

  // ── 게시판: 9개 중 5개 선택 ──
  {
    id: "bulletin", roomKey: "bulletinBoard", fixed: false, pick: 5,
    bundles: [
      bundle("rx_chef", "bulletinBoard", [
        b("mapleSyrup", []),
        b("fiddleheadFern", ["summer"]),
        b("truffle", []),
        c("poppy", ["summer"]),
        b("makiRoll", []),
        b("friedEgg", []),
      ]),
      bundle("rx_dye", "bulletinBoard", [
        b("redMushroom", ["summer", "fall"]),
        c("beet", ["fall"]),
        b("seaUrchin", []),
        c("amaranth", ["fall"]),
        c("sunflower", ["summer", "fall"]),
        c("starfruit", ["summer"]),
        b("duckFeather", []),
        c("cactusFruit", []),
        b("aquamarine", []),
        c("blueberry", ["summer"]),
        c("redCabbage", ["summer"]),
        b("iridiumBar", []),
      ], 6),
      bundle("rx_fieldResearch", "bulletinBoard", [
        b("purpleMushroom", []),
        b("nautilusShell", ["winter"]),
        b("chub", []),
        b("frozenGeode", []),
      ]),
      bundle("rx_fodder", "bulletinBoard", [
        c("wheat", ["summer", "fall"]),
        b("hay", []),
        b("apple", ["fall"]),
      ]),
      bundle("rx_enchanter", "bulletinBoard", [
        b("oakResin", []),
        b("wine", []),
        b("rabbitsFoot", []),
        b("pomegranate", ["fall"]),
      ]),
      bundle("rx_homestead", "bulletinBoard", [
        b("egg", []),
        b("milk", []),
        b("flour", []),
      ]),
      bundle("rx_child", "bulletinBoard", [
        b("salmonberry", ["spring"]),
        b("cookie", []),
        b("ancientDoll", []),
        b("iceCream", ["summer"]),
      ]),
      bundle("rx_forager", "bulletinBoard", [
        b("salmonberry", ["spring"]),
        b("blackberry", ["fall"]),
        b("wildPlum", ["fall"]),
      ]),
      bundle("rx_spiritsEve", "bulletinBoard", [
        b("jackOLantern", ["fall"]),
        c("corn", ["summer", "fall"]),
        b("batWing", []),
      ]),
    ],
  },

  // ── 금고: 고정(돈 꾸러미 4종) ──
  {
    id: "vault", roomKey: "vault", fixed: true, pick: 1,
    bundles: [
      bundle("rx_vault2500", "vault", [b("vault2500", [])]),
      bundle("rx_vault5000", "vault", [b("vault5000", [])]),
      bundle("rx_vault10000", "vault", [b("vault10000", [])]),
      bundle("rx_vault25000", "vault", [b("vault25000", [])]),
    ],
  },
];
