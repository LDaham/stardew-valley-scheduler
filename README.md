<div align="center">
  <img src="public/icon.svg" width="72" alt="logo" />

  # Stardew Valley Scheduler

  A personal planner for Stardew Valley's repeating calendar — never miss a festival, birthday, or planting deadline, and look up villager gift tastes at a glance.

  **Live site · [ldaham.github.io/stardew-valley-scheduler](https://ldaham.github.io/stardew-valley-scheduler/)**
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
- **Min-Max guide** — an optional day-by-day min-max walkthrough with daily goals, localized into all 12 languages.

**Progress tracking**
- Achievements, Perfection, Community Center bundles, the Museum, monster eradication goals, and the Ginger Island Field Office.

**Everything else**
- Theme picker combining **mode** (system / light / dark) × **season** (auto / spring / summer / fall / winter); the *auto* season follows the current in-game date and color shifts smoothly.
- **12 languages** (next-intl) — English, Korean, German, Spanish, French, Italian, Hungarian, Japanese, Portuguese (BR), Russian, Turkish, Simplified Chinese.
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

The dev server has no locale middleware, so the root (`/`) is 404 — open a locale path such as **`http://localhost:3000/ko`** (or `/en`, `/ja`, `/de`, …).

## Scripts

```bash
npm run dev     # dev server (open a locale path, e.g. /ko)
npm run build   # static export → out/
npm run lint    # ESLint
```

> For a GitHub Pages **project site** (served from a subpath), build with `NEXT_PUBLIC_BASE_PATH=/your-repo-name`. Pushing to `main` triggers automatic deployment via GitHub Actions.

## Tech stack

- **[Next.js 16](https://nextjs.org/)** (App Router, static export) · **[React 19](https://react.dev/)** · **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS 4](https://tailwindcss.com/)** · **[next-intl](https://next-intl.dev/)** (12 locales)
- Deployment: **GitHub Pages + GitHub Actions** · PWA

## Contributing

Bug reports, feature ideas, and PRs are welcome.

- **Issues** — for bugs include reproduction steps and screenshots; for ideas describe the use case. File them at [Issues](https://github.com/LDaham/stardew-valley-scheduler/issues). The in-app **Settings → Report** tab links here too.
- **Pull requests** — target `main`, one topic per PR. `npm run lint` and `npm run build` must pass before merge.
- New display strings just need to be written in your own language's file (e.g. `messages/ko.json`, `messages/fr.json`). Untranslated locales fall back to English.

## License

- **Source code:** [MIT](LICENSE) © 2026 Lee Daham.
- **Game assets & data** (icons under `public/icons/**`, names/values/descriptions in `src/data/**` and `messages/**`): © ConcernedApe LLC — derived from Stardew Valley, **not** covered by MIT, used for **non-commercial fan purposes only**.
- Some data was referenced from the [Stardew Valley Wiki](https://stardewvalleywiki.com) ([CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/)) and is being replaced with values extracted directly from game files.
- **Min-Max guide** (`src/data/minMaxGuide/**`): translated into 12 languages and restructured from the [Min-Max Routing / Strategy](https://github.com/Zamiell/stardew-valley/blob/main/Min-Max_Guide.md) guide by BlackSight6 & Zamiel — a derivative work under the same [GPL-3.0](LICENSES/GPL-3.0.txt) license as the original (this part is **not** restricted to non-commercial use). It is kept as a separate file (mere aggregation), since GPL and the wiki's CC BY-NC-SA are mutually incompatible.
- See [NOTICE](NOTICE) for the full third-party breakdown.
- This is an **unofficial, non-commercial fan project**, not affiliated with ConcernedApe. Run with **no ads or paywalls — donation-supported only**.
