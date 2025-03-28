# StudyBud

[My Notes](notes.md)

StudyBud is a web application that allows students to join a virtual study room to help each other stay accountable. They will login, and the application will show a list of students currently joined. Students can send each other encouragement that will or send a notification indicating that they have completed their assignment. Similar to a scoreboard, there is a page that displays how many projects a student has completed while logged into the study room. When a student enters, leaves, sends encouragement, or completes an assignment, a notification message is sent to other students currently in the study room.


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] Proper use of Markdown
- [X] A concise and compelling elevator pitch
- [X] Description of key features
- [X] Description of how you will use each technology
- [X] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Study groups help hold one accountable, but sometimes in-person study sessions just aren't realistic. The StudyBud application allows students to join a virtual study room with other students to stay more productive and get more done. As each student joins, other students are notified so they can send each other encouragement. As a student finishes an assignment, they can add it to their total completed projects, so students can look back and see how much they've accomplished while studying with StudyBud. Upon indicating project completion, other students are notified so they can celebrate together!

### Design


<img width="904" alt="StudyBudDesignDraft" src="https://github.com/user-attachments/assets/b8649ba5-2ee2-4804-b4cc-be70e8804eb9" />


### Sequence Diagram
This is a sequence diagram showing the interaction of users with the backend
![StudyBudSequenceDiagram](https://github.com/user-attachments/assets/a621ad10-f12c-4efc-896c-ffc957f0af39)



### Key features

- Secure login over HTTPS
- Ability to send other users encouragement
- Display of users currently joined
- Ability to indicate that you've completed a project, notification sent to other joined users
- Display of joined students' project completion stats
- Displayed stats update in real-time
- Completion stats are persistently stored
- Notifications sent to other users when one user joins/leaves

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Uses correct HTML structure for application. Two HTML pages. One for login and one displaying the study room. Hyperlinks to choice artifact.
- **CSS** - Application styling for different screen sizes, soft colors, good whitespace
- **React** - Provides login/registration, joined users display, functional buttons for sending encouragement/completing projects, use of React for routing and other components
- **Service** - Backend Service with endpoints for:
  - Login
  - Register
  - Logout
  - Sending encouragement
    - display either cat picture (using service https://cataas.com/) or random fact (using https://uselessfacts.jsph.pl/) 
  - Completing Project
- **DB/Login** - Store users and completed project stats in database. Register and login users with account info securely stored in database. Can't join study room unless logged in.
- **WebSocket** - When users join, leave, send encouragement, and complete projects, notifications are broadcast to all other users

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Server deployed and accessible with custom domain name** - [My server link](https://abblecorp.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **HTML pages** - I created four html pages, the home/login, about, project completion, and main study page.
- [X] **Proper HTML element usage** - I used proper html structure and tags for BODY, NAV, MAIN, HEADER, FOOTER.
- [X] **Links** - I included links between pages for easier navigation, but may remove some links later.
- [X] **Text** - Added textual content and placeholders.
- [X] **3rd party API placeholder** - I added a placeholder for 3rd party API.
- [X] **Images** - I included an image on the about page.
- [X] **Login placeholder** - I included a login placeholder.
- [X] **DB data placeholder** - I included a placeholder for the DB data on the Project Completion page.
- [X] **WebSocket placeholder** - I included a websocket placeholder on the main study page.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Header, footer, and main content body** - I styled the header and footer to look the same across all pages, with main content styled specific to each page.
- [X] **Navigation elements** - I styled the navigation elements to look the same across all pages, and to respond to hovering.
- [X] **Responsive to window resizing** - The page responds to window resizing.
- [X] **Application elements** - The studyroom page contains styled placeholders for the 3rd party API and websocket updates. The project completion tracker page contains a styled table as a placeholder for data.
- [X] **Application text content** - The about page contains text content about the application, and the placeholders have some text content (will later be replaced when API call is implemented).
- [X] **Application images** - The about page contains an image.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Bundled using Vite** - I bundled using vite.
- [X] **Components** - I have multiple react components.
- [X] **Router** - I have routing between different components instead of using anchor tags.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **All functionality implemented or mocked out** - I implemented login/register, completing projects, sending encouragement, and ending a study session. Used setInterval to simulate websocket messages from other users. Also simulated session logs, as well as set up React to do 3rd party API calls later on.
- [X] **Hooks** - I use several instances of useEffect and useState, primarily on the studyroom and projects pages.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Node.js/Express HTTP service** - I used node.js and express to implement my http service.
- [X] **Static middleware for frontend** - I used middleware to verify if a user is authorized, and to create and delete cookies.
- [X] **Calls to third party endpoints** - I call a third party endpoint on the studyroom page to display a fun fact.
- [X] **Backend service endpoints** - My backend provides the service endpoints in the index.js file.
- [X] **Frontend calls service endpoints** - My frontend code in my src folder calls the service endpoints.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **User registration** - Users can create an account and their info is saved in the database.
- [X] **User login and logout** - Users can login and logout.
- [X] **Stores data in MongoDB** - Users, projects, and the logs for each day are saved in MongoDB.
- [X] **Stores credentials in MongoDB** - Credentials are saved in MongoDB.
- [X] **Restricts functionality based on authentication** - You can't access certain pages without being authenticated.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
