import type { MetadataRoute } from "next";

// PWA 매니페스트. 서브경로 배포를 위해 basePath를 경로에 직접 포함한다
// (매니페스트 JSON 값은 Next가 자동으로 basePath를 붙여주지 않음).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stardew Valley Scheduler",
    short_name: "SV Scheduler",
    description: "Cycling calendar notepad for Stardew Valley",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#f4ecd8",
    theme_color: "#5a8f3c",
    icons: [
      {
        src: `${basePath}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: `${basePath}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
