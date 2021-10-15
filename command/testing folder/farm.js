module.exports = ({
  name: "farm",
  description: "Work at a farm and get some money",
  usage: "$getserverVar[Prefix]farm",
  code: `

  $setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$random[1000;50000]]]

  $title[Farm Time]
  $description[You $randomText[milked the cows;took the eggs from the chickens;cleaned the chicken coup;planted corn;sold bales of hay] and the farmer paid you $getservervar[symbol]$random[1000;50000]!]
  $footer[Nice job bro]
  $color[$getUserVar[embedColor]]
  $cooldown[50s;Sorry the farm is closed for the next %time%]`
})