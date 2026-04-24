import React, { useState } from "react";
import SEO from "../components/SEO";

const sections = [
  {
    id: "info-collect",
    num: "01",
    title: "Information We Collect",
    content: (
      <>
        <p>
          We collect minimal information to keep SparkDesk running smoothly.
          Depending on how you interact with us, this may include:
        </p>
        <ul>
          <li>
            <strong>Contact details</strong> — name and email address when you
            send us a message via the contact form.
          </li>
          <li>
            <strong>Usage data</strong> — anonymous, aggregated statistics about
            which tools are used most (via Google Analytics).
          </li>
          <li>
            <strong>Local data</strong> — all tool data (GPA entries, flashcards,
            planner tasks, etc.) is stored <strong>only in your browser</strong>{" "}
            and never sent to our servers.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-use",
    num: "02",
    title: "How We Use Your Information",
    content: (
      <>
        <p>Any information we collect is used solely to:</p>
        <ul>
          <li>Respond to your messages or bug reports</li>
          <li>Improve and expand the SparkDesk toolset</li>
          <li>Understand which features are most useful to students</li>
        </ul>
        <p>
          We do <strong>not</strong> sell, rent, or share your information with
          third parties for marketing purposes.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    num: "03",
    title: "Cookies & Tracking",
    content: (
      <>
        <p>SparkDesk uses minimal cookies:</p>
        <ul>
          <li>
            <strong>Essential cookies</strong> — to remember your dark/light mode
            preference.
          </li>
          <li>
            <strong>Analytics cookies</strong> — anonymous usage data via Google
            Analytics to help us improve the platform.
          </li>
        </ul>
        <p>
          You can disable cookies in your browser settings at any time without
          losing access to SparkDesk's tools.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    num: "04",
    title: "Third-Party Services",
    content: (
      <>
        <p>We use a small number of trusted third-party services:</p>
        <ul>
          <li>
            <strong>Google Analytics</strong> — anonymous usage statistics (no
            personal data)
          </li>
          <li>
            <strong>Vercel / Netlify</strong> — hosting and deployment
          </li>
          <li>
            <strong>Google Fonts</strong> — typography (Sora & DM Sans)
          </li>
        </ul>
        <p>
          Each of these services has their own privacy policies which we
          encourage you to review.
        </p>
      </>
    ),
  },
  {
    id: "data-storage",
    num: "05",
    title: "Data Storage & Security",
    content: (
      <>
        <p>
          All SparkDesk tools work <strong>locally in your browser</strong>.
          Your GPA calculations, flashcards, timetable, and planner data are
          stored using your browser's local storage and never transmitted to any
          server.
        </p>
        <p>
          Our website is served over <strong>HTTPS</strong> with industry-standard
          encryption. Contact form submissions are encrypted in transit.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    num: "06",
    title: "Your Rights",
    content: (
      <>
        <p>You have full control over your data:</p>
        <ul>
          <li>
            <strong>Access</strong> — request a copy of any data we hold about you
          </li>
          <li>
            <strong>Correction</strong> — ask us to correct inaccurate information
          </li>
          <li>
            <strong>Deletion</strong> — request we delete your data at any time
          </li>
          <li>
            <strong>Portability</strong> — receive your data in a portable format
          </li>
        </ul>
        <p>
          To exercise any of these rights, email us at{" "}
          <strong>info@sparkdesk.online</strong>.
        </p>
      </>
    ),
  },
  {
    id: "children",
    num: "07",
    title: "Children's Privacy",
    content: (
      <>
        <p>
          SparkDesk is designed for students of all ages, including younger
          learners. We do not knowingly collect personal information from children
          under 13.
        </p>
        <p>
          If you believe a child under 13 has submitted personal information to us,
          please contact us immediately at{" "}
          <strong>info@sparkdesk.online</strong> and we will remove it promptly.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    num: "08",
    title: "Changes to This Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in
          our practices or legal requirements. When we do, we will:
        </p>
        <ul>
          <li>Update the "Last updated" date at the top of this page</li>
          <li>Notify users through the platform if changes are significant</li>
        </ul>
        <p>
          Continued use of SparkDesk after changes constitutes acceptance of the
          updated policy.
        </p>
      </>
    ),
  },
];

export default function Privacy() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <>
    <SEO
  title="Privacy Policy | SparkDesk"
  description="Read SparkDesk privacy policy and how your data is handled securely."
  url="https://www.sparkdesk.online/privacy"
/>
    <main className="page prv-page">

      {/* HERO */}
      <section className="prv-hero glass">
        <div>
          <span className="pill">Legal</span>
          <h1 className="ab-h1" style={{ marginTop: 14 }}>
            Privacy <em className="ab-em">Policy</em>
          </h1>

          <p className="muted" style={{ marginTop: 10, maxWidth: 500 }}>
            We believe in being completely transparent. SparkDesk is built around
            your privacy — no selling data, no tracking, no surprises.
          </p>

          <div className="prv-updated">📅 Last updated: July 1, 2025</div>
        </div>

        <div className="prv-badges">
          <div className="prv-badge">
            <span className="prv-badge-icon">🔒</span>
            <div>
              <strong>No data sold</strong>
              <p>Ever</p>
            </div>
          </div>

          <div className="prv-badge">
            <span className="prv-badge-icon">💾</span>
            <div>
              <strong>Local storage</strong>
              <p>Your device only</p>
            </div>
          </div>

          <div className="prv-badge">
            <span className="prv-badge-icon">🛡️</span>
            <div>
              <strong>HTTPS secured</strong>
              <p>Always encrypted</p>
            </div>
          </div>
        </div>
      </section>

      <div className="prv-layout">

        {/* SIDEBAR */}
        <aside className="prv-toc glass">
          <h4 className="prv-toc-title">Contents</h4>

          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`prv-toc-link ${
                activeSection === s.id ? "active" : ""
              }`}
              onClick={() => setActiveSection(s.id)}
            >
              <span className="prv-toc-num">{s.num}</span>
              {s.title}
            </a>
          ))}
        </aside>

        {/* CONTENT */}
        <div className="prv-sections">

          <div className="prv-banner glass">
            <span className="prv-banner-icon">⚡</span>
            <div>
              <strong>Short version:</strong> We don't sell your data. Your tool
              data never leaves your device. We only collect minimal contact info
              when you reach out to us.
            </div>
          </div>

          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="prv-section glass"
              onMouseEnter={() => setActiveSection(s.id)}
            >
              <div className="prv-section-head">
                <span className="prv-num">{s.num}</span>
                <h2 className="prv-h2">{s.title}</h2>
              </div>
              <div className="prv-body">{s.content}</div>
            </section>
          ))}

          {/* CONTACT */}
          <div className="prv-contact glass">
            <div className="prv-contact-icon">📩</div>
            <h3>Questions about your privacy?</h3>
            <p className="muted">
              We take privacy seriously and respond to all inquiries within 48
              hours.
            </p>

            <a
              href="mailto:info@sparkdesk.online"
              className="btn"
              style={{ marginTop: 16, display: "inline-block" }}
            >
              info@sparkdesk.online
            </a>
          </div>

        </div>
      </div>
    </main>
    </>
  );
}