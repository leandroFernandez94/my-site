# Proposal: Migrate to Vanilla HTML + Tailwind

## Intent

The site is a personal resume/CV page with two routes: a simple CV (`index.tsx`) and an animated portfolio landing (`landing.tsx`). The landing page is no longer needed. The entire Next.js 12 + React 17 + TypeScript + SCSS stack is disproportionate for what amounts to a static HTML page. We strip everything down to a single `index.html` with Tailwind CSS via CDN — zero build pipeline, zero frameworks, zero JavaScript.

## Scope

### In Scope
- Delete landing page (`pages/landing.tsx`) and ALL associated code (components, hooks, SCSS modules, landing-only assets)
- Migrate CV content from `pages/index.tsx` to a single `index.html` at project root
- Replace entire Next.js stack with vanilla HTML + Tailwind CSS CDN
- Add `@media print` stylesheet for CV printing/PDF export
- Remove all config files (`next.config.js`, `tsconfig.json`, `.eslintrc.json`, `package.json`, `yarn.lock`)
- Remove `opencode.json` (Vercel MCP config — no longer applicable)
- Clean up orphan files (CRA leftover `public/index.html`, dead code hooks)
- Update `.gitignore` for vanilla project

### Out of Scope
- Dark mode
- IntersectionObserver animations
- Web Components
- Interactive JavaScript features
- Tailwind standalone CLI (CDN is fine for now; can optimize later)

## Capabilities

### New Capabilities
- `static-cv-page`: Single-file HTML resume/CV with Tailwind CSS, semantic markup, responsive layout, Nunito font, and print stylesheet
- `print-stylesheet`: `@media print` rules with `@page` margins, URL expansion on links, and print-optimized typography

### Modified Capabilities
None — no existing specs in `openspec/specs/`.

## Approach

Create one self-contained `index.html` at the project root. Inline all content from the current `index.tsx` as semantic HTML5. Load Tailwind via CDN `<script>` tag. Use `<style>` block for `@media print` rules. Keep existing SVG icons as `<img>` references under `public/`. Delete everything else — Next.js, React, TypeScript, Sass, node_modules, build configs, landing page assets.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` | New | Single-file CV with Tailwind + print CSS |
| `pages/` | Removed | All Next.js pages (_app, _document, index, landing, api) |
| `components/` | Removed | Contact, Navbar, LandingAvatar |
| `hooks/` | Removed | useEventListener, useChangeBGOnScroll |
| `styles/` | Removed | All CSS/SCSS modules |
| `package.json`, `yarn.lock`, `node_modules/` | Removed | Entire dependency tree |
| `next.config.js`, `tsconfig.json`, `next-env.d.ts`, `.eslintrc.json` | Removed | Build tooling |
| `opencode.json` | Removed | Vercel MCP config |
| `public/*.svg`, `public/*.png` | Removed | Landing-only assets (hero-bg-*, my-avatar-*, portrait, twitterIcon, phone) |
| `public/favicon.ico`, `public/{email,github,linkedinIcon,location-pointer}.svg` | Kept | CV page icons |
| `.gitignore` | Modified | Updated for vanilla project |
| `README.md` | Removed | Stale Next.js README |
| `openspec/` | Kept | SDD artifacts preserved |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Content loss during manual migration | Low | index.tsx is short (~200 LOC); side-by-side copy |
| Tailwind CDN unavailability | Low | CDN is highly available; can switch to standalone CLI later |
| Print layout inconsistencies across browsers | Med | Test in Chrome/Firefox/Safari before finalizing |

## Rollback Plan

All deleted files are recoverable via `git checkout` from the pre-migration commit. The migration is a single commit — `git revert` restores the entire Next.js stack instantly.

## Dependencies

- Tailwind CSS CDN (loaded from `cdn.tailwindcss.com`)
- Google Fonts CDN (Nunito)

## Success Criteria

- [ ] Single `index.html` renders the CV with identical content to current `index.tsx`
- [ ] Responsive layout works on mobile, tablet, desktop
- [ ] Print stylesheet produces clean PDF output with expanded URLs
- [ ] No `node_modules/`, no build step, no JavaScript framework
- [ ] All landing-page-only code and assets are removed
- [ ] `openspec/` directory preserved intact
