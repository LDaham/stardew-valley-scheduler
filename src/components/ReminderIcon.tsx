import Image from "next/image";
import type { ReminderId } from "@/data/reminders";
import { asset } from "@/lib/asset";

// 리마인더 id별 아이콘 이미지 (public/icons/reminders/<id>.png).
export default function ReminderIcon({
  id,
  size = 16,
}: {
  id: ReminderId;
  size?: number;
}) {
  return (
    <Image
      src={asset(`/icons/reminders/${id}.png`)}
      alt=""
      width={size}
      height={size}
      unoptimized
      className="inline-block shrink-0"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
