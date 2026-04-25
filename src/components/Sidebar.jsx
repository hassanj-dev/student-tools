import { NavLink } from "react-router-dom";
import { 
  FaHome, 
  FaImage, 
  FaCalculator, 
  FaFileAlt, 
  FaStickyNote, 
  FaLayerGroup,
  FaClock,
  FaBook,
  FaFont,
  FaExchangeAlt,
  FaClipboard,
  FaTimes   // ✅ ADD THIS
} from "react-icons/fa";
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

        <NavLink to="/" className={sideLink} onClick={onClose}>
  <FaHome /> Home
</NavLink>

<NavLink to="/image-converter" className={sideLink} onClick={onClose}>
  <FaImage /> Image Converter
</NavLink>

<NavLink to="/gpa" className={sideLink} onClick={onClose}>
  <FaCalculator /> GPA Calculator
</NavLink>

<NavLink to="/calculator" className={sideLink} onClick={onClose}>
  <FaCalculator /> Calculator
</NavLink>

<NavLink to="/unitconverter" className={sideLink} onClick={onClose}>
  <FaExchangeAlt /> Unit Converter
</NavLink>

<NavLink to="/notesapp" className={sideLink} onClick={onClose}>
  <FaClipboard /> Notes App
</NavLink>

<NavLink to="/word-counter" className={sideLink} onClick={onClose}>
  <FaFont /> Word Counter
</NavLink>

<NavLink to="/pomodoro" className={sideLink} onClick={onClose}>
  <FaClock /> Pomodoro
</NavLink>

<NavLink to="/resume" className={sideLink} onClick={onClose}>
  <FaFileAlt /> Resume Builder
</NavLink>

<NavLink to="/pdf-notes" className={sideLink} onClick={onClose}>
  <FaStickyNote /> PDF Notes
</NavLink>

<NavLink to="/flashcards" className={sideLink} onClick={onClose}>
  <FaBook /> Flashcards
</NavLink>

<NavLink to="/timetable" className={sideLink} onClick={onClose}>
  <FaLayerGroup /> Timetable
</NavLink>
      </aside>
    </>
  );
}