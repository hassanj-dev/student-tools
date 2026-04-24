import React from "react";
import { Link } from "react-router-dom";

const stats = [
  { num: "11", suffix: "+", label: "Free Tools" },
  { num: "0", suffix: "$", label: "Forever Free" },
  { num: "1", suffix: "k+", label: "Students Helped" },
  { num: "0", suffix: "", label: "Ads. Ever." },
];

const tools = [
  { icon: "🎓", title: "GPA Calculator", desc: "Calculate CGPA and semester GPA instantly." },
  { icon: "📄", title: "Resume Builder", desc: "Create professional resumes in minutes." },
  { icon: "📅", title: "Timetable Planner", desc: "Organize your weekly schedule easily." },
  { icon: "🧠", title: "Flashcards", desc: "Study faster with smart flashcards." },
  { icon: "🖼️", title: "Image Converter", desc: "Convert images for assignments quickly." },
  { icon: "🔢", title: "Calculator", desc: "Quick arithmetic for daily calculations." },
];

const values = [
  { icon: "💜", title: "Free, always", desc: "No hidden charges, no subscriptions. Ever." },
  { icon: "🔒", title: "Privacy first", desc: "Your data stays on your device. Always." },
  { icon: "🚫", title: "Few ads", desc: "Zero distractions. Pure productivity." },
  { icon: "🎯", title: "Student-driven", desc: "We build exactly what students request." },
];

const timeline = [
  { year: "2024", label: "Idea & first prototype" },
  { year: "Early 2025", label: "Public launch" },
  { year: "Mid 2025", label: "1,000+ students reached" },
  { year: "Late 2025", label: "10+ tools launched" },
  { year: "Now", label: "Growing every day" },
];

export default function About() {
  return (
    <main className="page about-page">

      {/* HERO */}
      <section className="ab-hero glass">
        <div className="ab-hero-copy">
          <span className="pill">Our Story</span>

          <h1 className="ab-h1">
            Built for students,<br />
            by <em className="ab-em">students</em>
          </h1>

          <p className="muted ab-lead">
            SparkDesk (sparkdesk.online) was born out of frustration — too many tabs,
            too many apps, and not enough time. We built the toolkit we wish existed
            when we were studying.
          </p>

          <div className="btn-row" style={{ marginTop: 28 }}>
            <Link to="/" className="btn">Explore Tools</Link>
            <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
          </div>
        </div>

        <div className="ab-stats-panel">
          {stats.map((s, i) => (
            <div className="ab-stat" key={i}>
              <strong>
                {s.num}<em className="ab-suffix">{s.suffix}</em>
              </strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="ab-mission glass">
        <div className="ab-mission-label">Our Mission</div>
        <blockquote className="ab-quote">
          "Every student deserves <em className="ab-em">powerful tools</em> — not
          paywalls, not subscriptions, not distractions."
        </blockquote>
        <div className="ab-mission-bar" />
      </section>

      {/* STORY */}
      <section className="ab-section glass">
        <h2 className="ab-h2">How SparkDesk Started</h2>

        <div className="ab-story-grid">
          <div className="ab-story-text">
            <p>
              It started the night before finals. Three tabs open: one to calculate GPA,
              one to format a resume, one to create flashcards. Each site either had a
              paywall, was full of ads, or was outdated.
            </p>

            <p>
              We thought: what if one platform had everything a student actually needs —
              clean, fast, and completely free?
            </p>

            <p>
              That idea became SparkDesk. We built the first version in a weekend and
              shared it with classmates. The response was immediate.
            </p>

            <p>
              Today, SparkDesk (sparkdesk.online) is used by students across universities
              worldwide and keeps growing every day with student feedback.
            </p>
          </div>

          <div className="ab-timeline glass">
            <h4 className="ab-timeline-title">Timeline</h4>

            {timeline.map((t, i) => (
              <div className="ab-tl-item" key={i}>
                <div className="ab-tl-dot" />
                <div>
                  <strong className="ab-tl-year">{t.year}</strong>
                  <span className="ab-tl-label"> — {t.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="ab-section">
        <div className="ab-section-head">
          <span className="section-tag">What's Inside</span>
          <h2 className="ab-h2">Every tool you need</h2>
          <p className="muted">All your academic tools in one clean dashboard.</p>
        </div>

        <div className="ab-tools-grid">
          {tools.map((t, i) => (
            <div className="ab-tool glass" key={i}>
              <div className="tool-icon">{t.icon}</div>
              <h4>{t.title}</h4>
              <p className="muted" style={{ fontSize: ".87rem" }}>
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="ab-section">
        <div className="ab-section-head">
          <span className="section-tag">Our Values</span>
          <h2 className="ab-h2">What we stand for</h2>
        </div>

        <div className="ab-values-grid">
          {values.map((v, i) => (
            <div className="ab-value glass" key={i}>
              <div className="ab-value-icon">{v.icon}</div>
              <h4>{v.title}</h4>
              <p className="muted" style={{ fontSize: ".87rem" }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <div className="ab-cta-inner">
          <span className="section-tag">Get Started</span>

          <h2 className="ab-h2" style={{ color: "#fff", marginTop: 10 }}>
            Ready to spark your productivity?
          </h2>

          <p style={{ color: "rgba(255,255,255,.65)", marginBottom: 28 }}>
            Join thousands of students already using SparkDesk (sparkdesk.online) —
            free, forever.
          </p>

          <div className="btn-row" style={{ justifyContent: "center" }}>
            <Link to="/" className="btn">Explore the Tools</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>

    </main>
  );
}