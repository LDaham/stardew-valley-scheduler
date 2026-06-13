<div align="center">
  <img src="public/icon.svg" width="72" alt="logo" />

  # 🌱 스타듀밸리 스케줄러

  스타듀밸리의 순환 달력으로 축제·생일·작물 마감을 챙기고, 주민 선물 취향을 확인하는 메모장.

  **🔗 데모 · [ldaham.github.io/stardew-valley-scheduler](https://ldaham.github.io/stardew-valley-scheduler/)**
</div>

## 개요

스타듀밸리는 **28일 × 4계절**이 매년 똑같이 반복되지만, 축제·주민 생일·작물 심기 마감일을 놓치기 쉽습니다. 이 앱은 연도 없는 **112일 순환 달력**에 일정을 미리 챙기도록 만든 개인용 메모장입니다.

**주요 기능**
- 📅 112일 순환 달력 + 날짜별 메모
- 🎉 축제·주민 생일·작물 심기 마감 자동 표시, 대시보드에서 **D-N 예고**
- 🎁 주민별 선물 취향(사랑/좋아함/보통) — **보편 선물 폴더**, 카테고리 펼치기(야채·과일·장신구 등), 주민별 예외 표시
- 🔎 표시할 이벤트 필터 · 🌐 한국어/English · 📲 **PWA**(오프라인·설치)
- 💾 데이터는 브라우저 localStorage에 저장(서버·로그인 없음)

## 미리보기

> 실행 화면은 위 **데모 링크**에서 바로 확인할 수 있습니다.

<!-- 스크린샷/GIF는 이 위치에 추가하세요 (예: docs/preview.gif) -->

## 시작하기

**요구 사항**: Node.js 24+ (npm 11)

```bash
git clone https://github.com/LDaham/stardew-valley-scheduler.git
cd stardew-valley-scheduler
npm install
npm run dev
```

개발 서버는 미들웨어가 없어 루트(`/`)가 404이므로 **`http://localhost:3000/ko`** 로 접속하세요.

## 사용법

```bash
npm run dev     # 개발 서버 (/ko, /en)
npm run build   # 정적 사이트 생성 → out/
npm run lint    # ESLint 검사
```

- **달력**에서 날짜를 클릭해 메모를 작성하고, 원하는 날을 "오늘"로 설정합니다.
- **대시보드**에서 오늘/내일 할 일과 다가오는 이벤트를 한눈에 봅니다.
- 주민 생일 등에서 **선물 보기**를 눌러 취향(보편 선물·카테고리 포함)을 확인합니다.
- **⚙ 설정**에서 표시할 이벤트와 언어를 바꿉니다.

> GitHub Pages 프로젝트 사이트(서브경로)로 배포할 때는 `NEXT_PUBLIC_BASE_PATH=/저장소명` 으로 빌드합니다. `main` 브랜치 push 시 GitHub Actions가 자동 배포합니다.

## 기술 스택

- **[Next.js 16](https://nextjs.org/)** (App Router, 정적 export) · **[React 19](https://react.dev/)** · **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS 4](https://tailwindcss.com/)** · **[next-intl](https://next-intl.dev/)** (ko/en 다국어)
- 배포: **GitHub Pages + GitHub Actions**, PWA

## 기여 방법

버그 제보·기능 제안·PR 환영합니다.

- **이슈**: 버그는 재현 단계와 스크린샷을, 기능 제안은 사용 시나리오를 함께 적어 [Issues](https://github.com/LDaham/stardew-valley-scheduler/issues)에 등록해 주세요.
- **Pull Request**: `main` 브랜치를 대상으로, 1 PR = 1 주제로 작성합니다. 머지 전 `npm run lint`·`npm run build`가 통과해야 합니다.
- 게임 데이터·번역(`src/data`, `messages`)을 수정할 때는 출처(Stardew Valley Wiki, CC BY-NC-SA 3.0)를 유지해 주세요.

## 라이선스

- **소스 코드**: [MIT](LICENSE) © 2026 Lee Daham
- **게임 데이터·번역**: [Stardew Valley Wiki](https://stardewvalleywiki.com) 기반, [CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/)
- Stardew Valley © ConcernedApe. 본 프로젝트는 **비공식·비영리 팬 제작물**이며 ConcernedApe와 제휴하지 않았습니다.
