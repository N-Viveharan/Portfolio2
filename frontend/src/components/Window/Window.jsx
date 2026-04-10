import { useRef, useState, useEffect } from 'react';
import { useDrag } from '../../hooks/useDrag';
import styles from './Window.css';

export default function Window({
  id, title, icon, children,
  open, minimized, zIndex,
  onClose, onMinimize, onFocus,
  defaultPos, defaultSize,
}) {
  const { pos, setPos, onMouseDown } = useDrag(defaultPos);
  const [size, setSize] = useState(defaultSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevState, setPrevState] = useState(null);
  const [animating, setAnimating] = useState(false);
  const prevOpen = useRef(false);

  useEffect(() => {
    if (open && !prevOpen.current) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 350);
    }
    prevOpen.current = open;
  }, [open]);

  

  const handleMaximize = () => {
    if (!isMaximized) {
      setPrevState({ pos: { ...pos }, size: { ...size } });
      setPos({ x: 0, y: 28 });
      setSize({ w: window.innerWidth, h: window.innerHeight - 28 });
      setIsMaximized(true);
    } else {
      if (prevState) {
        setPos(prevState.pos);
        setSize(prevState.size);
      }
      setIsMaximized(false);
    }
  };

  if (!open) return null;

  const cls = [
    styles.window,
    minimized ? styles.minimized : '',
    animating ? styles.opening : '',
    isMaximized ? styles.maximized : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cls}
      style={{
        left: isMaximized ? 0 : pos.x,
        top: isMaximized ? 28 : pos.y,
        width: isMaximized ? '100vw' : size.w,
        height: isMaximized ? 'calc(100vh - 28px)' : size.h,
        zIndex,
      }}
      onMouseDown={() => onFocus(id)}
    >
      {/* Title bar */}
      <div
        className={styles.titleBar}
        onMouseDown={isMaximized ? undefined : onMouseDown}
      >
        <div className={styles.trafficLights}>
          <button
            className={`${styles.light} ${styles.red} no-drag`}
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            title="Close"
          />
          <button
            className={`${styles.light} ${styles.yellow} no-drag`}
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            title="Minimize"
          />
          <button
            className={`${styles.light} ${styles.green} no-drag`}
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            title="Maximize"
          />
        </div>
        <div className={styles.titleInfo}>
          <span className={styles.titleIcon}>{icon}</span>
          <span className={styles.titleText}>{title}</span>
        </div>
        <div className={styles.titleSpacer} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>

      {/* Resize handle */}
      {!isMaximized && (
        <div
          className={styles.resizeHandle}
          onMouseDown={(e) => {
            e.stopPropagation();
            const startX = e.clientX;
            const startY = e.clientY;
            const startW = size.w;
            const startH = size.h;
            const onMove = (me) => {
              setSize({
                w: Math.max(380, startW + me.clientX - startX),
                h: Math.max(300, startH + me.clientY - startY),
              });
            };
            const onUp = () => {
              window.removeEventListener('mousemove', onMove);
              window.removeEventListener('mouseup', onUp);
            };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
          }}
        />
      )}
    </div>
  );
}