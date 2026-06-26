"use client";

import { useTranslations } from "next-intl";
import Modal from "@/components/Modal";
import PixelIcon from "@/components/PixelIcon";
import { useSchedule } from "@/components/ScheduleProvider";
import { ShopOffersPanel } from "@/components/CostMaterialsDialog";
import { COST_SHOP_ICON } from "@/data/costMaterials";
import { getWeekday, type Weekday } from "@/lib/calendar";

// getWeekday(mon~sun) → 비용 데이터 day 필드의 한국어 전체 요일명("화요일" 등)과 일치시키는 표.
const WEEKDAY_KO_FULL: Record<Weekday, string> = {
  mon: "월요일",
  tue: "화요일",
  wed: "수요일",
  thu: "목요일",
  fri: "금요일",
  sat: "토요일",
  sun: "일요일",
};

// 메인 가게 일정에서 가게 이름 클릭 시 여는 구매 가격 모달.
// 현재 계절 탭을 우선 선택하고(요일별만 있으면 요일별 탭), 오늘 요일 판매 물품 배지를 강조한다.
export default function ShopCostDialog({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) {
  const t = useTranslations();
  const { currentDate } = useSchedule();
  const today = WEEKDAY_KO_FULL[getWeekday(currentDate.day)];

  return (
    <Modal
      title={t(`costMaterials.shops.${id}`)}
      onClose={onClose}
      titleIcon={
        <PixelIcon src={`/icons/shops/${COST_SHOP_ICON[id]}.png`} size={24} />
      }
    >
      <ShopOffersPanel
        id={id}
        preferGroups={[currentDate.season, "byDay"]}
        today={today}
      />
    </Modal>
  );
}
