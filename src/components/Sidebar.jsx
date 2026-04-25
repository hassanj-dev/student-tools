import { NavLink } from "react-router-dom";
import { FaHome, FaFileAlt, FaClock, FaTasks, FaStickyNote, FaLayerGroup, FaTimes } from "react-icons/fa";

const sideLink = ({ isActive }) => `side-link ${isActive ? "active" : ""}`;

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${open ? "open" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar glass ${open ? "open" : ""}`}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          
        

          {/* Close button */}
          <button
            onClick={onClose}
            className="sidebar-close-btn"
            aria-label="Close sidebar"
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "1.1rem",
              color: "var(--muted)",
              display: "none"
            }}
          >
            <FaTimes />
          </button>
        </div>

        <h2 style={{ marginTop: 18 }}>Navigation</h2>

        <NavLink to="/" className={sideLink} onClick={onClose}><FaHome /> Home</NavLink>
        <NavLink to="/image-converter" className={sideLink} onClick={onClose}>🖼️ Image Converter</NavLink>
        <NavLink to="/gpa" className={sideLink} onClick={onClose}>📊 GPA Calculator</NavLink>
        <NavLink to="/calculator" className={sideLink} onClick={onClose}>🔢 Calculator</NavLink>
        <NavLink to="/unitconverter" className={sideLink} onClick={onClose}>⚖️ UnitConverter</NavLink>
        <NavLink to="/notesapp" className={sideLink} onClick={onClose}>📝 NotesApp</NavLink>
        <NavLink to="/word-counter" className={sideLink} onClick={onClose}>🔤 Word Counter</NavLink>
        <NavLink to="/pomodoro" className={sideLink} onClick={onClose}>⏱ Pomodoro</NavLink>
        <NavLink to="/resume" className={sideLink} onClick={onClose}><FaFileAlt /> Resume Builder</NavLink>
        <NavLink to="/pdf-notes" className={sideLink} onClick={onClose}><FaStickyNote /> PDF Notes</NavLink>
        <NavLink to="/flashcards" className={sideLink} onClick={onClose}>🧠 Flashcards</NavLink>
        <NavLink to="/timetable" className={sideLink} onClick={onClose}><FaLayerGroup /> Timetable</NavLink>
      </aside>
    </>
  );
}