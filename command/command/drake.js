module.exports = ({
 name: "drake",
 code: `
$image[https://api.devs-hub.xyz/drake?top=$replaceText[$splitText[1]&bottom=$splitText[2]; ;+;-1]]]
$onlyIf[$splitText[2]!=;Usage: (prefix)(command) text1/text2, you're missing text2 separated by /]
$onlyIf[$splitText[1]!=;Usage: (prefix)(command) text1/text2, separated by /]
$onlyIf[reminder==reminder;**IF DON'T WORK, ENABLE UNSTABLE MODE!**]
$textSplit[$message;/]`
});