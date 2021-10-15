module.exports = ({
 name: "addbot",
 code: `
 $reactionCollector[$splitText[1];everyone;2000m;✅,⛔;accept,decline;yes]
$textSplit[$sendMessage[{title: addbot} {description: $userTag wants to add a bot called $userTag[$findUser[$message[1]]] you can invite it by clicking [here\\](https://discord.com/oauth2/authorize?client_id=$getMessageVar[clientid;$messageID]&scope=bot&permissions=0&guild_id=$guildID)} {color:RANDOM}
{field: Bot id: $message[1]:yes} {field:Prefix:$message[2]:yes} {field: user id: $authorID:yes} {footer: WARNING! do not delete users message if it is the whole procces is cancelled!};yes]; ]
$setMessageVar[userid;$authorID;$messageID]
$setMessageVar[clinetid;$message[1];$messageID]
$setMessageVar[prefixadd;$message[2];$messageID] 
$argsCheck[>2; :x: Make sure it has the id and prefix ex. \`-addbot $clientID -\`]
$onlyIf[$isBot[$findUser[$message[1]]]==true; :x: Please list the id of a BOT! ]
$onlyIf[$memberExists[$message[1]]!=true; **Hey**! This bot is already here! you can use it the testing channels.]]
$suppressErrors[A extreme error just happened...]
$onlyForChannels[893018878236565504;Go to <#893018878236565504> to do this...]
`
})