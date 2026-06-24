// 현장 사무소(진저 섬 스네일 박사) 기증 항목. 출처: 현장 사무소 위키(CC BY-NC-SA 3.0).
// 표시명은 ko/en 인라인. 기증 완료 여부만 체크. qty=요구 수량(라벨에 표기).
export interface FieldOfficeItem {
  id: string;
  ko: string;
  en: string;
  qty: number;
}

export const FIELD_OFFICE_ITEMS: FieldOfficeItem[] = [
  // 거대 동물 화석
  { id: "fossilizedLeg", ko: "화석화된 다리", en: "Fossilized Leg", qty: 2 },
  { id: "fossilizedRibs", ko: "화석화된 늑골", en: "Fossilized Ribs", qty: 1 },
  { id: "fossilizedSkull", ko: "화석화된 두개골", en: "Fossilized Skull", qty: 1 },
  { id: "fossilizedSpine", ko: "화석화된 척추", en: "Fossilized Spine", qty: 1 },
  { id: "fossilizedTail", ko: "화석화된 꼬리", en: "Fossilized Tail", qty: 1 },
  // 그 외 화석
  { id: "mummifiedFrog", ko: "미이라화된 개구리", en: "Mummified Frog", qty: 1 },
  { id: "mummifiedBat", ko: "미이라화된 박쥐", en: "Mummified Bat", qty: 1 },
  { id: "snakeSkull", ko: "뱀 두개골", en: "Snake Skull", qty: 1 },
  { id: "snakeVertebrae", ko: "뱀 척추", en: "Snake Vertebrae", qty: 2 },
  // 채집 조사
  { id: "purpleFlower", ko: "보라색 꽃", en: "Purple Flower", qty: 22 },
  { id: "purpleStarfish", ko: "보라색 불가사리", en: "Purple Starfish", qty: 18 },
];
