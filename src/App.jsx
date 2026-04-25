import { useState, useEffect } from "react"; // ✅ FIXED
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import GPA from "./pages/GPA";
import WordCounter from "./pages/WordCounter";
import UnitConverter from "./pages/UnitConverter";
// import NotesApp from "./pages/NotesApp";
import ResumeBuilder from "./pages/ResumeBuilder";
import Pomodoro from "./pages/Pomodoro";
import Flashcards from "./pages/Flashcards";
import PDFViewer from "./pages/PDFViewer";
import Calculator from "./pages/Calculator";
import ImageConverter from "./pages/Imageconverter";
import { ThemeProvider } from "./context/ThemeContext";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Footer from "./components/Footer";


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-right" />

        {/* ✅ Loader Overlay */}
        {loading && <Loader />}

        <div className="app-layout">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div className="main-area">
            <Navbar onMenuClick={() => setSidebarOpen(true)} />

            <div className="page-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gpa" element={<GPA />} />
                <Route path="/word-counter" element={<WordCounter />} />
                <Route path="/resume" element={<ResumeBuilder />} />
                <Route path="/pomodoro" element={<Pomodoro />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/pdf-notes" element={<PDFViewer />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/image-converter" element={<ImageConverter />} />
                  <Route path="/unitconverter" element={<UnitConverter/>} />
                    {/* <Route path="/notesapp" element={<NotesApp/>} /> */}
                <Route path="*" element={<Navigate to="/" replace />} />
<Route path="/privacy" element={<Privacy />} />
<Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </div>
            <Footer />
          </div>

          {/* Mobile button */}
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}