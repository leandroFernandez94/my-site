# Delta for static-cv-page

## MODIFIED Requirements

### Requirement: Navigation Bar

The page MUST include a fixed `<nav>` element at the top of the viewport with glassmorphism styling (semi-transparent background with backdrop-blur). The navbar MUST contain anchor links to each section (#about, #education, #experience) and a "Download Resume" button. The navbar MUST remain fixed during scroll and MUST NOT overlap or clip page content below. The navbar MUST NOT cause horizontal overflow on any viewport between 320px and 1100px wide. All navbar content (links, buttons) MUST remain visible and tap-accessible without requiring horizontal scrolling. The navbar MUST use `display: none` via a `.no-print` class for print media.

(Previously: navbar contained a "Download CV" button; label changed to "Download Resume")

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
- THEN all links and the Download Resume button are visible
- AND no horizontal scrollbar appears on the page
- AND all nav items remain tap-accessible (min 12px text)
