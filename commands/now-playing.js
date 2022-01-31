const player = require("../player/player");

module.exports = {
  name: "now-playing",
  description: "shows information about the current song",
  execute: async (client, message) => {
    const queue = player.getQueue(message.guildId);
    if (!queue?.playing)
      return message.channel.send({
        content: "No music is currently being played",
      });

    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();

    return message.channel.send({
      embeds: [
        {
          title: "Now Playing",
          description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
          fields: [
            {
              name: "\u200b",
              value: progress,
            },
          ],
        },
      ],
    });
  },
};
