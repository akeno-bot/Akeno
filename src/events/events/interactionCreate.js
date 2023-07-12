const { Events } = require("discord.js")
const { createEmbed } = require("../../modules/createEmbed")

module.exports = {
  name: Events.InteractionCreate,

  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) return

    const command = client.commands.get(interaction.commandName)

    if (!command) return

    /*
    if (command.nsfw) {
			if (!isChannelNSFW(client, interaction)) {
				return await interaction.reply({ embeds: [ errorEmbed.setDescription("Channel must be NSFW to execute this command!") ], ephemeral: true })				
			}
		}

		if (command.dev) {
			if (!cfg.bot.devs.includes(interaction.user.id)) {
				return await interaction.reply({ embeds: [ errorEmbed.setDescription("You must be a developer to execute this command!") ], ephemeral: true })
			}
		}
    */

    try {
      await command.execute(client, interaction)
    } catch(error) {
      console.log(error)
    
      const errorEmbed = createEmbed("error", null, "There was an error while executing this command!", interaction)
      
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ embeds: [ errorEmbed ], ephemeral: true });
			} else {
        await interaction.reply({ embeds: [ errorEmbed ], ephemeral: true });
			}
    }
  }
}