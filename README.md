<div align="center">
 <a><img src="https://img.shields.io/maintenance/yes/2023?style=for-the-badge&label=Developing" /></a>
 <a href="https://www.nodejs.org" target="_blank"><img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/></a>
</div>

# Perritu Discord bot.

First interactive Discord bot!

> 👤 \*Created by **`Ckemill`\***

# 📋 Content Table

- [Perritu Discord bot](#perritu-discord-bot)
- [📋 Table of Contents](#-table-of-Contents)
  - [✍ Settings](#-settings)
    - [☑️ Requirements](#️-requirements)
    - [📋 Installation](#-installation)
    - [⚙️ Settings](#️-settings)
    - [🔨 Command Creation](#-command-creation)
      - [💬 Prefix commands](#-prefix-commands)
      - [(/) Slash commands](#-slash-commands)
  - [💪 Characteristics](#-characteristics)
  - [💛 Contributions](#-contributions)

## ✍ Settings

### ☑️ Requirements

- Have [NodeJS](https://nodejs.org) installed.
  ⚠️ Recommended to have version LTS `16.x.x` to avoid posible errors. ⚠️

### 📋 Installation

```git
git clone https://github.com/Ckemill/Perritu.git
npm install
```

### ⚙️ Settings

Create a `.env` file and e introduce the data require as below.

_⚠️ Never share the content of your `.env` file with no one._

```
BOT_TOKEN = "Bot's token"
PREFIX = "Desired Bot's prefix"
STATUS = "Bot Status Text"
STATUS_TYPE = "State Type"
COLOR = "the color of the embed (HEX)"
OWNER_ID = "The bot owners ID separated with spaces"
```

When you have the bot `(.env)` configured and the node modules installed, you can start it with `node .`

### 🔨 Command Creation

#### 💬 Prefix commands

In the content of `/src/commands`, you'll be able to find the categories of the commands, to create a category, it is as simple as creating a folder within this path, for example:

- `/src/commands/newCategory`

To create commands within this category, you will need to create a file with the command name with the format `.js`, for example:

- `/src/commands/newCategory/announcement.js`

Then, you will have to create the structure (object) of the command with the following template:

```js
module.exports = {
    DESCRIPTION: "Serves to perform an announcement.", //command description
    ALIASES: ["ad", "advertisement"] //command name aliases
    PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"] //permissions the user will need to run the command
    BOT_PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"] //permissions that the bot will need to execute the command
    OWNER: true, //If true, only the owners of the bot will be able to execute the command
    execute(client, message, args, prefix, GUILD_DATA){
        //command execution
        return message.reply(`**This is an announcement!**`);
    }
}
```

⌚ The command name will be equal to the file name.

To execute the command that we have created, it is as simple as executing in our bot `<Prefijo>announcement`.

_⚠️ If you create two commands with the same name, the bot will only execute one of them. ⚠️_

#### (/) Slash Commands

In the content of `/src/slashCommands`, you'll be able to find the categories of the commands, to create a category, it is as simple as creating a folder within this path, for example:

- `/src/slashCommands/newCategory`

To create commands within this category, you will need to create a file with the command name with the format `.js`, for example:

- `/src/slashCommands/newCategory/announcement.js`

Then, you will have to create the structure (object) of the command with the following template:

```js
const {SlashCommandBuilder} = require('discord.js');
module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Serves to perform an announcement."), //command description
    //you can find more methods in https://discordjs.guide/creating-your-bot/slash-commands.html
    PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"] //permissions the user will need to run the command
    BOT_PERMISSIONS: ["Administrator", "KickMembers", "BanMembers"] //permissions that the bot will need to execute the command
    OWNER: true, //If true, only the owners of the bot will be able to execute the command
    execute(client, interaction, prefix){
        //command execution
        return interaction.reply(`**This is an announcement!**`);
    }
}
```

⌚ The command name will be equal to the file name.

To execute the command that we have created, it is as simple as executing in our bot `/announcement`

_⚠️ If you create two commands with the same name, the bot will only execute one of them. ⚠️_

## 💪 Characteristics

- ✅ Scalable
- ✅ Organized
- ✅ Slash & Prefix commands
- ✅ Reloads the bot without having to restart, avoiding possible spams to the Discord API

## 💛 Contributions

All donations will be used to improve the service of Perritu. Thank you!

**_Testeado y funcionando correctamente en la versión NodeJS `18.12.1` y npm `8.19.2`_**
