// 목공 작업실(로빈) 농장 건물·농가 업그레이드 정의.
// 출처: progress/목공 작업실 - Stardew Valley Wiki.html
// 표시명은 i18n 키로 분리: buildings.<id>(건물명), materials.<id>(재료명).
// buildDays: 0=즉시(당일), 2/3=주문 다음날부터 건설에 걸리는 일수(위키 기준).

export interface BuildingMaterial {
  id: string; // i18n materials.<id> / 아이콘 /icons/materials/<id>.png
  qty: number;
}

export type BuildingCategory = "animal" | "other" | "cabin" | "farmhouse";

export interface BuildingDef {
  id: string; // i18n buildings.<id> / 아이콘 /icons/buildings/<id>.png
  category: BuildingCategory;
  gold: number;
  materials: BuildingMaterial[];
  buildDays: number; // 0=즉시, 2 또는 3
  requires?: string; // 선행 건물 id(업그레이드 체인) — 참고용 안내
}

export const BUILDINGS: BuildingDef[] = [
  // 동물 건물(3일)
  { id: "coop", category: "animal", gold: 4000, buildDays: 3, materials: [{ id: "wood", qty: 300 }, { id: "stone", qty: 100 }] },
  { id: "bigCoop", category: "animal", gold: 10000, buildDays: 3, requires: "coop", materials: [{ id: "wood", qty: 400 }, { id: "stone", qty: 150 }] },
  { id: "deluxeCoop", category: "animal", gold: 20000, buildDays: 3, requires: "bigCoop", materials: [{ id: "wood", qty: 500 }, { id: "stone", qty: 200 }] },
  { id: "barn", category: "animal", gold: 6000, buildDays: 3, materials: [{ id: "wood", qty: 350 }, { id: "stone", qty: 150 }] },
  { id: "bigBarn", category: "animal", gold: 12000, buildDays: 3, requires: "barn", materials: [{ id: "wood", qty: 450 }, { id: "stone", qty: 200 }] },
  { id: "deluxeBarn", category: "animal", gold: 25000, buildDays: 3, requires: "bigBarn", materials: [{ id: "wood", qty: 550 }, { id: "stone", qty: 300 }] },

  // 기타 건물(2일)
  { id: "fishPond", category: "other", gold: 5000, buildDays: 2, materials: [{ id: "stone", qty: 200 }, { id: "seaweed", qty: 5 }, { id: "greenAlgae", qty: 5 }] },
  { id: "mill", category: "other", gold: 2500, buildDays: 2, materials: [{ id: "stone", qty: 50 }, { id: "wood", qty: 150 }, { id: "cloth", qty: 4 }] },
  { id: "shed", category: "other", gold: 15000, buildDays: 2, materials: [{ id: "wood", qty: 300 }] },
  { id: "bigShed", category: "other", gold: 20000, buildDays: 2, requires: "shed", materials: [{ id: "wood", qty: 550 }, { id: "stone", qty: 300 }] },
  { id: "silo", category: "other", gold: 100, buildDays: 2, materials: [{ id: "stone", qty: 100 }, { id: "clay", qty: 10 }, { id: "copperBar", qty: 5 }] },
  { id: "slimeHutch", category: "other", gold: 10000, buildDays: 2, materials: [{ id: "stone", qty: 500 }, { id: "refinedQuartz", qty: 10 }, { id: "iridiumBar", qty: 1 }] },
  { id: "stable", category: "other", gold: 10000, buildDays: 2, materials: [{ id: "hardwood", qty: 100 }, { id: "ironBar", qty: 5 }] },
  { id: "well", category: "other", gold: 1000, buildDays: 2, materials: [{ id: "stone", qty: 75 }] },

  // 오두막·배송 상자(즉시)
  { id: "stoneCabin", category: "cabin", gold: 100, buildDays: 0, materials: [{ id: "stone", qty: 10 }] },
  { id: "plankCabin", category: "cabin", gold: 100, buildDays: 0, materials: [{ id: "wood", qty: 5 }, { id: "fiber", qty: 10 }] },
  { id: "logCabin", category: "cabin", gold: 100, buildDays: 0, materials: [{ id: "wood", qty: 10 }] },
  { id: "shippingBin", category: "cabin", gold: 250, buildDays: 0, materials: [{ id: "wood", qty: 150 }] },

  // 농가 업그레이드(3일)
  { id: "farmhouse1", category: "farmhouse", gold: 10000, buildDays: 3, materials: [{ id: "wood", qty: 450 }] },
  { id: "farmhouse2", category: "farmhouse", gold: 65000, buildDays: 3, requires: "farmhouse1", materials: [{ id: "hardwood", qty: 100 }] },
  { id: "farmhouse3", category: "farmhouse", gold: 100000, buildDays: 3, requires: "farmhouse2", materials: [] },
];

export const BUILDING_CATEGORIES: BuildingCategory[] = ["animal", "other", "cabin", "farmhouse"];
