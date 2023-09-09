const { REST } = require("discord.js");
const { BOT_TOKEN } = require("../secret/env");

module.exports = (client) => {
  const rest = new REST().setToken(BOT_TOKEN);

  require("./commands/handler")(client, rest);

  return delete rest;
};
