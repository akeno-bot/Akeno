const { GatewayIntentBits } = require("discord.js")

module.exports = {
  colors: {
    main: "#7A4DCE",
    error: "#FF3333"
  },

  clientOptions: {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.MessageContent
    ]
  },

  sharder: {
    shardsCount: "auto",
    shardingMode: "worker"
  },

  devs: [
    "..."
  ]
}