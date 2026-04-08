import styles from './Desktop.css';

const DESKTOP_ICONS = [
  { label: 'Resume.pdf', emoji: '📄', href: '#' },
  { label: 'Projects',   emoji: '📁', href: '#' },
  { label: 'GitHub',     emoji: '🐙', href: 'https://github.com/viveharan' },
];

export default function Desktop({ children }) {
  return (
    <div className={styles.desktop}>




      {/* ── Animated background blobs ── */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />
      

      {/* ── Noise texture overlay ── */}
      <div className={styles.noise} />

      {/* ── Desktop icons (top-right) ── */}
      <div className={styles.iconsCol}>
        {DESKTOP_ICONS.map(icon => (
          <a
            key={icon.label}
            href={icon.href}
            target={icon.href !== '#' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className={styles.desktopIcon}
          >
            <div className={styles.iconImg}>
              <span>{icon.emoji}</span>
            </div>
            <span className={styles.iconLabel}>{icon.label}</span>
          </a>
        ))}
      </div>

      {/* ── Greeting hint shown until a window opens ── */}
      <div className={styles.hint}>
        <p className={styles.hintGreeting}>👋 Hi, I'm Viveharan</p>
        <p className={styles.hintSub}>
          Click any icon in the dock to get started
        </p>
        <div className={styles.hintArrow}>↓</div>
      </div>

      {/* ── All draggable windows are rendered here ── */}
      {children}

    </div>
  );
}