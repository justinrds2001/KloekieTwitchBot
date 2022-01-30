// Imports
require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: ["GUILDS", "GUILD_MESSAGES"],
});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

["command-handler", "event-handler"].forEach(async (handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

client.login(process.env.TOKEN);
