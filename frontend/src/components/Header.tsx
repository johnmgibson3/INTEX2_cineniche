import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Header.css';
import { fetchUser, logoutUser } from '../api/AuthApi';


const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchUser().then(setUser).catch(() => setUser(null));
  }, [location.pathname]);

  useEffect(() => {
    const handleMobileNavToggle = () => {
      document.querySelector('body')?.classList.toggle('mobile-nav-active');
      document.querySelector('.mobile-nav-toggle')?.classList.toggle('bi-list');
      document.querySelector('.mobile-nav-toggle')?.classList.toggle('bi-x-lg');
    };

    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', handleMobileNavToggle);
    }

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

    return () => {
      if (mobileNavToggle) {
        mobileNavToggle.removeEventListener('click', handleMobileNavToggle);
      }
      toggleBtns.forEach((btn) => {
        btn.removeEventListener('click', () => {});
      });
    };
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate('/login');
  };

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="container-fluid position-relative d-flex align-items-center">
        <Link to="/" className="logo d-flex align-items-center me-auto">
          <img src="/img/logo.png" alt="Logo" />
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
                to="/movies"
                className={location.pathname === '/movies' ? 'active' : ''}
              >
                Movies
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

        {user ? (
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>


              <span style={{ color: '#fff', fontWeight: '500' }}>
                Welcome, {user.username}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0dcaf0',
                  cursor: 'pointer',
                  fontWeight: '500',
                  padding: 0
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link className="btn-getstarted" to="/register">
                Create Account
              </Link>
              <Link className="btn-getstarted" to="/login">
                Login
              </Link>
            </>
          )}
      </div>
    </header>
  );
};

export default Header;