const player = require("../player/player");
const axios = require("axios");
const { MessageEmbed } = require("discord.js");

const getLyrics = (title) =>
  new Promise(async (ful, rej) => {
    const url = new URL("https://some-random-api.ml/lyrics");
    url.searchParams.append("title", title);

    try {
      const { data } = await axios.get(url.href);
      ful(data);
    } catch (error) {
      rej(error);
    }
  });

const substring = (length, value) => {
  const replaced = value.replace(/\n/g, "--");
  const regex = `.{1,${length}}`;
  const lines = replaced
    .match(new RegExp(regex, "g"))
    .map((line) => line.replace(/--/g, "\n"));

  return lines;
};

const createResponse = async (title) => {
  try {
    const data = await getLyrics(title);

    const embeds = substring(4096, data.lyrics).map((value, index) => {
      const isFirst = index === 0;

      return new MessageEmbed({
        title: isFirst ? `${data.title} - ${data.author}` : null,
        thumbnail: isFirst ? { url: data.thumbnail.genius } : null,
        description: value,
      });
    });

    return { embeds };
  } catch (error) {
    return "I am not able to find lyrics for this song :(";
  }
};

module.exports = {
  name: "lyrics",
  description: "gets lyrics from current song",
  execute(client, message, args, Discord) {
    const title = args.join(" ");
    const sendLyrics = async (songTitle) => {
      try {
        const res = await createResponse(songTitle);
        console.log({ res });
        message.channel.send(res);
      } catch (err) {
        return console.log({ err });
      }
    };

    if (title) return sendLyrics(title);

    const queue = player.getQueue(message.guildId);
    if (!queue?.playing)
      return message.channel.send({
        content: "No music is currently being played",
      });

    return sendLyrics(queue.current.title);
  },
};
