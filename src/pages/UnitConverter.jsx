import { useState, useCallback } from "react";
import SEO from "../components/SEO";


const categories = {
  Length: {
    icon: "📏",
    units: ["Meter","Kilometer","Centimeter","Millimeter","Mile","Yard","Foot","Inch"],
    toBase: {
      Meter:1, Kilometer:1000, Centimeter:0.01, Millimeter:0.001,
      Mile:1609.344, Yard:0.9144, Foot:0.3048, Inch:0.0254,
    },
  },
  Weight: {
    icon: "⚖️",
    units: ["Kilogram","Gram","Milligram","Pound","Ounce","Ton"],
    toBase: {
      Kilogram:1, Gram:0.001, Milligram:0.000001,
      Pound:0.453592, Ounce:0.0283495, Ton:1000,
    },
  },
  Temperature: {
    icon: "🌡️",
    units: ["Celsius","Fahrenheit","Kelvin"],
    toBase: null,
  },
};

function convertTemp(v, from, to) {
  if (from === to) return v;
  let c = from === "Celsius" ? v : from === "Fahrenheit" ? (v-32)*5/9 : v-273.15;
  return to === "Celsius" ? c : to === "Fahrenheit" ? c*9/5+32 : c+273.15;
}

function fmt(n) {
  if (n==="" || n===null || isNaN(n)) return "";
  const x = parseFloat(n);
  if (Math.abs(x)>=1e6 || (Math.abs(x)<0.0001 && x!==0)) return x.toExponential(4);
  return parseFloat(x.toPrecision(8)).toString();
}

function getQuickRef(cat) {
  if (cat==="Length") return [
    {label:"1 km → miles",   val:1,   from:"Kilometer",   to:"Mile"},
    {label:"1 mile → km",    val:1,   from:"Mile",         to:"Kilometer"},
    {label:"1 foot → cm",    val:1,   from:"Foot",         to:"Centimeter"},
    {label:"1 inch → mm",    val:1,   from:"Inch",         to:"Millimeter"},
    {label:"100 m → feet",   val:100, from:"Meter",        to:"Foot"},
    {label:"5 miles → km",   val:5,   from:"Mile",         to:"Kilometer"},
  ];
  if (cat==="Weight") return [
    {label:"1 kg → pounds",  val:1,   from:"Kilogram",     to:"Pound"},
    {label:"1 lb → kg",      val:1,   from:"Pound",        to:"Kilogram"},
    {label:"1 oz → grams",   val:1,   from:"Ounce",        to:"Gram"},
    {label:"1 ton → kg",     val:1,   from:"Ton",          to:"Kilogram"},
    {label:"500 g → oz",     val:500, from:"Gram",         to:"Ounce"},
    {label:"70 kg → lbs",    val:70,  from:"Kilogram",     to:"Pound"},
  ];
  return [
    {label:"100°C → °F",     val:100, from:"Celsius",      to:"Fahrenheit"},
    {label:"32°F → °C",      val:32,  from:"Fahrenheit",   to:"Celsius"},
    {label:"0°C → Kelvin",   val:0,   from:"Celsius",      to:"Kelvin"},
    {label:"98.6°F → °C",    val:98.6,from:"Fahrenheit",   to:"Celsius"},
    {label:"300K → °C",      val:300, from:"Kelvin",       to:"Celsius"},
    {label:"-40°F = -40°C",  val:-40, from:"Fahrenheit",   to:"Celsius"},
  ];
}

