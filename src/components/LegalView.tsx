"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

// 법률 안내(앱 내 인라인 뷰, 네비 유지): 1.개인정보처리방침 2.이용약관 3.저작권 및 면책.
// 상단 앵커로 각 섹션 이동, 진입 시 URL 해시(#legal-*)가 있으면 해당 섹션으로 스크롤.
const GH_PRIVACY_URL =
  "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement";
const ISSUES_URL = "https://github.com/LDaham/stardew-valley-scheduler/issues";
const WIKI_URL = "https://stardewvalleywiki.com";
const LICENSE_URL = "https://creativecommons.org/licenses/by-nc-sa/3.0/";
const REPO_URL = "https://github.com/LDaham/stardew-valley-scheduler";
const GUIDE_URL =
  "https://github.com/Zamiell/stardew-valley/blob/main/Min-Max_Guide.md";
const GPL_URL = "https://www.gnu.org/licenses/gpl-3.0.html";

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

const LINKS = {
  gh: (c: React.ReactNode) => <Ext href={GH_PRIVACY_URL}>{c}</Ext>,
  issues: (c: React.ReactNode) => <Ext href={ISSUES_URL}>{c}</Ext>,
  wiki: (c: React.ReactNode) => <Ext href={WIKI_URL}>{c}</Ext>,
  license: (c: React.ReactNode) => <Ext href={LICENSE_URL}>{c}</Ext>,
  repo: (c: React.ReactNode) => <Ext href={REPO_URL}>{c}</Ext>,
  guide: (c: React.ReactNode) => <Ext href={GUIDE_URL}>{c}</Ext>,
  gpl: (c: React.ReactNode) => <Ext href={GPL_URL}>{c}</Ext>,
};

// 섹션 구성: head 키 + (head,body) 블록들. rich가 있으면 본문에 링크 주입.
type Block = { head?: string; body: string; rich?: boolean };
const SECTIONS: { id: string; head: string; blocks: Block[] }[] = [
  {
    id: "legal-privacy",
    head: "privacyHead",
    blocks: [
      { body: "privacyIntro" },
      { head: "privacyCollectHead", body: "privacyCollectBody" },
      { head: "privacyStorageHead", body: "privacyStorageBody" },
      { head: "privacyCookieHead", body: "privacyCookieBody" },
      { head: "privacyHostHead", body: "privacyHostBody", rich: true },
      { head: "privacyThirdHead", body: "privacyThirdBody" },
      { head: "privacyChildHead", body: "privacyChildBody" },
      { head: "privacyControlHead", body: "privacyControlBody" },
      { head: "privacyContactHead", body: "privacyContactBody", rich: true },
      { head: "privacyChangesHead", body: "privacyChangesBody" },
    ],
  },
  {
    id: "legal-terms",
    head: "termsHead",
    blocks: [
      { body: "termsIntro" },
      { head: "termsAccuracyHead", body: "termsAccuracyBody" },
      { head: "termsServiceHead", body: "termsServiceBody" },
      { head: "termsUserHead", body: "termsUserBody" },
      { head: "termsProhibitHead", body: "termsProhibitBody" },
    ],
  },
  {
    id: "legal-copyright",
    head: "copyrightHead",
    blocks: [
      { body: "copyrightIntro" },
      { head: "copyrightAffiliationHead", body: "copyrightAffiliationBody" },
      { head: "copyrightIpHead", body: "copyrightIpBody", rich: true },
      { head: "copyrightCodeHead", body: "copyrightCodeBody", rich: true },
      { head: "copyrightGuideHead", body: "copyrightGuideBody", rich: true },
      { head: "copyrightDisclaimerHead", body: "copyrightDisclaimerBody" },
    ],
  },
];

const NAV = [
  { id: "legal-privacy", key: "navPrivacy" },
  { id: "legal-terms", key: "navTerms" },
  { id: "legal-copyright", key: "navCopyright" },
];

export default function LegalView() {
  const t = useTranslations("legal");

  // 진입 시 해시(#legal-*)가 있으면 해당 섹션으로 스크롤(렌더 후 한 프레임 뒤).
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
  }, []);

  return (
    <div className="w-full text-[var(--sv-ink)]">
      {/* 페이지 제목 박스(지원)+활성 탭(법률)이 맥락을 주므로 별도 큰 제목 없이 개정일만 캡션으로 */}
      <p className="text-xs text-[var(--sv-ink-muted)]">{t("updated")}</p>

      {/* 상단 앵커 이동 */}
      <nav className="mt-3 flex flex-wrap gap-2">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className="rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] px-2.5 py-1 text-xs font-semibold hover:bg-[var(--sv-bg)]"
          >
            {t(n.key)}
          </a>
        ))}
      </nav>

      {SECTIONS.map((s) => (
        <section key={s.id} id={s.id} className="mt-8 scroll-mt-24">
          <h2 className="text-base font-bold">{t(s.head)}</h2>
          {s.blocks.map((b, i) => (
            <div key={i} className="mt-4">
              {b.head && (
                <h3 className="text-sm font-semibold">{t(b.head)}</h3>
              )}
              <p className="mt-1 text-sm leading-relaxed text-[var(--sv-ink-muted)]">
                {b.rich ? t.rich(b.body, LINKS) : t(b.body)}
              </p>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
