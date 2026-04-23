# Animeify

> Turn any photo into anime. One tap. Six seconds. Ready to post.

## Status

**v0 skeleton** — landing page ported to Next.js, `/try` demo with mocked anime CSS filter, waitlist API wired. No real AI model yet.

## Stack

- **Next.js 15** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS v4** (`@tailwindcss/postcss`, CSS-first, no config file)
- **pnpm**

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, demo widget, features, waitlist form |
| `/try` | Upload a photo → apply mocked anime SVG filter → before/after |
| `/api/waitlist` | `POST { email }` → forwards to waitlist-api-sigma with `product: "animeify"` |

## Run locally

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com). Next.js is auto-detected — no config changes required. No environment variables needed.

```bash
pnpm build   # verify clean build locally
```
