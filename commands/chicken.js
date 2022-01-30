module.exports = {
  name: "chicken",
  description: "reply to chicken",
  async execute(client, message, args, discord) {
    console.debug(message);

    message.channel.send("( ͡° ͜ʖ ͡°)");
  },
};
