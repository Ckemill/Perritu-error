module.exports = async (client, message) => {
  if (!message.guild || !message.channel || message.author.bot) return;

  if (!message.content.startsWith(process.env.PREFIX)) return;

  const ARGS = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/);
  const CMD = ARGS?.shift()?.toLowerCase();

  const COMANDO =
    client.commands.get(CMD) ||
    client.commands.find((c) => c.ALIASES && c.ALIASES.includes(CMD));

  if (COMANDO) {
    if (!message.guild.members.me.permissions.has("SendMessages")) return;

    if (COMANDO.OWNER) {
      if (!process.env.OWNER_ID.split(" ").includes(message.author.id))
        return message.reply(
          `❌ **Only my owner can use this command!** ${process.env.OWNER_ID.split(
            " "
          ).map((OWNER_ID) => `<@${OWNER_ID}>`)}`
        );
    }

    if (COMANDO.BOT_PERMISSIONS) {
      if (!message.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS))
        return message.reply(
          `❌ **I need these permissions to run this command:** ${COMANDO.BOT_PERMISSIONS.map(
            (PERMISO) => `\`${PERMISO}\``
          ).join(", ")}`
        );
    }

    if (COMANDO.PERMISSIONS) {
      if (!message.member.permissions.has(COMANDO.PERMISSIONS))
        return message.reply(
          `❌ **You need these permissions to run this command:** ${COMANDO.PERMISSIONS.map(
            (PERMISO) => `\`${PERMISO}\``
          ).join(", ")}`
        );
    }

    try {
      //ejecutar el comando
      COMANDO.execute(client, message, ARGS, process.env.PREFIX);
    } catch (e) {
      message.reply(`**An error has occurred \`${COMANDO.NAME}\`**`);
      console.log(e);
      return;
    }
  }
};
