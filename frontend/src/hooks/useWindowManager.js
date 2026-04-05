import { useState, useCallback } from 'react';

const INITIAL_WINDOWS = {
  about:    { open: false, minimized: false, zIndex: 10 },
  projects: { open: false, minimized: false, zIndex: 10 },
  skills:   { open: false, minimized: false, zIndex: 10 },
  contact:  { open: false, minimized: false, zIndex: 10 },
};

export function useWindowManager() {
  const [windows, setWindows] = useState(INITIAL_WINDOWS);
  const [topZ,    setTopZ]    = useState(10);



  
  
  /* ── Bring a window to the top of the stack ── */
  const focusWindow = useCallback((id) => {
    setTopZ(z => {
      const next = z + 1;
      setWindows(w => ({ ...w, [id]: { ...w[id], zIndex: next } }));
      return next;
    });
  }, []);

  /* ── Open a window (or un-minimise it) ── */
  const openWindow = useCallback((id) => {
    setTopZ(z => {
      const next = z + 1;
      setWindows(w => ({
        ...w,
        [id]: { open: true, minimized: false, zIndex: next },
      }));
      return next;
    });
  }, []);

  /* ── Close a window completely ── */
  const closeWindow = useCallback((id) => {
    setWindows(w => ({
      ...w,
      [id]: { ...w[id], open: false, minimized: false },
    }));
  }, []);

  /* ── Minimize a window to the dock ── */
  const minimizeWindow = useCallback((id) => {
    setWindows(w => ({
      ...w,
      [id]: { ...w[id], minimized: true },
    }));
  }, []);

  /* ── Dock icon click: open → minimise → restore cycle ── */
  const toggleWindow = useCallback((id) => {
    setWindows(prev => {
      const win = prev[id];

      // Not open yet → open it
      if (!win.open) {
        setTopZ(z => {
          const next = z + 1;
          setWindows(w => ({
            ...w,
            [id]: { open: true, minimized: false, zIndex: next },
          }));
          return next;
        });
        return prev; // interim return; real update happens in setTopZ cb
      }

      // Open but minimised → restore and bring to front
      if (win.minimized) {
        setTopZ(z => {
          const next = z + 1;
          setWindows(w => ({
            ...w,
            [id]: { ...w[id], minimized: false, zIndex: next },
          }));
          return next;
        });
        return prev;
      }

      // Open and visible → minimise it
      return { ...prev, [id]: { ...win, minimized: true } };
    });
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
    toggleWindow,
  };
}