// 현장 사무소(진저 섬 스네일 박사) 기증 화석. 출처: 현장 사무소 위키(CC BY-NC-SA 3.0).
// 표시명은 ko/en 인라인. 기증 완료 여부만 체크. qty=요구 수량(라벨에 표기).
export interface FieldOfficeItem {
  id: string;
  ko: string;
  en: string;
  icon: string;
  qty: number;
}

const I = "/icons/fieldOffice";

export const FIELD_OFFICE_ITEMS: FieldOfficeItem[] = [
  // 거대 동물 화석
  { id: "fossilizedLeg", ko: "화석화된 다리", en: "Fossilized Leg", icon: `${I}/Fossilized_Leg.png`, qty: 2 },
  { id: "fossilizedRibs", ko: "화석화된 늑골", en: "Fossilized Ribs", icon: `${I}/Fossilized_Ribs.png`, qty: 1 },
  { id: "fossilizedSkull", ko: "화석화된 두개골", en: "Fossilized Skull", icon: `${I}/Fossilized_Skull.png`, qty: 1 },
  { id: "fossilizedSpine", ko: "화석화된 척추", en: "Fossilized Spine", icon: `${I}/Fossilized_Spine.png`, qty: 1 },
  { id: "fossilizedTail", ko: "화석화된 꼬리", en: "Fossilized Tail", icon: `${I}/Fossilized_Tail.png`, qty: 1 },
  // 그 외 화석
  { id: "mummifiedFrog", ko: "미이라화된 개구리", en: "Mummified Frog", icon: `${I}/Mummified_Frog.png`, qty: 1 },
  { id: "mummifiedBat", ko: "미이라화된 박쥐", en: "Mummified Bat", icon: `${I}/Mummified_Bat.png`, qty: 1 },
  { id: "snakeSkull", ko: "뱀 두개골", en: "Snake Skull", icon: `${I}/Snake_Skull.png`, qty: 1 },
  { id: "snakeVertebrae", ko: "뱀 척추", en: "Snake Vertebrae", icon: `${I}/Snake_Vertebrae.png`, qty: 2 },
];
