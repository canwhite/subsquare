const { MongoClient } = require("mongodb");

const dbName = process.env.MONGO_DB_COMMON_NAME || "subsquare-common";

const userCollectionName = "user";
const attemptCollectionName = "attempt";

let client = null;
let db = null;

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
let userCol = null;
let attemptCol = null;

async function initDb() {
  client = await MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
  });

  db = client.db(dbName);
  userCol = db.collection(userCollectionName);
  attemptCol = db.collection(attemptCollectionName);

  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  userCol.createIndex({ username: 1 }, { unique: true });
  userCol.createIndex({ email: 1 }, { unique: true });

  attemptCol.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });

}

async function tryInit(col) {
  if (!col) {
    await initDb();
  }
}

async function getUserCollection() {
  await tryInit(userCol);
  return userCol;
}

function withTransaction(fn, options) {
  return client.withSession((session) => {
    return session.withTransaction(fn, options);
  });
}

async function getAttemptCollection() {
  await tryInit(attemptCol);
  return attemptCol;
}

module.exports = {
  initDb,
  withTransaction,
  getUserCollection,
  getAttemptCollection,
};
