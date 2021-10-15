const aoijs = require("aoi.js")

const bot = new aoijs.Bot({
token: process.env.token,// this my token bot i put env dont try to take like shit
prefix: ["$getServerVar[Prefix]"],//prefix bot
intents: "all"
});
bot.loadCommands('./command');

bot.status({
  text: "with $serverCount | prefix c! owo",
  type: "STREAMING",//status
  url: "https://twitch.com/deeznuts123456e",
  status: "idle",
  time: 200
  
})
bot.status ({
text: "hello owo", 
type: "PLAYING",
status:"idle",
time: 400
})
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

bot.command({
name: "ping", //(command name)
code: `Pong! $pingms` //insert functions or text in string
})

bot.readyCommand({
    channel: "890162541723009054", //Optional channnel ID
    code: `$log[Ready on $userTag[$clientID]]`
})

const keepAlive = require('./server');
const Monitor = require('ping-monitor');
 
keepAlive();
const monitor = new Monitor({
    website: 'https://Aoija-testing-1.ghostland.repl.co',
    title: 'aoi.js',
    interval: 5 // minutes
});
 
monitor.on('up', (res) => console.log(`${res.website} up`));
monitor.on('down', (res) => console.log(`${res.website} down- ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} errorrrr.`) );
monitor.on('error', (error) => console.log(error));

bot.command({
name: "colorinfo",
aliases: ['colourinfo', 'colour-info', 'color-info'],
code: `$title[Color info]
$addField[Brighter Shade;$get[bright];yes]
$addField[RGB;$get[rgb];yes]
$addField[Hex Code;$get[hex];yes]
$addField[Name;$get[name];yes]
$image[attachment://color.png]
$attachment[$get[img];color.png]

$color[$message]
$let[name;$jsonRequest[https://api.popcat.xyz/color/$message;name]]
$let[hex;$jsonRequest[https://api.popcat.xyz/color/$message;hex]]
$let[rgb;$jsonRequest[https://api.popcat.xyz/color/$message;rgb]]
$let[bright;$jsonRequest[https://api.popcat.xyz/color/$message;brightened]]
$let[img;$jsonRequest[https://api.popcat.xyz/color/$message;color_image]]

$onlyIf[$isValidHex[$message]==true;Invalid hex code or color integer!]
$argsCheck[>1;:x: Provide a valid hex code or color integer to get info on. Example \`#SEMI#colorinfo 7289DA\` or \`#SEMI#colorinfo 000000\`]`
}) 

bot.command({
name:'clown',
code:`$attachment[$get[clown];clown.png]
$let[clown;https://api.itshappy.ga/v2/image/clown?image=$userAvatar[$findMember[$message[1];yes]]]
$cooldown[5s;Slow down, wait until the cooldown eis \`%time%\`]`
}); 
 
bot.command({
name:'godcat',
code:`$attachment[https://api.itshappy.ga/v2/image/godcat?image=$get[image];god.jpg]
$let[image;$userAvatar[$findMember[$message[1];yes]]]
$onlyBotPerms[attachfiles;**Missing Bot Permission**: **Attach Files**]
`
} )

bot.command({
name: "Axolotl",
code: `$author[$userTag[$authorID];$authorAvatar]
$title[$httpRequest[https://api.itshappy.ga/v2/animal/axolotl;GET;;fact;error]]
$image[$httpRequest[https://api.itshappy.ga/v2/animal/axolotl;GET;;image;error]]
$color[RANDOM]
$addTimestamp`

})

bot.command({
name: "binary",
code: `$if[$toLowercase[$message[1]]==encode]
$title[Text to Binary converter]
$addField[Output;\`\`\`fix
$jsonRequest[https://api.popcat.xyz/encode?text=$uri[encode;$messageSlice[1]];binary;API keeps going down man]
\`\`\`]

$addField[Input;\`\`\`fix
$messageSlice[1]
\`\`\`]
$elseif[$toLowercase[$message[1]]==decode]
$title[Binary to Text converter]
$addField[Output;\`\`\`fix
$jsonRequest[https://api.popcat.xyz/decode?binary=$uri[encode;$messageSlice[1]];text;API keeps going down man]
\`\`\`]

$addField[Input;\`\`\`fix
$messageSlice[1]
\`\`\`]

$endelseif
$endif
$color[$getUserVar[embedColor]]
$onlyIf[$messageSlice[1]!=;You must provide text to encode / decode]
$onlyIf[$checkContains[$toLowercase[$message];encode;decode]==true;$getVar[nah] Your first argument must be either \`encode\` or \`decode\`]
`
}) 

bot.command({
name:'avatar',
code:`$replaceText[$replaceText[$get[image];2048;4096];webp;png]
$let[image;$userAvatar[$findMember[$message[1];yes]]]
$onlyBotPerms[attachfiles;**Missing Bot Permission**: **Attach Files**]
`
})

bot.command({
  name: "rip",
  code: `$djsEval[(async () => { const Discord = require('discord.js')
const DIG = require("discord-image-generation")
let avatar = "$replaceText[$userAvatar[$mentioned[1;yes]];webp;png;-1]"

        let img = await new DIG.Rip().getImage(avatar)
        let attach = new Discord.MessageAttachment(img, "rip.png");
        message.channel.send(attach)})()]`
})

bot.command({
  name: "mute",
  code: `$author[$userTag[$findUser[$message[1];no]] has been muted;$userAvatar[$findUser[$message[1];no]]]
    $description[**Moderator:** $userTag[$authorID]
    **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
    $color[$getRoleColor[$getServerVar[mute;$guildID]]]
    $addTimestamp
    $giveRole[$findUser[$message[1];no];$getServerVar[mute]]
    $onlyIf[$roleExists[$getServerVar[mute;$guildID]]==true;you didn't set the mute role]
 
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to mute is higher than my highest role]
 
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$getServerVar[mute;$guildID]]];my highest role is lower than the mute role]
  $onlyIf[$hasRole[$findUser[$message[1];$getServerVar[mute]]]==false;this user was already muted]
  $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: =unmute @user/ID optional reason]
    $onlyPerms[manageroles;you need \`Manage roles\` permission]
  $onlyBotPerms[manageroles;I need \`Manage roles\` permission]
    $suppressErrors[failed to mute the user]`
})

bot.command({
name: "meme",
code: `$title[Meme Time]
$description[Memes memes and more memes]
$color[GREEN]
$image[https://ctk-api.herokuapp.com/meme/$random[1;500]]`
})

bot.command({
 name: "unban",
 code: `$unban[$message[1];By $userTag[$authorID] Reason: $sliceMessage[1]]
$username[$message[1]] **has been unbanned ✅**
$onlyBotPerms[ban;**⛔ I don't have ban perms]
$argsCheck[>1;**⛔ Please Provide User ID To Unban**]
$onlyPerms[ban;**⛔ You need ban permission**]
$suppressErrors[**⛔ I can't find that user**]`
})

bot.command({
name: "embed",
code: `

$title[$splitText[1]]
$description[$splitText[2]]
$onlyIf[$splitText[2]!=;Usage: {prefix}embed title/description, you're missing description separated by /]
$onlyIf[$splitText[1]!=;Usage: {prefix}embed title/description, you're missing title separated by /]
$deletecommand
$textSplit[$message;/]
$suppressErrors[❌ Something Went Wrong, Please Try Again Later.]
`
}) 

bot.command({
name: "bal", 
code: `$onlyIf[$isBot[$mentioned[1;yes]]!=true;Discord bots dont have a balance]
$thumbnail[$userAvatar[$mentioned[1;yes]]]
$color[RANDOM]
$title[$username[$mentioned[1;yes]]'s Balance]
$description[
$addField[🗡 Experience;
$numberSeparator[$getGlobalUserVar[XP;$mentioned[1;yes]]]xp
]
$addField[💵 Wallet;
$$numberSeparator[$getGlobalUserVar[Wallet;$mentioned[1;yes]]]
]
$addField[🏦 Bank;
$$numberSeparator[$getGlobalUserVar[Bank;$mentioned[1;yes]]]
]
$addField[📊 Net Worth;
$$numberSeparator[$sum[$getGlobalUserVar[Wallet;$mentioned[1;yes]];$getGlobalUserVar[Bank;$mentioned[1;yes]]]]
]]`
})

bot.variables({
prefix: "c!",
Prefix:" c!",
Wallet: "0",
Bank: "0", 
XP: "0",
warn: "0",
mute: "0",
ticketcooldown: "0",
subject: "0",
ticketcategory: "890852479904935956",
Blacklist: "100000",
ticketmessage: "you have create ticket", 
age: "0",
clientid: "0",
sm: "0",
})

bot.command({
  name: 'withdraw',
  aliases: 'with',
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$message];$authorID]
$setGlobalUserVar[Bank;$sub[$getGlobalUserVar[Bank;$authorID];$message];$authorID]
$title[Withdrew]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[
$username, you withdrew $$numberSeparator[$message] from your bank!]
$footer[💵 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$message]] | 🏦 $$numberSeparator[$sub[$getGlobalUserVar[Bank;$authorID];$message]] | 📊 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$getGlobalUserVar[Bank;$authorID]]]]
$onlyIf[$isNumber[$message[1]]==true;That's not a number!]
$onlyIf[$message<=$getGlobalUserVar[Bank;$authorID];Cannot withdraw more than what's in your bank!]
$argsCheck[>1;How much are you withdrawing?]
$onlyIf[$getGlobalUserVar[Bank;$authorID]>0;There's nothing to withdraw!]`

})

bot.command({	
name: "deposit", 
aliases: 'dep',
code: `$setGlobalUserVar[Bank;$sum[$getGlobalUserVar[Bank;$authorID];$message];$authorID]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];$message];$authorID]
$title[Deposited]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[
$username, you deposited $$numberSeparator[$message] into your bank!]
$footer[💵 $$numberSeparator[$sub[$getGlobalUserVar[Wallet;$authorID];$message]] | 🏦 $$numberSeparator[$sum[$getGlobalUserVar[Bank;$authorID];$message]] | 📊 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$getGlobalUserVar[Bank;$authorID]]]]
$onlyIf[$isNumber[$message[1]]==true;That's not a number!]
$onlyIf[$message<=$getGlobalUserVar[Wallet;$authorID];Cannot deposit more than what's in your wallet!]
$argsCheck[>1;How much are you depositing? Try this: \`$getServerVar[prefix]dep <amount>\`]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>0;There's nothing to deposit!]`
})

bot.command({
name: "beg", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;25]];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[0;5]];$authorID]
$title[Beg]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[$username, $randomText[Begging is for the weak so here;Here, take this and go;Here, don't let this be a habit;I take you for a well put together human being, why are you begging?;Why can't you just get a job?]
]
$footer[💵 +$$random[0;25] | 🗡 +$random[0;5]xp]
$globalCooldown[30s;Quit being a begger and try again in %time%]`
})

bot.command({
  name: "work", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[45;100]];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[5;10]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Work]
$description[
$username, $randomText[it looks like you'd do anything for money 😳.;you were employed as a construction worker today!;you're a discord workaholic!;nice music dude! Here, you earned it!;you were employed as a hair stylist today;hacking can make you a good deal of money if you know what you're doing! From your last hack job, you made;your bitcoin miner scraped up some cash for you!;were you not satisfied with your past employers? Well I counted the tips from your pole dancing gig and you didn't do too bad 😳]
]
$footer[💵 +$$random[45;100] | 🗡 +$random[5;10]xp]
$globalCooldown[60s;Try again in %time%]`
})

bot.command({
name:" trivia", 
code:`
const Discord = require('discord.js')
const { Trivia } = require("weky");

await Trivia({
	message: message,
	embed: {
		title: 'Trivia | Weky Development',
		description: 'You only have **{{time}}** to guess the answer!',
		color: '#5865F2',
        footer: '©️ Weky Development',
		timestamp: true
	},
	difficulty: 'hard',
	thinkMessage: 'I am thinking',
	winMessage:
		'GG, It was **{{answer}}**. You gave the correct answer in **{{time}}**.',
	loseMessage: 'Better luck next time! The correct answer was **{{answer}}**.',
	emojis: {
		one: '1️⃣',
		two: '2️⃣',
		three: '3️⃣',
		four: '4️⃣',
	},
	othersMessage: 'Only <@{{author}}> can use the buttons!',
	returnWinner: false`
})

bot.command({
name: "shorten",
code: `
$title[URL Shortener]
$description[
**Long URL:** $message[1]

**Shortened URL:** $jsonRequest[https://api.popcat.xyz/shorten?url=$message[1]&extension=$message[2];shortened]
$footer[Powered by api.popcat.xyz]
$color[$getUserVar[embedColor]]
$onlyIf[$isValidLink[$message[1]]==true;Not a valid URL]
`
})

bot.variables({
    suggestchannel: "",
  })

  bot.command({
 name: "set-suggest-channel",
 code: `
$setServerVar[suggestchannel;$mentionedChannels[1]] 
Set suggest channel to <#$mentionedChannels[1]> 
$argsCheck[>1;Please mention a channel] 
$onlyPerms[manageserver;You need manage server permission]
$onlyIf[$getServerVar[suggest_system]==true;Suggest system is not enabled!]
`
 })

bot.command({
 name: "suggest",
 code: `
 $useChannel[$getServerVar[suggestchannel]]
 $title[**New Suggestion!**]
 $description[
 username: $username[$authorID]
 Suggestion: $message]
 $color[RANDOM]
 $footer[✔ like it / ❌ didnt like it]
 $thumbnail[$userAvatar[$authorID]]
 $addCmdReactions[✔]
 $addReactions[✔;❌] 
$onlyIf[$getServerVar[suggestchannel]!=;This server has no suggest channel run **<setsuggestchannel** to set one!]
$onlyIf[$getServerVar[suggest_system]==true;Suggest system is not enabled!]

 `
 });

bot.command({
name: "ban",
code: `
$if[$isnumber[$message[1]]==false]
$senddm[$botownerid;<@$mentioned[1]> got unbanned w/ reason: automatic unban]
$unban[$mentioned[1]]
$wait[$message[2]]
$senddm[$botownerid;<@$authorid> Successfully banned <@$mentioned[1]> w/ reason: $messageslice[2]
$ban[$mentioned[1]]
$else
$senddm[$botownerid;<@$message[1]> got unbanned w/ reason: Automatic unban.]
$unban[$message[1]]
$wait[$message[2]]
$senddm[$botownerid;<@$authorid> Successfully banned <@message[1]> w/ reason: $messageslice[2]
banned for: $message[2]]
$ban[$message[1]]
$endif
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1]]];That user is higher than me on role position]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1]]];That user is higher than you on role position.]
$onlyif[$checkcontains[$message[2];s;m;d;w;y]==true;You must include a specified time]
$argscheck[>3;Use the following format to ban a user: \`-ban user_id 1s/1m/1d/1w/1y Reason for ban\`]
$onlyperms[ban;kick;administrator]
$onlyIf[$mentioned[1]!=$authorID;You can't ban yourself!]
$onlyif[$message[1]!=$authorid;You can't ban yourself!]

`
})

