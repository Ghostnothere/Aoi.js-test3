module.exports = {
name: "tradeoffer", 
code: `$image[https://api.itshappy.ga/v2/image/tradeoffer?offer1=$replaceText[$splitText[1]; ;+]&offer2=$replaceText[$splitText[2]; ;+]]
$color[RANDOM]
$addTimestamp
$onlyIf[$charCount[$splitText[2]]<=10;characters must be 10 or less]
$onlyIf[$charCount[$splitText[1]]<=10;characters must be 10 or less]
$onlyIf[$checkContains[$message;|]==true;❌ | correct usage: <prefix>tradeoffer <text>|<text>]
$onlyIf[$splitText[2]!=;❌ | correct usage: <prefix>tradeoffer <text>|<text>]
$onlyIf[$splitText[1]!=;❌ | correct usage: <prefix>tradeoffer <text>|<text>]
$textSplit[$message;|]`
}