const { createEmbed } = require("../../../modules/createEmbed")
const { ApplicationCommandOptionType } = require("discord.js")

module.exports = {
	name: "image",
	description: "🖼️ Sends an image",
  options: [
    {
      name: "coffee",
      description: "☕ Sends coffee images",
      type: ApplicationCommandOptionType.Subcommand
    }
  ],
	dm: true,
	
  userPermissions: [], // TODO: handle this
	botPermissions: [],  // TODO: handle this
	dev: false,
	nsfw: false
}