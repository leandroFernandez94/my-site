# Design: stitch-light-redesign

## Technical Approach
Transform the single-file CV to align with the "Stitch Light" design system. This involves updating the Tailwind CDN configuration with new custom tokens (colors, spacing, typography) and restructuring the DOM into a glassmorphism navbar, a hero section, and CSS-only timeline sections for experience and education. 

## Architecture Decisions

### Decision: Tailwind Configuration
**Choice**: Embed design tokens directly in the `<script>` tag configuration for the Tailwind CDN.
**Alternatives considered**: Loading a separate Tailwind config file or switching to a build step (Vite/PostCSS).
**Rationale**: Maintains the single-file constraint of the project while supporting complex token hierarchies (colors, spacing, fonts).

### Decision: Timeline Implementation
**Choice**: CSS-only timelines using Tailwind pseudo-classes (`relative`, `border-l`, `before:absolute`, `before:content-['']`, `before:w-3`, `before:h-3`, `before:rounded-full`, `before:-left-[7px]`).
**Alternatives considered**: Using absolute positioned SVG elements or JavaScript for layout calculations.
**Rationale**: Cleanest approach that doesn't bloat the DOM or rely on external SVGs/JS.

### Decision: Glassmorphism Navbar
**Choice**: Use `backdrop-blur-md` and `bg-surface/80` for the navbar.
**Alternatives considered**: Solid background or standard CSS blur filters.
**Rationale**: Native Tailwind utilities allow for quick, responsive glassmorphism without writing custom CSS.

### Decision: SVG Icon Strategy
**Choice**: Inline SVGs where appropriate with `currentColor` for contact/social links, while utilizing the Material Symbols Outlined font for standard UI icons (like navbar links).
**Alternatives considered**: External image tags `<img>` (current approach).
**Rationale**: Inline SVGs allow for hover state color changes seamlessly using Tailwind text color utilities, unlike `<img>` tags.

### Decision: Print Stylesheet
**Choice**: Retain native `<style media="print">` block to override variables, disable the navbar, and adjust page margins.
**Alternatives considered**: Using Tailwind's `print:` modifier on every element.
**Rationale**: A dedicated media query in `<style>` is much simpler for global print resets (like hiding `.no-print`, resetting backgrounds) than cluttering HTML with `print:` classes everywhere.

## Data Flow

    [ Static HTML File ] ─── loads ───→ [ Tailwind CDN & Google Fonts ]
           │                                      │
           └──────── renders ─────────────────────┘
                 (Browser Engine)

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Modify | Update tailwind configuration, replace fonts, rebuild layout using new design tokens, implement CSS timelines, and adjust print stylesheet. |

## Interfaces / Contracts

### Tailwind Config Structure
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        background: '#f7f9fb',
        surface: '#f7f9fb',
        'surface-container-low': '#f2f4f6',
        'surface-container': '#eceef0',
        'surface-container-high': '#e6e8ea',
        'surface-container-highest': '#e0e3e5',
        primary: '#000000',
        secondary: '#0051d5',
        'on-surface': '#191c1e',
        'on-surface-variant': '#45464d',
        'outline-variant': '#c6c6cd',
      },
      fontFamily: {
        'headline-lg': ['Geist', 'sans-serif'],
        'headline-xl': ['Geist', 'sans-serif'],
        'headline-lg-mobile': ['Geist', 'sans-serif'],
        'body-lg': ['Hanken Grotesk', 'sans-serif'],
        'body-md': ['Hanken Grotesk', 'sans-serif'],
        'label-md': ['JetBrains Mono', 'monospace'],
        'code-sm': ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        'container-max': '1100px',
        'section-gap': '8rem',
        'element-gap': '1.5rem',
        gutter: '24px',
        'margin-mobile': '20px',
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem',
      }
    }
  }
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | N/A | No JS logic to test. |
| E2E / Visual | Mobile Responsiveness | Manual check on typical breakpoints (mobile, tablet, desktop). |
| E2E / Visual | Print Layout | Check browser Print Preview ensuring page breaks don't split articles, colors reset to black/white. |
| E2E / Visual | Timeline Structure | Verify pseudo-elements render the vertical line and dots correctly on all zoom levels. |

## Migration / Rollout

No migration required. This is a purely aesthetic rewrite of a static HTML file.

## Open Questions

- None.
