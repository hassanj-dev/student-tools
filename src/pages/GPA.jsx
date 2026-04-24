import { useState } from "react";
import toast from "react-hot-toast";
import SEO from "../components/SEO";

const defaultRow = { name: "", marks: "", credit: "" };

function getGradePoint(marks) {
  if (marks >= 85) return 4.0;
  if (marks >= 80) return 3.7;
  if (marks >= 75) return 3.3;
  if (marks >= 70) return 3.0;
  if (marks >= 65) return 2.7;
  if (marks >= 60) return 2.3;
  if (marks >= 55) return 2.0;
  if (marks >= 50) return 1.7;
  return 0.0;
}

export default function GPA() {
  const [subjects, setSubjects] = useState([defaultRow]);
  const [result, setResult] = useState(null);

  const updateSubject = (index, field, value) => {
    const copy = [...subjects];
    copy[index] = { ...copy[index], [field]: value };
    setSubjects(copy);
  };

  const addSubject = () => setSubjects((prev) => [...prev, defaultRow]);
  const removeSubject = (index) => setSubjects((prev) => prev.filter((_, i) => i !== index));

  const calculateCGPA = () => {
    let totalCredits = 0;
    let totalPoints = 0;

    for (const sub of subjects) {
      if (!sub.marks || !sub.credit) {
        toast.error("Please fill in all fields.");
        return;
      }

      const marks = Number(sub.marks);
      const credit = Number(sub.credit);
      const gradePoint = getGradePoint(marks);

      totalCredits += credit;
      totalPoints += credit * gradePoint;
    }

    if (!totalCredits) {
      toast.error("Credit hours cannot be zero.");
      return;
    }

    const cgpa = totalPoints / totalCredits;
    setResult({ cgpa: cgpa.toFixed(2), totalCredits });
    toast.success("CGPA calculated successfully.");
  };

  return (
    <>
    <SEO 
  title="GPA Calculator | SparkDesk"
  description="Calculate GPA easily with SparkDesk free GPA calculator"
/>
   
    <main className="page">
      <section className="card glass gpa-card">
        <div className="gpa-header">
          <div>
            <span className="section-tag">GPA Calculator</span>
            <h2>Credit-based CGPA system</h2>
            <p className="muted">Add subjects, marks, and credit hours to calculate your result.</p>
          </div>
          <div className="gpa-badge">
            <span>4.0</span>
            Scale
          </div>
        </div>

        <div className="gpa-layout">
          <div className="gpa-input-panel">
            {subjects.map((sub, i) => (
              <div key={i} className="row-card">
                <div className="form-grid">
                  <label>
                    Subject Name
                    <input value={sub.name} onChange={(e) => updateSubject(i, "name", e.target.value)} />
                  </label>
                  <label>
                    Marks %
                    <input type="number" value={sub.marks} onChange={(e) => updateSubject(i, "marks", e.target.value)} />
                  </label>
                  <label>
                    Credit Hours
                    <input type="number" value={sub.credit} onChange={(e) => updateSubject(i, "credit", e.target.value)} />
                  </label>
                </div>
                <button className="chip danger" onClick={() => removeSubject(i)}>Remove</button>
              </div>
            ))}

            <div className="btn-row">
              <button className="btn" onClick={addSubject}>Add Subject</button>
              <button className="btn btn-secondary" onClick={calculateCGPA}>Calculate CGPA</button>
            </div>
          </div>

          <div className="gpa-result-panel">
            {result ? (
              <>
                <div className="result-top">
                  <div className="big-metric accent">
                    <span>CGPA</span>
                    <strong>{result.cgpa} / 4.0</strong>
                  </div>
                  <div className="big-metric">
                    <span>Total Credits</span>
                    <strong>{result.totalCredits}</strong>
                  </div>
                </div>
                <div className="progress-wrap">
                  <div className="progress-label">
                    <span>Progress</span>
                    <span>{Math.round((result.cgpa / 4) * 100)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(result.cgpa / 4) * 100}%` }} />
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <div>
                  <div className="empty-icon">🎓</div>
                  <h3>No result yet</h3>
                  <p className="muted">Add your course data and press calculate.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
     </>
  );
}
