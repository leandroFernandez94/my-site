# Static CV Page Specification

## Purpose

Single-file HTML resume/CV. Vanilla HTML + CSS, no JavaScript frameworks. Uses a static content template system (content.json + build-time replacement) with Tailwind CSS via CDN. Built with Node.js scripts for development and deployment to Cloudflare Pages.

## Requirements

### Requirement: Navigation Bar

The page MUST include a fixed `<nav>` element at the top of the viewport with glassmorphism styling (semi-transparent background with backdrop-blur). The navbar MUST contain anchor links to each section (#about, #education, #experience) and a "Download CV" button. The navbar MUST remain fixed during scroll and MUST NOT overlap or clip page content below. The navbar MUST NOT cause horizontal overflow on any viewport between 320px and 1100px wide. All navbar content (links, buttons) MUST remain visible and tap-accessible without requiring horizontal scrolling. The navbar MUST use `display: none` via a `.no-print` class for print media.

#### Scenario: Navbar links navigate to sections

- GIVEN the page is loaded
- WHEN the user clicks a section link in the navbar
- THEN the viewport scrolls to the corresponding section

#### Scenario: Navbar is hidden in print

- GIVEN print media is active
- WHEN the page renders for print
- THEN the navbar is not visible

#### Scenario: Navbar fits without horizontal scroll at 320px

- GIVEN the page is loaded at viewport width 320px
- WHEN the navbar renders
- THEN all links and the Download CV button are visible
- AND no horizontal scrollbar appears on the page
- AND all nav items remain tap-accessible (min 12px text)

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

The page MUST contain the following sections in order: Navigation Bar, Header, About Me, Education (timeline), Experience (card layout), Footer. The Header MUST use `<header>` with `<h1>` for the name, a subtitle for the job title, an address with location and contact links (LinkedIn, GitHub, email), and SVG icons using `fill="currentColor"`. The `<hr>` divider between header and content MUST be REMOVED. Education MUST use a timeline layout with a vertical decorative line, dot markers, and items. Experience MUST use a card layout within timeline item containers (`.experience-card` class) with company name, role, period, and accomplishment items. Each timeline item MUST be wrapped in a container positioned along the vertical line. Timeline content MUST use symmetric left and right padding (`pl-8 pr-8`) so the text column is visually balanced within the section. The vertical line and dot markers retain their existing position anchored to the left padding.

#### Scenario: Full CV renders with correct section order

- GIVEN a browser loads index.html
- WHEN the page renders
- THEN sections appear in order: Navbar, Header, About Me, Education, Experience, Footer
- AND no `<hr>` element exists between header and content

#### Scenario: Education renders as timeline

- GIVEN the Education section
- WHEN it renders
- THEN items display along a vertical line with dot markers
- AND items use numbered bullets

#### Scenario: Experience renders as cards within timeline

- GIVEN the Experience section
- WHEN it renders
- THEN articles display within `.experience-card` containers along a vertical timeline
- AND each card contains company name, role, period, and accomplishment items
- AND the current role is highlighted with `.timeline-item-accent` class

#### Scenario: Timeline has symmetric horizontal padding

- GIVEN the page is loaded at viewport width 375px
- WHEN the Education or Experience timeline renders
- THEN the timeline `<ol>` has equal left and right padding
- AND the text column appears visually centered within the section

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

The page MUST use a single-column layout with `max-w-[1100px]` centered via `mx-auto`. Horizontal margins MUST be `20px` on mobile and `24px` (gutter) on larger screens. Section gaps MUST be `8rem`. The page MUST set `min-height: 100%`. The `<html>` and `<body>` elements MUST have `overflow-x: hidden` to prevent accidental horizontal scroll from any element exceeding the viewport.

#### Scenario: Content width is capped and centered

- GIVEN viewport width ≥ 1100px
- WHEN the page renders
- THEN content area is max 1100px wide, centered

#### Scenario: Mobile margins apply below 768px

- GIVEN viewport width < 768px
- WHEN the page renders
- THEN horizontal margins are 20px

#### Scenario: No horizontal scrollbar on any viewport

- GIVEN viewport width between 320px and 1100px
- WHEN the page renders and is fully scrolled
- THEN no horizontal scrollbar appears
- AND `html` and `body` computed styles include `overflow-x: hidden`

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

### Requirement: Content Template System

The page MUST use a static content template system where all text, links, and metadata live in `content.json`. The HTML MUST use `{{key.subkey}}` placeholder syntax. A Node.js script (`scripts/replace.js`) MUST perform build-time template replacement: find all placeholders, resolve values from `content.json` using dot notation, and replace them in the HTML. The build output MUST be written to `dist/index.html`. There MUST be no runtime template processing in the browser.

#### Scenario: Content is sourced from JSON

- GIVEN the page source
- WHEN `content.json` is inspected
- THEN all text, links, and metadata values are defined in JSON
- AND the HTML contains only `{{placeholder}}` syntax, no hardcoded text

#### Scenario: Build replaces all placeholders

- GIVEN the build script is run (`npm run build`)
- WHEN `dist/index.html` is generated
- THEN no `{{placeholder}}` strings remain in the output
- AND all content matches the corresponding `content.json` values

#### Scenario: No runtime template overhead

- GIVEN the page is loaded in a browser
- WHEN the HTML is inspected
- THEN no template replacement logic executes in the browser
- AND the page renders with pre-computed static content

### Requirement: Experience Card Layout

The Experience section MUST use `.experience-card` class for each employment entry. Each card MUST contain: company name (`<h3>`), role (`<h4>`), period with `<time>` elements, and accomplishment items. Cards MUST use border (`border-outline-variant/40`), rounded corners (`rounded-lg`), and subtle shadow (`shadow-sm`). The current role MUST be marked with `.timeline-item-accent` class on its parent timeline item (blue dot indicator instead of gray). Multiple positions within the same company MUST be grouped in a single card with sub-sections separated by a top border (`border-t`).

#### Scenario: Experience card renders with all fields

- GIVEN an experience entry
- WHEN it renders
- THEN the card displays company name, role, period, and items
- AND the card has border, rounded corners, and shadow

#### Scenario: Current role is highlighted

- GIVEN the AXA Partners entry (current role)
- WHEN it renders in the timeline
- THEN its parent `.timeline-item` has the `.timeline-item-accent` class
- AND the timeline dot marker is rendered in the accent color (#0051d5)

#### Scenario: Multiple positions within same company

- GIVEN the Devborn entry with multiple positions
- WHEN it renders
- THEN a single card contains both positions
- AND positions are separated by a top border (`border-t`)

### Requirement: Build and Development Workflow

The project MUST provide a Node.js-based build and development workflow. `npm run build` MUST generate `dist/index.html` from `index.html` and `content.json`. `npm run watch` MUST monitor changes to `index.html` and `content.json` and re-run the build on change. `npm run start` MUST start a development server with hot-reload and file watching. The build output directory MUST be `dist/` and MUST be served by Cloudflare Pages.

#### Scenario: Build generates static output

- GIVEN the project is cloned
- WHEN `npm run build` is executed
- THEN `dist/index.html` is created with all placeholders replaced

#### Scenario: Watch mode rebuilds on changes

- GIVEN `npm run watch` is running
- WHEN `index.html` or `content.json` is modified
- THEN the build script re-runs automatically
- AND `dist/index.html` is updated

#### Scenario: Dev server serves with hot reload

- GIVEN `npm run start` is running
- WHEN `index.html` or `content.json` is modified
- THEN the browser reloads automatically
- AND the server responds at `http://localhost:3000`
