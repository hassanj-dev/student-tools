import { useMemo, useState } from "react";
import SEO from "../components/SEO";

export default function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed ? text.split(/[.!?]+/).filter((x) => x.trim()).length : 0;
    const paragraphs = trimmed ? text.split(/\n+/).filter((p) => p.trim()).length : 0;
    const readingTime = Math.max(0, Math.ceil(words / 200));

    return { words, chars, charsNoSpaces, sentences, paragraphs, readingTime };
  }, [text]);

  return (
    <>
    <SEO 
  title="Word Counter | SparkDesk"
  description="Count words, characters and reading time instantly"
/>
    <main className="page">
      <section className="card glass">
        <h2>Word Counter</h2>
        <p className="muted">Track words, characters, sentences, paragraphs, and reading time.</p>

        <textarea
          className="textarea"
          rows="8"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your essay, notes, or paragraph here..."
        />

        <div className="stats-grid">
          <div className="mini-card"><strong>{stats.words}</strong><span>Words</span></div>
          <div className="mini-card"><strong>{stats.chars}</strong><span>Characters</span></div>
          <div className="mini-card"><strong>{stats.charsNoSpaces}</strong><span>Chars no spaces</span></div>
          <div className="mini-card"><strong>{stats.sentences}</strong><span>Sentences</span></div>
          <div className="mini-card"><strong>{stats.paragraphs}</strong><span>Paragraphs</span></div>
          <div className="mini-card"><strong>{stats.readingTime} min</strong><span>Reading time</span></div>
        </div>
      </section>
    </main>
    </>
  );
}