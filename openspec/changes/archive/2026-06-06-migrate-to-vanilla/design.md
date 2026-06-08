# Design: Migrate to Vanilla HTML + Tailwind

## Technical Approach

We will replace the entire Next.js + React + SCSS architecture with a single, static `index.html` file using Tailwind CSS via CDN. This drastically reduces complexity while maintaining the original visual design. All Next.js and React configuration, component files, hooks, and build tooling will be deleted. The HTML will use semantic tags and include print-specific media queries in a `<style>` block.

## Architecture Decisions

### Decision: File Structure

**Choice**: Single `index.html` at the project root and a `/public` folder for static assets (icons).
**Alternatives considered**: Static site generator (Eleventy, Astro), Vite with HTML plugin.
**Rationale**: The site consists of only one page. Any build tool introduces overhead, dependencies, and configuration. A single HTML file is the simplest, most performant, and easiest to maintain.

### Decision: Tailwind CSS Integration

**Choice**: Use Tailwind CDN (`<script src="https://cdn.tailwindcss.com"></script>`) with inline configuration for custom colors.
**Alternatives considered**: Standalone Tailwind CLI, vanilla CSS, inline styles.
**Rationale**: Tailwind via CDN avoids adding a build step or `node_modules` while still providing rapid, utility-based styling. The custom colors (floralwhite, #e64d57, etc.) can be easily mapped in the script config without needing a `tailwind.config.js` file.

### Decision: Responsive Padding Strategy

**Choice**: Use Tailwind's spacing scale and responsive prefixes (e.g., `px-4 md:px-16 lg:px-32 xl:px-64`) instead of exact pixel breakpoints (50px / 200px / 400px).
**Alternatives considered**: Custom CSS media queries matching the exact old breakpoints.
**Rationale**: The user explicitly relaxed the exact padding requirement. Utilizing Tailwind's native breakpoints is more idiomatic and easier to maintain.

### Decision: Print Stylesheet Implementation

**Choice**: An inline `<style>` block using `@media print` inside `index.html`.
**Alternatives considered**: Separate `print.css` linked via `<link rel="stylesheet" media="print">`.
**Rationale**: Keeps the project strictly single-file for markup and styles, avoiding an extra HTTP request and ensuring the print styles are directly coupled to the markup.

## Component Tree / HTML Structure

The structure maps the old React components directly into semantic HTML5:

```html
<html>
  <head>
    <!-- SEO tags, JSON-LD, Preload, Tailwind CDN -->
  </head>
  <body class="bg-cvbg text-cvtext font-sans ...">
    <header>
      <h1>Name</h1>
      <address>
        <ul>
          <!-- Contact List (flex col) -->
          <li><img><a>Location</a></li>
          <!-- ... -->
        </ul>
      </address>
    </header>
    <hr class="border-cvred">
    <main>
      <section id="about">
        <h3>About Me</h3>
        <p>...</p>
      </section>
      <section id="education">
        <h3>Education</h3>
        <article>...</article>
      </section>
      <section id="experience">
        <h3>Experience</h3>
        <article>...</article>
      </section>
    </main>
  </body>
</html>
```

## CSS Architecture

The Tailwind CDN `<script>` will include this configuration:
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        cvbg: 'floralwhite',
        cvtext: '#302f2f',
        cvred: '#e64d57',
        cvlink: 'darkred'
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif']
      }
    }
  }
}
```

The print stylesheet (`<style>` in `<head>`) will handle:
- `@page { margin: 2cm; }`
- Resetting background to white and text to `#000`.
- Extracting URLs using `a[href]:not([href^="mailto:"])::after { content: " (" attr(href) ")"; }`.
- Avoiding page breaks after headings (`h1, h3, h4`) and inside `<article>`.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Create | The new, self-contained CV. |
| `pages/*` | Delete | All Next.js pages (index, _app, _document, landing, api). |
| `components/*` | Delete | React components. |
| `hooks/*` | Delete | Custom React hooks. |
| `styles/*` | Delete | SCSS/CSS modules. |
| `package.json`, `yarn.lock`, `node_modules/` | Delete | Remove all NPM dependencies. |
| `next.config.js`, `tsconfig.json`, `next-env.d.ts`, `.eslintrc.json`, `opencode.json` | Delete | Remove all configuration files. |
| `public/*.svg` / `*.png` | Modify | Keep only CV-related icons (favicon, email, github, linkedin, location). Delete landing page assets. |

## Performance Strategy

- **Fonts**: Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`. Preload the Nunito stylesheet (`<link rel="preload" as="style" href="...">`).
- **Icons/Images**: Preload `favicon.ico`. Add `loading="lazy"` and `decoding="async"` to non-critical images outside the initial viewport (if any exist beyond the header).
- **Scripts**: Only Tailwind CDN is used. No other JS will execute.

## SEO Structure

- **Meta Tags**: `<title>`, `<meta name="description">`, `<link rel="canonical">`.
- **Open Graph / Twitter**: `og:title`, `og:description`, `og:type`, `og:url`, `twitter:card`.
- **Structured Data**: Application/LD+JSON block for Schema.org `Person` containing name, jobTitle, address, email, and sameAs (LinkedIn, GitHub).

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit/Validation | HTML validity | W3C Validator |
| E2E / Visual | Layout matching | Manual comparison with existing Next.js `index` page on desktop and mobile. |
| E2E / Visual | Print layout | Print Preview (Ctrl+P) in Chrome/Firefox to verify margins, URL expansion, and colors. |

## Migration / Rollout

No migration required. The change replaces the app entirely. Vercel deployment will need its framework preset changed from "Next.js" to "Other" (Static) and output directory to root.

## Open Questions

- [ ] Does Vercel need a `vercel.json` to properly serve `index.html` from the root, or does it auto-detect static files correctly with the "Other" framework preset? (Assuming auto-detect works).
