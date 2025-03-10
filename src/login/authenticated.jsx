import React from 'react';
import { useNavigate } from 'react-router-dom';

//import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
    // localStorage.removeItem('userName');
    // props.onLogout();
  }

  return (
    <div>
    </div>
  );
}
