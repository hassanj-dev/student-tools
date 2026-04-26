import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Wave SVG */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
            fill="#0f172a"
          />
        </svg>
      </div>

      <footer className="site-footer">
        <div className="footer-inner">

          {/* BRAND */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.webp" alt="SparkDesk Logo" />
              <div>
                <h3>SparkDesk</h3>
                <p>Study smarter, stay organized.</p>
              </div>
            </div>

            <p className="footer-tagline">
              All-in-one free productivity tools for students — GPA, resume, planner and more.
            </p>

            <div className="footer-subscribe">
              <input type="email" placeholder="your@email.com" />
              <button>Subscribe</button>
            </div>

            <div className="footer-socials">
              <a href="#" className="social-btn" aria-label="GitHub">
                <i className="fab fa-github" />
              </a>
              <a href="#" className="social-btn" aria-label="Twitter">
                <i className="fab fa-twitter" />
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" className="social-btn" aria-label="LinkedIn">
                <i className="fab fa-linkedin" />
              </a>
              <a href="#" className="social-btn" aria-label="YouTube">
                <i className="fab fa-youtube" />
              </a>
              <a href="#" className="social-btn" aria-label="Discord">
                <i className="fab fa-discord" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="col-dot" /> Quick Links
            </h4>
            <ul>
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/gpa" className="footer-link">GPA Calculator</a></li>
              <li><a href="/resume" className="footer-link">Resume Builder</a></li>
              <li><a href="/about" className="footer-link">About</a></li>
            </ul>
          </div>

          {/* TOOLS */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="col-dot col-dot-accent" /> Resources
            </h4>
            <ul>
              <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
              <li><a href="/terms"   className="footer-link">Terms of Use</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>

            <div className="footer-stats">
              <div className="fstat">
                <strong>11+</strong>
                <span>Free Tools</span>
              </div>
              <div className="fstat">
                <strong>100%</strong>
                <span>Free</span>
              </div>
            </div>
          </div>

          {/* FOLLOW US */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="col-dot" style={{ background: "#60a5fa" }} /> Follow Us
            </h4>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href="#" className="social-btn" aria-label="Twitter"><i className="fab fa-twitter" /></a>
              <a href="#" className="social-btn" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href="#" className="social-btn" aria-label="GitHub"><i className="fab fa-github" /></a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© 2026 <strong style={{ color: "#e2e8f0" }}>SparkDesk</strong>. All rights reserved.</p>
          <p className="footer-made">
            Made with <span className="heart">♥</span> for students
          </p>
          <div className="footer-bottom-links">
            <a href="/privacy" className="footer-link">Privacy</a>
            <span>·</span>
            <a href="/terms"   className="footer-link">Terms</a>
            <span>·</span>
            <a href="/contact" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;