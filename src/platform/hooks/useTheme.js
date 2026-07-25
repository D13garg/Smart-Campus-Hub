import { useEffect, useState } from 'react';

const STORAGE_KEY = 'orbit_theme_v1';
const EVENT_NAME = 'orbit-theme-change';

function readStoredTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    return window.localStorage.getItem(STORAGE_KEY) || 'dark';
  } catch {
    return 'dark';
  }
}

// AppShell and Settings each mount their own useTheme() instance at the same
// time. A plain useState wouldn't let one instance's toggle update the
// other's — so alongside persisting to localStorage, this broadcasts a
// same-tab event that every instance listens for and syncs to.
export default function useTheme() {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') root.classList.add('light-mode');
    else root.classList.remove('light-mode');
  }, [theme]);

  useEffect(() => {
    const onExternalChange = (e) => setTheme(e.detail);
    window.addEventListener(EVENT_NAME, onExternalChange);
    return () => window.removeEventListener(EVENT_NAME, onExternalChange);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore — this tab still updates, it just won't persist
    }
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: next }));
  };

  return { theme, toggle };
}