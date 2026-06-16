// 장비(장인·정제) 처리시간 — 리마인더(완성 예정일) 계산용. 표시명은 i18n 키로 분리.
// 출처: progress/제작 및 각 장비 위키(술통·절임통·양봉장·숙성용 나무통·결정생성기·수액 채취기·용광로 등)
// days: 투입 후 완성까지 걸리는 일수(밤을 넘기는 기준).
// 같은 날 완성(days 0)되는 품목은 일정 관리가 불필요하므로 제외하고, 하루 이상 걸리는 품목만 남긴다.
// (그 결과 모든 산출물이 같은 날이던 장비 - 용광로·치즈 압착기·재활용 기계 등 - 는 통째로 제외)

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
    id: "oilMaker",
    category: "artisan",
    recipes: [{ id: "oil", days: 1 }],
  },

  // ── 정제 장비 ──
  {
    // 결정생성기: 보석별 복제 시간(일 단위 반올림, 12시간 미만 항목은 제외)
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
    ],
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
