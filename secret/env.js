require("dotenv").config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,

  MONGO_URI: process.env.MONGO_URI,

  CLIENT_ID: process.env.CLIENT_ID,
  GUILD_ID: process.env.GUILD_ID,
};
