# Orbit — Smart Campus Hub

A frontend-only Smart Campus SaaS dashboard: grades, attendance, canteen and library unified into one
customizable, micro-frontend-styled single-page application. Built with React (Vite), Tailwind CSS,
Framer Motion, React Router, and Lucide icons — all data is realistic mock data.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## What's inside

- **Landing (`/`)** — cinematic hero, module strip, feature grid, floating animated dashboard preview.
- **Dashboard (`/dashboard`)** — bento-grid of live widgets: CGPA, attendance ring, today's agenda,
  announcements, canteen orders, library, grade trends, achievements.
- **Grades (`/grades`)** — CGPA ring, grade distribution, GPA trajectory chart, sortable subject table
  with sparkline trends.
- **Attendance (`/attendance`)** — attendance ring, weekly heatmap, per-subject bars, upcoming classes.
- **Canteen (`/canteen`)** — browsable menu with categories, live cart, order placement, order history.
- **Library (`/library`)** — issued books with renew action, return history, recommendations.
- **Customize (`/customize`)** — drag-to-reorder + toggle widgets with a live preview (fulfils the
  "customizable dashboard widgets" requirement).
- **Profile (`/profile`)**, **Settings (`/settings`)**, **Search (`/search`)**,
  **Notifications (`/notifications`)** — supporting account, preference, search and inbox experiences.
- **Command palette** — press `Ctrl/Cmd + K` anywhere inside the app to search and jump to any module.
- **Dedicated mobile layout** — bottom tab bar navigation below the `lg` breakpoint, not a squeezed desktop.

## Architecture

```
src/
├── mock/campusData.js         # single source of mock data for every module
├── components/
│   ├── layout/                # Sidebar, Navbar, MobileNav, CommandPalette, AppShell
│   ├── ui/                    # Button, GlassCard, Badge, PageHeader
│   ├── widgets/                # WidgetFrame (dashboard bento wrapper)
│   ├── charts/                 # RadialProgress, Sparkline, BarRow
│   └── animations/             # AuroraBackground, AnimatedCounter
├── hooks/                      # useTheme, useCommandPalette
├── pages/                      # one file per route
└── App.jsx                     # router
```

Each page is self-contained and pulls only from the shared mock data module, mirroring how independent
micro-frontend modules would consume a shared data layer in production.

## Design language

- **Palette** — ink navy background, indigo/violet primary, aurora teal + amber + rose module accents.
- **Type** — Space Grotesk (display), Inter (body), JetBrains Mono (data/numbers).
- **Signature element** — the "orbit rail" sidebar with an animated dashed ring around the logo, and an
  ambient aurora-mesh background that drifts behind every screen.
