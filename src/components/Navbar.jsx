import { NavLink } from "react-router-dom";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const linkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

export default function Navbar({ onMenuClick }) {
  const { dark, setDark } = useTheme();

  return (
    <header className="navbar glass">
      {/* Hamburger — shown only on mobile via CSS */}
      <button
        className="icon-btn mobile-menu-btn"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <FaBars />
      </button>

      <div className="brand">
        
        {/* ✅ LOGO ADDED HERE */}
        <img src="/logo.png" alt="Logo" className="brand-logo" />

        <div>
          <a href="https://sparkdesk.xyz/">
 <h1 className="brand-title">
  Spark<span>Desk</span>
</h1>
</a>
          <p>Study smarter, stay organized</p>
        </div>
      </div>

      <div className="nav-wrap">
        <nav className="nav-links">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/gpa" className={linkClass}>GPA</NavLink>
          <NavLink to="/word-counter" className={linkClass}>Words</NavLink>
          <NavLink to="/resume" className={linkClass}>Resume</NavLink>
          <NavLink to="/timetable" className={linkClass}>Timetable</NavLink>
          <NavLink to="/countdown" className={linkClass}>Countdown</NavLink>
          <NavLink to="/calculator" className={linkClass}>Calc</NavLink>
        </nav>

        <button
          className="icon-btn"
          onClick={() => setDark((v) => !v)}
          aria-label="Toggle dark mode"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
}