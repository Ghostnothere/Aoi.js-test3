module.exports = {
  name: "help",
  code: `
$title[HELP]
  $description[
    here are my cmds $username]
$addField[:star:Utility;invite|setprefix|avatar|userinfo|serverinfo|roleinfo|colorinfo]
$addField[:gift:fun;howgay|8ball|say|dice|snipe|simprate|devrate|ghostrate|tod|sudo|yesorno|mock|random-word
$addField[moderation;ban|warn|kick|mute|unmute|unban| setmuterole|giverole|takerole| lock-channel|unlock-channel|lock-server|unlock
]
$addField[:frame_photo:image;panik|neko|billy|clyde|fear|pablo|gay|rick-astley|bed|slap|sus|spank|panik|trash|ejected|meme|rip|cat|dog|okami|foxgirl|kiss|coffee|comment|twitter|create,chm|billy-money|heaven|milk|hitler|gun|wasted|circle|maniac|winelord]
$addField[other;messages|messagelb|setmessages|addmessages|age|setage|ship|clap|math|channelifo
]
$addField[rank; rank | setrank | setrankmsg | leaderboard
]
$addField[:moneybag:economy;bal | dep | with | beg | weekly | daily | monthly |give | work |rich | slot | shop | profile | heist | rob | steal | seacrh | postmeme | luckyspin]
$addField[dev; eval | addmoney
]
$addField[emoji;steal | add-emoji | delete-emoji | addemoji | emoji-info
]
 $addField[chatbot; set-chatbot | disable-chatbot]
 $addField[suggest; set-suggest-channel | suggest | disable-suggest | enable-suggest]
 $addField[wiki; disable-wiki | enable-wiki | set-wiki | wiki]
 $addField[prefix;setprefix | resetprefix
]
 $addField[custom command; add-cmd | del-cmd | cmd-list
]
 $addField[:video_game: game; rps | aki]
 $addField[🎵 music;play | np | skip | stop | lyrics | volume | pause | queue | songinfo | loop | leave | join ]
 $addField[link;:link:[support server](https://discord.gg/2CCHKupcqX) 
 :link:[invite me](https://discord.com/oauth2/authorize?client_id=890204491872350240&scope=bot+applications.commands&permissions=8)]
$footer[what you need $username;$userAvatar]
$thumbnail[$userAvatar]
  $color[RANDOM]`
}

