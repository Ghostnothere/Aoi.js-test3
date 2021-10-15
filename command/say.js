module.exports = ({
 name: "say",
 code: `
 $title[🗣️ Say System]
 $addField[$userTag says:;
 $message]
 $onlyIf[$message[1]!=;{description:You need to provide something to say!}]
 $cooldown[5s;{description:<@$authorID>, You need to wait %time% to use this command again!}]
 $deletecommand
 `
 })