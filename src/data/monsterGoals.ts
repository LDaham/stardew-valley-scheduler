// 몬스터 박멸 목표(모험가의 길드). 출처: 모험가의 길드 위키(CC BY-NC-SA 3.0).
// 표시명은 비용 데이터처럼 ko/en 인라인(자체 완결 게임 데이터). 추적기 chrome만 messages.
export interface MonsterGoal {
  id: string;
  ko: string; // 몬스터 분류명
  en: string;
  count: number; // 처치 목표 수
  reward: { ko: string; en: string; icon: string };
}

const R = "/icons/costMaterials";

export const MONSTER_GOALS: MonsterGoal[] = [
  { id: "slimes", ko: "슬라임", en: "Slimes", count: 1000, reward: { ko: "슬라임부리미 반지", en: "Slime Charmer Ring", icon: `${R}/Slime_Charmer_Ring.png` } },
  { id: "voidSpirits", ko: "공허 정령", en: "Void Spirits", count: 150, reward: { ko: "흉포한 반지", en: "Savage Ring", icon: `${R}/Savage_Ring.png` } },
  { id: "bats", ko: "박쥐", en: "Bats", count: 200, reward: { ko: "흡혈 반지", en: "Vampire Ring", icon: `${R}/Vampire_Ring.png` } },
  { id: "skeletons", ko: "해골", en: "Skeletons", count: 50, reward: { ko: "해골 가면", en: "Skeleton Mask", icon: `${R}/Skeleton_Mask.png` } },
  { id: "caveInsects", ko: "동굴 벌레", en: "Cave Insects", count: 80, reward: { ko: "곤충 머리", en: "Insect Head", icon: `${R}/Insect_Head.png` } },
  { id: "duggies", ko: "더기", en: "Duggies", count: 30, reward: { ko: "안전모", en: "Hard Hat", icon: `${R}/Hard_Hat.png` } },
  { id: "dustSprites", ko: "먼지 정령", en: "Dust Sprites", count: 500, reward: { ko: "도둑의 반지", en: "Burglar's Ring", icon: `${R}/Burglar_s_Ring.png` } },
  { id: "rockCrabs", ko: "바위 게", en: "Rock Crabs", count: 60, reward: { ko: "게딱지 반지", en: "Crabshell Ring", icon: `${R}/Crabshell_Ring.png` } },
  { id: "mummies", ko: "미라", en: "Mummies", count: 100, reward: { ko: "신비한 모자", en: "Arcane Hat", icon: `${R}/Arcane_Hat.png` } },
  { id: "pepperRex", ko: "페퍼 렉스", en: "Pepper Rex", count: 50, reward: { ko: "기사의 투구", en: "Knight's Helmet", icon: `${R}/Knight_s_Helmet.png` } },
  { id: "serpents", ko: "용", en: "Serpents", count: 250, reward: { ko: "네이팜 반지", en: "Napalm Ring", icon: `${R}/Napalm_Ring.png` } },
  { id: "magmaSprites", ko: "마그마 요정", en: "Magma Sprites", count: 150, reward: { ko: "말론의 전화번호", en: "Marlon's Phone Number", icon: "/icons/shops/adventurersGuild.png" } },
];
