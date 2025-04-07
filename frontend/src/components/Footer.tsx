import React from 'react';
import '../css/Footer.css';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const location = useLocation();
  return (
    <footer className="footer dark-background">
      <div className="footer-fullwidth">
        <div className="footer-content">
          <div className="footer-row">
            <div className="footer-section">
              <h4>Address</h4>
              <p>A108 Adam Street, New York, NY 535022</p>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>
                <strong>Phone:</strong> +1 5589 55488 55
                <br />
                <strong>Email:</strong> info@example.com
              </p>
            </div>
            <div className="footer-section">
              <h4>Opening Hours</h4>
              <p>
                <strong>Mon-Sat:</strong> 11AM - 23PM
                <br />
                <strong>Sunday:</strong> Closed
              </p>
            </div>
            <div className="footer-section">
              <h4>Follow Us</h4>
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
          <div className="copyright text-center">
            <p>
              © <strong>CineNiche</strong> All Rights Reserved{' '}  
              <Link
                to="/privacy"
                className={location.pathname === '/privacy' ? 'active' : ''}
              >
                Privacy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
