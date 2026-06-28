"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { asset } from "@/lib/asset";
import { localizeItem } from "@/lib/itemName";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";
import MasonryColumns from "@/components/MasonryColumns";
import MasterDetailPanel from "@/components/MasterDetailPanel";
import {
  COST_SHOPS,
  COST_SHOP_ICON,
  getCostShop,
  type CostOffer,
} from "@/data/costMaterials";
import { MONSTER_GOALS } from "@/data/monsterGoals";

// note의 "<계절> 한정"으로 계절 토큰을 뽑는다(잡화점 등 계절 한정 씨앗용).
const SEASON_KEYS = ["spring", "summer", "fall", "winter"] as const;
const SEASON_WORD: Record<string, string> = {
  spring: "봄",
  summer: "여름",
  fall: "가을",
  winter: "겨울",
};
function offerSeasons(o: CostOffer): string[] {
  const note = o.note ?? "";
  return SEASON_KEYS.filter((k) => note.includes(`${SEASON_WORD[k]} 한정`));
}

// 무작위(로테이션) 판매 물품 여부. 스타드롭 주점의 요리 로테이션 등.
function isRotation(o: CostOffer): boolean {
  return (o.note ?? "").includes("로테이션");
}

// 카지노 코인 비용 추출(없으면 null). note 형식: "카지노 코인 8,000".
function coinCost(o: CostOffer): number | null {
  const m = (o.note ?? "").match(/카지노 코인\s*([\d,]+)/);
  return m ? Number(m[1].replace(/,/g, "")) : null;
}

// 표시용 note: 그룹 탭·배지로 이미 드러나는 부분(계절 "한정"·"요리 로테이션"·
// "카지노 코인 N")은 중복이라 빼고 나머지 부가설명만 남긴다.
function displayNote(o: CostOffer): string {
  let note = o.note ?? "";
  note = note.replace(/(봄|여름|가을|겨울)\s*한정/g, "");
  note = note.replace(/요리\s*로테이션/g, "");
  note = note.replace(/카지노\s*코인\s*[\d,]+/g, "");
  // 남은 구분자(/)·공백 정리
  return note.replace(/^\s*\/\s*/, "").replace(/\s*\/\s*$/, "").trim();
}

// 데이터의 한국어 요일 → 현지화 라벨(표시 전용, 비교/그룹화는 원본 한국어 유지).
const DAY_KEY: Record<string, string> = {
  월요일: "mon",
  화요일: "tue",
  수요일: "wed",
  목요일: "thu",
  금요일: "fri",
  토요일: "sat",
  일요일: "sun",
};
function dayLabel(day: string, t: ReturnType<typeof useTranslations>): string {
  if (DAY_KEY[day]) return t(`weekdays.${DAY_KEY[day]}`);
  if (day === "짝수 날") return t("costMaterials.days.even");
  if (day === "홀수 날") return t("costMaterials.days.odd");
  return day;
}

// 한국어 건물명 → buildings.* 키(12개 언어 보유)
const BUILDING_KEY: Record<string, string> = {
  닭장: "coop",
  "큰 닭장": "bigCoop",
  "디럭스 닭장": "deluxeCoop",
  외양간: "barn",
  "큰 외양간": "bigBarn",
  "디럭스 외양간": "deluxeBarn",
};

// note 안 "N골드"를 인라인 골드 아이콘으로 쓰기 위한 작은 아이콘
function GoldInline() {
  return (
    <Image
      src={asset("/icons/costMaterials/GoldCoin.png")}
      alt=""
      width={11}
      height={11}
      unoptimized
      className="mx-0.5 inline-block align-middle"
      style={{ imageRendering: "pixelated" }}
    />
  );
}

