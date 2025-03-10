import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './projects.css';

export function Projects() {
  const [projects, setProjects] = React.useState({});



  React.useEffect(() => {
    fetch(`/api/projects`, {
      method: 'get',
    }).then((response) => response.json())
    .then((projects) => {setProjects(projects);
    });
  }, []);


  React.useEffect(() => {
    const interval = setInterval(() => {
      const projectsText = localStorage.getItem('projects');
      if (projectsText) {
        setProjects(JSON.parse(projectsText));
      }
    }, 1000); // Check for updates every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const projectRows = [];
  if (Object.keys(projects).length) {
    Object.entries(projects)
      .sort(([, a], [, b]) => b.count - a.count) // Sort by project count in descending order
      .forEach(([username, project], i) => {
        projectRows.push(
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{username}</td>
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
      <p>Keep track of how many projects you've completed!</p>
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