bot.command({
name: "reply",
code: `
You have approved the suggestion of the user: <@$message[1]>
With a response message of: $messageslice[1]
$setglobaluservar[response;$messageslice[1];$message[1]]
$onlyIf[$isnumber[$message[1]]==true;Your 1st message didn't include an ID Please make sure you use this format \`(yourprefixhere)reply userID Response_Message\`]
$argsCheck[>2;You require a user ID and The message you would like to respond with.]
$onlyif[$authorid==$botownerid;Only <@$botownerid> can execute this command :D]
`
})

bot.command({
  name: "clearwarns",
code: `$author[$userTag[$authorID];$userAvatar[$authorID]]
  $title[$message[last] warnings cleared from $userTag[$findUser[$message[1];no]]]
  $description[]
  $addTimestamp
  $onlyIf[$isBot[$findUser[$message[1];no]]==false;Bots cannot have warnings]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;the server owner cannot have warnings]
  $onlyPerms[kick;you need \`Kick\` permission]
  $onlyIf[$isNumber[$message[last]]==true;please write a valid number of warnings to clean from the user]
  $onlyIf[$getUserVar[warn;$findUser[$message[1]]]<=$message[last];the user does not have that amount of warnings to clean]
  $onlyIf[$checkContains[$message[last];-]==false;please write a valid **positive number** of warnings to clean from the user]
    $setUserVar[warn;$sub[$getUserVar[warn;$findUser[$message[1];no]];$message[last]];$findUser[$message[1];no]]
  $argsCheck[>1;❌ **incorrect usage**
 
  ✅ correct usage: =clearwarnings @user/ID (number)]
  $argsCheck[>2;❌ **incorrect usage**
 
  ✅ correct usage: =clearwarnings @user/ID (number)]
  $suppressErrors[failed to clear the warnings]`
})
 
bot.command({
  name: "clear",
  aliases: "purge",
  code: `$author[$userTag[$authorID];$authorAvatar]
  $title[successfully deleted $message[1] $replaceText[$replaceText[$checkCondition[$message[1]>1];true;messages];false;message]]
  $color[RANDOM]
  $addTimestamp
 
$clear[$message[1]]
  $onlyIf[$checkContains[$message[1];-]==false;you can use negative numbers, stop trying to break me smh]
  $onlyIf[$message[1]=>1;you can only clear more than 1 message]
  $argsCheck[>1;❌ incorrect usage
  
  ✅ correct usage: =clear <number>]
  $onlyPerms[managemessages;you need \`Manage messages\` permission]
  $onlyBotPerms[managemessages;I need \`Manage messages\` permission]
$suppressErrors[failed to clear the messages]`
})

bot.command({
  name: "tempban",
  code: `$channelsendmessage[$channelID;{author:$userTag[$findUser[$message[1]]] has been temporary banned}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$sendDM[$findUser[$message[1]];{author:you has been temporarily banned}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$ban[$findUser[$message[1];no];$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A rearson wasn't provided.];false;$messageSlice[1]]]
$setTimeout[$message[2];userID2: $findUser[$message[1]]
reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
$onlyIf[$isBanned[$findUser[$message[1]]]==false;this user was already banned]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to ban is higher than my highest role]
$onlyIf[$findUser[$message[1]]!=$ownerID;you can't ban the server owner]
$onlyIf[$findUser[$message[1]]!=$clientID;you can't ban me]
$argsCheck[>2;❌ incorrect usage
 
✅ correct usage: =tempban @user/ID <time(example: 5m)> <optional reason>]
$argsCheck[>1;❌ incorrect usage
 
✅ correct usage: =tempban @user/ID <time(example: 5m)> <optional reason>]
$onlyBotPerms[ban;I need \`Ban\` permission]
$onlyPerms[ban;you need \`Ban\` permission]`
})

bot.command({
  name: "tempmute",
  code: `$channelsendmessage[$channelID;{author:$userTag[$findUser[$message[1]]] has been temporary muted}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$sendDM[$findUser[$message[1]];{author:you has been temporarily muted}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$giveRole[$findUser[$message[1]];$getServerVar[mute]]
$setTimeout[$message[2];userID: $findUser[$message[1]]
serverID: $guildID]
$onlyIf[$hasRole[$findUser[$message[1]];$getServerVar[mute]]==false;this user was already muted]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to kick is higher than my highest role]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$getServerVar[mute;$guildID]]];my highest role is lower than the mute role]
$onlyIf[$getServerVar[mute]!=;you didn't set the mute role]
$onlyIf[$findUser[$message[1]]!=$ownerID;you can't mute the server owner]
$onlyIf[$findUser[$message[1]]!=$clientID;you can't mute me]
$argsCheck[>2;❌ incorrect usage
 
✅ correct usage: =tempmute @user/ID <time(example: 5m)> <optional reason>]
$argsCheck[>1;❌ incorrect usage
 
✅ correct usage: =tempmute @user/ID <time(example: 5m)> <optional reason>]
$onlyBotPerms[manageroles;I need \`Manage roles\` permission]
$onlyPerms[manageroles;you need \`Manage roles\` permission]`
})

bot.command({
  name: "warn",
  code: `$author[$userTag[$findUser[$message[1];no]] has been warned;$userAvatar[$findUser[$message[1];no]]]
  $title[**Moderator:** $userTag[$authorID]]
  $description[**Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $color[RANDOM]
  $addTimestamp
  $setUserVar[warn;$sum[$getUserVar[warn;$findUser[$message[1];no]];1];$findUser[$message[1];no]]
  $onlyIf[$isBot[$findUser[$message[1];no]]==false;you can't warn bots]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;you can't warn the owner of the server]
  $onlyIf[$findUser[$message[1];no]!=$authorID;you can't warn yourself]
  $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: =warn @user/ID optional reason]
  $onlyPerms[kick;you need \`Kick\` permission]
  $suppressErrors[user not found]`
})
bot.command({
  name: "infractions",
  code: `$author[$userTag[$findUser[$message[1];no]];$userAvatar[$findUser[$message[1];no]]]
  $title[Have: $getUserVar[warn;$findUser[$message[1]]] infractions]
  $description[]
  $addTimestamp
  $onlyIf[$isBot[$findUser[$message[1];no]]==false;Bots cannot have warnings]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;the server owner cannot have warnings]
  $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: =infractions @user/ID]
  $suppressErrors[user not found]`
})

bot.command({
  name: "unmute",
  code: `$author[$userTag[$findUser[$message[1];no]] has been unmuted;$userAvatar[$findUser[$message[1];no]]]
    $description[**Moderator:** $userTag[$authorID]
    **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
    $color[$getRoleColor[$getServerVar[mute;$guildID]]]
    $addTimestamp
    $takeRole[$findUser[$message[1];no];$getServerVar[mute]]
 
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to unmute is higher than my highest role]
 
$onlyIf[$hasRole[$findUser[$message[1];no];$getServerVar[mute]]==true;this user is not muted]
  $onlyIf[$roleExists[$getServerVar[mute;$guildID]]==true;you didn't set the mute role]
    $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$getServerVar[mute;$guildID]]];my highest role is lower than the mute role]
    $argsCheck[>1;❌ **incorrect usage**
  
  ✅ correct usage: =unmute @user/ID optional reason]
$onlyPerms[manageroles;you need \`Manage roles\` permission]
  $onlyBotPerms[manageroles;I need \`Manage roles\` permission]
    $suppressErrors[failed to unmute the user]`
})

bot.command({
  name: "setmuterole",
  aliases: "setmute",
  code: `$author[$userTag[$authorID];$userAvatar[$authorID]]
  $description[the <@&$findRole[$message[1]]> role has been established as a mute role]
  $color[$getRoleColor[$findRole[$message[1]]]]
  $addTimestamp
  $setServerVar[mute;$findRole[$message[1]];$guildID]
  $onlyIf[$roleExists[$findRole[$message[1]]]==true;that role doesn't exist]
  $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$findRole[$message[1]]];my highest role is lower than the role you choose]
  $onlyPerms[manageroles;you need \`Manage roles\` permission]
  $onlyBotPerms[manageroles;I need \`Manage roles\` permission]
  $suppressErrors[role not found]`
  })

bot.command({
  name: "kick",
  code: `$author[$userTag[$findUser[$message[1];no]] has been kicked;$userAvatar[$findUser[$message[1];no]]
  $description[**Moderator:** $userTag[$authorID]
  **Reason:** $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $color[ffd84d]
  $addTimestamp
  $kick[$findUser[$message[1];no];$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
  $onlyIf[$isBanned[$findUser[$message[1];no]]==false;that user is banned from the server]
  $onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1];no]]];the highest role of the user you are trying to kick is higher than my highest role]
  $onlyIf[$findUser[$message[1];no]!=$clientID;you can't kick me with myself]
  $onlyIf[$findUser[$message[1];no]!=$authorID;you can't kick yourself]
  $onlyIf[$findUser[$message[1];no]!=$ownerID;you can't kick the owner of the server]
   $argsCheck[1;❌ **incorrect usage**
  
  ✅ correct usage: =kick @user/ID optional reason]
   $onlyBotPerms[kick;I need \`Kick\` permission to do this]
  $onlyPerms[ban;you need \`Kick\` permission to do this]
  $suppressErrors[user not found]`
})

bot.command({
 name: "serverinfo",
 code:` $author[$serverNaame;$serverIcon]
 $description[
Name: $serverName
Server ID: $guildID
Owner: $userTag[$ownerID] <@$ownerID> 
Invite: $getServerInvite
Region: $serverRegion
Created on: $formatDate[$creationDate[$guildID];LLLL]
Verification level: $serverVerificationLevel
Boost level: $serverBoostLevel


 
Humans: $membersCount[$guildID;all;no]
Bots: $botCount
Online members: $membersCount[$guildID;online]
Idle members: $membersCount[$guildID;idle]
DND members: $membersCount[$guildID;dnd]
Offline members: $membersCount[$guildID;offline]
Total members: $membersCount

Animated emojis: $emojiCount[animated]/100
Non-animated emojis: $emojiCount[normal]/100
Total emojis: $emojiCount/200
Custom emojis: $serverEmojis

Text channels: $channelCount[text]
Voice channels: $channelCount[voice]
Total categories: $channelCount[category]
Total channels: $channelCount

Server features: $serverFeatures]
 $footer[Serverinfo]
 $thumbnail[$serverIcon]
 $color[GREEN]`
})

bot.command({
 name: "roleinfo",
 code: `$title[$roleName[$findRole[$message]] Info]
 
$description[
**Name:**
<@&$findRole[$message]>
 
**Color:**
\`$getRoleColor[$findRole[$message]]\`
 
**Creation Date:**
\`$creationDate[$findRole[$message];date]\`
 
**You have this role?**
\`$toLocaleUpperCase[$hasRole[$authorID;$findRole[$message];$guildID]]\`
 
**Members:**
\`$djsEval[message.guild.roles.cache.get('$findRole[$message]').members.map(m=>m.id).length;yes]\`

**Position:**
\`$rolePosition[$findRole[$message]]/$roleCount\`

**Permissions:**
\`$rolePerms[$findRole[$message];,]\`]
$argsCheck[1;{title:incorrect usage}{description:**Correct Usage:**
 
roleinfo <mention/ID>}
$color[#303136]`
 
})

bot.command({
 name: "8ball",
 code: `
$description[**What is your question?**
\`"$message?"\`
**My answer is...**
\`"$jsonrequest[https://api.rodiscool.repl.co/8ball;responce]"\`]
$color[RANDOM]
$onlyif[$message!=;{description:**You need to ask me something if you want an answer!**}{color:YELLOW}]
$thumbnail[https://66.media.tumblr.com/98c383d96670af7939e819e423825cfa/0ec5b0da41b86ce6-4d/s500x750/0f01086b8c1dcbde970fbaa818bc5f573df58b5f.gif]
`
})

bot.command({
 name: "daily",
 code: ` 💵 | You Claimed 20050 Money!
💰 | Next Daily After 12h
 $globalCooldown[12h;{description:You Can Claim Your Daily Again In %time%}{color:ff0000}
 ]
 $setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];20050];$authorID]`
})

bot.variables({
 snipe_msg: "0",
 snipe_author: "1",
 snipe_channel: "0",
 snipe_date: "0",
 msgEditorID: "undefined",
 esnipeOldMsg: "undefined",
 snen: "0",
 blocked: "false",
 cooldownRob: "10",
 color: "000000",
suggest_system: "no"
})
bot.deletedCommand({
 channel: "$channelID",
 code: `$setChannelVar[snipe_msg;$message]
 $setChannelVar[snipe_author;$authorID]
 $setChannelVar[snipe_channel;$channelID]
 $setChannelVar[snipe_date;$day $month $year - $hour:$minute]
 $setChannelVar[snen;0]`
});

bot.onMessageDelete();

bot.command({
 name: "snipe",
 code: `
$color[RANDOM]
$author[$userTag[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]];$userAvatar[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]]]
$description[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]]
$footer[#$channelName[$getChannelVar[snipe_channel;$mentionedChannels[1;yes]]]  $getChannelVar[snipe_date;$mentionedChannels[1;yes]]]

$onlyIf[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]!=;No hay nada para mostrar en <#$mentionedChannels[1;yes]>]
$onlyIf[$getChannelVar[snen]==0;]
`
});

bot.updateCommand({
 channel: "$channelID",
 code: `$setChannelVar[msgEditorID;$authorID]
 $setChannelVar[esnipeOldMsg;$oldMessage]
 $setChannelVar[snen;1]`
})

bot.onMessageUpdate();

bot.command({
 name: "snipe",
 code: `$author[$username[$getChannelVar[msgEditorID]]#$discriminator[$getChannelVar[msgEditorID]];$userAvatar[$getChannelVar[msgEditorID]]]
$description[$getChannelVar[esnipeOldMsg]]
$addTimestamp
$color[RANDOM]
$onlyIf[$getChannelVar[esnipeOldMsg]!=undefinied;{description: No hay nada para mostrar}{color: RED}]
$onlyIf[$getChannelVar[msgEditorID]!=undefinied;{description: No hay nada para mostrar}{color: RED}]
$suppressErrors[No hay nada para mostrar]
$onlyIf[$getChannelVar[snen]==1;]`
})

bot.command({
name: "boosts",
code:`
$title[Boosts of the server]
$description[$serverName has $serverBoostCount Boosters
Boosters list ⬇️
**$djsEval[guild.roles.cache.filter(x=>x.managed === true).find(x=>x.members.find(y=>!y.user.bot)). members.map(x=>x.user.tag).join(" \\n");yes]**
]
$color[RANDOM]`
})
 
