"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
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

  return (
    <label className="flex items-center gap-1 text-xs text-[var(--sv-ink-muted)]">
      <span className="sr-only">{t("ui.language")}</span>
      <PixelIcon src="/icons/ui/globe.png" size={16} />
      <select
        value={locale}
        onChange={(e) =>
          router.replace(pathname, { locale: e.target.value })
        }
        className="rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] px-2 py-1"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {LOCALE_LABELS[l] ?? l.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
