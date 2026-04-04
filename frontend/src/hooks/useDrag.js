import { useState, useCallback, useRef } from 'react';

export function useDrag(initialPos) {
  const [pos, setPos]       = useState(initialPos);
  const dragging            = useRef(false);
  const startMouse          = useRef({ x: 0, y: 0 });
  const startPos            = useRef({ x: 0, y: 0 });


  
  const onMouseDown = useCallback((e) => {
    // Ignore clicks on buttons / interactive children tagged .no-drag
    if (e.target.closest('.no-drag')) return;

    dragging.current    = true;
    startMouse.current  = { x: e.clientX, y: e.clientY };
    startPos.current    = { ...pos };

    const onMove = (me) => {
      if (!dragging.current) return;
      const dx = me.clientX - startMouse.current.x;
      const dy = me.clientY - startMouse.current.y;
      setPos({
        x: Math.max(0, startPos.current.x + dx),
        // Never drag above the 28 px menu bar
        y: Math.max(28, startPos.current.y + dy),
      });
    };

    const onUp = () => {
      dragging.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
  }, [pos]);

  return { pos, setPos, onMouseDown };
}