const aoijs = require("aoi.js")

const bot = new aoijs.Bot({
token: "ODkwMjA0NDkxODcyMzUwMjQw.YUsZig.U7WXSDrdyXTcQCWSIoG7MEpUAqU",
prefix: "w!"

})

bot.onMessage()
//You can delete it, if already have it//
bot.status({
  text: "ghost the best",
  type: "LISTENING",
  time: 3
})

bot.onMessage() //An event that allows to read/execute commands.

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
    website: 'https://Aoija-testing.ghostwasfound.repl.co',
    title: 'hello they guy',
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
    name: "guess-number",
    code: `$title[Guess The Number Winning Number]
$description[The winning number for GTN is $getservervar[winning_number].]
$onlyPerms[admin;You need to be an Admin to use this.]
$suppressErrors`
});

bot.command({
    name: "gtnstats",
    aliases: ['gtnstatistics'],
    code: `$title[Guess The Number Stats]
$description[GTN commands: disableGtn, gtnstats, gtn]
$addField[GTN Status;$getservervar[gtnstatus];yes]
$addField[GTN Channel;<#$getservervar[guess_the_number_channel]>;yes]
$addField[Wins;$getglobaluservar[gtnwins;$findmember[$message]];yes]
$addField[Total Attempts/Wins;$getglobaluservar[gtnattempts;$findmember[$message]];yes]
$thumbnail[$useravatar[$findmember[$message]]]
$suppressErrors`
});

bot.command({
    name: "guessthenumber",
    aliases: ['gtn'],
    code: `$setservervar[winning_number;$random[$message[1];$message[2]]]
$setservervar[guess_the_number_channel;$channelid]
$setservervar[gtn;true]
$setservervar[n1;$message[1]]
$setservervar[n2;$message[2]]
$setservervar[gtnstatus;There is an ongoing game of GTN in <#$channelID>]
$author[Guess the number!;$servericon]
$title[Alrighty!]
$description[I have got the number in mind. I have DMed you the number.]
$color[BLUE]
$channelSendMessage[$channelID;Guess the number has started! The number is from __$message[1] to $message[2]__. Good luck everybody!]
$sendDM[$authorID;The number for Guess The Number is $random[$message[1];$message[2]].
__Why are you getting this DM?__
You started a Guess The Number event in your server $servername.]
$onlyif[$isuserdmenabled==true;Your DMs are disabled. but the number is $random[$message[1];$message[2]]. Keep that number somewhere safe! {delete:5s}]
$onlyif[$message[1]<$message[2];You have provided the wrong input, please make sure the first number is the min number and the second the max number.]
$onlyif[$message[2]>=5;The max number has to be at least 5!]
$onlyif[$checkcontains[$message;q;w;e;r;t;y;u;i;o;p;a;s;d;f;g;h;j;k;lz;x;c;v;b;n;m]==false;You only need to use numbers as input.]
$argscheck[>2;Please provide a min number and a max number]
$onlyperms[managechannels;you don't have the managechannels permission]
$suppressErrors`
});

bot.command({
    name: "$alwaysExecute",
    code: `$setservervar[winning_number;Ended. start again with the gtn command.]
$setglobaluserVar[gtnwins;$sum[$getglobaluserVar[gtnwins];1]]
$setservervar[gtntries;0]
$setservervar[gtnstatus;Unfortunately, the last GTN round has ended.]
$setservervar[gtn;false]
$title[$randomText[Winner winner, chicken dinner.;Well well well.;We have a winner!;Congratulations!;You have won the GTN Event.;Woah, great job!;We're proud of you;Guess The Number has ended.;GTN;Woop woop.]]
$description[Looks like we have a winner..]
$addField[Correct Number;$getservervar[winning_number];yes]
$addField[Winner;$usertag;yes]
$addField[Tries;$getServerVar[gtntries];yes]
$color[BLUE]
$thumbnail[$authoravatar]
$footer[Guess The Number! +1 gtn wins added. Check stats with the gtnStats command!]
$onlyif[$message[1]==$getservervar[winning_number];Wrong number $usertag, it's not $message]
$setServerVar[gtntries;$sum[$getServerVar[gtntries];1]]
$setglobaluserVar[gtnattempts;$sum[$getglobaluserVar[gtnattempts];1]]
$onlyif[$message[1]>=$getservervar[n1];The number is a random number from $getservervar[n1] to $getservervar[n2]. You provided a number smaller than $getservervar[n1].]
$onlyif[$message[1]<=$getservervar[n2];The number is a random number from $getservervar[n1] to $getservervar[n2]. You provided a number bigger than $getservervar[n2].]
$onlyif[$getservervar[winning_number]!=Ended. start again with the gtn command.;Looks like the last gtn has ended, you will have to get a staff to re-set it up.]
$onlyif[$isNumber[$message]==true;Please only enter a number. This is a Guess The Number Channel.]
$onlyif[$channelid==$getservervar[guess_the_number_channel];]
$onlyIf[$getservervar[gtn]==true;]
$suppressErrors`
});


