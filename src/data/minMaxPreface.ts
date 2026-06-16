// min/max 가이드 머릿말(Preface) 한국어 요약 — '규칙' 버튼에서 표시.
// 출처: "Stardew Valley Min-Max Routing / Strategy" by BlackSight6 & Zamiel
//   https://github.com/Zamiell/stardew-valley/blob/master/Min-Max_Guide.md
// 커뮤니티 가이드의 비영리 요약·번역(저작권은 원저자). 게임 버전 1.6 기준.

export interface PrefaceSection {
  title: string;
  points: string[];
}

// 가이드 자체에 대한 소개
export const MIN_MAX_INTRO =
  "BlackSight6 & Zamiel이 만든 숙련자용 min-max 루트입니다. 게임 버전 1.6 기준이며, 여러 게임 메커니즘에 대한 지식을 전제로 합니다. 봄이 가장 상세하고 여름부터는 점점 개략적입니다.";

export const MIN_MAX_PREFACE: PrefaceSection[] = [
  {
    title: "목표",
    points: [
      "첫 여름이 끝날 때까지 번 돈의 총액을 극대화한다(잘하면 최대 약 500만 골드).",
      "돈 극대화를 위해 NPC 친밀도·박물관 채우기·마을회관 완성은 해골 동굴 해금에 필요한 최소한을 빼고 모두 무시한다.",
      "여름 이후엔 본인 목표(돈 계속 벌기, 친밀도, 완벽 등)에 맞춰 자유롭게 진행한다.",
    ],
  },
  {
    title: "루트 개요",
    points: [
      "대량 낚시로 시작한다.",
      "곡괭이를 최대한 빨리 금으로 업그레이드한다.",
      "해골 동굴(사막동굴)을 최대한 빨리 해금한다.",
      "해금 후 이리듐 주괴를 제작·판매해 큰돈을 번다(낚시+사막동굴이 딸기 대량 재배보다 훨씬 이득).",
      "그 수입으로 스타프루트+고급 성장촉진제를 사 여름에 스타프루트를 3번 수확한다(고급 스프링클러로 자동 급수).",
    ],
  },
  {
    title: "규칙",
    points: [
      "최신 버전 바닐라(모드·예측기·아이템 스폰 치트 없음)를 전제로 한다.",
      "실수해도 그날을 리셋하지 않는다(즉흥 대응으로 난이도를 유지).",
      "첫날을 반복해 유물·봄양파 등을 보장하지 않는다.",
      "가능한 한 회색지대 전략을 적게 써서 난이도를 높이는 것을 권장한다(상세 제약은 가이드 부록 A 참고).",
    ],
  },
];
