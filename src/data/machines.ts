// 장비(장인·정제) 처리시간 — 리마인더(완성 예정일) 계산용. 표시명은 i18n 키로 분리.
// 출처: progress/제작 및 각 장비 위키(술통·절임통·양봉장·숙성용 나무통·결정생성기·수액 채취기·용광로 등)
// days: 투입 후 완성까지 걸리는 일수(밤을 넘기는 기준). 0 = 같은 날 완성(몇 시간).
// 즉시 완료(씨앗 생성기·슬라임 알 압착기)와 1.6 신규(탈수기·생선 훈제기·버섯 통나무·미끼 제작기),
// 자동 생산(지렁이 통)·날씨 의존(피뢰침)은 제외한다.

export type MachineCategory = "artisan" | "refining";

export interface MachineRecipe {
  id: string; // i18n machineOutputs.<id> / 아이콘 /icons/machineOutputs/<id>.png
  days: number;
}

export interface Machine {
  id: string; // i18n machines.<id> / 아이콘 /icons/machines/<id>.png
  category: MachineCategory;
  recipes: MachineRecipe[];
}

export const MACHINES: Machine[] = [
  // ── 장인 장비 ──
  {
    id: "keg",
    category: "artisan",
    recipes: [
      { id: "wine", days: 7 }, // 과일 → 와인
      { id: "juice", days: 4 }, // 야채 → 주스
      { id: "paleAle", days: 2 }, // 홉 → 페일 에일
      { id: "beer", days: 2 }, // 밀 → 맥주
    ],
  },
  {
    id: "preservesJar",
    category: "artisan",
    recipes: [
      { id: "pickles", days: 3 }, // 야채 → 피클
      { id: "jelly", days: 3 }, // 과일 → 젤리
    ],
  },
  {
    id: "beeHouse",
    category: "artisan",
    recipes: [{ id: "honey", days: 4 }], // 꿀
  },
  {
    // 숙성용 나무통: 이리듐별 품질까지 걸리는 총 일수
    id: "cask",
    category: "artisan",
    recipes: [
      { id: "wine", days: 56 },
      { id: "paleAle", days: 34 },
      { id: "beer", days: 28 },
      { id: "mead", days: 28 },
      { id: "cheese", days: 14 },
      { id: "goatCheese", days: 14 },
    ],
  },
  {
    id: "mayonnaiseMachine",
    category: "artisan",
    recipes: [{ id: "mayonnaise", days: 0 }],
  },
  {
    id: "cheesePress",
    category: "artisan",
    recipes: [
      { id: "cheese", days: 0 },
      { id: "goatCheese", days: 0 },
    ],
  },
  {
    id: "loom",
    category: "artisan",
    recipes: [{ id: "cloth", days: 0 }],
  },
  {
    id: "oilMaker",
    category: "artisan",
    recipes: [
      { id: "truffleOil", days: 0 },
      { id: "oil", days: 1 },
    ],
  },

  // ── 정제 장비 ──
  {
    id: "furnace",
    category: "refining",
    recipes: [
      { id: "copperBar", days: 0 },
      { id: "ironBar", days: 0 },
      { id: "goldBar", days: 0 },
      { id: "iridiumBar", days: 0 },
      { id: "refinedQuartz", days: 0 },
    ],
  },
  {
    id: "recyclingMachine",
    category: "refining",
    recipes: [{ id: "recycle", days: 0 }],
  },
  {
    // 결정생성기: 보석별 복제 시간(일 단위 반올림, 12시간 미만은 같은 날)
    id: "crystalarium",
    category: "refining",
    recipes: [
      { id: "diamond", days: 5 },
      { id: "emerald", days: 2 },
      { id: "ruby", days: 2 },
      { id: "jade", days: 2 },
      { id: "aquamarine", days: 2 },
      { id: "amethyst", days: 1 },
      { id: "topaz", days: 1 },
      { id: "quartz", days: 0 },
    ],
  },
  {
    id: "charcoalKiln",
    category: "refining",
    recipes: [{ id: "coal", days: 0 }],
  },
  {
    id: "boneMill",
    category: "refining",
    recipes: [{ id: "boneFertilizer", days: 0 }],
  },
  {
    id: "geodeCrusher",
    category: "refining",
    recipes: [{ id: "mineral", days: 0 }],
  },
  {
    id: "woodChipper",
    category: "refining",
    recipes: [{ id: "wood", days: 0 }],
  },
  {
    id: "tapper",
    category: "refining",
    recipes: [
      { id: "mapleSyrup", days: 9 },
      { id: "oakResin", days: 7 },
      { id: "pineTar", days: 5 },
    ],
  },
  {
    id: "heavyTapper",
    category: "refining",
    recipes: [
      { id: "mapleSyrup", days: 5 },
      { id: "oakResin", days: 4 },
      { id: "pineTar", days: 3 },
    ],
  },
  {
    id: "slimeIncubator",
    category: "refining",
    recipes: [{ id: "slimeHatch", days: 3 }], // 슬라임 알 부화(약 2~3일)
  },
  {
    id: "ostrichIncubator",
    category: "refining",
    recipes: [{ id: "ostrichHatch", days: 9 }], // 타조알 부화(약 9.5일)
  },
  {
    id: "solarPanel",
    category: "refining",
    recipes: [{ id: "batteryPack", days: 10 }], // 맑은 날 10일
  },
];

export const MACHINE_CATEGORIES: MachineCategory[] = ["artisan", "refining"];
