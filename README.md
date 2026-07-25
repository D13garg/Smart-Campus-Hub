# Orbit — Smart Campus Hub

A frontend-only Smart Campus SaaS dashboard: grades, attendance, canteen and library unified into one
customizable single-page application, organized as isolated, lazy-loaded feature modules (a
micro-frontend-inspired architecture without Module Federation). Built with React (Vite), Tailwind CSS,
Framer Motion, React Router, and Lucide icons — all data is realistic mock data, no backend.

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
  announcements, canteen orders, library, grade trends, achievements, study insights.
- **Customize (`/customize`)** — full widget control: **add**, **remove**, **resize** (S/M/L), and
  **drag-to-reorder**, with a live preview. Changes save instantly and persist across sessions.
- **Grades (`/grades`)** — CGPA ring, grade distribution, GPA trajectory chart, sortable subject table
  with sparkline trends.
- **Attendance (`/attendance`)** — attendance ring, weekly heatmap, per-subject bars, upcoming classes.
- **Canteen (`/canteen`)** — browsable menu with categories, live cart, order placement, order history.
- **Library (`/library`)** — issued books with renew action, return history, recommendations.
- **Profile (`/profile`)**, **Settings (`/settings`)**, **Search (`/search`)**,
  **Notifications (`/notifications`)** — supporting account, preference, search and inbox experiences.
- **Command palette** — press `Ctrl/Cmd + K` anywhere inside the app to search and jump to any module.
- **Dedicated mobile layout** — bottom tab bar navigation below the `lg` breakpoint, not a squeezed desktop.

## Architecture

```
src/
├── app/
│   └── App.jsx                 # composition root — routes + React.lazy per feature
├── platform/                   # the "shell": shared by every feature, owned by no single one
│   ├── components/
│   │   ├── layout/             # Sidebar, Navbar, MobileNav, CommandPalette, AppShell
│   │   ├── ui/                 # Button, GlassCard, Badge, PageHeader
│   │   ├── widgets/            # WidgetFrame (dashboard bento wrapper)
│   │   ├── charts/             # RadialProgress, Sparkline, BarRow
│   │   └── animations/         # AuroraBackground, AnimatedCounter
│   ├── hooks/                  # useTheme, useCommandPalette, usePersistedState
│   └── data/
│       └── campusData.js       # single source of mock data for every feature
├── features/                   # one isolated, independently-loadable module per route
│   ├── home/
│   ├── dashboard/              # Dashboard.jsx, widgetRegistry.jsx, useDashboardLayout.js
│   ├── customize/
│   ├── grades/
│   ├── attendance/
│   ├── canteen/
│   ├── library/
│   ├── profile/
│   ├── settings/
│   ├── search/
│   └── notifications/
│       # each feature exposes exactly one entry point:
│       └── index.js            # e.g. `export { default } from './Grades.jsx'`
├── main.jsx
└── index.css
```

**Feature isolation.** Every feature under `src/features/<name>/` only exposes what its `index.js`
re-exports — that's its public API, the same boundary an independently-owned micro-frontend would have.
Nothing outside a feature folder reaches into its internal files directly. The one place this matters in
practice: `Customize` needs the dashboard's layout state, so it imports `useDashboardLayout` from
`@features/dashboard` (its public entry point), never from `@features/dashboard/useDashboardLayout.js`
directly.

**Path aliases.** `@platform` and `@features` (configured in `vite.config.js`) resolve to `src/platform`
and `src/features`, so feature code never needs brittle `../../../` chains to reach shared UI or data.

**Lazy loading.** `src/app/App.jsx` loads every feature with `React.lazy(() => import('@features/x'))`.
Each feature is its own JS chunk — verify with `npm run build` and look at `dist/assets/`, where you'll
see a separate file per feature instead of one monolithic bundle. A feature's code only downloads when
its route is visited.

**Shared data layer.** All mock data lives in `src/platform/data/campusData.js`. In a real
micro-frontend setup this would be an API/service each module calls independently; here every feature
imports from this one file, mirroring that contract without needing an actual backend.

## Dashboard customization & persistence

The dashboard is fully data-driven, not hardcoded:

- **`src/features/dashboard/widgetRegistry.jsx`** — maps a widget id to its title, accent color, link,
  and rendered content. This is the catalog of everything that *can* appear on the dashboard.
- **`src/features/dashboard/useDashboardLayout.js`** — the ordered list of widgets *currently* on the
  dashboard (which ids, what size, what order), backed by `localStorage`
  (`orbit_dashboard_layout_v1`). `Dashboard.jsx` renders directly from this; `Customize.jsx` edits it via
  `addWidget`, `removeWidget`, `resizeWidget`, and `reorder`.

Everything that used to reset on refresh now persists to `localStorage` via a small reusable hook,
`usePersistedState` (`src/platform/hooks/usePersistedState.js`) — a drop-in replacement for `useState`
that reads/writes a given key:

| What | Storage key | Where |
|---|---|---|
| Dashboard widget layout (which, size, order) | `orbit_dashboard_layout_v1` | `useDashboardLayout.js` |
| Theme (dark/light) | `orbit_theme_v1` | `useTheme.js` |
| Accent color choice | `orbit_accent_color` | `Settings.jsx` |
| Reduce motion / high contrast toggles | `orbit_reduced_motion`, `orbit_high_contrast` | `Settings.jsx` |
| Canteen cart | `orbit_canteen_cart` | `Canteen.jsx` |
| Renewed library books | `orbit_library_renewed` | `Library.jsx` |
| Read notifications | `orbit_notifications_read_ids` | `Notifications.jsx` |

`useTheme` also broadcasts a same-tab custom event so its two independent instances (the Navbar in
`AppShell` and the toggle in `Settings`) stay in sync with each other, not just with `localStorage`.

## Known stubs / not fully wired

- **Accent color picker** — the choice now persists, but isn't wired to an actual CSS variable, so
  picking a color doesn't change the UI yet.
- **Reduce motion / high contrast toggles** — persist, but have no visual effect. There is a real
  `prefers-reduced-motion` media query in `index.css`, just not connected to this manual toggle.
- **No error boundary** — a render-time crash (e.g. an unmapped icon key) blackscreens the app with no
  recovery UI short of a refresh.
- **Sidebar "Exit to Home"** — a plain link to `/`, not a real logout.

## Backlog

From the original brief's "possible enhancements," not built: AI Campus Assistant, Campus Map,
Timetable, Assignments, Bookmarks, Widget Marketplace, Campus Insights, Activity Timeline. (Study
Insights, Achievements, and the Command Palette are implemented.)

## Deployment (Vercel)

This is a static Vite build with client-side routing, so `vercel.json` includes a catch-all rewrite to
`index.html` (otherwise a direct visit or refresh on e.g. `/dashboard` 404s). Framework preset: Vite;
build command: `npm run build`; output directory: `dist`.

## Design language

- **Palette** — ink navy background, indigo/violet primary, aurora teal + amber + rose module accents.
- **Type** — Space Grotesk (display), Inter (body), JetBrains Mono (data/numbers).
- **Signature element** — the "orbit rail" sidebar with an animated dashed ring around the logo, and an
  ambient aurora-mesh background that drifts behind every screen.