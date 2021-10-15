module.exports = ({
 name: "leaderboard",
 code: `
$title[**__$serverName[$guildID]'s__** Levelling Leaderboard]
$description[$replaceText[$userLeaderBoard[lvl;asc;⟨{top}⟩ {username} : {value}];⟨1⟩; ⟨1⟩  🏅]]
$footer[$randomText[Tip- Chat more to be on top;Tip- Don't spam to be on top!;Tip- Follow server rules and keep chat safe!;Do you know that you can invite me by $getServerVar[prefix]invite!]]
$thumbnail[$authorAvatar]
$addTimestamp  
`
});


