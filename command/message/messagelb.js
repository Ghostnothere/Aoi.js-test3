module.exports = {
 name: "messagelb",
 code: `
$title[Messages Leaderboard]
$thumbnail[$serverIcon]
$author[$serverName]
$color[#303136]
$description[$userLeaderboard[messages;asc;{top}. <@{id}> - \`{value}\` messages]]
$footer[Guild ID: $guildID]
`
};