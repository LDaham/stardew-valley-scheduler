"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import PixelIcon from "@/components/PixelIcon";

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
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
