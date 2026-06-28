import data from "./costMaterials.json";

// 비용 및 재료: 가게별 판매(건설·소환·업그레이드·교환) 물품의 비용(골드)과 재료.
// 출처: 각 가게 위키(목공 작업실/대장간/마법사의 탑/사막 상인, CC BY-NC-SA 3.0).
// 사막 상인은 골드 대신 아이템을 받으므로 gold=0이고 교환 아이템이 materials로 들어간다.
export interface CostMaterial {
  ko: string;
  en: string;
  icon: string;
  qty: number;
}

export interface CostOffer {
  ko: string;
  en: string;
  icon: string;
  gold: number; // 0이면 골드 비용 없음(아이템 교환 등)
  materials: CostMaterial[];
  day?: string; // 사막 상인 일시 판매 물품의 판매 요일
  note?: string; // 구매 조건 등 부가 설명(요일이 아닌 긴 텍스트)
  cat?: string; // 가게 내 서비스 분류(messages costMaterials.cats.*). 없으면 분류 없음
  recipe?: boolean; // 제작법 판매(아이템 자체가 아니라 레시피). 아이콘에 제작법 오버레이 표시
}

export interface CostShop {
  id: string; // carpenter | blacksmith | wizard | desertTrader
  offers: CostOffer[];
}

const shops = data as CostShop[];

// 가게 아이콘(/icons/shops/<icon>.png)
export const COST_SHOP_ICON: Record<string, string> = {
  pierre: "pierre",
  carpenter: "carpenter",
  blacksmith: "blacksmith",
  wizard: "wizardTower",
  clinic: "clinic",
  joja: "joja",
  saloon: "saloon",
  sewers: "sewers",
  ranch: "ranch",
  fishShop: "fishShop",
  adventurersGuild: "adventurersGuild",
  oasis: "oasis",
  desertTrader: "desertTrader",
  casino: "casino",
  qiWalnutRoom: "qiWalnutRoom",
};

export const COST_SHOPS = shops;
export function getCostShop(id: string): CostShop | undefined {
  return shops.find((s) => s.id === id);
}
