const player = require("../player/player");

module.exports = {
  name: "pause",
  description: "pause the current song",
  execute: async (client, message) => {
    const queue = player.getQueue(message.guildId);

    queue.setPaused(true);

    return message.channel.send({ content: "Paused the current track!" });
  },
};
