module.exports = ({
name: "setmeme",
aliases: "memechannel", 
description: "Sets auto meme channel",
perm: "None",
usage: "]setmeme ]memechannel",
code: `
Success now **automeme** channel is <#$findChannel[$message]>
$setServerVar[automeme;$findChannel[$message]]`})