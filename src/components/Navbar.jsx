import { NavLink, Link } from "react-router-dom";
import { FaMoon, FaSun, FaBars } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { memo, useCallback } from "react";

const linkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

function Navbar({ onMenuClick }) {
  const { dark, setDark } = useTheme();

  const toggleTheme = useCallback(() => {
    setDark((v) => !v);
  }, [setDark]);

  return (
    <header className="navbar glass">

      {/* LEFT */}
      <div className="navbar-left">
        <button
          className="icon-btn hamburger-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <FaBars />
        </button>

        <Link to="/" className="brand">
          <img
            src="/logo.webp"
            alt="SparkDesk Logo"
            className="brand-logo"
            loading="lazy"
            width="36"
            height="36"
          />
          <div className="brand-text">
            <h1 className="brand-title">
              Spark<span>Desk</span>
            </h1>
            <p className="brand-sub">Study smarter, stay organized</p>
          </div>
        </Link>
      </div>

      {/* CENTER — desktop nav */}
      <nav className="nav-links">
        <NavLink to="/"              className={linkClass}>Home</NavLink>
        <NavLink to="/gpa"           className={linkClass}>GPA</NavLink>
        <NavLink to="/word-counter"  className={linkClass}>Words</NavLink>
        <NavLink to="/resume"        className={linkClass}>Resume</NavLink>
        <NavLink to="/image-converter" className={linkClass}>Image</NavLink>
        <NavLink to="/notesapp"      className={linkClass}>Notes</NavLink>
        <NavLink to="/calculator"    className={linkClass}>Calc</NavLink>
      </nav>

      {/* RIGHT */}
      <button
        className="icon-btn theme-btn"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        title={dark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {dark ? <FaSun /> : <FaMoon />}
      </button>

    </header>
  );
}

export default memo(Navbar);