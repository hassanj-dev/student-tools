// ResumeBuilder.jsx

import { useMemo, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import SEO from "../components/SEO";

const ACCENTS = {
  purple: "#8b5cf6",
  blue: "#0ea5e9",
  emerald: "#10b981",
  red: "#ef4444",
};

const TEMPLATES = {
  modern: {
    sidebar:
      "linear-gradient(180deg,#111827 0%,#0f172a 40%,#020617 100%)",
    pageBg: "#ffffff",
    heading: "#7c3aed",
    line:
      "linear-gradient(90deg,#8b5cf6,#0ea5e9,transparent)",
  },

  minimal: {
    sidebar: "#f8fafc",
    pageBg: "#ffffff",
    heading: "#111827",
    line:
      "linear-gradient(90deg,#111827,#cbd5e1,transparent)",
  },

  dark: {
    sidebar:
      "linear-gradient(180deg,#020617,#0f172a,#111827)",
    pageBg: "#0f172a",
    heading: "#ffffff",
    line:
      "linear-gradient(90deg,#8b5cf6,#38bdf8,transparent)",
  },

  ats: {
    sidebar: "#ffffff",
    pageBg: "#ffffff",
    heading: "#111827",
    line:
      "linear-gradient(90deg,#111827,#e5e7eb,transparent)",
  },
};

export default function ResumeBuilder() {

  const previewRef = useRef(null);

  const [downloading, setDownloading] = useState(false);

  const [template, setTemplate] = useState("modern");

  const [accent, setAccent] = useState("#8b5cf6");

  const [form, setForm] = useState({
    name: "Your Name",
    title: "Frontend Developer",
    email: "you@gmail.com",
    phone: "+1 300 0000",
    location: "Berlin, Germany",
    linkedin: "linkedin.com/in/yourname",

    summary:
      "Frontend developer passionate about building beautiful user experiences with React and modern web technologies.",

    skills:
      "React:90, JavaScript:85, HTML/CSS:95, Tailwind:90, Node.js:70",

    education:
      "BS Computer Science — Superior University (2022 – 2026)",

    experience:
      "Frontend Developer Intern — SparkDesk\n• Built responsive UI using React\n• Improved website performance by 30%\n\nFreelance Designer\n• Created branding and social media designs for local businesses",

    certifications:
      "Meta Frontend Developer · Google UX",

    image: "",
  });

  const currentTemplate = TEMPLATES[template];

  const handleChange = (e) => {
    setForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setForm((p) => ({
        ...p,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const skills = useMemo(() => {
    return form.skills
      .split(",")
      .map((item) => {
        const [name, level] = item.split(":");

        return {
          name: name?.trim(),
          level: Number(level || 80),
        };
      });
  }, [form.skills]);

  const expLines = form.experience.split("\n");

  const getFontScale = () => {

    const total =
      form.summary.length +
      form.experience.length;

    if (total > 1300) return 0.88;

    if (total > 900) return 0.94;

    return 1;
  };

  const scale = getFontScale();

  const downloadPDF = async () => {

    if (!previewRef.current || downloading) return;

    setDownloading(true);

    try {

      const canvas = await html2canvas(
        previewRef.current,
        {
          scale: 2.5,
          useCORS: true,
          backgroundColor: "#ffffff",
        }
      );

      const imgData =
        canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [794, 1123],
      });

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        794,
        1123
      );

      pdf.save(
        `${form.name.replace(/\s+/g, "_")}.pdf`
      );

    } catch (err) {

      console.error(err);

    } finally {

      setDownloading(false);
    }
  };

  const downloadPNG = async () => {

    const canvas = await html2canvas(
      previewRef.current,
      {
        scale: 3,
        useCORS: true,
      }
    );

    const link = document.createElement("a");

    link.download = "resume.png";

    link.href = canvas.toDataURL();

    link.click();
  };

  const printResume = () => {
    window.print();
  };

  const S = {

    page: {
      display: "grid",
      gridTemplateColumns: "240px 1fr",
      width: "794px",
      minHeight: "1123px",
      background: currentTemplate.pageBg,
      overflow: "hidden",
      borderRadius: "18px",
      boxShadow:
        "0 30px 90px rgba(0,0,0,0.20)",
      fontFamily: "'Inter', sans-serif",
    },

    sidebar: {
      background: currentTemplate.sidebar,
      padding: "28px 22px",
      color:
        template === "minimal" ||
        template === "ats"
          ? "#111827"
          : "#ffffff",
    },

    main: {
      padding: "38px",
      background: currentTemplate.pageBg,
      color:
        template === "dark"
          ? "#e2e8f0"
          : "#111827",
    },

    profile: {
      width: "104px",
      height: "104px",
      borderRadius: "50%",
      objectFit: "cover",
      margin: "0 auto 20px",
      border: `4px solid ${accent}`,
    },

    name: {
      fontSize: `${34 * scale}px`,
      fontWeight: 800,
      marginBottom: "8px",
      color:
        template === "dark"
          ? "#ffffff"
          : "#111827",
    },

    title: {
      color: accent,
      fontWeight: 700,
      fontSize: `${13 * scale}px`,
      textTransform: "uppercase",
      letterSpacing: "0.12em",
      marginBottom: "18px",
    },

    line: {
      height: "4px",
      borderRadius: "999px",
      background: currentTemplate.line,
      marginBottom: "24px",
    },

    sectionTitle: {
      fontSize: "11px",
      fontWeight: 800,
      letterSpacing: "0.14em",
      marginBottom: "10px",
      color: accent,
    },

    body: {
      fontSize: `${12 * scale}px`,
      lineHeight: "1.8",
      color:
        template === "dark"
          ? "#cbd5e1"
          : "#475569",
    },
  };

  return (
    <>
      <SEO
        title="Resume Builder | SparkDesk"
        description="Create professional resumes instantly."
      />

      <main className="page rb-layout">

        {/* LEFT PANEL */}

        <section className="card glass rb-form-panel">

          <div className="rb-topbar">

            <div>
              <h2>Resume Builder</h2>
              <p>
                Create modern professional resumes
              </p>
            </div>

            <div className="rb-template-row">

              {Object.keys(TEMPLATES).map((t) => (
                <button
                  key={t}
                  className={`rb-chip ${
                    template === t
                      ? "active"
                      : ""
                  }`}
                  onClick={() => setTemplate(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* ACCENT COLORS */}

          <div className="rb-color-row">

            {Object.values(ACCENTS).map((c) => (
              <button
                key={c}
                className="rb-color"
                style={{
                  background: c,
                  outline:
                    accent === c
                      ? "3px solid #fff"
                      : "none",
                }}
                onClick={() => setAccent(c)}
              />
            ))}
          </div>

          {/* IMAGE */}

          <div className="rb-upload">

            {form.image ? (
              <img
                src={form.image}
                alt=""
                className="rb-upload-img"
              />
            ) : (
              <div className="rb-upload-placeholder">
                👤
              </div>
            )}

            <label className="rb-upload-btn">
              Upload Photo

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />
            </label>
          </div>

          {/* FORM */}

          <div className="form-grid rb-grid">

            {[
              ["name", "Full Name"],
              ["title", "Job Title"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["location", "Location"],
              ["linkedin", "LinkedIn"],
            ].map(([n, l]) => (
              <label key={n}>
                {l}

                <input
                  name={n}
                  value={form[n]}
                  onChange={handleChange}
                />
              </label>
            ))}

            {[
              ["education", "Education"],
              ["skills", "Skills"],
              [
                "certifications",
                "Certifications",
              ],
            ].map(([n, l]) => (
              <label
                key={n}
                className="span-2"
              >
                {l}

                <input
                  name={n}
                  value={form[n]}
                  onChange={handleChange}
                />
              </label>
            ))}
          </div>

          <label>
            Summary

            <textarea
              rows={4}
              name="summary"
              value={form.summary}
              onChange={handleChange}
            />
          </label>

          <label>
            Experience

            <textarea
              rows={7}
              name="experience"
              value={form.experience}
              onChange={handleChange}
            />
          </label>

          {/* DOWNLOAD BUTTONS */}

          <div className="rb-download-row">

            <button
              className="btn"
              onClick={downloadPDF}
            >
              PDF
            </button>

            <button
              className="btn secondary"
              onClick={downloadPNG}
            >
              PNG
            </button>

            <button
              className="btn secondary"
              onClick={printResume}
            >
              Print
            </button>
          </div>
        </section>

        {/* RIGHT PREVIEW */}

        <section className="rb-preview-wrap">

          <div className="rb-preview-scroll">

            <div
              ref={previewRef}
              style={S.page}
            >

              {/* SIDEBAR */}

              <aside style={S.sidebar}>

                {form.image && (
                  <img
                    src={form.image}
                    alt=""
                    style={S.profile}
                  />
                )}

                <div className="rb-side-section">

                  <div style={S.sectionTitle}>
                    CONTACT
                  </div>

                  <p>{form.email}</p>
                  <p>{form.phone}</p>
                  <p>{form.location}</p>
                  <p>{form.linkedin}</p>
                </div>

                <div className="rb-side-section">

                  <div style={S.sectionTitle}>
                    SKILLS
                  </div>

                  {skills.map((s, i) => (
                    <div
                      key={i}
                      className="rb-skill"
                    >
                      <div className="rb-skill-top">
                        <span>{s.name}</span>
                        <span>{s.level}%</span>
                      </div>

                      <div className="rb-skill-bar">
                        <div
                          className="rb-skill-fill"
                          style={{
                            width: `${s.level}%`,
                            background: accent,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rb-side-section">

                  <div style={S.sectionTitle}>
                    EDUCATION
                  </div>

                  <p>{form.education}</p>
                </div>

                <div className="rb-side-section">

                  <div style={S.sectionTitle}>
                    CERTIFICATIONS
                  </div>

                  <p>{form.certifications}</p>
                </div>
              </aside>

              {/* MAIN */}

              <main style={S.main}>

                <div style={S.name}>
                  {form.name}
                </div>

                <div style={S.title}>
                  {form.title}
                </div>

                <div style={S.line} />

                <section>

                  <div style={S.sectionTitle}>
                    PROFESSIONAL SUMMARY
                  </div>

                  <div style={S.body}>
                    {form.summary}
                  </div>
                </section>

                <section
                  style={{ marginTop: 26 }}
                >

                  <div style={S.sectionTitle}>
                    EXPERIENCE
                  </div>

                  {expLines.map((line, i) => {

                    if (!line.trim()) {
                      return (
                        <div
                          key={i}
                          style={{ height: 10 }}
                        />
                      );
                    }

                    if (line.startsWith("•")) {

                      return (
                        <div
                          key={i}
                          className="rb-bullet"
                        >
                          <span>•</span>

                          <span>
                            {line.slice(1)}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={i}
                        className="rb-exp-heading"
                        style={{
                          borderLeft: `4px solid ${accent}`,
                        }}
                      >
                        {line}
                      </div>
                    );
                  })}
                </section>
              </main>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}