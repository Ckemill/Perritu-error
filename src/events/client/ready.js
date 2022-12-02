module.exports = (client) => {
  console.log(`${client.user.tag} it's Alive!`.bold.magenta);

  if (client?.application?.commands) {
    client.application.commands.set(client.slashArray);
    console.log(
      `(/) ${client.slashCommands.size} SlashCommands published.`.green
    );
  }
};
