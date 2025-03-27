import React from 'react';
import { useNavigate } from 'react-router-dom';
import './studyroom.css';
import { AuthState } from '../login/authState';
import { Simulator } from './eventHandler';
import {StudyEvent, Notifier} from './Notifier';

export function Studyroom({ onAuthChange }) {
  const [log, setLog] = React.useState([]);
  const [username, setUsername] = React.useState(localStorage.getItem('username'));
  const [fact, setFact] = React.useState('Let\'s get started! Did you know?\n');
  const navigate = useNavigate();



    React.useEffect(() => {
    const userName = localStorage.getItem('username');
    if (!userName) {
      navigate('/login'); // Redirect to login page if not authenticated
    } else {
      setUsername(userName);
    }
  }, [navigate]);

  React.useEffect(() => {
    fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
      .then((response) => response.json())
      .then((randFact) => {
        setFact(fact + randFact.text);
      });
  }, []);

  React.useEffect(() => {
    Notifier.addHandler(handleEvent);
    return () => {
      Notifier.removeHandler(handleEvent);
    };
  });

  function handleEvent(event) {
    setLog([...log, event]);
  }

  const updateSessionLog = async (logUpdate) => {
    await fetch('/api/log', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({log: logUpdate}),
    });
  };

  function createLogArray() {
    const logArray = [];
    for (const [i, event] of log.entries()) {
      let message = 'null';
      if (event.type === StudyEvent.Encouragement) {
        message = `${username} sent encouragement!`;
      } else if (event.type === StudyEvent.CompleteProject) {
        message = `${username} completed a project!`;
      } else if (event.type === StudyEvent.EndSession) {
        message = `${username} ended their study session!`;
      } else if (event.type === StudyEvent.userJoin) {
        message = `${username} joined the study session!`;
      }

      logArray.push(
        <div key={i} className='log-event'>
          <span className={'study-event'}>{event.from.split('@')[0]}</span>
        </div>
      );
    }
    return logArray;
  }

  const handleEndSession = () => {
    const endLog = `${username} is done studying!`;
    Notifier.broadcastEvent(username, StudyEvent.End, {});
    onAuthChange('', AuthState.Unauthenticated);
    fetch('/api/auth/logout', {
      method: 'DELETE',
    });
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleEncouragement = () => {
    Notifier.broadcastEvent(username, StudyEvent.Encouragement, {});
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
    Notifier.broadcastEvent(username, StudyEvent.Project, {});
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
        <div id = 'log-box'>{createLogArray()}</div>
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