module.exports = {
  name: "clear",
  description: "clear messages based on given params",
  async execute(client, message, args, discord) {
    console.debug(message);

    if (!args[0])
      message.channel.send(
        "Please select how many messages you want to clear!"
      );
    else if (isNaN(args[0]))
      message.channel.send("Please enter is real number!");
    else if (args[0] > 100)
      message.channel.send("Number can't be more than 100!");
    else if (args[0] < 1) message.channel.send("Number can't be less than 1!");
    else {
      await message.channel.messages
        .fetch({ limit: args[0] })
        .then((messages) => {
          message.channel.bulkDelete(messages);
        });
    }
  },
};
