# SatuNusaMC — Official Minecraft Server Website

Minimalist, professional Minecraft server website built with React + Vite + TypeScript + Tailwind CSS.

## Tech Stack
- React 19
- Vite 8
- TypeScript 5
- Tailwind CSS 3.4
- React Router 7
- Lucide React (icons)

## Installation
```bash
npm install
```

## Development
```bash
npm run dev
```
Open http://localhost:5173

## Production Build
```bash
npm run build
npm run preview
```

## Configuration
Edit `src/config/site.ts` to configure:
- Server name, IP, edition, Bedrock port
- Discord invitation URL
- WhatsApp number (format: 62xxx, no + or spaces)
- Server description, footer copyright

If WhatsApp/Discord are not configured (still placeholder values), the UI shows a disabled "not available" state.

## Content Management
- Ranks: `src/data/ranks.ts`
- News: `src/data/news.ts`
- Staff: `src/data/staff.ts`
- Votes: `src/data/votes.ts`
- Rules: `src/data/rules.ts`
- Wiki: `src/data/wiki.ts`

## Deployment (Vercel)
1. Push to GitHub (or use Vercel CLI).
2. Import project in Vercel dashboard.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Framework preset: Vite

SPA fallback is configured via `vercel.json`.

## Cloudflare Pages (alternative)
- Build command: `npm run build`
- Output directory: `dist`
- Add `_redirects` file with: `/* /index.html 200`
