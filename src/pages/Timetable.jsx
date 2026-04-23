import { useMemo, useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Timetable() {
  const [day, setDay] = useState("Monday");
  const [time, setTime] = useState("09:00");
  const [subject, setSubject] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!subject.trim()) return;
    setItems((prev) => [...prev, { day, time, subject }]);
    setSubject("");
  };

  const grouped = useMemo(
    () =>
      days.map((d) => ({
        day: d,
        rows: items.filter((item) => item.day === d).sort((a, b) => a.time.localeCompare(b.time)),
      })),
    [items]
  );

  return (
    <main className="page">
      <section className="card glass">
        <h2>Timetable Generator</h2>
        <p className="muted">Add classes or study sessions to a weekly planner.</p>

        <div className="form-grid timetable-form">
          <label>
            Day
            <select value={day} onChange={(e) => setDay(e.target.value)}>
              {days.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>

          <label>
            Time
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </label>

          <label className="span-2">
            Subject / Task
            <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Math revision" />
          </label>
        </div>

        <button className="btn" onClick={addItem}>Add to Timetable</button>

        <div className="timetable-grid">
          {grouped.map((group) => (
            <div key={group.day} className="day-column">
              <h3>{group.day}</h3>
              {group.rows.length ? group.rows.map((row, idx) => (
                <div key={idx} className="schedule-item">
                  <strong>{row.time}</strong>
                  <span>{row.subject}</span>
                </div>
              )) : <p className="muted">No entries</p>}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}