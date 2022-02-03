module.exports = (Discord, client, guildMember) => {
  console.log("guildMemberAdd");
  guildMember.guild.channels.cache
    .get("935121823924903987")
    .send(
      `Welcome <@${guildMember.user.id}> to The Kloekie Jar! Make sure to read our rules`
    );
};
