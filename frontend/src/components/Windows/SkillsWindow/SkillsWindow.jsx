import { useEffect, useRef, useState } from 'react';
import { skillCategories } from '../../../data/skills';
import styles from './SkillsWindow.css';





function SkillBar({ name, level, color, animate }) {
  return (
    <div className={styles.skillRow}>
      <div className={styles.skillMeta}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillPercent} style={{ color }}>{level}%</span>
      </div>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{
            width: animate ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}99, ${color})`,
          }}
        />
      </div>
    </div>
  );
}




export default function SkillsWindow() {
  const [active, setActive]   = useState('frontend');
  const [animate, setAnimate] = useState(false);
  const timerRef              = useRef(null);

  /* re-trigger bar animation whenever the tab changes */
  const switchTab = (id) => {
    setActive(id);
    setAnimate(false);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAnimate(true), 40);
  };

  /* initial mount animation */
  useEffect(() => {
    timerRef.current = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(timerRef.current);
  }, []);

  const current = skillCategories.find(c => c.id === active);

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h2 className={styles.title}>Skills & Expertise</h2>
        <p className={styles.subtitle}>Technologies I work with daily</p>
      </div>

      {/* ── Category tabs ── */}
      <div className={styles.tabs}>
        {skillCategories.map(cat => (
          <button
            key={cat.id}
            className={`${styles.tab} ${active === cat.id ? styles.tabActive : ''}`}
            style={active === cat.id ? { '--tab-color': cat.color } : {}}
            onClick={() => switchTab(cat.id)}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* ── Skills panel ── */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <div
            className={styles.catIcon}
            style={{ background: `linear-gradient(135deg, ${current.color}dd, ${current.color}66)` }}
          >
            {current.icon}
          </div>
          <div>
            <h3 className={styles.catTitle}>{current.label}</h3>
            <p className={styles.catSub}>{current.skills.length} technologies</p>
          </div>
        </div>

        <div className={styles.bars}>
          {current.skills.map(s => (
            <SkillBar
              key={s.name}
              name={s.name}
              level={s.level}
              color={current.color}
              animate={animate}
            />
          ))}
        </div>
      </div>

      {/* ── Overview cards ── */}
      <div className={styles.overviewGrid}>
        {skillCategories.map(cat => (
          <div
            key={cat.id}
            className={`${styles.overCard} ${active === cat.id ? styles.overCardActive : ''}`}
            style={{ '--card-accent': cat.color }}
            onClick={() => switchTab(cat.id)}
          >
            <span className={styles.overIcon}>{cat.icon}</span>
            <span className={styles.overLabel}>{cat.label}</span>
            <span className={styles.overCount}>{cat.skills.length} skills</span>
          </div>
        ))}
      </div>

    </div>
  );
}