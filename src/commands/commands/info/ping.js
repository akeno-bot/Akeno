const { createEmbed } = require("../../../modules/createEmbed");

module.exports = {
  // REMINDER: delete this
  cooldown: 3,
  name: "ping",
  description: "⏳ Sends a ping request",
  options: [],

  userPermissions: [], // TODO: handle this
  botPermissions: [], // TODO: handle this
  dev: false,
  nsfw: false,

  async execute(client, interaction) {
    if (!interaction.deferred) await interaction.deferReply();

    const ping = createEmbed("main", "⏳ Ping", "Pinging...", interaction);

    const before = Date.now();
    await interaction.editReply({ embeds: [ping] });
    const latency = Date.now() - before;
    const wsLatency = client.ws.ping.toFixed(0);

    await interaction.editReply({
      embeds: [
        ping.setDescription(null).addFields(
          {
            name: "🌐 WebSocket",
            value: `**\`${wsLatency}\`** ms`,
            inline: true,
          },
          {
            name: "📶 API",
            value: `**\`${latency}\`** ms`,
            inline: true,
          }
        ),
      ],
    });
  },
};
