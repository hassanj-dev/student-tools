import { useState } from "react";

const buttons = [
  ["C", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "⌫", "="],
];

export default function Calculator() {
  const [expr, setExpr] = useState("");
  const [display, setDisplay] = useState("0");
  const [hasResult, setHasResult] = useState(false);

  const handleBtn = (val) => {
    if (val === "C") {
      setExpr("");
      setDisplay("0");
      setHasResult(false);
      return;
    }

    if (val === "⌫") {
      if (hasResult) { setExpr(""); setDisplay("0"); setHasResult(false); return; }
      const next = display.slice(0, -1) || "0";
      setDisplay(next);
      setExpr((e) => e.slice(0, -1));
      return;
    }

    if (val === "=") {
      try {
        const raw = expr
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-");
        // eslint-disable-next-line no-eval
        const result = Function('"use strict"; return (' + raw + ")")();
        const res = parseFloat(result.toFixed(10)).toString();
        setDisplay(res);
        setExpr(res);
        setHasResult(true);
      } catch {
        setDisplay("Error");
        setExpr("");
      }
      return;
    }

    if (val === "±") {
      setDisplay((d) => d.startsWith("-") ? d.slice(1) : "-" + d);
      setExpr((e) => e.startsWith("-") ? e.slice(1) : "-" + e);
      return;
    }

    if (val === "%") {
      try {
        const val2 = parseFloat(display) / 100;
        setDisplay(val2.toString());
        setExpr((e) => e.slice(0, -display.length) + val2.toString());
      } catch { /* skip */ }
      return;
    }

    const isOp = ["÷", "×", "−", "+"].includes(val);

    if (hasResult && !isOp) {
      setExpr(val);
      setDisplay(val);
      setHasResult(false);
      return;
    }

    setHasResult(false);
    setExpr((e) => e + val);
    setDisplay((d) => {
      if (isOp) return val;
      if (d === "0" && val !== ".") return val;
      return d + val;
    });
  };

  const getClass = (val) => {
    let cls = "calc-btn";
    if (["÷", "×", "−", "+"].includes(val)) cls += " op";
    if (val === "=") cls += " eq";
    if (val === "C") cls += " clr";
    if (val === "0") cls += " span2";
    return cls;
  };

  return (
    <main className="page">
      <section className="card glass">
        <h2>Calculator</h2>
        <p className="muted">Simple arithmetic calculator with keyboard-style layout.</p>

        <div className="calc-wrap" style={{ marginTop: 20 }}>
          <div className="calc-display">
            <div className="calc-expr">{expr || " "}</div>
            <div className="calc-value">{display}</div>
          </div>

          <div className="calc-grid">
            {buttons.flat().map((btn, i) => (
              <button
                key={i}
                className={getClass(btn)}
                onClick={() => handleBtn(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}