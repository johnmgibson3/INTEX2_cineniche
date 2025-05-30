import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginBox.css';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword] = useState(false);

  const sendLogin = async (e: { preventDefault: () => void }) => {

    e.preventDefault();

    try {
      // Replace with your actual login logic
      const response = await fetch('https://cinenicheback-arfmceaefxg5dqb9.westcentralus-01.azurewebsites.net/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: uid, password }),
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        // handle successful login
        setMessage('Login successful!');
        setTimeout(() => navigate('/movies'), 1000); // Redirect after 1s
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (error) {
      setMessage('An error occurred');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 id="pythonTitle">Sign-In</h1>
        <form id="loginForm" onSubmit={sendLogin}>
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
            <button type="submit">Login</button>
          </p>
          <p id="message" style={{ color: 'red' }}>
            {message}
          </p>

          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            Not a member?{' '}
            <Link to="/register" style={{ color: '#007bff', textDecoration: 'underline' }}>
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
