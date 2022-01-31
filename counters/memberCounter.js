module.exports = async (client) => {
  const guild = client.guilds.cache.get("484123873256800297");
  setInterval(() => {
    const memberCount = guild.memberCount;
    const channel = guild.channels.cache.get("937481745056542800");
    channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
  }, 600000);
};
