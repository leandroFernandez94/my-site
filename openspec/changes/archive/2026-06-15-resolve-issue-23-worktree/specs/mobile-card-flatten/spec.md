# Delta: Mobile Card Flattening (<768px)

## MODIFIED Requirements

### Requirement: Experience Card Layout

The Experience section MUST use `.experience-card` class for each employment
entry. Each card MUST contain: company name (`<h3>`), role (`<h4>`), period
with `<time>` elements, and accomplishment items.

At viewport widths **≥768px**, cards MUST use border (`border-outline-variant/40`),
rounded corners (`rounded-lg`), and subtle shadow (`shadow-sm`).

At viewport widths **<768px**, cards MUST flatten: computed `border-width` 0,
`border-radius` 0, `box-shadow` none, and `padding` 0 — so mobile content renders
with no card chrome. The flatten rule MUST take precedence over Tailwind CDN
utilities.

The current role MUST be marked with `.timeline-item-accent` class on its parent
timeline item (blue dot indicator instead of gray). Multiple positions within the
same company MUST be grouped in a single card with sub-sections separated by a
top border (`border-t`).
(Previously: cards mandated border/rounded/shadow unconditionally; no mobile-flatten behavior defined)

#### Scenario: Experience card renders with chrome on desktop

- GIVEN an experience entry at viewport width 1024px (≥768px)
- WHEN it renders
- THEN the card displays company name, role, period, and items
- AND computed border-width is greater than 0
- AND computed border-radius is greater than 0
- AND computed box-shadow is not none
- AND computed padding is greater than 0

#### Scenario: Experience card flattens on mobile

- GIVEN an experience entry at viewport width 375px (<768px)
- WHEN the card renders after Tailwind CDN injection
- THEN computed border-width is 0
- AND computed border-radius is 0
- AND computed box-shadow is none
- AND computed padding is 0

#### Scenario: Mobile flatten survives Tailwind CDN overrides

- GIVEN the page is loaded at viewport width 375px
- WHEN Tailwind CDN injects its utility styles
- THEN the `.experience-card` flatten values still apply
- AND no border, shadow, rounded corner, or padding is visible

#### Scenario: Card chrome returns at breakpoint boundary

- GIVEN an experience entry
- WHEN the viewport is resized from 375px to exactly 768px
- THEN the card regains border, rounded corners, shadow, and padding

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
