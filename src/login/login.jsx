import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { AuthState } from './authState';

export function Login({ authState, onAuthChange }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const isFormValid = username && password;

  const handleSubmit = (e, action) => {
    e.preventDefault();
    if (action === 'login') {
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');
      if (storedUsername === username && storedPassword === password) {
        onAuthChange(username, AuthState.Authenticated);
      } else {
        alert('Invalid username or password');
      }
    } else if (action === 'register') {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      onAuthChange(username, AuthState.Authenticated);
    }
  };

  if (authState === AuthState.Authenticated) {
    navigate('/studyroom');
  }

  return (
    <main>
      <form>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            className="input"
            name="varUsername"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            className="input"
            name="varPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid}
          onClick={(e) => handleSubmit(e, 'login')}
        >
          Login
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isFormValid}
          onClick={(e) => handleSubmit(e, 'register')}
        >
          Register
        </button>
      </form>
    </main>
  );
}