import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

export default function RegisterForm() {
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState('');  // New email state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword] = useState(false);
  const navigate = useNavigate();

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
      const response = await fetch('https://localhost:5000/api/Auth/register', { // Updated URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',  // Needed for cookie-based auth if required
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

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 id="pythonTitle">Register</h1>
        <form id="loginForm" onSubmit={handleRegister}>
          <p>
            <label htmlFor="uid">
              Username:
              <input
                type="text"
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
                type="email"
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
              />
            </label>
          </p>
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
            <button type="submit">Register</button>
          </p>
          <p>
            <button type="button" onClick={handleLoginRedirect}>
              Go to Login
            </button>
          </p>
          <p id="message" style={{ color: 'red' }}>{message}</p>
        </form>
      </div>
    </div>
  );
}
