import ToolCard from "../components/ToolCard";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
export default function Home() {
  const tools = [
    {
      title: "GPA Calculator",
      description: "Calculate GPA with credit hours.",
      to: "/gpa",
      icon: "📊",
    },
    {
      title: "Word Counter",
      description: "Count words, characters, and reading time.",
      to: "/word-counter",
      icon: "🔤",
    },
    {
      title: "Resume Builder",
      description: "Create and download a PDF resume.",
      to: "/resume",
      icon: "📄",
    },
    {
      title: "Timetable Generator",
      description: "Plan classes and study sessions.",
      to: "/timetable",
      icon: "🗓️",
    },
    {
      title: "Exam Countdown",
      description: "Track the time left until exams.",
      to: "/countdown",
      icon: "⏳",
    },
    {
      title: "Pomodoro Timer",
      description: "Focus with 25-min work sessions.",
      to: "/pomodoro",
      icon: "⏱",
    },
    {
      title: "Flashcard Quiz",
      description: "Study with quick question cards.",
      to: "/flashcards",
      icon: "🧠",
    },
    {
      title: "PDF Notes Viewer",
      description: "Open PDFs and keep notes beside them.",
      to: "/pdf-notes",
      icon: "📚",
    },
    {
      title: "Assignment Planner",
      description: "Track tasks, priorities, and due dates.",
      to: "/planner",
      icon: "✅",
    },
    {
      title: "Calculator",
      description: "Quick arithmetic calculator.",
      to: "/calculator",
      icon: "🔢",
    },
    {
      title: "Image Converter",
      description: "Convert PNG ↔ JPG ↔ WEBP or export to PDF.",
      to: "/image-converter",
      icon: "🖼️",
    },
  ];

  return (
    <>
    <SEO
  title="SparkDesk | Free Student Tools Platform"
/>



<Helmet>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SparkDesk",
      "url": "https://www.sparkdesk.online",
      "description": "Free student tools platform with calculators, flashcards, resume builder, pomodoro timer and more.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.sparkdesk.online/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
        
      }
    })}
  </script>
</Helmet>
    <main className="page">
      <section className="hero glass">
        <div className="hero-copy">
          <span className="pill">All-in-one student toolkit</span>
          <h2>Study better with one clean dashboard.</h2>
          <p>
            Manage grades, notes, assignments, focus sessions, revision, and
            your resume all in one place.
          </p>
        </div>

        <div className="hero-card">
          <div className="stat">
            <strong>10</strong>
            <span>useful tools</span>
          </div>
          <div className="stat">
            <strong>Responsive</strong>
            <span>mobile-friendly layout</span>
          </div>
          <div className="stat">
            <strong>PDF</strong>
            <span>resume & notes support</span>
          </div>
        </div>
      </section>

      <section className="grid">
        {tools.map((tool) => (
          <ToolCard key={tool.to} {...tool} />
        ))}
      </section>
    </main>
    </>
  );
}