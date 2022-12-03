const {
  Client,
  GatewayIntentBits,
  Partials,
  ActivityType,
  PresenceUpdateStatus,
  Collection,
} = require("discord.js");
const BotUtils = require("./Utils");

module.exports = class extends Client {
  constructor(
    options = {
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildEmojisAndStickers,
      ],
      partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
      ],
      allowedMentions: {
        parse: ["roles", "users"],
        repliedUser: false,
      },
      presence: {
        activities: [
          {
            name: process.env.STATUS,
            type: ActivityType[process.env.STATUS_TYPE],
          },
        ],
        status: PresenceUpdateStatus.Online,
      },
    }
  ) {
    super(options);

    this.commands = new Collection();
    this.slashCommands = new Collection();
    this.slashArray = [];

    this.utils = new BotUtils(this);

    this.start();
  }

  async start() {
    await this.loadEvents();
    await this.loadHandlers();
    await this.loadCommands();
    await this.loadSlashCommands();

    this.login(process.env.BOT_TOKEN);
  }

  async loadCommands() {
    console.log(`(${process.env.PREFIX}) | Loading Commands.`.yellow);
    await this.commands.clear();

    const FilesPath = await this.utils.loadFiles("/src/commands");

    if (FilesPath.length) {
      FilesPath.forEach((FilePath) => {
        try {
          const Command = require(FilePath);
          const CommandName = FilePath.split("\\")
            .pop()
            .split("/")
            .pop()
            .split(".")[0];
          Command.Name = CommandName;

          if (CommandName) this.commands.set(CommandName, Command);
        } catch (error) {
          console.log(`ERROR WHILE LOADING FILE ${FilePath}`.bgRed);
          console.log(error);
        }
      });
    }

    console.log(
      `(${process.env.PREFIX}) | ${this.commands.size} Commands loaded.`.green
    );
  }

  async loadSlashCommands() {
    console.log(`(/) Loading SlashCommands.`.yellow);
    await this.slashCommands.clear();

    this.slashArray = [];

    const FilesPath = await this.utils.loadFiles("/src/slashCommands");

    if (FilesPath.length) {
      FilesPath.forEach((FilePath) => {
        try {
          const Command = require(FilePath);
          const CommandName = FilePath
            .split("\\")
            .pop()
            .split("/")
            .pop()
            .split(".")[0];
          Command.CMD.name = CommandName;

          if (CommandName) this.slashCommands.set(CommandName, Command);

          this.slashArray.push(Command.CMD.toJSON());
        } catch (e) {
          console.log(`(/) ERROR WHILE LOADING FILE ${FilePath}`.bgRed);
          console.log(e);
        }
      });
    }

    console.log(`(/) ${this.slashCommands.size} SlashCommands loaded.`.green);

    if (this?.application?.commands) {
      this.application.commands.set(this.slashArray);
      console.log(
        `(/) ${this.slashCommands.size} SlashCommands published.`.green
      );
    }
  }

  async loadHandlers() {
    console.log(`(-) Loading handlers.`.yellow);

    const FilesPath = await this.utils.loadFiles("/src/handlers");

    if (FilesPath.length) {
      FilesPath.forEach((FilePath) => {
        try {
          require(FilePath)(this);
        } catch (e) {
          console.log(`ERROR WHILE LOADING FILE ${FilePath}`.bgRed);
          console.log(e);
        }
      });
    }

    console.log(`(-) ${FilesPath.length} Handlers loaded.`.green);
  }

  async loadEvents() {
    console.log(`(+) | Loading Events.`.yellow);
    const FilesPath = await this.utils.loadFiles("/src/events");
    this.removeAllListeners();

    if (FilesPath.length) {
      FilesPath.forEach((FilePath) => {
        try {
          const Event = require(FilePath);
          const EventName = FilePath.split("\\")
            .pop()
            .split("/")
            .pop()
            .split(".")[0];

          this.on(EventName, Event.bind(null, this));
        } catch (error) {
          console.log(`ERROR WHILE LOADING FILE ${FilePath}`.bgRed);
          console.log(error);
        }
      });
    }

    console.log(`(+) | ${FilesPath.length} Events loaded.`.green);
  }
};
