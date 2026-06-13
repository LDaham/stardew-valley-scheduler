"use client";

import { useTranslations } from "next-intl";

// 페이지 하단 고지: 팬 제작물 안내 + 위키 데이터 출처(CC BY-NC-SA 3.0) + 코드 라이선스.
// 외부 링크는 새 탭. 링크는 번역 문자열의 <wiki>/<license>/<repo> 태그로 주입한다.
const WIKI_URL = "https://stardewvalleywiki.com";
const LICENSE_URL = "https://creativecommons.org/licenses/by-nc-sa/3.0/";
const REPO_URL = "https://github.com/LDaham/stardew-valley-scheduler";

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
  return (
    <footer className="mt-8 border-t border-[var(--sv-border)] px-4 py-5 text-center text-[11px] leading-relaxed text-[var(--sv-ink-muted)]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-1">
        <p>
          {t("fan")} {t("copyright")}
        </p>
        <p>
          {t.rich("data", {
            wiki: (c) => <Ext href={WIKI_URL}>{c}</Ext>,
            license: (c) => <Ext href={LICENSE_URL}>{c}</Ext>,
          })}
        </p>
        <p>
          {t.rich("code", { repo: (c) => <Ext href={REPO_URL}>{c}</Ext> })}{" "}
          {t("nonCommercial")}
        </p>
      </div>
    </footer>
  );
}
