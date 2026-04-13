import styles from './AboutWindow.css';

export default function AboutWindow() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar}>
            <span className={styles.avatarEmoji}>👨‍💻</span>
          </div>
          <div className={styles.statusDot} title="Available for work" />
        </div>
        <div className={styles.heroText}>
          <h1 className={styles.name}>Nagalingam Viveharan</h1>
          <p className={styles.role}>MERN Stack Developer</p>
          <div className={styles.badges}>
            <span className={styles.badge}>🇱🇰 Sri Lanka</span>
            <span className={styles.badge}>🎓 Software Engineering</span>
            <span className={styles.badge}>💻 Open to Work</span>
          </div>
        </div>
          
          
          
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>About Me</h2>
        <p className={styles.bio}>
          Hi! I'm a passionate Software Engineering student and MERN Stack Developer from Sri Lanka,
          dedicated to building robust, scalable full-stack web applications. I specialize in
          crafting seamless user experiences with <strong>React</strong> on the frontend while
          powering them with <strong>Node.js</strong>, <strong>Express</strong>, and
          <strong> MongoDB</strong> on the backend.
        </p>
        <p className={styles.bio}>
          I love turning complex problems into elegant, efficient solutions — from designing
          RESTful APIs to architecting database schemas. When I'm not coding, I'm exploring
          new technologies, contributing to open-source projects, or refining my skills in
          system design and software architecture.
        </p>
      </div>

      <div className={styles.divider} />

      <div className={styles.statsGrid}>
        {[
          { num: '4+',   label: 'Projects Built' },
          { num: '2+',   label: 'Years Coding'   },
          { num: '10+',  label: 'Technologies'   },
          { num: '100%', label: 'Dedication'      },
        ].map(s => (
          <div key={s.label} className={styles.statCard}>
            <span className={styles.statNum}>{s.num}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Tech Stack</h2>
        <div className={styles.stackGrid}>
          {[
            { icon: '⚛️', name: 'React'      },
            { icon: '🟢', name: 'Node.js'    },
            { icon: '🚂', name: 'Express'    },
            { icon: '🍃', name: 'MongoDB'    },
            { icon: '🐙', name: 'Git'        },
            { icon: '🐳', name: 'Docker'     },
            { icon: '🟨', name: 'JavaScript' },
            { icon: '🎨', name: 'CSS3'       },
          ].map(t => (
            <div key={t.name} className={styles.techChip}>
              <span>{t.icon}</span>
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}