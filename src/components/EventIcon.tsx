import Image from "next/image";
import type { FixedEvent } from "@/lib/events";
import { asset } from "@/lib/asset";

// 고정 이벤트 아이콘(항목별 개별 이미지).
// 생일=주민 얼굴, 축제=깃발로 통일, 작물 마감=작물별 씨앗.
function src(event: FixedEvent): string {
  if (event.type === "birthday") return `/icons/villagers/${event.refId}.png`;
  if (event.type === "festival") return `/icons/festival/flag.png`;
  return `/icons/seeds/${event.refId}.png`;
}

export default function EventIcon({
  event,
  size = 16,
}: {
  event: FixedEvent;
  size?: number;
}) {
  return (
    <Image
      src={asset(src(event))}
      alt=""
      width={size}
      height={size}
      unoptimized
      className="inline-block shrink-0"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
