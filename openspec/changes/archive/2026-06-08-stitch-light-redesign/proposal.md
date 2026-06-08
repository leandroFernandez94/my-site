# Proposal: Stitch Light Mode Redesign

## Intent

Redesign the CV page from its current warm cream/coral theme to a modern light-mode developer CV design generated via Stitch. The visual identity changes entirely (colors, typography, layout patterns), but all content remains verbatim. This is a pure presentation-layer refresh — no new content, no JavaScript, no build tools.

## Scope

### In Scope
- Tailwind config: new color tokens (`#f7f9fb`, `#000000`, `#0051d5`, `#191c1e`), new font families (Geist, Hanken Grotesk, JetBrains Mono)
- Font loading: replace Nunito Google Fonts link with Geist CDN + Hanken Grotesk + JetBrains Mono
- HTML structure: add fixed glassmorphism navbar, restructure header as hero, add timeline wrappers for Education/Experience, add footer
- Layout: switch from padding-based width to `max-w-[1100px]` centered
- SVG icons: change `fill="#CF5C36"` to `fill="currentColor"`
- Print stylesheet: hide navbar/footer, simplify timeline decorations
- Remove `<hr>` divider (replaced by section spacing)

### Out of Scope
- Content changes (text, dates, URLs, descriptions)
- JSON-LD / meta tags / canonical URL changes
- JavaScript or build tool introduction
- Dark mode or theme toggle
- New sections or pages
- Image/photo additions

## Capabilities

### New Capabilities

None. All changes are structural restyling within the existing single-page architecture.

### Modified Capabilities

- `static-cv-page`: Visual design tokens, layout strategy, font stack, and HTML structure (navbar, hero, timeline, footer) are all changing. Requirements for Visual Design Fidelity, Responsive Layout, Content Structure, and Performance Optimization require delta specs.
- `print-stylesheet`: Must handle new elements — hide navbar and footer, simplify timeline decorative elements. Current requirements for Print-Optimized Elements need updates.

## Approach

Single-pass full restructure (recommended by exploration). The file is 362 lines; changes are highly interdependent (new Tailwind tokens referenced by new classes). An intermediate state (e.g., new fonts + old structure) would look worse than either current or target. All changes land atomically in one commit, well within the 400-line review budget (~214 lines changed).

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `index.html` `<head>` | Modified | Font links, Tailwind config, preconnect URLs |
| `index.html` `<body>` top | New | Fixed glassmorphism navbar |
| `index.html` `<header>` | Modified | Restructured as hero section |
| `index.html` `<hr>` | Removed | Replaced by section spacing |
| `index.html` `#about` | Modified | Class-only changes |
| `index.html` `#education` | Modified | Timeline wrapper structure |
| `index.html` `#experience` | Modified | Timeline wrapper structure |
| `index.html` after `</main>` | New | Footer element |
| `index.html` `<style>` | Modified | Print rules for navbar/footer/timeline |
| `public/*.svg` (4 files) | Modified | `fill="currentColor"` |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Geist font not on Google Fonts — needs CDN | High | Use `cdn.jsdelivr.net/npm/geist@1` or Vercel CDN |
| Mobile responsiveness broken by max-w constraint | Med | Test on 375px viewport; add mobile-specific overrides |
| Glassmorphism navbar scroll issues on mobile | Med | Use `backdrop-blur` with solid fallback; test touch scroll |
| Print layout broken by timeline decorations | Med | Add `@media print` rules to hide timeline lines/dots |
| SVG `currentColor` breaks in some contexts | Low | Verify each icon renders correctly against new backgrounds |

## Rollback Plan

Single `git revert` of the commit. The change is atomic — no migrations, no external dependencies, no data loss. All content is preserved, so rollback restores the exact previous state.

## Dependencies

- Geist font CDN (jsDelivr or Vercel) — must be available and CORS-permissive
- Hanken Grotesk and JetBrains Mono on Google Fonts
- Tailwind CDN (already in use, no version change needed)

## Success Criteria

- [ ] Page renders with new light-mode design matching Stitch target
- [ ] All content preserved verbatim (names, dates, descriptions, links, JSON-LD, meta tags)
- [ ] Navbar visible on scroll, functional section links
- [ ] Education and Experience render as timeline layouts
- [ ] Footer present with contact/links
- [ ] Mobile responsive at 375px viewport
- [ ] Print preview hides navbar/footer, shows clean content
- [ ] SVG icons render in correct color
- [ ] Favicon preserved
- [ ] ~214 lines changed, under 400-line budget
