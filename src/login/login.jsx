import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
import './login.css';

export function Login({ userName, authState, onAuthChange }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (authState === AuthState.Authenticated) {
      navigate('/studyroom');
    }
  }, [authState, navigate]);

  return (
    <main>
      <div>
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}