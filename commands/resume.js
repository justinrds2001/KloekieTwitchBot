const player = require("../player/player");

module.exports = {
  name: "resume",
  description: "resume the current song",
  execute: async (client, message) => {
    const queue = player.getQueue(message.guildId);

    queue.setPaused(false);

    return message.channel.send({ content: "Resumed the current track!" });
  },
};
