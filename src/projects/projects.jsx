import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './projects.css';

export function Projects() {
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
                <th scope="col">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>User1</td>
                <td>23</td>
                <td>January 31, 2025</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>User2</td>
                <td>17</td>
                <td>January 18, 2025</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>User3</td>
                <td>9</td>
                <td>January 2, 2025</td>
              </tr>
            </tbody>
          </table>
              </main>
  );
}