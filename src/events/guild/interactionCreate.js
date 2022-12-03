module.exports = async (client, interaction) => {
  if (!interaction.guild || !interaction.channel) return;

  const Command = client.slashCommands.get(interaction?.commandName);

  if (Command) {
    if (Command.OWNER) {
      if (!process.env.OWNER_IDS.split(" ").includes(interaction.author.id))
        return interaction.reply({
          content: `❌ **Only my owners can run this command**\n**My owners:** ${process.env.OWNER_IDS.split(
            " "
          ).map((OWNER_IDS) => `<@${OWNER_IDS}>`)}`,
          ephemeral: true,
        });
    }

    if (Command.BOT_PERMISSIONS) {
      if (
        !interaction.guild.members.me.permissions.has(Command.BOT_PERMISSIONS)
      )
        return interaction.reply({
          content: `❌ **I need this/these permissions to run this command:**\n${Command.BOT_PERMISSIONS.map(
            (Permission) => `\`${Permission}\``
          ).join(", ")}`,
          ephemeral: true,
        });
    }

    if (Command.PERMISSIONS) {
      if (!interaction.member.permissions.has(Command.PERMISSIONS))
        return interaction.reply({
          content: `❌ **You need this/these permissions to run this command:**\n${Command.PERMISSIONS.map(
            (Permission) => `\`${Permission}\``
          ).join(", ")}`,
          ephemeral: true,
        });
    }

    Command.execute(client, interaction, "/");
  }
};
