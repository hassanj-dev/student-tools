import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Footer from "./components/Footer";

// ✅ Lazy loaded pages
const Home          = lazy(() => import("./pages/Home"));
const GPA           = lazy(() => import("./pages/GPA"));
const WordCounter   = lazy(() => import("./pages/WordCounter"));
const ResumeBuilder = lazy(() => import("./pages/ResumeBuilder"));
const Pomodoro      = lazy(() => import("./pages/Pomodoro"));
const Flashcards    = lazy(() => import("./pages/Flashcards"));
const PDFViewer     = lazy(() => import("./pages/PDFViewer"));
const Calculator    = lazy(() => import("./pages/Calculator"));
const ImageConverter= lazy(() => import("./pages/Imageconverter"));
const UnitConverter = lazy(() => import("./pages/UnitConverter"));
const NotesApp      = lazy(() => import("./pages/NotesApp"));
const Privacy       = lazy(() => import("./pages/Privacy"));
const Contact       = lazy(() => import("./pages/Contact"));
const About         = lazy(() => import("./pages/About"));
const Terms         = lazy(() => import("./pages/Terms"));

// Suspense spinner
const PageLoader = () => (
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
  }}>
    <div style={{
      width: 40,
      height: 40,
      border: "3px solid var(--border-solid)",
      borderTop: "3px solid var(--primary)",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite"
    }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// Inner component — reads theme from context so it can sync data-theme attr
function AppInner() {
  const { dark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Apply theme to <html> for CSS variable switching
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--bg-card)",
            color: "var(--text)",
            border: "1px solid var(--border-solid)",
            borderRadius: "12px",
            fontSize: "0.875rem",
          },
        }}
      />

      {loading && <Loader />}

      <div className="app-layout">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="main-area">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />

          <div className="page-content">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/"                element={<Home />} />
                <Route path="/gpa"             element={<GPA />} />
                <Route path="/word-counter"    element={<WordCounter />} />
                <Route path="/resume"          element={<ResumeBuilder />} />
                <Route path="/pomodoro"        element={<Pomodoro />} />
                <Route path="/flashcards"      element={<Flashcards />} />
                <Route path="/pdf-notes"       element={<PDFViewer />} />
                <Route path="/calculator"      element={<Calculator />} />
                <Route path="/image-converter" element={<ImageConverter />} />
                <Route path="/unitconverter"   element={<UnitConverter />} />
                <Route path="/notesapp"        element={<NotesApp />} />
                <Route path="/privacy"         element={<Privacy />} />
                <Route path="/about"           element={<About />} />
                <Route path="/contact"         element={<Contact />} />
                <Route path="/terms"           element={<Terms />} />
                <Route path="*"                element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>

          <Footer />
        </div>

        {/* Mobile sidebar toggle */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}