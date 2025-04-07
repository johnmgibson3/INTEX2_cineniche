import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Header.css';

const Header: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle mobile nav toggle
    const handleMobileNavToggle = () => {
      document.querySelector('body')?.classList.toggle('mobile-nav-active');
      document.querySelector('.mobile-nav-toggle')?.classList.toggle('bi-list');
      document.querySelector('.mobile-nav-toggle')?.classList.toggle('bi-x-lg');
    };

    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', handleMobileNavToggle);
    }

    // Add event listener for navmenu toggles
    const toggleBtns = document.querySelectorAll('.toggle-dropdown');
    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = (e.currentTarget as HTMLElement).closest('li');
        if (parent) {
          parent.classList.toggle('dropdown-active');
          const dropdown = parent.querySelector('ul');
          if (dropdown) {
            dropdown.classList.toggle('dropdown-active');
          }
        }
      });
    });

    // Cleanup function
    return () => {
      if (mobileNavToggle) {
        mobileNavToggle.removeEventListener('click', handleMobileNavToggle);
      }
      toggleBtns.forEach((btn) => {
        btn.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid position-relative d-flex align-items-center">
        <Link to="/" className="logo d-flex align-items-center me-auto">
          {/* Uncomment if you have a logo */}
          {/* <img src="/assets/img/logo.png" alt="" /> */}
          <h1 className="sitename">CineNiche</h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul>
            <li>
              <Link
                to="/home"
                className={location.pathname === '/home' ? 'active' : ''}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={location.pathname === '/contact' ? 'active' : ''}
              >
                Contact
              </Link>
            </li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        <Link className="btn-getstarted" to="/signup">
          Create Account
        </Link>
        <Link className="btn-getstarted" to="/signup">
          Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
