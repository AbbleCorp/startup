import React from 'react';
import { useNavigate } from 'react-router-dom';
import './studyroom.css';
import { AuthState } from '../login/authState';

export function Studyroom({ onAuthChange }) {
  const [log, setLog] = React.useState(['Everyone is studying hard!']);
  const navigate = useNavigate();

  const handleEndSession = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    onAuthChange('', AuthState.Unauthenticated);
    navigate('/login');
  };

  const updateProjectsLocal = (username) => {
    let projects = {};
    const projectsText = localStorage.getItem('projects');
    if (projectsText) {
      projects = JSON.parse(projectsText);
    }
    if (projects[username]) {
      projects[username].count += 1; // Increment the project count for the user
    } else {
      projects[username] = { count: 1, lastCompleted: new Date().toISOString() }; // Initialize the project count and timestamp for the user
    }
    projects[username].lastCompleted = new Date().toISOString(); // Update the last completed timestamp

    localStorage.setItem('projects', JSON.stringify(projects));
  };


  const handleEncouragement = () => {
    const username = localStorage.getItem('username');
    if (username) {
    setLog((prevLog) => [...prevLog, `${username} is sending everyone encouragement!`]);
    }
  }

  const handleProjectCompletion = () => {
    const username = localStorage.getItem('username');
    if (username) {
      updateProjectsLocal(username);
      setLog((prevLog) => [...prevLog, `${username} has completed a project!`]);
    }
  };

  return (
    <main>
      <div className="fact-box">
        <p className="fact"> Placeholder for 3rd party API-call - will display some message encouraging users to study followed by a random fun fact from the API </p>
        <p className="welcome"> Placeholder for a welcome message</p>
      </div>
      <hr />
      <div className="display-box">
        {log.map((entry, index) => (
          <p key={index} className="display-text">{entry}</p>
        ))}
      </div>
      <br />
      <div className="btn-group">
        <button type="button" className="btn btn-primary" onClick={handleProjectCompletion}>Complete Project</button>
        <button type="button" className="btn btn-primary" onClick={handleEncouragement}>Send Encouragement</button>
        <button type="button" className="btn btn-primary" onClick={handleEndSession}>End Study Session</button>
      </div>
      <br />
      <hr />
    </main>
  );
}