// 게임 아이템 표시명을 현재 로케일로 해석한다.
// 표는 인게임 XNB에서 추출(progress/extract-xnb.cjs → src/data/gameItemNames.json),
// 영문명(en)을 키로 12개 언어를 담는다. 게임 번역이 없으면 ko 또는 영어(en)로 폴백.
import NAMES from "@/data/gameItemNames.json";

const TABLE = NAMES as Record<string, Record<string, string>>;

export function localizeItem(en: string, ko: string, locale: string): string {
  const row = TABLE[en];
  if (row) {
    const v = row[locale];
    if (v) return v;
  }
  // 게임 표에 없는 항목(앱 카테고리 라벨 등): ko 또는 영어로 폴백
  return locale === "ko" ? ko : en;
}
