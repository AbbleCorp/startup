import React from 'react';

export function Login() {
  return (
    <main>
    <form method="get" action="studyroom">
        <div>
        <label for="username">Username: </label>
        <input type="text" className="input" name="varUsername" placeholder="Username"/>
        </div>
        <br />
        <div>
        <label for="password">Password: </label>
        <input type="password" className="input" name="varPassword" placeholder="Password" />
            
</div>
<br />
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
      
</main>
  );
}