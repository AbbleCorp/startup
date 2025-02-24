import React from 'react';
import { useNavigate } from 'react-router-dom';
import './studyroom.css';
import { AuthState } from '../login/authState';

export function Studyroom({ onAuthChange }) {
  const [log, setLog] = React.useState(() => {
    const savedLog = localStorage.getItem('sessionLog');
    if (savedLog) {
      return JSON.parse(savedLog);
    } else {
      const initialLog = ['Everyone is studying hard!'];
      localStorage.setItem('sessionLog', JSON.stringify(initialLog));
      return initialLog;
    }
  });
  const [fact, setFact] = React.useState('Let\'s get started! Did you know?\n');
  const navigate = useNavigate();

  React.useEffect(() => {
    setFact(fact + '90% of the world\'s data was created within the last two years.'); 
  }, []);

  React.useEffect(() => {
    localStorage.setItem('sessionLog', JSON.stringify(log));
  }, [log]);

  const updateSessionLog = (logUpdate) => {
    setLog((prevLog) => [...prevLog, logUpdate]);
  };

  const handleEndSession = () => {
    const username = localStorage.getItem('username');
    setLog((prevLog) => [...prevLog, `${username} is done studying!`]);
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setLog(['Everyone is studying hard!']);
    localStorage.removeItem('sessionLog');
    onAuthChange('', AuthState.Unauthenticated);
    navigate('/login');
  };

  const updateProjectsLocal = (username) => {
    let projects = {};
    const projectsText = localStorage.getItem('projects');
    if (projectsText) {
      projects = JSON.parse(projectsText);
    }
    const currentDate = new Date().toISOString().split('T')[0];
    if (projects[username]) {
      projects[username].count += 1; // Increment the project count for the user
    } else {
      projects[username] = { count: 1, lastCompleted: currentDate }; // Initialize the project count and timestamp for the user
    }
    projects[username].lastCompleted = currentDate; // Update the last completed timestamp

    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const handleEncouragement = () => {
    const username = localStorage.getItem('username');
    if (username) {
      updateSessionLog(`${username} is sending encouragement!`);
    }
  };

  const handleProjectCompletion = () => {
    const username = localStorage.getItem('username');
    if (username) {
      updateProjectsLocal(username);
      updateSessionLog(`${username} has completed a project!`);
    }
  };

  return (
    <main>
      <div className="fact-box">
        <p className="fact">{fact}</p>
        <p className="welcome">Welcome to StudyBud! Mark projects off, or send others encouragement with the buttons below!</p>
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