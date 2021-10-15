module.exports = ({
 name: "roulette",
 aliases: ["rl"],
 code: `
$title[$username's roulette game]
$thumbnail[$authorAvatar]
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$replaceText[$replaceText[$checkCondition[$toLowercase[$message[2]]==$randomText[red;black]];true;$message[1]];false;-$message[1]]]]

$description[You chosed $replaceText[$replaceText[$toLowercase[$message[2]];red;red];black;black]

__**$randomText[red;black]!**__

$replaceText[$replaceText[$checkCondition[$toLowercase[$message[2]]==$randomText[red;black]];true;You won **⍟ $message[1]**!];false;You lost **⍟ $message[1]**] 

Now you have: **⍟ $sum[$getGlobalUserVar[Wallet];$replaceText[$replaceText[$checkCondition[$toLowercase[$message[2]]==$randomText[red;black]];true;$message[1]];false;-$message[1]]]**]

$color[RANDOM]
$onlyIf[$checkCondition[$message[1]<=$getGlobalUserVar[Wallet]]==true;x you can't bet more than what you have!]
$onlyIf[$isNumber[$message[1]]==true;x Your bet must be a number!]
$onlyIf[$checkCondition[$toLowercase[$message[2]]==red]$checkCondition[$toLowercase[$message[2]]==black]!=falsefalse;x Use: \`=coinflip <bet> <red | black>\`]
$onlyIf[$checkCondition[$message[2]!=];x Use: \`=coinflip <bet> <red|black>\`]
$footer[$username]
$addTimestamp`

});