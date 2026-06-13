import Image from "next/image";
import type { FixedEvent } from "@/lib/events";
import { asset } from "@/lib/asset";

// 고정 이벤트 종류별 아이콘. 생일=캐릭터별, 축제=깃발 PNG, 작물마감=이모지(전용 스프라이트 없음).
export default function EventIcon({
  event,
  size = 16,
}: {
  event: FixedEvent;
  size?: number;
}) {
  if (event.type === "birthday") {
    return (
      <Image
        src={asset(`/icons/villagers/${event.refId}.png`)}
        alt=""
        width={size}
        height={size}
        unoptimized
        className="inline-block shrink-0"
        style={{ imageRendering: "pixelated" }}
      />
    );
  }
  if (event.type === "festival") {
    return (
      <Image
        src={asset("/icons/festival/flag.png")}
        alt=""
        width={size}
        height={size}
        unoptimized
        className="inline-block shrink-0"
        style={{ imageRendering: "pixelated" }}
      />
    );
  }
  // 작물 심기 마감: 작물별 씨앗 아이콘
  return (
    <Image
      src={asset(`/icons/seeds/${event.refId}.png`)}
      alt=""
      width={size}
      height={size}
      unoptimized
      className="inline-block shrink-0"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
