module.exports = {
  
  name: "buy-pizza",
  code: `
$description[**@$username Success in buying a Pizza🍕 !!**]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet];95]]
$setGlobalUserVar[pizza;$sum[$getGlobalUserVar[pizza];1]]
$onlyIf[$getGlobalUserVar[Wallet]>=95;Not enough cash!]`
}