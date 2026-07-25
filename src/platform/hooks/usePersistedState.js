import { useEffect, useState } from 'react';

// Same signature as React.useState(defaultValue), but reads/writes `key` in
// localStorage so the value survives refreshes and new sessions.
export default function usePersistedState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can fail (private browsing, quota, etc.) — state still works
      // for the current session, it just won't persist.
    }
  }, [key, value]);

  return [value, setValue];
}