module.exports = {
type: "loopCommand",
executeOnStartup: true, //true or false
channel: "903983363495460905",
every: 1000,//time in ms 3000=3second 
code: `$sendMessage[
<@&902182884457218088>
{title:kizuki & Server Status}
{description:
**⛪ Server**
📝 Channels - $channelCount Channels!
🔴 Roles - $roleCount Roles!
👥 Members - $membersCount Members!

**🤖 Robot**
⛪ Servers - $serverCount Servers!
👥 Users - $allMembersCount Users!
⌨️ Commands - $commandsCount Commands!
}
{color:$randomText[FF0000;00FF00;0000FF;F00000;FF00FF;FFF000]}
{footer:kizuki Sends This Message Every 1 Seconds!| kizuki Owner - $username[$botOwnerID]!}
{thumbnail:$serverIcon};no]`
} 
a