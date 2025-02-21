import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Studyroom } from './studyroom/studyroom';
import { AuthState } from './login/authState';
import { Projects } from './projects/projects';
import { About } from './about/about';

export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  const handleAuthChange = (userName, authState) => {
    setUserName(userName);
    setAuthState(authState);
  };

  return (
    <BrowserRouter>
      <div className='body'>
        <header>
          <h3 className="title"> StudyBud</h3>
          <nav>
            <menu className="navbar-nav">
              <li className="nav-item"><NavLink className="nav-link active" to="login">Login</NavLink></li>
              {authState === AuthState.Authenticated && (<li className="nav-item"><NavLink className="nav-link active" to="studyroom">StudyRoom</NavLink></li>)}
              {authState === AuthState.Authenticated && (<li className="nav-item"><NavLink className="nav-link active" to="projects">Project Completion Tracker</NavLink></li>)}
              <li className="nav-item"><NavLink className="nav-link active" to="about">About</NavLink></li>
            </menu>
          </nav>
          <hr />
        </header>

        <Routes>
          <Route path='/' element={<Login onAuthChange={handleAuthChange} />} exact />
          <Route path='/login' element={<Login onAuthChange={handleAuthChange} />} exact />
          <Route path='/studyroom' element={<Studyroom />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <span className="text-reset">Abbie Omer</span>
          <a className="text-reset" href="https://github.com/AbbleCorp/startup/blob/main/README.md">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}