import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/Footer";
import ThemeAutoSync from "@/components/ThemeAutoSync";
import "../globals.css";

// 본문 라틴/숫자 = Inter, 숫자 mono = JetBrains Mono. 한글은 시스템 폰트로 폴백.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

// 페인트 전에 data-theme를 설정해 테마 깜빡임(FOUC) 방지.
// 모드(svThemeMode) × 계절(svThemeSeason)을 합쳐 결정. 계절 'auto'는 저장된 현재 날짜의 계절.
// 구버전 단일 키(svTheme)는 모드/계절로 매핑(themeStore.migrate와 동일).
const THEME_INIT = `(function(){try{var mo=localStorage.getItem('svThemeMode'),se=localStorage.getItem('svThemeSeason');if(!mo||!se){var o=localStorage.getItem('svTheme')||'system';var M={system:['system','auto'],light:['light','auto'],dark:['dark','auto'],spring:['light','spring'],summer:['light','summer'],fall:['light','fall'],winter:['light','winter'],springDark:['dark','spring'],summerDark:['dark','summer'],fallDark:['dark','fall'],winterDark:['dark','winter']}[o]||['system','auto'];mo=mo||M[0];se=se||M[1];}var dark=mo==='dark'||(mo==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);var seas=se;if(se==='auto'){var d=1;try{d=(JSON.parse(localStorage.getItem('svs:schedule')||'{}').currentDay)||1;}catch(e){}seas=['spring','summer','fall','winter'][Math.floor((d-1)/28)%4];}document.documentElement.setAttribute('data-theme',dark?seas+'Dark':seas);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

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
    <html
      lang={locale}
      className={`h-full antialiased ${inter.variable} ${jbMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-[var(--sv-bg)] text-[var(--sv-ink)]">
        {/* 페인트 전에 테마 적용(깜빡임 방지) */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <ThemeAutoSync />
        <NextIntlClientProvider>
          <div className="flex-1">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
