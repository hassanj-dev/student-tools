import { useEffect, useState, useRef } from "react";
import SEO from "../components/SEO";

export default function PDFViewer() {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");
  const prevUrlRef = useRef(null);

  useEffect(() => {
    if (!file) return;

    // Revoke the *previous* URL only after the new one is set
    const objectUrl = URL.createObjectURL(file);

    setUrl((prev) => {
      if (prevUrlRef.current) {
        URL.revokeObjectURL(prevUrlRef.current); // clean up old URL
      }
      prevUrlRef.current = objectUrl;
      return objectUrl;
    });

    // No cleanup here — we revoke manually on next file change or unmount
  }, [file]);

  // Revoke on unmount
  useEffect(() => {
    return () => {
      if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);
    };
  }, []);

  return (
    <>
      <SEO
        title="PDF Viewer | SparkDesk"
        description="View PDFs online instantly without any software installation."
        url="https://www.sparkdesk.online/pdfviewer"
      />
      <main className="page two-col">
        <section className="card glass">
          <h2>PDF Notes Viewer</h2>
          <p className="muted">Open a PDF and keep your study notes beside it.</p>

          <label>
            Upload PDF
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          <label>
            Notes
            <textarea
              className="textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write notes here..."
            />
          </label>
        </section>

        <section className="card glass">
          <h3>Preview</h3>

          {url ? (
            <iframe
              key={url}              // force remount on new file
              title="PDF Preview"
              src={url}
              className="pdf-frame"
              style={{ width: "100%", height: "80vh", border: "none" }}
            />
          ) : (
            <div className="empty-state">
              <div>
                <h3>No PDF loaded</h3>
                <p className="muted">Upload a file to preview it here.</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}