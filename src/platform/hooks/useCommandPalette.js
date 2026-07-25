import { useEffect, useState } from 'react';

export default function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      const isK = e.key.toLowerCase() === 'k';
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return { open, setOpen };
}
