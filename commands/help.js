const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../config/config.json").prefix;

module.exports = {
  name: "help",
  description: "Shows all available bot commands.",
  execute: async (client, message, args) => {
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      const commands = readdirSync(`./commands`).filter((file) =>
        file.endsWith(".js")
      );

      const cmds = commands.map((command) => {
        let file = require(`../commands/${command}`);

        if (!file.name) return "No command name.";

        let name = file.name.replace(".js", "");

        return `\`${name}\``;
      });

      let data = new Object();

      data = {
        name: "Commands",
        value: cmds.length === 0 ? "In progress." : cmds.join(" "),
      };

      categories.push(data);

      return message.channel.send({
        embeds: [
          {
            title: "📬 Need help? Here are all of my commands:",
            fields: categories,
            description: `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`,
            footer: {
              text: `Requested by ${message.author.tag}`,
              iconURL: message.author.displayAvatarURL({ dynamic: true }),
            },
            color: roleColor,
          },
        ],
      });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        return message.channel.send({
          embeds: [
            {
              title: `Invalid command! Use \`${prefix}help\` for all of my commands!`,
              color: "FF0000",
            },
          ],
        });
      }

      return message.channel.send({
        embeds: [
          {
            title: "Command Details:",
            fields: [
              {
                name: "PREFIX:",
                value: `\`${prefix}\``,
              },
              {
                name: "COMMAND",
                value: command.name
                  ? `\`${command.name}\``
                  : "No name for this command.",
              },
              {
                name: "USAGE:",
                value: command.usage
                  ? `\`${prefix}${command.name} ${command.usage}\``
                  : `\`${prefix}${command.name}\``,
              },
              {
                name: "DESCRIPTION:",
                value: command.description
                  ? command.description
                  : "No description for this command.",
              },
            ],
            description: `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`,
            footer: {
              text: `Requested by ${message.author.tag}`,
              iconURL: message.author.displayAvatarURL({ dynamic: true }),
            },
            color: roleColor,
          },
        ],
      });
    }
  },
};
