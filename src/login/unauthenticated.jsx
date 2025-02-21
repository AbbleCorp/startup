import React, { useEffect } from 'react';
import { AuthState } from './authState';

export function Unauthenticated({ onAuthChange }) {
  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      onAuthChange(AuthState.Authenticated);
    }
  }, [onAuthChange]);

  return (
    <main>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
          Login
        </button>
        <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
          Register
        </button>
      </form>
    </main>
  );
}