import React from 'react';
import '../css/MobileFooter.css';

const CompactMobileFooter: React.FC = () => {
  return (
    <footer className="compact-footer">
      <div className="container">
        <div className="footer-row">
          <div className="footer-section">
            <h4>Address</h4>
            <p>A108 Adam Street, NY 535022</p>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>
              <a href="tel:+15589554885">+1 5589 55488 55</a> |
              <a href="mailto:info@example.com"> info@example.com</a>
            </p>
          </div>
        </div>

        <div className="footer-row">
          <div className="footer-section">
            <h4>Hours</h4>
            <p>Mon-Sat: 11AM-23PM | Sunday: Closed</p>
          </div>

          <div className="footer-section social-section">
            <div className="social-links">
              <a href="#" aria-label="Twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p>© Serenity</p>
        </div>
      </div>
    </footer>
  );
};

export default CompactMobileFooter;
