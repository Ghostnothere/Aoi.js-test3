module.exports = ({
code: `
$author[$jsonRequest[https://bloxapi.soudblox.repl.co/meme;sub]]
$title[$jsonRequest[https://bloxapi.soudblox.repl.co/meme;title];$jsonRequest[https://bloxapi.soudblox.repl.co/meme;url]
$image[$jsonRequest[https://bloxapi.soudblox.repl.co/meme;link]
$color[98f1b2]
$footer[👍$jsonRequest[https://bloxapi.soudblox.repl.co/meme;ups] | 💬 $jsonRequest[https://bloxapi.soudblox.repl.co/meme;comments]]
$useChannel[$getServerVar[automeme]]
$suppressErrors
`,
type: 'loopCommand',
channel: '904328494694141972',
executeOnStartup: true,
every: 5000
})a