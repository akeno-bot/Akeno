const { createEmbed } = require("../../../modules/createEmbed")

module.exports = {
	name: "ping",
	description: "⏳ Sends a ping request",
  options: [],
	dm: true,
	
  userPermissions: [], // TODO: handle this
	botPermissions: [],  // TODO: handle this
	dev: false,          // TODO: handle this
	nsfw: false,         // TODO: handle this

	async execute(client, interaction) {
    const ping = createEmbed("main", "⏳ Ping", "Pinging...", interaction)

		const sent = await interaction.reply({ embeds: [ ping ], fetchReply: true })
		await interaction.editReply({ embeds: [ ping.setDescription(`Roundtrip latency: **${sent.createdTimestamp - interaction.createdTimestamp}ms**\nWebsocket heartbeat: **${client.ws.ping}ms**`) ] })
	},
}