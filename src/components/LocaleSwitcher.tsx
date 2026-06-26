"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Dropdown from "@/components/Dropdown";

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

  // 네이티브 <select> 대신 다른 메뉴들과 동일한 커스텀 Dropdown 사용
  const options = routing.locales.map((l) => ({
    value: l,
    label: LOCALE_LABELS[l] ?? l.toUpperCase(),
  }));

  // 컴팩트 트리거: 지구본 아이콘 + 펼침 화살표만(현재 언어명 라벨 없음). 클릭 시 목록.
  return (
    <Dropdown
      value={locale}
      options={options}
      onChange={(v) => router.replace(pathname, { locale: v })}
      ariaLabel={t("ui.language")}
      compactIcon="/icons/ui/globe.png"
    />
  );
}
