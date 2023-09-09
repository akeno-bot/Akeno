const { MongoClient } = require("mongodb");
const { Logger } = require("../../utils/logger");
const env = require("../../secret/env");

const logger = new Logger();

require("dotenv").config();

const dbClient = new MongoClient(env.MONGO_URI);

async function init() {
  try {
    await dbClient.connect();

    logger.log("Succesfully connected to MongoDB.");
  } catch (error) {
    logger.error("Something went wrong during MongoDB connection.");
    console.error(error);
    process.exit(1);
  }
}

const db = dbClient.db("bot");
const servers = db.collection("servers");

module.exports = {
  dbClient,
  init,
  db,
  servers,
};
