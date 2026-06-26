import { useTranslations } from "next-intl";
import Image from "next/image";
import { asset } from "@/lib/asset";

// 지원 '도움' 탭 내용: 후원·오류 보고. 법률 본문은 별도 '법률' 탭(LegalView)에 있다.
const PAYPAL_URL =
  process.env.NEXT_PUBLIC_PAYPAL_URL || "https://paypal.me/LDaham";
const REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO || "LDaham/stardew-valley-scheduler";

export default function SupportPage() {
  const t = useTranslations();

  return (
    <div className="w-full text-[var(--sv-ink)]">
      {/* 후원 */}
      <section>
        <h2 className="text-base font-bold">{t("support.title")}</h2>
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

      {/* 오류 보고·건의: 설명 + GitHub Issues로 연결되는 버튼 */}
      <section className="mt-8">
        <h2 className="text-base font-bold">{t("settings.reportIssue")}</h2>
        <p className="mt-1.5 text-sm text-[var(--sv-ink-muted)]">
          {t("settings.reportDesc")}
        </p>
        <a
          href={`https://github.com/${REPO}/issues`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-sm font-semibold hover:bg-[var(--sv-bg)]"
        >
          {t("settings.reportButton")}
        </a>
        <p className="mt-2 text-xs text-[var(--sv-ink-muted)]">
          {t("settings.reportNote")}
        </p>
      </section>
    </div>
  );
}
