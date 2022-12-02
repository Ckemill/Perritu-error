const { EmbedBuilder } = require("discord.js");

module.exports = {
  ALIASES: ["ms", "lag", "delay"],
  DESCRIPTION: "Returns Bot's ping on miliseconds.",
  BOT_PERMISSIONS: ["EmbedLinks"],
  OWENER: true,

  async execute(client, message, args, prefix) {
    const embed = new EmbedBuilder()
      .setColor(process.env.COLOR)
      .setTitle("Pong!")
      .setDescription(`\`${client.ws.ping}ms\``)
      .setThumbnail(
        "https://media.tenor.com/gV1CkMWdbOQAAAAi/kstr-kochstrasse.gif"
      );

    return message.reply({ embeds: [embed], ephemeral: true });
  },
};
