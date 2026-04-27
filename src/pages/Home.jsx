import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import ToolCard from "../components/ToolCard";


/* ─── Floating badge data ─── */
const BADGES = [
  { icon: "🎓", bg: "var(--primary)",   label: "GPA",      top: "12%",  right: "-28px", delay: "0s"    },
  { icon: "📊", bg: "var(--secondary)", label: "Analytics", top: "42%",  right: "-36px", delay: "0.4s"  },
  { icon: "📅", bg: "var(--accent)",    label: "Planner",   bottom: "18%", right: "-22px", delay: "0.8s" },
];

/* ─── Mockup tool chips ─── */
const CHIPS = [
  { icon: "📊", name: "GPA Calculator",  rating: "4.9", color: "rgba(109,40,217,0.10)" },
  { icon: "🖼️", name: "Image Converter",  rating: "4.8", color: "rgba(14,165,233,0.10)" },
  { icon: "🧠", name: "Flashcard Quiz",  rating: "4.9", color: "rgba(245,158,11,0.10)" },
];

/* ─── Stat counters ─── */
const COUNTERS = [
  { end: 10,      suffix: "",  label: "Free Tools"       },
  { end: 10000,   suffix: "+", label: "Students Helped"  },
  { end: 100,     suffix: "%", label: "No Signup Needed" },
];

/* ─── Tool list ─── */
const tools = [
  { title: "GPA Calculator",      description: "Calculate GPA with credit hours.",                   to: "/gpa",             icon: "📊" },
  { title: "Word Counter",         description: "Count words, characters, and reading time.",          to: "/word-counter",    icon: "🔤" },
  { title: "Resume Builder",       description: "Create and download a PDF resume.",                   to: "/resume",          icon: "📄" },
  { title: "Timetable Generator",  description: "Plan classes and study sessions.",                    to: "/timetable",       icon: "🗓️" },
  { title: "Exam Countdown",       description: "Track the time left until exams.",                    to: "/countdown",       icon: "⏳" },
  { title: "Pomodoro Timer",       description: "Focus with 25-min work sessions.",                    to: "/pomodoro",        icon: "⏱" },
  { title: "Flashcard Quiz",       description: "Study with quick question cards.",                    to: "/flashcards",      icon: "🧠" },
  { title: "PDF Notes Viewer",     description: "Open PDFs and keep notes beside them.",               to: "/pdf-notes",       icon: "📚" },
  { title: "Assignment Planner",   description: "Track tasks, priorities, and due dates.",             to: "/planner",         icon: "✅" },
  { title: "Calculator",           description: "Quick arithmetic calculator.",                         to: "/calculator",      icon: "🔢" },
  { title: "Image Converter",      description: "Convert PNG ↔ JPG ↔ WEBP or export to PDF.",         to: "/image-converter", icon: "🖼️" },
  { title: "Notes App",            description: "Write, organize and manage your notes.",               to: "/notes",           icon: "📝" },
];

