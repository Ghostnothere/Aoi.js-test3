module.exports = {
  
  name: "buy-medic",
  code: `
$description[**@$username Success in buying a Medicine💊 !!**]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet];125]]
$setGlobalUserVar[hm;$sum[$getGlobalUserVar[hm];1]]
$onlyIf[$getGlobalUserVar[Wallet]>=125;Not enough cash!]`
  }