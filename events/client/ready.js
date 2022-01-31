const observeTwitch = require("../../observers/twitchObserver");
const memberCounter = require("../../counters/memberCounter");

module.exports = async (Discord, client) => {
  console.log("Kloekie Bot is online :)");
  observeTwitch(Discord, client);
  memberCounter(client);
};
