const { EmbedBuilder } = require("discord.js");
const { colors } = require("../../secret/config");

module.exports = {
  createEmbed(type, title, description, interaction) {
    const color =
      type === "main"
        ? colors.main
        : type === "error"
        ? colors.error
        : (() => {
            throw new Error("Invalid embed type");
          })();
    const _title = type === "error" ? "❌ Error" : title;

    return new EmbedBuilder()
      .setColor(color)
      .setTitle(_title)
      .setDescription(description)
      .setTimestamp()
      .setFooter({
        text: interaction.user.username,
        iconURL: interaction.user.avatarURL(),
      });
  },
};