bot.command({
 name: "userinfo",
aliases: ['whois','info'],
 code: `$color[RANDOM]
 $thumbnail[$userAvatar[$mentioned[1;yes]]]
 $title[User Info]
 $addField[**Custom Status**;$getCustomStatus[$mentioned[1;yes]];yes]
 $addField[**Avatar**;[User Avatar\\]($userAvatar[$mentioned[1;yes];2048;yes]);yes]
$addField[** 💿 Server**;**Joined**: $memberJoinedDate[$mentioned[1;yes];time] ago
\`🔝\` **Highest Role**: <@&$highestRole[$mentioned[1;yes]]>
\`📃\` **Roles**: $userRoles[$mentioned[1;yes];mentions]
\`✅\` **Permissions**: $userPerms[$mentioned[1;yes]];yes]
$addField[** :adult: Basic Info**; \`📛\` **Name**: $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]
\`💳\` **ID**: $mentioned[1;yes]
\`🌈\` **Status**: $status[$mentioned[1;yes]]
\`🔶\` **Badges**: $getUserBadges[$mentioned[1;yes]]
\`💻\` **Platform**: $platform[$mentioned[1;yes]]
\`👶\` **Creation Date**: $creationDate[$mentioned[1;yes];date] ($creationDate[$mentioned[1;yes];time]);yes]
 `
})

bot.command({
name: "lyrics",
aliases: "l",
code:`
$title[Lyrics] $description[$jsonRequest[https://some-random-api.ml/lyrics?title=$songInfo[title];lyrics;No Lyrics Found for this song.] $color[RANDOM] ]`
}) 

bot.command({
 name:"hack",
 code:`**__Starting a dangerous Hack on $username[$mentioned[1]]__**
 $editIn[3s;**Got the token of the user:**
 $randomString[18];**Email of the user:**
 $replaceText[$username; ;_;-1]@gmail.com;Password:
 $randomString[7];**Recent contacts:**
 $username[$randomUserID];**Most used word:**
 $randomText[meme;lol;nah;lmao;dude;bruh;wut;nou];**Most recent dm message:**
 $randomText[I think you are mad af;bye;Why u blocked me;I am mad];**Hacking medical records**;**Hacked Email(bypassed 2FA too)**;**Injecting Latest version of Corona into the account**;**Hacking microsoft account**;**Microsoft password: $randomText[ZapIsZap@Zap.com;IAmNoob@gmail.com;ByeBye@ok.co.in;$replaceText[$username; ;_;-1]IsSmart@yahoo.com]**;**Checking User Games**;**Plays $randomText[fortnite(....);subway surfers;temple run;clash of clans]**;**Hacking epic games account**;**Epic games account hacked and deleted**;**Discord IP:
 $numberSeparator[$random[100000000;900000000];.]**;__The *totally* dangerous, risky and scary hack on $username[$mentioned[1]] is complete!__
 
 But be safe, the police may come anytime soon now :rofl:]
 $onlyIf[$mentioned[1]!=;Woah wait, where is the person who is to be hacked bruh]
 $onlyIf[$authorID!=$mentioned[1];....hacking yourself?]`

})

bot.command({
 name: "pat",
 code:`
$color[04c7fa]
$title[$username[$authorID] patted $username[$mentioned[1]]]
$image[$randomText[https://media1.tenor.com/images/68c98c4b89cf159d410c8f1bd5b7c124/tenor.gif;https://media1.tenor.com/images/16ec668d63ac6c1e8a1635b855cb1654/tenor.gif;https://media1.tenor.com/images/54722063c802bac30d928db3bf3cc3b4/tenor.gif;https://media1.tenor.com/images/76f574af72542be9e30fbffec02339b3/tenor.gif?itemid=13570956;https://media1.tenor.com/images/57e98242606d651cc992b9525d3de2d8/tenor.gif?itemid=17549072;https://media1.tenor.com/images/078599227bc087959b79ea111fbc0f3a/tenor.gif?itemid=13596135;https://cdn.discordapp.com/attachments/708671684491739199/708672410475560970/ko9MR4Q5E3y.gif?size=2048;https://cdn.discordapp.com/attachments/708671684491739199/708672413545660507/LR8lKzjm1Eo.gif?size=2048;https://cdn.discordapp.com/attachments/708671684491739199/708672400631267368/63EVshtRzG1.gif?size=2048;748310506934239284/755087993823297536/tenor-1.gif?size=2048;https://cdn.discordapp.com/attachments/758055465400926362/758532816035905536/IeBMrEGZ.gif?size=2048]]
$onlyIf[$message!=;]
$onlyIf[$userExists[$mentioned[1]]==true;Mention someone you want pat]`

})

bot.command({
 name: "luckyspin",
 code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[2000;10000]];$authorID]
Spinning the wheel! $editIn[3s; You got $random[2000;10000]!!
$globalCooldown[1h;Try again in %time%]`
})

bot.command({
name: "slot",
code: `
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$replaceText[$replaceText[$checkCondition[won==$randomText[won;lost]];true;$message[1]];false;-$message[1]]]]

