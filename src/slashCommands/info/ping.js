const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  CMD: new SlashCommandBuilder()
    .setDescription("Returns Bot's ping on miliseconds.")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

  async execute(client, interaction, prefix) {
    const embed = new EmbedBuilder()
      .setColor(process.env.COLOR)
      .setTitle("Pong!")
      .setDescription(`\`${client.ws.ping}ms\``)
      .setThumbnail(
        "https://media.tenor.com/gV1CkMWdbOQAAAAi/kstr-kochstrasse.gif"
      );

    return interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
