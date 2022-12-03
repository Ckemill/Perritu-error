const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  CMD: new SlashCommandBuilder()
    .setDescription("Reloads bot's files.")
    .setDefaultMemberPermissions("0")
    .addStringOption((option) =>
      option
        .setName("module")
        .setDescription("Reloads a module.")
        .addChoices(
          { name: "Commands", value: "commands" },
          { name: "SlashCommands", value: "slash" },
          { name: "Events", value: "events" }
        )
    ),
  async execute(client, interaction, prefix, GUILD_DATA) {
    let args = [interaction.options.getString("module")];
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

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .addFields([{ name: `✅ ${opcion} reloaded`, value: `> *Okay!*` }])
            .setColor(process.env.COLOR),
        ],
      });
    } catch (e) {
      interaction.reply(`**An error has occurred.**`);
      console.log(e);
      return;
    }
  },
};
