import chicken from "./commands/chicken.js";
import gif from "./commands/gif.js";
import Filter from "bad-words";
import fetch from "node-fetch";

const filter = new Filter();
const commands = { chicken, gif };

export default async (msg) => {
  const tokens = msg.content.split(" ");
  let command = tokens.shift();

  if (!filter.isProfane(msg)) {
    // appropriate message
    console.log("msg approved");
    if (command.charAt(0) === "!") {
      // valid command!
      command = command.substring(1);
      commands[command](msg, tokens);
    }
  } else {
    console.log("you kiss your mother with that mouth??");
    const url = `https://tenor.com/view/captain-america-marvel-avengers-gif-14328153`;
    msg.reply;
    msg.channel.send(url);
    msg.channel.send(`Please try not to curse ${msg.author}`);
  }
};
