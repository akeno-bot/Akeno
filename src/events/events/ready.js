const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,

  async execute(client) {
    client.logger.log("Akeno is now online!");
  },
};
