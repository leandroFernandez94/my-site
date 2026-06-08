# Delta for Print Stylesheet

## ADDED Requirements

None. All changes are modifications to existing print behavior.

## MODIFIED Requirements

### Requirement: Page Margins and Layout

The stylesheet MUST define `@page` with margins suitable for A4/Letter paper (approximately 2cm). The body background (`#f7f9fb`) MUST be replaced with `white` in print. The navbar and footer MUST be hidden via `display: none !important` using the `.no-print` class. Responsive horizontal padding and max-width constraints MUST be removed in favor of consistent print margins. Content MUST NOT overflow page boundaries horizontally.
(Previously: floralwhite background replaced with white, no navbar/footer to hide)

#### Scenario: Print preview on A4

- GIVEN the page is loaded
- WHEN the user opens print preview (Ctrl+P)
- THEN @page margins are applied (approximately 2cm)
- AND #f7f9fb background is replaced with white
- AND navbar and footer are hidden
- AND responsive padding does not cause overflow

### Requirement: Print Typography

Body text color MUST be `#000` for print readability. Section titles SHOULD be rendered as `#000` or a dark gray to ensure readability on grayscale printers. Links SHOULD retain a visual distinction (e.g., dark color, underline). Timeline decorative elements (vertical lines, dot markers) SHOULD be simplified — the vertical line MAY be hidden and dots MAY be replaced with simple bullet markers.
(Previously: section titles were originally #e64d57, rendered as #000 for print)

#### Scenario: Text is readable in grayscale

- GIVEN print media is active
- WHEN the page renders for print
- THEN body text is #000
- AND section titles are distinguishable from body text via size/weight

#### Scenario: Timeline decorations are simplified

- GIVEN print media is active
- WHEN the Education or Experience timeline renders
- THEN decorative vertical lines and dots are simplified or hidden
- AND content remains readable without visual clutter

### Requirement: Print-Optimized Elements

SVG icons SHOULD remain visible at their current size. The page MUST NOT produce orphaned section titles at the bottom of a page (`page-break-after: avoid` on headings). Large sections SHOULD avoid awkward breaks (`page-break-inside: avoid` where feasible). The `.no-print` class MUST hide the navbar, footer, and any non-essential decorative elements. Glassmorphism effects (backdrop-blur, semi-transparent backgrounds) MUST be neutralized in print.
(Previously: `<hr>` separator styled for print, no glassmorphism elements to handle)

#### Scenario: Section titles stay with content

- GIVEN a multi-page printout
- WHEN content flows across pages
- THEN no section title appears alone at the bottom of a page

#### Scenario: Glassmorphism neutralized in print

- GIVEN print media is active
- WHEN the navbar would normally render
- THEN backdrop-blur and semi-transparent backgrounds are removed
- AND the navbar is fully hidden

## REMOVED Requirements

None.