/* ─── Animated counter hook ─── */
function useCounter(end, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

/* ─── Individual counter component ─── */
function Counter({ end, suffix, label, started }) {
  const val = useCounter(end, 1800, started);
  return (
    <div className="hsd-counter">
      <strong>
        {val.toLocaleString()}{suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

/* ─── Progress bar ─── */
function ProgressBar({ pct, color }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 300);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div className="hsd-pbar-track">
      <div className="hsd-pbar-fill" style={{ width: `${width}%`, background: color }} />
    </div>
  );
}

export default function Home() {
  const heroRef   = useRef(null);
  const counterRef = useRef(null);
  const [counterStarted, setCounterStarted] = useState(false);
  const [visible, setVisible]  = useState(false);

  /* Trigger entrance animation */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  /* Trigger counters when hero enters view */
  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setCounterStarted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <SEO title="SparkDesk | Free Student Tools Platform" />

      <Helmet>
        <style>{inlineStyles}</style>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SparkDesk",
            "url": "https://www.sparkdesk.online",
            "description": "Free student tools platform with calculators, flashcards, resume builder, pomodoro timer and more.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.sparkdesk.online/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <main className="page">

        {/* ═══════════════════════ HERO ═══════════════════════ */}
        <section
          ref={heroRef}
          className={`hsd-hero glass ${visible ? "hsd-hero--visible" : ""}`}
          aria-label="Hero section"
        >
          {/* Decorative blobs */}
          <div className="hsd-blob hsd-blob--1" aria-hidden="true" />
          <div className="hsd-blob hsd-blob--2" aria-hidden="true" />
          <div className="hsd-blob hsd-blob--3" aria-hidden="true" />

          {/* ── LEFT: copy ── */}
          <div className="hsd-copy">
            <span className="pill hsd-pill-anim">✦ All-in-one student toolkit</span>

            <h1 className="hsd-headline">
              Study smarter<br />
              with one{" "}
              <span className="hsd-gradient-text">clean dashboard.</span>
            </h1>

            <p className="hsd-sub">
              Free, fast and easy-to-use tools to help you calculate,
              plan, create and achieve more in your studies.
            </p>

            <div className="hsd-cta-row">
              <Link to="/gpa" className="btn hsd-btn-main">
                Explore Tools <span className="hsd-arrow">→</span>
              </Link>
              <Link to="/resume" className="chip hsd-btn-outline">
                Build Resume ↗
              </Link>
            </div>

            {/* Social proof */}
<div className="hsd-proof">
  <div className="hsd-avatars">
    {[
      "/user1.jpg",
      "/user2.jpg",
      "/user3.jpg",
      "/user4.jpg",
    ].map((src, i) => (
      <img
        key={i}
        src={src}
        alt={`user-${i}`}
        className="hsd-avatar"
        style={{ zIndex: 4 - i }}
      />
    ))}
  </div>
              <p>Trusted by <strong>10,000+</strong> students across the world 🌍</p>
            </div>

            {/* Counter strip */}
            <div ref={counterRef} className="hsd-counters">
              {COUNTERS.map((c) => (
                <Counter key={c.label} {...c} started={counterStarted} />
              ))}
            </div>
          </div>

          {/* ── RIGHT: mockup card ── */}
          <div className="hsd-mockup-wrap" aria-hidden="true">

            {/* Floating badges */}
            {BADGES.map((b) => (
              <div
                key={b.label}
                className="hsd-badge"
                style={{
                  background: b.bg,
                  top: b.top,
                  bottom: b.bottom,
                  right: b.right,
                  animationDelay: b.delay,
                }}
              >
                {b.icon}
              </div>
            ))}

            {/* App window card */}
            <div className="hsd-card glass">
              {/* Title bar */}
              <div className="hsd-titlebar">
                <span className="hsd-dot" style={{ background: "#ef4444" }} />
                <span className="hsd-dot" style={{ background: "#f59e0b" }} />
                <span className="hsd-dot" style={{ background: "#10b981" }} />
                <span className="hsd-titlebar-label">SparkDesk</span>
              </div>

              {/* Greeting */}
              <div className="hsd-card-greeting">
                <div>
                  <p className="hsd-greeting-line">Welcome back! 👋</p>
                  <p className="hsd-greeting-sub">What do you want to do today?</p>
                </div>
                <div className="hsd-notif">3</div>
              </div>

              {/* Tool chips */}
              <div className="hsd-tool-chips">
                {CHIPS.map((chip) => (
                  <div key={chip.name} className="hsd-chip-card" style={{ background: chip.color }}>
                    <span className="hsd-chip-icon">{chip.icon}</span>
                    <span className="hsd-chip-name">{chip.name}</span>
                    <span className="hsd-chip-rating">⭐ {chip.rating}</span>
                  </div>
                ))}
              </div>

              {/* Progress section */}
              <div className="hsd-progress-section">
                <div className="hsd-progress-header">
                  <span>Your Progress</span>
                  <span className="hsd-progress-pct">73%</span>
                </div>
                <ProgressBar pct={73} color="linear-gradient(90deg, var(--primary), var(--secondary))" />
              </div>

              {/* Mini stats */}
              <div className="hsd-mini-stats">
                <div className="hsd-mini-stat">
                  <strong>12</strong><span>Tools</span>
                </div>
                <div className="hsd-mini-stat">
                  <strong>4.9</strong><span>Rating</span>
                </div>
                <div className="hsd-mini-stat">
                  <strong>Free</strong><span>Always</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ FEATURE STRIP ═══════════════ */}
        <div className="hsd-strip glass">
          {[
            { icon: "✅", title: "100% Free",          sub: "All tools are free forever"       },
            { icon: "🚫", title: "No Signup",           sub: "No login or registration"         },
            { icon: "👩‍🎓", title: "Built for Students", sub: "Designed for your needs"         },
            { icon: "⚡", title: "Fast & Lightweight",  sub: "Instant results, always"          },
          ].map((f) => (
            <div key={f.title} className="hsd-strip-item">
              <span className="hsd-strip-icon">{f.icon}</span>
              <div>
                <strong>{f.title}</strong>
                <span>{f.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ═══════════════ TOOL GRID ═══════════════ */}
        <div className="hsd-section-head">
          <span className="pill">Everything in one place</span>
          <h2>Explore Tools</h2>
          <p>Pick a tool and get started instantly — no account needed.</p>
        </div>

        <section className="grid">
          {tools.map((tool) => (
            <ToolCard key={tool.to} {...tool} />
          ))}
        </section>

      </main>
    </>
  );
}

/* ════════════════════════════════════════════════
   INLINE STYLES  (scoped to hsd-* classes only)
   ════════════════════════════════════════════════ */
const inlineStyles = `

/* ── Hero wrapper ── */
.hsd-hero {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 32px;
  border-radius: var(--radius-xl);
  padding: 52px 48px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-smooth), transform 0.6s var(--ease-smooth);
}

.hsd-hero--visible {
  opacity: 1;
  transform: none;
}

/* ── Decorative blobs ── */
.hsd-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: hsdPulse 6s ease-in-out infinite;
}
.hsd-blob--1 {
  width: 380px; height: 380px;
  top: -120px; right: -80px;
  background: radial-gradient(circle, rgba(109,40,217,0.12), transparent 70%);
  animation-delay: 0s;
}
.hsd-blob--2 {
  width: 260px; height: 260px;
  bottom: -80px; left: 30%;
  background: radial-gradient(circle, rgba(14,165,233,0.10), transparent 70%);
  animation-delay: 2s;
}
.hsd-blob--3 {
  width: 180px; height: 180px;
  top: 30%; left: -60px;
  background: radial-gradient(circle, rgba(245,158,11,0.08), transparent 70%);
  animation-delay: 4s;
}
@keyframes hsdPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.08); opacity: 0.8; }
}

/* ── Left copy ── */
.hsd-copy {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.hsd-pill-anim {
  animation: hsdFadeUp 0.5s 0.1s var(--ease-smooth) both;
}

.hsd-headline {
  margin: 16px 0 14px;
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4.2vw, 3rem);
  line-height: 1.07;
  letter-spacing: -0.03em;
  color: var(--text);
  animation: hsdFadeUp 0.55s 0.2s var(--ease-smooth) both;
}

.hsd-gradient-text {
  background: var(--grad-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hsd-sub {
  color: var(--muted);
  line-height: 1.65;
  max-width: 440px;
  margin-bottom: 26px;
  animation: hsdFadeUp 0.55s 0.3s var(--ease-smooth) both;
}

.hsd-cta-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  animation: hsdFadeUp 0.55s 0.38s var(--ease-smooth) both;
}

.hsd-btn-main {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 14px 28px;
  border-radius: var(--radius-md);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.hsd-arrow {
  display: inline-block;
  transition: transform 0.25s var(--ease-spring);
}
.hsd-btn-main:hover .hsd-arrow { transform: translateX(4px); }

.hsd-btn-outline {
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 13px 22px;
  border-radius: var(--radius-md);
}

/* ── Social proof ── */
.hsd-proof {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  animation: hsdFadeUp 0.55s 0.44s var(--ease-smooth) both;
}

.hsd-avatars { display: flex; }

.hsd-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--bg2);
  border: 2px solid var(--card);
  display: grid;
  place-items: center;
  font-size: 1rem;
  margin-left: -8px;
  box-shadow: var(--shadow-xs);
  transition: transform 0.2s var(--ease-spring);
}
.hsd-avatar:first-child { margin-left: 0; }
.hsd-avatars:hover .hsd-avatar { transform: translateX(-2px); }

.hsd-proof p { font-size: 0.85rem; color: var(--muted); }
.hsd-proof strong { color: var(--text); }

/* ── Counter strip ── */
.hsd-counters {
  display: flex;
  gap: 20px;
  margin-top: 26px;
  animation: hsdFadeUp 0.55s 0.5s var(--ease-smooth) both;
}

.hsd-counter {
  text-align: center;
  padding: 14px 18px;
  border-radius: var(--radius);
  background: var(--grad-card);
  border: 1.5px solid var(--border);
  min-width: 90px;
  transition: transform 0.25s var(--ease-spring), box-shadow 0.25s;
}
.hsd-counter:hover { transform: translateY(-3px); box-shadow: var(--shadow-sm); }

.hsd-counter strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 900;
  background: var(--grad-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hsd-counter span { font-size: 0.74rem; color: var(--muted); font-weight: 600; }

/* ── Right: mockup wrap ── */
.hsd-mockup-wrap {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: hsdFloat 4.5s ease-in-out infinite, hsdFadeUp 0.6s 0.25s var(--ease-smooth) both;
}

@keyframes hsdFloat {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}

/* ── Floating badges ── */
.hsd-badge {
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 1.4rem;
  box-shadow: 0 8px 28px rgba(0,0,0,0.18);
  color: #fff;
  animation: hsdBadgeFloat 3.5s ease-in-out infinite;
  z-index: 10;
}
@keyframes hsdBadgeFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-8px) rotate(4deg); }
}

/* ── App window card ── */
.hsd-card {
  width: 310px;
  padding: 0;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-glow-lg), var(--shadow-lg);
  border: 1px solid var(--border);
}

.hsd-titlebar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  background: rgba(255,255,255,0.6);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(10px);
}
body.dark .hsd-titlebar { background: rgba(15,23,42,0.6); }

.hsd-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.hsd-titlebar-label {
  margin-left: 8px;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--muted);
}

.hsd-card-greeting {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 18px 12px;
}

.hsd-greeting-line {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--text);
  margin: 0;
}
.hsd-greeting-sub {
  font-size: 0.75rem;
  color: var(--muted);
  margin: 3px 0 0;
}

.hsd-notif {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: var(--grad-primary);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow-glow);
  flex-shrink: 0;
  animation: hsdPing 2s ease-in-out infinite;
}
@keyframes hsdPing {
  0%, 100% { box-shadow: var(--shadow-glow); }
  50%       { box-shadow: 0 0 0 6px rgba(109,40,217,0.15), var(--shadow-glow); }
}

/* ── Tool chips ── */
.hsd-tool-chips {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 18px 14px;
}

.hsd-chip-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  transition: transform 0.2s var(--ease-spring);
}
.hsd-chip-card:hover { transform: translateX(4px); }

.hsd-chip-icon { font-size: 1.1rem; flex-shrink: 0; }
.hsd-chip-name { font-size: 0.82rem; font-weight: 600; color: var(--text-2); flex: 1; }
.hsd-chip-rating { font-size: 0.74rem; color: var(--muted); font-weight: 600; white-space: nowrap; }

/* ── Progress section ── */
.hsd-progress-section {
  padding: 12px 18px 14px;
  border-top: 1px solid var(--border);
}

.hsd-progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--muted);
}

.hsd-progress-pct {
  color: var(--primary);
  font-weight: 800;
}

.hsd-pbar-track {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: var(--border-solid);
  overflow: hidden;
}

.hsd-pbar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 1.2s var(--ease-smooth);
  box-shadow: 0 2px 8px rgba(109,40,217,0.3);
}

/* ── Mini stats row ── */
.hsd-mini-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--border);
}

.hsd-mini-stat {
  text-align: center;
  padding: 12px 8px;
  border-right: 1px solid var(--border);
}
.hsd-mini-stat:last-child { border-right: none; }

.hsd-mini-stat strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 900;
  background: var(--grad-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hsd-mini-stat span { font-size: 0.68rem; color: var(--muted); font-weight: 600; }

/* ── Feature strip ── */
.hsd-strip {
  display: flex;
  align-items: center;
  gap: 0;
  border-radius: var(--radius-lg);
  padding: 0;
  margin-bottom: 32px;
  overflow: hidden;
}

.hsd-strip-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 22px;
  border-right: 1px solid var(--border);
  transition: background 0.2s;
}
.hsd-strip-item:last-child { border-right: none; }
.hsd-strip-item:hover { background: rgba(109,40,217,0.04); }

.hsd-strip-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(109,40,217,0.08), rgba(14,165,233,0.08));
}

.hsd-strip-item strong {
  display: block;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text);
}
.hsd-strip-item span { font-size: 0.76rem; color: var(--muted); font-weight: 500; }

/* ── Section heading ── */
.hsd-section-head {
  text-align: center;
  margin-bottom: 22px;
  animation: hsdFadeUp 0.5s 0.1s var(--ease-smooth) both;
}
.hsd-section-head h2 {
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  margin: 10px 0 8px;
  letter-spacing: -0.02em;
}
.hsd-section-head p { color: var(--muted); font-size: 0.95rem; }

/* ── Shared entrance animation ── */
@keyframes hsdFadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: none; }
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .hsd-hero { grid-template-columns: 1fr; padding: 32px 24px; }
  .hsd-mockup-wrap { display: none; }
  .hsd-counters { gap: 10px; }
  .hsd-counter { min-width: 80px; padding: 12px 14px; }
}

@media (max-width: 600px) {
  .hsd-strip { flex-wrap: wrap; }
  .hsd-strip-item { flex: 1 1 calc(50% - 1px); border-bottom: 1px solid var(--border); }
  .hsd-strip-item:nth-child(2n) { border-right: none; }
  .hsd-strip-item:nth-last-child(-n+2) { border-bottom: none; }
  .hsd-counters { flex-wrap: wrap; }
  .hsd-counter { flex: 1 1 calc(33% - 10px); }
  .hsd-cta-row .btn,
  .hsd-cta-row .chip { width: 100%; justify-content: center; }
}
  .hsd-proof {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hsd-avatars {
  display: flex;
  align-items: center;
}

/* smaller avatars */
.hsd-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;

  border: 2px solid #fff;
  box-shadow: 0 3px 8px rgba(0,0,0,0.10);

  margin-left: -8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

/* first avatar reset */
.hsd-avatar:first-child {
  margin-left: 0;
}

/* hover effect */
.hsd-avatar:hover {
  transform: translateY(-3px) scale(1.05);
  z-index: 10 !important;
}

/* optional text */
.hsd-proof-text {
  font-size: 13px;
  color: #666;
}
  /* ── Responsive ── */
@media (max-width: 900px) {
  .hsd-hero {
    grid-template-columns: 1fr;
    padding: 32px 24px;
  }

  .hsd-mockup-wrap {
    display: none;
  }

  .hsd-counters {
    gap: 10px;
  }

  .hsd-counter {
    min-width: 80px;
    padding: 12px 14px;
  }
}

@media (max-width: 600px) {

  /* Feature strip */
  .hsd-strip {
    flex-wrap: wrap;
  }

  .hsd-strip-item {
    flex: 1 1 calc(50% - 1px);
    border-bottom: 1px solid var(--border);
  }

  .hsd-strip-item:nth-child(2n) {
    border-right: none;
  }

  .hsd-strip-item:nth-last-child(-n+2) {
    border-bottom: none;
  }

  /* Counter Fix */
  .hsd-counters {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 100%;
  }

  .hsd-counter {
    min-width: 0;
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .hsd-counter strong {
    font-size: 1.05rem;
    line-height: 1.1;
    white-space: nowrap;
  }

  .hsd-counter span {
    font-size: 0.65rem;
    line-height: 1.2;
    text-align: center;
  }

  /* Buttons */
  .hsd-cta-row .btn,
  .hsd-cta-row .chip {
    width: 100%;
    justify-content: center;
  }

  /* Proof section */
  .hsd-proof {
    gap: 8px;
    align-items: center;
  }

  .hsd-proof p {
    font-size: 0.78rem;
    line-height: 1.3;
  }

  /* Avatars */
  .hsd-avatar {
    width: 28px;
    height: 28px;
  }
}

/* Social Proof */
.hsd-proof {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hsd-avatars {
  display: flex;
  align-items: center;
}

.hsd-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 3px 8px rgba(0,0,0,0.10);
  margin-left: -8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.hsd-avatar:first-child {
  margin-left: 0;
}

.hsd-avatar:hover {
  transform: translateY(-3px) scale(1.05);
  z-index: 10 !important;
}

.hsd-proof-text {
  font-size: 13px;
  color: #666;
}
`;