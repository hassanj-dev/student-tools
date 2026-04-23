import { useEffect, useState } from "react";

function getTimeLeft(targetDate) {
  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

export default function Countdown() {
  const [target, setTarget] = useState("2026-12-31T09:00");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(target));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <main className="page">
      <section className="card glass">
        <h2>Exam Countdown Timer</h2>
        <p className="muted">Set your exam date and time, then watch the timer update live.</p>

        <label>
          Exam Date & Time
          <input type="datetime-local" value={target} onChange={(e) => setTarget(e.target.value)} />
        </label>

        <div className="countdown-grid">
          <div className="count-card"><strong>{timeLeft.days}</strong><span>Days</span></div>
          <div className="count-card"><strong>{timeLeft.hours}</strong><span>Hours</span></div>
          <div className="count-card"><strong>{timeLeft.minutes}</strong><span>Minutes</span></div>
          <div className="count-card"><strong>{timeLeft.seconds}</strong><span>Seconds</span></div>
        </div>

        {timeLeft.done && <p className="done-text">Exam day reached.</p>}
      </section>
    </main>
  );
}