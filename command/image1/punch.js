module.exports = ({
 name: "punch",
 code: `
 $setGlobalUserVar[punch;$sum[$getGlobalUserVar[punch;$mentioned[1]];1];$mentioned[1]]
$author[$username you just punch $username[$mentioned[1]];$userAvatar[$authorID]]
$description[$username[$mentioned[1]] tiene $getGlobalUserVar[punch;$mentioned[1]] mention someone]
$image[$randomText[https://i.imgur.com/06MliMz.gif;
https://cdn.discordapp.com/attachments/399448944889036801/650317293649264640/PartialCircularAmericanredsquirrel-size_restricted.gif;
https://cdn.discordapp.com/attachments/399448944889036801/658146891413848074/400178b7-d547-4226-b15a-fc6a6afcf85c.gif;
https://cdn.discordapp.com/attachments/399448944889036801/803686643915030548/b99326fc697f28b4112951eb0126583e.gif;
https://cdn.discordapp.com/attachments/399448944889036801/690554366305894460/tenor-1.gif]]
$onlyIf[$mentioned[1]!=$authorID;no te puedes golpear.]
$onlyIf[$mentioned[1]!=787337257639870496;No .]
$onlyIf[$mentioned[1]!=;*Error* mentions someone for punch. ]
$color[RANDOM]
$footer[XD]
$addTimestamp
`
})