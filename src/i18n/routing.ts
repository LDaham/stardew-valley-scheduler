import { defineRouting } from "next-intl/routing";

// 지원 언어: 한국어(기본), 영어. 추후 확장 가능.
export const routing = defineRouting({
  locales: ["ko", "en"],
  defaultLocale: "ko",
  // 정적 추출(미들웨어 없음)에서는 기본 언어도 접두사가 필요하다.
  // 루트(/)는 public/index.html이 /ko/로 리다이렉트한다.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
