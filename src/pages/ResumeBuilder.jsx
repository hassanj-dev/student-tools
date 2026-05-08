import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import SEO from "../components/SEO";

/* ─── helpers ─── */
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const SKILL_COLORS = [
  "#6d28d9", "#0ea5e9", "#10b981", "#f59e0b",
  "#ef4444", "#8b5cf6", "#06b6d4", "#84cc16",
];

export default function ResumeBuilder() {
  const previewRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const [form, setForm] = useState({
    name: "Your Name",
    title: "Student / Developer",
    email: "you@gmail.com",
    phone: "+92 300 0000000",
    location: "Lahore, Pakistan",
    linkedin: "linkedin.com/in/yourname",
    summary:
      "Motivated student with strong communication and problem-solving skills. Passionate about building great software and delivering impactful solutions.",
    skills: "React, JavaScript, HTML, CSS, Node.js, Git",
    education: "BS Computer Science — University Name, 2022–2026",
    experience:
      "Frontend Developer Intern — Company Name (Jun 2024 – Aug 2024)\n• Built responsive UI components using React & Tailwind CSS.\n• Improved page load speed by 30% through code splitting.\n\nCapstone Project — Project Title (Jan 2024)\n• Developed a full-stack web app used by 500+ students.",
    certifications: "AWS Cloud Practitioner · Meta Frontend Developer",
    image: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  /* ── PDF download: capture the white-bg print version ── */
  const downloadPDF = async () => {
    if (!previewRef.current || downloading) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        windowWidth: previewRef.current.scrollWidth,
        windowHeight: previewRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.height / canvas.width;
      const imgH = pageW * ratio;

      if (imgH <= pageH) {
        pdf.addImage(imgData, "PNG", 0, 0, pageW, imgH);
      } else {
        // multi-page support
        let y = 0;
        const sliceH = Math.floor((canvas.width * pageH) / pageW);
        while (y < canvas.height) {
          const sliceCanvas = document.createElement("canvas");
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = Math.min(sliceH, canvas.height - y);
          const ctx = sliceCanvas.getContext("2d");
          ctx.drawImage(canvas, 0, -y);
          if (y > 0) pdf.addPage();
          pdf.addImage(sliceCanvas.toDataURL("image/png"), "PNG", 0, 0, pageW, pageH);
          y += sliceH;
        }
      }

      pdf.save(`${form.name.replace(/\s+/g, "_")}_Resume.pdf`);
    } finally {
      setDownloading(false);
    }
  };

  const leftFields = [
    { name: "name", label: "Full Name" },
    { name: "title", label: "Job Title / Role" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    { name: "location", label: "Location" },
    { name: "linkedin", label: "LinkedIn / Website" },
    { name: "skills", label: "Skills (comma-separated)" },
    { name: "education", label: "Education" },
    { name: "certifications", label: "Certifications" },
  ];

  /* split skills into tags */
  const skillTags = form.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  /* split experience lines */
  const expLines = form.experience.split("\n");

  return (
    <>
      <SEO
        title="Resume Builder | SparkDesk"
        description="Create professional resume and download PDF for free"
      />

      <main className="page two-col rb-layout">
        {/* ═══ FORM PANEL ═══ */}
        <section className="card form-card glass rb-form-panel">
          <div className="rb-form-header">
            <span className="rb-form-icon">📄</span>
            <div>
              <h2 style={{ margin: 0 }}>Resume Builder</h2>
              <p className="muted" style={{ margin: "4px 0 0" }}>
                Fill in your details — preview updates live
              </p>
            </div>
          </div>

          {/* Profile Image */}
          <div className="rb-image-upload-area">
            {form.image ? (
              <img src={form.image} alt="Profile" className="rb-img-thumb" />
            ) : (
              <div className="rb-img-placeholder">
                <span>👤</span>
                <p>Upload Photo</p>
              </div>
            )}
            <label className="rb-img-label">
              {form.image ? "Change Photo" : "Choose Photo"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                style={{ display: "none" }}
              />
            </label>
          </div>

          {/* Fields grid */}
          <div className="form-grid rb-form-grid">
            {leftFields.map(({ name, label }) => (
              <label key={name} className={name === "skills" || name === "education" || name === "certifications" ? "span-2" : ""}>
                {label}
                <input name={name} value={form[name]} onChange={handleChange} />
              </label>
            ))}
          </div>

          <label style={{ marginTop: 4 }}>
            Summary
            <textarea
              name="summary"
              rows={3}
              value={form.summary}
              onChange={handleChange}
            />
          </label>

          <label style={{ marginTop: 12 }}>
            Experience{" "}
            <span className="muted" style={{ fontWeight: 400, fontSize: "0.78rem" }}>
              (use new lines — start bullets with •)
            </span>
            <textarea
              name="experience"
              rows={6}
              value={form.experience}
              onChange={handleChange}
              style={{ fontFamily: "monospace", fontSize: "0.85rem" }}
            />
          </label>

          <button
            className="btn rb-download-btn"
            onClick={downloadPDF}
            disabled={downloading}
            style={{ marginTop: 20, width: "100%" }}
          >
            {downloading ? (
              <>
                <span className="rb-spinner" /> Generating PDF…
              </>
            ) : (
              <>⬇ Download PDF Resume</>
            )}
          </button>
        </section>

        {/* ═══ RESUME PREVIEW ═══ */}
        <div className="rb-preview-wrap">
          <p className="rb-preview-label muted">Live Preview</p>

          <div className="rb-resume-page" ref={previewRef}>
            {/* Sidebar strip */}
            <div className="rb-sidebar">
              {form.image && (
                <img src={form.image} alt="Profile" className="rb-profile-img" />
              )}

              <div className="rb-contact-section">
                <div className="rb-section-title">CONTACT</div>
                {form.email && (
                  <div className="rb-contact-row">
                    <span className="rb-ci">✉</span>
                    <span>{form.email}</span>
                  </div>
                )}
                {form.phone && (
                  <div className="rb-contact-row">
                    <span className="rb-ci">📞</span>
                    <span>{form.phone}</span>
                  </div>
                )}
                {form.location && (
                  <div className="rb-contact-row">
                    <span className="rb-ci">📍</span>
                    <span>{form.location}</span>
                  </div>
                )}
                {form.linkedin && (
                  <div className="rb-contact-row">
                    <span className="rb-ci">🔗</span>
                    <span style={{ wordBreak: "break-all" }}>{form.linkedin}</span>
                  </div>
                )}
              </div>

              {skillTags.length > 0 && (
                <div className="rb-contact-section">
                  <div className="rb-section-title">SKILLS</div>
                  <div className="rb-skills-list">
                    {skillTags.map((s, i) => (
                      <span
                        key={i}
                        className="rb-skill-tag"
                        style={{ borderLeftColor: SKILL_COLORS[i % SKILL_COLORS.length] }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {form.education && (
                <div className="rb-contact-section">
                  <div className="rb-section-title">EDUCATION</div>
                  <p className="rb-sidebar-text">{form.education}</p>
                </div>
              )}

              {form.certifications && (
                <div className="rb-contact-section">
                  <div className="rb-section-title">CERTIFICATIONS</div>
                  <p className="rb-sidebar-text">{form.certifications}</p>
                </div>
              )}
            </div>

            {/* Main content */}
            <div className="rb-main">
              {/* Name block */}
              <div className="rb-name-block">
                <h1 className="rb-name">{form.name}</h1>
                <div className="rb-job-title">{form.title}</div>
                <div className="rb-name-rule" />
              </div>

              {/* Summary */}
              {form.summary && (
                <div className="rb-section">
                  <div className="rb-main-section-title">
                    <span className="rb-section-icon">◈</span> PROFESSIONAL SUMMARY
                  </div>
                  <p className="rb-body-text">{form.summary}</p>
                </div>
              )}

              {/* Experience */}
              {form.experience && (
                <div className="rb-section">
                  <div className="rb-main-section-title">
                    <span className="rb-section-icon">◈</span> EXPERIENCE
                  </div>
                  <div className="rb-exp-block">
                    {expLines.map((line, i) => {
                      if (!line.trim()) return <div key={i} style={{ height: 6 }} />;
                      if (line.startsWith("•")) {
                        return (
                          <div key={i} className="rb-bullet">
                            <span className="rb-dot">•</span>
                            <span>{line.slice(1).trim()}</span>
                          </div>
                        );
                      }
                      // looks like a heading line
                      return (
                        <div key={i} className="rb-exp-heading">
                          {line}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}