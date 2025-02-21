import React from 'react';
import { useNavigate } from 'react-router-dom';
import './studyroom.css';
import { AuthState } from '../login/authState';

export function Studyroom({ onAuthChange }) {
  const navigate = useNavigate();

  const handleEndSession = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    onAuthChange('', AuthState.Unauthenticated);
    navigate('/login');
  };

  return (
    <main>
      <div className="fact-box">
        <p className="fact"> Placeholder for 3rd party API-call - will display some message encouraging users to study followed by a random fun fact from the API </p>
        <p className="welcome"> Placeholder for a welcome message</p>
      </div>
      <hr />
      <div className="display-box">
        <p className="display-text"> Placeholder for scrolling textbox that displays updates about users joining, leaving, completing projects, or sending encouragement </p>
      </div>
      <br />
      <div className="btn-group">
        <button type="button" className="btn btn-primary">Complete Project</button>
        <button type="button" className="btn btn-primary">Send Encouragement</button>
        <button type="button" className="btn btn-primary" onClick={handleEndSession}>End Study Session</button>
      </div>
      <br />
      <hr />
    </main>
  );
}