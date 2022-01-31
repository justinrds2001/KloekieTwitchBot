const player = require("../player/player");

module.exports = {
  name: "volume",
  description: "change or check the volume of the current song",
  execute: async (client, message, args) => {
    if (isNaN(args[0])) {
      return message.channel.send("Please enter a number between 1 and 100");
    }
    const volumePercentage = args[0];
    const queue = player.getQueue(interaction.guildId);
    if (!queue?.playing)
      return message.channel.send({
        content: "No music is currently being played",
      });

    if (!volumePercentage)
      return message.channel.send({
        content: `The current volume is \`${queue.volume}%\``,
      });

    if (volumePercentage < 0 || volumePercentage > 100)
      return message.channel.send({
        content: "The volume must be betweeen 1 and 100",
      });

    queue.setVolume(volumePercentage);

    return message.channel.send({
      content: `Volume has been set to \`${volumePercentage}%\``,
    });
  },
};
