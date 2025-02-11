import React from 'react';
import './about.css';

export function About() {
  return (
    <main className="container-fluid text-center">
    <div id="picture" className="picture-box"><img className="image" src="studying_meme.jpg" alt="random" /></div>

    <div>
    <p>
      StudyBud is a web application that allows students to join a virtual study room to help each other 
      stay accountable. Students can send each other encouragement that will or indicate that that they have 
      completed their assignment. Similar to a scoreboard, the Project Completion Tracker displays how many projects 
      a student has completed while logged into the study room. 
    </p>
    </div>
    </main>
  );
}