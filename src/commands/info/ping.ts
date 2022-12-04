import {
  ColorResolvable,
  EmbedBuilder,
  Client,
  CommandInteraction,
  MessageComponentInteraction,
} from "discord.js";

export default class PingCommand {
  ALIASES: string[] = ["ms", "lag", "delay"];
  DESCRIPTION: string = "Returns Bot's ping on miliseconds.";
  BOT_PERMISSIONS: string[] = ["EmbedLinks"];
  OWENER: boolean = true;

  execute(
    client: Client,
    message: MessageComponentInteraction | CommandInteraction,
    args,
    prefix
  ) {
    const embed = new EmbedBuilder()
      .setColor(process.env.COLOR! as ColorResolvable)
      .setTitle("Pong!")
      .setDescription(`\`${client.ws.ping}ms\``)
      .setThumbnail(
        "https://media.tenor.com/gV1CkMWdbOQAAAAi/kstr-kochstrasse.gif"
      );

    return message.reply({ embeds: [embed], ephemeral: true });
  }
}
