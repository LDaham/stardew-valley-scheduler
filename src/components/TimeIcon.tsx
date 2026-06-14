import PixelIcon from "@/components/PixelIcon";

// 시간/날짜 관련 표시용 공용 아이콘(Time_Icon)
export default function TimeIcon({ size = 16 }: { size?: number }) {
  return <PixelIcon src="/icons/ui/time.png" size={size} />;
}
