module.exports = {
  name: 'emoji-info',
  aliases: ['emoji'],
  code: `
$djsEval[ const Discord = require('discord.js');
  const emoji = Discord.Util.parseEmoji('$message[1]');
  if (!emoji.id) {
     message.channel.send('> **❌ Insert a valid emoji.**')
   } else {
     let emoji_url = 'https://cdn.discordapp.com/emojis/' + emoji.id + '.' + (emoji.animated ? 'gif' : 'png')

     const Embed = new Discord.MessageEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setThumbnail(emoji_url)
        .setTitle('Emoji Info')
        .addField('Name:', emoji.name, true)
        .addField('ID:', emoji.id, true)
        .addField('Animated:', emoji.animated ? 'Yes' : 'No', true)
        .addField('Link:', '[Click Me](' + emoji_url + ')')

     message.channel.send(Embed);
   }
]`
} 