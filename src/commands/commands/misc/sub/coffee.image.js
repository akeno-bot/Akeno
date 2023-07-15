const { createEmbed } = require("../../../../modules/createEmbed")
const { request } = require("undici")

module.exports = {
  nsfw: false,
  dev: false,
  userPermissions: [], // TODO: handle this
  botPermissions: [],  // TODO: handle this

  async execute(client, interaction) {
    if (!interaction.deferred) await interaction.deferReply()

    const res = await request("https://coffee.alexflipnote.dev/random.json")
    const { file } = await res.body.json()

    const coffee = createEmbed("main", "☕ Some coffee for you!", null, interaction).setImage(file)

    await interaction.editReply({ embeds: [ coffee ] })
  }
}