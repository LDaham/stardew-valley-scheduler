"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { lookupGuide, type GuideNode, type GuideKind } from "@/data/minMaxGuide";
import { toYearDay, type SDate } from "@/lib/calendar";

// Min-Max 가이드 뷰('오늘' 페이지 토글 ON 시 표시). 날짜 네비는 Dashboard가 유지.
// 구성: 목적 카드(주 목표 + 부가 목표=하루 끝 획득) / 시간 거터 타임라인(상위 할 일).
// 항목 성격(kind): action(기본) / tip(부연) / warn(주의) / result(부가 목표로 surface).
// 하위 세부는 기본 접힘(아코디언). 읽기 전용(체크박스 없음).

const GUIDE_URL =
  "https://github.com/Zamiell/stardew-valley/blob/main/Min-Max_Guide.md";

// 액션의 시간 표현을 추출해 좌측 거터로 분리(타임라인용).
// 시간은 문장 어디에든 올 수 있으므로 위치별로 다르게 처리한다:
//  ① 맨 앞 약속 시간("오전 9시에…", "오전 2시까지…", "오후 6시쯤까지…")은 본문에서 제거.
//     단 뒤에 범위(~)가 이어지면 문장을 깨뜨릴 수 있어 제거하지 않는다.
//  ② "(시간은 …)" 순수 시간 주석은 시간만 거터로 옮기고 주석은 본문에서 제거.
//  ③ 그 외 문장 중간/괄호 안의 시간은 거터에 앵커로 표시하고 본문은 그대로 둔다.
const LEADING_RE =
  /^((?:오전|오후)\s*\d{1,2}시(?:\s*\d{1,2}분)?(?:쯤|경)?(?:까지)?)(?!\s*~)\s*에?\s+/;
const ANY_TIME_RE =
  /(?:오전|오후)\s*\d{1,2}시(?:\s*\d{1,2}분)?(?:쯤|경)?|정오|자정/;
const TIME_NOTE_RE = /\s*\(시간은[^)]*\)/;

function splitTime(text: string): { time: string | null; rest: string } {
  const lead = text.match(LEADING_RE);
  if (lead) return { time: lead[1], rest: text.slice(lead[0].length) };
  const note = text.match(TIME_NOTE_RE);
  if (note) {
    const inner = note[0].match(ANY_TIME_RE);
    if (inner) return { time: inner[0], rest: text.replace(TIME_NOTE_RE, "") };
  }
  const any = text.match(ANY_TIME_RE);
  if (any) return { time: any[0], rest: text };
  return { time: null, rest: text };
}

// 자식 있는 노드의 경로 키를 모두 수집(전체 펼치기/접기용).
// 중첩 포함 모든 노드(액션·팁·이유·주의)가 접기 대상. result는 부가목표로 분리되어 제외.
function collectPaths(nodes: GuideNode[], prefix: string, out: string[]) {
  nodes.forEach((n, i) => {
    if (typeof n === "string") return;
    const path = `${prefix}${i}`;
    if (!n.c || !n.c.length || n.k === "result") return;
    out.push(path);
    collectPaths(n.c, `${path}.`, out);
  });
}

// 성격 필터(팁/주의/이유)로 숨긴 노드를 트리에서 제거(자식까지 재귀).
// 숨긴 성격의 노드는 그 하위 항목까지 함께 사라진다(종속 관계상 당연).
function filterTree(nodes: GuideNode[], hidden: Set<GuideKind>): GuideNode[] {
  const out: GuideNode[] = [];
  for (const n of nodes) {
    if (typeof n === "string") {
      out.push(n);
      continue;
    }
    if (n.k && hidden.has(n.k)) continue;
    out.push(n.c && n.c.length ? { ...n, c: filterTree(n.c, hidden) } : n);
  }
  return out;
}

