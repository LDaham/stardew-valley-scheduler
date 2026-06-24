"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

// GitHub 저장소(owner/repo). 공개 저장소의 이슈로 연결한다.
// 다른 저장소로 바꾸려면 NEXT_PUBLIC_GITHUB_REPO 환경변수로 덮어쓴다.
const REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO || "LDaham/stardew-valley-scheduler";

// 오류 보고·아이디어 제시 폼. 서버 없이 GitHub 이슈 작성 페이지(제목·본문·라벨 자동 채움)로 연다.
export default function FeedbackForm() {
  const t = useTranslations();
  const [type, setType] = useState<"bug" | "idea">("bug");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const openIssue = () => {
    const tt = title.trim();
    if (!tt) return;
    const typeLabel = t(type === "bug" ? "feedback.typeBug" : "feedback.typeIdea");
    // 제목: "유형: 입력 제목", 본문: 설명 입력. 라벨은 GitHub 기본 라벨 사용.
    const params = new URLSearchParams({
      title: `${typeLabel}: ${tt}`,
      body: description.trim(),
      labels: type === "bug" ? "bug" : "enhancement",
    });
    window.open(
      `https://github.com/${REPO}/issues/new?${params.toString()}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section>
      <p className="mb-2 text-xs text-[var(--sv-ink-muted)]">
        {t("feedback.desc")}
      </p>

      <div className="flex flex-col gap-2">
        {/* 유형 선택(오류/아이디어) */}
        <div className="flex gap-1.5">
          {(["bug", "idea"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setType(v)}
              aria-pressed={type === v}
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                type === v
                  ? "border-transparent bg-[var(--sv-accent)] text-[var(--sv-accent-ink)]"
                  : "border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
              }`}
            >
              {t(v === "bug" ? "feedback.typeBug" : "feedback.typeIdea")}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("feedback.titlePlaceholder")}
          className="w-full rounded-md border border-[var(--sv-border)] bg-[var(--sv-bg)] px-2.5 py-1.5 text-sm outline-none focus:border-[var(--sv-accent)]"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t("feedback.descPlaceholder")}
          rows={4}
          className="w-full resize-y rounded-md border border-[var(--sv-border)] bg-[var(--sv-bg)] px-2.5 py-1.5 text-sm outline-none focus:border-[var(--sv-accent)]"
        />

        <button
          type="button"
          onClick={openIssue}
          disabled={!title.trim()}
          className="self-start rounded-lg border border-[var(--sv-border)] px-3 py-1.5 text-sm font-semibold hover:bg-[var(--sv-bg)] disabled:opacity-45"
        >
          {t("feedback.submit")}
        </button>
      </div>
    </section>
  );
}
