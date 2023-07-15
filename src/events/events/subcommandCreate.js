const { createEmbed } = require("../../modules/createEmbed")
const { devs } = require("../../../secret/config")

module.exports = {
  name: "subcommandCreate",

  async execute(client, commandName, subcommandName, interaction) {
    const subcommand = client.subcommands.get(`${commandName}.${subcommandName}`)

    if (!subcommand) return

    const errorEmbed = createEmbed("error", null, "There was an error while executing this command!", interaction)

    if (subcommand.nsfw && !interaction.channel.nsfw) return await interaction.reply({ embeds: [ errorEmbed.setDescription("The channel must be NSFW to execute this command!") ], ephemeral: true })				
		if (subcommand.dev && !devs.includes(interaction.user.id)) return await interaction.reply({ embeds: [ errorEmbed.setDescription("You must be a developer to execute this command!") ], ephemeral: true })

    try {
      await subcommand.execute(client, interaction)
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