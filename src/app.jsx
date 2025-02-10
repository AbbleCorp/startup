import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
  <div className='body'>
  <header>
  <h3 className="title"> StudyBud</h3>
  <nav>
  <menu class="navbar-nav">
      <li class="nav-item"><a class="nav-link active"href="index.html">Home</a></li>
      <li class="nav-item"><a class="nav-link active"href="studyroom.html">StudyRoom</a></li>
      <li class="nav-item"><a class="nav-link active"href="projects.html">Project Completion Tracker</a></li>
      <li class="nav-item"><a class="nav-link active"href="about.html">About</a></li>
    </menu>
</nav>

  <hr />
</header>

   <main>App will display here</main>

  <footer>
            <span className="text-reset">Abbie Omer</span>
                <a className="text-reset" to="https://github.com/AbbleCorp/startup/blob/main/README.md">GitHub</a>
        </footer>
        </div>
        );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}