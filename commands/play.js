const { QueryType } = require("discord-player");
const player = require("../player/player");

module.exports = {
  name: "play",
  description: "Joins and plays a video from youtube",
  async execute(client, message, args) {
    const songTitle = args.join(" ");

    if (!message.member.voice.channel) {
      message.channel.send("Please join a voice channel first!");
      return;
    }

    const searchResult = await player.search(songTitle, {
      requestedBy: message.user,
      searchEngine: QueryType.AUTO,
    });

    const queue = await player.createQueue(message.guild, {
      metadata: message.channel,
    });

    if (!queue.connection) await queue.connect(message.member.voice.channel);

    message.channel.send(`Playing ${songTitle}`);

    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};
