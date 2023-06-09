const prefix = require("../../config/config.json").prefix;

module.exports = (Discord, client, message) => {
  console.log("message: " + message.content);
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);

  if (command) command.execute(client, message, args, Discord);
};
