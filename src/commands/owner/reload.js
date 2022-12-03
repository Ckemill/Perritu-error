const { EmbedBuilder } = require("discord.js");

module.exports = {
  DESCRIPTION: "Recarga los archivos del bot.",
  BOT_PERMISSIONS: ["EmbedLinks"],
  OWNER: true,
  async execute(client, message, args, prefix, GUILD_DATA) {
    let opcion = "Commands, Events & Handlers";

    try {
      switch (args[0]?.toLowerCase()) {
        case "commands":
        case "comandos":
          {
            opcion = "Commands";
            await client.loadCommands();
          }
          break;

        case "slash":
        case "slashcommands":
          {
            opcion = "SlashCommands";
            await client.loadSlashCommands();
          }
          break;

        case "eventos":
        case "events":
          {
            opcion = "Events";
            await client.loadEvents();
          }
          break;

        default:
          {
            await client.loadEvents();
            await client.loadHandlers();
            await client.loadSlashCommands();
            await client.loadCommands();
          }
          break;
      }

      message.reply({
        embeds: [
          new EmbedBuilder()
            .addFields([{ name: `✅ ${opcion} reloaded`, value: `> *Okay!*` }])
            .setColor(process.env.COLOR),
        ],
      });
    } catch (e) {
      message.reply(`**An error has occurred.**`);
      console.log(e);
      return;
    }
  },
};
