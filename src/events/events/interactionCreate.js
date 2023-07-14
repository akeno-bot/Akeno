const { Events } = require("discord.js")
const { createEmbed } = require("../../modules/createEmbed")

const { devs } = require("../../../secret/config")

module.exports = {
  name: Events.InteractionCreate,

  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) return

    const command = client.commands.get(interaction.commandName)

    if (!command) return

    const errorEmbed = createEmbed("error", null, "There was an error while executing this command!", interaction)

    if (command.nsfw && !interaction.channel.nsfw) return await interaction.reply({ embeds: [ errorEmbed.setDescription("Channel must be NSFW to execute this command!") ], ephemeral: true })				
		if (command.dev && !devs.includes(interaction.user.id)) return await interaction.reply({ embeds: [ errorEmbed.setDescription("You must be a developer to execute this command!") ], ephemeral: true })

    try {
      await command.execute(client, interaction)
    } catch(error) {
      console.log(error)
      
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ embeds: [ errorEmbed ], ephemeral: true });
			} else {
        await interaction.reply({ embeds: [ errorEmbed ], ephemeral: true });
			}
    }
  }
}