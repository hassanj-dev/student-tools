import { useEffect, useState } from "react";
import SEO from "../components/SEO";

export default function PDFViewer() {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

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
        <p className="muted">
          Open a PDF and keep your study notes beside it.
        </p>

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
            title="PDF Preview"
            src={url}
            className="pdf-frame"
          />
        ) : (
          <div className="empty-state">
            <div>
              <h3>No PDF loaded</h3>
              <p className="muted">
                Upload a file to preview it here.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
    </>
  );
}