export default function MinMaxGuideView({ date }: { date: SDate }) {
  const t = useTranslations();
  const locale = useLocale();
  const found = lookupGuide(locale, date.season, date.day);

  // 기본값은 '모두 펼침'. 날짜가 바뀔 때 현재 모든 접기 경로를 열어 둔다.
  // (필터 토글에는 반응하지 않도록 allPaths는 ref로 읽는다.)
  const [open, setOpen] = useState<Set<string>>(new Set());
  const allPathsRef = useRef<string[]>([]);
  useEffect(() => {
    setOpen(new Set(allPathsRef.current));
  }, [date.season, date.day]);

  // 성격별 표시 토글(팁/주의/이유). 끄면 해당 성격 노드를 본문에서 숨긴다.
  const [show, setShow] = useState({ tip: true, warn: true, reason: true });
  const hidden = useMemo(() => {
    const s = new Set<GuideKind>();
    if (!show.tip) s.add("tip");
    if (!show.warn) s.add("warn");
    if (!show.reason) s.add("reason");
    return s;
  }, [show]);

  // result(하루 끝 획득) 노드 → 부가 목표로 목적 카드에 표시. 본문 목록에서는 제외.
  const resultGains = useMemo(() => {
    const r = (found?.entry.items ?? []).find(
      (n) => typeof n !== "string" && n.k === "result",
    );
    if (!r || typeof r === "string") return [];
    return (r.c ?? []).map((c) => (typeof c === "string" ? c : c.t));
  }, [found]);
  const bodyItems = useMemo(
    () =>
      (found?.entry.items ?? []).filter(
        (n) => typeof n === "string" || n.k !== "result",
      ),
    [found],
  );
  // 필터 적용된 본문 트리(렌더·경로 수집 모두 이 트리 기준 → 인덱스 일치).
  const filteredBody = useMemo(
    () => filterTree(bodyItems, hidden),
    [bodyItems, hidden],
  );

  const allPaths = useMemo(() => {
    const out: string[] = [];
    collectPaths(filteredBody, "", out);
    return out;
  }, [filteredBody, toYearDay(date)]); // eslint-disable-line react-hooks/exhaustive-deps
  allPathsRef.current = allPaths; // 날짜 변경 시 기본 펼침에 사용

  const allOpen = allPaths.length > 0 && allPaths.every((p) => open.has(p));
  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(allPaths));
  const toggle = (path: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });

  // 하위 노드 렌더(재귀, 거터 없음). 자식 있으면 아코디언.
  const renderChild = (node: GuideNode, path: string): React.ReactNode => {
    if (typeof node === "string") {
      return (
        <div key={path} className="flex items-start gap-1.5">
          <span className="mt-0.5 shrink-0 text-xs text-[var(--sv-ink-muted)]">
            •
          </span>
          <NodeText text={node} />
        </div>
      );
    }
    const { t: text, k, c } = node;
    if (c && c.length) {
      // 자식 있는 노드는 성격과 무관하게 모두 접기(중첩 포함).
      const isOpen = open.has(path);
      return (
        <div key={path}>
          <button
            type="button"
            onClick={() => toggle(path)}
            aria-expanded={isOpen}
            className="flex w-full items-start gap-1.5 text-left"
          >
            <span className="mt-0.5 shrink-0 text-xs text-[var(--sv-ink-muted)]">
              {isOpen ? "▾" : "▸"}
            </span>
            <NodeText text={text} kind={k} />
            <span className="ml-auto shrink-0 rounded bg-[var(--sv-bg)] px-1.5 text-[11px] text-[var(--sv-ink-muted)]">
              {c.length}
            </span>
          </button>
          {isOpen && (
            <div className="ml-2 mt-1 flex flex-col gap-1 border-l border-dashed border-[var(--sv-border)] pl-3">
              {c.map((ch, i) => renderChild(ch, `${path}.${i}`))}
            </div>
          )}
        </div>
      );
    }
    return (
      <div key={path} className="flex items-start gap-1.5">
        <span className="mt-0.5 shrink-0 text-xs text-[var(--sv-ink-muted)]">
          •
        </span>
        <NodeText text={text} kind={k} />
      </div>
    );
  };

  // 상위 할 일 렌더(좌측 시간 거터 + 우측 내용). 시간이 있으면 타임라인 앵커로.
  const renderTop = (node: GuideNode, i: number): React.ReactNode => {
    const path = `${i}`;
    const summary = typeof node === "string" ? node : node.t;
    const kind = typeof node === "string" ? undefined : node.k;
    const children = typeof node === "string" ? undefined : node.c;
    const explicit = typeof node === "string" ? undefined : node.time;
    // 명시적 time이 있으면 본문은 그대로, 거터는 그 값. 없으면 본문에서 파싱.
    const { time, rest } = explicit
      ? { time: explicit, rest: summary }
      : splitTime(summary);
    const hasChildren = !!(children && children.length);
    const isOpen = open.has(path);

    return (
      <div key={path} className="flex flex-col sm:flex-row sm:gap-2">
        {/* 시간: 모바일=내용 위 인라인(블록), 데스크톱=좌측 거터(우측 정렬).
            모바일에서 좌측 거터가 내용 폭을 좁히지 않도록 위로 쌓는다. */}
        <div className="sm:w-24 sm:shrink-0 sm:pt-0.5 sm:text-right">
          {time && (
            <span className="mb-1 inline-block whitespace-nowrap rounded bg-[var(--sv-bg)] px-1 text-[11px] font-semibold text-[var(--sv-accent)] sm:mb-0">
              {time}
            </span>
          )}
        </div>
        {/* 내용 */}
        <div className="min-w-0 flex-1">
          {hasChildren ? (
            <>
              <button
                type="button"
                onClick={() => toggle(path)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-1.5 text-left"
              >
                <span className="mt-0.5 shrink-0 text-xs text-[var(--sv-ink-muted)]">
                  {isOpen ? "▾" : "▸"}
                </span>
                <NodeText text={rest} kind={kind} strong />
                <span className="ml-auto shrink-0 rounded bg-[var(--sv-bg)] px-1.5 text-[11px] text-[var(--sv-ink-muted)]">
                  {children!.length}
                </span>
              </button>
              {isOpen && (
                <div className="ml-2 mt-1 flex flex-col gap-1 border-l border-dashed border-[var(--sv-border)] pl-3">
                  {children!.map((ch, j) => renderChild(ch, `${path}.${j}`))}
                </div>
              )}
            </>
          ) : (
            <NodeText text={rest} kind={kind} strong />
          )}
        </div>
      </div>
    );
  };

  const goals = found?.goals ?? [];
  const hasGoalCard =
    !!found &&
    (goals.length > 0 ||
      (found.entry.notes?.length ?? 0) > 0 ||
      resultGains.length > 0);

  // 목표 하위(달성 방법/이유·팁) 렌더: 펼쳐졌을 때 항상 보이는 들여쓰기 목록.
  const renderGoalChild = (node: GuideNode, path: string): React.ReactNode => {
    if (typeof node === "string") {
      return (
        <div key={path} className="flex items-start gap-1.5">
          <span className="mt-0.5 shrink-0 text-xs text-[var(--sv-ink-muted)]">
            •
          </span>
          <NodeText text={node} />
        </div>
      );
    }
    const { t: text, k, c } = node;
    return (
      <div key={path}>
        <div className="flex items-start gap-1.5">
          {!k && (
            <span className="mt-0.5 shrink-0 text-xs text-[var(--sv-ink-muted)]">
              •
            </span>
          )}
          <NodeText text={text} kind={k} />
        </div>
        {c && c.length > 0 && (
          <div className="ml-2 mt-1 flex flex-col gap-1 border-l border-dashed border-[var(--sv-border)] pl-3">
            {c.map((ch, i) => renderGoalChild(ch, `${path}.${i}`))}
          </div>
        )}
      </div>
    );
  };

  // 주 목표 렌더: 자식(달성 방법)이 있으면 접기 토글(기본 접힘).
  const renderGoal = (node: GuideNode, gi: number): React.ReactNode => {
    const path = `g${gi}`;
    if (typeof node === "string") {
      return (
        <p key={path} className="mt-1 text-sm font-bold leading-relaxed">
          {node}
        </p>
      );
    }
    const { t: text, c } = node;
    const hasChildren = !!(c && c.length);
    const isOpen = open.has(path);
    if (!hasChildren) {
      return (
        <p key={path} className="mt-1 text-sm font-bold leading-relaxed">
          {text}
        </p>
      );
    }
    return (
      <div key={path} className="mt-1">
        <button
          type="button"
          onClick={() => toggle(path)}
          aria-expanded={isOpen}
          className="flex w-full items-start gap-1.5 text-left text-sm font-bold leading-relaxed"
        >
          <span className="mt-0.5 shrink-0 text-xs text-[var(--sv-ink-muted)]">
            {isOpen ? "▾" : "▸"}
          </span>
          <span>{text}</span>
        </button>
        {isOpen && (
          <div className="ml-3 mt-1 flex flex-col gap-1 border-l border-dashed border-[var(--sv-border)] pl-3 text-sm font-normal">
            {c!.map((ch, j) => renderGoalChild(ch, `${path}.${j}`))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="sv-box flex flex-col gap-3 p-4">
      {/* 헤더 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--sv-border)] pb-2">
        <h2 className="text-base font-bold">{t("minMax.viewTitle")}</h2>
        <div className="flex items-center gap-2">
          {found && !found.exact && (
            <span className="text-xs text-[var(--sv-ink-muted)]">
              {t("minMax.carried", {
                season: t(`seasons.${found.season}`),
                day: found.day,
              })}
            </span>
          )}
          {/* 성격 필터: 끄면 해당 성격 항목을 숨긴다(팁/주의/이유) */}
          {found &&
            (
              [
                ["tip", "filterTip"],
                ["warn", "filterWarn"],
                ["reason", "filterReason"],
              ] as const
            ).map(([key, label]) => {
              const on = show[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setShow((s) => ({ ...s, [key]: !s[key] }))}
                  aria-pressed={on}
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                    on
                      ? "border-[var(--sv-accent)] bg-[var(--sv-accent)] text-[var(--sv-accent-ink)]"
                      : "border-[var(--sv-border)] text-[var(--sv-ink-muted)] line-through"
                  }`}
                >
                  {t(`minMax.${label}`)}
                </button>
              );
            })}
          {allPaths.length > 0 && (
            <button
              type="button"
              onClick={toggleAll}
              className="rounded-md border border-[var(--sv-border)] px-2 py-0.5 text-xs font-semibold hover:bg-[var(--sv-bg)]"
            >
              {t(allOpen ? "minMax.collapseAll" : "minMax.expandAll")}
            </button>
          )}
        </div>
      </div>

      {!found ? (
        <p className="text-sm text-[var(--sv-ink-muted)]">
          {t("minMax.noGuide")}
        </p>
      ) : (
        <>
          {/* 오늘의 목표: 주 목표(접기) + 부가 목표(하루 끝 획득) */}
          {hasGoalCard && (
            <div className="rounded-lg border-l-4 border-[var(--sv-accent)] bg-[var(--sv-bg)] px-3 py-2">
              <div className="text-xs font-bold uppercase tracking-wide text-[var(--sv-accent)]">
                {t("minMax.purpose")}
              </div>
              {/* 구간 안내 등 보조 설명(있으면 작게) */}
              {found.entry.notes?.map((p, i) => (
                <p
                  key={i}
                  className="mt-1 text-xs italic text-[var(--sv-ink-muted)]"
                >
                  {p}
                </p>
              ))}
              {/* 주 목표 + 달성 방법(접기) */}
              {goals.map((g, i) => renderGoal(g, i))}
              {resultGains.length > 0 && (
                <p className="mt-1 text-sm leading-relaxed">
                  <span className="font-semibold text-[var(--sv-accent)]">
                    {t("minMax.secondaryGoal")}:
                  </span>{" "}
                  {resultGains.join(", ")}
                </p>
              )}
            </div>
          )}

          {/* 할 일 타임라인(상위 + 접힘 세부) */}
          <div className="flex flex-col gap-1.5">
            <div className="text-xs font-bold uppercase tracking-wide text-[var(--sv-accent)]">
              {t("minMax.walkthrough")}
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              {filteredBody.map((n, i) => renderTop(n, i))}
            </div>
          </div>
        </>
      )}

      {/* 출처 */}
      <p className="border-t border-[var(--sv-border)] pt-2 text-xs text-[var(--sv-ink-muted)]">
        {t("minMax.source")}{" "}
        <a
          href={GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[var(--sv-ink)]"
        >
          BlackSight6 &amp; Zamiel — Stardew Valley Min-Max Guide
        </a>
      </p>
    </div>
  );
}

// 성격별 본문 텍스트 스타일:
//  warn(주의)=경고색+⚠ / tip(팁)=회색 이탤릭 / reason(이유)='이유' 배지+회색 / action(기본)
function NodeText({
  text,
  kind,
  strong,
}: {
  text: string;
  kind?: "tip" | "reason" | "warn" | "result";
  strong?: boolean;
}) {
  const t = useTranslations();
  if (kind === "warn") {
    return (
      <span className="flex-1 font-semibold leading-relaxed text-[#b02a2a]">
        ⚠ {text}
      </span>
    );
  }
  if (kind === "tip") {
    return (
      <span className="flex-1 italic leading-relaxed text-[var(--sv-ink-muted)]">
        {text}
      </span>
    );
  }
  if (kind === "reason") {
    return (
      <span className="flex-1 leading-relaxed text-[var(--sv-ink-muted)]">
        <span className="mr-1 rounded bg-[var(--sv-bg)] px-1 text-[10px] font-bold text-[var(--sv-ink)]">
          {t("minMax.reasonTag")}
        </span>
        {text}
      </span>
    );
  }
  return (
    <span className={`flex-1 leading-relaxed ${strong ? "font-medium" : ""}`}>
      {text}
    </span>
  );
}
