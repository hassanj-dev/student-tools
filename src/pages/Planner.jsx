import { useMemo, useState } from "react";

export default function Planner() {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [items, setItems] = useState([]);

  const addTask = () => {
    if (!task.trim() || !dueDate) return;
    setItems((prev) => [...prev, { task, dueDate, priority, done: false }]);
    setTask("");
    setDueDate("");
    setPriority("Medium");
  };

  const toggleDone = (index) => {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, done: !item.done } : item)));
  };

  const sorted = useMemo(
    () => [...items].sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
    [items]
  );

  return (
    <main className="page">
      <section className="card glass">
        <h2>Assignment Planner</h2>
        <p className="muted">Track assignments, due dates, and priority levels.</p>

        <div className="form-grid">
          <label>
            Task
            <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="e.g. Finish biology assignment" />
          </label>

          <label>
            Due Date
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </label>

          <label>
            Priority
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>
        </div>

        <button className="btn" onClick={addTask}>Add Task</button>

        <div className="planner-list">
          {sorted.map((item, idx) => (
            <div className={`planner-item ${item.done ? "done" : ""}`} key={idx}>
              <div>
                <strong>{item.task}</strong>
                <p>{item.dueDate}</p>
              </div>
              <div className="planner-meta">
                <span className={`priority ${item.priority.toLowerCase()}`}>{item.priority}</span>
                <button className="chip" onClick={() => toggleDone(idx)}>
                  {item.done ? "Undo" : "Done"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}