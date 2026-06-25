import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// 개인정보 처리방침·면책조항 본문(별도 페이지). 텍스트는 messages의 legal 네임스페이스.
// 본문은 KO/EN만 작성하고 나머지 로케일은 영어로 폴백된다(request.ts).
// 외부 링크 주소
const GH_PRIVACY_URL =
  "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement";
const ISSUES_URL = "https://github.com/LDaham/stardew-valley-scheduler/issues";
const WIKI_URL = "https://stardewvalleywiki.com";
const LICENSE_URL = "https://creativecommons.org/licenses/by-nc-sa/3.0/";

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

// 외부 링크 치환자(번역 문자열의 <gh>/<issues>/<wiki>/<license> 태그 → <a>)
const LINKS = {
  gh: (c: React.ReactNode) => <Ext href={GH_PRIVACY_URL}>{c}</Ext>,
  issues: (c: React.ReactNode) => <Ext href={ISSUES_URL}>{c}</Ext>,
  wiki: (c: React.ReactNode) => <Ext href={WIKI_URL}>{c}</Ext>,
  license: (c: React.ReactNode) => <Ext href={LICENSE_URL}>{c}</Ext>,
};

// 문서별 섹션 구성(head/body 번역 키, 링크가 필요한 본문만 rich 표시)
const SECTIONS: Record<string, { head: string; body: string; rich?: boolean }[]> = {
  privacy: [
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
  disclaimer: [
    { head: "disclaimerAffiliationHead", body: "disclaimerAffiliationBody" },
    { head: "disclaimerAccuracyHead", body: "disclaimerAccuracyBody" },
    { head: "disclaimerLiabilityHead", body: "disclaimerLiabilityBody" },
    { head: "disclaimerIpHead", body: "disclaimerIpBody", rich: true },
    { head: "disclaimerNonCommercialHead", body: "disclaimerNonCommercialBody" },
  ],
};

export default function LegalDoc({ doc }: { doc: "privacy" | "disclaimer" }) {
  const t = useTranslations("legal");
  const title = t(doc === "privacy" ? "privacyTitle" : "disclaimerTitle");
  const intro = t(doc === "privacy" ? "privacyIntro" : "disclaimerIntro");

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 text-[var(--sv-ink)]">
      <Link
        href="/"
        className="text-sm text-[var(--sv-ink-muted)] underline hover:text-[var(--sv-ink)]"
      >
        {t("backHome")}
      </Link>

      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-1 text-xs text-[var(--sv-ink-muted)]">
        {t("effectiveDate")}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-[var(--sv-ink-muted)]">
        {intro}
      </p>

      <div className="mt-2">
        {SECTIONS[doc].map((s) => (
          <section key={s.head} className="mt-6">
            <h2 className="text-base font-semibold">{t(s.head)}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--sv-ink-muted)]">
              {s.rich ? t.rich(s.body, LINKS) : t(s.body)}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
