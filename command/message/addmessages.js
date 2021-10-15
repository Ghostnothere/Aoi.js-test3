module.exports = {
 name: "addmessages",
 code: `
$title[Give messages]
$description[Gave <@$mentioned[1]> $message[2] messages]
$setUserVar[messages;$sum[$getUserVar[messages;$mentioned[1]];$message[2]];$mentioned[1]]
$argsCheck[2;✖️ To Use: \`$getServerVar[prefix]addmessages <@user> <ammount>\`]
$onlyPerms[managemessages;✖️ You need Manage Messages permissions]
$color[#303136]
$suppressErrors[Something went wrong please contact <@$botOwnerID>]
`
};