import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './MenuBar.css';

export default function MenuBar() {
  const { theme, toggle } = useTheme();
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.menubar}>
      <div className={styles.left}>
        <span className={styles.apple}>⌘</span>
        <span className={styles.appName}>Viveharan</span>
        <span className={styles.menuItem}>File</span>
        <span className={styles.menuItem}>View</span>
        <span className={styles.menuItem}>Go</span>
        <span className={styles.menuItem}>Help</span>
      </div>
      <div className={styles.right}>
        <button className={styles.iconBtn} onClick={toggle} title="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <span className={styles.iconBtn}>📶</span>
        <span className={styles.iconBtn}>🔋</span>
        <span className={styles.iconBtn}>🔍</span>
        <span className={styles.dateTime}>{date}  {time}</span>
      </div>
    </div>
  );
}