module.exports = {
  name: "mute",
  description: "mutes a member",
  execute(client, message, args, Discord) {
    const target = message.members.users.first();
    if (target) {
      let mainRole = message.guild.roles.cache.find(
        (role) => role.name === "Member"
      );
      let muteRole = message.guild.roles.cache.find(
        (role) => role.name === "Muted"
      );
    } else {
      message.channel.send("Cant find that member");
    }
  },
};
