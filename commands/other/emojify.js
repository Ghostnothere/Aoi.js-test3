module.exports = ({
 name: "emojify",
 aliases: ['emoji'],
 code: `$jsonRequest[https://api.devs-hub.xyz/emojify?text=$toLowercase[$replaceText[$message; ;+;-1]];emojify;Errör]
 $argsCheck[>1;You need to provide some text to emojify]`
}) 