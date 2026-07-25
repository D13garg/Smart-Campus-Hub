// Public API of the dashboard feature. Anything outside this folder (e.g. the
// Customize feature) must import from here, never reach into the files above directly.
export { default, SIZE_CLASSES } from './Dashboard.jsx';
export { WIDGET_REGISTRY } from './widgetRegistry.jsx';
export { useDashboardLayout } from './useDashboardLayout.js';
