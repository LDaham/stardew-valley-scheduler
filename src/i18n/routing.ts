import { defineRouting } from "next-intl/routing";

// 지원 언어: 공식 게임이 지원하는 12개 언어(한국어 기본).
// 게임 용어는 인게임 추출 번역을 쓰고, 앱 고유 UI 문구는 미번역 시 영어로 폴백한다(request.ts).
export const routing = defineRouting({
  locales: [
    "ko",
    "en",
    "de",
    "es",
    "fr",
    "it",
    "hu",
    "ja",
    "pt-BR",
    "ru",
    "tr",
    "zh-CN",
  ],
  defaultLocale: "ko",
  // 정적 추출(미들웨어 없음)에서는 기본 언어도 접두사가 필요하다.
  // 루트(/)는 public/index.html이 /ko/로 리다이렉트한다.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
