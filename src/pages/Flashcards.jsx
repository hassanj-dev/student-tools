import { useState } from "react";
import SEO from "../components/SEO";

export default function Flashcards() {
  const [cards, setCards] = useState([
    { q: "What is photosynthesis?", a: "The process by which plants make food using sunlight." },
    { q: "What is GPA?", a: "Grade Point Average." },
  ]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [form, setForm] = useState({ q: "", a: "" });

  const addCard = () => {
    if (!form.q.trim() || !form.a.trim()) return;
    setCards((prev) => [...prev, form]);
    setForm({ q: "", a: "" });
    setIndex(cards.length);
    setShowAnswer(false);
  };

  const next = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev + 1) % cards.length);
  };

  const prev = () => {
    setShowAnswer(false);
    setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const current = cards[index];

  return (
    <>
    <SEO
  title="Flashcards | SparkDesk"
  description="Create and study flashcards online for free. Improve memory and learning speed."
  url="https://www.sparkdesk.online/flashcards"
/>
    <main className="page">
      <section className="card glass">
        <h2>Flashcard Quiz Tool</h2>
        <p className="muted">Create simple flashcards and revise them quickly.</p>

        <div className="flashcard">
          <h3>Card {index + 1} of {cards.length}</h3>
          <div className="flash-inner">
            <strong>{current?.q}</strong>
            {showAnswer && <p>{current?.a}</p>}
          </div>
        </div>

        <div className="btn-row">
          <button className="btn" onClick={() => setShowAnswer((v) => !v)}>
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          <button className="btn btn-secondary" onClick={prev}>Previous</button>
          <button className="btn btn-secondary" onClick={next}>Next</button>
        </div>

        <div className="form-grid card-inline">
          <label>
            Question
            <input value={form.q} onChange={(e) => setForm((p) => ({ ...p, q: e.target.value }))} />
          </label>
          <label>
            Answer
            <input value={form.a} onChange={(e) => setForm((p) => ({ ...p, a: e.target.value }))} />
          </label>
        </div>

        <button className="btn" onClick={addCard}>Add Card</button>
      </section>
    </main>
    </>
  );
}