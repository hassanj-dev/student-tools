import { useRef, useState } from "react";
import toast from "react-hot-toast";

// Supported output formats
const FORMATS = ["JPG", "PNG", "WEBP", "PDF"];

export default function ImageConverter() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [format, setFormat] = useState("JPG");
  const [quality, setQuality] = useState(90);
  const [converting, setConverting] = useState(false);

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) { toast.error("Please select an image file."); return; }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    const fakeEvt = { target: { files: [f] } };
    handleFile(fakeEvt);
  };

  const convert = async () => {
    if (!file || !preview) { toast.error("Please select an image first."); return; }
    setConverting(true);

    try {
      const img = new Image();
      img.src = preview;
      await new Promise((res) => { img.onload = res; });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");

      // White background for JPG (no transparency)
      if (format === "JPG") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      if (format === "PDF") {
        // Dynamically import jsPDF
        const { jsPDF } = await import("jspdf");
        const pdf = new jsPDF({
          orientation: canvas.width > canvas.height ? "landscape" : "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        const imgData = canvas.toDataURL("image/jpeg", quality / 100);
        pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
        const baseName = file.name.replace(/\.[^.]+$/, "");
        pdf.save(`${baseName}.pdf`);
        toast.success("PDF downloaded!");
      } else {
        const mimeMap = { JPG: "image/jpeg", PNG: "image/png", WEBP: "image/webp" };
        const extMap  = { JPG: "jpg", PNG: "png", WEBP: "webp" };
        const mime = mimeMap[format];
        const ext  = extMap[format];
        const dataUrl = canvas.toDataURL(mime, quality / 100);

        const a = document.createElement("a");
        const baseName = file.name.replace(/\.[^.]+$/, "");
        a.href = dataUrl;
        a.download = `${baseName}_converted.${ext}`;
        a.click();
        toast.success(`${format} downloaded!`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Conversion failed. Try another image.");
    }

    setConverting(false);
  };

  const inputType = file ? file.type.split("/")[1].toUpperCase() : "—";

  return (
    <main className="page">
      <section className="card glass">
        <h2>Image Converter</h2>
        <p className="muted">Convert images between PNG, JPG, WEBP formats or export to PDF.</p>

        {/* Drop zone */}
        <div
          className={`converter-box ${file ? "has-file" : ""}`}
          onClick={() => fileRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{ marginTop: 20 }}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFile}
          />
          {file ? (
            <>
              <div className="converter-icon">✅</div>
              <p style={{ fontWeight: 700 }}>{file.name}</p>
              <p className="muted" style={{ fontSize: ".85rem" }}>{(file.size / 1024).toFixed(1)} KB · {inputType}</p>
            </>
          ) : (
            <>
              <div className="converter-icon">🖼️</div>
              <p style={{ fontWeight: 700 }}>Click or drag & drop an image</p>
              <p className="muted" style={{ fontSize: ".85rem" }}>PNG, JPG, WEBP, GIF, BMP supported</p>
            </>
          )}
        </div>

        {/* Preview */}
        {preview && (
          <div className="converter-preview" style={{ marginTop: 14 }}>
            <img src={preview} alt="Preview" />
          </div>
        )}

        {/* Format selector */}
        {file && (
          <>
            <div style={{ marginTop: 20 }}>
              <label style={{ marginBottom: 10 }}>
                Output Format
              </label>
              <div className="format-tabs" style={{ marginTop: 8 }}>
                {FORMATS.map((f) => (
                  <button
                    key={f}
                    className={`fmt-tab ${format === f ? "active" : ""}`}
                    onClick={() => setFormat(f)}
                  >
                    {f === "PDF" ? "📄 PDF" : `🖼️ ${f}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Quality slider (not for PNG) */}
            {format !== "PNG" && format !== "PDF" && (
              <div style={{ marginTop: 14 }}>
                <label>Quality: {quality}%</label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  style={{ marginTop: 8 }}
                />
              </div>
            )}

            <div className="progress-step">
              <span>📂</span>
              <span>
                <strong>{inputType}</strong> → <strong>{format}</strong>
                {format !== "PNG" && format !== "PDF" && ` · Quality ${quality}%`}
              </span>
            </div>

            <div className="btn-row" style={{ marginTop: 18 }}>
              <button className="btn" onClick={convert} disabled={converting}>
                {converting ? "Converting…" : `Download as ${format}`}
              </button>
              <button className="btn btn-secondary" onClick={() => { setFile(null); setPreview(null); }}>
                Clear
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}