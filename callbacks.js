module.exports = (bot) => {
 
bot.onMessage() //An event that allows to read/execute commands.
bot.onGuildJoin();
bot.onBanAdd();
bot.onInviteCreate();
bot.onInviteDelete();
bot.onJoined();
bot.onLeave();
bot.onMessageUpdate();
bot.onMessageDelete();
bot.onRoleCreate();
bot.onRoleDelete();
bot.onRoleUpdate();
bot.variables(require('./handlers/vars.js'))
}
