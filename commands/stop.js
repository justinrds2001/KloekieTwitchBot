const player = require("../player/player");

module.exports = {
  name: "stop",
  description: "stops the bot",
  execute(client, message, args, Discord) {
    const queue = player.getQueue(message.guildId);
    if (!queue?.playing)
      return message.channel.send({
        content: "No music is currently being played",
      });

    queue.destroy();
    return message.channel.send({
      content: "Playlist was stopped",
    });
  },
};
