import { useTranslations } from "next-intl";
import Image from "next/image";
import { asset } from "@/lib/asset";

// 지원 패널(앱 내 탭, 네비 유지): 후원·오류 보고·법적 고지 링크.
// 법률 본문(개인정보·약관·저작권/면책)은 LegalView(?tab=legal)에 있고 여기선 링크만 건다.
const PAYPAL_URL =
  process.env.NEXT_PUBLIC_PAYPAL_URL || "https://paypal.me/LDaham";
const REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO || "LDaham/stardew-valley-scheduler";

export default function SupportPage({
  onOpenLegal,
}: {
  onOpenLegal: (section?: string) => void;
}) {
  const t = useTranslations();

  const legalLinks = [
    { section: "legal-privacy", key: "legal.navPrivacy" },
    { section: "legal-terms", key: "legal.navTerms" },
    { section: "legal-copyright", key: "legal.navCopyright" },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl text-[var(--sv-ink)]">
      {/* 후원 */}
      <section>
        <h2 className="text-base font-semibold">{t("support.title")}</h2>
        <p className="mt-1.5 whitespace-pre-line text-sm text-[var(--sv-ink-muted)]">
          {t("support.intro")}
        </p>
        <a
          href={PAYPAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="PayPal"
          className="mt-3 inline-flex items-center justify-center rounded-lg border border-[var(--sv-border)] px-10 py-3 hover:bg-[var(--sv-bg)]"
        >
          <Image
            src={asset("/icons/ui/paypal.svg")}
            alt="PayPal"
            width={2113}
            height={412}
            unoptimized
            className="h-6 w-auto"
          />
        </a>
        <p className="mt-3 whitespace-pre-line text-xs text-[var(--sv-ink-muted)]">
          {t("support.note")}
        </p>
      </section>

      {/* 오류 보고·건의 */}
      <section className="mt-8">
        <h2 className="text-base font-semibold">{t("settings.reportIssue")}</h2>
        <a
          href={`https://github.com/${REPO}/issues`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-sm font-semibold hover:bg-[var(--sv-bg)]"
        >
          {t("settings.reportIssue")}
        </a>
      </section>

      {/* 법적 고지: 법률 뷰의 각 섹션으로 이동 */}
      <section className="mt-8">
        <h2 className="text-base font-semibold">{t("legal.title")}</h2>
        <div className="mt-2 flex flex-col gap-1.5 text-sm">
          {legalLinks.map((l) => (
            <button
              key={l.section}
              type="button"
              onClick={() => onOpenLegal(l.section)}
              className="text-left underline hover:text-[var(--sv-ink)]"
            >
              {t(l.key)}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
