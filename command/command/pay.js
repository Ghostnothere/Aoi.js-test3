module.exports = {
 name: "pay",
 aliases: ['give'],
 code: `💵 | **$username** sent **$noMentionMessage money** to **$username[$mentioned[1]]**!
 $setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$mentioned[1;yes]];$noMentionMessage];$mentioned[1;yes]]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];$noMentionMessage];$authorID]
$onlyIf[$noMentionMessage<=$getGlobalUserVar[Wallet;$authorID];{description::E_afalse: You don't have enough in your wallet}{color:ff0000}]
$onlyIf[$mentioned[1]!=$authorID;{description::E_afalse: You can't give money to yourself}{color:ff0000}]
$onlyIf[$mentioned[1]!=;{description::E_afalse: Mention someone to give money to and then the amount, try using this format**: \`$getServerVar[prefix]give <@user> <amount>\`}{color:ff0000}]
$onlyIf[$isBot[$mentioned[1]]!=true;{description::E_afalse: You can't give money to a Discord bot}{color:ff0000}]
$onlyIf[$isNumber[$noMentionMessage]==true;{description: That is not a number, try using this format: \`$getServerVar[prefix]give <@user> <amount>\`}{color:ff0000}]
$suppressErrors[{description::E_afalse: Usage: $getServerVar[prefix]give <@user> <amount>}{color:ff0000}]`
}