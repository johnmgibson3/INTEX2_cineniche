import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import MobileFooter from '../components/MobileFooter';
import Footer from '../components/Footer'; // Import the new Footer component
import '../css/Layout.css';
import '../css/ButtonFixes.css'; // Import our new button fixes

const Layout: React.FC = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll top initialization (omitted for brevity)

  return (
    <>
      <Header />
      <div className="main-content">
        <Outlet />
      </div>

      {isMobile ? <MobileFooter /> : <Footer />}

      {/* Scroll Top Button */}
      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};

export default Layout;
