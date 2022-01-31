const fetch = require("node-fetch");
module.exports = {
  name: "gif",
  description: "description",
  async execute(client, message, args, Discord) {
    console.log("hi");
    let keywords = "cookie";
    if (args.length > 0) {
      keywords = args.join(" ");
    }
    const url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&ContentFilter=high`;
    const response = await fetch(url);
    const json = await response.json();
    const i = Math.floor(Math.random() * json.results.length);
    message.channel.send(json.results[i].url);
  },
};
