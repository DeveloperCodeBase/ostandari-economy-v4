# Glassy CRM — Liquid Glass Dashboard 1.1

Five reference-inspired CRM views with a liquid glass finish and animated sidebar, built with HTML, CSS, JavaScript, and SVG. English and Persian interfaces include mirrored RTL layout.

Use the sun/moon button in the top toolbar to switch between light and dark mode. Settings also includes both modes and two flowing SVG backgrounds, each with a matching light palette. The first visit follows the device theme; an explicit choice persists in this browser. Existing demo data and preferences are preserved on upgrade.

The material combines translucent surfaces, backdrop blur, specular borders, subtle moving light, and a pointer-following reflection. Reduced-motion preferences disable ambient movement and the pointer effect. Solid surface fallbacks remain available without backdrop-filter support.

Layouts adapt to the available content width as the sidebar opens and closes. Phones use a two-row toolbar, a slide-out drawer, wrapped controls, and stacked cards. The CSS supports widths down to 320px, both LTR and RTL. The design includes fallbacks for engines without container queries.

**Open `dist/Glassy-Dashboard.html` directly in a browser.** It embeds all scripts, styles, and images. Alternatively, run `npm start` with Node.js 18+ and open `http://localhost:4173`. No dependency installation is needed to run the application.

See [README.fa.md](README.fa.md) for the complete Persian guide.

## Development

```bash
npm start
npm run check
npm run build
```

Edit the modular source in `dist/index.html`, `dist/styles.css`, `dist/liquid-glass.css`, `dist/liquid-responsive.css`, `dist/data.js`, `dist/charts.js`, and `dist/app.js`. Theme colors and material tokens are in `liquid-glass.css`; responsive rules are in `liquid-responsive.css`. Rebuild the standalone HTML after edits.

## Tests

```bash
npm install
npm test
npm run test:standalone
npm run test:themes
```

jsdom is a test-only development dependency. The app has no runtime dependencies or external network requests.

## Scope

This is an interactive frontend demonstration. Orders, integrations, rewards, accounting and compliance figures are sample data. Drafts and preferences stay in this browser. No CRM, payment, identity, email or messaging service is contacted. The locally generated PDF uses English text.

Verification covers 11 existing interaction groups, 12 theme/standalone groups, source syntax, standalone packaging, and the existing PDF generation behavior. The theme suite includes persistence, system defaults, legacy-data migration, all five views, settings, RTL, resize and drawer semantics, and direct file opening. Zero JavaScript runtime errors or app network calls were observed. Real-browser visual QA was unavailable; pixel-level comparison and device rendering are not claimed. See `VALIDATION.json` for the recorded checks.
