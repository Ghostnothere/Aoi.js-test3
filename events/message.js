module.exports = function(bot) {
   bot.on('messageCreate', async msg => {
     let prefix = bot.config.prefix;
     
     if(msg.channel.type === 1) return;
     if(msg.author.bot) return;
     if(!msg.content.startsWith(prefix)) return;
     
     let args = msg.content.replace(prefix, '').split(' ');
     let command = args.shift().toLowerCase();
     
     if(!command) return;
     
     
     
     const cmd = bot.commands[command] || Object.values(bot.commands).find(b => b.aliases.includes(command));
     
     if(cmd) {
       cmd.code(bot, msg, args)
     }
     
     
   });
}