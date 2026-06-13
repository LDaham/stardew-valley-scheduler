// 정적 export 서브경로 배포(GitHub Pages 프로젝트 사이트)를 위한 에셋 경로 헬퍼.
// next/image의 unoptimized 모드는 basePath를 자동으로 붙이지 않으므로,
// 절대 경로(/icons/... 등) 앞에 basePath를 직접 붙인다.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  return path.startsWith("/") ? `${basePath}${path}` : path;
}
