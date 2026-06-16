import Image from "next/image";
import { asset } from "@/lib/asset";

// 픽셀 아트 아이콘 공용 렌더러.
// 프로젝트 규칙: 의미 아이콘은 이모지가 아니라 항상 픽셀 이미지를 사용한다(AGENTS.md 참고).
export default function PixelIcon({
  src,
  size = 16,
  className = "",
}: {
  src: string;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={asset(src)}
      alt=""
      width={size}
      height={size}
      unoptimized
      className={`shrink-0 ${className}`}
      // width/height를 inline으로 고정(+object-contain)해 Tailwind의 img{height:auto}로
      // 비정사각형 이미지가 늘어나 행 크기가 커지는 것을 막는다.
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        imageRendering: "pixelated",
      }}
    />
  );
}
