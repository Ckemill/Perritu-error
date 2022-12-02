const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  BOT_PERMISSIONS: ["AddReactions", "Connect", "Speak"],
  CMD: new SlashCommandBuilder()
    .setDescription("Play music for you.")
    .setDMPermission(false),

  async execute(client, interaction, prefix) {
    const embed = new EmbedBuilder()
      .setColor(process.env.COLOR)
      .setTitle("**TSU**")
      .setURL(
        "https://open.spotify.com/track/4s7QLoImIwmPi9L6dq1nVW?si=4d167571383a4acb"
      )
      .setDescription(`**Author:** Drake`)
      .setAuthor({ name: "Now Playing:" })
      .setThumbnail(
        "https://images.genius.com/c724579aa6d27dabaee46609912093cd.1000x1000x1.png"
      )
      .setFooter({
        text: `Requested by ${interaction.user.username}`,
        iconURL: `${interaction.user.displayAvatarURL()}`,
      });

    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });
    message.react("⏮️");
    message.react("⏹️");
    message.react("⏯️");
    message.react("⏭️");
    message.react("🔀");
    message.react("🔁");
  },
};
