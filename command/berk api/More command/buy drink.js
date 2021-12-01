module.exports = { 
  name: "buy-drink",
  code: `
$description[**@$username Success in buying a Drink🥛 !!**]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet];45]]
$setGlobalUserVar[drink;$sum[$getGlobalUserVar[drink];1]]
$onlyIf[$getGlobalUserVar[Wallet]>=45;Not enough cash!]`
}