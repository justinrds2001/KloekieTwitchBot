module.exports = (Discord, client, guildMember) => {
  console.log("guildMemberAdd");
  let welcomeRole = guildMember.guild.roles.cache.find(
    (role) => role.name === "Member"
  );
  guildMember.roles.add(welcomeRole);
  guildMember.guild.channels.cache
    .get("937479272413679617")
    .send(
      `Welcome <@${guildMember.user.id}> to our server! Make sure to read our rules`
    );
};
