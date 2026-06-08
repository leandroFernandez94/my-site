# Static CV Page Specification

## Purpose

Single-file HTML resume/CV. Vanilla HTML + CSS, no frameworks, no build step, no JavaScript. Visually matches the current Next.js page with added performance and SEO optimizations.

## Requirements

### Requirement: Content Structure

The page MUST contain four sections in order: Header, About Me, Education, Experience. The Header MUST use `<header>` with `<h1>` for the name and `<address>` with contact items (location, email, LinkedIn, GitHub). Each item MUST include a 20×20px SVG icon with alt text. An `<hr>` MUST separate the header from About Me.

#### Scenario: Full CV renders with all sections

- GIVEN a browser loads index.html
- WHEN the page renders
- THEN sections appear in order: Header, About Me, Education, Experience
- AND the header contains name, location, email, LinkedIn, GitHub
- AND an `<hr>` separates header from content

### Requirement: Visual Design Fidelity

The page MUST match current visual design: background `floralwhite`, body text `#302f2f` with 22px line-height, section titles `#e64d57`, links `darkred` with no text-decoration, Nunito font (weights 300, 400, 600). Contact items MUST use flex column layout with `0.25em` gap, no list-style, `16px` font-size, `1em` left padding. Icon-text pairs MUST use flex row with `0.5em` gap.

#### Scenario: Colors and typography match source

- GIVEN the rendered page
- WHEN styles are inspected
- THEN background is floralwhite, body is #302f2f, section titles are #e64d57, links are darkred

#### Scenario: Contact list layout matches source

- GIVEN the header contact list
- WHEN the layout renders
- THEN items stack vertically with 0.25em gap, no bullets, icons inline with text

### Requirement: Responsive Layout

The page MUST use single-column layout with responsive horizontal padding: 50px below 1024px, 200px at ≥1024px, 400px at ≥1920px. Vertical padding MUST be 2em. The page MUST set `min-height: 100%`.

#### Scenario: Padding adjusts at breakpoints

- GIVEN viewport width < 1024px
- WHEN the page renders
- THEN horizontal padding is 50px
- AND at ≥1024px it becomes 200px
- AND at ≥1920px it becomes 400px

### Requirement: Performance Optimization

The page MUST include `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com`. The Nunito font MUST use `<link rel="preload" as="style">` followed by the stylesheet link. The favicon MUST be preloaded. The page MUST NOT contain render-blocking `<script>` tags. Non-critical images MUST use `loading="lazy"` and `decoding="async"`.

#### Scenario: Critical resources are preloaded

- GIVEN the HTML `<head>` source
- WHEN inspected
- THEN preconnect exists for both Google Fonts origins
- AND Nunito font and favicon are preloaded
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
