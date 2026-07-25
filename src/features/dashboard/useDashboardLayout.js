import { useCallback, useEffect, useState } from 'react';
import { widgetCatalog } from '@platform/data/campusData.js';

const STORAGE_KEY = 'orbit_dashboard_layout_v1';
const VALID_SIZES = ['sm', 'md', 'lg'];

// The layout is just an ordered array of { id, size }. Order in the array IS the
// render order (drag-to-reorder just reorders this array). A widget only appears
// on the Dashboard if its id is present here — that's what "add/remove" means.
function defaultLayout() {
  return widgetCatalog
    .filter((w) => w.enabled)
    .map((w) => ({ id: w.id, size: w.defaultSize || 'sm' }));
}

function loadLayout() {
  if (typeof window === 'undefined') return defaultLayout();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultLayout();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultLayout();

    const catalogIds = new Set(widgetCatalog.map((w) => w.id));
    const cleaned = parsed
      .filter((w) => w && catalogIds.has(w.id))
      .map((w) => ({ id: w.id, size: VALID_SIZES.includes(w.size) ? w.size : 'sm' }));

    // Nothing valid survived (e.g. corrupted storage) — fall back to defaults
    // rather than showing an empty dashboard.
    return cleaned.length ? cleaned : defaultLayout();
  } catch {
    return defaultLayout();
  }
}

export function useDashboardLayout() {
  const [layout, setLayout] = useState(loadLayout);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    } catch {
      // Storage can fail (private browsing, quota, etc.) — layout still works
      // for the current session, it just won't persist.
    }
  }, [layout]);

  const addWidget = useCallback((id) => {
    setLayout((cur) => {
      if (cur.some((w) => w.id === id)) return cur;
      const entry = widgetCatalog.find((w) => w.id === id);
      return [...cur, { id, size: entry?.defaultSize || 'sm' }];
    });
  }, []);

  const removeWidget = useCallback((id) => {
    setLayout((cur) => cur.filter((w) => w.id !== id));
  }, []);

  const resizeWidget = useCallback((id, size) => {
    if (!VALID_SIZES.includes(size)) return;
    setLayout((cur) => cur.map((w) => (w.id === id ? { ...w, size } : w)));
  }, []);

  const reorder = useCallback((nextLayout) => setLayout(nextLayout), []);

  const resetLayout = useCallback(() => setLayout(defaultLayout()), []);

  const availableWidgets = widgetCatalog.filter((w) => !layout.some((l) => l.id === w.id));

  return { layout, reorder, addWidget, removeWidget, resizeWidget, resetLayout, availableWidgets };
}
