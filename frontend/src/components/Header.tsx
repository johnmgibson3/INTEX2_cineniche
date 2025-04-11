import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/Header.css';
import { fetchUser, logoutUser } from '../api/AuthApi';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUser().then(setUser).catch(() => setUser(null));
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Mobile nav toggle remains the same
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
    <header
      id="header"
      className="header d-flex align-items-center sticky-top"
      style={{ backgroundColor: "rgba(28,28,28,0.95)", boxShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
    >
      <div className="container-fluid position-relative d-flex align-items-center">
        <Link
          to="/"
          className="logo d-flex align-items-center me-auto"
          style={{ textDecoration: "none" }}
        >
          <img src="/img/logo.png" alt="Logo" />
          <h1 className="sitename" style={{ margin: 0, color: "#fff" }}>CineNiche</h1>
        </Link>

        <nav id="navmenu" className="navmenu">
          <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
            <li style={{ marginLeft: "25px" }}>
              <Link 
                to="/home" 
                className={location.pathname === '/home' ? 'active' : ''}
                style={{ textDecoration: "none", fontSize: "16px" }}
              >
                Home
              </Link>
            </li>
            <li style={{ marginLeft: "25px" }}>
              <Link 
                to="/movies" 
                className={location.pathname === '/movies' ? 'active' : ''}
                style={{ textDecoration: "none", fontSize: "16px" }}
              >
                Movies
              </Link>
            </li>
            <li style={{ marginLeft: "25px" }}>
              <Link 
                to="/contact" 
                className={location.pathname === '/contact' ? 'active' : ''}
                style={{ textDecoration: "none", fontSize: "16px" }}
              >
                Contact
              </Link>
            </li>
            {user && user.isAdmin && (
              <li style={{ marginLeft: "25px" }}>
                <Link 
                  to="/admin" 
                  className={location.pathname === '/admin' ? 'active' : ''}
                  style={{ textDecoration: "none", fontSize: "16px" }}
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        {user ? (
          <div
            className="dropdown"
            ref={dropdownRef}
            style={{ position: "relative", marginLeft: "1rem", display: "flex", alignItems: "center" }}
          >
            <button
              className="dropbtn"
              onClick={() => setDropdownOpen(prev => !prev)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontWeight: "500",
                cursor: "pointer",
                outline: "none",
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                transition: "color 0.3s"
              }}
              onMouseOver={e => (e.currentTarget.style.color = "#ba1d2b")}
              onMouseOut={e => (e.currentTarget.style.color = "#fff")}
            >
              {user.username}
              <span
                style={{
                  display: "inline-block",
                  marginLeft: "6px",
                  transition: "transform 0.3s",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)"
                }}
              >
                ▼
              </span>
            </button>
            {dropdownOpen && (
              <div
                className="dropdown-content"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "4px",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                  minWidth: "160px"
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "10px 16px",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#0dcaf0",
                    outline: "none",
                    transition: "background 0.3s"
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = "#f5f5f5")}
                  onMouseOut={e => (e.currentTarget.style.background = "none")}
                >
                  Logout
                </button>
              </div>
            )}
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
