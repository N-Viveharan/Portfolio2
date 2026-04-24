import { ThemeProvider }    from './context/ThemeContext';
import { useWindowManager } from './hooks/useWindowManager';
import MenuBar              from './components/MenuBar/MenuBar';
import Dock                 from './components/Dock/Dock';
import Desktop              from './components/Desktop/Desktop';
import Window               from './components/Window/Window';
import AboutWindow          from './components/Windows/AboutWindow/AboutWindow';
import ProjectsWindow       from './components/Windows/ProjectsWindow/ProjectsWindow';
import SkillsWindow         from './components/Windows/SkillsWindow/SkillsWindow';
import ContactWindow        from './components/Windows/ContactWindow/ContactWindow';
import './styles/global.css';



/* ── Per-window defaults ── */
const WINDOW_CONFIG = {
  about: {
    title:       'About Me',
    icon:        '👤',
    defaultPos:  { x: 60,  y: 50 },
    defaultSize: { w: 520, h: 560 },
  },
  projects: {
    title:       'Projects',
    icon:        '💼',
    defaultPos:  { x: 160, y: 70 },
    defaultSize: { w: 660, h: 580 },
  },
  skills: {
    title:       'Skills',
    icon:        '⚡',
    defaultPos:  { x: 240, y: 60 },
    defaultSize: { w: 540, h: 520 },
  },
  contact: {
    title:       'Contact',
    icon:        '✉️',
    defaultPos:  { x: 300, y: 80 },
    defaultSize: { w: 480, h: 560 },
  },
};

/* ── Static window content map ── */
const WINDOW_CONTENT = {
  about:    <AboutWindow />,
  projects: <ProjectsWindow />,
  skills:   <SkillsWindow />,
  contact:  <ContactWindow />,
};

/* ── Inner component (needs hook inside ThemeProvider) ── */
function Portfolio() {
  const {
    windows,
    closeWindow,
    minimizeWindow,
    focusWindow,
    toggleWindow,
  } = useWindowManager();

  return (
    <>
      <MenuBar />

      <Desktop>
        {Object.entries(WINDOW_CONFIG).map(([id, cfg]) => (
          <Window
            key={id}
            id={id}
            title={cfg.title}
            icon={cfg.icon}
            defaultPos={cfg.defaultPos}
            defaultSize={cfg.defaultSize}
            open={windows[id].open}
            minimized={windows[id].minimized}
            zIndex={windows[id].zIndex}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onFocus={focusWindow}
          >
            {WINDOW_CONTENT[id]}
          </Window>
        ))}
      </Desktop>

      <Dock windows={windows} onToggle={toggleWindow} />
    </>
  );
}

/* ── Root export wraps everything in ThemeProvider ── */
export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}