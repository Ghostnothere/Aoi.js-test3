module.exports = {
  
  name: "buy-laptop",
  code: `
$description[**@$username Success in buying a Laptop💻 !!**]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet];13000]]
$setGlobalUserVar[laptop;$sum[$getGlobalUserVar[laptop];1]]
$onlyIf[$getGlobalUserVar[Wallet]>=13000;Not enough cash!]`
}