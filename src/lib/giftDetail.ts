// 자동 생성(scratchpad/genDetailMap.cjs). 선물 카테고리 칩의 한국어 detail(데이터) → 메시지 슬러그.
// 데이터는 한국어 그대로 유지(expandCategory 파싱·표시 일관). 표시(툴팁)만 현지화.
// 공백 차이로 인한 변형을 흡수하기 위해 키는 공백을 제거한 형태로 비교한다.
const DETAIL_SLUG: Record<string, string> = {
  "모든달걀(공허의달걀제외)": "d19",
  "모든장인제작품(기름은싫어하고,공허마요네즈는혐오하는선물이므로제외)": "d39",
  "모든요리(계란프라이와빵은보편적으로평범하고,수상한롤과바다거품푸딩은혐오하는선물이므로제외)": "d35",
  "모든꽃(양귀비는혐오하는선물이므로제외)": "d18",
  "모든채집광물(석영은주민들에따라다름)": "d41",
  "모든과일나무열매(바나나와망고는제외)": "d17",
  "모든보석(무지갯빛파편은사랑하는선물이니제외)": "d25",
  "모든야채,청나래고사리포함(홉,찻잎,밀은보편적으로보통이고,가공되지않은쌀은보편적으로싫어하는선물이므로제외.)생명의영약메이플시럽피나콜라다": "d33",
  "모든과일(과수과일&새먼베리제외)": "d05",
  "모든버섯(붉은버섯제외)": "d23",
  "모든우유": "d36",
  "모든과일(석류&새먼베리제외)": "d13",
  "모든책": "d42",
  "모든생선(잉어,바닷가재,문어,해삼,달팽이&오징어제외)": "d31",
  "모든과일(새먼베리&백량금제외)": "d12",
  "모든달걀(오리알&공허의달걀)": "d20",
  "모든과일(선인장열매,과수과일&새먼베리제외)": "d14",
  "모든생선(잉어,가자미,&달팽이제외)": "d28",
  "모든과일(매운고추제외)": "d07",
  "모든과일": "d01",
  "모든버섯(흔한버섯&붉은버섯제외)": "d24",
  "모든과일(블랙베리,수정과일,과수과일,새먼베리&딸기)": "d11",
  "모든유물": "d37",
  "모든과일(과수과일,포도,멜론&새먼베리제외)": "d04",
  "모든버섯(붉은버섯&보라색버섯제외)": "d22",
  "모든과일(딸기제외)": "d06",
  "모든생선(잉어&달팽이제외)": "d32",
  "모든과일(과수과일,새먼베리&백량금제외)": "d03",
  "모든과일(백량금제외)": "d08",
  "모든과일(과수과일,망고,새먼베리,&백량금제외)": "d02",
  "모든달걀(타조알과공허의달걀)제외": "d21",
  "모든생선": "d26",
  "모든과일(블랙베리,선인장열매,코코넛,과수과일,매운고추,&새먼베리제외)": "d10",
  "모든과일(선인장열매&코코넛제외)": "d15",
  "모든생선(달팽이제외)": "d27",
  "모든과일(선인장열매제외)": "d16",
  "모든생선(잉어,문어,달팽이&오징어제외)": "d30",
  "모든과일(복숭아제외)": "d09",
  "모든생선(잉어,메기,범노래미,문어,해삼,달팽이,철갑상어&타이거송어)": "d29",
  "모든장신구": "d38",
  "모든정동석광물": "d40",
  "모든야채,청나래고사리포함(홉,찻잎,밀은보편적으로보통이고,가공되지않은쌀은보편적으로싫어하는선물이므로제외)": "d34"
};

export function giftDetailSlug(detail?: string): string | undefined {
  if (!detail) return undefined;
  return DETAIL_SLUG[detail.replace(/\s+/g, "")];
}

// 카테고리 칩(보편/규칙 선물) 영문 라벨 → gift.categories 키.
// 대부분 entry.cat과 같으나 "All Vegetables"는 cat=null이라 영문 라벨로 매핑한다.
const CATEGORY_KEY: Record<string, string> = {
  "All Fruits": "fruits",
  "All Tree Fruit": "treeFruit",
  "All Flowers": "flowers",
  "All Eggs": "eggs",
  "All Mushrooms": "mushrooms",
  "All Gems": "gems",
  "All Fish": "fish",
  "All Vegetables": "vegetables",
  "All Cooking": "cooking",
  "All Milk": "milk",
  "All Artifacts": "artifacts",
  "All Trinkets": "trinkets",
  "All Books": "books",
  "All Artisan Goods": "artisanGoods",
  "All Foraged Minerals": "foragedMinerals",
  "All Geode Minerals": "geodeMinerals",
};
export function giftCategoryKey(en: string): string | undefined {
  return CATEGORY_KEY[en];
}
