"use client";

import { useTranslations } from "next-intl";

// 페이지 하단 고지(BBX-DB 풋터 구조 차용): 데스크탑 좌측정렬·2행 구성.
// 상단행 = 좌측 브랜드(앱 이름+태그라인) / 우측 통합 법률 링크,
// 하단행 = 구분선 + 팬 제작물·위키 출처(CC BY-NC-SA 3.0)·비영리 고지.
// 법률 링크는 앱 내 법률 뷰(?tab=legal)로 이동(라우트 아님).
const WIKI_URL = "https://stardewvalleywiki.com";
const LICENSE_URL = "https://creativecommons.org/licenses/by-nc-sa/3.0/";

// 지원 페이지 '법률' 탭으로 이동: URL 변경 후 popstate 발생 → SchedulerApp이 해당 탭 표시.
function goLegal() {
  window.history.pushState(null, "", "?tab=support&sub=legal");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:text-[var(--sv-ink)]"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");
  return (
    <footer className="mt-8 border-t border-[var(--sv-border)] px-4 py-8 text-[var(--sv-ink-muted)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
        {/* 상단행: 브랜드 / 법률 링크 — 좁은 폭에서도 한 행 유지(브랜드 좌, 링크 우) */}
        <div className="flex flex-row items-center justify-between gap-4">
          <h2 className="text-sm font-black tracking-tight text-[var(--sv-ink)]">
            {tc("appName")}
          </h2>
          <button
            type="button"
            onClick={goLegal}
            className="text-right text-xs font-bold tracking-wider underline hover:text-[var(--sv-ink)]"
          >
            {t("legalLink")}
          </button>
        </div>

        {/* 하단행: 구분선 + 저작권·출처·비영리 고지 */}
        <div className="flex flex-col gap-2 border-t border-[var(--sv-border)] pt-4 text-[10px] leading-relaxed">
          <p>
            {t("fan")} {t("copyright")}
          </p>
          <p>
            {t.rich("data", {
              wiki: (c) => <Ext href={WIKI_URL}>{c}</Ext>,
              license: (c) => <Ext href={LICENSE_URL}>{c}</Ext>,
            })}
          </p>
          <p>{t("nonCommercial")}</p>
        </div>
      </div>
    </footer>
  );
}
