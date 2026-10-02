# Unloop site

Marketing site for Unloop, built with [Astro](https://astro.build).

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
```

## Structure

- `src/pages/index.astro` assembles the page from sections in `src/components/`.
- `src/layouts/Layout.astro` holds the `<head>`, meta tags, JSON-LD, and shared SVG gradients.
- `src/styles/global.css` is the full stylesheet (light/dark theme tokens on `:root`).
- `src/scripts/main.js` drives the interactive bits: the companion orbs, the phone demo, the loop toggle, and the companion state picker.
