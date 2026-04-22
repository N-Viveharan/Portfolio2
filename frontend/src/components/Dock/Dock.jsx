import { useState } from 'react';
import styles from './Dock.css';

const APPS = [
  { id: 'about', label: 'About Me', emoji: '👤', color: '#0071e3' },
  { id: 'projects', label: 'Projects', emoji: '💼', color: '#5e5ce6' },
  { id: 'skills', label: 'Skills', emoji: '⚡', color: '#ff9f0a' },
  { id: 'contact', label: 'Contact', emoji: '✉️', color: '#30d158' },
];

export default function Dock({ windows, onToggle }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const getScale = (idx) => {
    if (hoveredIdx === null) return 1;
    const dist = Math.abs(idx - hoveredIdx);
    if (dist === 0) return 1.55;
    if (dist === 1) return 1.3;
    if (dist === 2) return 1.1;
    return 1;
  };

  

  const getTranslateY = (idx) => {
    if (hoveredIdx === null) return 0;
    const dist = Math.abs(idx - hoveredIdx);
    if (dist === 0) return -14;
    if (dist === 1) return -8;
    if (dist === 2) return -3;
    return 0;
  };

  return (
    <div className={styles.dockWrapper}>
      <div className={styles.dock}>
        {APPS.map((app, idx) => {
          const isOpen = windows[app.id]?.open;
          const isMin = windows[app.id]?.minimized;
          return (
            <button
              key={app.id}
              className={styles.item}
              onClick={() => onToggle(app.id)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                transform: `scale(${getScale(idx)}) translateY(${getTranslateY(idx)}px)`,
              }}
              title={app.label}
            >
              <div
                className={styles.icon}
                style={{ background: `linear-gradient(135deg, ${app.color}dd, ${app.color}88)` }}
              >
                <span className={styles.emoji}>{app.emoji}</span>
              </div>
              <span className={styles.label}>{app.label}</span>
              {isOpen && !isMin && <span className={styles.dot} />}
              {isMin && <span className={`${styles.dot} ${styles.dotMin}`} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}