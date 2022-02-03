module.exports = {
  name: "ban",
  description: "bans a member",
  execute(client, message, args, Discord) {
    console.log("message: " + JSON.stringify(message.member));
    if (message.member.roles.cache.has("936323605938208811")) {
      const member = message.mentions.members.first();
      if (!member)
        message.reply("Please mention a valid member of this server");
      else if (!member.kickable) message.reply("I cannot ban this member!");
      else {
        try {
          member.ban();
        } catch {
          message.reply("I do not have permissions to ban " + member);
        }
      }
    } else {
      message.reply("You do not have permissions to ban anybody!");
    }
  },
};