// displayNote가 남긴 한국어 부가설명을 템플릿으로 인식해 현지화 렌더.
// 데이터는 한국어 그대로 두고(파싱·비교용) 표시 시점에만 번역한다.
function LocalizedNote({ leftover }: { leftover: string }) {
  const t = useTranslations();
  const locale = useLocale();
  let m: RegExpMatchArray | null;
  if (leftover === "2년차 이후") return <>{t("costMaterials.notes.year2plus")}</>;
  if ((m = leftover.match(/^1년차 ([\d,]+)골드 \/ 2년차부터 ([\d,]+)골드$/)))
    return (
      <>
        {t.rich("costMaterials.notes.yearPrice", {
          y1: m[1],
          y2: m[2],
          g: () => <GoldInline />,
        })}
      </>
    );
  if (leftover === "3개 묶음 판매")
    return <>{t("costMaterials.notes.pack", { n: 3 })}</>;
  if ((m = leftover.match(/^낚시 레벨 (\d+)$/)))
    return <>{t("costMaterials.notes.fishingLevel", { n: Number(m[1]) })}</>;
  if (leftover === "낚시 레벨 제한 없음")
    return <>{t("costMaterials.notes.fishingNoLimit")}</>;
  if ((m = leftover.match(/^(.+) 필요$/)) && BUILDING_KEY[m[1]])
    return (
      <>
        {t("costMaterials.notes.requires", {
          building: t(`buildings.${BUILDING_KEY[m[1]]}`),
        })}
      </>
    );
  if ((m = leftover.match(/^박멸 목표: (.+) (\d+)마리 처치 후 구매 가능$/))) {
    const mob = MONSTER_GOALS.find((g) => g.ko === m![1]);
    const monster = mob ? localizeItem(mob.en, mob.ko, locale) : m[1];
    return (
      <>
        {t("costMaterials.notes.eradication", {
          monster,
          count: Number(m[2]),
        })}
      </>
    );
  }
  if (leftover === "수요일마다 무작위 생선 또는 자석 미끼")
    return <>{t("costMaterials.notes.wednesdayBait")}</>;
  if (leftover === "크로버스와 친밀도 최대·미혼일 때 단 1개만 구매 가능")
    return <>{t("costMaterials.notes.krobusSingle")}</>;
  return <NoteText text={leftover} />; // 미매칭 시 원본(골드 인라인만 적용)
}

// 비용 및 재료: 좌측 가게 목록 + 우측 해당 가게의 비용(골드)·재료 패널을 동시에 표시.
export default function CostMaterialsDialog({
  onClose,
  onBack,
}: {
  onClose: () => void;
  onBack?: () => void;
}) {
  const t = useTranslations();

  return (
    <Modal title={t("costMaterials.title")} onClose={onClose} onBack={onBack}>
      <MasterDetailPanel
        items={COST_SHOPS}
        getId={(s) => s.id}
        getSearchText={(s) => t(`costMaterials.shops.${s.id}`)}
        searchPlaceholder={t("costMaterials.searchShop")}
        renderItem={(s) => (
          <>
            <PixelIcon src={`/icons/shops/${COST_SHOP_ICON[s.id]}.png`} size={24} />
            <span className="truncate font-semibold">
              {t(`costMaterials.shops.${s.id}`)}
            </span>
          </>
        )}
        renderDetail={(s) => (
          <div>
            <div className="mb-3 flex items-center gap-2">
              <PixelIcon
                src={`/icons/shops/${COST_SHOP_ICON[s.id]}.png`}
                size={24}
              />
              <h3 className="text-base font-bold">
                {t(`costMaterials.shops.${s.id}`)}
              </h3>
            </div>
            <ShopOffersPanel key={s.id} id={s.id} />
          </div>
        )}
      />
    </Modal>
  );
}

