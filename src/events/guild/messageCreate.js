module.exports = async (client, message) => {
  if (!message.guild || !message.channel || message.author.bot) return;

  if (!message.content.startsWith(process.env.PREFIX)) return;

  const ARGS = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(/ +/);
  const CMD = ARGS?.shift()?.toLowerCase();

  const Command =
    client.commands.get(CMD) ||
    client.commands.find((c) => c.ALIASES && c.ALIASES.includes(CMD));

  if (Command) {
    if (!message.guild.members.me.permissions.has("SendMessages")) return;

    if (Command.OWNER) {
      if (!process.env.OWNER_IDS.split(" ").includes(message.author.id))
        return message.reply(
          `❌ **Only my owners can use this command!** ${process.env.OWNER_IDS.split(
            " "
          ).map((OWNER_IDS) => `<@${OWNER_IDS}>`)}`
        );
    }

    if (Command.BOT_PERMISSIONS) {
      if (!message.guild.members.me.permissions.has(Command.BOT_PERMISSIONS))
        return message.reply(
          `❌ **I need these permissions to run this command:** ${Command.BOT_PERMISSIONS.map(
            (Permission) => `\`${Permission}\``
          ).join(", ")}`
        );
    }

    if (Command.PERMISSIONS) {
      if (!message.member.permissions.has(Command.PERMISSIONS))
        return message.reply(
          `❌ **You need these permissions to run this command:** ${Command.PERMISSIONS.map(
            (Permission) => `\`${Permission}\``
          ).join(", ")}`
        );
    }

    try {
      Command.execute(client, message, ARGS, process.env.PREFIX);
    } catch (e) {
      message.reply(`**An error has occurred \`${Command.NAME}\`**`);
      console.log(e);
      return;
    }
  }
};
