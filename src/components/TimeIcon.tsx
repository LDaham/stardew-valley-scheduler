import Image from "next/image";
import { asset } from "@/lib/asset";

// 시간/날짜 관련 표시용 공용 아이콘(Time_Icon)
export default function TimeIcon({ size = 16 }: { size?: number }) {
  return (
    <Image
      src={asset("/icons/ui/time.png")}
      alt=""
      width={size}
      height={size}
      unoptimized
      className="shrink-0"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
