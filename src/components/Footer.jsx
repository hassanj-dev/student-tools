import React from "react";

const Footer = () => {
  return (
    <>
      {/* Wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
            fill="#0f172a"
          />
        </svg>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">

          {/* BRAND */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.png" alt="Logo" className="brand-logo" />
              <div>
                <h3>SparkDesk</h3>
                <p>Study smarter, stay organized.</p>
              </div>
            </div>

            <p className="footer-tagline">
              A free all-in-one toolkit built for students — GPA, resume, planner and more.
            </p>

            {/* Subscribe */}
            <div className="footer-subscribe">
              <i className="fa fa-envelope subscribe-icon"></i>
              <input type="email" placeholder="your@email.com" />
              <button>Subscribe</button>
            </div>

            {/* Socials */}
            <div className="footer-socials">
              <a href="#" className="social-btn"><i className="fab fa-github"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-youtube"></i></a>
              <a href="#" className="social-btn"><i className="fab fa-discord"></i></a>
            </div>
          </div>

          {/* TOOLS */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="col-dot"></span> Tools
            </h4>
            <ul>
              <li><a href="https://www.sparkdesk.online/gpa" className="footer-link">GPA Calculator</a></li>
              <li><a href="https://www.sparkdesk.online/word-counter" className="footer-link">Word Counter</a></li>
              <li><a href="https://www.sparkdesk.online/resume" className="footer-link">Resume Builder</a></li>
              <li><a href="https://www.sparkdesk.online/pomodoro" className="footer-link">Pomodoro Timer</a></li>
              <li><a href="https://www.sparkdesk.online/flashcards" className="footer-link">Flashcards</a></li>
              <li><a href="https://www.sparkdesk.online/pdf-notes" className="footer-link">PDF Notes</a></li>
              <li><a href="https://www.sparkdesk.online/planner" className="footer-link">Planner</a></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div className="footer-col">
            <h4 className="footer-col-title">
              <span className="col-dot col-dot-accent"></span> Company
            </h4>
            <ul>
              <li><a href="https://www.sparkdesk.online/about" className="footer-link">About Us</a></li>
              <li><a href="https://www.sparkdesk.online/contact" className="footer-link">Contact</a></li>
              <li><a href="https://www.sparkdesk.online/privacy" className="footer-link">Privacy Policy</a></li>
              <li><a href="https://www.sparkdesk.online/terms" className="footer-link">Terms of Use</a></li>
            </ul>

            <div className="footer-stats">
              <div className="fstat">
                <strong>11</strong>
                <span>Free Tools</span>
              </div>
              <div className="fstat">
                <strong>100%</strong>
                <span>Free</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© 2025 <strong>SparkDesk</strong>. All rights reserved.</p>
          <p className="footer-made">
            Made with <span className="heart">♥</span> for students
          </p>

          <div className="footer-bottom-links">
            <a href="https://www.sparkdesk.online/privacy" className="footer-link">Privacy</a>
            <span>·</span>
            <a href="https://www.sparkdesk.online/terms" className="footer-link">Terms</a>
            <span>·</span>
            <a href="https://www.sparkdesk.online/contact" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;