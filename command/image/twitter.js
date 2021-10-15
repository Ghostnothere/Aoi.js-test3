module.exports = ({
name: "twitter",
code:`
$onlyIf[$message!=;Type something!]
 
$color[$random[111111;999999]]
$image[https://api.no-api-key.com/api/v2/trump?message=$replaceText[$message; ;+;-1]]`
});