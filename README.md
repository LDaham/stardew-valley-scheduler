# 스타듀밸리 스케줄러 (Stardew Valley Scheduler)

스타듀밸리의 28일 × 4계절 순환 달력 메모장. 축제·생일·작물 심기 마감을
미리 챙기고, 주민별 선물 반응(보편 선물 폴더 포함)을 확인할 수 있습니다.

- **스택:** Next.js 16 (App Router) · next-intl(ko/en) · Tailwind
- **저장:** 브라우저 localStorage (서버/로그인 없음)
- **배포:** 정적 export → GitHub Pages, PWA(오프라인·설치) 지원

## 개발 (Development)

```bash
npm install
npm run dev      # 개발 서버에서는 http://localhost:3000/ko 로 직접 접속
```

> 개발 모드(`next dev`)에는 미들웨어가 없어 루트 `/`가 404입니다 — `/ko`로 접속하세요.
> 정적 빌드(배포본)에서는 `public/index.html`이 `/`를 `/ko/`로 리다이렉트합니다.

## 정적 빌드 (Static export)

```bash
npm run build    # out/ 에 정적 사이트 생성
```

서버·미들웨어 없는 정적 사이트로 추출됩니다(`output: "export"`).
로케일은 항상 접두사를 가지며(`/ko`, `/en`), 루트 `/`는
`public/index.html`이 `/ko/`로 리다이렉트합니다.

### 서브경로 배포 (basePath)

GitHub Pages **프로젝트 사이트**(`아이디.github.io/저장소명`)는 서브경로로
서빙되므로 빌드 시 basePath를 지정해야 합니다:

```bash
NEXT_PUBLIC_BASE_PATH=/저장소명 npm run build
```

**사용자·조직 사이트**(`아이디.github.io`)나 **커스텀 도메인**이면 비워두세요.

## 배포 (GitHub Pages)

`.github/workflows/deploy.yml`이 `main`/`master` push 시 자동 빌드·배포합니다.
저장소 **Settings → Pages → Source**를 **GitHub Actions**로 설정하세요.
워크플로는 basePath를 저장소명(`/${repo}`)으로 자동 지정합니다(루트/커스텀
도메인이면 워크플로의 `NEXT_PUBLIC_BASE_PATH`를 빈 값으로 수정).

## 라이선스 (License)

- **소스 코드:** [MIT](LICENSE)
- **게임 데이터·번역·아이콘:** 별도 조건 적용 — [NOTICE](NOTICE) 참고.
  데이터·번역은 [Stardew Valley Wiki](https://stardewvalleywiki.com)
  (CC BY-NC-SA 3.0) 기반이며, 아이콘은 ConcernedApe의 게임 저작물입니다.

비영리 팬 제작물이며 ConcernedApe / Stardew Valley와 공식 제휴가 없습니다.
