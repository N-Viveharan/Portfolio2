import { useState } from 'react';
import styles from './ContactWindow.css';

export default function ContactWindow() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'sent'

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    }, 1400);
  };

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h2 className={styles.title}>Get In Touch</h2>
        <p className={styles.subtitle}>
          Have a project in mind? Let's build something great together.
        </p>
      </div>

      {/* ── Social / contact links ── */}
      <div className={styles.socials}>

        {/* GitHub */}
        <a
          href="https://github.com/viveharan"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialCard}
        >
          <span className={styles.socialIcon}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </span>
          <div className={styles.socialInfo}>
            <span className={styles.socialName}>GitHub</span>
            <span className={styles.socialHandle}>@viveharan</span>
          </div>
          <span className={styles.socialArrow}>↗</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/viveharan"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialCard}
        >
          <span className={styles.socialIcon} style={{ color: '#0077b5' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </span>
          <div className={styles.socialInfo}>
            <span className={styles.socialName}>LinkedIn</span>
            <span className={styles.socialHandle}>Nagalingam Viveharan</span>
          </div>
          <span className={styles.socialArrow}>↗</span>
        </a>

        {/* Email */}
        <a
          href="mailto:viveharan@example.com"
          className={styles.socialCard}
        >
          <span className={styles.socialIcon} style={{ color: '#ff453a' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9-2-2-2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </span>
          <div className={styles.socialInfo}>
            <span className={styles.socialName}>Email</span>
            <span className={styles.socialHandle}>viveharan@example.com</span>
          </div>
          <span className={styles.socialArrow}>↗</span>
        </a>

      </div>

      {/* ── Divider ── */}
      <div className={styles.divider}>
        <span>or send a message</span>
      </div>

      {/* ── Form / Success ── */}
      {status === 'sent' ? (
        <div className={styles.successMsg}>
          <span className={styles.successIcon}>✅</span>
          <h3>Message Sent!</h3>
          <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
          <button className={styles.resetBtn} onClick={() => setStatus(null)}>
            Send another message
          </button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={submit}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handle}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handle}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Message</label>
            <textarea
              className={styles.textarea}
              name="message"
              placeholder="Tell me about your project or just say hi..."
              value={form.message}
              onChange={handle}
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <span className={styles.sending}>
                <span className={styles.spinner} />
                Sending…
              </span>
            ) : (
              <>✈️ Send Message</>
            )}
          </button>
        </form>
      )}
    </div>
  );
}