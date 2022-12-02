module.exports = async (client, interaction) => {
  if (!interaction.guild || !interaction.channel) return;

  const COMANDO = client.slashCommands.get(interaction?.commandName);

  if (COMANDO) {
    if (COMANDO.OWNER) {
      if (!process.env.OWNER_IDS.split(" ").includes(interaction.author.id))
        return interaction.reply({
          content: `❌ **Only my owners can run this command**\n**My owners:** ${process.env.OWNER_IDS.split(
            " "
          ).map((OWNER_ID) => `<@${OWNER_ID}>`)}`,
          ephemeral: true,
        });
    }

    if (COMANDO.BOT_PERMISSIONS) {
      if (
        !interaction.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)
      )
        return interaction.reply({
          content: `❌ **I need this/these permissions to run this command:**\n${COMANDO.BOT_PERMISSIONS.map(
            (PERMISO) => `\`${PERMISO}\``
          ).join(", ")}`,
          ephemeral: true,
        });
    }

    if (COMANDO.PERMISSIONS) {
      if (!interaction.member.permissions.has(COMANDO.PERMISSIONS))
        return interaction.reply({
          content: `❌ **You need this/these permissions to run this command:**\n${COMANDO.PERMISSIONS.map(
            (PERMISO) => `\`${PERMISO}\``
          ).join(", ")}`,
          ephemeral: true,
        });
    }

    COMANDO.execute(client, interaction, "/");
  }
};
