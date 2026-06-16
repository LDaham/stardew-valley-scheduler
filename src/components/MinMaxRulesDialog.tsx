"use client";

import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import { MIN_MAX_INTRO, MIN_MAX_PREFACE } from "@/data/minMaxPreface";

// min/max 가이드 머릿말(목표·루트 개요·규칙) 설명 모달.
export default function MinMaxRulesDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  return (
    <Modal title={t("minMax.rules")} onClose={onClose}>
      <p className="mb-4 rounded-md bg-[var(--sv-bg)] px-3 py-2 text-sm leading-relaxed text-[var(--sv-ink-muted)]">
        {MIN_MAX_INTRO}
      </p>
      <div className="flex flex-col gap-4">
        {MIN_MAX_PREFACE.map((section) => (
          <section key={section.title}>
            <h3 className="mb-1.5 text-base font-bold">{section.title}</h3>
            <ul className="flex flex-col gap-1">
              {section.points.map((p, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm leading-relaxed"
                >
                  <span className="shrink-0 text-[var(--sv-ink-muted)]">·</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-4 text-xs text-[var(--sv-ink-muted)]">
        {t("minMax.source")}
      </p>
    </Modal>
  );
}
