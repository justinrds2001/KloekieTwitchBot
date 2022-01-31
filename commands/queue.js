const player = require("../player/player");

module.exports = {
  name: "queue",
  description: "display the song queue",
  execute: async (client, message) => {
    const queue = player.getQueue(message.guildId);
    if (!queue?.playing)
      return message.channel.send({
        content: "No songs are currently playing",
      });

    const currentTrack = queue.current;
    const tracks = queue.tracks.slice(0, 10).map((m, i) => {
      return `${i + 1}. [**${m.title}**](${m.url})`;
    });

    return message.channel.send({
      embeds: [
        {
          title: "Song Queue",
          description: `${tracks.join("\n")}${
            queue.tracks.length > tracks.length
              ? `\n...${
                  queue.tracks.length - tracks.length === 1
                    ? `${queue.tracks.length - tracks.length} more track`
                    : `${queue.tracks.length - tracks.length} more tracks`
                }`
              : ""
          }`,
          color: "RANDOM",
          fields: [
            {
              name: "Now Playing",
              value: `🎶 | [**${currentTrack.title}**](${currentTrack.url})`,
            },
          ],
        },
      ],
    });
  },
};
