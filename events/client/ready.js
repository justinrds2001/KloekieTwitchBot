const fetch = require("node-fetch");

module.exports = async (Discord, client, message) => {
  console.log("Kloekie Bot is online :)");
  let canSendMessage = true;
  setInterval(async () => {
    const headers = {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Client-ID": process.env.CLIENT_ID,
    };
    const res = await fetch(
      `https://api.twitch.tv/helix/streams?login=koekeloer&user_id=${process.env.USER_ID}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const streamData = await res.json();

    if (streamData.data[0]) {
      if (canSendMessage) {
        const stream = streamData.data[0];
        const embed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle("I'm live on twitch!")
          .setURL(`https://www.twitch.tv/kloekeloer`)
          .setAuthor({
            name: stream.user_name,
            url: `https://www.twitch.tv/kloekeloer`,
          })
          .setDescription("come say hello @everyone :)")
          .setThumbnail(
            `http://static-cdn.jtvnw.net/ttv-boxart/${encodeURI(
              stream.game_name
            )}-500x500.jpg`
          )
          .addField("Stream Title", `${stream.title}`, false)
          .addField("Playing", `${stream.game_name}`, false)
          .setImage(stream.thumbnail_url);

        console.log("streamer is live!!!");
        console.debug("embed: " + JSON.stringify(embed));
        client.channels.cache
          .get("936299870279581746")
          .send({ embeds: [embed] });
        canSendMessage = false;
      }
    }
  }, 30000);
};
