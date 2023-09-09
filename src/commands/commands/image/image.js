const { createEmbed } = require("../../../modules/createEmbed");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  cooldown: 3,
  name: "image",
  description: "🖼️ Sends an image",
  options: [
    {
      name: "coffee",
      description: "☕ Sends coffee images",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
};
