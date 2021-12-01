module.exports = ({
 name: 'discrim',
 aliases: 'discriminator',
 usage: 'Discrim <discrim>',
 description: 'Checks the users with particular discriminator',
 cooldown: '3s',
 code: `
$title[1;Users with discriminator: #$get[discrim]]
 $description[ 1;$djsEval[$get[e];yes]]
 $color[1;$getVar[color]]
 $onlyIf[$djsEval[$get[e];yes]!=;{newEmbed:{description: **No users with the discriminator: #$get[discrim] were found**}{color:#ff0000}}]
 $let[e;guild.members.cache.filter(x => x.user.discriminator === '$get[discrim]').map(owo => owo.user.tag).join("\\n")]
 
 $let[discrim;$message]
$cooldown[$commandInfo[Discrim;cooldown];{newEmbed:{description::c_s: Wait for %time% to try again}{color:#ff000}}]
 $onlyIf[$charCount[$message[1]]==4;{newEmbed:{description::c_s: Invalid Args in \`<discriminator\`
Usage:
\`discrim <discriminator>\`}{color:#ff0000}}]
 $onlyIf[$isNumber[$message[1]]==true;{newEmbed:{description::c_s: Invalid Args in \`<discriminator\`
Usage:
\`discrim <discriminator>\`}{color:#ff0000}}]
`})   