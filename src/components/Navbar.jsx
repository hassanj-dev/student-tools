import { NavLink } from "react-router-dom";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const linkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

export default function Navbar({ onMenuClick }) {
  const { dark, setDark } = useTheme();

  return (
    <header className="navbar glass">

      {/* LEFT: Hamburger + Brand */}
      <div className="navbar-left">
        <button
          className="icon-btn hamburger-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <FaBars />
        </button>

        <a href="/" className="brand">
          <img src="/logo.png" alt="SparkDesk Logo" className="brand-logo" />
          <div className="brand-text">
            <h1 className="brand-title">
              Spark<span>Desk</span>
            </h1>
            <p className="brand-sub">Study smarter, stay organized</p>
          </div>
        </a>
      </div>

      {/* CENTER: Nav links — hidden on mobile */}
      <nav className="nav-links">
        <NavLink to="/"             className={linkClass}>Home</NavLink>
        <NavLink to="/gpa"          className={linkClass}>GPA</NavLink>
        <NavLink to="/word-counter" className={linkClass}>Words</NavLink>
        <NavLink to="/resume"       className={linkClass}>Resume</NavLink>
        <NavLink to="/timetable"    className={linkClass}>Timetable</NavLink>
        <NavLink to="/countdown"    className={linkClass}>Countdown</NavLink>
        <NavLink to="/calculator"   className={linkClass}>Calc</NavLink>
      </nav>

      {/* RIGHT: Theme toggle */}
      <button
        className="icon-btn theme-btn"
        onClick={() => setDark((v) => !v)}
        aria-label="Toggle dark mode"
        title={dark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {dark ? <FaSun /> : <FaMoon />}
      </button>

    </header>
  );
}