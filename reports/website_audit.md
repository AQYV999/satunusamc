# Website Audit Report — SatuNusaMC
## 1. Current Website Overview
The SatuNusaMC website is a Vite + React + TypeScript static site deployed on Vercel. It contains 8 pages (Home, Store, Vote, Rules, News, Staff, Support, Wiki). Navigation is responsive with a mobile drawer. Hero has IP display with Copy IP button. WhatsApp Click-to-Chat is implemented for rank purchases and community contact. Discord/WhatsApp links are configurable via src/config/site.ts.

## 2. Existing Page Structure
- Home: Hero, Features, About, How to Join, Latest News, Community
- Store: 4 rank cards with WhatsApp purchase buttons
- Vote: voting platform cards
- Rules: organized rule sections
- News: news listing
- Staff: staff profiles
- Support: Discord/WhatsApp + FAQ
- Wiki: getting started, commands, gameplay, FAQ

## 3. Visual Design Assessment
Minimalist dark theme with CSS variables. Clean typography and spacing. Consistent card layouts. Responsive grid layouts. No excessive animations or glassmorphism.

## 4. Functional Assessment
- Navigation: works on desktop and mobile.
- Copy IP: works with visual feedback ("Copied!").
- WhatsApp purchase: generates rank-specific messages correctly.
- Discord/WhatsApp links: use placeholder values; graceful disabled state when unconfigured.
- No live server status (static only, as intended).

## 5. Responsive Design Assessment
Tailwind responsive classes used throughout. Tested at 360px, 390px, 768px, 1440px. Mobile menu works. Grid columns collapse to 1 on small screens.

## 6. Performance Observations
- Bundle size: 287.80 kB (gzipped 88.86 kB) — acceptable.
- CSS: 11.22 kB (gzipped 3.21 kB).
- No large images; hero uses SVG icons only.
- No heavy dependencies.

## 7. Accessibility Observations
- Semantic HTML (nav, main, footer, section, article).
- ARIA labels on toggle button.
- Focus states via Tailwind.
- Color contrast: dark theme with accent colors.

## 8. SEO Observations
- Page titles: default "satunusamc" — could be improved per page.
- Meta description: present in index.html.
- Open Graph: basic metadata present.
- Favicon: default Vite favicon.

## 9. Missing Features
- Per-page document titles.
- SPA fallback for Vercel (added vercel.json).
- More detailed footer with all navigation links.
- English localization readiness (content architecture supports it via data files).

## 10. Technical Problems
- Navbar mobile drawer does not close on route change (fixed via setIsOpen(false) in NavLink onClick).
- WhatsApp link in Hero "Join Server" button hardcoded (should use whatsappLink helper).
- Discord/WhatsApp links in Navbar not using graceful unavailable state.

## 11. Recommended Improvements
- Add per-page titles via useEffect.
- Replace hardcoded WhatsApp links with helper.
- Add comprehensive README.
- Add _redirects for Cloudflare Pages (if needed).
- Improve footer navigation completeness.