# Chi Darc

Bilingual personal travel & art blog (Traditional Chinese + English), built with [Astro](https://astro.build) for [chidarc.com](https://chidarc.com). Hosted as static assets on Cloudflare Workers.

The legacy WordPress site lives in `chi-website/` for reference only and can be deleted when you are ready.

## Requirements

- Node.js 22.12+

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:4321`).

## Build

```bash
npm run build
```

Output is written to `dist/`.

## Cloudflare deploy

Static hosting via Wrangler (Workers assets):

```bash
npm run deploy
```

Or preview the production build locally with Wrangler:

```bash
npm run preview:cf
```

Configure the custom domain `chidarc.com` in the Cloudflare dashboard after the first deploy.

## Project structure

- `src/content/posts/` — Markdown posts (`*.zh-tw.md` / `*.en.md`)
- `src/i18n/` — UI strings and locale helpers
- `src/components/` — BEM-styled layout pieces
- `public/images/` — Media extracted from the WordPress uploads
- `wrangler.jsonc` — Cloudflare Workers static assets config

## Content

Posts are Astro content collections. Shared `translationKey` + `slug` pair Chinese and English versions. Contact form is front-end only until your custom handler is wired up.