// 선택된 가게의 판매 물품 패널(모달 래퍼 없이 본문만).
// 가게가 여러 서비스(상점·업그레이드·정동석 가공 등)를 제공하면 offer의 cat으로
// 묶어 상단 탭으로 나눈다(데이터 등장 순서 = 탭 순서). cat이 1종 이하면 탭 없이 표시.
// 읽기 순서대로 채우는 단순 그리드(데이터 순서 = 표시 순서).
// - preferGroups: 초기 선택 탭 후보(앞에서부터 존재하는 첫 그룹). 메인 가게 일정에서 열 때
//   현재 계절·요일별을 우선 표시하는 데 쓴다.
// - today: 오늘 요일(예: "화요일"). 해당 요일 판매 물품 배지를 강조한다.
export function ShopOffersPanel({
  id,
  preferGroups,
  today,
}: {
  id: string;
  preferGroups?: string[];
  today?: string;
}) {
  const t = useTranslations();
  const offers = getCostShop(id)?.offers ?? [];

  // 물품을 그룹(탭)으로 분류. 우선순위: 명시적 cat > 요일별(day) > 무작위(로테이션) > 계절 > 상시.
  // 필터로 거르지 않고 목공 작업실처럼 그룹 탭으로 나눠 보여준다.
  const groupOf = (o: CostOffer): string => {
    if (o.cat) return o.cat;
    if (o.day) return "byDay";
    if (isRotation(o)) return "random";
    const ss = offerSeasons(o);
    return ss.length ? ss[0] : "always";
  };

  // 데이터 등장 순서대로 그룹 수집 → 탭 순서(상시 물품이 앞에 오므로 자연스러운 순서)
  const groups: string[] = [];
  for (const o of offers) {
    const g = groupOf(o);
    if (!groups.includes(g)) groups.push(g);
  }
  const hasTabs = groups.length > 1;
  // 초기 탭: preferGroups에서 실제 존재하는 첫 그룹(현재 계절→요일별 순) > 첫 그룹
  const initialTab =
    preferGroups?.find((g) => groups.includes(g)) ?? groups[0] ?? "";
  const [tab, setTab] = useState(initialTab);
  const shown = hasTabs ? offers.filter((o) => groupOf(o) === tab) : offers;

  // 그룹 라벨: 계절·상시·무작위·요일별 + 명시적 카테고리(cats.*)
  const SEASON_SET = new Set(["spring", "summer", "fall", "winter"]);
  const groupLabel = (g: string): string => {
    if (SEASON_SET.has(g)) return t(`seasons.${g}`);
    if (g === "always") return t("costMaterials.always");
    if (g === "random") return t("costMaterials.rotating");
    if (g === "byDay") return t("costMaterials.byDay");
    return t(`costMaterials.cats.${g}`);
  };

  return (
    <>
      {hasTabs && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setTab(g)}
              className={`cursor-pointer rounded-md border px-2.5 py-1 text-xs font-semibold ${
                tab === g
                  ? "border-[var(--sv-accent)] bg-[var(--sv-accent)] text-white"
                  : "border-[var(--sv-border)] bg-[var(--sv-panel)] text-[var(--sv-ink-muted)] hover:bg-[var(--sv-bg)]"
              }`}
            >
              {groupLabel(g)}
            </button>
          ))}
        </div>
      )}
      {/* 모바일 1열, PC 2열 메이슨리(가게 일정과 동일: 측정 높이로 짧은 열에 채움) */}
      <div className="flex flex-col gap-2 sm:hidden">
        {shown.map((o, i) => (
          <OfferRow key={`${o.en}-${i}`} offer={o} today={today} />
        ))}
      </div>
      <div className="hidden sm:block">
        <MasonryColumns
          items={shown.map((o, i) => ({ o, key: `${o.en}-${i}` }))}
          getKey={(x) => x.key}
          render={(x) => <OfferRow offer={x.o} today={today} />}
        />
      </div>
    </>
  );
}

// note 안의 "N골드"를 골드 아이콘 + 숫자로 인라인 치환(나머지 텍스트는 그대로 유지).
function NoteText({ text }: { text: string }) {
  const parts = text.split(/(\d[\d,]*골드)/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^(\d[\d,]*)골드$/);
        if (!m) return <span key={i}>{p}</span>;
        return (
          <span key={i} className="inline-flex items-center gap-0.5 align-middle">
            <Image
              src={asset("/icons/costMaterials/GoldCoin.png")}
              alt=""
              width={11}
              height={11}
              unoptimized
              style={{ imageRendering: "pixelated" }}
            />
            {m[1]}
          </span>
        );
      })}
    </>
  );
}

// 판매 물품 아이콘. 제작법이면 인게임처럼 아이템을 흐리게 + 우하단에 제작법 오버레이를 올린다.
function OfferIcon({
  src,
  recipe,
  size = 24,
}: {
  src: string;
  recipe?: boolean;
  size?: number;
}) {
  if (!recipe) {
    return (
      <Image
        src={asset(src)}
        alt=""
        width={size}
        height={size}
        unoptimized
        className="shrink-0"
        style={{ imageRendering: "pixelated" }}
      />
    );
  }
  // 오버레이는 (size×size) 정사각 프레임으로 위치가 내장돼 있다.
  // 아이템 이미지가 세로로 긴 경우(예: 탈수기 48×96 → 폭 기준 렌더로 세로가 길어짐)에도
  // 어긋나지 않도록, 래퍼는 아이템 실제 크기에 맞추고 오버레이는 하단(bottom-left) 기준으로 정렬한다.
  return (
    <span className="relative inline-flex shrink-0">
      <Image
        src={asset(src)}
        alt=""
        width={size}
        height={size}
        unoptimized
        className="opacity-50"
        style={{ imageRendering: "pixelated" }}
      />
      <Image
        src={asset("/icons/ui/Recipe_Overlay.png")}
        alt=""
        width={size}
        height={size}
        unoptimized
        className="absolute bottom-0 left-0"
        style={{ width: size, height: size, imageRendering: "pixelated" }}
      />
    </span>
  );
}

