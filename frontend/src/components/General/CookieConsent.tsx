// components/CookieConsent.tsx
import React, { useEffect, useState } from 'react';

const COOKIE_CONSENT_KEY = 'cookie_consent';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white shadow-lg border p-4 rounded-md z-50 max-w-xl mx-auto">
      <p className="text-sm text-gray-800 mb-2">
        We use cookies to enhance your experience. By continuing to visit this
        site you agree to our use of cookies.
      </p>
      <div className="flex justify-end">
        <button
          onClick={acceptCookies}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
