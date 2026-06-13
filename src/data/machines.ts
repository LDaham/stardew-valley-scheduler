// 장인 장비 처리시간(여러 날 걸리는 항목 위주). 표시명은 i18n 키로 분리.
// 출처: progress/machine 위키 (술통·절임통·양봉장)
// days: 투입 후 완성까지 걸리는 일수(위키 기준).

export interface MachineRecipe {
  id: string; // i18n machineOutputs.<id> (산출물 이름)
  days: number;
}

export interface Machine {
  id: string; // i18n machines.<id> (장비 이름)
  emoji: string;
  recipes: MachineRecipe[];
}

export const MACHINES: Machine[] = [
  {
    id: "keg",
    emoji: "🛢️",
    recipes: [
      { id: "wine", days: 7 }, // 과일 → 와인
      { id: "juice", days: 4 }, // 야채 → 주스
      { id: "paleAle", days: 2 }, // 홉 → 페일 에일 (2250분)
      { id: "beer", days: 2 }, // 밀 → 맥주 (1750분)
    ],
  },
  {
    id: "preservesJar",
    emoji: "🫙",
    recipes: [
      { id: "pickles", days: 3 }, // 야채 → 피클 (4000분)
      { id: "jelly", days: 3 }, // 과일 → 젤리 (4000분)
    ],
  },
  {
    id: "beeHouse",
    emoji: "🍯",
    recipes: [
      { id: "honey", days: 4 }, // 벌꿀 (6720분)
    ],
  },
];
