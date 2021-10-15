module.exports = ({
 name: "panik",
 code:`$image[https://api.devs-hub.xyz/panik?panik=$replaceText[$splitText[1]&kalm=$splitText[2]&panik2=$splitText[3]; ;+;-1]]
$onlyIf[$splitText[3]!=;Usage: =panik text1/text2/text3, you're missing text3 separated by /]
$onlyIf[$splitText[2]!=;Usage: =panik text1/text2/text3, you're missing text2 separated by /]
$onlyIf[$splitText[1]!=;Usage: =panik text1/text2/text3, separated by /]
$textSplit[$message;/]`
});