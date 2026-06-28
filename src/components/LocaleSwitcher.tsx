"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Dropdown from "@/components/Dropdown";

// 드롭다운 표시 순서(원어 표기 기준 사용자 지정 정렬)
const DISPLAY_ORDER = [
  "de",
  "en",
  "es",
  "fr",
  "it",
  "ja",
  "ko",
  "hu",
  "pt-BR",
  "ru",
  "tr",
  "zh-CN",
];

// 각 로케일의 원어 표기(드롭다운 표시용)
const LOCALE_LABELS: Record<string, string> = {
  ko: "한국어",
  en: "English",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  hu: "Magyar",
  ja: "日本語",
  "pt-BR": "Português (BR)",
  ru: "Русский",
  tr: "Türkçe",
  "zh-CN": "简体中文",
};

export default function LocaleSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // 네이티브 <select> 대신 다른 메뉴들과 동일한 커스텀 Dropdown 사용.
  // 표시 순서는 DISPLAY_ORDER를 따르되, 누락 로케일은 뒤에 보충한다.
  const ordered = [
    ...DISPLAY_ORDER.filter((l) =>
      (routing.locales as readonly string[]).includes(l),
    ),
    ...routing.locales.filter((l) => !DISPLAY_ORDER.includes(l)),
  ];
  const options = ordered.map((l) => ({
    value: l,
    label: LOCALE_LABELS[l] ?? l.toUpperCase(),
  }));

  // 컴팩트 트리거: 지구본 아이콘 + 펼침 화살표만(현재 언어명 라벨 없음). 클릭 시 목록.
  return (
    <Dropdown
      value={locale}
      options={options}
      onChange={(v) => {
        // 현재 보기(?tab=&tool=&view=&sub=)를 유지한 채 언어만 바꾼다.
        // pathname에는 쿼리가 없으므로 location.search를 직접 덧붙인다.
        const search =
          typeof window !== "undefined" ? window.location.search : "";
        router.replace(`${pathname}${search}`, { locale: v });
      }}
      ariaLabel={t("ui.language")}
      compactIcon="/icons/ui/globe.png"
    />
  );
}
