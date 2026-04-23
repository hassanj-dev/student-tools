import React, { useState } from "react";
import { Link } from "react-router-dom";

const terms = [
  {
    num: "01", title: "Acceptance of Terms",
    content: (
      <>
        <p>By accessing or using SparkDesk, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our platform.</p>
        <p>These terms apply to all visitors, users, and anyone who accesses SparkDesk's tools and services.</p>
      </>
    ),
  },
  {
    num: "02", title: "Permitted Use",
    content: (
      <>
        <p>SparkDesk is provided for personal, educational, and non-commercial use. You may:</p>
        <ul>
          <li>Use all tools freely for academic and personal purposes</li>
          <li>Share SparkDesk with classmates, friends, and educators</li>
          <li>Provide feedback and feature requests</li>
        </ul>
      </>
    ),
  },
  {
    num: "03", title: "Prohibited Activities",
    content: (
      <>
        <p>You agree not to engage in any of the following:</p>
        <ul>
          <li>Attempting to reverse-engineer, hack, or compromise the platform</li>
          <li>Using automated bots or scrapers to access SparkDesk</li>
          <li>Copying or redistributing SparkDesk's code or design without permission</li>
          <li>Using the platform for any illegal or harmful purpose</li>
          <li>Impersonating SparkDesk or its team members</li>
        </ul>
      </>
    ),
  },
  {
    num: "04", title: "Intellectual Property",
    content: (
      <>
        <p>All content, design, code, and branding on SparkDesk — including the name "SparkDesk," logo, and tool designs — are the intellectual property of SparkDesk and protected under applicable laws.</p>
        <p>You may not reproduce, distribute, or create derivative works from SparkDesk's content without express written permission.</p>
      </>
    ),
  },
  {
    num: "05", title: "Disclaimer of Warranties",
    content: (
      <>
        <p>SparkDesk is provided <strong>"as is"</strong> without any warranties, expressed or implied. We do not guarantee:</p>
        <ul>
          <li>Uninterrupted or error-free service</li>
          <li>The accuracy of GPA calculations or any output</li>
          <li>Compatibility with all devices or browsers</li>
        </ul>
        <p>Always verify important calculations (like GPA) with your institution.</p>
      </>
    ),
  },
  {
    num: "06", title: "Limitation of Liability",
    content: (
      <>
        <p>SparkDesk and its creators shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of — or inability to use — our platform.</p>
        <p>This includes, but is not limited to, academic decisions made based on tool outputs.</p>
      </>
    ),
  },
  {
    num: "07", title: "Changes to Terms",
    content: (
      <>
        <p>We may update these Terms of Use from time to time. We will notify users of significant changes by updating the date at the top of this page.</p>
        <p>Continued use of SparkDesk after changes take effect constitutes acceptance of the new terms.</p>
      </>
    ),
  },
  {
    num: "08", title: "Contact",
    content: (
      <>
        <p>For any questions regarding these Terms of Use, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> hello@sparkdesk.app</li>
          <li><strong>Contact form:</strong> <Link to="/contact" style={{ color: "var(--primary)" }}>sparkdesk.app/contact</Link></li>
        </ul>
      </>
    ),
  },
];

export default function Terms() {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <main className="page prv-page">

      {/* ── HERO ── */}
      <section className="prv-hero glass">
        <div>
          <span className="pill">Legal</span>
          <h1 className="ab-h1" style={{ marginTop: 14 }}>
            Terms of <em className="ab-em">Use</em>
          </h1>
          <p className="muted" style={{ marginTop: 10, maxWidth: 500 }}>
            Please read these terms carefully before using SparkDesk. By using our platform, you agree to these terms.
          </p>
          <div className="prv-updated">
            📅 Effective: January 1, 2025
          </div>
        </div>

        <div className="prv-badges">
          <div className="prv-badge">
            <span className="prv-badge-icon">✅</span>
            <div><strong>Free to use</strong><p>No fees ever</p></div>
          </div>
          <div className="prv-badge">
            <span className="prv-badge-icon">📚</span>
            <div><strong>Educational</strong><p>Students first</p></div>
          </div>
          <div className="prv-badge">
            <span className="prv-badge-icon">⚖️</span>
            <div><strong>Fair & clear</strong><p>Simple terms</p></div>
          </div>
        </div>
      </section>

      <div className="prv-layout">

        {/* ── TOC ── */}
        <aside className="prv-toc glass">
          <h4 className="prv-toc-title">Contents</h4>
          {terms.map((t, i) => (
            <a
              key={i}
              href={`#term-${i}`}
              className={`prv-toc-link ${activeIdx === i ? "active" : ""}`}
              onClick={() => setActiveIdx(i)}
            >
              <span className="prv-toc-num">{t.num}</span>
              {t.title}
            </a>
          ))}
        </aside>

        {/* ── TERMS ── */}
        <div className="prv-sections">

          <div className="prv-banner glass">
            <span className="prv-banner-icon">💡</span>
            <div>
              <strong>Plain English summary:</strong> Use SparkDesk for studying. Don't hack it, copy it, or misuse it. We're not liable for academic decisions — always verify with your institution.
            </div>
          </div>

          {terms.map((t, i) => (
            <section
              key={i}
              id={`term-${i}`}
              className="prv-section glass"
              onMouseEnter={() => setActiveIdx(i)}
            >
              <div className="prv-section-head">
                <span className="prv-num">{t.num}</span>
                <h2 className="prv-h2">{t.title}</h2>
              </div>
              <div className="prv-body">{t.content}</div>
            </section>
          ))}

          <div className="prv-contact glass">
            <div className="prv-contact-icon">⚖️</div>
            <h3>Questions about these terms?</h3>
            <p className="muted">We keep things simple and student-friendly. Reach out anytime.</p>
            <Link to="/contact" className="btn" style={{ marginTop: 16, display: "inline-block" }}>
              Contact Us
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}