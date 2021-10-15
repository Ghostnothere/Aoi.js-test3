module.exports = {
name: 'event', 
code: `$if[$checkcontains[$tolowercase[$message[1]];poker;pk]==true]
$djseval[
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);
client.discordTogether.createTogetherCode('$voiceID', 'poker').then(async invite => {
 return message.channel.send(invite.code);
 });]
$elseif[$checkcontains[$tolowercase[$message[1]];youtube;yt]==true]
$djseval[
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);
client.discordTogether.createTogetherCode('$voiceID', 'youtube').then(async invite => {
 return message.channel.send(invite.code);
 });]
$endelseif
$elseif[$message==]
You need a message to supply
$endelseif
$else 
Not found
$endif
$onlyif[$voiceID!=; you need to be in a vc to do this]
$onlyif[$hasperms[$authorID;speak]==true]`
}