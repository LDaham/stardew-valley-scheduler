import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/Footer";
import "../globals.css";

type LayoutParams = { params: Promise<{ locale: string }> };

// 정적 생성을 위해 지원 로케일 목록 노출
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
    // 매니페스트 링크는 app/manifest.ts에서 basePath 포함해 자동 주입됨
    appleWebApp: { capable: true, title: t("title") },
  };
}

export const viewport = {
  themeColor: "#5a8f3c",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode } & LayoutParams>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // 서버 컴포넌트 정적 렌더링을 위해 로케일 고정
  setRequestLocale(locale);

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--sv-desk)] text-[var(--sv-ink)]">
        <NextIntlClientProvider>
          <div className="flex-1">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
