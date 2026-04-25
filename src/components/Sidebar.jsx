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
  FaClipboard
} from "react-icons/fa";
import { memo, useCallback } from "react";

const sideLink = ({ isActive }) =>
  `side-link ${isActive ? "active" : ""}`;

function Sidebar({ open, onClose }) {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${open ? "open" : ""}`}
        onClick={handleClose}
      />

      {/* Sidebar */}
      <aside className={`sidebar glass ${open ? "open" : ""}`}>

        {/* Header */}
        <div className="sidebar-header">
          <h2>Navigation</h2>
        </div>

        <NavLink to="/" className={sideLink} onClick={handleClose}>
          <FaHome /> Home
        </NavLink>

        <NavLink to="/image-converter" className={sideLink} onClick={handleClose}>
          <FaImage /> Image Converter
        </NavLink>

        <NavLink to="/gpa" className={sideLink} onClick={handleClose}>
          <FaCalculator /> GPA Calculator
        </NavLink>

        <NavLink to="/calculator" className={sideLink} onClick={handleClose}>
          <FaCalculator /> Calculator
        </NavLink>

        <NavLink to="/unitconverter" className={sideLink} onClick={handleClose}>
          <FaExchangeAlt /> Unit Converter
        </NavLink>

        <NavLink to="/notesapp" className={sideLink} onClick={handleClose}>
          <FaClipboard /> Notes App
        </NavLink>

        <NavLink to="/word-counter" className={sideLink} onClick={handleClose}>
          <FaFont /> Word Counter
        </NavLink>

        <NavLink to="/pomodoro" className={sideLink} onClick={handleClose}>
          <FaClock /> Pomodoro
        </NavLink>

        <NavLink to="/resume" className={sideLink} onClick={handleClose}>
          <FaFileAlt /> Resume Builder
        </NavLink>

        <NavLink to="/pdf-notes" className={sideLink} onClick={handleClose}>
          <FaStickyNote /> PDF Notes
        </NavLink>

        <NavLink to="/flashcards" className={sideLink} onClick={handleClose}>
          <FaBook /> Flashcards
        </NavLink>

        <NavLink to="/timetable" className={sideLink} onClick={handleClose}>
          <FaLayerGroup /> Timetable
        </NavLink>

      </aside>
    </>
  );
}

export default memo(Sidebar);