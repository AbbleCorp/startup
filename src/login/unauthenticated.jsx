import React, { useState } from 'react';

export function Unauthenticated({ userName: initialUserName, onLogin }) {
  const [userName, setUserName] = useState(initialUserName);
  const [password, setPassword] = useState('');
  const [displayError, setDisplayError] = useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('username', userName);
      onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const action = event.nativeEvent.submitter.name;
    if (action === 'login') {
      loginUser();
    } else if (action === 'register') {
      createUser();
    }
  }

  const isFormValid = userName && password;

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
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
        <button type="submit" className="btn btn-primary" name="login" disabled={!isFormValid}>
          Login
        </button>
        <button type="submit" className="btn btn-primary" name="register" disabled={!isFormValid}>
          Register
        </button>
      </form>
      {displayError && <p>{displayError}</p>}
    </main>
  );
}