const { Events } = require("discord.js");
const { createEmbed } = require("../../modules/createEmbed");

const { devs } = require("../../../secret/config");

module.exports = {
  name: Events.InteractionCreate,

  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) return;

    const commandName = interaction.commandName;
    const command = client.commands.get(commandName);

    if (!command) return;

    const errorEmbed = createEmbed(
      "error",
      null,
      "There was an error while executing this command!",
      interaction
    );

    const cooldowns = client.cooldowns;
    const timestamps = cooldowns.get(command.name);
    const now = Date.now();
    const cooldownAmount = (command.cooldown ?? 3) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const cooldownDate = timestamps.get(interaction.user.id);
      const expirationTime = cooldownDate + cooldownAmount;

      if (now < expirationTime)
        await interaction.reply({
          embeds: [
            errorEmbed
              .setTitle("⏱️ Cooldown")
              .setDescription(
                `**${
                  interaction.user.username
                }**! Slow down and try the command again <t:${Math.round(
                  expirationTime / 1000
                )}:R>`
              ),
          ],
          ephemeral: true,
        });

      setTimeout(async () => await interaction.deleteReply(), 1000);
      return;
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    const subcommand = interaction.options.getSubcommand(false);
    if (subcommand != null) {
      interaction.commandName = `${interaction.commandName}.${subcommand}`;
      return client.emit("subcommandCreate", interaction);
    }

    if (command.nsfw && !interaction.channel.nsfw) {
      await interaction.reply({
        embeds: [
          errorEmbed.setDescription(
            "The channel must be NSFW to execute this command!"
          ),
        ],
        ephemeral: true,
      });
      return;
    }

    if (command.dev && !devs.includes(interaction.user.id)) {
      await interaction.reply({
        embeds: [
          errorEmbed.setDescription(
            "You must be a developer to execute this command!"
          ),
        ],
        ephemeral: true,
      });
      return;
    }

    try {
      await command.execute(client, interaction);
    } catch (error) {
      console.log(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
      } else {
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
      }
    }
  },
};
