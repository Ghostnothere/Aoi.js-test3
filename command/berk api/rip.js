module.exports = ({
name: "chm",
code: `$title[Change My Mind]
$image[https://vacefron.nl/api/changemymind?text=$replaceText[$message; ;%20;-1]]
$color[$random[000000;999999]]
$argsCheck[>1;Write something to change your mind :)]
$footer[Requested by $username]
$addTimestamp
$suppressErrors[Please try again later]`})