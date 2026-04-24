import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import SEO from "../components/SEO";

export default function ResumeBuilder() {
  const previewRef = useRef(null);

  const [form, setForm] = useState({
    name: "Your Name",
    title: "Student / Developer",
    email: "you@gmail.com",
    phone: "+92 300 0000000",
    summary: "Motivated student with strong communication and problem-solving skills.",
    skills: "React, JavaScript, HTML, CSS",
    education: "BS Computer Science - 2026",
    experience: "Internship / Project experience here",
    image: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
    pdf.save(`${form.name.replace(/\s+/g, "_")}_resume.pdf`);
  };

  const fields = [
    "name",
    "title",
    "email",
    "phone",
    "skills",
    "education",
    "experience",
  ];

  return (
    <>
    <SEO 
  title="Resume Builder | SparkDesk"
  description="Create professional resume and download PDF for free"
/>
    <main className="page two-col">
      {/* FORM SIDE */}
      <section className="card form-card glass">
        <h2>Resume Builder</h2>
        <p className="muted">Edit details and download PDF resume</p>

        {/* IMAGE UPLOAD */}
        <label>
          Profile Image
          <input type="file" accept="image/*" onChange={handleImage} />
        </label>

        {/* INPUT FIELDS */}
        <div className="form-grid">
          {fields.map((field) => (
            <label key={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
              />
            </label>
          ))}
        </div>

        <label>
          Summary
          <textarea
            name="summary"
            rows="5"
            value={form.summary}
            onChange={handleChange}
          />
        </label>

        <button className="btn" onClick={downloadPDF}>
          Download PDF
        </button>
      </section>

      {/* PREVIEW SIDE */}
      <section className="resume-preview glass" ref={previewRef}>
        <div className="resume-header">
          {form.image && (
            <img
              src={form.image}
              alt="Profile"
              className="resume-img"
            />
          )}
          <div>
            <h3>{form.name}</h3>
            <p>{form.title}</p>
          </div>
        </div>

        <div className="resume-block">
          <h4>Contact</h4>
          <p>{form.email}</p>
          <p>{form.phone}</p>
        </div>

        <div className="resume-block">
          <h4>Summary</h4>
          <p>{form.summary}</p>
        </div>

        <div className="resume-block">
          <h4>Skills</h4>
          <p>{form.skills}</p>
        </div>

        <div className="resume-block">
          <h4>Education</h4>
          <p>{form.education}</p>
        </div>

        <div className="resume-block">
          <h4>Experience</h4>
          <p>{form.experience}</p>
        </div>
      </section>
    </main>
    </>
  );
}