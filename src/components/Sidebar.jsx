import { NavLink } from "react-router-dom";
import {
  FaHome, FaImage, FaCalculator, FaFileAlt,
  FaStickyNote, FaClock, FaBook, FaFont,
  FaExchangeAlt, FaClipboard, FaBolt
} from "react-icons/fa";
import { memo, useCallback } from "react";

const sideLink = ({ isActive }) => `side-link ${isActive ? "active" : ""}`;

function Sidebar({ open, onClose }) {
  const handleClose = useCallback(() => onClose(), [onClose]);

  const navItems = [
    { to: "/",               icon: <FaHome />,        label: "Home" },
    { to: "/gpa",            icon: <FaCalculator />,  label: "GPA Calculator" },
    { to: "/calculator",     icon: <FaBolt />,        label: "Calculator" },
    { to: "/word-counter",   icon: <FaFont />,        label: "Word Counter" },
    { to: "/resume",         icon: <FaFileAlt />,     label: "Resume Builder" },
    { to: "/image-converter",icon: <FaImage />,       label: "Image Converter" },
    { to: "/unitconverter",  icon: <FaExchangeAlt />, label: "Unit Converter" },
    { to: "/notesapp",       icon: <FaClipboard />,   label: "Notes App" },
    { to: "/pomodoro",       icon: <FaClock />,       label: "Pomodoro" },
    { to: "/pdf-notes",      icon: <FaStickyNote />,  label: "PDF Notes" },
    { to: "/flashcards",     icon: <FaBook />,        label: "Flashcards" },
  ];

  return (
    <>
      <div
        className={`sidebar-overlay ${open ? "open" : ""}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>⚡ SparkDesk</h2>
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={sideLink}
            onClick={handleClose}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </aside>
    </>
  );
}

export default memo(Sidebar);