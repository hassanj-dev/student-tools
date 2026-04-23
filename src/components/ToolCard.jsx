import { Link } from "react-router-dom";

export default function ToolCard({ title, description, to, icon }) {
  return (
    <Link to={to} className="tool-card glass">
      <div className="tool-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="tool-cta">Open tool →</span>
    </Link>
  );
}