export default function UnitConverter() {
  const [activeCat, setActiveCat]   = useState("Length");
  const [fromUnit, setFromUnit]     = useState("Meter");
  const [toUnit, setToUnit]         = useState("Kilometer");
  const [inputVal, setInputVal]     = useState("");
  const [outputVal, setOutputVal]   = useState("");

  const cat = categories[activeCat];

  const doConvert = useCallback((val, from, to, catName) => {
    if (val==="" || val===null) return "";
    const num = parseFloat(val);
    if (isNaN(num)) return "";
    if (from===to) return fmt(num);
    if (catName==="Temperature") return fmt(convertTemp(num, from, to));
    return fmt(num * categories[catName].toBase[from] / categories[catName].toBase[to]);
  }, []);

  const handleCatChange = (name) => {
    setActiveCat(name);
    setFromUnit(categories[name].units[0]);
    setToUnit(categories[name].units[1]);
    setInputVal(""); setOutputVal("");
  };
  const handleInput  = (v) => { setInputVal(v);  setOutputVal(doConvert(v, fromUnit, toUnit, activeCat)); };
  const handleFrom   = (u) => { setFromUnit(u);  setOutputVal(doConvert(inputVal, u, toUnit, activeCat)); };
  const handleTo     = (u) => { setToUnit(u);    setOutputVal(doConvert(inputVal, fromUnit, u, activeCat)); };
  const swap = () => {
    setFromUnit(toUnit); setToUnit(fromUnit);
    setInputVal(outputVal); setOutputVal(inputVal);
  };

  return (
    <div className="page" style={{ maxWidth: 700, margin: "28px auto" }}>
<SEO
  title="Unit Converter | SparkDesk"
  description="Free online unit converter for length, weight, temperature and more."
  url="https://www.sparkdesk.online/unitconverter"
/>
      {/* ── Page Header ── */}
      <div style={{ marginBottom: 20 }}>
        <div className="pill">🔧 Student Tools</div>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          margin: "10px 0 6px",
          background: "linear-gradient(135deg, var(--text) 0%, var(--primary) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1.1,
        }}>Unit Converter</h1>
        <p style={{ color: "var(--muted)", fontSize: "0.93rem", margin: 0 }}>
          Instant conversions for Length, Weight &amp; Temperature — no login needed.
        </p>
      </div>

      {/* ── Main Card ── */}
      <div className="card glass" style={{ padding: 0, overflow: "hidden" }}>

        {/* Category Tab Bar */}
        <div style={{
          display: "flex",
          borderBottom: "1px solid var(--border)",
          background: "rgba(109,40,217,0.03)",
        }}>
          {Object.keys(categories).map((name) => (
            <button key={name} onClick={() => handleCatChange(name)}
              style={{
                flex: 1,
                padding: "15px 10px",
                border: "none",
                borderBottom: activeCat===name ? "3px solid var(--primary)" : "3px solid transparent",
                background: "transparent",
                color: activeCat===name ? "var(--primary)" : "var(--muted)",
                fontFamily: "var(--font-body)",
                fontWeight: activeCat===name ? 700 : 500,
                fontSize: "0.88rem",
                cursor: "pointer",
                transition: "all var(--duration) var(--ease-smooth)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
              }}>
              <span style={{ fontSize: "1.1rem" }}>{categories[name].icon}</span>
              {name}
            </button>
          ))}
        </div>

        {/* Converter Fields */}
        <div style={{ padding: "28px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 48px 1fr",
            gap: 14,
            alignItems: "end",
          }}>
            {/* FROM */}
            <div>
              <div style={{
                fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.1em", color: "var(--primary)",
                fontFamily: "var(--font-body)", marginBottom: 8,
              }}>From</div>
              <select value={fromUnit} onChange={(e) => handleFrom(e.target.value)}
                style={{ marginBottom: 10, fontWeight: 600 }}>
                {cat.units.map((u) => <option key={u}>{u}</option>)}
              </select>
              <input
                type="number"
                value={inputVal}
                onChange={(e) => handleInput(e.target.value)}
                placeholder="Enter value…"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  padding: "14px 16px",
                }}
              />
            </div>

            {/* SWAP BUTTON */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 2 }}>
              <button onClick={swap}
                title="Swap units"
                style={{
                  width: 44, height: 44,
                  borderRadius: "50%",
                  border: "1.5px solid var(--border-solid)",
                  background: "rgba(255,255,255,0.85)",
                  color: "var(--primary)",
                  fontSize: "1.15rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--shadow-xs)",
                  transition: "all var(--duration) var(--ease-spring)",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "rotate(180deg) scale(1.1)";
                  e.currentTarget.style.background = "rgba(109,40,217,0.08)";
                  e.currentTarget.style.borderColor = "rgba(109,40,217,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.background = "rgba(255,255,255,0.85)";
                  e.currentTarget.style.borderColor = "var(--border-solid)";
                }}>
                ⇄
              </button>
            </div>

            {/* TO */}
            <div>
              <div style={{
                fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase",
                letterSpacing: "0.1em", color: "var(--secondary)",
                fontFamily: "var(--font-body)", marginBottom: 8,
              }}>To</div>
              <select value={toUnit} onChange={(e) => handleTo(e.target.value)}
                style={{ marginBottom: 10, fontWeight: 600 }}>
                {cat.units.map((u) => <option key={u}>{u}</option>)}
              </select>
              <div style={{
                padding: "14px 16px",
                borderRadius: "var(--radius)",
                border: "1.5px solid rgba(109,40,217,0.25)",
                background: "linear-gradient(135deg, rgba(109,40,217,0.05), rgba(14,165,233,0.05))",
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "var(--primary)",
                minHeight: 60,
                display: "flex",
                alignItems: "center",
              }}>
                {outputVal || (
                  <span style={{ color: "var(--muted)", fontSize: "0.95rem", fontWeight: 400 }}>
                    Result appears here
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Result Banner */}
          {inputVal && outputVal && (
            <div style={{
              marginTop: 20,
              padding: "15px 20px",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, rgba(109,40,217,0.07), rgba(14,165,233,0.07))",
              border: "1px solid rgba(109,40,217,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
              textAlign: "center",
            }}>
              <span style={{ color: "var(--text-2)", fontWeight: 600, fontSize: "0.95rem" }}>
                {inputVal} <span style={{ color: "var(--muted)" }}>{fromUnit}</span>
              </span>
              <span style={{ color: "var(--primary)", fontWeight: 800, fontSize: "1.1rem" }}>=</span>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 800,
                background: "var(--grad-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {outputVal} {toUnit}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Quick Reference Card ── */}
      <div className="card glass" style={{ marginTop: 16, padding: "22px 24px" }}>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.78rem",
          fontWeight: 700,
          color: "var(--muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          margin: "0 0 14px",
        }}>
          ⚡ Quick Reference · {activeCat}
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: 10,
        }}>
          {getQuickRef(activeCat).map((ref) => (
            <button
              key={ref.label}
              className="chip"
              onClick={() => {
                setFromUnit(ref.from); setToUnit(ref.to);
                setInputVal(String(ref.val));
                setOutputVal(doConvert(String(ref.val), ref.from, ref.to, activeCat));
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "12px 14px",
                borderRadius: "var(--radius)",
                height: "auto",
                textAlign: "left",
                gap: 3,
              }}>
              <span style={{ fontWeight: 700, fontSize: "0.83rem", color: "var(--text-2)" }}>
                {ref.label}
              </span>
              <span style={{ fontSize: "0.74rem", color: "var(--muted)" }}>
                {ref.from} → {ref.to}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}