import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

// GitHub Pages 프로젝트 사이트(예: id.github.io/repo)는 서브경로로 배포되므로
// 빌드 시 NEXT_PUBLIC_BASE_PATH=/repo 로 지정. 루트 도메인/커스텀 도메인이면 비워둔다.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // 정적 사이트로 추출(GitHub Pages 등 서버 없는 호스팅용)
  output: "export",
  // 디렉터리 형태로 출력해 /ko/ -> /ko/index.html 로 서빙되게 함
  trailingSlash: true,
  // 정적 추출에는 이미지 최적화 서버가 없으므로 비활성화
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
};

export default withNextIntl(nextConfig);
