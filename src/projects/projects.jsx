import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './projects.css';

export function Projects() {
  const [projects, setProjects] = React.useState({});

  React.useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
    let projects = await fetch('/api/projects', {
      method: 'GET',
    }).then((response) => response.json());
    setProjects(projects);
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/projects`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((projects) => {
          setProjects(projects);
        })
        .catch((error) => {
          console.error('Error fetching projects:', error);
        });
    }, 3000); // Check for updates every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const projectRows = [];
  if (Object.keys(projects).length) {
    Object.entries(projects).forEach(([username, project], i) => {
        projectRows.push(
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{project.username}</td>
            <td>{project.count}</td>
            <td>{project.lastCompleted}</td>
          </tr>
        );
      });
  } else {
    projectRows.push(
      <tr key='0'>
        <td colSpan='4'>Be the first to complete a project!</td>
      </tr>
    );
  }

  return (
    <main>
      <h3>Project Completion Tracker</h3>
      <p>Keep track of how many projects have been completed while studying together!</p>
      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Project Count</th>
            <th scope="col">Last Completed</th>
          </tr>
        </thead>
        <tbody>{projectRows}</tbody>
      </table>
    </main>
  );
}