module.exports = ({
 name: "angry-mob",
 code: `
$image[$replaceText[https://api.berk404.ga/angrymob?text1=$splitText[1]&text2=$splitText[2]; ;+;-1]]
$onlyIf[$checkContains[$message;/]==true;Separate the texts using /, example: +angrymob BDFD is.../The best language!]
$textSplit[$message;/]`
});