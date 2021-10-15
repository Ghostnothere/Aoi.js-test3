module.exports = ({
 name: "QR",
 code: `
$title[QR Code]
$image[https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=$replaceText[$message; ;+;-1]]
$footer[Data: '$message']
$argsCheck[>1;You need to provide a text]`
});