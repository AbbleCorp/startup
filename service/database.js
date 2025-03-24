const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('studyBud');
const userCollection = db.collection('user');
const projectCollection = db.collection('projects'); // Corrected collection name
const logCollection = db.collection('log');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(username) {
  return userCollection.findOne({ username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function updateProject(projectUpdate) {
  await projectCollection.updateOne(
    { username: projectUpdate.username },
    {
      $inc: { count: 1 }, // Increment the count attribute
      $set: { lastCompleted: projectUpdate.lastCompleted } // Update the lastCompleted attribute
    },
    { upsert: true } // Ensure that the document is created if it does not exist
  );
}

async function updateLog(logUpdate) {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const logEntry = await logCollection.findOne({ date: today });

  if (logEntry) {
    // If an entry exists for today's date, update it by adding the new log item
    await logCollection.updateOne(
      { date: today },
      { $push: { logs: logUpdate } }
    );
  } else {
    // If no entry exists for today's date, create a new log entry
    const newLogEntry = {
      date: today,
      logs: [logUpdate],
    };
    await logCollection.insertOne(newLogEntry);
  }
}

async function getProjects() {
  const query = {};
  const options = {
    sort: { lastCompleted: -1 }, // Sort by lastCompleted in descending order
  };
  const cursor = projectCollection.find(query, options);
  return cursor.toArray();
}

function getLog() {
  return logCollection.find({}).toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateProject,
  getProjects,
  updateLog,
  getLog
};
