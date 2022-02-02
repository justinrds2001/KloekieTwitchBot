const observeTwitch = require("../../observers/twitchObserver");

module.exports = async (Discord, client) => {
  console.log("Kloekie Bot is online :)");
  observeTwitch(Discord, client);
};
