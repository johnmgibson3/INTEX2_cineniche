// CookieConsent.tsx
import React, { useEffect, useState } from 'react';
import './CookieConsent.css';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookieAccepted');
    const denied = localStorage.getItem('cookieDenied');
    if (!accepted && !denied) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setVisible(false);
  };

  const handleDeny = () => {
    localStorage.setItem('cookieDenied', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-popup">
      <p>
        We use cookies to enhance your experience. By continuing to visit this
        site you agree to our use of cookies.
      </p>
      <div className="cookie-actions">
        <button className="cookie-accept" onClick={handleAccept}>
          Accept
        </button>
        <button className="cookie-deny" onClick={handleDeny}>
          Deny
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
