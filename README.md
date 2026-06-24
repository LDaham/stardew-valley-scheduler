<div align="center">
  <img src="public/icon.svg" width="72" alt="logo" />

  # Stardew Valley Scheduler

  A personal planner for Stardew Valley's repeating calendar — never miss a festival, birthday, or planting deadline, and look up villager gift tastes at a glance.

  **Live demo · [ldaham.github.io/stardew-valley-scheduler](https://ldaham.github.io/stardew-valley-scheduler/)**

  English · [한국어](#korean)
</div>

## Overview

Stardew Valley runs on the same **28 days × 4 seasons** loop every year, yet it's easy to miss a festival, a villager's birthday, or the last day to plant a crop. This app maps your plans onto a year-agnostic **112-day cyclic calendar** so you can prepare ahead. Everything runs in the browser — no account, no server.

## Features

**Calendar & dashboard**
- 112-day cyclic calendar with per-date memos; pick any day as "today".
- Auto-flagged festivals, villager birthdays, crop planting deadlines, and seasonal foraging events, with **D-N countdowns** on the dashboard.
- Day-of-week reminders that account for shop hours, closures, festivals, weather, and progress.

**Info tools**
- **Crop efficiency** — seed profitability and growth planning.
- **Fish info** — by season, weather, location, and time.
- **Shop schedule** — opening hours and closed days; click a shop to open its prices.
- **Purchase prices** — buy costs and materials, reflecting the current season/day.
- **Gift preferences** — per-villager loves/likes/neutrals, with a **universal-gift folder** and expandable categories.
- **Movie preferences** — what each villager wants at the theater.

**Progress tracking**
- Achievements, Perfection, Community Center bundles, the Museum, monster eradication goals, and the Ginger Island Field Office.

**Everything else**
- Theme picker combining **mode** (system / light / dark) × **season** (auto / spring / summer / fall / winter); the *auto* season follows the current in-game date and color shifts smoothly.
- Korean / English (next-intl).
- **PWA** — installable and works offline.
- Data is saved to browser localStorage. **Export / import as JSON** for backup or moving between devices.

## Getting started

**Requirements:** Node.js 20.9+

```bash
git clone https://github.com/LDaham/stardew-valley-scheduler.git
cd stardew-valley-scheduler
npm install
npm run dev
```

The dev server has no locale middleware, so the root (`/`) is 404 — open **`http://localhost:3000/ko`** (or `/en`).

## Scripts

```bash
npm run dev     # dev server (/ko, /en)
npm run build   # static export → out/
npm run lint    # ESLint
```

> For a GitHub Pages **project site** (served from a subpath), build with `NEXT_PUBLIC_BASE_PATH=/your-repo-name`. Pushing to `main` triggers automatic deployment via GitHub Actions.

## Tech stack

- **[Next.js 16](https://nextjs.org/)** (App Router, static export) · **[React 19](https://react.dev/)** · **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS 4](https://tailwindcss.com/)** · **[next-intl](https://next-intl.dev/)** (ko/en)
- Deployment: **GitHub Pages + GitHub Actions** · PWA

## Contributing

Bug reports, feature ideas, and PRs are welcome.

- **Issues** — for bugs include reproduction steps and screenshots; for ideas describe the use case. File them at [Issues](https://github.com/LDaham/stardew-valley-scheduler/issues). The in-app **Settings → Report** tab links here too.
- **Pull requests** — target `main`, one topic per PR. `npm run lint` and `npm run build` must pass before merge.
- New display strings must be added to **both** `messages/ko.json` and `messages/en.json`.

## License

- **Source code:** [MIT](LICENSE) © 2026 Lee Daham.
- **Game assets & data** (icons under `public/icons/**`, names/values/descriptions in `src/data/**` and `messages/**`): © ConcernedApe LLC — derived from Stardew Valley, **not** covered by MIT, used for **non-commercial fan purposes only**.
- Some data was referenced from the [Stardew Valley Wiki](https://stardewvalleywiki.com) ([CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/)) and is being replaced with values extracted directly from game files. See [NOTICE](NOTICE) for details.
- This is an **unofficial, non-commercial fan project**, not affiliated with ConcernedApe. Run with **no ads or paywalls — donation-supported only**.

---

<a name="korean"></a>

## 한국어

스타듀밸리의 **28일 × 4계절** 순환 달력에 일정을 미리 챙기는 개인용 플래너입니다. 축제·주민 생일·작물 심기 마감을 놓치지 않고, 주민 선물 취향을 바로 확인하세요. 모든 데이터는 브라우저에 저장되며 서버·로그인이 없습니다.

- **달력·대시보드**: 112일 순환 달력 + 날짜별 메모, 축제·생일·작물 마감·채집 이벤트 자동 표시와 **D-N 예고**, 가게 일정을 고려한 요일 리마인더.
- **정보 도구**: 작물 효율 · 생선 정보 · 가게 일정 · 구매 가격 · 선물 선호 · 영화 선호.
- **진행도**: 업적 · 완벽 · 마을회관 꾸러미 · 박물관 · 박멸 목표 · 현장 사무소.
- **그 외**: 모드(시스템/라이트/다크) × 계절(자동/봄/여름/가을/겨울) 테마(자동은 현재 날짜를 따라 부드럽게 전환), 한국어/English, PWA(오프라인·설치), JSON 내보내기/가져오기.

실행은 위 **데모 링크**에서 바로 확인할 수 있고, 로컬 개발은 `npm install && npm run dev` 후 **`http://localhost:3000/ko`** 로 접속합니다. 라이선스·기여 방법은 위 영어 섹션을 참고하세요.
