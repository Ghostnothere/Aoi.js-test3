module.exports = ({
name: "spotify",
aliases: ['plays','playspotify','sp','ps','playspotify','spotifyplay'],
code: `
$volume[100]
$thumbnail[https://images-ext-2.discordapp.net/external/Vm12SC9n2P1s_iQ8MeWLEPrQbMmzGwqvVxGksDj-YII/https/media.discordapp.net/attachments/896847103647694862/896879313952067605/892446345577775124.png]

$color[$getservervar[hex]]
$author[**Song added to Queue!!**;https://images-ext-2.discordapp.net/external/Vm12SC9n2P1s_iQ8MeWLEPrQbMmzGwqvVxGksDj-YII/https/media.discordapp.net/attachments/896847103647694862/896879313952067605/892446345577775124.png]

$description[**<:sp:896879392985333771> Started playing $songinfo[title] from spotify published by $songinfo[publisher volume is at**\`100\`]

$playSpotify[$message;10m;no;no;yes;{color:RED} {author:Error occured} {footer:uh an unexpected error occured} {description:<:err:896881338752307230> An unexpected error occured when i tried playing \`$message\` from spotify please make sure the link is from spotify and that its a actuall link}]`})