module.exports = {
  
  name: "buy-fishrod",
  code: `
$description[**@$username Success in buying a Fishing equipment🎣 !!**]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet];75]]
$setGlobalUserVar[fishrod;$sum[$getGlobalUserVar[fishrod];1]]
$onlyIf[$getGlobalUserVar[Wallet]>=75;Not enough cash!]`
}