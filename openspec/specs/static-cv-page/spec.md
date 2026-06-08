# Static CV Page Specification

## Purpose

Single-file HTML resume/CV. Vanilla HTML + CSS, no frameworks, no build step, no JavaScript. Visually matches the current Next.js page with added performance and SEO optimizations.

## Requirements

### Requirement: Navigation Bar

The page MUST include a fixed `<nav>` element at the top of the viewport with glassmorphism styling (semi-transparent background with backdrop-blur). The navbar MUST contain anchor links to each section (#about, #education, #experience) and a "Download CV" button. The navbar MUST remain fixed during scroll and MUST NOT overlap or clip page content below. The navbar MUST use `display: none` via a `.no-print` class for print media.

#### Scenario: Navbar links navigate to sections

- GIVEN the page is loaded
- WHEN the user clicks a section link in the navbar
- THEN the viewport scrolls to the corresponding section

#### Scenario: Navbar is hidden in print

- GIVEN print media is active
- WHEN the page renders for print
- THEN the navbar is not visible

### Requirement: Footer

The page MUST include a `<footer>` element after `</main>` containing the person's name, copyright notice, and social/contact links (LinkedIn, GitHub, email). The footer MUST use the secondary color (#0051d5) for link styling. The footer MUST have a `.no-print` class.

#### Scenario: Footer renders with contact links

- GIVEN the page is loaded
- WHEN the footer renders
- THEN it contains the person's name, copyright, and working links to LinkedIn, GitHub, and email

#### Scenario: Footer is hidden in print

- GIVEN print media is active
- WHEN the page renders for print
- THEN the footer is not visible

### Requirement: Content Structure

The page MUST contain the following sections in order: Navigation Bar, Hero (header), About Me, Education (timeline), Experience (timeline), Footer. The Hero MUST use `<header>` with `<h1>` for the name, a subtitle for the job title, a bio paragraph, and social/contact links with SVG icons using `fill="currentColor"`. The `<hr>` divider between header and content MUST be REMOVED. Education and Experience MUST use a timeline layout with a vertical decorative line, dot markers, and numbered bullet items. Each timeline item MUST be wrapped in a container positioned along the vertical line.
(Previously: Header with flex-column contact list + `<hr>` divider + standard `<ul>` lists)

#### Scenario: Full CV renders with new section order

- GIVEN a browser loads index.html
- WHEN the page renders
- THEN sections appear in order: Navbar, Hero, About Me, Education, Experience, Footer
- AND no `<hr>` element exists between header and content

#### Scenario: Education renders as timeline

- GIVEN the Education section
- WHEN it renders
- THEN items display along a vertical line with dot markers
- AND items use numbered bullets

#### Scenario: Experience renders as timeline

- GIVEN the Experience section
- WHEN it renders
- THEN articles display along a vertical line with dot markers
- AND achievements use numbered bullets

### Requirement: Visual Design Fidelity

The page MUST use the Stitch light-mode design tokens. Background MUST be `#f7f9fb`. Primary text MUST be `#000000`. Secondary/accent color MUST be `#0051d5`. On-surface text MUST be `#191c1e`, on-surface-variant MUST be `#45464d`. Fonts MUST be: Geist for headlines (weights 700, 600), Hanken Grotesk for body text (weight 400), JetBrains Mono for labels (weight 500). SVG icons MUST use `fill="currentColor"` instead of hardcoded fill colors. Border-radius MUST be `0.125rem` (2px).
(Previously: floralwhite background, #302f2f body, #e64d57 accents, Nunito font, hardcoded SVG fills)

#### Scenario: Colors match Stitch light-mode tokens

- GIVEN the rendered page
- WHEN styles are inspected
- THEN background is #f7f9fb, primary text is #000000, accent is #0051d5

#### Scenario: Fonts match Stitch font stack

- GIVEN the rendered page
- WHEN typography is inspected
- THEN headlines use Geist (700/600), body uses Hanken Grotesk (400), labels use JetBrains Mono (500)

#### Scenario: SVG icons use currentColor

- GIVEN the SVG icons in the page
- WHEN inspected
- THEN each icon uses `fill="currentColor"` with no hardcoded color values

### Requirement: Responsive Layout

The page MUST use a single-column layout with `max-w-[1100px]` centered via `mx-auto`. Horizontal margins MUST be `20px` on mobile and `24px` (gutter) on larger screens. Section gaps MUST be `8rem`. The page MUST set `min-height: 100%`.
(Previously: padding-based responsive layout with 50px/200px/400px breakpoints)

#### Scenario: Content width is capped and centered

- GIVEN viewport width ≥ 1100px
- WHEN the page renders
- THEN content area is max 1100px wide, centered

#### Scenario: Mobile margins apply below 768px

- GIVEN viewport width < 768px
- WHEN the page renders
- THEN horizontal margins are 20px

### Requirement: Performance Optimization

The page MUST include `<link rel="preconnect">` for all font CDNs (Google Fonts for Hanken Grotesk and JetBrains Mono; jsDelivr or Vercel CDN for Geist). Fonts MUST use `<link rel="preload" as="style">` followed by stylesheet links. The favicon MUST be preloaded. The page MUST NOT contain render-blocking `<script>` tags. Non-critical images MUST use `loading="lazy"` and `decoding="async"`.
(Previously: preconnect only for Google Fonts, Nunito font preloaded)

#### Scenario: Critical resources are preloaded

- GIVEN the HTML `<head>` source
- WHEN inspected
- THEN preconnect exists for all font CDNs
- AND Geist, Hanken Grotesk, and JetBrains Mono are loaded
- AND favicon is preloaded
- AND no render-blocking scripts exist

#### Scenario: Lazy-loaded images

- GIVEN images outside the initial viewport
- WHEN the page loads
- THEN those images have `loading="lazy"` and `decoding="async"`

### Requirement: SEO and Semantic HTML

The `<html>` element MUST have `lang="en"`. The page MUST use `<main>`, `<section>`, `<article>`, `<address>`, `<time>`. Heading hierarchy MUST be sequential (h1 → h3 → h4). The page MUST include: `<title>`, `<meta name="description">`, canonical URL, Open Graph (og:title, og:description, og:type, og:url), Twitter Card (twitter:card, twitter:title), and JSON-LD `<script type="application/ld+json">` with Schema.org `Person` (name, jobTitle, address, email, sameAs). All images MUST have alt text.

#### Scenario: Structured data is valid

- GIVEN the page source
- WHEN the JSON-LD block is parsed
- THEN it contains a valid Person schema with name, jobTitle, address, email, sameAs

#### Scenario: Heading hierarchy is sequential

- GIVEN the page structure
- WHEN headings are enumerated top-to-bottom
- THEN one h1 (name) exists
- AND h3s for section titles, h4s for sub-sections, no levels skipped

### Requirement: Accessibility

Links MUST have accessible text (visible text or aria-label). Color contrast MUST meet WCAG AA. The contact list MUST use `<ul>`/`<li>`. External links MUST include `rel="noopener noreferrer"`.

#### Scenario: Screen reader navigates contact info

- GIVEN the header contact list
- WHEN a screen reader processes it
- THEN each item has icon alt text AND visible link text
- AND LinkedIn and GitHub links have descriptive accessible names