$thumbnail[$authorAvatar]
$color[$replaceText[$replaceText[$checkCondition[$randomText[won;lost]==won];true;07ff00;1];false;E64338;1]]
$title[$username's Slot Game] 
$description[>>> **$randomText[🍋;🍊;🍏;🍒;🍇] | $randomText[🍊;🍒;🍇;🍏;🍋] | $randomText[🍒;🍋;🍊;🍇;🍏]
$replaceText[$replaceText[$checkCondition[$randomText[won;lost]==won];true;$randomText[🍊 | 🍊 | 🍊 ;🍇 | 🍇 | 🍇;🍒 | 🍒 | 🍒;🍏 | 🍏 | 🍏;🍋 | 🍋 | 🍋];1];false;$randomText[🍒 | 🍊 | 🍊;🍇 | 🍏 | 🍒;🍇 | 🍒 | 🍊;🍏 | 🍊 | 🍒;🍏 | 🍇 | 🍊;🍋 | 🍊 | 🍒;🍒 | 🍋 | 🍊;🍏| 🍋 | 🍇;🍇 | 🍋 | 🍒;🍏 | 🍊 | 🍋];1] ⬅
$randomText[🍇;🍊;🍋;🍏;🍒] | $randomText[🍒;🍏;🍇;🍋;🍊] | $randomText[🍒;🍇;🍋;🍏;🍊]**]
$footer[You $randomText[won;lost] $message[1] 💰]

$argsCheck[1;Please type amount.]

$onlyIf[$isNumber[$message[>]]==true;Wrong syntax! that's not an amount.]

$onlyIf[$message[>]>=10;Minimum bet amount is 10.]

$onlyIf[$message[>]<=100000;Maximum bet amount is 100000.]

$onlyIf[$getGlobalUserVar[Wallet]>=$message[>];You don't have enough coins in your Wallet.]
`})

bot.command({
name:"stats",
aliases:['i','botstats','info','botinfo','bot-stats','bot-info'],
code:`
$author[Bot Stats;$userAvatar[$clientID]]
$description[
$addField[Links;
🔗 [Support Server](Support Server Link)
🔗 [Invite Me]($getBotInvite[admin])
$addField[Versions;
💿 Node.JS Version: $nodeVersion
📖 Library: Aoi.JS
💾 Aoi.JS Version: $packageVersion]
$addField[General;
💻 CPU Usage: %$cpu
💻 CPU Model: $djsEval[require ('os').cpus()[0].model;yes]
🏓 Ping: $pingms
⏱️ Uptime: $client[readytimestamp]
⚙️ Commands Count: $commandsCount
👥 All Members Count: $allMembersCount
🎚️ Servers Count: $serverCount
🏅 All Channels Count: $allChannelsCount
📀 All Channels Count (text): $allChannelsCount[text]
🔉 All Channels Count (voice): $allChannelsCount[voice]
🚦 Ram Usage: $ram MB/$replaceText[$abbreviate[$maxRam];K; GB;-1]
🐧 Platform: $replaceText[$djsEval[require ('os').platform();yes];linux; 🐧 Linux;-1]
👑 Owner: $userTag[$botOwnerID]]
$color[#2C2F33]
$thumbnail[$userAvatar[$clientid]]
$footer[$userTag[$clientID];$userAvatar[$clientID]]
$addTimestamp
`
})

bot.command({
name:"nuke",
code:`
$channelSendMessage[$channelID[$get[channel]];☑️ | $userTag[$authorid] Channel Successfully Nuked!
$randomText[{attachment:nuke.gif:https://i.pinimg.com/originals/6c/48/5e/6c485efad8b910e5289fc7968ea1d22f.gif};{attachment:nuke.gif:https://cdn.discordapp.com/attachments/681447100369731808/749666929077125170/ezgif.com-optimize_32.gif};{attachment:nuke.gif:https://cdn.discordapp.com/attachments/681447100369731808/749665482579247144/dcccc1599e477dc4b33bdd890295a0eb.gif};{attachment:nuke.gif:https://cdn.discordapp.com/attachments/681447100369731808/749665483170775090/gif-explosion-57.gif};{attachment:nuke.gif:https://cdn.discordapp.com/attachments/681447100369731808/749665483623628850/200.gif};{attachment:nuke.gif:https://cdn.discordapp.com/attachments/681447100369731808/749665484139397210/1e5ae8453f3ed25e4cc1c0a0ea4e8f5d.gif};{attachment:nuke.gif:https://cdn.discordapp.com/attachments/681447100369731808/749666090614784080/Minecraft-tnt-explosion.gif};{attachment:nuke.gif:https://cdn.discordapp.com/attachments/681447100369731808/749666134235807804/u9gxyavtmcbhzcgcgqms.gif};{attachment:nuke.gif:https://cdn.discordapp.com/attachments/681447100369731808/749666134235807804/u9gxyavtmcbhzcgcgqms.gif};{attachment:nuke.gif:https://cdn.discordapp.com/attachments/681447100369731808/749666145157775370/40512312328d1281f6fa05ba6f163991.gif}];no]
$wait[1ms]
$let[channel;$channelName]
$cloneChannel
$deleteChannels[$channelID]
$wait[2ms]
$onlyBotPerms[managechannels;I dont have manage channels permission in this server!]
$onlyPerms[managechannels;You dont have permission to do that!]
`
})

bot.command({
name:"giveaway",
aliases:['gw','start'],
category:"Utility",
usage:"gw <channel> <time> <channel>",
description:"Start a giveaway for the given time in the provided channel!",
code:`$sendmessage[<@$randomtext[$replacetext[$joinsplittext[;];#SEMI#$clientid;;1]]> won the giveaway of **$messageslice[2]**!;no]
$editmessage[$get[mid];🎉 **Giveaway Ended!** 🎉{title:Giveaway!}{description:<@$randomtext[$replacetext[$joinsplittext[;];#SEMI#$clientid;;1]]> has won the giveaway!\n\n**Prize**#COLON# $messageslice[2]}{timestamp}{color:BLUE};$findchannel[$message[1];no]]
$textsplit[$getreactions[$channelid;$get[mid];🎉;id];,]
$wait[$message[2]] 
$let[mid;$splittext[1]]
$wait[1s]
$textsplit[$channelsendmessage[$findchannel[$message[1];no];🎉 **A New Giveaway Has Started! 🎉**{author:Giveaway! 🎉:$authoravatar}{field:Prize:$messageslice[2]:no}{field:Time:$message[2]:no}{field:Hosted By:$usertag:no}{color:RANDOM}{footer:React with 🎉 to participate!:$servericon}{reactions:🎉};yes]; ]
$onlyperms[manageserver;Not enough permissions! You require the manage server permissions to execute this!]
$argscheck[>2;Try \`$getservervar[prefix]gw <channel> <time> <prize>\`!]
$onlyif[$channelexists[$findchannel[$message[1];no]]==true;Did not find the channel!]`})

bot.command({
 name: "gun",
code: `
$image[https://api.tomio.codes/api/gun?url=$replaceText[$userAvatar[$findUser[$message]];webp;png]]
 $color[RANDOM]
 $footer[Required By $username;$authorAvatar]`
})

bot.command({
name: "achievement",
code: `$title[Achievement unlocked!]
$argsCheck[>1;Provide some text !!
$image[https://api.cool-img-api.ml/achievement?text=$replaceText[$message; ;%20;-1]]
$color[RANDOM]`
})

bot.command({
name: "time", 
code: `
$if[$message[1]==set]
$setUserVar[timezone;$message[2]]
$channelSendMessage[$channelID;Timezone has been set **successfully!**]


$elseIf[$message[1]==me]

$if[$getUserVar[timezone]==Not Set]
$channelSendMessage[$channelID;You have to set up your **Timezone** first! **Use:** s!time set <continent/city> For more info do **$getServerVar[prefix]help time**

$else
Your Current Timezone is **$getUserVar[timezone]**
The Current time is: **$hour:$minute:$second** $formatDate[$dateStamp]
$timezone[$getUserVar[timezone]]
$endif
$endelseIf

$elseIf[$message[1]==clear]
$setUserVar[timezone;Not Set]
$channelSendMessage[$channelID;Timezone has been cleared **successfully!**]
$endelseIf
$endif
$onlyif[$message[1]!=;Syntax: $getServerVar[prefix]time <me/set/clear> ]
$suppressErrors[An Error has occured Make sure you have set you timezone properly!]
`
})

bot.command({
name:"imagine",
code: '$title[imagine] $description[<@$authorID> is finding it hard to imagine $message] $footer[pfft imagine] $color[RANDOM] $onlyIf[$message[1]!=;{description:what do you want to imagine ?!}]'


})
bot.command({
 name: "dice",
 code: `$botTyping
 $title[Dice Roll]
 $color[007BFF]
 $description[Rolling your Dice]
 $editIn[1s;{title:Dice Roll}{color:007BFF}{description:Rolling your Dice.};{title:Dice Roll}{color:007BFF}{description:Rolling your Dice..};{title:Dice Roll}{color:007BFF}{description:Rolling your Dice...};{title:Dice Roll}{color:FFD200}{description:You got: $randomText[1️⃣;2️⃣;3️⃣;4️⃣;5️⃣;6️⃣]}{footer:Rolled by $username}]
$cooldown[10s;Please wait **%time%** to roll another Dice.] 
`
})

bot.command({
 name: "weekly",
 code: `$title[Weekly Reward]
$description[Your daily reward is **$$random[1000000;2000000]**]
$footer[Requested by $username]
$globalCooldown[6d;This is a weekly command, meaning it can only be executed...well, weekly. Try again in %time%.]
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[1000000;2000000]]]`
});

bot.command({
 name: "stonks",
 code: `
 $image[https://vacefron.nl/api/stonks?user=$userAvatar[$mentioned[1]][&notstonks=BOOL]]
 $color[RANDOM]`
})

bot.command({
 name: "slap",
 code: `
 $image[https://vacefron.nl/api/batmanslap?text1=AAAA!&text2=LUUUU&batman=$userAvatar&robin=$userAvatar[$mentioned[1]]] $color[RANDOM]`
})

bot.command({
 name: "firsttime",
 code: `
 $image[https://vacefron.nl/api/firsttime?user=$userAvatar[$mentioned[1]]]
 $color[RANDOM]`
})

bot.awaitedCommand({
name: "accept",
code: `$changeNickname[$getMessageVar[clinetid;$messageID];$getMessageVar[prefixadd;$messageID] | $userName[$getMessageVar[clinetid;$messageID]]]
$sendDm[$getMessageVar[userid;$messageID]; Your bot has been Acepted in! ]
$channelSendMessage[806955956578680882;{title:New bot!} {description: $userTag[$getMessageVar[clinetid;$messageID]] has been acepted and added by a bot inviter!} {color:00ff00} <@$getMessageVar[clinetid;$messageID]>]
$editMessage[$message[1];{title: Bot accepted!}
{color: 00ff00} {description: a bot inviter has accepted this bot called $userTag[$findUser[$getMessageVar[clinetid;$messageID]]]}] 
$clearReactions[$channelID;$Message[1];all]
$onlyIf[$memberExists[$getMessageVar[clinetid;$messageID]]==true; Hey $userTag the bots **not Here** make sure you add it before trying to acept. Spaming this will lead in demote...] 
$onlyPerms[admin;manageserver;]
$suppressErrors[A extreme error just happened...]`
}) //This will respond when the user reacts

bot.awaitedCommand({
name: "decline",
code: `$channelSendMessage[806955956578680882; <@$getMessageVar[userid]> {title: Declined!} {description: **$userTag[$getMessageVar[clinetid;$messageID]]** Has been **declined** by $userTag for one of the reasons below.
- A private bot
- testing
- an oath2 problem
- is not your bot
- has a verification problem like being verified} {color: FF0000}]
$sendDm[$getMessageVar[userid;$messageID]; Your bot has been declined!]
$editMessage[$message[1];{title: decline!}
{color: FF0000} {description: $usertag has declined this bot called $userTag[$getMessageVar[clinetid;$messageID]]
$clearReactions[$channelID;$Message[1];all]
please ask them to fix the bot! and try again! }]

$onlyPerms[admin;manageserver; ] 
$suppressErrors[A extreme error just happened...]`
})

bot.command({
name: "achievement",
code: `$title[Achievement unlocked!]
$argsCheck[>1;Provide some text !!
$image[https://api.cool-img-api.ml/achievement?text=$replaceText[$message; ;%12;-1]]
$color[RANDOM]`
})

bot.variables({
  prefix: "c!",
  lvl: "0",
  xp: "0",
  reqxp: "300",
  command: "0",
  AFK: "off",
  time: "0",
})

bot.variables({
 messages: "0",
});

bot.command({
    name: 'solve',
    code: `
$setGlobalUserVar[answer;$math[$random[0001;999]$randomText[+;-;/;*]$random[1;999]]]
<@$authorid>, Whats \`$random[0001;999]$replaceText[$replaceText[$randomText[+;-;/;*];*;x];/;÷]$random[1;999]\` 🤔
$setGlobalUserVar[rest;1]
$awaitMessages[$authorid;10s;everything;answersolve;You did'nt answer in time, Goodbye!]
$globalCooldown[10s;You already run this command before, please try again in %time%!]`
})

bot.awaitedCommand({
    name: 'answersolve',
    code: `$if[$message==$getGlobalUserVar[answer]]
$randomText[Wow you got it right!;Goodjob $username!;Great stuff!;You're right], Enjoy your 💵$random[1;20]
$onlyIf[$getGlobalUserVar[rest]==1;]
$else 

$setGlobalUserVar[rest;0]
$randomText[Wrong!;You've got it wrong :(;Wrong answer!], No reward for you $randomText[dumbie;airhead;smallhead].
$onlyIf[$getGlobalUserVar[rest]==1;]
$endif
`
})

bot.command({
name: "leaderboard-2",
aliases: ['rich'],
code: `$title[**Richest People on Discord**]
 $color[RANDOM]
 $description[$globalUserLeaderBoard[Wallet;asc; {top}. {username} - **{value}**]]
 $cooldown[5s;{description:A bit too fast there. Wait for **time%**!}{color:RANDOM}]
 $onlyIf[$checkContains[$channelType;text;news]==true;]`
})

bot.command({
 name: "wanted",
 code: `
 $title[Wanted...Dead or Alive]
 $image[https://someapi.dragonroyale.repl.co/wanted?avatar=$userAvatar[$findUser[$message;yes]]]
 $footer[Anyone seen this person?]
 $color[RANDOM]`
})



bot.command({
 name: "fact",
 code: `
 $title[A Random Fact!]
 $description[$jsonRequest[https://api.popcatdev.repl.co/fact;fact;An error occured! Please try again later :/]]
 $footer[Hope you learned something new! ^^]
 $color[RANDOM]
 $botTyping`
})

bot.command({
 name: "trigger",
 code: `
 $title[TRIGGERED!]
 $image[https://api.devs-hub.xyz/trigger?image=$userAvatar[$mentioned[1];yes]]
 $footer[Firee]
 $color[RANDOM]
 $onlyIf[$mentioned[1]!=; Mention someone too next time, lol]`
})

bot.command({
  name: "add-emoji",
  code: `
  $sendMessage[✅ Successfully **added the BELOW emoji** into this server using an image link!;no]
  $addEmoji[$message[1];$message[2];yes]
  $onlyBotPerms[❌ <@$authorID> I do not have the "manage-emojis" permission to execute this command!]
  $onlyPerms[manageemojis; <@$authorID> sorry, you cannot use this command!]
  $suppressErrors[❌ Failed to add the emoji!
**__Possible Reasons:__** URL was invalid/Not for an emoji, image size was too big to add as an emoji!]
  $onlyIf[$message[2]!=; <@$authorID> next time, please specify the **__name of the emoji__** too! Usage: $getVar[ok]f!add-emoji <image-url> <emoji-name> $getVar[ok]]
  $onlyIf[$message[1]!=; <@$authorID> next time, please specify the **__LINK of the image__**, to add as an emoji too! Usage: $getVar[ok]f!add-emoji <image-url> <emoji-name> $getVar[ok]]`
})

bot.command({
  name:"steal",
  code:`✅ Successfully **added the emoji** $message[1] with the name **__$message[2]__**!
  $addemoji[$replacetext[$replacetext[$checkcondition[$isvalidlink[$message[1]]==true];true;$message[1]];false;https://cdn.discordapp.com/emojis/$findnumbers[$message[1]]];$message[2]]
  $suppressErrors[❌ Failed to add the emoji! Please specify the emoji to add with the **correct usage** next time! Usage: $getVar[ok]f!steal <emoji-from-a-server> <emoji-name> $getVar[ok]]
  $onlyIf[$message[2]!=; <@$authorID> next time, please specify the **__name of the emoji__** to add too! Usage: $getVar[ok]f!steal <emoji-from-a-server> <emoji-name> $getVar[ok]]
  $onlyIf[$message[1]!=; <@$authorID> next time, please specify the **__emoji from another server__**, to add too! Usage: $getVar[ok]f!steal <emoji-from-a-server> <emoji-name> $getVar[ok]]
  $onlyBotPerms[manageemojis; ❌ <@$authorID> I do not have the "manage-emojis" permission to execute this command!]
  $onlyPerms[manageemojis; <@$authorID> sorry, you cannot use this command!]`
})

bot.command({
  name: "delete-emoji",
  code: `
  ✅ Successfully deleted the specified emoji!
  $deleteemojis[$noescapingmessage]
  $suppresserrors[❌ Failed to delete emoji. Possible reason: That emoji was not from this server!]
  $onlyIf[$message[1]!=; <@$authorID> next time, please specify the emoji to delete from the server too! Usage: $getVar[ok]f!delete-emoji <emoji-in-the-server> $getVar[ok]]
  $onlyBotPerms[manageemojis; <@$authorID> I need the "manage-emojis" permission to execute this command!]
  $onlyPerms[manageemojis; <@$authorID> sorry, you cannot use this command!]`
})

bot.command({
  name: "set-logs",
  code: `
  $setServerVar[logschannel;$mentionedChannels[1]]
  ✅ Successfully set my logs to **$channelName[$mentionedChannels[1]]**!
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $onlyIf[$mentionedChannels[1]!=; <@$authorID> Please **mention the channel** to set my logs! Usage: $getVar[ok]f!set-logs <mention-the-channel>$getVar[ok]. I advise to make a channel, **ONLY for my logs** to make it easier to read them.]`
})

bot.banAddCommand({ 
channel: "$getServerVar[logschannel]",
code: `
$title[Ban Notice]
$description[**$username#$discriminator[$authorID]** was banned from the server.

**Total Number of Bans:** $banCount

**All Users Banned: ** $usersBanned[username;,]] 
$thumbnail[$userAvatar[$authorID]]
$addTimestamp
$color[FF0000]
$onlyForServers[$guildID;]
`
})

bot.banRemoveCommand({
channel: "$getServerVar[logschannel]",
code: `
$title[UnBan Notice]
$description[**$username#$discriminator[$authorID]** was unbanned from the server.] 
$thumbnail[$userAvatar[$authorID]]
$addTimestamp
$color[RANDOM]
$onlyForServers[$guildID;]
`
})
bot.inviteCreateCommand({
channel: "$getServerVar[logschannel]",
code: `
$title[New Invite Created]
$thumbnail[$userAvatar[$inviteUserID]]
$description[**Details of the new invite created: **

**Creator:** $username#$discriminator[$inviteUserID]
**URL:** $inviteURL
**Channel Name:** $channelName[$inviteChannelID]
**Invite Code:** $inviteCode
**Max Uses:** $inviteMaxUses]
$addTimestamp
$color[RANDOM]
$onlyForServers[$guildID;]
`
})

bot.inviteDeleteCommand({
channel: "$getServerVar[logschannel]",
code: `
$title[Invite Deleted]
$thumbnail[$userAvatar[$clientID]]
$description[**Details of the old invite that was deleted: **

**Creator:** $username#$discriminator[$inviteUserID]
**URL:** $inviteURL
**Channel Name:** $channelName[$inviteChannelID]
**Invite Code:** $inviteCode
**Max Uses:** $inviteMaxUses]
$addTimestamp
$color[RANDOM]
$onlyForServers[$guildID;]`
})

bot.joinCommand({
channel: "$getServerVar[logschannel]",
code: `
$title[A New User Joined The Server!]
$description[A new user, **$username#$discriminator[$authorID]** just joined!]
$thumbnail[$userAvatar[$authorID]]
$addTimestamp
$color[RANDOM]
$onlyForServers[$guildID;]`
})

bot.leaveCommand({
channel: "$getServerVar[logschannel]",
code: `
$title[A User Left The Server]
$description[A user, **$username#$discriminator[$authorID]** just left the server.]
$thumbnail[$userAvatar[$authorID]]
$addTimestamp
$color[FF0000]
$onlyForServers[$guildID;]`
})

bot.updateCommand({
channel: "$getServerVar[logschannel]",
code: `
$title[Message Edited]
$description[
**User:** $username#$discriminator[$authorID]
**Channel:** <#$channelUsed>
**Old Message:** $oldMessage
**New Message:** $message]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$onlyForServers[$guildID;]
`
})

bot.roleCreateCommand({ 
channel: "$getServerVar[logschannel]", 
code: `
$title[New Role Created]
$description[**Details of the new role created:**

**Name:** $newRole[name]
**ID:** $newRole[id]
**Position:** $newRole[position]
**Raw Position:** $newRole[rawPosition]
**Hex Color:** $newRole[hexColor]
**Color:** $newRole[color]
**Hoisted?** $newRole[hoist]
**Mentionable By Me?** $newRole[mentionable]
**Editable By Me?** $newRole[editable]
**Managed?** $newRole[managed]
**Permissions:** $newRole[permissions]]
$thumbnail[$userAvatar[$clientID]]
$color[RANDOM]
$onlyForServers[$guildID;]

`
})

bot.roleDeleteCommand({ 
channel: "$getServerVar[logschannel]", 
code: `
$title[Role Deleted]
$description[
**Details of the old role deleted:**

**Name:** $oldRole[name]
**ID:** $oldRole[id]
**Position:** $oldRole[position]
**Raw Position:** $oldRole[rawPosition]
**Hex Color:** $oldRole[hexColor]
**Color:** $oldRole[color]
**Hoisted?** $oldRole[hoist]
**Mentionable By Me?** $oldRole[mentionable]
**Editable By Me?** $oldRole[editable]
**Managed?** $oldRole[managed]
**Permissions:** $oldRole[permissions]]
$thumbnail[$userAvatar[$clientID]]
$color[RANDOM]
$onlyForServers[$guildID;]`
})

bot.roleUpdateCommand({ 
channel: "$getServerVar[logschannel]", 
code: `
$title[Role Updated]
$description[
**Details of the old role:**

**Name:** $oldRole[name]
**ID:** $oldRole[id]
**Position:** $oldRole[position]
**Raw Position:** $oldRole[rawPosition]
**Hex Color:** $oldRole[hexColor]
**Color:** $oldRole[color]
**Hoisted?** $oldRole[hoist]
**Mentionable By Users?** $oldRole[mentionable]
**Editable By Users?** $oldRole[editable]
**Managed?** $oldRole[managed]
**Permissions:** $oldRole[permissions]

**Details of the role, updated:**

**Name:** $newRole[name]
**ID:** $newRole[id]
**Position:** $newRole[position]
**Raw Position:** $newRole[rawPosition]
**Hex Color:** $newRole[hexColor]
**Color:** $newRole[color]
**Hoisted?** $newRole[hoist]
**Mentionable By Users?** $newRole[mentionable]
**Editable By Users?** $newRole[editable]
**Managed?** $newRole[managed]
**Permissions:** $newRole[permissions]]
$thumbnail[$userAvatar[$clientID]]
$color[RANDOM]
$onlyForServers[$guildID;]`
})


bot.variables({
  ok: "`",
  logschannel: ""
 
})
bot.command({
  name: "set-chatbot",
  code: `
  $setServerVar[chatbotstats;true]
  $setServerVar[chatbot_channel;$mentionedChannels[1]]
  ✅ Successfully set the chatbot to **$channelName[$mentionedChannels[1]]**. Hoping to chat with all of you there!
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $onlyIf[$mentionedChannels[1]!=; Please **mention the channel** to set the chatbot! Usage: $getVar[ok]f!set-chatbot <mention-the-channel>$getVar[ok]]`
})  

bot.command({
  name: "$alwaysExecute",
  code: `
  $channelSendMessage[$getServerVar[chatbot_channel]; $jsonRequest[https://api.affiliateplus.xyz/api/chatbot?message=$message&botname=Fyron&ownername=ItzJust_Prime#9636&user=1;message;❌ An error occurred... Please try again later :/]]
  $botTyping
  $onlyIf[$isBot[$authorID]==false;]
  $onlyIf[$getServerVar[chatbotstats]==true;]
  $onlyIf[$channelID==$getservervar[chatbot_channel];]`
})

bot.command({
  name: "disable-chatbot",
  code: `
  $setServerVar[chatbotstats;false]
  $if[$getServerVar[chatbotstats]==false;]
  <@$authorID> the chatbot is already disabled!
  $else
  ✅ Successfully disabled the chatbot!
  $endif
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]`
})
bot.variables({
   chatbot_channel: "",
   chatbotstats: "false",
   lockserverstats: "false",
  lockchannelstats: "false",
  viewlockstats: "false",
  max_mention: "5",
  mm_count: "0",
  massmention: "false",
  spammessages: "0",
  antispam: "false",
  ok1: "```",
  sendlinks: "false",
  open_bracket: "[",
  close_bracket: "]",
  caps: "false",
  antiswear: "false",
  pw_list: "",
  tree: "",
  apple: "",
  shrek: "",
  idkwhat: "",
  ghostforbbm: "true",
  automeme: "false",
  masti: "",
  lolwhat: "",
  emoji1: "",
  testlol: "",
  testvar: "",
  page: "2",
  chatbotstats: "false",
  people: "",
  gwchannel: "",
  gwrole: "",
  gwtime: "",
  roleorno: "",
  gwname: "",
  index: "",
  Prefix: "c!",
  lazymode: "",
})

bot.command({
  name: "view-lock",
  code: `
  $title[🔒 Channel View-Locked]
  $description[This channel has been View-locked by **$username#$discriminator[$authorID]**. Members without admin permissions will not be able to see this channel.]
  $color[ff0000]
  $modifyChannelPerms[$channelID;-viewchannel;$guildID]
  $onlyBotPerms[manageserver; ❌ <@$authorID> I need the "manage-server" permission to execute this command!]
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  `
})

bot.command({
  name: "view-unlock",
  code: `
  $title[🔓 Channel View-Unlocked]
  $description[This channel has been View-Unlocked by **$username#$discriminator[$authorID]**. All members will be able to see this channel now.]
  $color[ff0000]
  $modifyChannelPerms[$channelID;+viewchannel;$guildID]
  $onlyBotPerms[manageserver; ❌ <@$authorID> I need the "manage-server" permission to execute this command!]
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  `
})

bot.command({
  name: "lock-channel",
  code: `
  $title[🔒 Channel Locked]
  $description[This channel has been locked by **$username#$discriminator[$authorID]**.
  Don't worry, you are not 'muted'. This channel is just **locked** for all members.]
  $color[ff0000]
  $modifyChannelPerms[$channelID;-sendmessages;$guildID]
  $onlyBotPerms[manageserver; ❌ <@$authorID> I need the "manage-server" permission to execute this command!]
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]`
})

bot.command({
  name: "unlock-channel",
  code: `
  $title[🔓 Channel Unlocked]
  $description[This channel has been unlocked by **$username#$discriminator[$authorID]**.]
  $color[ff0000]
  $modifyChannelPerms[$channelID;+sendmessages;$guildID]
  $onlyBotPerms[manageserver; ❌ <@$authorID> I need the "manage-server" permission to execute this command!]
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]`
})

bot.command({
name: "lock-server",
code: `
$forEachGuildChannel[loop1]
$onlyBotPerms[manageserver; ❌ <@$authorID> I need the "manage-server" permission to execute this command!]
$onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]`
})

bot.command({
name: "unlock-server",
code: `
$forEachGuildChannel[loop2]
$onlyBotPerms[manageserver; ❌ <@$authorID> I need the "manage-server" permission to execute this command!]
$onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]`
})
bot.command({
  name: "nick",
  code: `
  ✅ Successfully changed the nickname of <@$mentioned[1]> to: **$message**!
  $changeNickname[$mentioned[1];$noMentionMessage]
  $onlyPerms[managenicknames;❌ <@$authorID> you need the "manage-nicknames" permission to execute this command!]
  $onlyBotPerms[managenicknames; ❌ <@$authorID> I need the "manage-nicknames" permission to execute this command!]
  $suppressErrors[❌ <@$authorID> that user is above me in the permissions list!]`
})

bot.command({
  name: "reset-nick",
  code: `
  ✅ Successfully reset the nickname of <@$mentioned[1]>!
  $changeNickname[$mentioned[1];$username[$mentioned[1]]]
  $onlyPerms[managenicknames;❌ <@$authorID> you need the "manage-nicknames" permission to execute this command!]
  $onlyBotPerms[managenicknames; ❌ <@$authorID> I need the "manage-nicknames" permission to execute this command!]
  $suppressErrors[❌ <@$authorID> that user is above me in the permissions list!]`
})

bot.command({
  name: "giverole",
  code: `
  ✅ Successfully **given** the mentioned role to the mentioned user!
  $giveRole[$mentioned[1];$mentionedRoles[1]]
  $onlyBotPerms[manageroles; ❌ <@$authorID> I need the "manage-roles" permission to execute this command!]
  $onlyPerms[manageroles; <@$authorID> sorry, you cannot use this command!]`
})

bot.command({
  name: "takerole",
  code: `
  ✅ Successfully **taken** the mentioned role from the mentioned user!
  $takeRole[$mentioned[1];$mentionedRoles[1]]
  $onlyBotPerms[manageroles; ❌ <@$authorID> I need the "manage-roles" permission to execute this command!]
  $onlyPerms[manageroles; <@$authorID> sorry, you cannot use this command!]`
})

bot.command({
  name: "audit-logs",
  code: `
  $title[Latest Audit-Logs of $serverName[$guildID]]
  $description[$getAuditLogs]
  $footer[Requested by: $username#$discriminator[$authorID]]
  $color[RANDOM]
  $addTimestamp
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]`
})

bot.command({
  name: "$alwaysExecute",
  code: `
  $channelSendMessage[$getServerVar[logschannel]; {title: A User Was Swearing! [BETA]} {description:
**User Who was Swearing: ** $username#$discriminator[$authorID]
**Message: ** $message
**Channel: ** <#$channelID>} {thumbnail: $userAvatar[$authorID]}{color:FF0000}]
  $deletecommand
  <@$authorID> watch your language!
  $onlyIf[$checkContains[$toLowercase[$message];fuck;nigga;shit;fucker;fuuckk;fucking;shitty;shit;stfup;pussy;nigga;dickhead;asshole;bitch;bitchee;fleching;hentai;hentaiii;hentqii;niggar;negro;bullshit;hell;gay]==true;]
  $onlyif[$hasperms[$authorid;managemessages]==false;]
  $onlyif[$getservervar[antiswear]==true;]`
})
bot.command({
  name: "enable-antispam",
  code: `
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $if[$getServerVar[antispam]==true;]
  <@$authorID> anti-spam is **__already enabled__** in this server!
  $else
  $setserverVar[antispam;true]
  ✅ Successfully **__enabled anti-spam__** in this server!
  $endif`
})

bot.command({
  name: "disable-antispam",
  code: `
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $if[$getServerVar[antispam]==false;]
  <@$authorID> anti-spam is **__already disabled__** in this server!
  $else
  $setserverVar[antispam;false]
  ✅ Successfully **__disabled anti-spam__** in this server!
  $endif`
})

bot.command({
  name: "enable-antilink",
  code: `
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $if[$getServerVar[sendlinks]==true;]
  <@$authorID> anti-link is **__already enabled__** in this server!
  $else
  $setserverVar[sendlinks;true]
  ✅ Successfully **__enabled anti-links__** in this server!
  $endif`
})

bot.command({
  name: "disable-antilink",
  code: `
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $if[$getServerVar[sendlinks]==false;]
  <@$authorID> anti-link is **__already disabled__** in this server!
  $else
  $setserverVar[sendlinks;false]
  ✅ Successfully **__disabled anti-links__** in this server!
  $endif`
})

bot.command({
  name: "enable-caps",
  code: `
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $if[$getServerVar[caps]==true;]
  <@$authorID> mass-caps detection is **__already enabled__** in this server!
  $else
  $setServerVar[caps;true]
  ✅ Successfully **__enabled mass-caps detection__** in this server!
  $endif`
})

bot.command({
  name: "disable-caps",
  code: `
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $if[$getServerVar[caps]==false;]
  <@$authorID> mass-caps detection is **__already disabled__** in this server!
  $else
  $setServerVar[caps;false]
  ✅ Successfully **__disabled mass-caps detection__** in this server!
  $endif`
})

bot.command({
  name: "enable-antiswear",
  code: `
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $if[$getServerVar[antiswear]==true;]
  <@$authorID> anti-swear BETA is **__already enabled__** in this server!
  $else
  $setServerVar[antiswear;true]
  ✅ Successfully **__enabled anti-swear BETA__** in this server! Keep in mind this is in BETA VERSION! ALL swear word messages *may* not be deleted.
  $endif`
})

bot.command({
  name: "disable-antiswear",
  code: `
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $if[$getServerVar[antiswear]==false;]
  <@$authorID> anti-swear BETA is **__already disabled__** in this server!
  $else
  $setServerVar[antiswear;false]
  ✅ Successfully **__disabled anti-swear BETA__** in this server! 
  $endif`
})

bot.command({
  name: "enable-mm-detection",
  code: `
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $if[$getServerVar[massmention]==true;]
  <@$authorID> mass-mention-detection is **__already enabled__** in this server!
  $else
  $setServerVar[massmention;true]
  ✅ Successfully **__enabled mass-mention detection__** in this server!
  $endif`
})

bot.command({
  name: "disable-mm-detection",
  code: `
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $if[$getServerVar[massmention]==false;]
  <@$authorID> mass-mention-detection is **__already enabled__** in this server!
  $else
  $setServerVar[massmention;false]
  ✅ Successfully **__disabled mass-mention detection__** in this server!
  $endif`
})

bot.command({
  name: "$alwaysExecute",
  code: `
  $channelSendMessage[$getServerVar[logschannel]; {title: A User was Sending Links} {description:
  **User Who Sent Link: ** $username#$discriminator[$authorID]
  **Message: ** $message
  **Channel: ** <#$channelID>} {thumbnail: $userAvatar[$authorID]}{color:FF0000}]
  $deletecommand
  <@$authorID> please refrain from sending links!
  $onlyIf[$checkContains[$toLowercase[$message];https://;discord.gg;https;http;gg;//;www.]==true;]
  $onlyif[$hasperms[$authorid;managemessages]==false;]
  $onlyif[$getservervar[sendlinks]==true;]`
})

bot.botJoinCommand({
  channel: "$randomChannelID",
  code: `
$title[👋 Hello!]
$description[Thank you for inviting me to your server! To view the list of my commands, type $getVar[ok]f!help$getVar[ok]

**What do I do and what is my use?**
Hi, I'm Fyron, an **auto-mod** & **game bot!** 
I can **detect ghost-pings**. I also have anti-link, anti-spam, mass-mention & caps detection. You can also **watch youtube videos** with your friends (YouTube Together), **play games** (chess, poker, fishing etc) using me! There are many more commands that you can check out too! Just type: $getVar[ok]f!help $getvar[ok] ^^]
$footer[❗ f!help for the list of my features! ❗]
$color[RANDOM]
$addTimestamp
`
})

bot.command({
  name: "$alwaysExecute",
  code: `
$channelSendMessage[$getServerVar[logschannel]; {title: Mass-Caps Detection!} {description:
**User Who Sent The Message: ** $username#$discriminator[$authorID]
**Message: ** $message
**Channel: ** <#$channelID>} {thumbnail: $userAvatar[$authorID]}{color:FF0000}]
$deletecommand
$sendmessage[<@$authorid>, please do not use too many caps!;no]
$onlyif[$sub[$charcount[$message];$charcount[$get[e]]]>=$divide[$multi[$charcount[$message];3];4];]
$let[e;$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$replacetext[$noescapingmessage;A;];B;];C;];D;];E;];F;];G;];H;];I;];J;];K;];L;];M;];N;];O;];P;];Q;];R;];S;];T;];U;];V;];W;];X;];Y;];Z;]]
$onlyif[$suppresserrors$charcount[$message]$suppresserrors>=10;]
$onlyif[$hasperms[$authorid;managemessages]==false;]
$onlyIf[$getServerVar[caps]==true;]
$suppresserrors`})


bot.command({
  name: "$alwaysExecute",
  code: `
  $channelSendMessage[$getServerVar[logschannel]; {title: Mass-Mention Detection!} {description:
  **User Who was Mass-Mentioning: ** $username#$discriminator[$authorID]
  **Message: ** $message
  **Channel: ** <#$channelID>
  **Number of Users Mentioned in the message:** $mentionedUsersCount
  **Message Link: ** $messageURL} {thumbnail: $userAvatar[$authorID]} {color:FF0000}]
<@$authorID>, please refrain from **mass-mentioning.** The max number of members you can mention in in a message in this server is **$getServerVar[max_mention]!**
$onlyif[$mentioned[$getServerVar[max_mention]]!=]
$onlyif[$hasperms[$authorid;managemessages]==false;]
$onlyif[$getservervar[massmention]==true;]`})



bot.command({
  name: "set-mm",
  code: `
  $setServerVar[max_mention; $message[1]]
  Successfully set the max-mention count to **$message[1]**!
**__What does this command do?__** <@$authorID> Right now, you have set the max-mention count to **$message[1]**, which means that if anyone, except administrators in this server, ping **$message[1]** or more different people in their message, they will get a warn-message.
  $onlyIf[$message[1]!=0; <@$authorID>, ❌ the max mention cannot be zero! **It must be above 2.**]
  $onlyIf[$message[1]!=1; <@$authorID>, ❌ the max mention cannot be one! **It must be above 2.**]
  $onlyIf[$message[1]!=2; <@$authorID>, ❌ the max mention cannot be two! **It must be above 2.**]
  $onlyIf[$message[1]!=; <@$authorID> Please specify the max mention number!]
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $onlyIf[$isnumber[$message]==true;]`
})

bot.command({
  name: "weather",
  code: `$title[Weather of $message]
$image[https://wttr.in/$message.png?m&size=4096]
$footer[Requested $username#$discriminator[$authorID]]
$addTimestamp
$onlyIf[$message!=; Next time, type the name of the city too!]
$suppresserrors[❌ City not found!]
$color[RANDOM]`
})

bot.command({
  name: "dog",
  code: `
  $title[Doggy! 🐶]
  $image[https://dankrpg.xyz/api/dogs/$random[1;200].jpg]
  $footer[Woof Woof!]
  $color[RANDOM]
  $botTyping`
})

bot.command({
  name: "membercount",
  code: `
  $title[Member Count of $serverName[$guildID]!]
  $description[
  **All Members: ** $membersCount

  **Number of Humans: ** $membersCount[$guildID;all;no]

  **Number of Bots: ** $botCount
  ]
  $addTimestamp
  $footer[Cool!]
  $color[RANDOM]
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]`
})

bot.command({
  name: "enable-lazymode",
  code: `
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $if[$getServerVar[lazymode]==true;]
  <@$authorID> lazy-mode is **__already enabled__** in this server!
  $else
  $setserverVar[lazymode;true]
  ✅ Successfully **__enabled lazy-mode__** in this server! **WARNING:** This will make me VERY lazy... *deeply exhales*.
  $endif`
})

bot.command({
  name: "disable-lazymode",
  code: `
  $onlyPerms[manageserver; <@$authorID> sorry, you cannot use this command!]
  $if[$getServerVar[lazymode]==false;]
  <@$authorID> lazy-mode is **__already disabled__** in this server!
  $else
  $setserverVar[lazymode;false]
  ✅ Successfully **__disabled lazy-mode__** in this server!
  $endif`
})

bot.command({
  name: "cat",
  code: `
  $title[Kitty Cat! 🐱]
  $image[https://cataas.com/cat?$random[1;99999999]]
  $footer[Meow!]
  $color[RANDOM]
  $botTyping`
})

bot.variables({
embedColor: "000000"
})

bot.deletedCommand({
channel: "$getServerVar[logschannel]",
code: `
$title[Message Deleted]
$description[
**Message Author:** $username#$discriminator[$authorID]
**Channel:** <#$channelUsed>
**Message Deleted:** $message]
$thumbnail[$userAvatar[$authorID]]
$color[FF0000]
$onlyForServers[$guildID;]
`
})

bot.command({
 name: "enable-suggest",
 code: ` 
$setServerVar[suggest_system;true]
Enabled! 
$onlyPerms[manageserver;You need manage server permissions]`
 })

 bot.command({
 name: "disable-suggest",
 code: `
$setServerVar[suggest_system;no]
Disabled!
$onlyPerms[manageserver;You need manage server permissions]`
 })

bot.command({
name: "wiki",
code:`
$title[**New Wiki!**]
$description[$message]
$color[00fffff]
$footer[By: $username#$discriminator[$authorID]]
$argsCheck[>1;Usage: $getServerVar[prefx]addwiki <entry>]
$onlyIf[$charCount[$message]<2049;❌ Max. 2048 character]
$channelSendMessage[$channelID;wiki sent.]
$cooldown[30s;❌ Please wait %time% before using this command again]
$onlyIf[$getServerVar[wikichannel]!=;This server has no wiki channel run **<setwikichannel** to set one!]
$onlyIf[$getServerVar[wiki_system]==true;wiki system is not enabled!]

 $useChannel[$getServerVar[wikichannel]]`
 
})

bot.variables({
wikichannel: "",
wiki_system: "no"
})

bot.command({
name: "set-wiki",
aliases: ['set-wiki-channel'],
code:`
$setServerVar[wikichannel;$mentionedChannels[1]] 
Set wiki channel to <#$mentionedChannels[1]> 
$argsCheck[>1;Please mention a channel] 
$onlyPerms[manageserver;You need manage server permission]
$onlyIf[$getServerVar[wiki_system]==true;wiki system is not enabled!]`
})

bot.command({
name: "disable-wiki",
code: `
$setServerVar[wiki_system;no]
Disabled!
$onlyPerms[manageserver;You need manage server permissions]`
})


bot.command({
name: "enable-wiki",
code:  `
$setServerVar[wiki_system;true]
Enabled! 
$onlyPerms[manageserver;You need manage server permissions]`
})

bot.variables({
prefix: "c!",
symbol: ""
})

bot.command({
name: 'Slowmode',
usage: 'slowmode <time>',
 description: 'changes the slowmode of current channel',
 category: 'Moderator',
    code: `$slowmode[$channelID;$message]
 $title[Successfully Updated Slowmode!]
 $description[Successfully Updated Slow Mode Of<#$channelID>! $message]
 $footer[]
 $color[GREEN]
 $suppressErrors[:x: Failed To Update Slowmode!]
 $onlyPerms[manageserver; :X: You Need To Be An MANAGE_SERVER]`
})

bot.command({
 name: "covid",
 code: `$title[Covid-19 Global Stats]
 $description[**Cases**
$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/all;cases]] Cases
**Deaths**
$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/all;deaths]] Deaths
**Today Cases**
$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/all;todayCases]] Today Cases
**Recovered**
$numberSeparator[$jsonRequest[https://corona.lmao.ninja/v3/covid-19/all;recovered]] Recovered]
$thumbnail[https://dshs.texas.gov/uploadedImages/Content/Consumer_and_External_Affairs/coronavirus/banner.png]
$footer[Pandemic Statistics.]
$color[RANDOM]`
});

bot.command({
	name: 'mmode-on',
	code: `
$forEachGuildChannel[lockall]
 
$color[#303136]
 
$description[<:icons_bookmark:885580765113503764> Successfully switched on the maintenance mode.]
 
$onlyPerms[admin;<:icons_outage:885952169277280266> You are missing \`MANAGE_SERVER\` perms]
 
$onlyBotPerms[admin;embedlinks;externalemojis;<:icons_outage:885952169277280266> Missing Perms \`embedLinks,admin\`]
 
$suppressErrors[{description:An error occurred, run  \`report\` if this happen again...}{color:ff0000}]`
 
});
 
bot.awaitedCommand({
	name: 'lockall',
	code: `
 
$modifyChannelPerms[$channelID;-viewchannel;$guildID]
 
$suppressErrors`
});
 
bot.command({
	name: 'mmode-on',
	code: ` $wait[6s] $createChannel[General;text]
$onlyPerms[admin;]
$onlyBotPerms[admin;embedlinks;externalemojis;]`
});
 
bot.command({
	name: 'mmode-off',
	code: `
$forEachGuildChannel[unlockall]
 
$color[#303136]
 
$description[<:icons_bookmark:885580765113503764> Successfully switched off the maintenance mode]
 
$onlyPerms[manageserver;{description:**You are missing \`MANAGE_SERVER\` perm!**}{color:ff0000}{delete:60s}]
 
$onlyBotPerms[admin;embedlinks;<:icons_outage:885952169277280266> Missing Perms \`embedLinks,admin\`]
 
$suppressErrors[{description:An error occurred, run  \`report\` if this happen again...}{color:ff0000}]`
});
 
bot.awaitedCommand({
	name: 'unlockall',
	code: `
 
$modifyChannelPerms[$channelID;+viewchannel;$guildID]
 
$suppressErrors`
});

bot.command({
 name: "gstart",
 aliases: ["gcreate"],
 usage: "giveaway <time> <prize>",
 description: "make some awesome giveaway to your members!",
 code: `
$setServerVar[timega;0]
$setServerVar[gaid;]
$wait[3m]
$setServerVar[pene;]
$editMessage[$getServerVar[pene];{title:Giveaway Finished 📃}{description:Prize: \`$sliceMessage[1]\` 📃
Hosted By: **$userTag[$authorID]**
Winner: $replaceText[$replaceText[$checkCondition[$getTextSplitLength==1];true;Invalid participate. Must be at least 2 participate];false;<@$randomText[$joinSplitText[;]]>.]}{color:RANDOM}{footer:© discord.io/snowshark:$userAvatar[$clientID]}]
$channelSendMessage[$channelID;$replaceText[$replaceText[$checkCondition[$getTextSplitLength==1];true;Nothing participate, canceling giveaway 📃.];false;Winner from giveaway is <@$randomText[$joinSplitText[;]]>, Prize: ****$sliceMessage[1]****!

Jump to message:
https://discord.com/channels/$guildID/$channelID/$getServerVar[pene]]]
$textSplit[$replaceText[$getReactions[$channelID;$getServerVar[pene];📃;id];$clientID,;];,]
$setServerVar[timega;1]

$wait[$message[1]] 
$setServerVar[gaid;$sliceMessage[1]]
$setServerVar[pene;$splitText[1]]
$textSplit[$sendMessage[{title:React with 📃 to participate!.}{description:Prize: \`$sliceMessage[1]\`
Hosted By: **$userTag[$authorID]**
Time: **$message[1]**}{timestamp}{color:RED}{reactions:📃}{footer:© discord.io/snowshark};yes]; ]
$onlyIf[$sliceMessage[1]!=;{description:Invalid arguments, use this:
\`\`\`
- $getServerVar[prefix]giveaway <time> <prize>.\`\`\`
Symbol \`<>\` are required
}{color:RED}]
$onlyIf[$replaceText[$message[1];s;]>=30;{description:Invalid time limits! giveaway must be more long than 30}{color:RED}]
$onlyIf[$isNumber[$replaceText[$replaceText[$replaceText[$replaceText[$message[1];s;];m;];h;];d;]]!=false;{description:Invalid time. Use this variables:
\`\`\`
1s Is 1 second 
1m Is 1 minute
1h Is 1 hour
1d Is 1 day
\`\`\`\nExample: \`$getServerVar[prefix] <time> <prize>\`\nSymbol \`<>\` are required}{color:RED}{thumbnail:$userAvatar[$clientID]}]
$onlyIf[$getServerVar[gaid]==;{description:Some giveaways has been added}{color:RED}]
$onlyBotPerms[manageemojis;managemessages;mentioneveryone;{description:I dont have permission \`MANAGE_EMOJIS\`/\`MANAGE_MESSAGES\`/\`MENTION_EVERYONE\`}{color:RED}]
$onlyPerms[admin;{description:You need \`admin\` permission}{color:RED}]
`
}) 

bot.command({
 name: "greroll",
  description: "reroll the new winner from giveaway",
 code: `
$addCmdReactions[$replaceText[$replaceText[$checkCondition[$getTextSplitLength==1];true;❌];false;✅]]
$channelSendMessage[$channelID;$replaceText[$replaceText[$checkCondition[$getTextSplitLength==1];true;There's no player join the giveaway];false;New Winner: <@$randomText[$joinSplitText[;]]>, Prize: ****$getServerVar[gaid]****!
Jump to message:
https://discord.com/$guildID/$channelID/$message[1]]]
$textSplit[$replaceText[$getReactions[$channelID;$message[1];📃;id];$clientID,;];,]
$onlyIf[$checkContains[$getReactions[$channelID;$message[1];📃;id];$clientID]==true;{description:No giveaway there}{color:RED}{footer:© discord.io/snowshark}]
$onlyIf[$getServerVar[pene]==;{description:Giveaway still running}{color:RED}{footer:© discord.io/snowshark}]
$onlyIf[$message[1]!=;{description:Invalid message ID}{color:RED}{reactions:❌}{footer:© discord.io/snowshark}]
$onlyIf[$getServerVar[timega]>=1;{description:Nothing giveaway ended.}{color:RED}{footer:© discord.io/snowshark}]
$onlyIf[$getServerVar[gaid]!=;{description:No giveaway in this server}{color:RED}{footer:© discord.io/snowshark}]
$onlyBotPerms[manageemojis;managemessages;mentioneveryone;{description:I dont have permission \`MANAGE_EMOJIS\`/\`MANAGE_MESSAGES\`/\`MENTION_EVERYONE\`}{color:RED}]
$onlyPerms[admin;{description:You need \`admin\` permission}{footer:© discord.io/snowshark}{color:RED}]`
});

bot.variables({
 pene: "",
 timega: "",
 gaid: "",
}) 

bot.command({
 name: "setrank",
 usage: "setrank (channel)",
 description: "settings the levelup channel",
 code: `$description[Rank channel has been set up to <#$mentionedChannels[1;yes]>]
$color[01ff00]
$setServerVar[rch;$mentionedChannels[1;yes]]
$setServerVar[rsystem;1]
$onlyBotPerms[mentioneveryone;{description:I dont have permission \`MENTION_EVERYONE\`}{color:ff2050}]
$onlyPerms[manageserver;{description:You need \`MANAGE_SERVER\` permission}{color:ff2050}]
$cooldown[5s;Please wait **%time%**]`
})

bot.command({
 name: "resetrank",
 usage: "resetrank",
 description: "reset the levelup channel",
 code: `$description[Rank channel has been set up to <#$mentionedChannels[1;yes]>]
$color[01ff00]
$setServerVar[rch;]
$setServerVar[rmsg;$getVar[rmsg]]
$setServerVar[rsystem;0]
$onlyIf[$getServerVar[rsystem]>=1;{description:Leveling system is __disabled__ on this server}{color:ff2050}]
$onlyBotPerms[mentioneveryone;{description:I dont have permission \`MENTION_EVERYONE\`}{color:ff2050}]
$onlyPerms[manageserver;{description:You need \`MANAGE_SERVER\` permission}{color:ff2050}]
$cooldown[5s;Please wait **%time%**]`
})

bot.command({
 name: "$alwaysExecute",
 code: `$useChannel[$getServerVar[rch]]
$replaceText[$replaceText[$replaceText[$replaceText[$getServerVar[rmsg];{user.tag};$userTag];{user.mention};<@$authorID>];{level};$getUserVar[lvl]];{exp};$getUserVar[exp]]
$setUserVar[lvl;$sum[$getUserVar[lvl];1]]
$setUserVar[rexp;$multi[$getUserVar[rexp];2]]
$onlyIf[$getUserVar[exp]>=$getUserVar[rexp];]
$onlyForServers[$guildID;]` 
})

bot.awaitedCommand({
 name: "errorrank",
 code: `$setServerVar[rch;]
$onlyForServers[$guildID;]`
})

bot.command({
 name: "$alwaysExecute",
 code: `$setUserVar[exp;$sum[$getUserVar[exp];$random[1;4]]]
$onlyIf[$getServerVar[rsystem]>=1;]
$onlyForServers[$guildID;]`
})

bot.command({
 name: "setrankmsg",
 usage: "setrankmsg <message>",
 description: "message for the leveled up",
 code: `$description[You have been setted the message to:
\`$message\`]
$color[01ff00]
$setServerVar[rmsg;$message]
$onlyIf[$message!=;You can also use this variables:
\`\`\`
{user.tag} = $userTag
{user.mention} = <@$authorID>
{level} = 1
{exp} = 25
\`\`\`
Current msg is:
\`$getServerVar[rmsg]\`]
$onlyBotPerms[mentioneveryone;managemessages;{description:I need permission \`MANAGE_MESSAGES\`/\`MENTION_EVERYONE\`}{color:ff2050}]
$onlyPerms[manageserver;{description:You need \`MANAGE_SERVER\` permission}{color:ff2050}]
$cooldown[5s;Please wait **%time%**]`
})

bot.command({
 name: "rank",
 aliases: ["level"],
 usage: "rank (user)",
 description: "see the current level and exp",
 code: `$image[https://vacefron.nl/api/rankcard?username=$replaceText[$username[$mentioned[1;yes]]; ;+;-1]&avatar=$userAvatar[$mentioned[1;yes]]?size=4096&level=$getUserVar[lvl;$mentioned[1;yes]]&rank=&currentxp=$getUserVar[exp;$mentioned[1;yes]]&nextlevelxp=$getUserVar[rexp;$mentioned[1;yes]]&previouslevelxp=0&custombg=https://cdn.discordapp.com/attachments/793071150614970388/794565647760752650/20210101_205624.jpg&xpcolor=ffffff&isboosting=true]
$onlyIf[$getServerVar[rsystem]>=1;{description:Leveling system is __disabled__}{color:ff2050}]
$cooldown[5s;]`
})

bot.variables({
 rch: "",
 rmsg: "Congrats {user.tag}🎉, you leveled up to level {level}",
 lvl: "0",
 exp: "0",
 rexp: "40",
 rsystem: "0",
})

bot.command({
 name: "icon",
 aliases: ["servericon", "server-icon", "guildicon"],
 code: `:frame_photo: | **$serverName** Icon
$image[$replaceText[$serverIcon[$guildID;2048];.webp;.png]]
$color[BLUE]`
});

//rPS GAME WITH BOT #2
bot.awaitedCommand({
name: "rock",
code: `
$title[🧠 RPS GAME]
$thumbnail[$userAvatar[$clientID]]
$description[
 $randomText[
**$username[$clientID] ✊ Vs ✊ You**

🟡 │ It's a **TIE**.;
**$username[$clientID] 📄 Vs ✊ You**

🔴 │ You **LOST**.;
**$username[$clientID] ✂ Vs ✊ You**

🟢 │You **WON**]

$randomText[🎉 Well Played !;🎉 Good Game !]
]
$color[$getVar[color]]
$footer[Requested By $username[$authorID];$authorAvatar]
$addTimestamp
`})

bot.awaitedCommand({
name: "paper",
code: `
$title[🧠 RPS GAME]
$thumbnail[$userAvatar[$clientID]]
$description[
 $randomText[
**$username[$clientID] 📄 Vs 📄 You**

🟡 │ It's a **TIE**.;
**$username[$clientID] ✂ Vs 📄 You**

🔴 │ You **LOST**.;
**$username[$clientID] ✊ Vs 📄 You**

🟢 │You **WON**.]

$randomText[🎉 Well Played !;🎉 Good Game !]
]
$color[$getVar[color]]
$footer[Requested By $username[$authorID];$authorAvatar]
$addTimestamp
`})

bot.awaitedCommand({
name: "scissor",
code: `
$title[🧠 RPS GAME]
$thumbnail[$userAvatar[$clientID]]
$description[
 $randomText[
**$username[$clientID] ✂ Vs ✂ You**

🟡 │ It's a **TIE**.;
**$username[$clientID] ✊ Vs ✂ You**

🔴 │ You **LOST**.;
**$username[$clientID] 📄 Vs ✂ You**

🟢 │You **WON**.]

$randomText[🎉 Well Played !;🎉 Good Game !]
]
$color[$getVar[color]]
$footer[Requested By $username[$authorID];$authorAvatar]
$addTimestamp
`}) 
//rPS GAME WITH BOT - #1 
module.exports = ({
name: "rps",
description: "Play rps game with bot",
usage: "rps",
code: `
$awaitReaction[$authorID;15s;
{title:🧠 RPS GAME}
{thumbnail:$userAvatar[$clientID]}
{description:Choose your choice
✊ | **ROCK** 
📄 | **PAPER**
✂ | **SCISSOR**}
{footer:Requested By $userTag[$authorID]:$authorAvatar}
{timestamp}
{color:$getVar[color]}
;✊,📄,✂;rock,paper,scissor;You ran out of time]
`}); 

bot.command({
name: "rob",
code: `
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;750]];$authorID]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$mentioned[1]];$random[0;750]];$mentioned[1]]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[50;75];$authorID]]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$mentioned[1]];$random[50;75]];$mentioned[1]]
$color[RANDOM]
$thumbnail[$userAvatar[$authorID]]
$title[$username robbed $username[$mentioned[1]]]
$description[
$addField[$username;
💵 +$$random[0;750]
🗡 +$random[50;75]xp
Total: $$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;750]] | $sum[$getGlobalUserVar[XP;$authorID];$random[50;75]]xp
]
$addField[$username[$mentioned[1]];
Total: $$sub[$getGlobalUserVar[Wallet;$mentioned[1]];$random[0;750]] | $sub[$getGlobalUserVar[XP;$mentioned[1]];$random[50;75]]xp
]]
$footer[💵 -$$random[0;750] | 🗡 -$random[50;75]xp]
$globalCooldown[15m;You can rob someone again in %time%]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=750;Your wallet needs to contain at least $750 to rob someone.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=75;You need at least 75xp to rob someone.]
$onlyIf[$getGlobalUserVar[XP;$mentioned[1]]>=25;They need at least 25xp]
$onlyIf[$getGlobalUserVar[Wallet;$mentioned[1]]>=750;Their wallet needs to contain at least $750]
$onlyIf[$isBot[$mentioned[1;yes]]!=true;**⛔ You can't rob discord bots**]
$onlyIf[$mentioned[1]!=$authorID;**⛔ You can't rob yourself**]
$onlyIf[$mentioned[1]!=;**⛔ Mention someone to rob**]`
})
 
 
//Steal from someones bank account and XP base
bot.command({
name: "steal",
code: `
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[250;2500]];$authorID]
$setGlobalUserVar[Bank;$sub[$getGlobalUserVar[Bank;$mentioned[1]];$random[250;2500]];$mentioned[1]]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[75;150]];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$mentioned[1]];$random[75;150]];$mentioned[1]]
$color[RANDOM]
$thumbnail[$userAvatar[$authorID]]
$title[$username stole from $username[$mentioned[1]]'s bank]
$description[
$addField[$username;
💵 +$$random[1000;2500]
🗡 +$random[75;150]xp
Total: $$sum[$getGlobalUserVar[Wallet;$authorID];$random[1000;2500]] | $sum[$getGlobalUserVar[XP;$authorID];$random[75;150]]xp
]
$addField[$username[$mentioned[1]];
Total: $$sub[$getGlobalUserVar[Wallet;$mentioned[1]];$random[1000;2500]] | $sub[$getGlobalUserVar[XP;$mentioned[1]];$random[75;150]]xp
]]
$footer[💵 -$$random[1000;2500] | 🗡 -$random[75;150]xp]
$globalCooldown[30m;You can steal from someone's bank account again in %time%]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=1000;You need at least 1,000 XP to steal from someone's bank account]
$onlyIf[$getGlobalUserVar[XP;$mentioned[1]]>=500;They need at least 500 XP to be sapped from!]
$onlyIf[$getGlobalUserVar[Bank;$mentioned[1]]>=7500;Their bank needs to contain at least $7,500 to be stolen from.]
$onlyIf[$isBot[$mentioned[1]]!=true;You can't steal from discord bots]
$onlyIf[$mentioned[1]!=$authorID;You can't rob yourself lol]
$onlyIf[$mentioned[1]!=;Mention someone to steal from thier bank account. Try this: \`$getServerVar[prefix]steal @user\`]`
})
 
bot.command({
name: "search",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[20;60]];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[1;5]];$authorID]
$title[Search]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[$username, $randomText[you looked under the welcome mat.;you went searching thru your mom's purse while she was asleep.;you're hungry so you decided to search thru the dumpster behind the Subway.;you searched your dads truck very thoroughly.;your friends came over and when one of them went to the bathroom, you searched thru his coat pockets.]
]
$footer[💵 +$$random[20;60] | 🗡 +$random[1;5]xp]
$globalCooldown[35s;Looking for a little loose change? You're going to have to try again in %time%]`
})
 
bot.command({
name: "scrap-car",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[11000;16000]];$authorID]
$setGlobalUserVar[car;$sub[$getGlobalUserVar[car;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[260;300]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🚗 Scrapped]
$description[
Nice $username! You scrapped a car for its parts and sold them for a profit!
]
$footer[💵 +$$numberSeparator[$random[11000;16000]] | 🗡 +$random[260;300]xp]
$globalCooldown[2h;Scrap yards only carry so much money! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[car;$authorID]>=1;You need at least 1 \`Car\` in your inventory to scrap]`
})
 
bot.command({
name: "scrap-helicopter",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[22000;29000]];$authorID]
$setGlobalUserVar[helicopter;$sub[$getGlobalUserVar[helicopter;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[360;435]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🚁 Scrapped]
$description[
Nice $username! You scrapped a helicopter for its parts and sold them for a profit!
]
$footer[💵 +$$numberSeparator[$random[22000;29000]] | 🗡 +$random[360;435]xp]
$globalCooldown[2h;Scrap yards only carry so much money! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[helicopter;$authorID]>=1;You need at least 1 \`Helicopter\` in your inventory to scrap]`
})
 
 
bot.command({
name: "scrap-truck",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[16500;22000]];$authorID]
$setGlobalUserVar[truck;$sub[$getGlobalUserVar[truck;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[310;380]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🚚 Scrapped]
$description[
Nice $username! You scrapped a truck for its parts and sold them for a profit!
]
$footer[💵 +$$numberSeparator[$random[16500;22000]] | 🗡 +$random[310;380]xp]
$globalCooldown[2h;Scrap yards only carry so much money! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[truck;$authorID]>=1;You need at least 1 \`Truck\` in your inventory to scrap]`
})
 
bot.command({
name: "flip-house", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[125000;150000]];$authorID]
$setGlobalUserVar[house;$sub[$getGlobalUserVar[house;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[550;650]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🏡 Flipped]
$description[
Nice job $username! You flipped your house and sold it for a profit!
]
$footer[💵 +$$numberSeparator[$random[125000;150000]] | 🗡 +$random[550;650]xp]
$globalCooldown[12h;Real estate investors aren't made of money and they can only buy your assets once every 12 hours! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[house;$authorID]>=1;You need to have bought at least 1 \`House\` to flip]` 
})
 
bot.command({
name: "flip-apartment", 
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[70000;95000]];$authorID]
$setGlobalUserVar[apartment;$sub[$getGlobalUserVar[apartment;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[425;525]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🏫 Flipped]
$description[
Nice job $username! You flipped your apartment and sold it for a profit!
]
$footer[💵 +$$numberSeparator[$random[70000;95000]] | 🗡 +$random[425;525]xp]
$globalCooldown[12h;Real estate investors aren't made of money and they can only buy your assets once every 12 hours! Try again in \`%time%\`]
$onlyIf[$getGlobalUserVar[apartment;$authorID]>=1;You need to have bought at least 1 \`Apartment\` to flip]` 
})
 
bot.command({
name: "fish",
code: `$color[RANDOM]
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[50;100]]]
$title[$username is fishing]
$description[You fished a $randomText[🥿;👠;👡;👢;👞;👟;🥾;🦀;🦑;🐙;🦞;🦐;🐠;🐟;🐡;🐬;🦈;🐳;🐋;🐊;🦢;🦆] and you get $$random[50;100]]
$globalCooldown[15m;**⏳ You can fish again in %time%**]`
})
 
 
bot.command({
name: "lb-bank",
code: `$title[**__🏦 Bank leaderboard__** 
$globalUserLeaderboard[Bank;asc]]
$color[RANDOM]
$footer[You have $$numberSeparator[$getGlobalUserVar[Bank;$authorID]] 💵 in your bank]`
})
 
 
bot.command({
name: "lb-wallet",
code: `$title[**__👛 Wallet leaderboard__**
$globalUserLeaderboard[Wallet;asc]]
$color[RANDOM]
$footer[You have $$numberSeparator[$getGlobalUserVar[Wallet;$authorID]] 💵 in your wallet]`
})
 
 
//Resets user money for all guilds
bot.command({
name: "reset", 
code: `$resetGlobalUserVar[Wallet]
$resetGlobalUserVar[Bank]
$resetGlobalUserVar[XP]
$title[Reset]
$description[Economy has been reset for all guilds]
$footer[Economy Commands]
$color[RANDOM]
$onlyForIDs[882180542517354536;**⛔ You're not the owner of this bot**]` 
})

bot.command({
name: "shop", 
code: `$thumbnail[$authorAvatar]
$title[Economy Shop]
$color[RANDOM]
$description[
$addField[__Items:__;
\`💼\` **$250 | bag**
\`📺\` **$400 | tv**
\`📱\` **$500 | phone**
\`💻\` **$1,000 | laptop**
\`🚗\` **$10,000 | car**
\`🚚\` **$15,000 | truck**
\`🚁\` **$20,000 | helicopter**
\`🏫\` **$50,000 | apartment**
\`🏡\` **$100,000 | house**
\`🏰\` **$500,000 | mansion**
]
$addField[__Purchasable chests:__;
**$250 | lucky**
**$1,000 | spiteful**
\`Lucky\` - **Press your luck. Nobody loses!**
\`Spiteful\` - **Possibility of winning $10,000 but be warned, it could be spiteful! Goodluck!**
]]`
})
 
bot.command({
name: "buy-car", 
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];10000];$authorID]
$setGlobalUserVar[car;$sum[$getGlobalUserVar[car;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];250];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=10000;Need $10,000 in your wallet, try withrawing it first.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=250;You need 250 XP, in which will be deducted after purchase.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🚗 $username]
$description[
Nice! You bought a Car for $10,000!
**250xp has been deducted!**
You can strip it for parts to scrap for more money and XP.
]
$footer[Usage: $getServerVar[prefix]scrap-car]`
})
 
bot.command({
name: "buy-phone",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];500];$authorID]
$setGlobalUserVar[smartphone;$sum[$getGlobalUserVar[smartphone;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>499;Need $500 in your wallet, try withrawing it first]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[📱 $username]
$description[
Nice! You bought a smartphone for $500!
]
$footer[This item is used to commit a heist]`
})
 
bot.command({
name: "buy-tv",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];400];$authorID]
$setGlobalUserVar[tv;$sum[$getGlobalUserVar[tv;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>399;Need $400 in your wallet, try withrawing first]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[📺 $username]
$description[
Nice! You bought a TV for $400!
]
$footer[This item is used to commit a heist]`
})
 
bot.command({
name: "buy-truck",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];15000];$authorID]
$setGlobalUserVar[truck;$sum[$getGlobalUserVar[truck;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];300];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=15000;Need $15,000 in your wallet, try withrawing it first]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=300;You need 300 XP, in which will be deducted after purchase]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🚚 $username]
$description[
Nice! You bought a Truck for $15,000!
**300xp has been deducted!**
You can strip it for parts to scrap for more money and XP.
]
$footer[Usage: $getServerVar[prefix]scrap-truck]`
})
 
bot.command({
name: "buy-laptop",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];1000];$authorID]
$setGlobalUserVar[laptop;$sum[$getGlobalUserVar[laptop;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>999;Need $1,000 in your wallet, try withrawing it first.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[💻 $username]
$description[
Nice! You bought a laptop for $1,000!
]
$footer[This item is used to commit a heist]`
})
 
bot.command({
name: "buy-helicopter",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];20000];$authorID]
$setGlobalUserVar[helicopter;$sum[$getGlobalUserVar[helicopter;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];350];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=20000;Need $20,000 in your wallet, try withrawing it first]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=350;You need 350 XP, in which will be deducted after purchase.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🚁 $username]
$description[
Nice! You bought a Helicopter for $20,000!
**350xp has been deducted!**
You can strip it for parts to scrap for more money and XP.
]
$footer[Usage: $getServerVar[prefix]scrap-helicopter]`
})
 
bot.command({
name: "buy-house",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];100000];$authorID]
$setGlobalUserVar[house;$sum[$getGlobalUserVar[house;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];500];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=100000;Need $100,000 in your wallet, try withrawing it first.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=500;You need 500 XP, in which will be deducted after purchase.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🏡 $username]
$description[
Nice! Stepping up! You bought a House for $100,000!
**500 XP has been deducted!**
Coming up in the world I see! The real estate business is in high demand and you can make a difference! Try flipping the house to make a profit and earn more XP.
]
$footer[Usage: $getServerVar[prefix]flip-house]`
})
 
 
bot.command({
name: "buy-apartment",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];50000];$authorID]
$setGlobalUserVar[apartment;$sum[$getGlobalUserVar[apartment;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];400];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=50000;Need $50,000 in your wallet, try withrawing it first.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=400;You need 400 XP, in which will be deducted after purchase.]
$thumbnail[$authorAvatar]
$color[RANDOM]
$title[🏫 $username]
$description[
Nice! Stepping up! You bought an Apartment for $50,000!
**400xp has been deducted!**
The real estate business is in high demand and you can make a difference! Try flipping the apartment to make a profit and earn more XP.
]
$footer[Usage: $getServerVar[prefix]flip-apartment]`
})
 
bot.command({
name: "buy-mansion",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];500000];$authorID]
$setGlobalUserVar[mansion;$sum[$getGlobalUserVar[mansion;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sub[$getGlobalUserVar[XP;$authorID];750];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>=500000;Need $500,000 in your wallet, try withrawing it first]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=750;You need 750 XP, in which will be deducted after purchase]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[🏰 $username]
$description[
Nice! You bought a Mansion for $500,000!
**750 XP has been deducted!**
Now you're just showing off and living it up lol! Try flipping the mansion to make a profit and earn more XP.
]
$footer[Usage: $getServerVar[prefix]flip-mansion]`
})
 
bot.command({
name: "buy-bag",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];250];$authorID]
$setGlobalUserVar[duffle;$sum[$getGlobalUserVar[duffle;$authorID];1];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[💼 $username]
$description[
Nice! You bought a dufflebag for $250!
]
$footer[This item is used to commit a heist]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>249;Need $250 in your wallet, try withdrawing it first]`
})
 
bot.command({
name: "buy-spiteful",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];1000];$authorID]
$setGlobalUserVar[spiteful;$sum[$getGlobalUserVar[spiteful;$authorID];1];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Spiteful Chest]
$description[You bought a Spiteful chest for $1,000!
**Open it and see what you find!
Just be warned! It could be spiteful, Goodluck!**
]
$footer[Usage: $getServerVar[prefix]open-spiteful]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>999;Need $1,000 in your wallet, try withrawing it first]`
})
 
bot.command({
name: "open-spiteful",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$randomText[1;850;860;900;950;1000;1000;1000;1100;1150;1175;1200;1250;1500;5000;10000]];$authorID]
$setGlobalUserVar[spiteful;$sub[$getGlobalUserVar[spiteful;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[10;20]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Spiteful Chest]
$description[You opened a spiteful Chest!
]
$footer[💵 +$$numberSeparator[$randomText[1;850;860;900;950;1000;1000;1000;1100;1150;1175;1200;1250;1500;5000;10000]] | 🗡 +$random[10;20]xp]
$onlyIf[$getGlobalUserVar[spiteful;$authorID]>=1;You cant open a chest you don't have! Try purchasing one from the shop.]
$globalCooldown[20m;To prevent exploitations, a cooldown is in effect for opening all purchasable chests! Try again in \`%time%\`]`
})
 
bot.command({
name: "buy-lucky",
code: `$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];250];$authorID]
$setGlobalUserVar[lucky;$sum[$getGlobalUserVar[lucky;$authorID];1];$authorID]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>249;Need $250 in your wallet, try withrawing it first.]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Lucky Chest]
$description[You bought a lucky chest for $250!
Open it and press your luck for a chance to get the $5,000 lucky pot! Goodluck!
]
$footer[Usage: $getServerVar[prefix]open-lucky]`
})
 
bot.command({
name: "open-lucky",
code: `
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$randomText[300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;500;1000;5000]];$authorID]
$setGlobalUserVar[lucky;$sub[$getGlobalUserVar[lucky;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[3;7]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Lucky Chest]
$description[You opened a lucky Chest!
]
$footer[💵 +$$numberSeparator[$randomText[300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;300;500;1000;5000]] | 🗡 +$random[3;7]xp]
$onlyIf[$getGlobalUserVar[lucky;$authorID]>=1;You cant open a chest you don't have! Try purchasing one from the shop.]
$globalCooldown[3m;To prevent exploitations, a cooldown is in effect for opening all purchasable chests! Try again in \`%time%\`]`
})
 
 
 
bot.variables({
    XP: "0",
    Bank: "0",
    Wallet: "0",
    psuffix: '0',
    tv: "0",
    duffle: '0',
    bag: "0",
    smartphone: "0",
    laptop: "0",
    car: "0",
    truck: "0",
    helicopter: "0",
    apartment: "0",
    house: "0",
    mansion: "0",
    DailyChest: "0",
    lucky: "0",
    spiteful: "0",
})

bot.command({
name: "daily",
code: `$setGlobalUserVar[DailyChest;$sum[$getGlobalUserVar[DailyChest;$authorID];1];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Daily Chest]
$description[
Congrats $username! You received 1 daily chest!
This action can be done once every 12 hours.
]
$footer[To open use, $getServerVar[prefix]open-daily]
$onlyIf[$getGlobalUserVar[DailyChest;$authorID]<1;**You still have an unopened daily chest in your inventory. Open it for room to receive another chest.** \`$getServerVar[prefix]open-daily\`]
$globalCooldown[12h;**⛔ Please wait %time% before you can claim another daily chest!**]`
})
 
 
bot.command({
name: "open-daily",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];250];$authorID]
$setGlobalUserVar[DailyChest;$sub[$getGlobalUserVar[DailyChest;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];15];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Daily Chest]
$description[$username, you opened your Daily Chest!
]
$footer[💵 +$250 | 🗡 +15xp]
$onlyIf[$getGlobalUserVar[DailyChest;$authorID]==1;**⛔ You dont have a Daily Chest yet! Try using \`$getServerVar[prefix]daily\` to receive your Daily Chest and then run this command to open it**]`
})
 
 
bot.command({
name: "heist",
code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[4800;7600]];$authorID]
$setGlobalUserVar[laptop;$sub[$getGlobalUserVar[laptop;$authorID];1];$authorID]
$setGlobalUserVar[smartphone;$sub[$getGlobalUserVar[smartphone;$authorID];1];$authorID]
$setGlobalUserVar[duffle;$sub[$getGlobalUserVar[duffle;$authorID];1];$authorID]
$setGlobalUserVar[tv;$sub[$getGlobalUserVar[tv;$authorID];1];$authorID]
$setGlobalUserVar[XP;$sum[$getGlobalUserVar[XP;$authorID];$random[20;42]];$authorID]
$color[00ff00]
$thumbnail[$userAvatar[$authorID]]
$title[Heist]
$description[$username, you used a \`Laptop\` to hack the security system in your favor, a rooted \`Smartphone\` to shut down the cameras and used the \`TV\` screen to monitor surveillance while you fill your \`Bag\` with a buttload of cash and then tossed the contraband $randomText[in a lake!;over a bridge!;down a storm drain!;in separate dumpsters around town!;in the bed of a random truck!;on a roof!;in a ditch!]
]
$footer[💵 +$$numberSeparator[$random[4800;7600]] | 🗡 +$random[20;42]]
$onlyIf[$getGlobalUserVar[laptop;$authorID]>=1;Missing laptop. Try working for it and buying one first.]
$onlyIf[$getGlobalUserVar[smartphone;$authorID]>=1;Missing smartphone. Try working for it and buying one first.]
$onlyIf[$getGlobalUserVar[duffle;$authorID]>=1;Missing bag. Try working for it and buying one first.]
$onlyIf[$getGlobalUserVar[tv;$authorID]>=1;Missing TV. Try working for it and buying one first.]
$onlyIf[$getGlobalUserVar[XP;$authorID]>=300;You need at least 300 XP to commit a heist! \`XP will not be deducted and is only needed as a requirement!\`]
$globalCooldown[3h;Wait %time% until you can launch another heist!]`
})

bot.command({
name: "profile",
code: `$onlyIf[$isBot[$mentioned[1;yes]]!=true;**⛔ Discord bots dont have profiles**]
$thumbnail[$userAvatar[$mentioned[1;yes]]]
$title[Economy profile]
$color[RANDOM]
$description[
**__User/ID__**:
<@$mentioned[1;yes]>
$username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]
(\`$mentioned[1;yes]\`)
 
**__Chests__**:
**$getGlobalUserVar[DailyChest;$mentioned[1;yes]]** | Daily
**$getGlobalUserVar[lucky;$mentioned[1;yes]]** | Lucky
**$getGlobalUserVar[spiteful;$mentioned[1;yes]]** | Spiteful
 
**__Flow__**:
\`💵\` **$$numberSeparator[$getGlobalUserVar[Wallet;$mentioned[1;yes]]]**
\`🏦\` **$$numberSeparator[$getGlobalUserVar[Bank;$mentioned[1;yes]]]**
\`📊\` **$$numberSeparator[$sum[$getGlobalUserVar[Wallet;$mentioned[1;yes]];$getGlobalUserVar[Bank;$mentioned[1;yes]]]]**
\`🗡\` **$numberSeparator[$getGlobalUserVar[XP;$mentioned[1;yes]]]**xp
 
**__Assets__**:
\`💼\` ($getGlobalUserVar[duffle;$mentioned[1;yes]]) Bags
\`📺\` ($getGlobalUserVar[tv;$mentioned[1;yes]]) TVs
\`📱\` ($getGlobalUserVar[smartphone;$mentioned[1;yes]]) Smartphones
\`💻\` ($getGlobalUserVar[laptop;$mentioned[1;yes]]) Laptops
\`🚗\` ($getGlobalUserVar[car;$mentioned[1;yes]]) Cars
\`🚚\` ($getGlobalUserVar[truck;$mentioned[1;yes]]) Trucks
\`🚁\` ($getGlobalUserVar[helicopter;$mentioned[1;yes]]) Helicopters
\`🏫\` ($getGlobalUserVar[apartment;$mentioned[1;yes]]) Apartments
\`🏡\` ($getGlobalUserVar[house;$mentioned[1;yes]]) Houses
\`🏰\` ($getGlobalUserVar[mansion;$mentioned[1;yes]]) Mansions
]`
})

bot.command({
name: "add-cmd",
code: `
$setservervar[ccmd;$replacetext[$replacetext[$checkcondition[$getservervar[ccmd]!=];false;$tolowercase[$message[1]]/];true;$getservervar[ccmd]$tolowercase[$message[1]]/]]
$setservervar[cdes;$getservervar[cdes]$messageslice[1;10]/]
Successfully added $replacetext[$replacetext[\`$tolowercase[$message[1]]\`;#right_click#;>];#left_click#;<] to the commands list, type \`$getservervar[prefix]cmd-list\` to see all available commands
$onlyif[$findtextsplitindex[$tolowercase[$message[1]]]==0;{description:Command \`$tolowercase[$message[1]]\` is available in the command list}{color:ff2050}]
$textsplit[$getservervar[ccmd];/]
$onlyif[$checkcontains[$message;#RIGHT#;#LEFT#;#RIGHT_BRACKET#;#LEFT_BRACKET#;/]==false;{description:Please don't use it \`symbol\` for trigger and response}{color:ff2050}]
$argscheck[>2;{description:Correct use \n\`\`\`\n$getservervar[prefix]add-cmd <trigger> <response>\n\`\`\`}{color:ff2050}]
$onlyperms[manageserver;{description:You have no permissions for \`MANAGE_SERVER\`}{color:ff2050}{timestamp}]
`
})


bot.command({
name: "del-cmd",
code: `
$setservervar[ccmd;$replacetext[$getservervar[ccmd];$advancedtextsplit[$getservervar[ccmd];/;$findtextsplitindex[$tolowercase[$message]]]/;]]
$setservervar[cdes;$replacetext[$getservervar[cdes];$advancedtextsplit[$getservervar[cdes];/;$findtextsplitindex[$tolowercase[$message]]]/;]]
Successfully cleared command $replacetext[$replacetext[\`$tolowercase[$message[1]]\`;#right_click#;>];#left_click#;<]
$onlyif[$findtextsplitindex[$tolowercase[$message]]!=0;{description:Command \`$tolowercase[$message]\` not available in the command list}{color:ff2050}]
$textsplit[$getservervar[ccmd];/]
$onlyif[$checkcontains[$message;#RIGHT#;#LEFT#;#RIGHT_BRACKET#;#LEFT_BRACKET#;/]==false;{description:Please don't use it \`symbol\` for trigger and response}{color:ff2050}]
$argscheck[>1;{description:Correct use \n\`\`\`\n$getservervar[prefix]del-cmd <trigger>\n\`\`\`}{color:ff2050}]
$onlyperms[manageserver;{description:You have no permissions for \`MANAGE_SERVER\`}{color:ff2050}{timestamp}]
`
}) 

bot.command({
name: "cmd-list",
code: `
$title[**__Custom Commands__**]
$color[RANDOM]
$thumbnail[$servericon]
$description[\`$replacetext[$replacetext[$replacetext[$getservervar[ccmd];#right_click#;>];#left_click#;<];/;, ]\`]
$addtimestamp
$onlyif[$gettextsplitlength>=2;{description:There are no custom commands on the server \`$servername\`}{color:ff2050}]
$textsplit[$getservervar[ccmd];/] 
`
}) 

bot.command({
name: "$alwaysExecute",
code: `
$advancedtextsplit[$getservervar[cdes];/;$findtextsplitindex[$tolowercase[$message]]]
$onlyif[$findtextsplitindex[$tolowercase[$message]]!=0;]
$onlyif[$isbot[$authorid]==false;]
$textsplit[$getservervar[ccmd];/] 
`
}) 


bot.variables({
ccmd: "",
cdes: "",
})

bot.command ({
 name: "postmeme",
 aliases: ["pm","post"],
 code: `
 $awaitMessages[$authorID;30s;p,s,m;p,s,m;You run out of time picking, jeez]
 $reply[$messageID;
 {description:
 \`m\` ☐ Meme
 \`p\` ☐ Political Joke
 \`s\` ☐ stonk} {color:GOLD}
 ;no]
 $cooldown[1s;{description:A bit too fast there. Wait for **%time%**!}{color:GOLD}]
 `
})

bot.awaitedCommand({
 name:"p",
 code:`
 $title[$username GG! (Political Joke)]
 $description[$randomText[Omg! u got;Noice u got] 💰 $random[0;1000]. Nice joke meme !]
 $setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[0;1000]]]
 `
})

bot.awaitedCommand({
 name:"s",
 code:`
 $title[$username GG! (stonks lol)]
 $description[$randomText[Omg! u got;Noice u got ] 💰 $random[0;1100]. Nice stonks meme u got thare !]
 $setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[0;1000]]]
 `
})

bot.awaitedCommand({
 name:"m",
 code:`
 $title[$username GG! (meme)]
 $description[$randomText[Omg! u got;Noice u got] 💰 $random[0;1050]. Nice meme meme !]
 $setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[0;1000]]]
 `
})

bot.command({
name: "pp",
code: `$title[$message PP Size]
$description[8$randomText[=;==;===;====;=====;======;========]D]
$footer[PP Size Machine]
$color[RANDOM]`})

bot.command({
 name: 'howghost',
 description: 'See how gay you are (100% real)',
 usage: 'howgay (\User\)',
 aliases: ['ghostrate'],
 code: ` $title[gay r8 machine]
$description[$replaceText[$replaceText[$checkCondition[$message==];true;**You** are];false;**$username** is] $random[1;100]% ghost :ghost:]
$color[RANDOM]`
})


bot.command({
name: "fortnite-shop", 
code: `$color[$random[111111;999999]]
$description[Today's fortnite shop]
$image[https://api.nitestats.com/v1/shop/image?footer=%20Get%20free%20APIs%20on%20BDFD%20Codes-APis:%20http://gg.gg/sharecodes&background=00000014.png]
 `})

bot.command({
name: "tableflip",
code: `$color[$random[111111;999999]]
 
$description[<@$authorID> flipped the table!]
$image[https://vacefron.nl/api/tableflip?user=$authorAvatar?size=2048]`})

