import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState(''); // New email state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [, setMessage] = useState('');
  //const [message, setMessage] = useState('');
  const [showPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();
  const rules = {
    length: password.length >= 14,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    digit: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    unique: new Set(password).size >= 6,
  };
  const allValid = Object.values(rules).every(Boolean);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!uid || !email || !password || !confirmPassword) {
      setMessage('Please fill in all fields.');
      return;
    } else if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('https://localhost:5000/api/Auth/register', {
        // Updated URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Needed for cookie-based auth if required
        body: JSON.stringify({ username: uid, email, password }), // Updated payload
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Registration successful! Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  // TBH don't remember what this was for, but im pretty sure its not being used
  // const handleLoginRedirect = () => {
  //   navigate('/login');
  // };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 id="pythonTitle">Register</h1>
        <form id="loginForm" onSubmit={handleRegister}>
          <p>
            <label htmlFor="uid">
              Username:
              <input
                type="username"
                name="uid"
                id="uid"
                required
                value={uid}
                onChange={(e) => setUid(e.target.value)}
              />
            </label>
          </p>

          <p>
            <label htmlFor="email">
              Email:
              <input
                type="text"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </p>

          <p>
            <label htmlFor="password">
              Password:
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordTouched(true)}
              />
            </label>
          </p>

          {passwordTouched && (
            <ul
              style={{
                fontSize: '0.85rem',
                marginTop: '0.5rem',
                color: '#ccc',
              }}
            >
              <li style={{ color: rules.length ? 'green' : 'red' }}>
                At least 14 characters
              </li>
              <li style={{ color: rules.upper ? 'green' : 'red' }}>
                One uppercase letter
              </li>
              <li style={{ color: rules.lower ? 'green' : 'red' }}>
                One lowercase letter
              </li>
              <li style={{ color: rules.digit ? 'green' : 'red' }}>
                One number
              </li>
              <li style={{ color: rules.special ? 'green' : 'red' }}>
                One special character
              </li>
              <li style={{ color: rules.unique ? 'green' : 'red' }}>
                At least 6 unique characters
              </li>
            </ul>
          )}

          <p>
            <label htmlFor="confirmPassword">
              Confirm Password:
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </p>

          <p>
            <button type="submit" disabled={!allValid}>
              Register
            </button>
          </p>

          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            Already a member?{' '}
            <Link
              to="/login"
              style={{ color: '#007bff', textDecoration: 'underline' }}
            >
              Sign-In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
