module.exports = ({
  name: "$alwaysExecute",
  code: `$setUserVar[reqxp;$sum[$getUserVar[reqxp];100]]
 $setUserVar[lvl;$sum[$getUserVar[lvl];1]] 
 $setUserVar[xp;0]

 $channelSendMessage[893356497071923220;**level up <@$authorID>!** level up rank  $sum[$getUserVar[lvl];1]
 $onlyif[$getUserVar[xp]>=$getUserVar[reqxp];]
 
 $onlyif[$isBot[$authorID]==false;]`
});

