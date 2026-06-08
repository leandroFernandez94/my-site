# Print Stylesheet Specification

## Purpose

`@media print` rules that optimize the CV page for paper or PDF export. Included in the same `index.html` via a `<style>` block.

## Requirements

### Requirement: Page Margins and Layout

The stylesheet MUST define `@page` with margins suitable for A4/Letter paper (approximately 2cm). The body background (`floralwhite`) MUST be replaced with `white` in print. Responsive horizontal padding MUST be removed in favor of consistent print margins. Content MUST NOT overflow page boundaries horizontally.

#### Scenario: Print preview on A4

- GIVEN the page is loaded
- WHEN the user opens print preview (Ctrl+P)
- THEN @page margins are applied (approximately 2cm)
- AND floralwhite background is replaced with white
- AND responsive padding does not cause overflow

### Requirement: URL Expansion on Links

All `<a>` elements with an `href` attribute MUST display the URL after the link text using `::after` pseudo-element, wrapped in parentheses. This MUST NOT apply to `mailto:` links (to avoid duplicating the already-visible email address). The URL text SHOULD be sized smaller than body text.

#### Scenario: External links show URLs in print

- GIVEN the page contains links (LinkedIn, GitHub, UTN, employers)
- WHEN print media is active
- THEN each external link shows its URL in parentheses after the text

#### Scenario: Email link is not duplicated

- GIVEN the email contact line displays "leandroofernandezz@gmail.com"
- WHEN print media is active
- THEN the mailto: URL is NOT appended after the email text

### Requirement: Print Typography

Body text color MUST be `#000` for print readability. Section titles (originally `#e64d57`) SHOULD be rendered as `#000` or a dark gray to ensure readability on grayscale printers. Links SHOULD retain a visual distinction (e.g., dark color, underline).

#### Scenario: Text is readable in grayscale

- GIVEN print media is active
- WHEN the page renders for print
- THEN body text is #000
- AND section titles are distinguishable from body text via size/weight

### Requirement: Print-Optimized Elements

The `<hr>` separator MUST be styled for print (thin, dark). SVG icons SHOULD remain visible at their current size. The page MUST NOT produce orphaned section titles at the bottom of a page (`page-break-after: avoid` on headings). Large sections SHOULD avoid awkward breaks (`page-break-inside: avoid` where feasible).

#### Scenario: Section titles stay with content

- GIVEN a multi-page printout
- WHEN content flows across pages
- THEN no section title appears alone at the bottom of a page
