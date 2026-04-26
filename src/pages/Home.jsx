import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";

const tools = [
  {
    title: "GPA Calculator",
    description: "Calculate your GPA and CGPA instantly.",
    to: "/gpa",
    icon: "📊",
    color: "t1",
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes in minutes.",
    to: "/resume",
    icon: "📄",
    color: "t2",
  },
  {
    title: "Flashcards",
    description: "Create smart flashcards and study better.",
    to: "/flashcards",
    icon: "🧠",
    color: "t3",
  },
  {
    title: "Timetable Planner",
    description: "Plan your schedule and stay organized.",
    to: "/timetable",
    icon: "🗓️",
    color: "t4",
  },
  {
    title: "Notes App",
    description: "Write, organize, and manage your notes.",
    to: "/notesapp",
    icon: "📝",
    color: "t5",
  },
  {
    title: "Unit Converter",
    description: "Convert lengths, weights, temperature and more.",
    to: "/unitconverter",
    icon: "🔄",
    color: "t6",
  },
];

const trustItems = [
  { icon: "✅", label: "100% Free", sub: "All tools are free forever", color: "green" },
  { icon: "🛡️", label: "No Signup", sub: "No login or registration", color: "blue" },
  { icon: "🎓", label: "Built for Students", sub: "Designed for your needs", color: "purple" },
  { icon: "⚡", label: "Fast & Lightweight", sub: "Instant results, always", color: "yellow" },
];

const whyItems = [
  { title: "Save hours of manual work", desc: "Automate repetitive academic tasks instantly." },
  { title: "All-in-one toolkit for students", desc: "GPA, resume, notes, timers — everything in one place." },
  { title: "No login or personal information", desc: "Use all tools without creating an account." },
  { title: "Clean, ad-light and distraction-free", desc: "Focus on studying, not on clutter." },
  { title: "Works on all devices, anywhere", desc: "Fully responsive — desktop, tablet, or mobile." },
];

const steps = [
  { n: "1", icon: "🔲", title: "Open a Tool", desc: "Choose any tool you want to use.", color: "s1" },
  { n: "2", icon: "✏️", title: "Enter Your Data", desc: "Add your details or information.", color: "s2" },
  { n: "3", icon: "✅", title: "Get Instant Results", desc: "Get accurate results in seconds.", color: "s3" },
];

export default function Home() {
  return (
    <>
      <SEO title="SparkDesk | Free Student Tools Platform" />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "SparkDesk",
            url: "https://www.sparkdesk.online",
            description:
              "Free student tools platform with calculators, flashcards, resume builder, pomodoro timer and more.",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://www.sparkdesk.online/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
      </Helmet>

      <div className="home-page">

        {/* ── HERO ── */}
        <section className="hero-section">

          {/* LEFT — Text */}
          <div className="hero-content">
            <div className="hero-pill">
              <span className="dot" />
              All-in-one student toolkit
            </div>

            <h1 className="hero-heading">
              All-in-One Student <br />
              <span className="highlight">Productivity Toolkit</span>
            </h1>

            <p className="hero-subtext">
              Free, fast and easy-to-use tools to help you calculate, plan,
              create and achieve more in your studies.
            </p>

            <div className="hero-ctas">
              <Link to="/gpa" className="btn-primary">
                Explore Tools →
              </Link>
              <Link to="/resume" className="btn-outline">
                Build Resume 📄
              </Link>
            </div>

            <div className="hero-trust">
              <div className="trust-avatars">
                <span>AK</span>
                <span>SL</span>
                <span>MR</span>
              </div>
              <span>Trusted by 10,000+ students across the world 🌍</span>
            </div>
          </div>

          {/* RIGHT — Dashboard Mock */}
          <div className="hero-visual">
            {/* Floating icons */}
            <span className="float-icon">🎓</span>
            <span className="float-icon">📈</span>
            <span className="float-icon">📝</span>
            <span className="float-icon">⏱️</span>

            <div className="dashboard-mock">
              <div className="mock-header">
                <span className="mock-dot red" />
                <span className="mock-dot yellow" />
                <span className="mock-dot green" />
                <span className="mock-title">SparkDesk Dashboard</span>
              </div>

              <div className="mock-welcome">
                <h4>Welcome back! 👋</h4>
                <p>What do you want to do today?</p>
              </div>

              <div className="mock-cards">
                <div className="mock-card">
                  <div className="mock-card-icon icon-green">📊</div>
                  <h5>GPA Calculator</h5>
                  <p>Calculate your GPA</p>
                  <span className="mock-rating">★ 4.9/5</span>
                </div>
                <div className="mock-card">
                  <div className="mock-card-icon icon-blue">📄</div>
                  <h5>Resume Builder</h5>
                  <p>Create a professional resume</p>
                  <span className="mock-rating">★ 4.8/5</span>
                </div>
                <div className="mock-card">
                  <div className="mock-card-icon icon-purple">🧠</div>
                  <h5>Flashcards</h5>
                  <p>Smart flashcards</p>
                  <span className="mock-rating">★ 4.9/5</span>
                </div>
              </div>

              <div className="mock-progress">
                <div className="mock-progress-label">
                  <span>Your Progress</span>
                  <span>73%</span>
                </div>
                <div className="mock-progress-bar">
                  <div className="mock-progress-fill" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <div className="trust-strip">
          <div className="trust-strip-inner">
            {trustItems.map((item) => (
              <div className="trust-item" key={item.label}>
                <div className={`trust-icon-wrap ${item.color}`}>
                  {item.icon}
                </div>
                <div className="trust-item-text">
                  <strong>{item.label}</strong>
                  <span>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOLS GRID ── */}
        <section className="section">
          <div className="section-header">
            <h2>Explore Tools</h2>
            <p>Everything you need in one place</p>
          </div>

          <div className="tools-grid">
            {tools.map((tool) => (
              <Link to={tool.to} className="tool-card-new" key={tool.to}>
                <div className={`tool-icon-wrap ${tool.color}`}>
                  {tool.icon}
                </div>
                <div className="tool-card-body">
                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                </div>
                <div className="tool-card-arrow">→</div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── WHY SPARKDESK ── */}
        <section className="section section-alt">
          <div className="why-section">
            <div className="why-content">
              <h2>
                Why Students Love{" "}
                <span>Spark<span style={{ color: "var(--primary)" }}>Desk</span></span>
              </h2>

              <div className="why-list">
                {whyItems.map((item) => (
                  <div className="why-item" key={item.title}>
                    <div className="why-check">✓</div>
                    <div className="why-item-text">
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="why-visual">
              <div className="why-illustration">
                <div className="why-illustration-inner">🧑‍💻</div>
                <div className="why-chips">
                  <span className="chip">GPA ✓</span>
                  <span className="chip">Resume ✓</span>
                  <span className="chip">Notes ✓</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="section">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple, fast and effective</p>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <div className="step" key={step.n}>
                <div className={`step-number ${step.color}`}>
                  <span style={{ fontSize: "2rem" }}>{step.icon}</span>
                  <span className="step-num-badge">{step.n}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="cta-banner">
          <div className="cta-banner-content">
            <h2>Start using free student tools today</h2>
            <p>Simple tools. Better studies. Brighter future.</p>
            <Link to="/gpa" className="btn-white">
              Explore SparkDesk →
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}