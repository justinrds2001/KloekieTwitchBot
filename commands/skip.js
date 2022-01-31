const player = require("../player/player");

module.exports = {
  name: "skip",
  description: "skip the current song",
  execute: async (client, message) => {
    const queue = player.getQueue(message.guildId);
    if (!queue?.playing)
      return message.channel.send({
        content: "No music is currently being played",
      });

    await queue.skip();

    message.channel.send({ content: "Skipped the current track!" });
  },
};
