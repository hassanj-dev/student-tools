import { useEffect, useMemo, useRef, useState } from "react";
import SEO from "../components/SEO";

const FOCUS = 25 * 60;
const BREAK = 5 * 60;

export default function Pomodoro() {
  const [secondsLeft, setSecondsLeft] = useState(FOCUS);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const timerRef = useRef(null);

  const minutes = useMemo(() => Math.floor(secondsLeft / 60), [secondsLeft]);
  const seconds = secondsLeft % 60;

  useEffect(() => {
    if (!running) return;

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          const nextMode = mode === "focus" ? "break" : "focus";
          setMode(nextMode);
          return nextMode === "focus" ? FOCUS : BREAK;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [running, mode]);

  const reset = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setMode("focus");
    setSecondsLeft(FOCUS);
  };

  return (
    <>
    <SEO
  title="Pomodoro Timer | SparkDesk"
  description="Focus better using Pomodoro timer for productivity and study sessions."
  url="https://www.sparkdesk.online/pomodoro"
/>
    <main className="page">
      <section className="card glass center-card">
        <span className="section-tag">Pomodoro Timer</span>
        <h2>{mode === "focus" ? "Focus Session" : "Break Session"}</h2>
        <p className="muted">Work for 25 minutes, then take a 5-minute break.</p>

        <div className="pomodoro-ring">
          <strong>{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</strong>
        </div>

        <div className="btn-row">
          <button className="btn" onClick={() => setRunning((v) => !v)}>
            {running ? "Pause" : "Start"}
          </button>
          <button className="btn btn-secondary" onClick={reset}>Reset</button>
        </div>
      </section>
    </main>
    </>
  );
}