bot.command({
    name: "disable-guessthenumber",
    code: `Disabled.
$setservervar[gtntries;0]
$setservervar[guess_the_number_channel;Not set]
$setservervar[winning_number;0]
$suppressErrors
$onlyperms[managechannels;No thanks, you don't have the managechannels permission]`
})

bot.command({
name:'avatar',
code:`$replaceText[$replaceText[$get[image];2048;4096];webp;png]
$let[image;$userAvatar[$findMember[$message[1];yes]]]
$onlyBotPerms[attachfiles;**Missing Bot Permission**: **Attach Files**]
`
})

bot.command({
name:"cat",
code:`$title[Cat]
$description[$jsonRequest[https://api.itshappy.ga/cat/fact]]
$image[$jsonRequest[https://api.itshappy.ga/cat/img]]
$color[RANDOM]`

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
prefix: "w!",
Wallet: "0",
Bank: "0", 
XP: "0",
warn: "0",
mute: "0",
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
name:"akinator",
aliases:"aki",
code:`
$djsEval[
const akinator = require('discord.js-akinator')
akinator(message, client, "en");
]
`
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
    suggestion: "This user has no suggestions",
    response: "No response yet!"
  })

  bot.command({
name: "suggest",
code: `$description[Hello there **$username**, Your suggestion has been sent to the developers. Please read the following:

Your suggestion code: $splitText[1]
$textSplit[$randomString[$random[1;8]]; ]

To follow up on your suggestions approval/denial use \`$getServerVar[prefix]coming soon! :3\` If it returns "No response yet!" Then your suggestion has still not been reviewed.]
$sendDM[$botOwnerID;Suggestion: $message
Request code: $randomString[$random[1;8]]
Suggestion by: $authorID]
$setGlobalUserVar[suggestion;$splitText[1]]
 $textSplit[$randomString[$random[1;8]]; ]
`
})

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
  name: "slowmode",
  aliases: "sm",
  code: `$author[$userTag[$authorID];$authorAvatar]
  $title[successfully changed the slowmode duration to $replaceText[$replaceText[$replaceText[$toUppercase[$message[1]];S; Seconds];M; Minutes];H; Hours]]
  $addTimestamp
  $color[RANDOM]
  $slowmode[$replaceText[$replaceText[$checkCondition[$message[2]==];true;$channelID];false;$findChannel[$message[2]]];$message[1]]
  $onlyIf[$checkContains[$message[1];-]==false;you can't put negative numbers bruh]
  $argsCheck[>1;❌ incorrect usage
 
✅ correct usage: =slowmode <time(example: 5m)> <(optional)#channel/ID>]
  $onlyPerms[managechannels;you need \`Manage channels\` permission]
  $onlyBotPerms[managechannels;I need \`Manage channels\` permission]
  $suppressErrors[channel not found]`
})

bot.command({
  name: "tempban",
  code: `$channelsendmessage[$channelID;{author:$userTag[$findUser[$message[1]]] has been temporary banned}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$sendDM[$findUser[$message[1]];{author:you has been temporarily banned}{title:Moderator: $userTag[$authorID]}{description:**Reason: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[2]]
Time: $replaceText[$replaceText[$replaceText[$replaceText[$toUppercase[$message[2]];S; Seconds];M; Minutes];H; Hours];D; Days]**}{timestamp:ms}{color:$getRoleColor[$getServerVar[mute]]}]
$ban[$findUser[$message[1];no];$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]]
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
$footer[#$channelName[$getChannelVar[snipe_channel;$mentionedChannels[1;yes]]] | $getChannelVar[snipe_date;$mentionedChannels[1;yes]]]

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
name:"eval",
code:`$eval[$message;yes;yes;no;yes;yes]
$onlyif[$message!=;Something to eval needs to be entered]
$onlyforids[882180542517354536;no]`
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

