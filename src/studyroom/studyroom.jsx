import React from 'react';
import './studyroom.css';

export function Studyroom() {
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
          <button type="Complete" className="btn btn-primary">Complete Project</button>
          <button type="Encouragement" className="btn btn-primary">Send Encouragement</button>
          <button type="EndSession" className="btn btn-primary">End Study Session</button>
          </div>
          <br />
        <hr />
</main>
  );
}