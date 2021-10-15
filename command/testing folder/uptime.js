module.exports = ({
name: "uptime",
code:`
$title[✅ Bot Uptime]
$description[**$djsEval[Math.floor(client.uptime / 86400000);;yes]** Days, **$djsEval[Math.floor(client.uptime / 3600000) % 24;;yes]** Hours, **$djsEval[Math.floor(client.uptime / 60000) % 60;;yes]** Minutes, **$djsEval[Math.floor(client.uptime / 1000) % 60;;yes]** Seconds]
$color[GREEN]
$thumbnail[$userAvatar[$clientID]]
$footer[Command Create By <|KiritoSenpai|>#4710;$userAvatar]`
});


