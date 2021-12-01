module.exports = {
    name: "yesorno",
    code: `
$title[Yes Or No]
$thumbnail[$userAvatar[$clientID]
$description[$message

I say... ||$randomText[Yes!;Nah!]||]
$footer[Requested By $username!;$userAvatar[$authorID]]
$addTimestamp
`
}