import React from 'react';

const usernames = ['user1', 'user2', 'user3'];

const getRandomUsername = () => {
  return usernames[Math.floor(Math.random() * usernames.length)];
};

const getRandomMessage = (username) => {
  const messages = [
    `${username} has completed a project!`,
    `${username} is sending encouragement!`
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

export function Simulator({ updateSessionLog }) {
  React.useEffect(() => {
    const interval = setInterval(() => {
      const username = getRandomUsername();
      const message = getRandomMessage(username);
      updateSessionLog(message);
    }, 7000); // Generate a message every 7 seconds

    return () => clearInterval(interval);
  }, [updateSessionLog]);

  return null; 
}