function OfferRow({ offer, today }: { offer: CostOffer; today?: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const name = (it: { ko: string; en: string }) =>
    localizeItem(it.en, it.ko, locale);
  const isToday = !!today && offer.day === today; // 오늘 판매 요일이면 배지 강조

  const hasMaterials = offer.materials.length > 0;
  const coin = coinCost(offer); // 카지노 코인 비용(있으면 우상단 배지)
  const note = displayNote(offer); // 탭·배지로 드러나는 부분을 뺀 표시용 설명
  return (
    <div className="rounded-md border border-[var(--sv-border)] bg-[var(--sv-panel)] p-2.5">
      {/* 이름(좌) + 판매일 + 골드/코인 비용(오른쪽 끝) */}
      <div className="flex items-center gap-2">
        <OfferIcon src={offer.icon} recipe={offer.recipe} size={24} />
        <span className="min-w-0 flex-1 text-sm font-semibold">
          {name(offer)}
          {offer.recipe && (
            <span className="ml-1 text-xs font-normal text-[var(--sv-ink-muted)]">
              {t("costMaterials.recipe")}
            </span>
          )}
        </span>
        {offer.day && (
          <span
            className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-semibold ${
              isToday
                ? "bg-[var(--sv-accent)] text-[var(--sv-accent-ink)]"
                : "bg-[var(--sv-bg)] font-normal text-[var(--sv-ink-muted)]"
            }`}
          >
            {dayLabel(offer.day, t)}
          </span>
        )}
        {offer.gold > 0 && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[var(--sv-bg)] px-2 py-0.5 text-xs font-semibold text-[var(--sv-warn)]">
            <Image
              src={asset("/icons/costMaterials/GoldCoin.png")}
              alt=""
              width={14}
              height={14}
              unoptimized
              style={{ imageRendering: "pixelated" }}
            />
            {offer.gold.toLocaleString()}
          </span>
        )}
        {coin !== null && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[var(--sv-bg)] px-2 py-0.5 text-xs font-semibold text-[#a86fd6]">
            <Image
              src={asset("/icons/costMaterials/QiCoin.png")}
              alt=""
              width={14}
              height={14}
              unoptimized
              style={{ imageRendering: "pixelated" }}
            />
            {coin.toLocaleString()}
          </span>
        )}
      </div>

      {/* 재료(있을 때만). 골드·재료·부가설명(note)이 모두 없을 때만 '무료'.
          (카지노처럼 note에 코인 비용이 있으면 '무료'가 아니다) */}
      {hasMaterials ? (
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
          {offer.materials.map((m, i) => (
            <span
              key={`${m.en}-${i}`}
              className="flex items-center gap-1 rounded-md bg-[var(--sv-bg)] px-2 py-1"
            >
              <Image
                src={asset(m.icon)}
                alt=""
                width={18}
                height={18}
                unoptimized
                className="shrink-0"
                style={{ imageRendering: "pixelated" }}
              />
              {name(m)}
              {m.qty > 1 && (
                <span className="text-[var(--sv-ink-muted)]">×{m.qty}</span>
              )}
            </span>
          ))}
        </div>
      ) : (
        offer.gold === 0 &&
        coin === null &&
        !note && (
          <div className="mt-1.5 text-xs text-[var(--sv-ink-muted)]">
            {t("costMaterials.free")}
          </div>
        )
      )}

      {/* 구매 조건 등 부가 설명(탭·배지로 드러나는 부분은 displayNote가 제거).
          note 안의 "N골드"는 골드 아이콘+숫자로 인라인 치환 */}
      {note && (
        <p className="mt-1.5 text-[11px] leading-snug text-[var(--sv-ink-muted)]">
          <LocalizedNote leftover={note} />
        </p>
      )}
    </div>
  );
}
