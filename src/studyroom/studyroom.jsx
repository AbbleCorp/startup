import React from 'react';
import { useNavigate } from 'react-router-dom';
import './studyroom.css';
import { AuthState } from '../login/authState';
import { Simulator } from './eventHandler';

export function Studyroom({ onAuthChange }) {
  const [log, setLog] = React.useState([]);
  const [username, setUsername] = React.useState('');
  const [fact, setFact] = React.useState('Let\'s get started! Did you know?\n');
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch('/api/log')
      .then((response) => response.json())
      .then((fetchedLog) => {
        if (fetchedLog.length === 0) {
          const initialLog = ['Everyone is studying hard!'];
          setLog(initialLog);
        } else {
          setLog(fetchedLog);
        }
      })
      .catch((error) => {
        console.error('Error fetching log:', error);
        const initialLog = ['Everyone is studying hard!'];
        setLog(initialLog);
      });
  }, []);

  React.useEffect(() => {
    let userName = localStorage.getItem('username');
    setUsername(userName);
    }, []);

  React.useEffect(() => {
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
      .then((response) => response.json())
      .then((randFact) => {
        setFact(fact + randFact.text);
      });
  }, []);

  const updateSessionLog = async (logUpdate) => {
    await fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({log: logUpdate}),
    });
  };

  const handleEndSession = () => {
    const endLog = `${username} is done studying!`;
    updateSessionLog(endLog);
    onAuthChange('', AuthState.Unauthenticated);
    fetch('/api/auth/logout', {
      method: 'DELETE',
    });
    navigate('/login');
  };

  const handleEncouragement = () => {
    updateSessionLog(`${username} is sending encouragement!`);
  };

  const updateProjects = async () => {
    const projectUpdate = {
      username: username,
      lastCompleted: new Date().toISOString().split('T')[0],
    };
    await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(projectUpdate),
    });
    updateSessionLog(`${username} has completed a project!`);
  };



  return (
    <main>
      {/* <Simulator updateSessionLog={updateSessionLog} /> */}
      <div className="fact-box">
        <p className="fact">{fact}</p>
        <p className="welcome">Welcome to StudyBud! Mark projects off, or send others encouragement with the buttons below!</p>
      </div>
      <hr />
      <div className="display-box">
        {/* {log.map((entry, index) => (
          <p key={index} className="display-text">{entry.logs.map((log) => (<p className="log">{log}</p>))}</p>
        ))} */ <p>put websocket log here</p>}
      </div>
      <br />
      <div className="btn-group">
        <button type="button" className="btn btn-primary" onClick={updateProjects}>Complete Project</button>
        <button type="button" className="btn btn-primary" onClick={handleEncouragement}>Send Encouragement</button>
        <button type="button" className="btn btn-primary" onClick={handleEndSession}>End Study Session</button>
      </div>
      <br />
      <hr />
    </main>
  );
}