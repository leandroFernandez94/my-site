# Delta for Static CV Page

## MODIFIED Requirements

### Requirement: Navigation Bar

The page MUST include a fixed `<nav>` element at the top of the viewport with glassmorphism styling (semi-transparent background with backdrop-blur). The navbar MUST contain anchor links to each section (#about, #education, #experience) and a "Download CV" button. The navbar MUST remain fixed during scroll and MUST NOT overlap or clip page content below. The navbar MUST NOT cause horizontal overflow on any viewport between 320px and 1100px wide. All navbar content (links, buttons) MUST remain visible and tap-accessible without requiring horizontal scrolling. The navbar MUST use `display: none` via a `.no-print` class for print media.
(Previously: no explicit mobile overflow constraint — navbar overflowed viewports ≤430px causing horizontal scroll on iOS)

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

### Requirement: Content Structure

The page MUST contain the following sections in order: Navigation Bar, Hero (header), About Me, Education (timeline), Experience (timeline), Footer. The Hero MUST use `<header>` with `<h1>` for the name, a subtitle for the job title, a bio paragraph, and social/contact links with SVG icons using `fill="currentColor"`. The `<hr>` divider between header and content MUST be REMOVED. Education and Experience MUST use a timeline layout with a vertical decorative line, dot markers, and numbered bullet items. Each timeline item MUST be wrapped in a container positioned along the vertical line. Timeline content MUST use symmetric left and right padding (`pl-8 pr-8`) so the text column is visually balanced within the section. The vertical line and dot markers retain their existing position anchored to the left padding. 
(Previously: timeline had no right padding, causing visual imbalance with ~32px left-only padding from the vertical line)

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

#### Scenario: Timeline has symmetric horizontal padding

- GIVEN the page is loaded at viewport width 375px
- WHEN the Education or Experience timeline renders
- THEN the timeline `<ol>` has equal left and right padding
- AND the text column appears visually centered within the section

### Requirement: Responsive Layout

The page MUST use a single-column layout with `max-w-[1100px]` centered via `mx-auto`. Horizontal margins MUST be `20px` on mobile and `24px` (gutter) on larger screens. Section gaps MUST be `8rem`. The page MUST set `min-height: 100%`. The `<html>` and `<body>` elements MUST have `overflow-x: hidden` to prevent accidental horizontal scroll from any element exceeding the viewport.
(Previously: no overflow-x guard — overflowing fixed elements caused horizontal scrollbar on iOS)

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
