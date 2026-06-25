"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Dropdown from "@/components/Dropdown";
import PixelIcon from "@/components/PixelIcon";

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

  return (
    <div className="flex items-center gap-1 text-[var(--sv-ink-muted)]">
      <span className="sr-only">{t("ui.language")}</span>
      <PixelIcon src="/icons/ui/globe.png" size={16} />
      {/* 모바일에선 폭 제한(라벨 truncate) → 네비 폭 절약. 데스크톱은 전체 표시. */}
      <div className="max-w-[6.5rem] sm:max-w-none">
        <Dropdown
          value={locale}
          options={options}
          onChange={(v) => router.replace(pathname, { locale: v })}
          ariaLabel={t("ui.language")}
        />
      </div>
    </div>
  );
}
