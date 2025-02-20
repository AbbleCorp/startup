import React, { useState } from 'react';
import './login.css';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = username && password;

  return (
    <main>
      <form method="get" action="studyroom">
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