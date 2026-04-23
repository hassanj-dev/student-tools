import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const contactInfo = [
  { icon: "✉️", label: "General",  value: "hello@sparkdesk.app" },
  { icon: "🐛", label: "Bug Reports", value: "bugs@sparkdesk.app" },
  { icon: "⏱️", label: "Response Time", value: "Within 48 hours" },
  { icon: "📍", label: "Location",  value: "Online — worldwide" },
];

const faqs = [
  { q: "Is SparkDesk free?",       a: "Yes, 100% free. No hidden charges, ever." },
  { q: "Is my data saved online?", a: "No — everything stays on your device locally." },
  { q: "Can I request a feature?", a: "Absolutely! Use the form and select 'Feature Request'." },
  { q: "Do you have an app?",      a: "It's fully mobile-friendly — works great in your browser." },
];

export default function Contact() {
  const [form, setForm]   = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [open, setOpen]   = useState(null);

  const handle = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const submit = () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill all fields."); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Invalid email address."); return;
    }
    setSent(true);
    toast.success("Message sent!");
  };

  return (
    <main className="page contact-page">

      {/* ── HERO ── */}
      <section className="ct-hero glass">
        <div>
          <span className="pill">Contact Us</span>
          <h1 className="ab-h1" style={{ marginTop: 14 }}>
            We'd love to <em className="ab-em">hear</em> from you
          </h1>
          <p className="muted" style={{ marginTop: 10, maxWidth: 480 }}>
            Have a question, bug report, or feature idea? We read every single message and reply within 48 hours.
          </p>
        </div>
        <div className="ct-hero-badges">
          <div className="ct-badge"><span>📬</span> We read every message</div>
          <div className="ct-badge"><span>⚡</span> Fast responses</div>
          <div className="ct-badge"><span>🔒</span> Private & secure</div>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <div className="ct-grid">

        {/* FORM */}
        <div className="card glass ct-form-card">
          {!sent ? (
            <>
              <h2 style={{ marginTop: 0, marginBottom: 6 }}>Send a message</h2>
              <p className="muted" style={{ marginBottom: 24, fontSize: ".9rem" }}>
                Fill in the form and we'll get back to you soon.
              </p>

              <div className="form-grid">
                <label>
                  Your Name
                  <input id="name" placeholder="e.g. Ali Hassan" onChange={handle} />
                </label>
                <label>
                  Email Address
                  <input id="email" type="email" placeholder="you@email.com" onChange={handle} />
                </label>
              </div>

              <label style={{ marginBottom: 14, display: "flex", flexDirection: "column", gap: 7, fontWeight: 600, fontSize: ".92rem" }}>
                Subject
                <select id="subject" onChange={handle}>
                  <option value="">Select a topic…</option>
                  <option value="bug">🐛 Bug Report</option>
                  <option value="feature">💡 Feature Request</option>
                  <option value="general">💬 General Inquiry</option>
                  <option value="feedback">⭐ Feedback</option>
                </select>
              </label>

              <label style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 7, fontWeight: 600, fontSize: ".92rem" }}>
                Message
                <textarea
                  id="message"
                  className="textarea"
                  placeholder="Tell us anything — we're listening…"
                  onChange={handle}
                />
              </label>

              <button className="btn" style={{ width: "100%" }} onClick={submit}>
                Send Message →
              </button>
            </>
          ) : (
            <div className="ct-success">
              <div className="ct-success-icon">✓</div>
              <h3>Message sent!</h3>
              <p className="muted">We'll reply to <strong>{form.email}</strong> within 48 hours.</p>
              <button className="btn btn-secondary" style={{ marginTop: 20 }} onClick={() => setSent(false)}>
                Send another
              </button>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <div className="ct-sidebar">

          {/* Contact info */}
          <div className="card glass" style={{ marginBottom: 16 }}>
            <h3 style={{ marginTop: 0, marginBottom: 18 }}>Contact Info</h3>
            {contactInfo.map((c, i) => (
              <div className="ct-info-row" key={i}>
                <div className="ct-info-icon">{c.icon}</div>
                <div>
                  <div className="ct-info-label">{c.label}</div>
                  <div className="ct-info-value">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ accordion */}
          <div className="card glass">
            <h3 style={{ marginTop: 0, marginBottom: 16 }}>FAQ</h3>
            {faqs.map((f, i) => (
              <div className="ct-faq-item" key={i}>
                <button
                  className="ct-faq-q"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="ct-faq-arrow">{open === i ? "▲" : "▼"}</span>
                </button>
                {open === i && (
                  <div className="ct-faq-a">{f.a}</div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

    </main>
  );
}